/* VidyaVerse v2 — exam hall: course exams, challenge ladders, mock tests, adaptive placement tests, results, certificates */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var E = VV2.Exam = {};
  var STARS = function (d) { d = VV2.clamp(d || 3, 1, 5); return '★★★★★'.slice(0, d) + '☆☆☆☆☆'.slice(0, 5 - d); };

  /* ---------------- question loading ---------------- */
  function tagQs(c) { return ((c.exam && c.exam.questions) || []).filter(function (q) { return q && Array.isArray(q.options) && typeof q.answer === 'number'; }).map(function (q) { return { q: q.q, options: q.options, answer: q.answer, why: q.why, difficulty: VV2.clamp(+q.difficulty || 3, 1, 5), src: { id: c.id, title: c.title, level: c.level } }; }); }
  function schoolQs(fac, pred) {
    return D.index().then(function () {
      var cs = D.bySchool(fac).filter(pred || function () { return true; }), packs = {};
      cs.forEach(function (c) { packs[c.pack] = 1; });
      var ids = Object.keys(packs), out = [], ok = {}; cs.forEach(function (c) { ok[c.id] = 1; });
      return Promise.all(ids.map(function (id) { return D.pack(id).catch(function () { return null; }); })).then(function (ps) {
        ps.forEach(function (p) { if (p) p.courses.forEach(function (c) { if (ok[c.id]) out = out.concat(tagQs(c)); }); });
        return out;
      });
    });
  }

  /* ---------------- generic runner ---------------- */
  function runner(host, cfg) {
    var st = { i: 0, ans: [], t0: Date.now(), left: cfg.timed || 0, done: false, data: cfg.data || {} }, iv = 0;
    host.innerHTML = '';
    var wrap = h('div', { class: 'qrun' }); host.appendChild(wrap);
    var top = h('div', { class: 'qr-top' }, [h('div', null, [h('p', { class: 'eyebrow' }, cfg.kicker || 'Exam hall'), h('h1', null, cfg.title)])]);
    var pips = h('div', { class: 'qr-pips', 'aria-hidden': 'true' }); for (var k = 0; k < cfg.total; k++) pips.appendChild(h('i'));
    var timer = cfg.timed ? h('span', { class: 'qr-timer', role: 'timer', 'aria-live': 'off' }) : null;
    top.appendChild(h('div', { class: 'row' }, [pips, timer]));
    wrap.appendChild(top);
    var card = h('div', { class: 'card' }); wrap.appendChild(card);
    var quit = h('button', { type: 'button', class: 'btn ghost small', onclick: function () { if (confirm('Leave this test? Your answers so far will be scored.')) finish(); } }, '⏹ End test now');
    wrap.appendChild(h('div', { class: 'row', style: { justifyContent: 'flex-end', marginTop: '10px' } }, quit));
    if (cfg.timed) { tickT(); iv = setInterval(tickT, 1000); }
    function tickT() { if (st.done) return; var m = Math.floor(st.left / 60), s = st.left % 60; timer.textContent = '⏱ ' + m + ':' + ('0' + s).slice(-2); timer.classList.toggle('low', st.left <= 30); if (st.left <= 0) { VV2.toast('Time is up!', '⏰'); finish(); } st.left--; }
    function keyH(e) { var n = parseInt(e.key, 10); if (!st.cur || st.locked || !(n >= 1 && n <= st.cur.options.length) || /INPUT|TEXTAREA/.test((document.activeElement || {}).tagName)) return; pick(n - 1); }
    document.addEventListener('keydown', keyH);
    VV2.onLeave(function () { clearInterval(iv); document.removeEventListener('keydown', keyH); });
    function next() {
      var q = st.i < cfg.total ? cfg.pick(st) : null;
      if (!q) { finish(); return; }
      st.cur = q; st.locked = false; card.innerHTML = '';
      VV2.$$('i', pips).forEach(function (p, j) { p.classList.toggle('now', j === st.i); });
      var box = h('div', { class: 'qr-card' }); card.appendChild(box);
      box.appendChild(h('p', { class: 'muted' }, [h('span', { class: 'qr-diff', 'aria-label': 'Difficulty ' + q.difficulty + ' of 5' }, STARS(q.difficulty)), '  ·  Question ' + (st.i + 1) + ' of ' + cfg.total + (q.src ? '  ·  ' + q.src.title : '')]));
      box.appendChild(h('p', { class: 'qr-q' }, q.q));
      var opts = h('div', { class: 'qr-opts', role: 'group', 'aria-label': 'Options' }); box.appendChild(opts);
      st.btns = q.options.map(function (o, j) { var b = h('button', { type: 'button', class: 'qr-opt' }, [h('kbd', null, String(j + 1)), h('span', null, String(o))]); b.addEventListener('click', function () { pick(j); }); opts.appendChild(b); return b; });
      st.box = box;
      if (VV2.mode === 'tiny') VV2.say(q.q);
      setTimeout(function () { try { st.btns[0].focus({ preventScroll: true }); } catch (e) { } }, 30);
    }
    function pick(j) {
      if (st.locked || st.done) return; st.locked = true;
      var q = st.cur, ok = j === q.answer; st.ans.push({ q: q, ok: ok, picked: j });
      pips.children[st.i] && (pips.children[st.i].className = cfg.instant || cfg.showPips ? (ok ? 'ok' : 'bad') : 'ans');
      if (cfg.after) cfg.after(st, q, ok);
      st.i++;
      if (cfg.instant) {
        st.btns.forEach(function (b, k) { b.disabled = true; if (k === q.answer) b.classList.add('right'); else if (k === j) b.classList.add('wrong'); });
        VV2.sfx(ok ? 'good' : 'bad');
        st.box.appendChild(h('div', { class: 'qr-why', html: '<b>' + (ok ? '✅ Correct. ' : '💡 Answer: ' + VV2.esc(q.options[q.answer]) + '. ') + '</b>' + VV2.inline(q.why || '') }));
        var nb = h('button', { type: 'button', class: 'btn primary qr-next' }, 'Next →'); nb.addEventListener('click', next); st.box.appendChild(nb); nb.focus();
      } else { st.btns[j].classList.add('chosen'); VV2.sfx('tap'); setTimeout(next, VV2.reduced ? 60 : 260); }
    }
    function finish() {
      if (st.done) return; st.done = true; clearInterval(iv); document.removeEventListener('keydown', keyH);
      st.secs = Math.round((Date.now() - st.t0) / 1000);
      if (cfg.countUnanswered) { while (st.ans.length < cfg.total && cfg.pool && cfg.pool[st.ans.length]) { st.ans.push({ q: cfg.pool[st.ans.length], ok: false, picked: -1 }); } }
      cfg.onFinish(st);
    }
    next();
    return st;
  }

  /* ---------------- results ---------------- */
  function results(host, st, o) {
    var n = st.ans.length, right = st.ans.filter(function (a) { return a.ok; }).length, pct = n ? Math.round(right / n * 100) : 0, pass = pct >= (o.pass || 60);
    host.innerHTML = '';
    var w = h('div', { class: 'qrun' }); host.appendChild(w);
    w.appendChild(h('div', { class: 'card res-head' }, [h('p', { class: 'eyebrow' }, o.kicker || 'Result'), h('h1', null, o.title), h('div', { class: 'res-score' }, pct + '%'),
      h('p', { class: 'lead' }, right + ' of ' + n + ' correct · ' + Math.floor(st.secs / 60) + ' min ' + (st.secs % 60) + ' s' + (o.pass ? ' · pass mark ' + o.pass + '%' : '')),
      h('p', null, o.verdict ? o.verdict(pct, pass) : (pass ? '🎉 Passed!' : 'Not yet — and that is how learning works.'))]));
    if (pass) { VV2.sfx('win'); VV2.confetti(); } else VV2.sfx('good');
    var by = {}; st.ans.forEach(function (a) { var d = a.q.difficulty || 3; by[d] = by[d] || [0, 0]; by[d][1]++; if (a.ok) by[d][0]++; });
    var bars = h('div', { class: 'diff-bars' });
    [1, 2, 3, 4, 5].forEach(function (d) { if (!by[d]) return; var p = Math.round(by[d][0] / by[d][1] * 100); bars.appendChild(h('div', { class: 'db' }, [h('span', { class: 'qr-diff', 'aria-label': 'Difficulty ' + d }, STARS(d)), h('div', { class: 'bar', role: 'img', 'aria-label': p + '% correct at difficulty ' + d }, h('i', { style: { width: p + '%' } })), h('span', null, by[d][0] + '/' + by[d][1])])); });
    w.appendChild(h('section', { class: 'card' }, [h('h2', null, '📊 By difficulty'), bars, h('p', { class: 'muted' }, insight(by))]));
    var wrong = st.ans.filter(function (a) { return !a.ok; });
    if (wrong.length) {
      var courses = {}; wrong.forEach(function (a) { if (a.q.src) courses[a.q.src.id] = a.q.src; });
      w.appendChild(h('section', { class: 'card' }, [h('h2', null, '📌 What to revise'),
        h('ul', { class: 'revise' }, Object.keys(courses).map(function (id) { var c = courses[id]; return h('li', null, [h('a', { href: '#/course/' + encodeURIComponent(id) }, c.title), h('small', null, ' · Level ' + c.level + ' · ' + wrong.filter(function (a) { return a.q.src && a.q.src.id === id; }).length + ' to review')]); })),
        h('details', null, [h('summary', null, 'See every question you missed (' + wrong.length + ')'), h('ol', { class: 'revise' }, wrong.map(function (a) { return h('li', null, [h('b', null, a.q.q), h('br'), h('small', null, (a.picked >= 0 ? 'You chose: ' + a.q.options[a.picked] + ' · ' : 'Not answered · ') + 'Answer: ' + a.q.options[a.q.answer]), a.q.why ? h('p', { class: 'muted' }, a.q.why) : null]); }))])]));
    }
    var acts = h('div', { class: 'row', style: { justifyContent: 'center', marginTop: '14px' } });
    if (wrong.length && !o.noRetry) acts.appendChild(h('button', { type: 'button', class: 'btn primary', onclick: function () { var qs = wrong.map(function (a) { return a.q; }); runner(host, { title: 'Retry what you missed', kicker: o.title, total: qs.length, instant: true, pick: function (s) { return qs[s.i]; }, onFinish: function (s2) { results(host, s2, { title: 'Retry round', kicker: o.title, noRetry: true, extra: o.extra }); } }); } }, '↻ Retry wrong answers'));
    (o.extra || []).forEach(function (x) { acts.appendChild(x); });
    acts.appendChild(h('a', { class: 'btn ghost', href: '#/exams' }, '🏛️ Exam hall'));
    w.appendChild(acts);
    return { pct: pct, pass: pass };
  }
  function insight(by) {
    var lo = by[1] || by[2], hi = by[4] || by[5]; if (!lo && !hi) return 'Mixed difficulty.';
    var lp = lo ? lo[0] / lo[1] : 1, hp = hi ? hi[0] / hi[1] : 0;
    if (lp < 0.6) return 'The basics wobbled — revisit the first lessons. Foundations first, fireworks later.';
    if (hp >= 0.7) return 'Strong even at the toughest level. Time to try the next level up!';
    return 'Solid basics; the tough ones are where your next gains are hiding.';
  }

  /* ---------------- EXAM HALL ---------------- */
  E.hall = function (main) {
    VV2.setTitle(VV2.t('exams')); main.innerHTML = '';
    var p = store.cur(), w = h('div', { class: 'wrap' }); main.appendChild(w);
    w.appendChild(h('p', { class: 'eyebrow' }, 'Pariksha Bhavan'));
    w.appendChild(h('h1', null, '📝 ' + VV2.t('exams')));
    w.appendChild(h('p', { class: 'lead' }, 'Course exams, easiest→toughest challenge ladders, timed mock tests and placement tests. Fail freely — it is the cheapest teacher there is.'));
    var hist = Object.keys(p.exams || {});
    if (hist.length) {
      var t = h('table', { class: 'dash-table' }, [h('thead', null, h('tr', null, ['Course', 'Best', 'Tries', ''].map(function (x) { return h('th', { scope: 'col' }, x); }))), h('tbody')]);
      hist.forEach(function (id) { var e = p.exams[id], c = D.byId[id]; t.lastChild.appendChild(h('tr', null, [h('td', null, h('a', { href: '#/course/' + encodeURIComponent(id) }, c ? c.title : id)), h('td', null, e.best + '%' + (e.passed ? ' ✅' : '')), h('td', null, String(e.tries)), h('td', null, [h('a', { class: 'btn small', href: '#/exam/' + encodeURIComponent(id) }, 'Retake'), e.passed ? h('a', { class: 'btn small ghost', href: '#/exam/' + encodeURIComponent(id) + '?cert=1' }, '📜') : null])])); });
      w.appendChild(h('section', { class: 'card' }, [h('h2', null, 'Your exam history'), h('div', { class: 'table-wrap' }, t)]));
    }
    var g = h('div', { class: 'exam-grid' }); w.appendChild(h('div', { class: 'section-h' }, h('h2', null, 'Pick a school'))); w.appendChild(g);
    return D.index().catch(function () { }).then(function () {
      VV2.SCHOOLS.forEach(function (s) {
        var n = D.bySchool(s.id).length, unl = store.unlockedLevel(s.id);
        g.appendChild(h('div', { class: 'card ex-school', style: { '--c': s.color } }, [h('h3', null, s.icon + ' ' + s.name), h('p', { class: 'muted' }, s.en + ' · ' + n + ' course' + (n === 1 ? '' : 's') + ' · unlocked Lv ' + unl),
          n ? h('div', { class: 'row' }, [h('a', { class: 'btn small primary', href: '#/ladder/' + s.id }, '🪜 Ladder'), h('a', { class: 'btn small', href: '#/mock/' + s.id }, '⏱ Mock'), h('a', { class: 'btn small ghost', href: '#/placement/' + s.id + '/' + Math.min(10, unl + 1) }, '🚀 Placement')]) : h('p', { class: 'muted' }, 'Exams open when the first course arrives.')]));
      });
    });
  };

  /* ---------------- COURSE EXAM ---------------- */
  E.course = function (main, cid, q) {
    VV2.loading(main, 'Arranging the exam desks…');
    return D.index().catch(function () { }).then(function () { return D.course(cid); }).then(function (r) {
      var c = r.course, s = VV2.school(c.faculty) || {}, pass = (c.exam && c.exam.passPct) || 60, qs = tagQs(c);
      VV2.setTitle('Exam · ' + c.title); if (c.sensitive) VV2.sensitive(true);
      var ex = store.cur().exams[c.id];
      if (q && q.cert && ex && ex.passed) { certificate(main, c, ex.best, ex.ts); return; }
      if (!qs.length) { VV2.errorView(main, 'No exam yet', 'This course does not have exam questions yet.'); return; }
      return VV2.Campus.access(c).then(function (ok) {
        if (!ok) { if (location.hash.indexOf('#/exam/') === 0) VV2.go('course/' + encodeURIComponent(c.id), true); return; }
        main.innerHTML = ''; var w = h('div', { class: 'wrap' }); main.appendChild(w);
        var timed = !!(q && q.timed);
        var tg = h('button', { type: 'button', class: 'switch', role: 'switch', 'aria-checked': timed ? 'true' : 'false', 'aria-label': 'Timed exam' });
        tg.addEventListener('click', function () { timed = !timed; tg.setAttribute('aria-checked', timed ? 'true' : 'false'); VV2.sfx('tap'); });
        var start = h('button', { type: 'button', class: 'btn primary big' }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), '▶ Begin exam']);
        w.appendChild(h('div', { class: 'qrun' }, h('div', { class: 'card res-head' }, [h('p', { class: 'eyebrow' }, s.name + ' · Level ' + c.level), h('h1', null, '📝 ' + c.title), h('p', { class: 'lead' }, qs.length + ' questions, easiest → toughest. Pass mark ' + pass + '%. Explanations come at the end.'),
          h('div', { class: 'set', style: { width: '100%', maxWidth: '420px' } }, [h('span', null, [h('b', null, '⏱ Timed mode'), h('small', null, '1 minute per question (' + qs.length + ' min total)')]), tg]),
          ex ? h('p', { class: 'muted' }, 'Your best so far: ' + ex.best + '%') : null, start, h('a', { class: 'btn ghost', href: '#/course/' + encodeURIComponent(c.id) }, '← Back to course')])));
        start.addEventListener('click', function () {
          var order = []; [1, 2, 3, 4, 5].forEach(function (d) { order = order.concat(VV2.shuffle(qs.filter(function (x) { return x.difficulty === d; }))); });
          VV2.track(c.faculty);
          runner(main, { title: c.title, kicker: 'Course exam', total: order.length, timed: timed ? order.length * 60 : 0, pool: order, countUnanswered: true, pick: function (st) { return order[st.i]; }, onFinish: function (st) {
            var right = st.ans.filter(function (a) { return a.ok; }).length, pct = Math.round(right / order.length * 100), passed = pct >= pass, before = store.cur().exams[c.id];
            var e = store.examResult(c.id, c.faculty, c.level, pct, passed);
            store.addXP(passed && !(before && before.passed) ? 50 : 10, passed ? 'exam passed' : 'exam attempt');
            var extra = [];
            if (passed) extra.push(h('a', { class: 'btn primary', href: '#/exam/' + encodeURIComponent(c.id) + '?cert=1' }, '📜 Get your certificate'));
            extra.push(h('a', { class: 'btn', href: '#/course/' + encodeURIComponent(c.id) }, '📚 Course page'));
            st.ans = st.ans.slice(0, order.length);
            results(main, st, { title: c.title, kicker: 'Course exam', pass: pass, extra: extra, verdict: function (p2, ok2) { return ok2 ? (p2 === 100 ? '🏆 Perfect score — Topper!' : '🎉 Passed! Level ' + Math.min(10, c.level + 1) + ' in ' + s.name + ' is now unlocked.') : 'Not yet — ' + (pass - p2) + '% to go. Review the topics below and try again.'; } });
          } });
        });
      });
    }).catch(function (e) { VV2.errorView(main, 'Exam not found', e && e.message, function () { VV2.render(); }); });
  };

  /* ---------------- LADDER ---------------- */
  E.ladder = function (main, fac) {
    var s = VV2.school(fac); if (!s) { VV2.errorView(main, 'No such school'); return; }
    VV2.setTitle('Ladder · ' + s.name); VV2.loading(main, 'Polishing the rungs…');
    return schoolQs(fac).then(function (qs) {
      main.innerHTML = ''; var w = h('div', { class: 'wrap' }); main.appendChild(w);
      if (qs.length < 5) { VV2.errorView(main, 'Ladder not built yet', s.name + ' needs a few more exam questions before we can build a ladder.'); return; }
      var pools = {}; [1, 2, 3, 4, 5].forEach(function (d) { pools[d] = VV2.shuffle(qs.filter(function (x) { return x.difficulty === d; })); });
      var viz = h('div', { class: 'ladder-viz' });
      [1, 2, 3, 4, 5].forEach(function (d) { viz.appendChild(h('div', { class: 'rung' + (d === 1 ? ' now' : '') }, [h('span', { class: 'qr-diff' }, STARS(d)), h('b', null, ['Foothills', 'Base camp', 'Ridge', 'High pass', 'Summit'][d - 1]), h('small', { class: 'muted' }, ' · ' + pools[d].length + ' questions')])); });
      var go = h('button', { type: 'button', class: 'btn primary big' }, '🪜 Start climbing');
      w.appendChild(h('div', { class: 'qrun' }, h('div', { class: 'card' }, [h('p', { class: 'eyebrow' }, s.name), h('h1', null, 'Challenge ladder'), h('p', { class: 'lead' }, 'Five rungs from easiest to toughest. Three questions per rung — get two right to climb. Fall off? Dust off and climb again.'), viz, go])));
      go.addEventListener('click', function () {
        var used = {}; VV2.track(fac);
        function from(d) { for (var k = 0; k < 5; k++) { var tries = [d, d + k, d - k]; for (var t = 0; t < 3; t++) { var p = pools[tries[t]]; if (p) for (var j = 0; j < p.length; j++) if (!used[tries[t] + ':' + j]) { used[tries[t] + ':' + j] = 1; return p[j]; } } } return null; }
        runner(main, { title: s.name + ' ladder', kicker: 'Challenge ladder', total: 15, instant: true, data: { rung: 1, asked: 0, right: 0, top: 0 }, pick: function (st) { var dd = st.data; if (dd.over) return null; return from(dd.rung); },
          after: function (st, q, ok) { var dd = st.data; dd.asked++; if (ok) dd.right++; if (dd.asked === 3) { if (dd.right >= 2) { dd.top = dd.rung; VV2.toast('Rung ' + dd.rung + ' cleared!', '🪜'); store.addXP(10, 'rung ' + dd.rung); dd.rung++; if (dd.rung > 5) dd.over = true; } else dd.over = true; dd.asked = 0; dd.right = 0; } },
          onFinish: function (st) { var top = st.data.top; store.update(function (p) { p.stats.ladders++; }); store.activity(); if (top >= 5) store.badge('ladder');
            results(main, st, { title: s.name + ' ladder', kicker: 'Highest rung: ' + top + ' / 5', verdict: function () { return top >= 5 ? '🏔️ Summit reached! You are a ' + s.name + ' mountaineer.' : top ? 'You reached rung ' + top + '. Next time, rung ' + (top + 1) + '!' : 'The foothills are slippery — try a lesson or two, then climb again.'; }, extra: [h('a', { class: 'btn', href: '#/ladder/' + fac, onclick: function (e) { e.preventDefault(); VV2.render(); } }, '🪜 Climb again')] }); } });
      });
    }).catch(function () { VV2.errorView(main, 'Could not load the ladder', 'Please check your connection.', function () { VV2.render(); }); });
  };

  /* ---------------- MOCK ---------------- */
  E.mock = function (main, fac) {
    var s = VV2.school(fac); if (!s) { VV2.errorView(main, 'No such school'); return; }
    VV2.setTitle('Mock test · ' + s.name); VV2.loading(main, 'Printing question papers…');
    return schoolQs(fac).then(function (qs) {
      if (qs.length < 5) { VV2.errorView(main, 'Mock test not ready', s.name + ' needs a few more exam questions first.'); return; }
      var n = Math.min(20, qs.length), set = VV2.shuffle(qs).slice(0, n).sort(function (a, b) { return a.difficulty - b.difficulty; });
      main.innerHTML = ''; var w = h('div', { class: 'wrap' }); main.appendChild(w);
      var go = h('button', { type: 'button', class: 'btn primary big' }, '⏱ Start the ' + n + '-minute mock');
      w.appendChild(h('div', { class: 'qrun' }, h('div', { class: 'card res-head' }, [h('p', { class: 'eyebrow' }, s.name), h('h1', null, 'Mock test'), h('p', { class: 'lead' }, n + ' mixed questions from across ' + s.name + ', one minute each. No explanations until the end — just like the real thing.'), go])));
      go.addEventListener('click', function () {
        VV2.track(fac);
        runner(main, { title: s.name + ' mock', kicker: 'Mock test', total: n, timed: n * 60, pool: set, countUnanswered: true, pick: function (st) { return set[st.i]; }, onFinish: function (st) {
          store.update(function (p) { p.stats.mocks++; }); store.activity(); store.badge('mock'); store.addXP(15, 'mock test');
          results(main, st, { title: s.name + ' mock', kicker: 'Mock test', pass: 60, extra: [h('a', { class: 'btn', href: '#/school/' + fac }, s.icon + ' ' + s.name)] });
        } });
      });
    }).catch(function () { VV2.errorView(main, 'Could not load the mock test', 'Please check your connection.', function () { VV2.render(); }); });
  };

  /* ---------------- PLACEMENT (adaptive) ---------------- */
  E.placement = function (main, fac, level, courseId) {
    var s = VV2.school(fac); if (!s) { VV2.errorView(main, 'No such school'); return; }
    level = VV2.clamp(level || store.unlockedLevel(fac) + 1, 1, 10);
    VV2.setTitle('Placement · ' + s.name + ' Level ' + level); VV2.loading(main, 'Calibrating the placement test…');
    return D.index().catch(function () { }).then(function () {
      var below = D.bySchool(fac).filter(function (c) { return c.level < level; });
      return schoolQs(fac, below.length ? function (c) { return c.level < level; } : function (c) { return c.level <= level; });
    }).then(function (qs) {
      main.innerHTML = ''; var w = h('div', { class: 'wrap' }); main.appendChild(w);
      var unl = store.unlockedLevel(fac);
      var free = h('button', { type: 'button', class: 'btn ghost', onclick: function () { var f = function (ok) { if (ok) { store.setFree(fac); VV2.toast('Free exploration on for ' + s.name, '🧭'); VV2.go(courseId ? 'course/' + encodeURIComponent(courseId) : 'school/' + fac); } }; if (store.isMinor()) VV2.adult('Exploring above your level is fine — a grown-up just says OK first.').then(f); else f(true); } }, '🧭 ' + VV2.t('explore'));
      if (qs.length < 5) { w.appendChild(h('div', { class: 'qrun' }, h('div', { class: 'card res-head' }, [h('h1', null, 'Placement test not ready'), h('p', null, s.name + ' does not have enough exam questions below Level ' + level + ' yet to build a fair test.'), h('div', { class: 'row' }, [free, h('a', { class: 'btn', href: '#/school/' + fac }, '← ' + s.name)])]))); return; }
      var go = h('button', { type: 'button', class: 'btn primary big' }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), '🚀 Start (10 questions)']);
      w.appendChild(h('div', { class: 'qrun' }, h('div', { class: 'card res-head' }, [h('p', { class: 'eyebrow' }, s.name + ' · placement'), h('h1', null, 'Jump to Level ' + level), h('p', { class: 'lead' }, 'Ten adaptive questions drawn from ' + s.name + ' courses below Level ' + level + '. Get one right and the next gets harder; miss one and it eases off. Score 70% or more to unlock Level ' + level + ' and everything below it.'), h('p', { class: 'muted' }, 'Currently unlocked: Level ' + unl + '.'), go, free])));
      go.addEventListener('click', function () {
        var used = [], target = 3, total = Math.min(10, qs.length); VV2.track(fac);
        runner(main, { title: s.name + ' → Level ' + level, kicker: 'Placement test', total: total, pick: function () {
          var best = null, bd = 99; VV2.shuffle(qs).forEach(function (x) { if (used.indexOf(x) >= 0) return; var d = Math.abs(x.difficulty - target); if (d < bd) { bd = d; best = x; } });
          if (best) used.push(best); return best;
        }, after: function (st, q, ok) { target = VV2.clamp(target + (ok ? 1 : -1), 1, 5); }, onFinish: function (st) {
          var right = st.ans.filter(function (a) { return a.ok; }).length, pct = st.ans.length ? Math.round(right / st.ans.length * 100) : 0, ok = pct >= 70 && st.ans.length >= Math.min(5, total);
          store.update(function (p) { p.stats.placements++; }); store.activity();
          if (ok) { store.unlock(fac, level); store.badge('placement'); store.addXP(40, 'placement passed'); }
          var extra = [];
          if (ok && courseId) extra.push(h('a', { class: 'btn primary', href: '#/course/' + encodeURIComponent(courseId) }, '▶ Go to the course'));
          if (ok) extra.push(h('a', { class: 'btn', href: '#/school/' + fac }, s.icon + ' ' + s.name + ' Level ' + level));
          else { extra.push(h('a', { class: 'btn', href: '#/placement/' + fac + '/' + level + (courseId ? '?course=' + encodeURIComponent(courseId) : ''), onclick: function (e) { e.preventDefault(); VV2.render(); } }, '↻ Try again')); extra.push(free); }
          results(main, st, { title: s.name + ' → Level ' + level, kicker: 'Placement test', pass: 70, extra: extra, verdict: function () { return ok ? '🚀 Level ' + level + ' and below are unlocked in ' + s.name + '!' : 'Not unlocked this time (you need 70%). The list below shows exactly what to revise.'; } });
        } });
      });
    }).catch(function () { VV2.errorView(main, 'Could not build the placement test', 'Please check your connection.', function () { VV2.render(); }); });
  };

  /* ---------------- CERTIFICATE ---------------- */
  function certificate(main, c, score, ts) {
    var s = VV2.school(c.faculty) || {}, p = store.cur();
    main.innerHTML = ''; store.badge('cert');
    var w = h('div', { class: 'wrap cert-wrap' }); main.appendChild(w);
    var name = h('input', { type: 'text', value: p.guest ? '' : p.name, maxlength: 40, placeholder: 'Name on certificate', 'aria-label': 'Name on certificate' });
    var cv = h('canvas', { width: 1600, height: 1130, role: 'img', 'aria-label': 'Certificate for ' + c.title });
    var dl = h('a', { class: 'btn primary', download: 'VidyaVerse-certificate.png', href: '#' }, '⬇️ Download PNG');
    var pr = h('button', { type: 'button', class: 'btn' }, '🖨️ Print');
    w.appendChild(h('h1', null, '📜 Your certificate'));
    w.appendChild(h('label', { class: 'f-item', style: { width: 'min(420px,100%)' } }, [h('span', null, 'Name on the certificate'), name]));
    w.appendChild(cv); w.appendChild(h('div', { class: 'row' }, [dl, pr, h('a', { class: 'btn ghost', href: '#/course/' + encodeURIComponent(c.id) }, '← Course')]));
    var date = new Date(ts || Date.now());
    function draw() {
      var g = cv.getContext('2d'), W = 1600, H = 1130, nm = name.value.trim() || 'A Curious Learner';
      var bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#fffaf0'); bg.addColorStop(1, '#f6ecd8'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#b8892d'; g.lineWidth = 10; g.strokeRect(40, 40, W - 80, H - 80); g.lineWidth = 2; g.strokeRect(62, 62, W - 124, H - 124);
      g.strokeStyle = s.color || '#1d5c63'; g.lineWidth = 3; g.strokeRect(76, 76, W - 152, H - 152);
      [[100, 100], [W - 100, 100], [100, H - 100], [W - 100, H - 100]].forEach(function (pt) { lotus(g, pt[0], pt[1], 26, '#b8892d'); });
      for (var i = 0; i < 40; i++) { g.fillStyle = 'rgba(184,137,45,' + (0.04 + (i % 3) * 0.02) + ')'; g.beginPath(); g.arc(W / 2 + Math.cos(i) * 600, H / 2 + Math.sin(i * 1.7) * 380, 3, 0, 7); g.fill(); }
      lotus(g, W / 2, 165, 46, s.color || '#1d5c63');
      g.textAlign = 'center'; g.fillStyle = '#1f2a44';
      g.font = '700 30px Georgia, "Times New Roman", serif'; g.fillText('VIDYAVERSE UNIVERSITY', W / 2, 260);
      g.font = 'italic 64px Georgia, "Times New Roman", serif'; g.fillStyle = '#7a5a1c'; g.fillText('Certificate of Achievement', W / 2, 350);
      g.font = '28px Georgia, serif'; g.fillStyle = '#5b6478'; g.fillText('This is to celebrate that', W / 2, 430);
      g.font = '700 ' + (nm.length > 24 ? 60 : 78) + 'px Georgia, "Times New Roman", serif'; g.fillStyle = '#1f2a44'; g.fillText(nm, W / 2, 530);
      g.strokeStyle = '#b8892d'; g.lineWidth = 2; g.beginPath(); g.moveTo(W / 2 - 380, 556); g.lineTo(W / 2 + 380, 556); g.stroke();
      g.font = '28px Georgia, serif'; g.fillStyle = '#5b6478'; g.fillText('passed the course exam of', W / 2, 620);
      var t = c.title, fs = t.length > 46 ? 40 : 52; g.font = '700 ' + fs + 'px Georgia, serif'; g.fillStyle = s.color || '#1d5c63'; g.fillText(t.length > 64 ? t.slice(0, 62) + '…' : t, W / 2, 700);
      g.font = '26px Georgia, serif'; g.fillStyle = '#1f2a44'; g.fillText((s.name || '') + ' — ' + (s.en || '') + '  ·  Level ' + c.level, W / 2, 760);
      g.font = '700 30px Georgia, serif'; g.fillText('Score: ' + score + '%   ·   ' + date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 820);
      seal(g, W - 300, H - 250);
      g.textAlign = 'left'; g.font = 'italic 34px Georgia, serif'; g.fillStyle = '#1f2a44'; g.fillText('Prof. Curiosity', 240, H - 230);
      g.strokeStyle = '#1f2a44'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(230, H - 212); g.lineTo(560, H - 212); g.stroke();
      g.font = '20px Georgia, serif'; g.fillStyle = '#5b6478'; g.fillText('Dean of Lifelong Learning', 240, H - 182);
      g.textAlign = 'center'; g.font = '18px Georgia, serif'; g.fillStyle = '#8a8f9c';
      g.fillText('A free, independent learning record for personal achievement — not an accredited qualification. Not affiliated with any board, exam body or university.', W / 2, H - 110);
      try { dl.href = cv.toDataURL('image/png'); dl.download = 'VidyaVerse-certificate-' + c.id.replace(/[^a-z0-9]+/gi, '-') + '.png'; } catch (e) { dl.hidden = true; }
    }
    function lotus(g, x, y, r, col) {
      g.save(); g.translate(x, y); g.fillStyle = col; g.globalAlpha = 0.9;
      for (var k = -2; k <= 2; k++) { g.save(); g.rotate(k * 0.42); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(r * 0.45, -r * 0.6, 0, -r * 1.2); g.quadraticCurveTo(-r * 0.45, -r * 0.6, 0, 0); g.globalAlpha = k === 0 ? 0.95 : 0.6; g.fill(); g.restore(); }
      g.globalAlpha = 1; g.restore();
    }
    function seal(g, x, y) {
      g.save(); g.translate(x, y);
      for (var k = 0; k < 32; k++) { g.rotate(Math.PI / 16); g.fillStyle = k % 2 ? '#c99a3a' : '#a87a22'; g.beginPath(); g.moveTo(0, -110); g.lineTo(14, -86); g.lineTo(-14, -86); g.fill(); }
      var rg = g.createRadialGradient(-20, -20, 10, 0, 0, 90); rg.addColorStop(0, '#f3d27a'); rg.addColorStop(1, '#b8892d');
      g.fillStyle = rg; g.beginPath(); g.arc(0, 0, 88, 0, 7); g.fill(); g.strokeStyle = '#fff8e1'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 72, 0, 7); g.stroke();
      g.fillStyle = '#5a3d0c'; g.textAlign = 'center'; g.font = '700 44px Georgia, serif'; g.fillText('VV', 0, 14); g.font = '14px Georgia, serif'; g.fillText('VIDYA · VERSE', 0, 44);
      g.restore();
    }
    name.addEventListener('input', draw);
    pr.addEventListener('click', function () {
      draw(); var box = document.getElementById('printCert'); if (box) box.remove();
      box = h('div', { id: 'printCert', class: 'print-cert' }); var img = new Image(); img.alt = 'Certificate'; img.src = cv.toDataURL('image/png'); box.appendChild(img); document.body.appendChild(box);
      document.body.classList.add('printing-cert');
      var done = function () { document.body.classList.remove('printing-cert'); var b = document.getElementById('printCert'); if (b) b.remove(); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      setTimeout(function () { window.print(); setTimeout(done, 1500); }, 120);
    });
    draw(); VV2.sfx('win'); VV2.confetti();
  }
  E.certificate = certificate;
})();

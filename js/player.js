/* VidyaVerse v2 — lesson player: storyboard, steps with read-aloud, activity widget, quiz, rewards, next lesson */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var P = VV2.Player = {};
  var KINDS = { text: ['📘', 'Explanation'], example: ['🧮', 'Worked example'], tip: ['💡', 'Tip'], warning: ['⚠️', 'Watch out'], fact: ['🔎', 'Did you know?'], realworld: ['🌍', 'In the real world'], try: ['✋', 'Try this'] };
  var SECTIONS = [['story', '📖', 'Story'], ['learn', '📘', 'Learn'], ['do', '🧩', 'Do'], ['quiz', '❓', 'Quiz'], ['done', '🏁', 'Done']];

  P.render = function (main, lid) {
    VV2.loading(main, 'Setting up the classroom…');
    return D.index().catch(function () { }).then(function () { return D.lesson(lid); }).then(function (r) {
      return VV2.Campus.access(r.course).then(function (ok) {
        if (!ok) { if (location.hash.indexOf('#/lesson/') === 0) VV2.go('course/' + encodeURIComponent(r.course.id), true); return; }
        build(main, r);
      });
    }).catch(function (e) { VV2.errorView(main, 'Lesson not found', 'We could not open this lesson' + (e && e.message ? ' (' + e.message + ')' : '') + '.', function () { VV2.render(); }); });
  };

  function build(main, r) {
    var L = r.lesson, c = r.course, s = VV2.school(c.faculty) || {}, cnt = c.lessons.length;
    var st = { sec: 0, scene: 0, actDone: false, actPct: 0, quiz: { i: 0, right: 0, answered: [] }, awarded: false, widget: null, auto: null };
    VV2.setTitle(L.title + ' · ' + c.title); store.setLast(L.id); store.touch(c.id); VV2.track(c.faculty);
    if (c.sensitive) VV2.sensitive(true);
    main.innerHTML = '';
    var w = h('div', { class: 'wrap player', style: { '--c': c.color || s.color || 'var(--pri)' } }); main.appendChild(w);
    w.appendChild(h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, [h('a', { href: '#/school/' + c.faculty }, (s.icon || '') + ' ' + (s.name || '')), h('span', { 'aria-hidden': 'true' }, ' / '), h('a', { href: '#/course/' + encodeURIComponent(c.id) }, c.title), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', null, 'Lesson ' + (r.index + 1) + ' of ' + cnt)]));
    w.appendChild(h('header', { class: 'lp-head' }, [h('span', { class: 'lp-i', 'aria-hidden': 'true' }, c.icon || '📘'), h('div', null, [h('p', { class: 'eyebrow' }, 'Lesson ' + (r.index + 1) + ' · ⏱ ' + (L.minutes || 5) + ' min'), h('h1', null, L.title)])]));
    var rail = h('div', { class: 'lp-rail', role: 'tablist', 'aria-label': 'Lesson sections' });
    var tabs = SECTIONS.map(function (sx, i) {
      var b = h('button', { type: 'button', role: 'tab', class: 'lp-tab', id: 'lpt-' + sx[0], 'aria-controls': 'lpPanel', 'aria-selected': 'false' }, [h('span', { class: 'lt-i', 'aria-hidden': 'true' }, sx[1]), h('b', null, sx[2])]);
      b.addEventListener('click', function () { go(i); });
      rail.appendChild(b); return b;
    });
    w.appendChild(rail);
    var bar = h('div', { class: 'lp-prog', 'aria-hidden': 'true' }, h('i')); w.appendChild(bar);
    var panel = h('section', { class: 'lp-panel card', id: 'lpPanel', role: 'tabpanel', tabindex: '-1' }); w.appendChild(panel);
    var prev = h('button', { type: 'button', class: 'btn ghost' }, '← ' + VV2.t('back')), next = h('button', { type: 'button', class: 'btn primary' }, VV2.t('next') + ' →');
    prev.addEventListener('click', function () { go(st.sec - 1); }); next.addEventListener('click', function () { go(st.sec + 1); });
    var extra = h('div', { class: 'lp-extra' });
    if (L.lab) extra.appendChild(h('button', { type: 'button', class: 'btn small', onclick: function () { openHub('labs', L.lab); } }, '🧪 ' + VV2.t('openLab')));
    if (L.game) extra.appendChild(h('button', { type: 'button', class: 'btn small', onclick: function () { openHub('games', L.game); } }, '🎮 ' + VV2.t('playGame')));
    w.appendChild(h('div', { class: 'lp-nav' }, [prev, extra, next]));
    function key(e) {
      var a = document.activeElement, tag = a && a.tagName;
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || document.body.classList.contains('has-modal') || (a && a.closest && a.closest('.widget'))) return;
      if (e.key === 'ArrowRight') { go(st.sec + 1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { go(st.sec - 1); e.preventDefault(); }
    }
    document.addEventListener('keydown', key);
    VV2.onLeave(function () { document.removeEventListener('keydown', key); stopAuto(); destroyWidget(); });

    function destroyWidget() { if (st.widget && st.widget.destroy) try { st.widget.destroy(); } catch (e) { } st.widget = null; }
    function stopAuto() { if (st.auto) { clearTimeout(st.auto); st.auto = null; } }
    function go(i) {
      if (i < 0 || i >= SECTIONS.length) { if (i >= SECTIONS.length && r.index + 1 < cnt) VV2.go('lesson/' + encodeURIComponent(c.lessons[r.index + 1].id)); return; }
      stopAuto(); VV2.hush(); destroyWidget();
      if (i !== st.sec) VV2.sfx('whoosh');
      st.sec = i;
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.classList.toggle('seen', k < i); t.tabIndex = k === i ? 0 : -1; });
      bar.firstChild.style.width = (i / (SECTIONS.length - 1) * 100) + '%';
      panel.setAttribute('aria-labelledby', 'lpt-' + SECTIONS[i][0]);
      panel.className = 'lp-panel card sec-' + SECTIONS[i][0]; panel.innerHTML = '';
      prev.disabled = i === 0;
      next.textContent = i === SECTIONS.length - 1 ? (r.index + 1 < cnt ? 'Next lesson →' : '🏁 Finished') : VV2.t('next') + ' →';
      next.disabled = i === SECTIONS.length - 1 && r.index + 1 >= cnt;
      [story, learn, act, quiz, done][i](panel);
      if (i > 0) try { panel.scrollIntoView({ block: 'start', behavior: VV2.reduced ? 'auto' : 'smooth' }); } catch (e) { }
    }

    /* ---------- 1. story (storyboard) ---------- */
    function story(el) {
      var sc = (L.story && L.story.scenes) || [];
      el.appendChild(h('h2', { class: 'sec-h' }, ['📖 ', (L.story && L.story.title) || 'A story']));
      if (!sc.length) { el.appendChild(h('p', null, 'No story for this one — straight to learning!')); return; }
      var stage = h('div', { class: 'sb-stage', 'aria-live': 'polite' });
      var strip = h('div', { class: 'sb-strip', role: 'list' });
      var ctrls = h('div', { class: 'row sb-ctrls' });
      el.appendChild(stage); el.appendChild(ctrls); el.appendChild(strip);
      var bPrev = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Previous scene' }, '◀'), bNext = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Next scene' }, '▶');
      var bSay = h('button', { type: 'button', class: 'btn small' }, '🔊 ' + VV2.t('listen')), bAuto = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': 'false' }, '▶ Play story');
      var count = h('span', { class: 'muted sb-count' });
      ctrls.appendChild(bPrev); ctrls.appendChild(count); ctrls.appendChild(bNext); ctrls.appendChild(bSay); ctrls.appendChild(bAuto);
      var thumbs = sc.map(function (x, i) { var t = h('button', { type: 'button', role: 'listitem', class: 'sb-thumb', 'aria-label': 'Scene ' + (i + 1) }, [h('span', { 'aria-hidden': 'true' }, x.emoji || '🎬'), h('small', null, String(i + 1))]); t.addEventListener('click', function () { stopAuto(); show(i); }); strip.appendChild(t); return t; });
      var FX = ['fx-pop', 'fx-slide', 'fx-zoom', 'fx-drop', 'fx-spin', 'fx-rise'];
      function show(i, speak) {
        st.scene = VV2.clamp(i, 0, sc.length - 1); var x = sc[st.scene];
        stage.innerHTML = '';
        var words = String(x.text || '').split(/\s+/).map(function (wd, k) { return '<span style="animation-delay:' + Math.min(k * 45, 1800) + 'ms">' + VV2.esc(wd) + '</span>'; }).join(' ');
        stage.appendChild(h('div', { class: 'sb-frame ' + FX[st.scene % FX.length] }, [h('div', { class: 'sb-bg', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i')]), h('div', { class: 'sb-emoji', 'aria-hidden': 'true' }, x.emoji || '🎬'), h('p', { class: 'sb-text', html: words })]));
        thumbs.forEach(function (t, k) { t.classList.toggle('on', k === st.scene); t.setAttribute('aria-current', k === st.scene ? 'true' : 'false'); });
        count.textContent = (st.scene + 1) + ' / ' + sc.length; bPrev.disabled = st.scene === 0; bNext.disabled = st.scene === sc.length - 1;
        VV2.sfx('pop');
        if (speak || VV2.mode === 'tiny') VV2.say(x.text);
      }
      bPrev.addEventListener('click', function () { stopAuto(); show(st.scene - 1); });
      bNext.addEventListener('click', function () { stopAuto(); show(st.scene + 1); });
      bSay.addEventListener('click', function () { VV2.say(sc[st.scene].text); });
      bAuto.addEventListener('click', function () {
        if (st.auto) { stopAuto(); bAuto.textContent = '▶ Play story'; bAuto.setAttribute('aria-pressed', 'false'); return; }
        bAuto.textContent = '⏸ Pause'; bAuto.setAttribute('aria-pressed', 'true');
        var run = function () { show(st.scene, VV2.audio.on || VV2.mode === 'tiny'); var ms = 2200 + String(sc[st.scene].text || '').length * 55; st.auto = setTimeout(function () { if (st.scene < sc.length - 1) { st.scene++; run(); } else { stopAuto(); bAuto.textContent = '↻ Replay'; bAuto.setAttribute('aria-pressed', 'false'); st.scene = 0; } }, ms); };
        run();
      });
      stage.addEventListener('click', function () { if (st.scene < sc.length - 1) { stopAuto(); show(st.scene + 1); } });
      show(st.scene);
    }

    /* ---------- 2. learn (steps) ---------- */
    function learn(el) {
      var steps = L.steps || [];
      var readAll = h('button', { type: 'button', class: 'btn small' }, '🔊 Read all aloud');
      el.appendChild(h('div', { class: 'sec-top' }, [h('h2', { class: 'sec-h' }, '📘 Learn'), readAll]));
      var list = h('div', { class: 'steps' }); el.appendChild(list);
      var io = 'IntersectionObserver' in window && !VV2.reduced ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 }) : null;
      var cardsEl = steps.map(function (sx, i) {
        var k = KINDS[sx.kind] || KINDS.text;
        var sayBtn = h('button', { type: 'button', class: 'icon-btn st-say', 'aria-label': 'Read this aloud', 'data-nosay': '' }, '🔊');
        var cd = h('article', { class: 'step k-' + (sx.kind || 'text') }, [h('div', { class: 'st-h' }, [h('span', { class: 'st-k' }, [h('span', { 'aria-hidden': 'true' }, sx.icon || k[0]), ' ', k[1]]), sayBtn]), h('h3', null, sx.title || ''), h('div', { class: 'st-b', html: VV2.md(sx.body) })]);
        sayBtn.addEventListener('click', function () { VV2.say((sx.title ? sx.title + '. ' : '') + (sx.say || sx.body)); cd.classList.add('reading'); setTimeout(function () { cd.classList.remove('reading'); }, 1500); });
        cd.style.transitionDelay = Math.min(i * 60, 300) + 'ms';
        list.appendChild(cd); if (io) io.observe(cd); else cd.classList.add('in');
        return cd;
      });
      readAll.addEventListener('click', function () {
        var i = 0; (function nx() { if (i >= steps.length || st.sec !== 1) return; var sx = steps[i]; cardsEl.forEach(function (c2, k) { c2.classList.toggle('reading', k === i); }); try { cardsEl[i].scrollIntoView({ block: 'center', behavior: VV2.reduced ? 'auto' : 'smooth' }); } catch (e) { } i++; VV2.say((sx.title ? sx.title + '. ' : '') + (sx.say || sx.body), { onend: nx }); if (!VV2.canSpeak) setTimeout(nx, 3000); })();
      });
      if (VV2.mode === 'tiny' && steps[0]) VV2.say(steps[0].say || steps[0].body);
    }

    /* ---------- 3. activity ---------- */
    function act(el) {
      var a = L.activity || {}, fn = VV2.W && VV2.W[a.type];
      el.appendChild(h('h2', { class: 'sec-h' }, '🧩 Your turn'));
      var host = h('div', { class: 'widget w-' + (a.type || 'none') }); el.appendChild(host);
      var msg = h('p', { class: 'act-msg', 'aria-live': 'polite' }); el.appendChild(msg);
      if (st.actDone) msg.textContent = '✅ Done — ' + st.actPct + '%. You can try again or move on.';
      if (!fn) { host.appendChild(h('p', { class: 'muted' }, 'This activity type (' + (a.type || 'none') + ') is not available in this version — skip ahead to the quiz.')); return; }
      try {
        st.widget = fn(host, a, { id: L.id, course: c.id, mode: VV2.mode, say: VV2.say, sfx: VV2.sfx, done: function (pct) {
          pct = Math.round(VV2.clamp(pct == null ? 100 : pct, 0, 100)); var first = !st.actDone; st.actDone = true; st.actPct = Math.max(st.actPct, pct);
          msg.textContent = (pct >= 80 ? '🌟 Brilliant — ' : pct >= 50 ? '👍 Good effort — ' : '💪 Keep going — ') + pct + '%. ' + (first ? 'Next up: the quiz.' : '');
          if (first) { VV2.sfx(pct >= 50 ? 'win' : 'good'); if (pct >= 80) VV2.confetti(VV2.lowPower ? 30 : 60); }
          next.classList.add('glow');
        } }) || null;
      } catch (e) { host.innerHTML = ''; host.appendChild(h('p', { class: 'muted' }, 'This activity could not start on this device. Skip ahead — the quiz still works.')); }
    }

    /* ---------- 4. quiz ---------- */
    function quiz(el) {
      var qs = L.quiz || [], q = st.quiz;
      el.appendChild(h('h2', { class: 'sec-h' }, '❓ Quick check'));
      if (!qs.length) { el.appendChild(h('p', null, 'No quiz for this lesson.')); return; }
      var pips = h('div', { class: 'qr-pips', 'aria-hidden': 'true' }, qs.map(function (x, i) { return h('i', { class: q.answered[i] === true ? 'ok' : q.answered[i] === false ? 'bad' : i === q.i ? 'now' : '' }); }));
      el.appendChild(pips);
      var box = h('div', { class: 'qr-card' }); el.appendChild(box);
      if (q.i >= qs.length) { summary(); return; }
      var x = qs[q.i], answered = q.answered[q.i] != null;
      box.appendChild(h('p', { class: 'muted' }, 'Question ' + (q.i + 1) + ' of ' + qs.length));
      var qp = h('p', { class: 'qr-q' }, x.q); box.appendChild(qp);
      var opts = h('div', { class: 'qr-opts', role: 'group', 'aria-label': 'Answer options' }); box.appendChild(opts);
      var why = h('div', { class: 'qr-why', hidden: true, 'aria-live': 'polite' }); box.appendChild(why);
      var nb = h('button', { type: 'button', class: 'btn primary qr-next', hidden: true }, q.i + 1 < qs.length ? 'Next question →' : 'See my score →');
      nb.addEventListener('click', function () { q.i++; panel.innerHTML = ''; quiz(panel); });
      box.appendChild(nb);
      var bs = (x.options || []).map(function (op, k) {
        var b = h('button', { type: 'button', class: 'qr-opt' }, [h('kbd', null, String(k + 1)), h('span', null, String(op))]);
        b.addEventListener('click', function () { pickA(k); }); opts.appendChild(b); return b;
      });
      function pickA(k) {
        if (q.answered[q.i] != null) return;
        var ok = k === x.answer; q.answered[q.i] = ok; if (ok) q.right++;
        bs.forEach(function (b, j) { b.disabled = true; if (j === x.answer) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); });
        VV2.sfx(ok ? 'good' : 'bad');
        why.hidden = false; why.innerHTML = '<b>' + (ok ? '✅ Correct! ' : '💡 Not quite. ') + '</b>' + VV2.inline(x.why || '');
        if (VV2.mode === 'tiny' || VV2.mode === 'kids') VV2.say((ok ? 'Correct! ' : 'Not quite. ') + (x.why || ''));
        nb.hidden = false; nb.focus();
        pips.children[q.i].className = ok ? 'ok' : 'bad';
        store.update(function (p) { p.stats.quizTotal++; if (ok) p.stats.quizRight++; });
      }
      if (answered) { bs.forEach(function (b, j) { b.disabled = true; if (j === x.answer) b.classList.add('right'); }); nb.hidden = false; why.hidden = false; why.innerHTML = VV2.inline(x.why || ''); }
      if (VV2.mode === 'tiny') VV2.say(x.q + '. ' + (x.options || []).join('. '));
      function kk(e) { var n = parseInt(e.key, 10); if (st.sec === 3 && n >= 1 && n <= bs.length && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName)) pickA(n - 1); }
      document.addEventListener('keydown', kk); VV2.onLeave(function () { document.removeEventListener('keydown', kk); });
      var oldGo = panel._kk; if (oldGo) document.removeEventListener('keydown', oldGo); panel._kk = kk;
      function summary() {
        var pct = Math.round(q.right / qs.length * 100);
        box.appendChild(h('div', { class: 'res-head' }, [h('div', { class: 'res-score' }, pct + '%'), h('p', null, q.right + ' of ' + qs.length + ' correct. ' + (pct === 100 ? 'Flawless!' : pct >= 60 ? 'Solid work.' : 'Have another look at the Learn section — then retry.'))]));
        box.appendChild(h('div', { class: 'row', style: { justifyContent: 'center' } }, [h('button', { type: 'button', class: 'btn ghost', onclick: function () { st.quiz = { i: 0, right: 0, answered: [] }; panel.innerHTML = ''; quiz(panel); } }, '↻ Retry quiz'), h('button', { type: 'button', class: 'btn primary', onclick: function () { go(4); } }, 'Finish lesson →')]));
      }
    }

    /* ---------- 5. done ---------- */
    function done(el) {
      var qs = L.quiz || [], qp = qs.length ? Math.round(st.quiz.right / qs.length * 100) : 100, answeredAll = st.quiz.answered.filter(function (x) { return x != null; }).length >= qs.length;
      var pct = Math.round((answeredAll ? qp : 0) * 0.7 + (st.actDone ? st.actPct : 0) * 0.3);
      if (!st.awarded) {
        st.awarded = true;
        var first = store.lessonDone(L.id, c.id, c.faculty, pct);
        var xp = first ? 20 + (answeredAll ? st.quiz.right * 5 : 0) + (st.actDone ? 10 : 0) : 5;
        store.addXP(xp, first ? 'lesson complete' : 'review');
        if (answeredAll && qp === 100) store.badge('perfect');
        VV2.sfx('win'); VV2.confetti();
      }
      var nxt = r.index + 1 < cnt ? c.lessons[r.index + 1] : null;
      el.appendChild(h('div', { class: 'done-box' }, [h('div', { class: 'done-art', 'aria-hidden': 'true' }, VV2.mode === 'tiny' ? '🌟' : VV2.mode === 'kids' ? '🏆' : '🎓'), h('h2', null, 'Lesson complete!'),
        h('p', { class: 'lead' }, answeredAll ? 'Quiz: ' + st.quiz.right + '/' + qs.length + (st.actDone ? ' · Activity: ' + st.actPct + '%' : '') : 'You can still take the quiz for extra XP.'),
        h('div', { class: 'row', style: { justifyContent: 'center' } }, [
          nxt ? h('a', { class: 'btn primary big', href: '#/lesson/' + encodeURIComponent(nxt.id) }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), 'Next: ' + nxt.title + ' →']) : (c.exam ? h('a', { class: 'btn primary big', href: '#/exam/' + encodeURIComponent(c.id) }, '📝 Take the course exam') : null),
          h('a', { class: 'btn', href: '#/course/' + encodeURIComponent(c.id) }, '📚 Course page'),
          L.lab ? h('button', { type: 'button', class: 'btn ghost', onclick: function () { openHub('labs', L.lab); } }, '🧪 ' + VV2.t('openLab')) : null,
          L.game ? h('button', { type: 'button', class: 'btn ghost', onclick: function () { openHub('games', L.game); } }, '🎮 ' + VV2.t('playGame')) : null]),
        L.sources && L.sources.length ? h('p', { class: 'muted small-note' }, 'Sources: ' + L.sources.join(' · ')) : null]));
      if (VV2.mode === 'tiny') VV2.say('Yay! You did it!');
    }
    go(0);
  }
  function openHub(kind, id) { VV2.need('hub').then(function () { VV2.Hub.open(kind, id); }).catch(function () { VV2.toast('Could not open that right now.', '⚠️'); }); }
})();

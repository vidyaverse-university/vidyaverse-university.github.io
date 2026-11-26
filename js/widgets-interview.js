/* VidyaVerse v2 — widget "interview" (mock interview, SPEC-X3).
   Rounds with a soft timer, typed answers or optional dictation (Web Speech API, feature-detected), key-point coverage scoring by
   simple word-stem matching, self-rating, model answer + follow-ups, and a printable summary report. Everything stays on the device. */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : this;
  var VV2 = root.VV2 = root.VV2 || {};
  var W = VV2.W = VV2.W || {};
  var IV = VV2.Interview = VV2.Interview || {};

  /* ---------------- scoring: stems + lenient prefix matching ---------------- */
  var STOP = {};
  ('a an the and or but nor to of in on at for with without by from as so if then than that this these those it its is are was were be been being am do does did done ' +
    'i me my we our you your they them their he she his her who whom which what when where why how not no yes dont doesnt can could will would should shall may might must ' +
    'about into out up down over under again also just only very really more most some any all each every both few other such own same too s t etc eg ie vs via using use used make sure ' +
    'there here one two first then next way thing things get got let lets like well').split(' ').forEach(function (w) { STOP[w] = 1; });
  IV.stem = function (w) {
    w = String(w || '').toLowerCase();
    if (w.length > 4 && /ies$/.test(w)) w = w.slice(0, -3) + 'y';
    else if (w.length > 3 && /[^s]s$/.test(w)) w = w.slice(0, -1);
    var suf = [['ations', 'at'], ['ation', 'at'], ['itions', 'it'], ['ition', 'it'], ['ments', ''], ['ment', ''], ['ness', ''], ['ings', ''], ['ing', ''], ['edly', ''], ['ed', ''], ['ly', ''], ['ers', ''], ['er', ''], ['ions', ''], ['ion', ''], ['able', ''], ['ible', ''], ['ive', ''], ['ize', ''], ['ise', ''], ['al', ''], ['e', '']];
    for (var i = 0; i < suf.length; i++) { var s = suf[i][0]; if (w.length - s.length >= 3 && w.slice(-s.length) === s) { w = w.slice(0, -s.length) + suf[i][1]; break; } }
    if (w.length > 3 && w[w.length - 1] === w[w.length - 2] && !/[lsz]/.test(w[w.length - 1])) w = w.slice(0, -1);
    return w;
  };
  IV.tokens = function (txt) {
    return String(txt || '').toLowerCase().replace(/[’']/g, '').split(/[^a-z0-9+#]+/).filter(function (w) { return w && !STOP[w] && (w.length > 1 || /\d/.test(w)); }).map(IV.stem);
  };
  function near(a, b) {
    if (a === b) return true;
    var n = Math.min(a.length, b.length); if (n < 4) return false;
    var k = 0; while (k < n && a[k] === b[k]) k++;
    return k >= 5 || (k >= 4 && k >= 0.8 * n);
  }
  /* returns {covered:[bool], hits:[[matched stems]], pct} */
  IV.score = function (answer, points) {
    var A = IV.tokens(answer), set = {}; A.forEach(function (t) { set[t] = 1; });
    var cov = [], hits = [];
    (points || []).forEach(function (p) {
      var T = IV.tokens(p), uniq = T.filter(function (t, i) { return T.indexOf(t) === i; }), m = [];
      uniq.forEach(function (t) { if (set[t] || A.some(function (a) { return near(a, t); })) m.push(t); });
      var need = uniq.length <= 1 ? 1 : Math.ceil(uniq.length * 0.5);
      cov.push(uniq.length ? m.length >= need : false); hits.push(m);
    });
    var n = cov.filter(Boolean).length;
    return { covered: cov, hits: hits, pct: points && points.length ? Math.round(n / points.length * 100) : 0 };
  };
  IV.roundScore = function (coverPct, rating) { return Math.round(0.7 * coverPct + 0.3 * ((Math.max(1, Math.min(5, rating || 1)) - 1) / 4) * 100); };

  function fmt(s) { var neg = s < 0; s = Math.abs(Math.round(s)); return (neg ? '+' : '') + Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  var KIND = { technical: ['🛠️', 'Technical'], behavioural: ['🤝', 'Behavioural'], behavioral: ['🤝', 'Behavioural'], scenario: ['🎬', 'Scenario'], hr: ['💼', 'HR'], case: ['📊', 'Case'], 'system-design': ['🏗️', 'System design'] };

  W.interview = function (el, a, ctx) {
    var h = VV2.h, doc = document;
    a = a || {}; ctx = ctx || {};
    if (VV2.needCss) VV2.needCss('interview');
    var rounds = (Array.isArray(a.rounds) ? a.rounds : []).filter(function (r) { return r && r.q; });
    var wrap = h('div', { class: 'iv' }); el.appendChild(wrap);
    if (!rounds.length) { wrap.appendChild(h('p', { class: 'muted' }, 'This mock interview has no questions yet.')); return { destroy: function () { } }; }
    var SR = root.SpeechRecognition || root.webkitSpeechRecognition || null;
    var st = { i: 0, res: [], useTimer: true, timer: null, left: 0, used: 0, rec: null, listening: false, doneSent: false, t0: 0 };
    var key = 'vv2.iv.' + (ctx.id || a.role || 'x');
    var last = null; try { last = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { last = null; }
    function sfx(n) { try { if (ctx.sfx) ctx.sfx(n); } catch (e) { } }
    function say(t) { try { if (ctx.say) ctx.say(t); else if (VV2.say) VV2.say(t); } catch (e) { } }
    function clearT() { if (st.timer) { clearInterval(st.timer); st.timer = null; } }
    function stopRec() { if (st.rec) { try { st.rec.onend = null; st.rec.stop(); } catch (e) { } } st.rec = null; st.listening = false; }
    function screen() { clearT(); stopRec(); wrap.innerHTML = ''; }

    /* ---------- intro ---------- */
    function intro() {
      screen();
      try { last = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { last = null; }
      var kinds = {}; rounds.forEach(function (r) { var k = (KIND[r.kind] || ['❓', r.kind || 'Question'])[1]; kinds[k] = (kinds[k] || 0) + 1; });
      var tmr = h('input', { type: 'checkbox', id: 'ivT' + (ctx.id || '') }); tmr.checked = st.useTimer; tmr.addEventListener('change', function () { st.useTimer = tmr.checked; });
      wrap.appendChild(h('div', { class: 'iv-intro' }, [
        h('p', { class: 'eyebrow' }, '🎤 Mock interview · ' + (a.level ? a.level.charAt(0).toUpperCase() + a.level.slice(1) + ' level' : 'practice')),
        h('h3', null, a.role || 'Interview practice'),
        h('p', null, rounds.length + ' questions: ' + Object.keys(kinds).map(function (k) { return kinds[k] + ' ' + k.toLowerCase(); }).join(', ') + '. Answer as you would in the room — out loud first if you like, then type or dictate. After each answer you will see which key points you covered, rate yourself, and read a model answer.'),
        a.tips && a.tips.length ? h('details', { class: 'iv-tips' }, [h('summary', null, '💡 Tips before you start'), h('ul', null, a.tips.map(function (t) { return h('li', null, t); }))]) : null,
        h('label', { class: 'iv-opt' }, [tmr, ' Use the timer (a gentle countdown — you can still finish after time runs out)']),
        h('p', { class: 'muted iv-small' }, SR ? '🎙️ Dictation is available in this browser. Note: some browsers send audio to their own speech service to turn it into text.' : '⌨️ Dictation is not supported in this browser — type your answers (it works the same).'),
        last ? h('p', { class: 'muted iv-small' }, 'Your last attempt: ' + last.score + '% on ' + new Date(last.at).toLocaleDateString() + '.') : null,
        h('div', { class: 'row' }, [h('button', { type: 'button', class: 'btn primary', onclick: function () { st.i = 0; st.res = []; st.t0 = Date.now(); ask(); } }, 'Start interview ▶')])
      ]));
    }

    /* ---------- one question ---------- */
    function ask() {
      screen();
      var r = rounds[st.i], k = KIND[r.kind] || ['❓', r.kind || 'Question'], lim = Math.max(20, +r.timeSec || 120);
      st.left = lim; st.used = 0;
      var clock = h('span', { class: 'iv-clock', role: 'timer', 'aria-live': 'off' }, st.useTimer ? fmt(lim) : '');
      var warn = h('p', { class: 'iv-warn', 'aria-live': 'polite' });
      var ta = h('textarea', { class: 'iv-ans', rows: '7', 'aria-label': 'Your answer', placeholder: 'Your answer… (Ctrl + Enter to submit)' });
      var wc = h('small', { class: 'muted' }, '0 words'), interim = h('small', { class: 'iv-interim muted', 'aria-live': 'polite' });
      ta.addEventListener('input', function () { var n = (ta.value.match(/\S+/g) || []).length; wc.textContent = n + ' word' + (n === 1 ? '' : 's'); });
      ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submit(); } });
      var mic = null;
      if (SR) {
        mic = h('button', { type: 'button', class: 'btn small ghost iv-mic', 'aria-pressed': 'false' }, '🎙️ Dictate');
        mic.addEventListener('click', function () {
          if (st.listening) { stopRec(); mic.setAttribute('aria-pressed', 'false'); mic.textContent = '🎙️ Dictate'; interim.textContent = ''; return; }
          try {
            var rec = new SR(); st.rec = rec; rec.continuous = true; rec.interimResults = true;
            rec.lang = (doc.documentElement && doc.documentElement.lang === 'hi') ? 'hi-IN' : 'en-IN';
            rec.onresult = function (ev) {
              var fin = '', mid = '';
              for (var j = ev.resultIndex; j < ev.results.length; j++) { var t = ev.results[j][0].transcript; if (ev.results[j].isFinal) fin += t; else mid += t; }
              if (fin) { ta.value = (ta.value && !/\s$/.test(ta.value) ? ta.value + ' ' : ta.value) + fin.trim(); ta.dispatchEvent(new Event('input')); }
              interim.textContent = mid ? '… ' + mid : '';
            };
            rec.onerror = function (ev) { interim.textContent = ev && ev.error === 'not-allowed' ? 'Microphone permission was denied — you can type instead.' : 'Dictation stopped (' + (ev && ev.error || 'error') + ').'; };
            rec.onend = function () { st.listening = false; st.rec = null; mic.setAttribute('aria-pressed', 'false'); mic.textContent = '🎙️ Dictate'; };
            rec.start(); st.listening = true; mic.setAttribute('aria-pressed', 'true'); mic.textContent = '⏹ Stop dictation'; interim.textContent = 'Listening…';
          } catch (e) { interim.textContent = 'Dictation could not start — please type.'; }
        });
      }
      wrap.appendChild(h('div', { class: 'iv-round' }, [
        h('div', { class: 'iv-top' }, [h('span', { class: 'iv-badge' }, k[0] + ' ' + k[1]), h('span', { class: 'muted' }, 'Question ' + (st.i + 1) + ' of ' + rounds.length), clock]),
        h('div', { class: 'iv-prog', 'aria-hidden': 'true' }, h('i', { style: { width: (st.i / rounds.length * 100) + '%' } })),
        h('p', { class: 'iv-q' }, r.q),
        h('div', { class: 'row iv-tools' }, [h('button', { type: 'button', class: 'btn small ghost', onclick: function () { say(r.q); } }, '🔊 Read it to me'), mic]),
        ta, h('div', { class: 'iv-meta' }, [wc, interim]), warn,
        h('div', { class: 'row' }, [h('button', { type: 'button', class: 'btn primary', onclick: submit }, 'Submit answer'), h('button', { type: 'button', class: 'btn ghost', onclick: function () { ta.value = ''; submit(); } }, 'Skip')])
      ]));
      try { ta.focus(); } catch (e) { }
      st.timer = setInterval(function () {
        st.used++; if (!st.useTimer) return;
        st.left--; clock.textContent = st.left >= 0 ? fmt(st.left) : fmt(st.left);
        clock.classList.toggle('low', st.left <= 15); clock.classList.toggle('over', st.left < 0);
        if (st.left === 0) { warn.textContent = '⏰ Time is up — finish your sentence and submit. (In a real interview, wrap up with a one-line summary.)'; sfx('tick'); }
      }, 1000);
      function submit() {
        clearT(); stopRec();
        var ans = ta.value.trim(), sc = IV.score(ans, r.points || []);
        st.res[st.i] = { q: r.q, kind: k[1], answer: ans, cover: sc.pct, covered: sc.covered, points: r.points || [], rating: 0, used: st.used, limit: lim };
        sfx(sc.pct >= 60 ? 'good' : 'pop'); feedback();
      }
    }

    /* ---------- feedback for a round ---------- */
    function feedback() {
      screen();
      var r = rounds[st.i], R = st.res[st.i];
      var stars = h('div', { class: 'iv-stars', role: 'radiogroup', 'aria-label': 'Rate your own answer from 1 to 5' });
      var modelBox = h('div', { class: 'iv-model', hidden: true });
      var nextB = h('button', { type: 'button', class: 'btn primary', disabled: true, onclick: function () { st.i++; if (st.i < rounds.length) ask(); else summary(); } }, st.i + 1 < rounds.length ? 'Next question →' : 'See my report 🏁');
      ['Weak', 'Patchy', 'OK', 'Good', 'Excellent'].forEach(function (lbl, j) {
        var b = h('button', { type: 'button', class: 'iv-star', role: 'radio', 'aria-checked': 'false', 'aria-label': (j + 1) + ' — ' + lbl, title: lbl }, '★');
        b.addEventListener('click', function () {
          R.rating = j + 1; R.score = IV.roundScore(R.cover, R.rating);
          Array.prototype.forEach.call(stars.children, function (c, q) { c.classList.toggle('on', q <= j); c.setAttribute('aria-checked', q === j ? 'true' : 'false'); });
          modelBox.hidden = false; nextB.disabled = false; sfx('tap');
        });
        stars.appendChild(b);
      });
      var pts = (R.points || []).map(function (p, j) { return h('li', { class: R.covered[j] ? 'ok' : 'miss' }, [h('span', { 'aria-hidden': 'true' }, R.covered[j] ? '✅ ' : '⬜ '), p, h('span', { class: 'sr' }, R.covered[j] ? ' — covered' : ' — not covered')]); });
      modelBox.appendChild(h('h4', null, '📗 A strong answer'));
      modelBox.appendChild(h('p', null, r.model || '—'));
      if (r.followups && r.followups.length) { modelBox.appendChild(h('h4', null, '🔁 Likely follow-up questions — practise these aloud')); modelBox.appendChild(h('ul', null, r.followups.map(function (f) { return h('li', null, f); }))); }
      wrap.appendChild(h('div', { class: 'iv-fb' }, [
        h('div', { class: 'iv-top' }, [h('span', { class: 'iv-badge' }, R.kind), h('span', { class: 'muted' }, 'Question ' + (st.i + 1) + ' of ' + rounds.length), h('span', { class: 'muted' }, '⏱ ' + fmt(R.used) + (R.used > R.limit ? ' (over by ' + fmt(R.used - R.limit).replace('+', '') + ')' : ''))]),
        h('p', { class: 'iv-q small' }, r.q),
        R.answer ? h('details', { class: 'iv-your' }, [h('summary', null, 'Your answer (' + (R.answer.match(/\S+/g) || []).length + ' words)'), h('p', null, R.answer)]) : h('p', { class: 'muted' }, 'You skipped this one — read the strong answer and try saying it in your own words.'),
        h('h4', null, ['🎯 Key points covered: ', h('b', null, R.cover + '%')]),
        h('ul', { class: 'iv-pts' }, pts),
        h('p', { class: 'muted iv-small' }, 'The check looks for the main words of each point (and their word families) — it cannot judge depth or tone, so be honest in your self-rating.'),
        h('h4', null, 'How good was your answer, honestly?'), stars,
        modelBox,
        h('div', { class: 'row' }, [nextB])
      ]));
    }

    /* ---------- final report ---------- */
    function summary() {
      screen();
      var res = st.res.filter(Boolean), tot = 0;
      res.forEach(function (x) { if (!x.score) x.score = IV.roundScore(x.cover, x.rating || 1); tot += x.score; });
      var overall = res.length ? Math.round(tot / res.length) : 0, byKind = {};
      res.forEach(function (x) { (byKind[x.kind] = byKind[x.kind] || []).push(x.score); });
      var kinds = Object.keys(byKind).map(function (k) { var v = byKind[k]; return [k, Math.round(v.reduce(function (s, y) { return s + y; }, 0) / v.length)]; }).sort(function (p, q) { return q[1] - p[1]; });
      var missed = []; res.forEach(function (x) { x.points.forEach(function (p, j) { if (!x.covered[j]) missed.push(p); }); });
      var mins = Math.round((Date.now() - st.t0) / 60000);
      var verdict = overall >= 80 ? 'Interview-ready on these questions — keep it sharp with the follow-ups.' : overall >= 60 ? 'Solid base. Tighten the points you missed and practise answering out loud.' : 'Good first run. Study the strong answers, then retry — scores usually jump on the second attempt.';
      var report = h('section', { class: 'iv-report' }, [
        h('h3', null, '🏁 Interview report — ' + (a.role || 'Mock interview')),
        h('p', { class: 'muted' }, (a.level ? a.level + ' level · ' : '') + res.length + ' questions · about ' + Math.max(1, mins) + ' min · ' + new Date().toLocaleDateString()),
        h('div', { class: 'iv-big' }, [h('b', null, overall + '%'), h('span', null, verdict)]),
        h('table', { class: 'iv-tbl' }, [h('thead', null, h('tr', null, ['#', 'Question', 'Type', 'Key points', 'Self', 'Score', 'Time'].map(function (t) { return h('th', { scope: 'col' }, t); }))),
          h('tbody', null, res.map(function (x, j) { return h('tr', null, [h('td', null, String(j + 1)), h('td', null, x.q), h('td', null, x.kind), h('td', null, x.cover + '%'), h('td', null, (x.rating || '–') + '/5'), h('td', null, h('b', null, x.score + '%')), h('td', null, fmt(x.used))]); }))]),
        kinds.length > 1 ? h('p', null, ['💪 Strongest: ', h('b', null, kinds[0][0] + ' (' + kinds[0][1] + '%)'), ' · 🎯 Focus next: ', h('b', null, kinds[kinds.length - 1][0] + ' (' + kinds[kinds.length - 1][1] + '%)')]) : null,
        missed.length ? h('div', null, [h('h4', null, '📌 Points to revise'), h('ul', null, missed.slice(0, 20).map(function (p) { return h('li', null, p); }))]) : h('p', null, '🌟 You covered every key point.'),
        a.tips && a.tips.length ? h('div', null, [h('h4', null, '💡 Tips'), h('ul', null, a.tips.map(function (t) { return h('li', null, t); }))]) : null,
        h('p', { class: 'muted iv-small' }, 'Practice report from VidyaVerse. Scores come from key-word coverage plus your own rating — a real interviewer also weighs clarity, examples and attitude.')
      ]);
      wrap.appendChild(report);
      wrap.appendChild(h('div', { class: 'row iv-actions' }, [
        h('button', { type: 'button', class: 'btn', onclick: function () { printReport(report); } }, '🖨️ Print / save as PDF'),
        h('button', { type: 'button', class: 'btn ghost', onclick: intro }, '↻ Try again')
      ]));
      try { localStorage.setItem(key, JSON.stringify({ score: overall, at: Date.now() })); } catch (e) { }
      sfx(overall >= 60 ? 'win' : 'good');
      if (!st.doneSent) { st.doneSent = true; try { if (ctx.done) ctx.done(overall); } catch (e) { } }
    }
    function printReport(node) {
      var box = doc.getElementById('ivPrint'); if (box) box.remove();
      box = h('div', { id: 'ivPrint' }); box.appendChild(node.cloneNode(true)); doc.body.appendChild(box);
      doc.body.classList.add('iv-printing');
      var cleanup = function () { doc.body.classList.remove('iv-printing'); var b = doc.getElementById('ivPrint'); if (b) b.remove(); root.removeEventListener('afterprint', cleanup); };
      root.addEventListener('afterprint', cleanup);
      try { root.print(); } catch (e) { }
    }

    intro();
    return { destroy: function () { clearT(); stopRec(); var b = doc.getElementById('ivPrint'); if (b) b.remove(); doc.body && doc.body.classList.remove('iv-printing'); } };
  };
})();

/* VidyaVerse v2 — widgets B: true-false, scenario, slider, timeline, reflection, breathing, checklist, faq */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var W = VV2.W = VV2.W || {};
  var Wh = VV2.Wh = VV2.Wh || {};
  function prompt(el, t) { if (Wh.prompt) Wh.prompt(el, t); else if (t) el.appendChild(h('p', { class: 'w-prompt' }, t)); }
  function fbk(el) { if (Wh.feedback) return Wh.feedback(el); var f = h('p', { class: 'w-fb', 'aria-live': 'polite' }); el.appendChild(f); return function (t) { f.textContent = t; }; }

  /* ---------- true-false ---------- */
  W['true-false'] = function (el, a, ctx) {
    var st = a.statements || [], done = 0, right = 0;
    prompt(el, a.prompt || 'True or false? Decide, then read why.');
    var list = h('div', { class: 'tf-list' }); el.appendChild(list);
    st.forEach(function (s, i) {
      var why = h('p', { class: 'tf-why', hidden: true });
      var bt = h('button', { type: 'button', class: 'btn small tf-t' }, '👍 True'), bf = h('button', { type: 'button', class: 'btn small tf-f' }, '👎 False');
      var row = h('div', { class: 'tf-item', style: { animationDelay: (i * 80) + 'ms' } }, [h('p', { class: 'tf-s' }, [h('b', null, (i + 1) + '. '), s.s]), h('div', { class: 'row' }, [bt, bf]), why]);
      function ans(v) {
        var ok = v === !!s.t; done++; if (ok) right++;
        bt.disabled = bf.disabled = true; (v ? bt : bf).classList.add(ok ? 'right' : 'wrong'); row.classList.add(ok ? 'ok' : 'no');
        why.hidden = false; why.innerHTML = '<b>' + (ok ? '✅ Yes — ' : '💡 Actually ') + (s.t ? 'TRUE' : 'FALSE') + '.</b> ' + VV2.inline(s.why || '');
        VV2.sfx(ok ? 'good' : 'bad'); if (ctx.mode === 'tiny' || ctx.mode === 'kids') ctx.say((ok ? 'Yes! ' : 'Actually, ') + (s.t ? 'true. ' : 'false. ') + (s.why || ''));
        if (done === st.length) ctx.done(Math.round(right / st.length * 100));
      }
      bt.addEventListener('click', function () { ans(true); }); bf.addEventListener('click', function () { ans(false); });
      list.appendChild(row);
    });
  };

  /* ---------- scenario (branching story) ---------- */
  W.scenario = function (el, a, ctx) {
    var nodes = a.nodes || {}, path = [], good = 0, total = 0;
    prompt(el, a.prompt || 'A real situation. There is no timer — choose what you would actually do.');
    var trail = h('div', { class: 'sc-trail', 'aria-label': 'Your path' }); el.appendChild(trail);
    var stage = h('div', { class: 'sc-stage', 'aria-live': 'polite' }); el.appendChild(stage);
    function show(id) {
      var n = nodes[id]; stage.innerHTML = '';
      if (!n) { stage.appendChild(h('p', null, 'This path is still being written. Restart to explore another one.')); return; }
      path.push(id); trail.innerHTML = ''; path.forEach(function (p, i) { trail.appendChild(h('span', { class: 'sc-dot' + (i === path.length - 1 ? ' now' : '') }, (nodes[p] && nodes[p].emoji) || '•')); });
      var box = h('div', { class: 'sc-node' + (n.end ? ' end' : '') }, [h('div', { class: 'sc-e', 'aria-hidden': 'true' }, n.emoji || (n.end ? '🏁' : '🤔')), h('div', { class: 'sc-t', html: VV2.md(n.text || '') })]);
      stage.appendChild(box);
      if (ctx.mode === 'tiny' || ctx.mode === 'kids') ctx.say(n.text);
      if (n.end) {
        var pct = total ? Math.round(good / total * 100) : 100;
        box.appendChild(h('p', { class: 'sc-sum' }, total ? 'You made ' + good + ' strong choice' + (good === 1 ? '' : 's') + ' out of ' + total + '.' : 'The end.'));
        box.appendChild(h('div', { class: 'row' }, [h('button', { type: 'button', class: 'btn', onclick: function () { path = []; good = 0; total = 0; show(a.start); VV2.sfx('whoosh'); } }, '↻ Try another path')]));
        VV2.sfx(pct >= 60 ? 'win' : 'good'); ctx.done(pct); return;
      }
      var ch = h('div', { class: 'sc-choices' }); box.appendChild(ch);
      (n.choices || []).forEach(function (c, i) {
        var b = h('button', { type: 'button', class: 'sc-c', style: { animationDelay: (i * 90) + 'ms' } }, [h('span', { class: 'sc-k', 'aria-hidden': 'true' }, String.fromCharCode(65 + i)), h('span', null, c.label)]);
        b.addEventListener('click', function () {
          total++; if (c.good) good++;
          VV2.$$('.sc-c', ch).forEach(function (x) { x.disabled = true; }); b.classList.add(c.good ? 'good' : 'bad');
          VV2.sfx(c.good ? 'good' : 'bad');
          var cont = h('button', { type: 'button', class: 'btn primary' }, 'Continue →');
          cont.addEventListener('click', function () { VV2.sfx('whoosh'); show(c.next); });
          box.appendChild(h('div', { class: 'sc-fb ' + (c.good ? 'good' : 'bad') }, [h('p', { html: '<b>' + (c.good ? '👍 ' : '🤔 ') + '</b>' + VV2.inline(c.feedback || (c.good ? 'A wise move.' : 'Hmm — think about how that plays out.')) }), cont]));
          if (ctx.mode === 'tiny' || ctx.mode === 'kids') ctx.say(c.feedback || '');
          setTimeout(function () { try { cont.focus(); } catch (e) { } }, 30);
        });
        ch.appendChild(b);
      });
    }
    show(a.start);
  };

  /* ---------- slider ---------- */
  W.slider = function (el, a, ctx) {
    var min = +a.min, max = +a.max, step = +a.step || 1, bands = (a.bands || []).slice().sort(function (x, y) { return x.upto - y.upto; }), visited = {}, moves = 0;
    prompt(el, a.prompt || 'Slide and see what changes.');
    var val = h('output', { class: 'sl-val' });
    var inp = h('input', { type: 'range', min: min, max: max, step: step, value: a.start != null ? a.start : min, 'aria-label': a.label || 'Value' });
    var meter = h('div', { class: 'sl-meter', 'aria-hidden': 'true' }, h('i'));
    var txt = h('div', { class: 'sl-text', 'aria-live': 'polite' });
    el.appendChild(h('div', { class: 'sl-head' }, [h('b', null, a.label || ''), val])); el.appendChild(inp); el.appendChild(meter); el.appendChild(txt);
    function upd(user) {
      var v = +inp.value, bi = bands.length - 1;
      for (var i = 0; i < bands.length; i++) if (v <= bands[i].upto) { bi = i; break; }
      val.textContent = v + (a.unit ? ' ' + a.unit : '');
      meter.firstChild.style.width = ((v - min) / (max - min) * 100) + '%';
      meter.firstChild.style.background = 'hsl(' + Math.round(140 - (bi / Math.max(1, bands.length - 1)) * 130) + ',70%,50%)';
      var b = bands[bi];
      if (b && txt.getAttribute('data-b') !== String(bi)) { txt.setAttribute('data-b', String(bi)); txt.innerHTML = ''; txt.appendChild(h('p', { class: 'sl-band', html: VV2.md(b.text) })); if (user) { VV2.sfx('pop'); if (ctx.mode === 'tiny' || ctx.mode === 'kids') ctx.say(b.text); } }
      if (user) { visited[bi] = 1; moves++; if (Object.keys(visited).length >= Math.min(2, bands.length) && moves > 2) ctx.done(100); }
    }
    inp.addEventListener('input', function () { upd(true); }); upd(false);
  };

  /* ---------- timeline ---------- */
  W.timeline = function (el, a, ctx) {
    var ev = a.events || [], tries = 0;
    prompt(el, a.prompt || 'Put these events in time order, earliest at the top.');
    if (!Wh.reorder) { el.appendChild(h('p', null, 'Timeline needs the core widgets.')); return; }
    var labels = VV2.shuffleNot(ev.map(function (e, i) { return { t: e.text, v: String(i) }; }));
    var ro = Wh.reorder(el, labels);
    var fb = fbk(el);
    var chk = h('button', { type: 'button', class: 'btn primary' }, '✓ Check timeline'); el.appendChild(h('div', { class: 'row' }, chk));
    chk.addEventListener('click', function () {
      tries++; var ord = ro.order(), right = 0;
      ro.items().forEach(function (li, i) { var ok = ord[i] === String(i); li.classList.toggle('ok', ok); li.classList.toggle('no', !ok); if (ok) right++; });
      if (right === ev.length || tries >= 3) {
        ro.items().slice().sort(function (x, y) { return +x.getAttribute('data-v') - +y.getAttribute('data-v'); }).forEach(function (li) { ro.list.appendChild(li); var y = ev[+li.getAttribute('data-v')].year; if (!li.querySelector('.tl-y')) li.querySelector('.ro-t').insertBefore(h('b', { class: 'tl-y' }, String(y) + ' · '), li.querySelector('.ro-t').firstChild); li.classList.add('ok'); li.classList.remove('no'); });
        VV2.sfx(right === ev.length ? 'win' : 'good'); fb(right === ev.length ? 'Spot on — history is in order!' : 'Here is the real order, with the years.', right === ev.length); ctx.done(right === ev.length ? Math.max(40, 100 - (tries - 1) * 20) : Math.round(right / ev.length * 100));
      } else { VV2.sfx('bad'); fb(right + ' of ' + ev.length + ' in place. Keep the green ones, move the rest.', false); }
    });
  };

  /* ---------- reflection ---------- */
  W.reflection = function (el, a, ctx) {
    var key = 'refl:' + ctx.id;
    prompt(el, a.prompt || 'Take a moment to reflect.');
    if (a.hint) el.appendChild(h('p', { class: 'muted rf-hint' }, '💭 ' + a.hint));
    var ta = h('textarea', { class: 'rf-ta', 'aria-label': 'Your private reflection', placeholder: 'Write freely. This stays on this device only.', maxlength: 4000 });
    ta.value = VV2.store.note(key) || '';
    var cnt = h('small', { class: 'muted' }), saved = h('small', { class: 'rf-saved', 'aria-live': 'polite' });
    el.appendChild(ta); el.appendChild(h('div', { class: 'row rf-row' }, [cnt, saved, h('button', { type: 'button', class: 'btn primary', onclick: save }, '💾 Save privately')]));
    el.appendChild(h('p', { class: 'muted small-note' }, '🔒 Private: saved only in this browser, never uploaded. Included in your data export.'));
    var t = 0;
    function upd() { cnt.textContent = ta.value.length + ' characters'; }
    function save() { VV2.store.note(key, ta.value); saved.textContent = '✓ Saved'; VV2.sfx('good'); if (ta.value.trim().length >= 10) { VV2.store.badge('reflect'); ctx.done(100); } else ctx.done(60); }
    ta.addEventListener('input', function () { upd(); clearTimeout(t); t = setTimeout(function () { VV2.store.note(key, ta.value); saved.textContent = 'Autosaved'; }, 900); });
    upd();
    return { destroy: function () { clearTimeout(t); if (ta.value) VV2.store.note(key, ta.value); } };
  };

  /* ---------- breathing ---------- */
  W.breathing = function (el, a, ctx) {
    var pat = (a.pattern || [4, 4, 4, 4]).map(function (x) { return Math.max(0, +x || 0); }), rounds = Math.max(1, +a.rounds || 3);
    if (!pat.some(function (x) { return x > 0; }) || pat.length !== 4) pat = [4, 4, 4, 4];
    var NAMES = ['Breathe in', 'Hold', 'Breathe out', 'Hold'], SC = [1.45, 1.45, 0.75, 0.75];
    prompt(el, a.label || a.prompt || 'Follow the circle.');
    var orb = h('div', { class: 'br-orb', 'aria-hidden': 'true' }, [h('i', { class: 'br-ring' }), h('i', { class: 'br-core' })]);
    var ph = h('p', { class: 'br-phase', 'aria-live': 'polite' }, 'Ready when you are');
    var num = h('p', { class: 'br-num', 'aria-hidden': 'true' }, '');
    var rd = h('p', { class: 'muted br-round' }, rounds + ' round' + (rounds > 1 ? 's' : '') + ' · ' + pat.join('-') + ' seconds');
    var go = h('button', { type: 'button', class: 'btn primary' }, '▶ Start');
    el.appendChild(h('div', { class: 'br-wrap' }, [orb, ph, num, rd, go]));
    var timer = 0, running = false, r = 0, p = 0, left = 0;
    function stop(msg) { running = false; clearTimeout(timer); go.textContent = '▶ Start'; ph.textContent = msg || 'Paused'; num.textContent = ''; orb.style.transitionDuration = '1s'; orb.style.transform = 'scale(1)'; orb.className = 'br-orb'; }
    function phase() {
      if (!running) return;
      while (pat[p] === 0) { p = (p + 1) % 4; if (p === 0) r++; }
      if (r >= rounds) { stop('Well done. Notice how you feel. 🌿'); VV2.sfx('win'); VV2.store.badge('calm'); ctx.done(100); return; }
      left = pat[p]; ph.textContent = NAMES[p]; orb.className = 'br-orb p' + p;
      if (!VV2.reduced) { orb.style.transitionDuration = pat[p] + 's'; orb.style.transform = 'scale(' + SC[p] + ')'; }
      rd.textContent = 'Round ' + (r + 1) + ' of ' + rounds;
      if (ctx.mode === 'tiny' || ctx.mode === 'kids' || VV2.audio.on) ctx.say(NAMES[p]);
      tick();
    }
    function tick() {
      if (!running) return; num.textContent = String(left);
      if (left <= 0) { p = (p + 1) % 4; if (p === 0) r++; phase(); return; }
      VV2.sfx('tick'); left--; timer = setTimeout(tick, 1000);
    }
    go.addEventListener('click', function () { if (running) { stop(); return; } running = true; r = 0; p = 0; go.textContent = '⏸ Pause'; phase(); });
    return { destroy: function () { running = false; clearTimeout(timer); } };
  };

  /* ---------- checklist ---------- */
  W.checklist = function (el, a, ctx) {
    var items = a.items || [], key = 'chk:' + ctx.id, got = VV2.store.checks(key).slice(), sent = false;
    prompt(el, a.prompt || 'Tick off each task as you do it — in real life!');
    var bar = h('div', { class: 'xpbar ck-bar', 'aria-hidden': 'true' }, h('i')); el.appendChild(bar);
    var cnt = h('p', { class: 'muted ck-count', 'aria-live': 'polite' }); el.appendChild(cnt);
    var list = h('ul', { class: 'ck-list' }); el.appendChild(list);
    items.forEach(function (t, i) {
      var id = 'ck' + (++VV2._id), cb = h('input', { type: 'checkbox', id: id }); cb.checked = got.indexOf(i) >= 0;
      var li = h('li', { class: cb.checked ? 'on' : '' }, h('label', { for: id }, [cb, h('span', null, typeof t === 'string' ? t : (t.text || ''))]));
      cb.addEventListener('change', function () { var k = got.indexOf(i); if (cb.checked && k < 0) got.push(i); if (!cb.checked && k >= 0) got.splice(k, 1); li.classList.toggle('on', cb.checked); VV2.sfx(cb.checked ? 'pop' : 'tap'); VV2.store.checks(key, got); upd(); });
      list.appendChild(li);
    });
    var fin = h('button', { type: 'button', class: 'btn ghost small' }, 'I’ll finish the rest later'); el.appendChild(fin);
    fin.addEventListener('click', function () { ctx.done(Math.round(got.length / Math.max(1, items.length) * 100)); });
    function upd() { var pct = Math.round(got.length / Math.max(1, items.length) * 100); bar.firstChild.style.width = pct + '%'; cnt.textContent = got.length + ' of ' + items.length + ' done'; if (pct === 100 && !sent) { sent = true; VV2.sfx('win'); ctx.done(100); } }
    upd();
  };

  /* ---------- faq (the questions people never ask aloud) ---------- */
  W.faq = function (el, a, ctx) {
    var items = a.items || [], opened = {}, sent = false;
    prompt(el, a.prompt || 'Questions people wonder about but rarely ask. Open any — nobody is watching.');
    el.appendChild(h('p', { class: 'faq-calm' }, '🕊️ Calm, factual answers. Read at your own pace.'));
    var filter = null;
    if (items.length > 4) { filter = h('input', { type: 'search', class: 'faq-f', placeholder: 'Filter questions…', 'aria-label': 'Filter questions' }); el.appendChild(filter); }
    var list = h('div', { class: 'faq-list' }); el.appendChild(list);
    var rows = items.map(function (it, i) {
      var pid = 'faq' + (++VV2._id);
      var q = h('button', { type: 'button', class: 'faq-q', 'aria-expanded': 'false', 'aria-controls': pid }, [h('span', { class: 'faq-n', 'aria-hidden': 'true' }, '?'), h('span', null, it.q), h('span', { class: 'faq-c', 'aria-hidden': 'true' }, '＋')]);
      var sayB = h('button', { type: 'button', class: 'btn small ghost', 'data-nosay': '' }, '🔊 Read aloud');
      var ans = h('div', { class: 'faq-a', id: pid, hidden: true }, [h('div', { html: VV2.md(it.a) }), sayB]);
      var row = h('div', { class: 'faq-item' }, [q, ans]);
      q.addEventListener('click', function () {
        var on = q.getAttribute('aria-expanded') !== 'true'; q.setAttribute('aria-expanded', on ? 'true' : 'false'); ans.hidden = !on; row.classList.toggle('open', on); VV2.sfx(on ? 'pop' : 'tap');
        if (on) { opened[i] = 1; if (ctx.mode === 'tiny') ctx.say(it.a); if (!sent && Object.keys(opened).length >= Math.ceil(items.length / 2)) { sent = true; ctx.done(100); } }
      });
      sayB.addEventListener('click', function () { ctx.say(it.q + '. ' + it.a); });
      list.appendChild(row); return { row: row, txt: VV2.norm(it.q + ' ' + it.a) };
    });
    if (filter) filter.addEventListener('input', function () { var v = VV2.norm(filter.value); rows.forEach(function (r) { r.row.hidden = !!v && r.txt.indexOf(v) < 0; }); });
    var rd = h('button', { type: 'button', class: 'btn small' }, '✓ I’ve read what I needed'); el.appendChild(rd);
    rd.addEventListener('click', function () { if (!sent) { sent = true; ctx.done(100); } else VV2.toast('Noted. Come back any time.', '🕊️'); });
    el.appendChild(h('p', { class: 'muted small-note' }, 'Still worried? Talk to a trusted adult, doctor or counsellor. India: 112 emergency · 1098 Childline · 14416 Tele-MANAS.'));
  };
})();

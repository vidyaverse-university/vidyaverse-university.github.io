/* VidyaVerse v2 — widgets A: tap-hear, count-tap, tap-reveal, flashcards, match-pairs, order-steps, sort-buckets, fill-blank, number-input */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var W = VV2.W = VV2.W || {};
  var Wh = VV2.Wh = VV2.Wh || {};
  var NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  Wh.prompt = function (el, text) { if (text) el.appendChild(h('p', { class: 'w-prompt' }, [h('span', { class: 'w-say', 'aria-hidden': 'true' }, ''), text])); };
  Wh.bounce = function (el) { el.classList.remove('boing'); void el.offsetWidth; el.classList.add('boing'); };
  Wh.norm = function (s) { return String(s == null ? '' : s).toLowerCase().replace(/[’']/g, "'").replace(/[.,!?;:]+$/g, '').replace(/\s+/g, ' ').trim(); };
  Wh.feedback = function (el) { var f = h('p', { class: 'w-fb', 'aria-live': 'polite' }); el.appendChild(f); return function (t, ok) { f.textContent = t; f.className = 'w-fb ' + (ok === true ? 'ok' : ok === false ? 'no' : ''); }; };

  /* reorderable list (pointer drag + buttons + keyboard) — shared with timeline */
  Wh.reorder = function (host, labels, onChange) {
    var list = h('ol', { class: 'reorder' });
    labels.forEach(function (lab) {
      var li = h('li', { class: 'ro-item', tabindex: '0', 'data-v': lab.v }, [h('span', { class: 'rd-h', 'aria-hidden': 'true', title: 'Drag' }, '⠿'), h('span', { class: 'ro-t' }, lab.html ? null : lab.t), h('span', { class: 'ro-b' }, [h('button', { type: 'button', class: 'icon-btn ro-up', 'aria-label': 'Move up' }, '▲'), h('button', { type: 'button', class: 'icon-btn ro-dn', 'aria-label': 'Move down' }, '▼')])]);
      if (lab.html) li.querySelector('.ro-t').innerHTML = lab.html;
      list.appendChild(li);
    });
    host.appendChild(list);
    function move(li, d) { var sib = d < 0 ? li.previousElementSibling : li.nextElementSibling; if (!sib) return; if (d < 0) list.insertBefore(li, sib); else list.insertBefore(sib, li); VV2.sfx('tick'); li.focus(); changed(); }
    function changed() { VV2.$$('.ro-item', list).forEach(function (x) { x.classList.remove('ok', 'no'); }); if (onChange) onChange(); }
    list.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var li = b.closest('li'); move(li, b.classList.contains('ro-up') ? -1 : 1); });
    list.addEventListener('keydown', function (e) { var li = e.target.closest && e.target.closest('.ro-item'); if (!li || e.target !== li) return; if (e.key === 'ArrowUp') { e.preventDefault(); move(li, -1); } else if (e.key === 'ArrowDown') { e.preventDefault(); move(li, 1); } });
    list.addEventListener('pointerdown', function (e) {
      var hd = e.target.closest('.rd-h'); if (!hd) return; var li = hd.closest('li'); e.preventDefault();
      li.classList.add('dragging'); try { hd.setPointerCapture(e.pointerId); } catch (x) { }
      function mv(ev) { var sibs = VV2.$$('.ro-item', list).filter(function (x) { return x !== li; }), placed = false; for (var i = 0; i < sibs.length; i++) { var r = sibs[i].getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { if (li.nextElementSibling !== sibs[i]) { list.insertBefore(li, sibs[i]); VV2.sfx('tick'); } placed = true; break; } } if (!placed && list.lastElementChild !== li) list.appendChild(li); }
      function up() { li.classList.remove('dragging'); hd.removeEventListener('pointermove', mv); hd.removeEventListener('pointerup', up); hd.removeEventListener('pointercancel', up); changed(); }
      hd.addEventListener('pointermove', mv); hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
    });
    return { list: list, order: function () { return VV2.$$('.ro-item', list).map(function (x) { return x.getAttribute('data-v'); }); }, items: function () { return VV2.$$('.ro-item', list); } };
  };

  /* ---------- tap-hear ---------- */
  W['tap-hear'] = function (el, a, ctx) {
    var items = a.items || [], seen = {};
    Wh.prompt(el, a.prompt || 'Tap each picture to hear it.');
    var g = h('div', { class: 'th-grid' }); el.appendChild(g);
    items.forEach(function (it, i) {
      var b = h('button', { type: 'button', class: 'th-tile', 'aria-label': it.word, 'data-nosay': '', style: { animationDelay: (i * 70) + 'ms' } }, [h('span', { class: 'th-e', 'aria-hidden': 'true' }, it.emoji || '⭐'), h('b', null, it.word || '')]);
      b.addEventListener('click', function () { Wh.bounce(b); b.classList.add('seen'); VV2.sfx('pop'); ctx.say(it.say || it.word); seen[i] = 1; VV2.store.update(function (p) { p.stats.taps = (p.stats.taps || 0) + 1; }); if (Object.keys(seen).length === items.length) ctx.done(100); });
      g.appendChild(b);
    });
  };

  /* ---------- count-tap ---------- */
  W['count-tap'] = function (el, a, ctx) {
    var n = VV2.clamp(+a.count || 3, 1, 20), got = 0;
    Wh.prompt(el, a.prompt || 'Tap each one and count!');
    var big = h('div', { class: 'ct-num', 'aria-live': 'polite' }, '0'); el.appendChild(big);
    var field = h('div', { class: 'ct-field' }); el.appendChild(field);
    var again = h('button', { type: 'button', class: 'btn small ghost', hidden: true }, '↻ Count again'); el.appendChild(again);
    function build() {
      field.innerHTML = ''; got = 0; big.textContent = '0'; again.hidden = true;
      for (var i = 0; i < n; i++) (function () {
        var b = h('button', { type: 'button', class: 'ct-item', 'aria-label': 'Count me', 'data-nosay': '', style: { transform: 'rotate(' + VV2.rnd(-14, 14) + 'deg) translateY(' + VV2.rnd(-8, 8) + 'px)' } }, [h('span', { 'aria-hidden': 'true' }, a.emoji || '🍎')]);
        b.addEventListener('click', function () {
          if (b.classList.contains('counted')) return; got++; b.classList.add('counted'); b.appendChild(h('i', { class: 'ct-badge' }, String(got))); b.setAttribute('aria-label', 'Counted ' + got);
          big.textContent = String(got); Wh.bounce(big); VV2.sfx(got === n ? 'win' : 'pop'); ctx.say(NUM[got] || String(got));
          if (got === n) { setTimeout(function () { ctx.say('That makes ' + (NUM[n] || n) + '!'); }, 700); ctx.done(100); again.hidden = false; }
        });
        field.appendChild(b);
      })();
    }
    again.addEventListener('click', build); build();
  };

  /* ---------- tap-reveal ---------- */
  W['tap-reveal'] = function (el, a, ctx) {
    var items = a.items || [], open = {};
    Wh.prompt(el, a.prompt || 'Tap a card to reveal what is on the other side.');
    var g = h('div', { class: 'tr-grid' }); el.appendChild(g);
    items.forEach(function (it, i) {
      var b = h('button', { type: 'button', class: 'flip', 'aria-pressed': 'false' }, h('span', { class: 'flip-in' }, [h('span', { class: 'flip-f' }, it.front), h('span', { class: 'flip-b' }, it.back)]));
      b.addEventListener('click', function () { var on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on ? 'true' : 'false'); VV2.sfx('whoosh'); if (on) { open[i] = 1; if (ctx.mode === 'tiny' || ctx.mode === 'kids') ctx.say(it.back); } if (Object.keys(open).length === items.length) ctx.done(100); });
      g.appendChild(b);
    });
  };

  /* ---------- flashcards ---------- */
  W.flashcards = function (el, a, ctx) {
    var cards = a.cards || [], i = 0, known = {}, seen = {}, flipped = false;
    Wh.prompt(el, a.prompt || 'Think of the answer, then flip. Be honest — nobody is watching.');
    var stage = h('div', { class: 'fc-stage' }); el.appendChild(stage);
    var card = h('button', { type: 'button', class: 'fc', 'aria-live': 'polite' }); stage.appendChild(card);
    var info = h('p', { class: 'fc-info muted' });
    var prev = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Previous card' }, '◀'), nxt = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Next card' }, '▶');
    var k = h('button', { type: 'button', class: 'btn small primary' }, '✓ I knew it'), ag = h('button', { type: 'button', class: 'btn small ghost' }, '↻ Again');
    el.appendChild(h('div', { class: 'row fc-ctrls' }, [prev, h('button', { type: 'button', class: 'btn small', onclick: flip }, '🔄 Flip'), nxt, k, ag])); el.appendChild(info);
    function draw() {
      var c = cards[i] || { front: '', back: '' }; card.classList.toggle('on', flipped);
      card.innerHTML = ''; card.appendChild(h('span', { class: 'fc-in' }, [h('span', { class: 'fc-f' }, c.front), h('span', { class: 'fc-b' }, c.back)]));
      card.setAttribute('aria-label', flipped ? 'Answer: ' + c.back : 'Question: ' + c.front + '. Press to flip.');
      info.textContent = 'Card ' + (i + 1) + ' of ' + cards.length + ' · known ' + Object.keys(known).length; prev.disabled = i === 0; nxt.disabled = i === cards.length - 1;
    }
    function flip() { flipped = !flipped; seen[i] = 1; VV2.sfx('whoosh'); draw(); if (flipped && (ctx.mode === 'tiny' || ctx.mode === 'kids')) ctx.say(cards[i].back); check(); }
    function go(d) { i = VV2.clamp(i + d, 0, cards.length - 1); flipped = false; draw(); }
    function check() { if (Object.keys(seen).length === cards.length) ctx.done(Math.round(Object.keys(known).length / cards.length * 100) || 50); }
    card.addEventListener('click', flip);
    prev.addEventListener('click', function () { go(-1); }); nxt.addEventListener('click', function () { go(1); });
    k.addEventListener('click', function () { known[i] = 1; seen[i] = 1; VV2.sfx('good'); check(); if (i < cards.length - 1) go(1); else draw(); });
    ag.addEventListener('click', function () { delete known[i]; seen[i] = 1; VV2.sfx('tap'); if (i < cards.length - 1) go(1); else draw(); });
    el.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { go(1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); } });
    draw();
  };

  /* ---------- match-pairs ---------- */
  W['match-pairs'] = function (el, a, ctx) {
    var pairs = a.pairs || [], sel = null, matched = 0, miss = 0;
    Wh.prompt(el, a.prompt || 'Match each item on the left with its partner.');
    var cols = h('div', { class: 'mp-cols' }), L = h('div', { class: 'mp-col', role: 'group', 'aria-label': 'Left items' }), R = h('div', { class: 'mp-col', role: 'group', 'aria-label': 'Right items' });
    cols.appendChild(L); cols.appendChild(R); el.appendChild(cols);
    var fb = Wh.feedback(el);
    function mk(txt, idx, side) { var b = h('button', { type: 'button', class: 'mp-i', 'data-i': idx, 'data-s': side, 'aria-pressed': 'false' }, String(txt)); b.addEventListener('click', function () { choose(b); }); return b; }
    pairs.forEach(function (p, i) { L.appendChild(mk(p[0], i, 'l')); });
    VV2.shuffleNot(pairs.map(function (p, i) { return i; })).forEach(function (i) { R.appendChild(mk(pairs[i][1], i, 'r')); });
    function choose(b) {
      if (b.classList.contains('done')) return;
      if (!sel || sel.getAttribute('data-s') === b.getAttribute('data-s')) { if (sel) sel.setAttribute('aria-pressed', 'false'); sel = b; b.setAttribute('aria-pressed', 'true'); VV2.sfx('tap'); return; }
      var x = sel; sel = null; x.setAttribute('aria-pressed', 'false');
      if (x.getAttribute('data-i') === b.getAttribute('data-i')) {
        matched++; var hue = (matched * 47) % 360;
        [x, b].forEach(function (y) { y.classList.add('done'); y.disabled = true; y.style.setProperty('--mh', hue); Wh.bounce(y); });
        VV2.sfx('good'); fb('✓ ' + pairs[+b.getAttribute('data-i')].join(' ↔ '), true);
        if (matched === pairs.length) { fb('All matched! ' + (miss ? miss + ' slip' + (miss > 1 ? 's' : '') + ' along the way.' : 'Not a single slip!'), true); ctx.done(Math.round(pairs.length / (pairs.length + miss) * 100)); }
      } else { miss++; [x, b].forEach(function (y) { y.classList.remove('shake'); void y.offsetWidth; y.classList.add('shake'); }); VV2.sfx('bad'); fb('Not a pair — try again.', false); }
    }
  };

  /* ---------- order-steps ---------- */
  W['order-steps'] = function (el, a, ctx) {
    var items = a.items || [], tries = 0;
    Wh.prompt(el, a.prompt || 'Put these in the right order. Drag ⠿, use ▲▼, or focus an item and press the arrow keys.');
    var labels = VV2.shuffleNot(items.map(function (t, i) { return { t: t, v: String(i) }; }));
    var ro = Wh.reorder(el, labels);
    var fb = Wh.feedback(el);
    var chk = h('button', { type: 'button', class: 'btn primary' }, '✓ Check order'), show = h('button', { type: 'button', class: 'btn ghost', hidden: true }, '👀 Show answer');
    el.appendChild(h('div', { class: 'row' }, [chk, show]));
    chk.addEventListener('click', function () {
      tries++; var ord = ro.order(), right = 0;
      ro.items().forEach(function (li, i) { var ok = ord[i] === String(i); li.classList.toggle('ok', ok); li.classList.toggle('no', !ok); if (ok) right++; });
      if (right === items.length) { VV2.sfx('win'); fb('Perfect order!', true); ctx.done(Math.max(40, 100 - (tries - 1) * 20)); }
      else { VV2.sfx('bad'); fb(right + ' of ' + items.length + ' in the right spot. Green ones are placed — move the others.', false); if (tries >= 2) show.hidden = false; }
    });
    show.addEventListener('click', function () { var lis = ro.items().slice().sort(function (x, y) { return +x.getAttribute('data-v') - +y.getAttribute('data-v'); }); lis.forEach(function (li) { ro.list.appendChild(li); li.classList.add('ok'); li.classList.remove('no'); }); fb('Here is the right order. Read it once, then try the next lesson!', null); ctx.done(30); });
  };

  /* ---------- sort-buckets ---------- */
  W['sort-buckets'] = function (el, a, ctx) {
    var buckets = a.buckets || [], items = a.items || [], selChip = null, tries = 0;
    Wh.prompt(el, a.prompt || 'Sort each card into the right group. Tap a card, then tap a group — or drag it.');
    var tray = h('div', { class: 'sb-tray', 'aria-label': 'Cards to sort' }); el.appendChild(tray);
    var bw = h('div', { class: 'sb-buckets' }); el.appendChild(bw);
    var bEls = buckets.map(function (b, i) { var z = h('div', { class: 'bucket', role: 'button', tabindex: '0', 'data-b': i, 'aria-label': 'Group: ' + b }, [h('b', null, b), h('div', { class: 'bk-in' })]); bw.appendChild(z); z.addEventListener('click', function (e) { if (e.target.closest('.chip')) return; if (selChip) place(selChip, z); }); z.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && selChip) { e.preventDefault(); place(selChip, z); } }); return z; });
    var fb = Wh.feedback(el);
    var chk = h('button', { type: 'button', class: 'btn primary', disabled: true }, '✓ Check'); el.appendChild(h('div', { class: 'row' }, chk));
    VV2.shuffle(items.map(function (it, i) { return i; })).forEach(function (i) {
      var c = h('button', { type: 'button', class: 'chip', 'data-i': i, 'aria-pressed': 'false' }, items[i].text); tray.appendChild(c); drag(c);
    });
    function select(c) { if (selChip) selChip.setAttribute('aria-pressed', 'false'); selChip = selChip === c ? null : c; if (selChip) { c.setAttribute('aria-pressed', 'true'); VV2.sfx('tap'); } }
    function place(c, z) { c.classList.remove('ok', 'no'); z.querySelector('.bk-in').appendChild(c); c.setAttribute('aria-pressed', 'false'); selChip = null; VV2.sfx('pop'); Wh.bounce(z); upd(); }
    function upd() { chk.disabled = tray.children.length > 0; }
    function drag(c) {
      var sx, sy, moving = false;
      c.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; moving = false; try { c.setPointerCapture(e.pointerId); } catch (x) { } });
      c.addEventListener('pointermove', function (e) {
        if (sx == null) return; var dx = e.clientX - sx, dy = e.clientY - sy;
        if (!moving && Math.abs(dx) + Math.abs(dy) > 8) { moving = true; c.classList.add('dragging'); }
        if (moving) c.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(3deg)';
      });
      function end(e) {
        if (sx == null) return; var wasMoving = moving; sx = null; moving = false; c.classList.remove('dragging'); c.style.transform = '';
        if (wasMoving) { c.style.visibility = 'hidden'; var t = document.elementFromPoint(e.clientX, e.clientY); c.style.visibility = ''; var z = t && t.closest && t.closest('.bucket'); if (z && bw.contains(z)) place(c, z); else if (t && t.closest && t.closest('.sb-tray')) { tray.appendChild(c); upd(); } c._skip = true; setTimeout(function () { c._skip = false; }, 50); }
      }
      c.addEventListener('pointerup', end); c.addEventListener('pointercancel', function () { sx = null; moving = false; c.classList.remove('dragging'); c.style.transform = ''; });
      c.addEventListener('click', function () { if (c._skip) return; if (c.parentNode !== tray) { tray.appendChild(c); c.classList.remove('ok', 'no'); upd(); VV2.sfx('tap'); return; } select(c); });
    }
    chk.addEventListener('click', function () {
      tries++; var right = 0;
      bEls.forEach(function (z, bi) { VV2.$$('.chip', z).forEach(function (c) { var ok = items[+c.getAttribute('data-i')].bucket === bi; c.classList.toggle('ok', ok); c.classList.toggle('no', !ok); if (ok) right++; }); });
      if (right === items.length) { VV2.sfx('win'); fb('Everything is in the right group!', true); ctx.done(Math.max(40, 100 - (tries - 1) * 20)); }
      else {
        VV2.sfx('bad'); fb(right + ' of ' + items.length + ' correct. The red cards hop back to the tray — try again.', false);
        setTimeout(function () { VV2.$$('.chip.no', bw).forEach(function (c) { c.classList.remove('no'); tray.appendChild(c); }); upd(); if (tries >= 3) { fb('Tip: read the group names out loud, then each card. Correct ones stay in place.', null); ctx.done(Math.round(right / items.length * 100)); } }, 1100);
      }
    });
  };

  /* ---------- fill-blank ---------- */
  W['fill-blank'] = function (el, a, ctx) {
    var parts = String(a.text || '').split('___'), answers = a.answers || [], tries = 0, inputs = [];
    Wh.prompt(el, a.prompt || 'Fill in the blanks.');
    var p = h('p', { class: 'fb-text' }); el.appendChild(p);
    parts.forEach(function (t, i) {
      p.appendChild(document.createTextNode(t));
      if (i < parts.length - 1) { var ans = String(answers[i] || ''), len = Math.max.apply(null, ans.split('|').map(function (x) { return x.length; }).concat([3])); var inp = h('input', { type: 'text', class: 'fb-in', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Blank ' + (i + 1), style: { width: Math.min(16, len + 2) + 'ch' } }); inputs.push(inp); p.appendChild(inp); }
    });
    var fb = Wh.feedback(el);
    var chk = h('button', { type: 'button', class: 'btn primary' }, '✓ Check'), show = h('button', { type: 'button', class: 'btn ghost', hidden: true }, '👀 Show answers');
    el.appendChild(h('div', { class: 'row' }, [chk, show]));
    function check() {
      tries++; var right = 0;
      inputs.forEach(function (inp, i) { var alts = String(answers[i] || '').split('|').map(Wh.norm), ok = alts.indexOf(Wh.norm(inp.value)) >= 0; inp.classList.toggle('ok', ok); inp.classList.toggle('no', !ok); if (ok) right++; });
      if (right === inputs.length) { VV2.sfx('win'); fb('All correct!', true); ctx.done(Math.max(40, 100 - (tries - 1) * 25)); }
      else { VV2.sfx('bad'); fb(right + ' of ' + inputs.length + ' correct. Check spelling — capitals do not matter.', false); if (tries >= 2) show.hidden = false; }
    }
    chk.addEventListener('click', check);
    inputs.forEach(function (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } }); });
    show.addEventListener('click', function () { inputs.forEach(function (inp, i) { inp.value = String(answers[i] || '').split('|')[0]; inp.classList.add('ok'); inp.classList.remove('no'); }); fb('Answers shown. Read the sentence once more out loud.', null); ctx.done(30); });
  };

  /* ---------- number-input ---------- */
  W['number-input'] = function (el, a, ctx) {
    var tries = 0, ans = +a.answer, tol = Math.abs(+a.tolerance || 0);
    Wh.prompt(el, a.prompt || 'Work it out and type your answer.');
    var inp = h('input', { type: 'text', inputmode: 'decimal', class: 'ni-in', autocomplete: 'off', 'aria-label': 'Your answer' + (a.unit ? ' in ' + a.unit : '') });
    var chk = h('button', { type: 'button', class: 'btn primary' }, '✓ Check');
    el.appendChild(h('div', { class: 'ni-row' }, [inp, a.unit ? h('span', { class: 'ni-unit' }, a.unit) : null, chk]));
    var fb = Wh.feedback(el);
    function check() {
      var v = parseFloat(String(inp.value).replace(/[, ₹]/g, '')); if (isNaN(v)) { fb('Please type a number.', false); return; }
      tries++;
      if (Math.abs(v - ans) <= tol + 1e-9) { inp.classList.add('ok'); inp.classList.remove('no'); VV2.sfx('win'); fb('Correct! ' + ans + (a.unit ? ' ' + a.unit : '') + (tol ? ' (±' + tol + ')' : ''), true); ctx.done(tries === 1 ? 100 : tries === 2 ? 70 : 40); }
      else { inp.classList.add('no'); VV2.sfx('bad'); fb(tries >= 3 ? 'The answer is ' + ans + (a.unit ? ' ' + a.unit : '') + '. Check each step of your working.' : (v < ans ? 'A bit low' : 'A bit high') + ' — try again.', false); if (tries >= 3) ctx.done(20); }
    }
    chk.addEventListener('click', check); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  };
})();

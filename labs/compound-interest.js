/* VidyaVerse University v2 — Lab: Compound Interest (plain script, self-contained) */
(function () {
'use strict';
var ID = 'compound-interest', P = '.vv-' + ID;
var BASE = "§{--a:#7c5cff;--a2:#22d3ee;--tx:#eef1ff;--mu:#aab3d9;--ok:#34d399;--bad:#fb7185;--warn:#fbbf24;display:block;position:relative;font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial,sans-serif;font-size:clamp(14px,0.45vw + 11px,20px);line-height:1.45;color:var(--tx);background:radial-gradient(circle at 8% 0%,rgba(124,92,255,.28),transparent 46%),radial-gradient(circle at 100% 100%,rgba(34,211,238,.18),transparent 52%),linear-gradient(160deg,#0c1130,#121a44 60%,#0b1029);border-radius:22px;padding:clamp(10px,2.4vw,24px);padding-left:max(clamp(10px,2.4vw,24px),env(safe-area-inset-left));padding-right:max(clamp(10px,2.4vw,24px),env(safe-area-inset-right));box-sizing:border-box;max-width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.08)}" +
"§ *{box-sizing:border-box}§ [hidden]{display:none!important}" +
"§ .hd{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}" +
"§ .ttl{display:flex;gap:12px;align-items:center;min-width:0;flex:1 1 260px}" +
"§ .ic{font-size:1.9em;flex:0 0 auto;width:1.8em;height:1.8em;display:grid;place-items:center;border-radius:18px;background:linear-gradient(135deg,var(--a),var(--a2));box-shadow:0 10px 26px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.4)}" +
"§ h2{margin:0;font-size:1.35em;letter-spacing:.2px;line-height:1.2}§ h3{margin:0 0 8px;font-size:1em;color:var(--a2)}" +
"§ .goal{margin:3px 0 0;color:var(--mu);font-size:.92em}" +
"§ .tabs{display:flex;gap:6px;flex-wrap:wrap}" +
"§ .btn{appearance:none;-webkit-appearance:none;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:var(--tx);border-radius:12px;min-height:44px;min-width:44px;padding:8px 14px;font:inherit;font-weight:600;cursor:pointer;transition:transform .15s,background .2s,box-shadow .2s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}" +
"§ .btn:hover{background:rgba(255,255,255,.14)}§ .btn:focus-visible{outline:3px solid var(--a2);outline-offset:2px}§ .btn:active{transform:scale(.95)}" +
"§ .btn.on,§ .btn.pri{background:linear-gradient(135deg,var(--a),var(--a2));border-color:transparent;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3)}" +
"§ .btn:disabled{opacity:.45;cursor:not-allowed}" +
"§ .how{margin:12px 0 0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:4px 14px}" +
"§ .how summary{cursor:pointer;min-height:44px;display:flex;align-items:center;font-weight:600}§ .howb{padding:0 0 10px;color:#d7dcf5}§ .howb p{margin:.4em 0}§ .howb ul{margin:.3em 0;padding-left:1.2em}" +
"§ .tasks{margin:12px 0 0;padding:12px 14px;border-radius:16px;background:linear-gradient(135deg,rgba(124,92,255,.2),rgba(34,211,238,.1));border:1px solid rgba(255,255,255,.14)}" +
"§ .tlist{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 8px;padding:0;list-style:none}" +
"§ .tlist li{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:.8em;font-weight:700;background:rgba(255,255,255,.1);transition:background .3s,transform .3s}" +
"§ .tlist li.cur{background:var(--a);box-shadow:0 0 0 4px rgba(124,92,255,.3);transform:scale(1.08)}§ .tlist li.ok{background:var(--ok);color:#05291b}" +
"§ .tq{font-weight:700}§ .tt{margin:4px 0 0;color:#d5dbf7}§ .tb{margin-top:8px}" +
"§ .ask{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;align-items:center}§ .ask:empty{display:none}" +
"§ input[type=number],§ input[type=text],§ textarea,§ select{min-height:44px;border-radius:10px;border:1px solid rgba(255,255,255,.22);background:rgba(0,0,0,.28);color:var(--tx);padding:6px 10px;font:inherit;max-width:100%}" +
"§ .ask input{width:9em}§ select option{background:#141b46;color:#eef1ff}" +
"§ .body{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin-top:12px}" +
"@media (min-width:860px){§ .body{grid-template-columns:minmax(0,1.7fr) minmax(270px,1fr)}}" +
"§ .stage{position:relative;border-radius:18px;overflow:hidden;background:#060a1f;border:1px solid rgba(255,255,255,.1);min-width:0;box-shadow:inset 0 0 40px rgba(0,0,0,.5)}" +
"§ canvas{display:block;width:100%;touch-action:none;-webkit-user-select:none;user-select:none}§ canvas.main{aspect-ratio:16/11;min-height:240px;max-height:72vh;max-height:72dvh}" +
"§ .side{display:flex;flex-direction:column;gap:10px;min-width:0}" +
"§ .card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:12px}" +
"§ .sl{display:block;margin:4px 0 8px}§ .slt{display:flex;justify-content:space-between;gap:8px;font-size:.9em;color:var(--mu)}§ .slv{color:var(--tx);font-variant-numeric:tabular-nums;white-space:nowrap}" +
"§ input[type=range]{width:100%;height:44px;accent-color:var(--a2);margin:0;cursor:pointer;background:transparent}" +
"§ .ro{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px}§ .ro div{background:rgba(0,0,0,.24);border-radius:10px;padding:7px 10px;min-width:0}" +
"§ .ro span{display:block;font-size:.72em;color:var(--mu);text-transform:uppercase;letter-spacing:.06em}§ .ro b{font-size:1.05em;font-variant-numeric:tabular-nums;word-break:break-word}" +
"§ .fb{min-height:2.2em;margin-top:12px;padding:9px 14px;border-radius:12px;background:rgba(0,0,0,.26);transition:background .3s}§ .fb.good{background:rgba(52,211,153,.2)}§ .fb.bad{background:rgba(251,113,133,.2)}" +
"§ .note{font-size:.8em;color:var(--mu);margin:10px 0 0}§ .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}" +
"§.free .tasks{display:none}" +
"@media (prefers-reduced-motion:reduce){§ *{transition:none!important;animation:none!important}}";
var EXTRA = "§{--a:#d97706;--a2:#facc15}§ .fq{display:flex;flex-wrap:wrap;gap:6px}§ .fq .btn{padding:6px 10px;font-size:.85em}§ canvas.main{cursor:crosshair}§ canvas.main:focus-visible{outline:3px solid var(--a2);outline-offset:-3px}";

function inject() { if (document.getElementById('vvcss-' + ID)) return; var s = document.createElement('style'); s.id = 'vvcss-' + ID; s.textContent = (BASE + EXTRA).split('§').join(P); (document.head || document.documentElement).appendChild(s); }

function kit(el, api) {
  api = api || {};
  var K = { subs: [], timers: [], ros: [], cleanup: [], raf: 0, alive: true, rm: !!api.reducedMotion, lp: !!api.lowPower, mode: 'guided' };
  if (!K.rm && window.matchMedia) { try { K.rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {} }
  K.on = function (t, ev, fn, o) { t.addEventListener(ev, fn, o || false); K.subs.push([t, ev, fn, o || false]); return fn; };
  K.h = function (tag, cls, html, at) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (at) for (var k in at) e.setAttribute(k, at[k]); return e; };
  K.snd = function (n) { try { if (api.sound) api.sound(n); } catch (e) {} };
  K.say = function (t) { try { if (api.say) api.say(t); } catch (e) {} };
  K.award = function (x, r) { try { if (api.award) api.award(x, r); } catch (e) {} };
  K.done = function (p) { try { if (api.done) api.done(p); } catch (e) {} };
  K.later = function (f, ms) { var id = setTimeout(function () { if (K.alive) f(); }, ms); K.timers.push(id); return id; };
  K.every = function (f, ms) { var id = setInterval(function () { if (K.alive) f(); }, ms); K.timers.push(id); return id; };
  K.loop = function (fn) { var last = 0; cancelAnimationFrame(K.raf); function f(t) { if (!K.alive) return; var dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016; last = t; fn(dt, t); K.raf = requestAnimationFrame(f); } K.raf = requestAnimationFrame(f); };
  K.canvas = function (c, onSize) {
    var g = c.getContext('2d');
    function fit() { var r = c.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1); var w = Math.max(1, Math.round(r.width)), hh = Math.max(1, Math.round(r.height)); if (c.width !== Math.round(w * d) || c.height !== Math.round(hh * d)) { c.width = Math.round(w * d); c.height = Math.round(hh * d); } g.setTransform(d, 0, 0, d, 0, 0); c.W = w; c.H = hh; if (onSize) onSize(w, hh); }
    if (window.ResizeObserver) { var ro = new ResizeObserver(function () { fit(); }); ro.observe(c); K.ros.push(ro); } else K.on(window, 'resize', fit);
    fit(); return g;
  };
  K.pos = function (e, c) { var r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  K.btn = function (parent, label, cls, fn) { var b = K.h('button', 'btn ' + (cls || ''), label, { type: 'button' }); K.on(b, 'click', function (e) { K.snd('tap'); fn(e); }); if (parent) parent.appendChild(b); return b; };
  K.slider = function (parent, o) {
    var w = K.h('label', 'sl'), top = K.h('span', 'slt'), val = K.h('b', 'slv');
    top.appendChild(K.h('span', '', o.label)); top.appendChild(val);
    var inp = K.h('input', '', null, { type: 'range', min: o.min, max: o.max, step: o.step || 1 }); inp.value = o.value;
    w.appendChild(top); w.appendChild(inp); parent.appendChild(w);
    function show() { var v = +inp.value; val.textContent = (o.fmt ? o.fmt(v) : v) + (o.unit ? ' ' + o.unit : ''); }
    K.on(inp, 'input', function () { show(); if (o.on) o.on(+inp.value); });
    show();
    return { el: w, input: inp, get: function () { return +inp.value; }, set: function (v) { inp.value = v; show(); if (o.on) o.on(+inp.value); } };
  };
  K.fb = function (m, k) { if (!K.fbEl) return; K.fbEl.textContent = m; K.fbEl.className = 'fb ' + (k || ''); };
  K.ro = function (parent, items) { var box = K.h('div', 'ro'), map = {}; items.forEach(function (it) { var d = K.h('div', '', '<span>' + it[1] + '</span><b>–</b>'); box.appendChild(d); map[it[0]] = d.querySelector('b'); }); parent.appendChild(box); return function (k, v) { v = String(v); if (map[k] && map[k].textContent !== v) map[k].textContent = v; }; };
  K.card = function (title, parent) { var c = K.h('div', 'card', title ? '<h3>' + title + '</h3>' : ''); (parent || K.side).appendChild(c); return c; };
  K.shell = function (o) {
    var r = K.h('div', 'vv-' + ID + ' vvx');
    r.innerHTML = '<header class="hd"><div class="ttl"><span class="ic" aria-hidden="true">' + o.icon + '</span><div><h2>' + o.title + '</h2><p class="goal">' + o.goal + '</p></div></div><div class="tabs" role="group" aria-label="Mode"><button type="button" class="btn on" data-m="guided" aria-pressed="true">🎯 Guided</button><button type="button" class="btn" data-m="free" aria-pressed="false">🧪 Free play</button><button type="button" class="btn" data-m="reset">↺ Reset</button></div></header>' +
      '<details class="how"><summary>📘 How to use &amp; the science</summary><div class="howb">' + o.how + '</div></details>' +
      '<section class="tasks"><ol class="tlist" aria-label="Task progress"></ol><div class="tq"></div><div class="tt"></div><div class="ask"></div><div class="row tb"><button type="button" class="btn hint">💡 Hint</button><button type="button" class="btn skip">Skip ⏭</button></div></section>' +
      '<div class="body"><div class="stage"></div><div class="side"></div></div><div class="fb" role="status" aria-live="polite"></div><p class="note">' + o.note + '</p>';
    el.appendChild(r); K.root = r; K.stage = r.querySelector('.stage'); K.side = r.querySelector('.side'); K.fbEl = r.querySelector('.fb');
    var tabs = r.querySelectorAll('.tabs .btn');
    K.setMode = function (m) { K.mode = m; r.classList.toggle('free', m === 'free'); for (var i = 0; i < tabs.length; i++) { var d = tabs[i].getAttribute('data-m'); if (d !== 'reset') { tabs[i].classList.toggle('on', d === m); tabs[i].setAttribute('aria-pressed', d === m ? 'true' : 'false'); } } if (o.onMode) o.onMode(m); if (K.T) { K.T.mode = m; K.T.render(); } };
    for (var i = 0; i < tabs.length; i++) K.on(tabs[i], 'click', function (e) { var m = e.currentTarget.getAttribute('data-m'); K.snd('tap'); if (m === 'reset') { if (o.onReset) o.onReset(); if (K.T) K.T.reset(); K.fb('↺ Reset — fresh start!', ''); } else K.setMode(m); });
    return r;
  };
  K.tasks = function (list) {
    var r = K.root, T = { i: 0, hints: 0, wrong: 0, mode: K.mode };
    var ol = r.querySelector('.tlist'), q = r.querySelector('.tq'), tt = r.querySelector('.tt'), ask = r.querySelector('.ask'), hb = r.querySelector('.hint'), sk = r.querySelector('.skip');
    function finish(msg) { var sc = Math.max(40, Math.round(100 - 8 * T.hints - 4 * T.wrong)); K.done(sc); K.later(function () { K.snd('win'); }, 350); K.fb('🏆 All tasks complete — score ' + sc + '%. ' + (msg || ''), 'good'); K.say('All tasks complete. Well done!'); }
    function advance(msg) { T.i++; if (T.i >= list.length) finish(msg); T.render(); }
    function judge(ok) { if (ok) T.pass(); else { T.wrong++; K.snd('bad'); K.fb('Not quite. ' + (list[T.i].hint || 'Try again!'), 'bad'); } }
    function build(a) {
      if (a.options) a.options.forEach(function (op, k) { K.btn(ask, op, '', function () { judge(k === a.answer); }); });
      else { var inp = K.h('input', '', null, { type: 'number', step: 'any', inputmode: 'decimal', 'aria-label': 'Your answer' }); ask.appendChild(inp); if (a.unit) ask.appendChild(K.h('span', '', a.unit)); var go = K.btn(ask, 'Check', 'pri', function () { var v = parseFloat(String(inp.value).replace(',', '.')); judge(isFinite(v) && Math.abs(v - a.answer) <= a.tol); }); K.on(inp, 'keydown', function (e) { if (e.key === 'Enter') go.click(); }); }
    }
    T.render = function () {
      ol.innerHTML = '';
      for (var j = 0; j < list.length; j++) { var li = K.h('li', j < T.i ? 'ok' : (j === T.i ? 'cur' : ''), j < T.i ? '✓' : String(j + 1)); li.title = list[j].title; ol.appendChild(li); }
      ask.innerHTML = '';
      if (T.i >= list.length) { q.textContent = '🏆 All tasks complete!'; tt.textContent = 'Explore more in Free play, or press Reset to try again.'; hb.hidden = true; sk.hidden = true; return; }
      hb.hidden = false; sk.hidden = false;
      var t = list[T.i]; q.textContent = 'Task ' + (T.i + 1) + '/' + list.length + ' · ' + t.title; tt.innerHTML = t.text;
      if (t.ask) build(t.ask);
      if (T.mode === 'guided' && t.start) t.start();
    };
    T.pass = function () { if (T.mode !== 'guided' || T.i >= list.length) return; var t = list[T.i]; K.award(t.xp || 10, t.title); K.snd('good'); K.fb('✅ ' + (t.good || 'Task complete!'), 'good'); K.say(t.good || 'Task complete'); advance(t.good); };
    T.check = function () { if (T.mode !== 'guided' || T.i >= list.length) return; var t = list[T.i], ok = false; if (t.check) { try { ok = t.check(); } catch (e) { ok = false; } if (ok) T.pass(); } };
    T.cur = function () { return (T.mode === 'guided' && T.i < list.length) ? list[T.i] : null; };
    T.reset = function () { T.i = 0; T.hints = 0; T.wrong = 0; T.render(); };
    K.on(hb, 'click', function () { var t = list[T.i]; if (!t) return; T.hints++; K.snd('pop'); K.fb('💡 ' + t.hint, ''); K.say(t.hint); });
    K.on(sk, 'click', function () { if (T.i >= list.length) return; T.hints += 2; K.snd('whoosh'); K.fb('Skipped. Press Reset any time to try every task again.', ''); advance(); });
    K.T = T; T.render(); K.every(T.check, 300);
    return T;
  };
  K.destroy = function () { if (!K.alive) return; K.alive = false; cancelAnimationFrame(K.raf); K.timers.forEach(function (i) { clearTimeout(i); clearInterval(i); }); K.subs.forEach(function (s) { try { s[0].removeEventListener(s[1], s[2], s[3]); } catch (e) {} }); K.ros.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); K.cleanup.forEach(function (f) { try { f(); } catch (e) {} }); el.innerHTML = ''; };
  return K;
}

function INR(n) { var a = Math.abs(n), s = n < 0 ? '−₹' : '₹'; if (a >= 1e7) return s + (a / 1e7).toFixed(2) + ' Cr'; if (a >= 1e5) return s + (a / 1e5).toFixed(2) + ' L'; return s + Math.round(a).toLocaleString('en-IN'); }
function short(n) { var a = Math.abs(n); if (a >= 1e7) return (a / 1e7).toFixed(a >= 1e8 ? 0 : 1) + 'Cr'; if (a >= 1e5) return (a / 1e5).toFixed(a >= 1e6 ? 0 : 1) + 'L'; if (a >= 1e3) return Math.round(a / 1e3) + 'k'; return String(Math.round(a)); }
var FREQ = [['Yearly', 1], ['Half-yearly', 2], ['Quarterly', 4], ['Monthly', 12], ['Daily', 365], ['Continuous', 0]];

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Compound Interest Lab', icon: '📈', faculty: 'life', bands: ['secondary', 'senior', 'ug', 'pro'],
  summary: 'See money grow: compare compound and simple interest, compounding frequency, SIPs, the Rule of 72 and the bite of inflation on a live growth chart.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = { P: 10000, C: 0, r: 8, y: 20, n: 1, inf: 0 }, data = null, dirty = true, anim = 1, hov = -1;
    K.shell({
      icon: '📈', title: 'Compound Interest Lab',
      goal: 'Discover why “interest on interest” is the most powerful idea in personal finance.',
      how: '<p><b>Compound interest</b> adds each period’s interest to the balance, so next period you earn interest on interest:</p><ul><li>Lump sum: <b>A = P(1 + r/n)<sup>nt</sup></b> (n = compounding periods per year; continuous: A = Pe<sup>rt</sup>)</li><li><b>Simple interest</b> only pays on the original sum: A = P(1 + rt)</li><li><b>Effective annual rate</b> EAR = (1 + r/n)<sup>n</sup> − 1</li><li><b>Monthly SIP</b> of C (paid at the end of each month, monthly rate i): FV = C·((1 + i)<sup>N</sup> − 1)/i, N = months</li><li><b>Rule of 72:</b> doubling time ≈ 72 ÷ rate%. Exact: ln 2 ÷ ln(1 + EAR)</li><li><b>Real value</b> in today’s money = A ÷ (1 + inflation)<sup>t</sup></li></ul><p>Drag or tap across the chart (or focus it and use ← →) to read any year.</p>',
      note: 'Simplified: a constant rate every year, no taxes, fees or market ups and downs. Real investments vary; equity returns are not guaranteed. Educational, not financial advice.',
      onMode: function () { dirty = true; },
      onReset: function () { setAll({ P: 10000, C: 0, r: 8, y: 20, n: 1, inf: 0 }); }
    });
    var cv = K.h('canvas', 'main', null, { tabindex: '0', role: 'img', 'aria-label': 'Growth chart. Use left and right arrow keys to read values by year.' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var rc = K.card('💰 Results');
    var setRo = K.ro(rc, [['A', 'Final value'], ['in', 'You put in'], ['int', 'Interest earned'], ['si', 'Simple-interest value'], ['ear', 'Effective annual rate'], ['dbl', 'Doubling time'], ['r72', 'Rule of 72 says'], ['real', 'Real value (today’s ₹)']]);
    var ic = K.card('🎛️ Inputs');
    var sl = {};
    sl.P = K.slider(ic, { label: 'Lump sum (P)', min: 0, max: 1000000, step: 1000, value: S.P, fmt: INR, on: function (v) { S.P = v; changed(); } });
    sl.C = K.slider(ic, { label: 'Monthly SIP (C)', min: 0, max: 100000, step: 100, value: S.C, fmt: INR, on: function (v) { S.C = v; changed(); } });
    sl.r = K.slider(ic, { label: 'Annual rate (r)', min: 0, max: 20, step: 0.1, value: S.r, fmt: function (v) { return v.toFixed(1) + '%'; }, on: function (v) { S.r = v; changed(); } });
    sl.y = K.slider(ic, { label: 'Years (t)', min: 1, max: 50, step: 1, value: S.y, unit: 'yr', on: function (v) { S.y = v; hov = -1; changed(); } });
    sl.inf = K.slider(ic, { label: 'Inflation', min: 0, max: 10, step: 0.5, value: S.inf, fmt: function (v) { return v.toFixed(1) + '%'; }, on: function (v) { S.inf = v; changed(); } });
    var fc = K.card('🔁 Compounding'), fq = K.h('div', 'fq', null, { role: 'group', 'aria-label': 'Compounding frequency' }); fc.appendChild(fq);
    var fb = FREQ.map(function (f) { return K.btn(fq, f[0], '', function () { S.n = f[1]; freqUI(); changed(); }); });
    function freqUI() { FREQ.forEach(function (f, i) { fb[i].classList.toggle('on', f[1] === S.n); fb[i].setAttribute('aria-pressed', f[1] === S.n ? 'true' : 'false'); }); }
    freqUI();
    function setAll(o) { for (var k in o) { S[k] = o[k]; if (sl[k]) sl[k].set(o[k]); } freqUI(); changed(); }

    function ear() { var r = S.r / 100; return S.n === 0 ? Math.exp(r) - 1 : Math.pow(1 + r / S.n, S.n) - 1; }
    function compute() {
      var r = S.r / 100, e = ear(), im = Math.pow(1 + e, 1 / 12) - 1, rows = [];
      for (var t = 0; t <= S.y; t++) {
        var lump = S.P * Math.pow(1 + e, t), N = 12 * t, sip = im > 0 ? S.C * (Math.pow(1 + im, N) - 1) / im : S.C * N;
        var put = S.P + S.C * N, si = S.P * (1 + r * t) + S.C * (N + r * N * (N - 1) / 24);
        rows.push({ t: t, A: lump + sip, put: put, si: si, real: (lump + sip) / Math.pow(1 + S.inf / 100, t) });
      }
      return rows;
    }
    function changed() { data = compute(); anim = K.rm ? 1 : 0; dirty = true; }
    changed();
    function fin() { return data[data.length - 1]; }

    K.tasks([
      { title: 'How long to double?', text: '₹10,000 at <b>8% a year</b>, compounded yearly. Watch the chart: after how many years is it worth ₹20,000? Type your answer (to the nearest half-year).', ask: { answer: 9, tol: 0.5, unit: 'years' }, hint: 'Drag across the chart to find where the gold line reaches ₹20,000 — or use the Rule of 72: 72 ÷ 8.', good: 'About 9 years. Rule of 72 gives 72 ÷ 8 = 9; the exact answer is ln 2 ÷ ln 1.08 ≈ 9.01 years.', xp: 15,
        start: function () { setAll({ P: 10000, C: 0, r: 8, y: 20, n: 1, inf: 0 }); } },
      { title: 'Squeeze the frequency', text: 'Set the rate to <b>12%</b>. Try different compounding buttons and find one that pushes the <b>effective annual rate above 12.7%</b>.', hint: 'Monthly gives 12.68%. Go more often than monthly.', good: 'Daily gives 12.747% and continuous 12.750% (= e^0.12 − 1). More frequent compounding helps, but with diminishing returns.', xp: 15,
        start: function () { setAll({ P: 100000, C: 0, r: 12, y: 10, n: 1, inf: 0 }); }, check: function () { return Math.abs(S.r - 12) < 0.05 && ear() > 0.127; } },
      { title: 'Crorepati by 60', text: 'Aarav is 25. He invests a monthly <b>SIP</b> for <b>35 years</b> at 12% (monthly compounding). Find the <b>smallest SIP (₹2,000 or less)</b> that reaches <b>₹1 crore</b>.', hint: 'Keep Years = 35, rate = 12%, lump sum ₹0. Slide the SIP up from ₹1,000 — the answer is between ₹1,500 and ₹2,000.', good: 'About ₹1,560 a month is enough! Over 35 years he puts in only ≈ ₹6.5 lakh — the rest is compounding.', xp: 25,
        start: function () { setAll({ P: 0, C: 1000, r: 12, y: 35, n: 12, inf: 0 }); }, check: function () { return S.y === 35 && Math.abs(S.r - 12) < 0.05 && S.C <= 2000 && fin().A >= 1e7; } },
      { title: 'The cost of waiting', text: 'Now Aarav starts at 35 — only <b>25 years</b> to 60. Same 12%. Find a SIP of <b>₹5,500 or less</b> that still reaches ₹1 crore.', hint: 'Set Years to 25, then raise the SIP. The answer is a little above ₹5,300.', good: 'About ₹5,330 a month — waiting 10 years makes the monthly cost about 3.4× higher. Time is the strongest ingredient.', xp: 25,
        start: function () { setAll({ P: 0, C: 2000, r: 12, y: 25, n: 12, inf: 0 }); }, check: function () { return S.y === 25 && Math.abs(S.r - 12) < 0.05 && S.C <= 5500 && fin().A >= 1e7; } },
      { title: 'Inflation reality check', text: 'With prices rising <b>6% a year</b>, what is ₹1 crore received 35 years from now worth in <b>today’s</b> money? (Try the Inflation slider.)', ask: { options: ['₹1 crore', '₹50 lakh', 'About ₹13 lakh', 'About ₹2 lakh'], answer: 2 }, hint: 'Real value = 1,00,00,000 ÷ 1.06^35, and 1.06^35 ≈ 7.7.', good: 'About ₹13 lakh. Always compare your goal with inflation — what matters is the real return (≈ nominal − inflation).', xp: 20,
        start: function () { setAll({ P: 0, C: 1600, r: 12, y: 35, n: 12, inf: 6 }); } }
    ]);

    function geom() { var W = cv.W, H = cv.H, L = W < 480 ? 42 : 58; return { W: W, H: H, L: L, R: 14, T: 34, B: 30, pw: W - L - 14, ph: H - 34 - 30 }; }
    function draw() {
      var G = geom(), W = G.W, H = G.H; g.clearRect(0, 0, W, H);
      var bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#120f05'); bg.addColorStop(1, '#070a1a'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      var mx = 1; data.forEach(function (d) { mx = Math.max(mx, d.A, d.si, d.put); }); mx *= 1.08;
      var ease = 1 - Math.pow(1 - anim, 3), Y = S.y;
      function X(t) { return G.L + G.pw * t / Y; } function Yp(v) { return G.T + G.ph - G.ph * v / mx; }
      var fs = W < 480 ? 10 : 12; g.font = fs + 'px system-ui,sans-serif';
      g.textAlign = 'right'; g.textBaseline = 'middle';
      for (var k = 0; k <= 5; k++) { var v = mx * k / 5; g.strokeStyle = 'rgba(255,255,255,.07)'; g.beginPath(); g.moveTo(G.L, Yp(v)); g.lineTo(W - G.R, Yp(v)); g.stroke(); g.fillStyle = '#9aa2c8'; g.fillText('₹' + short(v), G.L - 6, Yp(v)); }
      g.textAlign = 'center'; g.textBaseline = 'top'; var stp = Math.max(1, Math.ceil(Y / (G.pw / 44))); for (var t = 0; t <= Y; t += stp) g.fillText(t + 'y', X(t), G.T + G.ph + 8);
      var tr = Y * ease;
      function path(key, close) { g.beginPath(); for (var i = 0; i <= Y; i++) { var tt = Math.min(i, tr), a = data[Math.floor(tt)], b = data[Math.min(Y, Math.ceil(tt))], f = tt - Math.floor(tt), v = a[key] + (b[key] - a[key]) * f; if (i === 0) g.moveTo(X(tt), Yp(v)); else g.lineTo(X(tt), Yp(v)); if (i >= tr) break; } if (close) { g.lineTo(X(tr), Yp(0)); g.lineTo(X(0), Yp(0)); g.closePath(); } }
      var gA = g.createLinearGradient(0, G.T, 0, G.T + G.ph); gA.addColorStop(0, 'rgba(250,204,21,.55)'); gA.addColorStop(1, 'rgba(217,119,6,.15)');
      path('A', true); g.fillStyle = gA; g.fill();
      path('put', true); g.fillStyle = 'rgba(96,165,250,.45)'; g.fill();
      if (!K.lp) { g.shadowColor = '#facc15'; g.shadowBlur = 12; }
      path('A', false); g.strokeStyle = '#facc15'; g.lineWidth = 3; g.stroke(); g.shadowBlur = 0;
      g.setLineDash([6, 6]); path('si', false); g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 2; g.stroke();
      if (S.inf > 0) { path('real', false); g.strokeStyle = '#c084fc'; g.stroke(); }
      g.setLineDash([]);
      if (S.P > 0) { g.strokeStyle = 'rgba(52,211,153,.5)'; g.setLineDash([2, 4]); g.beginPath(); g.moveTo(G.L, Yp(2 * S.P)); g.lineTo(W - G.R, Yp(2 * S.P)); g.stroke(); g.setLineDash([]); g.fillStyle = '#34d399'; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText('2 × P', G.L + 4, Yp(2 * S.P) - 2); }
      g.textAlign = 'left'; g.textBaseline = 'top'; g.font = '600 ' + fs + 'px system-ui,sans-serif';
      var lg = [['#facc15', 'Compound value'], ['#60a5fa', 'Money put in'], ['#ffffff', 'Simple interest']]; if (S.inf > 0) lg.push(['#c084fc', 'Real value']);
      var lx = G.L; lg.forEach(function (l) { g.fillStyle = l[0]; g.fillRect(lx, 10, 10, 10); g.fillStyle = '#d5dbf7'; g.fillText(l[1], lx + 14, 8); lx += g.measureText(l[1]).width + 26; });
      if (hov >= 0 && hov <= Y) {
        var d = data[hov], x = X(hov); g.strokeStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.moveTo(x, G.T); g.lineTo(x, G.T + G.ph); g.stroke();
        g.fillStyle = '#facc15'; g.beginPath(); g.arc(x, Yp(d.A), 5, 0, Math.PI * 2); g.fill();
        var lines = ['Year ' + hov, 'Value ' + INR(d.A), 'Put in ' + INR(d.put), 'Simple ' + INR(d.si)]; if (S.inf > 0) lines.push('Real ' + INR(d.real));
        g.font = fs + 1 + 'px system-ui,sans-serif'; var bw = 0; lines.forEach(function (s) { bw = Math.max(bw, g.measureText(s).width); }); bw += 16; var bh = lines.length * (fs + 5) + 10;
        var bx = x + 10 + bw > W ? x - 10 - bw : x + 10, by = G.T + 6;
        g.fillStyle = 'rgba(10,12,30,.92)'; g.strokeStyle = 'rgba(250,204,21,.6)'; g.beginPath(); if (g.roundRect) g.roundRect(bx, by, bw, bh, 8); else g.rect(bx, by, bw, bh); g.fill(); g.stroke();
        g.fillStyle = '#eef1ff'; lines.forEach(function (s, i) { g.fillText(s, bx + 8, by + 6 + i * (fs + 5)); });
      }
    }
    function pick(e) { var G = geom(), p = K.pos(e, cv), t = Math.round((p.x - G.L) / G.pw * S.y); hov = Math.max(0, Math.min(S.y, t)); dirty = true; }
    var dragging = false;
    K.on(cv, 'pointerdown', function (e) { dragging = true; try { cv.setPointerCapture(e.pointerId); } catch (x) {} pick(e); K.snd('tick'); });
    K.on(cv, 'pointermove', function (e) { if (dragging || e.pointerType === 'mouse') pick(e); });
    K.on(cv, 'pointerup', function () { dragging = false; });
    K.on(cv, 'pointercancel', function () { dragging = false; });
    K.on(cv, 'pointerleave', function (e) { if (e.pointerType === 'mouse' && !dragging) { hov = -1; dirty = true; } });
    K.on(cv, 'keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); hov = Math.max(0, Math.min(S.y, (hov < 0 ? 0 : hov) + (e.key === 'ArrowRight' ? 1 : -1))); dirty = true; K.snd('tick'); } });

    K.loop(function (dt) {
      if (anim < 1) { anim = Math.min(1, anim + dt * 1.5); dirty = true; }
      if (!dirty) return; dirty = false; draw();
      var f = fin(), e = ear();
      setRo('A', INR(f.A)); setRo('in', INR(f.put)); setRo('int', INR(f.A - f.put)); setRo('si', INR(f.si));
      setRo('ear', (e * 100).toFixed(3) + '%'); setRo('dbl', e > 0 ? (Math.log(2) / Math.log(1 + e)).toFixed(2) + ' yr' : 'never');
      setRo('r72', S.r > 0 ? (72 / S.r).toFixed(1) + ' yr' : '—'); setRo('real', S.inf > 0 ? INR(f.real) : 'set inflation');
    });
    K.fb('👋 Drag across the chart to read the value in any year.', '');
    return { destroy: K.destroy };
  }
});
})();

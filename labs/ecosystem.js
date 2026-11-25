/* VidyaVerse University v2 — Lab: Ecosystem (predator–prey) (plain script, self-contained) */
(function () {
'use strict';
var ID = 'ecosystem', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#15803d;--a2:#f97316}";

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

var DEF = { a: 1.0, Kv: 34, b: 0.02, d: 0.5, c: 0.4 }; // Kv is the slider position for carrying capacity
function kOf(v) { return Math.round(50 * Math.pow(60, v / 100)); } // 50 … 3000
function vOf(k) { return Math.round(100 * Math.log(k / 50) / Math.log(60)); }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Ecosystem: Predators & Prey', icon: '🦊', faculty: 'school', bands: ['middle', 'secondary', 'senior', 'ug'],
  summary: 'Run a living Lotka–Volterra model of rabbits, foxes and grass: watch boom-and-bust cycles, carrying capacity, extinction and the surprising effects of droughts.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = { a: DEF.a, K: kOf(DEF.Kv), b: DEF.b, d: DEF.d, c: DEF.c }, R, F, t, hist, speed = 4, paused = false, rab = [], fox = [], mark = 0, changedAt = 0, dirty = true;
    function restart(r0, f0) { R = r0 == null ? 60 : r0; F = f0 == null ? 10 : f0; t = 0; hist = [{ t: 0, R: R, F: F }]; mark = 0; changedAt = 0; }
    restart();
    K.shell({
      icon: '🦊', title: 'Ecosystem: Predators & Prey',
      goal: 'Discover how rabbits, foxes and grass keep each other in balance — and what tips them over.',
      how: '<p>This is the <b>Lotka–Volterra</b> model with limited food for the prey (a classic in ecology):</p><ul><li>Rabbits: <b>dR/dt = αR(1 − R/K) − βRF</b> — they breed (α) until grass limits them at the <b>carrying capacity K</b>, and are eaten by foxes (β = hunting success).</li><li>Foxes: <b>dF/dt = δβRF − γF</b> — they turn eaten rabbits into new foxes (efficiency δ) and die at rate γ.</li><li>Balance point: <b>R* = γ ÷ (δβ)</b>, <b>F* = α(1 − R*/K) ÷ β</b>. Foxes survive only if R* &lt; K.</li></ul><p>The top shows the meadow, the chart shows populations over time, and the small square is the <b>phase plot</b> (rabbits vs foxes) — cycles appear as spirals.</p>',
      note: 'Simplified: one prey and one predator, no seasons, migration, age, disease or chance events; populations are continuous numbers (a population below 0.5 is treated as extinct). Real ecosystems are noisier, but the same feedbacks appear in real data such as the famous lynx–hare fur records.',
      onMode: function () { dirty = true; },
      onReset: function () { setAll(DEF); restart(); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Meadow, population chart and phase plot' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var rc = K.card('📊 Populations');
    var setRo = K.ro(rc, [['t', 'Time'], ['R', '🐇 Rabbits'], ['F', '🦊 Foxes'], ['Rs', 'R* predicted'], ['Fs', 'F* predicted'], ['st', 'Status']]);
    var ac = K.card('🎬 Actions'), ar = K.h('div', 'row'); ac.appendChild(ar);
    var bP = K.btn(ar, '⏸ Pause', '', function () { paused = !paused; bP.textContent = paused ? '▶ Run' : '⏸ Pause'; });
    K.btn(ar, '⏮ Restart', '', function () { restart(); });
    K.btn(ar, '🌵 Drought (K ÷ 2)', '', function () { sl.K.set(vOf(Math.max(50, S.K / 2))); K.snd('whoosh'); K.fb('Drought! Grass halves. Watch the long-term balance.', ''); });
    K.btn(ar, '🌧️ Good year (K × 2)', '', function () { sl.K.set(vOf(Math.min(3000, S.K * 2))); K.snd('pop'); });
    K.btn(ar, '+10 🐇', '', function () { R += 10; K.snd('pop'); });
    K.btn(ar, '+5 🦊', '', function () { F += 5; K.snd('pop'); });
    var sp = K.slider(ac, { label: 'Simulation speed', min: 1, max: 20, step: 1, value: 4, unit: '× ', on: function (v) { speed = v; } });
    var pc = K.card('🎛️ Nature’s settings'), sl = {};
    function ch() { changedAt = t; dirty = true; }
    sl.a = K.slider(pc, { label: '🐇 Birth rate α', min: 0.2, max: 2, step: 0.05, value: S.a, fmt: function (v) { return v.toFixed(2); }, on: function (v) { S.a = v; ch(); } });
    sl.K = K.slider(pc, { label: '🌱 Grass: carrying capacity K', min: 0, max: 100, step: 1, value: DEF.Kv, fmt: function (v) { return kOf(v) + ' rabbits'; }, on: function (v) { S.K = kOf(v); ch(); } });
    sl.b = K.slider(pc, { label: '🎯 Fox hunting success β', min: 0.002, max: 0.05, step: 0.001, value: S.b, fmt: function (v) { return v.toFixed(3); }, on: function (v) { S.b = v; ch(); } });
    sl.d = K.slider(pc, { label: '🍖 Food → new foxes δ', min: 0.1, max: 1, step: 0.05, value: S.d, fmt: function (v) { return v.toFixed(2); }, on: function (v) { S.d = v; ch(); } });
    sl.c = K.slider(pc, { label: '💀 Fox death rate γ', min: 0.05, max: 3, step: 0.05, value: S.c, fmt: function (v) { return v.toFixed(2); }, on: function (v) { S.c = v; ch(); } });
    function setAll(o) { sl.a.set(o.a); sl.K.set(o.Kv); sl.b.set(o.b); sl.d.set(o.d); sl.c.set(o.c); }
    function star() { var rs = S.c / (S.d * S.b), fs = S.a * (1 - rs / S.K) / S.b; return { R: rs, F: Math.max(0, fs) }; }
    function f(r, x) { return [S.a * r * (1 - r / S.K) - S.b * r * x, S.d * S.b * r * x - S.c * x]; }
    function rk(h) {
      var k1 = f(R, F), k2 = f(R + h / 2 * k1[0], F + h / 2 * k1[1]), k3 = f(R + h / 2 * k2[0], F + h / 2 * k2[1]), k4 = f(R + h * k3[0], F + h * k3[1]);
      R += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); F += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      if (R < 0.5) R = 0; if (F < 0.5) F = 0; t += h;
    }
    function windowStats(span) { var mx = -1, mn = 1e9, n = 0; for (var i = hist.length - 1; i >= 0 && hist[i].t >= t - span; i--) { mx = Math.max(mx, hist[i].R); mn = Math.min(mn, hist[i].R); n++; } return { mx: mx, mn: mn, n: n }; }

    K.tasks([
      { title: 'Who peaks first?', text: 'Watch the chart for a while. In each cycle, which population reaches its peak <b>first</b>?', ask: { options: ['🐇 Rabbits peak first, then foxes', '🦊 Foxes peak first, then rabbits', 'They always peak together'], answer: 0 }, hint: 'Foxes need lots of rabbits to eat before they can raise more cubs.', good: 'Rabbits first. More rabbits → more food → more foxes, who then eat the rabbits down → foxes starve. The predator lags behind the prey.', xp: 15,
        start: function () { setAll(DEF); restart(); sp.set(4); } },
      { title: 'A world without foxes', text: 'Make the foxes die out by changing the <b>fox death rate γ</b>, then watch what the rabbits do. Finish when foxes are gone and rabbits are within 10% of K.', hint: 'Foxes cannot survive if R* = γ ÷ (δβ) is bigger than K. Push γ up high.', good: 'Without predators the rabbits grow until food runs short — they level off at the carrying capacity K (logistic growth).', xp: 20,
        start: function () { setAll(DEF); restart(); }, check: function () { return F === 0 && R > 0 && Math.abs(R - S.K) / S.K < 0.1; } },
      { title: 'Design a balance', text: 'Restart with foxes. Adjust the settings so the ecosystem <b>settles with about 60 rabbits</b> (±5) and foxes still alive. Run until it calms down.', hint: 'R* = γ ÷ (δβ). With δ = 0.5 and β = 0.02, γ = 0.6 gives R* = 60. Then wait.', good: 'You engineered a steady state! Ecologists use the same idea to set fishing or hunting limits.', xp: 25,
        start: function () { setAll(DEF); restart(); sp.set(8); }, check: function () { var s = star(); return F > 1 && Math.abs(s.R - 60) <= 5 && t - changedAt > 25 && Math.abs(R - 60) <= 6; } },
      { title: 'The drought puzzle', text: 'Back to the default settings. Press <b>🌵 Drought</b> to halve the grass and run for a while. In the long run, what happens?', ask: { options: ['Rabbits fall a lot; foxes stay the same', 'Rabbits stay about the same; foxes fall', 'Both double', 'Nothing changes'], answer: 1 }, hint: 'Look at R* = γ ÷ (δβ) — does K appear in it? Now look at F*.', good: 'Surprise! The rabbit balance R* does not depend on K, so the rabbits recover and the FOXES absorb the loss. Effects ripple up the food chain.', xp: 20,
        start: function () { setAll(DEF); restart(); } },
      { title: 'Boom and bust', text: 'The “paradox of enrichment”: give the meadow lots more grass (raise K a lot). Make the rabbit numbers swing by <b>more than 100</b> (peak − trough) over 25 time units, measured after the start.', hint: 'Slide K towards 2,000–3,000, press Restart, and let it run for 40+ time units.', good: 'More food made the system LESS stable — bigger booms and deeper crashes that risk extinction. Richer is not always safer!', xp: 25,
        start: function () { setAll(DEF); restart(); sp.set(8); }, check: function () { var w = windowStats(25); return t > 40 && w.n > 10 && w.mx - w.mn > 100; } }
    ]);

    function syncSprites(arr, n, W, top, H) { var want = Math.min(K.lp ? 30 : 60, Math.round(n)); while (arr.length < want) arr.push({ x: Math.random() * W, y: top + Math.random() * H, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 20, s: Math.random() }); while (arr.length > want) arr.splice((Math.random() * arr.length) | 0, 1); }
    function draw(dt) {
      var W = cv.W, H = cv.H, fh = H * 0.36, u = Math.max(0.8, Math.min(W, H) / 420);
      g.clearRect(0, 0, W, H);
      // meadow
      var grass = S.K > 0 ? Math.max(0.1, 1 - R / S.K) : 0, gg = g.createLinearGradient(0, 0, 0, fh);
      gg.addColorStop(0, 'rgb(' + Math.round(40 + 60 * (1 - grass)) + ',' + Math.round(90 + 80 * grass) + ',' + 40 + ')'); gg.addColorStop(1, 'rgb(' + Math.round(30 + 50 * (1 - grass)) + ',' + Math.round(60 + 60 * grass) + ',30)');
      g.fillStyle = gg; g.fillRect(0, 0, W, fh);
      var scale = Math.max(1, Math.max(R, F * 2) / 55);
      syncSprites(rab, R / scale, W, 6, fh - 24); syncSprites(fox, F / scale, W, 6, fh - 24);
      g.font = Math.round(16 * u) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      [[rab, '🐇', 1], [fox, '🦊', 1.4]].forEach(function (L) { L[0].forEach(function (a) { if (!K.rm) { a.x += a.vx * dt * L[2]; a.y += a.vy * dt; if (a.x < 8 || a.x > W - 8) a.vx *= -1; if (a.y < 10 || a.y > fh - 12) a.vy *= -1; } g.fillText(L[1], a.x, a.y); }); });
      g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(6, fh - 22, 230 * u, 18); g.fillStyle = '#fff'; g.font = Math.round(11 * u) + 'px system-ui,sans-serif'; g.textAlign = 'left'; g.fillText('each icon ≈ ' + scale.toFixed(1) + ' animals · grass ' + Math.round(grass * 100) + '%', 10, fh - 13);
      // time series
      var L = 40, top = fh + 22, ph = H - top - 22, pw = W - L - 12, span = 100, t0 = Math.max(0, t - span), mx = 10;
      hist.forEach(function (p) { if (p.t >= t0) mx = Math.max(mx, p.R, p.F); }); mx = Math.max(mx, S.K) * 1.08; if (mx > 4 * Math.max(10, windowStats(span).mx)) mx = Math.max(10, windowStats(span).mx) * 1.2;
      function X(tt) { return L + pw * (tt - t0) / span; } function Y(v) { return top + ph - ph * Math.min(v, mx) / mx; }
      g.fillStyle = '#050a14'; g.fillRect(0, fh, W, H - fh);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.fillStyle = '#8b93bd'; g.font = Math.round(10 * u) + 'px system-ui,sans-serif'; g.textAlign = 'right'; g.textBaseline = 'middle';
      for (var k = 0; k <= 4; k++) { var v = mx * k / 4; g.beginPath(); g.moveTo(L, Y(v)); g.lineTo(W - 12, Y(v)); g.stroke(); g.fillText(Math.round(v), L - 4, Y(v)); }
      if (S.K <= mx) { g.setLineDash([5, 5]); g.strokeStyle = 'rgba(134,239,172,.5)'; g.beginPath(); g.moveTo(L, Y(S.K)); g.lineTo(W - 12, Y(S.K)); g.stroke(); g.setLineDash([]); g.textAlign = 'left'; g.fillStyle = '#86efac'; g.fillText('K', W - 24, Y(S.K) - 8); }
      [['R', '#f5f5f4'], ['F', '#fb923c']].forEach(function (s) { g.strokeStyle = s[1]; g.lineWidth = 2.2; g.beginPath(); var st = false; hist.forEach(function (p) { if (p.t < t0) return; if (!st) { g.moveTo(X(p.t), Y(p[s[0]])); st = true; } else g.lineTo(X(p.t), Y(p[s[0]])); }); g.stroke(); });
      g.textAlign = 'left'; g.textBaseline = 'top'; g.font = '600 ' + Math.round(11 * u) + 'px system-ui,sans-serif'; g.fillStyle = '#f5f5f4'; g.fillText('🐇 rabbits', L + 4, fh + 4); g.fillStyle = '#fb923c'; g.fillText('🦊 foxes', L + 90 * u, fh + 4);
      g.fillStyle = '#8b93bd'; g.textAlign = 'right'; g.fillText('time →', W - 12, H - 16);
      // phase plot inset
      var ps = Math.min(fh - 16, W * 0.26), px0 = W - ps - 8, py0 = 8, mR = 10, mF = 10;
      hist.forEach(function (p) { mR = Math.max(mR, p.R); mF = Math.max(mF, p.F); });
      g.fillStyle = 'rgba(5,10,20,.78)'; g.fillRect(px0, py0, ps, ps); g.strokeStyle = 'rgba(255,255,255,.2)'; g.strokeRect(px0, py0, ps, ps);
      g.strokeStyle = 'rgba(250,204,21,.8)'; g.lineWidth = 1.3; g.beginPath(); var s0 = Math.max(0, hist.length - 1500);
      for (var i = s0; i < hist.length; i++) { var qx = px0 + 4 + (ps - 8) * hist[i].R / mR, qy = py0 + ps - 4 - (ps - 8) * hist[i].F / mF; if (i === s0) g.moveTo(qx, qy); else g.lineTo(qx, qy); } g.stroke();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(px0 + 4 + (ps - 8) * R / mR, py0 + ps - 4 - (ps - 8) * F / mF, 3, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#d5dbf7'; g.font = Math.round(9 * u) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText('phase: 🐇 → , 🦊 ↑', px0 + ps / 2, py0 + ps - 2);
    }
    var tk = 0, wasF = true, wasR = true;
    K.loop(function (dt) {
      if (!paused) { var steps = Math.ceil(speed * dt / 0.02); for (var i = 0; i < steps; i++) { rk(speed * dt / steps); } if (t - mark >= 0.2) { mark = t; hist.push({ t: t, R: R, F: F }); if (hist.length > 4000) hist.splice(0, hist.length - 4000); } }
      if (wasF && F === 0) { K.snd('bad'); K.fb('🦊 The foxes have gone extinct.', 'bad'); } if (wasR && R === 0) { K.snd('bad'); K.fb('🐇 The rabbits have gone extinct — and the foxes will follow.', 'bad'); }
      wasF = F > 0; wasR = R > 0;
      draw(dt);
      tk += dt; if (tk > 0.2) { tk = 0; var s = star(); setRo('t', t.toFixed(0)); setRo('R', R.toFixed(0)); setRo('F', F.toFixed(1)); setRo('Rs', s.R < S.K ? s.R.toFixed(0) : '> K (foxes die)'); setRo('Fs', s.R < S.K ? s.F.toFixed(1) : '0'); setRo('st', R === 0 ? 'all gone' : F === 0 ? 'no foxes' : 'coexisting'); }
    });
    K.fb('👋 Watch the cycles. Then follow the tasks — or change nature’s settings in Free play.', '');
    return { destroy: K.destroy };
  }
});
})();

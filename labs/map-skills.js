/* VidyaVerse University v2 — Lab: Map Skills (plain script, self-contained) */
(function () {
'use strict';
var ID = 'map-skills', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#0f766e;--a2:#eab308}§ .lg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:4px 10px;font-size:.9em}§ .lg span{white-space:nowrap}§ canvas.main{cursor:crosshair;background:#efe6cf}§ canvas.main:focus-visible{outline:3px solid var(--a2);outline-offset:-3px}";

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

// Fictional town of Vidyapur. Map units = km. Eastings 20–30, northings 40–48. 1 grid square = 1 km.
var E0 = 20, E1 = 30, N0 = 40, N1 = 48, HILL = { x: 26.0, y: 45.3 };
var FEAT = [
  { k: 'school', e: '🏫', n: 'School', x: 22.4, y: 43.6 },
  { k: 'temple', e: '🛕', n: 'Temple', x: 27.6, y: 41.4 },
  { k: 'post', e: '📮', n: 'Post office', x: 24.6, y: 42.6 },
  { k: 'hosp', e: '🏥', n: 'Hospital', x: 21.5, y: 41.2 },
  { k: 'stn', e: '🚉', n: 'Railway station', x: 28.4, y: 43.35 },
  { k: 'well', e: '🪣', n: 'Well', x: 25.3, y: 40.6 },
  { k: 'tower', e: '📡', n: 'Mobile tower', x: 29.2, y: 47.3 }
];
var RIVER = [[20, 46.8], [21.5, 46.2], [22.8, 45.0], [23.6, 43.6], [24.2, 42.0], [25.5, 41.2], [27.0, 40.6], [28.6, 40.0]];
var ROADS = [[[20, 42.4], [30, 42.8]], [[23.2, 40], [23.0, 48]]], RAIL = [[20, 44.0], [30, 43.2]];
function height(x, y) { var dx = x - HILL.x, sx = dx > 0 ? 0.9 : 2.2, a = dx / sx, b = (y - HILL.y) / 1.4; return 80 + 240 * Math.exp(-(a * a + b * b)); }
function bearing(a, b) { var d = Math.atan2(b.x - a.x, b.y - a.y) * 180 / Math.PI; return (d + 360) % 360; }
function dir8(bd) { return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(bd / 45) % 8]; }
function four(x, y) { return String(Math.floor(x)) + String(Math.floor(y)); }
function six(x, y) { return String(Math.floor(x * 10)) + String(Math.floor(y * 10)); }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Map Skills', icon: '🗺️', faculty: 'school', bands: ['primary', 'middle', 'secondary'],
  summary: 'Read a topographic map of the town of Vidyapur: grid references, compass directions and bearings, measuring distance with a scale, map symbols and contour lines.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var tap = null, meas = false, A = null, B = null, cur = { x: 25, y: 44 }, dirty = true, M = null;
    K.shell({
      icon: '🗺️', title: 'Map Skills',
      goal: 'Find your way around Vidyapur like a surveyor — with grid references, compass, scale and contours.',
      how: '<ul><li><b>Grid references:</b> read <b>eastings</b> (numbers along the bottom) first, then <b>northings</b> (up the side): “along the corridor, then up the stairs”. A square is named by its <b>bottom-left corner</b>, so the square right of line 24 and above line 43 is <b>2443</b>.</li><li><b>6-figure references</b> split each square into tenths: 224 436 means 4/10 of the way across square 22 and 6/10 of the way up square 43 — pinpointing within 100 m.</li><li><b>Directions:</b> the 8 compass points N, NE, E, SE, S, SW, W, NW. A <b>bearing</b> is the angle measured <b>clockwise from north</b> (east = 090°).</li><li><b>Scale:</b> here 1 grid square = 1 km. Distance on the ground = distance on the map × scale.</li><li><b>Contour lines</b> join places of equal height. Lines <b>close together = steep</b>; far apart = gentle.</li></ul><p>Tap the map to read the grid reference and height. Turn on 📏 <b>Measure</b> and tap two places to get distance and bearing. Keyboard: focus the map, use arrow keys (Shift = 1 km) and Enter.</p>',
      note: 'Vidyapur is a made-up town. The map uses a simple square grid (like Survey of India and Ordnance Survey maps) and emoji symbols instead of official map symbols. Heights are approximate.',
      onMode: function () { dirty = true; },
      onReset: function () { tap = null; A = B = null; setMeas(false); dirty = true; }
    });
    var cv = K.h('canvas', 'main', null, { tabindex: '0', role: 'application', 'aria-label': 'Map of Vidyapur. Arrow keys move the cursor, Enter selects.' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var tc = K.card('🧭 Tools'), tr = K.h('div', 'row'); tc.appendChild(tr);
    var mb = K.btn(tr, '📏 Measure', '', function () { setMeas(!meas); });
    K.btn(tr, '🧹 Clear', '', function () { tap = null; A = B = null; dirty = true; });
    function setMeas(v) { meas = v; A = B = null; mb.classList.toggle('on', v); mb.setAttribute('aria-pressed', v ? 'true' : 'false'); K.fb(v ? '📏 Tap the START point, then the END point.' : 'Tap the map to read grid references.', ''); dirty = true; }
    var rc = K.card('📍 Readings');
    var setRo = K.ro(rc, [['g4', '4-figure ref'], ['g6', '6-figure ref'], ['h', 'Height'], ['near', 'Nearby'], ['d', 'Distance'], ['b', 'Bearing']]);
    var lc = K.card('🔣 Key (legend)'), lg = K.h('div', 'lg'); lc.appendChild(lg);
    lg.innerHTML = FEAT.map(function (f) { return '<span>' + f.e + ' ' + f.n + '</span>'; }).join('') + '<span>〰️ River</span><span>🟫 Road</span><span>⬛⬜ Railway</span><span>🌳 Forest</span><span>🟤 Contour (50 m)</span><span>▲ Hilltop</span><span>🌉 Bridge</span>';
    function nearest(x, y) { var best = null, bd = 0.45; FEAT.forEach(function (f) { var d = Math.hypot(f.x - x, f.y - y); if (d < bd) { bd = d; best = f; } }); if (!best && Math.hypot(x - HILL.x, y - HILL.y) < 0.35) return { n: 'Hilltop (▲ 320 m)', e: '▲' }; return best; }
    function select(x, y) {
      x = Math.max(E0, Math.min(E1 - 0.001, x)); y = Math.max(N0, Math.min(N1 - 0.001, y));
      var nf = nearest(x, y);
      if (meas) { if (!A || B) { A = { x: x, y: y }; B = null; K.snd('pop'); K.fb('Start set at ' + six(x, y) + '. Now tap the end point.', ''); } else { B = { x: x, y: y }; var d = Math.hypot(B.x - A.x, B.y - A.y), bd = bearing(A, B); K.snd('good'); K.fb('📏 ' + d.toFixed(2) + ' km on a bearing of ' + String(Math.round(bd)).padStart(3, '0') + '° (' + dir8(bd) + ').', ''); } }
      else { K.snd('tick'); var msg = 'Square ' + four(x, y) + ' · 6-figure ' + six(x, y) + ' · about ' + Math.round(height(x, y)) + ' m high' + (nf ? ' · ' + nf.e + ' ' + nf.n : ''); K.fb(msg, ''); if (nf) K.say(nf.n + ', grid square ' + four(x, y).split('').join(' ')); }
      tap = { x: x, y: y, f: nf }; cur = { x: x, y: y }; dirty = true;
      setRo('g4', four(x, y)); setRo('g6', six(x, y)); setRo('h', Math.round(height(x, y)) + ' m'); setRo('near', nf ? nf.e + ' ' + nf.n : '—');
      if (A && B) { setRo('d', Math.hypot(B.x - A.x, B.y - A.y).toFixed(2) + ' km'); setRo('b', String(Math.round(bearing(A, B))).padStart(3, '0') + '° ' + dir8(bearing(A, B))); }
    }
    K.tasks([
      { title: 'Temple reference', text: 'Find the temple 🛕 (tap it to check). What is its <b>4-figure grid reference</b>?', ask: { options: ['2741', '4127', '2841', '2742'], answer: 0 }, hint: 'Eastings first (along the bottom), then northings (up the side). Use the bottom-left corner of the square.', good: '2741: along the corridor to 27, up the stairs to 41.', xp: 15, start: function () { setMeas(false); } },
      { title: 'Pinpoint the hospital', text: 'Tap the hospital 🏥. Which is its <b>6-figure grid reference</b>?', ask: { options: ['215412', '412215', '214112', '225412'], answer: 0 }, hint: 'It is half-way (5/10) across square 21 and 2/10 up square 41.', good: '215 412 — six figures locate a spot to within 100 m.', xp: 15 },
      { title: 'Which way to the hill?', text: 'You are at the hospital 🏥. In which <b>compass direction</b> is the hilltop ▲?', ask: { options: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], answer: 1 }, hint: 'The hilltop is to the right (east) and up (north). Use 📏 Measure from the hospital to the ▲ to see the bearing.', good: 'North-east — a bearing of about 048°.', xp: 20 },
      { title: 'How far by train?', text: 'Use <b>📏 Measure</b>: what is the straight-line distance from the school 🏫 to the railway station 🚉, in km?', ask: { answer: 6.0, tol: 0.25, unit: 'km' }, hint: 'Turn on Measure, tap the school, then the station. Each grid square is 1 km.', good: 'About 6 km as the crow flies. The real journey along roads is longer!', xp: 20, start: function () { setMeas(true); } },
      { title: 'Read the contours', text: 'Look at the brown contour lines on the hill. Which side of the hill is <b>steeper</b>?', ask: { options: ['East side', 'West side', 'Both the same'], answer: 0 }, hint: 'Where are the contour lines squeezed close together?', good: 'East! Contour lines close together mean the height changes quickly over a short distance.', xp: 20, start: function () { setMeas(false); } }
    ]);

    function geo() { var W = cv.W, H = cv.H, L = 26, Bm = 22, s = Math.min((W - L - 10) / (E1 - E0), (H - Bm - 10) / (N1 - N0)), ox = L + ((W - L - 10) - s * (E1 - E0)) / 2, oy = 6 + ((H - Bm - 10) - s * (N1 - N0)) / 2; return { s: s, ox: ox, oy: oy, X: function (x) { return ox + (x - E0) * s; }, Y: function (y) { return oy + (N1 - y) * s; } }; }
    function poly(pts, X, Y) { g.beginPath(); pts.forEach(function (p, i) { if (i) g.lineTo(X(p[0]), Y(p[1])); else g.moveTo(X(p[0]), Y(p[1])); }); }
    function draw() {
      var W = cv.W, H = cv.H; M = geo(); var X = M.X, Y = M.Y, s = M.s;
      g.fillStyle = '#e9dfc4'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#f6efdc'; g.fillRect(X(E0), Y(N1), s * (E1 - E0), s * (N1 - N0));
      // forest
      g.fillStyle = 'rgba(134,190,110,.45)'; g.beginPath(); g.ellipse(X(28.6), Y(46.4), s * 1.2, s * 0.9, 0.3, 0, Math.PI * 2); g.fill();
      // lake + river
      g.fillStyle = '#9cc9e8'; g.beginPath(); g.ellipse(X(20.9), Y(47.0), s * 0.7, s * 0.4, 0, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#5aa4d6'; g.lineWidth = Math.max(2.5, s * 0.12); g.lineCap = 'round'; g.lineJoin = 'round'; poly(RIVER, X, Y); g.stroke();
      // contours
      [100, 150, 200, 250, 300].forEach(function (h, i) {
        var r = Math.sqrt(-Math.log((h - 80) / 240)); g.strokeStyle = 'rgba(150,90,40,' + (i === 0 || i === 2 || i === 4 ? 0.85 : 0.55) + ')'; g.lineWidth = i % 2 ? 1 : 1.6; g.beginPath();
        for (var a = 0; a <= 64; a++) { var t = a / 64 * Math.PI * 2, c = Math.cos(t), x = HILL.x + r * (c > 0 ? 0.9 : 2.2) * c, y = HILL.y + r * 1.4 * Math.sin(t); if (a) g.lineTo(X(x), Y(y)); else g.moveTo(X(x), Y(y)); }
        g.stroke(); if (i % 2 === 0) { g.fillStyle = '#8a5a2b'; g.font = Math.max(9, s * 0.22) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(h), X(HILL.x - r * 2.2 * 0.7), Y(HILL.y - r * 1.4 * 0.7)); }
      });
      g.fillStyle = '#6b3d16'; g.font = '700 ' + Math.max(10, s * 0.3) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('▲', X(HILL.x), Y(HILL.y)); g.font = Math.max(9, s * 0.22) + 'px system-ui,sans-serif'; g.fillText('320', X(HILL.x), Y(HILL.y) + s * 0.28);
      // roads + rail
      ROADS.forEach(function (r) { g.strokeStyle = '#7c4a1e'; g.lineWidth = Math.max(4, s * 0.16); poly(r, X, Y); g.stroke(); g.strokeStyle = '#f2b96b'; g.lineWidth = Math.max(2, s * 0.1); poly(r, X, Y); g.stroke(); });
      g.strokeStyle = '#222'; g.lineWidth = Math.max(3, s * 0.1); poly(RAIL, X, Y); g.stroke(); g.strokeStyle = '#fff'; g.setLineDash([s * 0.25, s * 0.25]); g.lineWidth = Math.max(1.5, s * 0.05); poly(RAIL, X, Y); g.stroke(); g.setLineDash([]);
      g.font = Math.max(12, s * 0.38) + 'px system-ui,sans-serif'; g.fillText('🌉', X(24.03), Y(42.5)); g.fillText('🌉', X(23.09), Y(44.5));
      for (var tr2 = 0; tr2 < 9; tr2++) g.fillText('🌳', X(28.0 + (tr2 % 3) * 0.55), Y(46.0 + Math.floor(tr2 / 3) * 0.4));
      g.fillText('🏘️', X(25.4), Y(41.9));
      FEAT.forEach(function (f) { g.font = Math.max(14, s * 0.45) + 'px system-ui,sans-serif'; g.fillText(f.e, X(f.x), Y(f.y)); });
      // grid
      g.strokeStyle = 'rgba(40,110,170,.55)'; g.lineWidth = 1; g.fillStyle = '#1e3a5f'; g.font = '600 ' + Math.max(10, Math.min(13, s * 0.3)) + 'px system-ui,sans-serif';
      for (var e = E0; e <= E1; e++) { g.beginPath(); g.moveTo(X(e), Y(N0)); g.lineTo(X(e), Y(N1)); g.stroke(); if (e < E1) { g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText(String(e), X(e) + 2, Y(N0) + 3); } }
      for (var n = N0; n <= N1; n++) { g.beginPath(); g.moveTo(X(E0), Y(n)); g.lineTo(X(E1), Y(n)); g.stroke(); if (n < N1) { g.textAlign = 'right'; g.textBaseline = 'bottom'; g.fillText(String(n), X(E0) - 3, Y(n) - 1); } }
      // compass + scale
      var cx = X(E1) - s * 0.55, cy = Y(N1) + s * 0.7, cr = Math.max(14, s * 0.4);
      g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.arc(cx, cy, cr * 1.3, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#b91c1c'; g.beginPath(); g.moveTo(cx, cy - cr); g.lineTo(cx + cr * 0.3, cy); g.lineTo(cx - cr * 0.3, cy); g.closePath(); g.fill();
      g.fillStyle = '#334155'; g.beginPath(); g.moveTo(cx, cy + cr); g.lineTo(cx + cr * 0.3, cy); g.lineTo(cx - cr * 0.3, cy); g.closePath(); g.fill();
      g.fillStyle = '#111'; g.font = '700 ' + Math.max(10, cr * 0.6) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText('N', cx, cy - cr - 1);
      var sx = X(E0) + s * 0.3, sy = Y(N0) - s * 0.35; g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(sx - 6, sy - 16, s * 2 + 40, 26);
      g.fillStyle = '#111'; g.fillRect(sx, sy, s, 5); g.fillStyle = '#fff'; g.fillRect(sx + s, sy, s, 5); g.strokeStyle = '#111'; g.strokeRect(sx, sy, s * 2, 5);
      g.fillStyle = '#111'; g.font = Math.max(9, Math.min(12, s * 0.26)) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText('0', sx, sy - 1); g.fillText('1', sx + s, sy - 1); g.fillText('2 km', sx + s * 2 + 10, sy - 1);
      // selection
      if (tap && !meas) { var tx = X(tap.x), ty = Y(tap.y); g.fillStyle = 'rgba(234,179,8,.25)'; g.fillRect(X(Math.floor(tap.x)), Y(Math.floor(tap.y) + 1), s, s); g.strokeStyle = '#b45309'; g.lineWidth = 2; g.beginPath(); g.moveTo(tx - 8, ty); g.lineTo(tx + 8, ty); g.moveTo(tx, ty - 8); g.lineTo(tx, ty + 8); g.stroke(); }
      if (A) { g.fillStyle = '#7c3aed'; g.beginPath(); g.arc(X(A.x), Y(A.y), 5, 0, Math.PI * 2); g.fill(); }
      if (A && B) {
        g.strokeStyle = '#7c3aed'; g.lineWidth = 3; g.setLineDash([8, 5]); g.beginPath(); g.moveTo(X(A.x), Y(A.y)); g.lineTo(X(B.x), Y(B.y)); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#7c3aed'; g.beginPath(); g.arc(X(B.x), Y(B.y), 5, 0, Math.PI * 2); g.fill();
        g.strokeStyle = 'rgba(124,58,237,.6)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(X(A.x), Y(A.y)); g.lineTo(X(A.x), Y(A.y) - 40); g.stroke();
        var bd = bearing(A, B) * Math.PI / 180; g.beginPath(); g.arc(X(A.x), Y(A.y), 26, -Math.PI / 2, -Math.PI / 2 + bd); g.stroke();
        var d = Math.hypot(B.x - A.x, B.y - A.y), lbl = d.toFixed(2) + ' km · ' + String(Math.round(bearing(A, B))).padStart(3, '0') + '°', mx = (X(A.x) + X(B.x)) / 2, my = (Y(A.y) + Y(B.y)) / 2;
        g.font = '700 13px system-ui,sans-serif'; var w = g.measureText(lbl).width + 12; g.fillStyle = 'rgba(255,255,255,.92)'; g.fillRect(mx - w / 2, my - 22, w, 20); g.fillStyle = '#4c1d95'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lbl, mx, my - 12);
      }
      if (document.activeElement === cv) { g.strokeStyle = '#0f766e'; g.lineWidth = 2; g.beginPath(); g.arc(X(cur.x), Y(cur.y), 9, 0, Math.PI * 2); g.stroke(); }
    }
    K.on(cv, 'pointerdown', function (e) { if (!M) return; var p = K.pos(e, cv); var x = E0 + (p.x - M.ox) / M.s, y = N1 - (p.y - M.oy) / M.s; if (x < E0 || x > E1 || y < N0 || y > N1) return; select(x, y); });
    K.on(cv, 'keydown', function (e) { var st = e.shiftKey ? 1 : 0.1, k = e.key; if (k === 'ArrowLeft') cur.x -= st; else if (k === 'ArrowRight') cur.x += st; else if (k === 'ArrowUp') cur.y += st; else if (k === 'ArrowDown') cur.y -= st; else if (k === 'Enter' || k === ' ') { e.preventDefault(); select(cur.x, cur.y); return; } else return; e.preventDefault(); cur.x = Math.max(E0, Math.min(E1 - 0.01, cur.x)); cur.y = Math.max(N0, Math.min(N1 - 0.01, cur.y)); setRo('g6', six(cur.x, cur.y)); dirty = true; });
    K.on(cv, 'focus', function () { dirty = true; }); K.on(cv, 'blur', function () { dirty = true; });
    K.loop(function () { if (dirty) { dirty = false; draw(); } });
    K.fb('👋 Tap anywhere on the map to read its grid reference.', '');
    return { destroy: K.destroy };
  }
});
})();

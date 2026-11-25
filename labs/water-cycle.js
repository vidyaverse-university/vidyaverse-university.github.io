/* VidyaVerse University v2 — Lab: Water Cycle (plain script, self-contained) */
(function () {
'use strict';
var ID = 'water-cycle', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#0284c7;--a2:#38bdf8}§ canvas.main{cursor:pointer}";

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

var TOTAL = 400, SEA = 0.7, COAST = 0.45, CLOUD_Y = 0.3, TREES = [0.52, 0.57, 0.62, 0.66, 0.71];
var SURF = [[0, SEA], [COAST, SEA], [0.47, 0.66], [0.68, 0.6], [0.86, 0.25], [1, 0.44]];
function surf(x) { for (var i = 1; i < SURF.length; i++) { if (x <= SURF[i][0]) { var a = SURF[i - 1], b = SURF[i], f = (x - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * f; } } return SURF[SURF.length - 1][1]; }
function alt(y) { return (SEA - y) / SEA * 5; } // km above sea level (top of picture = 5 km)
var INFO = {
  sun: ['☀️', 'The Sun', 'The Sun’s energy powers the whole water cycle. Warmer water evaporates faster.'],
  evap: ['♨️', 'Evaporation', 'Liquid water turns into invisible water vapour (a gas) and rises. About 86% of it comes from the oceans.'],
  cond: ['☁️', 'Condensation', 'Rising vapour cools — about 6.5 °C for every kilometre — and condenses into tiny droplets that make clouds.'],
  precip: ['🌧️', 'Precipitation', 'When cloud droplets join and grow heavy they fall as rain — or snow if the air is below 0 °C.'],
  trans: ['🌳', 'Transpiration', 'Plants pull water from the soil through their roots and release vapour from their leaves.'],
  runoff: ['🏞️', 'Runoff & rivers', 'Water that cannot soak in flows over the land into streams and rivers, then back to the sea.'],
  ground: ['🪨', 'Infiltration & groundwater', 'Rain soaks into soil and rock, filling underground aquifers that feed wells and springs.'],
  ocean: ['🌊', 'Collection', 'Rivers and groundwater return water to the ocean, where the cycle begins again.']
};

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Water Cycle', icon: '💧', faculty: 'school', bands: ['primary', 'middle'],
  summary: 'Heat the ocean, push clouds with the wind and make it rain or snow on a mountain — see evaporation, condensation, precipitation, runoff and groundwater in action.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = { temp: 22, wind: 2, ground: 'forest', labels: true, paused: false };
    var parts, clouds, snow, acc, stats, tapLbl = null, t0 = 0, flash = 0;
    function resetSim() { parts = []; clouds = []; snow = 0; acc = { evap: 0, tr: 0, melt: 0 }; stats = { land: 0, run: 0, cond: false }; }
    resetSim();
    K.shell({
      icon: '💧', title: 'Water Cycle',
      goal: 'Follow one drop of water from the sea to the sky, onto a mountain and back again.',
      how: '<p>Change the <b>Sun’s heat</b>, the <b>wind</b> and the <b>ground</b>. Tap anything in the picture to learn what is happening there.</p><ul><li><b>Evaporation:</b> the Sun warms water; it becomes vapour and rises.</li><li><b>Transpiration:</b> trees release water from their leaves (they need water in the soil first).</li><li><b>Condensation:</b> air cools as it rises (about 6.5 °C per km), so vapour turns into cloud droplets.</li><li><b>Precipitation:</b> heavy clouds rain. Wind pushing clouds up a mountain cools them more, so mountains get extra rain — this is why the Western Ghats are so wet in the monsoon!</li><li><b>Runoff &amp; infiltration:</b> on soil and forest, much rain soaks in to become <b>groundwater</b>; on concrete, it runs off fast and can flood.</li></ul><p>The thermometer on the right shows how cold it gets higher up.</p>',
      note: 'Simplified model: each dot is a “packet” of water; clouds form at a fixed height; rain falls when clouds are heavy or are pushed up the mountain. The real cycle also includes sublimation, glaciers and much slower groundwater flow.',
      onMode: function () {},
      onReset: function () { sT.set(22); sW.set(2); setGround('forest'); resetSim(); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Water cycle scene. Tap a place to learn about it.' }); K.stage.appendChild(cv);
    var g = K.canvas(cv);
    var cc = K.card('🎛️ Controls');
    var sT = K.slider(cc, { label: '☀️ Sun’s heat (sea temperature)', min: 5, max: 40, step: 1, value: S.temp, unit: '°C', on: function (v) { S.temp = v; } });
    var sW = K.slider(cc, { label: '🌬️ Wind towards the mountain', min: 0, max: 10, step: 1, value: S.wind, on: function (v) { S.wind = v; } });
    var gr = K.h('div', 'row'); cc.appendChild(gr);
    var bF = K.btn(gr, '🌳 Forest & soil', '', function () { setGround('forest'); });
    var bC = K.btn(gr, '🏙️ Concrete city', '', function () { setGround('city'); });
    var tr2 = K.h('div', 'row'); tr2.style.marginTop = '6px'; cc.appendChild(tr2);
    var bL = K.btn(tr2, '🏷️ Labels', 'on', function () { S.labels = !S.labels; bL.classList.toggle('on', S.labels); });
    var bP = K.btn(tr2, '⏸ Pause', '', function () { S.paused = !S.paused; bP.textContent = S.paused ? '▶ Play' : '⏸ Pause'; });
    function setGround(k) { S.ground = k; bF.classList.toggle('on', k === 'forest'); bC.classList.toggle('on', k === 'city'); bF.setAttribute('aria-pressed', k === 'forest'); bC.setAttribute('aria-pressed', k === 'city'); }
    setGround('forest');
    var rc = K.card('💧 Where is the water?');
    var setRo = K.ro(rc, [['oc', '🌊 Ocean'], ['va', '♨️ Vapour'], ['cl', '☁️ Clouds'], ['ra', '🌧️ Falling'], ['sn', '❄️ Snow'], ['ri', '🏞️ Rivers'], ['gw', '🪨 Groundwater'], ['ts', '🏔️ Summit temp']]);

    function counts() { var c = { v: 0, r: 0, o: 0, g: 0 }; parts.forEach(function (p) { c[p.k]++; }); var cw = 0; clouds.forEach(function (k) { cw += k.w; }); c.c = cw; c.s = snow; c.oc = TOTAL - parts.length - cw - snow; return c; }
    function tsum() { return S.temp - 6.5 * alt(0.25); }

    K.tasks([
      { title: 'Warm the sea', text: 'Turn up the <b>Sun’s heat to 30 °C or more</b> and watch water vapour rise. Get <b>15 vapour dots</b> in the air at once.', hint: 'Slide “Sun’s heat” to the right. Hot water evaporates faster.', good: 'Evaporation! The Sun’s energy turns liquid water into invisible vapour.', xp: 10,
        start: function () { resetSim(); sT.set(15); sW.set(0); }, check: function () { return S.temp >= 30 && counts().v >= 15; } },
      { title: 'Build a cloud', text: 'Keep the Sun hot. Rising vapour cools and <b>condenses</b> into clouds. Collect <b>20 units of water in the clouds</b>.', hint: 'Just wait a few seconds with the Sun hot — watch the clouds grow.', good: 'Condensation! Cool air cannot hold as much vapour, so it forms droplets.', xp: 15,
        check: function () { return counts().c >= 20; } },
      { title: 'Rain on the mountain', text: 'Raise the <b>wind to 5 or more</b> to push the clouds up the mountain. Make <b>15 drops land on the land</b>.', hint: 'Wind moves clouds to the right. When they hit the mountain they rise, cool and rain.', good: 'Mountains squeeze rain out of clouds. That is why the side facing the wind is green and wet!', xp: 20,
        start: function () { stats.land = 0; }, check: function () { return S.wind >= 5 && stats.land >= 15; } },
      { title: 'Forest or city?', text: 'Switch the ground to <b>🏙️ Concrete city</b> and watch where the rain goes. Make <b>12 drops run off</b> into the river.', hint: 'Press the Concrete city button, keep the wind up and wait for rain.', good: 'Concrete stops water soaking in, so it rushes into rivers — causing floods. Soil and forests refill groundwater.', xp: 20,
        start: function () { stats.run = 0; }, check: function () { return S.ground === 'city' && stats.run >= 12; } },
      { title: 'Spot the change', text: 'Now <b>tap the place in the picture where condensation happens</b> — where vapour turns into tiny cloud droplets.', hint: 'Condensation happens high up, where the air is cold. Tap a cloud!', good: 'Yes — condensation makes clouds, high up where the air is cold.', xp: 15,
        start: function () { stats.cond = false; setGround('forest'); }, check: function () { return stats.cond; } }
    ]);

    function joinCloud(x) {
      var best = null, bd = 1;
      clouds.forEach(function (c) { var d = Math.abs(c.x - x); if (d < bd) { bd = d; best = c; } });
      if (best && (bd < 0.1 || clouds.length >= 7)) best.w++;
      else clouds.push({ x: x, y: 0.12 + Math.random() * 0.12, w: 1, rain: false, rt: 0, s: Math.random() * 10 });
    }
    function step(dt) {
      var T0 = S.temp, wind = S.wind, cap = K.lp ? 100 : 190, ev = Math.max(0, T0 - 4) / 36;
      var oc = counts().oc;
      acc.evap += ev * 7 * dt;
      while (acc.evap >= 1) { acc.evap--; if (parts.length < cap && oc > 60) { parts.push({ k: 'v', x: Math.random() * (COAST - 0.02), y: SEA - 0.01, ph: Math.random() * 6 }); oc--; } }
      if (S.ground === 'forest') {
        acc.tr += ev * 1.6 * dt;
        while (acc.tr >= 1) { acc.tr--; for (var j = 0; j < parts.length; j++) if (parts[j].k === 'g') { var tx = TREES[(Math.random() * TREES.length) | 0]; parts[j] = { k: 'v', x: tx, y: surf(tx) - 0.07, ph: Math.random() * 6, tr: 1 }; break; } }
      }
      var ts = tsum();
      if (snow > 0 && ts > 0) { acc.melt += snow * ts * 0.01 * dt; while (acc.melt >= 1 && snow > 0) { acc.melt--; snow--; var mx = 0.84 + Math.random() * 0.04; parts.push({ k: 'o', x: mx, y: surf(mx) }); } }
      clouds.forEach(function (c) {
        c.x += wind * 0.012 * dt; if (c.x > 1.12) c.x -= 1.24;
        var over = c.x > 0.72 && c.x < 0.95;
        if (!c.rain && (c.w >= 14 || (over && c.w >= 2))) c.rain = true;
        if (c.rain) { c.rt += dt; while (c.rt > 0.07 && c.w >= 1) { c.rt -= 0.07; c.w--; parts.push({ k: 'r', x: c.x + (Math.random() - 0.5) * 0.07, y: c.y + 0.04 }); } if (c.w < 1) c.rain = false; }
      });
      clouds = clouds.filter(function (c) { return c.w >= 1 || c.rain; });
      for (var a = 0; a < clouds.length; a++) for (var b = a + 1; b < clouds.length; b++) if (Math.abs(clouds[a].x - clouds[b].x) < 0.05) { clouds[a].w += clouds[b].w; clouds[b].w = 0; }
      clouds = clouds.filter(function (c) { return c.w >= 1; });
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i], sy;
        if (p.k === 'v') {
          p.ph += dt * 2; p.y -= (0.05 + 0.05 * T0 / 40) * dt; p.x += (wind * 0.012 + Math.sin(p.ph) * 0.012) * dt; if (p.x > 1.02) p.x -= 1.04;
          sy = surf(Math.max(0, Math.min(1, p.x))); if (p.y > sy - 0.01) p.y = sy - 0.01;
          if (p.y <= CLOUD_Y) { joinCloud(p.x); parts.splice(i, 1); }
        } else if (p.k === 'r') {
          p.y += 0.55 * dt; p.x += wind * 0.006 * dt; if (p.x > 1) p.x -= 1;
          sy = surf(p.x);
          if (p.y >= sy) {
            if (p.x < COAST) parts.splice(i, 1);
            else { stats.land++; if (S.temp - 6.5 * alt(sy) < 0) { snow++; parts.splice(i, 1); } else if (Math.random() < (S.ground === 'forest' ? 0.65 : 0.1)) { p.k = 'g'; p.y = sy + 0.03; } else { p.k = 'o'; p.y = sy; stats.run++; } }
          }
        } else if (p.k === 'o') {
          var sp = (S.ground === 'city' ? 0.2 : 0.12) * dt; p.x += p.x > 0.86 ? sp : -sp; p.y = surf(Math.min(1, p.x));
          if (p.x < COAST || p.x >= 1) parts.splice(i, 1);
        } else if (p.k === 'g') {
          sy = surf(p.x); if (p.y < sy + 0.09) p.y += 0.03 * dt; else p.x += (p.x > 0.86 ? 0.012 : -0.012) * dt;
          if (p.x < COAST || p.x >= 1) parts.splice(i, 1);
        }
      }
    }
    function px(x) { return x * cv.W; } function py(y) { return y * cv.H; }
    function cloudShape(c, r) { var x = px(c.x), y = py(c.y); g.beginPath(); g.arc(x - r * 0.9, y + r * 0.2, r * 0.7, 0, Math.PI * 2); g.arc(x, y - r * 0.15, r, 0, Math.PI * 2); g.arc(x + r * 0.95, y + r * 0.15, r * 0.75, 0, Math.PI * 2); g.arc(x + r * 0.2, y + r * 0.45, r * 0.8, 0, Math.PI * 2); g.fill(); }
    function draw(time) {
      var W = cv.W, H = cv.H, T0 = S.temp, u = Math.max(0.8, Math.min(W, H) / 400), warm = (T0 - 5) / 35, i;
      var sky = g.createLinearGradient(0, 0, 0, py(SEA)); sky.addColorStop(0, 'rgb(' + Math.round(20 + 40 * warm) + ',' + Math.round(60 + 60 * warm) + ',' + Math.round(140 + 60 * warm) + ')'); sky.addColorStop(1, 'rgb(' + Math.round(140 + 90 * warm) + ',' + Math.round(190 + 30 * warm) + ',235)');
      g.fillStyle = sky; g.fillRect(0, 0, W, H);
      // sun
      var sx = px(0.1), sY = py(0.13), sr = Math.min(W, H) * (0.05 + 0.025 * warm), rot = K.rm ? 0 : time / 4000;
      var glow = g.createRadialGradient(sx, sY, sr * 0.3, sx, sY, sr * (3 + flash));
      glow.addColorStop(0, 'rgba(255,240,150,.9)'); glow.addColorStop(1, 'rgba(255,200,60,0)'); g.fillStyle = glow; g.beginPath(); g.arc(sx, sY, sr * (3 + flash), 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(255,220,90,.8)'; g.lineWidth = 2 * u; for (i = 0; i < 12; i++) { var an = rot + i * Math.PI / 6; g.beginPath(); g.moveTo(sx + Math.cos(an) * sr * 1.25, sY + Math.sin(an) * sr * 1.25); g.lineTo(sx + Math.cos(an) * sr * 1.7, sY + Math.sin(an) * sr * 1.7); g.stroke(); }
      g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(sx, sY, sr, 0, Math.PI * 2); g.fill();
      // land + ground layers
      g.beginPath(); g.moveTo(px(COAST), H); SURF.forEach(function (s) { if (s[0] >= COAST) g.lineTo(px(s[0]), py(s[1])); }); g.lineTo(W, H); g.closePath();
      var lg = g.createLinearGradient(0, py(0.25), 0, H); lg.addColorStop(0, S.ground === 'city' ? '#6b7280' : '#4d7c0f'); lg.addColorStop(0.35, '#7c5a2e'); lg.addColorStop(1, '#3b2a17'); g.fillStyle = lg; g.fill();
      // snow cap
      var sl = SEA - (S.temp / 6.5) / 5 * SEA; // y where temperature = 0 °C
      if (sl > 0.25 || snow > 0) { var capY = Math.max(0.25, Math.min(sl, 0.45)); if (snow > 0) capY = Math.max(capY, 0.25 + Math.min(0.12, snow * 0.004)); g.save(); g.clip(); g.fillStyle = 'rgba(255,255,255,.92)'; g.fillRect(0, 0, W, py(capY)); g.restore(); }
      // aquifer band
      g.fillStyle = 'rgba(56,189,248,.18)'; g.beginPath(); g.moveTo(px(COAST), py(SEA + 0.12)); for (var ax = COAST; ax <= 1.0001; ax += 0.02) g.lineTo(px(ax), py(surf(ax) + 0.1)); for (ax = 1; ax >= COAST; ax -= 0.02) g.lineTo(px(ax), py(surf(ax) + 0.14)); g.closePath(); g.fill();
      // ocean
      var og = g.createLinearGradient(0, py(SEA), 0, H); og.addColorStop(0, '#0ea5e9'); og.addColorStop(1, '#0c4a6e'); g.fillStyle = og; g.fillRect(0, py(SEA), px(COAST) + 2, H - py(SEA));
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1.5 * u; for (i = 0; i < 4; i++) { g.beginPath(); for (var wx = 0; wx <= px(COAST); wx += 6) { var wy = py(SEA) + 6 * u + i * 12 * u + Math.sin(wx / (14 * u) + (K.rm ? 0 : time / 600) + i) * 2.5 * u; if (wx === 0) g.moveTo(wx, wy); else g.lineTo(wx, wy); } g.stroke(); }
      // river
      var c0 = counts(); g.strokeStyle = 'rgba(56,189,248,.8)'; g.lineWidth = (1.5 + Math.min(6, c0.o * 0.25)) * u; g.lineCap = 'round'; g.beginPath(); for (var rx = 0.84; rx >= COAST; rx -= 0.02) { var ry = py(surf(rx)) - 1; if (rx === 0.84) g.moveTo(px(rx), ry); else g.lineTo(px(rx), ry); } g.stroke();
      // trees / buildings
      g.textAlign = 'center'; g.textBaseline = 'bottom'; g.font = Math.round(22 * u) + 'px system-ui,sans-serif';
      TREES.forEach(function (tx) { g.fillText(S.ground === 'forest' ? '🌳' : '🏢', px(tx), py(surf(tx)) + 3 * u); });
      // clouds
      clouds.forEach(function (c) { var r = (10 + Math.min(26, c.w * 1.4)) * u, d = Math.min(1, c.w / 18); g.fillStyle = 'rgba(' + Math.round(250 - 120 * d) + ',' + Math.round(252 - 115 * d) + ',' + Math.round(255 - 100 * d) + ',.95)'; cloudShape(c, r); });
      // particles
      parts.forEach(function (p) {
        var x = px(p.x), y = py(p.y);
        if (p.k === 'v') { g.fillStyle = p.tr ? 'rgba(190,255,190,.75)' : 'rgba(255,255,255,.7)'; g.beginPath(); g.arc(x, y, 2.6 * u, 0, Math.PI * 2); g.fill(); }
        else if (p.k === 'r') { if (S.temp - 6.5 * alt(p.y) < 0) { g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, 2.4 * u, 0, Math.PI * 2); g.fill(); } else { g.strokeStyle = '#60a5fa'; g.lineWidth = 2 * u; g.beginPath(); g.moveTo(x, y - 6 * u); g.lineTo(x + S.wind * 0.3 * u, y); g.stroke(); } }
        else if (p.k === 'o') { g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(x, y - 2 * u, 2.6 * u, 0, Math.PI * 2); g.fill(); }
        else { g.fillStyle = '#7dd3fc'; g.beginPath(); g.arc(x, y, 2.2 * u, 0, Math.PI * 2); g.fill(); }
      });
      // altitude thermometer
      g.font = Math.round(10 * u + 3) + 'px system-ui,sans-serif'; g.textAlign = 'right'; g.textBaseline = 'middle';
      for (var km = 0; km <= 4; km++) { var yy = py(SEA - km / 5 * SEA), tc = Math.round(T0 - 6.5 * km); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(W - 62 * u - 8, yy - 8 * u, 62 * u + 4, 16 * u); g.fillStyle = tc < 0 ? '#bae6fd' : '#fff'; g.fillText(km + ' km ' + tc + '°C', W - 8, yy); }
      // labels
      if (S.labels) {
        g.font = '700 ' + Math.round(11 * u + 3) + 'px system-ui,sans-serif'; g.textAlign = 'center';
        [['Evaporation ↑', 0.25, 0.55], ['Condensation', 0.42, 0.06], ['Precipitation ↓', 0.74, 0.36], ['Runoff', 0.6, 0.58], ['Groundwater', 0.66, 0.8], ['Collection', 0.22, 0.9]].forEach(function (L) { var w = g.measureText(L[0]).width + 12; g.fillStyle = 'rgba(8,15,40,.55)'; g.fillRect(px(L[1]) - w / 2, py(L[2]) - 10 * u, w, 20 * u); g.fillStyle = '#fff'; g.fillText(L[0], px(L[1]), py(L[2]) + 1); });
      }
      if (tapLbl) {
        var a = Math.min(1, tapLbl.t); g.globalAlpha = a; var inf = INFO[tapLbl.k], tw = Math.min(W * 0.8, 280 * u), bx = Math.max(6, Math.min(W - tw - 6, tapLbl.x - tw / 2)), by = Math.max(6, Math.min(H - 70 * u, tapLbl.y - 80 * u));
        g.fillStyle = 'rgba(7,12,35,.92)'; g.fillRect(bx, by, tw, 62 * u); g.strokeStyle = '#38bdf8'; g.strokeRect(bx, by, tw, 62 * u);
        g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'top'; g.font = '700 ' + Math.round(13 * u + 2) + 'px system-ui,sans-serif'; g.fillText(inf[0] + ' ' + inf[1], bx + 8, by + 6 * u);
        g.font = Math.round(9 * u + 3) + 'px system-ui,sans-serif'; wrap(inf[2], bx + 8, by + 26 * u, tw - 16, 13 * u); g.globalAlpha = 1;
      }
    }
    function wrap(t, x, y, mw, lh) { var w = t.split(' '), line = '', n = 0; for (var i = 0; i < w.length; i++) { var tst = line + w[i] + ' '; if (g.measureText(tst).width > mw && line) { if (n < 2) g.fillText(line, x, y + n * lh); n++; line = w[i] + ' '; } else line = tst; } if (n < 3) g.fillText(line, x, y + n * lh); }
    function classify(x, y) {
      var W = cv.W, H = cv.H;
      if (Math.hypot(x * W - 0.1 * W, y * H - 0.13 * H) < Math.min(W, H) * 0.1) return 'sun';
      for (var i = 0; i < clouds.length; i++) if (Math.abs(clouds[i].x - x) < 0.1 && Math.abs(clouds[i].y - y) < 0.09) return 'cond';
      if (y < CLOUD_Y + 0.04 && y > 0.04) return 'cond';
      if (x >= COAST && y > surf(x) + 0.05) return 'ground';
      if (x < COAST && y > SEA) return 'ocean';
      if (S.ground === 'forest') for (var j = 0; j < TREES.length; j++) if (Math.abs(TREES[j] - x) < 0.035 && y > surf(x) - 0.12 && y < surf(x) + 0.02) return 'trans';
      if (x >= COAST && y > surf(x) - 0.05) return 'runoff';
      if (x < COAST) return 'evap';
      return 'precip';
    }
    K.on(cv, 'pointerdown', function (e) {
      var p = K.pos(e, cv), k = classify(p.x / cv.W, p.y / cv.H);
      tapLbl = { k: k, x: p.x, y: p.y, t: 3.5 };
      if (k === 'sun') { flash = 1.5; K.snd('whoosh'); } else K.snd('pop');
      if (k === 'cond') stats.cond = true;
      K.fb(INFO[k][0] + ' ' + INFO[k][1] + ': ' + INFO[k][2], ''); K.say(INFO[k][1] + '. ' + INFO[k][2]);
    });
    K.loop(function (dt, time) {
      if (!S.paused) step(dt * (K.lp ? 1.2 : 1));
      if (tapLbl) { tapLbl.t -= dt; if (tapLbl.t <= 0) tapLbl = null; }
      if (flash > 0) flash = Math.max(0, flash - dt);
      draw(time);
      t0 += dt; if (t0 > 0.25) { t0 = 0; var c = counts(); setRo('oc', c.oc); setRo('va', c.v); setRo('cl', c.c); setRo('ra', c.r); setRo('sn', c.s); setRo('ri', c.o); setRo('gw', c.g); setRo('ts', Math.round(tsum()) + ' °C'); }
    });
    K.fb('👋 Tap the sea, a cloud or the mountain to learn what happens there.', '');
    return { destroy: K.destroy };
  }
});
})();

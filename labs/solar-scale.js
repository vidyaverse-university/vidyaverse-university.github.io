/* VidyaVerse University v2 — Lab: Solar System to Scale (plain script, self-contained) */
(function () {
'use strict';
var ID = 'solar-scale', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#4338ca;--a2:#f59e0b}§ .vt{position:absolute;left:8px;top:8px;z-index:2;display:flex;gap:6px;flex-wrap:wrap}§ .vt .btn{background:rgba(6,10,31,.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:6px 10px;font-size:.85em}§ .vt .btn.on{background:linear-gradient(135deg,var(--a),var(--a2))}§ .pinfo p{margin:.3em 0}§ canvas.main{cursor:pointer}";

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

// NASA planetary fact-sheet values (rounded). r = mean radius km, a = semi-major axis AU, T = orbital period (Earth years), g = surface gravity m/s²
var PL = [
  { n: 'Mercury', r: 2440, a: 0.387, T: 0.241, g: 3.7, day: '176 Earth days (sunrise to sunrise)', moons: '0', c: '#a8a29e', c2: '#57534e', f: 'Smallest planet; no air to hold heat, so −180 °C at night and 430 °C by day.' },
  { n: 'Venus', r: 6052, a: 0.723, T: 0.615, g: 8.9, day: '117 Earth days; it spins backwards', moons: '0', c: '#fde68a', c2: '#d97706', f: 'Hottest planet (about 465 °C) because its thick CO₂ air traps heat.' },
  { n: 'Earth', r: 6371, a: 1.0, T: 1.0, g: 9.8, day: '24 hours', moons: '1', c: '#60a5fa', c2: '#15803d', f: 'The only world known to have liquid water oceans on its surface — and life.' },
  { n: 'Mars', r: 3390, a: 1.524, T: 1.881, g: 3.7, day: '24 h 40 min', moons: '2', c: '#f87171', c2: '#9a3412', f: 'Home of Olympus Mons, the tallest volcano known. India’s Mangalyaan reached Mars orbit in 2014.' },
  { n: 'Jupiter', r: 69911, a: 5.203, T: 11.86, g: 24.8, day: '9 h 56 min (fastest spin)', moons: '95+', c: '#fbbf24', c2: '#b45309', f: 'Largest planet — more than twice the mass of all the other planets combined.' },
  { n: 'Saturn', r: 58232, a: 9.537, T: 29.45, g: 10.4, day: '10 h 34 min', moons: '270+', c: '#fde68a', c2: '#a16207', f: 'Its rings are mostly ice, hundreds of thousands of km wide but often only about 10 m thick.' },
  { n: 'Uranus', r: 25362, a: 19.19, T: 84.0, g: 8.7, day: '17 h 14 min', moons: '28+', c: '#a5f3fc', c2: '#0e7490', f: 'Tipped on its side (98°), so each pole gets about 42 years of daylight.' },
  { n: 'Neptune', r: 24622, a: 30.07, T: 164.8, g: 11.2, day: '16 h 6 min', moons: '16', c: '#818cf8', c2: '#1e3a8a', f: 'Windiest planet — winds over 2,000 km/h. Found in 1846 using maths before it was seen!' }
];
var SUN_R = 696000, AU_KM = 149.6e6, LIGHT_S_PER_AU = 499;
function lt(a) { var s = a * LIGHT_S_PER_AU; return s < 3600 ? (s / 60).toFixed(1) + ' min' : (s / 3600).toFixed(2) + ' h'; }
function len(m) { if (m >= 1000) return (m / 1000).toFixed(m >= 10000 ? 0 : 2) + ' km'; if (m >= 1) return m.toFixed(m >= 100 ? 0 : 1) + ' m'; if (m >= 0.01) return (m * 100).toFixed(1) + ' cm'; return (m * 1000).toFixed(1) + ' mm'; }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Solar System to Scale', icon: '🪐', faculty: 'school', bands: ['primary', 'middle', 'secondary'],
  summary: 'Compare the true sizes and distances of the planets, watch them orbit with Kepler’s third law, time sunlight’s journey and build a scale model in your head.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var view = 'size', sel = -1, logD = true, years = 0, speed = 1, stars = [], dirty = true, hits = [];
    for (var i = 0; i < (K.lp ? 70 : 160); i++) stars.push([Math.random(), Math.random(), Math.random()]);
    K.shell({
      icon: '🪐', title: 'Solar System to Scale',
      goal: 'Feel how BIG and how EMPTY space really is — and why the outer planets take so long to go round.',
      how: '<p>Use the buttons on the picture to switch views. <b>Tap a planet</b> to see its facts.</p><ul><li><b>Sizes:</b> all planets drawn to the same scale, with the edge of the Sun on the left. The Sun is about 109 Earths wide.</li><li><b>Distances:</b> 1 astronomical unit (AU) = Earth–Sun distance ≈ 149.6 million km. Light (300,000 km/s) takes about 8.3 minutes to cross 1 AU. Switch between a <i>log</i> scale (everything fits) and a true <i>linear</i> scale.</li><li><b>Orbits:</b> planets move at their real relative speeds. <b>Kepler’s third law:</b> T² = a³ when T is in Earth years and a in AU.</li><li><b>Scale model:</b> shrink the Sun to any size and see how big and far the planets would be.</li></ul>',
      note: 'Orbits are drawn as circles (real ones are slightly elliptical) and in the Orbits/Distances views distances and planet dots are not to the same scale. Values rounded from NASA fact sheets; moon counts keep rising as new moons are discovered.',
      onMode: function () { dirty = true; },
      onReset: function () { setView('size'); sel = -1; years = 0; sSp.set(0); sSun.set(100); info(); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Solar system view. Tap a planet for facts.' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var vt = K.h('div', 'vt', null, { role: 'group', 'aria-label': 'View' }); K.stage.appendChild(vt);
    var vb = { size: K.btn(vt, '⚪ Sizes', '', function () { setView('size'); }), dist: K.btn(vt, '📏 Distances', '', function () { setView('dist'); }), orbit: K.btn(vt, '🌀 Orbits', '', function () { setView('orbit'); }) };
    var bLog = K.btn(vt, 'Scale: log', '', function () { logD = !logD; bLog.textContent = 'Scale: ' + (logD ? 'log' : 'linear'); dirty = true; K.fb(logD ? 'Log scale: each step to the right is 10× farther, so everything fits.' : 'True linear scale: notice how crowded the inner planets are and how far away Neptune is!', ''); });
    function setView(v) { view = v; for (var k in vb) { vb[k].classList.toggle('on', k === v); vb[k].setAttribute('aria-pressed', k === v ? 'true' : 'false'); } bLog.hidden = v === 'size'; dirty = true; }
    setView('size');
    var ic = K.card('🔭 Planet facts'), pinfo = K.h('div', 'pinfo'); ic.appendChild(pinfo);
    function info() {
      if (sel < 0) { pinfo.innerHTML = '<p>Tap a planet in the picture, or choose one:</p>'; }
      else { var p = PL[sel]; pinfo.innerHTML = '<p style="font-size:1.15em"><b style="color:' + p.c + '">● ' + p.n + '</b></p><p>Radius <b>' + p.r.toLocaleString('en-IN') + ' km</b> (' + (p.r / 6371).toFixed(2) + ' × Earth)</p><p>Distance from Sun <b>' + p.a + ' AU</b> ≈ ' + Math.round(p.a * 149.6) + ' million km</p><p>Sunlight takes <b>' + lt(p.a) + '</b> to arrive</p><p>One orbit (year) <b>' + p.T + ' Earth years</b> · Kepler: a³ = ' + Math.pow(p.a, 3).toFixed(3) + ', T² = ' + (p.T * p.T).toFixed(3) + '</p><p>Day length: ' + p.day + ' · Gravity ' + p.g + ' m/s² · Moons: ' + p.moons + '</p><p>✨ ' + p.f + '</p>'; }
      var row = K.h('div', 'row'); PL.forEach(function (p, i) { var b = K.h('button', 'btn' + (i === sel ? ' on' : ''), p.n.slice(0, 3), { type: 'button', 'aria-label': p.n }); b.style.padding = '6px 8px'; b.onclick = function () { choose(i); }; row.appendChild(b); }); pinfo.appendChild(row);
    }
    function choose(i) { sel = i; K.snd('pop'); info(); dirty = true; K.say(PL[i].n + '. ' + PL[i].f); }
    info();
    var oc = K.card('⏱️ Orbit speed');
    var sSp = K.slider(oc, { label: 'Time speed', min: -2, max: 2, step: 0.1, value: 0, fmt: function (v) { var y = Math.pow(10, v); return y < 1 ? Math.round(y * 365) + ' days/s' : y.toFixed(1) + ' years/s'; }, on: function (v) { speed = Math.pow(10, v); } });
    var setY = K.ro(oc, [['y', 'Earth years passed'], ['nep', 'Neptune laps']]);
    var mc = K.card('🏀 Scale model');
    var setM = K.ro(mc, [['sun', 'Sun'], ['e', 'Earth size'], ['ed', 'Earth distance'], ['j', 'Jupiter size'], ['nd', 'Neptune distance']]);
    var sSun = K.slider(mc, { label: 'Make the Sun this wide', min: 5, max: 1000, step: 5, value: 100, unit: 'cm', on: function () { model(); } });
    function model() { var D = sSun.get() / 100, k = D / (2 * SUN_R); setM('sun', len(D)); setM('e', len(2 * 6371 * k)); setM('ed', len(AU_KM * k)); setM('j', len(2 * 69911 * k)); setM('nd', len(30.07 * AU_KM * k)); }
    model();

    K.tasks([
      { title: 'Giant hunt', text: 'In <b>Sizes</b> view, tap the <b>largest planet</b>.', hint: 'It has stripes and a Great Red Spot, and is fifth from the Sun.', good: 'Jupiter! Its radius is about 11 times Earth’s.', xp: 10,
        start: function () { setView('size'); sel = -1; info(); }, check: function () { return sel === 4; } },
      { title: 'Earths across Jupiter', text: 'How many Earths would fit side by side across Jupiter? (Use the radii: Jupiter 69,911 km, Earth 6,371 km.)', ask: { answer: 11, tol: 0.6, unit: 'Earths' }, hint: 'Divide: 69,911 ÷ 6,371.', good: 'About 11. And about 10 Jupiters fit across the Sun — so about 109 Earths!', xp: 15 },
      { title: 'Kepler’s law', text: 'Open <b>Orbits</b>. Mars is <b>1.52 AU</b> from the Sun. Using <b>T² = a³</b>, how long is a Mars year in Earth years?', ask: { answer: 1.88, tol: 0.06, unit: 'years' }, hint: 'a³ = 1.52 × 1.52 × 1.52 ≈ 3.51. Then T = √3.51.', good: 'T ≈ 1.88 years. Kepler found this pattern in 1619 from careful observations; Newton later explained it with gravity.', xp: 20,
        start: function () { setView('orbit'); sSp.set(-0.3); } },
      { title: 'Slow sunlight', text: 'Open <b>Distances</b>. Tap the planet where sunlight takes <b>more than 4 hours</b> to arrive.', hint: 'Light takes 8.3 minutes per AU. 4 hours ≈ 29 AU.', good: 'Neptune: about 4.2 hours! When you see Neptune, you see it as it was hours ago.', xp: 20,
        start: function () { setView('dist'); sel = -1; info(); }, check: function () { return sel === 7; } },
      { title: 'Model in a park', text: 'Use the <b>Scale model</b> slider: make the Sun <b>100 cm</b> wide (like a big beach ball). How many metres away would Earth be?', ask: { answer: 107, tol: 4, unit: 'm' }, hint: 'Read “Earth distance” in the Scale model card, or work out 149.6 million ÷ 1.392 million.', good: 'About 107 m away — and Earth would be under 1 cm wide. Neptune would be over 3 km away. Space is mostly empty!', xp: 20,
        start: function () { sSun.set(60); } }
    ]);

    function bgStars(W, H, t) { g.fillStyle = '#03050f'; g.fillRect(0, 0, W, H); stars.forEach(function (s) { var tw = K.rm ? 0.7 : 0.5 + 0.5 * Math.sin(t / 700 + s[2] * 20); g.fillStyle = 'rgba(255,255,255,' + (0.25 + 0.6 * s[2] * tw) + ')'; g.fillRect(s[0] * W, s[1] * H, s[2] > 0.8 ? 2 : 1, s[2] > 0.8 ? 2 : 1); }); }
    function planet(x, y, r, p, ring) {
      r = Math.max(r, 1.5);
      if (ring) { g.strokeStyle = 'rgba(253,230,138,.65)'; g.lineWidth = Math.max(1, r * 0.18); g.beginPath(); g.ellipse(x, y, r * 2.1, r * 0.55, -0.35, 0, Math.PI * 2); g.stroke(); }
      var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, p.c); gr.addColorStop(1, p.c2);
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
      if (p.n === 'Jupiter' && r > 8) { g.strokeStyle = 'rgba(120,53,15,.4)'; g.lineWidth = r * 0.1; [-0.4, 0, 0.35].forEach(function (k) { g.beginPath(); g.moveTo(x - r * Math.sqrt(1 - k * k) * 0.95, y + k * r); g.lineTo(x + r * Math.sqrt(1 - k * k) * 0.95, y + k * r); g.stroke(); }); g.fillStyle = 'rgba(185,28,28,.7)'; g.beginPath(); g.ellipse(x + r * 0.3, y + r * 0.22, r * 0.16, r * 0.09, 0, 0, Math.PI * 2); g.fill(); }
    }
    function label(t, x, y, col, fs) { g.font = '600 ' + fs + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = col || '#d5dbf7'; g.fillText(t, x, y); }
    function drawSize(W, H) {
      var sliver = Math.max(24, W * 0.06), gap = Math.max(6, W * 0.015), sum = 0; PL.forEach(function (p) { sum += 2 * p.r; });
      var k = Math.min(H * 0.3 / 69911, (W - sliver - gap * 10) / sum), cy = H * 0.5, sr = SUN_R * k;
      var sg = g.createRadialGradient(sliver - sr, cy, sr * 0.9, sliver - sr, cy, sr * 1.03); sg.addColorStop(0, '#fbbf24'); sg.addColorStop(0.97, '#fde68a'); sg.addColorStop(1, 'rgba(253,230,138,0)');
      g.fillStyle = sg; g.beginPath(); g.arc(sliver - sr, cy, sr * 1.03, 0, Math.PI * 2); g.fill();
      label('Sun', sliver * 0.45, cy + H * 0.3, '#fde68a', 12);
      var x = sliver + gap * 1.5, fs = W < 500 ? 10 : 12; hits = [];
      PL.forEach(function (p, i) { var r = p.r * k; x += r; planet(x, cy, r, p, p.n === 'Saturn'); if (i === sel) { g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(x, cy, Math.max(r, 4) + 6, 0, Math.PI * 2); g.stroke(); } label(W < 500 ? p.n.slice(0, 3) : p.n, x, cy + Math.max(r, 6) + 10 + (i % 2) * (W < 500 ? 12 : 0), i === sel ? '#fff' : '#aab3d9', fs); hits.push(x); x += r + gap; });
      g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = '#aab3d9'; g.font = '12px system-ui,sans-serif'; g.fillText('Same scale: 1 px ≈ ' + Math.round(1 / k).toLocaleString('en-IN') + ' km', 10, H - 22);
    }
    function dX(a, W) { var L = 30, w = W - 60; if (logD) return L + (Math.log(a) - Math.log(0.25)) / (Math.log(40) - Math.log(0.25)) * w; return L + a / 31 * w; }
    function drawDist(W, H) {
      var cy = H * 0.55; g.strokeStyle = 'rgba(255,255,255,.15)'; g.lineWidth = 1; g.beginPath(); g.moveTo(10, cy); g.lineTo(W - 10, cy); g.stroke();
      g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(logD ? 18 : dX(0, W), cy, 8, 0, Math.PI * 2); g.fill();
      var ticks = logD ? [0.3, 1, 3, 10, 30] : [0, 5, 10, 15, 20, 25, 30];
      ticks.forEach(function (a) { var x = dX(a, W); g.strokeStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(x, cy + 30); g.lineTo(x, cy + 38); g.stroke(); label(a + ' AU', x, cy + 42, '#8b93bd', 10); });
      hits = []; var fs = W < 500 ? 10 : 12;
      PL.forEach(function (p, i) { var x = dX(p.a, W), r = 3 + Math.sqrt(p.r / 6371) * 3.5; hits.push(x); planet(x, cy, r, p, p.n === 'Saturn'); var up = i % 2 ? -1 : 1, ty = up > 0 ? cy - 40 - r : cy + 58; if (i === sel) { g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(x, cy, r + 6, 0, Math.PI * 2); g.stroke(); } if (!logD && i < 4 && i !== sel) return; label(p.n, x, ty, i === sel ? '#fff' : '#d5dbf7', fs); label('☀→ ' + lt(p.a), x, ty + fs + 3, '#fbbf24', fs - 1); });
      if (!logD) label('Inner planets crowd near the Sun — tap to zoom in with Log scale', W / 2, H - 26, '#8b93bd', 11);
    }
    function drawOrbit(W, H) {
      var cx = W / 2, cy = H / 2 + 10, R = Math.min(W, H) * 0.44; hits = [];
      var sg = g.createRadialGradient(cx, cy, 2, cx, cy, 18); sg.addColorStop(0, '#fff7cc'); sg.addColorStop(0.5, '#fbbf24'); sg.addColorStop(1, 'rgba(251,191,36,0)'); g.fillStyle = sg; g.beginPath(); g.arc(cx, cy, 18, 0, Math.PI * 2); g.fill();
      PL.forEach(function (p, i) {
        var rr = logD ? R * Math.sqrt(p.a / 30.07) : R * p.a / 30.07, ang = -Math.PI / 2 + 2 * Math.PI * years / p.T + i * 0.7;
        g.strokeStyle = i === sel ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.12)'; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, rr, 0, Math.PI * 2); g.stroke();
        var x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr, r = 2.5 + Math.sqrt(p.r / 6371) * 2.2;
        if (!K.lp) { g.strokeStyle = p.c; g.globalAlpha = 0.35; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, rr, ang - Math.min(1.2, 0.25 + 0.6 / p.T), ang); g.stroke(); g.globalAlpha = 1; }
        planet(x, y, r, p, p.n === 'Saturn'); hits.push([x, y]);
        if (i === sel) { g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(x, y, r + 6, 0, Math.PI * 2); g.stroke(); label(p.n + ' · T = ' + p.T + ' yr', x, y + r + 8, '#fff', 12); }
      });
      g.textAlign = 'right'; g.textBaseline = 'bottom'; g.font = '12px system-ui,sans-serif'; g.fillStyle = '#aab3d9'; g.fillText(logD ? 'distances √-compressed so all fit' : 'true linear distances', W - 10, H - 8);
    }
    function draw(t) { var W = cv.W, H = cv.H; bgStars(W, H, t); if (view === 'size') drawSize(W, H); else if (view === 'dist') drawDist(W, H); else drawOrbit(W, H); }
    K.on(cv, 'pointerdown', function (e) {
      var p = K.pos(e, cv), best = -1, bd = 1e9;
      hits.forEach(function (h, i) { var d = Array.isArray(h) ? Math.hypot(h[0] - p.x, h[1] - p.y) : Math.abs(h - p.x); if (d < bd) { bd = d; best = i; } });
      if (best >= 0 && bd < Math.max(44, cv.W * 0.06)) choose(best); else K.snd('tick');
    });
    var tick = 0;
    K.loop(function (dt, t) {
      if (view === 'orbit' && !K.rm) years += dt * speed;
      else if (view === 'orbit' && K.rm) years += dt * Math.min(speed, 0.2);
      tick += dt; if (tick > 0.2) { tick = 0; setY('y', years.toFixed(2)); setY('nep', (years / 164.8).toFixed(4)); }
      draw(t);
    });
    K.fb('👋 Tap a planet. Switch views with the buttons on the picture.', '');
    return { destroy: K.destroy };
  }
});
})();

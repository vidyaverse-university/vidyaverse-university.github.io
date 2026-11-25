/* VidyaVerse University v2 — Lab: Balancing Chemical Equations (plain script, self-contained) */
(function () {
'use strict';
var ID = 'chemical-balance', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#7c3aed;--a2:#34d399}§ .eq{font-size:1.25em;font-weight:700;text-align:center;padding:10px 6px;line-height:1.6;word-break:break-word}§ .eq .cf{color:#facc15}§ .eq.ok{color:#86efac}" +
"§ .stp{display:grid;grid-template-columns:1fr auto auto auto;gap:6px;align-items:center;margin:4px 0}§ .stp .f{font-weight:700;font-size:1.05em}§ .stp .v{min-width:2.2em;text-align:center;font-size:1.25em;font-weight:800;color:#facc15;font-variant-numeric:tabular-nums}§ .stp .s{font-size:.75em;color:var(--mu);grid-column:1/-1;margin-top:-4px}§ .sep{font-size:.8em;color:var(--mu);margin:8px 0 2px;text-transform:uppercase;letter-spacing:.08em}";

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

// Standard atomic masses (g/mol, rounded) and CPK-style colours
var AT = { H: [1.008, '#f8fafc', 0.62], C: [12.011, '#3f3f46', 0.9], N: [14.007, '#3b82f6', 0.88], O: [15.999, '#ef4444', 0.86], Na: [22.99, '#a855f7', 1.1], Mg: [24.305, '#22c55e', 1.05], Al: [26.982, '#cbd5e1', 1.05], S: [32.06, '#facc15', 1.0], Cl: [35.45, '#4ade80', 1.0], K: [39.098, '#8b5cf6', 1.15], Ca: [40.078, '#15803d', 1.1], Fe: [55.845, '#ea580c', 1.05] };
var EQ = [
  { n: 'Making water', r: ['H2', 'O2'], p: ['H2O'], ans: [2, 1, 2], lv: 1, why: 'Hydrogen burns in oxygen — the reaction in hydrogen fuel cells and some rocket engines.' },
  { n: 'Making ammonia (Haber process)', r: ['N2', 'H2'], p: ['NH3'], ans: [1, 3, 2], lv: 1, why: 'Ammonia from the Haber process is used to make fertilisers like urea that feed billions of people.' },
  { n: 'Burning magnesium', r: ['Mg', 'O2'], p: ['MgO'], ans: [2, 1, 2], lv: 1, why: 'Magnesium ribbon burns with a dazzling white flame — a favourite school lab demo.' },
  { n: 'Burning methane (CNG / biogas)', r: ['CH4', 'O2'], p: ['CO2', 'H2O'], ans: [1, 2, 1, 2], lv: 2, why: 'Methane is the main gas in CNG and biogas.' },
  { n: 'Rusting iron', r: ['Fe', 'O2'], p: ['Fe2O3'], ans: [4, 3, 2], lv: 2, why: 'Iron slowly combines with oxygen (with water helping) to form rust, iron(III) oxide.' },
  { n: 'Sodium in water', r: ['Na', 'H2O'], p: ['NaOH', 'H2'], ans: [2, 2, 2, 1], lv: 2, why: 'Sodium fizzes violently in water, making sodium hydroxide and hydrogen gas — never try it at home!' },
  { n: 'Heating limestone', r: ['CaCO3'], p: ['CaO', 'CO2'], ans: [1, 1, 1], lv: 1, why: 'Lime kilns turn limestone into quicklime for cement and whitewash (chuna).' },
  { n: 'Decomposing potassium chlorate', r: ['KClO3'], p: ['KCl', 'O2'], ans: [2, 2, 3], lv: 2, why: 'Used to release oxygen, for example in emergency oxygen generators.' },
  { n: 'Burning LPG (propane)', r: ['C3H8', 'O2'], p: ['CO2', 'H2O'], ans: [1, 5, 3, 4], lv: 3, why: 'Cooking-gas cylinders hold LPG, mostly propane and butane.' },
  { n: 'Neutralising an acid', r: ['Ca(OH)2', 'HCl'], p: ['CaCl2', 'H2O'], ans: [1, 2, 1, 2], lv: 2, why: 'Acid + base → salt + water. Slaked lime neutralises acidic soil and waste.' },
  { n: 'Aluminium in acid', r: ['Al', 'HCl'], p: ['AlCl3', 'H2'], ans: [2, 6, 2, 3], lv: 3, why: 'A reactive metal displaces hydrogen from acid.' },
  { n: 'Respiration', r: ['C6H12O6', 'O2'], p: ['CO2', 'H2O'], ans: [1, 6, 6, 6], lv: 3, why: 'Your cells release energy from glucose this way every second.' },
  { n: 'Photosynthesis', r: ['CO2', 'H2O'], p: ['C6H12O6', 'O2'], ans: [6, 6, 1, 6], lv: 3, why: 'Plants use light energy to build glucose — the reverse of respiration.' },
  { n: 'Burning ethane', r: ['C2H6', 'O2'], p: ['CO2', 'H2O'], ans: [2, 7, 4, 6], lv: 4, why: 'An odd number of O atoms forces you to double everything.' },
  { n: 'Water treatment (alum)', r: ['Al2(SO4)3', 'Ca(OH)2'], p: ['Al(OH)3', 'CaSO4'], ans: [1, 3, 2, 3], lv: 4, why: 'Alum (phitkari) with lime forms sticky Al(OH)₃ that drags dirt out of water.' }
];
function parseF(s) {
  var i = 0;
  function num() { var d = ''; while (i < s.length && /[0-9]/.test(s[i])) d += s[i++]; return d ? +d : 1; }
  function grp() { var m = {}; while (i < s.length) { var c = s[i]; if (c === '(') { i++; var inner = grp(); i++; var n = num(); for (var k in inner) m[k] = (m[k] || 0) + inner[k] * n; } else if (c === ')') return m; else { var e = s[i++]; while (i < s.length && /[a-z]/.test(s[i])) e += s[i++]; var n2 = num(); m[e] = (m[e] || 0) + n2; } } return m; }
  return grp();
}
function atomsList(s) { var m = parseF(s), out = []; Object.keys(m).sort(function (a, b) { return (a === 'H') - (b === 'H') || AT[b][0] - AT[a][0]; }).forEach(function (e) { for (var k = 0; k < m[e]; k++) out.push(e); }); return out; }
function sub(s) { return s.replace(/(\d+)/g, '<sub>$1</sub>'); }
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function mass(s) { var m = parseF(s), t = 0; for (var e in m) t += AT[e][0] * m[e]; return t; }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Balance the Equation', icon: '⚗️', faculty: 'school', bands: ['middle', 'secondary', 'senior'],
  summary: 'Balance real chemical reactions by changing coefficients and watching atoms and masses on both sides — the law of conservation of mass made visible.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var cur = 0, co = [], glow = 0, wasOk = false, dirty = true;
    K.shell({
      icon: '⚗️', title: 'Balance the Equation',
      goal: 'Atoms are never created or destroyed in a reaction — make both sides match.',
      how: '<p>Use <b>+</b> and <b>−</b> to change the big numbers in front of each formula (the <b>coefficients</b>). You may tap a molecule in the picture to add one too.</p><ul><li>Never change the small numbers (subscripts) — that would make a different substance (H₂O is water; H₂O₂ is hydrogen peroxide!).</li><li>Count each element on both sides. The bars underneath turn green when they match.</li><li><b>Strategy:</b> start with an element that appears in only one substance on each side; leave H and O (especially lone O₂ or H₂) for last; if you get an odd number of O atoms, double everything.</li><li>Give the answer in the <b>smallest whole numbers</b> (2H₂ + O₂ → 2H₂O, not 4H₂ + 2O₂ → 4H₂O).</li></ul><p>When balanced, the total mass of reactants equals the total mass of products — <b>Lavoisier’s law of conservation of mass</b> (1789).</p>',
      note: 'Atoms are drawn as simple spheres (CPK-style colours), not real molecular shapes or bonds. Masses use standard atomic weights in g/mol. State symbols (s, l, g, aq) and reaction conditions are left out.',
      onMode: function () { dirty = true; },
      onReset: function () { load(0); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Molecules on each side of the equation and atom counts' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var ec = K.card('🧪 Reaction'), sel = K.h('select', '', null, { 'aria-label': 'Choose a reaction' }); ec.appendChild(sel);
    EQ.forEach(function (e, i) { sel.appendChild(K.h('option', '', '★'.repeat(e.lv) + ' ' + e.n, { value: i })); });
    K.on(sel, 'change', function () { load(+sel.value); K.snd('tap'); });
    var eqEl = K.h('div', 'eq', '', { 'aria-live': 'polite' }); ec.appendChild(eqEl);
    var whyEl = K.h('p', 'note', ''); ec.appendChild(whyEl);
    var stc = K.card('🔢 Coefficients'), stBox = K.h('div'); stc.appendChild(stBox);
    var br = K.h('div', 'row'); stc.appendChild(br);
    K.btn(br, '1️⃣ All to 1', '', function () { co = co.map(function () { return 1; }); upd(); });
    K.btn(br, '✔ Check', 'pri', function () { verdict(true); });
    var rc = K.card('⚖️ Conservation of mass');
    var setRo = K.ro(rc, [['ml', 'Reactants'], ['mr', 'Products'], ['at', 'Atoms L / R'], ['st', 'Status']]);
    function species() { var e = EQ[cur]; return e.r.concat(e.p); }
    function load(i) {
      cur = i; sel.value = i; var sp = species(); co = sp.map(function () { return 1; }); stBox.innerHTML = '';
      sp.forEach(function (f, k) {
        if (k === 0) stBox.appendChild(K.h('div', 'sep', 'Reactants'));
        if (k === EQ[cur].r.length) stBox.appendChild(K.h('div', 'sep', 'Products'));
        var row = K.h('div', 'stp'); row.appendChild(K.h('span', 'f', sub(f)));
        K.btn(row, '−', '', function () { if (co[k] > 1) { co[k]--; upd(); } else K.snd('bad'); }).setAttribute('aria-label', 'Decrease ' + f);
        var v = K.h('span', 'v', '1', { 'aria-label': 'Coefficient of ' + f }); row.appendChild(v);
        K.btn(row, '+', '', function () { if (co[k] < 20) { co[k]++; upd(); } }).setAttribute('aria-label', 'Increase ' + f);
        stBox.appendChild(row);
      });
      whyEl.textContent = '🌍 ' + EQ[cur].why; wasOk = false; upd();
    }
    function tally() { var e = EQ[cur], L = {}, R = {}; species().forEach(function (f, k) { var m = parseF(f), side = k < e.r.length ? L : R; for (var el2 in m) side[el2] = (side[el2] || 0) + m[el2] * co[k]; }); var els = Object.keys(L); Object.keys(R).forEach(function (x) { if (els.indexOf(x) < 0) els.push(x); }); return { L: L, R: R, els: els }; }
    function balanced() { var t = tally(); return t.els.every(function (x) { return (t.L[x] || 0) === (t.R[x] || 0); }); }
    function minimal() { return co.reduce(function (a, b) { return gcd(a, b); }) === 1; }
    function solved() { return balanced() && minimal(); }
    function upd() {
      var vs = stBox.querySelectorAll('.v'); for (var i = 0; i < vs.length; i++) vs[i].textContent = co[i];
      var e = EQ[cur], sp = species(), html = '';
      sp.forEach(function (f, k) { if (k === e.r.length) html += ' → '; else if (k) html += ' + '; html += (co[k] > 1 ? '<span class="cf">' + co[k] + '</span>' : '') + sub(f); });
      var ok = balanced(); eqEl.innerHTML = html; eqEl.classList.toggle('ok', ok);
      var ml = 0, mr = 0; sp.forEach(function (f, k) { if (k < e.r.length) ml += mass(f) * co[k]; else mr += mass(f) * co[k]; });
      var t = tally(), nl = 0, nr = 0; t.els.forEach(function (x) { nl += t.L[x] || 0; nr += t.R[x] || 0; });
      setRo('ml', ml.toFixed(2) + ' g'); setRo('mr', mr.toFixed(2) + ' g'); setRo('at', nl + ' / ' + nr); setRo('st', ok ? (minimal() ? '✅ balanced' : 'balanced — simplify') : '❌ not yet');
      if (ok && !wasOk) { glow = 1; K.snd(minimal() ? 'good' : 'pop'); verdict(false); }
      wasOk = ok; dirty = true; K.snd('tick');
    }
    function verdict(manual) {
      var t = tally();
      if (balanced()) { if (minimal()) K.fb('⚖️ Balanced! Every atom on the left appears on the right — mass is conserved.', 'good'); else { var gg = co.reduce(function (a, b) { return gcd(a, b); }); K.fb('Balanced, but not the smallest numbers — divide every coefficient by ' + gg + '.', ''); } }
      else if (manual) { var off = t.els.filter(function (x) { return (t.L[x] || 0) !== (t.R[x] || 0); }).map(function (x) { return x + ' (' + (t.L[x] || 0) + ' vs ' + (t.R[x] || 0) + ')'; }); K.fb('Not balanced yet: ' + off.join(', ') + '.', 'bad'); K.snd('bad'); }
    }
    function lv(i, title, hint, xp) { var e = EQ[i]; return { title: title, text: 'Balance: <b>' + e.r.map(sub).join(' + ') + ' → ' + e.p.map(sub).join(' + ') + '</b> using the smallest whole numbers.', hint: hint, good: e.n + ': ' + e.ans.join(' : ') + ' — balanced! ' + e.why, xp: xp, start: function () { load(i); }, check: solved }; }
    K.tasks([
      lv(0, 'Water from gases', 'There are 2 O on the left but 1 on the right. Make 2 H₂O, then fix hydrogen.', 15),
      lv(3, 'Cooking-gas cousin: methane', 'Balance C first (already 1 = 1), then H: 4 H needs 2 H₂O. Finally count O on the right and fix O₂.', 20),
      lv(4, 'Rust', 'Fe₂O₃ has 3 O. To match O₂ pairs you need an even number of O: try 2 Fe₂O₃ (6 O) = 3 O₂. Then fix Fe.', 20),
      lv(8, 'LPG in the kitchen', 'C₃H₈: 3 C → 3 CO₂; 8 H → 4 H₂O. Now the right has 3×2 + 4 = 10 O, so you need 5 O₂.', 25),
      lv(10, 'Metal meets acid', '2 AlCl₃ has 6 Cl, so you need 6 HCl. That gives 6 H → 3 H₂. Then Al.', 25)
    ]);
    function hitList() { return layout ? layout.cols : []; }
    var layout = null;
    function drawMol(f, x, y, r) { var a = atomsList(f); a.forEach(function (e, k) { var ang = k * 2.39996, d = k ? r * 1.05 * Math.sqrt(k) : 0, ax = x + Math.cos(ang) * d, ay = y + Math.sin(ang) * d, ar = r * AT[e][2]; var gr = g.createRadialGradient(ax - ar * 0.35, ay - ar * 0.35, ar * 0.1, ax, ay, ar); gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.3, AT[e][1]); gr.addColorStop(1, shade(AT[e][1])); g.fillStyle = gr; g.beginPath(); g.arc(ax, ay, ar, 0, Math.PI * 2); g.fill(); if (r > 7) { g.fillStyle = e === 'H' || e === 'Al' || e === 'S' ? '#111' : '#fff'; g.font = '700 ' + Math.round(ar * 0.9) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, ax, ay + 0.5); } }); return Math.sqrt(a.length) * r * 1.05 + r; }
    function shade(hex) { var n = parseInt(hex.slice(1), 16), r = (n >> 16) * 0.45, gg = ((n >> 8) & 255) * 0.45, b = (n & 255) * 0.45; return 'rgb(' + (r | 0) + ',' + (gg | 0) + ',' + (b | 0) + ')'; }
    function draw() {
      var W = cv.W, H = cv.H, e = EQ[cur], sp = species(), n = sp.length; g.clearRect(0, 0, W, H);
      var bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#120a2a'); bg.addColorStop(1, '#06121c'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      if (glow > 0) { g.fillStyle = 'rgba(52,211,153,' + glow * 0.25 + ')'; g.fillRect(0, 0, W, H); }
      var topH = H * 0.6, colW = (W - 30) / n, cols = [];
      var biggest = 1; sp.forEach(function (f) { biggest = Math.max(biggest, atomsList(f).length); });
      sp.forEach(function (f, k) {
        var x0 = 15 + k * colW + (k >= e.r.length ? 10 : -10) * (n > 1 ? 1 : 0), cx = x0 + colW / 2, copies = Math.min(co[k], 6);
        var r = Math.max(3, Math.min(colW / (2.6 * Math.sqrt(biggest) + 2), topH / (copies * (2.2 * Math.sqrt(biggest) + 2.5)), 15));
        var slot = (topH - 30) / Math.max(1, copies);
        for (var c = 0; c < copies; c++) drawMol(f, cx, 24 + slot * (c + 0.5), r);
        g.fillStyle = '#facc15'; g.font = '800 ' + Math.round(Math.max(13, Math.min(22, colW / 6))) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'top';
        g.fillText((co[k] > 1 ? co[k] + ' ' : '') + f.replace(/(\d)/g, function (d) { return '₀₁₂₃₄₅₆₇₈₉'[+d]; }), cx, topH - 10);
        if (co[k] > 6) { g.fillStyle = '#fff'; g.font = '600 12px system-ui,sans-serif'; g.fillText('(showing 6 of ' + co[k] + ')', cx, 4); }
        cols.push({ x0: x0, x1: x0 + colW, k: k });
      });
      var ax = 15 + e.r.length * colW; g.fillStyle = '#e9d5ff'; g.font = '800 ' + Math.round(Math.min(30, colW / 4)) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('→', ax, topH * 0.5);
      layout = { cols: cols };
      // atom count bars
      var t = tally(), els = t.els, by = topH + 26, bh = H - by - 10, rowH = bh / Math.max(1, els.length), mx = 1; els.forEach(function (x) { mx = Math.max(mx, t.L[x] || 0, t.R[x] || 0); });
      g.strokeStyle = 'rgba(255,255,255,.1)'; g.beginPath(); g.moveTo(10, topH + 18); g.lineTo(W - 10, topH + 18); g.stroke();
      var mid = W / 2, half = W / 2 - 60, fs = Math.max(10, Math.min(15, rowH * 0.55));
      els.forEach(function (x, i) {
        var y = by + i * rowH, l = t.L[x] || 0, rr = t.R[x] || 0, okk = l === rr, h = Math.max(6, rowH * 0.55);
        g.fillStyle = okk ? '#34d399' : '#fb7185'; g.fillRect(mid - 22 - half * l / mx, y, half * l / mx, h); g.fillRect(mid + 22, y, half * rr / mx, h);
        g.fillStyle = AT[x][1]; g.beginPath(); g.arc(mid, y + h / 2, Math.min(14, h * 0.9), 0, Math.PI * 2); g.fill();
        g.fillStyle = x === 'H' || x === 'Al' || x === 'S' ? '#111' : '#fff'; g.font = '700 ' + fs + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(x, mid, y + h / 2 + 0.5);
        g.fillStyle = '#eef1ff'; g.textAlign = 'right'; g.fillText(String(l), mid - 26 - half * l / mx - 4, y + h / 2); g.textAlign = 'left'; g.fillText(String(rr) + (okk ? ' ✓' : ''), mid + 26 + half * rr / mx + 4, y + h / 2);
      });
    }
    K.on(cv, 'pointerdown', function (ev) { var p = K.pos(ev, cv); if (p.y > cv.H * 0.6) return; hitList().forEach(function (c) { if (p.x >= c.x0 && p.x < c.x1 && co[c.k] < 20) { co[c.k]++; upd(); K.snd('pop'); } }); });
    load(0);
    K.loop(function (dt) { if (glow > 0) { glow = Math.max(0, glow - dt * (K.rm ? 4 : 1.2)); dirty = true; } if (dirty) { dirty = false; draw(); } });
    K.fb('👋 Change the coefficients with + and − until every atom bar is green.', '');
    return { destroy: K.destroy };
  }
});
})();

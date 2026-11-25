/* VidyaVerse University v2 — Lab: Statistics Explorer (plain script, self-contained) */
(function () {
'use strict';
var ID = 'stats-lab', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#db2777;--a2:#38bdf8}§ .vt{position:absolute;left:8px;top:8px;z-index:2;display:flex;gap:6px}§ .vt .btn{background:rgba(6,10,31,.75);padding:6px 10px;font-size:.85em}§ .vt .btn.on{background:linear-gradient(135deg,var(--a),var(--a2))}§ .addv{width:6.5em}§ .dl{font-size:.85em;color:var(--mu);word-break:break-word;max-height:6.5em;overflow:auto}";

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

function srt(a) { return a.slice().sort(function (x, y) { return x - y; }); }
function med(s) { var n = s.length; if (!n) return NaN; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
function mean(a) { if (!a.length) return NaN; var t = 0; a.forEach(function (v) { t += v; }); return t / a.length; }
function sdp(a, s) { if (a.length < 1) return NaN; var m = mean(a), t = 0; a.forEach(function (v) { t += (v - m) * (v - m); }); return Math.sqrt(t / (a.length - (s ? 1 : 0))); }
function quart(s) { var n = s.length, h = Math.floor(n / 2); if (n < 4) return [NaN, NaN]; return [med(s.slice(0, h)), med(s.slice(n % 2 ? h + 1 : h))]; }
function modeOf(a) { var c = {}, mx = 0; a.forEach(function (v) { c[v] = (c[v] || 0) + 1; mx = Math.max(mx, c[v]); }); if (mx < 2) return 'none'; var m = Object.keys(c).filter(function (k) { return c[k] === mx; }); return m.length > 3 ? m.slice(0, 3).join(', ') + '…' : m.join(', '); }
function f1(v) { return isFinite(v) ? (Math.round(v * 10) / 10).toString() : '—'; }
function randn() { var u = 0, v = 0; while (u === 0) u = Math.random(); v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
var POP = { normal: { n: 'Normal (μ 50, σ 15)', mu: 50, sd: 15, draw: function () { return 50 + 15 * randn(); } }, uniform: { n: 'Uniform 0–100', mu: 50, sd: 100 / Math.sqrt(12), draw: function () { return Math.random() * 100; } }, skew: { n: 'Right-skewed (μ 40, σ 30)', mu: 40, sd: 30, draw: function () { return 10 - 30 * Math.log(1 - Math.random()); } } };

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Statistics Explorer', icon: '📊', faculty: 'school', bands: ['secondary', 'senior', 'ug', 'pg'],
  summary: 'Build data sets by tapping, then watch mean, median, mode, quartiles, standard deviation, box plots and histograms respond — plus a hands-on central limit theorem simulator.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var data = [], view = 'data', bins = 10, drag = null, sel = -1, pop = 'skew', nS = 25, means = [], dirty = true, G = null;
    K.shell({
      icon: '📊', title: 'Statistics Explorer',
      goal: 'See what averages and spread really measure — and why sample means behave so nicely.',
      how: '<p><b>Data view:</b> tap the number line to add a value, drag a dot to move it, drag it far up or down to delete it. Or type a value and press Add.</p><ul><li><b>Mean</b> x̄ = Σx ÷ n (the balance point, ▲). <b>Median</b> = middle value when sorted. <b>Mode</b> = most common value.</li><li><b>Range</b> = max − min. <b>Quartiles</b> Q1, Q3 split the sorted data into quarters; <b>IQR</b> = Q3 − Q1.</li><li><b>Standard deviation</b>: σ = √(Σ(x − x̄)² ÷ n) for a whole population; the <b>sample</b> SD s divides by n − 1.</li><li><b>Outliers</b> (1.5 × IQR rule): below Q1 − 1.5·IQR or above Q3 + 1.5·IQR. They pull the mean but hardly move the median.</li></ul><p><b>Sampling view (CLT):</b> draw many random samples of size n from a population and plot their means. However skewed the population, the means pile up in a near-normal bell with spread <b>SE = σ ÷ √n</b>.</p>',
      note: 'Values are whole numbers from 0 to 100. Quartiles use the “median of each half” method (the middle value is left out when n is odd); calculators and spreadsheets may use slightly different rules. Random draws use the browser’s pseudo-random generator.',
      onMode: function () { dirty = true; },
      onReset: function () { setData([]); setView('data'); means = []; }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Dot plot, box plot and histogram of your data' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var vt = K.h('div', 'vt'); K.stage.appendChild(vt);
    var vb = { data: K.btn(vt, '🔵 Data', '', function () { setView('data'); }), samp: K.btn(vt, '🎲 Sampling (CLT)', '', function () { setView('samp'); }) };
    function setView(v) { view = v; for (var k in vb) { vb[k].classList.toggle('on', k === v); vb[k].setAttribute('aria-pressed', k === v ? 'true' : 'false'); } dc.hidden = v !== 'data'; gc.hidden = v !== 'data'; scc.hidden = v !== 'samp'; dirty = true; }
    var rc = K.card('📐 Summary');
    var setRo = K.ro(rc, [['n', 'n'], ['mean', 'Mean'], ['med', 'Median'], ['mode', 'Mode'], ['rng', 'Range'], ['q', 'Q1 / Q3'], ['iqr', 'IQR'], ['sd', 'SD σ (pop.)'], ['s', 'SD s (sample)'], ['out', 'Outliers']]);
    var dc = K.card('✍️ Edit data'), ar = K.h('div', 'row'); dc.appendChild(ar);
    var addIn = K.h('input', 'addv', null, { type: 'number', min: 0, max: 100, step: 1, inputmode: 'numeric', 'aria-label': 'Value to add (0 to 100)' }); ar.appendChild(addIn);
    K.btn(ar, '➕ Add', 'pri', function () { var v = Math.round(parseFloat(addIn.value)); if (isFinite(v) && v >= 0 && v <= 100) { data.push(v); changed(); addIn.value = ''; } else K.fb('Enter a whole number from 0 to 100.', 'bad'); });
    K.on(addIn, 'keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); ar.querySelector('.pri').click(); } });
    K.btn(ar, '↩ Undo last', '', function () { data.pop(); changed(); });
    K.btn(ar, '🗑 Clear', '', function () { setData([]); });
    var dl = K.h('div', 'dl'); dc.appendChild(dl);
    var gc = K.card('🎲 Generate data'), gr = K.h('div', 'row'); gc.appendChild(gr);
    var sN = K.slider(gc, { label: 'How many values', min: 5, max: 200, step: 1, value: 30 });
    Object.keys(POP).forEach(function (k) { K.btn(gr, POP[k].n.split(' (')[0], '', function () { var a = []; while (a.length < sN.get()) { var v = Math.round(POP[k].draw()); if (v >= 0 && v <= 100) a.push(v); } setData(a); }); });
    var sB = K.slider(gc, { label: 'Histogram bins', min: 4, max: 25, step: 1, value: 10, on: function (v) { bins = v; dirty = true; } });
    var scc = K.card('🎲 Sampling distribution'), pr2 = K.h('div', 'row'), pb = {}; scc.appendChild(pr2);
    Object.keys(POP).forEach(function (k) { pb[k] = K.btn(pr2, POP[k].n, '', function () { pop = k; means = []; pUI(); dirty = true; }); });
    function pUI() { for (var k in pb) { pb[k].classList.toggle('on', k === pop); pb[k].setAttribute('aria-pressed', k === pop ? 'true' : 'false'); } }
    pUI();
    var sS = K.slider(scc, { label: 'Sample size n', min: 1, max: 100, step: 1, value: 25, on: function (v) { nS = v; means = []; dirty = true; } });
    var dr2 = K.h('div', 'row'); scc.appendChild(dr2);
    function drawSamples(k) { for (var j = 0; j < k; j++) { var t = 0; for (var i = 0; i < nS; i++) t += POP[pop].draw(); means.push(t / nS); } if (means.length > 20000) means.splice(0, means.length - 20000); dirty = true; K.snd(k > 1 ? 'whoosh' : 'pop'); }
    K.btn(dr2, '1 sample', '', function () { drawSamples(1); }); K.btn(dr2, '+100', '', function () { drawSamples(100); }); K.btn(dr2, '+1000', '', function () { drawSamples(1000); }); K.btn(dr2, 'Clear', '', function () { means = []; dirty = true; });
    var setS = K.ro(scc, [['k', 'Samples drawn'], ['mm', 'Mean of means'], ['sdm', 'SD of means'], ['se', 'Predicted σ/√n']]);

    function setData(a) { data = a.slice(); sel = -1; changed(); }
    function stats() { var s = srt(data), q = quart(s), iqr = q[1] - q[0], lo = q[0] - 1.5 * iqr, hi = q[1] + 1.5 * iqr, out = isFinite(iqr) ? s.filter(function (v) { return v < lo || v > hi; }) : []; return { s: s, n: s.length, mean: mean(s), med: med(s), q: q, iqr: iqr, sd: sdp(s, false), ss: s.length > 1 ? sdp(s, true) : NaN, out: out, lo: lo, hi: hi }; }
    function changed() {
      var st = stats(); setRo('n', st.n); setRo('mean', f1(st.mean)); setRo('med', f1(st.med)); setRo('mode', st.n ? modeOf(st.s) : '—'); setRo('rng', st.n ? st.s[st.n - 1] - st.s[0] : '—'); setRo('q', f1(st.q[0]) + ' / ' + f1(st.q[1])); setRo('iqr', f1(st.iqr)); setRo('sd', f1(st.sd)); setRo('s', f1(st.ss)); setRo('out', st.out.length ? st.out.join(', ') : 'none');
      dl.textContent = st.n ? 'Sorted: ' + st.s.join(', ') : 'No data yet — tap the number line.'; dirty = true;
    }
    changed(); setView('data');

    K.tasks([
      { title: 'Balance at 50', text: 'Make a data set of <b>exactly 5 values</b> whose <b>mean is 50</b>.', hint: 'The total must be 5 × 50 = 250. For example 30, 40, 50, 60, 70 — or be creative!', good: 'Mean 50: the values balance around 50 like weights on a see-saw.', xp: 15,
        start: function () { setView('data'); setData([]); }, check: function () { return data.length === 5 && Math.abs(mean(data) - 50) < 0.5; } },
      { title: 'Pull the mean', text: 'These are 7 test scores. Add <b>one</b> value so that the <b>mean is at least 5 more than the median</b>.', hint: 'Add one very large value (an outlier) — try 90 or 100. Watch which statistic moves more.', good: 'One outlier dragged the mean far right, while the median barely moved. That is why median is used for skewed data like incomes.', xp: 20,
        start: function () { setView('data'); setData([20, 25, 28, 30, 32, 35, 40]); }, check: function () { return data.length === 8 && mean(data) - med(srt(data)) >= 5; } },
      { title: 'Same mean, more spread', text: 'These 6 values all sit near 50. Drag them (or add more) so the <b>mean stays 50 ± 2</b> but the <b>standard deviation σ is at least 25</b>.', hint: 'Move points far out on BOTH sides equally — e.g. some near 10–20 and some near 80–90.', good: 'Same centre, very different spread. Mean tells you “where”, standard deviation tells you “how scattered”.', xp: 20,
        start: function () { setView('data'); setData([48, 49, 50, 50, 51, 52]); }, check: function () { var st = stats(); return st.n >= 6 && Math.abs(st.mean - 50) <= 2 && st.sd >= 25; } },
      { title: 'Spot the outlier', text: 'Daily minutes of exercise for 9 friends are shown. Using the <b>1.5 × IQR rule</b>, which value is an outlier?', ask: { options: ['12', '24', '70', 'None of them'], answer: 2 }, hint: 'Q1 = 15.5 and Q3 = 23, so IQR = 7.5. Upper fence = 23 + 1.5 × 7.5.', good: '70 is above the upper fence of 34.25 — an outlier. (12 is above the lower fence of 4.25.)', xp: 20,
        start: function () { setView('data'); setData([12, 15, 16, 18, 19, 21, 22, 24, 70]); } },
      { title: 'Central limit theorem', text: 'Open <b>🎲 Sampling</b>. The population is right-skewed with <b>σ = 30</b>. If you take samples of size <b>n = 25</b>, what will the <b>standard deviation of the sample means</b> be? Draw 1000 samples to check!', ask: { answer: 6, tol: 0.5 }, hint: 'Standard error = σ ÷ √n = 30 ÷ √25.', good: 'SE = 30 ÷ 5 = 6. And the means form a bell shape even though the population is skewed — the central limit theorem!', xp: 25,
        start: function () { setView('samp'); pop = 'skew'; pUI(); sS.set(25); means = []; } }
    ]);

    function geom() { var W = cv.W, H = cv.H, L = 18, R = 18, pw = W - L - R; return { W: W, H: H, L: L, pw: pw, X: function (v) { return L + pw * v / 100; }, V: function (x) { return (x - L) / pw * 100; }, boxY: 44, dotBase: H * 0.6, histTop: H * 0.66, histBot: H - 22 }; }
    function axis(y) { var G2 = G; g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1; g.beginPath(); g.moveTo(G2.L, y); g.lineTo(G2.L + G2.pw, y); g.stroke(); g.fillStyle = '#8b93bd'; g.font = '11px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'top'; for (var v = 0; v <= 100; v += 10) { var x = G2.X(v); g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 4); g.stroke(); if (G2.pw > 300 || v % 20 === 0) g.fillText(String(v), x, y + 5); } }
    function dotR() { return Math.max(3, Math.min(9, G.pw / 100 * 0.48)); }
    function dotPos() { var cnt = {}, r = dotR(), out = []; data.forEach(function (v, i) { var k = cnt[v] || 0; cnt[v] = k + 1; out.push({ i: i, x: G.X(v), y: G.dotBase - r - 1 - k * (r * 2 + 1) }); }); return out; }
    function drawData() {
      var st = stats(), W = G.W, H = G.H, r = dotR();
      // SD band + mean/median lines
      if (st.n) { g.fillStyle = 'rgba(56,189,248,.08)'; g.fillRect(G.X(Math.max(0, st.mean - st.sd)), 36, G.X(Math.min(100, st.mean + st.sd)) - G.X(Math.max(0, st.mean - st.sd)), G.dotBase - 36); }
      // box plot
      if (st.n >= 4) {
        var by = G.boxY, bh = 22, wl = Math.min.apply(null, st.s.filter(function (v) { return v >= st.lo; })), wh = Math.max.apply(null, st.s.filter(function (v) { return v <= st.hi; }));
        g.strokeStyle = '#e2e8f0'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(G.X(wl), by + bh / 2); g.lineTo(G.X(st.q[0]), by + bh / 2); g.moveTo(G.X(st.q[1]), by + bh / 2); g.lineTo(G.X(wh), by + bh / 2); g.moveTo(G.X(wl), by + 4); g.lineTo(G.X(wl), by + bh - 4); g.moveTo(G.X(wh), by + 4); g.lineTo(G.X(wh), by + bh - 4); g.stroke();
        g.fillStyle = 'rgba(219,39,119,.35)'; g.fillRect(G.X(st.q[0]), by, G.X(st.q[1]) - G.X(st.q[0]), bh); g.strokeRect(G.X(st.q[0]), by, G.X(st.q[1]) - G.X(st.q[0]), bh);
        g.strokeStyle = '#38bdf8'; g.lineWidth = 3; g.beginPath(); g.moveTo(G.X(st.med), by - 2); g.lineTo(G.X(st.med), by + bh + 2); g.stroke();
        st.out.forEach(function (v) { g.fillStyle = '#fbbf24'; g.font = '700 14px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('✱', G.X(v), by + bh / 2); });
        g.fillStyle = '#aab3d9'; g.font = '11px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText('box plot (✱ outlier)', G.L, by - 4);
      }
      // dots
      dotPos().forEach(function (p) { var isOut = st.out.indexOf(data[p.i]) >= 0, d = drag && drag.i === p.i; g.fillStyle = d ? '#facc15' : isOut ? '#fbbf24' : p.i === sel ? '#f9a8d4' : '#f472b6'; g.beginPath(); g.arc(d ? drag.x : p.x, d ? drag.y : p.y, r, 0, Math.PI * 2); g.fill(); });
      axis(G.dotBase);
      if (st.n) {
        g.strokeStyle = '#38bdf8'; g.lineWidth = 2; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(G.X(st.med), 70); g.lineTo(G.X(st.med), G.dotBase); g.stroke(); g.setLineDash([]);
        var mx = G.X(st.mean); g.fillStyle = '#f87171'; g.beginPath(); g.moveTo(mx, G.dotBase + 1); g.lineTo(mx - 8, G.dotBase + 14); g.lineTo(mx + 8, G.dotBase + 14); g.closePath(); g.fill();
        g.font = '600 12px system-ui,sans-serif'; g.textBaseline = 'top'; g.textAlign = 'center'; g.fillStyle = '#f87171'; g.fillText('mean ' + f1(st.mean), mx, G.dotBase + 16); g.fillStyle = '#38bdf8'; g.fillText('median ' + f1(st.med), G.X(st.med), 72);
      }
      if (drag && drag.del) { g.fillStyle = 'rgba(248,113,113,.9)'; g.font = '700 13px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('release to delete 🗑', W / 2, 74); }
      // histogram
      var ht = G.histTop + 18, hb2 = G.histBot, w = 100 / bins, cnt = []; for (var b = 0; b < bins; b++) cnt.push(0); data.forEach(function (v) { cnt[Math.min(bins - 1, Math.floor(v / w))]++; });
      var mxc = Math.max(1, Math.max.apply(null, cnt));
      g.fillStyle = '#aab3d9'; g.font = '11px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText('histogram (bin width ' + f1(w) + ')', G.L, G.histTop + 2);
      cnt.forEach(function (c, i) { var x0 = G.X(i * w), x1 = G.X((i + 1) * w), hh = (hb2 - ht) * c / mxc; var gr = g.createLinearGradient(0, hb2 - hh, 0, hb2); gr.addColorStop(0, '#38bdf8'); gr.addColorStop(1, '#1e40af'); g.fillStyle = gr; g.fillRect(x0 + 1, hb2 - hh, x1 - x0 - 2, hh); if (c && x1 - x0 > 14) { g.fillStyle = '#e2e8f0'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText(String(c), (x0 + x1) / 2, hb2 - hh - 1); } });
      g.strokeStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.moveTo(G.L, hb2); g.lineTo(G.L + G.pw, hb2); g.stroke();
      if (!st.n) { g.fillStyle = '#d5dbf7'; g.font = '600 15px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('👆 Tap above the number line to add values', W / 2, G.dotBase - 50); }
    }
    function drawSamp() {
      var W = G.W, H = G.H, p = POP[pop], se = p.sd / Math.sqrt(nS), top = 56, bot = H - 30, bw = 1, nb = 100, cnt = [];
      for (var i = 0; i < nb; i++) cnt.push(0); means.forEach(function (m) { var b = Math.floor(m / bw); if (b >= 0 && b < nb) cnt[b]++; });
      var mxc = Math.max(1, Math.max.apply(null, cnt)), peak = means.length * bw / (se * Math.sqrt(2 * Math.PI)), sc = (bot - top) / Math.max(mxc, peak);
      // population shape (faint)
      g.strokeStyle = 'rgba(244,114,182,.5)'; g.lineWidth = 1.5; g.beginPath();
      for (var x = 0; x <= 100; x += 0.5) { var d = pop === 'normal' ? Math.exp(-Math.pow((x - 50) / 15, 2) / 2) : pop === 'uniform' ? 1 : (x < 10 ? 0 : Math.exp(-(x - 10) / 30)); var y = top + 4 + (1 - d) * 40; if (x) g.lineTo(G.X(x), y); else g.moveTo(G.X(x), y); }
      g.stroke(); g.fillStyle = '#f9a8d4'; g.font = '11px system-ui,sans-serif'; g.textAlign = 'right'; g.textBaseline = 'top'; g.fillText('population shape', W - 18, top + 2);
      cnt.forEach(function (c, i) { if (!c) return; var x0 = G.X(i * bw), x1 = G.X((i + 1) * bw), hh = c * sc; g.fillStyle = '#38bdf8'; g.fillRect(x0, bot - hh, Math.max(1, x1 - x0 - 0.5), hh); });
      if (means.length) { g.strokeStyle = '#facc15'; g.lineWidth = 2.5; g.beginPath(); for (var x2 = 0; x2 <= 100; x2 += 0.25) { var yv = means.length * bw / (se * Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow((x2 - p.mu) / se, 2) / 2), yy = bot - yv * sc; if (x2) g.lineTo(G.X(x2), yy); else g.moveTo(G.X(x2), yy); } g.stroke(); }
      axis(bot);
      g.fillStyle = '#d5dbf7'; g.font = '600 12px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText('means of samples of size n = ' + nS + '  ·  gold curve: Normal(μ, σ/√n)', G.L, 40);
      if (!means.length) { g.textAlign = 'center'; g.font = '600 15px system-ui,sans-serif'; g.fillText('Press +100 or +1000 to draw samples', W / 2, (top + bot) / 2); }
      var mm = mean(means), sdm = sdp(means, false); setS('k', means.length); setS('mm', f1(mm)); setS('sdm', means.length > 1 ? sdm.toFixed(2) : '—'); setS('se', se.toFixed(2));
    }
    function draw() { G = geom(); g.clearRect(0, 0, G.W, G.H); var bg = g.createLinearGradient(0, 0, 0, G.H); bg.addColorStop(0, '#120a24'); bg.addColorStop(1, '#06101e'); g.fillStyle = bg; g.fillRect(0, 0, G.W, G.H); if (view === 'data') drawData(); else drawSamp(); }
    K.on(cv, 'pointerdown', function (e) {
      if (view !== 'data' || !G) return; var p = K.pos(e, cv); if (p.y > G.histTop) return;
      var best = -1, bd = Math.max(14, dotR() * 2); dotPos().forEach(function (d) { var dd = Math.hypot(d.x - p.x, d.y - p.y); if (dd < bd) { bd = dd; best = d.i; } });
      try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      if (best >= 0) { drag = { i: best, x: p.x, y: p.y, del: false }; sel = best; K.snd('tick'); }
      else if (p.y > 36 && p.y < G.dotBase + 30) { var v = Math.round(Math.max(0, Math.min(100, G.V(p.x)))); data.push(v); sel = data.length - 1; changed(); K.snd('pop'); }
      dirty = true;
    });
    K.on(cv, 'pointermove', function (e) { if (!drag) return; var p = K.pos(e, cv); drag.x = p.x; drag.y = p.y; drag.del = p.y < 20 || p.y > G.dotBase + 60; if (!drag.del) { data[drag.i] = Math.round(Math.max(0, Math.min(100, G.V(p.x)))); changed(); } dirty = true; });
    function endDrag() { if (!drag) return; if (drag.del) { data.splice(drag.i, 1); sel = -1; K.snd('whoosh'); } drag = null; changed(); }
    K.on(cv, 'pointerup', endDrag); K.on(cv, 'pointercancel', function () { drag = null; dirty = true; });
    K.loop(function () { if (dirty) { dirty = false; draw(); } });
    K.fb('👋 Tap above the number line to add data points, or press a Generate button.', '');
    return { destroy: K.destroy };
  }
});
})();

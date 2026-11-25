/* VidyaVerse University v2 — Lab: Budget Simulator (plain script, self-contained) */
(function () {
'use strict';
var ID = 'budget-sim', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#059669;--a2:#facc15}§ canvas.sim{aspect-ratio:16/8;min-height:200px;max-height:50vh;border-top:1px solid rgba(255,255,255,.08)}" +
"§ .grp{max-height:none}§ .card.n h3{color:#60a5fa}§ .card.w h3{color:#f472b6}§ .card.s h3{color:#34d399}";

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

function R(n) { var s = n < 0 ? '−' : ''; return s + '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN'); }
function Rk(n) { var a = Math.abs(n); return (n < 0 ? '−' : '') + '₹' + (a >= 100000 ? (a / 100000).toFixed(a >= 1000000 ? 0 : 1) + 'L' : a >= 1000 ? Math.round(a / 1000) + 'k' : Math.round(a)); }
var CATS = [
  { k: 'rent', n: 'Rent & housing', t: 'N', min: 3000, max: 80000, c: '#3b82f6', e: '🏠' },
  { k: 'food', n: 'Groceries & food', t: 'N', min: 2500, max: 40000, c: '#60a5fa', e: '🍚' },
  { k: 'move', n: 'Transport', t: 'N', min: 500, max: 30000, c: '#93c5fd', e: '🚌' },
  { k: 'bill', n: 'Electricity, phone, internet', t: 'N', min: 500, max: 20000, c: '#1d4ed8', e: '💡' },
  { k: 'fun', n: 'Eating out & outings', t: 'W', min: 0, max: 40000, c: '#f472b6', e: '🍕' },
  { k: 'shop', n: 'Shopping & gadgets', t: 'W', min: 0, max: 40000, c: '#ec4899', e: '🛍️' },
  { k: 'subs', n: 'Subscriptions (OTT, apps)', t: 'W', min: 0, max: 10000, c: '#f9a8d4', e: '📺' },
  { k: 'gift', n: 'Gifts & festivals', t: 'W', min: 0, max: 30000, c: '#db2777', e: '🎁' },
  { k: 'ef', n: 'Emergency fund', t: 'S', min: 0, max: 60000, c: '#34d399', e: '🛟' },
  { k: 'inv', n: 'Investing (SIP)', t: 'S', min: 0, max: 100000, c: '#10b981', e: '📈' },
  { k: 'debt', n: 'Debt repayment', t: 'S', min: 0, max: 60000, c: '#a7f3d0', e: '💳' }
];
var EVENTS = { 3: ['📱', 'Phone screen repair', 4000], 5: ['🏥', 'Medical bill', 12000], 8: ['🪔', 'Diwali gifts & travel', 8000], 10: ['🛵', 'Scooter repair', 6000] };
var CARD_R = 0.035; // 3.5% per month on unpaid credit-card balance (typical Indian card), ≈ 51% a year compounded
var PRESET = { inc: 30000, rent: 10000, food: 6000, move: 2500, bill: 1500, fun: 5000, shop: 4000, subs: 1000, gift: 1500, ef: 1500, inv: 1000, debt: 0 };

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Budget Simulator', icon: '🧾', faculty: 'life', bands: ['secondary', 'senior', 'ug', 'pro'],
  summary: 'Plan a monthly budget in rupees, test it against the 50/30/20 rule, then live through a year of surprise bills and a credit-card debt to see why emergency funds matter.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = {}, startDebt = 0, events = true, sim = null, dirty = true, anim = 1;
    K.shell({
      icon: '🧾', title: 'Budget Simulator',
      goal: 'Give every rupee a job, survive a year of surprises, and escape a credit-card trap.',
      how: '<p>Move the sliders to plan one month. The donut shows where money goes; the bars compare you with the popular <b>50/30/20 guideline</b>: about 50% on <b style="color:#60a5fa">needs</b>, 30% on <b style="color:#f472b6">wants</b>, 20% on <b style="color:#34d399">savings &amp; debt repayment</b>. It is a starting point, not a law — in expensive cities rent alone can be 40%.</p><ul><li><b>Zero-based budget:</b> income − all planned spending and saving = ₹0. Every rupee has a job.</li><li><b>Emergency fund:</b> cash for surprises. A common target is 3–6 months of essential expenses.</li><li><b>Credit-card interest:</b> unpaid balances in India are often charged about 3–3.75% <i>per month</i>. At 3.5%/month the yearly cost is (1.035<sup>12</sup> − 1) ≈ 51%.</li><li><b>Months to clear a debt</b> B with payment p at monthly rate r: n = −ln(1 − rB/p) ÷ ln(1 + r). If p ≤ rB the debt never shrinks.</li></ul><p>The year chart replays your plan for 12 months with four surprise bills. Unplanned money is added to your emergency fund; shortfalls go on the credit card.</p>',
      note: 'Simplified: no income tax, inflation, salary rises or investment risk (SIP shown growing at a steady 12%/yr). Card interest 3.5%/month on the balance before each payment. Educational, not financial advice.',
      onMode: function () { dirty = true; },
      onReset: function () { applyPreset(PRESET, 0, true); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Budget donut and 50/30/20 bars' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var cv2 = K.h('canvas', 'sim', null, { role: 'img', 'aria-label': 'Twelve-month simulation chart' }); K.stage.appendChild(cv2);
    var g2 = K.canvas(cv2, function () { dirty = true; });

    var rc = K.card('📊 This month');
    var setRo = K.ro(rc, [['left', 'Unassigned'], ['n', 'Needs'], ['w', 'Wants'], ['s', 'Savings'], ['ef', 'Fund after 12 mo'], ['debt', 'Debt after 12 mo'], ['pay', 'Debt-free in'], ['int', 'Interest paid']]);
    var ic = K.card('💼 Income & situation');
    var sInc = K.slider(ic, { label: 'Take-home pay / month', min: 10000, max: 200000, step: 1000, value: PRESET.inc, fmt: R, on: function (v) { S.inc = v; changed(); } });
    var sDebt = K.slider(ic, { label: 'Credit-card debt at start', min: 0, max: 200000, step: 1000, value: 0, fmt: R, on: function (v) { startDebt = v; changed(); } });
    var evb = K.btn(ic, '', '', function () { events = !events; evLabel(); changed(); });
    function evLabel() { evb.textContent = events ? '⚡ Surprise bills: ON' : '⚡ Surprise bills: OFF'; evb.classList.toggle('on', events); evb.setAttribute('aria-pressed', events ? 'true' : 'false'); }
    evLabel();
    var sl = {};
    [['N', '🔵 Needs', 'n'], ['W', '🩷 Wants', 'w'], ['S', '🟢 Savings & debt', 's']].forEach(function (gp) {
      var c = K.card(gp[1]); c.classList.add(gp[2]);
      CATS.forEach(function (ct) { if (ct.t !== gp[0]) return; sl[ct.k] = K.slider(c, { label: ct.e + ' ' + ct.n, min: ct.min, max: ct.max, step: 250, value: PRESET[ct.k], fmt: R, on: function (v) { S[ct.k] = v; changed(); } }); });
    });
    function applyPreset(p, debt, ev) { S.inc = p.inc; sInc.set(p.inc); CATS.forEach(function (c) { var v = p[c.k] != null ? p[c.k] : S[c.k]; sl[c.k].set(v); }); startDebt = debt; sDebt.set(debt); events = ev; evLabel(); changed(); }
    function totals() { var t = { N: 0, W: 0, S: 0 }; CATS.forEach(function (c) { t[c.t] += S[c.k] || 0; }); t.all = t.N + t.W + t.S; t.left = S.inc - t.all; return t; }
    function simulate() {
      var t = totals(), ef = 0, inv = 0, debt = startDebt, interest = 0, deficit = 0, rows = [{ ef: 0, inv: 0, debt: debt }], hits = [];
      for (var m = 1; m <= 12; m++) {
        if (debt > 0) { var i = debt * CARD_R; debt += i; interest += i; }
        ef += S.ef; inv = inv * (1 + 0.12 / 12) + S.inv;
        var pay = S.debt, p = Math.min(pay, debt); debt -= p; ef += pay - p;
        if (t.left >= 0) ef += t.left; else { debt += -t.left; deficit++; }
        if (events && EVENTS[m]) { var c = EVENTS[m][2], f = Math.min(ef, c); ef -= f; debt += c - f; hits.push({ m: m, ok: c - f < 1 }); }
        rows.push({ ef: ef, inv: inv, debt: debt });
      }
      return { rows: rows, interest: interest, deficit: deficit, hits: hits, ef: ef, debt: debt, inv: inv };
    }
    function payoff(B, p) { if (B <= 0) return 0; if (p <= CARD_R * B) return Infinity; return Math.ceil(-Math.log(1 - CARD_R * B / p) / Math.log(1 + CARD_R)); }
    function changed() { if (S.inc == null) return; sim = simulate(); anim = K.rm ? 1 : 0; dirty = true; }
    CATS.forEach(function (c) { S[c.k] = PRESET[c.k]; }); S.inc = PRESET.inc; changed();

    function pct(x) { return S.inc ? Math.round(100 * x / S.inc) : 0; }
    function within(x, aim) { return Math.abs(pct(x) - aim) <= 5; }
    K.tasks([
      { title: 'Every rupee a job', text: 'Meera just got her first salary: <b>₹30,000</b> take-home in Pune. Her draft plan spends more than she earns! Adjust the sliders until <b>Unassigned is between ₹0 and ₹500</b> (no overspending).', hint: 'Her plan is ₹4,000 over. Trim wants first (eating out, shopping), then look at rent or transport.', good: 'Balanced! A zero-based budget means you decide where every rupee goes before the month starts.', xp: 15,
        start: function () { applyPreset(PRESET, 0, true); }, check: function () { var t = totals(); return t.left >= 0 && t.left <= 500; } },
      { title: '50 / 30 / 20', text: 'Now reshape her plan so Needs ≈ <b>50%</b>, Wants ≈ <b>30%</b> and Savings ≈ <b>20%</b> (each within ±5 points) — and stay balanced (Unassigned ₹0–₹1,000).', hint: '20% of ₹30,000 is ₹6,000 — put it into emergency fund + SIP. Needs must fit in about ₹15,000.', good: 'Textbook 50/30/20! Remember it is a guide: adjust it for your city and goals.', xp: 20,
        check: function () { var t = totals(); return t.left >= 0 && t.left <= 1000 && within(t.N, 50) && within(t.W, 30) && within(t.S, 20); } },
      { title: 'Survive the year', text: 'Surprise bills are ON (📱 ₹4,000, 🏥 ₹12,000, 🪔 ₹8,000, 🛵 ₹6,000). Keep the budget balanced and finish the 12-month chart with <b>₹0 debt</b>.', hint: 'The four surprises total ₹30,000 — about ₹2,500 a month. Put at least that into the emergency fund.', good: 'No debt despite ₹30,000 of surprises — that is what an emergency fund is for.', xp: 25,
        start: function () { startDebt = 0; sDebt.set(0); events = true; evLabel(); changed(); }, check: function () { var t = totals(); return sim && t.left >= 0 && sim.debt < 1 && sim.deficit === 0; } },
      { title: 'Escape the card trap', text: 'Meera now has <b>₹40,000</b> on a credit card at <b>3.5% a month</b>. Surprise bills are off. Set a debt repayment that makes her <b>debt-free within 12 months</b> without overspending.', hint: 'Payment formula p = rB ÷ (1 − (1 + r)^−n). With r = 0.035, B = 40,000, n = 12 you need about ₹4,150 a month.', good: 'Debt-free in a year! Compare the interest paid with paying only a little each month.', xp: 25,
        start: function () { startDebt = 40000; sDebt.set(40000); events = false; evLabel(); changed(); }, check: function () { var t = totals(); return sim && t.left >= 0 && sim.debt < 1 && startDebt >= 40000; } },
      { title: 'The minimum-payment myth', text: 'If Meera paid only <b>₹2,000 a month</b> on ₹40,000 at 3.5% a month, roughly how long would it take to clear? (Use n = −ln(1 − rB/p) ÷ ln(1 + r).)', ask: { options: ['About 20 months', 'About 35 months', 'About 60 months', 'Never'], answer: 1 }, hint: 'rB/p = 0.035 × 40,000 ÷ 2,000 = 0.7. Then n = −ln(0.3) ÷ ln(1.035).', good: 'About 35 months — nearly 3 years, paying roughly ₹30,000 in interest. Small payments keep you in debt for years.', xp: 20 }
    ]);

    function drawMain() {
      var W = cv.W, H = cv.H, t = totals(), wide = W > H * 1.15;
      g.clearRect(0, 0, W, H);
      var bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#071226'); bg.addColorStop(1, '#0b1b2e'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      var cx = wide ? W * 0.3 : W / 2, cy = wide ? H / 2 : H * 0.31, rad = Math.min(wide ? W * 0.25 : W * 0.38, wide ? H * 0.42 : H * 0.26);
      var tot = Math.max(t.all, S.inc), a0 = -Math.PI / 2, ease = 1 - Math.pow(1 - Math.min(1, anim), 3);
      CATS.forEach(function (c) { var v = S[c.k] || 0; if (!v) return; var a = (v / tot) * Math.PI * 2 * ease; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, rad, a0, a0 + a); g.closePath(); g.fillStyle = c.c; g.fill(); g.strokeStyle = '#071226'; g.lineWidth = 2; g.stroke(); if (a > 0.32) { var m = a0 + a / 2; g.font = Math.round(rad * 0.15) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(c.e, cx + Math.cos(m) * rad * 0.8, cy + Math.sin(m) * rad * 0.8); } a0 += a; });
      if (t.left > 0) { g.beginPath(); g.arc(cx, cy, rad, a0, a0 + (t.left / tot) * Math.PI * 2 * ease); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 3; g.setLineDash([4, 5]); g.stroke(); g.setLineDash([]); }
      g.beginPath(); g.arc(cx, cy, rad * 0.58, 0, Math.PI * 2); g.fillStyle = '#0a1426'; g.fill();
      g.fillStyle = t.left < 0 ? '#fb7185' : '#eef1ff'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = '700 ' + Math.round(rad * 0.2) + 'px system-ui,sans-serif'; g.fillText(R(t.left), cx, cy - rad * 0.06);
      g.font = Math.round(rad * 0.11) + 'px system-ui,sans-serif'; g.fillStyle = '#aab3d9'; g.fillText(t.left < 0 ? 'overspent' : 'unassigned', cx, cy + rad * 0.17);
      // 50/30/20 bars
      var bx = wide ? W * 0.6 : W * 0.08, bw = wide ? W * 0.34 : W * 0.84, by = wide ? H * 0.2 : H * 0.64, gap = wide ? H * 0.22 : H * 0.12, bh = Math.max(12, Math.min(26, gap * 0.36));
      var fs = Math.max(11, Math.min(18, bh * 0.62));
      [['N', 'Needs', 50, '#60a5fa'], ['W', 'Wants', 30, '#f472b6'], ['S', 'Savings', 20, '#34d399']].forEach(function (b, i) {
        var y = by + i * gap, p = pct(t[b[0]]);
        g.fillStyle = '#d5dbf7'; g.font = '600 ' + fs + 'px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText(b[1] + ' ' + p + '%' + (wide ? '  (' + R(t[b[0]]) + ')' : ' · aim ' + b[2] + '%'), bx, y - 4);
        g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(bx, y, bw, bh);
        var fw = Math.min(1, p / 100) * bw * ease; var gr = g.createLinearGradient(bx, 0, bx + bw, 0); gr.addColorStop(0, b[3]); gr.addColorStop(1, '#ffffff'); g.fillStyle = b[3]; g.fillRect(bx, y, fw, bh); g.globalAlpha = 0.25; g.fillStyle = gr; g.fillRect(bx, y, fw, bh * 0.4); g.globalAlpha = 1;
        var tx = bx + bw * b[2] / 100; g.strokeStyle = '#facc15'; g.lineWidth = 2; g.beginPath(); g.moveTo(tx, y - 3); g.lineTo(tx, y + bh + 3); g.stroke();
        g.fillStyle = '#facc15'; g.font = Math.round(fs * 0.8) + 'px system-ui,sans-serif'; g.textBaseline = 'top'; g.textAlign = 'center'; if (wide) g.fillText('aim ' + b[2] + '%', tx, y + bh + 4);
      });
    }
    function drawSim() {
      var W = cv2.W, H = cv2.H; g2.clearRect(0, 0, W, H); g2.fillStyle = '#060d1d'; g2.fillRect(0, 0, W, H);
      if (!sim) return;
      var L = 46, Rr = 14, T = 30, B = 30, pw = W - L - Rr, ph = H - T - B, rows = sim.rows, mx = 1000;
      rows.forEach(function (r) { mx = Math.max(mx, r.ef, r.inv, r.debt); }); mx *= 1.1;
      var reveal = Math.min(12, anim * 12);
      function X(m) { return L + pw * m / 12; } function Y(v) { return T + ph - ph * v / mx; }
      g2.font = '11px system-ui,sans-serif'; g2.fillStyle = '#8b93bd'; g2.textAlign = 'right'; g2.textBaseline = 'middle';
      for (var k = 0; k <= 4; k++) { var v = mx * k / 4; g2.strokeStyle = 'rgba(255,255,255,.07)'; g2.beginPath(); g2.moveTo(L, Y(v)); g2.lineTo(W - Rr, Y(v)); g2.stroke(); g2.fillText(Rk(v), L - 6, Y(v)); }
      g2.textAlign = 'center'; g2.textBaseline = 'top'; for (var m = 0; m <= 12; m += (pw < 300 ? 3 : 1)) g2.fillText(m === 0 ? 'start' : 'M' + m, X(m), T + ph + 8);
      function line(key, col, fill) {
        g2.beginPath(); for (var i = 0; i <= Math.ceil(reveal); i++) { var mm = Math.min(i, reveal), a = rows[Math.floor(mm)], b = rows[Math.min(12, Math.ceil(mm))], f = mm - Math.floor(mm), v = a[key] + (b[key] - a[key]) * f; if (i === 0) g2.moveTo(X(mm), Y(v)); else g2.lineTo(X(mm), Y(v)); }
        g2.strokeStyle = col; g2.lineWidth = 2.5; g2.stroke();
        if (fill) { g2.lineTo(X(reveal), Y(0)); g2.lineTo(X(0), Y(0)); g2.closePath(); g2.globalAlpha = 0.18; g2.fillStyle = col; g2.fill(); g2.globalAlpha = 1; }
      }
      line('debt', '#fb7185', true); line('inv', '#22d3ee', false); line('ef', '#34d399', true);
      if (events) Object.keys(EVENTS).forEach(function (m) { m = +m; if (m > reveal) return; var hit = sim.hits.filter(function (h) { return h.m === m; })[0]; g2.font = '16px system-ui,sans-serif'; g2.textAlign = 'center'; g2.textBaseline = 'bottom'; g2.fillText(EVENTS[m][0], X(m), T + 2 + 14); if (hit && !hit.ok) { g2.fillStyle = '#fb7185'; g2.font = '700 10px system-ui,sans-serif'; g2.fillText('on card', X(m), T + 28); } g2.fillStyle = '#8b93bd'; });
      g2.textAlign = 'left'; g2.textBaseline = 'top'; g2.font = (pw < 330 ? '600 10px' : '600 12px') + ' system-ui,sans-serif';
      [['#34d399', '🛟 Emergency fund'], ['#22d3ee', '📈 SIP value'], ['#fb7185', '💳 Card debt']].forEach(function (lg, i) { g2.fillStyle = lg[0]; g2.fillText(lg[1], L - 30 + i * (pw + 30) / 3, 6); });
    }
    K.loop(function (dt) {
      if (anim < 1) { anim = Math.min(1, anim + dt * 1.6); dirty = true; }
      if (!dirty) return; dirty = false;
      drawMain(); drawSim();
      var t = totals();
      setRo('left', R(t.left)); setRo('n', pct(t.N) + '%'); setRo('w', pct(t.W) + '%'); setRo('s', pct(t.S) + '%');
      if (sim) { setRo('ef', R(sim.ef)); setRo('debt', R(sim.debt)); setRo('int', R(sim.interest)); }
      var n = payoff(startDebt, S.debt); setRo('pay', startDebt <= 0 ? 'no debt 🎉' : n === Infinity ? 'never ⚠️' : n + ' months');
    });
    K.fb('👋 Start with Task 1: Meera is overspending by ₹4,000. Slide the wants down.', '');
    return { destroy: K.destroy };
  }
});
})();

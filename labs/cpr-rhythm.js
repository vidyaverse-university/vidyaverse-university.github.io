/* VidyaVerse University v2 — Lab: CPR Rhythm Trainer (plain script, self-contained) */
(function () {
'use strict';
var ID = 'cpr-rhythm', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#dc2626;--a2:#fb923c}§ .sos{margin-top:10px;padding:10px 14px;border-radius:14px;background:rgba(220,38,38,.18);border:1px solid rgba(248,113,113,.4);font-weight:600}" +
"§ .push{width:100%;min-height:64px;font-size:1.15em;margin-top:8px}§ canvas.main{cursor:pointer}§ canvas.main:focus-visible{outline:3px solid var(--a2);outline-offset:-3px}";

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

var RMIN = 100, RMAX = 120, DMIN = 5, DMAX = 6, BPM = 110;

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'CPR Rhythm Trainer', icon: '❤️‍🩹', faculty: 'life', bands: ['middle', 'secondary', 'senior', 'ug', 'pro'],
  summary: 'Practise the life-saving rhythm of hands-only CPR: 100–120 compressions a minute, 5–6 cm deep, with a metronome, depth gauge, live rate graph and the 30:2 cycle.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = { metro: true, depth: false, cycle: false }, comps = [], press = null, cur = 0, lastT = 0, metroPh = 0, pulse = 0, breaths = 0, phase = 'push', cycles = 0, pauseStart = 0, longest = 0, set = null, dirty = true, now = 0;
    function newSet() { set = { n: 0, rateOk: 0, rated: 0, depthOk: 0, metroUsed: S.metro, cycles: 0, badPause: 0 }; comps = []; cycles = 0; breaths = 0; phase = 'push'; longest = 0; lastT = 0; }
    newSet();
    K.shell({
      icon: '❤️‍🩹', title: 'CPR Rhythm Trainer',
      goal: 'Learn the rhythm that keeps blood flowing to the brain until help arrives.',
      how: '<p><b>If an adult collapses and is not breathing normally:</b></p><ul><li><b>D</b>anger — make sure the area is safe for you.</li><li><b>R</b>esponse — tap their shoulders and shout “Are you OK?”</li><li><b>S</b>end for help — call <b>112</b>, put the phone on speaker, ask someone to fetch an <b>AED</b> (defibrillator).</li><li><b>A</b>irway &amp; <b>B</b>reathing — tilt the head back, look for normal breathing for no more than 10 seconds. Gasping is NOT normal breathing.</li><li><b>C</b>ompressions — heel of one hand on the centre of the chest (lower half of the breastbone), other hand on top, arms straight, shoulders above hands. Push <b>5–6 cm deep</b>, <b>100–120 times a minute</b>, let the chest come <b>fully back up</b>, and don’t stop except for the AED.</li></ul><p>If you are trained and willing, give <b>30 compressions then 2 rescue breaths</b>. If not, hands-only CPR still saves lives. The beat of “Stayin’ Alive” (about 104 per minute) is a popular memory aid.</p><p><b>To practise here:</b> press and release on the chest (or the PUSH button, or Space). In depth mode, <b>drag down</b> while pressing — further drag = deeper push.</p>',
      note: 'This is practice for rhythm only — not a CPR certificate and not medical advice. Real CPR on a person needs real force; learn hands-on from a recognised first-aid course (e.g. Red Cross, St John Ambulance, hospital BLS). Child and infant CPR differ (about one-third of chest depth; two fingers for infants). Guidance follows international resuscitation guidelines (2020–21).',
      onMode: function () { dirty = true; },
      onReset: function () { setT('metro', true); setT('depth', false); setT('cycle', false); newSet(); }
    });
    var cv = K.h('canvas', 'main', null, { tabindex: '0', role: 'button', 'aria-label': 'Practice chest. Press and release, or press Space, to do a compression. B for breath.' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var cc = K.card('🫀 Practice');
    var pushB = K.h('button', 'btn pri push', '⬇️ PUSH (Space)', { type: 'button' }); cc.appendChild(pushB);
    var brB = K.h('button', 'btn push', '💨 Rescue breath (B)', { type: 'button' }); cc.appendChild(brB);
    var tr = K.h('div', 'row'); tr.style.marginTop = '8px'; cc.appendChild(tr);
    var tb = { metro: K.btn(tr, '🎵 Metronome', '', function () { setT('metro', !S.metro); }), depth: K.btn(tr, '📏 Depth mode', '', function () { setT('depth', !S.depth); }), cycle: K.btn(tr, '🔁 30:2 cycles', '', function () { setT('cycle', !S.cycle); }) };
    function setT(k, v) { S[k] = v; tb[k].classList.toggle('on', v); tb[k].setAttribute('aria-pressed', v ? 'true' : 'false'); if (k === 'metro' && v && set) set.metroUsed = true; if (k === 'cycle') { phase = 'push'; breaths = 0; } dirty = true; }
    setT('metro', true); setT('depth', false); setT('cycle', false);
    K.btn(tr, '🧹 New set', '', function () { newSet(); K.fb('New practice set started.', ''); });
    var rc = K.card('📊 Your set');
    var setRo = K.ro(rc, [['rate', 'Rate now'], ['n', 'Compressions'], ['rok', 'In 100–120'], ['dok', 'Depth 5–6 cm'], ['cy', '30:2 cycles'], ['lp', 'Longest pause']]);
    var sos = K.h('div', 'sos', '🚑 Real emergency in India? Call <b>112</b>. Start CPR and ask for an AED.'); K.side.appendChild(sos);

    function rateNow() { if (comps.length < 3) return 0; var n = Math.min(6, comps.length - 1), a = comps[comps.length - 1 - n].t, b = comps[comps.length - 1].t; return 60000 * n / (b - a); }
    function down(y, kb) {
      if (press) return;
      var t = performance.now();
      if (S.cycle && phase === 'breaths') { K.fb('⏸ Give the 2 breaths first (B or the breath button) — then back to compressions quickly.', 'bad'); K.snd('bad'); return; }
      if (S.cycle && phase === 'resume') { var pz = (t - pauseStart) / 1000; longest = Math.max(longest, pz); if (pz > 10) { set.badPause++; K.fb('Hands-off for ' + pz.toFixed(1) + ' s — try to keep pauses under 10 seconds.', 'bad'); } phase = 'push'; }
      if (lastT) { var gap = (t - lastT) / 1000; if (gap > 2 && !(S.cycle && comps.length % 30 === 0)) longest = Math.max(longest, gap); }
      var c = { t: t, d: 0, rate: 0 }; comps.push(c); lastT = t;
      if (comps.length > 1) { var inst = 60000 / (t - comps[comps.length - 2].t); var r = comps.length >= 3 ? rateNow() : inst; c.rate = r; if (inst < 300 && (!S.cycle || (comps.length - 1) % 30 !== 0)) { set.rated++; if (r >= RMIN - 2 && r <= RMAX + 2) set.rateOk++; } }
      press = { y0: y, kb: !!kb, max: S.depth ? 0 : 5.5, c: c };
      set.n++; if (S.metro) set.metroUsed = true;
      K.snd('pop'); dirty = true;
    }
    function moveTo(y) { if (!press || press.kb || !S.depth) return; var pxcm = cv.H * 0.022, d = Math.max(0, Math.min(8, (y - press.y0) / pxcm)); press.live = d; press.max = Math.max(press.max, d); dirty = true; }
    function up() {
      if (!press) return;
      var d = press.kb && S.depth ? 5.5 : press.max; press.c.d = d;
      if (d >= DMIN && d <= DMAX + 0.3) set.depthOk++;
      else if (S.depth && !press.kb) K.fb(d < DMIN ? '⬇️ Too shallow (' + d.toFixed(1) + ' cm) — drag further down.' : '⚠️ Too deep (' + d.toFixed(1) + ' cm) — over 6 cm can injure.', 'bad');
      press = null; dirty = true;
      if (S.cycle && comps.length % 30 === 0) { phase = 'breaths'; breaths = 0; pauseStart = performance.now(); K.snd('whoosh'); K.fb('30! Now give 2 rescue breaths — quickly (B).', ''); K.say('Give two breaths'); }
    }
    function breath() {
      if (!S.cycle) { K.fb('Turn on 🔁 30:2 cycles to practise breaths. Untrained? Hands-only CPR is fine.', ''); return; }
      if (phase !== 'breaths') { K.fb('Breaths come after 30 compressions.', 'bad'); K.snd('bad'); return; }
      breaths++; K.snd('whoosh');
      if (breaths >= 2) { phase = 'resume'; cycles++; set.cycles++; K.fb('Cycle ' + cycles + ' done — back to compressions now!', 'good'); }
    }
    K.on(cv, 'pointerdown', function (e) { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (x) {} down(K.pos(e, cv).y, false); });
    K.on(cv, 'pointermove', function (e) { if (press) moveTo(K.pos(e, cv).y); });
    K.on(cv, 'pointerup', up); K.on(cv, 'pointercancel', up);
    K.on(pushB, 'pointerdown', function (e) { e.preventDefault(); down(0, true); }); K.on(pushB, 'pointerup', up); K.on(pushB, 'pointercancel', up); K.on(pushB, 'pointerleave', up);
    K.on(pushB, 'keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); down(0, true); } });
    K.on(pushB, 'keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); up(); } });
    K.on(brB, 'click', function () { breath(); });
    K.on(cv, 'keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); down(0, true); } else if (e.key === 'b' || e.key === 'B') breath(); });
    K.on(cv, 'keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); up(); } });

    function pct(a, b) { return b ? a / b : 0; }
    K.tasks([
      { title: 'First things first', text: 'You see a man collapse in a shopping mall. What do you do <b>first</b>?', ask: { options: ['Start chest compressions immediately', 'Check it is safe, then check if he responds', 'Give him water', 'Sit him up'] , answer: 1 }, hint: 'Remember DRS ABC: Danger, Response, Send for help…', good: 'Danger and Response first — you can’t help if you get hurt. Then call 112 and send someone for an AED.', xp: 10 },
      { title: 'Feel the beat', text: 'Metronome is ON (110 per minute). Do <b>30 compressions</b> with at least <b>70% in the 100–120 range</b>. Press and release on the chest, the PUSH button, or Space.', hint: 'Press exactly on each tick. Release fully between pushes — that is the recoil that lets the heart refill.', good: 'Great rhythm! 100–120 per minute moves enough blood without leaving too little time for the heart to refill.', xp: 20,
        start: function () { setT('metro', true); setT('depth', false); setT('cycle', false); newSet(); }, check: function () { return set.n >= 30 && pct(set.rateOk, set.rated) >= 0.7; } },
      { title: 'No metronome', text: 'In real life there is no ticking sound. Metronome OFF: do <b>30 compressions</b>, 70% or more in range.', hint: 'Count out loud “one-and-two-and…”, or hum a song at about 110 beats per minute. Watch the rate graph.', good: 'You kept the rhythm on your own. Counting aloud also helps a second rescuer take over smoothly.', xp: 25,
        start: function () { setT('metro', false); setT('depth', false); setT('cycle', false); newSet(); set.metroUsed = false; }, check: function () { return !set.metroUsed && set.n >= 30 && pct(set.rateOk, set.rated) >= 0.7; } },
      { title: 'Push hard enough', text: 'Depth mode ON: press on the chest and <b>drag down</b> to push. Do <b>30 compressions</b> with 70% at <b>5–6 cm</b> and 60% at the right rate.', hint: 'Watch the gauge on the right — stop dragging in the green band, then lift fully.', good: 'Correct depth! Most people push too gently at first; 5–6 cm in an adult takes real force from your body weight.', xp: 25,
        start: function () { setT('metro', true); setT('depth', true); setT('cycle', false); newSet(); }, check: function () { return set.n >= 30 && pct(set.depthOk, set.n) >= 0.7 && pct(set.rateOk, set.rated) >= 0.6; } },
      { title: 'Two full cycles', text: '30:2 ON. Do <b>2 full cycles</b>: 30 compressions, then 2 rescue breaths (B or the breath button), keeping each pause <b>under 10 seconds</b>.', hint: 'After the 30th push, tap breath twice quickly, then go straight back to pushing.', good: 'Two cycles of 30:2 with short pauses. In real life keep going until help or an AED arrives, or the person starts breathing normally.', xp: 30,
        start: function () { setT('metro', true); setT('depth', false); setT('cycle', true); newSet(); }, check: function () { return set.cycles >= 2 && set.badPause === 0 && set.n >= 60; } }
    ]);

    function draw() {
      var W = cv.W, H = cv.H, u = Math.max(0.75, Math.min(W, H) / 420); g.clearRect(0, 0, W, H);
      var bg = g.createRadialGradient(W * 0.42, H * 0.45, 20, W * 0.42, H * 0.45, Math.max(W, H)); bg.addColorStop(0, '#1d1430'); bg.addColorStop(1, '#07060f'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      var cx = W * 0.42, cy = H * 0.42, tw = Math.min(W * 0.5, H * 0.8), th = tw * 0.62, dep = press ? (press.kb || !S.depth ? 5.5 : (press.live || 0)) : 0, squash = dep / 8;
      if (pulse > 0 && !K.rm) { g.strokeStyle = 'rgba(251,146,60,' + pulse * 0.6 + ')'; g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, tw * (0.35 + (1 - pulse) * 0.25), 0, Math.PI * 2); g.stroke(); }
      // head & torso (abstract manikin)
      g.fillStyle = '#e7c3a0'; g.beginPath(); g.arc(cx, cy - th * 0.78, th * 0.24, 0, Math.PI * 2); g.fill();
      var tg = g.createLinearGradient(cx - tw / 2, 0, cx + tw / 2, 0); tg.addColorStop(0, '#2563eb'); tg.addColorStop(0.5, '#3b82f6'); tg.addColorStop(1, '#1d4ed8');
      g.fillStyle = tg; g.beginPath(); if (g.roundRect) g.roundRect(cx - tw / 2, cy - th * 0.5 + squash * 6, tw, th * (1.25 - squash * 0.06), th * 0.25); else g.rect(cx - tw / 2, cy - th * 0.5, tw, th * 1.25); g.fill();
      g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, cy - th * 0.45); g.lineTo(cx, cy + th * 0.55); g.stroke();
      // target zone
      var tz = th * 0.2; g.fillStyle = 'rgba(52,211,153,' + (0.22 + (K.rm ? 0 : 0.12 * Math.sin(now / 250))) + ')'; g.beginPath(); g.arc(cx, cy + th * 0.12, tz, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#d1fae5'; g.font = '600 ' + Math.round(11 * u) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'top'; if (!press) g.fillText('centre of chest', cx, cy + th * 0.12 + tz + 4);
      // hands
      var hy = cy + th * 0.12 + dep * 2.2 * u, hs = th * (press ? 0.21 : 0.23);
      g.fillStyle = '#f2d2b6'; g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1.5;
      g.beginPath(); g.ellipse(cx, hy, hs, hs * 0.75, 0, 0, Math.PI * 2); g.fill(); g.stroke();
      g.beginPath(); g.ellipse(cx + hs * 0.08, hy - hs * 0.08, hs * 0.92, hs * 0.66, 0.2, 0, Math.PI * 2); g.fill(); g.stroke();
      // big numbers
      var r = rateNow(), rc = !r ? '#aab3d9' : r < RMIN ? '#fbbf24' : r > RMAX ? '#fb7185' : '#34d399';
      g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = rc; g.font = '800 ' + Math.round(30 * u) + 'px system-ui,sans-serif'; g.fillText(r ? Math.round(r) : '—', 12, 10);
      g.font = '600 ' + Math.round(12 * u) + 'px system-ui,sans-serif'; g.fillStyle = '#d5dbf7'; g.fillText('per minute ' + (!r ? '' : r < RMIN ? '· faster!' : r > RMAX ? '· slower!' : '· perfect'), 12, 12 + 32 * u);
      var inCycle = S.cycle ? (comps.length % 30 === 0 && comps.length && phase !== 'push' ? 30 : comps.length % 30) : comps.length;
      g.fillText(S.cycle ? (phase === 'breaths' ? '💨 Give 2 breaths (' + breaths + '/2)' : 'Compression ' + inCycle + '/30') : 'Compressions: ' + comps.length, 12, 14 + 48 * u);
      // depth gauge
      var gx = W - 46 * u, gy = H * 0.1, gh = H * 0.56, gw = 18 * u; function DY(cm) { return gy + gh * cm / 8; }
      g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(gx, gy, gw, gh); g.fillStyle = 'rgba(52,211,153,.45)'; g.fillRect(gx, DY(DMIN), gw, DY(DMAX) - DY(DMIN));
      g.fillStyle = dep >= DMIN && dep <= DMAX + 0.3 ? '#34d399' : dep > DMAX ? '#fb7185' : '#fbbf24'; g.fillRect(gx, gy, gw, DY(dep) - gy);
      g.fillStyle = '#aab3d9'; g.font = Math.round(10 * u) + 'px system-ui,sans-serif'; g.textAlign = 'right'; g.textBaseline = 'middle'; for (var k = 0; k <= 8; k += 2) g.fillText(k + ' cm', gx - 4, DY(k));
      g.textAlign = 'center'; g.textBaseline = 'top'; g.fillText('depth', gx + gw / 2, gy + gh + 4);
      // rate graph (last 20 s)
      var gx0 = 12, gy0 = H * 0.76, gw0 = W - 24, gh0 = H * 0.2, span = 20000; function RY(v) { return gy0 + gh0 - gh0 * (Math.max(60, Math.min(160, v)) - 60) / 100; }
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(gx0, gy0, gw0, gh0); g.fillStyle = 'rgba(52,211,153,.2)'; g.fillRect(gx0, RY(RMAX), gw0, RY(RMIN) - RY(RMAX));
      g.fillStyle = '#8b93bd'; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText('rate (last 20 s) · green = 100–120', gx0 + 4, gy0 - 2);
      g.strokeStyle = '#fb923c'; g.lineWidth = 2; g.beginPath(); var st = false;
      comps.forEach(function (c) { if (!c.rate || now - c.t > span) return; var x = gx0 + gw0 * (1 - (now - c.t) / span); if (!st) { g.moveTo(x, RY(c.rate)); st = true; } else g.lineTo(x, RY(c.rate)); });
      g.stroke();
      comps.forEach(function (c) { if (now - c.t > span || !c.d) return; var x = gx0 + gw0 * (1 - (now - c.t) / span); g.fillStyle = c.d >= DMIN && c.d <= DMAX + 0.3 ? '#34d399' : '#fbbf24'; g.fillRect(x - 1.5, gy0 + gh0 - 6, 3, 5); });
    }
    var tk = 0;
    K.loop(function (dt) {
      now = performance.now();
      if (S.metro) { metroPh += dt * BPM / 60; if (metroPh >= 1) { metroPh -= 1; pulse = 1; K.snd('tick'); } }
      if (pulse > 0) pulse = Math.max(0, pulse - dt * 3);
      draw();
      tk += dt; if (tk > 0.2) { tk = 0; var r = rateNow(); setRo('rate', r ? Math.round(r) + '/min' : '—'); setRo('n', set.n); setRo('rok', set.rated ? Math.round(100 * set.rateOk / set.rated) + '%' : '—'); setRo('dok', set.n ? Math.round(100 * set.depthOk / set.n) + '%' : '—'); setRo('cy', set.cycles); setRo('lp', longest ? longest.toFixed(1) + ' s' : '—'); }
    });
    K.fb('👋 Press and release on the chest in time with the beat. Space works too.', '');
    return { destroy: K.destroy };
  }
});
})();

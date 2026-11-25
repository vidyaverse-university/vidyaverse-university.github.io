/* VidyaVerse University v2 — Lab: Touch Typing (plain script, self-contained) */
(function () {
'use strict';
var ID = 'typing-lab', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#2563eb;--a2:#22c55e}§ .pr{position:relative;margin:10px;padding:14px 16px;border-radius:14px;background:#0b1130;border:2px solid rgba(255,255,255,.12);font-family:ui-monospace,'Cascadia Code',Menlo,Consolas,'Courier New',monospace;font-size:clamp(17px,1.2vw + 12px,30px);line-height:1.7;letter-spacing:.02em;min-height:4.2em;cursor:text;word-break:break-word}" +
"§ .pr.focus{border-color:var(--a2);box-shadow:0 0 0 4px rgba(34,197,94,.2)}§ .pr span{border-radius:4px;white-space:pre-wrap}§ .pr .ok{color:#86efac}§ .pr .bad{color:#fecaca;background:rgba(248,113,113,.35);text-decoration:underline wavy #f87171}§ .pr .cur{background:#facc15;color:#111;animation:vvtyblink 1s steps(2) infinite}§ .pr .todo{color:#c7cdee}" +
"§ .pr .hint{position:absolute;right:10px;bottom:6px;font-family:system-ui,sans-serif;font-size:12px;color:var(--mu)}§ .cap{position:absolute;inset:0;width:100%;height:100%;opacity:0;font-size:16px;border:0;background:transparent;color:transparent;resize:none;cursor:text}" +
"@keyframes vvtyblink{50%{background:rgba(250,204,21,.45)}}§ textarea.cus{width:100%;min-height:80px}";

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

var LESSONS = [
  { n: 'Home row keys', t: 'asdf jkl; asdf jkl; fdsa ;lkj ff jj dd kk ss ll aa ;; fj dk sl a; jf kd ls ;a' },
  { n: 'Home row words', t: 'a sad lad; a glad dad; all fall; ask dad; add salt; a flask; dash; half a glass' },
  { n: 'Top row', t: 'we type quietly; your power is true; write it out; pour tea; our tower is tiny' },
  { n: 'Bottom row', t: 'a zebra van; extra cabin; move next; calm voice; mix in a box; bring a ball' },
  { n: 'Full sentences', t: 'The quick brown fox jumps over the lazy dog. Practise daily, and rest your hands!' },
  { n: 'Numbers', t: 'Call 112 in an emergency. Class 10 has 45 students and 3 teachers in room 207.' },
  { n: 'Common words', t: 'the and for are but not you all any can her was one our out day get has him his how man new now old see two way who boy did its let put say she too use' }
];
var ROWS = ['`1234567890-=', 'qwertyuiop[]', "asdfghjkl;'", 'zxcvbnm,./'], OFF = [0, 0.5, 0.75, 1.25];
var SHIFTED = { '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[', '}': ']', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/' };
var FING = { L5: 'left little finger', L4: 'left ring finger', L3: 'left middle finger', L2: 'left index finger', R2: 'right index finger', R3: 'right middle finger', R4: 'right ring finger', R5: 'right little finger', TH: 'either thumb' };
var FCOL = { L5: '#f472b6', L4: '#fb923c', L3: '#facc15', L2: '#4ade80', R2: '#22d3ee', R3: '#60a5fa', R4: '#a78bfa', R5: '#e879f9', TH: '#94a3b8' };
function finger(k) {
  if (k === ' ') return 'TH';
  if ('`1qaz'.indexOf(k) >= 0) return 'L5'; if ('2wsx'.indexOf(k) >= 0) return 'L4'; if ('3edc'.indexOf(k) >= 0) return 'L3'; if ('45rtfgvb'.indexOf(k) >= 0) return 'L2';
  if ('67yuhjnm'.indexOf(k) >= 0) return 'R2'; if ('8ik,'.indexOf(k) >= 0) return 'R3'; if ('9ol.'.indexOf(k) >= 0) return 'R4'; return 'R5';
}
function baseKey(ch) { if (SHIFTED[ch]) return { k: SHIFTED[ch], sh: true }; var lo = ch.toLowerCase(); return { k: lo, sh: ch !== lo }; }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Touch Typing Lab', icon: '⌨️', faculty: 'tech', bands: ['primary', 'middle', 'secondary', 'senior', 'ug', 'pro'],
  summary: 'Learn to type without looking: home row, finger zones, top and bottom rows and full sentences, with live words-per-minute, accuracy and a colour-coded keyboard.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var text = '', marks = [], pos = 0, t0 = 0, tEnd = 0, keys = 0, okKeys = 0, finished = false, hist = [], lastRes = null, target = { wpm: 10, acc: 90 }, flash = null, spans = [], dirty = true, lesson = 0;
    var DIFF = { gentle: [5, 85, 'Gentle'], standard: [12, 90, 'Standard'], pro: [30, 95, 'Pro'] }, diff = 'standard';
    K.shell({
      icon: '⌨️', title: 'Touch Typing Lab',
      goal: 'Type faster and more accurately by using all ten fingers — without looking at the keys.',
      how: '<ul><li><b>Home row:</b> rest your left fingers on <b>A S D F</b> and right fingers on <b>J K L ;</b>. Feel the little bumps on F and J — they let you find home without looking.</li><li>Each finger owns a <b>zone</b> (colours on the keyboard). Return to home after every key. Thumbs press the space bar.</li><li><b>Words per minute (WPM)</b> = (correct characters ÷ 5) ÷ minutes. A “word” is counted as 5 characters, including spaces.</li><li><b>Accuracy</b> = correct keystrokes ÷ all keystrokes. Accuracy first — speed follows. Aim for 95%+.</li><li><b>Posture:</b> sit tall, feet flat, wrists floating (not bent), screen at eye level, a short break every 30 minutes.</li></ul><p>Tap or click the text box to start (on phones this opens your keyboard). Backspace fixes mistakes, but they still count against accuracy.</p>',
      note: 'Shown on a standard US/UK QWERTY layout. WPM uses the common 5-characters-per-word rule. Phone on-screen keyboards are thumb-typed, so finger zones apply to physical keyboards.',
      onMode: function () { dirty = true; },
      onReset: function () { load(0); }
    });
    var pr = K.h('div', 'pr'), txt = K.h('div', '', null, { 'aria-hidden': 'true' }), cap = K.h('textarea', 'cap', null, { autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Type the text shown here' }), tip = K.h('span', 'hint', 'tap here to type');
    pr.appendChild(txt); pr.appendChild(cap); pr.appendChild(tip); K.stage.appendChild(pr);
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Keyboard with finger zones and the next key highlighted' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });
    var rc = K.card('⏱️ Live stats');
    var setRo = K.ro(rc, [['wpm', 'Net WPM'], ['acc', 'Accuracy'], ['tm', 'Time'], ['pr', 'Progress'], ['er', 'Errors'], ['fg', 'Next finger']]);
    var lc = K.card('📚 Lessons'), sel = K.h('select', '', null, { 'aria-label': 'Choose a lesson' }); lc.appendChild(sel);
    LESSONS.forEach(function (l, i) { sel.appendChild(K.h('option', '', (i + 1) + '. ' + l.n, { value: i })); });
    K.on(sel, 'change', function () { load(+sel.value); });
    var lr = K.h('div', 'row'); lr.style.marginTop = '6px'; lc.appendChild(lr);
    K.btn(lr, '↻ Restart lesson', '', function () { load(lesson); });
    var dc = K.card('🎚️ Difficulty (targets)'), dr = K.h('div', 'row'), db = {}; dc.appendChild(dr);
    Object.keys(DIFF).forEach(function (k) { db[k] = K.btn(dr, DIFF[k][2] + ' · ' + DIFF[k][0] + ' wpm', '', function () { setDiff(k); }); });
    function setDiff(k) { diff = k; target = { wpm: DIFF[k][0], acc: DIFF[k][1] }; for (var x in db) { db[x].classList.toggle('on', x === k); db[x].setAttribute('aria-pressed', x === k ? 'true' : 'false'); } }
    setDiff('standard');
    var cc = K.card('✍️ Your own text (free play)'), cus = K.h('textarea', 'cus', null, { 'aria-label': 'Custom practice text', maxlength: '400' }); cc.appendChild(cus);
    K.btn(cc, 'Practise this text', '', function () { var v = cus.value.replace(/\s+/g, ' ').trim(); if (v.length < 5) { K.fb('Type or paste at least a few words first.', 'bad'); return; } loadText(v.slice(0, 400)); });

    function loadText(s) {
      text = s; marks = []; for (var i = 0; i < s.length; i++) marks.push(0); pos = 0; t0 = 0; tEnd = 0; keys = 0; okKeys = 0; finished = false; hist = []; lastRes = null;
      txt.innerHTML = ''; spans = [];
      for (var j = 0; j < s.length; j++) { var sp = document.createElement('span'); sp.textContent = s[j]; sp.className = j === 0 ? 'cur' : 'todo'; txt.appendChild(sp); spans.push(sp); }
      dirty = true; stats();
    }
    function load(i) { lesson = i; sel.value = i; loadText(LESSONS[i].t); }
    function setCls(i) { if (!spans[i]) return; spans[i].className = i === pos && !finished ? 'cur' : marks[i] === 1 ? 'ok' : marks[i] === 2 ? 'bad' : 'todo'; }
    function elapsed() { return t0 ? ((tEnd || performance.now()) - t0) / 1000 : 0; }
    function netWpm() { var c = 0; for (var i = 0; i < pos; i++) if (marks[i] === 1) c++; var m = elapsed() / 60; return m > 0.02 ? c / 5 / m : 0; }
    function acc() { return keys ? 100 * okKeys / keys : 100; }
    function typeChar(ch) {
      if (finished || !text) return;
      if (ch === '\u2019' || ch === '\u2018') ch = "'"; if (ch === '\u201c' || ch === '\u201d') ch = '"'; if (ch === '\n' || ch === '\r') return;
      if (!t0) t0 = performance.now();
      var exp = text[pos]; keys++;
      if (ch === exp) { okKeys++; marks[pos] = 1; flash = { k: baseKey(ch).k, ok: true, t: 0.25 }; }
      else { marks[pos] = 2; flash = { k: baseKey(ch).k, ok: false, t: 0.35 }; K.snd('bad'); }
      pos++; setCls(pos - 1); setCls(pos);
      if (pos >= text.length) finish();
      dirty = true;
    }
    function back() { if (finished || pos === 0) return; pos--; marks[pos] = 0; setCls(pos); setCls(pos + 1); dirty = true; }
    function finish() {
      finished = true; tEnd = performance.now(); setCls(pos - 1);
      var w = netWpm(), a = acc(); lastRes = { wpm: w, acc: a, lesson: lesson };
      var good = w >= target.wpm && a >= target.acc;
      K.snd(good ? 'win' : 'pop');
      K.fb((good ? '🎉 ' : '📈 ') + 'Finished: ' + w.toFixed(1) + ' WPM at ' + a.toFixed(0) + '% accuracy. ' + (good ? 'Target met!' : 'Target: ' + target.wpm + ' WPM and ' + target.acc + '% — press Restart lesson to try again.'), good ? 'good' : '');
      stats();
    }
    K.on(cap, 'beforeinput', function (e) {
      if (e.inputType === 'insertText' && e.data) { e.preventDefault(); for (var i = 0; i < e.data.length; i++) typeChar(e.data[i]); }
      else if (e.inputType === 'deleteContentBackward') { e.preventDefault(); back(); }
      else if (e.inputType === 'insertLineBreak') e.preventDefault();
    });
    K.on(cap, 'input', function (e) { if (e.isComposing) return; var v = cap.value; if (v) { for (var i = 0; i < v.length; i++) typeChar(v[i]); cap.value = ''; } });
    K.on(cap, 'compositionend', function () { var v = cap.value; if (v) { for (var i = 0; i < v.length; i++) typeChar(v[i]); cap.value = ''; } });
    K.on(cap, 'keydown', function (e) { if (e.key === 'Backspace') { e.preventDefault(); back(); } else if (e.key === 'Enter' || e.key === 'Tab') { if (e.key === 'Enter') e.preventDefault(); } });
    K.on(cap, 'focus', function () { pr.classList.add('focus'); tip.textContent = 'typing…'; });
    K.on(cap, 'blur', function () { pr.classList.remove('focus'); tip.textContent = 'tap here to type'; });

    function lv(i, title, xpv, extra) { return { title: title, text: 'Lesson ' + (i + 1) + ': <b>' + LESSONS[i].n + '</b>. Click/tap the text box and type it. Target: <b>' + target.wpm + '+ WPM</b> and <b>' + target.acc + '%+ accuracy</b> (change Difficulty in the side panel).' + (extra || ''), hint: 'Keep your eyes on the text, not the keys. Watch the highlighted key and finger colour. Slow and accurate beats fast and messy.', good: 'Lesson passed! ' + title + ' unlocked in your fingers.', xp: xpv, start: function () { load(i); }, check: function () { return lastRes && lastRes.lesson === i && lastRes.wpm >= target.wpm && lastRes.acc >= target.acc; } }; }
    K.tasks([
      lv(0, 'Home row', 15, ' Left hand on A S D F, right on J K L ;.'),
      lv(1, 'Home row words', 15),
      lv(2, 'Top row', 20, ' Reach up from home, then come back.'),
      lv(3, 'Bottom row', 20, ' Reach down — keep your wrists still.'),
      lv(4, 'Full sentences', 30, ' Use the opposite hand’s little finger for Shift.')
    ]);

    function stats() { var w = netWpm(), a = acc(), nx = text[pos], fk = nx != null ? finger(baseKey(nx).k) : null; setRo('wpm', w.toFixed(1)); setRo('acc', a.toFixed(0) + '%'); setRo('tm', elapsed().toFixed(0) + ' s'); setRo('pr', pos + ' / ' + text.length); var er = 0; for (var i = 0; i < pos; i++) if (marks[i] === 2) er++; setRo('er', er); setRo('fg', finished ? '—' : fk ? FING[fk] + (baseKey(nx).sh ? ' + Shift' : '') : '—'); }
    function draw() {
      var W = cv.W, H = cv.H; g.clearRect(0, 0, W, H); var bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0a1030'); bg.addColorStop(1, '#070a1c'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      var kbH = H * 0.66, units = 14.6, kw = Math.min((W - 20) / units, kbH / 5.4), x0 = (W - kw * units) / 2, y0 = 10, gap = Math.max(2, kw * 0.08);
      var nx = !finished && text[pos] != null ? baseKey(text[pos]) : null;
      function keyBox(x, y, w, label, k, extraOn) {
        var f = finger(k), on = (nx && nx.k === k) || extraOn, fl = flash && flash.k === k;
        g.fillStyle = on ? FCOL[f] : 'rgba(255,255,255,.07)'; g.strokeStyle = FCOL[f]; g.lineWidth = on ? 3 : 1.5;
        g.beginPath(); if (g.roundRect) g.roundRect(x + gap / 2, y + gap / 2, w - gap, kw - gap, kw * 0.16); else g.rect(x + gap / 2, y + gap / 2, w - gap, kw - gap); g.fill(); g.globalAlpha = on ? 1 : 0.55; g.stroke(); g.globalAlpha = 1;
        if (fl) { g.fillStyle = flash.ok ? 'rgba(134,239,172,' + flash.t * 2 + ')' : 'rgba(248,113,113,' + flash.t * 2 + ')'; g.fill(); }
        g.fillStyle = on ? '#0b1020' : '#e2e8f0'; g.font = '600 ' + Math.round(kw * 0.38) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, x + w / 2, y + kw / 2);
        if (k === 'f' || k === 'j') { g.fillStyle = on ? '#0b1020' : '#e2e8f0'; g.fillRect(x + w / 2 - kw * 0.12, y + kw * 0.78, kw * 0.24, 2); }
      }
      ROWS.forEach(function (row, r) { for (var i = 0; i < row.length; i++) { var k = row[i]; keyBox(x0 + (OFF[r] + i) * kw, y0 + r * kw, kw, k === ' ' ? '' : k.toUpperCase(), k); } });
      var shY = y0 + 3 * kw, need = nx && nx.sh, leftSide = need && finger(nx.k).charAt(0) === 'R';
      [[x0, 1.25, 'L5', leftSide], [x0 + (1.25 + 10) * kw, 2.3, 'R5', need && !leftSide]].forEach(function (s) { var on = s[3]; g.fillStyle = on ? FCOL[s[2]] : 'rgba(255,255,255,.05)'; g.strokeStyle = FCOL[s[2]]; g.lineWidth = 1.5; g.beginPath(); if (g.roundRect) g.roundRect(s[0] + gap / 2, shY + gap / 2, s[1] * kw - gap, kw - gap, kw * 0.16); else g.rect(s[0] + gap / 2, shY + gap / 2, s[1] * kw - gap, kw - gap); g.fill(); g.stroke(); g.fillStyle = on ? '#0b1020' : '#94a3b8'; g.font = '600 ' + Math.round(kw * 0.28) + 'px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('⇧ Shift', s[0] + s[1] * kw / 2, shY + kw / 2); });
      keyBox(x0 + 3.5 * kw, y0 + 4 * kw, 6.5 * kw, 'space', ' ');
      // legend dots
      var ly = y0 + 5 * kw + 6, lx = x0, fs = Math.max(9, Math.round(kw * 0.26)); g.font = fs + 'px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'top';
      ['L5', 'L4', 'L3', 'L2', 'R2', 'R3', 'R4', 'R5'].forEach(function (f) { g.fillStyle = FCOL[f]; g.fillRect(lx, ly + 2, fs * 0.8, fs * 0.8); lx += fs * 1.1; g.fillStyle = '#aab3d9'; var lbl = f.replace('L', 'L').replace('R', 'R'); g.fillText(lbl, lx, ly); lx += g.measureText(lbl).width + fs * 0.6; });
      // WPM graph
      var gy = Math.max(kbH, ly + fs + 10), gh = H - gy - 10, gx = 10, gw = W - 20, mx = Math.max(target.wpm * 1.5, 20); hist.forEach(function (p) { mx = Math.max(mx, p.w * 1.1); });
      if (gh > 30) {
        g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(gx, gy, gw, gh); var ty = gy + gh - gh * target.wpm / mx; g.strokeStyle = 'rgba(250,204,21,.7)'; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(gx, ty); g.lineTo(gx + gw, ty); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#facc15'; g.font = '11px system-ui,sans-serif'; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.fillText('target ' + target.wpm + ' wpm', gx + gw - 4, ty - 2);
        g.fillStyle = '#aab3d9'; g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText('your net WPM over time', gx + 4, gy + 3);
        if (hist.length > 1) { var tmax = Math.max(30, hist[hist.length - 1].t); g.strokeStyle = '#22c55e'; g.lineWidth = 2.5; g.beginPath(); hist.forEach(function (p, i) { var x = gx + gw * p.t / tmax, y = gy + gh - gh * p.w / mx; if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke(); }
      }
    }
    var tk = 0;
    K.loop(function (dt) {
      if (flash) { flash.t -= dt; if (flash.t <= 0) flash = null; dirty = true; }
      tk += dt;
      if (tk > 0.5) { tk = 0; if (t0 && !finished) { hist.push({ t: elapsed(), w: netWpm() }); dirty = true; } stats(); }
      if (dirty) { dirty = false; draw(); }
    });
    K.on(pr, 'pointerdown', function () { try { cap.focus({ preventScroll: true }); } catch (e) { cap.focus(); } });
    K.fb('👋 Tap the text box, put your fingers on the home row, and start typing.', '');
    return { destroy: K.destroy };
  }
});
})();

/* VidyaVerse University v2 — Lab: Turtle Code (plain script, self-contained) */
(function () {
'use strict';
var ID = 'turtle-code', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#16a34a;--a2:#22d3ee}" +
"§ textarea.ed{width:100%;min-height:150px;font-family:ui-monospace,'Cascadia Code',Menlo,Consolas,'Courier New',monospace;font-size:.95em;line-height:1.5;resize:vertical;tab-size:2}" +
"§ .pal .btn{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.85em;padding:6px 10px}" +
"§ .run{margin-top:8px}§ .err{color:#fecaca}";

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

/* ---------------- Turtle language ---------------- */
var ALIAS = { FD: 'FD', FORWARD: 'FD', BK: 'BK', BACK: 'BK', RT: 'RT', RIGHT: 'RT', LT: 'LT', LEFT: 'LT', PU: 'PU', PENUP: 'PU', PD: 'PD', PENDOWN: 'PD', REPEAT: 'REPEAT', COLOR: 'COLOR', COLOUR: 'COLOR', PC: 'COLOR', HOME: 'HOME' };
var COLORS = { white: '#f8fafc', red: '#f87171', orange: '#fb923c', yellow: '#facc15', green: '#4ade80', cyan: '#22d3ee', blue: '#60a5fa', purple: '#a78bfa', pink: '#f472b6' };
function err(m) { var e = new Error(m); e.vv = true; return e; }
function tokenize(src) { return src.split('\n').map(function (l) { return l.replace(/#.*$/, ''); }).join(' ').toUpperCase().replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').split(/[\s,;]+/).filter(Boolean); }
function parse(tokens) {
  var i = 0;
  function num(cmd) { var t = tokens[i++]; if (t === undefined) throw err(cmd + ' needs a number, e.g. ' + cmd + ' 50'); var v = Number(t); if (!isFinite(v)) throw err('"' + t.toLowerCase() + '" is not a number (it comes after ' + cmd + ').'); return v; }
  function block(depth) {
    var out = [];
    while (i < tokens.length) {
      var t = tokens[i++];
      if (t === ']') { if (depth === 0) throw err('There is an extra ] — check your brackets.'); return out; }
      if (t === '[') throw err('A [ must come right after REPEAT and a number, like REPEAT 4 [ FD 50 RT 90 ].');
      var c = ALIAS[t];
      if (!c) throw err('I don\u2019t know "' + t.toLowerCase() + '". Try FD, BK, RT, LT, PU, PD, REPEAT, COLOR, HOME.');
      if (c === 'FD' || c === 'BK' || c === 'RT' || c === 'LT') out.push({ c: c, v: num(c) });
      else if (c === 'REPEAT') { var n = num('REPEAT'); if (tokens[i++] !== '[') throw err('REPEAT needs [ ] around the commands to repeat, e.g. REPEAT 4 [ FD 50 RT 90 ].'); out.push({ c: 'R', n: Math.max(0, Math.min(1000, Math.round(n))), body: block(depth + 1) }); }
      else if (c === 'COLOR') { var col = (tokens[i++] || '').toLowerCase(); if (!COLORS[col]) throw err('COLOR needs one of: ' + Object.keys(COLORS).join(', ') + '.'); out.push({ c: 'COLOR', v: COLORS[col] }); }
      else out.push({ c: c });
    }
    if (depth > 0) throw err('A [ is missing its closing ].');
    return out;
  }
  return block(0);
}
function expand(ops, out) { for (var i = 0; i < ops.length; i++) { var o = ops[i]; if (o.c === 'R') { for (var k = 0; k < o.n; k++) { expand(o.body, out); if (out.length > 30000) throw err('That program makes over 30,000 moves — try a smaller REPEAT.'); } } else out.push(o); } }
function compile(src) { var out = []; expand(parse(tokenize(src)), out); return out; }
function simulate(src) {
  var s = { x: 0, y: 0, h: 0, pen: true }, out = [];
  compile(src).forEach(function (o) {
    if (o.c === 'FD' || o.c === 'BK') { var d = o.c === 'FD' ? o.v : -o.v, r = s.h * Math.PI / 180, nx = s.x + d * Math.sin(r), ny = s.y + d * Math.cos(r); if (s.pen) out.push({ x1: s.x, y1: s.y, x2: nx, y2: ny }); s.x = nx; s.y = ny; }
    else if (o.c === 'RT') s.h += o.v; else if (o.c === 'LT') s.h -= o.v; else if (o.c === 'PU') s.pen = false; else if (o.c === 'PD') s.pen = true; else if (o.c === 'HOME') { s.x = 0; s.y = 0; s.h = 0; }
  });
  return out;
}
function dSeg(px, py, s) { var vx = s.x2 - s.x1, vy = s.y2 - s.y1, L = vx * vx + vy * vy, t = L ? ((px - s.x1) * vx + (py - s.y1) * vy) / L : 0; t = Math.max(0, Math.min(1, t)); var dx = s.x1 + t * vx - px, dy = s.y1 + t * vy - py; return Math.sqrt(dx * dx + dy * dy); }
function cover(A, B, tol) {
  var tot = 0, hit = 0;
  A.forEach(function (s) { var L = Math.hypot(s.x2 - s.x1, s.y2 - s.y1), n = Math.max(1, Math.ceil(L / 4)); for (var k = 0; k <= n; k++) { var px = s.x1 + (s.x2 - s.x1) * k / n, py = s.y1 + (s.y2 - s.y1) * k / n, ok = false; tot++; for (var j = 0; j < B.length && !ok; j++) if (dSeg(px, py, B[j]) <= tol) ok = true; if (ok) hit++; } });
  return tot ? hit / tot : 0;
}
function mirror(S) { return S.map(function (s) { return { x1: -s.x1, y1: s.y1, x2: -s.x2, y2: s.y2 }; }); }

var EXAMPLES = [
  ['Square', 'REPEAT 4 [ FD 100 RT 90 ]'],
  ['Flower of squares', 'COLOR pink\nREPEAT 36 [\n  REPEAT 4 [ FD 90 RT 90 ]\n  RT 10\n]'],
  ['Circle (360-gon)', 'COLOR cyan\nREPEAT 360 [ FD 1.5 RT 1 ]'],
  ['Staircase', 'PU BK 120 LT 90 FD 120 RT 90 PD\nCOLOR yellow\nREPEAT 6 [ FD 35 RT 90 FD 35 LT 90 ]'],
  ['Star burst', 'COLOR orange\nREPEAT 18 [ FD 160 BK 160 RT 20 ]'],
  ['Octagon', 'COLOR purple\nREPEAT 8 [ FD 70 RT 45 ]'],
  ['Spirograph', 'COLOR blue\nREPEAT 12 [\n  REPEAT 6 [ FD 60 RT 60 ]\n  RT 30\n]']
];

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Turtle Code', icon: '🐢', faculty: 'tech', bands: ['primary', 'middle', 'secondary'],
  summary: 'Write tiny Logo-style programs (FD, RT, REPEAT) to steer a turtle and draw shapes — learn sequences, loops, debugging and the 360° turning rule.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var st, segs = [], queue = [], qi = 0, prog = 0, running = false, target = null, matched = false, dirty = true, steps = 0, turn = 0;
    K.shell({
      icon: '🐢', title: 'Turtle Code',
      goal: 'Steer a turtle with code. Match the dotted shape, then invent your own art.',
      how: '<p>Type commands in the editor and press <b>Run ▶</b> (or Ctrl/⌘ + Enter). The turtle starts in the middle, facing up.</p><ul><li><b>FD 50</b> forward 50 steps · <b>BK 50</b> back</li><li><b>RT 90</b> turn right (clockwise) 90° · <b>LT 90</b> turn left</li><li><b>REPEAT 4 [ … ]</b> repeat the commands inside the brackets</li><li><b>PU</b> pen up (move without drawing) · <b>PD</b> pen down · <b>COLOR red</b> · <b>HOME</b></li></ul><p><b>The big idea — total turtle turning:</b> when the turtle draws any closed shape and ends facing the way it started, it has turned a whole number of full turns. For a regular polygon with <i>n</i> sides it turns 360° in total, so each turn is the <i>exterior</i> angle 360° ÷ <i>n</i>. The inside (interior) angle is 180° − exterior.</p><p>Programs rarely work first time — finding and fixing the mistake is called <b>debugging</b>. Use <b>Step</b> to run one move at a time.</p>',
      note: 'Simplified Logo: numbers only (no variables or procedures); max 30,000 moves. Turtle starts at the centre facing up; RT is clockwise. Shape checks allow left- or right-turning versions.',
      onMode: function (m) { if (m === 'free') { target = null; dirty = true; } },
      onReset: function () { ed.value = 'FD 100'; clearAll(); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Turtle drawing area' }); K.stage.appendChild(cv);
    var g = K.canvas(cv, function () { dirty = true; });

    var pc = K.card('📝 Program');
    var ed = K.h('textarea', 'ed', null, { spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': 'Turtle program' });
    ed.value = 'FD 100'; pc.appendChild(ed);
    var pal = K.h('div', 'row pal'); pc.appendChild(pal);
    [['FD 50', 'FD 50'], ['BK 50', 'BK 50'], ['RT 90', 'RT 90'], ['LT 90', 'LT 90'], ['REPEAT', 'REPEAT 4 [ FD 50 RT 90 ]'], ['PU', 'PU'], ['PD', 'PD'], ['COLOR', 'COLOR red']].forEach(function (p) { K.btn(pal, p[0], '', function () { ins(p[1]); }); });
    K.btn(pal, '⌫ Clear code', '', function () { ed.value = ''; });
    var rr = K.h('div', 'row run'); pc.appendChild(rr);
    K.btn(rr, 'Run ▶', 'pri', function () { run(false); });
    K.btn(rr, 'Step ⏯', '', function () { stepOnce(); });
    K.btn(rr, 'Stop ■', '', function () { running = false; dirty = true; K.fb('Stopped.', ''); });
    K.btn(rr, 'Erase drawing', '', function () { clearAll(); });
    var spd = K.slider(pc, { label: 'Speed', min: 1, max: 10, step: 1, value: K.rm ? 10 : 5, fmt: function (v) { return v >= 10 ? 'instant' : v; } });

    var rc = K.card('📍 Turtle status');
    var setRo = K.ro(rc, [['pos', 'Position (x, y)'], ['hd', 'Heading'], ['pen', 'Pen'], ['st', 'Moves run'], ['tn', 'Total turning']]);

    var ex = K.card('✨ Example programs');
    var sel = K.h('select', '', null, { 'aria-label': 'Example programs' }); ex.appendChild(sel);
    EXAMPLES.forEach(function (e, i) { var o = K.h('option', '', e[0], { value: i }); sel.appendChild(o); });
    var er = K.h('div', 'row run'); ex.appendChild(er);
    K.btn(er, 'Load & run', '', function () { ed.value = EXAMPLES[+sel.value][1]; run(false); });

    function ins(txt) { var v = ed.value; ed.value = v + (v && !/\s$/.test(v) ? ' ' : '') + txt + ' '; }
    function home() { st = { x: 0, y: 0, h: 0, pen: true, col: '#4ade80' }; }
    function clearAll() { running = false; home(); segs = []; queue = []; qi = 0; prog = 0; steps = 0; turn = 0; dirty = true; }
    home();
    function move(d) {
      var r = st.h * Math.PI / 180, nx = st.x + d * Math.sin(r), ny = st.y + d * Math.cos(r);
      if (st.pen) { var l = segs[segs.length - 1]; if (l && l.op === qi && Math.abs(l.x2 - st.x) < 1e-6 && Math.abs(l.y2 - st.y) < 1e-6) { l.x2 = nx; l.y2 = ny; } else segs.push({ x1: st.x, y1: st.y, x2: nx, y2: ny, col: st.col, op: qi }); }
      st.x = nx; st.y = ny;
    }
    function cost(o) { return (o.c === 'FD' || o.c === 'BK') ? Math.abs(o.v) : (o.c === 'RT' || o.c === 'LT') ? Math.abs(o.v) * 0.6 : 0; }
    function part(o, f) { if (o.c === 'FD') move(o.v * f); else if (o.c === 'BK') move(-o.v * f); else if (o.c === 'RT') { st.h += o.v * f; turn += o.v * f; } else if (o.c === 'LT') { st.h -= o.v * f; turn -= o.v * f; } }
    function instant(o) { if (o.c === 'PU') st.pen = false; else if (o.c === 'PD') st.pen = true; else if (o.c === 'COLOR') st.col = o.v; else if (o.c === 'HOME') { st.x = 0; st.y = 0; st.h = 0; } }
    function applyFull(o) { if (cost(o) > 0) part(o, 1); else instant(o); qi++; steps++; }
    function load() { var ops; try { ops = compile(ed.value); } catch (e) { K.fb('⚠️ ' + (e.vv ? e.message : 'Something went wrong reading your program.'), 'bad'); K.snd('bad'); return null; } if (!ops.length) { K.fb('Your program is empty — try FD 100.', 'bad'); return null; } return ops; }
    function run() {
      var ops = load(); if (!ops) return;
      clearAll(); queue = ops; running = true; K.snd('whoosh');
      if (spd.get() >= 10) { while (qi < queue.length) applyFull(queue[qi]); finishRun(); }
    }
    function stepOnce() {
      if (running) running = false;
      if (qi >= queue.length || !queue.length) { var ops = load(); if (!ops) return; clearAll(); queue = ops; }
      var o = queue[qi]; if (prog > 0) { part(o, 1 - prog / cost(o)); qi++; steps++; prog = 0; } else applyFull(o);
      dirty = true; K.snd('tick');
      K.fb('Step ' + qi + ' of ' + queue.length + ': ' + describe(o), '');
      if (qi >= queue.length) finishRun();
    }
    function describe(o) { return o.c === 'FD' ? 'forward ' + o.v : o.c === 'BK' ? 'back ' + o.v : o.c === 'RT' ? 'turn right ' + o.v + '°' : o.c === 'LT' ? 'turn left ' + o.v + '°' : o.c === 'PU' ? 'pen up' : o.c === 'PD' ? 'pen down' : o.c === 'HOME' ? 'go home' : 'change colour'; }
    function finishRun() {
      running = false; dirty = true;
      var t = K.T && K.T.cur();
      if (!t || !target) { K.fb('✔ Finished: ' + steps + ' moves, total turning ' + Math.round(turn) + '°' + (Math.abs(Math.round(turn) % 360) === 0 && turn !== 0 ? ' — a whole number of full turns!' : '.'), ''); return; }
      var d = segs.filter(function () { return true; });
      if (!d.length) { K.fb('Nothing was drawn — is the pen up?', 'bad'); K.snd('bad'); return; }
      var best = null;
      [target, mirror(target)].forEach(function (T) { var a = cover(T, d, 4.5), b = cover(d, T, 4.5); if (!best || a + b > best.a + best.b) best = { a: a, b: b }; });
      if (best.a >= 0.97 && best.b >= 0.97) { matched = true; K.T.check(); }
      else { K.snd('bad'); K.fb(best.a < 0.97 ? '🔍 Close! ' + Math.round(best.a * 100) + '% of the dotted target is covered. Check your lengths and angles.' : '🔍 The target is covered, but some lines go outside it. Remove extra moves.', 'bad'); }
    }
    function tk(title, text, src, hint, good, xp) { return { title: title, text: text, hint: hint, good: good, xp: xp, start: function () { target = simulate(src); matched = false; clearAll(); }, check: function () { return matched; } }; }
    K.tasks([
      tk('Draw a line', 'Make the turtle draw the dotted line: <b>100 steps</b> straight up. Type a command and press Run ▶.', 'FD 100', 'Type FD 100 and press Run.', 'Sequence of one: FD moves the turtle forward without turning.', 10),
      tk('A square', 'Draw the dotted <b>square</b> with sides of 100. Try it the long way first, then with REPEAT.', 'REPEAT 4 [ FD 100 RT 90 ]', 'REPEAT 4 [ FD 100 RT 90 ] — four sides, four 90° turns.', 'A square: 4 turns of 90° = 360°, one full turn.', 15),
      tk('Triangle trap', 'Draw an <b>equilateral triangle</b> with sides of 120. Careful — what angle does the turtle turn?', 'REPEAT 3 [ FD 120 RT 120 ]', 'The turtle turns the OUTSIDE angle: 360 ÷ 3 = 120°, not 60°. Try REPEAT 3 [ FD 120 RT 120 ].', 'Exterior angle = 360° ÷ 3 = 120°. The interior angle is 180° − 120° = 60°.', 20),
      tk('Hexagon', 'Draw a regular <b>hexagon</b> with sides of 70. Use the 360° rule to find the turn.', 'REPEAT 6 [ FD 70 RT 60 ]', '6 sides, so each turn is 360 ÷ 6 = 60°.', 'Hexagon: 6 × 60° = 360°. Honeycomb cells use this shape!', 20),
      tk('Five-point star', 'Draw a <b>star</b> with 5 lines of 150. Hint: the turtle goes round TWICE while drawing it.', 'REPEAT 5 [ FD 150 RT 144 ]', 'Two full turns = 720°, and 720 ÷ 5 = 144°. Try REPEAT 5 [ FD 150 RT 144 ].', 'Star: 5 × 144° = 720° — two full turns. You discovered the total turtle turning theorem!', 30)
    ]);
    K.on(ed, 'keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); } });

    function draw() {
      var W = cv.W, H = cv.H, sc = Math.min(W, H) / 440, cx = W / 2, cy = H / 2;
      function X(x) { return cx + x * sc; } function Y(y) { return cy - y * sc; }
      var bg = g.createRadialGradient(cx, cy, 10, cx, cy, Math.max(W, H) * 0.7); bg.addColorStop(0, '#0e1a3a'); bg.addColorStop(1, '#050817');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.lineWidth = 1;
      for (var k = -800; k <= 800; k += 50) { g.strokeStyle = k === 0 ? 'rgba(148,163,255,.28)' : 'rgba(148,163,255,.08)'; g.beginPath(); g.moveTo(X(k), 0); g.lineTo(X(k), H); g.stroke(); g.beginPath(); g.moveTo(0, Y(k)); g.lineTo(W, Y(k)); g.stroke(); }
      if (target) { g.save(); g.setLineDash([6, 7]); g.lineWidth = 5; g.lineCap = 'round'; g.strokeStyle = 'rgba(255,255,255,.28)'; target.forEach(function (s) { g.beginPath(); g.moveTo(X(s.x1), Y(s.y1)); g.lineTo(X(s.x2), Y(s.y2)); g.stroke(); }); g.restore(); }
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = Math.max(2, 3 * sc);
      if (!K.lp && segs.length < 4000) { g.shadowBlur = 10; }
      var col = null;
      for (var i = 0; i < segs.length; i++) { var s = segs[i]; if (s.col !== col) { if (col) g.stroke(); col = s.col; g.strokeStyle = col; g.shadowColor = col; g.beginPath(); } g.moveTo(X(s.x1), Y(s.y1)); g.lineTo(X(s.x2), Y(s.y2)); }
      if (col) g.stroke();
      g.restore();
      // turtle sprite
      var z = Math.max(9, 13 * sc);
      g.save(); g.translate(X(st.x), Y(st.y)); g.rotate(st.h * Math.PI / 180);
      g.fillStyle = '#86efac'; [[-0.75, -0.55], [0.75, -0.55], [-0.75, 0.6], [0.75, 0.6]].forEach(function (p) { g.beginPath(); g.ellipse(p[0] * z, p[1] * z, z * 0.3, z * 0.22, 0, 0, Math.PI * 2); g.fill(); });
      g.beginPath(); g.arc(0, -z * 1.05, z * 0.34, 0, Math.PI * 2); g.fill();
      var sh = g.createRadialGradient(-z * 0.2, -z * 0.3, 1, 0, 0, z); sh.addColorStop(0, '#4ade80'); sh.addColorStop(1, '#166534');
      g.fillStyle = sh; g.beginPath(); g.ellipse(0, 0, z * 0.72, z * 0.88, 0, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-z * 0.5, 0); g.lineTo(z * 0.5, 0); g.moveTo(0, -z * 0.7); g.lineTo(0, z * 0.7); g.stroke();
      g.fillStyle = st.pen ? st.col : 'rgba(255,255,255,.4)'; g.beginPath(); g.arc(0, 0, z * 0.18, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    K.loop(function (dt) {
      if (running) {
        var budget = dt * 30 * Math.pow(1.7, spd.get() - 1), guard = 0;
        while (running && guard++ < 200000) {
          var o = queue[qi]; if (!o) { finishRun(); break; }
          var need = cost(o);
          if (need === 0) { instant(o); qi++; steps++; prog = 0; continue; }
          if (budget <= 0) break;
          var take = Math.min(need - prog, budget); part(o, take / need); prog += take; budget -= take;
          if (prog >= need - 1e-9) { qi++; steps++; prog = 0; }
        }
        dirty = true;
      }
      if (dirty) {
        dirty = false; draw();
        var hd = ((Math.round(st.h) % 360) + 360) % 360;
        setRo('pos', '(' + Math.round(st.x) + ', ' + Math.round(st.y) + ')'); setRo('hd', hd + '°'); setRo('pen', st.pen ? 'down ✏️' : 'up'); setRo('st', steps + (queue.length ? ' / ' + queue.length : '')); setRo('tn', Math.round(turn) + '°');
      }
    });
    K.fb('👋 Press Run ▶ to see the turtle move. Then follow the task above.', '');
    return { destroy: K.destroy };
  }
});
})();

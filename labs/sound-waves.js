/* VidyaVerse University v2 — Lab: Sound Waves (plain script, self-contained) */
(function () {
'use strict';
var ID = 'sound-waves', P = '.vv-' + ID;
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
var EXTRA = "§{--a:#0ea5e9;--a2:#a855f7}§ .fin{width:7.5em}§ .wv .btn{padding:6px 10px;font-size:.85em}§ .play{width:100%;min-height:52px;font-size:1.05em}";

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

var FMIN = 20, FMAX = 4000, NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
function f2v(f) { return Math.round(1000 * Math.log(f / FMIN) / Math.log(FMAX / FMIN)); }
function v2f(v) { return FMIN * Math.pow(FMAX / FMIN, v / 1000); }
function note(f) { var n = 12 * Math.log(f / 440) / Math.LN2, r = Math.round(n), c = Math.round((n - r) * 100), idx = ((r + 9) % 12 + 12) % 12, oct = 4 + Math.floor((r + 9) / 12); return NOTES[idx] + oct + (c ? ' ' + (c > 0 ? '+' : '') + c + '¢' : ''); }
function wave(type, ph) { ph = ph - Math.floor(ph); if (type === 'sine') return Math.sin(2 * Math.PI * ph); if (type === 'square') return ph < 0.5 ? 1 : -1; if (type === 'triangle') return 1 - 4 * Math.abs(ph - 0.5); return 2 * ph - 1; }

window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({
  id: ID, title: 'Sound Waves Lab', icon: '🔊', faculty: 'school', bands: ['middle', 'secondary', 'senior'],
  summary: 'Hear and see sound: change frequency, amplitude and waveform, watch air molecules squeeze and stretch, measure wavelength (v = fλ), make beats and octaves.',
  mount: function (el, api) {
    inject();
    var K = kit(el, api);
    var S = { f1: 440, a1: 0.8, w1: 'sine', on2: false, f2: 442, a2: 0.8, w2: 'sine', temp: 20, med: 'air', vol: 0.3, win: 20 }, ph = 0, AC = null, mg = null, o1 = null, o2 = null, g1 = null, g2 = null, playing = false;
    var MED = { air: ['Air', 0], water: ['Water', 1480], steel: ['Steel', 5960] };
    function speed() { return S.med === 'air' ? 331.3 + 0.606 * S.temp : MED[S.med][1]; }
    K.shell({
      icon: '🔊', title: 'Sound Waves Lab',
      goal: 'Find out what pitch, loudness and tone really are — and why two notes can “wobble”.',
      how: '<p>Sound is a <b>longitudinal wave</b>: air molecules jiggle back and forth, making <b>compressions</b> (squeezed) and <b>rarefactions</b> (stretched) that travel outwards. The top picture shows them in slow motion over 3 metres.</p><ul><li><b>Frequency f</b> (hertz, Hz) = vibrations per second → <b>pitch</b>. Humans hear roughly 20 Hz – 20,000 Hz.</li><li><b>Amplitude</b> → <b>loudness</b>. <b>Waveform</b> → <b>tone</b> (timbre): a flute is close to a sine wave; a violin is closer to a sawtooth.</li><li><b>Period</b> T = 1/f. <b>Wave equation:</b> v = f λ, so λ = v / f.</li><li>Speed of sound in air ≈ <b>331.3 + 0.606 × T(°C)</b> m/s (343 m/s at 20 °C). It is faster in water (~1480 m/s) and steel (~5960 m/s).</li><li>Two close frequencies interfere and make <b>beats</b> at |f₁ − f₂| per second — musicians use this to tune instruments. Doubling the frequency gives an <b>octave</b>.</li></ul><p>Press <b>▶ Play sound</b> to hear it. Keep the volume low.</p>',
      note: 'Molecule motion is hugely exaggerated and slowed down so you can see it. The graph shows the pressure change at one point. Speeds are for typical conditions. 🎧 Protect your hearing: keep volume low and take breaks.',
      onMode: function () {},
      onReset: function () { setS({ f1: 440, a1: 0.8, w1: 'sine', on2: false, f2: 442, a2: 0.8, w2: 'sine', temp: 20, med: 'air' }); }
    });
    var cv = K.h('canvas', 'main', null, { role: 'img', 'aria-label': 'Air molecules and pressure graph' }); K.stage.appendChild(cv);
    var g = K.canvas(cv);
    var pc = K.card('🎧 Listen');
    var playB = K.btn(pc, '▶ Play sound', 'pri play', function () { if (playing) stopAudio(); else startAudio(); });
    var sV = K.slider(pc, { label: 'Volume', min: 0, max: 100, step: 1, value: 30, unit: '%', on: function (v) { S.vol = v / 100; applyAudio(); } });
    var rc = K.card('📐 Measurements');
    var setRo = K.ro(rc, [['f', 'Frequency'], ['n', 'Nearest note'], ['T', 'Period T'], ['v', 'Speed v'], ['l', 'Wavelength λ'], ['b', 'Beat frequency'], ['r', 'Ratio f₂/f₁']]);
    var c1 = K.card('〰️ Wave 1'), ctl = {};
    function waveCard(c, n) {
      var row = K.h('div', 'row'), fin = K.h('input', 'fin', null, { type: 'number', min: FMIN, max: FMAX, step: '0.1', inputmode: 'decimal', 'aria-label': 'Wave ' + n + ' frequency in hertz' }); row.appendChild(fin); row.appendChild(K.h('span', '', 'Hz'));
      K.btn(row, '−1', '', function () { setF(n, S['f' + n] - 1); }); K.btn(row, '+1', '', function () { setF(n, S['f' + n] + 1); });
      c.appendChild(row);
      var s = K.slider(c, { label: 'Frequency (pitch)', min: 0, max: 1000, step: 1, value: f2v(S['f' + n]), fmt: function (v) { return Math.round(v2f(v)) + ' Hz'; }, on: function (v) { if (lock) return; S['f' + n] = Math.round(v2f(v) * 10) / 10; fin.value = S['f' + n]; applyAudio(); } });
      K.on(fin, 'change', function () { var v = parseFloat(fin.value); if (isFinite(v)) setF(n, v); });
      var a = K.slider(c, { label: 'Amplitude (loudness)', min: 0, max: 100, step: 1, value: S['a' + n] * 100, unit: '%', on: function (v) { S['a' + n] = v / 100; applyAudio(); } });
      var wr = K.h('div', 'row wv', null, { role: 'group', 'aria-label': 'Waveform' }), wb = {};
      ['sine', 'square', 'triangle', 'sawtooth'].forEach(function (w) { wb[w] = K.btn(wr, { sine: '∿ sine', square: '⊓ square', triangle: '△ triangle', sawtooth: '⩘ saw' }[w], '', function () { S['w' + n] = w; wUI(); applyAudio(); }); });
      c.appendChild(wr);
      function wUI() { for (var k in wb) { wb[k].classList.toggle('on', S['w' + n] === k); wb[k].setAttribute('aria-pressed', S['w' + n] === k ? 'true' : 'false'); } }
      fin.value = S['f' + n]; wUI();
      ctl[n] = { fin: fin, s: s, a: a, wUI: wUI };
    }
    var lock = false;
    function setF(n, f) { f = Math.max(FMIN, Math.min(FMAX, Math.round(f * 10) / 10)); S['f' + n] = f; lock = true; ctl[n].s.set(f2v(f)); lock = false; ctl[n].fin.value = f; applyAudio(); }
    waveCard(c1, 1);
    var c2 = K.card('〰️ Wave 2 (interference)');
    var on2 = K.btn(c2, '➕ Add wave 2', '', function () { S.on2 = !S.on2; o2UI(); applyAudio(); });
    function o2UI() { on2.classList.toggle('on', S.on2); on2.textContent = S.on2 ? '✔ Wave 2 on' : '➕ Add wave 2'; on2.setAttribute('aria-pressed', S.on2 ? 'true' : 'false'); }
    waveCard(c2, 2); o2UI();
    var mc = K.card('🌡️ Medium & view');
    var sT = K.slider(mc, { label: 'Air temperature', min: -20, max: 50, step: 1, value: 20, unit: '°C', on: function (v) { S.temp = v; } });
    var mr = K.h('div', 'row'), mb = {}; mc.appendChild(mr);
    Object.keys(MED).forEach(function (k) { mb[k] = K.btn(mr, MED[k][0], '', function () { S.med = k; mUI(); }); });
    function mUI() { for (var k in mb) { mb[k].classList.toggle('on', S.med === k); mb[k].setAttribute('aria-pressed', S.med === k ? 'true' : 'false'); } }
    mUI();
    var sW = K.slider(mc, { label: 'Graph time window', min: 0, max: 100, step: 1, value: 50, fmt: function (v) { return fmtMs(winOf(v)); }, on: function (v) { S.win = winOf(v); } });
    function winOf(v) { return 2 * Math.pow(500, v / 100); } // 2 ms … 1000 ms
    function fmtMs(ms) { return ms >= 100 ? Math.round(ms) + ' ms' : ms.toFixed(1) + ' ms'; }
    S.win = winOf(50);
    function setS(o) { for (var k in o) S[k] = o[k]; setF(1, S.f1); setF(2, S.f2); ctl[1].a.set(S.a1 * 100); ctl[2].a.set(S.a2 * 100); ctl[1].wUI(); ctl[2].wUI(); o2UI(); sT.set(S.temp); mUI(); applyAudio(); }

    // ---- Web Audio (starts only after the user presses Play) ----
    function startAudio() {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) { K.fb('Sound is not supported in this browser — the pictures still work.', 'bad'); return; }
      try { if (!AC) { AC = new C(); mg = AC.createGain(); mg.gain.value = 0; mg.connect(AC.destination); } if (AC.state === 'suspended') AC.resume(); } catch (e) { K.fb('Could not start sound.', 'bad'); return; }
      stopOsc(); o1 = AC.createOscillator(); g1 = AC.createGain(); o2 = AC.createOscillator(); g2 = AC.createGain(); g1.gain.value = 0; g2.gain.value = 0;
      o1.connect(g1); g1.connect(mg); o2.connect(g2); g2.connect(mg); o1.start(); o2.start();
      playing = true; playB.textContent = '⏹ Stop sound'; applyAudio();
    }
    function stopOsc() { [o1, o2].forEach(function (o) { if (o) { try { o.stop(); } catch (e) {} try { o.disconnect(); } catch (e) {} } }); [g1, g2].forEach(function (x) { if (x) try { x.disconnect(); } catch (e) {} }); o1 = o2 = g1 = g2 = null; }
    function stopAudio() { playing = false; playB.textContent = '▶ Play sound'; if (AC && mg) mg.gain.setTargetAtTime(0, AC.currentTime, 0.03); K.later(function () { if (!playing) stopOsc(); }, 250); }
    function lvl(w) { return w === 'sine' ? 1 : w === 'triangle' ? 0.9 : 0.45; }
    function applyAudio() {
      if (!AC || !o1 || !playing) return; var t = AC.currentTime;
      try { o1.type = S.w1; o2.type = S.w2; } catch (e) {}
      o1.frequency.setTargetAtTime(S.f1, t, 0.015); o2.frequency.setTargetAtTime(S.f2, t, 0.015);
      g1.gain.setTargetAtTime(S.a1 * lvl(S.w1) * 0.5, t, 0.03); g2.gain.setTargetAtTime(S.on2 ? S.a2 * lvl(S.w2) * 0.5 : 0, t, 0.03);
      mg.gain.setTargetAtTime(S.vol * 0.6, t, 0.05);
    }
    K.cleanup.push(function () { stopOsc(); if (AC) { try { AC.close(); } catch (e) {} } AC = null; });

    K.tasks([
      { title: 'Concert A', text: 'Orchestras tune to the note <b>A4 = 440 Hz</b>. Set wave 1 to exactly <b>440 Hz</b> (press Play to hear it). Then look at its wavelength.', hint: 'Type 440 into the Hz box, or use the slider and the ±1 buttons.', good: 'A4 = 440 Hz. In air at 20 °C its wavelength is 343 ÷ 440 ≈ 0.78 m.', xp: 10,
        start: function () { setS({ f1: 300, on2: false, temp: 20, med: 'air', w1: 'sine' }); }, check: function () { return Math.abs(S.f1 - 440) <= 0.5; } },
      { title: 'A one-metre wave', text: 'In air at 20 °C, find the frequency whose <b>wavelength is 1.00 m</b> (±0.02 m). Watch the ruler in the top picture.', hint: 'λ = v ÷ f, so f = v ÷ λ = 343 ÷ 1.', good: 'About 343 Hz — because v = fλ, a 1 m wave needs f equal to the speed of sound in m/s.', xp: 15,
        start: function () { setS({ temp: 20, med: 'air' }); }, check: function () { return S.med === 'air' && Math.abs(S.temp - 20) < 0.5 && Math.abs(speed() / S.f1 - 1) <= 0.02; } },
      { title: 'Make beats', text: 'Turn on <b>wave 2</b> and set it so the two sine waves make <b>2 beats per second</b>. Use a long graph window (500+ ms) to see the wobble — and Play to hear it!', hint: 'Beat frequency = |f₁ − f₂|. If f₁ = 440, try f₂ = 442 or 438.', good: '|f₁ − f₂| = 2 Hz: the loudness rises and falls twice a second. Tuners listen for beats to vanish.', xp: 20,
        start: function () { setS({ f1: 440, f2: 447, on2: false, w1: 'sine', w2: 'sine' }); sW.set(85); }, check: function () { return S.on2 && S.w1 === 'sine' && S.w2 === 'sine' && Math.abs(Math.abs(S.f1 - S.f2) - 2) <= 0.3 && S.a2 > 0.1; } },
      { title: 'A hot day', text: 'Use the temperature slider: what is the speed of sound in air at <b>40 °C</b>?', ask: { answer: 355.5, tol: 1.5, unit: 'm/s' }, hint: 'v ≈ 331.3 + 0.606 × 40.', good: 'About 355.5 m/s. Warmer air molecules move faster and pass on the vibration more quickly.', xp: 15 },
      { title: 'The octave', text: 'Set wave 2 to be <b>exactly one octave above</b> wave 1 (any wave 1 you like). Play them together — they blend smoothly.', hint: 'An octave doubles the frequency: if f₁ = 220 Hz, make f₂ = 440 Hz.', good: 'Ratio 2 : 1 — an octave. Other sweet intervals use simple ratios too: a perfect fifth (Sa–Pa) is 3 : 2.', xp: 20,
        start: function () { setS({ f1: 220, f2: 300, on2: true }); sW.set(50); }, check: function () { return S.on2 && Math.abs(S.f2 / S.f1 - 2) <= 0.01; } }
    ]);

    function draw() {
      var W = cv.W, H = cv.H, u = Math.max(0.8, Math.min(W, H) / 420), v = speed(), lam1 = v / S.f1, lam2 = v / S.f2;
      g.clearRect(0, 0, W, H); var bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#071425'); bg.addColorStop(1, '#0b0820'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      // particles over 3 m
      var top = 26 * u, ph1 = H * 0.36, Lm = 3, cols = Math.max(40, Math.min(K.lp ? 70 : 120, Math.round(W / 7))), rows = 7, sp = W / cols, A = sp * 0.42;
      g.fillStyle = '#8b93bd'; g.font = Math.round(10 * u + 1) + 'px system-ui,sans-serif'; g.textAlign = 'left'; g.textBaseline = 'top';
      g.fillText('air molecules (slow motion, motion exaggerated) — ' + MED[S.med][0], 8, 6);
      for (var c = 0; c < cols; c++) {
        var xm = (c + 0.5) / cols * Lm, d1 = S.a1 * wave(S.w1 === 'sine' ? 'sine' : S.w1, xm / lam1 - ph), d2 = S.on2 ? S.a2 * wave(S.w2, xm / lam2 - ph * S.f2 / S.f1) : 0, d = (d1 + d2) / (S.on2 ? 2 : 1);
        var dn = -(S.a1 * Math.cos(2 * Math.PI * (xm / lam1 - ph)) + (S.on2 ? S.a2 * Math.cos(2 * Math.PI * (xm / lam2 - ph * S.f2 / S.f1)) : 0)) / (S.on2 ? 2 : 1);
        var x = (c + 0.5) * sp + d * A, hue = dn > 0 ? 'rgba(248,113,113,' + (0.45 + 0.5 * dn) + ')' : 'rgba(125,211,252,' + (0.45 - 0.35 * dn) + ')';
        g.fillStyle = hue; for (var r = 0; r < rows; r++) { var y = top + (r + 0.5) * (ph1 - top) / rows + ((c * 7 + r * 3) % 5 - 2) * u; g.beginPath(); g.arc(x, y, 2.2 * u, 0, Math.PI * 2); g.fill(); }
      }
      // ruler + wavelength bracket
      var ry = ph1 + 6; g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 1; g.beginPath(); g.moveTo(0, ry); g.lineTo(W, ry); g.stroke();
      g.fillStyle = '#aab3d9'; g.textAlign = 'center'; for (var m = 0; m <= 3; m += 0.5) { var rx = m / Lm * W; g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx, ry + (m % 1 ? 4 : 8)); g.stroke(); if (m % 1 === 0) g.fillText(m + ' m', Math.min(W - 14, Math.max(14, rx)), ry + 9); }
      if (lam1 <= Lm) { var lx = 0.1 * W, lw = lam1 / Lm * W; g.strokeStyle = '#facc15'; g.lineWidth = 2; g.beginPath(); g.moveTo(lx, top - 4); g.lineTo(lx + lw, top - 4); g.stroke(); g.fillStyle = '#facc15'; g.textAlign = 'left'; g.fillText('λ = ' + lam1.toFixed(2) + ' m', Math.min(W - 80 * u, lx + lw + 6), top - 12); }
      else { g.fillStyle = '#facc15'; g.textAlign = 'right'; g.fillText('λ = ' + lam1.toFixed(1) + ' m (wider than this view)', W - 8, top - 12); }
      // pressure-time graph
      var gy = ph1 + 30 * u, gh = H - gy - 22 * u, gm = gy + gh / 2, Lx = 8, Wx = W - 16, win = S.win / 1000, amp = gh * 0.42;
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(Lx, gy, Wx, gh); g.strokeStyle = 'rgba(255,255,255,.12)'; g.beginPath(); g.moveTo(Lx, gm); g.lineTo(Lx + Wx, gm); g.stroke();
      g.fillStyle = '#8b93bd'; g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText('pressure at one point vs time (window ' + fmtMs(S.win) + ')', Lx + 4, gy + 3);
      var cyc = Math.max(S.f1, S.on2 ? S.f2 : 0) * win / Wx; // cycles per pixel
      function trace(fn, col, lw) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); for (var px = 0; px <= Wx; px += 1) { var tt = px / Wx * win, y = gm - fn(tt) * amp; if (px === 0) g.moveTo(Lx + px, y); else g.lineTo(Lx + px, y); } g.stroke(); }
      var tShift = K.rm ? 0 : ph / S.f1;
      if (cyc < 0.35) {
        var n = S.on2 ? 2 : 1;
        if (S.on2) { trace(function (tt) { return S.a1 * wave(S.w1, S.f1 * (tt + tShift)) / n; }, 'rgba(125,211,252,.45)', 1.2); trace(function (tt) { return S.a2 * wave(S.w2, S.f2 * (tt + tShift)) / n; }, 'rgba(216,180,254,.45)', 1.2); }
        trace(function (tt) { return (S.a1 * wave(S.w1, S.f1 * (tt + tShift)) + (S.on2 ? S.a2 * wave(S.w2, S.f2 * (tt + tShift)) : 0)) / n; }, '#facc15', 2.4);
        g.fillStyle = '#facc15'; g.textAlign = 'right'; g.fillText('T = ' + fmtMs(1000 / S.f1), Lx + Wx - 4, gy + 3);
      } else {
        // too many cycles to draw: show the loudness envelope instead
        var n2 = S.on2 ? 2 : 1, dfr = S.on2 ? S.f1 - S.f2 : 0;
        g.fillStyle = 'rgba(250,204,21,.55)'; g.beginPath();
        for (var p2 = 0; p2 <= Wx; p2++) { var t2 = p2 / Wx * win, e = S.on2 ? Math.sqrt(S.a1 * S.a1 + S.a2 * S.a2 + 2 * S.a1 * S.a2 * Math.cos(2 * Math.PI * dfr * (t2 + tShift))) / n2 : S.a1; if (p2 === 0) g.moveTo(Lx, gm - e * amp); else g.lineTo(Lx + p2, gm - e * amp); }
        for (p2 = Wx; p2 >= 0; p2--) { t2 = p2 / Wx * win; e = S.on2 ? Math.sqrt(S.a1 * S.a1 + S.a2 * S.a2 + 2 * S.a1 * S.a2 * Math.cos(2 * Math.PI * dfr * (t2 + tShift))) / n2 : S.a1; g.lineTo(Lx + p2, gm + e * amp); }
        g.closePath(); g.fill();
        g.fillStyle = '#fde68a'; g.textAlign = 'right'; g.fillText('too many cycles to draw — showing loudness envelope', Lx + Wx - 4, gy + gh - 16);
      }
      g.fillStyle = '#8b93bd'; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.fillText('0', Lx, H - 4); g.textAlign = 'right'; g.fillText(fmtMs(S.win), Lx + Wx, H - 4);
    }
    var tk = 0;
    K.loop(function (dt) {
      if (!K.rm) ph += dt * 0.6;
      draw();
      tk += dt; if (tk > 0.15) { tk = 0; var v = speed(); setRo('f', S.f1.toFixed(1) + ' Hz'); setRo('n', note(S.f1)); setRo('T', (1000 / S.f1).toFixed(2) + ' ms'); setRo('v', v.toFixed(1) + ' m/s'); setRo('l', (v / S.f1).toFixed(3) + ' m'); setRo('b', S.on2 ? Math.abs(S.f1 - S.f2).toFixed(1) + ' Hz' : '—'); setRo('r', S.on2 ? (S.f2 / S.f1).toFixed(3) : '—'); }
    });
    K.fb('👋 Press ▶ Play sound (volume starts low), then change the frequency.', '');
    return { destroy: K.destroy };
  }
});
})();

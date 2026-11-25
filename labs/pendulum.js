/* VidyaVerse University — Pendulum lab (labs/pendulum.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'pendulum';
var P = '.vv-' + ID;
var KIT_CSS = '%P{--ink:#eef1ff;--dim:#a9b3e0;--acc:#7c9cff;--acc2:#ffb86b;--good:#4ade80;--bad:#fb7185;--line:rgba(160,175,255,.2);' +
'font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Helvetica Neue",Arial,sans-serif;color:var(--ink);' +
'background:radial-gradient(120% 80% at 8% 0%,rgba(52,78,200,.55) 0%,transparent 55%),radial-gradient(90% 70% at 100% 100%,rgba(120,50,170,.5) 0%,transparent 60%),linear-gradient(160deg,#0a0f24,#0d1430);' +
'border-radius:20px;padding:clamp(10px,2.2vw,24px);box-sizing:border-box;width:100%;max-width:1680px;margin:0 auto;position:relative;overflow:hidden;' +
'font-size:clamp(14px,calc(.82rem + .3vw),19px);line-height:1.45;box-shadow:0 20px 60px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.07);-webkit-tap-highlight-color:transparent}' +
'%P *{box-sizing:border-box}' +
'%P.vvk-kids{font-size:clamp(16px,calc(.95rem + .35vw),21px)}' +
'%P .vvk-head{display:flex;gap:12px;align-items:center;margin-bottom:6px}' +
'%P .vvk-ic{font-size:1.9em;flex:0 0 auto;width:1.8em;height:1.8em;display:grid;place-items:center;border-radius:16px;background:linear-gradient(145deg,rgba(124,156,255,.4),rgba(255,184,107,.25));box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 8px 24px rgba(0,0,0,.3)}' +
'%P h2{margin:0;font-size:1.35em;letter-spacing:.2px;line-height:1.2}' +
'%P .vvk-goal{margin:3px 0 0;color:var(--dim)}' +
'%P .vvk-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0 12px}' +
'%P .vvk-tabs{display:inline-flex;background:rgba(255,255,255,.07);border-radius:999px;padding:4px;gap:4px}' +
'%P button{font:inherit;color:inherit;cursor:pointer;min-height:44px;min-width:44px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.07);padding:8px 14px;transition:transform .15s,background .2s,border-color .2s;touch-action:manipulation}' +
'%P button:hover{background:rgba(255,255,255,.14)}%P button:active{transform:scale(.96)}' +
'%P button:disabled{opacity:.45;cursor:default}' +
'%P button:focus-visible,%P input:focus-visible,%P canvas:focus-visible,%P summary:focus-visible{outline:3px solid var(--acc2);outline-offset:2px}' +
'%P .vvk-tabs button{border:0;border-radius:999px;background:transparent}' +
'%P .vvk-tabs button[aria-selected=true]{background:linear-gradient(135deg,#6d8bff,#a46bff);color:#fff;box-shadow:0 4px 18px rgba(124,156,255,.45)}' +
'%P .vvk-sp{flex:1 1 auto}' +
'%P .vvk-go{background:linear-gradient(135deg,#ffb36b,#ff6b9a);border:0;color:#24061a;font-weight:700;box-shadow:0 6px 20px rgba(255,120,140,.35)}' +
'%P .vvk-body{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start}' +
'%P .vvk-stage{flex:999 1 540px;min-width:0;display:flex;flex-direction:column;gap:10px}' +
'%P .vvk-side{flex:1 1 300px;min-width:0;display:flex;flex-direction:column;gap:12px}' +
'%P .vvk-card{background:rgba(255,255,255,.055);border:1px solid var(--line);border-radius:16px;padding:12px 14px}' +
'%P .vvk-card>h4{margin:0 0 6px;font-size:.8em;text-transform:uppercase;letter-spacing:.09em;color:var(--dim)}' +
'%P .vvk-cv{position:relative;border-radius:16px;overflow:hidden;background:#060a1a;border:1px solid var(--line);box-shadow:inset 0 0 60px rgba(0,0,0,.5)}' +
'%P canvas{display:block;width:100%;touch-action:none;outline:none}' +
'%P .vvk-row{margin:6px 0 2px}' +
'%P .vvk-lab{display:flex;justify-content:space-between;gap:8px;font-size:.92em;color:var(--dim)}' +
'%P .vvk-lab b{color:var(--ink);font-variant-numeric:tabular-nums}' +
'%P input[type=range]{width:100%;height:40px;accent-color:#8aa2ff;background:transparent;margin:0;cursor:pointer;touch-action:pan-y}' +
'%P .vvk-seg{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}' +
'%P .vvk-seg button{padding:6px 12px}' +
'%P .vvk-seg button[aria-pressed=true]{background:rgba(124,156,255,.32);border-color:#8aa2ff;box-shadow:0 0 0 1px #8aa2ff inset}' +
'%P .vvk-read{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px}' +
'%P .vvk-ro{background:rgba(0,0,0,.28);border-radius:12px;padding:7px 10px;border:1px solid rgba(255,255,255,.05)}' +
'%P .vvk-ro span{display:block;font-size:.76em;color:var(--dim)}' +
'%P .vvk-ro b{font-size:1.06em;font-variant-numeric:tabular-nums;word-break:break-word}' +
'%P .vvk-task h3{margin:0 0 4px;font-size:.8em;text-transform:uppercase;letter-spacing:.09em;color:var(--acc2)}' +
'%P .vvk-task p{margin:4px 0 8px}' +
'%P .vvk-dots{display:flex;gap:6px;margin-bottom:6px}' +
'%P .vvk-dots i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.16)}' +
'%P .vvk-dots i.on{background:var(--acc2);box-shadow:0 0 10px var(--acc2)}%P .vvk-dots i.ok{background:var(--good)}' +
'%P .vvk-status{min-height:1.4em;font-weight:600;margin-top:6px}' +
'%P .vvk-ok{color:var(--good)}%P .vvk-no{color:var(--bad)}' +
'%P .vvk-hint{color:#ffe2b8;background:rgba(255,184,107,.12);border-radius:10px;padding:6px 10px;margin:6px 0}' +
'%P .vvk-pass{animation:%K .9s ease}' +
'@keyframes %K{0%{box-shadow:0 0 0 0 rgba(74,222,128,.7)}100%{box-shadow:0 0 0 18px rgba(74,222,128,0)}}' +
'%P input[type=number],%P input[type=text]{font:inherit;color:var(--ink);background:rgba(0,0,0,.32);border:1px solid var(--line);border-radius:10px;min-height:44px;padding:6px 10px;width:100%;max-width:100%}' +
'%P .vvk-ask{display:flex;gap:8px;flex-wrap:wrap}%P .vvk-ask input{flex:1 1 120px;width:auto}' +
'%P .vvk-btns{display:flex;flex-wrap:wrap;gap:8px}' +
'%P details.vvk-note{margin-top:12px;background:rgba(0,0,0,.2);border-radius:14px;padding:4px 14px;border:1px solid var(--line)}' +
'%P details.vvk-note summary{min-height:44px;display:flex;align-items:center;cursor:pointer;font-weight:600}' +
'%P details.vvk-note p,%P details.vvk-note li{color:var(--dim)}' +
'%P .vvk-small{font-size:.85em;color:var(--dim)}' +
'%P .vvk-trophy{font-size:2.4em;text-align:center}' +
'@media (prefers-reduced-motion:reduce){%P *{animation:none!important;transition:none!important}}';
function vvCss(css) {
var sid = 'vv-css-' + ID;
if (document.getElementById(sid)) return;
var s = document.createElement('style');
s.id = sid;
s.textContent = css.split('%P').join(P).split('%K').join('vvk-' + ID + '-pulse');
(document.head || document.documentElement).appendChild(s);
}
function vvKit(el, api, o) {
api = api || {};
var U = { api: api, mode: 'guided' };
var offs = [], timers = [], rafs = { id: 0 }, dead = false, doneSent = false;
var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
U.rm = !!api.reducedMotion || !!(mq && mq.matches);
U.lp = !!api.lowPower;
U.dprCap = U.lp ? 1.5 : 2;
U.kids = api.mode === 'tiny' || api.mode === 'kids';
U.sound = function (n) { try { if (api.sound) api.sound(n); } catch (e) {} };
U.say = function (t) { try { if (api.say) api.say(t); } catch (e) {} };
U.award = function (x, r) { try { if (api.award) api.award(x, r); } catch (e) {} };
U.done = function (s) { if (doneSent) return; doneSent = true; try { if (api.done) api.done(s); } catch (e) {} };
U.on = function (t, ev, fn, op) { t.addEventListener(ev, fn, op); offs.push(function () { t.removeEventListener(ev, fn, op); }); };
U.later = function (fn, ms) { var id = setTimeout(function () { if (!dead) fn(); }, ms); timers.push(id); return id; };
U.every = function (fn, ms) { var id = setInterval(function () { if (!dead) fn(); }, ms); timers.push(id); return id; };
U.h = function (tag, a, kids) {
var n = document.createElement(tag);
a = a || {};
for (var k in a) {
if (!a.hasOwnProperty(k)) continue;
if (k === 'cls') n.className = a[k];
else if (k === 'text') n.textContent = a[k];
else if (k === 'html') n.innerHTML = a[k];
else if (k === 'click') U.on(n, 'click', a[k]);
else n.setAttribute(k, a[k]);
}
if (kids) for (var i = 0; i < kids.length; i++) if (kids[i]) n.appendChild(typeof kids[i] === 'string' ? document.createTextNode(kids[i]) : kids[i]);
return n;
};
U.f = function (x, d) { if (!isFinite(x)) return '—'; return Number(x).toFixed(d === undefined ? 2 : d); };
U.clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
U.loop = function (fn) {
var last = 0;
function fr(ts) {
if (dead) return;
rafs.id = requestAnimationFrame(fr);
var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
last = ts;
fn(dt, ts);
}
cancelAnimationFrame(rafs.id);
rafs.id = requestAnimationFrame(fr);
};
U.stopLoop = function () { cancelAnimationFrame(rafs.id); };
vvCss(KIT_CSS + (o.css || ''));
var root = U.h('div', { cls: 'vv-' + ID + (U.kids ? ' vvk-kids' : '') });
U.root = root;
var head = U.h('div', { cls: 'vvk-head' }, [
U.h('div', { cls: 'vvk-ic', 'aria-hidden': 'true', text: o.icon || '🔬' }),
U.h('div', {}, [U.h('h2', { text: o.title }), U.h('p', { cls: 'vvk-goal', text: o.goal })])
]);
var tg = U.h('button', { role: 'tab', 'aria-selected': 'true', text: '🎯 Guided' });
var tf = U.h('button', { role: 'tab', 'aria-selected': 'false', text: '🧪 Free play' });
var rs = U.h('button', { text: '↺ Reset', 'aria-label': 'Reset the lab' });
U.bar = U.h('div', { cls: 'vvk-bar' }, [U.h('div', { cls: 'vvk-tabs', role: 'tablist', 'aria-label': 'Mode' }, [tg, tf]), U.h('div', { cls: 'vvk-sp' }), rs]);
U.stage = U.h('div', { cls: 'vvk-stage' });
U.taskBox = U.h('section', { cls: 'vvk-card vvk-task', 'aria-live': 'polite' });
U.ctrl = U.h('section', { cls: 'vvk-card' }, [U.h('h4', { text: 'Controls' })]);
U.readBox = U.h('section', { cls: 'vvk-card' }, [U.h('h4', { text: 'Live readings' })]);
U.read = U.h('div', { cls: 'vvk-read' });
U.readBox.appendChild(U.read);
U.side = U.h('div', { cls: 'vvk-side' }, [U.taskBox, U.ctrl, U.readBox]);
var note = U.h('details', { cls: 'vvk-note' }, [U.h('summary', { text: 'ℹ️ How it works & what is simplified' }), U.h('div', { html: o.note || '' })]);
root.appendChild(head); root.appendChild(U.bar);
root.appendChild(U.h('div', { cls: 'vvk-body' }, [U.stage, U.side]));
root.appendChild(note);
el.appendChild(root);
function setMode(m) {
U.mode = m;
tg.setAttribute('aria-selected', m === 'guided' ? 'true' : 'false');
tf.setAttribute('aria-selected', m === 'free' ? 'true' : 'false');
U.sound('tap');
if (o.onMode) o.onMode(m);
if (U.G) U.G.render();
}
U.on(tg, 'click', function () { setMode('guided'); if (U.G) U.G.begin(); });
U.on(tf, 'click', function () { setMode('free'); });
U.on(rs, 'click', function () { U.sound('whoosh'); if (o.onReset) o.onReset(); if (U.G && U.mode === 'guided') U.G.begin(); });
U.setMode = setMode;
U.canvas = function (parent, co) {
co = co || {};
var wrap = U.h('div', { cls: 'vvk-cv' });
var cv = U.h('canvas', { tabindex: '0', role: 'img', 'aria-label': co.label || o.title });
if (co.scroll) cv.style.touchAction = 'pan-y pinch-zoom';
wrap.appendChild(cv); parent.appendChild(wrap);
var c = { cv: cv, wrap: wrap, ctx: cv.getContext('2d'), w: 0, h: 0, dpr: 1 };
function fit() {
var w = wrap.clientWidth || 320;
var vh = window.innerHeight || 700;
var h = Math.round(Math.max(co.min || 220, Math.min(w * (co.ratio || 0.62), vh * (co.maxVh || 0.72))));
var d = Math.min(window.devicePixelRatio || 1, U.dprCap);
if (w === c.w && h === c.h && d === c.dpr) return;
c.w = w; c.h = h; c.dpr = d;
cv.width = Math.round(w * d); cv.height = Math.round(h * d);
cv.style.height = h + 'px';
c.ctx.setTransform(d, 0, 0, d, 0, 0);
if (co.onResize) co.onResize(c);
if (co.draw) co.draw(c);
}
if (window.ResizeObserver) {
var ro = new ResizeObserver(function () { fit(); });
ro.observe(wrap);
offs.push(function () { ro.disconnect(); });
}
U.on(window, 'resize', fit);
c.fit = fit;
c.pos = function (e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * c.w / (r.width || 1), y: (e.clientY - r.top) * c.h / (r.height || 1) }; };
fit();
return c;
};
U.drag = function (c, hd) {
var act = false;
U.on(c.cv, 'pointerdown', function (e) {
var p = c.pos(e);
if (hd.down && hd.down(p, e) === false) return;
act = true;
try { c.cv.setPointerCapture(e.pointerId); } catch (er) {}
e.preventDefault();
});
U.on(c.cv, 'pointermove', function (e) { if (act) { hd.move && hd.move(c.pos(e), e); e.preventDefault(); } else if (hd.hover) hd.hover(c.pos(e), e); });
function up(e) { if (!act) return; act = false; if (hd.up) hd.up(c.pos(e), e); }
U.on(c.cv, 'pointerup', up); U.on(c.cv, 'pointercancel', up);
};
U.slider = function (parent, s) {
var out = U.h('b');
var inp = U.h('input', { type: 'range', min: s.min, max: s.max, step: s.step || 1, 'aria-label': s.label });
inp.value = s.value;
var row = U.h('div', { cls: 'vvk-row' }, [U.h('label', { cls: 'vvk-lab' }, [U.h('span', { text: s.label }), out]), inp]);
parent.appendChild(row);
function show() { var v = parseFloat(inp.value); out.textContent = s.fmt ? s.fmt(v) : (v + (s.unit ? ' ' + s.unit : '')); inp.setAttribute('aria-valuetext', out.textContent); }
U.on(inp, 'input', function () { show(); if (s.onInput) s.onInput(parseFloat(inp.value)); });
U.on(inp, 'change', function () { U.sound('tick'); });
show();
return { el: row, input: inp, get: function () { return parseFloat(inp.value); }, set: function (v) { inp.value = v; show(); } };
};
U.seg = function (parent, label, opts, val, onCh) {
var box = U.h('div', { cls: 'vvk-seg', role: 'group', 'aria-label': label });
var bs = [];
if (label) parent.appendChild(U.h('div', { cls: 'vvk-lab' }, [U.h('span', { text: label })]));
opts.forEach(function (op) {
var b = U.h('button', { 'aria-pressed': op[0] === val ? 'true' : 'false', text: op[1] });
U.on(b, 'click', function () { set(op[0]); U.sound('tap'); onCh(op[0]); });
bs.push([op[0], b]); box.appendChild(b);
});
function set(v) { val = v; bs.forEach(function (p) { p[1].setAttribute('aria-pressed', p[0] === v ? 'true' : 'false'); }); }
parent.appendChild(box);
return { el: box, set: set, get: function () { return val; } };
};
U.button = function (parent, text, fn, cls) { var b = U.h('button', { text: text, cls: cls || '' }); U.on(b, 'click', fn); parent.appendChild(b); return b; };
U.readouts = function (list) {
var m = {};
U.read.innerHTML = '';
list.forEach(function (it) { var b = U.h('b', { text: '—' }); m[it[0]] = b; U.read.appendChild(U.h('div', { cls: 'vvk-ro' }, [U.h('span', { text: it[1] }), b])); });
return function (k, v) { if (m[k] && m[k].textContent !== v) m[k].textContent = v; };
};
U.plot = function (ctx, X, Y, W, H, g) {
ctx.save();
ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(X, Y, W, H);
function sx(x) { return X + (x - g.xmin) / (g.xmax - g.xmin) * W; }
function sy(y) { return Y + H - (y - g.ymin) / (g.ymax - g.ymin) * H; }
ctx.strokeStyle = 'rgba(160,175,255,.13)'; ctx.lineWidth = 1;
ctx.fillStyle = 'rgba(200,210,255,.65)'; ctx.font = '11px system-ui,sans-serif';
var i, nx = g.nx || 5, ny = g.ny || 4;
for (i = 0; i <= nx; i++) { var xv = g.xmin + (g.xmax - g.xmin) * i / nx; var px = sx(xv); ctx.beginPath(); ctx.moveTo(px, Y); ctx.lineTo(px, Y + H); ctx.stroke(); if (i < nx) ctx.fillText(+xv.toFixed(2) + '', px + 2, Y + H - 3); }
for (i = 0; i <= ny; i++) { var yv = g.ymin + (g.ymax - g.ymin) * i / ny; var py = sy(yv); ctx.beginPath(); ctx.moveTo(X, py); ctx.lineTo(X + W, py); ctx.stroke(); if (i > 0) ctx.fillText(+yv.toFixed(2) + '', X + 3, py + 11); }
(g.lines || []).forEach(function (L) {
if (!L.pts || L.pts.length < 2) return;
ctx.strokeStyle = L.color || '#8aa2ff'; ctx.lineWidth = L.width || 2; ctx.setLineDash(L.dash || []);
ctx.beginPath();
for (var j = 0; j < L.pts.length; j++) { var q = L.pts[j]; var yy = sy(Math.max(g.ymin - (g.ymax - g.ymin), Math.min(g.ymax * 2 - g.ymin, q[1]))); if (j) ctx.lineTo(sx(q[0]), yy); else ctx.moveTo(sx(q[0]), yy); }
ctx.stroke(); ctx.setLineDash([]);
});
ctx.fillStyle = 'rgba(230,235,255,.9)'; ctx.font = '600 12px system-ui,sans-serif';
if (g.title) ctx.fillText(g.title, X + 6, Y + 15);
if (g.xlabel) { ctx.textAlign = 'right'; ctx.fillText(g.xlabel, X + W - 4, Y + H - 16); ctx.textAlign = 'left'; }
ctx.restore();
return { sx: sx, sy: sy };
};
U.guided = function (tasks) {
var i = 0, hinted = {}, busy = false, statusEl = null;
var G = {};
G.render = function () {
var box = U.taskBox; box.innerHTML = ''; box.classList.remove('vvk-pass');
if (U.mode !== 'guided') {
box.appendChild(U.h('h3', { text: 'Free play' }));
box.appendChild(U.h('p', { text: o.free || 'Change anything and watch what happens. Switch to Guided for tasks and XP.' }));
return;
}
var dots = U.h('div', { cls: 'vvk-dots', 'aria-hidden': 'true' });
for (var k = 0; k < tasks.length; k++) dots.appendChild(U.h('i', { cls: k < i ? 'ok' : k === i ? 'on' : '' }));
box.appendChild(dots);
if (i >= tasks.length) {
box.appendChild(U.h('div', { cls: 'vvk-trophy', text: '🏆' }));
box.appendChild(U.h('p', { text: 'All ' + tasks.length + ' tasks complete! Score: ' + G.score + '%. Try Free play to explore further.' }));
var bb = U.h('div', { cls: 'vvk-btns' });
U.button(bb, '↺ Start again', function () { G.restart(); });
U.button(bb, '🧪 Free play', function () { setMode('free'); });
box.appendChild(bb);
return;
}
var t = tasks[i];
box.appendChild(U.h('h3', { text: 'Task ' + (i + 1) + ' of ' + tasks.length + (t.title ? ' · ' + t.title : '') }));
box.appendChild(U.h('p', { text: t.t }));
if (t.ask) {
var inp = U.h('input', { type: t.ask.type || 'number', step: 'any', placeholder: t.ask.ph || 'Your answer', 'aria-label': t.ask.ph || 'Your answer', inputmode: t.ask.type === 'text' ? 'text' : 'decimal' });
var cb = U.h('button', { cls: 'vvk-go', text: 'Check' });
var chk = function () {
if (busy) return;
if (t.answer(inp.value)) G.pass();
else { U.sound('bad'); statusEl.className = 'vvk-status vvk-no'; statusEl.textContent = t.wrong || 'Not quite — check your working and try again.'; }
};
U.on(cb, 'click', chk);
U.on(inp, 'keydown', function (e) { if (e.key === 'Enter') chk(); });
box.appendChild(U.h('div', { cls: 'vvk-ask' }, [inp, t.ask.unit ? U.h('span', { cls: 'vvk-small', text: t.ask.unit }) : null, cb]));
}
var hb = U.h('div', { cls: 'vvk-btns' });
var hintEl = U.h('div', { cls: 'vvk-hint', text: '💡 ' + (t.hint || '') });
if (!hinted[i]) hintEl.style.display = 'none';
if (t.hint) U.button(hb, '💡 Hint', function () { hinted[i] = 1; hintEl.style.display = ''; U.sound('pop'); U.say(t.hint); });
box.appendChild(hintEl);
box.appendChild(hb);
statusEl = U.h('div', { cls: 'vvk-status' });
box.appendChild(statusEl);
};
G.pass = function () {
if (busy || i >= tasks.length) return;
busy = true;
var t = tasks[i];
U.sound('good');
U.say(t.ok || 'Well done!');
U.award(t.xp || 10, o.title + ': ' + (t.title || 'task ' + (i + 1)));
if (statusEl) { statusEl.className = 'vvk-status vvk-ok'; statusEl.textContent = '✅ ' + (t.ok || 'Well done!'); }
U.taskBox.classList.add('vvk-pass');
U.later(function () {
busy = false; i++;
if (i >= tasks.length) {
var h = 0; for (var k in hinted) if (hinted.hasOwnProperty(k)) h++;
G.score = Math.max(50, Math.round(100 - 10 * h));
U.sound('win'); U.say('Lab complete! Brilliant work.');
U.done(G.score);
}
G.begin();
}, U.rm ? 700 : 1500);
};
G.begin = function () {
G.render();
if (U.mode === 'guided' && i < tasks.length) { if (tasks[i].setup) tasks[i].setup(); if (U.kids) U.say(tasks[i].t); }
};
G.restart = function () { i = 0; hinted = {}; doneSent = false; setMode('guided'); G.begin(); };
G.cur = function () { return U.mode === 'guided' ? i : -1; };
U.check = function () { if (U.mode !== 'guided' || busy || i >= tasks.length) return; var t = tasks[i]; if (!t.ask && t.check && t.check()) G.pass(); };
U.G = G;
return G;
};
U.check = function () {};
U.destroy = function () {
dead = true;
cancelAnimationFrame(rafs.id);
timers.forEach(function (t) { clearTimeout(t); clearInterval(t); });
offs.forEach(function (f) { try { f(); } catch (e) {} });
offs = []; timers = [];
if (o.onDestroy) try { o.onDestroy(); } catch (e) {}
if (root.parentNode) root.parentNode.removeChild(root);
};
return U;
}
var META = { id: ID, title: 'Pendulum lab', icon: '⏱️', faculty: 'school', bands: ['middle', 'secondary', 'senior'],
summary: 'Swing a real (non-linear) pendulum: change length, gravity, amplitude, mass and damping, and watch the period, energy and θ–t graph live.' };
var D = Math.PI / 180;
var PL = [['earth', '🌍 Earth', 9.81], ['moon', '🌙 Moon', 1.62], ['mars', '🔴 Mars', 3.71], ['jup', '🪐 Jupiter', 24.79]];
function agm(a, b) { for (var i = 0; i < 30; i++) { var a2 = (a + b) / 2, b2 = Math.sqrt(a * b); a = a2; b = b2; if (Math.abs(a - b) < 1e-15) break; } return a; }
function mount(el, api) {
var S = {}, C1, C2, sL, sA, sM, sB, segP, runB, frame = 0, set;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Discover what sets the period of a pendulum — and what does not.',
free: 'Drag the bob to any angle and let go. Try other planets, huge swings and damping. Arrow keys on the picture nudge the angle; Space pauses.',
note: '<p>The bob obeys the full equation <b>θ″ = −(g/L)·sin θ − b·θ′</b>, solved with a 4th-order Runge–Kutta method, so big swings really are slower.</p>' +
'<p><b>Small-angle period:</b> T₀ = 2π√(L/g). <b>Exact period</b> (any amplitude, no damping): T = 2π√(L/g) ÷ AGM(1, cos(θ₀/2)).</p>' +
'<p><b>Energy:</b> KE = ½mv², PE = mgL(1 − cos θ), with v = Lω.</p>' +
'<p><b>Simplified:</b> point-mass bob, massless rigid string, a frictionless pivot, and air resistance modelled as simple linear damping b. Real clocks also correct for temperature changing L.</p>',
onReset: function () { reset(); }
});
function T0() { return 2 * Math.PI * Math.sqrt(S.L / S.g); }
function Tex() { return T0() / agm(1, Math.cos(S.a0 / 2)); }
function reset() {
S.L = 1.0; S.g = 9.81; S.pl = 'earth'; S.a0 = 20 * D; S.th = S.a0; S.w = 0; S.m = 1; S.b = 0;
S.run = true; S.t = 0; S.hist = []; S.cross = []; S.Tm = NaN; S.peak = S.a0; S.trail = []; S.drag = false;
if (sL) { sL.set(S.L); sA.set(20); sM.set(1); sB.set(0); segP.set('earth'); runB.textContent = '⏸ Pause'; }
}
function release(a) { S.a0 = Math.abs(a); S.th = a; S.w = 0; S.t = 0; S.hist = []; S.cross = []; S.Tm = NaN; S.peak = S.a0; S.trail = []; }
function acc(th, w) { return -(S.g / S.L) * Math.sin(th) - S.b * w; }
function step(h) {
var th = S.th, w = S.w;
var k1t = w, k1w = acc(th, w);
var k2t = w + h / 2 * k1w, k2w = acc(th + h / 2 * k1t, w + h / 2 * k1w);
var k3t = w + h / 2 * k2w, k3w = acc(th + h / 2 * k2t, w + h / 2 * k2w);
var k4t = w + h * k3w, k4w = acc(th + h * k3t, w + h * k3w);
var nt = th + h / 6 * (k1t + 2 * k2t + 2 * k3t + k4t), nw = w + h / 6 * (k1w + 2 * k2w + 2 * k3w + k4w);
if (th < 0 && nt >= 0) {
S.cross.push(S.t + h * (-th) / (nt - th));
if (S.cross.length > 3) S.cross.shift();
if (S.cross.length >= 2) S.Tm = S.cross[S.cross.length - 1] - S.cross[S.cross.length - 2];
}
if ((w > 0 && nw <= 0) || (w < 0 && nw >= 0)) S.peak = Math.abs(nt);
S.th = nt; S.w = nw; S.t += h;
}
// ---- stage
C1 = U.canvas(U.stage, { ratio: 0.62, min: 280, label: 'Pendulum. Drag the bob to set the starting angle.' });
C2 = U.canvas(U.stage, { ratio: 0.26, min: 140, maxVh: 0.3, label: 'Graph of angle against time' });
function geom() {
var w = C1.w, h = C1.h;
var sc = Math.min((h - 70) / 2.05, (w / 2 - 34) / 2.0);
return { px: w / 2, py: 34, sc: sc };
}
U.drag(C1, {
down: function (p) {
var g = geom(), Lp = S.L * g.sc;
var bx = g.px + Lp * Math.sin(S.th), by = g.py + Lp * Math.cos(S.th);
if (Math.hypot(p.x - bx, p.y - by) > 46) return false;
S.drag = true; U.sound('tap');
},
move: function (p) {
var g = geom();
var a = Math.atan2(p.x - g.px, Math.max(1, p.y - g.py));
a = U.clamp(a, -80 * D, 80 * D);
S.th = a; S.w = 0; sA.set(Math.round(Math.abs(a) / D));
},
up: function () { S.drag = false; release(S.th); U.sound('whoosh'); U.check(); }
});
U.on(C1.cv, 'keydown', function (e) {
if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
var a = U.clamp(S.th + (e.key === 'ArrowLeft' ? -2 : 2) * D, -80 * D, 80 * D);
release(a); sA.set(Math.round(Math.abs(a) / D)); e.preventDefault();
} else if (e.key === ' ') { toggleRun(); e.preventDefault(); }
});
// ---- controls
segP = U.seg(U.ctrl, 'Where is the pendulum?', PL.map(function (p) { return [p[0], p[1]]; }), 'earth', function (v) {
PL.forEach(function (p) { if (p[0] === v) S.g = p[2]; }); S.pl = v; release(S.a0); U.check();
});
sL = U.slider(U.ctrl, { label: 'Length L', min: 0.1, max: 2, step: 0.005, value: 1, fmt: function (v) { return v.toFixed(3) + ' m'; },
onInput: function (v) { S.L = v; release(S.a0); U.check(); } });
sA = U.slider(U.ctrl, { label: 'Start angle θ₀', min: 1, max: 80, step: 1, value: 20, unit: '°',
onInput: function (v) { release(v * D * (S.th < 0 ? -1 : 1)); U.check(); } });
sM = U.slider(U.ctrl, { label: 'Bob mass m', min: 0.1, max: 5, step: 0.1, value: 1, fmt: function (v) { return v.toFixed(1) + ' kg'; },
onInput: function (v) { S.m = v; U.check(); } });
sB = U.slider(U.ctrl, { label: 'Damping b (air drag)', min: 0, max: 0.5, step: 0.01, value: 0, fmt: function (v) { return v.toFixed(2) + ' s⁻¹'; },
onInput: function (v) { S.b = v; U.check(); } });
var bb = U.h('div', { cls: 'vvk-btns' });
U.ctrl.appendChild(bb);
function toggleRun() { S.run = !S.run; runB.textContent = S.run ? '⏸ Pause' : '▶ Play'; U.sound('tap'); }
runB = U.button(bb, '⏸ Pause', toggleRun);
U.button(bb, '🔁 Release again', function () { release(S.a0); U.sound('whoosh'); });
set = U.readouts([['t0', 'Small-angle T₀'], ['tx', 'Exact period T'], ['tm', 'Measured period'], ['f', 'Frequency'],
['th', 'Angle θ'], ['v', 'Bob speed'], ['ke', 'Kinetic energy'], ['pe', 'Potential energy']]);
// ---- guided tasks
U.guided([
{ title: 'Seconds pendulum', xp: 15, t: 'On Earth, set the length so the exact period is 2.00 s (±0.02 s). Each one-way swing then takes 1 second — the classic clock pendulum.',
hint: 'Rearrange T = 2π√(L/g):  L = gT²/4π² = 9.81 × 4 / 39.48 ≈ 0.99 m. Keep the angle small (≤ 10°).',
ok: 'L ≈ 0.99 m gives T = 2 s. That is why grandfather clocks are about a metre long.',
check: function () { return S.pl === 'earth' && Math.abs(Tex() - 2) <= 0.02; } },
{ title: 'Predict', xp: 10, t: 'Predict: if you make the pendulum 4 times longer, how many times longer is the period? (Then test it with the slider!)',
ask: { ph: 'e.g. 3' }, hint: 'T is proportional to √L, and √4 = …', ok: 'Yes — 4× the length gives √4 = 2× the period.',
answer: function (v) { return Math.abs(parseFloat(v) - 2) < 0.01; }, wrong: 'Not quite. Look at the formula: L sits under a square root.' },
{ title: 'Moon clock', xp: 15, t: 'Take the pendulum to the Moon (g = 1.62 m/s²) and adjust the length so the period is 2.00 s again (±0.03 s).',
hint: 'L = gT²/4π² = 1.62 × 4 / 39.48 ≈ 0.164 m — about one sixth of the Earth length.',
ok: 'On the Moon a 2-second pendulum is only ~16 cm long, because weaker gravity pulls it back more gently.',
check: function () { return S.pl === 'moon' && Math.abs(Tex() - 2) <= 0.03; } },
{ title: 'Big swings', xp: 15, t: 'The formula T₀ = 2π√(L/g) is only exact for small angles. Find a start angle where the exact period is at least 5% longer than T₀.',
hint: 'Increase θ₀ steadily and watch “Exact period” pull away from “Small-angle T₀”. Somewhere above 50° it passes 5%.',
ok: 'Correct: sin θ < θ for big angles, so the restoring pull is weaker and each swing takes longer.',
check: function () { return Tex() / T0() >= 1.05; } },
{ title: 'Damping', xp: 15, t: 'Set damping to at least 0.10 s⁻¹, press “Release again” and wait until the swing has shrunk to less than half its starting angle.',
hint: 'Damping removes energy every swing; the amplitude decays roughly like e^(−bt/2). With b = 0.2 s⁻¹ it halves in about 7 s.',
ok: 'Energy leaks away to the air, so amplitude decays — but notice the period barely changed!',
check: function () { return S.b >= 0.1 && S.run && S.t > 1 && S.peak < 0.5 * S.a0; } }
]);
// ---- drawing
function draw1() {
var c = C1, x = c.ctx, w = c.w, h = c.h, g = geom();
var bg = x.createLinearGradient(0, 0, 0, h);
bg.addColorStop(0, '#13205a'); bg.addColorStop(1, '#050816');
x.fillStyle = bg; x.fillRect(0, 0, w, h);
var Lp = S.L * g.sc, deg, R = 2 * g.sc;
x.strokeStyle = 'rgba(160,175,255,.16)'; x.lineWidth = 1;
x.beginPath(); x.arc(g.px, g.py, R, Math.PI / 2 - 80 * D, Math.PI / 2 + 80 * D); x.stroke();
x.fillStyle = 'rgba(190,200,255,.45)'; x.font = '10px system-ui,sans-serif'; x.textAlign = 'center';
for (deg = -80; deg <= 80; deg += 10) {
var s = Math.sin(deg * D), co = Math.cos(deg * D);
x.beginPath(); x.moveTo(g.px + s * (R - 6), g.py + co * (R - 6)); x.lineTo(g.px + s * R, g.py + co * R); x.stroke();
if (deg % 20 === 0) x.fillText(Math.abs(deg) + '°', g.px + s * (R + 12), g.py + co * (R + 12) + 3);
}
x.textAlign = 'left';
var cg = x.createLinearGradient(0, g.py - 16, 0, g.py);
cg.addColorStop(0, '#5b6bb8'); cg.addColorStop(1, '#2a3570');
x.fillStyle = cg; x.fillRect(g.px - 80, g.py - 16, 160, 12);
var bx = g.px + Lp * Math.sin(S.th), by = g.py + Lp * Math.cos(S.th);
if (!U.rm && S.run && !S.drag) {
S.trail.push([bx, by]); if (S.trail.length > (U.lp ? 20 : 46)) S.trail.shift();
for (var i = 1; i < S.trail.length; i++) {
x.strokeStyle = 'rgba(255,184,107,' + (i / S.trail.length * 0.55) + ')'; x.lineWidth = 3 * i / S.trail.length + 1;
x.beginPath(); x.moveTo(S.trail[i - 1][0], S.trail[i - 1][1]); x.lineTo(S.trail[i][0], S.trail[i][1]); x.stroke();
}
}
x.setLineDash([4, 5]); x.strokeStyle = 'rgba(255,255,255,.25)';
x.beginPath(); x.moveTo(g.px, g.py); x.lineTo(g.px, g.py + Lp + 20); x.stroke(); x.setLineDash([]);
x.strokeStyle = '#d7dcff'; x.lineWidth = 2;
x.beginPath(); x.moveTo(g.px, g.py); x.lineTo(bx, by); x.stroke();
x.strokeStyle = '#ffb86b'; x.lineWidth = 2;
x.beginPath(); x.arc(g.px, g.py, Math.min(40, Lp * 0.5), Math.PI / 2, Math.PI / 2 - S.th, S.th > 0); x.stroke();
x.fillStyle = '#ffd7a8'; x.font = '600 13px system-ui,sans-serif';
x.fillText('θ = ' + (S.th / D).toFixed(1) + '°', g.px + 10, g.py + 22);
var r = 9 + 6 * Math.cbrt(S.m);
var rg = x.createRadialGradient(bx - r / 3, by - r / 3, r / 6, bx, by, r);
rg.addColorStop(0, '#fff3d6'); rg.addColorStop(0.35, '#ffb86b'); rg.addColorStop(1, '#a0461f');
x.shadowColor = 'rgba(255,170,90,.6)'; x.shadowBlur = U.lp ? 0 : 18;
x.fillStyle = rg; x.beginPath(); x.arc(bx, by, r, 0, 2 * Math.PI); x.fill(); x.shadowBlur = 0;
if (S.drag) { x.strokeStyle = '#fff'; x.lineWidth = 2; x.beginPath(); x.arc(bx, by, r + 6, 0, 2 * Math.PI); x.stroke(); }
// ruler
x.fillStyle = 'rgba(220,225,255,.8)'; x.fillRect(14, h - 20, 0.5 * g.sc, 3);
x.font = '11px system-ui,sans-serif'; x.fillText('0.5 m', 14, h - 26);
// energy bars
var v = S.L * S.w, ke = 0.5 * S.m * v * v, pe = S.m * S.g * S.L * (1 - Math.cos(S.th)), tot = ke + pe || 1;
var bh = Math.min(120, h * 0.4), X0 = w - 64, Y0 = h - 24;
[['KE', ke, '#4ade80'], ['PE', pe, '#7c9cff']].forEach(function (q, k) {
x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(X0 + k * 26, Y0 - bh, 18, bh);
x.fillStyle = q[2]; var hh = bh * q[1] / tot; x.fillRect(X0 + k * 26, Y0 - hh, 18, hh);
x.fillStyle = '#c8d0ff'; x.fillText(q[0], X0 + k * 26, Y0 + 14);
});
x.fillText(PL.filter(function (p) { return p[0] === S.pl; })[0][1] + '  g = ' + S.g + ' m/s²', 14, 20);
}
function draw2() {
var c = C2, x = c.ctx, w = c.w, h = c.h;
x.clearRect(0, 0, w, h); x.fillStyle = '#070b1d'; x.fillRect(0, 0, w, h);
var A = Math.max(10, S.a0 / D * 1.15);
var t1 = Math.max(10, S.t);
U.plot(x, 6, 6, w - 12, h - 12, { xmin: t1 - 10, xmax: t1, ymin: -A, ymax: A, nx: 5, ny: 4, title: 'θ (°) against time (s)', xlabel: 't / s',
lines: [{ pts: [[t1 - 10, S.peak / D], [t1, S.peak / D]], color: 'rgba(255,184,107,.4)', width: 1, dash: [4, 4] },
{ pts: [[t1 - 10, -S.peak / D], [t1, -S.peak / D]], color: 'rgba(255,184,107,.4)', width: 1, dash: [4, 4] },
{ pts: S.hist, color: '#8aa2ff', width: 2.2 }] });
}
function readouts() {
var v = S.L * S.w;
set('t0', U.f(T0(), 3) + ' s'); set('tx', U.f(Tex(), 3) + ' s');
set('tm', isFinite(S.Tm) ? U.f(S.Tm, 3) + ' s' : 'wait…'); set('f', U.f(1 / Tex(), 3) + ' Hz');
set('th', U.f(S.th / D, 1) + '°'); set('v', U.f(Math.abs(v), 2) + ' m/s');
set('ke', U.f(0.5 * S.m * v * v, 3) + ' J'); set('pe', U.f(S.m * S.g * S.L * (1 - Math.cos(S.th)), 3) + ' J');
}
reset();
U.G.begin();
U.loop(function (dt) {
if (S.run && !S.drag && dt > 0) {
var n = Math.max(1, Math.ceil(dt / 0.002)), hstep = dt / n;
for (var i = 0; i < n; i++) step(hstep);
S.hist.push([S.t, S.th / D]);
while (S.hist.length && S.hist[0][0] < S.t - 10.5) S.hist.shift();
}
frame++;
if (U.lp && frame % 2) return;
draw1(); draw2();
if (frame % 6 === 0) { readouts(); U.check(); }
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'pendulum', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

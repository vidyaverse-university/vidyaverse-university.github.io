/* VidyaVerse University — Graph plotter (labs/graph-plotter.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'graph-plotter';
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
var META = { id: ID, title: 'Graph plotter', icon: '📈', faculty: 'school', bands: ['middle', 'secondary', 'senior', 'ug'],
summary: 'Type up to three functions, slide parameters a, b, c, pan and zoom, trace values and roots — and match target curves to master transformations.' };
var FN = { sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, sqrt: Math.sqrt, abs: Math.abs,
ln: Math.log, log: function (v) { return Math.log(v) / Math.LN10; }, exp: Math.exp, floor: Math.floor, round: Math.round, sign: function (v) { return v > 0 ? 1 : v < 0 ? -1 : 0; } };
function tokenize(s) {
var t = [], i = 0, c;
[[' ', ''], ['\t', ''], ['\n', ''], ['×', '*'], ['÷', '/'], ['−', '-'], ['²', '^2'], ['³', '^3'], ['π', 'pi']].forEach(function (r) { s = s.split(r[0]).join(r[1]); });
s = s.toLowerCase();
while (i < s.length) {
c = s.charAt(i);
if ((c >= '0' && c <= '9') || c === '.') { var j = i; while (j < s.length && ((s.charAt(j) >= '0' && s.charAt(j) <= '9') || s.charAt(j) === '.')) j++; t.push(['n', parseFloat(s.slice(i, j))]); i = j; }
else if (c >= 'a' && c <= 'z') {
var k = i; while (k < s.length && s.charAt(k) >= 'a' && s.charAt(k) <= 'z') k++;
var w = s.slice(i, k);
while (w.length) {
var m = null, names = Object.keys(FN).concat(['pi']);
for (var q = 0; q < names.length; q++) if (w.indexOf(names[q]) === 0 && (!m || names[q].length > m.length)) m = names[q];
if (m) { t.push([m === 'pi' ? 'n' : 'f', m === 'pi' ? Math.PI : m]); w = w.slice(m.length); }
else { var ch = w.charAt(0); if ('xabce'.indexOf(ch) < 0) throw new Error('Unknown name “' + ch + '”'); t.push(ch === 'e' ? ['n', Math.E] : ['v', ch]); w = w.slice(1); }
}
i = k;
} else if ('+-*/^()|'.indexOf(c) >= 0) { t.push(['o', c]); i++; }
else throw new Error('Unexpected “' + c + '”');
}
return t;
}
function compile(src) {
var t = tokenize(src), p = 0;
function peek() { return t[p]; }
function isO(c) { return t[p] && t[p][0] === 'o' && t[p][1] === c; }
function expr() { var a = term(); while (isO('+') || isO('-')) { var op = t[p++][1], b = term(); a = op === '+' ? add(a, b) : sub(a, b); } return a; }
function add(a, b) { return function (V) { return a(V) + b(V); }; }
function sub(a, b) { return function (V) { return a(V) - b(V); }; }
function term() {
var a = unary();
for (;;) {
if (isO('*') || isO('/')) { var op = t[p++][1], b = unary(); a = op === '*' ? mul(a, b) : dvd(a, b); }
else if (peek() && (peek()[0] !== 'o' || isO('('))) { a = mul(a, power()); }
else return a;
}
}
function mul(a, b) { return function (V) { return a(V) * b(V); }; }
function dvd(a, b) { return function (V) { return a(V) / b(V); }; }
function unary() { if (isO('-')) { p++; var a = unary(); return function (V) { return -a(V); }; } if (isO('+')) { p++; return unary(); } return power(); }
function power() { var a = atom(); if (isO('^')) { p++; var b = unary(); return function (V) { return Math.pow(a(V), b(V)); }; } return a; }
function atom() {
var k = t[p++];
if (!k) throw new Error('Expression ends too early');
if (k[0] === 'n') { var v = k[1]; return function () { return v; }; }
if (k[0] === 'v') { var nm = k[1]; return function (V) { return V[nm]; }; }
if (k[0] === 'f') { var f = FN[k[1]], a; if (isO('(')) { p++; a = expr(); if (!isO(')')) throw new Error('Missing )'); p++; } else a = power(); return function (V) { return f(a(V)); }; }
if (k[1] === '(') { var e = expr(); if (!isO(')')) throw new Error('Missing )'); p++; return e; }
if (k[1] === '|') { var e2 = expr(); if (!isO('|')) throw new Error('Missing |'); p++; return function (V) { return Math.abs(e2(V)); }; }
throw new Error('Unexpected “' + k[1] + '”');
}
var r = expr();
if (p < t.length) throw new Error('Unexpected “' + t[p][1] + '”');
return r;
}
var COLS = ['#7c9cff', '#ff7aa8', '#4ade80'];
function mount(el, api) {
var S = {}, C, inputs = [], errs = [], sl = {}, set, ptrs = {}, target = null, targetLabel = '';
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'See how changing an equation transforms its graph.',
free: 'Type functions of x — e.g. x^2 − 3, 2sin(x), a*x^2 + b*x + c, sqrt(x), |x|, ln(x). Drag to pan, pinch or scroll to zoom, tap to trace. Keyboard: arrows pan, + and − zoom.',
css: '%P .vvg-f{display:flex;gap:6px;align-items:center;margin:6px 0}%P .vvg-f i{width:14px;height:14px;border-radius:4px;flex:0 0 auto}%P .vvg-f label{white-space:nowrap;font-weight:600}%P .vvg-e{color:#fb7185;font-size:.8em;min-height:1em}',
note: '<p>Your text is parsed safely by the lab itself (nothing is executed as code). Supported: + − × ÷ ^, brackets, |x|, implicit multiplication (2x, 3(x+1)), sin cos tan asin acos atan (radians), sqrt, abs, ln, log (base 10), exp, floor, round, sign, π (pi) and e, plus the parameters a, b, c.</p>' +
'<p><b>Transformations:</b> f(x) + k moves up by k; f(x − h) moves right by h; k·f(x) stretches vertically; f(kx) squashes horizontally by k; −f(x) reflects in the x-axis.</p>' +
'<p><b>Simplified:</b> the curve is sampled once per pixel, so very fast oscillations may look jagged; roots are found where the sign changes between samples.</p>',
onReset: function () { reset(); }
});
function reset() {
S.v = { x0: -10, x1: 10, yc: 0 }; S.tr = null; S.a = 1; S.b = 0; S.c = 0; S.f = [null, null, null];
['x^2', '', ''].forEach(function (s, i) { if (inputs[i]) { inputs[i].value = s; parse(i); } });
['a', 'b', 'c'].forEach(function (k) { if (sl[k]) sl[k].set(k === 'a' ? 1 : 0); });
}
function parse(i) {
var s = inputs[i].value.trim();
errs[i].textContent = '';
if (!s) { S.f[i] = null; return; }
try { S.f[i] = compile(s); S.f[i]({ x: 1, a: 1, b: 1, c: 1 }); } catch (e) { S.f[i] = null; errs[i].textContent = '⚠ ' + e.message; }
}
function ev(i, x) { var f = S.f[i]; if (!f) return NaN; return f({ x: x, a: S.a, b: S.b, c: S.c }); }
function vw() { var sx = C.w / (S.v.x1 - S.v.x0), yr = C.h / sx; return { sx: sx, y0: S.v.yc - yr / 2, y1: S.v.yc + yr / 2 }; }
function X(x) { return (x - S.v.x0) * vw().sx; }
function Y(y) { var V = vw(); return C.h - (y - V.y0) * V.sx; }
function zoom(f, cx, cy) {
var V = vw(), wx = S.v.x0 + cx / V.sx, wy = V.y0 + (C.h - cy) / V.sx;
var nw = U.clamp((S.v.x1 - S.v.x0) * f, 0.05, 2000);
var rx = cx / C.w; S.v.x0 = wx - nw * rx; S.v.x1 = S.v.x0 + nw;
var nyr = C.h / (C.w / nw); S.v.yc = wy - nyr * ((C.h - cy) / C.h) + nyr / 2;
}
C = U.canvas(U.stage, { ratio: 0.66, min: 280, label: 'Graph. Drag to pan, pinch or scroll to zoom, tap to trace.' });
var moved = false, pinch = 0;
U.on(C.cv, 'pointerdown', function (e) { ptrs[e.pointerId] = C.pos(e); moved = false; try { C.cv.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
U.on(C.cv, 'pointermove', function (e) {
var p = C.pos(e), ids = Object.keys(ptrs);
if (!ptrs[e.pointerId]) { if (e.pointerType === 'mouse') S.tr = p.x; return; }
if (ids.length === 2) {
var o = ptrs[ids[0] == e.pointerId ? ids[1] : ids[0]], d = Math.hypot(p.x - o.x, p.y - o.y);
if (pinch) zoom(pinch / d, (p.x + o.x) / 2, (p.y + o.y) / 2);
pinch = d; moved = true;
} else {
var q = ptrs[e.pointerId], dx = p.x - q.x, dy = p.y - q.y;
if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
var sx = vw().sx; S.v.x0 -= dx / sx; S.v.x1 -= dx / sx; S.v.yc += dy / sx;
}
ptrs[e.pointerId] = p;
});
function up(e) { if (ptrs[e.pointerId] && !moved) { S.tr = C.pos(e).x; U.sound('tick'); } delete ptrs[e.pointerId]; pinch = 0; }
U.on(C.cv, 'pointerup', up); U.on(C.cv, 'pointercancel', up);
U.on(C.cv, 'wheel', function (e) { var p = C.pos(e); zoom(e.deltaY > 0 ? 1.12 : 1 / 1.12, p.x, p.y); e.preventDefault(); }, { passive: false });
U.on(C.cv, 'keydown', function (e) {
var k = e.key, wdt = S.v.x1 - S.v.x0;
if (k === 'ArrowLeft') { S.v.x0 -= wdt / 20; S.v.x1 -= wdt / 20; } else if (k === 'ArrowRight') { S.v.x0 += wdt / 20; S.v.x1 += wdt / 20; }
else if (k === 'ArrowUp') S.v.yc += wdt / 20; else if (k === 'ArrowDown') S.v.yc -= wdt / 20;
else if (k === '+' || k === '=') zoom(1 / 1.25, C.w / 2, C.h / 2); else if (k === '-') zoom(1.25, C.w / 2, C.h / 2); else return;
e.preventDefault();
});
[0, 1, 2].forEach(function (i) {
var inp = U.h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Function ' + (i + 1), placeholder: ['e.g. x^2', 'e.g. 2sin(x)', 'e.g. a*x + b'][i] });
var er = U.h('div', { cls: 'vvg-e', 'aria-live': 'polite' });
inputs.push(inp); errs.push(er);
var sw = U.h('i'); sw.style.background = COLS[i];
U.ctrl.appendChild(U.h('div', { cls: 'vvg-f' }, [sw, U.h('label', { text: 'y' + '₁₂₃'.charAt(i) + ' =' }), inp]));
U.ctrl.appendChild(er);
U.on(inp, 'input', function () { parse(i); U.check(); });
});
['a', 'b', 'c'].forEach(function (k) { sl[k] = U.slider(U.ctrl, { label: 'Parameter ' + k, min: -5, max: 5, step: 0.1, value: k === 'a' ? 1 : 0, fmt: function (v) { return v.toFixed(1); }, onInput: function (v) { S[k] = v; U.check(); } }); });
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
U.button(bb, '➕ Zoom in', function () { zoom(1 / 1.25, C.w / 2, C.h / 2); });
U.button(bb, '➖ Zoom out', function () { zoom(1.25, C.w / 2, C.h / 2); });
U.button(bb, '🏠 Home view', function () { S.v = { x0: -10, x1: 10, yc: 0 }; });
set = U.readouts([['tx', 'Trace x'], ['ty', 'y₁ at trace'], ['y0', 'y₁ at x = 0'], ['rt', 'Roots of y₁ in view']]);
function matches() {
if (!target || !S.f[0]) return false;
for (var k = 0; k <= 24; k++) { var x = -5 + k * 10 / 24 + 0.013, t = target(x), y = ev(0, x); if (!isFinite(t)) continue; if (!isFinite(y) || Math.abs(y - t) > 0.05 + 0.01 * Math.abs(t)) return false; }
return true;
}
function tgt(fn, label, start) { return function () { target = fn; targetLabel = label; inputs[0].value = start; parse(0); S.v = { x0: -10, x1: 10, yc: 0 }; }; }
U.guided([
{ title: 'Straight line', xp: 10, setup: tgt(function (x) { return 2 * x + 1; }, 'target', 'x'), t: 'Edit y₁ so your line lies exactly on the dashed target line.',
hint: 'A line is y = mx + c: m is the slope (rise ÷ run) and c is where it crosses the y-axis. The target rises 2 for every 1 across and crosses at 1.',
ok: 'y = 2x + 1: slope 2, y-intercept 1.', check: matches },
{ title: 'Shift a parabola', xp: 15, setup: tgt(function (x) { return (x - 2) * (x - 2) - 1; }, 'target', 'x^2'), t: 'Start from y = x² and move it to match the dashed parabola.',
hint: 'The target’s vertex is at (2, −1). y = (x − h)² + k has its vertex at (h, k).',
ok: 'y = (x − 2)² − 1. Note that “− 2” inside the bracket moves the graph RIGHT.', check: matches },
{ title: 'Stretch a wave', xp: 15, setup: tgt(function (x) { return 2 * Math.sin(x); }, 'target', 'sin(x)'), t: 'Match the dashed wave, starting from y = sin(x).',
hint: 'The target goes up to 2 and down to −2 with the same period. Multiply the whole function.',
ok: 'y = 2 sin(x): the amplitude doubled, the period (2π) stayed the same.', check: matches },
{ title: 'Use the sliders', xp: 15, setup: tgt(function (x) { return 0.5 * x * x - 3; }, 'target', 'a*x^2 + b'), t: 'y₁ = a·x² + b. Without typing, move the a and b sliders until it matches the target.',
hint: 'a controls how wide/narrow the parabola is (and flips it if negative); b moves it up or down.',
ok: 'a = 0.5 widens the parabola and b = −3 drops it by 3.', check: function () { var f = S.f[0]; return f && matches() && Math.abs(f({ x: 3, a: S.a + 1, b: S.b, c: S.c }) - f({ x: 3, a: S.a, b: S.b, c: S.c })) > 1e-9; } },
{ title: 'Where they meet', xp: 15, setup: function () { target = null; inputs[0].value = 'x^2'; parse(0); inputs[1].value = 'x + 2'; parse(1); },
t: 'y₁ = x² and y₂ = x + 2 cross twice. Find the positive x-value where they meet (trace by tapping the graph, or solve x² = x + 2).',
ask: { ph: 'x =' }, hint: 'x² − x − 2 = 0 factorises to (x − 2)(x + 1) = 0.', ok: 'x = 2 (and x = −1): graphs meet where their equations are equal.',
answer: function (v) { return Math.abs(parseFloat(v) - 2) < 0.02; } }
]);
function niceStep(range, px) { var raw = range / Math.max(2, px / 70), p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / p; return (m < 2 ? 1 : m < 5 ? 2 : 5) * p; }
function curve(x, fn, col, wdt, dash) {
var V = vw(), started = false, lastY = 0;
x.strokeStyle = col; x.lineWidth = wdt; x.setLineDash(dash || []); x.beginPath();
for (var px = 0; px <= C.w; px += 1) {
var wx = S.v.x0 + px / V.sx, y = fn(wx), py = Y(y);
if (!isFinite(y) || Math.abs(py) > C.h * 20 || (started && Math.abs(py - lastY) > C.h * 1.5)) { started = false; continue; }
if (started) x.lineTo(px, py); else { x.moveTo(px, py); started = true; }
lastY = py;
}
x.stroke(); x.setLineDash([]);
}
function roots(i) {
var V = vw(), out = [], prev = NaN, px0 = NaN;
for (var px = 0; px <= C.w && out.length < 4; px += 1) {
var wx = S.v.x0 + px / V.sx, y = ev(i, wx);
if (isFinite(y) && isFinite(prev) && (y === 0 || (prev < 0) !== (y < 0)) && Math.abs(y - prev) < (C.h / V.sx)) {
var a = px0, b = wx, fa = prev;
for (var k = 0; k < 40; k++) { var m = (a + b) / 2, fm = ev(i, m); if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m; }
out.push((a + b) / 2);
}
prev = y; px0 = wx;
}
return out;
}
function draw() {
var x = C.ctx, w = C.w, h = C.h, V = vw(), st = niceStep(S.v.x1 - S.v.x0, w), k, v;
x.fillStyle = '#070b1d'; x.fillRect(0, 0, w, h);
x.lineWidth = 1; x.font = '11px system-ui,sans-serif'; x.fillStyle = 'rgba(200,210,255,.6)';
for (v = Math.ceil(S.v.x0 / st) * st; v <= S.v.x1; v += st) { var gx = X(v); x.strokeStyle = 'rgba(160,175,255,.1)'; x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, h); x.stroke(); if (Math.abs(v) > st / 2) x.fillText(+v.toFixed(6) + '', gx + 2, U.clamp(Y(0) + 13, 12, h - 4)); }
for (v = Math.ceil(V.y0 / st) * st; v <= V.y1; v += st) { var gy = Y(v); x.strokeStyle = 'rgba(160,175,255,.1)'; x.beginPath(); x.moveTo(0, gy); x.lineTo(w, gy); x.stroke(); if (Math.abs(v) > st / 2) x.fillText(+v.toFixed(6) + '', U.clamp(X(0) + 4, 2, w - 30), gy - 2); }
x.strokeStyle = 'rgba(220,228,255,.6)'; x.lineWidth = 1.5;
x.beginPath(); x.moveTo(0, Y(0)); x.lineTo(w, Y(0)); x.moveTo(X(0), 0); x.lineTo(X(0), h); x.stroke();
if (target && U.mode === 'guided') { x.shadowColor = '#ffb86b'; x.shadowBlur = U.lp ? 0 : 10; curve(x, target, 'rgba(255,184,107,.9)', 3, [8, 7]); x.shadowBlur = 0; }
for (k = 0; k < 3; k++) if (S.f[k]) { (function (i) { x.shadowColor = COLS[i]; x.shadowBlur = U.lp ? 0 : 8; curve(x, function (q) { return ev(i, q); }, COLS[i], 2.6); x.shadowBlur = 0; })(k); }
if (S.f[0]) roots(0).forEach(function (r) { x.fillStyle = '#fff'; x.beginPath(); x.arc(X(r), Y(0), 4, 0, 6.283); x.fill(); });
if (S.tr !== null) {
var tx = S.v.x0 + S.tr / V.sx; x.strokeStyle = 'rgba(255,255,255,.3)'; x.setLineDash([3, 4]); x.beginPath(); x.moveTo(S.tr, 0); x.lineTo(S.tr, h); x.stroke(); x.setLineDash([]);
for (k = 0; k < 3; k++) { var yy = ev(k, tx); if (isFinite(yy)) { x.fillStyle = COLS[k]; x.beginPath(); x.arc(S.tr, Y(yy), 5, 0, 6.283); x.fill(); x.fillStyle = '#fff'; x.fillText('(' + tx.toFixed(2) + ', ' + yy.toFixed(2) + ')', S.tr + 8, Y(yy) - 8); } }
}
}
reset();
U.G.begin();
var fr = 0;
U.loop(function () {
fr++; if (U.lp && fr % 2) return;
draw();
if (fr % 8 === 0) {
var V = vw(), tx = S.tr !== null ? S.v.x0 + S.tr / V.sx : NaN, rs = S.f[0] ? roots(0) : [];
set('tx', isFinite(tx) ? U.f(tx, 3) : 'tap graph'); set('ty', isFinite(tx) ? U.f(ev(0, tx), 3) : '—'); set('y0', U.f(ev(0, 0), 3));
set('rt', rs.length ? rs.map(function (r) { return U.f(r, 3); }).join(', ') : 'none');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'graph-plotter', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

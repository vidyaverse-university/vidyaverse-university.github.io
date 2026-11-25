/* VidyaVerse University — Lens & optics lab (labs/lens-optics.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'lens-optics';
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
var META = { id: ID, title: 'Lens & optics lab', icon: '🔍', faculty: 'school', bands: ['secondary', 'senior', 'ug'],
summary: 'Move an object in front of a convex or concave lens and watch the three principal rays form real or virtual images, with the lens formula and magnification live.' };
function mount(el, api) {
var S = {}, C, sU, sF, sH, segK, set, Xfix = 0;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Use 1/v − 1/u = 1/f to predict where an image forms and how big it is.',
free: 'Drag the object arrow left or right (or use ←/→ on the picture; ↑/↓ change its height). Switch between converging and diverging lenses.',
note: '<p><b>Sign convention (as in NCERT):</b> distances are measured from the optical centre; to the right (direction of light) is +, to the left is −. So the object distance u is negative. A converging (convex) lens has f > 0; a diverging (concave) lens has f < 0.</p>' +
'<p><b>Lens formula:</b> 1/v − 1/u = 1/f. <b>Magnification:</b> m = h′/h = v/u (m negative ⇒ inverted). <b>Power:</b> P = 1/f with f in metres, in dioptres (D).</p>' +
'<p>Every refracted ray passes through the image point (or appears to come from it, for a virtual image), which is how the rays here are drawn. Dashed lines are backward extensions — light does not really travel along them.</p>' +
'<p><b>Simplified:</b> an ideal thin lens with paraxial rays (no spherical or chromatic aberration); real lenses are thick and blur slightly at the edges.</p>',
onReset: function () { reset(); }
});
function reset() {
S.u = -30; S.f = 10; S.kind = 1; S.h = 4;
if (sU) { sU.set(30); sF.set(10); sH.set(4); segK.set(1); }
}
function F() { return S.kind * S.f; }
function img() {
var f = F(), u = S.u, d = u + f;
if (Math.abs(d) < 1e-6) return { inf: true, v: Infinity, m: Infinity, hi: Infinity };
var v = u * f / d, m = v / u;
return { inf: false, v: v, m: m, hi: m * S.h };
}
function view() {
var w = C.w, h = C.h;
if (!S.drag || !Xfix) Xfix = U.clamp(Math.max(35, -S.u * 1.2, Math.abs(F()) * 2.3), 35, 110);
var sc = (w - 20) / (2 * Xfix);
return { cx: w / 2, cy: h * 0.55, sc: sc, X: Xfix };
}
C = U.canvas(U.stage, { ratio: 0.56, min: 260, label: 'Ray diagram. Drag the object arrow along the axis.' });
U.drag(C, {
down: function (p) { var V = view(), ox = V.cx + S.u * V.sc; if (Math.abs(p.x - ox) > 34 || p.x > V.cx - 4) return false; S.drag = true; U.sound('tap'); },
move: function (p) {
var V = view();
S.u = U.clamp(Math.round((p.x - V.cx) / V.sc * 2) / 2, -100, -2);
var hh = U.clamp(Math.round((V.cy - p.y) / V.sc), 1, 10);
if (Math.abs(V.cy - p.y) > 8) { S.h = hh; sH.set(hh); }
sU.set(-S.u); U.check();
},
up: function () { S.drag = false; U.check(); }
});
U.on(C.cv, 'keydown', function (e) {
var k = e.key;
if (k === 'ArrowLeft' || k === 'ArrowRight') { S.u = U.clamp(S.u + (k === 'ArrowLeft' ? -0.5 : 0.5), -100, -2); sU.set(-S.u); e.preventDefault(); U.check(); }
if (k === 'ArrowUp' || k === 'ArrowDown') { S.h = U.clamp(S.h + (k === 'ArrowUp' ? 1 : -1), 1, 10); sH.set(S.h); e.preventDefault(); }
});
segK = U.seg(U.ctrl, 'Lens type', [[1, '🔍 Convex (converging)'], [-1, '🔭 Concave (diverging)']], 1, function (v) { S.kind = v; U.check(); });
sF = U.slider(U.ctrl, { label: 'Focal length |f|', min: 5, max: 40, step: 0.5, value: 10, unit: 'cm', onInput: function (v) { S.f = v; U.check(); } });
sU = U.slider(U.ctrl, { label: 'Object distance |u|', min: 2, max: 100, step: 0.5, value: 30, unit: 'cm', onInput: function (v) { S.u = -v; U.check(); } });
sH = U.slider(U.ctrl, { label: 'Object height h', min: 1, max: 10, step: 1, value: 4, unit: 'cm', onInput: function (v) { S.h = v; } });
set = U.readouts([['u', 'u (object)'], ['f', 'f'], ['v', 'v (image)'], ['m', 'Magnification m'], ['hi', 'Image height h′'], ['P', 'Power'], ['n', 'Image is']]);
function cv(k, f) { return function () { S.kind = k; segK.set(k); S.f = f; sF.set(f); }; }
U.guided([
{ title: 'Same size', xp: 15, setup: cv(1, 10), t: 'With the convex lens (f = 10 cm), place the object so the image is real, inverted and exactly the same size (m = −1).',
hint: 'm = −1 happens when the object is at 2F: u = −2f = −20 cm. Then v = +20 cm too.',
ok: 'At 2F the image is also at 2F on the other side — same size, upside down.', check: function () { var I = img(); return S.kind === 1 && !I.inf && Math.abs(I.m + 1) < 0.03; } },
{ title: 'Projector', xp: 15, setup: cv(1, 10), t: 'Project a sharp image on a screen 30 cm to the right of the lens (v = +30 cm), with f = 10 cm.',
hint: '1/u = 1/v − 1/f = 1/30 − 1/10 = −2/30, so u = −15 cm.',
ok: 'u = −15 cm gives v = +30 cm and m = −2: a real, inverted, magnified image — exactly how a projector works.', check: function () { var I = img(); return S.kind === 1 && !I.inf && Math.abs(I.v - 30) < 0.6; } },
{ title: 'Magnifying glass', xp: 15, setup: cv(1, 10), t: 'Make a virtual, upright image that is at least 3 times bigger than the object (m ≥ +3).',
hint: 'Put the object between F and the lens. For a convex lens m = f/(f + u); m = 3 needs u = −2f/3 ≈ −6.7 cm, so try |u| between about 6.7 and 10 cm.',
ok: 'Inside the focal length the rays spread out; your eye traces them back to a big upright virtual image.', check: function () { var I = img(); return S.kind === 1 && !I.inf && I.v < 0 && I.m >= 3; } },
{ title: 'Diverging lens', xp: 15, setup: cv(-1, 10), t: 'Now a concave lens (f = −10 cm). Place the object so the image is exactly half the size (m = +0.5).',
hint: 'For any lens m = f/(f + u). With f = −10: 0.5 = −10/(−10 + u) gives u = −10 cm.',
ok: 'A concave lens always gives a virtual, upright, smaller image — that is why it is used in glasses for short sight.', check: function () { var I = img(); return S.kind === -1 && Math.abs(I.m - 0.5) < 0.02; } },
{ title: 'Dioptres', xp: 10, t: 'An optician writes +2.5 D on a prescription. What is the focal length of that lens, in cm?',
ask: { ph: 'focal length', unit: 'cm' }, hint: 'P = 1/f (metres) → f = 1/2.5 m = 0.4 m.',
ok: 'f = 1/P = 0.4 m = 40 cm, a converging lens (for long sight).', answer: function (v) { return Math.abs(parseFloat(v) - 40) < 0.5; } }
]);
function arrow(x, X1, Y0, Y1, col, dashed, wdt) {
x.strokeStyle = col; x.fillStyle = col; x.lineWidth = wdt || 3; x.setLineDash(dashed ? [5, 5] : []);
x.beginPath(); x.moveTo(X1, Y0); x.lineTo(X1, Y1); x.stroke(); x.setLineDash([]);
var d = Y1 < Y0 ? 1 : -1;
x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X1 - 7, Y1 + 11 * d); x.lineTo(X1 + 7, Y1 + 11 * d); x.closePath(); x.fill();
}
function ray(x, V, y0, I, col) {
var f = F(), ox = V.cx + S.u * V.sc, oy = V.cy - S.h * V.sc, lx = V.cx, ly, dx, dy;
if (I.inf) { ly = y0 === 'c' ? 0 : y0 === 'p' ? S.h : 0; dx = 1; dy = S.h / S.u; }
else {
ly = y0 === 'p' ? S.h : y0 === 'c' ? 0 : I.hi;
if (I.v > 0) { dx = I.v; dy = I.hi - ly; } else { dx = -I.v; dy = ly - I.hi; }
}
var Ly = V.cy - ly * V.sc;
if (!isFinite(Ly) || Math.abs(ly) > 60) return;
x.strokeStyle = col; x.lineWidth = 2; x.shadowColor = col; x.shadowBlur = U.lp ? 0 : 8;
x.beginPath(); x.moveTo(ox, oy); x.lineTo(lx, Ly);
var t = (V.X * 2) / Math.hypot(dx, dy);
x.lineTo(lx + dx * t * V.sc, Ly - dy * t * V.sc); x.stroke(); x.shadowBlur = 0;
if (!I.inf && I.v < 0) {
x.setLineDash([4, 5]); x.globalAlpha = 0.6; x.beginPath(); x.moveTo(lx, Ly); x.lineTo(V.cx + I.v * V.sc, V.cy - I.hi * V.sc); x.stroke(); x.setLineDash([]); x.globalAlpha = 1;
}
}
function draw() {
var x = C.ctx, w = C.w, h = C.h, V = view(), I = img(), f = F();
var bg = x.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#0a1130'); bg.addColorStop(1, '#170c33');
x.fillStyle = bg; x.fillRect(0, 0, w, h);
x.strokeStyle = 'rgba(160,175,255,.35)'; x.lineWidth = 1;
x.beginPath(); x.moveTo(0, V.cy); x.lineTo(w, V.cy); x.stroke();
x.fillStyle = 'rgba(200,210,255,.55)'; x.font = '10px system-ui,sans-serif'; x.textAlign = 'center';
var st = V.X > 70 ? 20 : 10;
for (var c = -Math.floor(V.X / st) * st; c <= V.X; c += st) { var px = V.cx + c * V.sc; x.fillRect(px, V.cy - 3, 1, 6); if (c) x.fillText(c, px, V.cy + 14); }
[[f, 'F′'], [-f, 'F'], [2 * f, '2F′'], [-2 * f, '2F']].forEach(function (q) {
var px = V.cx + q[0] * V.sc; if (px < 0 || px > w) return;
x.fillStyle = '#ffb86b'; x.beginPath(); x.arc(px, V.cy, 3.5, 0, 2 * Math.PI); x.fill(); x.fillText(q[1], px, V.cy - 8);
});
// lens
var LH = Math.min(h * 0.42, 16 * V.sc + 40), lg = x.createLinearGradient(V.cx - 12, 0, V.cx + 12, 0);
lg.addColorStop(0, 'rgba(120,200,255,.15)'); lg.addColorStop(0.5, 'rgba(170,230,255,.55)'); lg.addColorStop(1, 'rgba(120,200,255,.15)');
x.fillStyle = lg; x.strokeStyle = 'rgba(190,235,255,.9)'; x.lineWidth = 1.5; x.beginPath();
if (S.kind === 1) { x.moveTo(V.cx, V.cy - LH); x.quadraticCurveTo(V.cx + 22, V.cy, V.cx, V.cy + LH); x.quadraticCurveTo(V.cx - 22, V.cy, V.cx, V.cy - LH); }
else { x.moveTo(V.cx - 12, V.cy - LH); x.lineTo(V.cx + 12, V.cy - LH); x.quadraticCurveTo(V.cx + 2, V.cy, V.cx + 12, V.cy + LH); x.lineTo(V.cx - 12, V.cy + LH); x.quadraticCurveTo(V.cx - 2, V.cy, V.cx - 12, V.cy - LH); }
x.fill(); x.stroke();
ray(x, V, 'p', I, '#ff6b8b'); ray(x, V, 'c', I, '#ffd86b'); ray(x, V, 'f', I, '#6be4ff');
arrow(x, V.cx + S.u * V.sc, V.cy, V.cy - S.h * V.sc, '#9cff8a', false, 4);
if (!I.inf) {
var ix = V.cx + I.v * V.sc, iy = V.cy - I.hi * V.sc;
if (ix > -50 && ix < w + 50) arrow(x, ix, V.cy, U.clamp(iy, -10, h + 10), I.v > 0 ? '#ffffff' : 'rgba(255,255,255,.55)', I.v < 0, 3);
else { x.fillStyle = '#ffe2b8'; x.textAlign = 'left'; x.fillText('Image is off-screen at v = ' + I.v.toFixed(1) + ' cm', 10, 18); }
} else { x.fillStyle = '#ffe2b8'; x.textAlign = 'left'; x.fillText('Object at F: rays leave parallel — image at infinity', 10, 18); }
x.textAlign = 'left'; x.font = '11px system-ui,sans-serif'; x.fillStyle = '#c8d0ff';
x.fillText('object', V.cx + S.u * V.sc - 18, V.cy + 28);
x.fillText('cm', w - 22, V.cy + 14);
if (U.lp) return;
x.fillStyle = 'rgba(255,255,255,.05)';
x.fillRect(V.cx + S.u * V.sc - 20, V.cy - S.h * V.sc - 14, 40, S.h * V.sc + 14);
}
reset();
U.G.begin();
U.loop(function () {
draw();
var I = img(), f = F();
set('u', U.f(S.u, 1) + ' cm'); set('f', U.f(f, 1) + ' cm');
set('v', I.inf ? '∞' : U.f(I.v, 1) + ' cm'); set('m', I.inf ? '∞' : U.f(I.m, 2) + '×');
set('hi', I.inf ? '∞' : U.f(I.hi, 1) + ' cm'); set('P', (100 / f > 0 ? '+' : '') + U.f(100 / f, 2) + ' D');
set('n', I.inf ? 'at infinity' : (I.v > 0 ? 'real, ' : 'virtual, ') + (I.m < 0 ? 'inverted, ' : 'upright, ') + (Math.abs(I.m) > 1.005 ? 'magnified' : Math.abs(I.m) < 0.995 ? 'diminished' : 'same size'));
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'lens-optics', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

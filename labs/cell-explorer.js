/* VidyaVerse University — Cell explorer (labs/cell-explorer.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'cell-explorer';
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
var META = { id: ID, title: 'Cell explorer', icon: '🧫', faculty: 'school', bands: ['primary', 'middle', 'secondary', 'senior'],
summary: 'Tap every part of an animal cell, a plant cell and a bacterium to learn what each organelle does — then find them in a guided hunt.' };
var INFO = {
membrane: ['Cell membrane', 'A thin, flexible phospholipid bilayer around every cell. It is selectively permeable: it controls what enters and leaves.', 'all'],
cytoplasm: ['Cytoplasm', 'Jelly-like fluid (mostly water) filling the cell. Many chemical reactions, such as the first stage of respiration (glycolysis), happen here.', 'all'],
nucleus: ['Nucleus', 'The control centre. It holds DNA packed into chromosomes and is surrounded by a double nuclear envelope with pores.', 'animal & plant'],
nucleolus: ['Nucleolus', 'A dense region inside the nucleus where ribosomes are assembled (it makes ribosomal RNA).', 'animal & plant'],
mito: ['Mitochondrion', 'Site of aerobic respiration: glucose + oxygen → carbon dioxide + water, releasing energy stored as ATP. It has folded inner membranes (cristae) and its own DNA.', 'animal & plant'],
rer: ['Rough ER', 'Endoplasmic reticulum studded with ribosomes. It makes and folds proteins and carries them through the cell.', 'animal & plant'],
ser: ['Smooth ER', 'ER without ribosomes. It makes lipids (fats, steroids) and helps detoxify chemicals — lots of it in liver cells.', 'animal & plant'],
golgi: ['Golgi apparatus', 'Stacks of flattened sacs that modify, sort and package proteins into vesicles — the cell’s post office.', 'animal & plant'],
lyso: ['Lysosome', 'A small sac of digestive enzymes that breaks down worn-out parts, food particles and invading microbes.', 'mainly animal'],
ribo: ['Ribosomes', 'Tiny protein factories that read mRNA and join amino acids together. 80S in plants and animals, smaller 70S in bacteria.', 'all'],
centro: ['Centrosome', 'Contains a pair of centrioles; organises microtubules and the spindle that separates chromosomes during cell division.', 'animal'],
vacuole: ['Large vacuole', 'A big sac of cell sap (water, sugars, salts) bounded by the tonoplast. Pressing outwards, it keeps the plant cell firm (turgid).', 'plant'],
chloro: ['Chloroplast', 'Site of photosynthesis: carbon dioxide + water → glucose + oxygen, using light energy trapped by green chlorophyll in stacked thylakoids (grana).', 'plant'],
wall: ['Cell wall', 'A tough layer outside the membrane. In plants it is made of cellulose; in bacteria of peptidoglycan. It gives shape and support and stops the cell bursting.', 'plant & bacteria'],
nucleoid: ['Nucleoid', 'The region holding a bacterium’s single, circular chromosome. There is no nuclear membrane — bacteria are prokaryotes.', 'bacteria'],
plasmid: ['Plasmids', 'Small extra rings of DNA. They can carry useful genes such as antibiotic resistance and can be passed between bacteria.', 'bacteria'],
flag: ['Flagellum', 'A whip-like tail that rotates like a propeller so the bacterium can swim.', 'some bacteria'],
pili: ['Pili', 'Short hair-like threads that help bacteria stick to surfaces and, in some cases, pass DNA to each other.', 'some bacteria'],
capsule: ['Capsule (slime layer)', 'A sticky outer layer that protects some bacteria from drying out and from the immune system.', 'some bacteria']
};
var LISTS = { animal: ['nucleus', 'nucleolus', 'mito', 'rer', 'ser', 'golgi', 'lyso', 'ribo', 'centro', 'membrane', 'cytoplasm'],
plant: ['wall', 'membrane', 'vacuole', 'chloro', 'nucleus', 'nucleolus', 'mito', 'rer', 'golgi', 'ribo', 'cytoplasm'],
bact: ['capsule', 'wall', 'membrane', 'nucleoid', 'plasmid', 'ribo', 'flag', 'pili', 'cytoplasm'] };
var SIZE = { animal: ['≈ 10–30 µm across', 10], plant: ['≈ 10–100 µm across', 20], bact: ['≈ 1–5 µm long', 1] };
function mount(el, api) {
var S = { cell: 'animal', sel: null, hover: null, t: 0 }, C, segC, listBox, infoBox, tagEl;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Learn what every part of a cell does — and how plant, animal and bacterial cells differ.',
free: 'Tap any part of the cell (or use the buttons below the picture) to read about it. Switch between animal, plant and bacterial cells.',
css: '%P .vvc-list{display:flex;flex-wrap:wrap;gap:6px}%P .vvc-list button{padding:6px 10px;font-size:.9em}%P .vvc-list button[aria-pressed=true]{background:rgba(74,222,128,.25);border-color:#4ade80}' +
'%P .vvc-info h5{margin:0 0 4px;font-size:1.15em;color:#ffd7a8}%P .vvc-info p{margin:4px 0}%P .vvc-tag{display:inline-block;font-size:.78em;padding:2px 8px;border-radius:999px;background:rgba(124,156,255,.25)}',
note: '<p>The drawings are labelled diagrams, not to scale and simplified: real cells are 3-D, crowded and full of many more structures (cytoskeleton, peroxisomes, vesicles…).</p>' +
'<p>In a living plant cell, chloroplasts really do drift around the vacuole — this is called <b>cytoplasmic streaming</b> (cyclosis).</p>' +
'<p>Prokaryotes (bacteria) have no nucleus and no membrane-bound organelles; eukaryotes (plants, animals, fungi) do.</p>',
onReset: function () { S.cell = 'animal'; S.sel = null; segC.set('animal'); buildList(); showInfo(); }
});
C = U.canvas(U.stage, { ratio: 0.62, min: 260, scroll: true, label: 'Cell diagram. Tap a part to learn about it.' });
listBox = U.h('div', { cls: 'vvc-list', role: 'group', 'aria-label': 'Cell parts' });
U.stage.appendChild(listBox);
segC = U.seg(U.ctrl, 'Choose a cell', [['animal', '🐾 Animal cell'], ['plant', '🌿 Plant cell'], ['bact', '🦠 Bacterium']], 'animal', function (v) { S.cell = v; S.sel = null; buildList(); showInfo(); U.check(); });
U.readBox.firstChild.textContent = 'About this part';
infoBox = U.h('div', { cls: 'vvc-info', 'aria-live': 'polite' });
U.read.style.display = 'none';
U.readBox.appendChild(infoBox);
function buildList() {
listBox.innerHTML = '';
LISTS[S.cell].forEach(function (id) {
var b = U.h('button', { 'aria-pressed': S.sel === id ? 'true' : 'false', text: INFO[id][0] });
U.on(b, 'click', function () { pick(id); });
listBox.appendChild(b);
});
}
function showInfo() {
infoBox.innerHTML = '';
if (!S.sel) { infoBox.appendChild(U.h('p', { cls: 'vvk-small', text: 'Tap a part of the ' + (S.cell === 'bact' ? 'bacterium' : S.cell + ' cell') + ' to see its name and job. Size: ' + SIZE[S.cell][0] + '.' })); return; }
var I = INFO[S.sel];
infoBox.appendChild(U.h('h5', { text: I[0] }));
infoBox.appendChild(U.h('span', { cls: 'vvc-tag', text: 'Found in: ' + I[2] }));
infoBox.appendChild(U.h('p', { text: I[1] }));
}
function pick(id) {
S.sel = id; U.sound('pop'); U.say(INFO[id][0] + '. ' + INFO[id][1]);
buildList(); showInfo(); U.check();
}
function sc() { var s = Math.min(C.w / 2.25, C.h / 1.55); return { s: s, cx: C.w / 2, cy: C.h / 2 }; }
function chloroPos(i, n) { var a = i / n * 2 * Math.PI + (U.rm ? 0 : S.t * 0.12); return [Math.cos(a) * 0.8, Math.sin(a) * 0.52, a]; }
function hits() {
var H = [];
if (S.cell === 'animal') {
H.push(['nucleolus', [[-0.12, -0.02, 0.08, 0.07]]], ['centro', [[0.2, -0.33, 0.07, 0.06]]], ['nucleus', [[-0.1, 0, 0.27, 0.23]]],
['mito', [[-0.6, 0.28, 0.17, 0.09], [0.62, 0.3, 0.17, 0.09], [-0.5, -0.38, 0.16, 0.09]]],
['golgi', [[0.56, -0.2, 0.15, 0.11]]], ['lyso', [[0.18, -0.48, 0.07, 0.07], [-0.78, -0.02, 0.07, 0.07]]],
['rer', [[0.3, 0.04, 0.12, 0.22]]], ['ser', [[0.28, 0.42, 0.16, 0.09]]], ['ribo', [[0.0, 0.5, 0.1, 0.07], [-0.3, -0.5, 0.08, 0.06]]]);
} else if (S.cell === 'plant') {
var cl = [];
for (var i = 0; i < 9; i++) { var p = chloroPos(i, 9); cl.push([p[0], p[1], 0.11, 0.08]); }
H.push(['chloro', cl], ['nucleolus', [[-0.72, -0.4, 0.05, 0.05]]], ['nucleus', [[-0.72, -0.4, 0.15, 0.14]]],
['mito', [[0.82, -0.12, 0.1, 0.06], [-0.85, 0.2, 0.1, 0.06]]], ['golgi', [[0.75, 0.42, 0.1, 0.07]]], ['rer', [[-0.45, -0.52, 0.12, 0.06]]],
['ribo', [[0.45, -0.58, 0.08, 0.04]]], ['vacuole', [[0.05, 0.02, 0.6, 0.36]]]);
} else {
H.push(['plasmid', [[0.45, 0.12, 0.08, 0.08], [-0.45, -0.12, 0.07, 0.07]]], ['nucleoid', [[0, 0, 0.3, 0.16]]], ['ribo', [[-0.5, 0.15, 0.12, 0.08], [0.5, -0.15, 0.12, 0.08]]],
['flag', [[1.15, 0.05, 0.22, 0.12]]]);
}
return H;
}
function locate(p) {
var g = sc(), ux = (p.x - g.cx) / g.s, uy = (p.y - g.cy) / g.s, H = hits(), i, j;
for (i = 0; i < H.length; i++) for (j = 0; j < H[i][1].length; j++) { var e = H[i][1][j]; var d = Math.pow((ux - e[0]) / e[2], 2) + Math.pow((uy - e[1]) / e[3], 2); if (d <= 1) return H[i][0]; }
if (S.cell === 'animal') { var r = Math.sqrt(ux * ux / 0.9 + uy * uy / 0.43); if (r > 0.92 && r < 1.06) return 'membrane'; if (r <= 0.92) return 'cytoplasm'; }
else if (S.cell === 'plant') { var ax = Math.abs(ux), ay = Math.abs(uy); if (ax < 1.02 && ay < 0.72) { if (ax > 0.95 || ay > 0.65) return 'wall'; if (ax > 0.91 || ay > 0.61) return 'membrane'; return 'cytoplasm'; } }
else { var dx = Math.max(0, Math.abs(ux) - 0.5), d = Math.sqrt(dx * dx + uy * uy);
if (d <= 0.33) return 'cytoplasm'; if (d <= 0.37) return 'membrane'; if (d <= 0.43) return 'wall'; if (d <= 0.48) return 'capsule'; if (d <= 0.58 && Math.abs(ux) <= 0.52) return 'pili'; }
return null;
}
U.drag(C, { down: function (p) { var id = locate(p); if (id) pick(id); return false; }, hover: function (p) { S.hover = locate(p); } });
U.on(C.cv, 'pointerleave', function () { S.hover = null; });
U.on(C.cv, 'keydown', function (e) {
if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
var L = LISTS[S.cell], i = L.indexOf(S.sel); i = (i + (e.key === 'ArrowRight' ? 1 : L.length - 1)) % L.length; if (i < 0) i = 0; pick(L[i]); e.preventDefault();
});
U.guided([
{ title: 'Control centre', xp: 10, setup: function () { S.cell = 'animal'; segC.set('animal'); S.sel = null; buildList(); showInfo(); }, t: 'In the animal cell, find the part that holds the DNA and controls the cell.',
hint: 'It is the biggest round structure, near the middle, with a dark spot inside.', ok: 'The nucleus — the cell’s control centre.', check: function () { return S.cell === 'animal' && S.sel === 'nucleus'; } },
{ title: 'Powerhouse', xp: 10, t: 'Find the organelle where aerobic respiration releases energy from glucose.',
hint: 'Look for bean-shaped organelles with folded lines inside (cristae).', ok: 'Mitochondria! Muscle cells are packed with them.', check: function () { return S.sel === 'mito'; } },
{ title: 'Protein factory', xp: 10, t: 'Find the tiny structures that actually build proteins.',
hint: 'They are the small dots — some free in the cytoplasm, some on the rough ER.', ok: 'Ribosomes build proteins from amino acids.', check: function () { return S.sel === 'ribo' || S.sel === 'rer'; } },
{ title: 'Food from light', xp: 15, setup: function () { S.cell = 'plant'; segC.set('plant'); S.sel = null; buildList(); showInfo(); }, t: 'Now a plant cell. Find where photosynthesis happens.',
hint: 'Green ovals drifting around the edge of the cell.', ok: 'Chloroplasts capture light energy with chlorophyll.', check: function () { return S.cell === 'plant' && S.sel === 'chloro'; } },
{ title: 'No nucleus!', xp: 15, setup: function () { S.cell = 'bact'; segC.set('bact'); S.sel = null; buildList(); showInfo(); }, t: 'A bacterium has no nucleus. Find where it keeps its main DNA.',
hint: 'Look for the tangled loop of DNA in the middle of the cytoplasm.', ok: 'The nucleoid — DNA without a nuclear membrane. That makes bacteria prokaryotes.', check: function () { return S.cell === 'bact' && S.sel === 'nucleoid'; } }
]);
function E(x, g, cx, cy, rx, ry, rot) { x.beginPath(); x.ellipse(g.cx + cx * g.s, g.cy + cy * g.s, Math.max(0.5, rx * g.s), Math.max(0.5, ry * g.s), rot || 0, 0, 2 * Math.PI); }
function mito(x, g, cx, cy, rot) {
E(x, g, cx, cy, 0.16, 0.075, rot); x.fillStyle = '#e8743b'; x.fill(); x.strokeStyle = '#ffb27a'; x.lineWidth = 1.5; x.stroke();
x.save(); x.translate(g.cx + cx * g.s, g.cy + cy * g.s); x.rotate(rot || 0); x.strokeStyle = '#ffd3a8'; x.lineWidth = 1.2; x.beginPath();
var L = 0.13 * g.s, A = 0.045 * g.s; x.moveTo(-L, 0);
for (var k = 0; k <= 8; k++) x.lineTo(-L + k * L / 4, (k % 2 ? -A : A));
x.stroke(); x.restore();
}
function nucleus(x, g, cx, cy, r) {
E(x, g, cx, cy, r, r * 0.86); var ng = x.createRadialGradient(g.cx + cx * g.s, g.cy + cy * g.s, 2, g.cx + cx * g.s, g.cy + cy * g.s, r * g.s);
ng.addColorStop(0, '#9b7bff'); ng.addColorStop(1, '#5a3fc0'); x.fillStyle = ng; x.fill(); x.strokeStyle = '#cbb8ff'; x.lineWidth = 2.5; x.stroke();
x.fillStyle = 'rgba(255,255,255,.25)'; for (var k = 0; k < 10; k++) { var a = k * 0.63; E(x, g, cx + Math.cos(a) * r * 0.97, cy + Math.sin(a) * r * 0.84, 0.008, 0.008); x.fill(); }
E(x, g, cx - r * 0.1, cy - r * 0.08, r * 0.3, r * 0.28); x.fillStyle = '#2c1a78'; x.fill();
}
function dots(x, g, cx, cy, rx, ry, n, col) { x.fillStyle = col; for (var k = 0; k < n; k++) { var a = k * 2.399, r = Math.sqrt((k + 0.5) / n); x.fillRect(g.cx + (cx + Math.cos(a) * r * rx) * g.s - 1.5, g.cy + (cy + Math.sin(a) * r * ry) * g.s - 1.5, 3, 3); } }
function golgi(x, g, cx, cy, s) { x.strokeStyle = '#ffd25a'; x.lineCap = 'round'; for (var k = 0; k < 4; k++) { x.lineWidth = Math.max(2, 0.02 * g.s); x.beginPath(); x.arc(g.cx + cx * g.s, g.cy + (cy + 0.11 * s + k * 0.035 * s) * g.s, 0.12 * s * g.s, Math.PI * 1.2, Math.PI * 1.8); x.stroke(); } }
function draw() {
var x = C.ctx, w = C.w, h = C.h, g = sc(), k;
var bg = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.7);
bg.addColorStop(0, '#1b2350'); bg.addColorStop(1, '#070a1c'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
if (S.cell === 'animal') {
x.beginPath();
for (k = 0; k <= 64; k++) { var a = k / 64 * 2 * Math.PI, wob = 1 + 0.03 * Math.sin(a * 5 + (U.rm ? 0 : S.t * 0.6)); var px = g.cx + Math.cos(a) * 0.95 * wob * g.s, py = g.cy + Math.sin(a) * 0.656 * wob * g.s; if (k) x.lineTo(px, py); else x.moveTo(px, py); }
x.closePath(); var cg = x.createRadialGradient(g.cx, g.cy, 10, g.cx, g.cy, g.s); cg.addColorStop(0, 'rgba(255,190,200,.38)'); cg.addColorStop(1, 'rgba(255,120,160,.22)');
x.fillStyle = cg; x.fill(); x.strokeStyle = '#ff9fc0'; x.lineWidth = 3; x.stroke();
nucleus(x, g, -0.1, 0, 0.26);
x.strokeStyle = '#7fd0ff'; x.lineWidth = 2;
for (k = 0; k < 4; k++) { x.beginPath(); x.arc(g.cx - 0.1 * g.s, g.cy, (0.3 + k * 0.045) * g.s, -0.75, 0.75); x.stroke(); }
dots(x, g, 0.3, 0.02, 0.1, 0.2, 26, '#d9f2ff');
x.strokeStyle = '#8fe3c0'; x.lineWidth = 3; x.beginPath(); x.moveTo(g.cx + 0.14 * g.s, g.cy + 0.4 * g.s);
for (k = 1; k <= 6; k++) x.quadraticCurveTo(g.cx + (0.14 + k * 0.05 - 0.025) * g.s, g.cy + (0.4 + (k % 2 ? 0.06 : -0.06)) * g.s, g.cx + (0.14 + k * 0.05) * g.s, g.cy + 0.4 * g.s);
x.stroke();
golgi(x, g, 0.56, -0.29, 1);
mito(x, g, -0.6, 0.28, 0.3); mito(x, g, 0.62, 0.3, -0.4); mito(x, g, -0.5, -0.38, -0.2);
x.fillStyle = '#c3e86b'; E(x, g, 0.18, -0.48, 0.055, 0.055); x.fill(); E(x, g, -0.78, -0.02, 0.05, 0.05); x.fill();
x.fillStyle = '#ffef9a'; x.fillRect(g.cx + 0.16 * g.s, g.cy - 0.36 * g.s, 0.06 * g.s, 0.02 * g.s); x.fillRect(g.cx + 0.2 * g.s, g.cy - 0.38 * g.s, 0.02 * g.s, 0.07 * g.s);
dots(x, g, 0.0, 0.5, 0.1, 0.06, 12, '#ffffff'); dots(x, g, -0.3, -0.5, 0.07, 0.05, 8, '#ffffff');
} else if (S.cell === 'plant') {
x.fillStyle = '#3f8f3a'; x.beginPath(); x.rect(g.cx - 1.0 * g.s, g.cy - 0.7 * g.s, 2.0 * g.s, 1.4 * g.s); x.fill();
x.fillStyle = 'rgba(170,240,160,.28)'; x.fillRect(g.cx - 0.93 * g.s, g.cy - 0.63 * g.s, 1.86 * g.s, 1.26 * g.s);
x.strokeStyle = '#b6ffb0'; x.lineWidth = 2; x.strokeRect(g.cx - 0.93 * g.s, g.cy - 0.63 * g.s, 1.86 * g.s, 1.26 * g.s);
E(x, g, 0.05, 0.02, 0.6, 0.36); x.fillStyle = 'rgba(120,190,255,.35)'; x.fill(); x.strokeStyle = '#9fd3ff'; x.lineWidth = 2; x.stroke();
nucleus(x, g, -0.72, -0.4, 0.15);
for (k = 0; k < 9; k++) {
var p = chloroPos(k, 9);
E(x, g, p[0], p[1], 0.1, 0.06, p[2] + Math.PI / 2); x.fillStyle = '#2fbf4a'; x.fill(); x.strokeStyle = '#a8ff9c'; x.lineWidth = 1.2; x.stroke();
x.fillStyle = '#156b28'; for (var j = -1; j <= 1; j++) { E(x, g, p[0] + Math.cos(p[2] + Math.PI / 2) * j * 0.05, p[1] + Math.sin(p[2] + Math.PI / 2) * j * 0.05, 0.018, 0.018); x.fill(); }
}
mito(x, g, 0.82, -0.12, 1.4); mito(x, g, -0.85, 0.2, 1.6);
golgi(x, g, 0.75, 0.38, 0.7);
x.strokeStyle = '#7fd0ff'; x.lineWidth = 2; for (k = 0; k < 3; k++) { x.beginPath(); x.moveTo(g.cx - 0.56 * g.s, g.cy + (-0.55 + k * 0.03) * g.s); x.lineTo(g.cx - 0.34 * g.s, g.cy + (-0.55 + k * 0.03) * g.s); x.stroke(); }
dots(x, g, 0.45, -0.58, 0.08, 0.035, 10, '#ffffff');
} else {
x.save(); x.translate(g.cx, g.cy);
x.strokeStyle = '#d9b68a'; x.lineWidth = 2; x.beginPath(); var wv = U.rm ? 0 : S.t * 6;
x.moveTo(0.9 * g.s, 0); for (k = 0; k <= 30; k++) x.lineTo((0.9 + k * 0.016) * g.s, Math.sin(k * 0.5 - wv) * 0.06 * g.s); x.stroke();
x.strokeStyle = 'rgba(255,230,190,.7)'; x.lineWidth = 1.2;
for (k = -4; k <= 4; k++) { if (!k) continue; var px2 = k * 0.12 * g.s, sgn = k % 2 ? 1 : -1; x.beginPath(); x.moveTo(px2, sgn * 0.37 * g.s); x.lineTo(px2 + 0.02 * g.s, sgn * 0.57 * g.s); x.stroke(); }
var cap = function (r, col, line, lw) { x.beginPath(); x.arc(-0.5 * g.s, 0, r * g.s, Math.PI / 2, Math.PI * 1.5); x.arc(0.5 * g.s, 0, r * g.s, -Math.PI / 2, Math.PI / 2); x.closePath(); if (col) { x.fillStyle = col; x.fill(); } if (line) { x.strokeStyle = line; x.lineWidth = lw; x.stroke(); } };
cap(0.46, 'rgba(255,220,150,.12)', 'rgba(255,220,150,.35)', 1);
cap(0.4, '#6b4c8f', '#c8a8ff', 3);
cap(0.35, 'rgba(255,200,230,.35)', '#ffb0d8', 1.5);
x.restore();
x.strokeStyle = '#7be0ff'; x.lineWidth = 2; x.beginPath();
for (k = 0; k <= 80; k++) { var a2 = k / 80 * 2 * Math.PI, rr = 0.18 + 0.06 * Math.sin(a2 * 7); var q1 = g.cx + Math.cos(a2) * rr * 1.6 * g.s, q2 = g.cy + Math.sin(a2) * rr * 0.75 * g.s; if (k) x.lineTo(q1, q2); else x.moveTo(q1, q2); }
x.stroke();
x.strokeStyle = '#ffe36b'; x.lineWidth = 2; E(x, g, 0.45, 0.12, 0.05, 0.05); x.stroke(); E(x, g, -0.45, -0.12, 0.045, 0.045); x.stroke();
dots(x, g, -0.5, 0.15, 0.1, 0.07, 10, '#ffffff'); dots(x, g, 0.5, -0.15, 0.1, 0.07, 10, '#ffffff');
}
var sel = S.sel, hov = S.hover;
hits().forEach(function (H) {
if (H[0] !== sel && H[0] !== hov) return;
H[1].forEach(function (e) { E(x, g, e[0], e[1], e[2] + 0.02, e[3] + 0.02); x.strokeStyle = H[0] === sel ? '#4ade80' : 'rgba(255,255,255,.6)'; x.lineWidth = H[0] === sel ? 3 : 1.5; x.setLineDash(H[0] === sel ? [] : [4, 4]); x.stroke(); x.setLineDash([]); });
});
var lab = hov || sel;
if (lab) { x.font = '600 14px system-ui,sans-serif'; var tw = x.measureText(INFO[lab][0]).width; x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(8, 8, tw + 16, 26); x.fillStyle = '#fff'; x.fillText(INFO[lab][0], 16, 26); }
var bar = SIZE[S.cell][1], bp = g.s * 2 * (S.cell === 'animal' ? 0.5 : S.cell === 'plant' ? 0.4 : 0.55);
x.fillStyle = 'rgba(230,235,255,.8)'; x.fillRect(12, h - 16, bp, 3); x.font = '11px system-ui,sans-serif'; x.fillText('≈ ' + bar + ' µm', 12, h - 22);
}
buildList(); showInfo();
U.G.begin();
var fr = 0;
U.loop(function (dt) { fr++; S.t += dt; if ((U.lp || U.rm) && fr % 3) return; draw(); });
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'cell-explorer', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

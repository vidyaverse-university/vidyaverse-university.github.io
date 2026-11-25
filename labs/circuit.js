/* VidyaVerse University — Circuit lab (labs/circuit.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'circuit';
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
var META = { id: ID, title: 'Circuit lab', icon: '💡', faculty: 'school', bands: ['middle', 'secondary', 'senior'],
summary: 'Wire three bulbs in series, parallel or a mix, set the battery and resistances, and see Ohm’s law, current flow and power live.' };
function mount(el, api) {
var S = {}, C, sV, sR = [], sr, segT, swB, set, phase = 0;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Predict and measure current, voltage and power with V = IR.',
free: 'Change the wiring, battery and resistances. Tap a bulb (or press 1, 2, 3) to unscrew it and see which others go dark. Press S to flip the switch.',
note: '<p><b>Ohm’s law:</b> V = IR. <b>Series:</b> R = R₁ + R₂ + R₃ — same current everywhere, voltages add up. <b>Parallel:</b> 1/R = 1/R₁ + 1/R₂ + 1/R₃ — same voltage on each branch, currents add up (Kirchhoff’s current law). <b>Power:</b> P = VI = I²R = V²/R.</p>' +
'<p>With internal resistance r the battery delivers I = ε/(R + r) and its terminal voltage drops to ε − Ir.</p>' +
'<p>Moving dots show <b>conventional current</b> (+ to −); real electrons drift the other way, and very slowly (≈ mm/s). Brightness follows each bulb’s power.</p>' +
'<p><b>Simplified:</b> bulbs are treated as fixed ohmic resistors (a real filament’s resistance rises as it heats up), wires and meters are ideal.</p>',
onReset: function () { reset(); }
});
function reset() {
S.top = 'series'; S.V = 6; S.R = [4, 8, 12]; S.r = 0; S.on = true; S.out = [false, false, false];
if (sV) { sV.set(6); sR[0].set(4); sR[1].set(8); sR[2].set(12); sr.set(0); segT.set('series'); swB.textContent = '🔌 Switch: ON'; }
}
function solve() {
var R = S.R, o = S.out, Ib = [0, 0, 0], Vb = [0, 0, 0], Req = Infinity, I = 0;
function g(k) { return o[k] ? 0 : 1 / R[k]; }
if (S.top === 'series') {
if (!o[0] && !o[1] && !o[2]) Req = R[0] + R[1] + R[2];
} else if (S.top === 'parallel') {
var G = g(0) + g(1) + g(2); if (G > 0) Req = 1 / G;
} else {
var Gp = g(1) + g(2); if (!o[0] && Gp > 0) Req = R[0] + 1 / Gp;
}
if (S.on && isFinite(Req)) I = S.V / (Req + S.r);
var Vt = S.on ? S.V - I * S.r : S.V;
if (S.top === 'series') { for (var k = 0; k < 3; k++) { Ib[k] = I; Vb[k] = I * R[k]; } }
else if (S.top === 'parallel') { for (k = 0; k < 3; k++) { Vb[k] = o[k] ? 0 : I * Req; Ib[k] = o[k] ? 0 : Vb[k] / R[k]; } }
else {
Ib[0] = I; Vb[0] = I * R[0];
var Vp = I > 0 ? I / (g(1) + g(2)) : 0;
for (k = 1; k < 3; k++) { Vb[k] = o[k] ? 0 : Vp; Ib[k] = o[k] ? 0 : Vp / R[k]; }
}
var P = Ib.map(function (i, k) { return i * i * R[k]; });
return { Req: Req, I: I, Vt: Vt, Ib: Ib, Vb: Vb, P: P };
}
C = U.canvas(U.stage, { ratio: 0.6, min: 280, scroll: true, label: 'Circuit diagram. Tap a bulb to remove or replace it.' });
function layout() {
var w = C.w, h = C.h, L = Math.max(46, w * 0.1), Rr = w - Math.max(30, w * 0.06), T = h * 0.18, B = h * 0.86, M = (T + B) / 2;
var bulbs, segs, X;
if (S.top === 'series') {
bulbs = [[(L + Rr) / 2, T, 0], [Rr, M, 1], [(L + Rr) / 2, B, 2]];
segs = [{ p: [[L, M - 22], [L, T], [Rr, T], [Rr, B], [L, B], [L, M + 22]], i: -1 }];
} else if (S.top === 'parallel') {
X = [L + (Rr - L) * 0.3, L + (Rr - L) * 0.62, Rr];
bulbs = [[X[0], M, 0], [X[1], M, 1], [X[2], M, 2]];
segs = [{ p: [[L, M - 22], [L, T], [X[0], T]], i: -1 }, { p: [[X[0], T], [X[1], T]], i: 12 }, { p: [[X[1], T], [X[2], T]], i: 2 },
{ p: [[X[0], T], [X[0], B]], i: 0 }, { p: [[X[1], T], [X[1], B]], i: 1 }, { p: [[X[2], T], [X[2], B]], i: 2 },
{ p: [[X[2], B], [X[1], B]], i: 2 }, { p: [[X[1], B], [X[0], B]], i: 12 }, { p: [[X[0], B], [L, B], [L, M + 22]], i: -1 }];
} else {
X = [L + (Rr - L) * 0.55, Rr];
bulbs = [[L + (X[0] - L) * 0.5, T, 0], [X[0], M, 1], [X[1], M, 2]];
segs = [{ p: [[L, M - 22], [L, T], [X[0], T]], i: -1 }, { p: [[X[0], T], [X[1], T]], i: 2 },
{ p: [[X[0], T], [X[0], B]], i: 1 }, { p: [[X[1], T], [X[1], B]], i: 2 },
{ p: [[X[1], B], [X[0], B]], i: 2 }, { p: [[X[0], B], [L, B], [L, M + 22]], i: -1 }];
}
return { L: L, M: M, T: T, B: B, bulbs: bulbs, segs: segs };
}
function toggleBulb(k) {
S.out[k] = !S.out[k]; U.sound(S.out[k] ? 'pop' : 'tap');
U.say(S.out[k] ? 'Bulb ' + (k + 1) + ' removed' : 'Bulb ' + (k + 1) + ' back in');
U.check();
}
U.drag(C, {
down: function (p) {
var Ly = layout();
for (var k = 0; k < 3; k++) { var b = Ly.bulbs[k]; if (Math.hypot(p.x - b[0], p.y - b[1]) < 34) { toggleBulb(k); return false; } }
if (Math.hypot(p.x - Ly.L, p.y - Ly.M) < 34) { flip(); }
return false;
}
});
U.on(C.cv, 'keydown', function (e) {
if (e.key === '1' || e.key === '2' || e.key === '3') { toggleBulb(+e.key - 1); e.preventDefault(); }
if (e.key === 's' || e.key === 'S') { flip(); e.preventDefault(); }
});
function flip() { S.on = !S.on; swB.textContent = '🔌 Switch: ' + (S.on ? 'ON' : 'OFF'); U.sound('tick'); U.check(); }
segT = U.seg(U.ctrl, 'Wiring', [['series', '➖ Series'], ['parallel', '☰ Parallel'], ['mixed', '⊢ R₁ + (R₂ ∥ R₃)']], 'series', function (v) { S.top = v; U.check(); });
sV = U.slider(U.ctrl, { label: 'Battery emf ε', min: 1.5, max: 24, step: 0.5, value: 6, unit: 'V', onInput: function (v) { S.V = v; U.check(); } });
[0, 1, 2].forEach(function (k) {
sR.push(U.slider(U.ctrl, { label: 'Bulb ' + (k + 1) + ' resistance R' + '₁₂₃'.charAt(k), min: 1, max: 60, step: 1, value: S.R ? S.R[k] : 4, unit: 'Ω', onInput: function (v) { S.R[k] = v; U.check(); } }));
});
sr = U.slider(U.ctrl, { label: 'Internal resistance r', min: 0, max: 3, step: 0.1, value: 0, unit: 'Ω', onInput: function (v) { S.r = v; U.check(); } });
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
swB = U.button(bb, '🔌 Switch: ON', flip);
U.button(bb, '💡 All bulbs in', function () { S.out = [false, false, false]; U.sound('tap'); U.check(); });
set = U.readouts([['Req', 'Total resistance'], ['I', 'Battery current'], ['Vt', 'Terminal voltage'], ['Pt', 'Total power'],
['b1', 'Bulb 1 (V · I · P)'], ['b2', 'Bulb 2 (V · I · P)'], ['b3', 'Bulb 3 (V · I · P)']]);
function cfg(top, V) { return function () { S.top = top; segT.set(top); S.V = V; sV.set(V); S.r = 0; sr.set(0); S.out = [false, false, false]; S.on = true; swB.textContent = '🔌 Switch: ON'; }; }
U.guided([
{ title: 'Ohm’s law', xp: 10, setup: cfg('series', 6), t: 'Series circuit, 6 V battery. Set the three resistances so the current is exactly 0.50 A.',
hint: 'R = V/I = 6 / 0.5 = 12 Ω in total. In series the resistances simply add: e.g. 4 + 4 + 4 Ω.',
ok: 'R = V/I: 12 Ω in total gives 0.5 A.', check: function () { var s = solve(); return S.top === 'series' && Math.abs(s.I - 0.5) < 0.005; } },
{ title: 'Break the chain', xp: 10, t: 'Still in series: tap one bulb to unscrew it. What happens to the others?',
hint: 'Tap directly on a bulb in the picture (or press 1, 2 or 3).',
ok: 'In series there is only one path — one break stops the current everywhere, like old fairy lights.',
check: function () { return S.top === 'series' && (S.out[0] || S.out[1] || S.out[2]) && solve().I === 0; } },
{ title: 'Parallel paths', xp: 15, setup: cfg('parallel', 6), t: 'Now in parallel at 6 V. Choose resistances so the battery supplies 3.0 A in total.',
hint: 'Total R must be 6/3 = 2 Ω. For three equal bulbs R/3 = 2, so R = 6 Ω each. Or use 1/R = 1/R₁ + 1/R₂ + 1/R₃ with other values.',
ok: 'Each branch gets the full 6 V and the branch currents add up to 3 A.', check: function () { var s = solve(); return S.top === 'parallel' && Math.abs(s.I - 3) < 0.03; } },
{ title: 'Power', xp: 15, t: 'Keep parallel at 6 V. Make bulb 2 dissipate exactly 2.0 W.',
hint: 'In parallel bulb 2 has the full 6 V across it, so P = V²/R → R = 36 / 2 = 18 Ω.',
ok: 'P = V²/R = 36/18 = 2 W. Lower resistance in parallel means a brighter bulb!', check: function () { var s = solve(); return S.top === 'parallel' && Math.abs(s.P[1] - 2) < 0.05; } },
{ title: 'Share the voltage', xp: 20, setup: cfg('mixed', 12), t: 'Mixed circuit at 12 V: make the voltage across R₁ equal to the voltage across the parallel pair (6 V each).',
hint: 'Equal voltages need equal resistances: R₁ = R₂R₃/(R₂ + R₃). For example R₂ = R₃ = 20 Ω gives 10 Ω, so set R₁ = 10 Ω.',
ok: 'Voltage divides in proportion to resistance: equal resistances, equal shares.', check: function () { var s = solve(); return S.top === 'mixed' && s.I > 0 && Math.abs(s.Vb[0] - s.Vb[1]) < 0.05 && !S.out[1]; } }
]);
function polyLen(p) { var L = 0; for (var i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; }
function at(p, d) {
for (var i = 1; i < p.length; i++) {
var l = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
if (d <= l) { var f = d / (l || 1); return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * f, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * f]; }
d -= l;
}
return p[p.length - 1];
}
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h, Ly = layout(), s = solve(), k;
var bg = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.7);
bg.addColorStop(0, '#141d48'); bg.addColorStop(1, '#05081a');
x.fillStyle = bg; x.fillRect(0, 0, w, h);
x.fillStyle = 'rgba(140,160,255,.06)';
for (var gx = 10; gx < w; gx += 22) for (var gy = 10; gy < h; gy += 22) x.fillRect(gx, gy, 1.5, 1.5);
function cur(i) { return i === -1 ? s.I : i === 12 ? s.Ib[1] + s.Ib[2] : s.Ib[i]; }
x.lineCap = 'round'; x.lineJoin = 'round';
Ly.segs.forEach(function (sg) {
x.strokeStyle = cur(sg.i) > 0 ? '#c7a86b' : '#59607e'; x.lineWidth = 5;
x.beginPath(); sg.p.forEach(function (q, j) { if (j) x.lineTo(q[0], q[1]); else x.moveTo(q[0], q[1]); }); x.stroke();
});
if (!U.rm) phase += dt * 40;
var sp = 14;
x.fillStyle = '#ffe9a8';
Ly.segs.forEach(function (sg) {
var I = cur(sg.i); if (I <= 0) return;
var len = polyLen(sg.p), off = (phase * Math.min(4, I) * (U.rm ? 0 : 1)) % sp;
for (var d = off; d < len; d += sp) { var q = at(sg.p, d); x.beginPath(); x.arc(q[0], q[1], 2.3, 0, 2 * Math.PI); x.fill(); }
});
// battery + switch
var bx = Ly.L, by = Ly.M;
x.fillStyle = '#0b1030'; x.fillRect(bx - 26, by - 22, 52, 44);
x.strokeStyle = '#e8ecff'; x.lineWidth = 3;
x.beginPath(); x.moveTo(bx - 18, by - 8); x.lineTo(bx + 18, by - 8); x.stroke();
x.lineWidth = 6; x.beginPath(); x.moveTo(bx - 9, by + 8); x.lineTo(bx + 9, by + 8); x.stroke();
x.fillStyle = '#ffb86b'; x.font = '700 12px system-ui,sans-serif'; x.fillText('+', bx + 20, by - 4); x.fillText('−', bx + 14, by + 20);
x.fillStyle = '#e8ecff'; x.font = '12px system-ui,sans-serif'; x.textAlign = 'center';
x.fillText(S.V + ' V', bx, by - 28);
x.fillText(S.on ? 'switch ON' : 'switch OFF', bx, by + 38);
for (k = 0; k < 3; k++) {
var b = Ly.bulbs[k], X = b[0], Y = b[1], P = s.P[k], br = S.on ? Math.min(1, P / 6) : 0;
if (br > 0.01 && !S.out[k]) {
var gl = x.createRadialGradient(X, Y, 2, X, Y, 26 + 60 * br);
gl.addColorStop(0, 'rgba(255,236,150,' + (0.35 + 0.6 * br) + ')'); gl.addColorStop(1, 'rgba(255,200,80,0)');
x.fillStyle = gl; x.beginPath(); x.arc(X, Y, 26 + 60 * br, 0, 2 * Math.PI); x.fill();
}
x.fillStyle = S.out[k] ? '#20253f' : 'rgb(' + Math.round(60 + 195 * br) + ',' + Math.round(62 + 170 * br) + ',' + Math.round(90 + 40 * br) + ')';
x.strokeStyle = S.out[k] ? '#ff7b8b' : '#dfe4ff'; x.lineWidth = 2;
x.beginPath(); x.arc(X, Y, 17, 0, 2 * Math.PI); x.fill(); x.stroke();
x.beginPath(); x.moveTo(X - 9, Y - 9); x.lineTo(X + 9, Y + 9); x.moveTo(X + 9, Y - 9); x.lineTo(X - 9, Y + 9); x.stroke();
x.fillStyle = '#e8ecff'; x.font = '600 12px system-ui,sans-serif';
var lx = X, ly = Y - 26;
if (Y > h * 0.8) ly = Y + 34;
if (X > w - 70) { x.textAlign = 'right'; lx = X - 24; ly = Y - 30; }
x.fillText((S.out[k] ? '✖ ' : '') + 'R' + (k + 1) + ' ' + S.R[k] + ' Ω', lx, ly);
x.font = '11px system-ui,sans-serif'; x.fillStyle = '#b9c2ee';
x.fillText(U.f(s.Ib[k], 2) + ' A · ' + U.f(P, 2) + ' W', lx, ly + 14);
x.textAlign = 'center';
}
x.textAlign = 'left';
x.fillStyle = '#ffe2b8'; x.font = '600 13px system-ui,sans-serif';
x.fillText('I = ' + U.f(s.I, 3) + ' A', 10, 18);
}
reset();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++;
if (U.lp && fr % 2) return;
draw(dt);
if (fr % 8 === 0) {
var s = solve();
set('Req', isFinite(s.Req) ? U.f(s.Req, 2) + ' Ω' : '∞ (open)'); set('I', U.f(s.I, 3) + ' A'); set('Vt', U.f(s.Vt, 2) + ' V');
set('Pt', U.f(s.I * s.Vt, 2) + ' W');
for (var k = 0; k < 3; k++) set('b' + (k + 1), U.f(s.Vb[k], 2) + ' V · ' + U.f(s.Ib[k], 3) + ' A · ' + U.f(s.P[k], 2) + ' W');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'circuit', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

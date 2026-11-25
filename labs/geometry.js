/* VidyaVerse University — Triangle geometry lab (labs/geometry.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'geometry';
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
var META = { id: ID, title: 'Triangle geometry lab', icon: '📐', faculty: 'school', bands: ['primary', 'middle', 'secondary', 'senior'],
summary: 'Drag the corners of a triangle and watch sides, angles, area, Pythagoras’ squares, circumcircle, incircle, medians and altitudes update live.' };
var NM = ['A', 'B', 'C'];
function mount(el, api) {
var S = {}, C, set, tg = {}, sel = 0, drag = -1;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Discover the rules every triangle obeys by building your own.',
free: 'Drag A, B and C (or focus the picture, press 1/2/3 to pick a corner and use the arrow keys). Turn on constructions to see the hidden centres of a triangle.',
css: '%P .vvt-t{display:flex;flex-wrap:wrap;gap:6px}%P .vvt-t button[aria-pressed=true]{background:rgba(255,184,107,.25);border-color:#ffb86b}',
note: '<p><b>Angle sum:</b> A + B + C = 180°. <b>Cosine rule:</b> a² = b² + c² − 2bc cos A (used here to find the angles). <b>Area</b> = ½ × base × height = ½|x<sub>A</sub>(y<sub>B</sub> − y<sub>C</sub>) + x<sub>B</sub>(y<sub>C</sub> − y<sub>A</sub>) + x<sub>C</sub>(y<sub>A</sub> − y<sub>B</sub>)|.</p>' +
'<p><b>Pythagoras:</b> in a right-angled triangle the square on the hypotenuse equals the sum of the squares on the other two sides.</p>' +
'<p><b>Centres:</b> circumcentre O (perpendicular bisectors meet; equidistant from the corners), incentre I (angle bisectors meet; centre of the inscribed circle, r = Area ÷ s), centroid G (medians meet; the balance point, ⅔ of the way down each median), orthocentre H (altitudes meet). O, G and H always lie on one straight line — the Euler line — with HG = 2·GO.</p>' +
'<p><b>Simplified:</b> measurements are rounded for display; with “snap” on, corners sit on a 0.5-unit grid, so some shapes (like a perfect equilateral triangle) can only be approximated.</p>',
onReset: function () { reset(); }
});
function reset() { S.P = [[-3, -2], [3, -2], [0, 2.5]]; S.snap = true; Object.keys(tg).forEach(function (k) { tg[k].set(k === 'snap' || k === 'ang' || k === 'len'); }); }
function d(p, q) { return Math.hypot(p[0] - q[0], p[1] - q[1]); }
function info() {
var A = S.P[0], B = S.P[1], Cc = S.P[2], a = d(B, Cc), b = d(Cc, A), c = d(A, B);
var ar = Math.abs(A[0] * (B[1] - Cc[1]) + B[0] * (Cc[1] - A[1]) + Cc[0] * (A[1] - B[1])) / 2;
function ang(o, p, q) { var v = (p * p + q * q - o * o) / (2 * p * q); return Math.acos(U.clamp(v, -1, 1)) * 180 / Math.PI; }
var an = [ang(a, b, c), ang(b, c, a), ang(c, a, b)];
var D = 2 * (A[0] * (B[1] - Cc[1]) + B[0] * (Cc[1] - A[1]) + Cc[0] * (A[1] - B[1])), O = null;
if (Math.abs(D) > 1e-9) {
var a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = Cc[0] * Cc[0] + Cc[1] * Cc[1];
O = [(a2 * (B[1] - Cc[1]) + b2 * (Cc[1] - A[1]) + c2 * (A[1] - B[1])) / D, (a2 * (Cc[0] - B[0]) + b2 * (A[0] - Cc[0]) + c2 * (B[0] - A[0])) / D];
}
var per = a + b + c, I = [(a * A[0] + b * B[0] + c * Cc[0]) / per, (a * A[1] + b * B[1] + c * Cc[1]) / per];
var G = [(A[0] + B[0] + Cc[0]) / 3, (A[1] + B[1] + Cc[1]) / 3], H = O ? [A[0] + B[0] + Cc[0] - 2 * O[0], A[1] + B[1] + Cc[1] - 2 * O[1]] : null;
var mx = Math.max.apply(null, an), s3 = [a, b, c].sort(function (p, q) { return p - q; });
var eq = (s3[2] - s3[0]) / s3[2] < 0.02, iso = !eq && ((s3[1] - s3[0]) / s3[1] < 0.005 || (s3[2] - s3[1]) / s3[2] < 0.005);
return { s: [a, b, c], an: an, ar: ar, per: per, O: O, R: O ? d(O, A) : NaN, I: I, r: ar / (per / 2), G: G, H: H, mx: mx, eq: eq, iso: iso || eq,
kind: (eq ? 'equilateral' : iso ? 'isosceles' : 'scalene') + ', ' + (Math.abs(mx - 90) <= 0.5 ? 'right-angled' : mx > 90 ? 'obtuse' : 'acute') };
}
function V() { var u = Math.min(C.w / 13, C.h / 10); return { u: u, ox: C.w / 2, oy: C.h / 2 }; }
function toS(p) { var v = V(); return [v.ox + p[0] * v.u, v.oy - p[1] * v.u]; }
function toW(x, y) { var v = V(); return [(x - v.ox) / v.u, (v.oy - y) / v.u]; }
function place(i, p) {
var v = V(), lx = (C.w / 2) / v.u - 0.3, ly = (C.h / 2) / v.u - 0.3;
p = [U.clamp(p[0], -lx, lx), U.clamp(p[1], -ly, ly)];
if (S.snap) p = [Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2];
S.P[i] = p; U.check();
}
C = U.canvas(U.stage, { ratio: 0.72, min: 280, label: 'Triangle ABC. Drag a corner to move it.' });
U.drag(C, {
down: function (p) {
var best = -1, bd = 40;
for (var i = 0; i < 3; i++) { var s = toS(S.P[i]), dd = Math.hypot(p.x - s[0], p.y - s[1]); if (dd < bd) { bd = dd; best = i; } }
if (best < 0) return false; drag = best; sel = best; U.sound('tap');
},
move: function (p) { if (drag >= 0) place(drag, toW(p.x, p.y)); },
up: function () { drag = -1; U.sound('tick'); }
});
U.on(C.cv, 'keydown', function (e) {
var k = e.key, st = S.snap ? 0.5 : 0.1, q = S.P[sel].slice();
if (k === '1' || k === '2' || k === '3') { sel = +k - 1; U.sound('tap'); e.preventDefault(); return; }
if (k === 'a' || k === 'b' || k === 'c') { sel = 'abc'.indexOf(k); e.preventDefault(); return; }
if (k === 'ArrowLeft') q[0] -= st; else if (k === 'ArrowRight') q[0] += st; else if (k === 'ArrowUp') q[1] += st; else if (k === 'ArrowDown') q[1] -= st; else return;
place(sel, q); e.preventDefault();
});
var box = U.h('div', { cls: 'vvt-t' }); U.ctrl.appendChild(box);
[['snap', '🧲 Snap to grid'], ['len', '📏 Side lengths'], ['ang', '∠ Angles'], ['sq', '⬛ Pythagoras squares'], ['circ', '⭕ Circumcircle'], ['inc', '🔵 Incircle'], ['med', '⚖️ Medians & centroid'], ['alt', '⊥ Altitudes'], ['eul', '➖ Euler line']].forEach(function (q) {
var b = U.h('button', { 'aria-pressed': 'false', text: q[1] });
var o = { v: false, set: function (v) { o.v = v; b.setAttribute('aria-pressed', v ? 'true' : 'false'); if (q[0] === 'snap') S.snap = v; } };
U.on(b, 'click', function () { o.set(!o.v); U.sound('tap'); U.check(); });
tg[q[0]] = o; box.appendChild(b);
});
set = U.readouts([['a', 'a = BC'], ['b', 'b = CA'], ['c', 'c = AB'], ['A', '∠A'], ['B', '∠B'], ['C', '∠C'], ['sum', 'Angle sum'], ['ar', 'Area'], ['per', 'Perimeter'], ['k', 'Type']]);
function start(P, show) { return function () { S.P = P; Object.keys(tg).forEach(function (k) { tg[k].set(k === 'snap' || k === 'ang' || k === 'len' || (show && show.indexOf(k) >= 0)); }); }; }
U.guided([
{ title: 'Right angle', xp: 10, setup: start([[-3, -2], [2, -2], [0, 2]], ['sq']), t: 'Drag the corners to make a right-angled triangle (one angle exactly 90°). Watch the squares on the sides.',
hint: 'Put two corners on the same horizontal grid line and the third directly above one of them. Try a 3-by-4 triangle!',
ok: 'Right angle! The big square’s area equals the two smaller squares added together: a² + b² = c².', check: function () { return Math.abs(info().mx - 90) <= 0.5; } },
{ title: 'Pythagoras', xp: 10, t: 'A right-angled triangle has shorter sides 5 cm and 12 cm. How long is the hypotenuse?', ask: { ph: 'hypotenuse', unit: 'cm' },
hint: 'c² = 5² + 12² = 25 + 144.', ok: '√169 = 13 cm. (5, 12, 13) is a Pythagorean triple, like (3, 4, 5).', answer: function (v) { return Math.abs(parseFloat(v) - 13) < 0.01; } },
{ title: 'Isosceles, area 12', xp: 15, setup: start([[-3, -2], [2, -2], [0, 2]]), t: 'Make an isosceles triangle (two equal sides) with an area of exactly 12 square units.',
hint: 'Area = ½ × base × height. A base of 6 and a height of 4 works: put the top corner directly above the middle of the base.',
ok: 'Isosceles with area ½ × 6 × 4 = 12. The two base angles are equal too!', check: function () { var I = info(); return I.iso && Math.abs(I.ar - 12) < 0.05; } },
{ title: 'Equilateral', xp: 15, t: 'Make a (nearly) equilateral triangle — all three sides within 2% of each other.',
hint: 'Height of an equilateral triangle = side × √3/2 ≈ 0.866 × side. With base 4 the top goes about 3.5 above the middle.',
ok: 'All sides equal means all angles are 60° (180° ÷ 3).', check: function () { return info().eq; } },
{ title: 'Where is the centre?', xp: 20, setup: start([[-3, -2], [3, -2], [0, 2.5]], ['circ']), t: 'With the circumcircle on, make an obtuse triangle (one angle over 95°). Where does the circumcentre O go?',
hint: 'Flatten the triangle: drag C down towards the base, so the angle at C becomes wide.',
ok: 'In an obtuse triangle the circumcentre lies OUTSIDE the triangle; in a right triangle it sits on the hypotenuse’s midpoint.', check: function () { return info().mx > 95 && tg.circ.v; } }
]);
function dot(x, p, col, r, lab) { var s = toS(p); x.fillStyle = col; x.beginPath(); x.arc(s[0], s[1], r, 0, 6.283); x.fill(); if (lab) { x.fillStyle = col; x.fillText(lab, s[0] + 7, s[1] - 7); } }
function seg(x, p, q, col, w, dash) { var a = toS(p), b = toS(q); x.strokeStyle = col; x.lineWidth = w; x.setLineDash(dash || []); x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); x.setLineDash([]); }
function foot(p, a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1); return [a[0] + t * dx, a[1] + t * dy]; }
function draw() {
var x = C.ctx, w = C.w, h = C.h, v = V(), I = info(), P = S.P, i;
x.fillStyle = '#080c20'; x.fillRect(0, 0, w, h);
x.lineWidth = 1;
for (var gx = v.ox % v.u; gx < w; gx += v.u) { x.strokeStyle = 'rgba(160,175,255,.09)'; x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, h); x.stroke(); }
for (var gy = v.oy % v.u; gy < h; gy += v.u) { x.beginPath(); x.moveTo(0, gy); x.lineTo(w, gy); x.stroke(); }
x.strokeStyle = 'rgba(160,175,255,.25)'; x.beginPath(); x.moveTo(0, v.oy); x.lineTo(w, v.oy); x.moveTo(v.ox, 0); x.lineTo(v.ox, h); x.stroke();
x.font = '600 12px system-ui,sans-serif';
if (tg.sq.v) {
var cols = ['rgba(124,156,255,.22)', 'rgba(74,222,128,.22)', 'rgba(255,122,168,.22)'];
for (i = 0; i < 3; i++) {
var p = P[(i + 1) % 3], q = P[(i + 2) % 3], o = P[i], dx = q[0] - p[0], dy = q[1] - p[1], nx = -dy, ny = dx;
if ((o[0] - p[0]) * nx + (o[1] - p[1]) * ny > 0) { nx = -nx; ny = -ny; }
var pts = [p, q, [q[0] + nx, q[1] + ny], [p[0] + nx, p[1] + ny]].map(toS);
x.fillStyle = cols[i]; x.strokeStyle = cols[i].replace('.22', '.7'); x.beginPath(); pts.forEach(function (s, k) { if (k) x.lineTo(s[0], s[1]); else x.moveTo(s[0], s[1]); }); x.closePath(); x.fill(); x.stroke();
var cc = toS([(p[0] + q[0]) / 2 + nx / 2, (p[1] + q[1]) / 2 + ny / 2]); x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText(U.f(I.s[i] * I.s[i], 2), cc[0], cc[1] + 4); x.textAlign = 'left';
}
}
var s0 = P.map(toS), gr = x.createLinearGradient(s0[0][0], s0[0][1], s0[2][0], s0[2][1]);
gr.addColorStop(0, 'rgba(124,156,255,.35)'); gr.addColorStop(1, 'rgba(164,107,255,.35)');
x.fillStyle = gr; x.strokeStyle = '#c9d4ff'; x.lineWidth = 2.5; x.lineJoin = 'round';
x.beginPath(); x.moveTo(s0[0][0], s0[0][1]); x.lineTo(s0[1][0], s0[1][1]); x.lineTo(s0[2][0], s0[2][1]); x.closePath(); x.fill(); x.stroke();
if (tg.circ.v && I.O) { var so = toS(I.O); x.strokeStyle = 'rgba(255,184,107,.8)'; x.lineWidth = 1.6; x.beginPath(); x.arc(so[0], so[1], I.R * v.u, 0, 6.283); x.stroke(); dot(x, I.O, '#ffb86b', 4, 'O'); }
if (tg.inc.v) { var si = toS(I.I); x.strokeStyle = 'rgba(110,200,255,.85)'; x.lineWidth = 1.6; x.beginPath(); x.arc(si[0], si[1], I.r * v.u, 0, 6.283); x.stroke(); dot(x, I.I, '#6ec8ff', 4, 'I'); }
if (tg.med.v) { for (i = 0; i < 3; i++) seg(x, P[i], [(P[(i + 1) % 3][0] + P[(i + 2) % 3][0]) / 2, (P[(i + 1) % 3][1] + P[(i + 2) % 3][1]) / 2], 'rgba(74,222,128,.7)', 1.4, [5, 4]); dot(x, I.G, '#4ade80', 4, 'G'); }
if (tg.alt.v && I.H) { for (i = 0; i < 3; i++) { var f = foot(P[i], P[(i + 1) % 3], P[(i + 2) % 3]); seg(x, P[i], f, 'rgba(255,122,168,.75)', 1.4, [3, 4]); seg(x, P[(i + 1) % 3], f, 'rgba(255,122,168,.25)', 1, [2, 4]); } dot(x, I.H, '#ff7aa8', 4, 'H'); }
if (tg.eul.v && I.O && I.H && d(I.O, I.H) > 0.01) { var dx2 = I.H[0] - I.O[0], dy2 = I.H[1] - I.O[1], L = 40 / Math.hypot(dx2, dy2); seg(x, [I.O[0] - dx2 * L, I.O[1] - dy2 * L], [I.O[0] + dx2 * L, I.O[1] + dy2 * L], 'rgba(255,255,255,.5)', 1.2); dot(x, I.O, '#ffb86b', 3); dot(x, I.G, '#4ade80', 3); dot(x, I.H, '#ff7aa8', 3); }
for (i = 0; i < 3; i++) {
var p0 = P[i], p1 = P[(i + 1) % 3], p2 = P[(i + 2) % 3], sp = toS(p0);
var a1 = Math.atan2(-(p1[1] - p0[1]), p1[0] - p0[0]), a2 = Math.atan2(-(p2[1] - p0[1]), p2[0] - p0[0]);
if (tg.ang.v) {
var r = Math.min(26, v.u * 0.8), da = a2 - a1; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
if (Math.abs(I.an[i] - 90) <= 0.5) { var u1 = [Math.cos(a1) * 12, Math.sin(a1) * 12], u2 = [Math.cos(a2) * 12, Math.sin(a2) * 12]; x.strokeStyle = '#ffe28a'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(sp[0] + u1[0], sp[1] + u1[1]); x.lineTo(sp[0] + u1[0] + u2[0], sp[1] + u1[1] + u2[1]); x.lineTo(sp[0] + u2[0], sp[1] + u2[1]); x.stroke(); }
else { x.strokeStyle = '#ffe28a'; x.lineWidth = 1.6; x.beginPath(); x.arc(sp[0], sp[1], r, a1, a1 + da, da < 0); x.stroke(); }
var mid = a1 + da / 2; x.fillStyle = '#ffe28a'; x.textAlign = 'center'; x.fillText(I.an[i].toFixed(1) + '°', sp[0] + Math.cos(mid) * (r + 18), sp[1] + Math.sin(mid) * (r + 18) + 4); x.textAlign = 'left';
}
if (tg.len.v) {
var m = toS([(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]), cen = toS(I.G), ox = m[0] - cen[0], oy = m[1] - cen[1], ol = Math.hypot(ox, oy) || 1;
x.fillStyle = '#e8ecff'; x.textAlign = 'center'; x.fillText('abc'.charAt(i) + ' = ' + I.s[i].toFixed(2), m[0] + ox / ol * 16, m[1] + oy / ol * 16 + 4); x.textAlign = 'left';
}
var rg = x.createRadialGradient(sp[0] - 3, sp[1] - 3, 1, sp[0], sp[1], 12);
rg.addColorStop(0, '#fff'); rg.addColorStop(1, i === sel ? '#ffb86b' : '#7c9cff');
x.fillStyle = rg; x.beginPath(); x.arc(sp[0], sp[1], drag === i ? 12 : 9, 0, 6.283); x.fill();
x.fillStyle = '#fff'; x.font = '700 14px system-ui,sans-serif';
var cen2 = toS(I.G), vx = sp[0] - cen2[0], vy = sp[1] - cen2[1], vl = Math.hypot(vx, vy) || 1;
x.fillText(NM[i], sp[0] + vx / vl * 18 - 5, sp[1] + vy / vl * 18 + 5); x.font = '600 12px system-ui,sans-serif';
}
}
reset();
U.G.begin();
var fr = 0;
U.loop(function () {
fr++; if (U.lp && fr % 2) return;
draw();
if (fr % 6 === 0) {
var I = info();
set('a', U.f(I.s[0], 3)); set('b', U.f(I.s[1], 3)); set('c', U.f(I.s[2], 3));
set('A', U.f(I.an[0], 1) + '°'); set('B', U.f(I.an[1], 1) + '°'); set('C', U.f(I.an[2], 1) + '°');
set('sum', U.f(I.an[0] + I.an[1] + I.an[2], 1) + '°'); set('ar', U.f(I.ar, 2) + ' units²'); set('per', U.f(I.per, 2) + ' units'); set('k', I.ar < 1e-6 ? 'flat (no area)' : I.kind);
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'geometry', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

/* VidyaVerse University — Fraction pizza (labs/fraction-pizza.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'fraction-pizza';
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
var META = { id: ID, title: 'Fraction pizza', icon: '🍕', faculty: 'school', bands: ['primary', 'middle'],
summary: 'Cut two pizzas into equal slices, tap slices to make fractions, and discover equivalent fractions, comparing and adding — with decimals and percentages.' };
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
function simp(n, d) { var g = gcd(n, d); return [n / g, d / g]; }
function mount(el, api) {
var S = {}, C, set, sumB, pop = [0, 0];
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Understand fractions by cutting and sharing pizza!',
free: 'Use the + and − buttons to cut each pizza into equal slices, then tap slices to colour them. Turn on “Add A + B” to see the sum.',
css: '%P .vvf-p{display:grid;grid-template-columns:auto 1fr;gap:6px 10px;align-items:center;margin:8px 0}%P .vvf-p b{font-size:1.05em}%P .vvf-p .vvk-btns button{min-width:48px}',
note: '<p>A <b>fraction</b> n/d means: cut the whole into d <b>equal</b> parts and take n of them. The bottom number (denominator) says how many equal slices; the top (numerator) says how many we have.</p>' +
'<p><b>Equivalent fractions</b> cover the same amount of pizza: 1/2 = 2/4 = 4/8 (multiply top and bottom by the same number). To <b>compare</b> or <b>add</b>, rewrite both with a common denominator: 2/3 = 10/15 and 3/5 = 9/15, so 2/3 is bigger; 1/4 + 1/2 = 1/4 + 2/4 = 3/4.</p>' +
'<p>Decimal = n ÷ d; percentage = decimal × 100. <b>Simplified:</b> real pizzas are never cut perfectly equally — in maths, the slices of a fraction must be exactly equal.</p>',
onReset: function () { reset(); }
});
function reset() { S.P = [{ d: 4, on: [] }, { d: 8, on: [] }]; S.sum = false; if (sumB) sumB.setAttribute('aria-pressed', 'false'); }
function nOf(i) { return S.P[i].on.length; }
function val(i) { return nOf(i) / S.P[i].d; }
function setD(i, d) { d = U.clamp(d, 1, 12); var P = S.P[i]; P.d = d; P.on = P.on.filter(function (k) { return k < d; }); U.sound('tap'); U.check(); }
function setN(i, n) { var P = S.P[i]; n = U.clamp(n, 0, P.d); P.on = []; for (var k = 0; k < n; k++) P.on.push(k); U.sound('pop'); U.check(); }
function toggle(i, k) {
var P = S.P[i], j = P.on.indexOf(k);
if (j >= 0) P.on.splice(j, 1); else P.on.push(k);
pop[i] = 1; U.sound(j >= 0 ? 'tap' : 'pop');
if (U.kids) U.say(nOf(i) + ' out of ' + P.d);
U.check();
}
C = U.canvas(U.stage, { ratio: 0.55, min: 260, scroll: true, label: 'Two pizzas. Tap a slice to colour it.' });
function geo(i) {
var w = C.w, h = C.h, wide = w > h * 1.1, r = wide ? Math.min(w / 4.6, h / 2.5) : Math.min(w / 2.4, h / 4.8);
return wide ? { cx: w * (i ? 0.75 : 0.25), cy: h * 0.48, r: r } : { cx: w / 2, cy: h * (i ? 0.73 : 0.25), r: r };
}
U.drag(C, {
down: function (p) {
for (var i = 0; i < 2; i++) {
var g = geo(i), dx = p.x - g.cx, dy = p.y - g.cy, dist = Math.hypot(dx, dy);
if (dist <= g.r * 1.08) { var a = Math.atan2(dy, dx) + Math.PI / 2; if (a < 0) a += 2 * Math.PI; toggle(i, Math.floor(a / (2 * Math.PI / S.P[i].d)) % S.P[i].d); return false; }
}
return false;
}
});
var focusP = 0;
U.on(C.cv, 'keydown', function (e) {
var k = e.key;
if (k === 'Tab') return;
if (k === 'a' || k === 'A') focusP = 0; else if (k === 'b' || k === 'B') focusP = 1;
else if (k === 'ArrowUp') setN(focusP, nOf(focusP) + 1); else if (k === 'ArrowDown') setN(focusP, nOf(focusP) - 1);
else if (k === 'ArrowRight') setD(focusP, S.P[focusP].d + 1); else if (k === 'ArrowLeft') setD(focusP, S.P[focusP].d - 1); else return;
e.preventDefault();
});
['A', 'B'].forEach(function (nm, i) {
var g = U.h('div', { cls: 'vvf-p' });
g.appendChild(U.h('b', { text: '🍕 Pizza ' + nm }));
g.appendChild(U.h('span'));
g.appendChild(U.h('span', { cls: 'vvk-small', text: 'Slices' }));
var b1 = U.h('div', { cls: 'vvk-btns' }); g.appendChild(b1);
U.button(b1, '−', function () { setD(i, S.P[i].d - 1); }).setAttribute('aria-label', 'Fewer slices on pizza ' + nm);
U.button(b1, '+', function () { setD(i, S.P[i].d + 1); }).setAttribute('aria-label', 'More slices on pizza ' + nm);
g.appendChild(U.h('span', { cls: 'vvk-small', text: 'Coloured' }));
var b2 = U.h('div', { cls: 'vvk-btns' }); g.appendChild(b2);
U.button(b2, '−', function () { setN(i, nOf(i) - 1); }).setAttribute('aria-label', 'Colour one fewer slice on pizza ' + nm);
U.button(b2, '+', function () { setN(i, nOf(i) + 1); }).setAttribute('aria-label', 'Colour one more slice on pizza ' + nm);
U.ctrl.appendChild(g);
});
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
sumB = U.button(bb, '➕ Add A + B', function () { S.sum = !S.sum; sumB.setAttribute('aria-pressed', S.sum ? 'true' : 'false'); U.sound('tap'); });
sumB.setAttribute('aria-pressed', 'false');
U.button(bb, '🧹 Clear slices', function () { S.P[0].on = []; S.P[1].on = []; U.sound('whoosh'); });
set = U.readouts([['a', 'Pizza A'], ['b', 'Pizza B'], ['cmp', 'Compare'], ['s', 'A + B']]);
function cfg(d0, d1) { return function () { S.P[0] = { d: d0, on: [] }; S.P[1] = { d: d1, on: [] }; }; }
U.guided([
{ title: 'Three quarters', xp: 10, setup: cfg(1, 1), t: 'Cut pizza A into 4 equal slices and colour 3 of them to show 3/4.',
hint: 'Press + next to “Slices” until pizza A has 4 slices, then tap 3 slices.', ok: 'That is three quarters: 3 of 4 equal parts.',
check: function () { return S.P[0].d === 4 && nOf(0) === 3; } },
{ title: 'Same amount', xp: 15, setup: cfg(2, 1), t: 'Pizza A is cut in half. Colour 1 slice of A, then make pizza B show the same amount using 8 slices.',
hint: 'Half of 8 slices is 4 slices. So 1/2 = 4/8.', ok: '1/2 = 4/8 — equivalent fractions are the same amount of pizza!',
check: function () { return S.P[0].d === 2 && nOf(0) === 1 && S.P[1].d === 8 && nOf(1) === 4; } },
{ title: 'Which is bigger?', xp: 15, setup: cfg(1, 1), t: 'Make pizza A show 2/3 and pizza B show 3/5. Which one is more pizza?',
hint: 'Set A to 3 slices and colour 2; set B to 5 slices and colour 3. Then look at the Compare reading.', ok: '2/3 is bigger: 2/3 = 10/15 but 3/5 = 9/15.',
check: function () { return S.P[0].d === 3 && nOf(0) === 2 && S.P[1].d === 5 && nOf(1) === 3; } },
{ title: 'Add them', xp: 15, setup: cfg(4, 2), t: 'What is 1/4 + 1/2? Show the answer on pizza A (it is cut in quarters).',
hint: 'One half is the same as two quarters. So 1/4 + 2/4 = ? quarters.', ok: '1/4 + 2/4 = 3/4. Same-size slices make adding easy!',
check: function () { return Math.abs(val(0) - 0.75) < 1e-9; } },
{ title: 'Percent', xp: 15, setup: cfg(8, 1), t: 'Colour 3 of the 8 slices on pizza A. What percentage of the pizza is that?',
ask: { ph: 'percent', unit: '%' }, hint: '3 ÷ 8 = 0.375. Multiply by 100 to get a percentage.', ok: '3/8 = 0.375 = 37.5%.',
answer: function (v) { return Math.abs(parseFloat(v) - 37.5) < 0.01; } }
]);
var tops = []; for (var k = 0; k < 40; k++) tops.push([Math.sqrt((k + 0.5) / 40) * 0.8, k * 2.39996, k % 5 === 0 ? 1 : 0]);
function pizza(x, i, dt) {
var g = geo(i), P = S.P[i], d = P.d, step = 2 * Math.PI / d, k;
pop[i] = Math.max(0, pop[i] - dt * 3);
for (k = 0; k < d; k++) {
var on = P.on.indexOf(k) >= 0, a0 = -Math.PI / 2 + k * step, a1 = a0 + step, mid = (a0 + a1) / 2, off = on ? g.r * (0.05 + (U.rm ? 0 : 0.03 * pop[i])) : 0;
var cx = g.cx + Math.cos(mid) * off * (d > 1 ? 1 : 0), cy = g.cy + Math.sin(mid) * off * (d > 1 ? 1 : 0);
x.save(); x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, g.r, a0, a1); x.closePath(); x.clip();
x.fillStyle = on ? '#c46a1e' : '#4a3a35'; x.fillRect(cx - g.r, cy - g.r, g.r * 2, g.r * 2);
var ch = x.createRadialGradient(cx, cy, g.r * 0.1, cx, cy, g.r * 0.88);
ch.addColorStop(0, on ? '#ffe27a' : '#6b6070'); ch.addColorStop(1, on ? '#ffb13b' : '#57505e');
x.fillStyle = ch; x.beginPath(); x.arc(cx, cy, g.r * 0.86, 0, 6.283); x.fill();
tops.forEach(function (t) {
var px = cx + Math.cos(t[1]) * t[0] * g.r, py = cy + Math.sin(t[1]) * t[0] * g.r;
x.fillStyle = t[2] ? (on ? '#3f9a3a' : '#556') : (on ? '#d83a2e' : '#6a5560'); x.beginPath(); x.arc(px, py, g.r * (t[2] ? 0.04 : 0.075), 0, 6.283); x.fill();
});
x.restore();
if (d > 1) { x.strokeStyle = '#1a1230'; x.lineWidth = 2.5; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, g.r, a0, a1); x.closePath(); x.stroke(); }
}
if (d === 1) { x.strokeStyle = '#1a1230'; x.lineWidth = 2; x.beginPath(); x.arc(g.cx, g.cy, g.r, 0, 6.283); x.stroke(); }
var n = nOf(i), sm = simp(n, d);
x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '700 ' + Math.round(Math.max(16, g.r * 0.26)) + 'px system-ui,sans-serif';
var ty = g.cy - g.r - 12;
if (ty < 20) ty = g.cy + g.r + Math.max(18, g.r * 0.26);
x.fillText((i ? 'B: ' : 'A: ') + n + '/' + d + (sm[1] !== d && n ? '  = ' + sm[0] + '/' + sm[1] : ''), g.cx, ty);
x.textAlign = 'left';
}
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h;
var bg = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.7); bg.addColorStop(0, '#2a1d45'); bg.addColorStop(1, '#0b0a1d');
x.fillStyle = bg; x.fillRect(0, 0, w, h);
pizza(x, 0, dt); pizza(x, 1, dt);
var a = nOf(0) * S.P[1].d, b = nOf(1) * S.P[0].d, sg = a > b ? '>' : a < b ? '<' : '=';
var g0 = geo(0), g1 = geo(1);
x.fillStyle = '#ffd86b'; x.font = '800 ' + Math.round(Math.max(24, g0.r * 0.4)) + 'px system-ui,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
x.fillText(sg, (g0.cx + g1.cx) / 2, (g0.cy + g1.cy) / 2);
x.textBaseline = 'alphabetic';
if (S.sum) {
var D = S.P[0].d * S.P[1].d / gcd(S.P[0].d, S.P[1].d), N = nOf(0) * D / S.P[0].d + nOf(1) * D / S.P[1].d, sm = simp(N, D), whole = Math.floor(sm[0] / sm[1]), rem = sm[0] % sm[1];
x.font = '600 14px system-ui,sans-serif'; x.fillStyle = '#e8ecff';
x.fillText(nOf(0) + '/' + S.P[0].d + ' + ' + nOf(1) + '/' + S.P[1].d + ' = ' + (nOf(0) * D / S.P[0].d) + '/' + D + ' + ' + (nOf(1) * D / S.P[1].d) + '/' + D + ' = ' + N + '/' + D +
(sm[1] !== D ? ' = ' + sm[0] + '/' + sm[1] : '') + (whole && rem ? ' = ' + whole + ' ' + rem + '/' + sm[1] : ''), w / 2, h - 12);
}
x.textAlign = 'left';
}
reset();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++; if (U.lp && fr % 2) return;
draw(U.lp ? dt * 2 : dt);
if (fr % 6 === 0) {
[0, 1].forEach(function (i) { var n = nOf(i), d = S.P[i].d; set(i ? 'b' : 'a', n + '/' + d + ' = ' + U.f(n / d, 3) + ' = ' + U.f(n / d * 100, 1) + '%'); });
var a = nOf(0) * S.P[1].d, b = nOf(1) * S.P[0].d;
set('cmp', 'A ' + (a > b ? '>' : a < b ? '<' : '=') + ' B  (' + a + '/' + (S.P[0].d * S.P[1].d) + ' vs ' + b + '/' + (S.P[0].d * S.P[1].d) + ')');
set('s', U.f(val(0) + val(1), 3));
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'fraction-pizza', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

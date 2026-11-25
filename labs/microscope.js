/* VidyaVerse University — Virtual microscope (labs/microscope.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'microscope';
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
var META = { id: ID, title: 'Virtual microscope', icon: '🔬', faculty: 'school', bands: ['middle', 'secondary', 'senior', 'ug'],
summary: 'Use a realistic light microscope: choose slides, switch objectives, focus with coarse and fine knobs, adjust light and oil, and measure real cell sizes.' };
var OBJ = [[4, 4500, 40, 0], [10, 1800, 10, 2], [40, 450, 1.5, 3], [100, 180, 0.6, 1.2]]; // mag, field of view µm, depth of field µm, parfocal offset µm
var SLIDES = [['e', '🔤 Letter e'], ['onion', '🧅 Onion skin'], ['cheek', '👄 Cheek cells'], ['blood', '🩸 Blood smear'], ['pond', '💧 Pond water']];
function hsh(i, j, s) { var n = Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453; return n - Math.floor(n); }
function mount(el, api) {
var S = {}, C, segS, segO, sCo, sFi, sLi, sDi, oilB, set, off = document.createElement('canvas'), oc = off.getContext('2d'), dirty = true;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Focus like a scientist: low power first, then fine focus at high power — and measure what you see.',
free: 'Drag the view to move the slide (or use the arrow keys on the picture). Always start on 4×, focus, centre what you want, then switch up.',
note: '<p><b>Total magnification</b> = eyepiece (10×) × objective. <b>Field of view</b> ≈ field number (18 mm) ÷ objective magnification, so it shrinks as you zoom in: 4.5 mm, 1.8 mm, 450 µm, 180 µm.</p>' +
'<p><b>Depth of field</b> gets very thin at high power (≈ 40 µm at 4×, under 1 µm at 100×), so only the fine-focus knob is used at 40× and 100×. The objectives are <b>parfocal</b>: the image stays nearly in focus when you switch.</p>' +
'<p>The 100× objective needs a drop of <b>immersion oil</b>, which has nearly the same refractive index as glass and stops light bending away. The image is <b>inverted</b> — look at the letter e!</p>' +
'<p><b>Simplified:</b> specimens are drawn procedurally at realistic sizes (onion cells ≈ 250 × 70 µm, cheek cells ≈ 55 µm, red blood cells ≈ 7.5 µm, white blood cells ≈ 12–14 µm, Paramecium ≈ 200 µm) but are not photographs. Paramecia here swim slower than real ones (~1 mm/s).</p>',
onReset: function () { reset(); }
});
function reset() {
S.slide = 'e'; S.o = 0; S.co = 0; S.fi = 0; S.light = 70; S.dia = 60; S.oil = false; S.px = 0; S.py = 0; S.t = 0; S.z0 = 300 + Math.round(Math.random() * 300); S.found = 0; S.tapWbc = false;
if (segS) { segS.set('e'); segO.set(0); sCo.set(0); sFi.set(0); sLi.set(70); sDi.set(60); oilB.setAttribute('aria-pressed', 'false'); coarseLock(); }
dirty = true;
}
function O() { return OBJ[S.o]; }
function err() { return Math.abs(S.co + S.fi - (S.z0 + O()[3])); }
function sharp() { return err() / O()[2] < 0.6 && !(S.o === 3 && !S.oil); }
function blur() { var b = Math.min(16, err() / O()[2] * 1.6); if (S.o === 3 && !S.oil) b = Math.max(b, 9); return b < 0.5 ? 0 : b; }
function coarseLock() { var lk = S.o >= 2; sCo.input.disabled = lk; sCo.el.style.opacity = lk ? 0.5 : 1; }
C = U.canvas(U.stage, { ratio: 0.8, min: 300, maxVh: 0.7, label: 'Microscope view. Drag to move the slide.', onResize: function () { dirty = true; } });
function geo() { var D = Math.min(C.w, C.h) - 16; return { D: D, cx: C.w / 2, cy: C.h / 2, ppu: D / O()[1] }; }
var last = null;
U.drag(C, {
down: function (p) { last = p; if (S.slide === 'blood' && S.o >= 2) tapCheck(p); },
move: function (p) { var g = geo(); S.px -= (p.x - last.x) / g.ppu; S.py -= (p.y - last.y) / g.ppu; S.px = U.clamp(S.px, -3000, 3000); S.py = U.clamp(S.py, -3000, 3000); last = p; dirty = true; },
up: function () { U.check(); }
});
U.on(C.cv, 'keydown', function (e) {
var g = geo(), st = O()[1] / 20, k = e.key;
if (k === 'ArrowLeft') S.px -= st; else if (k === 'ArrowRight') S.px += st; else if (k === 'ArrowUp') S.py -= st; else if (k === 'ArrowDown') S.py += st; else return;
dirty = true; e.preventDefault();
});
function wbcAt(wx, wy) {
var gi = Math.floor(wx / 60), gj = Math.floor(wy / 60);
for (var a = gi - 1; a <= gi + 1; a++) for (var b = gj - 1; b <= gj + 1; b++) {
if (hsh(a, b, 5) < 0.15) { var X = (a + 0.2 + 0.6 * hsh(a, b, 6)) * 60, Y = (b + 0.2 + 0.6 * hsh(a, b, 7)) * 60; if (Math.hypot(wx - X, wy - Y) < 9) return [X, Y]; }
}
return null;
}
function tapCheck(p) {
var g = geo(), wx = S.px + (p.x - g.cx) / g.ppu, wy = S.py + (p.y - g.cy) / g.ppu;
if (wbcAt(wx, wy)) { if (sharp()) { S.tapWbc = true; S.found++; U.sound('good'); U.say('White blood cell found! It has a lobed nucleus and fights infection.'); } else { U.sound('bad'); U.say('Focus first — it is too blurry to be sure.'); } U.check(); }
}
segS = U.seg(U.ctrl, 'Slide', SLIDES, 'e', function (v) { S.slide = v; S.px = 0; S.py = 0; dirty = true; U.check(); });
segO = U.seg(U.ctrl, 'Objective lens (eyepiece 10×)', OBJ.map(function (q, i) { return [i, q[0] + '×']; }), 0, function (v) {
if (v === 3 && !S.oil) U.say('Add immersion oil before using the 100× objective.');
S.o = v; coarseLock(); dirty = true; U.sound('tick'); U.check();
});
sCo = U.slider(U.ctrl, { label: 'Coarse focus (stage height)', min: 0, max: 1000, step: 5, value: 0, unit: 'µm', onInput: function (v) { S.co = v; dirty = true; U.check(); } });
sFi = U.slider(U.ctrl, { label: 'Fine focus', min: -20, max: 20, step: 0.1, value: 0, fmt: function (v) { return (v > 0 ? '+' : '') + v.toFixed(1) + ' µm'; }, onInput: function (v) { S.fi = v; dirty = true; U.check(); } });
sLi = U.slider(U.ctrl, { label: 'Light intensity', min: 5, max: 100, step: 1, value: 70, unit: '%', onInput: function (v) { S.light = v; dirty = true; } });
sDi = U.slider(U.ctrl, { label: 'Iris diaphragm (open = brighter, closed = more contrast)', min: 5, max: 100, step: 1, value: 60, unit: '%', onInput: function (v) { S.dia = v; dirty = true; } });
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
oilB = U.button(bb, '🛢️ Immersion oil', function () { S.oil = !S.oil; oilB.setAttribute('aria-pressed', S.oil ? 'true' : 'false'); U.sound('pop'); dirty = true; U.check(); });
oilB.setAttribute('aria-pressed', 'false');
U.button(bb, '🎯 Centre slide', function () { S.px = 0; S.py = 0; dirty = true; });
set = U.readouts([['mag', 'Total magnification'], ['fov', 'Field of view'], ['dof', 'Depth of field'], ['foc', 'Focus'], ['pos', 'Stage position']]);
function slideTo(v) { S.slide = v; segS.set(v); S.px = 0; S.py = 0; dirty = true; }
U.guided([
{ title: 'Low power first', xp: 10, setup: function () { slideTo('e'); S.o = 0; segO.set(0); coarseLock(); },
t: 'Put the letter-e slide on, use the 4× objective and turn the coarse focus until the image is sharp.',
hint: 'Slide the coarse focus slowly from 0 upwards; the image sharpens somewhere between 300 and 600 µm. Watch the “Focus” reading.',
ok: 'Sharp! Notice the e is upside down AND back-to-front: a microscope inverts the image.', check: function () { return S.slide === 'e' && S.o === 0 && sharp(); } },
{ title: 'Magnification', xp: 10, t: 'With the 10× eyepiece, what is the total magnification using the 40× objective?', ask: { ph: 'total magnification', unit: '×' },
hint: 'Multiply: eyepiece × objective.', ok: '10 × 40 = 400× total magnification.', answer: function (v) { return parseFloat(v) === 400; } },
{ title: 'High power', xp: 15, setup: function () { slideTo('onion'); S.o = 1; segO.set(1); coarseLock(); },
t: 'Onion skin: focus at 10× with the coarse knob, then switch to 40× and sharpen using only the fine focus.',
hint: 'At 40× the coarse knob is locked (it could crash the lens into the slide). Nudge fine focus a few µm either way.',
ok: 'You can now see the cell walls and a nucleus in each brick-shaped cell.', check: function () { return S.slide === 'onion' && S.o === 2 && sharp(); } },
{ title: 'Measure a cell', xp: 15, setup: function () { slideTo('cheek'); S.o = 1; segO.set(1); coarseLock(); },
t: 'Cheek cells: focus at 10×, then switch to 40×, where the field of view is 450 µm across. Focus, estimate how many cells would fit across it, and work out the width of one cell in µm.',
ask: { ph: 'cell width', unit: 'µm' }, hint: 'Cell size ≈ field of view ÷ number of cells across. Use the scale bar to check.',
ok: 'Human cheek cells are about 50–60 µm across — 20 of them side by side make one millimetre.', wrong: 'Hmm — count again. About 8 cells span 450 µm.',
answer: function (v) { v = parseFloat(v); return v >= 35 && v <= 85; } },
{ title: 'Oil immersion', xp: 20, setup: function () { slideTo('blood'); S.o = 1; segO.set(1); coarseLock(); S.tapWbc = false; },
t: 'Blood smear: focus at 10×, add immersion oil, switch to 100×, fine-focus, then find and tap a white blood cell (the larger cell with a purple, lobed nucleus).',
hint: 'Oil first, then 100×, then fine focus. Drag the slide around — white cells are much rarer than red ones (here about 1 in 60; in real blood about 1 in 600).',
ok: 'Found one! Red cells have no nucleus; white cells do, and they defend you against infection.', check: function () { return S.slide === 'blood' && S.o === 3 && S.oil && S.tapWbc; } }
]);
function forGrid(x0, y0, x1, y1, sz, f) { for (var i = Math.floor(x0 / sz); i <= Math.floor(x1 / sz); i++) for (var j = Math.floor(y0 / sz); j <= Math.floor(y1 / sz); j++) f(i, j); }
function specimen(c, x0, y0, x1, y1, ppu, u) {
var sl = S.slide;
c.fillStyle = sl === 'onion' ? '#f3e6b4' : sl === 'blood' ? '#f6e3e6' : sl === 'cheek' ? '#eef3f7' : sl === 'pond' ? '#e8f3ea' : '#f7f4ea';
c.fillRect(x0, y0, x1 - x0, y1 - y0);
if (sl === 'e') {
c.strokeStyle = 'rgba(150,140,120,.35)'; c.lineWidth = 6;
forGrid(x0, y0, x1, y1, 400, function (i, j) { var a = hsh(i, j, 1) * 6.28, X = i * 400 + 200, Y = j * 400 + 200; c.beginPath(); c.moveTo(X, Y); c.lineTo(X + Math.cos(a) * 380, Y + Math.sin(a) * 380); c.stroke(); });
c.save(); c.rotate(Math.PI); c.fillStyle = '#1b1b22'; c.font = '700 1400px Georgia,"Times New Roman",serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('e', 0, -100); c.restore();
} else if (sl === 'onion') {
c.lineWidth = Math.max(4, u * 1.5); c.strokeStyle = '#a07a2a';
for (var row = Math.floor(y0 / 70); row <= Math.floor(y1 / 70); row++) {
var sh = (row % 2) * 125 + hsh(row, 0, 2) * 60;
for (var i = Math.floor((x0 - sh) / 250); i <= Math.floor((x1 - sh) / 250); i++) {
var X = i * 250 + sh, Y = row * 70;
c.fillStyle = 'rgba(214,170,70,' + (0.25 + 0.2 * hsh(i, row, 3)) + ')'; c.fillRect(X, Y, 250, 70); c.strokeRect(X, Y, 250, 70);
var nx = X + 40 + 170 * hsh(i, row, 4), ny = Y + 22 + 26 * hsh(i, row, 5);
c.fillStyle = '#7a4f12'; c.beginPath(); c.ellipse(nx, ny, 11, 8, 0, 0, 6.283); c.fill();
c.fillStyle = '#3b2405'; c.beginPath(); c.arc(nx + 2, ny - 1, 2.5, 0, 6.283); c.fill();
}
}
} else if (sl === 'cheek') {
forGrid(x0 - 60, y0 - 60, x1 + 60, y1 + 60, 110, function (i, j) {
if (hsh(i, j, 1) > 0.6) return;
var X = (i + 0.5) * 110 + (hsh(i, j, 2) - 0.5) * 40, Y = (j + 0.5) * 110 + (hsh(i, j, 3) - 0.5) * 40, r0 = 25 + 6 * hsh(i, j, 4);
c.beginPath();
for (var k = 0; k < 8; k++) { var a = k / 8 * 6.283 + hsh(i, j, 5), r = r0 * (0.85 + 0.3 * hsh(i * 3 + k, j, 6)); if (k) c.lineTo(X + Math.cos(a) * r, Y + Math.sin(a) * r); else c.moveTo(X + Math.cos(a) * r, Y + Math.sin(a) * r); }
c.closePath(); c.fillStyle = 'rgba(110,160,215,.35)'; c.fill(); c.strokeStyle = 'rgba(40,90,170,.6)'; c.lineWidth = Math.max(1, u); c.stroke();
c.fillStyle = '#1f4fa0'; c.beginPath(); c.ellipse(X + (hsh(i, j, 7) - 0.5) * 10, Y + (hsh(i, j, 8) - 0.5) * 10, 5, 4, 0, 0, 6.283); c.fill();
if (ppu > 1.5) { c.fillStyle = 'rgba(30,60,140,.6)'; for (k = 0; k < 6; k++) c.fillRect(X - 20 + 40 * hsh(i, j, 10 + k), Y - 20 + 40 * hsh(i, j, 20 + k), 1.2, 1.2); }
});
} else if (sl === 'blood') {
if (7.5 * ppu < 3) { c.fillStyle = 'rgba(200,70,90,.45)'; c.fillRect(x0, y0, x1 - x0, y1 - y0); return; }
forGrid(x0 - 9, y0 - 9, x1 + 9, y1 + 9, 9, function (i, j) {
var X = i * 9 + 4.5 + (hsh(i, j, 1) - 0.5) * 3, Y = j * 9 + 4.5 + (hsh(i, j, 2) - 0.5) * 3;
if (wbcAt(X, Y)) return;
c.fillStyle = '#d4566a'; c.beginPath(); c.arc(X, Y, 3.75, 0, 6.283); c.fill();
c.fillStyle = '#ec97a3'; c.beginPath(); c.arc(X, Y, 1.6, 0, 6.283); c.fill();
if (hsh(i, j, 3) < 0.08) { c.fillStyle = '#7d4fa8'; c.beginPath(); c.arc(X + 5, Y + 4, 1.1, 0, 6.283); c.fill(); }
});
forGrid(x0 - 60, y0 - 60, x1 + 60, y1 + 60, 60, function (a, b) {
if (hsh(a, b, 5) >= 0.15) return;
var X = (a + 0.2 + 0.6 * hsh(a, b, 6)) * 60, Y = (b + 0.2 + 0.6 * hsh(a, b, 7)) * 60;
c.fillStyle = '#e3d3ee'; c.beginPath(); c.arc(X, Y, 6.5, 0, 6.283); c.fill();
c.fillStyle = '#5b2a8a'; [[-2.4, -1], [0.6, -2.2], [2.2, 1.4]].forEach(function (q) { c.beginPath(); c.arc(X + q[0], Y + q[1], 2, 0, 6.283); c.fill(); });
});
} else {
for (var f = 0; f < 4; f++) {
var fy = -900 + f * 600, fx0 = -2500;
c.fillStyle = 'rgba(120,190,110,.35)'; c.fillRect(fx0, fy, 5000, 30);
c.strokeStyle = '#2f8f3a'; c.lineWidth = 5; c.beginPath(); c.moveTo(fx0, fy + 15);
for (var q = 0; q < 250; q++) c.lineTo(fx0 + q * 20, fy + (q % 2 ? 4 : 26)); c.stroke();
c.strokeStyle = 'rgba(40,110,50,.5)'; c.lineWidth = 2; for (q = 0; q < 50; q++) { c.beginPath(); c.moveTo(fx0 + q * 100, fy); c.lineTo(fx0 + q * 100, fy + 30); c.stroke(); }
}
for (var n = 0; n < 6; n++) {
var t = S.t * 0.15 + n * 1.7, X = Math.sin(t * 0.7 + n) * 900, Y = Math.cos(t * 0.5 + n * 2) * 700, ang = Math.atan2(-Math.sin(t * 0.5 + n * 2) * 0.5 * 700, Math.cos(t * 0.7 + n) * 0.7 * 900);
if (X < x0 - 150 || X > x1 + 150 || Y < y0 - 150 || Y > y1 + 150) continue;
c.save(); c.translate(X, Y); c.rotate(ang);
c.fillStyle = 'rgba(200,170,120,.55)'; c.beginPath(); c.ellipse(0, 0, 100, 28, 0, 0, 6.283); c.fill();
c.strokeStyle = 'rgba(120,90,50,.8)'; c.lineWidth = 2; c.stroke();
c.strokeStyle = 'rgba(120,90,50,.5)'; c.lineWidth = 1;
for (var k = 0; k < 40; k++) { var a = k / 40 * 6.283, wv = Math.sin(S.t * 20 + k) * 3; c.beginPath(); c.moveTo(Math.cos(a) * 100, Math.sin(a) * 28); c.lineTo(Math.cos(a) * (108 + wv), Math.sin(a) * (34 + wv)); c.stroke(); }
c.fillStyle = 'rgba(110,70,40,.7)'; c.beginPath(); c.ellipse(5, 0, 18, 10, 0, 0, 6.283); c.fill();
c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(-60, 0, 7 + 3 * Math.sin(S.t * 3 + n), 0, 6.283); c.fill(); c.beginPath(); c.arc(60, 0, 7, 0, 6.283); c.fill();
c.restore();
}
}
}
function render() {
var x = C.ctx, w = C.w, h = C.h, g = geo(), b = blur(), f = 1 / (1 + b * 0.45), dpr = C.dpr;
var px = Math.max(16, Math.ceil(g.D * f * dpr));
if (off.width !== px) { off.width = px; off.height = px; }
var k = px / g.D, s = g.ppu * k;
oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, px, px);
oc.setTransform(s, 0, 0, s, px / 2 - S.px * s, px / 2 - S.py * s);
var half = g.D / 2 / g.ppu;
specimen(oc, S.px - half, S.py - half, S.px + half, S.py + half, g.ppu, 1 / s);
x.fillStyle = '#04060f'; x.fillRect(0, 0, w, h);
x.save(); x.beginPath(); x.arc(g.cx, g.cy, g.D / 2, 0, 6.283); x.clip();
x.imageSmoothingEnabled = true; x.drawImage(off, g.cx - g.D / 2, g.cy - g.D / 2, g.D, g.D);
if (b > 3 && !U.lp) { x.globalAlpha = 0.5; x.drawImage(off, g.cx - g.D / 2 - b, g.cy - g.D / 2, g.D, g.D); x.drawImage(off, g.cx - g.D / 2 + b, g.cy - g.D / 2 + b * 0.5, g.D, g.D); x.globalAlpha = 1; }
var bright = S.light / 100 * (0.55 + 0.45 * S.dia / 100);
x.fillStyle = 'rgba(255,255,255,' + (S.dia / 100 * 0.28) + ')'; x.fillRect(g.cx - g.D / 2, g.cy - g.D / 2, g.D, g.D);
x.fillStyle = 'rgba(0,0,0,' + U.clamp(1 - bright, 0, 0.95) + ')'; x.fillRect(g.cx - g.D / 2, g.cy - g.D / 2, g.D, g.D);
var vg = x.createRadialGradient(g.cx, g.cy, g.D * 0.3, g.cx, g.cy, g.D / 2);
vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)'); x.fillStyle = vg; x.fillRect(g.cx - g.D / 2, g.cy - g.D / 2, g.D, g.D);
x.restore();
x.strokeStyle = 'rgba(160,175,255,.4)'; x.lineWidth = 3; x.beginPath(); x.arc(g.cx, g.cy, g.D / 2 + 2, 0, 6.283); x.stroke();
var fov = O()[1], nice = [1000, 500, 200, 100, 50, 20, 10].filter(function (v) { return v <= fov / 3.5; })[0] || 10, bl = nice * g.ppu;
x.fillStyle = '#fff'; x.fillRect(g.cx + g.D * 0.12, g.cy + g.D * 0.36, bl, 3);
x.font = '600 12px system-ui,sans-serif'; x.fillText(nice >= 1000 ? nice / 1000 + ' mm' : nice + ' µm', g.cx + g.D * 0.12, g.cy + g.D * 0.36 - 5);
x.fillStyle = '#ffe2b8'; x.fillText((O()[0] * 10) + '×', 10, 20);
if (S.o === 3 && !S.oil) { x.fillStyle = '#ff9aa8'; x.fillText('No oil: light scatters, image dim and blurry', 10, h - 10); }
}
reset();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++; S.t += dt;
if (S.slide === 'pond' && !U.rm) dirty = true;
if (dirty && !(U.lp && fr % 2)) { dirty = false; render(); }
if (fr % 8 === 0) {
var e = err(), q = O();
set('mag', (q[0] * 10) + '× (10 × ' + q[0] + ')'); set('fov', q[1] >= 1000 ? q[1] / 1000 + ' mm' : q[1] + ' µm'); set('dof', '≈ ' + q[2] + ' µm');
set('foc', sharp() ? '✅ sharp' : e / q[2] < 3 ? '〰️ nearly' : '🌫️ blurry'); set('pos', Math.round(S.px) + ', ' + Math.round(S.py) + ' µm');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'microscope', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

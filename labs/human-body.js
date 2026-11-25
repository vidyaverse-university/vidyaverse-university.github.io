/* VidyaVerse University — Human body explorer (labs/human-body.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'human-body';
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
var META = { id: ID, title: 'Human body explorer', icon: '🫀', faculty: 'school', bands: ['primary', 'middle', 'secondary', 'senior'],
summary: 'Explore the organs of six body systems, then exercise the body and watch heart rate, cardiac output and breathing respond.' };
// id: [name, system, colour, what it does, hit ellipses [x,y,rx,ry] in body units]
var ORG = {
brain: ['Brain', 'nerv', '#f2a0c8', 'Control centre of the nervous system: about 86 billion neurons handle thinking, memory, senses and movement, and keep breathing and heartbeat going.', [[0, -0.88, 0.085, 0.065]]],
cord: ['Spinal cord', 'nerv', '#ffd86b', 'A thick bundle of nerves inside the backbone carrying messages between brain and body; it also handles fast reflexes.', [[0, -0.4, 0.018, 0.3]]],
nerves: ['Nerves', 'nerv', '#ffe9a0', 'Cable-like bundles of neurons. Sensory nerves bring information in; motor nerves carry commands to muscles.', [[-0.26, -0.3, 0.04, 0.2], [0.26, -0.3, 0.04, 0.2], [-0.09, 0.45, 0.035, 0.3], [0.09, 0.45, 0.035, 0.3]]],
heart: ['Heart', 'circ', '#ff4d6d', 'A muscular pump with four chambers. The right side pumps blood to the lungs, the left side to the whole body. It sits slightly to the left of centre.', [[0.035, -0.43, 0.048, 0.045]]],
vessels: ['Blood vessels', 'circ', '#ff7a8a', 'Arteries carry blood away from the heart, veins return it, and tiny capillaries let oxygen and nutrients pass into tissues.', [[-0.24, -0.32, 0.035, 0.2], [0.24, -0.32, 0.035, 0.2], [-0.085, 0.45, 0.03, 0.3], [0.085, 0.45, 0.03, 0.3]]],
trachea: ['Trachea (windpipe)', 'resp', '#9fd3ff', 'A tube held open by C-shaped rings of cartilage that carries air from the throat to the lungs.', [[0, -0.665, 0.02, 0.055]]],
lungs: ['Lungs', 'resp', '#7fb6ff', 'Spongy organs with about 300–500 million alveoli, where oxygen diffuses into the blood and carbon dioxide leaves it.', [[-0.1, -0.47, 0.075, 0.13], [0.11, -0.47, 0.065, 0.13]]],
diaphragm: ['Diaphragm', 'resp', '#c9a0ff', 'A dome-shaped muscle under the lungs. When it contracts and flattens, the chest gets bigger and air rushes in.', [[0, -0.33, 0.17, 0.018]]],
oeso: ['Oesophagus', 'dig', '#ffb48a', 'A muscular tube that pushes swallowed food to the stomach by waves of contraction (peristalsis).', [[0.012, -0.5, 0.018, 0.14]]],
stomach: ['Stomach', 'dig', '#ff9f5a', 'A stretchy muscular bag that churns food with acid (pH ≈ 1.5–3.5) and the enzyme pepsin to start digesting protein.', [[0.075, -0.27, 0.055, 0.045]]],
liver: ['Liver', 'dig', '#b0543c', 'The largest internal organ: makes bile to break up fats, stores glycogen, and cleans toxins from the blood.', [[-0.07, -0.29, 0.1, 0.05]]],
pancreas: ['Pancreas', 'dig', '#ffd28a', 'Makes digestive enzymes for the small intestine and the hormones insulin and glucagon that control blood sugar.', [[0.03, -0.215, 0.055, 0.016]]],
small: ['Small intestine', 'dig', '#ffc0a0', 'About 6 m long. Finger-like villi absorb digested food into the blood — most absorption happens here.', [[0, -0.1, 0.075, 0.06]]],
large: ['Large intestine', 'dig', '#d98a6a', 'About 1.5 m long. It absorbs water and salts, and its helpful bacteria make some vitamins; what is left leaves as faeces.', [[0, -0.1, 0.125, 0.1]]],
kidneys: ['Kidneys', 'uri', '#c0392b', 'Two bean-shaped filters near the back. They clean the blood (about 180 litres a day) and make urine from waste and extra water.', [[-0.07, -0.2, 0.03, 0.045], [0.07, -0.2, 0.03, 0.045]]],
bladder: ['Bladder', 'uri', '#f5d76e', 'A stretchy bag that stores urine until you go to the toilet; it usually holds about 400–600 mL.', [[0, 0.03, 0.04, 0.03]]],
skull: ['Skull', 'skel', '#f4ecd8', 'Bones that protect the brain and shape the face. Only the lower jaw can move.', [[0, -0.88, 0.1, 0.08]]],
ribs: ['Rib cage', 'skel', '#f4ecd8', '12 pairs of ribs that protect the heart and lungs and move when you breathe.', [[0, -0.45, 0.16, 0.14]]],
spine: ['Spine (vertebral column)', 'skel', '#f4ecd8', '33 vertebrae (some fused) that hold you upright and protect the spinal cord.', [[0, -0.3, 0.022, 0.36]]],
pelvis: ['Pelvis', 'skel', '#f4ecd8', 'A bowl of bones that supports the body’s weight and links the spine to the legs.', [[0, 0.03, 0.13, 0.05]]],
femur: ['Femur (thigh bone)', 'skel', '#f4ecd8', 'The longest and strongest bone in the body.', [[-0.08, 0.28, 0.03, 0.2], [0.08, 0.28, 0.03, 0.2]]],
humerus: ['Humerus (upper arm)', 'skel', '#f4ecd8', 'Upper arm bone; it joins the shoulder to the elbow.', [[-0.22, -0.44, 0.03, 0.14], [0.22, -0.44, 0.03, 0.14]]]
};
var SYS = [['all', '🧍 Main organs'], ['skel', '🦴 Skeleton'], ['circ', '❤️ Circulation'], ['resp', '🫁 Breathing'], ['dig', '🍎 Digestion'], ['uri', '💧 Urinary'], ['nerv', '🧠 Nervous']];
var ALL = ['brain', 'lungs', 'heart', 'liver', 'stomach', 'small', 'large', 'kidneys', 'bladder', 'trachea'];
var ORDER = ['oeso', 'stomach', 'small', 'large'];
function mount(el, api) {
var S = { sys: 'all', sel: null, I: 0, age: 20, t: 0, beat: 0, br: 0, seq: [] }, C, segS, sI, sAge, info, set;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Find the organs, learn their jobs, and see how the body responds to exercise.',
free: 'Switch body systems and tap any organ. Move the activity slider to see the heart and lungs work harder. (Note: the picture faces you, so the body’s left is on your right.)',
css: '%P .vvh-i h5{margin:0 0 4px;font-size:1.12em;color:#ffd7a8}%P .vvh-i p{margin:4px 0}',
note: '<p><b>Cardiac output</b> = heart rate × stroke volume. At rest ≈ 70 beats/min × 70 mL ≈ 4.9 L/min; in hard exercise it can rise to 20 L/min or more in fit young adults.</p>' +
'<p><b>Maximum heart rate</b> is estimated with the rule of thumb 220 − age (individuals vary by ±10–20 beats/min). Stroke volume here rises from 70 mL to ~100 mL and then levels off; breathing rate (12 → 45 /min) and tidal volume (0.5 → 2.5 L) set the minute ventilation.</p>' +
'<p><b>Simplified:</b> organ shapes and positions are schematic and not to scale; numbers are typical values for a healthy adult, not medical targets. General education, not medical advice — see a doctor about chest pain, breathlessness or fainting. Emergency (India): 112.</p>',
onReset: function () { S.sys = 'all'; S.sel = null; S.I = 0; S.age = 20; S.seq = []; segS.set('all'); sI.set(0); sAge.set(20); showInfo(); }
});
function vis() { return S.sys === 'all' ? ALL : Object.keys(ORG).filter(function (k) { return ORG[k][1] === S.sys; }); }
function phys() {
var max = 220 - S.age, i = S.I / 100, hr = 70 + (max - 70) * i, sv = 70 + 30 * Math.min(1, i / 0.5);
var rr = 12 + 33 * i, tv = 0.5 + 2.0 * Math.pow(i, 1.2);
return { max: max, hr: hr, sv: sv, co: hr * sv / 1000, rr: rr, tv: tv, ve: rr * tv };
}
C = U.canvas(U.stage, { ratio: 0.9, min: 340, maxVh: 0.78, scroll: true, label: 'Human body diagram. Tap an organ.' });
segS = U.seg(U.ctrl, 'Body system', SYS, 'all', function (v) { S.sys = v; S.sel = null; showInfo(); U.check(); });
sI = U.slider(U.ctrl, { label: 'Activity level', min: 0, max: 100, step: 1, value: 0, fmt: function (v) { return v + '% ' + (v < 10 ? '(resting)' : v < 40 ? '(walking)' : v < 70 ? '(jogging)' : '(sprinting)'); }, onInput: function (v) { S.I = v; U.check(); } });
sAge = U.slider(U.ctrl, { label: 'Age', min: 10, max: 80, step: 1, value: 20, unit: 'years', onInput: function (v) { S.age = v; U.check(); } });
info = U.h('div', { cls: 'vvh-i', 'aria-live': 'polite' }); U.ctrl.appendChild(info);
set = U.readouts([['hr', 'Heart rate'], ['max', 'Max heart rate (220 − age)'], ['sv', 'Stroke volume'], ['co', 'Cardiac output'], ['rr', 'Breathing rate'], ['ve', 'Air breathed per minute']]);
function showInfo() {
info.innerHTML = '';
if (!S.sel) { info.appendChild(U.h('p', { cls: 'vvk-small', text: 'Tap an organ in the picture (or focus the picture and use ←/→) to learn about it.' })); return; }
var o = ORG[S.sel]; info.appendChild(U.h('h5', { text: o[0] })); info.appendChild(U.h('p', { text: o[3] }));
}
function pick(id) {
S.sel = id; U.sound('pop'); U.say(ORG[id][0] + '. ' + ORG[id][3]); showInfo();
if (S.sys === 'dig' || S.sys === 'all') { if (ORDER.indexOf(id) >= 0) { S.seq.push(id); if (S.seq.length > 4) S.seq.shift(); } }
U.check();
}
function g() { var s = Math.min(C.h / 2.15, C.w / 1.05); return { s: s, cx: C.w / 2, cy: C.h / 2 + 0.02 * s }; }
function area(id) { return Math.min.apply(null, ORG[id][4].map(function (e) { return e[2] * e[3]; })); }
function locate(p) {
var G = g(), ux = (p.x - G.cx) / G.s, uy = (p.y - G.cy) / G.s, mn = 16 / G.s;
var L = vis().slice().sort(function (a, b) { return area(a) - area(b); });
for (var i = 0; i < L.length; i++) {
var hs = ORG[L[i]][4];
for (var j = 0; j < hs.length; j++) { var e = hs[j], rx = Math.max(mn, e[2]), ry = Math.max(mn, e[3]); if (Math.pow((ux - e[0]) / rx, 2) + Math.pow((uy - e[1]) / ry, 2) <= 1) return L[i]; }
}
return null;
}
U.drag(C, { down: function (p) { var id = locate(p); if (id) pick(id); return false; } });
U.on(C.cv, 'keydown', function (e) {
if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
var L = vis(), i = L.indexOf(S.sel); i = (i + (e.key === 'ArrowRight' ? 1 : L.length - 1)) % L.length; if (i < 0) i = 0; pick(L[i]); e.preventDefault();
});
U.guided([
{ title: 'The pump', xp: 10, setup: function () { S.sys = 'all'; segS.set('all'); }, t: 'Find the organ that pumps blood around the body.',
hint: 'It is in the chest between the lungs, a little to the body’s left (your right).', ok: 'The heart beats about 100 000 times a day!', check: function () { return S.sel === 'heart'; } },
{ title: 'Blood filters', xp: 10, setup: function () { S.sys = 'uri'; segS.set('uri'); S.sel = null; showInfo(); }, t: 'Find the organs that filter the blood and make urine.',
hint: 'Two bean-shaped organs near the back, just above the waist.', ok: 'The kidneys filter about 180 litres of blood plasma every day.', check: function () { return S.sel === 'kidneys'; } },
{ title: 'Food’s journey', xp: 15, setup: function () { S.sys = 'dig'; segS.set('dig'); S.seq = []; S.sel = null; showInfo(); }, t: 'Tap the digestive organs in the order food passes through them: four taps from the mouth onwards.',
hint: 'Oesophagus → stomach → small intestine → large intestine.', ok: 'Perfect order: food is mixed, digested, absorbed, and then water is reclaimed.',
check: function () { return S.seq.join() === ORDER.join(); } },
{ title: 'Work out', xp: 15, setup: function () { S.age = 20; sAge.set(20); S.I = 0; sI.set(0); }, t: 'A 20-year-old starts exercising. Raise the activity until cardiac output reaches at least 15 L/min.',
hint: 'Cardiac output = heart rate × stroke volume. With about 100 mL per beat you need about 150 beats per minute.', ok: 'Muscles need much more oxygen during exercise, so the heart pumps 3–4 times more blood.',
check: function () { return phys().co >= 15; } },
{ title: 'Calculate', xp: 15, t: 'A resting heart beats 70 times a minute and pumps 70 mL each beat. What is the cardiac output in litres per minute?',
ask: { ph: 'litres per minute', unit: 'L/min' }, hint: '70 × 70 mL = 4900 mL. Divide by 1000 to get litres.', ok: '4.9 L/min — roughly all of your blood (about 5 L) goes round once every minute.',
answer: function (v) { return Math.abs(parseFloat(v) - 4.9) < 0.06; } }
]);
function E(x, G, cx, cy, rx, ry) { x.beginPath(); x.ellipse(G.cx + cx * G.s, G.cy + cy * G.s, Math.max(0.5, rx * G.s), Math.max(0.5, ry * G.s), 0, 0, 2 * Math.PI); }
function line(x, G, pts, col, w) { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); pts.forEach(function (q, i) { var X = G.cx + q[0] * G.s, Y = G.cy + q[1] * G.s; if (i) x.lineTo(X, Y); else x.moveTo(X, Y); }); x.stroke(); }
function limbs(f) { [-1, 1].forEach(function (s) { f([[s * 0.18, -0.6], [s * 0.24, -0.3], [s * 0.29, 0.02]]); f([[s * 0.08, 0.06], [s * 0.09, 0.5], [s * 0.1, 0.92]]); }); }
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h, G = g(), P = phys(), s = G.s, L = vis(), k;
var bg = x.createRadialGradient(w / 2, h * 0.4, 10, w / 2, h / 2, Math.max(w, h) * 0.75);
bg.addColorStop(0, '#1b2558'); bg.addColorStop(1, '#060918'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
// silhouette
x.fillStyle = '#2a3572'; x.strokeStyle = 'rgba(150,180,255,.55)'; x.lineWidth = 2;
x.shadowColor = 'rgba(120,150,255,.5)'; x.shadowBlur = U.lp ? 0 : 20;
limbs(function (pts) { line(x, G, pts, '#2a3572', 0.1 * s); });
x.shadowBlur = 0;
E(x, G, 0, -0.87, 0.11, 0.11); x.fillStyle = '#2a3572'; x.fill(); x.stroke();
x.fillRect(G.cx - 0.04 * s, G.cy - 0.78 * s, 0.08 * s, 0.12 * s);
x.beginPath(); x.moveTo(G.cx - 0.2 * s, G.cy - 0.64 * s); x.quadraticCurveTo(G.cx, G.cy - 0.7 * s, G.cx + 0.2 * s, G.cy - 0.64 * s);
x.lineTo(G.cx + 0.16 * s, G.cy + 0.1 * s); x.quadraticCurveTo(G.cx, G.cy + 0.14 * s, G.cx - 0.16 * s, G.cy + 0.1 * s); x.closePath(); x.fill(); x.stroke();
// physiology timing
if (!U.rm) { S.beat = (S.beat + dt * P.hr / 60) % 1; S.br = (S.br + dt * P.rr / 60) % 1; }
var pulse = 1 + (S.beat < 0.15 ? 0.12 * Math.sin(S.beat / 0.15 * Math.PI) : 0), breath = 1 + 0.08 * (0.5 - 0.5 * Math.cos(S.br * 2 * Math.PI)) * (0.6 + S.I / 100);
L.forEach(function (id) {
var o = ORG[id], col = o[2], hs = o[4];
if (o[1] === 'skel') {
x.fillStyle = col;
if (id === 'ribs') { for (k = 0; k < 7; k++) { x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.ellipse(G.cx, G.cy + (-0.55 + k * 0.035) * s, (0.1 + k * 0.009) * s, 0.04 * s, 0, 0.15 * Math.PI, 0.85 * Math.PI, true); x.stroke(); } return; }
if (id === 'spine') { for (k = 0; k < 22; k++) { x.fillRect(G.cx - 0.015 * s, G.cy + (-0.66 + k * 0.033) * s, 0.03 * s, 0.022 * s); } return; }
if (id === 'skull') { E(x, G, 0, -0.89, 0.085, 0.085); x.fill(); x.fillStyle = '#2a3572'; E(x, G, -0.03, -0.89, 0.018, 0.016); x.fill(); E(x, G, 0.03, -0.89, 0.018, 0.016); x.fill(); return; }
if (id === 'pelvis') { E(x, G, 0, 0.03, 0.12, 0.045); x.fill(); x.fillStyle = '#2a3572'; E(x, G, 0, 0.04, 0.05, 0.03); x.fill(); return; }
if (id === 'femur') { [-1, 1].forEach(function (q) { line(x, G, [[q * 0.08, 0.08], [q * 0.09, 0.48]], col, 0.03 * s); line(x, G, [[q * 0.09, 0.52], [q * 0.1, 0.9]], 'rgba(244,236,216,.6)', 0.025 * s); }); return; }
if (id === 'humerus') { [-1, 1].forEach(function (q) { line(x, G, [[q * 0.19, -0.58], [q * 0.24, -0.31]], col, 0.028 * s); line(x, G, [[q * 0.245, -0.28], [q * 0.29, 0.0]], 'rgba(244,236,216,.6)', 0.022 * s); }); return; }
}
if (id === 'nerves') { limbs(function (pts) { line(x, G, pts, col, 2); }); for (k = 0; k < 6; k++) line(x, G, [[0, -0.6 + k * 0.1], [(k % 2 ? 1 : -1) * 0.14, -0.55 + k * 0.1]], 'rgba(255,233,160,.6)', 1.2); return; }
if (id === 'vessels') { limbs(function (pts) { line(x, G, pts.map(function (q) { return [q[0] - 0.01, q[1]]; }), '#ff4d6d', 2.2); line(x, G, pts.map(function (q) { return [q[0] + 0.01, q[1]]; }), '#5b8cff', 2.2); }); line(x, G, [[0.03, -0.43], [0.01, -0.55], [-0.01, -0.05]], '#ff4d6d', 3); return; }
if (id === 'cord') { line(x, G, [[0, -0.8], [0, -0.05]], col, 4); return; }
if (id === 'large') { x.strokeStyle = col; x.lineWidth = 0.035 * s; x.lineCap = 'round'; x.beginPath(); x.moveTo(G.cx - 0.1 * s, G.cy + 0.0 * s); x.lineTo(G.cx - 0.1 * s, G.cy - 0.18 * s); x.lineTo(G.cx + 0.1 * s, G.cy - 0.18 * s); x.lineTo(G.cx + 0.1 * s, G.cy + 0.0 * s); x.lineTo(G.cx + 0.02 * s, G.cy + 0.02 * s); x.stroke(); return; }
if (id === 'small') { x.strokeStyle = col; x.lineWidth = 0.016 * s; x.beginPath(); for (k = 0; k <= 60; k++) { var a = k * 0.55, r = 0.015 + k * 0.001; var X = G.cx + (Math.cos(a) * r * 1.6 + (k % 12 - 6) * 0.008) * s, Y = G.cy + (-0.1 + Math.sin(a) * r + (Math.floor(k / 12) - 2) * 0.02) * s; if (k) x.lineTo(X, Y); else x.moveTo(X, Y); } x.stroke(); return; }
if (id === 'oeso') { line(x, G, [[0.005, -0.66], [0.012, -0.45], [0.06, -0.29]], col, 0.022 * s); return; }
if (id === 'trachea') { line(x, G, [[0, -0.72], [0, -0.6]], col, 0.03 * s); line(x, G, [[0, -0.6], [-0.07, -0.53]], col, 0.02 * s); line(x, G, [[0, -0.6], [0.07, -0.53]], col, 0.02 * s); return; }
var sc = id === 'heart' ? pulse : id === 'lungs' ? breath : 1;
hs.forEach(function (e) {
E(x, G, e[0], e[1], e[2] * sc, e[3] * sc);
var gg = x.createRadialGradient(G.cx + (e[0] - e[2] * 0.3) * s, G.cy + (e[1] - e[3] * 0.4) * s, 1, G.cx + e[0] * s, G.cy + e[1] * s, Math.max(e[2], e[3]) * s * sc + 1);
gg.addColorStop(0, '#ffffff'); gg.addColorStop(0.25, col); gg.addColorStop(1, 'rgba(0,0,0,.35)');
x.fillStyle = id === 'lungs' ? 'rgba(127,182,255,.75)' : gg; x.fill();
if (id === 'lungs') { x.fillStyle = gg; x.globalAlpha = 0.5; x.fill(); x.globalAlpha = 1; }
});
if (id === 'kidneys') { line(x, G, [[-0.07, -0.16], [-0.02, 0.02]], '#f5d76e', 1.5); line(x, G, [[0.07, -0.16], [0.02, 0.02]], '#f5d76e', 1.5); }
});
if (S.sel && L.indexOf(S.sel) >= 0) {
ORG[S.sel][4].forEach(function (e) { x.strokeStyle = '#4ade80'; x.lineWidth = 3; E(x, G, e[0], e[1], e[2] + 0.02, e[3] + 0.02); x.stroke(); });
x.font = '600 14px system-ui,sans-serif'; var nm = ORG[S.sel][0], tw = x.measureText(nm).width;
x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(8, 8, tw + 16, 26); x.fillStyle = '#fff'; x.fillText(nm, 16, 26);
}
x.font = '11px system-ui,sans-serif'; x.fillStyle = 'rgba(220,225,255,.7)';
x.fillText('body’s RIGHT', 8, h - 10); x.textAlign = 'right'; x.fillText('body’s LEFT', w - 8, h - 10); x.textAlign = 'left';
// ECG strip
var ex = w - Math.min(170, w * 0.38) - 8, ey = 12, ew = Math.min(170, w * 0.38), eh = 40;
x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(ex, ey, ew, eh);
x.strokeStyle = '#4ade80'; x.lineWidth = 1.6; x.beginPath();
for (k = 0; k <= ew; k += 2) { var ph = ((k / ew) * 2.5 + S.beat) % 1, yv = ph < 0.04 ? -Math.sin(ph / 0.04 * Math.PI) * 14 : ph < 0.08 ? Math.sin((ph - 0.04) / 0.04 * Math.PI) * 4 : ph > 0.3 && ph < 0.42 ? -Math.sin((ph - 0.3) / 0.12 * Math.PI) * 4 : 0; if (k) x.lineTo(ex + k, ey + eh / 2 + yv); else x.moveTo(ex + k, ey + eh / 2 + yv); }
x.stroke(); x.fillStyle = '#c9ffd8'; x.fillText(Math.round(P.hr) + ' bpm', ex + 4, ey + eh - 4);
}
showInfo();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++; if (U.lp && fr % 2) return;
draw(U.lp ? dt * 2 : dt);
if (fr % 8 === 0) {
var P = phys();
set('hr', Math.round(P.hr) + ' beats/min'); set('max', P.max + ' beats/min'); set('sv', Math.round(P.sv) + ' mL');
set('co', U.f(P.co, 1) + ' L/min'); set('rr', Math.round(P.rr) + ' breaths/min'); set('ve', U.f(P.ve, 0) + ' L/min');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'human-body', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

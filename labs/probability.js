/* VidyaVerse University — Probability lab (labs/probability.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'probability';
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
var META = { id: ID, title: 'Probability lab', icon: '🎲', faculty: 'school', bands: ['middle', 'secondary', 'senior', 'ug'],
summary: 'Flip coins, roll dice and spin spinners thousands of times; compare experimental and theoretical probability and watch the law of large numbers.' };
var EXP = [['coin', '🪙 Coin'], ['die', '🎲 One die'], ['dice2', '🎲🎲 Two dice (sum)'], ['spin', '🎡 Spinner']];
var SPC = ['#ff5a7a', '#5b8cff', '#4ade80'];
function frac(v) { v = String(v).trim(); if (v.indexOf('/') > 0) { var q = v.split('/'); return parseFloat(q[0]) / parseFloat(q[1]); } if (v.charAt(v.length - 1) === '%') return parseFloat(v) / 100; return parseFloat(v); }
function mount(el, api) {
var S = {}, C, segE, sw = [], set, autoB;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'See how experimental probability gets closer to theoretical probability as trials increase.',
free: 'Choose an experiment and run 1, 10, 100 or 1000 trials (or Auto). Tap a bar (or use ←/→ on the picture) to follow that outcome on the lower graph.',
note: '<p><b>Theoretical probability</b> P(event) = favourable outcomes ÷ equally likely outcomes. Two dice have 6 × 6 = 36 equally likely ordered results; six of them sum to 7, so P(7) = 6/36 = 1/6.</p>' +
'<p><b>Experimental probability</b> = times it happened ÷ trials. The <b>law of large numbers</b> says it settles towards the theoretical value as trials grow — but any short run can wander, and past results never change the next one (no “due” sixes).</p>' +
'<p>Spinner: P(colour) = that sector’s share of the circle. <b>Simplified:</b> outcomes come from the browser’s pseudo-random generator, which is excellent for this but not truly random; real coins and dice can be very slightly biased.</p>',
onReset: function () { reset(); }
});
function reset() { S.e = 'coin'; S.w = [1, 1, 2]; clearRuns(); if (segE) { segE.set('coin'); sw.forEach(function (s, i) { s.set(S.w[i]); }); } S.auto = false; if (autoB) autoB.textContent = '▶ Auto'; }
function clearRuns() { S.cnt = {}; S.n = 0; S.sel = null; S.run = []; S.every = 1; S.last = null; S.anim = 0; S.sinceSpin = 0; outs().forEach(function (o) { S.cnt[o] = 0; }); S.sel = outs()[0]; }
function outs() { return S.e === 'coin' ? ['H', 'T'] : S.e === 'die' ? [1, 2, 3, 4, 5, 6] : S.e === 'dice2' ? [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : ['Red', 'Blue', 'Green']; }
function theory(o) {
if (S.e === 'coin') return 0.5; if (S.e === 'die') return 1 / 6;
if (S.e === 'dice2') return (6 - Math.abs(o - 7)) / 36;
var t = S.w[0] + S.w[1] + S.w[2]; return t ? S.w[['Red', 'Blue', 'Green'].indexOf(o)] / t : 0;
}
function one() {
var r = Math.random();
if (S.e === 'coin') return [r < 0.5 ? 'H' : 'T'];
if (S.e === 'die') return [1 + Math.floor(r * 6)];
if (S.e === 'dice2') { var a = 1 + Math.floor(r * 6), b = 1 + Math.floor(Math.random() * 6); return [a + b, a, b]; }
var t = S.w[0] + S.w[1] + S.w[2], acc = 0; r *= t;
for (var i = 0; i < 3; i++) { acc += S.w[i]; if (r < acc) return ['Red,Blue,Green'.split(',')[i], (acc - S.w[i] + Math.random() * S.w[i]) / t]; }
return ['Green', 0.99];
}
function trials(k) {
if (S.e === 'spin' && S.w[0] + S.w[1] + S.w[2] === 0) return;
for (var i = 0; i < k; i++) {
var r = one(); S.cnt[r[0]]++; S.n++; S.sinceSpin++; S.last = r;
if (S.n % S.every === 0) { S.run.push([S.n, S.cnt[S.sel] / S.n]); if (S.run.length > 400) { S.run = S.run.filter(function (q, j) { return j % 2 === 0; }); S.every *= 2; } }
}
S.anim = U.rm ? 0 : 1;
U.check();
}
C = U.canvas(U.stage, { ratio: 0.66, min: 360, scroll: true, label: 'Probability experiment with charts' });
function lay() {
var w = C.w, h = C.h, wide = w >= 600;
return wide ? { v: [0, 0, w * 0.3, h], b: [w * 0.3 + 6, 6, w * 0.7 - 12, h * 0.56 - 9], r: [w * 0.3 + 6, h * 0.56 + 3, w * 0.7 - 12, h * 0.44 - 9] }
: { v: [0, 0, w, h * 0.3], b: [6, h * 0.3 + 4, w - 12, h * 0.38 - 8], r: [6, h * 0.68 + 2, w - 12, h * 0.32 - 8] };
}
U.drag(C, {
down: function (p) {
var L = lay().b, os = outs(); if (p.x < L[0] || p.x > L[0] + L[2] || p.y < L[1] || p.y > L[1] + L[3]) return false;
var i = Math.floor((p.x - L[0]) / (L[2] / os.length)); if (os[i] === undefined) return false;
pickSel(os[i]); return false;
}
});
function pickSel(o) {
S.sel = o; S.run = []; S.every = 1; U.sound('pop'); U.say('Following ' + o + '. Theoretical probability ' + theory(o).toFixed(3)); U.check();
}
U.on(C.cv, 'keydown', function (e) {
var os = outs(), i = os.indexOf(S.sel);
if (e.key === 'ArrowRight') { pickSel(os[(i + 1) % os.length]); e.preventDefault(); }
else if (e.key === 'ArrowLeft') { pickSel(os[(i + os.length - 1) % os.length]); e.preventDefault(); }
else if (e.key === ' ' || e.key === 'Enter') { trials(1); U.sound('tap'); e.preventDefault(); }
});
segE = U.seg(U.ctrl, 'Experiment', EXP, 'coin', function (v) { S.e = v; clearRuns(); U.check(); });
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
[1, 10, 100, 1000].forEach(function (k) { U.button(bb, k === 1 ? '▶ 1 trial' : '×' + k, function () { trials(k); U.sound(k === 1 ? 'whoosh' : 'tick'); }, k === 1 ? 'vvk-go' : ''); });
autoB = U.button(bb, '▶ Auto', function () { S.auto = !S.auto; autoB.textContent = S.auto ? '⏸ Stop' : '▶ Auto'; U.sound('tap'); });
U.button(bb, '🧹 Clear results', function () { clearRuns(); U.sound('whoosh'); });
['Red', 'Blue', 'Green'].forEach(function (c, i) { sw.push(U.slider(U.ctrl, { label: 'Spinner ' + c + ' sectors', min: 0, max: 8, step: 1, value: [1, 1, 2][i], onInput: function (v) { S.w[i] = v; if (S.e === 'spin') clearRuns(); U.check(); } })); });
set = U.readouts([['n', 'Trials'], ['sel', 'Following'], ['ex', 'Experimental P'], ['th', 'Theoretical P'], ['df', 'Difference']]);
function exp(v) { return function () { S.e = v; segE.set(v); clearRuns(); }; }
U.guided([
{ title: 'Many flips', xp: 10, setup: exp('coin'), t: 'Flip the coin 10 times, then keep going until you have at least 1000 flips. Watch the heads line on the lower graph.',
hint: 'Use ×10 first and look how far from 0.5 you are, then press ×100 or ×1000.',
ok: 'With 10 flips you might get 30% or 70% heads; with 1000 you are usually within about 3% of 50%.', check: function () { return S.e === 'coin' && S.n >= 1000; } },
{ title: 'Most likely total', xp: 10, setup: exp('dice2'), t: 'Roll two dice at least 200 times. Which total is the most likely? Tap its bar.',
hint: 'Count the ways: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1… which total has the most?', ok: '7 — it can be made in 6 of the 36 ways.',
check: function () { if (S.e !== 'dice2' || S.n < 200) return false; return S.sel === 7; } },
{ title: 'Calculate', xp: 15, t: 'Using the 36 equally likely outcomes, what is the probability that two dice sum to 7? (Type a fraction like 1/6 or a decimal.)',
ask: { type: 'text', ph: 'e.g. 3/36' }, hint: 'Six ways out of 36.', ok: 'P(7) = 6/36 = 1/6 ≈ 0.167 — compare with your experiment!',
answer: function (v) { return Math.abs(frac(v) - 1 / 6) < 0.002; } },
{ title: 'Design a spinner', xp: 15, setup: exp('spin'), t: 'Set the sectors so P(Red) = 1/4, then spin at least 200 times and follow Red.',
hint: 'Red’s share = red sectors ÷ total sectors. For example Red 1, Blue 1, Green 2 → 1/4. Or 2, 3, 3.',
ok: 'One quarter of the circle → about 25% of spins land on red.', check: function () { return S.e === 'spin' && Math.abs(theory('Red') - 0.25) < 0.001 && S.sinceSpin >= 200 && S.sel === 'Red'; } },
{ title: 'At least one six', xp: 20, t: 'You roll a die twice. What is the probability of getting at least one six? (fraction or decimal)',
ask: { type: 'text', ph: 'e.g. 11/36' }, hint: 'Easier the other way round: P(no six in two rolls) = 5/6 × 5/6 = 25/36. Then subtract from 1.',
ok: '1 − 25/36 = 11/36 ≈ 0.306. “At least one” problems are often easiest with the complement.', answer: function (v) { return Math.abs(frac(v) - 11 / 36) < 0.002; } }
]);
function pips(x, cx, cy, s, n) {
x.fillStyle = '#fdfcf6'; x.strokeStyle = '#c9c3b2'; x.lineWidth = 2;
var r = s * 0.18; x.beginPath(); x.moveTo(cx - s / 2 + r, cy - s / 2); x.arcTo(cx + s / 2, cy - s / 2, cx + s / 2, cy + s / 2, r); x.arcTo(cx + s / 2, cy + s / 2, cx - s / 2, cy + s / 2, r); x.arcTo(cx - s / 2, cy + s / 2, cx - s / 2, cy - s / 2, r); x.arcTo(cx - s / 2, cy - s / 2, cx + s / 2, cy - s / 2, r); x.fill(); x.stroke();
var P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
x.fillStyle = '#1c1f33'; (P[n] || []).forEach(function (q) { x.beginPath(); x.arc(cx + q[0] * s * 0.26, cy + q[1] * s * 0.26, s * 0.08, 0, 6.283); x.fill(); });
}
function visual(x, R, t) {
var cx = R[0] + R[2] / 2, cy = R[1] + R[3] / 2, s = Math.min(R[2], R[3]) * 0.55, L = S.last, sp = S.anim;
if (S.e === 'coin') {
var sx = Math.abs(Math.cos(sp * 9)) || 0.05, face = L ? L[0] : 'H';
var g = x.createRadialGradient(cx - s * 0.15, cy - s * 0.15, 2, cx, cy, s / 2);
g.addColorStop(0, '#fff2b8'); g.addColorStop(1, '#c99a2e');
x.save(); x.translate(cx, cy - Math.sin(sp * Math.PI) * s * 0.3); x.scale(Math.max(0.06, sx), 1);
x.fillStyle = g; x.beginPath(); x.arc(0, 0, s / 2, 0, 6.283); x.fill(); x.strokeStyle = '#8a6514'; x.lineWidth = 3; x.stroke();
x.fillStyle = '#6b4c0c'; x.font = '700 ' + Math.round(s * 0.4) + 'px system-ui,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
x.fillText(sp > 0.05 ? '' : face, 0, 2); x.restore();
} else if (S.e === 'die' || S.e === 'dice2') {
var vals = L ? (S.e === 'die' ? [L[0]] : [L[1], L[2]]) : (S.e === 'die' ? [6] : [3, 4]);
if (sp > 0.05) vals = vals.map(function () { return 1 + Math.floor(Math.random() * 6); });
var ds = vals.length === 1 ? s * 0.8 : s * 0.62;
vals.forEach(function (v, i) {
var dx = vals.length === 1 ? 0 : (i ? 1 : -1) * ds * 0.62;
x.save(); x.translate(cx + dx, cy); x.rotate(sp * (i ? -4 : 5)); pips(x, 0, 0, ds, v); x.restore();
});
if (L && S.e === 'dice2' && sp <= 0.05) { x.fillStyle = '#fff'; x.font = '700 16px system-ui,sans-serif'; x.textAlign = 'center'; x.fillText('sum = ' + L[0], cx, cy + ds * 0.85); }
} else {
var tot = S.w[0] + S.w[1] + S.w[2] || 1, a0 = -Math.PI / 2, r = s * 0.62;
for (var i = 0; i < 3; i++) { var a1 = a0 + S.w[i] / tot * 6.283; x.fillStyle = SPC[i]; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, r, a0, a1); x.closePath(); x.fill(); a0 = a1; }
x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r, 0, 6.283); x.stroke();
var tgtA = L ? -Math.PI / 2 + L[1] * 6.283 : -Math.PI / 2, ang = tgtA + sp * 6.283 * 3;
x.strokeStyle = '#fff'; x.lineWidth = 4; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * r * 0.9, cy + Math.sin(ang) * r * 0.9); x.stroke();
x.fillStyle = '#fff'; x.beginPath(); x.arc(cx, cy, 6, 0, 6.283); x.fill();
}
x.textAlign = 'left'; x.textBaseline = 'alphabetic';
x.fillStyle = '#c8d0ff'; x.font = '12px system-ui,sans-serif'; x.fillText('Trials: ' + S.n, R[0] + 10, R[1] + 18);
}
function bars(x, R) {
var os = outs(), n = Math.max(1, S.n), mx = 0, bw = R[2] / os.length;
os.forEach(function (o) { mx = Math.max(mx, theory(o), S.cnt[o] / n); });
mx = Math.min(1, mx * 1.2 + 0.02);
x.fillStyle = 'rgba(0,0,0,.28)'; x.fillRect(R[0], R[1], R[2], R[3]);
var bh = R[3] - 34;
os.forEach(function (o, i) {
var X = R[0] + i * bw, e = S.n ? S.cnt[o] / n : 0, th = theory(o), col = S.e === 'spin' ? SPC[i] : '#7c9cff';
if (o === S.sel) { x.fillStyle = 'rgba(255,184,107,.14)'; x.fillRect(X + 1, R[1] + 2, bw - 2, R[3] - 4); }
var g = x.createLinearGradient(0, R[1] + 18 + bh * (1 - e / mx), 0, R[1] + 18 + bh); g.addColorStop(0, col); g.addColorStop(1, 'rgba(124,156,255,.25)');
x.fillStyle = g; x.fillRect(X + bw * 0.18, R[1] + 18 + bh * (1 - e / mx), bw * 0.64, bh * e / mx);
x.strokeStyle = '#ffb86b'; x.lineWidth = 2; x.setLineDash([4, 3]); x.beginPath(); x.moveTo(X + bw * 0.1, R[1] + 18 + bh * (1 - th / mx)); x.lineTo(X + bw * 0.9, R[1] + 18 + bh * (1 - th / mx)); x.stroke(); x.setLineDash([]);
x.fillStyle = '#e8ecff'; x.font = '600 ' + (bw < 30 ? 10 : 12) + 'px system-ui,sans-serif'; x.textAlign = 'center';
x.fillText(String(o).charAt(0) === 'R' || String(o).charAt(0) === 'B' || String(o).charAt(0) === 'G' ? String(o).slice(0, bw < 40 ? 1 : 5) : String(o), X + bw / 2, R[1] + R[3] - 4);
if (bw > 34) { x.font = '10px system-ui,sans-serif'; x.fillStyle = '#b8c1ee'; x.fillText(S.cnt[o] + '', X + bw / 2, R[1] + 14); }
});
x.textAlign = 'left'; x.fillStyle = 'rgba(255,184,107,.9)'; x.font = '11px system-ui,sans-serif'; x.fillText('- - theory   ▮ experiment (tap a bar to follow it)', R[0] + 6, R[1] + R[3] - 18);
}
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h, L = lay();
var bg = x.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#0d1538'); bg.addColorStop(1, '#090b1f'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
if (S.anim > 0) S.anim = Math.max(0, S.anim - dt * 1.6);
visual(x, L.v, dt); bars(x, L.b);
var th = theory(S.sel), R = L.r, xmax = Math.max(10, S.n);
var lo = Math.max(0, Math.min(th - 0.25, th * 0.3)), hi = Math.min(1, Math.max(th + 0.25, th * 1.8));
U.plot(x, R[0], R[1], R[2], R[3], { xmin: 0, xmax: xmax, ymin: lo, ymax: hi, nx: 4, ny: 4, title: 'Running relative frequency of “' + S.sel + '”', xlabel: 'trials',
lines: [{ pts: [[0, th], [xmax, th]], color: 'rgba(255,184,107,.8)', width: 1.5, dash: [5, 4] }, { pts: S.run, color: '#4ade80', width: 2 }] });
}
reset();
U.G.begin();
var fr = 0, acc = 0;
U.loop(function (dt) {
fr++;
if (S.auto) { acc += dt; var k = 0; while (acc > 0.05) { acc -= 0.05; k++; } if (k) { trials(k * (S.n > 500 ? 10 : 1)); if (fr % 4 === 0) U.sound('tick'); } }
if (U.lp && fr % 2) return;
draw(dt);
if (fr % 6 === 0) {
var e = S.n ? S.cnt[S.sel] / S.n : NaN, t = theory(S.sel);
set('n', S.n + ''); set('sel', String(S.sel)); set('ex', S.n ? U.f(e, 4) : '—'); set('th', U.f(t, 4)); set('df', S.n ? (e - t >= 0 ? '+' : '') + U.f(e - t, 4) : '—');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'probability', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

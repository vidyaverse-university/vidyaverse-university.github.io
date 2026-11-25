/* VidyaVerse University — pH & titration lab (labs/ph-titration.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'ph-titration';
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
var META = { id: ID, title: 'pH & titration lab', icon: '⚗️', faculty: 'school', bands: ['secondary', 'senior', 'ug'],
summary: 'Titrate strong or weak acid with NaOH drop by drop, watch real indicator colours and a live titration curve, find the equivalence point and pKa.' };
var KW = 1e-14;
var ACIDS = { strong: { n: 'HCl (strong acid)', Ka: 1e8 }, weak: { n: 'CH₃COOH (ethanoic acid, weak)', Ka: 1.8e-5 } };
var INDS = {
php: { n: 'Phenolphthalein', lo: 8.2, hi: 10, a: [255, 255, 255, 0.05], b: [232, 40, 160, 0.75], r: '8.2–10.0 colourless → pink' },
mo: { n: 'Methyl orange', lo: 3.1, hi: 4.4, a: [220, 40, 40, 0.7], b: [245, 200, 50, 0.7], r: '3.1–4.4 red → yellow' },
btb: { n: 'Bromothymol blue', lo: 6.0, hi: 7.6, a: [235, 210, 40, 0.7], b: [40, 90, 225, 0.75], r: '6.0–7.6 yellow → blue' },
uni: { n: 'Universal', lo: 0, hi: 14, r: 'red (acid) → green (7) → violet (alkali)' }
};
function mount(el, api) {
var S = {}, C, segA, segI, set, pouring = 0, tgC;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Find the equivalence point of a titration and choose the right indicator.',
free: 'Pick an acid and an indicator, then add NaOH: single drops, 0.5 mL or hold “Pour” for a steady stream. Tap “Show full curve” to compare with theory.',
note: '<p>The flask starts with 25.0 mL of acid; the burette holds 0.100 mol/L NaOH. pH is found by solving the full charge balance [H⁺] + [Na⁺] = [OH⁻] + [A⁻] with K<sub>w</sub> = 1.0×10⁻¹⁴, so the curve is exact for an ideal solution — including the buffer region and the steep jump.</p>' +
'<p>For a weak acid, [A⁻] = C·K<sub>a</sub>/(K<sub>a</sub> + [H⁺]); K<sub>a</sub>(ethanoic acid) = 1.8×10⁻⁵, pK<sub>a</sub> = 4.74. At half-equivalence pH = pK<sub>a</sub> (Henderson–Hasselbalch).</p>' +
'<p><b>At equivalence:</b> moles NaOH = moles acid, so C<sub>acid</sub> = C<sub>NaOH</sub> × V<sub>NaOH</sub> / V<sub>acid</sub>.</p>' +
'<p><b>Simplified:</b> 25 °C, concentrations used instead of activities, volumes add exactly, one drop = 0.05 mL. Indicator colours are approximate. In a real lab wear goggles — NaOH and HCl are corrosive.</p>',
onReset: function () { reset(); }
});
function reset() {
S.acid = 'strong'; S.ind = 'php'; S.Ca = 0.1; S.Va = 25; S.Cb = 0.1; S.Vb = 0; S.hist = [[0, pH(0)]]; S.unknown = false; S.full = false; S.drops = [];
if (segA) { segA.set('strong'); segI.set('php'); tgC.setAttribute('aria-pressed', 'false'); }
}
function newFlask() { S.Vb = 0; S.hist = [[0, pH(0)]]; S.drops = []; }
function pH(Vb, acid, Ca) {
acid = acid || S.acid; Ca = Ca || S.Ca;
var Ka = ACIDS[acid].Ka, Vt = S.Va + Vb, CA = Ca * S.Va / Vt, Na = S.Cb * Vb / Vt;
var lo = -15, hi = 1;
for (var i = 0; i < 70; i++) {
var m = (lo + hi) / 2, H = Math.pow(10, m);
var f = H + Na - KW / H - CA * Ka / (Ka + H);
if (f > 0) hi = m; else lo = m;
}
return -(lo + hi) / 2;
}
function add(mL) {
if (S.Vb >= 50) return;
S.Vb = Math.min(50, Math.round((S.Vb + mL) * 1000) / 1000);
var p = pH(S.Vb);
S.hist.push([S.Vb, p]);
if (!U.rm && S.drops.length < 6) S.drops.push({ y: 0 });
U.check();
}
function colour(p) {
var I = INDS[S.ind];
if (S.ind === 'uni') return 'hsla(' + Math.round(U.clamp(p, 0, 14) / 14 * 270) + ',85%,55%,.75)';
var t = U.clamp((p - I.lo) / (I.hi - I.lo), 0, 1);
var c = [0, 1, 2, 3].map(function (k) { return I.a[k] + (I.b[k] - I.a[k]) * t; });
return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + c[3].toFixed(2) + ')';
}
C = U.canvas(U.stage, { ratio: 0.58, min: 320, scroll: true, label: 'Burette, flask and titration curve' });
segA = U.seg(U.ctrl, 'Acid in the flask (25.0 mL)', [['strong', 'HCl · strong'], ['weak', 'CH₃COOH · weak']], 'strong', function (v) { S.acid = v; S.unknown = false; S.Ca = 0.1; newFlask(); U.check(); });
segI = U.seg(U.ctrl, 'Indicator', [['php', 'Phenolphthalein'], ['mo', 'Methyl orange'], ['btb', 'Bromothymol blue'], ['uni', 'Universal']], 'php', function (v) { S.ind = v; U.check(); });
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
U.button(bb, '💧 1 drop', function () { add(0.05); U.sound('pop'); });
U.button(bb, '+0.5 mL', function () { add(0.5); U.sound('pop'); });
U.button(bb, '+5 mL', function () { add(5); U.sound('pop'); });
var pour = U.h('button', { cls: 'vvk-go', text: '🚿 Hold to pour', 'aria-label': 'Hold to pour sodium hydroxide' });
bb.appendChild(pour);
U.on(pour, 'pointerdown', function (e) { pouring = 1; U.sound('tap'); try { pour.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
U.on(pour, 'pointerup', function () { pouring = 0; });
U.on(pour, 'pointercancel', function () { pouring = 0; });
U.on(pour, 'keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { pouring = 1; e.preventDefault(); } });
U.on(pour, 'keyup', function () { pouring = 0; });
U.button(bb, '🧪 New flask', function () { newFlask(); U.sound('whoosh'); });
tgC = U.button(bb, '📈 Show full curve', function () { S.full = !S.full; tgC.setAttribute('aria-pressed', S.full ? 'true' : 'false'); });
tgC.setAttribute('aria-pressed', 'false');
set = U.readouts([['ph', 'pH'], ['h', '[H⁺]'], ['vb', 'NaOH added'], ['nb', 'mol NaOH'], ['na', 'mol acid at start'], ['ve', 'Equivalence volume'], ['ind', 'Indicator range']]);
U.guided([
{ title: 'Strong endpoint', xp: 15, setup: function () { S.acid = 'strong'; segA.set('strong'); S.ind = 'php'; segI.set('php'); S.unknown = false; S.Ca = 0.1; newFlask(); },
t: '25.0 mL of 0.100 M HCl. Add 0.100 M NaOH and stop at the equivalence point: between 24.90 and 25.10 mL (the first permanent pale pink).',
hint: 'Moles HCl = 0.100 × 0.0250 = 0.00250 mol, so you need 0.00250 / 0.100 = 25.0 mL. Pour quickly to ~24 mL, then add single drops.',
ok: 'Equivalence! One drop takes the pH from about 4 to about 10 — that is the steep jump.', check: function () { return S.acid === 'strong' && !S.unknown && S.Vb >= 24.9 && S.Vb <= 25.1; } },
{ title: 'Pick an indicator', xp: 15, setup: function () { S.acid = 'weak'; segA.set('weak'); S.ind = 'mo'; segI.set('mo'); S.unknown = false; S.Ca = 0.1; newFlask(); },
t: 'Ethanoic acid + NaOH has its equivalence point at pH ≈ 8.7. Choose the indicator whose colour-change range contains that pH.',
hint: 'Compare the ranges: methyl orange 3.1–4.4, bromothymol blue 6.0–7.6, phenolphthalein 8.2–10.0.',
ok: 'Phenolphthalein changes at 8.2–10, matching the weak-acid endpoint. Methyl orange would change far too early.', check: function () { return S.acid === 'weak' && S.ind === 'php'; } },
{ title: 'Find pKa', xp: 15, t: 'Keep ethanoic acid. Add NaOH to the half-equivalence point, 12.50 mL (±0.15), and look at the pH.',
hint: 'Half the acid has become ethanoate, so [HA] = [A⁻] and pH = pKa + log([A⁻]/[HA]) = pKa.',
ok: 'pH ≈ 4.74 = pKa. Around here the mixture is a buffer: the curve is flattest.', check: function () { return S.acid === 'weak' && Math.abs(S.Vb - 12.5) <= 0.15; } },
{ title: 'Mystery acid', xp: 25, setup: function () { S.acid = 'strong'; segA.set('strong'); S.ind = 'php'; segI.set('php'); S.unknown = true; S.Ca = Math.round((0.06 + Math.random() * 0.08) * 1000) / 1000; newFlask(); },
t: 'A new 25.0 mL sample of HCl has an unknown concentration. Titrate to the endpoint, then calculate its concentration in mol/L.',
ask: { ph: 'concentration', unit: 'mol/L' }, hint: 'C_acid = C_NaOH × V_NaOH / V_acid = 0.100 × (your endpoint volume) / 25.0.',
ok: 'Correct — that is exactly how chemists standardise solutions.', wrong: 'Not quite. Make sure you stopped at the first pink, then use C = 0.100 × V / 25.0.',
answer: function (v) { v = parseFloat(v); return isFinite(v) && Math.abs(v - S.Ca) / S.Ca <= 0.03; } }
]);
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h, p = pH(S.Vb), wide = w >= 560;
var bg = x.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0e1638'); bg.addColorStop(1, '#070a1c');
x.fillStyle = bg; x.fillRect(0, 0, w, h);
var aw = wide ? Math.min(240, w * 0.36) : w, ah = wide ? h : h * 0.5;
var cx = aw / 2;
// stand
x.fillStyle = '#39406e'; x.fillRect(cx - 50, 8, 6, ah - 20); x.fillRect(cx - 60, ah - 14, 120, 6);
// burette
var bt = 14, bh = ah * 0.5, bwid = 16;
x.fillStyle = 'rgba(220,230,255,.12)'; x.fillRect(cx - bwid / 2, bt, bwid, bh);
var lvl = (50 - S.Vb) / 50;
x.fillStyle = 'rgba(160,200,255,.45)'; x.fillRect(cx - bwid / 2 + 2, bt + bh * (1 - lvl), bwid - 4, bh * lvl);
x.strokeStyle = 'rgba(230,235,255,.7)'; x.lineWidth = 1; x.strokeRect(cx - bwid / 2, bt, bwid, bh);
x.fillStyle = 'rgba(230,235,255,.6)'; x.font = '9px system-ui,sans-serif';
for (var m = 0; m <= 50; m += 10) { var yy = bt + bh * m / 50; x.fillRect(cx + bwid / 2, yy, 5, 1); x.fillText(m, cx + bwid / 2 + 7, yy + 3); }
x.fillStyle = '#8a93c4'; x.fillRect(cx - 2, bt + bh, 4, 14); x.fillRect(cx - 9, bt + bh + 4, 18, 4);
// drops
var fy = ah * 0.7, top = bt + bh + 18;
if (pouring) { x.strokeStyle = 'rgba(170,210,255,.7)'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, top); x.lineTo(cx, fy); x.stroke(); }
S.drops.forEach(function (d) { d.y += dt * 240; x.fillStyle = 'rgba(170,210,255,.85)'; x.beginPath(); x.arc(cx, top + d.y, 3, 0, 2 * Math.PI); x.fill(); });
S.drops = S.drops.filter(function (d) { return top + d.y < fy; });
// conical flask
var fw = Math.min(aw * 0.6, 130), fb = ah - 16, ft = fy - 10;
x.beginPath(); x.moveTo(cx - 12, ft); x.lineTo(cx - 12, ft + 18); x.lineTo(cx - fw / 2, fb); x.lineTo(cx + fw / 2, fb); x.lineTo(cx + 12, ft + 18); x.lineTo(cx + 12, ft); x.closePath();
x.save(); x.clip();
var fill = 0.45 + 0.35 * (S.Vb / 50), ly2 = fb - (fb - ft - 18) * fill;
x.fillStyle = colour(p); x.fillRect(cx - fw / 2, ly2, fw, fb - ly2);
x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(cx - fw / 2, ly2, fw, 3);
x.restore();
x.strokeStyle = 'rgba(230,235,255,.8)'; x.lineWidth = 1.5; x.stroke();
x.fillStyle = '#e8ecff'; x.font = '700 ' + (wide ? 20 : 16) + 'px system-ui,sans-serif'; x.textAlign = 'center';
x.fillText('pH ' + p.toFixed(2), cx + (wide ? 0 : aw * 0.32), wide ? 26 + bh * 0.2 : 26);
x.font = '11px system-ui,sans-serif'; x.fillStyle = '#b8c1ee';
x.fillText(INDS[S.ind].n, cx + (wide ? 0 : aw * 0.32), wide ? 44 + bh * 0.2 : 44);
x.textAlign = 'left';
// graph
var gx = wide ? aw + 8 : 8, gy = wide ? 8 : ah + 4, gw = wide ? w - aw - 16 : w - 16, gh = wide ? h - 16 : h - ah - 10;
var lines = [];
if (S.full) {
var pts = []; for (var v = 0; v <= 50; v += 0.25) pts.push([v, pH(v)]);
lines.push({ pts: pts, color: 'rgba(255,220,150,.55)', width: 1.5, dash: [5, 5] });
}
var I = INDS[S.ind];
lines.push({ pts: [[0, I.lo], [50, I.lo]], color: 'rgba(255,120,200,.25)', width: 1 });
lines.push({ pts: [[0, I.hi], [50, I.hi]], color: 'rgba(255,120,200,.25)', width: 1 });
var hs = S.hist.slice().sort(function (a, b) { return a[0] - b[0]; });
lines.push({ pts: hs, color: '#8aa2ff', width: 2.4 });
var P = U.plot(x, gx, gy, gw, gh, { xmin: 0, xmax: 50, ymin: 0, ymax: 14, nx: 5, ny: 7, title: 'pH against volume of NaOH (mL)', xlabel: 'V(NaOH) / mL', lines: lines });
x.fillStyle = '#ffb86b';
hs.forEach(function (q) { x.fillRect(P.sx(q[0]) - 1.5, P.sy(q[1]) - 1.5, 3, 3); });
x.fillStyle = '#fff'; x.beginPath(); x.arc(P.sx(S.Vb), P.sy(p), 5, 0, 2 * Math.PI); x.fill();
}
reset();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++;
if (pouring && dt > 0) add(2 * dt);
if (U.lp && fr % 2 && !pouring) return;
draw(dt);
if (fr % 6 === 0) {
var p = pH(S.Vb), ve = S.Ca * S.Va / S.Cb;
set('ph', U.f(p, 2)); set('h', Math.pow(10, -p).toExponential(2) + ' mol/L'); set('vb', U.f(S.Vb, 2) + ' mL');
set('nb', (S.Cb * S.Vb / 1000).toExponential(3) + ' mol'); set('na', S.unknown ? '? (unknown)' : (S.Ca * S.Va / 1000).toExponential(3) + ' mol');
set('ve', S.unknown ? '? — find it!' : U.f(ve, 2) + ' mL'); set('ind', INDS[S.ind].r);
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'ph-titration', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

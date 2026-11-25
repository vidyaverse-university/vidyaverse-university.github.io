/* VidyaVerse University — Projectile lab (labs/projectile.js). Plain script, no dependencies, 100% client-side. */
(function () {
var ID = 'projectile';
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
var META = { id: ID, title: 'Projectile lab', icon: '🎯', faculty: 'school', bands: ['secondary', 'senior', 'ug'],
summary: 'Launch a ball at any speed, angle and height — with or without air resistance — and hit targets while reading range, height and time of flight.' };
var D = Math.PI / 180;
var KD = 0.0254; // drag constant k = ½ρCdA/m for a football (m⁻¹)
function mount(el, api) {
var S = {}, C, sV, sA, sH, segG, tgD, tgP, set;
var U = vvKit(el, api, {
title: META.title, icon: META.icon,
goal: 'Use the equations of motion to land the ball on the target.',
free: 'Drag from the cannon to aim (direction = angle, length = speed), or use the sliders. Arrow keys on the picture aim; Enter fires. Turn on the prediction line to check your maths.',
note: '<p>Without air: x = v cosθ·t, y = h₀ + v sinθ·t − ½gt². Range on flat ground R = v² sin 2θ / g, maximum height H = h₀ + v² sin²θ / 2g.</p>' +
'<p>With air resistance the ball feels a drag acceleration −k|v|v (k = ½ρC<sub>d</sub>A/m ≈ 0.025 m⁻¹ for a football). The path is then found numerically, step by step.</p>' +
'<p><b>Simplified:</b> no spin (no swerve), no wind, constant g, ball treated as a point, flat ground; the ‘hit’ zone is ±1.2 m.</p>',
onReset: function () { reset(); }
});
function reset() {
S.v = 20; S.a = 45; S.h0 = 0; S.g = 9.81; S.drag = false; S.pred = false;
S.tx = 40; S.traces = []; S.fly = null; S.last = null; S.hitAngles = []; S.msg = '';
if (sV) { sV.set(20); sA.set(45); sH.set(0); segG.set(9.81); tgD.set(false); tgP.set(false); }
}
function analytic() {
var s = Math.sin(S.a * D), c = Math.cos(S.a * D), v = S.v, g = S.g;
var t = (v * s + Math.sqrt(v * v * s * s + 2 * g * S.h0)) / g;
return { t: t, R: v * c * t, H: S.h0 + v * v * s * s / (2 * g), vx: v * c, vy: v * s };
}
function simulate() {
var x = 0, y = S.h0, vx = S.v * Math.cos(S.a * D), vy = S.v * Math.sin(S.a * D), t = 0, h = 0.002, pts = [[0, y, vx, vy]], acc = 0, top = y;
var k = S.drag ? KD : 0;
while (t < 60) {
var sp = Math.sqrt(vx * vx + vy * vy);
var ax = -k * sp * vx, ay = -S.g - k * sp * vy;
var nx = x + vx * h, ny = y + vy * h;
vx += ax * h; vy += ay * h; t += h; acc += h;
if (ny < 0) { var f = y / (y - ny); x = x + (nx - x) * f; y = 0; pts.push([x, 0, vx, vy]); break; }
x = nx; y = ny; if (y > top) top = y;
if (acc >= 0.02) { acc = 0; pts.push([x, y, vx, vy]); }
}
return { pts: pts, x: x, t: t, top: top };
}
function worldW() {
if ((S.aim || S.fly) && S.Wl) return S.Wl;
S.Wl = worldW2(); return S.Wl;
}
function worldW2() {
var R = analytic().R, m = Math.max(40, S.tx + 12, R * 1.08);
S.traces.forEach(function (tr) { m = Math.max(m, tr.x * 1.05); });
var steps = [50, 60, 80, 100, 120, 150, 200, 250, 300];
for (var i = 0; i < steps.length; i++) if (steps[i] >= m) return steps[i];
return Math.ceil(m / 100) * 100;
}
function view() {
var w = C.w, h = C.h, W = worldW();
var sc = Math.min((w - 40) / W, (h - 50) / Math.max(20, W * 0.5, analytic().H * 1.1));
return { ox: 26, oy: h - 30, sc: sc, W: W };
}
function fire() {
if (S.fly) return;
var r = simulate();
r.a = S.a; r.v = S.v; r.drag = S.drag; r.h0 = S.h0;
S.fly = { r: r, i: 0, t0: 0 };
U.sound('whoosh');
if (U.rm) land();
}
function land() {
var r = S.fly.r; S.fly = null;
S.traces.push(r); if (S.traces.length > 6) S.traces.shift();
S.last = r;
var hit = Math.abs(r.x - S.tx) <= 1.2;
r.hit = hit;
if (hit) { S.hitAngles.push(r.a); U.sound('win'); S.msg = '🎯 Hit! Landed at ' + r.x.toFixed(2) + ' m'; }
else { U.sound('pop'); S.msg = (r.x < S.tx ? 'Short by ' : 'Long by ') + Math.abs(r.x - S.tx).toFixed(2) + ' m'; }
U.say(S.msg);
U.check();
}
C = U.canvas(U.stage, { ratio: 0.56, min: 260, label: 'Projectile field. Drag from the cannon to aim.' });
U.drag(C, {
down: function (p) { var V = view(); if (Math.hypot(p.x - V.ox, p.y - (V.oy - S.h0 * V.sc)) > 120) return false; S.aim = true; },
move: function (p) {
var V = view(), dx = p.x - V.ox, dy = (V.oy - S.h0 * V.sc) - p.y;
var a = U.clamp(Math.round(Math.atan2(dy, Math.max(0.1, dx)) / D), 0, 90);
var v = U.clamp(Math.round(Math.hypot(dx, dy) / 3), 5, 40);
S.a = a; S.v = v; sA.set(a); sV.set(v);
},
up: function () { S.aim = false; fire(); }
});
U.on(C.cv, 'keydown', function (e) {
var k = e.key;
if (k === 'ArrowUp' || k === 'ArrowDown') { S.a = U.clamp(S.a + (k === 'ArrowUp' ? 1 : -1), 0, 90); sA.set(S.a); e.preventDefault(); }
else if (k === 'ArrowLeft' || k === 'ArrowRight') { S.v = U.clamp(S.v + (k === 'ArrowRight' ? 0.5 : -0.5), 5, 40); sV.set(S.v); e.preventDefault(); }
else if (k === 'Enter' || k === ' ') { fire(); e.preventDefault(); }
});
sV = U.slider(U.ctrl, { label: 'Launch speed v', min: 5, max: 40, step: 0.5, value: 20, unit: 'm/s', onInput: function (v) { S.v = v; } });
sA = U.slider(U.ctrl, { label: 'Launch angle θ', min: 0, max: 90, step: 1, value: 45, unit: '°', onInput: function (v) { S.a = v; } });
sH = U.slider(U.ctrl, { label: 'Launch height h₀', min: 0, max: 50, step: 1, value: 0, unit: 'm', onInput: function (v) { S.h0 = v; } });
segG = U.seg(U.ctrl, 'Gravity g', [[9.81, '🌍 9.81'], [1.62, '🌙 1.62'], [3.71, '🔴 3.71']], 9.81, function (v) { S.g = v; });
function toggle(label, key) {
var b = U.h('button', { 'aria-pressed': 'false', text: label });
U.on(b, 'click', function () { S[key] = !S[key]; b.setAttribute('aria-pressed', S[key] ? 'true' : 'false'); U.sound('tap'); });
return { el: b, set: function (v) { S[key] = v; b.setAttribute('aria-pressed', v ? 'true' : 'false'); } };
}
var row = U.h('div', { cls: 'vvk-seg' });
tgD = toggle('💨 Air resistance', 'drag'); tgP = toggle('📈 Show prediction', 'pred');
row.appendChild(tgD.el); row.appendChild(tgP.el); U.ctrl.appendChild(row);
var bb = U.h('div', { cls: 'vvk-btns' }); U.ctrl.appendChild(bb);
U.button(bb, '🚀 Fire!', fire, 'vvk-go');
U.button(bb, '🧹 Clear paths', function () { S.traces = []; S.last = null; S.msg = ''; });
var tRow = U.slider(U.ctrl, { label: 'Target distance (free play)', min: 5, max: 150, step: 1, value: 40, unit: 'm', onInput: function (v) { if (U.mode === 'free') S.tx = v; } });
set = U.readouts([['R', 'Range (no air)'], ['T', 'Flight time (no air)'], ['H', 'Max height (no air)'], ['vx', 'vₓ = v cosθ'], ['vy', 'vᵧ = v sinθ'], ['L', 'Last landing']]);
function task(o) { o.setup = function () { S.tx = o.tx; S.hitAngles = []; S.msg = ''; tRow.set(o.tx); if (o.cfg) o.cfg(); }; return o; }
U.guided([
task({ title: 'First hit', tx: 40, xp: 10, t: 'Land the ball on the target 40 m away (flat ground, no air). Drag from the cannon or use the sliders, then Fire.',
hint: 'With θ = 45° on flat ground R = v²/g. For R = 40 m you need v = √(40 × 9.81) ≈ 19.8 m/s.',
cfg: function () { S.h0 = 0; sH.set(0); tgD.set(false); S.g = 9.81; segG.set(9.81); },
ok: 'Bullseye! Range depends on both speed and angle.', check: function () { return S.last && S.last.hit; } }),
task({ title: 'Best angle', tx: 40.8, xp: 15, t: 'Keep v = 20 m/s and h₀ = 0. Which angle gives the longest range? Fire at that angle and hit the target at 40.8 m.',
hint: 'R = v² sin 2θ / g is largest when sin 2θ = 1, i.e. 2θ = 90°.',
cfg: function () { S.v = 20; sV.set(20); S.h0 = 0; sH.set(0); tgD.set(false); S.a = 30; sA.set(30); },
ok: '45° gives the maximum range on flat ground without air: R = 400/9.81 = 40.8 m.',
check: function () { return S.last && S.last.v === 20 && Math.abs(S.last.a - 45) <= 1 && S.last.h0 === 0 && !S.last.drag; } }),
task({ title: 'Twin angles', tx: 30, xp: 15, t: 'Hit the 30 m target twice using two launch angles at least 20° apart (same speed is fine).',
hint: 'sin 2θ = sin(180° − 2θ), so θ and 90° − θ give the same range. At 20 m/s try about 24° and 66°.',
cfg: function () { S.h0 = 0; sH.set(0); tgD.set(false); },
ok: 'Complementary angles (adding to 90°) give equal ranges — the high one just takes longer.',
check: function () { var a = S.hitAngles; return a.length > 1 && Math.max.apply(null, a) - Math.min.apply(null, a) >= 20; } }),
task({ title: 'Cliff shot', tx: 50, xp: 15, t: 'Now you are on a 20 m cliff. Hit the target 50 m from the foot of the cliff.',
hint: 'Height adds flight time: t = (v sinθ + √(v² sin²θ + 2gh₀))/g. From a height, the best angle is a little below 45°.',
cfg: function () { S.h0 = 20; sH.set(20); tgD.set(false); },
ok: 'Launching from height gives more time in the air, so the same speed carries further.',
check: function () { return S.last && S.last.hit && S.last.h0 >= 19; } }),
task({ title: 'Real air', tx: 25, xp: 20, t: 'Turn on air resistance (it is on now) and hit the 25 m target. Compare with the no-air prediction!',
hint: 'Drag steals speed, so you need a faster launch than R = v² sin 2θ / g suggests, and a slightly lower angle (around 35–40°) works best.',
cfg: function () { S.h0 = 0; sH.set(0); tgD.set(true); },
ok: 'Air resistance shortens the range and makes the path lopsided — steeper on the way down.',
check: function () { return S.last && S.last.hit && S.last.drag; } })
]);
function trace(x, V, pts, upto, col, wdt) {
x.strokeStyle = col; x.lineWidth = wdt; x.beginPath();
for (var i = 0; i <= upto && i < pts.length; i++) { var X = V.ox + pts[i][0] * V.sc, Y = V.oy - pts[i][1] * V.sc; if (i) x.lineTo(X, Y); else x.moveTo(X, Y); }
x.stroke();
}
function draw(dt) {
var x = C.ctx, w = C.w, h = C.h, V = view(), i;
var sky = x.createLinearGradient(0, 0, 0, h);
sky.addColorStop(0, '#0d1a4a'); sky.addColorStop(0.7, '#25336e'); sky.addColorStop(1, '#3b2a5a');
x.fillStyle = sky; x.fillRect(0, 0, w, h);
// grid + labels
var stepM = V.W <= 60 ? 10 : V.W <= 150 ? 20 : 50;
x.font = '11px system-ui,sans-serif'; x.fillStyle = 'rgba(210,215,255,.7)'; x.strokeStyle = 'rgba(170,180,255,.12)'; x.lineWidth = 1;
for (i = 0; i <= V.W; i += stepM) { var gx = V.ox + i * V.sc; if (gx > w) break; x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, V.oy); x.stroke(); x.fillText(i + ' m', gx + 2, V.oy + 14); }
for (i = stepM; V.oy - i * V.sc > 10; i += stepM) { var gy = V.oy - i * V.sc; x.beginPath(); x.moveTo(V.ox, gy); x.lineTo(w, gy); x.stroke(); x.fillText(i + ' m', 2, gy - 2); }
var gr = x.createLinearGradient(0, V.oy, 0, h); gr.addColorStop(0, '#2f7a4a'); gr.addColorStop(1, '#173d27');
x.fillStyle = gr; x.fillRect(0, V.oy, w, h - V.oy);
// tower
if (S.h0 > 0) { x.fillStyle = '#5a4a7a'; x.fillRect(V.ox - 14, V.oy - S.h0 * V.sc, 22, S.h0 * V.sc); }
// target
var tx = V.ox + S.tx * V.sc;
x.fillStyle = 'rgba(255,90,120,.35)'; x.fillRect(tx - 1.2 * V.sc, V.oy - 3, 2.4 * V.sc, 6);
x.strokeStyle = '#fff'; x.lineWidth = 2; x.beginPath(); x.moveTo(tx, V.oy); x.lineTo(tx, V.oy - 34); x.stroke();
x.fillStyle = '#ff5a7a'; x.beginPath(); x.moveTo(tx, V.oy - 34); x.lineTo(tx + 18, V.oy - 28); x.lineTo(tx, V.oy - 22); x.fill();
x.fillStyle = '#fff'; x.fillText(S.tx.toFixed(1) + ' m', tx - 14, V.oy - 38);
// ghosts
S.traces.forEach(function (tr, k) { trace(x, V, tr.pts, 1e9, tr.hit ? 'rgba(74,222,128,.55)' : 'rgba(200,210,255,' + (0.18 + 0.08 * k) + ')', 1.6); });
// prediction
if (S.pred) { var pr = simulate(); x.setLineDash([5, 6]); trace(x, V, pr.pts, 1e9, 'rgba(255,220,150,.7)', 1.5); x.setLineDash([]); }
// cannon
var cy = V.oy - S.h0 * V.sc, ca = S.a * D;
x.save(); x.translate(V.ox, cy); x.rotate(-ca);
var bg = x.createLinearGradient(0, -7, 0, 7); bg.addColorStop(0, '#c9d2ff'); bg.addColorStop(1, '#5a669e');
x.fillStyle = bg; x.fillRect(0, -6, 34, 12); x.restore();
x.fillStyle = '#39406e'; x.beginPath(); x.arc(V.ox, cy, 10, 0, 2 * Math.PI); x.fill();
if (S.aim) { x.strokeStyle = 'rgba(255,184,107,.8)'; x.setLineDash([3, 4]); x.beginPath(); x.moveTo(V.ox, cy); x.lineTo(V.ox + Math.cos(ca) * S.v * 3, cy - Math.sin(ca) * S.v * 3); x.stroke(); x.setLineDash([]); }
// flying ball
if (S.fly) {
var F = S.fly; F.t0 += dt; F.i = Math.min(F.r.pts.length - 1, Math.floor(F.t0 / 0.02));
trace(x, V, F.r.pts, F.i, '#ffb86b', 2.4);
var p = F.r.pts[F.i], bx = V.ox + p[0] * V.sc, by = V.oy - p[1] * V.sc;
x.strokeStyle = '#4ade80'; x.lineWidth = 2; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + p[2] * 2, by); x.stroke();
x.strokeStyle = '#7cc4ff'; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx, by - p[3] * 2); x.stroke();
var rg = x.createRadialGradient(bx - 2, by - 2, 1, bx, by, 7); rg.addColorStop(0, '#fff'); rg.addColorStop(1, '#ff9b4a');
x.fillStyle = rg; x.beginPath(); x.arc(bx, by, 6, 0, 2 * Math.PI); x.fill();
x.fillStyle = '#e8ecff'; x.fillText('t = ' + (F.i * 0.02).toFixed(2) + ' s  x = ' + p[0].toFixed(1) + ' m  y = ' + p[1].toFixed(1) + ' m', 12, 18);
if (F.i >= F.r.pts.length - 1) land();
} else if (S.msg) { x.fillStyle = '#ffe2b8'; x.font = '600 14px system-ui,sans-serif'; x.fillText(S.msg, 12, 20); }
}
reset();
U.G.begin();
var fr = 0;
U.loop(function (dt) {
fr++;
if (U.lp && fr % 2 && !S.fly) return;
draw(dt);
if (fr % 8 === 0) {
var A = analytic();
set('R', U.f(A.R, 2) + ' m'); set('T', U.f(A.t, 2) + ' s'); set('H', U.f(A.H, 2) + ' m');
set('vx', U.f(A.vx, 2) + ' m/s'); set('vy', U.f(A.vy, 2) + ' m/s');
set('L', S.last ? U.f(S.last.x, 2) + ' m in ' + U.f(S.last.t, 2) + ' s' : '—');
}
});
return { destroy: U.destroy };
}
window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
window.VVLabs.register({ id: 'projectile', title: META.title, icon: META.icon, faculty: META.faculty, bands: META.bands, summary: META.summary, mount: mount });
})();

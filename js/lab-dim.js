/* VidyaVerse v2 — built-in Dimension Lab (2D → 9D), adapted from VidyaVerse v1 and registered with VVLabs */
(function () {
  'use strict';
  var V2 = window.VV2, api0 = null, idc = 0;
  var D = window.VVDim = {
    reduced: !!(V2 && V2.reduced), lowPower: !!(V2 && V2.lowPower), W: {},
    dpr: function () { return Math.min(window.devicePixelRatio || 1, 2); },
    h: function (t, a, k) { return V2.h(t, a, k); },
    $$: function (s, r) { return V2.$$(s, r); },
    clamp: function (v, a, b) { return v < a ? a : v > b ? b : v; },
    fmt: function (n, d) { if (!isFinite(n)) return '—'; var f = Math.pow(10, d == null ? 2 : d); return String(Math.round(n * f) / f); },
    hush: function () { if (V2) V2.hush(); },
    sfx: { play: function (n) { var m = { ok: 'good', bad: 'bad', tick: 'tick', pop: 'pop', whoosh: 'whoosh', win: 'win' }; if (api0) api0.sound(m[n] || 'tap'); } },
    toast: function (m) { if (V2) V2.toast(m, '🧊'); },
    awardBadge: function () { if (V2) V2.store.badge('dims'); if (api0) api0.award(5, 'Dimension Lab discovery'); },
    applyI18n: function () { },
    canvas: function (parent, opts) {
      opts = opts || {};
      var wrap = D.h('div', { class: 'cvwrap' }), cv = D.h('canvas', { role: 'img', 'aria-label': opts.label || 'Interactive diagram' });
      wrap.appendChild(cv); parent.appendChild(wrap);
      var o = { cv: cv, ctx: cv.getContext('2d'), w: 300, h: 200, wrap: wrap };
      function fit() { var w = wrap.clientWidth || 300, hh = opts.h ? opts.h : Math.round(w * (opts.ratio || 0.62)); if (opts.max) hh = Math.min(hh, opts.max); if (opts.min) hh = Math.max(hh, opts.min); var d = D.dpr(); cv.width = Math.round(w * d); cv.height = Math.round(hh * d); cv.style.width = w + 'px'; cv.style.height = hh + 'px'; o.ctx.setTransform(d, 0, 0, d, 0, 0); o.w = w; o.h = hh; if (o.onresize) o.onresize(); }
      o.fit = fit; fit(); var lw = wrap.clientWidth;
      if (window.ResizeObserver) { var ro = new ResizeObserver(function () { if (!wrap.isConnected) { ro.disconnect(); return; } if (Math.abs(wrap.clientWidth - lw) > 2) { lw = wrap.clientWidth; fit(); } }); ro.observe(wrap); }
      else window.addEventListener('resize', function r() { if (!wrap.isConnected) { window.removeEventListener('resize', r); return; } fit(); });
      return o;
    },
    loop: function (el, fn) {
      var t0 = performance.now(), last = t0, alive = true, id;
      function f(now) { if (!alive) return; if (!el.isConnected) { alive = false; return; } var dt = Math.min(0.05, (now - last) / 1000); last = now; if (!document.hidden && el.offsetParent !== null) { try { fn((now - t0) / 1000, dt); } catch (e) { alive = false; return; } } id = requestAnimationFrame(f); }
      id = requestAnimationFrame(f); return function () { alive = false; cancelAnimationFrame(id); };
    },
    drag: function (el, hd) {
      el.style.touchAction = 'none'; var active = null;
      function pos(e) { var r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
      el.addEventListener('pointerdown', function (e) { active = e.pointerId; try { el.setPointerCapture(e.pointerId); } catch (_) { } if (hd.down) hd.down(pos(e), e); if (e.cancelable) e.preventDefault(); });
      el.addEventListener('pointermove', function (e) { var p = pos(e); if (active === e.pointerId) { if (hd.move) hd.move(p, e); } else if (hd.hover) hd.hover(p, e); });
      function up(e) { if (active !== e.pointerId) return; active = null; if (hd.up) hd.up(pos(e), e); }
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    },
    ctrls: function (parent, cls) { var d = D.h('div', { class: 'ctrls ' + (cls || '') }); parent.appendChild(d); return d; },
    btn: function (parent, label, fn, cls, aria) { var b = D.h('button', { type: 'button', class: 'btn small ' + (cls || ''), 'aria-label': aria || null }, label); b.addEventListener('click', function (e) { if (fn) fn(e, b); }); if (parent) parent.appendChild(b); return b; },
    slider: function (parent, label, min, max, step, val, fn, fmt) {
      var id = 'dsl' + (++idc), inp = D.h('input', { type: 'range', id: id, min: min, max: max, step: step, value: val }), out = D.h('output', { for: id, class: 'sl-o' });
      var row = D.h('label', { class: 'sl', for: id }, [D.h('span', { class: 'sl-l' }, label), inp, out]);
      function show() { var v = parseFloat(inp.value); out.textContent = fmt ? fmt(v) : String(v); return v; }
      inp.addEventListener('input', function () { var v = show(); if (fn) fn(v); }); show();
      inp.get = function () { return parseFloat(inp.value); }; inp.set = function (v) { inp.value = v; show(); };
      parent.appendChild(row); return inp;
    },
    seg: function (parent, labels, fn, start) {
      var d = D.h('div', { class: 'seg mini', role: 'tablist' });
      var bs = labels.map(function (l, i) { var b = D.h('button', { type: 'button', role: 'tab', class: 'seg-b', 'aria-selected': i === (start || 0) ? 'true' : 'false' }, l); b.addEventListener('click', function () { bs.forEach(function (x, j) { x.setAttribute('aria-selected', j === i ? 'true' : 'false'); }); fn(i); }); d.appendChild(b); return b; });
      parent.appendChild(d); return d;
    }
  };
  D._setApi = function (a) { api0 = a; D.reduced = !!(a && a.reducedMotion); D.lowPower = !!(a && a.lowPower); };
})();

/* VidyaVerse P3: tiny hand-written 3D canvas engine (balls, lines, labels) with drag-to-rotate */
(function () {
  'use strict';
  var VV = window.VVDim;
  function ball(ctx, x, y, r, c, glow, alpha) {
    if (r < 0.4) return;
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    if (glow && !VV.lowPower) { ctx.shadowColor = c; ctx.shadowBlur = r * 1.6; }
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    ctx.shadowBlur = 0;
    var g = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.05, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,.85)'); g.addColorStop(0.3, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.42)');
    ctx.fillStyle = g; ctx.fill(); ctx.globalAlpha = 1;
  }
  function arrowHead(ctx, a, b, c, size) {
    var ang = Math.atan2(b.y - a.y, b.x - a.x), s = size || 10;
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x - s * Math.cos(ang - 0.4), b.y - s * Math.sin(ang - 0.4));
    ctx.lineTo(b.x - s * Math.cos(ang + 0.4), b.y - s * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
  }
  VV.P3 = { ball: ball, arrowHead: arrowHead };

  /* sphere wireframe as segments */
  VV.P3.sphere = function (r, n, c, o, center) {
    var L = [], cx = center ? center[0] : 0, cy = center ? center[1] : 0, cz = center ? center[2] : 0, i, j, a0, a1;
    n = n || 10;
    for (i = 1; i < n; i++) {
      var lat = -Math.PI / 2 + Math.PI * i / n, yy = Math.sin(lat) * r, rr = Math.cos(lat) * r;
      for (j = 0; j < 24; j++) { a0 = j / 24 * 6.2832; a1 = (j + 1) / 24 * 6.2832; L.push({ a: [cx + Math.cos(a0) * rr, cy + yy, cz + Math.sin(a0) * rr], b: [cx + Math.cos(a1) * rr, cy + yy, cz + Math.sin(a1) * rr], c: c, o: o, w: 1 }); }
    }
    for (j = 0; j < n; j++) {
      var lo = j / n * Math.PI;
      for (i = 0; i < 24; i++) {
        a0 = i / 24 * 6.2832; a1 = (i + 1) / 24 * 6.2832;
        L.push({ a: [cx + Math.cos(a0) * Math.cos(lo) * r, cy + Math.sin(a0) * r, cz + Math.cos(a0) * Math.sin(lo) * r], b: [cx + Math.cos(a1) * Math.cos(lo) * r, cy + Math.sin(a1) * r, cz + Math.cos(a1) * Math.sin(lo) * r], c: c, o: o, w: 1 });
      }
    }
    return L;
  };
  VV.P3.ring = function (r, c, o, tilt, seg, y) {
    var L = [], s = seg || 64, t = tilt || 0;
    for (var i = 0; i < s; i++) {
      var a0 = i / s * 6.2832, a1 = (i + 1) / s * 6.2832;
      function p(a) { var x = Math.cos(a) * r, z = Math.sin(a) * r, yy = (y || 0); return [x, yy + z * Math.sin(t), z * Math.cos(t)]; }
      L.push({ a: p(a0), b: p(a1), c: c, o: o, w: 1 });
    }
    return L;
  };
  VV.P3.cube = function (s, c) {
    var v = [], L = [], i, j;
    for (i = 0; i < 8; i++) v.push([(i & 1 ? 1 : -1) * s, (i & 2 ? 1 : -1) * s, (i & 4 ? 1 : -1) * s]);
    for (i = 0; i < 8; i++) for (j = i + 1; j < 8; j++) { var d = i ^ j; if (d === 1 || d === 2 || d === 4) L.push({ a: v[i], b: v[j], c: c || '#8ef', w: 2 }); }
    return { v: v, lines: L };
  };
  VV.P3.axes = function (len, labels) {
    var L = [{ a: [0, 0, 0], b: [len, 0, 0], c: '#ff6b6b', w: 2, arrow: true }, { a: [0, 0, 0], b: [0, len, 0], c: '#6bff95', w: 2, arrow: true }, { a: [0, 0, 0], b: [0, 0, len], c: '#6bb5ff', w: 2, arrow: true },
    { a: [0, 0, 0], b: [-len, 0, 0], c: '#ff6b6b', w: 1, o: .35 }, { a: [0, 0, 0], b: [0, -len, 0], c: '#6bff95', w: 1, o: .35 }, { a: [0, 0, 0], b: [0, 0, -len], c: '#6bb5ff', w: 1, o: .35 }];
    var lb = labels || ['x', 'y', 'z'];
    return { lines: L, labels: [{ p: [len * 1.1, 0, 0], t: lb[0], c: '#ff9b9b' }, { p: [0, len * 1.1, 0], t: lb[1], c: '#9bffb5' }, { p: [0, 0, len * 1.1], t: lb[2], c: '#9bcfff' }] };
  };

  /* the viewer */
  VV.view3d = function (parent, opts) {
    opts = opts || {};
    var C = VV.canvas(parent, { ratio: opts.ratio || 0.72, max: opts.max || 520, min: opts.min || 240, label: opts.label || '3D model — drag to rotate, use arrow keys too' });
    C.cv.classList.add('cv3d');
    var st = { yaw: opts.yaw == null ? 0.6 : opts.yaw, pitch: opts.pitch == null ? -0.35 : opts.pitch, zoom: opts.zoom || 1, auto: opts.auto !== false && !VV.reduced, scene: opts.scene || function () { return {}; }, dragging: false, spin: opts.spin || 0.25 };
    var lx = 0, ly = 0, pinch = null, pointers = {};
    VV.drag(C.cv, {
      down: function (p, e) { pointers[e.pointerId] = p; st.dragging = true; lx = p.x; ly = p.y; if (opts.onDown) opts.onDown(p); },
      move: function (p, e) {
        pointers[e.pointerId] = p;
        var ids = Object.keys(pointers);
        if (ids.length === 2) { var a = pointers[ids[0]], b = pointers[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) st.zoom = VV.clamp(st.zoom * d / pinch, 0.4, 3.5); pinch = d; return; }
        st.yaw += (p.x - lx) * 0.01; st.pitch = VV.clamp(st.pitch + (p.y - ly) * 0.01, -1.55, 1.55); lx = p.x; ly = p.y;
      },
      up: function (p, e) { delete pointers[e.pointerId]; pinch = null; if (!Object.keys(pointers).length) st.dragging = false; }
    });
    C.cv.addEventListener('wheel', function (e) { e.preventDefault(); st.zoom = VV.clamp(st.zoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.4, 3.5); }, { passive: false });
    C.cv.tabIndex = 0;
    C.cv.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowLeft') st.yaw -= 0.12; else if (k === 'ArrowRight') st.yaw += 0.12;
      else if (k === 'ArrowUp') st.pitch = VV.clamp(st.pitch - 0.12, -1.55, 1.55); else if (k === 'ArrowDown') st.pitch = VV.clamp(st.pitch + 0.12, -1.55, 1.55);
      else if (k === '+' || k === '=') st.zoom = Math.min(3.5, st.zoom * 1.1); else if (k === '-') st.zoom = Math.max(0.4, st.zoom / 1.1);
      else return;
      e.preventDefault();
    });
    function proj(p) {
      var cy = Math.cos(st.yaw), sy = Math.sin(st.yaw), cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
      var x = p[0] * cy - p[2] * sy, z = p[0] * sy + p[2] * cy;
      var y = p[1] * cp - z * sp; z = p[1] * sp + z * cp;
      var s = Math.min(C.w, C.h) * 0.36 * st.zoom, d = 4, k = d / Math.max(0.3, d + z);
      return { x: C.w / 2 + x * s * k, y: C.h / 2 - y * s * k, z: z, k: k, s: s };
    }
    var api = { st: st, C: C, proj: proj, set: function (fn) { st.scene = fn; } };
    VV.loop(C.cv, function (t, dt) {
      if (st.auto && !st.dragging) st.yaw += dt * st.spin;
      var ctx = C.ctx; ctx.clearRect(0, 0, C.w, C.h);
      if (opts.bg) opts.bg(ctx, C.w, C.h, t);
      var sc = st.scene(t, dt) || {}, items = [];
      (sc.lines || []).forEach(function (l) {
        var a = proj(l.a), b = proj(l.b);
        items.push({ z: (a.z + b.z) / 2, f: function () {
          ctx.strokeStyle = l.c || '#fff'; ctx.globalAlpha = l.o == null ? 1 : l.o; ctx.lineWidth = Math.max(0.5, (l.w || 1.5) * (a.k + b.k) / 2);
          if (l.dash) ctx.setLineDash(l.dash);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
          if (l.arrow) arrowHead(ctx, a, b, l.c || '#fff', 9 * (a.k + b.k) / 2);
          ctx.globalAlpha = 1;
        } });
      });
      (sc.balls || []).forEach(function (bl) {
        var p = proj(bl.p), r = bl.r * p.s * p.k * 0.25;
        items.push({ z: p.z, f: function () { ball(ctx, p.x, p.y, r, bl.c, bl.glow, bl.o); if (bl.ring) { ctx.strokeStyle = bl.ring; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p.x, p.y, r + 5, 0, 6.2832); ctx.stroke(); } } });
      });
      (sc.labels || []).forEach(function (lb) {
        var p = proj(lb.p);
        items.push({ z: p.z - 0.02, f: function () {
          ctx.font = '600 ' + (lb.size || 12) + 'px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif'; ctx.textAlign = 'center';
          ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText(lb.t, p.x, p.y + (lb.dy || 0));
          ctx.fillStyle = lb.c || '#fff'; ctx.fillText(lb.t, p.x, p.y + (lb.dy || 0));
        } });
      });
      items.sort(function (a, b) { return b.z - a.z; });
      for (var i = 0; i < items.length; i++) items[i].f();
      if (opts.after) opts.after(ctx, C.w, C.h, t);
    });
    return api;
  };
  /* starry background used by several 3D views */
  VV.P3.stars = function (n) {
    var s = []; for (var i = 0; i < n; i++) s.push([Math.random(), Math.random(), Math.random() * 1.2 + 0.2, Math.random() * 6]);
    return function (ctx, w, h, t) {
      var g = ctx.createRadialGradient(w / 2, h * 0.4, 10, w / 2, h / 2, Math.max(w, h) * 0.75);
      g.addColorStop(0, '#1d2766'); g.addColorStop(1, '#05070f'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (var i = 0; i < s.length; i++) { ctx.globalAlpha = 0.4 + 0.4 * Math.sin(t * 1.5 + s[i][3]); ctx.fillStyle = '#fff'; ctx.fillRect(s[i][0] * w, s[i][1] * h, s[i][2], s[i][2]); }
      ctx.globalAlpha = 1;
    };
  };
})();

/* VidyaVerse Dimension Lab — 2D shapes, 3D models, 4D tesseract & time, 5D–9D hypercube projections */
(function () {
  'use strict';
  var VV = window.VVDim, h = VV.h;
  var AX = ['x', 'y', 'z', 'w', 'v', 'u', 't', 's', 'r'];
  var mode = null, mounted = false;

  function award(id) { if (VV.awardBadge) VV.awardBadge(id); else if (VV.store.award(id)) VV.toast('🏅 ' + VV.store.badge(id).name); }
  function el(id) { return document.getElementById(id); }
  function hue(k, n) { return 'hsl(' + Math.round(k * 360 / n + 190) % 360 + ',90%,64%)'; }
  function binom(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }

  /* ---------------- 2D ---------------- */
  function mode2d(stage, ctrl, text) {
    var sub = 0, n = 6, R = 0.8, rot = 0, sweep = 0, playing = false;
    var C = VV.canvas(stage, { ratio: 0.75, max: 560, min: 280, label: '2D shape on a coordinate grid' });
    VV.seg(ctrl, ['📐 Shapes', '🪜 Build up dimensions'], function (i) { sub = i; box1.hidden = i !== 0; box2.hidden = i !== 1; sweep = 0; playing = i === 1 && !VV.reduced; info(); }, 0);
    var box1 = h('div'), box2 = h('div'); ctrl.appendChild(box1); ctrl.appendChild(box2); box2.hidden = true;
    VV.slider(box1, 'Sides n', 3, 13, 1, n, function (v) { n = v; info(); }, function (v) { return v === 13 ? '∞ (circle)' : String(v); });
    VV.slider(box1, 'Radius r', 0.3, 1, 0.01, R, function (v) { R = v; info(); }, function (v) { return v.toFixed(2); });
    VV.slider(box1, 'Rotate', 0, 360, 1, 0, function (v) { rot = v * Math.PI / 180; }, function (v) { return v + '°'; });
    var sw = VV.slider(box2, 'Sweep', 0, 3, 0.01, 0, function (v) { sweep = v; playing = false; info(); }, function (v) { return v < 1 ? '0D → 1D' : v < 2 ? '1D → 2D' : '2D → 3D'; });
    VV.btn(box2, '▶ Play the ladder', function () { sweep = 0; playing = true; });
    function info() {
      if (sub === 0) {
        var circ = n === 13, A = circ ? Math.PI * R * R : 0.5 * n * R * R * Math.sin(2 * Math.PI / n), P = circ ? 2 * Math.PI * R : 2 * n * R * Math.sin(Math.PI / n);
        text.innerHTML = '<h3>2D: length × width</h3><p>A flat world has two independent directions, so every point needs exactly <b>two numbers</b> (x, y). Shapes have area but no thickness.</p>' +
          '<p class="formula">' + (circ ? 'Circle: A = πr² = ' + VV.fmt(A, 3) + ', C = 2πr = ' + VV.fmt(P, 3) : 'Regular ' + n + '-gon: A = ½·n·r²·sin(2π/n) = ' + VV.fmt(A, 3) + '<br>Perimeter = 2·n·r·sin(π/n) = ' + VV.fmt(P, 3)) + '</p>' +
          '<p>Slide n upward: the polygon\u2019s area creeps towards πr². That is how Archimedes squeezed π between polygons over 2,200 years ago.</p>';
      } else {
        text.innerHTML = '<h3>Climbing the dimension ladder</h3><p>Drag a <b>point</b> (0D) and it traces a <b>segment</b> (1D, 2 ends). Drag the segment sideways: a <b>square</b> (2D, 4 corners). Drag the square "out of the page": a <b>cube</b> (3D, 8 corners).</p>' +
          '<p>Each step doubles the corners: 1 → 2 → 4 → 8 → 16… A 4D hypercube (tesseract) is what you get by dragging a cube along a fourth direction at right angles to all three. We can\u2019t point in that direction — but maths can, and the 4D tab shows its shadow.</p>';
      }
    }
    info();
    VV.loop(C.cv, function (t, dt) {
      var g = C.ctx, w = C.w, H = C.h, s = Math.min(w, H) * 0.42, cx = w / 2, cy = H / 2;
      g.clearRect(0, 0, w, H);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1;
      for (var i = -10; i <= 10; i++) { g.beginPath(); g.moveTo(cx + i * s / 5, 0); g.lineTo(cx + i * s / 5, H); g.stroke(); g.beginPath(); g.moveTo(0, cy + i * s / 5); g.lineTo(w, cy + i * s / 5); g.stroke(); }
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(0, cy); g.lineTo(w, cy); g.moveTo(cx, 0); g.lineTo(cx, H); g.stroke();
      g.fillStyle = '#ff9b9b'; g.font = '600 12px system-ui,sans-serif'; g.fillText('x', w - 14, cy - 6); g.fillStyle = '#9bffb5'; g.fillText('y', cx + 6, 14);
      if (sub === 0) {
        var pts = [], N = n === 13 ? 96 : n;
        for (var k = 0; k < N; k++) { var a = rot + k / N * 6.2832 - Math.PI / 2; pts.push([Math.cos(a) * R, Math.sin(a) * R]); }
        var grad = g.createLinearGradient(cx - s, cy - s, cx + s, cy + s); grad.addColorStop(0, 'rgba(124,92,255,.55)'); grad.addColorStop(1, 'rgba(239,71,111,.45)');
        g.fillStyle = grad; g.strokeStyle = '#b9a8ff'; g.lineWidth = 2.5; g.beginPath();
        pts.forEach(function (p, i) { var X = cx + p[0] * s, Y = cy - p[1] * s; if (i) g.lineTo(X, Y); else g.moveTo(X, Y); }); g.closePath(); g.fill(); g.stroke();
        if (n !== 13) pts.forEach(function (p, i) { var X = cx + p[0] * s, Y = cy - p[1] * s; VV.P3.ball(g, X, Y, 5, '#ffd166', true); if (n <= 8) { g.fillStyle = '#dfe6ff'; g.font = '11px system-ui,sans-serif'; g.fillText('(' + p[0].toFixed(2) + ', ' + p[1].toFixed(2) + ')', X + 8, Y - 6); } });
        g.strokeStyle = 'rgba(255,209,102,.6)'; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + pts[0][0] * s, cy - pts[0][1] * s); g.stroke(); g.setLineDash([]);
      } else {
        if (playing) { sweep = Math.min(3, sweep + dt * 0.45); sw.set(sweep); if (sweep >= 3) playing = false; }
        var L = 0.55 * s, a1 = Math.min(1, sweep), a2 = VV.clamp(sweep - 1, 0, 1), a3 = VV.clamp(sweep - 2, 0, 1);
        var ox = cx - L / 2, oy = cy + L / 2, dx = L * 0.45 * a3, dy = -L * 0.35 * a3;
        function P(x, y, z) { return [ox + x * L + z * dx, oy - y * L + z * dy]; }
        var V = [];
        [0, 1].forEach(function (z) { [0, 1].forEach(function (y) { [0, 1].forEach(function (x) { V.push([x * a1, y * a2, z]); }); }); });
        g.lineWidth = 3; g.globalCompositeOperation = 'lighter';
        for (var i2 = 0; i2 < 8; i2++) for (var j = i2 + 1; j < 8; j++) { var d = i2 ^ j; if (d !== 1 && d !== 2 && d !== 4) continue; if ((d === 4) && a3 <= 0) continue; if (i2 >= 4 && a3 <= 0) continue;
          var A = P(V[i2][0], V[i2][1], V[i2][2] ? 1 : 0), B = P(V[j][0], V[j][1], V[j][2] ? 1 : 0);
          g.strokeStyle = d === 1 ? '#ff6b6b' : d === 2 ? '#6bff95' : '#6bb5ff'; g.beginPath(); g.moveTo(A[0], A[1]); g.lineTo(B[0], B[1]); g.stroke(); }
        g.globalCompositeOperation = 'source-over';
        if (a2 > 0) { g.fillStyle = 'rgba(107,255,149,.10)'; var q = [P(0, 0, 0), P(a1, 0, 0), P(a1, a2, 0), P(0, a2, 0)]; g.beginPath(); q.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.fill(); }
        var seen = {};
        V.forEach(function (v, i) { if (i >= 4 && a3 <= 0) return; var p = P(v[0], v[1], v[2] && a3 > 0 ? 1 : 0), key = Math.round(p[0]) + ',' + Math.round(p[1]); if (seen[key]) return; seen[key] = 1; VV.P3.ball(g, p[0], p[1], 6, '#ffd166', true); });
        var lab = sweep < 1 ? '0D point → 1D segment (2 corners)' : sweep < 2 ? '1D segment → 2D square (4 corners)' : '2D square → 3D cube (8 corners)';
        g.fillStyle = '#fff'; g.font = '700 15px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText(lab, cx, 26); g.textAlign = 'left';
      }
    });
  }

  /* ---------------- 3D ---------------- */
  var PLAN = [['Mercury', '#b1a79c', 0.39, 0.24, 0.05], ['Venus', '#e8c07a', 0.72, 0.62, 0.08], ['Earth', '#3d8bff', 1, 1, 0.085], ['Mars', '#d9573a', 1.52, 1.88, 0.06], ['Jupiter', '#d8a878', 5.2, 11.86, 0.18], ['Saturn', '#e9d29a', 9.54, 29.46, 0.15], ['Uranus', '#8fe3ea', 19.2, 84, 0.11], ['Neptune', '#4b6cff', 30.1, 164.8, 0.11]];
  function orbit(a) { return 0.3 + Math.sqrt(a) * 0.17; }
  function mode3d(stage, ctrl, text) {
    var M = [['🧊 Cube', 'cube'], ['🌐 Sphere', 'sphere'], ['☀️ Solar system', 'solar'], ['➡️ Vector space', 'vec']], cur = 'cube', av = [0.8, 0.5, 0.3], V = null;
    var sel = h('select', { 'aria-label': 'Choose a 3D model' }); M.forEach(function (m) { sel.appendChild(h('option', { value: m[1] }, m[0])); });
    var row = VV.ctrls(ctrl); row.appendChild(sel);
    var extra = h('div'); ctrl.appendChild(extra);
    sel.addEventListener('change', function () { cur = sel.value; build(); });
    var TXT = {
      cube: '<h3>3D: add depth</h3><p>A cube needs <b>three numbers</b> per point (x, y, z). It has 8 vertices, 12 edges and 6 square faces. Drag to rotate, pinch or scroll to zoom, or use the arrow keys.</p><p>Notice that your screen is flat: what you see is a <em>perspective projection</em> — nearer edges look bigger. Your brain rebuilds the 3D shape from that 2D shadow. Hold on to that idea for 4D!</p>',
      sphere: '<h3>The sphere</h3><p>Every point on a sphere is the same distance r from the centre: x² + y² + z² = r². Surface area 4πr², volume (4/3)πr³.</p><p>Lines of latitude and longitude give every point two coordinates — exactly how maps locate places on Earth.</p>',
      solar: '<h3>The solar system (not to scale!)</h3><p>Orbits are drawn with a square-root distance squash so all eight planets fit; real Neptune is 30× farther from the Sun than Earth. Speeds follow the real orbital periods (Kepler\u2019s third law: T² ∝ a³), sped up enormously.</p>',
      vec: '<h3>Vector space ℝ³</h3><p>Change <b>a</b> with the sliders; <b>b</b> is fixed. The yellow arrow is <b>a + b</b> (tip-to-tail). The panel shows the dot product a·b and the length of the cross product |a × b| — the area of the parallelogram.</p>',
      cell: '<h3>An animal / plant cell</h3><p>A simplified 3D model of organelles. Real cells are crowded, wobbly and around 10–100 micrometres across.</p>',
      mol: '<h3>Molecules in 3D</h3><p>Bond angles come from electron pairs pushing apart: 109.5° in methane, 120° in ethene, 180° in ethyne. Geometry here is approximate.</p>'
    };
    function build() {
      stage.innerHTML = '';
      extra.innerHTML = ''; text.innerHTML = TXT[cur];
      if (cur === 'cell' || cur === 'mol') { try { VV.W[cur === 'cell' ? 'cell' : 'molecule'](stage, {}, { mode: 'learn' }); } catch (e) { stage.appendChild(h('p', { class: 'vis-fail' }, 'This model could not load on this device.')); } return; }
      if (cur === 'vec') {
        VV.slider(extra, 'a · x', -1, 1, 0.05, av[0], function (v) { av[0] = v; vinfo(); }, function (v) { return v.toFixed(2); });
        VV.slider(extra, 'a · y', -1, 1, 0.05, av[1], function (v) { av[1] = v; vinfo(); }, function (v) { return v.toFixed(2); });
        VV.slider(extra, 'a · z', -1, 1, 0.05, av[2], function (v) { av[2] = v; vinfo(); }, function (v) { return v.toFixed(2); });
        extra.appendChild(h('p', { class: 'wnote', id: 'labVecInfo' })); vinfo();
      }
      V = VV.view3d(stage, { ratio: 0.8, max: 600, min: 280, bg: VV.P3.stars(VV.lowPower ? 60 : 140), zoom: cur === 'solar' ? 1.1 : 1, scene: scene() });
    }
    var B = [-0.4, 0.7, 0.5];
    function vinfo() {
      var e = el('labVecInfo'); if (!e) return;
      var d = av[0] * B[0] + av[1] * B[1] + av[2] * B[2], c = [av[1] * B[2] - av[2] * B[1], av[2] * B[0] - av[0] * B[2], av[0] * B[1] - av[1] * B[0]], cl = Math.hypot(c[0], c[1], c[2]);
      e.textContent = 'a = (' + av.map(function (x) { return x.toFixed(2); }).join(', ') + '), b = (−0.40, 0.70, 0.50) → a·b = ' + d.toFixed(3) + (Math.abs(d) < 0.02 ? ' ⟂ perpendicular!' : '') + ', |a×b| = ' + cl.toFixed(3);
    }
    function scene() {
      if (cur === 'cube') { var cb = VV.P3.cube(0.7, '#8ef'); return function () { return { lines: cb.lines, balls: cb.v.map(function (p) { return { p: p, r: 0.18, c: '#ffd166', glow: true }; }), labels: [{ p: [0, 1.05, 0], t: '8 vertices · 12 edges · 6 faces', c: '#dfe6ff' }] }; }; }
      if (cur === 'sphere') { var sp = VV.P3.sphere(0.85, 10, '#7fd1ff', 0.45); return function (t) { var a = t * 0.8; return { lines: sp, balls: [{ p: [Math.cos(a) * 0.85, Math.sin(a * 0.6) * 0.3, Math.sin(a) * 0.85], r: 0.25, c: '#ff5e8a', glow: true }], labels: [{ p: [0, 1.05, 0], t: 'x² + y² + z² = r²', c: '#dfe6ff' }] }; }; }
      if (cur === 'solar') {
        var rings = []; PLAN.forEach(function (p) { rings = rings.concat(VV.P3.ring(orbit(p[2]), 'rgba(255,255,255,.25)', 0.6, 0, 72)); });
        return function (t) {
          var balls = [{ p: [0, 0, 0], r: 0.55, c: '#ffcf4d', glow: true }], labels = [];
          PLAN.forEach(function (p, i) { var a = (VV.reduced ? 0 : t) * 1.2 / p[3] + i, r = orbit(p[2]), q = [Math.cos(a) * r, 0, Math.sin(a) * r]; balls.push({ p: q, r: p[4] * 1.6, c: p[1], glow: true }); labels.push({ p: [q[0], 0.09, q[2]], t: p[0], c: '#dfe6ff', size: 10 }); });
          return { lines: rings, balls: balls, labels: labels };
        };
      }
      return function () {
        var ax = VV.P3.axes(1.1), L = ax.lines.slice(), a = av, s = [a[0] + B[0], a[1] + B[1], a[2] + B[2]];
        L.push({ a: [0, 0, 0], b: a, c: '#ff5e8a', w: 3, arrow: true }, { a: [0, 0, 0], b: B, c: '#4cc9f0', w: 3, arrow: true }, { a: [0, 0, 0], b: s, c: '#ffd166', w: 3, arrow: true },
          { a: a, b: s, c: 'rgba(76,201,240,.5)', w: 1.5, dash: [5, 5] }, { a: B, b: s, c: 'rgba(255,94,138,.5)', w: 1.5, dash: [5, 5] });
        var lab = ax.labels.concat([{ p: a, t: 'a', c: '#ff9bb5', dy: -8 }, { p: B, t: 'b', c: '#9be3ff', dy: -8 }, { p: s, t: 'a + b', c: '#ffe08a', dy: -8 }]);
        return { lines: L, labels: lab };
      };
    }
    build();
  }

  /* ---------------- hypercube engine (4D and nD) ---------------- */
  function hyper(stage, ctrl, text, n0, isND) {
    var n = n0, verts = [], edges = [], ang = {}, spd = {}, yaw = 0.5, pitch = -0.3, zoom = 1, persp = true, D = isND ? 3 : 2, fitR = 1, paused = VV.reduced, sliders = {}, touched = false, timeView = false;
    var stats = h('div', { class: 'lab-stats', 'aria-live': 'polite' });
    var C = VV.canvas(stage, { ratio: 0.8, max: 620, min: 280, label: (isND ? n + '-dimensional hypercube' : 'Tesseract') + ' projected onto the screen. Drag to turn the 3D view.' });
    var badge = h('span', { class: 'lab-badge' }); stage.insertBefore(badge, C.wrap);
    stage.appendChild(stats);
    var top = VV.ctrls(ctrl), planeBox = h('div', { class: 'plane-list' });
    if (isND) VV.slider(top, 'Dimensions', 5, 9, 1, n, function (v) { n = v; build(); }, function (v) { return v + 'D'; });
    else VV.seg(top, ['🧊 Tesseract', '⏳ Time as a dimension'], function (i) { timeView = i === 1; planeBox.hidden = timeView; ptog.hidden = timeView; info(); }, 0);
    var ptog = VV.seg(top, ['Perspective', 'Orthographic (shadow)'], function (i) { persp = i === 0; info(); }, 0);
    var row2 = VV.ctrls(ctrl);
    var pb = VV.btn(row2, paused ? '▶ Spin' : '⏸ Pause', function () { paused = !paused; pb.textContent = paused ? '▶ Spin' : '⏸ Pause'; });
    VV.btn(row2, '🎲 Random', function () { Object.keys(spd).forEach(function (k) { var v = Math.random() < 0.5 ? 0 : Math.round((Math.random() * 1.6 - 0.8) * 20) / 20; spd[k] = v; if (sliders[k]) sliders[k].set(v); }); paused = false; pb.textContent = '⏸ Pause'; mark(); }, 'ghost');
    VV.btn(row2, '↺ Reset', function () { reset(); }, 'ghost');
    var dsl = VV.slider(ctrl, isND ? 'Camera distance (each step)' : '4D camera distance', isND ? 2.5 : 1.6, 6, 0.1, D, function (v) { D = v; mark(); }, function (v) { return v.toFixed(1); });
    ctrl.appendChild(h('h3', null, 'Rotation planes (speed)'));
    ctrl.appendChild(planeBox);
    function mark() { if (!touched) { touched = true; if (!isND) award('tess'); } }
    function build() {
      verts = []; edges = []; ang = {}; spd = {}; sliders = {}; planeBox.innerHTML = ''; P2.length = 0; DEP.length = 0; W4.length = 0;
      var N = 1 << n, sc = isND ? 1 / Math.sqrt(n) : 0.5;
      for (var i = 0; i < N; i++) { var v = []; for (var k = 0; k < n; k++) v.push((i >> k & 1 ? 1 : -1) * sc); verts.push(v); }
      for (var a = 0; a < N; a++) for (var k2 = 0; k2 < n; k2++) { var b = a ^ (1 << k2); if (b > a) edges.push([a, b, k2]); }
      for (var p = 0; p < n; p++) for (var q = p + 1; q < n; q++) {
        var key = p + '-' + q, def = 0;
        if (!isND) def = { '0-3': 0.5, '2-3': 0.3, '1-2': 0.12 }[key] || 0;
        else def = (q >= 3 && (p + q) % 3 === 0) ? 0.35 : (key === '0-2' ? 0.15 : 0);
        ang[key] = 0; spd[key] = VV.reduced ? 0 : def;
        (function (key, p, q) {
          sliders[key] = VV.slider(planeBox, AX[p].toUpperCase() + AX[q].toUpperCase() + (q >= 3 ? ' ✦' : ''), -1, 1, 0.05, spd[key], function (v) { spd[key] = v; if (q >= 3) mark(); }, function (v) { return v.toFixed(2); });
        })(key, p, q);
      }
      dsl.min = isND ? 2.5 : 1.6;
      if (isND && n >= 5) award('lab');
      C.cv.setAttribute('aria-label', n + '-dimensional hypercube with ' + N + ' vertices and ' + edges.length + ' edges, projected onto the screen');
      info();
    }
    function reset() { Object.keys(ang).forEach(function (k) { ang[k] = 0; }); yaw = 0.5; pitch = -0.3; zoom = 1; build(); }
    function info() {
      var N = 1 << n, E = n * (1 << (n - 1));
      badge.textContent = timeView ? '3D space + time' : n + 'D → ' + (persp ? 'perspective' : 'orthographic') + ' → your 2D screen';
      var rows = ''; for (var m = 0; m <= Math.min(n, 4); m++) rows += '<tr><td>' + ['Vertices (0D)', 'Edges (1D)', 'Squares (2D)', 'Cubes (3D)', 'Tesseracts (4D)'][m] + '</td><td>' + (binom(n, m) * Math.pow(2, n - m)).toLocaleString() + '</td></tr>';
      stats.innerHTML = '<span>' + N.toLocaleString() + ' vertices</span><span>' + E.toLocaleString() + ' edges</span><span>' + (n * (n - 1) / 2) + ' rotation planes</span>';
      if (timeView) {
        text.innerHTML = '<h3>Time as the 4th dimension</h3><p>Here a ball moves in a circle in a flat 2D world. Stack a snapshot of that world for every instant and the ball\u2019s history becomes a <b>helix</b> — its <em>worldline</em>. Time acts like an extra axis on which every moment has a coordinate.</p><p>In Einstein\u2019s relativity, events have four coordinates (x, y, z, t) in <b>spacetime</b>. But be careful: time is <em>not</em> just another spatial direction — it enters the maths with the opposite sign (s² = x² + y² + z² − c²t²), which is why you can\u2019t turn around in time like you can in space.</p>';
        stats.innerHTML = '<span>2 space axes drawn + 1 time axis</span><span>Worldline = path through spacetime</span>';
        return;
      }
      text.innerHTML = (isND ? '<h3>The ' + n + '-cube (hypercube)</h3>' : '<h3>The tesseract (4-cube)</h3>') +
        '<p>Take a cube and drag it a unit along a new direction at right angles to x, y and z — called <b>w</b>. The old cube and its copy, joined corner to corner, form a ' + (isND ? n + '-cube by repeating this ' + n + ' times.' : 'tesseract: 16 vertices, 32 edges, 24 squares and 8 cubic cells.') + '</p>' +
        '<p><b>Honest note:</b> you are not seeing ' + n + 'D. Nobody can. Each extra coordinate is projected away step by step (' + n + 'D → … → 3D → 2D), like a shadow. Edges that look bent or squashed are perfectly straight and equal in ' + n + 'D; the "inner cube" is just the far copy looking smaller in perspective.</p>' +
        '<p>In 4D, objects rotate in <b>planes</b>, not around axes. ✦ marks planes that involve a higher dimension — spin those and the shape seems to turn inside out. That\u2019s the shadow of an ordinary rigid rotation.</p>' +
        '<table><tr><th>Part of the ' + n + '-cube</th><th>Count</th></tr>' + rows + '</table><p class="formula">count of m-faces = C(n, m) · 2ⁿ⁻ᵐ</p>' + (isND ? '<p class="hint">Axis letters beyond w (v, u, t, s, r) are just labels for directions 5–9.</p>' : '');
    }
    var lx = 0, ly = 0, ptrs = {}, pinch = null;
    VV.drag(C.cv, {
      down: function (p, e) { ptrs[e.pointerId] = p; lx = p.x; ly = p.y; },
      move: function (p, e) { ptrs[e.pointerId] = p; var ids = Object.keys(ptrs); if (ids.length === 2) { var A = ptrs[ids[0]], B2 = ptrs[ids[1]], d = Math.hypot(A.x - B2.x, A.y - B2.y); if (pinch) zoom = VV.clamp(zoom * d / pinch, 0.5, 3); pinch = d; return; } yaw += (p.x - lx) * 0.01; pitch = VV.clamp(pitch + (p.y - ly) * 0.01, -1.5, 1.5); lx = p.x; ly = p.y; if (!timeView) mark(); },
      up: function (p, e) { delete ptrs[e.pointerId]; pinch = null; }
    });
    C.cv.addEventListener('wheel', function (e) { e.preventDefault(); zoom = VV.clamp(zoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.5, 3); }, { passive: false });
    C.cv.tabIndex = 0;
    C.cv.addEventListener('keydown', function (e) { var k = e.key; if (k === 'ArrowLeft') yaw -= 0.1; else if (k === 'ArrowRight') yaw += 0.1; else if (k === 'ArrowUp') pitch -= 0.1; else if (k === 'ArrowDown') pitch += 0.1; else if (k === ' ') { paused = !paused; pb.textContent = paused ? '▶ Spin' : '⏸ Pause'; } else return; e.preventDefault(); });
    var P2 = [], DEP = [], W4 = [];
    build();
    VV.loop(C.cv, function (t, dt) {
      var g = C.ctx, w = C.w, H = C.h, i, k;
      g.clearRect(0, 0, w, H);
      if (timeView) { drawTime(g, w, H, t); return; }
      if (!paused) for (k in spd) ang[k] += spd[k] * dt * 0.9;
      var keys = Object.keys(ang), cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), maxR = 0.0001;
      for (i = 0; i < verts.length; i++) {
        var v = verts[i].slice();
        for (var j = 0; j < keys.length; j++) { var a = ang[keys[j]]; if (!a) continue; var pq = keys[j].split('-'), p = +pq[0], q = +pq[1], c = Math.cos(a), s = Math.sin(a), vp = v[p], vq = v[q]; v[p] = vp * c - vq * s; v[q] = vp * s + vq * c; }
        W4[i] = n > 3 ? v[3] : 0;
        for (var d = n - 1; d >= 3; d--) { var f = persp ? D / Math.max(0.35, D - v[d]) : 1; v[0] *= f; v[1] *= f; v[2] *= f; for (var m = 3; m < d; m++) v[m] *= f; }
        var x = v[0] * cy - v[2] * sy, z = v[0] * sy + v[2] * cy, y = v[1] * cp - z * sp; z = v[1] * sp + z * cp;
        var kk = 4 / Math.max(0.5, 4 + z); P2[i] = [x * kk, y * kk]; DEP[i] = z; var r = Math.hypot(x * kk, y * kk); if (r > maxR) maxR = r;
      }
      fitR += (maxR - fitR) * Math.min(1, dt * 3);
      var S = Math.min(w, H) * 0.42 * zoom / Math.max(0.2, fitR), cx = w / 2, cyy = H / 2;
      g.globalCompositeOperation = 'lighter'; g.lineCap = 'round';
      var lw = n >= 8 ? 1 : n >= 6 ? 1.4 : 2.2;
      for (i = 0; i < edges.length; i++) {
        var e = edges[i], A2 = P2[e[0]], B3 = P2[e[1]], dz = (DEP[e[0]] + DEP[e[1]]) / 2;
        g.strokeStyle = hue(e[2], n); g.globalAlpha = VV.clamp(0.75 - dz * 0.25, 0.18, 0.95) * (n >= 8 ? 0.7 : 1); g.lineWidth = lw;
        g.beginPath(); g.moveTo(cx + A2[0] * S, cyy - A2[1] * S); g.lineTo(cx + B3[0] * S, cyy - B3[1] * S); g.stroke();
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      var vr = n >= 8 ? 1.8 : n >= 6 ? 2.6 : 4.2, glow = !VV.lowPower && n <= 6;
      for (i = 0; i < verts.length; i++) { var wv = W4[i], col = wv > 0 ? '#ffd166' : '#ff5e8a'; VV.P3.ball(g, cx + P2[i][0] * S, cyy - P2[i][1] * S, vr * (1 + VV.clamp(-DEP[i] * 0.2, -0.4, 0.4)), col, glow); }
      g.font = '600 11px system-ui,sans-serif'; g.fillStyle = 'rgba(223,230,255,.75)'; g.textAlign = 'right';
      g.fillText('● w > 0   ● w < 0', w - 10, H - 10); g.textAlign = 'left';
    });
    function drawTime(g, w, H, t) {
      var cx = w / 2, base = H * 0.86, L = Math.min(w, H) * 0.3, layers = 14, T = VV.reduced ? 2 : t;
      function P(x, y, tt) { var X = (x - y) * 0.87 * L, Y = (x + y) * 0.5 * L; return [cx + X, base - Y * 0.6 - tt * H * 0.055]; }
      for (var k = 0; k < layers; k++) {
        var q = [P(-1, -1, k), P(1, -1, k), P(1, 1, k), P(-1, 1, k)];
        g.fillStyle = 'rgba(76,201,240,' + (k === layers - 1 ? 0.16 : 0.035) + ')'; g.strokeStyle = 'rgba(160,200,255,' + (k === layers - 1 ? 0.6 : 0.12) + ')'; g.lineWidth = 1;
        g.beginPath(); q.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.closePath(); g.fill(); g.stroke();
      }
      g.beginPath(); g.strokeStyle = '#ffd166'; g.lineWidth = 2.5;
      var now = (T * 0.6) % (layers - 1);
      for (var s = 0; s <= now; s += 0.05) { var a = s * 1.6, p = P(Math.cos(a) * 0.7, Math.sin(a) * 0.7, s); if (s) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }
      g.stroke();
      var a2 = now * 1.6, pn = P(Math.cos(a2) * 0.7, Math.sin(a2) * 0.7, now); VV.P3.ball(g, pn[0], pn[1], 8, '#ff5e8a', true);
      var o = P(-1, 1, 0), top = P(-1, 1, layers - 1);
      g.strokeStyle = '#9bffb5'; g.lineWidth = 2; g.beginPath(); g.moveTo(o[0], o[1]); g.lineTo(top[0], top[1] - 20); g.stroke(); VV.P3.arrowHead(g, { x: o[0], y: o[1] }, { x: top[0], y: top[1] - 20 }, '#9bffb5', 10);
      g.fillStyle = '#9bffb5'; g.font = '700 13px system-ui,sans-serif'; g.fillText('time t', top[0] + 8, top[1] - 16);
      g.fillStyle = '#dfe6ff'; g.fillText('each slice = the whole 2D world at one instant', 10, 20);
    }
  }

  function show(m) {
    var stage = el('labStage'), ctrl = el('labControls'), text = el('labText'); if (!stage) return;
    if (['2d', '3d', '4d', 'nd'].indexOf(m) < 0) m = mode || '4d';
    if (m === mode && stage.childNodes.length) return;
    mode = m; VV.hush();
    VV.$$('#labModes .seg-b').forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-mode') === m ? 'true' : 'false'); });
    stage.innerHTML = ''; ctrl.innerHTML = ''; text.innerHTML = '';
    try {
      if (m === '2d') mode2d(stage, ctrl, text);
      else if (m === '3d') mode3d(stage, ctrl, text);
      else if (m === '4d') hyper(stage, ctrl, text, 4, false);
      else hyper(stage, ctrl, text, 5, true);
    } catch (e) { stage.innerHTML = '<p class="vis-fail">The lab hit a snag on this device. Try another mode.</p>'; if (window.console) console.warn(e); }
    if (VV.applyI18n) VV.applyI18n(ctrl);
  }
  function mount() {
    mounted = true;
    VV.$$('#labModes .seg-b').forEach(function (b) {
      b.addEventListener('click', function () { var m = b.getAttribute('data-mode'); VV.sfx.play('whoosh'); if (VV.App && VV.App.go) VV.App.go('lab/' + m); else show(m); });
    });
    var tl = el('labModes');
    if (tl) tl.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var bs = VV.$$('.seg-b', tl), i = bs.indexOf(document.activeElement); if (i < 0) return;
      var nx = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length]; nx.focus(); nx.click(); e.preventDefault();
    });
  }
  VV.Lab = { show: function (m) { mount(); show(m); }, mount: mount, get mode() { return mode; } };
})();


/* ---- register with the VidyaVerse v2 lab API ---- */
(function () {
  'use strict';
  window.VVLabs = window.VVLabs || { list: [], register: function (d) { this.list.push(d); } };
  if (window.VVLabs.list.some(function (x) { return x.id === 'dimension-lab'; })) return;
  window.VVLabs.register({ id: 'dimension-lab', title: 'Dimension Lab (2D → 9D)', icon: '🧊', faculty: 'school', bands: ['primary', 'middle', 'secondary', 'senior', 'ug', 'pg', 'phd', 'pro', 'all'],
    summary: 'Polygons, 3D solids, the 4D tesseract and 5D–9D hypercubes as honest projections.',
    mount: function (el, api) {
      var D = window.VVDim; D._setApi(api);
      el.innerHTML = '<div class="dimlab"><div class="lab-head"><p class="eyebrow">Multi-dimensional learning</p><h2>Dimension Lab</h2><p class="lead">Flat, solid, hyper — and beyond. Everything past 3D is shown as an honest <em>projection</em> onto your 2D screen, the way a shadow shows a 3D object on a wall.</p></div>' +
        '<div id="labModes" class="seg" role="tablist" aria-label="Dimension modes"><button type="button" role="tab" data-mode="2d" class="seg-b">2D</button><button type="button" role="tab" data-mode="3d" class="seg-b">3D</button><button type="button" role="tab" data-mode="4d" class="seg-b">4D</button><button type="button" role="tab" data-mode="nd" class="seg-b">nD</button></div>' +
        '<div class="lab-grid"><div id="labStage" class="lab-stage card"></div><div class="lab-side"><div id="labControls" class="lab-controls card"></div><div id="labText" class="lab-text card"></div></div></div></div>';
      D.Lab.show('4d');
      return { destroy: function () { D.hush(); el.innerHTML = ''; } };
    } });
})();

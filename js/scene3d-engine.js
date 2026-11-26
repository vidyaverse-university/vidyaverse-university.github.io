/* VidyaVerse v2 — scene3d engine: a compact, dependency-free WebGL 1 renderer and the interactive 3D widget.
   Loaded on demand by js/widgets-3d.js (never on plain lesson pages). No CDN, works offline.
   Exposes VV2.Scene3D = { math, geo, nd, mount(host, spec, ctx), presets (from scene3d-presets.js) }.
   Picking = colour-ID render pass; labels = HTML overlay; reduced motion = no auto-rotation, instant transitions. */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : this;
  var VV2 = root.VV2 = root.VV2 || {};
  var S3 = VV2.Scene3D = VV2.Scene3D || {};
  var PI = Math.PI, TAU = 2 * PI;

  /* =============================== maths (column-major like WebGL) =============================== */
  var M = S3.math = {};
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function scl(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function len(a) { return Math.sqrt(dot(a, a)); }
  function nrm(a) { var l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
  M.add = add; M.sub = sub; M.scl = scl; M.dot = dot; M.cross = cross; M.len = len; M.nrm = nrm; M.clamp = clamp; M.lerp3 = lerp3;
  M.persp = function (fov, asp, n, f) { var t = 1 / Math.tan(fov / 2), nf = 1 / (n - f); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]; };
  M.lookAt = function (e, c, up) {
    var z = nrm(sub(e, c)), x = nrm(cross(up, z)), y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1];
  };
  M.mul4 = function (a, b) { var r = new Array(16); for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) { var s = 0; for (var k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; r[i * 4 + j] = s; } return r; };
  M.x4 = function (m, p) { return [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14], m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15]]; };
  M.m3mul = function (a, b) { var r = new Array(9); for (var c = 0; c < 3; c++) for (var q = 0; q < 3; q++) { var s = 0; for (var k = 0; k < 3; k++) s += a[k * 3 + q] * b[c * 3 + k]; r[c * 3 + q] = s; } return r; };
  M.m3v = function (m, v) { return [m[0] * v[0] + m[3] * v[1] + m[6] * v[2], m[1] * v[0] + m[4] * v[1] + m[7] * v[2], m[2] * v[0] + m[5] * v[1] + m[8] * v[2]]; };
  M.I3 = function () { return [1, 0, 0, 0, 1, 0, 0, 0, 1]; };
  M.rx = function (a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, s, 0, -s, c]; };
  M.ry = function (a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 1, 0, s, 0, c]; };
  M.rz = function (a) { var c = Math.cos(a), s = Math.sin(a); return [c, s, 0, -s, c, 0, 0, 0, 1]; };
  /* rot in DEGREES, applied X first, then Y, then Z */
  M.euler = function (d) { var k = PI / 180; d = d || [0, 0, 0]; return M.m3mul(M.rz((d[2] || 0) * k), M.m3mul(M.ry((d[1] || 0) * k), M.rx((d[0] || 0) * k))); };
  M.axisAngle = function (axis, a) {
    var k = nrm(axis), c = Math.cos(a), s = Math.sin(a), t = 1 - c, x = k[0], y = k[1], z = k[2];
    return [t * x * x + c, t * x * y + s * z, t * x * z - s * y, t * x * y - s * z, t * y * y + c, t * y * z + s * x, t * x * z + s * y, t * y * z - s * x, t * z * z + c];
  };
  M.rotVec = function (v, axis, a) { return M.m3v(M.axisAngle(axis, a), v); };
  /* orthonormal basis whose Y column points along d (used for objects given by from/to) */
  M.basisY = function (d) {
    var y = nrm(d), hlp = Math.abs(y[1]) < 0.99 ? [0, 1, 0] : [1, 0, 0];
    var x = nrm(cross(hlp, y)), z = cross(x, y);
    return [x[0], x[1], x[2], y[0], y[1], y[2], z[0], z[1], z[2]];
  };
  M.det3 = function (m) { return m[0] * (m[4] * m[8] - m[7] * m[5]) - m[3] * (m[1] * m[8] - m[7] * m[2]) + m[6] * (m[1] * m[5] - m[4] * m[2]); };

  /* =============================== n-dimensional polytopes =============================== */
  var ND = S3.nd = {};
  function binom(n, k) { if (k < 0 || k > n) return 0; var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  ND.binom = binom;
  ND.AXES = ['X', 'Y', 'Z', 'W', 'V', 'U', 'T', 'S'];
  /* n-cube: 2^n vertices (all ±1 sign patterns), edges join vertices that differ in one coordinate */
  ND.hypercube = function (n) {
    var V = [], E = [], F = [], C = [], i, k, a, b, s = 1 / Math.sqrt(n);
    for (i = 0; i < (1 << n); i++) { var v = []; for (k = 0; k < n; k++) v.push(((i >> k) & 1 ? 1 : -1) * s); V.push(v); }
    for (i = 0; i < V.length; i++) for (k = 0; k < n; k++) { var j = i ^ (1 << k); if (j > i) E.push([i, j, k]); }
    for (a = 0; a < n; a++) for (b = a + 1; b < n; b++) for (i = 0; i < V.length; i++) {
      if ((i >> a) & 1 || (i >> b) & 1) continue;
      F.push([i, i | (1 << a), i | (1 << a) | (1 << b), i | (1 << b)]);
    }
    if (n === 4) for (a = 0; a < n; a++) for (var bit = 0; bit < 2; bit++) { var cell = []; for (i = 0; i < V.length; i++) if (((i >> a) & 1) === bit) cell.push(i); C.push(cell); }
    return { kind: 'hypercube', n: n, V: V, E: E, F: F, C: C };
  };
  /* regular n-simplex: n+1 equidistant vertices — e1..en plus a·(1,…,1) with a=(1−√(n+1))/n, centred and scaled to radius 1 */
  ND.simplex = function (n) {
    var V = [], E = [], F = [], C = [], i, j, k, l, a = (1 - Math.sqrt(n + 1)) / n;
    for (i = 0; i < n; i++) { var v = []; for (k = 0; k < n; k++) v.push(k === i ? 1 : 0); V.push(v); }
    var last = []; for (k = 0; k < n; k++) last.push(a); V.push(last);
    var cen = []; for (k = 0; k < n; k++) { var sm = 0; for (i = 0; i <= n; i++) sm += V[i][k]; cen.push(sm / (n + 1)); }
    var rmax = 0; V = V.map(function (p) { var q = p.map(function (x, kk) { return x - cen[kk]; }); var r = Math.sqrt(q.reduce(function (s2, x) { return s2 + x * x; }, 0)); if (r > rmax) rmax = r; return q; });
    V = V.map(function (p) { return p.map(function (x) { return x / rmax; }); });
    for (i = 0; i <= n; i++) for (j = i + 1; j <= n; j++) E.push([i, j, -1]);
    for (i = 0; i <= n; i++) for (j = i + 1; j <= n; j++) for (k = j + 1; k <= n; k++) F.push([i, j, k]);
    if (n === 4) for (i = 0; i <= n; i++) for (j = i + 1; j <= n; j++) for (k = j + 1; k <= n; k++) for (l = k + 1; l <= n; l++) C.push([i, j, k, l]);
    return { kind: 'simplex', n: n, V: V, E: E, F: F, C: C };
  };
  /* number of m-dimensional faces */
  ND.faces = function (kind, n, m) { return kind === 'simplex' ? binom(n + 1, m + 1) : binom(n, m) * Math.pow(2, n - m); };
  /* rotate every vertex by a sequence of plane rotations [[i, j, angle], …] (Givens rotations) */
  ND.rotate = function (V, planes) {
    return V.map(function (v0) {
      var v = v0.slice();
      for (var p = 0; p < planes.length; p++) {
        var i = planes[p][0], j = planes[p][1], a = planes[p][2]; if (!a) continue;
        var c = Math.cos(a), s = Math.sin(a), xi = v[i], xj = v[j];
        v[i] = xi * c - xj * s; v[j] = xi * s + xj * c;
      }
      return v;
    });
  };
  /* project n-D -> 3-D by dropping one axis at a time, highest first. Perspective divides by (D - x_k)/D (far = smaller). */
  ND.project = function (v, D, persp) {
    var p = v.slice();
    for (var k = p.length - 1; k >= 3; k--) {
      var f = persp ? D / (D - p[k]) : 1;
      for (var i = 0; i < k; i++) p[i] *= f;
    }
    return [p[0], p[1], p[2]];
  };
  /* 4-D slice by the hyperplane x[3] = s: returns crossing points (3-D), segments (from 2-faces) and convex polygons (from 3-cells) */
  ND.slice4 = function (poly, R, s) {
    var i, eps = 1e-7;
    for (i = 0; i < R.length; i++) if (Math.abs(R[i][3] - s) < eps) { s += 3e-6; i = -1; }
    var pts = [], emap = {};
    poly.E.forEach(function (e, ei) {
      var a = R[e[0]], b = R[e[1]], da = a[3] - s, db = b[3] - s;
      if (da * db < 0) { var t = da / (da - db); emap[key(e[0], e[1])] = pts.length; pts.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]); }
    });
    function key(x, y) { return x < y ? x * 4096 + y : y * 4096 + x; }
    var segs = [];
    poly.F.forEach(function (f) {
      var hit = [];
      for (var q = 0; q < f.length; q++) { var id = emap[key(f[q], f[(q + 1) % f.length])]; if (id != null) hit.push(id); }
      if (hit.length === 2) segs.push(hit);
    });
    var polys = [];
    poly.C.forEach(function (cell) {
      var set = {}, ids = []; cell.forEach(function (x) { set[x] = 1; });
      poly.E.forEach(function (e) { if (set[e[0]] && set[e[1]]) { var id = emap[key(e[0], e[1])]; if (id != null) ids.push(id); } });
      if (ids.length < 3) return;
      var c = [0, 0, 0]; ids.forEach(function (id) { c = add(c, pts[id]); }); c = scl(c, 1 / ids.length);
      var nn = [0, 0, 0];
      for (var q = 0; q < ids.length && len(nn) < 1e-9; q++) for (var r = q + 1; r < ids.length && len(nn) < 1e-9; r++) nn = cross(sub(pts[ids[q]], c), sub(pts[ids[r]], c));
      if (len(nn) < 1e-12) return;
      nn = nrm(nn); var u = nrm(sub(pts[ids[0]], c)), w = cross(nn, u);
      ids.sort(function (A, B) { var pa = sub(pts[A], c), pb = sub(pts[B], c); return Math.atan2(dot(pa, w), dot(pa, u)) - Math.atan2(dot(pb, w), dot(pb, u)); });
      polys.push(ids);
    });
    return { pts: pts, segs: segs, polys: polys, s: s };
  };

  /* =============================== geometry (unit meshes) =============================== */
  var G = S3.geo = {};
  function Geo() { this.p = []; this.n = []; this.i = []; }
  Geo.prototype.v = function (x, y, z, nx, ny, nz) { this.p.push(x, y, z); this.n.push(nx, ny, nz); return this.p.length / 3 - 1; };
  Geo.prototype.t = function (a, b, c) { this.i.push(a, b, c); };
  Geo.prototype.done = function () { var nv = this.p.length / 3; return { p: new Float32Array(this.p), n: new Float32Array(this.n), i: nv > 65535 ? new Uint32Array(this.i) : new Uint16Array(this.i), nv: nv, ni: this.i.length }; };
  /* surface of revolution around Y: profile = [[r, y, nr, ny], …] with null = break (new strip, hard edge) */
  function lathe(g, prof, seg) {
    var runs = [], cur = [];
    prof.forEach(function (q) { if (!q) { if (cur.length) runs.push(cur); cur = []; } else cur.push(q); });
    if (cur.length) runs.push(cur);
    runs.forEach(function (run) {
      var base = g.p.length / 3;
      run.forEach(function (q) { for (var s = 0; s <= seg; s++) { var a = s / seg * TAU, ca = Math.cos(a), sa = Math.sin(a); g.v(q[0] * ca, q[1], q[0] * sa, q[2] * ca, q[3], q[2] * sa); } });
      for (var j = 0; j < run.length - 1; j++) for (var s = 0; s < seg; s++) { var a = base + j * (seg + 1) + s, b = a + seg + 1; g.t(a, b, a + 1); g.t(a + 1, b, b + 1); }
    });
    return g;
  }
  G.box = function (g) {
    g = g || new Geo();
    [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].forEach(function (n) {
      var u = Math.abs(n[1]) > 0.5 ? [1, 0, 0] : [0, 1, 0], w = cross(n, u), b = g.p.length / 3;
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) { g.v(0.5 * (n[0] + c[0] * u[0] + c[1] * w[0]), 0.5 * (n[1] + c[0] * u[1] + c[1] * w[1]), 0.5 * (n[2] + c[0] * u[2] + c[1] * w[2]), n[0], n[1], n[2]); });
      g.t(b, b + 1, b + 2); g.t(b, b + 2, b + 3);
    });
    return g;
  };
  G.sphere = function (seg, lat, g) { var pr = []; for (var k = 0; k <= lat; k++) { var t = -PI / 2 + PI * k / lat; pr.push([0.5 * Math.cos(t), 0.5 * Math.sin(t), Math.cos(t), Math.sin(t)]); } return lathe(g || new Geo(), pr, seg); };
  G.cyl = function (top, seg, g) {
    top = top == null ? 1 : top; var rb = 0.5, rt = 0.5 * top, sn = nrm([1, 0, rb - rt]), pr = [[0, -0.5, 0, -1], [rb, -0.5, 0, -1], null, [rb, -0.5, sn[0], sn[2]], [rt, 0.5, sn[0], sn[2]]];
    if (rt > 1e-4) pr.push(null, [rt, 0.5, 0, 1], [0, 0.5, 0, 1]);
    return lathe(g || new Geo(), pr, seg);
  };
  G.capsule = function (A, seg) { var pr = [], h2 = Math.max(0, A / 2 - 0.5), k, t; for (k = 0; k <= 8; k++) { t = -PI / 2 + PI / 2 * k / 8; pr.push([0.5 * Math.cos(t), -h2 + 0.5 * Math.sin(t), Math.cos(t), Math.sin(t)]); } for (k = 0; k <= 8; k++) { t = PI / 2 * k / 8; pr.push([0.5 * Math.cos(t), h2 + 0.5 * Math.sin(t), Math.cos(t), Math.sin(t)]); } return lathe(new Geo(), pr, seg); };
  G.torus = function (q, seg) { var rt = 0.5 * q, R = 0.5 - rt, pr = [], m = 14; for (var k = 0; k <= m; k++) { var t = TAU * k / m; pr.push([R + rt * Math.cos(t), rt * Math.sin(t), Math.cos(t), Math.sin(t)]); } return lathe(new Geo(), pr, seg); };
  G.plane = function () { var g = new Geo(); g.v(-0.5, 0, -0.5, 0, 1, 0); g.v(0.5, 0, -0.5, 0, 1, 0); g.v(0.5, 0, 0.5, 0, 1, 0); g.v(-0.5, 0, 0.5, 0, 1, 0); g.t(0, 1, 2); g.t(0, 2, 3); return g; };
  /* arrow along +Y, diameter 1, total length A (head ≈ 1.6 diameters, never more than half) */
  G.arrow = function (A, seg) {
    var hl = Math.min(1.6, A * 0.5), y0 = -A / 2, y1 = A / 2 - hl, sr = 0.18, hr = 0.5, sn = nrm([hl, 0, hr]);
    return lathe(new Geo(), [[0, y0, 0, -1], [sr, y0, 0, -1], null, [sr, y0, 1, 0], [sr, y1, 1, 0], null, [sr, y1, 0, -1], [hr, y1, 0, -1], null, [hr, y1, sn[0], sn[2]], [0, A / 2, sn[0], sn[2]]], seg);
  };
  /* spur gear: N teeth, outside diameter 1 (module = 1/(N+2)), thickness 1 along Y */
  G.gear = function (N) {
    var g = new Geo(), m = 1 / (N + 2), Ra = 0.5, Rr = Math.max(0.1, (N - 2.5) * m / 2), pts = [], p = TAU / N, k;
    for (k = 0; k < N; k++) { var a = k * p; pts.push([Rr, a], [Ra, a + 0.28 * p], [Ra, a + 0.5 * p], [Rr, a + 0.78 * p]); }
    var xy = pts.map(function (q) { return [q[0] * Math.cos(q[1]), q[0] * Math.sin(q[1])]; });
    [0.5, -0.5].forEach(function (y) { var c = g.v(0, y, 0, 0, y > 0 ? 1 : -1, 0), b = g.p.length / 3; xy.forEach(function (q) { g.v(q[0], y, q[1], 0, y > 0 ? 1 : -1, 0); }); for (var j = 0; j < xy.length; j++) g.t(c, b + j, b + (j + 1) % xy.length); });
    for (k = 0; k < xy.length; k++) {
      var A = xy[k], B = xy[(k + 1) % xy.length], nx = B[1] - A[1], nz = -(B[0] - A[0]), l = Math.hypot(nx, nz) || 1; nx /= l; nz /= l;
      if (nx * (A[0] + B[0]) + nz * (A[1] + B[1]) < 0) { nx = -nx; nz = -nz; }
      var b2 = g.v(A[0], -0.5, A[1], nx, 0, nz); g.v(B[0], -0.5, B[1], nx, 0, nz); g.v(B[0], 0.5, B[1], nx, 0, nz); g.v(A[0], 0.5, A[1], nx, 0, nz);
      g.t(b2, b2 + 1, b2 + 2); g.t(b2, b2 + 2, b2 + 3);
    }
    return g;
  };
  /* many small parts merged into ONE mesh (dies on a wafer, solder balls…): parts = [{t:'box'|'sphere'|'cyl', c:[x,y,z], s:[sx,sy,sz] | from/to}] */
  G.multi = function (parts) {
    var g = new Geo(), unit = { box: G.box(), sphere: G.sphere(12, 8), cyl: G.cyl(1, 10) };
    parts.forEach(function (pt) {
      var u = unit[pt.t] || unit.box, R = M.I3(), s = norm3(pt.s, 0.2), c = pt.c || [0, 0, 0];
      if (pt.from && pt.to) { var d = sub(pt.to, pt.from); R = M.basisY(d); s = [s[0], len(d), s[2]]; c = lerp3(pt.from, pt.to, 0.5); }
      else if (pt.r) R = M.euler(pt.r);
      var b = g.p.length / 3;
      for (var v = 0; v < u.p.length / 3; v++) {
        var lp = M.m3v(R, [u.p[v * 3] * s[0], u.p[v * 3 + 1] * s[1], u.p[v * 3 + 2] * s[2]]), ln = nrm(M.m3v(R, [u.n[v * 3] / s[0], u.n[v * 3 + 1] / s[1], u.n[v * 3 + 2] / s[2]]));
        g.v(lp[0] + c[0], lp[1] + c[1], lp[2] + c[2], ln[0], ln[1], ln[2]);
      }
      for (var q = 0; q < u.i.length; q++) g.i.push(u.i[q] + b);
    });
    return g;
  };
  function norm3(s, d) { if (s == null) return [d, d, d]; if (typeof s === 'number') return [s, s, s]; return [s[0] == null ? d : +s[0], s[1] == null ? (s[0] == null ? d : +s[0]) : +s[1], s[2] == null ? (s[0] == null ? d : +s[0]) : +s[2]]; }
  S3.norm3 = norm3;
  S3.SHAPES = ['box', 'sphere', 'cylinder', 'cone', 'torus', 'plane', 'capsule', 'arrow', 'label'];

  /* which unit mesh + mesh-space scale an object needs */
  function meshFor(o, low) {
    var s = o._size, sh = o.shape, avg = ((s[0] + s[2]) / 2) || 1, seg = low ? 16 : 28, A;
    switch (sh) {
      case 'box': return { key: 'box', sc: s, build: function () { return G.box(); } };
      case 'sphere': return { key: 'sph' + seg, sc: s, build: function () { return G.sphere(seg, low ? 10 : 18); } };
      case 'cylinder': var tp = o.top == null ? 1 : Math.round(clamp(+o.top, 0, 1) * 100) / 100; return { key: 'cyl' + tp + ':' + seg, sc: s, build: function () { return G.cyl(tp, seg); } };
      case 'cone': return { key: 'cyl0:' + seg, sc: s, build: function () { return G.cyl(0, seg); } };
      case 'capsule': A = Math.round(Math.max(1, s[1] / avg) * 4) / 4; return { key: 'cap' + A + ':' + seg, sc: [s[0], s[1] / A, s[2]], build: function () { return G.capsule(A, seg); } };
      case 'torus': var q = Math.round(clamp(s[1] / (s[0] || 1), 0.004, 0.9) * 1000) / 1000; return { key: 'tor' + q + ':' + seg, sc: [s[0], s[0], s[2]], build: function () { return G.torus(q, low ? 28 : 48); } };
      case 'plane': return { key: 'pln', sc: [s[0], 1, s[2]], build: G.plane };
      case 'arrow': A = Math.round(Math.max(1, s[1] / avg) * 4) / 4; return { key: 'arr' + A + ':' + seg, sc: [s[0], s[1] / A, s[2]], build: function () { return G.arrow(A, seg); } };
      case 'gear': var N = clamp(Math.round(o.teeth || 12), 6, 80); return { key: 'gear' + N, sc: s, build: function () { return G.gear(N); } };
      case 'multi': return { key: 'multi:' + o._uid, sc: [1, 1, 1], build: function () { return G.multi(o.parts || []); } };
      default: return null;
    }
  }
  S3.meshFor = meshFor;
  function hexRGB(c, dflt) {
    var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(c || '').trim()); if (!m) return dflt || [0.55, 0.65, 0.85];
    var x = m[1]; if (x.length === 3) x = x.replace(/./g, '$&$&');
    return [parseInt(x.slice(0, 2), 16) / 255, parseInt(x.slice(2, 4), 16) / 255, parseInt(x.slice(4, 6), 16) / 255];
  }
  S3.hexRGB = hexRGB;
  var UID = 0;
  /* normalise one scene object (content or preset) into the engine's internal form */
  S3.normObj = function (o, i) {
    var x = {}; for (var k in o) x[k] = o[k];
    x.id = String(o.id || ('obj' + i)); x.shape = o.shape || 'box'; x._uid = ++UID;
    x._size = norm3(o.size, x.shape === 'label' ? 0.1 : 1);
    x._col = hexRGB(o.color); x._a = o.opacity == null ? 1 : clamp(+o.opacity, 0.05, 1);
    x._ex = Array.isArray(o.explode) ? [+o.explode[0] || 0, +o.explode[1] || 0, +o.explode[2] || 0] : null;
    if (x.shape === 'multi' && Array.isArray(x.parts) && x.parts.length) {
      var lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
      x.parts.forEach(function (pt) {
        var s = norm3(pt.s, 0.2), m = (pt.from && pt.to ? Math.max(s[0], s[2]) : Math.max(s[0], s[1], s[2])) / 2, pts = pt.from && pt.to ? [pt.from, pt.to] : [pt.c || [0, 0, 0]];
        pts.forEach(function (c) { for (var k = 0; k < 3; k++) { var hk = pt.from ? m : s[k] / 2; lo[k] = Math.min(lo[k], c[k] - hk); hi[k] = Math.max(hi[k], c[k] + hk); } });
      });
      x._mb = { c: lerp3(lo, hi, 0.5), r: 0.5 * len(sub(hi, lo)), h: scl(sub(hi, lo), 0.5) };
    }
    S3.place(x);
    return x;
  };
  /* (re)compute base position + rotation; from/to objects are aligned along their segment */
  S3.place = function (x) {
    if (x.from && x.to) { var d = sub(x.to, x.from); x._pos = lerp3(x.from, x.to, 0.5); x._R = M.basisY(len(d) > 1e-9 ? d : [0, 1, 0]); x._size = [x._size[0], Math.max(1e-4, len(d)), x._size[2]]; }
    else { x._pos = Array.isArray(x.pos) ? [+x.pos[0] || 0, +x.pos[1] || 0, +x.pos[2] || 0] : [0, 0, 0]; x._R = M.euler(x.rot); }
  };
  /* world transform at explode factor e and time t: returns {L (3x3 linear), N (normal 3x3), p (world pos)} */
  S3.xform = function (x, e, t, sc) {
    var p = x._pos, R = x._R, ex = x._ex ? scl(x._ex, e) : null;
    if (ex) p = add(p, ex);
    if (x.spin && t) {
      var sp = x.spin, Rs = M.axisAngle(sp.axis || [0, 1, 0], (sp.w || 0) * t + (sp.a0 || 0)), c = sp.c || x._pos;
      if (ex) c = add(c, ex);
      p = add(c, M.m3v(Rs, sub(p, c))); R = M.m3mul(Rs, R);
    }
    sc = sc || [1, 1, 1];
    var L = R.slice(), N = R.slice();
    for (var c2 = 0; c2 < 3; c2++) for (var r = 0; r < 3; r++) { L[c2 * 3 + r] *= sc[c2]; N[c2 * 3 + r] /= (sc[c2] || 1e-6); }
    return { L: L, N: N, p: p };
  };

  /* =============================== WebGL renderer =============================== */
  var VS = 'attribute vec3 aP;attribute vec3 aN;uniform mat4 uVP;uniform mat4 uM;uniform mat3 uNM;varying vec3 vN;varying vec3 vW;' +
    'void main(){vec4 w=uM*vec4(aP,1.0);vW=w.xyz;vN=uNM*aN;gl_Position=uVP*w;}';
  var FS = 'precision mediump float;uniform vec3 uC;uniform vec3 uEye;uniform vec3 uL1;uniform vec3 uL2;uniform vec3 uId;uniform float uA;uniform float uHi;uniform float uPick;varying vec3 vN;varying vec3 vW;' +
    'void main(){if(uPick>0.5){gl_FragColor=vec4(uId,1.0);return;}vec3 n=normalize(vN);vec3 v=normalize(uEye-vW);if(dot(n,v)<0.0)n=-n;' +
    'float d1=max(dot(n,uL1),0.0);float d2=max(dot(n,uL2),0.0);float sp=pow(max(dot(n,normalize(uL1+v)),0.0),40.0);float rim=pow(1.0-max(dot(n,v),0.0),2.5);' +
    'vec3 c=uC*(0.30+0.70*d1+0.22*d2)+vec3(0.26*sp)+rim*(0.16*uC+uHi*vec3(0.75,0.6,0.12))+uHi*vec3(0.14,0.11,0.02);gl_FragColor=vec4(min(c,vec3(1.0)),uA);}';
  var LVS = 'attribute vec3 aP;attribute vec4 aC;uniform mat4 uVP;uniform float uPS;varying vec4 vC;void main(){vC=aC;gl_Position=uVP*vec4(aP,1.0);gl_PointSize=uPS;}';
  var LFS = 'precision mediump float;varying vec4 vC;uniform float uRound;void main(){if(uRound>0.5){vec2 q=gl_PointCoord-vec2(0.5);if(dot(q,q)>0.25)discard;}gl_FragColor=vC;}';

  function Renderer(canvas, low) {
    var opt = { antialias: !low, alpha: true, premultipliedAlpha: false, depth: true, powerPreference: low ? 'low-power' : 'default' }, gl = null;
    try { gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt); } catch (e) { gl = null; }
    if (!gl) throw new Error('no-webgl');
    this.gl = gl; this.meshes = {}; this.u32 = !!gl.getExtension('OES_element_index_uint');
    this.P = prog(gl, VS, FS, ['aP', 'aN'], ['uVP', 'uM', 'uNM', 'uC', 'uEye', 'uL1', 'uL2', 'uId', 'uA', 'uHi', 'uPick']);
    this.LP = prog(gl, LVS, LFS, ['aP', 'aC'], ['uVP', 'uPS', 'uRound']);
    this.dyn = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
  }
  function prog(gl, vs, fs, attrs, unis) {
    function sh(t, src) { var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('shader: ' + gl.getShaderInfoLog(s)); return s; }
    var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
    attrs.forEach(function (a, i) { gl.bindAttribLocation(p, i, a); });
    gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(p));
    var r = { p: p, u: {} }; unis.forEach(function (u) { r.u[u] = gl.getUniformLocation(p, u); }); return r;
  }
  Renderer.prototype.mesh = function (mf) {
    var m = this.meshes[mf.key]; if (m) return m;
    var gl = this.gl, g = mf.build(); if (g.done) g = g.done();
    if (g.i instanceof Uint32Array && !this.u32) { g = { p: g.p, n: g.n, i: new Uint16Array(0), ni: 0 }; }
    m = { pb: gl.createBuffer(), nb: gl.createBuffer(), ib: gl.createBuffer(), ni: g.ni, it: g.i instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT };
    gl.bindBuffer(gl.ARRAY_BUFFER, m.pb); gl.bufferData(gl.ARRAY_BUFFER, g.p, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nb); gl.bufferData(gl.ARRAY_BUFFER, g.n, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, g.i, gl.STATIC_DRAW);
    this.meshes[mf.key] = m; return m;
  };
  Renderer.prototype.drawMesh = function (m, L, N, p) {
    var gl = this.gl, u = this.P.u;
    gl.uniformMatrix4fv(u.uM, false, new Float32Array([L[0], L[1], L[2], 0, L[3], L[4], L[5], 0, L[6], L[7], L[8], 0, p[0], p[1], p[2], 1]));
    gl.uniformMatrix3fv(u.uNM, false, new Float32Array(N));
    gl.bindBuffer(gl.ARRAY_BUFFER, m.pb); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nb); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.ib); gl.drawElements(gl.TRIANGLES, m.ni, m.it, 0);
  };
  /* dynamic coloured geometry: data = Float32Array of [x,y,z,r,g,b,a]* */
  Renderer.prototype.drawDyn = function (VP, data, mode, ps, round) {
    if (!data.length) return;
    var gl = this.gl, L = this.LP;
    gl.useProgram(L.p); gl.uniformMatrix4fv(L.u.uVP, false, new Float32Array(VP)); gl.uniform1f(L.u.uPS, ps || 1); gl.uniform1f(L.u.uRound, round ? 1 : 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dyn); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0); gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 28, 0); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 28, 12);
    gl.drawArrays(mode, 0, data.length / 7);
  };
  Renderer.prototype.pickFbo = function (w, h) {
    var gl = this.gl, f = this.fb;
    if (f && f.w === w && f.h === h) return f;
    if (f) { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tx); gl.deleteRenderbuffer(f.rb); }
    f = { w: w, h: h, fb: gl.createFramebuffer(), tx: gl.createTexture(), rb: gl.createRenderbuffer() };
    gl.bindTexture(gl.TEXTURE_2D, f.tx); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindRenderbuffer(gl.RENDERBUFFER, f.rb); gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
    gl.bindFramebuffer(gl.FRAMEBUFFER, f.fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, f.tx, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, f.rb);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.fb = f; return f;
  };
  Renderer.prototype.dispose = function () {
    var gl = this.gl; try {
      for (var k in this.meshes) { var m = this.meshes[k]; gl.deleteBuffer(m.pb); gl.deleteBuffer(m.nb); gl.deleteBuffer(m.ib); }
      if (this.fb) { gl.deleteFramebuffer(this.fb.fb); gl.deleteTexture(this.fb.tx); gl.deleteRenderbuffer(this.fb.rb); }
      gl.deleteBuffer(this.dyn); gl.deleteProgram(this.P.p); gl.deleteProgram(this.LP.p);
      var lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext();
    } catch (e) { }
    this.meshes = {};
  };
  S3.Renderer = Renderer;
  S3.hasWebGL = function () { try { var c = document.createElement('canvas'); return !!(root.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } };

  /* =============================== scene resolution =============================== */
  /* returns {title, mode, objects (normalised), tour, goals, param, anim, fit, cam} or {error} */
  S3.resolve = function (spec) {
    spec = spec || {};
    var P = S3.presets || {}, def = null;
    if (spec.preset) {
      var fn = P[spec.preset];
      if (!fn) { if (!(spec.objects && spec.objects.length)) return { error: 'Unknown 3D preset “' + spec.preset + '”.' }; }
      else def = fn(spec) || {};
    }
    def = def || { title: '3D scene' };
    var raw = (def.objects || []).concat(Array.isArray(spec.objects) ? spec.objects : []);
    var objs = raw.slice(0, 400).map(S3.normObj), seen = {};
    objs.forEach(function (o) { if (seen[o.id]) o.id = o.id + '-' + o._uid; seen[o.id] = 1; });
    return { title: def.title || spec.title || '3D scene', mode: def.mode || 'parts', objects: objs, tour: (Array.isArray(spec.tour) && spec.tour.length ? spec.tour : def.tour) || [],
      goals: def.goals || null, param: def.param || null, anim: !!def.anim || objs.some(function (o) { return o.spin; }), fit: def.fit || null, cam: def.cam || null, intro: def.intro || '', nd: def.nd || null, bloch: def.bloch || null };
  };
  /* ids a lesson may tap / focus for a scene (top-level, labelled or not) */
  S3.partIds = function (spec) { var r = S3.resolve(spec); if (r.error) return []; return r.objects.filter(function (o) { return !o.of; }).map(function (o) { return o.id; }); };
  function bounds(objs, e) {
    var lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
    objs.forEach(function (o) {
      if (o.hidden) return;
      var x = S3.xform(o, e, 0), r = o.shape === 'label' ? 0.2 : 0.5 * len(o._size);
      if (o._mb) x.p = add(x.p, o._mb.c);
      for (var k = 0; k < 3; k++) { var rk = o._mb ? o._mb.h[k] : r; lo[k] = Math.min(lo[k], x.p[k] - rk); hi[k] = Math.max(hi[k], x.p[k] + rk); }
    });
    if (lo[0] > hi[0]) return { c: [0, 0, 0], r: 2 };
    var c = lerp3(lo, hi, 0.5); return { c: c, r: Math.max(0.5, 0.5 * len(sub(hi, lo)) * 0.82) };
  }
  S3.bounds = bounds;

  /* =============================== the widget =============================== */
  S3.mount = function (host, spec, ctx) {
    var h = VV2.h, doc = document;
    ctx = ctx || {};
    var reduced = !!VV2.reduced || (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var low = !!VV2.lowPower;
    var sc = S3.resolve(spec);
    var wrap = h('div', { class: 's3' });
    host.appendChild(wrap);
    if (spec.prompt) wrap.appendChild(h('p', { class: 's3-prompt' }, spec.prompt));
    if (sc.error) { wrap.appendChild(h('p', { class: 'muted' }, sc.error + ' This activity cannot be shown — skip ahead to the quiz.')); return { destroy: function () { } }; }

    var objs = sc.objects, byId = {}; objs.forEach(function (o) { byId[o.id] = o; });
    var parts = objs.filter(function (o) { return !o.of && o.pick !== false && (o.label || o.info); });
    var hintId = 's3h' + (++UID);
    var stage = h('div', { class: 's3-stage' });
    var canvas = h('canvas', { class: 's3-cv', tabindex: '0', role: 'application', 'aria-roledescription': '3D viewer', 'aria-label': sc.title + ' — 3D model', 'aria-describedby': hintId });
    var labels = h('div', { class: 's3-labels', 'aria-hidden': 'true' });
    var hint = h('p', { class: 's3-hint', id: hintId }, 'Drag to rotate · pinch or scroll to zoom · tap a part. Keys: arrows rotate, + / − zoom, E explode, N next part, R reset.');
    stage.appendChild(canvas); stage.appendChild(labels); stage.appendChild(hint);
    var bar = h('div', { class: 's3-bar', role: 'toolbar', 'aria-label': '3D view controls' });
    var side = h('div', { class: 's3-side' });
    var info = h('section', { class: 's3-info', 'aria-live': 'polite' });
    var grid = h('div', { class: 's3-grid' }, [h('div', { class: 's3-main' }, [stage, bar]), side]);
    wrap.appendChild(grid);
    side.appendChild(info);

    var R = null, glErr = '';
    try { R = new Renderer(canvas, low); } catch (e) { R = null; glErr = e && e.message; }
    var dpr = Math.min(root.devicePixelRatio || 1, low ? 1.25 : 2);

    /* ---------- state ---------- */
    var ready = false, st = { e: 0, eT: 0, t: 0, auto: !reduced, play: sc.anim && !reduced, sel: null, focus: null, labels: null, tourOn: false, tourI: 0, toured: {}, explored: {}, done: false, dirty: true, visible: true, param: sc.param ? +sc.param.value || 0 : 0 };
    var fit0 = bounds(objs, 0), fit1 = bounds(objs, 1);
    var FIT = sc.fit || { c: fit0.c, r: Math.max(fit0.r, fit1.r * 0.85) };
    if (sc.mode === 'nd') FIT = { c: [0, 0, 0], r: 2.6 };
    if (sc.mode === 'bloch') FIT = { c: [0, 0, 0], r: 2.7 };
    var FOV = 45 * PI / 180;
    var cam = { yaw: sc.cam && sc.cam.yaw != null ? sc.cam.yaw : 0.6, pitch: sc.cam && sc.cam.pitch != null ? sc.cam.pitch : 0.35, dist: 1, target: FIT.c.slice() };
    var goal = null; /* camera transition goal */
    function fitDist(r) { var asp = Math.max(0.3, (canvas.clientWidth || 360) / (canvas.clientHeight || 300)), t = Math.tan(FOV / 2); return r / Math.min(t, t * asp) * 1.06; }
    function resetCam(instant) { var g = { yaw: sc.cam && sc.cam.yaw != null ? sc.cam.yaw : 0.6, pitch: sc.cam && sc.cam.pitch != null ? sc.cam.pitch : 0.35, dist: fitDist(FIT.r) * (sc.cam && sc.cam.zoom ? 1 / sc.cam.zoom : 1), target: FIT.c.slice() }; moveCam(g, instant); }
    function moveCam(g, instant) { if (instant || reduced) { cam.yaw = g.yaw; cam.pitch = g.pitch; cam.dist = g.dist; cam.target = g.target; goal = null; } else goal = { from: { yaw: cam.yaw, pitch: cam.pitch, dist: cam.dist, target: cam.target.slice() }, to: g, t: 0 }; req(); }
    function eye() { var cp = Math.cos(cam.pitch); return add(cam.target, [cam.dist * cp * Math.sin(cam.yaw), cam.dist * Math.sin(cam.pitch), cam.dist * cp * Math.cos(cam.yaw)]); }
    function stopAuto() { if (st.auto) { st.auto = false; syncBtns(); } }

    /* ---------- toolbar ---------- */
    function btn(txt, title, fn, pressed) { var b = h('button', { type: 'button', class: 'btn small ghost s3-b', title: title, 'aria-label': title, onclick: fn }, txt); if (pressed != null) b.setAttribute('aria-pressed', pressed ? 'true' : 'false'); bar.appendChild(b); return b; }
    var bReset = btn('⟲', 'Reset view', function () { resetCam(); st.sel = null; st.focus = null; showInfo(null); req(); });
    var bAuto = reduced ? null : btn('🔄', 'Auto-rotate', function () { st.auto = !st.auto; syncBtns(); req(); }, st.auto);
    var hasEx = objs.some(function (o) { return o._ex; });
    var bEx = hasEx ? btn('💥 Explode', 'Explode / assemble the model', function () { setExplode(st.eT > 0.5 ? 0 : 1); }, false) : null;
    var exSlider = null;
    if (hasEx) { exSlider = h('input', { type: 'range', min: '0', max: '100', value: '0', class: 's3-ex', 'aria-label': 'Explode amount' }); exSlider.addEventListener('input', function () { st.eT = st.e = exSlider.value / 100; syncBtns(); req(); }); bar.appendChild(exSlider); }
    var nLabeled = objs.filter(function (o) { return o.label && !o.of; }).length;
    st.labels = nLabeled <= 14 ? 'all' : 'sel';
    var bLab = nLabeled ? btn('🏷', 'Show all labels', function () { st.labels = st.labels === 'all' ? 'sel' : 'all'; syncBtns(); req(); }, st.labels === 'all') : null;
    var bPlay = sc.anim ? btn(st.play ? '⏸' : '▶', st.play ? 'Pause motion' : 'Play motion', function () { st.play = !st.play; syncBtns(); req(); }, st.play) : null;
    var tour = (sc.tour || []).filter(function (s) { return s && s.text; }).slice(0, 12);
    var bTour = tour.length ? btn('🧭 Tour', 'Guided tour', function () { if (st.tourOn) endTour(); else startTour(); }, false) : null;
    var bFs = (stage.requestFullscreen || stage.webkitRequestFullscreen) ? btn('⛶', 'Full screen', function () { try { if (doc.fullscreenElement || doc.webkitFullscreenElement) (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc); else (stage.requestFullscreen || stage.webkitRequestFullscreen).call(stage); } catch (e) { } }) : null;
    function syncBtns() {
      if (bAuto) bAuto.setAttribute('aria-pressed', st.auto ? 'true' : 'false');
      if (bEx) { bEx.setAttribute('aria-pressed', st.eT > 0.5 ? 'true' : 'false'); bEx.textContent = st.eT > 0.5 ? '🧩 Assemble' : '💥 Explode'; }
      if (exSlider && document.activeElement !== exSlider) exSlider.value = Math.round(st.eT * 100);
      if (bLab) bLab.setAttribute('aria-pressed', st.labels === 'all' ? 'true' : 'false');
      if (bPlay) { bPlay.setAttribute('aria-pressed', st.play ? 'true' : 'false'); bPlay.textContent = st.play ? '⏸' : '▶'; bPlay.title = st.play ? 'Pause motion' : 'Play motion'; bPlay.setAttribute('aria-label', bPlay.title); }
      if (bTour) bTour.setAttribute('aria-pressed', st.tourOn ? 'true' : 'false');
    }
    function setExplode(v) { st.eT = v; if (reduced) st.e = v; syncBtns(); sfx('whoosh'); req(); }
    function sfx(n) { try { if (ctx.sfx) ctx.sfx(n); } catch (e) { } }

    /* ---------- param (e.g. crank angle) ---------- */
    var paramIn = null, paramOut = null;
    if (sc.param) {
      var pp = sc.param;
      paramIn = h('input', { type: 'range', min: String(pp.min), max: String(pp.max), step: String(pp.step || 1), value: String(st.param), 'aria-label': pp.label });
      paramOut = h('output', { class: 's3-pout' });
      paramIn.addEventListener('input', function () { st.param = +paramIn.value; st.play = false; syncBtns(); applyParam(); req(); });
      side.appendChild(h('section', { class: 's3-param' }, [h('label', null, [h('b', null, pp.label), paramIn]), paramOut]));
    }
    function applyParam() { if (!sc.param) return; try { var txt = sc.param.apply(st.param, byId, S3); if (paramOut) paramOut.textContent = txt || ''; } catch (e) { } if (paramIn && document.activeElement !== paramIn) paramIn.value = String(Math.round(st.param)); }

    /* ---------- tasks / goals ---------- */
    var tasks = [], taskBox = null, implicit = false;
    if (Array.isArray(spec.tasks) && spec.tasks.length) tasks = spec.tasks.slice(0, 12).map(function (t) { return { goal: t.goal || ('Find ' + t.tap), tap: t.tap, done: false }; });
    else if (sc.goals) tasks = sc.goals.map(function (g) { return { goal: g.goal, key: g.key, done: false }; });
    else if (parts.length) { implicit = true; tasks = [{ goal: 'Explore ' + Math.min(4, parts.length) + ' parts (tap them or use the list) — or finish the guided tour', count: Math.min(4, parts.length), n: 0, done: false }]; }
    if (tasks.length) { taskBox = h('section', { class: 's3-tasks' }); side.appendChild(taskBox); drawTasks(); }
    function drawTasks() {
      if (!taskBox) return; taskBox.innerHTML = '';
      var nd = tasks.filter(function (t) { return t.done; }).length;
      taskBox.appendChild(h('h4', null, ['🎯 Tasks ', h('small', { class: 'muted' }, nd + ' / ' + tasks.length)]));
      taskBox.appendChild(h('ul', null, tasks.map(function (t) { return h('li', { class: t.done ? 'ok' : '' }, [h('span', { 'aria-hidden': 'true' }, t.done ? '✅' : '⬜'), ' ', t.goal + (t.count && !t.done ? ' (' + t.n + '/' + t.count + ')' : ''), h('span', { class: 'sr' }, t.done ? ' — done' : ' — not done yet')]); })));
    }
    function checkDone() {
      if (st.done || !tasks.length) return;
      if (tasks.every(function (t) { return t.done; })) {
        st.done = true; sfx('win');
        if (VV2.toast) VV2.toast('All 3D tasks complete!', '🧊');
        try { if (ctx.done) ctx.done(100); } catch (e) { }
      }
    }
    function tapped(id) {
      st.explored[id] = 1; var ch = false;
      tasks.forEach(function (t) {
        if (t.done) return;
        if (t.tap && t.tap === id) { t.done = true; ch = true; sfx('good'); }
        if (t.count) { t.n = Object.keys(st.explored).length; if (t.n >= t.count) { t.done = true; sfx('good'); } ch = true; }
      });
      if (ch) { drawTasks(); checkDone(); }
    }
    function goalHit(key) { var ch = false; tasks.forEach(function (t) { if (!t.done && t.key === key) { t.done = true; ch = true; sfx('good'); } }); if (ch) { drawTasks(); checkDone(); } }

    /* ---------- info panel ---------- */
    function showInfo(o) {
      info.innerHTML = '';
      if (!o) {
        info.appendChild(h('h3', null, sc.title));
        info.appendChild(h('p', null, sc.intro || (parts.length ? 'Tap any part of the model — or pick one from the list — to learn what it is and what it does.' : '')));
        return;
      }
      var k = parts.indexOf(o);
      info.appendChild(h('h3', null, [o.label || o.id, k >= 0 ? h('small', { class: 'muted' }, '  · part ' + (k + 1) + ' of ' + parts.length) : null]));
      if (o.info) info.appendChild(h('p', null, o.info));
      var row = h('div', { class: 'row s3-irow' });
      if (R) row.appendChild(h('button', { type: 'button', class: 'btn small ghost', onclick: function () { focusOn(o); } }, '🎯 Focus'));
      if (ctx.say) row.appendChild(h('button', { type: 'button', class: 'btn small ghost', onclick: function () { ctx.say((o.label || '') + '. ' + (o.info || '')); } }, '🔊 Listen'));
      info.appendChild(row);
    }
    function select(id, how) {
      var o = byId[id]; if (!o) return;
      if (o.of && byId[o.of]) o = byId[o.of];
      st.sel = o.id; showInfo(o); tapped(o.id); sfx('tap');
      if (how === 'list') focusOn(o);
      syncList(); req();
    }
    function focusOn(o) {
      if (!R) return;
      var x = S3.xform(o, st.e, st.play ? st.t : st.t), r = Math.max(0.4, 0.5 * len(o._size));
      if (o._mb) { x.p = add(x.p, o._mb.c); r = Math.max(0.4, o._mb.r * 0.6); }
      moveCam({ yaw: cam.yaw, pitch: cam.pitch, dist: clamp(fitDist(r * 2.2), fitDist(FIT.r) * 0.18, fitDist(FIT.r)), target: x.p }); stopAuto();
    }

    /* ---------- tour ---------- */
    var tourBox = h('section', { class: 's3-tour', hidden: true });
    if (tour.length) side.appendChild(tourBox);
    function startTour() { st.tourOn = true; st.tourI = 0; tourBox.hidden = false; stopAuto(); tourStep(0); syncBtns(); }
    function endTour() { st.tourOn = false; tourBox.hidden = true; st.focus = null; syncBtns(); req(); }
    function tourStep(i) {
      st.tourI = clamp(i, 0, tour.length - 1); var s = tour[st.tourI]; st.toured[st.tourI] = 1;
      tourBox.innerHTML = '';
      tourBox.appendChild(h('h4', null, ['🧭 Guided tour ', h('small', { class: 'muted' }, 'step ' + (st.tourI + 1) + ' of ' + tour.length)]));
      tourBox.appendChild(h('p', { 'aria-live': 'polite' }, s.text));
      var pv = h('button', { type: 'button', class: 'btn small ghost', onclick: function () { tourStep(st.tourI - 1); } }, '← Back');
      var nx = h('button', { type: 'button', class: 'btn small primary', onclick: function () { if (st.tourI >= tour.length - 1) { endTour(); finishTour(); } else tourStep(st.tourI + 1); } }, st.tourI >= tour.length - 1 ? 'Finish ✓' : 'Next →');
      pv.disabled = st.tourI === 0;
      tourBox.appendChild(h('div', { class: 'row' }, [pv, nx, h('button', { type: 'button', class: 'btn small ghost', onclick: endTour }, 'Exit')]));
      if (s.explode === true) setExplode(1); else if (s.explode === false) setExplode(0);
      if (s.param != null && sc.param) { st.param = +s.param; st.play = false; applyParam(); syncBtns(); }
      var o = s.focus && byId[s.focus];
      if (o) { st.focus = o.id; st.sel = o.id; showInfo(o); tapped(o.id); var tgt = o; setTimeout(function () { focusOn(tgt); }, reduced ? 0 : 60); } else { st.focus = null; resetCam(); }
      if (ctx.say && VV2.mode === 'tiny') ctx.say(s.text);
      syncList(); req();
    }
    function finishTour() { if (implicit) { tasks.forEach(function (t) { t.done = true; }); drawTasks(); checkDone(); } goalHit('tour'); }

    /* ---------- accessible parts list (also the no-WebGL fallback) ---------- */
    var listBtns = {};
    if (parts.length) {
      var det = h('details', { class: 's3-parts' }); if (!R || parts.length <= 8) det.open = true;
      det.appendChild(h('summary', null, '📋 All parts (' + parts.length + ') — accessible list'));
      var lw = h('div', { class: 's3-plist' });
      parts.forEach(function (o) { var b = h('button', { type: 'button', class: 'chip s3-pb', 'aria-pressed': 'false', onclick: function () { select(o.id, 'list'); } }, o.label || o.id); listBtns[o.id] = b; lw.appendChild(b); });
      det.appendChild(lw); side.appendChild(det);
    }
    function syncList() { for (var k in listBtns) listBtns[k].setAttribute('aria-pressed', k === st.sel ? 'true' : 'false'); }

    /* ---------- special modes ---------- */
    var mode = null;
    if (sc.mode === 'nd') mode = ndMode(sc.nd || {}, spec);
    if (sc.mode === 'bloch') mode = blochMode();

    /* ---------- no WebGL: graceful fallback ---------- */
    if (!R) {
      stage.classList.add('s3-nogl'); canvas.remove(); labels.remove(); hint.remove();
      stage.appendChild(h('div', { class: 's3-fallback', role: 'note' }, [h('b', null, '3D view unavailable on this device'), h('p', null, 'This browser could not start WebGL (3D graphics)' + (glErr && glErr !== 'no-webgl' ? ' (' + glErr + ')' : '') + '. Everything else still works: ' + (parts.length ? 'use the parts list to explore and complete the tasks.' : 'use the controls and explanations alongside.'))]));
      bar.innerHTML = '';
      showInfo(null); applyParam(); if (mode && mode.noGL) mode.noGL();
      return { destroy: function () { if (mode && mode.destroy) mode.destroy(); } };
    }
    showInfo(null);
    if (mode && mode.info) mode.info();

    /* ---------- pointer / keyboard controls ---------- */
    var ptrs = {}, drag = null, pinch0 = 0, dist0 = 0;
    function relXY(ev) { var r = canvas.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; }
    canvas.addEventListener('pointerdown', function (ev) {
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) { }
      ptrs[ev.pointerId] = [ev.clientX, ev.clientY];
      var ids = Object.keys(ptrs);
      if (ids.length === 1) {
        var xy = relXY(ev); drag = { x: ev.clientX, y: ev.clientY, sx: ev.clientX, sy: ev.clientY, t: Date.now(), moved: 0, custom: false };
        if (mode && mode.down && mode.down(xy, ev)) drag.custom = true;
      } else if (ids.length === 2) { var a = ptrs[ids[0]], b = ptrs[ids[1]]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; dist0 = cam.dist; if (drag) drag.moved = 99; }
      stopAuto();
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!ptrs[ev.pointerId]) return;
      ptrs[ev.pointerId] = [ev.clientX, ev.clientY];
      var ids = Object.keys(ptrs);
      if (ids.length >= 2) { var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; zoomTo(dist0 * pinch0 / d); return; }
      if (!drag) return;
      var dx = ev.clientX - drag.x, dy = ev.clientY - drag.y; drag.x = ev.clientX; drag.y = ev.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      if (drag.custom && mode && mode.move) { mode.move(relXY(ev)); return; }
      cam.yaw -= dx * 0.008; cam.pitch = clamp(cam.pitch + dy * 0.008, -1.45, 1.45); goal = null; req();
    });
    function up(ev) {
      var was = drag; delete ptrs[ev.pointerId];
      if (Object.keys(ptrs).length === 0) drag = null;
      if (was && was.custom && mode && mode.up) mode.up();
      if (was && !was.custom && was.moved < 8 && Date.now() - was.t < 600 && ev.type === 'pointerup') { var xy = relXY(ev); var o = pickAt(xy[0], xy[1]); if (o) select(o.id, 'tap'); else if (mode && mode.tapEmpty) mode.tapEmpty(); }
    }
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', function (ev) { ev.preventDefault(); stopAuto(); zoomTo(cam.dist * Math.exp(clamp(ev.deltaY, -200, 200) * 0.0015)); }, { passive: false });
    function zoomTo(d) { var base = fitDist(FIT.r); cam.dist = clamp(d, base * 0.12, base * 4); goal = null; req(); }
    canvas.addEventListener('keydown', function (ev) {
      var k = ev.key, hit = true;
      if (k === 'ArrowLeft') cam.yaw += 0.12; else if (k === 'ArrowRight') cam.yaw -= 0.12;
      else if (k === 'ArrowUp') cam.pitch = clamp(cam.pitch + 0.1, -1.45, 1.45); else if (k === 'ArrowDown') cam.pitch = clamp(cam.pitch - 0.1, -1.45, 1.45);
      else if (k === '+' || k === '=' || k === 'PageUp') zoomTo(cam.dist / 1.15); else if (k === '-' || k === '_' || k === 'PageDown') zoomTo(cam.dist * 1.15);
      else if ((k === 'e' || k === 'E') && hasEx) setExplode(st.eT > 0.5 ? 0 : 1);
      else if (k === 'r' || k === 'R') resetCam();
      else if (k === 'l' || k === 'L') { st.labels = st.labels === 'all' ? 'sel' : 'all'; syncBtns(); }
      else if ((k === 'n' || k === 'N' || k === 'p' || k === 'P') && parts.length) { var i = parts.indexOf(byId[st.sel]); i = (i + (k.toLowerCase() === 'n' ? 1 : -1) + parts.length) % parts.length; select(parts[i].id, 'list'); }
      else hit = false;
      if (hit) { ev.preventDefault(); stopAuto(); goal = null; req(); }
    });

    /* ---------- picking (colour-ID pass) ---------- */
    function pickAt(x, y) {
      var gl = R.gl, w = canvas.width, hh = canvas.height; if (!w || !hh) return null;
      var f = R.pickFbo(w, hh), VP = viewProj(), px = new Uint8Array(4), list = drawable();
      gl.bindFramebuffer(gl.FRAMEBUFFER, f.fb); gl.viewport(0, 0, w, hh);
      var found = null;
      for (var pass = 0; pass < 2 && !found; pass++) {
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.disable(gl.BLEND); gl.depthMask(true);
        gl.useProgram(R.P.p); gl.uniformMatrix4fv(R.P.u.uVP, false, new Float32Array(VP)); gl.uniform1f(R.P.u.uPick, 1);
        gl.enableVertexAttribArray(0); gl.enableVertexAttribArray(1);
        list.forEach(function (d, i) {
          if (d.o.pick === false || (pass === 0 && d.o._a < 0.6)) return;
          var id = i + 1; gl.uniform3f(R.P.u.uId, (id & 255) / 255, ((id >> 8) & 255) / 255, ((id >> 16) & 255) / 255);
          R.drawMesh(d.m, d.x.L, d.x.N, d.x.p);
        });
        gl.readPixels(Math.round(x * dpr), Math.round(hh - y * dpr), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        var got = px[0] + (px[1] << 8) + (px[2] << 16); if (got > 0 && list[got - 1]) found = list[got - 1].o;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.uniform1f(R.P.u.uPick, 0); st.dirty = true; req();
      return found;
    }
    S3._lastPick = pickAt;

    /* ---------- drawing ---------- */
    function viewProj() {
      var asp = (canvas.width || 1) / (canvas.height || 1), d = cam.dist, near = Math.max(0.01, d * 0.02), far = d + FIT.r * 8 + 50;
      return M.mul4(M.persp(FOV, asp, near, far), M.lookAt(eye(), cam.target, [0, 1, 0]));
    }
    function tNow() { return st.t; }
    function drawable() {
      var out = [];
      objs.forEach(function (o) {
        if (o.hidden || o.shape === 'label') return;
        var mf = meshFor(o, low); if (!mf) return;
        out.push({ o: o, m: R.mesh(mf), x: S3.xform(o, st.e, tNow(), mf.sc) });
      });
      return out;
    }
    function resize() {
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr)), hh = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== hh) { canvas.width = w; canvas.height = hh; return true; }
      return false;
    }
    var labelEls = {};
    function draw() {
      resize();
      var gl = R.gl, VP = viewProj(), E = eye(), fwd = nrm(sub(E, cam.target)), right = nrm(cross([0, 1, 0], fwd)), upv = cross(fwd, right);
      gl.viewport(0, 0, canvas.width, canvas.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(R.P.p); var u = R.P.u;
      gl.uniformMatrix4fv(u.uVP, false, new Float32Array(VP)); gl.uniform3fv(u.uEye, new Float32Array(E)); gl.uniform1f(u.uPick, 0);
      var L1 = nrm(add(add(scl(right, 0.45), scl(upv, 0.75)), scl(fwd, 0.6))), L2 = nrm(add(add(scl(right, -0.7), scl(upv, -0.2)), scl(fwd, 0.3)));
      gl.uniform3fv(u.uL1, new Float32Array(L1)); gl.uniform3fv(u.uL2, new Float32Array(L2));
      gl.enableVertexAttribArray(0); gl.enableVertexAttribArray(1);
      var list = drawable(), opq = [], trn = [];
      list.forEach(function (d) { (d.o._a < 0.999 ? trn : opq).push(d); });
      trn.forEach(function (d) { d.z = len(sub(d.x.p, E)); }); trn.sort(function (a, b) { return b.z - a.z; });
      var hiId = st.focus || st.sel;
      function one(d) { var o = d.o, hi = hiId && (o.id === hiId || o.of === hiId) ? 1 : 0; gl.uniform3fv(u.uC, new Float32Array(o._col)); gl.uniform1f(u.uA, o._a); gl.uniform1f(u.uHi, hi); R.drawMesh(d.m, d.x.L, d.x.N, d.x.p); }
      gl.disable(gl.BLEND); gl.depthMask(true); opq.forEach(one);
      gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false); trn.forEach(one); gl.depthMask(true);
      if (mode && mode.draw) mode.draw(VP, E, gl);
      gl.disable(gl.BLEND);
      drawLabels(VP);
    }
    function drawLabels(VP) {
      var W2 = canvas.clientWidth, H2 = canvas.clientHeight, shown = {};
      objs.forEach(function (o) {
        if (!o.label || o.of || o.hidden) return;
        var show = o.shape === 'label' || st.labels === 'all' || o.id === st.sel || o.id === st.focus;
        if (!show) return;
        var x = S3.xform(o, st.e, tNow()), lift = o.shape === 'label' ? 0 : 0.5 * o._size[1] * 0.9;
        if (o._mb && o.parts[0]) { var p0 = o.parts[0], a0 = p0.from || p0.c || [0, 0, 0]; x.p = add(x.p, a0); lift = 0.3; }
        var c = M.x4(VP, [x.p[0], x.p[1] + lift, x.p[2]]);
        if (c[3] <= 0.01) return;
        var sx = (c[0] / c[3] * 0.5 + 0.5) * W2, sy = (1 - (c[1] / c[3] * 0.5 + 0.5)) * H2;
        if (sx < -40 || sy < -20 || sx > W2 + 40 || sy > H2 + 20) return;
        var el = labelEls[o.id];
        if (!el) { el = labelEls[o.id] = h('span', { class: 's3-lab' + (o.shape === 'label' ? ' s3-ann' : '') }, o.label); labels.appendChild(el); }
        el.style.transform = 'translate(' + Math.round(sx) + 'px,' + Math.round(sy) + 'px) translate(-50%,-115%)';
        el.classList.toggle('on', o.id === st.sel || o.id === st.focus);
        el.hidden = false; shown[o.id] = 1;
      });
      for (var k in labelEls) if (!shown[k]) labelEls[k].hidden = true;
    }

    /* ---------- render loop (runs only while something moves) ---------- */
    var raf = 0, last = 0, destroyed = false;
    function req() { st.dirty = true; if (ready && R && !raf && !destroyed && st.visible) raf = root.requestAnimationFrame(frame); }
    function frame(now) {
      raf = 0; if (destroyed) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
      var moving = false;
      if (st.auto) { cam.yaw += dt * 0.22; moving = true; }
      if (goal) { goal.t = Math.min(1, goal.t + dt / 0.6); var k = 1 - Math.pow(1 - goal.t, 3), a = goal.from, b = goal.to; cam.yaw = lerp(a.yaw, b.yaw, k); cam.pitch = lerp(a.pitch, b.pitch, k); cam.dist = lerp(a.dist, b.dist, k); cam.target = lerp3(a.target, b.target, k); if (goal.t >= 1) goal = null; moving = true; }
      if (Math.abs(st.e - st.eT) > 0.002) { st.e += (st.eT - st.e) * Math.min(1, dt * 5); moving = true; } else st.e = st.eT;
      if (st.play) { st.t += dt; moving = true; if (sc.param) { st.param += dt * (sc.param.speed || 90); if (st.param > sc.param.max) st.param = sc.param.min + (st.param - sc.param.max); applyParam(); } }
      if (mode && mode.tick && mode.tick(dt)) moving = true;
      draw(); st.dirty = false;
      if (moving && st.visible) { if (!raf) raf = root.requestAnimationFrame(frame); } else if (!raf) last = 0;
    }
    var ro = null, io = null;
    if (root.ResizeObserver) { ro = new ResizeObserver(function () { req(); }); ro.observe(stage); }
    if (root.IntersectionObserver) { io = new IntersectionObserver(function (en) { st.visible = en[0].isIntersecting; if (st.visible) req(); }, { threshold: 0.01 }); io.observe(stage); }
    function vis() { st.visible = !doc.hidden; if (st.visible) req(); }
    doc.addEventListener('visibilitychange', vis);
    canvas.addEventListener('webglcontextlost', function (ev) { ev.preventDefault(); destroyed = true; stage.appendChild(h('div', { class: 's3-fallback', role: 'alert' }, [h('b', null, '3D view paused'), h('p', null, 'The graphics context was lost (the device may be low on memory). Reload the lesson to try again — the parts list still works.')])); });

    ready = true; applyParam(); syncBtns(); resize(); resetCam(true); req();
    S3._dbg = { st: st, cam: cam, byId: byId, select: select };

    return {
      destroy: function () {
        destroyed = true; if (raf) root.cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); if (io) io.disconnect(); doc.removeEventListener('visibilitychange', vis);
        if (mode && mode.destroy) mode.destroy();
        if (R) R.dispose();
      }
    };

    /* =================== n-D mode: hypercube / simplex =================== */
    function ndMode(cfg, spec2) {
      var kind = cfg.kind || 'hypercube', n = clamp(Math.round(spec2.dims || cfg.dims || 4), 4, 8), poly, planes, persp = true, slice = false, sw = 0, ghost = true, spin = !reduced, data = { pts: [], dirtyN: true };
      var AX = ND.AXES, used = {}, startN = n;
      var box = h('section', { class: 's3-nd' }); side.insertBefore(box, info.nextSibling);
      var ctrl = h('div', { class: 's3-ndc' }), stats = h('div', { class: 's3-ndstats' }), slBox = h('div', { class: 's3-planes' });
      box.appendChild(ctrl); box.appendChild(slBox); box.appendChild(stats);
      var dimSel = h('select', { 'aria-label': 'Number of dimensions' }, [4, 5, 6, 7, 8].map(function (d) { var op = h('option', { value: String(d) }, d + 'D'); if (d === n) op.selected = true; return op; }));
      dimSel.addEventListener('change', function () { n = +dimSel.value; build(); goalHit('dims'); });
      var bProj = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': 'true' }, 'Perspective');
      bProj.addEventListener('click', function () { persp = !persp; bProj.textContent = persp ? 'Perspective' : 'Orthographic'; bProj.setAttribute('aria-pressed', persp ? 'true' : 'false'); goalHit('proj'); req(); });
      var bSpin = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': spin ? 'true' : 'false' }, spin ? '⏸ Spin' : '▶ Spin');
      bSpin.addEventListener('click', function () { spin = !spin; bSpin.textContent = spin ? '⏸ Spin' : '▶ Spin'; bSpin.setAttribute('aria-pressed', spin ? 'true' : 'false'); req(); });
      var bSlice = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': 'false' }, '🔪 Slice (4D)');
      var swIn = h('input', { type: 'range', min: '-100', max: '100', value: '0', 'aria-label': 'Slice position w' }), swOut = h('output', null, 'w = 0.00');
      var swRow = h('label', { class: 's3-swrow', hidden: true }, [h('span', null, 'Slice at '), swIn, swOut]);
      bSlice.addEventListener('click', function () { if (n !== 4) return; slice = !slice; bSlice.setAttribute('aria-pressed', slice ? 'true' : 'false'); swRow.hidden = !slice; if (slice) goalHit('slice'); explain(); req(); });
      swIn.addEventListener('input', function () { sw = swIn.value / 100; swOut.textContent = 'w = ' + sw.toFixed(2); req(); });
      var bGhost = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': 'true' }, 'Shadow');
      bGhost.addEventListener('click', function () { ghost = !ghost; bGhost.setAttribute('aria-pressed', ghost ? 'true' : 'false'); req(); });
      ctrl.appendChild(h('div', { class: 'row' }, [h('label', null, ['Dimensions ', dimSel]), bProj, bSpin, bSlice, bGhost]));
      ctrl.appendChild(swRow);
      var addSel = h('select', { 'aria-label': 'Add a rotation plane' });
      addSel.addEventListener('change', function () { var v = addSel.value; if (!v) return; var ij = v.split(',').map(Number); planes.push([ij[0], ij[1], 0]); addSel.value = ''; drawSliders(); });
      function defaultPlanes() { var p = [[0, 3, 0], [1, 3, 0], [2, 3, 0]]; for (var k = 4; k < n; k++) p.push([0, k, 0]); p.push([0, 1, 0]); return p; }
      function build() {
        poly = kind === 'simplex' ? ND.simplex(n) : ND.hypercube(n); planes = defaultPlanes(); used = {};
        if (n !== 4 && slice) { slice = false; swRow.hidden = true; bSlice.setAttribute('aria-pressed', 'false'); }
        bSlice.disabled = n !== 4; bSlice.title = n === 4 ? 'Cut the 4D shape with the 3D hyperplane w = constant' : 'Slicing is shown for 4D only';
        drawSliders(); explain(); req();
      }
      function drawSliders() {
        slBox.innerHTML = '';
        slBox.appendChild(h('p', { class: 'muted s3-small' }, 'Rotation planes — a rotation always turns one plane and leaves every other axis alone:'));
        planes.forEach(function (pl, idx) {
          var nm = AX[pl[0]] + '–' + AX[pl[1]], inp = h('input', { type: 'range', min: '-180', max: '180', value: String(Math.round(pl[2] * 180 / PI)), 'aria-label': 'Rotate in the ' + nm + ' plane (degrees)' });
          var out = h('output', null, Math.round(pl[2] * 180 / PI) + '°');
          inp.addEventListener('input', function () { pl[2] = inp.value * PI / 180; out.textContent = inp.value + '°'; if (pl[1] >= 3 || pl[0] >= 3) { used[nm] = 1; if (Object.keys(used).length >= 2) goalHit('rot2'); } req(); });
          pl._in = inp; pl._out = out;
          slBox.appendChild(h('label', { class: 's3-pl' }, [h('b', null, nm), inp, out]));
        });
        addSel.innerHTML = ''; addSel.appendChild(h('option', { value: '' }, '＋ add a plane…'));
        for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) { if (planes.some(function (p) { return p[0] === i && p[1] === j; })) continue; addSel.appendChild(h('option', { value: i + ',' + j }, AX[i] + '–' + AX[j])); }
        slBox.appendChild(addSel);
      }
      function explain() {
        var rows = [];
        for (var m = 0; m < n; m++) rows.push(h('tr', null, [h('td', null, ['vertices', 'edges', 'squares / triangles', 'cells (3-faces)', '4-faces', '5-faces', '6-faces', '7-faces'][m] || (m + '-faces')), h('td', null, String(ND.faces(kind, n, m)))]));
        stats.innerHTML = '';
        stats.appendChild(h('table', { class: 's3-tbl' }, [h('caption', null, (kind === 'simplex' ? n + '-simplex' : n + '-cube') + ' — exact counts'), h('tbody', null, rows)]));
        stats.appendChild(h('p', { class: 'muted s3-small' }, kind === 'simplex' ? 'An n-simplex has C(n+1, m+1) faces of dimension m: n+1 corners, all joined to each other.' : 'An n-cube has C(n,m)·2^(n−m) faces of dimension m: 2^n corners, n·2^(n−1) edges.'));
        info.innerHTML = '';
        info.appendChild(h('h3', null, (kind === 'simplex' ? 'The ' + n + '-simplex' : 'The ' + n + '-dimensional cube') + ' — honestly explained'));
        info.appendChild(h('p', null, 'Nobody can see ' + n + ' dimensions — and this is not an "' + n + 'D experience". It is a mathematically exact SHADOW. Every corner has ' + n + ' coordinates (' + AX.slice(0, n).join(', ') + '). We rotate it in the planes you choose, then project it down one axis at a time (' + n + 'D → … → 3D, with perspective each extra axis makes far points smaller), and WebGL draws the 3D result on your 2D screen.'));
        info.appendChild(h('p', null, slice ? 'Slice mode: instead of a shadow, we cut the 4D shape with the 3D "hyperplane" w = constant — like a CT scanner cutting a body into 2D slices. Move the slider: slices of a tesseract can be cubes, triangular or hexagonal shapes, depending on its 4D rotation.' : (kind === 'simplex' ? 'All ' + ND.faces(kind, n, 1) + ' edges are really the same length; any squashing is the projection. ' : 'Edges are coloured by the axis they run along; in ' + n + 'D every edge has the same length and every corner angle is 90° — what looks bent is the projection. ') + 'Data scientists meet the same idea: a table with ' + n + ' features is a cloud of points in ' + n + '-D space, and tools like PCA project it to 2D or 3D — losing information exactly as this shadow does.'));
      }
      var COLS = [[0.94, 0.33, 0.31], [0.20, 0.75, 0.40], [0.25, 0.55, 0.98], [0.98, 0.75, 0.15], [0.75, 0.40, 0.95], [0.10, 0.80, 0.85], [0.98, 0.50, 0.80], [0.85, 0.85, 0.85]];
      function ribbon(out, a, b, E, w, ca, cb) {
        var d = sub(b, a), mid = lerp3(a, b, 0.5), sd = cross(d, sub(E, mid)), l = len(sd); if (l < 1e-9) return;
        sd = scl(sd, w / l);
        var p1 = add(a, sd), p2 = sub(a, sd), p3 = add(b, sd), p4 = sub(b, sd);
        [p1, p2, p3, p2, p4, p3].forEach(function (p, i) { var c = (i === 0 || i === 1 || i === 3) ? ca : cb; out.push(p[0], p[1], p[2], c[0], c[1], c[2], c[3]); });
      }
      var SCALE = 2.0, D = 2.2;
      function rotated() { return ND.rotate(poly.V, planes); }
      build();
      return {
        info: function () { explain(); },
        noGL: function () { explain(); },
        tick: function (dt) { if (!spin) return false; planes.forEach(function (pl, i) { if (i > 2) return; pl[2] += dt * (0.35 + 0.12 * i); if (pl[2] > PI) pl[2] -= TAU; if (pl._in && document.activeElement !== pl._in) { pl._in.value = String(Math.round(pl[2] * 180 / PI)); pl._out.textContent = pl._in.value + '°'; } }); return true; },
        draw: function (VP, E, gl) {
          var Rv = rotated(), P3 = Rv.map(function (v) { return scl(ND.project(v, D, persp), SCALE); }), tri = [], pts = [], w = 0.022 * SCALE, k;
          if (slice && n === 4) {
            var S = ND.slice4(poly, Rv, sw * 0.999), q = S.pts.map(function (p) { return scl(p, SCALE); });
            if (ghost) { var gh = []; poly.E.forEach(function (e) { ribbon(gh, P3[e[0]], P3[e[1]], E, w * 0.5, [0.6, 0.65, 0.75, 0.16], [0.6, 0.65, 0.75, 0.16]); }); gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false); R.drawDyn(VP, new Float32Array(gh), gl.TRIANGLES); gl.depthMask(true); }
            S.segs.forEach(function (sg) { ribbon(tri, q[sg[0]], q[sg[1]], E, w * 1.2, [1, 0.8, 0.2, 1], [1, 0.8, 0.2, 1]); });
            gl.disable(gl.BLEND); R.drawDyn(VP, new Float32Array(tri), gl.TRIANGLES);
            var fill = []; S.polys.forEach(function (pg, pi) { var c = COLS[pi % COLS.length]; for (k = 1; k < pg.length - 1; k++) [pg[0], pg[k], pg[k + 1]].forEach(function (id) { var p = q[id]; fill.push(p[0], p[1], p[2], c[0], c[1], c[2], 0.28); }); });
            gl.enable(gl.BLEND); gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.depthMask(false); R.drawDyn(VP, new Float32Array(fill), gl.TRIANGLES); gl.depthMask(true);
            q.forEach(function (p) { pts.push(p[0], p[1], p[2], 1, 0.9, 0.5, 1); });
            gl.disable(gl.BLEND); R.drawDyn(VP, new Float32Array(pts), gl.POINTS, 7 * dpr, true);
            return;
          }
          poly.E.forEach(function (e) {
            var ca, cb;
            if (kind === 'hypercube') { ca = cb = COLS[e[2] % COLS.length].concat(1); }
            else { var wa = Rv[e[0]][n - 1], wb = Rv[e[1]][n - 1]; ca = [0.45 + 0.5 * (wa + 1) / 2, 0.55, 1 - 0.5 * (wa + 1) / 2, 1]; cb = [0.45 + 0.5 * (wb + 1) / 2, 0.55, 1 - 0.5 * (wb + 1) / 2, 1]; }
            ribbon(tri, P3[e[0]], P3[e[1]], E, w, ca, cb);
          });
          gl.disable(gl.BLEND); R.drawDyn(VP, new Float32Array(tri), gl.TRIANGLES);
          P3.forEach(function (p, i) { var hw = Rv[i][n - 1]; pts.push(p[0], p[1], p[2], 0.95, 0.95 - 0.3 * hw, 0.7 + 0.3 * hw, 1); });
          R.drawDyn(VP, new Float32Array(pts), gl.POINTS, Math.max(3, (n > 6 ? 4 : 6)) * dpr, true);
        },
        destroy: function () { }
      };
    }

    /* =================== Bloch sphere =================== */
    function blochMode() {
      var q = { th: 0, ph: 0, anim: null }, counts = [0, 0], dragOn = false, draggingState = false, RAD = 2;
      var box = h('section', { class: 's3-bloch' }); side.insertBefore(box, info.nextSibling);
      var thIn = h('input', { type: 'range', min: '0', max: '180', value: '0', 'aria-label': 'Polar angle theta (degrees)' }), phIn = h('input', { type: 'range', min: '0', max: '359', value: '0', 'aria-label': 'Azimuth phi (degrees)' });
      var thOut = h('output'), phOut = h('output'), ket = h('p', { class: 's3-ket', 'aria-live': 'polite' }), bars = h('div', { class: 's3-bars' }), meas = h('p', { class: 'muted s3-small', 'aria-live': 'polite' });
      thIn.addEventListener('input', function () { setState(thIn.value * PI / 180, q.ph); });
      phIn.addEventListener('input', function () { setState(q.th, phIn.value * PI / 180); });
      var gates = h('div', { class: 'row s3-gates' }, [['X', [1, 0, 0], PI, 'Pauli-X (bit flip)'], ['Y', [0, 1, 0], PI, 'Pauli-Y'], ['Z', [0, 0, 1], PI, 'Pauli-Z (phase flip)'], ['H', [1 / Math.SQRT2, 0, 1 / Math.SQRT2], PI, 'Hadamard'], ['S', [0, 0, 1], PI / 2, 'S gate (90° phase)'], ['T', [0, 0, 1], PI / 4, 'T gate (45° phase)']].map(function (g) {
        return h('button', { type: 'button', class: 'btn small', title: g[3], 'aria-label': 'Apply ' + g[3], onclick: function () { gate(g[1], g[2]); goalHit('gate'); if (g[0] === 'H') goalHit('hadamard'); } }, g[0]);
      }));
      var bMeas = h('button', { type: 'button', class: 'btn small primary', onclick: measure }, '📏 Measure');
      var bReset = h('button', { type: 'button', class: 'btn small ghost', onclick: function () { counts = [0, 0]; meas.textContent = ''; setState(0, 0); } }, '|0⟩ reset');
      var bDrag = h('button', { type: 'button', class: 'btn small ghost', 'aria-pressed': 'false', onclick: function () { dragOn = !dragOn; bDrag.setAttribute('aria-pressed', dragOn ? 'true' : 'false'); bDrag.textContent = dragOn ? '✋ Dragging the state' : '✋ Drag the state'; } }, '✋ Drag the state');
      box.appendChild(h('div', { class: 's3-bl' }, [h('label', null, [h('b', null, 'θ '), thIn, thOut]), h('label', null, [h('b', null, 'φ '), phIn, phOut])]));
      box.appendChild(ket); box.appendChild(bars);
      box.appendChild(h('p', { class: 'muted s3-small' }, 'Gates rotate the arrow: X/Y/Z by 180° about their axes, H by 180° about the axis halfway between X and Z, S by 90° and T by 45° about Z.'));
      box.appendChild(gates); box.appendChild(h('div', { class: 'row' }, [bMeas, bReset, bDrag])); box.appendChild(meas);
      function vec() { return [Math.sin(q.th) * Math.cos(q.ph), Math.sin(q.th) * Math.sin(q.ph), Math.cos(q.th)]; }
      function toGL(v) { return [v[1] * RAD, v[2] * RAD, v[0] * RAD]; }
      function fromVec(v) { var r = len(v) || 1, th = Math.acos(clamp(v[2] / r, -1, 1)), ph = Math.atan2(v[1], v[0]); if (ph < 0) ph += TAU; if (Math.sin(th) < 1e-6) ph = q.ph; return [th, ph]; }
      function setState(th, ph, quiet) {
        q.th = clamp(th, 0, PI); q.ph = ((ph % TAU) + TAU) % TAU;
        var tip = toGL(vec()), so = byId.state, sd = byId['state-tip'];
        if (so) { so.from = [0, 0, 0]; so.to = tip; S3.place(so); }
        if (sd) { sd.pos = tip; S3.place(sd); }
        var P0 = Math.pow(Math.cos(q.th / 2), 2), P1 = 1 - P0, a = Math.cos(q.th / 2), b = Math.sin(q.th / 2), deg = Math.round(q.ph * 180 / PI);
        thOut.textContent = Math.round(q.th * 180 / PI) + '°'; phOut.textContent = deg + '°';
        if (document.activeElement !== thIn) thIn.value = String(Math.round(q.th * 180 / PI)); if (document.activeElement !== phIn) phIn.value = String(deg % 360);
        ket.innerHTML = ''; ket.appendChild(h('span', null, '|ψ⟩ = ' + a.toFixed(3) + ' |0⟩ + ' + b.toFixed(3) + (b > 1e-3 && a > 1e-3 && deg % 360 ? ' · e^(i·' + (deg % 360) + '°)' : '') + ' |1⟩' + (a <= 1e-3 || b <= 1e-3 ? '  (at a pole φ has no effect — it is only a global phase)' : '')));
        bars.innerHTML = '';
        [['P(0)', P0, '#3b82f6'], ['P(1)', P1, '#ef4444']].forEach(function (r) { bars.appendChild(h('div', { class: 's3-barrow' }, [h('span', null, r[0]), h('i', { style: { width: (r[1] * 100).toFixed(1) + '%', background: r[2] } }), h('b', null, (r[1] * 100).toFixed(1) + '%')])); });
        var v = vec(); bars.appendChild(h('p', { class: 'muted s3-small' }, 'Bloch vector (x, y, z) = (' + v.map(function (x) { return x.toFixed(2); }).join(', ') + ')'));
        if (!quiet) { if (P1 > 0.99) goalHit('one'); if (Math.abs(P0 - 0.5) < 0.03) goalHit('super'); }
        req();
      }
      function gate(axis, ang) {
        var v0 = vec();
        if (reduced) { var r = fromVec(M.rotVec(v0, axis, ang)); setState(r[0], r[1]); return; }
        q.anim = { v0: v0, axis: axis, ang: ang, t: 0 }; req();
      }
      function measure() {
        var P0 = Math.pow(Math.cos(q.th / 2), 2), r = Math.random() < P0 ? 0 : 1; counts[r]++;
        meas.textContent = 'Measured ' + r + ' (it had a ' + ((r ? 1 - P0 : P0) * 100).toFixed(1) + '% chance). The state collapsed to |' + r + '⟩. Tally so far — 0: ' + counts[0] + ', 1: ' + counts[1] + '. Prepare the same state many times and the tally approaches the probabilities.';
        setState(r ? PI : 0, q.ph, true); goalHit('measure'); sfx(r ? 'pop' : 'tick');
      }
      function rayHit(xy) {
        var asp = canvas.clientWidth / canvas.clientHeight, t = Math.tan(FOV / 2), nx = (xy[0] / canvas.clientWidth) * 2 - 1, ny = 1 - (xy[1] / canvas.clientHeight) * 2;
        var E = eye(), f = nrm(sub(cam.target, E)), r = nrm(cross(f, [0, 1, 0])), u = cross(r, f);
        var d = nrm(add(f, add(scl(r, nx * t * asp), scl(u, ny * t)))), b = dot(E, d), c = dot(E, E) - RAD * RAD, disc = b * b - c, P;
        if (disc >= 0) P = add(E, scl(d, -b - Math.sqrt(disc))); else P = scl(nrm(add(E, scl(d, -b))), RAD);
        return [P[2], P[0], P[1]];
      }
      function dragTo(xy) { var r = fromVec(rayHit(xy)); setState(r[0], r[1]); }
      setTimeout(function () { setState(0, 0, true); }, 0);
      return {
        info: function () { },
        noGL: function () { },
        down: function (xy) { if (dragOn) { draggingState = true; dragTo(xy); return true; } var o = pickAt(xy[0], xy[1]); if (o && (o.id === 'state' || o.of === 'state')) { draggingState = true; return true; } return false; },
        move: function (xy) { if (draggingState) dragTo(xy); },
        up: function () { draggingState = false; },
        tick: function (dt) {
          if (!q.anim) return false;
          var A = q.anim; A.t = Math.min(1, A.t + dt / 0.5);
          var r = fromVec(M.rotVec(A.v0, A.axis, A.ang * A.t)); setState(r[0], r[1], A.t < 1);
          if (A.t >= 1) q.anim = null; return true;
        },
        destroy: function () { }
      };
    }
  };
})();

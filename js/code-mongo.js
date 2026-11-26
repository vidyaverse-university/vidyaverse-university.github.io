/* VidyaVerse v2 — Code Lab "Mongo-lite": VidyaVerse's own small in-memory MongoDB-style engine (NOT a real MongoDB server).
   find/findOne/sort/limit/skip/count/distinct, insert/update/replace/delete, and aggregate($match, $group, $sort, $project,
   $limit, $skip, $unwind, $count, $addFields/$set, $unset, $lookup, $sortByCount, $replaceRoot). Serialised into a sandboxed
   worker, so the factory below must stay self-contained. */
(function () {
  'use strict';
  var C = window.VV2.Code = window.VV2.Code || {};
  C.mongoFactory = function mongoFactory() {
    var oidN = 0;
    function ObjectId(hx) { if (hx == null) { oidN++; hx = '65a1b2c3d4e5' + ('000000000000' + oidN.toString(16)).slice(-12); } return { $oid: String(hx) }; }
    var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
    function clone(v) { if (v === null || typeof v !== 'object') return v; if (v instanceof Date) return new Date(v.getTime()); if (v instanceof RegExp) return v; if (Array.isArray(v)) return v.map(clone); var o = {}; for (var k in v) if (has(v, k)) o[k] = clone(v[k]); return o; }
    function isOp(o) { if (!o || typeof o !== 'object' || Array.isArray(o) || o instanceof Date || o instanceof RegExp) return false; var k = Object.keys(o); return k.length > 0 && k.every(function (x) { return x.charAt(0) === '$'; }); }
    function rank(v) { if (v === undefined || v === null) return 1; if (typeof v === 'number') return 2; if (typeof v === 'string') return 3; if (v && v.$oid) return 7; if (Array.isArray(v)) return 5; if (typeof v === 'boolean') return 8; if (v instanceof Date) return 9; if (v instanceof RegExp) return 11; return 4; }
    function cmp(a, b) {
      var ra = rank(a), rb = rank(b); if (ra !== rb) return ra - rb;
      if (ra === 2) return a - b; if (ra === 3) return a < b ? -1 : a > b ? 1 : 0; if (ra === 9) return a.getTime() - b.getTime();
      if (ra === 8) return (a ? 1 : 0) - (b ? 1 : 0); if (ra === 1) return 0;
      var x = JSON.stringify(a), y = JSON.stringify(b); return x < y ? -1 : x > y ? 1 : 0;
    }
    function eq(a, b) { if (a === b) return true; if (a == null || b == null) return false; if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime(); if (typeof a === 'object' && typeof b === 'object') return JSON.stringify(a) === JSON.stringify(b); return false; }
    function getP(d, path) {
      var parts = String(path).split('.'), v = d;
      for (var i = 0; i < parts.length; i++) {
        if (v == null) return undefined;
        if (Array.isArray(v) && !/^\d+$/.test(parts[i])) { var rest = parts.slice(i).join('.'); return v.map(function (x) { return getP(x, rest); }).filter(function (x) { return x !== undefined; }); }
        if (typeof v !== 'object') return undefined;
        v = v[parts[i]];
      }
      return v;
    }
    function setP(d, path, val) {
      var parts = String(path).split('.'), o = d;
      for (var i = 0; i < parts.length - 1; i++) { var k = parts[i]; if (o[k] == null || typeof o[k] !== 'object') o[k] = /^\d+$/.test(parts[i + 1]) ? [] : {}; o = o[k]; }
      o[parts[parts.length - 1]] = val;
    }
    function unsetP(d, path) { var parts = String(path).split('.'), o = d; for (var i = 0; i < parts.length - 1; i++) { o = o ? o[parts[i]] : null; } if (o && typeof o === 'object') delete o[parts[parts.length - 1]]; }
    function vals(doc, path) {
      var parts = String(path).split('.'), out = [];
      (function walk(v, i) {
        if (i === parts.length) { out.push(v); if (Array.isArray(v)) v.forEach(function (x) { out.push(x); }); return; }
        if (v == null || typeof v !== 'object') return;
        if (Array.isArray(v)) { if (/^\d+$/.test(parts[i])) { if (+parts[i] < v.length) walk(v[+parts[i]], i + 1); } else v.forEach(function (x) { if (x && typeof x === 'object') walk(x, i); }); return; }
        if (has(v, parts[i])) walk(v[parts[i]], i + 1);
      })(doc, 0);
      return out;
    }
    function same(a, b) { return (typeof a === typeof b && typeof a !== 'object') || (a instanceof Date && b instanceof Date) || (rank(a) === rank(b) && rank(a) !== 1); }
    function eqCond(vs, arg) { if (arg === null) return vs.length === 0 || vs.some(function (v) { return v === null || v === undefined; }); if (arg instanceof RegExp) return vs.some(function (v) { return typeof v === 'string' && arg.test(v); }); return vs.some(function (v) { return eq(v, arg); }); }
    function opTest(vs, op, arg, all) {
      switch (op) {
        case '$eq': return eqCond(vs, arg);
        case '$ne': return !eqCond(vs, arg);
        case '$gt': return vs.some(function (v) { return same(v, arg) && cmp(v, arg) > 0; });
        case '$gte': return vs.some(function (v) { return same(v, arg) && cmp(v, arg) >= 0; });
        case '$lt': return vs.some(function (v) { return same(v, arg) && cmp(v, arg) < 0; });
        case '$lte': return vs.some(function (v) { return same(v, arg) && cmp(v, arg) <= 0; });
        case '$in': if (!Array.isArray(arg)) throw new Error('$in needs an array'); return arg.some(function (a) { return eqCond(vs, a); });
        case '$nin': if (!Array.isArray(arg)) throw new Error('$nin needs an array'); return !arg.some(function (a) { return eqCond(vs, a); });
        case '$exists': return (vs.length > 0) === !!arg;
        case '$regex': var re = arg instanceof RegExp ? arg : new RegExp(arg, (all && all.$options) || ''); return vs.some(function (v) { return typeof v === 'string' && re.test(v); });
        case '$options': return true;
        case '$size': return vs.some(function (v) { return Array.isArray(v) && v.length === arg; });
        case '$all': return vs.some(function (v) { return Array.isArray(v) && arg.every(function (a) { return v.some(function (x) { return eq(x, a); }); }); });
        case '$elemMatch': return vs.some(function (v) { return Array.isArray(v) && v.some(function (x) { return x && typeof x === 'object' && !isOp(arg) ? match(x, arg) : testCond([x], arg); }); });
        case '$not': return !testCond(vs, arg);
        case '$mod': return vs.some(function (v) { return typeof v === 'number' && v % arg[0] === arg[1]; });
        case '$type': var T = { string: 'string', number: 'number', double: 'number', int: 'number', bool: 'boolean', boolean: 'boolean', array: 'array', object: 'object', 'null': 'null', date: 'date' }; var want = T[arg] || arg;
          return vs.some(function (v) { var t = v === null ? 'null' : Array.isArray(v) ? 'array' : v instanceof Date ? 'date' : typeof v; return t === want; });
        default: throw new Error('Mongo-lite does not support the query operator ' + op + ' yet.');
      }
    }
    function testCond(vs, cond) {
      if (cond instanceof RegExp) return vs.some(function (v) { return typeof v === 'string' && cond.test(v); });
      if (isOp(cond)) return Object.keys(cond).every(function (op) { return opTest(vs, op, cond[op], cond); });
      return eqCond(vs, cond);
    }
    function match(doc, q) {
      if (!q) return true;
      if (typeof q !== 'object') throw new Error('A query filter must be an object, like { age: 21 }');
      return Object.keys(q).every(function (k) {
        var c = q[k];
        if (k === '$and') return c.every(function (s) { return match(doc, s); });
        if (k === '$or') return c.some(function (s) { return match(doc, s); });
        if (k === '$nor') return !c.some(function (s) { return match(doc, s); });
        if (k === '$expr') return !!evalExpr(c, doc);
        if (k === '$where' || k === '$text') throw new Error('Mongo-lite does not support ' + k + '.');
        return testCond(vals(doc, k), c);
      });
    }
    function sortDocs(a, spec) {
      var ks = Object.keys(spec || {});
      return a.map(function (d, i) { return { d: d, i: i }; }).sort(function (x, y) {
        for (var j = 0; j < ks.length; j++) { var r = cmp(getP(x.d, ks[j]), getP(y.d, ks[j])) * (spec[ks[j]] < 0 ? -1 : 1); if (r) return r; }
        return x.i - y.i;
      }).map(function (o) { return o.d; });
    }
    function project(d, spec, agg) {
      if (!spec || !Object.keys(spec).length) return d;
      var ks = Object.keys(spec), excl = ks.filter(function (k) { return k !== '_id'; }).every(function (k) { return spec[k] === 0 || spec[k] === false; });
      if (!ks.filter(function (k) { return k !== '_id'; }).length) excl = spec._id === 0 || spec._id === false;
      var o;
      if (excl) { o = clone(d); ks.forEach(function (k) { if (spec[k] === 0 || spec[k] === false) unsetP(o, k); }); return o; }
      o = {};
      if (spec._id !== 0 && spec._id !== false && d._id !== undefined) o._id = clone(d._id);
      ks.forEach(function (k) {
        var v = spec[k]; if (k === '_id' && (v === 1 || v === true || v === 0 || v === false)) return;
        if (v === 1 || v === true) { var x = getP(d, k); if (x !== undefined) setP(o, k, clone(x)); }
        else if (v === 0 || v === false) throw new Error('Projection cannot mix including and excluding fields (except _id).');
        else if (agg || typeof v === 'object' || (typeof v === 'string' && v.charAt(0) === '$')) setP(o, k, evalExpr(v, d));
        else setP(o, k, v);
      });
      return o;
    }
    function num(x) { return typeof x === 'number' ? x : x instanceof Date ? x.getTime() : null; }
    function evalExpr(e, d) {
      if (typeof e === 'string') { if (e === '$$ROOT' || e === '$$CURRENT') return d; if (e.charAt(0) === '$') return getP(d, e.slice(1)); return e; }
      if (e === null || typeof e !== 'object' || e instanceof Date || e instanceof RegExp) return e;
      if (Array.isArray(e)) return e.map(function (x) { return evalExpr(x, d); });
      var ks = Object.keys(e);
      if (ks.length === 1 && ks[0].charAt(0) === '$') {
        var op = ks[0], a = e[op], A = function () { return (Array.isArray(a) ? a : [a]).map(function (x) { return evalExpr(x, d); }); };
        var flatNums = function () { var v = A(); if (!Array.isArray(a) && Array.isArray(v[0])) v = v[0]; return v.filter(function (x) { return typeof x === 'number'; }); };
        var L, x;
        switch (op) {
          case '$add': L = A(); return L.some(function (q) { return q == null; }) ? null : L.reduce(function (s, q) { return s + num(q); }, 0);
          case '$subtract': L = A(); return L[0] == null || L[1] == null ? null : num(L[0]) - num(L[1]);
          case '$multiply': L = A(); return L.some(function (q) { return q == null; }) ? null : L.reduce(function (s, q) { return s * q; }, 1);
          case '$divide': L = A(); if (L[1] === 0) throw new Error('$divide by zero'); return L[0] == null || L[1] == null ? null : L[0] / L[1];
          case '$mod': L = A(); return L[0] % L[1];
          case '$abs': x = A()[0]; return x == null ? null : Math.abs(x);
          case '$ceil': x = A()[0]; return x == null ? null : Math.ceil(x);
          case '$floor': x = A()[0]; return x == null ? null : Math.floor(x);
          case '$sqrt': x = A()[0]; return x == null ? null : Math.sqrt(x);
          case '$pow': L = A(); return Math.pow(L[0], L[1]);
          case '$round': L = A(); var p = L[1] || 0, m = Math.pow(10, p); return L[0] == null ? null : Math.round(L[0] * m) / m;
          case '$trunc': L = A(); return L[0] == null ? null : Math.trunc(L[0]);
          case '$concat': L = A(); return L.some(function (q) { return q == null; }) ? null : L.join('');
          case '$toUpper': x = A()[0]; return x == null ? '' : String(x).toUpperCase();
          case '$toLower': x = A()[0]; return x == null ? '' : String(x).toLowerCase();
          case '$substr': case '$substrCP': case '$substrBytes': L = A(); return String(L[0] == null ? '' : L[0]).substr(L[1], L[2] < 0 ? undefined : L[2]);
          case '$strLenCP': case '$strLenBytes': return String(A()[0] || '').length;
          case '$split': L = A(); return L[0] == null ? null : String(L[0]).split(L[1]);
          case '$trim': return String(evalExpr(a.input, d) || '').trim();
          case '$toString': x = A()[0]; return x == null ? null : String(x);
          case '$toInt': x = A()[0]; return x == null ? null : parseInt(x, 10);
          case '$toDouble': case '$toDecimal': x = A()[0]; return x == null ? null : parseFloat(x);
          case '$size': x = A()[0]; if (!Array.isArray(x)) throw new Error('$size needs an array'); return x.length;
          case '$arrayElemAt': L = A(); var arr = L[0] || [], i = L[1] < 0 ? arr.length + L[1] : L[1]; return arr[i];
          case '$first': x = A()[0]; return Array.isArray(x) ? x[0] : x;
          case '$last': x = A()[0]; return Array.isArray(x) ? x[x.length - 1] : x;
          case '$sum': L = flatNums(); return L.reduce(function (s, q) { return s + q; }, 0);
          case '$avg': L = flatNums(); return L.length ? L.reduce(function (s, q) { return s + q; }, 0) / L.length : null;
          case '$min': L = A(); if (!Array.isArray(a) && Array.isArray(L[0])) L = L[0]; L = L.filter(function (q) { return q != null; }); return L.length ? L.reduce(function (s, q) { return cmp(q, s) < 0 ? q : s; }) : null;
          case '$max': L = A(); if (!Array.isArray(a) && Array.isArray(L[0])) L = L[0]; L = L.filter(function (q) { return q != null; }); return L.length ? L.reduce(function (s, q) { return cmp(q, s) > 0 ? q : s; }) : null;
          case '$cond': if (Array.isArray(a)) return evalExpr(a[0], d) ? evalExpr(a[1], d) : evalExpr(a[2], d); return evalExpr(a['if'], d) ? evalExpr(a.then, d) : evalExpr(a['else'], d);
          case '$ifNull': L = A(); for (var j = 0; j < L.length; j++) if (L[j] != null) return L[j]; return null;
          case '$eq': L = A(); return eq(L[0], L[1]) || (L[0] == null && L[1] == null);
          case '$ne': L = A(); return !(eq(L[0], L[1]) || (L[0] == null && L[1] == null));
          case '$gt': L = A(); return cmp(L[0], L[1]) > 0;
          case '$gte': L = A(); return cmp(L[0], L[1]) >= 0;
          case '$lt': L = A(); return cmp(L[0], L[1]) < 0;
          case '$lte': L = A(); return cmp(L[0], L[1]) <= 0;
          case '$cmp': L = A(); x = cmp(L[0], L[1]); return x < 0 ? -1 : x > 0 ? 1 : 0;
          case '$and': return A().every(function (q) { return !!q; });
          case '$or': return A().some(function (q) { return !!q; });
          case '$not': return !A()[0];
          case '$in': L = A(); return (L[1] || []).some(function (q) { return eq(q, L[0]); });
          case '$literal': return a;
          case '$year': x = A()[0]; return x instanceof Date ? x.getUTCFullYear() : new Date(x).getUTCFullYear();
          case '$month': x = A()[0]; return (x instanceof Date ? x : new Date(x)).getUTCMonth() + 1;
          case '$dayOfMonth': x = A()[0]; return (x instanceof Date ? x : new Date(x)).getUTCDate();
          default: throw new Error('Mongo-lite does not support the expression operator ' + op + ' yet.');
        }
      }
      var o = {}; ks.forEach(function (k) { o[k] = evalExpr(e[k], d); }); return o;
    }
    function group(a, spec) {
      if (!spec || !has(spec, '_id')) throw new Error('$group needs an _id field, e.g. { _id: "$city", total: { $sum: 1 } }');
      var groups = {}, order = [];
      a.forEach(function (d) {
        var id = evalExpr(spec._id, d); if (id === undefined) id = null;
        var key = JSON.stringify(id), g = groups[key];
        if (!g) { g = groups[key] = { _id: id, acc: {} }; order.push(key); }
        Object.keys(spec).forEach(function (f) {
          if (f === '_id') return;
          var acc = spec[f]; if (!acc || typeof acc !== 'object') throw new Error('Each $group field needs an accumulator, e.g. { $sum: "$price" }');
          var op = Object.keys(acc)[0], ex = acc[op], st = g.acc[f] || (g.acc[f] = { op: op, n: 0, s: 0, list: [], v: null, has: false });
          var val = op === '$count' ? 1 : evalExpr(ex, d);
          switch (op) {
            case '$sum': if (typeof val === 'number') st.s += val; break;
            case '$avg': if (typeof val === 'number') { st.s += val; st.n++; } break;
            case '$min': if (val != null && (!st.has || cmp(val, st.v) < 0)) { st.v = val; st.has = true; } break;
            case '$max': if (val != null && (!st.has || cmp(val, st.v) > 0)) { st.v = val; st.has = true; } break;
            case '$first': if (!st.has) { st.v = val === undefined ? null : val; st.has = true; } break;
            case '$last': st.v = val === undefined ? null : val; st.has = true; break;
            case '$push': st.list.push(val === undefined ? null : clone(val)); break;
            case '$addToSet': if (!st.list.some(function (q) { return eq(q, val); })) st.list.push(clone(val)); break;
            case '$count': st.s++; break;
            default: throw new Error('Mongo-lite does not support the accumulator ' + op + '.');
          }
        });
      });
      return order.map(function (k) {
        var g = groups[k], o = { _id: g._id };
        Object.keys(spec).forEach(function (f) {
          if (f === '_id') return; var st = g.acc[f]; if (!st) { o[f] = null; return; }
          o[f] = st.op === '$sum' || st.op === '$count' ? st.s : st.op === '$avg' ? (st.n ? st.s / st.n : null) : (st.op === '$push' || st.op === '$addToSet') ? st.list : st.v;
        });
        return o;
      });
    }
    function aggregate(docs, pipeline, cols) {
      if (!Array.isArray(pipeline)) throw new Error('aggregate() needs an array of stages, e.g. aggregate([{ $match: {...} }])');
      var a = docs.map(clone);
      pipeline.forEach(function (st) {
        var k = Object.keys(st || {})[0], v = st[k], o;
        switch (k) {
          case '$match': a = a.filter(function (d) { return match(d, v); }); break;
          case '$project': a = a.map(function (d) { return project(d, v, true); }); break;
          case '$addFields': case '$set': a = a.map(function (d) { var r = clone(d); Object.keys(v).forEach(function (f) { setP(r, f, evalExpr(v[f], d)); }); return r; }); break;
          case '$unset': a = a.map(function (d) { var r = clone(d); [].concat(v).forEach(function (f) { unsetP(r, f); }); return r; }); break;
          case '$group': a = group(a, v); break;
          case '$sort': a = sortDocs(a, v); break;
          case '$limit': a = a.slice(0, v); break;
          case '$skip': a = a.slice(v); break;
          case '$count': o = {}; o[v] = a.length; a = a.length ? [o] : []; break;
          case '$sortByCount': a = sortDocs(group(a, { _id: v, count: { $sum: 1 } }), { count: -1 }); break;
          case '$replaceRoot': case '$replaceWith': a = a.map(function (d) { return clone(evalExpr(k === '$replaceRoot' ? v.newRoot : v, d)); }); break;
          case '$sample': a = a.slice(0, v.size); break;
          case '$unwind':
            var path = typeof v === 'string' ? v : v.path, keep = typeof v === 'object' && v.preserveNullAndEmptyArrays, f = path.replace(/^\$/, ''), out = [];
            a.forEach(function (d) { var arr = getP(d, f); if (Array.isArray(arr) && arr.length) arr.forEach(function (x) { var r = clone(d); setP(r, f, clone(x)); out.push(r); }); else if (arr != null && !Array.isArray(arr)) out.push(d); else if (keep) out.push(d); });
            a = out; break;
          case '$lookup':
            var from = cols[v.from] || [];
            a = a.map(function (d) { var r = clone(d), lv = getP(d, v.localField); r[v.as] = from.filter(function (fd) { var fv = getP(fd, v.foreignField); return Array.isArray(lv) ? lv.some(function (q) { return eq(q, fv); }) : (eq(lv, fv) || (Array.isArray(fv) && fv.some(function (q) { return eq(q, lv); }))); }).map(clone); return r; });
            break;
          default: throw new Error('Mongo-lite does not support the stage ' + k + ' yet.');
        }
      });
      return a;
    }
    function applyUpdate(doc, up, isInsert) {
      var keys = Object.keys(up || {});
      if (!keys.length || keys[0].charAt(0) !== '$') throw new Error('Update needs operators like { $set: { … } } (use replaceOne to replace a whole document).');
      keys.forEach(function (op) {
        var spec = up[op];
        Object.keys(spec).forEach(function (p) {
          var v = spec[p], cur = getP(doc, p), arr;
          switch (op) {
            case '$set': setP(doc, p, clone(v)); break;
            case '$setOnInsert': if (isInsert) setP(doc, p, clone(v)); break;
            case '$unset': unsetP(doc, p); break;
            case '$inc': if (cur != null && typeof cur !== 'number') throw new Error('Cannot $inc a non-number field "' + p + '"'); setP(doc, p, (cur || 0) + v); break;
            case '$mul': setP(doc, p, (cur || 0) * v); break;
            case '$min': if (cur === undefined || cmp(v, cur) < 0) setP(doc, p, v); break;
            case '$max': if (cur === undefined || cmp(v, cur) > 0) setP(doc, p, v); break;
            case '$push': arr = cur === undefined ? [] : cur; if (!Array.isArray(arr)) throw new Error('$push needs "' + p + '" to be an array'); if (v && typeof v === 'object' && v.$each) v.$each.forEach(function (x) { arr.push(clone(x)); }); else arr.push(clone(v)); setP(doc, p, arr); break;
            case '$addToSet': arr = cur === undefined ? [] : cur; if (!Array.isArray(arr)) throw new Error('$addToSet needs an array'); (v && typeof v === 'object' && v.$each ? v.$each : [v]).forEach(function (x) { if (!arr.some(function (q) { return eq(q, x); })) arr.push(clone(x)); }); setP(doc, p, arr); break;
            case '$pull': if (Array.isArray(cur)) setP(doc, p, cur.filter(function (el) { return !(v && typeof v === 'object' && !isOp(v) && !(v instanceof RegExp) && el && typeof el === 'object' ? match(el, v) : testCond([el], v)); })); break;
            case '$pop': if (Array.isArray(cur)) { if (v < 0) cur.shift(); else cur.pop(); } break;
            case '$rename': if (cur !== undefined) { unsetP(doc, p); setP(doc, v, cur); } break;
            case '$currentDate': setP(doc, p, new Date()); break;
            default: throw new Error('Mongo-lite does not support the update operator ' + op + ' yet.');
          }
        });
      });
    }
    function Cursor(src, proj) {
      var c = { __cursor: true }, s = null, lim = 0, sk = 0, mp = null, arr = null, it = 0;
      function all() { if (arr) return arr; var a = src(); if (s) a = sortDocs(a, s); if (sk) a = a.slice(sk); if (lim) a = a.slice(0, Math.abs(lim)); if (proj) a = a.map(function (d) { return project(d, proj); }); if (mp) a = a.map(mp); arr = a; return a; }
      c.sort = function (x) { s = x; arr = null; return c; };
      c.limit = function (n) { lim = +n || 0; arr = null; return c; };
      c.skip = function (n) { sk = +n || 0; arr = null; return c; };
      c.project = function (p) { proj = p; arr = null; return c; };
      c.map = function (f) { mp = f; arr = null; return c; };
      c.pretty = function () { return c; }; c.batchSize = function () { return c; }; c.hint = function () { return c; }; c.allowDiskUse = function () { return c; };
      c.toArray = function () { return all().slice(); };
      c.forEach = function (f) { all().forEach(function (d) { f(d); }); };
      c.count = function () { return src().length; };
      c.size = c.itcount = function () { return all().length; };
      c.hasNext = function () { return it < all().length; };
      c.next = function () { return it < all().length ? all()[it++] : null; };
      c.explain = function () { return { queryPlanner: { note: 'Mongo-lite scans every document — there are no indexes in this in-memory engine.' } }; };
      return c;
    }
    function Coll(name, cols) {
      function data() { return cols[name] || (cols[name] = []); }
      function idx(f) { var d = data(); for (var i = 0; i < d.length; i++) if (match(d[i], f)) return i; return -1; }
      function seed(f) { var o = {}; Object.keys(f || {}).forEach(function (k) { if (k.charAt(0) !== '$' && !isOp(f[k])) setP(o, k, clone(f[k])); }); return o; }
      var c = {
        find: function (f, p) { return Cursor(function () { return data().filter(function (d) { return match(d, f); }).map(clone); }, p); },
        findOne: function (f, p) { var i = idx(f); return i < 0 ? null : project(clone(data()[i]), p); },
        insertOne: function (doc) { if (!doc || typeof doc !== 'object' || Array.isArray(doc)) throw new Error('insertOne needs one document object'); var d = clone(doc); if (d._id === undefined) d._id = ObjectId(); if (data().some(function (x) { return eq(x._id, d._id); })) throw new Error('E11000 duplicate key error: _id ' + JSON.stringify(d._id)); data().push(d); return { acknowledged: true, insertedId: d._id }; },
        insertMany: function (docs) { if (!Array.isArray(docs)) throw new Error('insertMany needs an array of documents'); var ids = {}; docs.forEach(function (d, i) { ids[i] = c.insertOne(d).insertedId; }); return { acknowledged: true, insertedIds: ids }; },
        updateOne: function (f, u, o) { var i = idx(f); if (i < 0) { if (o && o.upsert) { var nd = seed(f); applyUpdate(nd, u, true); var r = c.insertOne(nd); return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedCount: 1, upsertedId: r.insertedId }; } return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedCount: 0 }; } var d = data()[i], before = JSON.stringify(d); applyUpdate(d, u, false); return { acknowledged: true, matchedCount: 1, modifiedCount: JSON.stringify(d) !== before ? 1 : 0, upsertedCount: 0 }; },
        updateMany: function (f, u, o) { var m = 0, mod = 0; data().forEach(function (d) { if (match(d, f)) { m++; var b = JSON.stringify(d); applyUpdate(d, u, false); if (JSON.stringify(d) !== b) mod++; } }); if (!m && o && o.upsert) return c.updateOne(f, u, o); return { acknowledged: true, matchedCount: m, modifiedCount: mod, upsertedCount: 0 }; },
        replaceOne: function (f, doc, o) { var i = idx(f); if (Object.keys(doc || {}).some(function (k) { return k.charAt(0) === '$'; })) throw new Error('replaceOne takes a plain document, not $operators'); if (i < 0) { if (o && o.upsert) { var r = c.insertOne(doc); return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedCount: 1, upsertedId: r.insertedId }; } return { acknowledged: true, matchedCount: 0, modifiedCount: 0 }; } var nd = clone(doc); nd._id = data()[i]._id; data()[i] = nd; return { acknowledged: true, matchedCount: 1, modifiedCount: 1 }; },
        findOneAndUpdate: function (f, u, o) { var i = idx(f); if (i < 0) return null; var before = clone(data()[i]); applyUpdate(data()[i], u, false); return o && (o.returnDocument === 'after' || o.returnNewDocument) ? clone(data()[i]) : before; },
        findOneAndDelete: function (f) { var i = idx(f); if (i < 0) return null; return data().splice(i, 1)[0]; },
        deleteOne: function (f) { var i = idx(f); if (i >= 0) data().splice(i, 1); return { acknowledged: true, deletedCount: i >= 0 ? 1 : 0 }; },
        deleteMany: function (f) { var d = data(), keep = d.filter(function (x) { return !match(x, f); }), n = d.length - keep.length; cols[name] = keep; return { acknowledged: true, deletedCount: n }; },
        countDocuments: function (f) { return data().filter(function (d) { return match(d, f); }).length; },
        count: function (f) { return c.countDocuments(f); },
        estimatedDocumentCount: function () { return data().length; },
        distinct: function (field, f) { var out = []; data().forEach(function (d) { if (!match(d, f)) return; vals(d, field).forEach(function (v) { if (Array.isArray(v) || v === undefined) return; if (!out.some(function (q) { return eq(q, v); })) out.push(v); }); }); return out.sort(cmp); },
        aggregate: function (p) { var res = aggregate(data(), p, cols); return Cursor(function () { return res; }); },
        createIndex: function (spec) { return Object.keys(spec || {}).map(function (k) { return k + '_' + spec[k]; }).join('_'); },
        getIndexes: function () { return [{ v: 2, key: { _id: 1 }, name: '_id_' }]; },
        drop: function () { delete cols[name]; return true; },
        getName: function () { return name; }
      };
      c.insert = function (x) { return Array.isArray(x) ? c.insertMany(x) : c.insertOne(x); };
      c.remove = function (f) { return c.deleteMany(f); };
      return c;
    }
    function makeDb(setup) {
      var cols = {};
      (Array.isArray(setup) ? setup : []).forEach(function (s) { if (!s) return; var nm = s.collection || s.name; if (nm) cols[nm] = (s.docs || s.documents || []).map(clone); });
      var cache = {};
      function coll(n) { if (!cols[n]) cols[n] = []; return cache[n] || (cache[n] = Coll(n, cols)); }
      var api = {
        getCollection: coll, getCollectionNames: function () { return Object.keys(cols).sort(); },
        createCollection: function (n) { coll(n); return { ok: 1 }; },
        dropDatabase: function () { Object.keys(cols).forEach(function (k) { delete cols[k]; }); return { ok: 1, dropped: 'test' }; },
        getName: function () { return 'test'; }, getSiblingDB: function () { return proxy; },
        stats: function () { return { db: 'test', collections: Object.keys(cols).length, objects: Object.keys(cols).reduce(function (s, k) { return s + cols[k].length; }, 0) }; }
      };
      var proxy = typeof Proxy === 'function' ? new Proxy(api, { get: function (t, k) { if (typeof k !== 'string') return undefined; if (has(t, k)) return t[k]; if (k === 'then' || k === 'toJSON' || k === 'constructor') return undefined; return coll(k); } }) : api;
      if (typeof Proxy !== 'function') Object.keys(cols).forEach(function (k) { api[k] = coll(k); });
      return { proxy: proxy, cols: cols };
    }
    /* split shell code into top-level statements (by ; or by line, keeping method chains together) */
    function split(code, tok) {
      var T = tok(code), parts = [], cur = '', depth = 0, start = 0, last = null;
      function flush() { if (cur.trim()) parts.push({ code: cur, line: start || 1 }); cur = ''; start = 0; last = null; }
      for (var i = 0; i < T.length; i++) {
        var t = T[i], sig = t.t !== 'ws' && t.t !== 'c';
        if (!start && !sig) continue;
        if (t.t === 'ws' && depth === 0 && t.s.indexOf('\n') >= 0 && last) {
          var nx = null; for (var j = i + 1; j < T.length; j++) if (T[j].t !== 'ws' && T[j].t !== 'c') { nx = T[j]; break; }
          var cont = (nx && nx.t === 'p' && /^[.)\]},?:+\-*\/%&|=<>]/.test(nx.s)) || (last.t === 'p' && /[=+\-*\/%&|,(\[{.?:<>!]$/.test(last.s));
          if (!cont) { flush(); continue; }
        }
        if (sig && !start) start = t.l;
        cur += t.s;
        if (t.t === 'p') { if ('([{'.indexOf(t.s) >= 0) depth++; else if (')]}'.indexOf(t.s) >= 0) depth = Math.max(0, depth - 1); else if (t.s === ';' && depth === 0) { flush(); continue; } }
        if (sig) last = t;
      }
      flush();
      return parts;
    }
    return { makeDb: makeDb, ObjectId: ObjectId, split: split, match: match, aggregate: aggregate };
  };
})();

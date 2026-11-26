/* VidyaVerse v2 — Code Lab teaching interpreter, part 2: runtime core (values, scopes, statements, expressions, classes).
   Educational interpreter for a SUBSET of Java / C# / C / C++ — not a JVM, .NET or a compiler. Step-limited, depth-limited.
   Serialised into a sandboxed worker, so it must stay self-contained. Builtins live in code-edu-lib.js. */
(function () {
  'use strict';
  var C = window.VV2.Code = window.VV2.Code || {};
  C.eduRT = function eduRT(EP, LIBF) {
    function run(lang, src, stdin, write) {
      var isJ = lang === 'java', isCS = lang === 'csharp', isCpp = lang === 'cpp', isC = lang === 'c' || isCpp;
      var MAXSTEPS = 4000000, MAXDEPTH = 1500, steps = 0, t0 = Date.now(), depth = 0, objSeq = 0, curLine = 0, buf = '';
      var NOPE = { nope: 1 };
      function out(s) { buf += s; if (buf.length > 4096) flush(); }
      function flush() { if (buf) { write(buf, 'out'); buf = ''; } }
      function errw(s) { flush(); write(s, 'err'); }

      /* ---------- values ---------- */
      function D(v) { this.v = v; }
      function Ch(c) { this.c = c; }
      function Arr(a, et) { this.a = a; this.et = et; this.id = ++objSeq; }
      function Lst(a, kind, et, cmp) { this.a = a; this.kind = kind || 'list'; this.et = et || null; this.cmp = cmp || null; this.id = ++objSeq; }
      function Mp(kind, kt, vt) { this.m = new Map(); this.kind = kind; this.kt = kt; this.vt = vt; this.max = 0; this.seq = 0; this.id = ++objSeq; }
      function St(kind, et) { this.m = new Map(); this.kind = kind; this.et = et; this.max = 0; this.seq = 0; this.id = ++objSeq; }
      function SB(s) { this.s = s; this.id = ++objSeq; }
      function Obj(cls) { this.cls = cls; this.f = Object.create(null); this.id = ++objSeq; }
      function Fn(ps, body, env, user) { this.ps = ps; this.body = body; this.env = env; this.user = user || null; }
      function Pair(a, b, kind) { this.a = a; this.b = b; this.kind = kind || 'pair'; }
      function EnumV(en, name, ord) { this.en = en; this.name = name; this.ord = ord; }
      function Exc(cls, msg, val) { this.cls = cls; this.msg = msg; this.val = val; this.id = ++objSeq; }
      function Iter(c, i) { this.c = c; this.i = i; }
      function Ref(get, set, t) { this.get = get; this.set = set; this.t = t; }
      function Sig(s, v, label) { this.s = s; this.v = v; this.label = label; }

      var INTS = { 'int': 32, 'long': 64, 'short': 16, 'byte': 8, 'long long': 64, 'long int': 64, 'short int': 16, 'unsigned': -32, 'unsigned int': -32, 'unsigned long': -64, 'unsigned long long': -64, 'unsigned short': -16, 'unsigned char': -8, 'signed char': 8, 'signed': 32, 'signed int': 32, 'size_t': -64, 'uint': -32, 'ulong': -64, 'ushort': -16, 'sbyte': 8, 'Integer': 32, 'Long': 64, 'Short': 16, 'Byte': 8, 'Int32': 32, 'Int64': 64, 'long long int': 64 };
      if (isCS) { INTS['byte'] = -8; INTS.Byte = -8; }
      var DBLS = { 'double': 1, 'float': 1, 'long double': 1, 'decimal': 1, 'Double': 1, 'Float': 1, 'Decimal': 1 };
      function isInt(v) { return typeof v === 'number'; }
      function num(v) { return v instanceof D ? v.v : v instanceof Ch ? v.c : typeof v === 'boolean' ? (v ? 1 : 0) : v instanceof EnumV ? v.ord : v; }
      function isNumV(v) { return typeof v === 'number' || v instanceof D || v instanceof Ch || (isC && typeof v === 'boolean'); }
      function wrapInt(bits, v) {
        if (!isFinite(v)) return 0; v = Math.trunc(v);
        if (bits === 32) return v | 0; if (bits === -32) return v >>> 0; if (bits === 16) return (v << 16) >> 16; if (bits === -16) return v & 0xFFFF;
        if (bits === 8) return (v << 24) >> 24; if (bits === -8) return v & 0xFF; if (bits === -64 && v < 0) return v + 18446744073709551616; return v;
      }

      /* ---------- errors ---------- */
      function RT(msg, cls) { var e = new Error(msg); e.vvRT = true; e.cls = cls || 'error'; e.line = curLine; return e; }
      var EXN = {
        div0: ['ArithmeticException', 'DivideByZeroException', 'division by zero'], idx: ['ArrayIndexOutOfBoundsException', 'IndexOutOfRangeException', 'out_of_range'],
        lidx: ['IndexOutOfBoundsException', 'ArgumentOutOfRangeException', 'out_of_range'], sidx: ['StringIndexOutOfBoundsException', 'ArgumentOutOfRangeException', 'out_of_range'],
        npe: ['NullPointerException', 'NullReferenceException', 'null pointer'], fmt: ['NumberFormatException', 'FormatException', 'invalid_argument'],
        input: ['InputMismatchException', 'FormatException', 'invalid_argument'], eof: ['NoSuchElementException', 'InvalidOperationException', 'end of input'],
        key: ['NoSuchElementException', 'KeyNotFoundException', 'out_of_range'], state: ['IllegalStateException', 'InvalidOperationException', 'logic_error'],
        arg: ['IllegalArgumentException', 'ArgumentException', 'invalid_argument'], cast: ['ClassCastException', 'InvalidCastException', 'bad_cast'],
        so: ['StackOverflowError', 'StackOverflowException', 'stack overflow'], neg: ['NegativeArraySizeException', 'OverflowException', 'bad_array_new_length'],
        unsup: ['UnsupportedOperationException', 'NotSupportedException', 'logic_error']
      };
      function X(kind, msg) { var n = EXN[kind]; return RT(msg, n ? n[isJ ? 0 : isCS ? 1 : 2] : kind); }
      var PARENT = { ArithmeticException: 'RuntimeException', ArrayIndexOutOfBoundsException: 'IndexOutOfBoundsException', StringIndexOutOfBoundsException: 'IndexOutOfBoundsException', IndexOutOfBoundsException: 'RuntimeException', NullPointerException: 'RuntimeException', NumberFormatException: 'IllegalArgumentException', IllegalArgumentException: 'RuntimeException', InputMismatchException: 'NoSuchElementException', NoSuchElementException: 'RuntimeException', IllegalStateException: 'RuntimeException', ClassCastException: 'RuntimeException', NegativeArraySizeException: 'RuntimeException', UnsupportedOperationException: 'RuntimeException', ConcurrentModificationException: 'RuntimeException', RuntimeException: 'Exception', IOException: 'Exception', InterruptedException: 'Exception', Exception: 'Throwable', StackOverflowError: 'Error', Error: 'Throwable',
        DivideByZeroException: 'ArithmeticException', OverflowException: 'ArithmeticException', IndexOutOfRangeException: 'SystemException', ArgumentOutOfRangeException: 'ArgumentException', ArgumentNullException: 'ArgumentException', ArgumentException: 'SystemException', FormatException: 'SystemException', KeyNotFoundException: 'SystemException', InvalidOperationException: 'SystemException', NullReferenceException: 'SystemException', InvalidCastException: 'SystemException', NotImplementedException: 'SystemException', NotSupportedException: 'SystemException', SystemException: 'Exception', StackOverflowException: 'SystemException', ApplicationException: 'Exception',
        out_of_range: 'logic_error', invalid_argument: 'logic_error', length_error: 'logic_error', domain_error: 'logic_error', logic_error: 'exception', runtime_error: 'exception', overflow_error: 'runtime_error', underflow_error: 'runtime_error', range_error: 'runtime_error', bad_alloc: 'exception', bad_cast: 'exception', bad_array_new_length: 'exception' };
      function isa(name, target) {
        if (!target || target === '...' || target === 'Throwable' || target === 'exception' || (target === 'Exception' && !/Error$/.test(name || ''))) return true;
        for (var n = name, g = 0; n && g < 30; g++) { if (n === target) return true; var uc = classes[n]; n = uc ? uc.base : PARENT[n]; }
        return false;
      }

      /* ---------- parse ---------- */
      var prog;
      try { prog = EP.parse(src, lang); }
      catch (e) { flush(); return { ok: false, err: (isJ ? 'Compile error' : isCS ? 'Compile error' : 'Compile error') + (e.line ? ' (line ' + e.line + ')' : '') + ': ' + e.message, line: e.line || 0 }; }
      var classes = prog.classes, enums = prog.enums, fns = prog.fns;

      /* ---------- scopes ---------- */
      function Env(p, self, cls) { this.v = Object.create(null); this.p = p; this.self = self !== undefined ? self : (p ? p.self : null); this.cls = cls !== undefined ? cls : (p ? p.cls : null); }
      var G = new Env(null, null, null);
      function lookup(env, n) { for (var e = env; e; e = e.p) { var c = e.v[n]; if (c) return c; } return null; }
      function clsOf(n) { return n ? classes[n] || null : null; }
      function findCell(env, n) {
        var c = lookup(env, n); if (c) return c;
        if (env.self && env.self.f[n]) return env.self.f[n];
        for (var k = env.cls; k; k = clsOf(k.base)) if (k.sf && k.sf[n]) return k.sf[n];
        return null;
      }
      function declare(env, n, cell) {
        if (env.v[n] && env !== G && (isJ || isCS || isC)) throw RT((isJ ? 'variable ' + n + ' is already defined in this scope' : isCS ? "A local variable named '" + n + "' is already defined in this scope" : "redeclaration of '" + n + "'"), 'compile');
        env.v[n] = cell;
      }
      function refCell(r, t) { var c = { t: t }; Object.defineProperty(c, 'v', { get: r.get, set: r.set, enumerable: true }); return c; }

      /* ---------- type helpers ---------- */
      function isListT(n) { return /^(ArrayList|List|LinkedList|Vector|vector|Stack|stack|Queue|queue|Deque|ArrayDeque|deque|list|PriorityQueue|priority_queue|IList|IEnumerable|ICollection|Collection|Iterable|array)$/.test(n); }
      function isMapT(n) { return /^(HashMap|Map|TreeMap|LinkedHashMap|Dictionary|SortedDictionary|SortedList|IDictionary|map|unordered_map|multimap)$/.test(n); }
      function isSetT(n) { return /^(HashSet|Set|TreeSet|LinkedHashSet|SortedSet|ISet|set|unordered_set|multiset)$/.test(n); }
      function elemT(t) { return t ? (t.dims > 1 ? { n: t.n, g: t.g, dims: t.dims - 1 } : t.dims === 1 ? { n: t.n, g: t.g, dims: 0 } : (t.g && t.g[0]) || null) : null; }
      function defaultFor(t) {
        if (!t) return null;
        if (t.dims || t.ptr) return null;
        var n = t.n;
        if (INTS[n] && !/^[A-Z]/.test(n)) return 0;
        if (DBLS[n] && !/^[A-Z]/.test(n)) return new D(0);
        if (INTS[n] || DBLS[n]) return isCS ? 0 : null;
        if (n === 'char') return new Ch(0);
        if (n === 'bool' || n === 'boolean') return false;
        if (isCpp && (n === 'string' || n === 'std::string')) return '';
        if (isCpp && (isListT(n) || isMapT(n) || isSetT(n) || n === 'pair')) return construct(t, [], null);
        if (isC && classes[n]) return instantiate(classes[n], [], null, G);
        if (isCS && classes[n] && classes[n].kind === 'struct') return instantiate(classes[n], [], null, G);
        if (enums[n] && isCS) return enumVals(n)[0];
        return null;
      }
      function copyVal(v) {
        if (v instanceof Lst) return new Lst(v.a.map(copyVal), v.kind, v.et, v.cmp);
        if (v instanceof Mp) { var m = new Mp(v.kind, v.kt, v.vt); v.m.forEach(function (e, k) { m.m.set(k, { k: e.k, v: copyVal(e.v), seq: e.seq }); }); m.max = v.max; m.seq = v.seq; return m; }
        if (v instanceof St) { var s = new St(v.kind, v.et); v.m.forEach(function (e, k) { s.m.set(k, { k: e.k, seq: e.seq }); }); s.max = v.max; s.seq = v.seq; return s; }
        if (v instanceof Pair) return new Pair(copyVal(v.a), copyVal(v.b), v.kind);
        if (v instanceof Obj) { var o = new Obj(v.cls); for (var f in v.f) o.f[f] = { v: copyVal(v.f[f].v), t: v.f[f].t }; return o; }
        if (v instanceof Arr && isCpp && v.fixed) return new Arr(v.a.map(copyVal), v.et);
        return v;
      }
      function coerce(t, v, narrow, param) {
        if (!t || v === undefined || v instanceof Ref) return v;
        var n = t.n;
        if (t.dims) { if (v instanceof Arr && v.et == null) { v.et = elemT(t); v.a = v.a.map(function (x) { return coerce(v.et, x, narrow); }); } return v; }
        if (t.ptr) { if (n === 'char' && typeof v === 'string') return v; return v; }
        if (n === 'var' || n === 'auto' || n === 'dynamic' || n === 'Object' || n === 'object' || n === 'T') return (isCpp && !t.ref) ? copyVal(v) : v;
        var bits = INTS[n];
        if (bits) {
          if (v === null) { if (/^[A-Z]/.test(n)) return null; throw X('npe', 'cannot assign null to ' + n); }
          if (v instanceof D) { if (!narrow && (isJ || isCS)) throw RT('incompatible types: possible lossy conversion from double to ' + n + ' — use a cast, e.g. (' + n + ') x', 'compile'); return wrapInt(bits, v.v); }
          if (v instanceof Ch) return wrapInt(bits, v.c);
          if (typeof v === 'boolean') { if (isC) return v ? 1 : 0; throw RT('incompatible types: boolean cannot be converted to ' + n, 'compile'); }
          if (typeof v === 'string') throw RT('incompatible types: ' + (isCS ? 'string' : 'String') + ' cannot be converted to ' + n + (isJ ? ' — use Integer.parseInt(s)' : isCS ? ' — use int.Parse(s)' : ' — use stoi(s)'), 'compile');
          if (v instanceof EnumV) { if (isCS && narrow) return v.ord; throw RT('incompatible types: enum cannot be converted to ' + n, 'compile'); }
          if (typeof v === 'number') return wrapInt(bits, v);
          return v;
        }
        if (DBLS[n]) {
          if (v === null) return null;
          if (typeof v === 'number') return new D(n === 'float' || n === 'Float' ? Math.fround(v) : v);
          if (v instanceof Ch) return new D(v.c);
          if (typeof v === 'boolean' && isC) return new D(v ? 1 : 0);
          if (typeof v === 'string') throw RT('incompatible types: string cannot be converted to ' + n, 'compile');
          if (v instanceof D && (n === 'float' || n === 'Float')) return new D(Math.fround(v.v));
          return v;
        }
        if (n === 'char' || n === 'Character') {
          if (typeof v === 'number') return new Ch(v & 0xFFFF);
          if (v instanceof D) { if (!narrow && (isJ || isCS)) throw RT('incompatible types: possible lossy conversion from double to char', 'compile'); return new Ch(Math.trunc(v.v) & 0xFFFF); }
          if (typeof v === 'string' && !narrow) throw RT('incompatible types: String cannot be converted to char — use single quotes for a char, e.g. \'a\'', 'compile');
          return v;
        }
        if (n === 'bool' || n === 'boolean' || n === 'Boolean') {
          if (isC && isNumV(v)) return num(v) !== 0;
          if (isC && v === null) return false;
          if (typeof v !== 'boolean' && v !== null && !(v instanceof Ref)) throw RT('incompatible types: ' + typeName(v) + ' cannot be converted to boolean', 'compile');
          return v;
        }
        if (n === 'string' || n === 'String') {
          if (isCpp && v instanceof Ch) return String.fromCharCode(v.c);
          if (isCpp && v === null) throw X('arg', 'basic_string: construction from null is not valid');
          if ((isJ || isCS) && v !== null && typeof v !== 'string') throw RT('incompatible types: ' + typeName(v) + ' cannot be converted to String' + (isJ ? ' — use String.valueOf(x) or "" + x' : ' — use x.ToString()'), 'compile');
          return v;
        }
        if (v instanceof Arr && (isListT(n) || isSetT(n) || isMapT(n))) return construct(t, [], null, v.a);
        if (isCpp && !t.ref && !param) return copyVal(v);
        if (isCpp && !t.ref && param && (v instanceof Lst || v instanceof Mp || v instanceof St || v instanceof Obj || v instanceof Pair)) return copyVal(v);
        if (isCS && v instanceof Obj && v.cls.kind === 'struct') return copyVal(v);
        if (classes[n] && v !== null && v instanceof Obj && !instOf(v.cls, n)) throw RT('incompatible types: ' + v.cls.n + ' cannot be converted to ' + n, 'compile');
        return v;
      }
      function instOf(cls, n) { for (var k = cls; k; k = clsOf(k.base)) { if (k.n === n || (k.ifaces || []).indexOf(n) >= 0) return true; } return false; }
      function typeName(v) {
        if (v === null || v === undefined) return 'null'; if (typeof v === 'number') return 'int'; if (v instanceof D) return 'double'; if (v instanceof Ch) return 'char';
        if (typeof v === 'boolean') return isJ ? 'boolean' : 'bool'; if (typeof v === 'string') return isJ ? 'String' : 'string';
        if (v instanceof Obj) return v.cls.n; if (v instanceof Arr) return 'array'; if (v instanceof Lst) return 'list'; if (v instanceof Mp) return 'map'; if (v instanceof EnumV) return v.en;
        return 'object';
      }

      /* ---------- maps & sets (ordered like the real libraries where it matters) ---------- */
      function key(v) {
        if (v instanceof D) return 'n' + v.v; if (typeof v === 'number') return 'n' + v; if (v instanceof Ch) return (isC ? 'n' : 'c') + v.c;
        if (typeof v === 'string') return 's' + v; if (typeof v === 'boolean') return 'b' + v; if (v === null || v === undefined) return 'null';
        if (v instanceof EnumV) return 'e' + v.en + ':' + v.ord; if (v instanceof Pair) return 'p' + key(v.a) + '|' + key(v.b);
        if (v instanceof Lst) return 'l[' + v.a.map(key).join(',') + ']';
        return 'o' + (v.id || 0);
      }
      function jhash(v) {
        if (typeof v === 'number') return v | 0; if (v instanceof Ch) return v.c;
        if (typeof v === 'string') { var hh = 0; for (var i = 0; i < v.length; i++) hh = (Math.imul(31, hh) + v.charCodeAt(i)) | 0; return hh; }
        if (typeof v === 'boolean') return v ? 1231 : 1237;
        if (v instanceof D) { var dv = new DataView(new ArrayBuffer(8)); dv.setFloat64(0, v.v); return (dv.getInt32(0) ^ dv.getInt32(4)) | 0; }
        if (v instanceof EnumV) return v.ord * 31 + 17; if (v === null) return 0;
        return Math.imul(v.id || 1, 0x9E3779B1);
      }
      function cmp(a, b) {
        if (isNumV(a) && isNumV(b)) { var x = num(a), y = num(b); return x < y ? -1 : x > y ? 1 : 0; }
        if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0;
        if (a instanceof Pair && b instanceof Pair) return cmp(a.a, b.a) || cmp(a.b, b.b);
        if (a instanceof EnumV && b instanceof EnumV) return a.ord - b.ord;
        if (a instanceof Lst && b instanceof Lst) { for (var i = 0; i < Math.min(a.a.length, b.a.length); i++) { var r = cmp(a.a[i], b.a[i]); if (r) return r; } return a.a.length - b.a.length; }
        if (a === null && b === null) return 0;
        if (a instanceof Obj) { var ct = findMethod(a.cls, isCS ? 'CompareTo' : 'compareTo', 1); if (ct) return num(callUser(ct, a, [b], null, G)); }
        throw RT('cannot compare ' + typeName(a) + ' with ' + typeName(b) + ' (for sorting, give a comparator)', 'cast');
      }
      function entries(c) {
        var arr = []; c.m.forEach(function (e) { arr.push(e); });
        if (/^(tree|sorted)$/.test(c.kind)) arr.sort(function (x, y) { return cmp(x.k, y.k); });
        else if (c.kind === 'hash') { var cap = 16; while (c.max > cap * 0.75) cap *= 2; arr.forEach(function (e) { var hh = jhash(e.k); e.b = (hh ^ (hh >>> 16)) & (cap - 1); }); arr.sort(function (x, y) { return x.b - y.b || x.seq - y.seq; }); }
        return arr;
      }
      function mapKind(n) { if (/^(TreeMap|TreeSet|SortedDictionary|SortedList|SortedSet|map|set|multimap|multiset)$/.test(n)) return 'tree'; if (/^(HashMap|HashSet|Map|Set)$/.test(n) && isJ) return 'hash'; return 'ins'; }
      function mget(m, k) { var e = m.m.get(key(k)); return e; }
      function mset(m, k, v) { var kk = key(k), e = m.m.get(kk); if (e) e.v = v; else { m.m.set(kk, { k: k, v: v, seq: ++m.seq }); if (m.m.size > m.max) m.max = m.m.size; } }
      function sadd(s, k) { var kk = key(k); if (s.m.has(kk)) return false; s.m.set(kk, { k: k, seq: ++s.seq }); if (s.m.size > s.max) s.max = s.m.size; return true; }

      /* ---------- strings for output (dialect aware) ---------- */
      function jDouble(x) {
        if (isNaN(x)) return 'NaN'; if (x === Infinity) return 'Infinity'; if (x === -Infinity) return '-Infinity';
        if (x === 0) return 1 / x < 0 ? '-0.0' : '0.0';
        var a = Math.abs(x);
        if (a >= 1e-3 && a < 1e7) { var s = String(x); return /[.e]/.test(s) ? s : s + '.0'; }
        var m = /^(-?)(\d)(?:\.(\d+))?e([+-]\d+)$/.exec(x.toExponential()); return m[1] + m[2] + '.' + (m[3] || '0') + 'E' + (+m[4]);
      }
      function csDouble(x) {
        if (isNaN(x)) return 'NaN'; if (x === Infinity) return '∞'; if (x === -Infinity) return '-∞';
        if (x === 0) return 1 / x < 0 ? '-0' : '0';
        var a = Math.abs(x);
        if (a >= 1e15 || a < 1e-5) { var m = /^(-?)(\d(?:\.\d+)?)e([+-])(\d+)$/.exec(x.toExponential()); return m[1] + m[2] + 'E' + m[3] + (m[4].length < 2 ? '0' + m[4] : m[4]); }
        return String(x);
      }
      function expC(x, P) { var m = /^(-?\d(?:\.\d+)?)e([+-])(\d+)$/.exec(x.toExponential(P)); return m ? m[1] + 'e' + m[2] + (m[3].length < 2 ? '0' + m[3] : m[3]) : String(x); }
      function gFmt(x, P, mode) {
        if (isNaN(x)) return x < 0 ? '-nan' : 'nan'; if (!isFinite(x)) return x > 0 ? 'inf' : '-inf';
        if (mode === 'fixed') return x.toFixed(Math.min(100, P));
        if (mode === 'sci') return expC(x, P);
        if (x === 0) return (1 / x < 0) ? '-0' : '0';
        if (!P) P = 1;
        var e = x.toExponential(P - 1), X2 = +e.split('e')[1];
        if (X2 < -4 || X2 >= P) { var m = /^(-?\d(?:\.\d+)?)e([+-])(\d+)$/.exec(e), man = m[1]; if (man.indexOf('.') >= 0) man = man.replace(/0+$/, '').replace(/\.$/, ''); return man + 'e' + m[2] + (m[3].length < 2 ? '0' + m[3] : m[3]); }
        var s = x.toFixed(Math.max(0, P - 1 - X2)); if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s;
      }
      var cout = { prec: 6, mode: '', boolalpha: false };
      function fmtD(x) { return isJ ? jDouble(x) : isCS ? csDouble(x) : gFmt(x, cout.prec, cout.mode); }
      function hashHex(id) { return ((Math.imul(id + 7, 0x45d9f3b) >>> 0) % 0x7fffffff).toString(16); }
      function str(v) {
        if (v === null || v === undefined) return isCS ? '' : 'null';
        if (typeof v === 'string') return v;
        if (typeof v === 'number') return String(v);
        if (typeof v === 'boolean') return isCS ? (v ? 'True' : 'False') : isC ? (cout.boolalpha ? String(v) : (v ? '1' : '0')) : String(v);
        if (v instanceof D) return fmtD(v.v);
        if (v instanceof Ch) return String.fromCharCode(v.c);
        if (v instanceof SB) return v.s;
        if (v instanceof EnumV) return v.name;
        if (v instanceof Obj) {
          var ts = findMethod(v.cls, isCS ? 'ToString' : 'toString', 0);
          if (ts) return str(callUser(ts, v, [], null, G));
          if (v.f.__msg) return (isCS ? 'System.Exception: ' : v.cls.n + ': ') + str(v.f.__msg.v);
          return isCS ? v.cls.n : isJ ? v.cls.n + '@' + hashHex(v.id) : '[object ' + v.cls.n + ']';
        }
        if (v instanceof Lst) return isJ ? '[' + v.a.map(str).join(', ') + ']' : isCS ? 'System.Collections.Generic.' + (v.kind === 'stack' ? 'Stack' : v.kind === 'queue' ? 'Queue' : 'List') + '`1[' + csT(v.et) + ']' : '[vector of ' + v.a.length + ']';
        if (v instanceof Arr) return isJ ? '[' + jSig(v.et) + '@' + hashHex(v.id) : isCS ? 'System.' + csT(v.et) + '[]' : '0x7ffd' + hashHex(v.id).slice(0, 8);
        if (v instanceof Mp) return isJ ? '{' + entries(v).map(function (e) { return str(e.k) + '=' + str(e.v); }).join(', ') + '}' : isCS ? 'System.Collections.Generic.Dictionary`2[' + csT(v.kt) + ',' + csT(v.vt) + ']' : '[map]';
        if (v instanceof St) return isJ ? '[' + entries(v).map(function (e) { return str(e.k); }).join(', ') + ']' : isCS ? 'System.Collections.Generic.HashSet`1[' + csT(v.et) + ']' : '[set]';
        if (v instanceof Pair) return isJ ? str(v.a) + '=' + str(v.b) : isCS ? '[' + str(v.a) + ', ' + str(v.b) + ']' : '(' + str(v.a) + ', ' + str(v.b) + ')';
        if (v instanceof Exc) return isJ ? 'java.lang.' + v.cls + (v.msg != null ? ': ' + v.msg : '') : isCS ? 'System.' + v.cls + ': ' + v.msg : String(v.msg);
        if (v instanceof Fn) return isJ ? 'Main$$Lambda@' + hashHex(1) : 'System.Func';
        if (v instanceof Ref) return str(v.get());
        if (v && v.__ostream) return '0x1';
        return String(v);
      }
      function csT(t) { var n = t ? t.n : 'Object'; return { int: 'Int32', string: 'String', double: 'Double', char: 'Char', bool: 'Boolean', long: 'Int64', float: 'Single', decimal: 'Decimal' }[n] || n; }
      function jSig(t) { var n = t ? t.n : ''; return t && t.dims ? '[' + jSig({ n: n, dims: t.dims - 1 }) : ({ int: 'I', double: 'D', char: 'C', boolean: 'Z', long: 'J', float: 'F', 'short': 'S', 'byte': 'B' }[n] || 'Ljava.lang.' + (n || 'Object') + ';'); }

      /* ---------- truthiness, equality, arithmetic ---------- */
      function truthy(v) {
        if (typeof v === 'boolean') return v;
        if (isC) { if (v === null || v === undefined) return false; if (v && v.__istream) return !v.fail; if (isNumV(v)) return num(v) !== 0; return true; }
        throw RT('A condition must be true or false (a boolean), but this is ' + typeName(v) + '. Did you mean == instead of = ?', 'compile');
      }
      function equals(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return (a == null && b == null);
        if (isNumV(a) && isNumV(b)) return num(a) === num(b);
        if (typeof a === 'string' && typeof b === 'string') return a === b;
        if (a instanceof Pair && b instanceof Pair) return equals(a.a, b.a) && equals(a.b, b.b);
        if (isCpp && a instanceof Lst && b instanceof Lst) return a.a.length === b.a.length && a.a.every(function (x, i) { return equals(x, b.a[i]); });
        if (a instanceof Iter && b instanceof Iter) return a.c === b.c && a.i === b.i;
        return false;
      }
      function bin(op, a, b) {
        if (a instanceof Iter && (op === '+' || op === '-')) return b instanceof Iter ? a.i - b.i : new Iter(a.c, a.i + (op === '+' ? 1 : -1) * num(b));
        if (a instanceof Arr && isC && (op === '+' || op === '-') && isNumV(b)) return new Iter(a, (op === '+' ? 1 : -1) * num(b));
        if (op === '+' && (typeof a === 'string' || typeof b === 'string')) {
          if (isCpp && (typeof a !== 'string' || typeof b !== 'string') && !(a instanceof Ch) && !(b instanceof Ch)) throw RT('In C++ you cannot add a number to a string with + — use to_string(n)', 'compile');
          if (isC && !isCpp) throw RT('In C you cannot join strings with + — use strcat or printf', 'compile');
          return str(a) + str(b);
        }
        if (op === '==' || op === '!=') { var eq = equals(a, b); return op === '==' ? eq : !eq; }
        if (op === '<' || op === '>' || op === '<=' || op === '>=') {
          var c;
          if (typeof a === 'string' && typeof b === 'string') { if (!isCpp) throw RT('bad operand types for ' + op + ': strings cannot be compared with ' + op + (isJ ? ' — use a.compareTo(b)' : ' — use string.Compare(a, b)'), 'compile'); c = a < b ? -1 : a > b ? 1 : 0; }
          else { if (!isNumV(a) || !isNumV(b)) throw RT('bad operand types for ' + op + ': ' + typeName(a) + ' and ' + typeName(b), 'compile'); var x0 = num(a), y0 = num(b); c = x0 < y0 ? -1 : x0 > y0 ? 1 : (x0 === y0 ? 0 : NaN); }
          return op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0;
        }
        if ((op === '&' || op === '|' || op === '^') && typeof a === 'boolean' && typeof b === 'boolean') return op === '&' ? (a && b) : op === '|' ? (a || b) : a !== b;
        if (!isNumV(a) || !isNumV(b)) {
          if (a == null || b == null) throw X('npe', 'cannot use null in arithmetic (' + op + ')');
          throw RT('bad operand types for ' + op + ': ' + typeName(a) + ' and ' + typeName(b), 'compile');
        }
        var dbl = a instanceof D || b instanceof D, x = num(a), y = num(b);
        switch (op) {
          case '+': return dbl ? new D(x + y) : x + y;
          case '-': return dbl ? new D(x - y) : x - y;
          case '*': return dbl ? new D(x * y) : x * y;
          case '/': if (dbl) return new D(x / y); if (y === 0) throw X('div0', isJ ? '/ by zero' : isCS ? 'Attempted to divide by zero.' : 'integer division by zero (in real C/C++ this crashes the program)'); return Math.trunc(x / y);
          case '%': if (dbl) { if (isC && !isCpp) throw RT('invalid operands to % — use fmod() for decimals', 'compile'); return new D(x % y); } if (y === 0) throw X('div0', isJ ? '/ by zero' : isCS ? 'Attempted to divide by zero.' : 'modulo by zero'); return x % y;
          case '<<': return x << y; case '>>': return x >> y; case '>>>': return x >>> y;
          case '&': return x & y; case '|': return x | y; case '^': return x ^ y;
        }
        throw RT('unknown operator ' + op);
      }

      /* ---------- classes & enums ---------- */
      var enumCache = {};
      function enumVals(n) { if (!enumCache[n]) enumCache[n] = enums[n].vals.map(function (x) { return new EnumV(n, x.n, x.v); }); return enumCache[n]; }
      function enumConst(name) { for (var en in enums) { var vs = enums[en].vals; for (var i = 0; i < vs.length; i++) if (vs[i].n === name) return isC ? vs[i].v : enumVals(en)[i]; } return undefined; }
      function findMethod(cls, name, argc, vals) {
        for (var k = cls; k; k = clsOf(k.base)) { var ms = k.methods[name]; if (ms) { var f = pick(ms, argc, vals); if (f) return f; } }
        return null;
      }
      function pick(list, argc, vals) {
        var best = null, bs = -1;
        list.forEach(function (f) {
          var ps = f.params, need = ps.filter(function (q) { return !q.def && !q.va; }).length, va = ps.length && ps[ps.length - 1].va;
          if (argc < need || (!va && argc > ps.length)) return;
          var sc = 1;
          if (vals) ps.forEach(function (q, i) { if (i >= vals.length || q.va) return; var v = vals[i], t = q.type; if (!t) return; var n = t.n; if (v instanceof Ref) v = v.get();
            if (INTS[n] && typeof v === 'number') sc += 3; else if (DBLS[n] && v instanceof D) sc += 3; else if (DBLS[n] && typeof v === 'number') sc += 1; else if ((n === 'String' || n === 'string') && typeof v === 'string') sc += 3; else if (n === 'char' && v instanceof Ch) sc += 3; else if ((n === 'boolean' || n === 'bool') && typeof v === 'boolean') sc += 3; else if (t.dims && v instanceof Arr) sc += 2; else if (v instanceof Obj && instOf(v.cls, n)) sc += 3; else if (INTS[n] && v instanceof Ch) sc += 1; else if (INTS[n] && v instanceof D) sc -= 2; else sc += 0; });
          if (sc > bs) { bs = sc; best = f; }
        });
        return best;
      }
      function initStatics() {
        Object.keys(classes).forEach(function (cn) {
          var k = classes[cn]; k.sf = Object.create(null);
          var ce = new Env(G, null, k);
          k.fields.forEach(function (f) { if (!f.isStatic) return; k.sf[f.n] = { v: defaultFor(f.type), t: f.type }; });
          k.fields.forEach(function (f) { if (!f.isStatic) return; curLine = f.l; k.sf[f.n].v = fieldInit(f, ce); });
          (k.statics || []).forEach(function (b) { exec(b, ce); });
        });
      }
      function fieldInit(f, env) {
        var t = f.type;
        if (f.dims && f.dims.length) { var tt = { n: t.n, g: t.g, dims: f.dims.length }; return f.init ? initList(tt, f.init, env) : makeArr(t, f.dims.map(function (e) { return e ? num(ev(e, env)) : null; })); }
        if (f.init) return f.init.k === 'arr' ? initList(t, f.init, env) : coerce(t, ev(typedNew(f.init, t), env));
        if (f.ctor) return construct(t, evArgs(f.ctor, env), null);
        return defaultFor(t);
      }
      function instantiate(cls, vals, nodes, env) {
        if (cls.kind === 'interface') throw RT(cls.n + ' is an interface — it cannot be created with new', 'compile');
        var o = new Obj(cls), chain = [];
        for (var k = cls; k; k = clsOf(k.base)) chain.unshift(k);
        chain.forEach(function (k) { k.fields.forEach(function (f) { if (!f.isStatic) o.f[f.n] = { v: defaultFor(f.type), t: f.type }; }); });
        runCtor(cls, o, vals, nodes, env);
        return o;
      }
      function runCtor(cls, o, vals, nodes, cenv) {
        var ctor = cls.ctors.length ? pick(cls.ctors, vals.length, vals) : null;
        if (cls.ctors.length && !ctor) throw RT('no constructor of ' + cls.n + ' takes ' + vals.length + ' argument(s)', 'compile');
        var fe = new Env(G, o, cls), base = clsOf(cls.base);
        if (ctor) bindParams(ctor, fe, vals, nodes, cenv);
        else if (vals.length) {
          var fl = cls.fields.filter(function (f) { return !f.isStatic; });
          if (!(isC || isCS)) throw RT(cls.n + ' has no constructor that takes ' + vals.length + ' argument(s)', 'compile');
          fl.forEach(function (f, i) { if (i < vals.length) o.f[f.n].v = coerce(f.type, vals[i]); });
          return;
        }
        var stmts = ctor && ctor.body ? ctor.body.b : [], first = stmts[0];
        var explicit = !!(first && first.k === 'expr' && first.e.k === 'call' && (first.e.f.k === 'super' || first.e.f.k === 'this'));
        var viaThis = explicit && first.e.f.k === 'this';
        var inits = (ctor && ctor.inits) || [];
        var bi = inits.filter(function (i) { return i.n === cls.base || i.n === 'base' || i.n === 'super'; })[0], ti = inits.filter(function (i) { return i.n === 'this'; })[0];
        if (++depth > MAXDEPTH) { depth--; throw X('so', 'constructors called each other too deeply'); }
        try {
          if (ti) runCtor(cls, o, evArgs(ti.a, fe), ti.a, fe);
          else if (explicit) exec(first, fe);
          else if (base) runCtor(base, o, bi ? evArgs(bi.a, fe) : [], bi ? bi.a : null, fe);
          else if (bi && cls.base) { var bv = evArgs(bi.a, fe); if (bv.length) o.f.__msg = { v: bv[0], t: null }; }
          if (!viaThis && !ti) {
            cls.fields.forEach(function (f) { if (!f.isStatic && (f.init || f.ctor || (f.dims && f.dims.length))) { curLine = f.l; o.f[f.n].v = fieldInit(f, fe); } });
            inits.forEach(function (it) {
              if (it.n === cls.base || it.n === 'base' || it.n === 'this' || it.n === 'super') return;
              var cell = o.f[it.n]; if (!cell) throw RT(cls.n + ' has no field named ' + it.n, 'compile');
              var av = evArgs(it.a, fe); cell.v = av.length === 1 && !(cell.t && classes[cell.t.n] && !(av[0] instanceof Obj)) ? coerce(cell.t, av[0]) : construct(cell.t, av, it.a);
            });
          }
          execBlock(explicit ? stmts.slice(1) : stmts, fe);
        } finally { depth--; }
      }
      function bindParams(fn, fe, vals, nodes, cenv) {
        var ps = fn.params;
        for (var i = 0; i < ps.length; i++) {
          var q = ps[i], v;
          if (q.va) {
            var rest = vals.slice(i);
            v = rest.length === 1 && rest[0] instanceof Arr ? rest[0] : new Arr(rest.map(function (x) { return coerce({ n: q.type.n, g: q.type.g, dims: 0 }, x); }), { n: q.type.n, dims: 0 });
            fe.v[q.n] = { v: v, t: { n: q.type.n, g: q.type.g, dims: 1 } }; return;
          }
          if (i < vals.length) v = vals[i]; else if (q.def) v = ev(q.def, fe); else throw RT(fn.n + '() needs ' + ps.length + ' argument(s), but got ' + vals.length, 'compile');
          if (q.ref) { var r = v instanceof Ref ? v : (nodes && nodes[i] && cenv ? refOf(nodes[i], cenv) : null); if (r) { fe.v[q.n] = refCell(r, q.type); continue; } }
          if (v instanceof Ref) v = v.get();
          fe.v[q.n] = { v: coerce(q.type, v, false, true), t: q.type };
        }
        if (vals.length > ps.length) throw RT(fn.n + '() takes ' + ps.length + ' argument(s), but got ' + vals.length, 'compile');
      }
      function callUser(fn, self, vals, nodes, cenv) {
        if (!fn.body) throw RT(fn.n + '() has no body (it is abstract or only declared)', 'compile');
        if (++depth > MAXDEPTH) { throw X('so', 'the recursion went ' + MAXDEPTH + ' calls deep — is a base case missing?'); }
        var fe = new Env(G, self || null, fn.cls ? clsOf(fn.cls) : null), sig, saved = curLine;
        try { bindParams(fn, fe, vals, nodes, cenv); sig = execBlock(fn.body.b, fe); }
        catch (e) { if (e instanceof RangeError) throw X('so', 'the recursion went too deep for the teaching interpreter'); throw e; }
        finally { depth--; }
        curLine = saved;
        var rv = sig && sig.s === 'ret' ? sig.v : undefined;
        if (fn.ret && fn.ret.n !== 'void' && !fn.ctor) {
          if (rv === undefined) { if (fn.n === 'main' && isC) return 0; throw RT((isJ ? 'missing return statement in ' : 'not all code paths return a value in ') + fn.n + '()', 'compile'); }
          rv = coerce(fn.ret, rv, false);
        }
        return rv;
      }
      function callFn(f, vals) {
        if (f instanceof Fn) {
          if (f.native) return f.native(vals.map(function (x) { return x instanceof Ref ? x.get() : x; }));
          if (f.user) { var uf = pick(f.user, vals.length, vals); if (!uf) throw RT('wrong number of arguments'); return callUser(uf, null, vals, null, G); }
          if (f.cmpName) { var c0 = cmp(vals[0], vals[1]); return f.cmpName === 'greater' ? c0 > 0 : c0 < 0; }
          var fe = new Env(f.env);
          f.ps.forEach(function (p, i) { fe.v[p] = { v: vals[i] instanceof Ref ? vals[i].get() : vals[i], t: null }; });
          if (++depth > MAXDEPTH) throw X('so', 'lambdas called each other too deeply');
          try {
            if (f.body && f.body.k === 'block') { var s = execBlock(f.body.b, fe); return s && s.s === 'ret' ? s.v : undefined; }
            return ev(f.body, fe);
          } finally { depth--; }
        }
        throw RT('this value is not a function');
      }

      /* ---------- arrays & initialisers ---------- */
      function makeArr(et, sizes) {
        var n = sizes[0];
        if (n == null) return null;
        n = num(n); if (n < 0) throw X('neg', String(n));
        var sub = sizes.slice(1), elT = { n: et.n, g: et.g, dims: sub.length }, a = new Array(n);
        for (var i = 0; i < n; i++) a[i] = sub.length ? makeArr(et, sub) : (isC ? (et.n === 'char' ? new Ch(0) : defaultFor({ n: et.n, g: et.g })) : defaultFor({ n: et.n, g: et.g }));
        var r = new Arr(a, elT); r.fixed = true; return r;
      }
      function initList(t, node, env, sizes) {
        if (!t) return new Arr(node.items.map(function (x) { return ev(x, env); }), null);
        var n = t.n;
        if (t.dims) {
          var et = elemT(t), items = node.items.map(function (x) { return x.k === 'arr' ? initList(et, x, env) : coerce(et, ev(x, env)); });
          if (sizes && sizes[0] != null) { var len = num(sizes[0]); while (items.length < len) items.push(et.dims ? makeArr(et, sizes.slice(1)) : defaultFor(et)); }
          var ar = new Arr(items, et); ar.fixed = true; return ar;
        }
        if (isListT(n) || isSetT(n)) return construct(t, [], null, node.items.map(function (x) { return x.k === 'arr' ? initList(elemT(t), x, env) : coerce(elemT(t), ev(x, env)); }));
        if (isMapT(n)) { var m = construct(t, [], null); node.items.forEach(function (x) { if (x.k === 'kv') mset(m, ev(x.key, env), ev(x.v, env)); else if (x.k === 'arr') mset(m, coerce(m.kt, ev(x.items[0], env)), x.items[1].k === 'arr' ? initList(m.vt, x.items[1], env) : coerce(m.vt, ev(x.items[1], env))); }); return m; }
        if (n === 'pair') return new Pair(ev(node.items[0], env), ev(node.items[1], env));
        if (classes[n]) { var vs = node.items.map(function (x) { return ev(x, env); }); return instantiate(classes[n], vs, node.items, env); }
        if (n === 'string' && isCpp) return node.items.length ? str(ev(node.items[0], env)) : '';
        return node.items.length ? coerce(t, ev(node.items[0], env)) : defaultFor(t);
      }
      function construct(t, vals, nodes, items) {
        var n = t.n, g = t.g || [];
        if (classes[n]) return instantiate(classes[n], vals, nodes, G);
        if (isListT(n)) {
          var kind = /^(Stack|stack)$/.test(n) ? 'stack' : /^(queue)$/.test(n) || (n === 'Queue' && isCS) ? 'queue' : /^(Deque|ArrayDeque|deque)$/.test(n) ? 'deque' : n === 'LinkedList' ? 'linked' : n === 'PriorityQueue' ? 'pq' : n === 'priority_queue' ? (g[2] && g[2].n === 'greater' ? 'pq' : 'pqmax') : 'list';
          var et = g[0] || null, a = items ? items.slice() : [], cmpf = null;
          if (vals.length) {
            var v0 = vals[0];
            if (v0 instanceof Lst || v0 instanceof Arr) a = v0.a.slice(); else if (v0 instanceof St || v0 instanceof Mp) a = entries(v0).map(function (e) { return e.k; });
            else if (v0 instanceof Fn) cmpf = v0;
            else if (isNumV(v0) && isCpp) { var cnt = num(v0), fill = vals.length > 1 ? coerce(et, vals[1]) : defaultFor(et); for (var i = 0; i < cnt; i++) a.push(copyVal(fill)); }
            if (vals[1] instanceof Fn) cmpf = vals[1];
          }
          var L = new Lst(a.map(function (x) { return coerce(et, x); }), kind, et, cmpf);
          if (kind === 'pq' || kind === 'pqmax') { var arr = L.a; L.a = []; arr.forEach(function (x) { pqPush(L, x); }); }
          return L;
        }
        if (isMapT(n)) { var m = new Mp(mapKind(n), g[0] || null, g[1] || null); if (vals[0] instanceof Mp) vals[0].m.forEach(function (e) { mset(m, e.k, e.v); }); return m; }
        if (isSetT(n)) { var s = new St(mapKind(n), g[0] || null); var src0 = items || (vals[0] instanceof Lst || vals[0] instanceof Arr ? vals[0].a : vals[0] instanceof St ? entries(vals[0]).map(function (e) { return e.k; }) : []); src0.forEach(function (x) { sadd(s, coerce(g[0] || null, x)); }); return s; }
        if (n === 'pair' || n === 'KeyValuePair') return new Pair(vals[0] === undefined ? defaultFor(g[0]) : coerce(g[0], vals[0]), vals[1] === undefined ? defaultFor(g[1]) : coerce(g[1], vals[1]), isCS ? 'kv' : 'pair');
        if (n === 'greater' || n === 'less') { var cf = new Fn([], null, null); cf.cmpName = n; return cf; }
        var r = L2.construct(n, t, vals);
        if (r !== NOPE) return r;
        if (/(Exception|Error|exception|_error)$/.test(n) || n === 'Throwable') return new Exc(n, vals.length ? str(vals[0]) : (isJ ? null : 'Exception of type \'System.' + n + '\' was thrown.'));
        if (INTS[n] || DBLS[n] || n === 'string' || n === 'String' || n === 'char') return vals.length ? coerce(t, vals[0]) : defaultFor(t);
        throw RT('unknown type ' + n + (isJ ? ' — did you forget an import, or is it outside the teaching subset?' : ''), 'compile');
      }
      function pqPush(L, x) {
        var a = L.a, c = function (p, q) { var r = L.cmpf ? num(callFn(L.cmpf, [p, q])) : cmp(p, q); return L.kind === 'pqmax' ? -r : r; };
        if (L.cmp && L.kind !== 'pqmax') c = function (p, q) { var r = callFn(L.cmp, [p, q]); return typeof r === 'boolean' ? (r ? (isCpp ? 1 : -1) : (isCpp ? -1 : 1)) : num(r); };
        var lo = 0, hi = a.length; while (lo < hi) { var mid = (lo + hi) >> 1; if (c(a[mid], x) <= 0) lo = mid + 1; else hi = mid; }
        a.splice(lo, 0, x);
      }

      /* ---------- statements ---------- */
      function exec(s, env) {
        if (++steps > MAXSTEPS) throw RT('Step limit reached (' + MAXSTEPS.toLocaleString() + ' steps) — is there an infinite loop?', 'fatal');
        if ((steps & 4095) === 0 && Date.now() - t0 > 8000) throw RT('Time limit — the program ran for more than 8 seconds (an infinite loop, or waiting for input?)', 'fatal');
        if (s.l) curLine = s.l;
        var r, i;
        switch (s.k) {
          case 'block': return execBlock(s.b, new Env(env));
          case 'decl': execDecl(s, env); return null;
          case 'bind': var bv = ev(s.e, env), parts = bv instanceof Pair ? [bv.a, bv.b] : bv instanceof Arr || bv instanceof Lst ? bv.a : []; s.names.forEach(function (nm, k) { declare(env, nm, { v: parts[k], t: null }); }); return null;
          case 'expr': ev(s.e, env); return null;
          case 'exprs': s.es.forEach(function (e) { ev(e, env); }); return null;
          case 'if': return truthy(ev(s.c, env)) ? exec(s.t, env) : (s.f ? exec(s.f, env) : null);
          case 'while':
            while (truthy(ev(s.c, env))) { r = exec(s.b, env); if (r) { if (r.s === 'brk' && (!r.label || r.label === s.label)) break; if (r.s === 'cont' && (!r.label || r.label === s.label)) continue; return r; } }
            return null;
          case 'do':
            do { r = exec(s.b, env); if (r) { if (r.s === 'brk' && (!r.label || r.label === s.label)) break; if (!(r.s === 'cont' && (!r.label || r.label === s.label))) return r; } } while (truthy(ev(s.c, env)));
            return null;
          case 'for':
            var fe = new Env(env); if (s.init) exec(s.init, fe);
            while (!s.c || truthy(ev(s.c, fe))) {
              r = exec(s.b, fe);
              if (r) { if (r.s === 'brk' && (!r.label || r.label === s.label)) break; if (!(r.s === 'cont' && (!r.label || r.label === s.label))) return r; }
              for (i = 0; i < s.u.length; i++) ev(s.u[i], fe);
              if (++steps > MAXSTEPS) throw RT('Step limit reached — is there an infinite loop?', 'fatal');
            }
            return null;
          case 'each': return execEach(s, env);
          case 'switch': return execSwitch(s, env);
          case 'break': return new Sig('brk', null, s.label);
          case 'cont': return new Sig('cont', null, s.label);
          case 'ret': return new Sig('ret', s.e ? ev(s.e, env) : undefined);
          case 'throw':
            if (!s.e) { var ce = lookup(env, '__exc'); if (ce) throw ce.v; throw RT('throw; with nothing to re-throw'); }
            var tv = ev(s.e, env); if (tv === null && !isC) throw X('npe', 'cannot throw null');
            throw { vvThrow: tv, line: s.l };
          case 'try': return execTry(s, env);
          case 'empty': return null;
        }
        throw RT('unsupported statement ' + s.k);
      }
      function execBlock(list, env) { for (var i = 0; i < list.length; i++) { var r = exec(list[i], env); if (r) return r; } return null; }
      function execDecl(d, env) {
        d.items.forEach(function (it) {
          curLine = it.l;
          var t = d.type, v, ct = t;
          if (it.dims.length) {
            var sizes = it.dims.map(function (e) { return e ? num(ev(e, env)) : null; });
            if (t.n === 'char' && it.dims.length === 1 && !t.ptr) { v = it.init ? (it.init.k === 'arr' ? it.init.items.map(function (x) { return String.fromCharCode(num(ev(x, env))); }).join('').replace(/\0.*$/, '') : str(ev(it.init, env))) : ''; ct = { n: 'string', cstr: sizes[0] }; }
            else { ct = { n: t.n, g: t.g, dims: it.dims.length + (t.dims || 0) }; v = it.init ? (it.init.k === 'arr' ? initList(ct, it.init, env, sizes) : ev(it.init, env)) : makeArr(t, sizes); }
          } else if (it.init) {
            if (t.ref && isCpp && it.init.k !== 'arr') { declare(env, it.n, refCell(refOf(it.init, env), t)); return; }
            v = it.init.k === 'arr' ? initList(t, it.init, env) : ev(typedNew(it.init, t), env);
            if ((t.n === 'var' || t.n === 'auto') && v instanceof Ref) v = v.get();
            if (t.n === 'char' && t.ptr && typeof v === 'string') ct = { n: 'string' };
            else v = coerce(t, v, false);
          } else if (it.ctor) {
            v = construct(t, evArgs(it.ctor, env), it.ctor);
            if (typeof v === 'string' || isNumV(v)) v = coerce(t, v, false);
          } else {
            v = (isJ || isCS) && !d.mods['static'] ? (classes[t.n] && classes[t.n].kind === 'struct' && isCS ? defaultFor(t) : undefined) : defaultFor(t);
          }
          declare(env, it.n, { v: v, t: ct });
        });
      }
      function iterItems(c) {
        if (c instanceof Ref) c = c.get();
        if (c === null || c === undefined) throw X('npe', 'cannot loop over null');
        if (c instanceof Arr || c instanceof Lst) return c.a.slice();
        if (typeof c === 'string') return c.split('').map(function (x) { return new Ch(x.charCodeAt(0)); });
        if (c instanceof Mp) return entries(c).map(function (e) { var pr = new Pair(e.k, e.v, isJ ? 'entry' : isCS ? 'kv' : 'pair'); pr.ent = e; return pr; });
        if (c instanceof St) return entries(c).map(function (e) { return e.k; });
        if (c instanceof SB) return iterItems(c.s);
        throw RT('cannot loop over ' + typeName(c), 'compile');
      }
      function execEach(s, env) {
        var coll = ev(s.coll, env), items = iterItems(coll), live = (coll instanceof Arr || coll instanceof Lst) && s.type && s.type.ref && isCpp;
        for (var i = 0; i < items.length; i++) {
          var ie = new Env(env);
          if (s.names) { var it = items[i], parts = it instanceof Pair ? [it.a, it.b] : it instanceof Arr || it instanceof Lst ? it.a : [it]; s.names.forEach(function (nm, k) { ie.v[nm] = { v: parts[k], t: null }; }); }
          else if (live) { (function (idx) { ie.v[s.n] = refCell(new Ref(function () { return coll.a[idx]; }, function (x) { coll.a[idx] = x; }), s.type); })(i); }
          else ie.v[s.n] = { v: (s.type && (s.type.n === 'var' || s.type.n === 'auto')) ? items[i] : coerce(s.type, items[i], false), t: s.type };
          var r = exec(s.b, ie);
          if (r) { if (r.s === 'brk' && (!r.label || r.label === s.label)) break; if (!(r.s === 'cont' && (!r.label || r.label === s.label))) return r; }
        }
        return null;
      }
      function execSwitch(s, env) {
        var sv = ev(s.e, env), start = -1, def = -1;
        for (var i = 0; i < s.cases.length && start < 0; i++) {
          var cs = s.cases[i]; if (!cs.tests) { def = i; continue; }
          for (var j = 0; j < cs.tests.length; j++) { var t = cs.tests[j], tv = (t.k === 'id' && sv instanceof EnumV && !findCell(env, t.n)) ? enumVals(sv.en).filter(function (e) { return e.name === t.n; })[0] : ev(t, env); if (equals(sv, tv)) { start = i; break; } }
        }
        if (start < 0) start = def; if (start < 0) return null;
        var se = new Env(env);
        for (var k = start; k < s.cases.length; k++) {
          var r = execBlock(s.cases[k].body, se);
          if (r) { if (r.s === 'brk' && !r.label) return null; return r; }
          if (s.cases[k].arrow) return null;
          if (isCS && s.cases[k].body.length && k + 1 < s.cases.length) throw RT('Control cannot fall through from one case label to another — add break;', 'compile');
        }
        return null;
      }
      var FATAL = {};
      function toExc(e) {
        if (e && e.vvThrow !== undefined) return e.vvThrow;
        if (e && e.vvRT) { if (e.cls === 'fatal' || e.cls === 'compile' || e.cls === 'exit') return FATAL; return new Exc(e.cls, e.message); }
        if (e instanceof RangeError) return new Exc(EXN.so[isJ ? 0 : isCS ? 1 : 2], 'recursion too deep');
        return FATAL;
      }
      function excName(v) { if (v instanceof Exc) return v.cls; if (v instanceof Obj) return v.cls.n; if (typeof v === 'string') return 'string'; if (typeof v === 'number') return 'int'; if (v instanceof D) return 'double'; if (v instanceof Ch) return 'char'; return 'object'; }
      function catchOK(ty, v) {
        if (!ty || ty.n === '...') return true;
        var tn = ty.n === 'char' && ty.ptr ? 'string' : ty.n;
        var en = excName(v);
        if (isCpp && (en === 'string' || en === 'int' || en === 'double' || en === 'char')) return tn === en || (tn === 'int' && en === 'int');
        return isa(en, tn);
      }
      function execTry(s, env) {
        var res = null, pending = null;
        try { res = exec(s.b, env); }
        catch (e) {
          var xv = toExc(e);
          if (xv === FATAL) throw e;
          var c = null; for (var i = 0; i < s.cs.length; i++) if (catchOK(s.cs[i].type, xv)) { c = s.cs[i]; break; }
          if (!c) pending = e;
          else { try { var ce = new Env(env); ce.v.__exc = { v: e, t: null }; if (c.n) ce.v[c.n] = { v: xv, t: c.type }; res = exec(c.b, ce); } catch (e2) { pending = e2; } }
        }
        if (s.fin) { var fr = exec(s.fin, env); if (fr) return fr; }
        if (pending) throw pending;
        return res;
      }

      /* ---------- expressions ---------- */
      function evArgs(nodes, env) {
        return (nodes || []).map(function (a) {
          if (a.k === 'out') { if (a.decl) { declare(env, a.decl.n, { v: defaultFor(a.decl.type), t: a.decl.type }); return refOf({ k: 'id', n: a.decl.n, l: a.l }, env); } return refOf(a.e, env); }
          if (a.k === 'ref') return refOf(a.e, env);
          return ev(a, env);
        });
      }
      function ev(n, env) {
        switch (n.k) {
          case 'num': return n.d ? new D(n.f ? Math.fround(n.v) : n.v) : n.v;
          case 'str': return n.v;
          case 'chr': return new Ch(n.v);
          case 'bool': return n.v;
          case 'null': return null;
          case 'istr': return n.parts.map(function (p) { if (typeof p === 'string') return p; var v = ev(p.e, env); return L2.csAlign(p.fmt ? L2.csSpec(v, p.fmt) : str(v), p.align); }).join('');
          case 'id': return evId(n, env);
          case 'this': if (!env.self) throw RT('"this" only works inside an instance method or constructor (not in a static method)', 'compile'); return env.self;
          case 'mem': return evMem(n, env);
          case 'idx': return refOf(n, env).get();
          case 'call': curLine = n.l; return evCall(n, env);
          case 'new': curLine = n.l; return evNew(n, env);
          case 'arr': return new Arr(n.items.map(function (x) { return ev(x, env); }), null);
          case 'kv': return new Pair(ev(n.key, env), ev(n.v, env), 'kv');
          case 'un':
            var u = ev(n.e, env);
            if (n.op === '!') return !truthy(u);
            if (!isNumV(u)) throw RT('bad operand type ' + typeName(u) + ' for unary ' + n.op, 'compile');
            if (n.op === '-') return u instanceof D ? new D(-u.v) : -num(u);
            if (n.op === '+') return u instanceof D ? u : num(u);
            return ~num(u);
          case 'pre': case 'post': return incdec(n, env);
          case 'bin':
            var a = ev(n.a, env);
            if (n.op === '<<' && a && a.__ostream) return L2.streamOut(a, ev(n.b, env));
            if (n.op === '>>' && a && a.__istream) return L2.streamIn(a, refOf(n.b, env));
            return bin(n.op, a, ev(n.b, env));
          case 'log':
            if (n.op === '&&') return truthy(ev(n.a, env)) ? truthy(ev(n.b, env)) : false;
            if (n.op === '||') return truthy(ev(n.a, env)) ? true : truthy(ev(n.b, env));
            var y = ev(n.a, env); return y != null ? y : ev(n.b, env);
          case 'cond': return truthy(ev(n.c, env)) ? ev(n.a, env) : ev(n.b, env);
          case 'asg': return assign(n, env);
          case 'cast': return cast(n.type, ev(n.e, env));
          case 'lam': return new Fn(n.ps, n.body, env);
          case 'inst': var iv = ev(n.e, env), ok = isInstance(iv, n.type); if (ok && n.bind) env.v[n.bind] = { v: iv, t: n.type }; return ok;
          case 'sizeof': return n.type ? sizeT(n.type) : sizeV(ev(n.e, env));
          case 'addr': return refOf(n.e, env);
          case 'deref': var dv = ev(n.e, env); if (dv instanceof Iter) return L2.iterGet(dv); if (dv instanceof Ref) return dv.get(); if (dv instanceof Arr) return dv.a[0]; return dv;
          case 'nop': ev(n.e, env); return undefined;
          case 'super': return env.self;
          case 'dflt': return defaultFor(n.type);
          case 'out': case 'ref': return refOf(n.e, env);
          case 'numlim': return L2.numLimit(n.type, n.n);
        }
        throw RT('unsupported expression ' + n.k);
      }
      function evId(n, env) {
        var c = findCell(env, n.n);
        if (c) { var v = c.v; if (v === undefined) throw RT((isJ ? 'variable ' + n.n + ' might not have been initialized' : isCS ? "Use of unassigned local variable '" + n.n + "'" : n.n + ' has no value'), 'compile'); return v; }
        var ec = enumConst(n.n); if (ec !== undefined) return ec;
        if (classes[n.n] || enums[n.n]) return { __cls: n.n };
        if (fns[n.n]) return new Fn(null, null, null, fns[n.n]);
        if (env.cls) { var m = findMethod(env.cls, n.n, -1) || (function () { for (var k = env.cls; k; k = clsOf(k.base)) if (k.methods[n.n]) return k.methods[n.n][0]; return null; })(); if (m) return new Fn(null, null, null, [m]); }
        var gv = L2.globalValue(n.n); if (gv !== NOPE) return gv;
        throw RT(isJ ? 'cannot find symbol: variable ' + n.n : isCS ? "The name '" + n.n + "' does not exist in the current context" : "'" + n.n + "' was not declared in this scope", 'compile');
      }
      function isVarName(env, n) { return !!findCell(env, n); }
      function staticOf(n, env) {
        var o = n.o;
        if (o.k === 'id' && !isVarName(env, o.n)) {
          if (o.n === 'std') return evId({ k: 'id', n: n.n, l: n.l }, env);
          if (enums[o.n]) { var e = enumVals(o.n).filter(function (x) { return x.name === n.n; })[0]; if (e) return isC ? e.ord : e; if (n.n === 'length') return enumVals(o.n).length; throw RT(o.n + ' has no value ' + n.n, 'compile'); }
          var k0 = classes[o.n];
          if (k0) { for (var k = k0; k; k = clsOf(k.base)) { if (k.sf && k.sf[n.n]) return k.sf[n.n].v; } throw RT(o.n + ' has no static field ' + n.n, 'compile'); }
          var sv = L2.staticField(o.n + '.' + n.n); if (sv !== NOPE) return sv;
          var sfn = L2.staticFn(o.n + '.' + n.n); if (sfn !== NOPE) return sfn;
        }
        if (o.k === 'mem' && o.o.k === 'id' && !isVarName(env, o.o.n)) { var q3 = o.o.n + '.' + o.n + '.' + n.n, sv2 = L2.staticField(q3); if (sv2 !== NOPE) return sv2; var sfn2 = L2.staticFn(q3); if (sfn2 !== NOPE) return sfn2; }
        return NOPE;
      }
      function evMem(n, env) {
        var s = staticOf(n, env); if (s !== NOPE) return s;
        if (n.o.k === 'super') { var sc = env.self && env.self.f[n.n]; if (sc) return sc.v; }
        var ov = ev(n.o, env);
        if (ov instanceof Ref) ov = ov.get();
        if (ov instanceof Obj) {
          var cell = ov.f[n.n]; if (cell) return cell.v;
          for (var k = ov.cls; k; k = clsOf(k.base)) if (k.props && k.props[n.n]) return ev(k.props[n.n], new Env(G, ov, k));
          for (var k2 = ov.cls; k2; k2 = clsOf(k2.base)) if (k2.sf && k2.sf[n.n]) return k2.sf[n.n].v;
          if (n.n === 'Message' && ov.f.__msg) return ov.f.__msg.v;
          throw RT(ov.cls.n + ' has no field or property named ' + n.n, 'compile');
        }
        if (ov && ov.__cls) { var r = staticOf({ o: { k: 'id', n: ov.__cls }, n: n.n }, env); if (r !== NOPE) return r; }
        var fv = L2.field(ov, n.n);
        if (fv !== NOPE) return fv;
        if (ov === null || ov === undefined) throw X('npe', 'cannot read field "' + n.n + '" because the value is null');
        throw RT(typeName(ov) + ' has no field ' + n.n + (isJ && n.n === 'length' && typeof ov === 'string' ? ' — for Strings use s.length()' : isJ && n.n === 'size' ? ' — use .size()' : ''), 'compile');
      }
      function refOf(n, env) {
        switch (n.k) {
          case 'id':
            var c = findCell(env, n.n);
            if (!c) { evId(n, env); throw RT('cannot assign to ' + n.n, 'compile'); }
            return new Ref(function () { return c.v; }, function (v) { c.v = v; }, c.t);
          case 'mem':
            if (n.o.k === 'id' && !isVarName(env, n.o.n) && classes[n.o.n]) { for (var k = classes[n.o.n]; k; k = clsOf(k.base)) if (k.sf && k.sf[n.n]) { var sc = k.sf[n.n]; return new Ref(function () { return sc.v; }, function (v) { sc.v = v; }, sc.t); } }
            var o = n.o.k === 'super' ? env.self : ev(n.o, env);
            if (o instanceof Ref) o = o.get();
            if (o instanceof Obj) { var fc = o.f[n.n]; if (!fc) { for (var k3 = o.cls; k3; k3 = clsOf(k3.base)) if (k3.sf && k3.sf[n.n]) { fc = k3.sf[n.n]; break; } } if (!fc) throw RT(o.cls.n + ' has no field ' + n.n, 'compile'); return new Ref(function () { return fc.v; }, function (v) { fc.v = v; }, fc.t); }
            if (o instanceof Pair) { var isA = /^(first|Key|key)$/.test(n.n); return new Ref(function () { return isA ? o.a : o.b; }, function (v) { if (isA) o.a = v; else { o.b = v; if (o.ent) o.ent.v = v; } }, null); }
            var lr = L2.fieldRef(o, n.n); if (lr) return lr;
            if (o === null || o === undefined) throw X('npe', 'cannot use field "' + n.n + '" of null');
            return new Ref(function () { return evMem(n, env); }, function () { throw RT('cannot assign to ' + n.n, 'compile'); }, null);
          case 'idx':
            var co = ev(n.o, env), iv = ev(n.i, env);
            if (co instanceof Ref) co = co.get();
            if (co instanceof Arr) {
              if (!isNumV(iv)) throw RT('array index must be a whole number', 'compile');
              var ix = num(iv); if (iv instanceof D && (isJ || isCS)) throw RT('array index must be an int, not a double', 'compile');
              if (ix < 0 || ix >= co.a.length || ix !== Math.floor(ix)) throw X('idx', isJ ? 'Index ' + ix + ' out of bounds for length ' + co.a.length : isCS ? 'Index was outside the bounds of the array.' : 'index ' + ix + ' is outside the array (size ' + co.a.length + ') — real C/C++ would silently read garbage or crash');
              return new Ref(function () { return co.a[ix]; }, function (v) { co.a[ix] = v; }, co.et);
            }
            if (co instanceof Lst) {
              if (isJ) throw RT('array required, but ' + (co.kind === 'list' ? 'ArrayList' : 'collection') + ' found — use list.get(i) / list.set(i, x)', 'compile');
              var li = num(iv);
              if (li < 0 || li >= co.a.length) throw X('lidx', isCS ? 'Index was out of range. Must be non-negative and less than the size of the collection.' : 'vector index ' + li + ' is out of range (size ' + co.a.length + ')');
              return new Ref(function () { return co.a[li]; }, function (v) { co.a[li] = v; }, co.et);
            }
            if (co instanceof Mp) {
              if (isJ) throw RT('array required, but Map found — use map.get(k) / map.put(k, v)', 'compile');
              var kk = coerce(co.kt, iv, true);
              return new Ref(function () { var e = mget(co, kk); if (e) return e.v; if (isCS) throw X('key', "The given key '" + str(kk) + "' was not present in the dictionary."); var d = defaultFor(co.vt); mset(co, kk, d); return d; }, function (v) { mset(co, kk, v); }, co.vt);
            }
            if (typeof co === 'string' || co instanceof SB) {
              if (isJ) throw RT('array required, but String found — use s.charAt(i)', 'compile');
              var s = co instanceof SB ? co.s : co, si = num(iv);
              if (si < 0 || si >= s.length + (isCpp ? 1 : 0)) throw X('sidx', isCS ? 'Index was outside the bounds of the array.' : 'string index ' + si + ' is out of range (length ' + s.length + ')');
              var cref = co instanceof SB ? null : refOf(n.o, env);
              return new Ref(function () { return si === s.length ? new Ch(0) : new Ch(s.charCodeAt(si)); }, function (v) {
                var ch = v instanceof Ch ? String.fromCharCode(v.c) : typeof v === 'number' ? String.fromCharCode(v) : str(v).charAt(0);
                if (co instanceof SB) { co.s = co.s.slice(0, si) + ch + co.s.slice(si + 1); return; }
                if (isCS) throw RT('strings cannot be changed in place — use a char[] or StringBuilder', 'compile');
                var cur = cref.get(); cref.set(cur.slice(0, si) + ch + cur.slice(si + 1));
              }, { n: 'char' });
            }
            if (co === null || co === undefined) throw X('npe', 'cannot index into null');
            throw RT('cannot use [ ] on ' + typeName(co), 'compile');
          case 'deref':
            var dv = ev(n.e, env); if (dv instanceof Ref) return dv; if (dv instanceof Iter) return new Ref(function () { return L2.iterGet(dv); }, function (v) { L2.iterSet(dv, v); }, null);
            if (dv instanceof Arr) return new Ref(function () { return dv.a[0]; }, function (v) { dv.a[0] = v; }, dv.et);
            throw RT('cannot dereference this value');
          case 'this': return new Ref(function () { return env.self; }, function () { throw RT('cannot assign to this'); }, null);
        }
        var val = ev(n, env);
        return new Ref(function () { return val; }, function () { throw RT('the left side of = must be a variable', 'compile'); }, null);
      }
      function assign(n, env) {
        var r = refOf(n.t, env), v;
        if (n.op === '=') {
          v = n.v.k === 'arr' && r.t ? initList(r.t, n.v, env) : ev(r.t ? typedNew(n.v, r.t) : n.v, env);
          if (v instanceof Ref) v = v.get();
          r.set(coerce(r.t, v, false)); return r.get();
        }
        var cur = r.get(), rhs = ev(n.v, env), op = n.op.slice(0, -1);
        if (cur === undefined) throw RT('variable used before it has a value', 'compile');
        r.set(coerce(r.t, bin(op, cur, rhs), true)); return r.get();
      }
      function incdec(n, env) {
        var r = refOf(n.e, env), old = r.get(), d = n.op === '++' ? 1 : -1, nv;
        if (old instanceof Ch) nv = new Ch(old.c + d); else if (old instanceof D) nv = new D(old.v + d); else if (typeof old === 'number') nv = old + d;
        else if (old instanceof Iter) nv = new Iter(old.c, old.i + d);
        else throw RT('cannot use ' + n.op + ' on ' + typeName(old), 'compile');
        r.set(coerce(r.t, nv, true));
        return n.k === 'pre' ? r.get() : old;
      }
      function cast(t, v) {
        if (v instanceof Ref) v = v.get();
        if (t.dims || t.ptr) return v;
        var n = t.n;
        if (INTS[n] && !/^[A-Z]/.test(n)) { if (typeof v === 'string') throw RT('cannot cast a string to ' + n + (isJ ? ' — use Integer.parseInt(s)' : ' — use int.Parse(s)'), 'compile'); if (v instanceof EnumV) return v.ord; if (typeof v === 'boolean' && !isC) throw RT('cannot cast boolean to ' + n, 'compile'); return coerce(t, v, true); }
        if (DBLS[n] || n === 'char' || n === 'bool') return coerce(t, v, true);
        if (enums[n] && typeof v === 'number') return isC ? v : (enumVals(n).filter(function (e) { return e.ord === v; })[0] || v);
        if (classes[n] && v instanceof Obj && !instOf(v.cls, n)) throw X('cast', 'class ' + v.cls.n + ' cannot be cast to class ' + n);
        if ((n === 'String' || n === 'string') && v !== null && typeof v !== 'string' && !isCpp) throw X('cast', typeName(v) + ' cannot be cast to String');
        if (n === 'Integer' || n === 'Double') return v;
        return v;
      }
      function isInstance(v, t) {
        if (v === null || v === undefined) return false;
        var n = t.n;
        if (v instanceof Obj) return instOf(v.cls, n) || n === 'Object' || n === 'object';
        if (v instanceof Exc) return isa(v.cls, n);
        if (typeof v === 'string') return /^(String|string|Object|object|CharSequence)$/.test(n);
        if (typeof v === 'number') return /^(Integer|int|Number|Object|object|Int32|long|Long)$/.test(n);
        if (v instanceof D) return /^(Double|double|Number|Object|object|float)$/.test(n);
        if (v instanceof Ch) return /^(Character|char|Object|object)$/.test(n);
        if (typeof v === 'boolean') return /^(Boolean|bool|boolean|Object|object)$/.test(n);
        return n === 'Object' || n === 'object';
      }
      function sizeT(t) { if (t.ptr) return 8; var n = t.n, b = INTS[n]; if (b) return Math.abs(b) / 8; if (n === 'double' || n === 'long double') return 8; if (n === 'float') return 4; if (n === 'char' || n === 'bool') return 1; if (classes[n]) return classes[n].fields.filter(function (f) { return !f.isStatic; }).reduce(function (s, f) { return s + sizeT(f.type); }, 0) || 1; return 8; }
      function sizeV(v) { if (v instanceof Arr) return v.a.length * (v.a.length && !(v.a[0] instanceof Arr) ? sizeV(v.a[0]) : v.a.length ? sizeV(v.a[0]) : 4); if (v instanceof D) return 8; if (v instanceof Ch) return 1; if (typeof v === 'number') return 4; if (typeof v === 'boolean') return 1; if (typeof v === 'string') return v.length + 1; return 8; }
      function typedNew(node, t) { return node && node.k === 'new' && !node.type ? { k: 'new', type: t, dims: [], a: node.a, init: node.init, l: node.l } : node; }
      function evNew(n, env) {
        var t = n.type;
        if (!t) throw RT('new() without a type needs a declared type on the left, e.g. List<int> xs = new();', 'compile');
        if (n.dims.length) {
          var sizes = n.dims.map(function (e) { return e ? num(ev(e, env)) : null; });
          if (n.init) return initList(t, n.init, env);
          if (sizes[0] == null) throw RT('array creation needs a size, e.g. new int[5]', 'compile');
          return makeArr({ n: t.n, g: t.g }, sizes);
        }
        var vals = evArgs(n.a, env);
        if (classes[t.n]) { var o = instantiate(classes[t.n], vals, n.a, env); if (n.init) n.init.items.forEach(function (x) { if (x.k === 'asg' && x.t.k === 'id' && o.f[x.t.n]) o.f[x.t.n].v = coerce(o.f[x.t.n].t, ev(x.v, env)); }); return o; }
        var v = construct(t, vals, n.a, n.init && (isListT(t.n) || isSetT(t.n)) ? n.init.items.map(function (x) { return ev(x, env); }) : null);
        if (n.init && isMapT(t.n)) n.init.items.forEach(function (x) { if (x.k === 'kv') mset(v, ev(x.key, env), ev(x.v, env)); else if (x.k === 'arr') mset(v, ev(x.items[0], env), ev(x.items[1], env)); });
        return v;
      }
      function evCall(n, env) {
        var f = n.f;
        if (f.k === 'id') {
          var nm = f.n, cell = findCell(env, nm);
          if (cell && cell.v instanceof Fn) return callFn(cell.v, evArgs(n.a, env));
          var vals = evArgs(n.a, env);
          if (env.cls) {
            var m = findMethod(env.cls, nm, vals.length, vals);
            if (m) { if (!m.isStatic && !env.self && !(isC && !m.isStatic)) throw RT('non-static method ' + nm + '() cannot be called from a static context — make it static', 'compile'); return callUser(m, m.isStatic ? null : env.self, vals, n.a, env); }
          }
          var fl = fns[nm];
          if (fl) { var uf = pick(fl, vals.length, vals); if (!uf) throw RT(nm + '() is called with the wrong number of arguments (' + vals.length + ')', 'compile'); return callUser(uf, null, vals, n.a, env); }
          var g = L2.callGlobal(nm, vals, n.a, env); if (g !== NOPE) return g;
          if (classes[nm] && isCpp) return instantiate(classes[nm], vals, n.a, env);
          throw RT(isJ ? 'cannot find symbol: method ' + nm + '()' : isCS ? "The name '" + nm + "' does not exist in the current context" : "'" + nm + "' was not declared in this scope", 'compile');
        }
        if (f.k === 'super' || f.k === 'this') {
          var cls = env.cls, target = f.k === 'super' ? clsOf(cls && cls.base) : cls, sv = evArgs(n.a, env);
          if (target) { runCtor(target, env.self, sv, n.a, env); return undefined; }
          if (f.k === 'super' && env.self && sv.length) env.self.f.__msg = { v: sv[0], t: null };
          return undefined;
        }
        if (f.k === 'mem') {
          var o = f.o, args;
          if (o.k === 'super') { var bm = findMethod(clsOf(env.cls && env.cls.base), f.n, n.a.length); args = evArgs(n.a, env); if (bm) return callUser(bm, env.self, args, n.a, env); var r0 = L2.method(env.self, f.n, args, n.a, env); if (r0 !== NOPE) return r0; throw RT('the parent class has no method ' + f.n, 'compile'); }
          var q = qual(o, env);
          if (q) {
            if (q === 'std') return evCall({ k: 'call', f: { k: 'id', n: f.n, l: f.l }, a: n.a, l: n.l }, env);
            if (classes[q]) { args = evArgs(n.a, env); var sm = findMethod(classes[q], f.n, args.length, args); if (sm) return callUser(sm, sm.isStatic ? null : env.self, args, n.a, env); throw RT(q + ' has no method ' + f.n + '()', 'compile'); }
            if (enums[q]) { if (f.n === 'values' || f.n === 'GetValues') return new Arr(enumVals(q).slice(), { n: q }); if (f.n === 'valueOf' || f.n === 'Parse') { var nmv = str(ev(n.a[n.a.length - 1], env)), ev0 = enumVals(q).filter(function (e) { return e.name === nmv; })[0]; if (!ev0) throw X('arg', 'No enum constant ' + q + '.' + nmv); return ev0; } }
            args = evArgs(n.a, env);
            var r = L2.callStatic(q + '.' + f.n, args, n.a, env);
            if (r !== NOPE) return r;
            if (isVarName(env, q.split('.')[0])) { } else throw RT(isJ ? 'cannot find symbol: ' + q + '.' + f.n + '()' : "'" + q + '.' + f.n + "' is not available in this teaching subset", 'compile');
          }
          var recv = ev(o, env);
          if (recv instanceof Ref) recv = recv.get();
          args = args || evArgs(n.a, env);
          if (recv instanceof Obj) {
            var mm = findMethod(recv.cls, f.n, args.length, args);
            if (mm) return callUser(mm, recv, args, n.a, env);
            if (recv.f[f.n] && recv.f[f.n].v instanceof Fn) return callFn(recv.f[f.n].v, args);
          }
          if (recv && recv.__cls) { var cm = findMethod(classes[recv.__cls] || { methods: {} }, f.n, args.length, args); if (cm) return callUser(cm, null, args, n.a, env); }
          var res = L2.method(recv, f.n, args, n.a, env, o);
          if (res !== NOPE) return res;
          if (recv === null || recv === undefined) throw X('npe', 'cannot call ' + f.n + '() because the value is null');
          throw RT((isJ ? 'cannot find symbol: method ' + f.n + '() on ' : isCS ? "'" + typeName(recv) + "' does not contain a definition for '" + f.n + "' — " : 'no member function ' + f.n + '() on ') + typeName(recv), 'compile');
        }
        var fv = ev(f, env);
        if (fv instanceof Fn) return callFn(fv, evArgs(n.a, env));
        throw RT('this expression cannot be called like a function', 'compile');
      }
      function qual(o, env) {
        if (o.k === 'id') return isVarName(env, o.n) ? null : o.n;
        if (o.k === 'mem') { var h = qual(o.o, env); if (!h) return null; if (h === 'std') return o.n; if (classes[h] || enums[h]) return null; return h + '.' + o.n; }
        return null;
      }

      /* ---------- kit for the builtins library ---------- */
      var K = { lang: lang, isJ: isJ, isCS: isCS, isC: isC, isCpp: isCpp, NOPE: NOPE, D: D, Ch: Ch, Arr: Arr, Lst: Lst, Mp: Mp, St: St, SB: SB, Obj: Obj, Fn: Fn, Pair: Pair, EnumV: EnumV, Exc: Exc, Iter: Iter, Ref: Ref,
        num: num, isNumV: isNumV, str: str, RT: RT, X: X, out: out, errw: errw, flush: flush, stdin: String(stdin || ''), callFn: callFn, coerce: coerce, defaultFor: defaultFor, equals: equals, cmp: cmp, truthy: truthy,
        entries: entries, mget: mget, mset: mset, sadd: sadd, key: key, construct: construct, copyVal: copyVal, pqPush: pqPush, cout: cout, jDouble: jDouble, csDouble: csDouble, gFmt: gFmt, expC: expC, fmtD: fmtD, typeName: typeName,
        refOf: refOf, ev: ev, wrapInt: wrapInt, INTS: INTS, findMethod: findMethod, callUser: callUser, G: G, enumVals: enumVals, classes: classes, isa: isa };
      var L2 = LIBF(K);

      /* ---------- go ---------- */
      function findMain() {
        if (isC) { if (fns.main) return { fn: fns.main[0] }; return null; }
        var names = isCS ? ['Main', 'main'] : ['main'];
        for (var cn in classes) for (var i = 0; i < names.length; i++) { var ms = classes[cn].methods[names[i]]; if (ms) for (var j = 0; j < ms.length; j++) if (ms[j].isStatic || isCS) return { fn: ms[j], cls: classes[cn] }; }
        if (fns.Main) return { fn: fns.Main[0] }; if (fns.main) return { fn: fns.main[0] };
        return null;
      }
      function fmtErr(e) {
        var ln = e.line || curLine, at = ln ? ' (line ' + ln + ')' : '';
        if (e.cls === 'compile') return 'Compile error' + at + ': ' + e.message;
        if (e.cls === 'fatal') return '⏱️ ' + e.message + at;
        if (e.cls === 'error') return 'Error' + at + ': ' + e.message;
        if (isJ) return 'Exception in thread "main" java.' + (/InputMismatch|NoSuchElement/.test(e.cls) ? 'util.' : 'lang.') + e.cls + (e.message ? ': ' + e.message : '') + '\n\tat Main.main(Main.java:' + ln + ')';
        if (isCS) return 'Unhandled exception. System.' + (/KeyNotFound/.test(e.cls) ? 'Collections.Generic.' : '') + e.cls + ': ' + e.message + at;
        return 'Runtime error' + at + ': ' + (e.cls && e.cls !== 'error' && !/ /.test(e.cls) ? e.cls + ' — ' : '') + e.message;
      }
      try {
        Object.keys(enums).forEach(function (en) { if (isC) enums[en].vals.forEach(function (x) { G.v[x.n] = { v: x.v, t: { n: 'int' } }; }); });
        prog.globals.forEach(function (d) { execDecl(d, G); });
        initStatics();
        var mn = findMain();
        if (mn) {
          var a = mn.fn.params.length ? [new Arr([], { n: 'String' })] : [];
          if (isC && mn.fn.params.length) a = [0, new Arr([], { n: 'string' })];
          callUser(mn.fn, null, a, null, G);
        } else if (prog.top.length) {
          var te = new Env(G, null, null), sig = execBlock(prog.top, te);
          if (sig && sig.s === 'brk') throw RT('break outside a loop', 'compile');
        } else throw RT(isJ ? 'No main method found — add public static void main(String[] args) inside your class' : isCS ? 'No Main method found — add static void Main() (or write top-level statements)' : 'No main() function found — add int main() { … }', 'compile');
        flush(); return { ok: true };
      } catch (e) {
        if (e && e.vvExit) { flush(); return { ok: true, exit: e.code }; }
        flush();
        if (e && e.vvThrow !== undefined) {
          var tv = e.vvThrow, en = excName(tv), msg = tv instanceof Exc ? tv.msg : tv instanceof Obj ? (tv.f.__msg ? str(tv.f.__msg.v) : '') : str(tv), ln = e.line || curLine;
          var txt = isJ ? 'Exception in thread "main" ' + (tv instanceof Obj ? en : 'java.lang.' + en) + (msg ? ': ' + msg : '') + '\n\tat Main.main(Main.java:' + ln + ')'
            : isCS ? 'Unhandled exception. ' + (tv instanceof Obj ? en : 'System.' + en) + ': ' + msg + ' (line ' + ln + ')'
            : "terminate called after throwing an instance of '" + (tv instanceof Exc ? 'std::' + en : en) + "'\n  what():  " + msg + ' (line ' + ln + ')';
          return { ok: false, err: txt, line: ln };
        }
        if (e && e.vvRT) return { ok: false, err: fmtErr(e), line: e.line || curLine };
        if (e instanceof RangeError) return { ok: false, err: fmtErr({ cls: EXN.so[isJ ? 0 : isCS ? 1 : 2], message: 'the recursion went too deep', line: curLine }), line: curLine };
        return { ok: false, err: 'Teaching interpreter error' + (curLine ? ' near line ' + curLine : '') + ': ' + (e && e.message || e) + ' — this program may use a feature outside the supported subset.', line: curLine };
      }
    }
    return { run: run };
  };
})();

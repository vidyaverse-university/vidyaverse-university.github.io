/* VidyaVerse v2 — Code Lab teaching interpreter, part 3: builtins for the Java / C# / C / C++ teaching subset —
   console & stdin (System.out, Scanner, BufferedReader, Console, cout/cin, printf/scanf), String/StringBuilder, Math,
   wrapper classes, arrays, ArrayList/List/vector, HashMap/Dictionary/map, sets, stacks, queues, simple LINQ, <algorithm>.
   Serialised into a sandboxed worker, so it must stay self-contained. */
(function () {
  'use strict';
  var C = window.VV2.Code = window.VV2.Code || {};
  C.eduLib = function eduLib(K) {
    var isJ = K.isJ, isCS = K.isCS, isC = K.isC, isCpp = K.isCpp, NOPE = K.NOPE;
    var D = K.D, Ch = K.Ch, Arr = K.Arr, Lst = K.Lst, Mp = K.Mp, St = K.St, SB = K.SB, Obj = K.Obj, Fn = K.Fn, Pair = K.Pair, Exc = K.Exc, Iter = K.Iter, Ref = K.Ref, EnumV = K.EnumV;
    var num = K.num, str = K.str, RT = K.RT, X = K.X, isNumV = K.isNumV;
    function dval(x) { return new D(x); }
    function chs(c) { return c instanceof Ch ? String.fromCharCode(c.c) : typeof c === 'number' ? String.fromCharCode(c) : str(c); }
    function unref(v) { return v instanceof Ref ? v.get() : v; }

    /* ---------- stdin ---------- */
    var IN = { s: K.stdin, i: 0 };
    function atEnd() { return IN.i >= IN.s.length; }
    function skipWS() { while (IN.i < IN.s.length && /\s/.test(IN.s.charAt(IN.i))) IN.i++; }
    function token() { skipWS(); if (atEnd()) return null; var st = IN.i; while (IN.i < IN.s.length && !/\s/.test(IN.s.charAt(IN.i))) IN.i++; return IN.s.slice(st, IN.i); }
    function peekTok() { var sv = IN.i, t = token(); IN.i = sv; return t; }
    function readLine() { if (atEnd()) return null; var j = IN.s.indexOf('\n', IN.i), l; if (j < 0) { l = IN.s.slice(IN.i); IN.i = IN.s.length; } else { l = IN.s.slice(IN.i, j); IN.i = j + 1; } return l.replace(/\r$/, ''); }
    function getc() { return atEnd() ? -1 : IN.s.charCodeAt(IN.i++); }
    function noInput(what) { return X('eof', isJ ? (what === 'line' ? 'No line found' : '') + ' — the program wanted more input. Type it in the stdin box (one value per line).' : 'the program wanted more input — type it in the stdin box'); }
    function pInt(s, kind) {
      if (s == null) throw noInput();
      var t = isCS ? String(s).trim() : String(s);
      if (!/^[+-]?\d+$/.test(t)) throw X(kind || 'fmt', isJ ? 'For input string: "' + s + '"' : isCS ? "The input string '" + s + "' was not in a correct format." : 'stoi: no conversion for "' + s + '"');
      return parseInt(t, 10);
    }
    function pDbl(s, kind) {
      if (s == null) throw noInput();
      var t = String(s).trim();
      if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?[dDfF]?$/.test(t) && !/^[+-]?(Infinity|NaN)$/.test(t)) throw X(kind || 'fmt', isJ ? 'For input string: "' + s + '"' : isCS ? "The input string '" + s + "' was not in a correct format." : 'stod: no conversion');
      return parseFloat(t);
    }

    /* ---------- number formatting ---------- */
    function group(s) { var neg = s.charAt(0) === '-', b = neg ? s.slice(1) : s, p = b.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (neg ? '-' : '') + p.join('.'); }
    function halfUp(x, P) {
      var s = String(Math.abs(x)); if (/e/i.test(s) || P > 15) return x.toFixed(P);
      var parts = s.split('.'), ip = parts[0], fp = parts[1] || '';
      if (fp.length <= P) { while (fp.length < P) fp += '0'; return (x < 0 && (+ip || /[1-9]/.test(fp)) ? '-' : '') + ip + (P ? '.' + fp : ''); }
      var digs = (ip + fp.slice(0, P)).split('').map(Number);
      if (+fp.charAt(P) >= 5) { var k = digs.length - 1; while (k >= 0) { if (digs[k] === 9) { digs[k] = 0; k--; } else { digs[k]++; break; } } if (k < 0) digs.unshift(1); }
      var all = digs.join(''), il = all.length - P, res = all.slice(0, il) + (P ? '.' + all.slice(il) : '');
      return (x < 0 && /[1-9]/.test(res) ? '-' : '') + res;
    }
    function fixed(x, P) { if (!isFinite(x)) return isNaN(x) ? (isJ ? 'NaN' : 'nan') : (x > 0 ? (isJ ? 'Infinity' : 'inf') : (isJ ? '-Infinity' : '-inf')); return isJ ? halfUp(x, P) : x.toFixed(P); }
    function pad(s, w, left, zero) {
      if (!w || s.length >= w) return s;
      if (left) return s + new Array(w - s.length + 1).join(' ');
      if (zero) { var sign = /^[+\- ]/.test(s) ? s.charAt(0) : ''; var body = sign ? s.slice(1) : s; return sign + new Array(w - s.length + 1).join('0') + body; }
      return new Array(w - s.length + 1).join(' ') + s;
    }
    function printf(fmt, args) {
      var ai = 0;
      return String(fmt).replace(/%([-+ 0#,(]*)(\*|\d+)?(?:\.(\*|\d+))?(hh|h|ll|l|L|z|j|t|q)?([diouxXeEfFgGcsbBnpaA%])/g, function (m, fl, w, pr, len, cv) {
        if (cv === '%') return '%';
        if (cv === 'n') return isJ ? '\n' : '';
        if (w === '*') w = num(unref(args[ai++])); if (pr === '*') pr = num(unref(args[ai++]));
        if (ai >= args.length) throw RT(isJ ? 'MissingFormatArgumentException: Format specifier \'' + m + '\' has no matching value' : 'printf: not enough values for ' + m, isJ ? 'IllegalFormatException' : 'error');
        var a = unref(args[ai++]), s;
        switch (cv) {
          case 'd': case 'i': case 'u':
            if (isJ && (a instanceof D || typeof a === 'string')) throw RT('IllegalFormatConversionException: %d needs a whole number but got ' + K.typeName(a) + (a instanceof D ? ' — use %f or %.2f for decimals' : ''), 'IllegalFormatException');
            var iv = Math.trunc(num(a)); if (cv === 'u' && iv < 0) iv = iv >>> 0; s = String(Math.abs(iv)); if (fl.indexOf(',') >= 0) s = group(s);
            s = (iv < 0 ? '-' : fl.indexOf('+') >= 0 ? '+' : fl.indexOf(' ') >= 0 ? ' ' : '') + s; break;
          case 'f': case 'F':
            if (isJ && !(a instanceof D) && !(typeof a === 'number' && false)) { if (typeof a === 'number') throw RT('IllegalFormatConversionException: %f needs a decimal (double) but got an int — use %d, or write 5.0', 'IllegalFormatException'); }
            var fv = num(a), P = pr == null ? 6 : +pr; s = fixed(fv, P); if (fl.indexOf(',') >= 0) s = group(s); if (fv >= 0 && fl.indexOf('+') >= 0) s = '+' + s; break;
          case 'e': case 'E': s = K.expC(num(a), pr == null ? 6 : +pr); if (cv === 'E') s = s.toUpperCase(); break;
          case 'g': case 'G': s = K.gFmt(num(a), pr == null ? 6 : +pr, ''); if (cv === 'G') s = s.toUpperCase(); break;
          case 'x': case 'X': s = (num(a) >>> 0).toString(16); if (cv === 'X') s = s.toUpperCase(); if (fl.indexOf('#') >= 0) s = '0x' + s; break;
          case 'o': s = (num(a) >>> 0).toString(8); break;
          case 'c': s = a instanceof Ch ? String.fromCharCode(a.c) : typeof a === 'number' ? String.fromCharCode(a) : str(a).charAt(0); break;
          case 's': case 'S': s = a instanceof Arr && a.et && a.et.n === 'char' ? a.a.map(chs).join('') : str(a); if (pr != null) s = s.slice(0, +pr); if (cv === 'S') s = s.toUpperCase(); break;
          case 'b': case 'B': s = a === null ? 'false' : typeof a === 'boolean' ? String(a) : 'true'; break;
          case 'p': s = '0x7ffd' + (Math.random() * 1e8 | 0).toString(16); break;
          default: s = str(a);
        }
        return pad(s, w ? +w : 0, fl.indexOf('-') >= 0, fl.indexOf('0') >= 0 && /[diouxXfFeEgG]/.test(cv));
      });
    }
    function roundEven(x, d) { var m = Math.pow(10, d || 0), y = x * m, f = Math.floor(y), diff = y - f, r; if (Math.abs(diff - 0.5) < 1e-9) r = f % 2 === 0 ? f : f + 1; else r = Math.round(y); return r / m; }
    function roundAway(x, d) { var m = Math.pow(10, d || 0); return Math.sign(x) * Math.round(Math.abs(x) * m + 1e-9) / m; }
    function csAlign(s, al) { if (al == null || isNaN(al)) return s; return al < 0 ? pad(s, -al, true) : pad(s, al, false); }
    function csSpec(v, spec) {
      v = unref(v);
      if (spec == null || spec === '' || typeof v === 'string' || v === null || v instanceof Obj || typeof v === 'boolean') return str(v);
      var x = num(v), m = /^([A-Za-z])(\d*)$/.exec(spec);
      if (m) {
        var c = m[1].toUpperCase(), p = m[2] === '' ? null : +m[2];
        switch (c) {
          case 'F': return x.toFixed(p == null ? 2 : p);
          case 'N': return group(x.toFixed(p == null ? 2 : p));
          case 'D': var ds = String(Math.abs(Math.trunc(x))); while (p && ds.length < p) ds = '0' + ds; return (x < 0 ? '-' : '') + ds;
          case 'P': return group((x * 100).toFixed(p == null ? 2 : p)) + '%';
          case 'C': return (x < 0 ? '-' : '') + '$' + group(Math.abs(x).toFixed(p == null ? 2 : p));
          case 'E': var es = x.toExponential(p == null ? 6 : p).split('e'), ex = es[1].charAt(0), en = es[1].slice(1); while (en.length < 3) en = '0' + en; return es[0] + (m[1] === 'e' ? 'e' : 'E') + ex + en;
          case 'X': var xs = (Math.trunc(x) >>> 0).toString(16); if (m[1] === 'X') xs = xs.toUpperCase(); while (p && xs.length < p) xs = '0' + xs; return xs;
          case 'G': case 'R': return p ? String(Number(x.toPrecision(p))) : str(v);
        }
      }
      if (/^[0#,.%]+$/.test(spec)) {
        var pct = spec.indexOf('%') >= 0, sp = spec.replace(/%/g, ''), parts = sp.split('.'), dec = parts[1] || '', minD = (dec.match(/0/g) || []).length, maxD = dec.length;
        if (pct) x *= 100;
        var s = x.toFixed(maxD);
        if (maxD > minD) { var cut = s.split('.'); var fp = (cut[1] || '').replace(/0+$/, ''); while (fp.length < minD) fp += '0'; s = cut[0] + (fp ? '.' + fp : ''); }
        var ip = s.split('.')[0], minI = (parts[0].match(/0/g) || []).length, neg = ip.charAt(0) === '-'; if (neg) ip = ip.slice(1);
        if (minI === 0 && ip === '0' && s.indexOf('.') >= 0) ip = ''; while (ip.length < minI) ip = '0' + ip;
        if (parts[0].indexOf(',') >= 0) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return (neg ? '-' : '') + ip + (s.indexOf('.') >= 0 ? '.' + s.split('.')[1] : '') + (pct ? '%' : '');
      }
      return str(v);
    }
    function csFormat(f, args) {
      return String(f).replace(/\{\{|\}\}|\{(\d+)(?:\s*,\s*(-?\d+))?(?::([^}]*))?\}/g, function (m, i, al, spec) {
        if (m === '{{') return '{'; if (m === '}}') return '}';
        if (+i >= args.length) throw X('fmt', 'Index (zero based) must be greater than or equal to zero and less than the size of the argument list.');
        return csAlign(csSpec(args[+i], spec), al == null ? null : +al);
      });
    }

    /* ---------- C++ streams ---------- */
    var cout = { __ostream: true, err: false, w: 0, fill: ' ', left: false }, cerr = { __ostream: true, err: true, w: 0, fill: ' ', left: false };
    var cin = { __istream: true, fail: false };
    function Manip(k, n) { this.k = k; this.n = n; }
    var ENDL = new Manip('endl');
    function streamOut(s, v) {
      v = unref(v);
      if (v instanceof Manip) {
        switch (v.k) {
          case 'endl': (s.err ? K.errw : K.out)('\n'); break;
          case 'fixed': K.cout.mode = 'fixed'; break; case 'scientific': K.cout.mode = 'sci'; break; case 'defaultfloat': K.cout.mode = ''; break;
          case 'setprecision': K.cout.prec = v.n; break; case 'setw': s.w = v.n; break; case 'setfill': s.fill = chs(v.n); break;
          case 'left': s.left = true; break; case 'right': s.left = false; break; case 'boolalpha': K.cout.boolalpha = true; break; case 'noboolalpha': K.cout.boolalpha = false; break;
        }
        return s;
      }
      var t = v instanceof D ? K.gFmt(v.v, K.cout.prec, K.cout.mode) : str(v);
      if (s.w && t.length < s.w) { var fillS = new Array(s.w - t.length + 1).join(s.fill || ' '); t = s.left ? t + fillS : fillS + t; }
      s.w = 0;
      (s.err ? K.errw : K.out)(t);
      return s;
    }
    function streamIn(s, ref) {
      if (s.fail) return s;
      var t = ref.t, n = t ? t.n : null, bits = n ? K.INTS[n] : 0;
      if (n === 'char' && !(t.dims)) { skipWS(); var c = getc(); if (c < 0) { s.fail = true; return s; } ref.set(new Ch(c)); return s; }
      var tok = token();
      if (tok == null) { s.fail = true; return s; }
      if (bits) { var m = /^[+-]?\d+/.exec(tok); if (!m) { s.fail = true; IN.i -= tok.length; ref.set(0); return s; } IN.i -= tok.length - m[0].length; ref.set(K.wrapInt(bits, parseInt(m[0], 10))); return s; }
      if (n === 'double' || n === 'float' || n === 'long double') { var m2 = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(tok); if (!m2) { s.fail = true; IN.i -= tok.length; ref.set(dval(0)); return s; } IN.i -= tok.length - m2[0].length; ref.set(dval(parseFloat(m2[0]))); return s; }
      if (n === 'bool') { ref.set(tok === '1' || tok === 'true'); return s; }
      if (n === 'auto' || n == null) { ref.set(/^[+-]?\d+$/.test(tok) ? parseInt(tok, 10) : tok); return s; }
      ref.set(tok); return s;
    }

    /* ---------- iterators (C++) ---------- */
    function seqOf(c) { if (c instanceof Lst || c instanceof Arr) return c.a; if (c instanceof Mp) return K.entries(c).map(function (e) { var p = new Pair(e.k, e.v); p.ent = e; return p; }); if (c instanceof St) return K.entries(c).map(function (e) { return e.k; }); if (c && c.sref) return c.sref.get().split('').map(function (x) { return new Ch(x.charCodeAt(0)); }); return []; }
    function iterGet(it) { var s = seqOf(it.c); if (it.i < 0 || it.i >= s.length) throw X('lidx', 'dereferenced an iterator that points past the end'); return s[it.i]; }
    function iterSet(it, v) { if (it.c instanceof Lst || it.c instanceof Arr) it.c.a[it.i] = v; else if (it.c.sref) { var s = it.c.sref.get(); it.c.sref.set(s.slice(0, it.i) + chs(v) + s.slice(it.i + 1)); } else throw RT('cannot assign through this iterator'); }
    function rangeOf(a, b) {
      a = unref(a); b = unref(b);
      if (a instanceof Arr && b instanceof Iter && b.c === a) a = new Iter(a, 0);
      if (a instanceof Iter && b instanceof Iter) return { c: a.c, lo: a.i, hi: b.i };
      if (a instanceof Arr && typeof b === 'number') return { c: a, lo: 0, hi: b };
      if (a instanceof Arr && b instanceof Arr) return { c: a, lo: 0, hi: a.a.length };
      throw RT('expected two iterators like v.begin(), v.end() (or arr, arr + n)', 'compile');
    }
    function cmpFn(f) {
      if (!f) return K.cmp;
      return function (x, y) { var r = K.callFn(f, [x, y]); if (typeof r === 'boolean') return r ? -1 : (K.truthy(K.callFn(f, [y, x])) ? 1 : 0); return num(r); };
    }
    function sortRange(r, f) {
      var cf = cmpFn(f);
      if (r.c && r.c.sref) { var s = r.c.sref.get(), mid = s.slice(r.lo, r.hi).split('').sort(function (x, y) { return cf(new Ch(x.charCodeAt(0)), new Ch(y.charCodeAt(0))); }).join(''); r.c.sref.set(s.slice(0, r.lo) + mid + s.slice(r.hi)); return; }
      var a = r.c.a, part = a.slice(r.lo, r.hi).sort(cf); for (var i = 0; i < part.length; i++) a[r.lo + i] = part[i];
    }
    function revRange(r) {
      if (r.c && r.c.sref) { var s = r.c.sref.get(); r.c.sref.set(s.slice(0, r.lo) + s.slice(r.lo, r.hi).split('').reverse().join('') + s.slice(r.hi)); return; }
      var a = r.c.a, part = a.slice(r.lo, r.hi).reverse(); for (var i = 0; i < part.length; i++) a[r.lo + i] = part[i];
    }
    function rvals(r) { return r.c && r.c.sref ? seqOf(r.c).slice(r.lo, r.hi) : r.c.a.slice(r.lo, r.hi); }

    /* ---------- misc helpers ---------- */
    function arithMax(a, b, mn) { var r = mn ? (K.cmp(a, b) <= 0 ? a : b) : (K.cmp(a, b) >= 0 ? a : b); if ((a instanceof D || b instanceof D) && !(r instanceof D)) r = dval(num(r)); return r; }
    function mathD(f) { return function (a) { return dval(f.apply(null, a.map(function (x) { return num(unref(x)); }))); }; }
    var seed = 0;
    function rand01() { if (!seed) return Math.random(); seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return (seed >>> 1) / 2147483648; }
    function Rnd(s) { this.__rnd = true; this.seed = s; }
    function exit(c) { K.flush(); var e = new Error('exit'); e.vvExit = true; e.code = c || 0; throw e; }
    function exc(name, msg) { return new Exc(name, msg); }
    function toArr(list, et) { return new Arr(list.slice(), et || null); }
    function lst(a, et) { return new Lst(a, 'list', et || null); }
    function items(c) { c = unref(c); if (c instanceof Arr || c instanceof Lst) return c.a; if (c instanceof St || c instanceof Mp) return K.entries(c).map(function (e) { return e.k; }); if (typeof c === 'string') return c.split('').map(function (x) { return new Ch(x.charCodeAt(0)); }); if (c == null) throw X('npe', 'the collection is null'); return []; }
    function sumOf(xs) { var s = 0, dbl = false; xs.forEach(function (x) { if (x instanceof D) dbl = true; s += num(x); }); return dbl ? dval(s) : s; }
    function sbOf(o) { return o; }
    function jChar(name, c) { var s = chs(c); switch (name) {
      case 'isDigit': case 'IsDigit': return /^[0-9]$/.test(s); case 'isLetter': case 'IsLetter': case 'isAlphabetic': return /^[A-Za-z\u00c0-\uffff]$/.test(s);
      case 'isLetterOrDigit': case 'IsLetterOrDigit': return /^[A-Za-z0-9\u00c0-\uffff]$/.test(s); case 'isUpperCase': case 'IsUpper': return s !== s.toLowerCase();
      case 'isLowerCase': case 'IsLower': return s !== s.toUpperCase(); case 'isWhitespace': case 'IsWhiteSpace': case 'isSpaceChar': return /^\s$/.test(s);
      case 'IsPunctuation': return /^[!-\/:-@\[-`{-~]$/.test(s);
      case 'toUpperCase': case 'ToUpper': return new Ch(s.toUpperCase().charCodeAt(0)); case 'toLowerCase': case 'ToLower': return new Ch(s.toLowerCase().charCodeAt(0));
      case 'getNumericValue': case 'GetNumericValue': return /[0-9]/.test(s) ? +s : /[a-z]/i.test(s) ? s.toLowerCase().charCodeAt(0) - 87 : -1;
      case 'toString': case 'ToString': return s; case 'valueOf': return c; } return NOPE; }

    /* ---------- statics: Java ---------- */
    var outS = { __jout: true, err: false }, errS = { __jout: true, err: true };
    function jPrint(s, a, nl) { var t = a.length ? (a[0] instanceof Arr && a[0].et && a[0].et.n === 'char' ? a[0].a.map(chs).join('') : str(unref(a[0]))) : ''; (s.err ? K.errw : K.out)(t + (nl ? '\n' : '')); }
    var STATIC = {
      'Math.abs': function (a) { var v = unref(a[0]); return v instanceof D ? dval(Math.abs(v.v)) : Math.abs(num(v)); },
      'Math.max': function (a) { return arithMax(unref(a[0]), unref(a[1])); }, 'Math.min': function (a) { return arithMax(unref(a[0]), unref(a[1]), true); },
      'Math.pow': mathD(Math.pow), 'Math.sqrt': mathD(Math.sqrt), 'Math.cbrt': mathD(Math.cbrt), 'Math.floor': mathD(Math.floor), 'Math.ceil': mathD(Math.ceil), 'Math.rint': mathD(function (x) { return roundEven(x, 0); }),
      'Math.round': function (a) { return Math.floor(num(unref(a[0])) + 0.5); }, 'Math.random': function () { return dval(rand01()); }, 'Math.hypot': mathD(Math.hypot),
      'Math.log': mathD(Math.log), 'Math.log10': mathD(Math.log10), 'Math.exp': mathD(Math.exp), 'Math.sin': mathD(Math.sin), 'Math.cos': mathD(Math.cos), 'Math.tan': mathD(Math.tan),
      'Math.asin': mathD(Math.asin), 'Math.acos': mathD(Math.acos), 'Math.atan': mathD(Math.atan), 'Math.atan2': mathD(Math.atan2), 'Math.toRadians': mathD(function (x) { return x * Math.PI / 180; }), 'Math.toDegrees': mathD(function (x) { return x * 180 / Math.PI; }),
      'Math.signum': mathD(Math.sign), 'Math.floorDiv': function (a) { return Math.floor(num(a[0]) / num(a[1])); }, 'Math.floorMod': function (a) { var x = num(a[0]), y = num(a[1]); return ((x % y) + y) % y; },
      'Integer.parseInt': function (a) { return a.length > 1 ? parseInt(str(a[0]), num(a[1])) : pInt(unref(a[0])); }, 'Integer.valueOf': function (a) { var v = unref(a[0]); return typeof v === 'string' ? pInt(v) : num(v); },
      'Integer.toString': function (a) { return a.length > 1 ? num(a[0]).toString(num(a[1])) : String(num(a[0])); }, 'Integer.toBinaryString': function (a) { return (num(a[0]) >>> 0).toString(2); },
      'Integer.toHexString': function (a) { return (num(a[0]) >>> 0).toString(16); }, 'Integer.toOctalString': function (a) { return (num(a[0]) >>> 0).toString(8); },
      'Integer.max': function (a) { return Math.max(num(a[0]), num(a[1])); }, 'Integer.min': function (a) { return Math.min(num(a[0]), num(a[1])); }, 'Integer.sum': function (a) { return num(a[0]) + num(a[1]); },
      'Integer.compare': function (a) { var x = num(a[0]), y = num(a[1]); return x < y ? -1 : x > y ? 1 : 0; }, 'Integer.signum': function (a) { return Math.sign(num(a[0])); }, 'Integer.bitCount': function (a) { var v = num(a[0]) >>> 0, c = 0; while (v) { c += v & 1; v >>>= 1; } return c; },
      'Long.parseLong': function (a) { return pInt(unref(a[0])); }, 'Long.valueOf': function (a) { return pInt(str(a[0])); }, 'Short.parseShort': function (a) { return pInt(unref(a[0])); }, 'Byte.parseByte': function (a) { return pInt(unref(a[0])); },
      'Double.parseDouble': function (a) { return dval(pDbl(unref(a[0]))); }, 'Double.valueOf': function (a) { var v = unref(a[0]); return dval(typeof v === 'string' ? pDbl(v) : num(v)); }, 'Float.parseFloat': function (a) { return dval(Math.fround(pDbl(unref(a[0])))); },
      'Double.compare': function (a) { var x = num(a[0]), y = num(a[1]); return x < y ? -1 : x > y ? 1 : 0; }, 'Double.isNaN': function (a) { return isNaN(num(a[0])); }, 'Double.toString': function (a) { return K.jDouble(num(a[0])); },
      'Boolean.parseBoolean': function (a) { return /^true$/i.test(str(a[0])); }, 'Boolean.toString': function (a) { return String(a[0]); },
      'String.valueOf': function (a) { var v = unref(a[0]); return v instanceof Arr ? v.a.map(chs).join('') : str(v); }, 'String.copyValueOf': function (a) { return unref(a[0]).a.map(chs).join(''); },
      'String.format': function (a) { return printf(str(a[0]), a.slice(1)); }, 'String.join': function (a) { var sep = str(a[0]), rest = a.slice(1); var xs = rest.length === 1 && (unref(rest[0]) instanceof Lst || unref(rest[0]) instanceof Arr || unref(rest[0]) instanceof St) ? items(rest[0]) : rest; return xs.map(function (x) { return str(unref(x)); }).join(sep); },
      'Arrays.toString': function (a) { var v = unref(a[0]); return v === null ? 'null' : '[' + v.a.map(str).join(', ') + ']'; },
      'Arrays.deepToString': function (a) { function d(v) { return v instanceof Arr ? '[' + v.a.map(d).join(', ') + ']' : str(v); } return d(unref(a[0])); },
      'Arrays.sort': function (a) { var v = unref(a[0]); if (a.length >= 3 && isNumV(unref(a[1]))) sortRange({ c: v, lo: num(a[1]), hi: num(a[2]) }, a[3]); else { var f = unref(a[1]); v.a.sort(cmpFn(f instanceof Fn ? f : null)); } },
      'Arrays.fill': function (a) { var v = unref(a[0]); if (a.length === 4) { for (var i = num(a[1]); i < num(a[2]); i++) v.a[i] = K.coerce(v.et, unref(a[3]), true); } else for (var j = 0; j < v.a.length; j++) v.a[j] = K.coerce(v.et, unref(a[1]), true); },
      'Arrays.asList': function (a) { return lst(a.length === 1 && unref(a[0]) instanceof Arr ? unref(a[0]).a.slice() : a.map(unref)); },
      'Arrays.copyOf': function (a) { var v = unref(a[0]), n = num(a[1]), out = v.a.slice(0, n); while (out.length < n) out.push(K.defaultFor(v.et)); return toArr(out, v.et); },
      'Arrays.copyOfRange': function (a) { var v = unref(a[0]); return toArr(v.a.slice(num(a[1]), num(a[2])), v.et); },
      'Arrays.equals': function (a) { var x = unref(a[0]), y = unref(a[1]); return x.a.length === y.a.length && x.a.every(function (q, i) { return K.equals(q, y.a[i]); }); },
      'Arrays.binarySearch': function (a) { var v = unref(a[0]).a, k = unref(a[1]), lo = 0, hi = v.length - 1; while (lo <= hi) { var mid = (lo + hi) >> 1, c = K.cmp(v[mid], k); if (c === 0) return mid; if (c < 0) lo = mid + 1; else hi = mid - 1; } return -(lo + 1); },
      'Arrays.stream': function () { throw RT('Java streams are outside this teaching subset — use a for loop', 'compile'); },
      'Collections.sort': function (a) { unref(a[0]).a.sort(cmpFn(unref(a[1]) || null)); }, 'Collections.reverse': function (a) { unref(a[0]).a.reverse(); },
      'Collections.max': function (a) { var xs = items(a[0]); if (!xs.length) throw X('eof', ''); return xs.reduce(function (m, x) { return cmpFn(unref(a[1]))(x, m) > 0 ? x : m; }); },
      'Collections.min': function (a) { var xs = items(a[0]); if (!xs.length) throw X('eof', ''); return xs.reduce(function (m, x) { return cmpFn(unref(a[1]))(x, m) < 0 ? x : m; }); },
      'Collections.swap': function (a) { var v = unref(a[0]).a, i = num(a[1]), j = num(a[2]), t = v[i]; v[i] = v[j]; v[j] = t; },
      'Collections.frequency': function (a) { return items(a[0]).filter(function (x) { return K.equals(x, unref(a[1])); }).length; },
      'Collections.shuffle': function (a) { var v = unref(a[0]).a; for (var i = v.length - 1; i > 0; i--) { var j = Math.floor(rand01() * (i + 1)), t = v[i]; v[i] = v[j]; v[j] = t; } },
      'Collections.reverseOrder': function () { var f = new Fn([], null, null); f.cmpName = 'greater'; return f; },
      'Collections.unmodifiableList': function (a) { return unref(a[0]); }, 'Collections.emptyList': function () { return lst([]); },
      'List.of': function (a) { return lst(a.map(unref)); }, 'Set.of': function (a) { return K.construct({ n: 'LinkedHashSet' }, [], null, a.map(unref)); },
      'Map.of': function (a) { var m = K.construct({ n: 'LinkedHashMap' }, [], null); for (var i = 0; i + 1 < a.length; i += 2) K.mset(m, unref(a[i]), unref(a[i + 1])); return m; },
      'System.out.println': function (a) { jPrint(outS, a, true); }, 'System.out.print': function (a) { if (!a.length) throw RT('print() needs a value', 'compile'); jPrint(outS, a, false); },
      'System.out.printf': function (a) { K.out(printf(str(a[0]), a.slice(1))); return outS; }, 'System.out.format': function (a) { K.out(printf(str(a[0]), a.slice(1))); return outS; },
      'System.err.println': function (a) { jPrint(errS, a, true); }, 'System.err.print': function (a) { jPrint(errS, a, false); }, 'System.err.printf': function (a) { K.errw(printf(str(a[0]), a.slice(1))); },
      'System.out.flush': function () { }, 'System.exit': function (a) { exit(num(a[0])); }, 'System.currentTimeMillis': function () { return Date.now(); }, 'System.nanoTime': function () { return Math.round(performance.now() * 1e6); },
      'System.lineSeparator': function () { return '\n'; }, 'System.arraycopy': function (a) { var s = unref(a[0]).a, sp = num(a[1]), d = unref(a[2]).a, dp = num(a[3]), n = num(a[4]); var tmp = s.slice(sp, sp + n); for (var i = 0; i < n; i++) d[dp + i] = tmp[i]; },
      'Thread.sleep': function () { }, 'Objects.equals': function (a) { return K.equals(unref(a[0]), unref(a[1])); }, 'Objects.isNull': function (a) { return unref(a[0]) == null; },
      'Character.valueOf': function (a) { return unref(a[0]); }, 'Character.toString': function (a) { return chs(unref(a[0])); },
      /* ---------- C# ---------- */
      'Console.WriteLine': function (a) { K.out((a.length > 1 && typeof unref(a[0]) === 'string' ? csFormat(unref(a[0]), a.slice(1).map(unref)) : a.length ? (unref(a[0]) instanceof Arr && unref(a[0]).et && unref(a[0]).et.n === 'char' ? unref(a[0]).a.map(chs).join('') : str(unref(a[0]))) : '') + '\n'); },
      'Console.Write': function (a) { K.out(a.length > 1 && typeof unref(a[0]) === 'string' ? csFormat(unref(a[0]), a.slice(1).map(unref)) : a.length ? str(unref(a[0])) : ''); },
      'Console.ReadLine': function () { return readLine(); }, 'Console.Read': function () { return getc(); }, 'Console.ReadKey': function () { return { KeyChar: new Ch(13) }; },
      'Console.Clear': function () { }, 'Console.ResetColor': function () { }, 'Console.Beep': function () { }, 'Console.Error.WriteLine': function (a) { K.errw((a.length ? str(unref(a[0])) : '') + '\n'); },
      'Math.Abs': function (a) { var v = unref(a[0]); return v instanceof D ? dval(Math.abs(v.v)) : Math.abs(num(v)); },
      'Math.Max': function (a) { return arithMax(unref(a[0]), unref(a[1])); }, 'Math.Min': function (a) { return arithMax(unref(a[0]), unref(a[1]), true); },
      'Math.Pow': mathD(Math.pow), 'Math.Sqrt': mathD(Math.sqrt), 'Math.Cbrt': mathD(Math.cbrt), 'Math.Floor': mathD(Math.floor), 'Math.Ceiling': mathD(Math.ceil), 'Math.Truncate': mathD(Math.trunc),
      'Math.Round': function (a) { var x = num(unref(a[0])), d = 0, mode = 'even'; if (a.length > 1) { var a1 = unref(a[1]); if (typeof a1 === 'string') mode = a1; else d = num(a1); } if (a.length > 2) mode = unref(a[2]); var r = /Away/.test(mode) ? roundAway(x, d) : roundEven(x, d); return dval(r); },
      'Math.Sign': function (a) { return Math.sign(num(unref(a[0]))); }, 'Math.Log': mathD(Math.log), 'Math.Log10': mathD(Math.log10), 'Math.Log2': mathD(Math.log2), 'Math.Exp': mathD(Math.exp),
      'Math.Sin': mathD(Math.sin), 'Math.Cos': mathD(Math.cos), 'Math.Tan': mathD(Math.tan), 'Math.Atan2': mathD(Math.atan2), 'Math.Atan': mathD(Math.atan), 'Math.Clamp': function (a) { var v = unref(a[0]); return arithMax(arithMax(v, unref(a[1])), unref(a[2]), true); },
      'int.Parse': function (a) { return pInt(unref(a[0])); }, 'Int32.Parse': function (a) { return pInt(unref(a[0])); }, 'long.Parse': function (a) { return pInt(unref(a[0])); }, 'Int64.Parse': function (a) { return pInt(unref(a[0])); },
      'double.Parse': function (a) { return dval(pDbl(unref(a[0]))); }, 'Double.Parse': function (a) { return dval(pDbl(unref(a[0]))); }, 'float.Parse': function (a) { return dval(pDbl(unref(a[0]))); }, 'decimal.Parse': function (a) { return dval(pDbl(unref(a[0]))); },
      'bool.Parse': function (a) { var s = str(unref(a[0])).trim(); if (!/^(true|false)$/i.test(s)) throw X('fmt', "String '" + s + "' was not recognized as a valid Boolean."); return /^true$/i.test(s); },
      'char.Parse': function (a) { var s = str(unref(a[0])); if (s.length !== 1) throw X('fmt', 'String must be exactly one character long.'); return new Ch(s.charCodeAt(0)); },
      'int.TryParse': function (a) { var s = unref(a[0]), ok = s != null && /^\s*[+-]?\d+\s*$/.test(s); if (a[1] instanceof Ref) a[1].set(ok ? parseInt(s, 10) : 0); return ok; },
      'double.TryParse': function (a) { var s = unref(a[0]), ok = s != null && /^\s*[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?\s*$/.test(s); if (a[1] instanceof Ref) a[1].set(dval(ok ? parseFloat(s) : 0)); return ok; },
      'Convert.ToInt32': function (a) { var v = unref(a[0]); if (typeof v === 'string') return pInt(v); if (v instanceof D) return roundEven(v.v, 0) | 0; return num(v) | 0; }, 'Convert.ToInt64': function (a) { var v = unref(a[0]); return typeof v === 'string' ? pInt(v) : v instanceof D ? roundEven(v.v, 0) : num(v); },
      'Convert.ToDouble': function (a) { var v = unref(a[0]); return dval(typeof v === 'string' ? pDbl(v) : num(v)); }, 'Convert.ToDecimal': function (a) { var v = unref(a[0]); return dval(typeof v === 'string' ? pDbl(v) : num(v)); },
      'Convert.ToString': function (a) { var v = unref(a[0]); return a.length > 1 ? (num(v) >>> 0).toString(num(a[1])) : str(v); }, 'Convert.ToChar': function (a) { return new Ch(num(unref(a[0]))); }, 'Convert.ToBoolean': function (a) { var v = unref(a[0]); return typeof v === 'string' ? /^true$/i.test(v.trim()) : !!num(v); },
      'string.Join': function (a) { return STATIC['String.join'](a); }, 'string.Concat': function (a) { return a.map(function (x) { return str(unref(x)); }).join(''); },
      'string.IsNullOrEmpty': function (a) { var v = unref(a[0]); return v == null || v === ''; }, 'string.IsNullOrWhiteSpace': function (a) { var v = unref(a[0]); return v == null || !String(v).trim(); },
      'string.Format': function (a) { return csFormat(str(unref(a[0])), a.slice(1).map(unref)); }, 'string.Compare': function (a) { var x = str(unref(a[0])), y = str(unref(a[1])); if (a[2] === true) { x = x.toLowerCase(); y = y.toLowerCase(); } return x < y ? -1 : x > y ? 1 : 0; },
      'string.Equals': function (a) { return unref(a[0]) === unref(a[1]); },
      'Array.Sort': function (a) { var v = unref(a[0]); v.a.sort(cmpFn(unref(a[1]) instanceof Fn ? unref(a[1]) : null)); }, 'Array.Reverse': function (a) { unref(a[0]).a.reverse(); },
      'Array.IndexOf': function (a) { var v = unref(a[0]).a, k = unref(a[1]); for (var i = 0; i < v.length; i++) if (K.equals(v[i], k)) return i; return -1; },
      'Array.Fill': function (a) { var v = unref(a[0]); for (var i = 0; i < v.a.length; i++) v.a[i] = unref(a[1]); }, 'Array.Exists': function (a) { return unref(a[0]).a.some(function (x) { return K.truthy(K.callFn(unref(a[1]), [x])); }); },
      'Array.Resize': function (a) { var r = a[0], v = r.get(), n = num(a[1]), out = v ? v.a.slice(0, n) : []; while (out.length < n) out.push(K.defaultFor(v ? v.et : null)); r.set(new Arr(out, v ? v.et : null)); },
      'Array.Copy': function (a) { var s = unref(a[0]).a, d = unref(a[1]).a, n = num(a[2]); for (var i = 0; i < n; i++) d[i] = s[i]; },
      'Enumerable.Range': function (a) { var s = num(a[0]), n = num(a[1]), o = []; for (var i = 0; i < n; i++) o.push(s + i); return lst(o); }, 'Enumerable.Repeat': function (a) { var o = []; for (var i = 0; i < num(a[1]); i++) o.push(unref(a[0])); return lst(o); },
      'Environment.Exit': function (a) { exit(num(a[0])); }, 'Thread.Sleep': function () { }, 'Task.Delay': function () { }
    };
    ['isDigit', 'isLetter', 'isLetterOrDigit', 'isAlphabetic', 'isUpperCase', 'isLowerCase', 'isWhitespace', 'isSpaceChar', 'toUpperCase', 'toLowerCase', 'getNumericValue'].forEach(function (m) { STATIC['Character.' + m] = function (a) { var r = jChar(m, unref(a[0])); if ((m === 'toUpperCase' || m === 'toLowerCase') && typeof unref(a[0]) === 'number') return r.c; return r; }; });
    ['IsDigit', 'IsLetter', 'IsLetterOrDigit', 'IsUpper', 'IsLower', 'IsWhiteSpace', 'IsPunctuation', 'ToUpper', 'ToLower', 'GetNumericValue'].forEach(function (m) { STATIC['char.' + m] = STATIC['Char.' + m] = function (a) { var v = unref(a[0]); if (typeof v === 'string' && a.length > 1) v = new Ch(v.charCodeAt(num(a[1]))); return jChar(m, v); }; });
    ['Parse', 'TryParse'].forEach(function (m) { STATIC['Int32.' + m] = STATIC['int.' + m]; STATIC['Double.' + m] = STATIC['double.' + m]; });
    STATIC['String.Join'] = STATIC['string.Join']; STATIC['String.Format'] = STATIC['string.Format']; STATIC['String.IsNullOrEmpty'] = STATIC['string.IsNullOrEmpty']; STATIC['String.IsNullOrWhiteSpace'] = STATIC['string.IsNullOrWhiteSpace']; STATIC['String.Concat'] = STATIC['string.Concat']; STATIC['String.Compare'] = STATIC['string.Compare'];

    var SFIELD = {
      'Integer.MAX_VALUE': 2147483647, 'Integer.MIN_VALUE': -2147483648, 'Long.MAX_VALUE': 9007199254740991, 'Long.MIN_VALUE': -9007199254740991, 'Short.MAX_VALUE': 32767, 'Byte.MAX_VALUE': 127,
      'Double.MAX_VALUE': dval(1.7976931348623157e308), 'Double.MIN_VALUE': dval(5e-324), 'Double.POSITIVE_INFINITY': dval(Infinity), 'Double.NEGATIVE_INFINITY': dval(-Infinity), 'Double.NaN': dval(NaN),
      'Math.PI': dval(Math.PI), 'Math.E': dval(Math.E), 'System.out': outS, 'System.err': errS, 'System.in': { __sysin: true }, 'Boolean.TRUE': true, 'Boolean.FALSE': false, 'Character.MAX_VALUE': new Ch(65535),
      'int.MaxValue': 2147483647, 'int.MinValue': -2147483648, 'Int32.MaxValue': 2147483647, 'Int32.MinValue': -2147483648, 'long.MaxValue': 9007199254740991, 'long.MinValue': -9007199254740991,
      'double.MaxValue': dval(1.7976931348623157e308), 'double.MinValue': dval(-1.7976931348623157e308), 'double.Epsilon': dval(5e-324), 'double.PositiveInfinity': dval(Infinity), 'double.NaN': dval(NaN), 'char.MaxValue': new Ch(65535),
      'string.Empty': '', 'String.Empty': '', 'Environment.NewLine': '\n', 'StringSplitOptions.RemoveEmptyEntries': 'RemoveEmptyEntries', 'StringSplitOptions.None': 'None', 'StringSplitOptions.TrimEntries': 'TrimEntries',
      'MidpointRounding.AwayFromZero': 'AwayFromZero', 'MidpointRounding.ToEven': 'ToEven', 'string.npos': -1, 'std.string.npos': -1, 'Console.Out': { __csout: true }
    };
    var GVAL = {
      INT_MAX: 2147483647, INT_MIN: -2147483648, LONG_MAX: 9007199254740991, LLONG_MAX: 9007199254740991, LLONG_MIN: -9007199254740991, UINT_MAX: 4294967295, SHRT_MAX: 32767, CHAR_MAX: 127,
      DBL_MAX: dval(1.7976931348623157e308), FLT_MAX: dval(3.4028234663852886e38), DBL_MIN: dval(2.2250738585072014e-308), EOF: -1, RAND_MAX: 32767, M_PI: dval(Math.PI), M_E: dval(Math.E),
      cout: cout, cin: cin, cerr: cerr, clog: cerr, endl: ENDL, fixed: new Manip('fixed'), scientific: new Manip('scientific'), defaultfloat: new Manip('defaultfloat'), left: new Manip('left'), right: new Manip('right'),
      boolalpha: new Manip('boolalpha'), noboolalpha: new Manip('noboolalpha'), showpoint: new Manip('showpoint'), flush: new Manip('flush'), ws: new Manip('ws'), stdin: { __cstdin: true }, stdout: { __cstdout: true }, stderr: { __cstderr: true }, npos: -1
    };
    if (isCS) GVAL = { Console: { __console: true } };
    if (isJ) GVAL = {};

    /* ---------- C / C++ global functions ---------- */
    var GF = {
      printf: function (a) { var s = printf(str(unref(a[0])), a.slice(1)); K.out(s); return s.length; },
      puts: function (a) { K.out(str(unref(a[0])) + '\n'); return 0; }, putchar: function (a) { K.out(chs(unref(a[0]))); return num(unref(a[0])); },
      getchar: function () { return getc(); },
      scanf: function (a, nodes, env) { return scanf(str(unref(a[0])), a.slice(1), nodes.slice(1), env); },
      fgets: function (a, nodes, env) { var l = readLine(); if (l == null) return null; var max = num(a[1]) - 1, had = IN.i <= IN.s.length && IN.s.charAt(IN.i - 1) === '\n'; var v = (l + (had ? '\n' : '')).slice(0, max); (a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env)).set(v); return v; },
      gets: function () { throw RT('gets() was removed from C because it is unsafe — use fgets(buf, size, stdin)', 'compile'); },
      sprintf: function (a, nodes, env) { var s = printf(str(unref(a[1])), a.slice(2)); (a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env)).set(s); return s.length; },
      strlen: function (a) { return str(unref(a[0])).length; }, strcmp: function (a) { var x = str(unref(a[0])), y = str(unref(a[1])); return x < y ? -1 : x > y ? 1 : 0; },
      strncmp: function (a) { var n = num(a[2]), x = str(unref(a[0])).slice(0, n), y = str(unref(a[1])).slice(0, n); return x < y ? -1 : x > y ? 1 : 0; },
      strcpy: function (a, nodes, env) { var r = a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env); r.set(str(unref(a[1]))); return r.get(); },
      strncpy: function (a, nodes, env) { var r = a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env); r.set(str(unref(a[1])).slice(0, num(a[2]))); return r.get(); },
      strcat: function (a, nodes, env) { var r = a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env); r.set(str(r.get()) + str(unref(a[1]))); return r.get(); },
      strchr: function (a) { var s = str(unref(a[0])), i = s.indexOf(chs(unref(a[1]))); return i < 0 ? null : s.slice(i); }, strstr: function (a) { var s = str(unref(a[0])), i = s.indexOf(str(unref(a[1]))); return i < 0 ? null : s.slice(i); },
      strrev: function (a, nodes, env) { var r = K.refOf(nodes[0], env); r.set(str(r.get()).split('').reverse().join('')); return r.get(); },
      toupper: function (a) { var c = num(unref(a[0])); return String.fromCharCode(c).toUpperCase().charCodeAt(0); }, tolower: function (a) { var c = num(unref(a[0])); return String.fromCharCode(c).toLowerCase().charCodeAt(0); },
      isdigit: function (a) { return /[0-9]/.test(chs(unref(a[0]))) ? 1 : 0; }, isalpha: function (a) { return /[A-Za-z]/.test(chs(unref(a[0]))) ? 1 : 0; }, isalnum: function (a) { return /[A-Za-z0-9]/.test(chs(unref(a[0]))) ? 1 : 0; },
      isspace: function (a) { return /\s/.test(chs(unref(a[0]))) ? 1 : 0; }, isupper: function (a) { return /[A-Z]/.test(chs(unref(a[0]))) ? 1 : 0; }, islower: function (a) { return /[a-z]/.test(chs(unref(a[0]))) ? 1 : 0; }, ispunct: function (a) { return /[!-\/:-@\[-`{-~]/.test(chs(unref(a[0]))) ? 1 : 0; },
      abs: function (a) { var v = unref(a[0]); return v instanceof D ? dval(Math.abs(v.v)) : Math.abs(num(v)); }, labs: function (a) { return Math.abs(num(a[0])); }, llabs: function (a) { return Math.abs(num(a[0])); },
      fabs: mathD(Math.abs), sqrt: mathD(Math.sqrt), cbrt: mathD(Math.cbrt), pow: mathD(Math.pow), floor: mathD(Math.floor), ceil: mathD(Math.ceil), trunc: mathD(Math.trunc), round: mathD(function (x) { return roundAway(x, 0); }),
      fmod: mathD(function (x, y) { return x % y; }), exp: mathD(Math.exp), log: mathD(Math.log), log10: mathD(Math.log10), log2: mathD(Math.log2), sin: mathD(Math.sin), cos: mathD(Math.cos), tan: mathD(Math.tan),
      asin: mathD(Math.asin), acos: mathD(Math.acos), atan: mathD(Math.atan), atan2: mathD(Math.atan2), hypot: mathD(Math.hypot), fmax: mathD(Math.max), fmin: mathD(Math.min),
      rand: function () { return Math.floor(rand01() * 32768); }, srand: function (a) { seed = (num(a[0]) >>> 0) || 1; }, time: function () { return Math.floor(Date.now() / 1000); },
      exit: function (a) { exit(num(a[0])); }, atoi: function (a) { var m = /^\s*[+-]?\d+/.exec(str(unref(a[0]))); return m ? parseInt(m[0], 10) : 0; }, atol: function (a) { return GF.atoi(a); }, atof: function (a) { var v = parseFloat(str(unref(a[0]))); return dval(isNaN(v) ? 0 : v); },
      memset: function (a) { var v = unref(a[0]); if (v instanceof Arr) { var fill = num(unref(a[1])); (function f(ar) { for (var i = 0; i < ar.a.length; i++) { if (ar.a[i] instanceof Arr) f(ar.a[i]); else ar.a[i] = ar.a[i] instanceof D ? dval(fill) : ar.a[i] instanceof Ch ? new Ch(fill) : fill; } })(v); } return v; },
      malloc: function () { throw RT('malloc/free are outside this teaching subset — use an array like int a[100]; (or a vector in C++)', 'compile'); }, calloc: function () { return GF.malloc(); }, free: function () { },
      system: function () { return 0; }, fflush: function () { return 0; }, getch: function () { return getc(); },
      /* C++ */
      swap: function (a, nodes, env) { var r1 = a[0] instanceof Ref ? a[0] : K.refOf(nodes[0], env), r2 = a[1] instanceof Ref ? a[1] : K.refOf(nodes[1], env), t = r1.get(); r1.set(r2.get()); r2.set(t); },
      max: function (a) { if (a.length === 1 && unref(a[0]) instanceof Arr) return unref(a[0]).a.reduce(function (m, x) { return K.cmp(x, m) > 0 ? x : m; }); var f = a[2] instanceof Fn ? cmpFn(a[2]) : K.cmp; return f(unref(a[0]), unref(a[1])) >= 0 ? unref(a[0]) : unref(a[1]); },
      min: function (a) { if (a.length === 1 && unref(a[0]) instanceof Arr) return unref(a[0]).a.reduce(function (m, x) { return K.cmp(x, m) < 0 ? x : m; }); var f = a[2] instanceof Fn ? cmpFn(a[2]) : K.cmp; return f(unref(a[0]), unref(a[1])) <= 0 ? unref(a[0]) : unref(a[1]); },
      sort: function (a) { sortRange(rangeOf(a[0], a[1]), unref(a[2])); }, stable_sort: function (a) { sortRange(rangeOf(a[0], a[1]), unref(a[2])); }, reverse: function (a) { revRange(rangeOf(a[0], a[1])); },
      accumulate: function (a) { var xs = rvals(rangeOf(a[0], a[1])), acc = unref(a[2]); xs.forEach(function (x) { acc = a[3] ? K.callFn(unref(a[3]), [acc, x]) : (typeof acc === 'string' ? acc + str(x) : K.isNumV(acc) ? ((acc instanceof D || x instanceof D) ? dval(num(acc) + num(x)) : num(acc) + num(x)) : acc); }); return acc; },
      count: function (a) { return rvals(rangeOf(a[0], a[1])).filter(function (x) { return K.equals(x, unref(a[2])); }).length; },
      count_if: function (a) { return rvals(rangeOf(a[0], a[1])).filter(function (x) { return K.truthy(K.callFn(unref(a[2]), [x])); }).length; },
      find: function (a) { var r = rangeOf(a[0], a[1]), xs = seqOf(r.c); for (var i = r.lo; i < r.hi; i++) if (K.equals(xs[i], unref(a[2]))) return new Iter(r.c, i); return new Iter(r.c, r.hi); },
      max_element: function (a) { var r = rangeOf(a[0], a[1]), xs = seqOf(r.c), best = r.lo; for (var i = r.lo + 1; i < r.hi; i++) if (K.cmp(xs[i], xs[best]) > 0) best = i; return new Iter(r.c, best); },
      min_element: function (a) { var r = rangeOf(a[0], a[1]), xs = seqOf(r.c), best = r.lo; for (var i = r.lo + 1; i < r.hi; i++) if (K.cmp(xs[i], xs[best]) < 0) best = i; return new Iter(r.c, best); },
      fill: function (a) { var r = rangeOf(a[0], a[1]); for (var i = r.lo; i < r.hi; i++) r.c.a[i] = unref(a[2]); }, iota: function (a) { var r = rangeOf(a[0], a[1]), v = num(unref(a[2])); for (var i = r.lo; i < r.hi; i++) r.c.a[i] = v++; },
      binary_search: function (a) { var xs = rvals(rangeOf(a[0], a[1])); return xs.some(function (x) { return K.equals(x, unref(a[2])); }); },
      lower_bound: function (a) { var r = rangeOf(a[0], a[1]), xs = seqOf(r.c), lo = r.lo, hi = r.hi; while (lo < hi) { var m = (lo + hi) >> 1; if (K.cmp(xs[m], unref(a[2])) < 0) lo = m + 1; else hi = m; } return new Iter(r.c, lo); },
      upper_bound: function (a) { var r = rangeOf(a[0], a[1]), xs = seqOf(r.c), lo = r.lo, hi = r.hi; while (lo < hi) { var m = (lo + hi) >> 1; if (K.cmp(xs[m], unref(a[2])) <= 0) lo = m + 1; else hi = m; } return new Iter(r.c, lo); },
      distance: function (a) { return unref(a[1]).i - unref(a[0]).i; }, next: function (a) { var it = unref(a[0]); return new Iter(it.c, it.i + (a.length > 1 ? num(a[1]) : 1)); }, prev: function (a) { var it = unref(a[0]); return new Iter(it.c, it.i - (a.length > 1 ? num(a[1]) : 1)); },
      next_permutation: function (a) { var r = rangeOf(a[0], a[1]), v = r.c.a, lo = r.lo, hi = r.hi, i = hi - 2; while (i >= lo && K.cmp(v[i], v[i + 1]) >= 0) i--; if (i < lo) { revRange(r); return false; } var j = hi - 1; while (K.cmp(v[j], v[i]) <= 0) j--; var t = v[i]; v[i] = v[j]; v[j] = t; revRange({ c: r.c, lo: i + 1, hi: hi }); return true; },
      __gcd: function (a) { var x = Math.abs(num(a[0])), y = Math.abs(num(a[1])); while (y) { var t = y; y = x % y; x = t; } return x; },
      lcm: function (a) { var g = GF.__gcd(a); return g ? Math.abs(num(a[0]) * num(a[1])) / g : 0; },
      to_string: function (a) { var v = unref(a[0]); return v instanceof D ? v.v.toFixed(6) : str(v); },
      stoi: function (a) { var m = /^\s*[+-]?\d+/.exec(str(unref(a[0]))); if (!m) throw X('fmt', 'stoi'); return parseInt(m[0], 10); }, stol: function (a) { return GF.stoi(a); }, stoll: function (a) { return GF.stoi(a); },
      stod: function (a) { var v = parseFloat(str(unref(a[0]))); if (isNaN(v)) throw X('fmt', 'stod'); return dval(v); }, stof: function (a) { return GF.stod(a); },
      getline: function (a, nodes, env) { var s = unref(a[0]); if (s && s.__istream) { var l = readLine(); var r = a[1] instanceof Ref ? a[1] : K.refOf(nodes[1], env); if (l == null) { s.fail = true; r.set(''); return s; } if (a.length > 2) { var dl = chs(unref(a[2])), k = l.indexOf(dl); if (k >= 0) { IN.i -= l.length - k; l = l.slice(0, k); IN.i++; } } r.set(l); return s; } return NOPE; },
      make_pair: function (a) { return new Pair(unref(a[0]), unref(a[1])); }, setprecision: function (a) { return new Manip('setprecision', num(a[0])); }, setw: function (a) { return new Manip('setw', num(a[0])); }, setfill: function (a) { return new Manip('setfill', unref(a[0])); },
      string: function (a) { if (a.length === 2) return new Array(num(a[0]) + 1).join(chs(unref(a[1]))); return a.length ? str(unref(a[0])) : ''; },
      runtime_error: function (a) { return exc('runtime_error', str(unref(a[0]))); }, invalid_argument: function (a) { return exc('invalid_argument', str(unref(a[0]))); }, out_of_range: function (a) { return exc('out_of_range', str(unref(a[0]))); },
      logic_error: function (a) { return exc('logic_error', str(unref(a[0]))); }, overflow_error: function (a) { return exc('overflow_error', str(unref(a[0]))); }, domain_error: function (a) { return exc('domain_error', str(unref(a[0]))); }, exception: function () { return exc('exception', 'std::exception'); }
    };
    function scanf(fmt, args, nodes, env) {
      var ai = 0, cnt = 0, i = 0, started = false;
      function target(k) { var a = args[k]; return a instanceof Ref ? a : K.refOf(nodes[k], env); }
      while (i < fmt.length) {
        var c = fmt.charAt(i);
        if (/\s/.test(c)) { skipWS(); i++; continue; }
        if (c !== '%') { if (IN.s.charAt(IN.i) === c) { IN.i++; i++; continue; } break; }
        var m = /^%(\*?)(\d*)(hh|h|ll|l|L)?([dioufeEgGxsc]|\[[^\]]*\])/.exec(fmt.slice(i));
        if (!m) { if (fmt.charAt(i + 1) === '%') { if (IN.s.charAt(IN.i) === '%') IN.i++; i += 2; continue; } break; }
        i += m[0].length;
        var cv = m[4], sup = !!m[1], w = m[2] ? +m[2] : 0, val = null;
        if (cv === 'c') { var cc = getc(); if (cc < 0) break; val = new Ch(cc); }
        else if (cv.charAt(0) === '[') { var neg = cv.charAt(1) === '^', set = cv.slice(neg ? 2 : 1, -1).replace('\\n', '\n'), st = IN.i; while (IN.i < IN.s.length && (set.indexOf(IN.s.charAt(IN.i)) >= 0) !== neg && (!w || IN.i - st < w)) IN.i++; if (IN.i === st) break; val = IN.s.slice(st, IN.i); }
        else {
          skipWS(); if (atEnd()) { if (!started) return -1; break; }
          var rest = IN.s.slice(IN.i), mm;
          if (cv === 's') mm = /^\S+/.exec(rest);
          else if (/[dui]/.test(cv)) mm = /^[+-]?\d+/.exec(rest);
          else if (cv === 'x') mm = /^[+-]?(0[xX])?[0-9a-fA-F]+/.exec(rest);
          else if (cv === 'o') mm = /^[+-]?[0-7]+/.exec(rest);
          else mm = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(rest);
          if (!mm) break;
          var tk = w ? mm[0].slice(0, w) : mm[0]; IN.i += tk.length;
          val = cv === 's' ? tk : /[dui]/.test(cv) ? parseInt(tk, 10) : cv === 'x' ? parseInt(tk, 16) : cv === 'o' ? parseInt(tk, 8) : dval(parseFloat(tk));
        }
        started = true;
        if (!sup) { if (ai >= args.length) throw RT('scanf has more % codes than variables', 'compile'); var r = target(ai++); r.set(K.coerce(r.t, val, true)); cnt++; }
      }
      return cnt;
    }

    /* ---------- builtin constructors ---------- */
    function Scan(kind, src) { this.__scan = kind; this.src = src || null; this.pos = 0; }
    function construct(n, t, a) {
      switch (n) {
        case 'Scanner': if (a[0] && typeof unref(a[0]) === 'string') return new Scan('str', unref(a[0])); return new Scan('scanner');
        case 'BufferedReader': return new Scan('reader'); case 'InputStreamReader': return { __isr: true };
        case 'StringTokenizer': var s = str(unref(a[0])), dl = a.length > 1 ? str(unref(a[1])) : ' \t\n\r\f'; var toks = []; var cur = ''; for (var i = 0; i < s.length; i++) { if (dl.indexOf(s.charAt(i)) >= 0) { if (cur) toks.push(cur); cur = ''; } else cur += s.charAt(i); } if (cur) toks.push(cur); return { __tok: toks, i: 0 };
        case 'StringBuilder': case 'StringBuffer': return new SB(a.length && !isNumV(unref(a[0])) ? str(unref(a[0])) : '');
        case 'Random': return new Rnd(a.length ? num(a[0]) : 0);
        case 'String': if (a.length && unref(a[0]) instanceof Arr) return unref(a[0]).a.map(chs).join(''); return a.length ? str(unref(a[0])) : '';
        case 'string': if (isCS && a.length === 2) return new Array(num(a[1]) + 1).join(chs(unref(a[0]))); if (isCS && a.length && unref(a[0]) instanceof Arr) return unref(a[0]).a.map(chs).join(''); if (isCpp && a.length === 2) return new Array(num(a[0]) + 1).join(chs(unref(a[1]))); return a.length ? str(unref(a[0])) : '';
        case 'Object': case 'object': var o = new Obj({ n: 'Object', methods: {}, fields: [], ctors: [], props: {} }); return o;
      }
      return NOPE;
    }
    function scanMethod(s, name, a) {
      if (s.__scan === 'str') { var save = IN; IN = { s: s.src, i: s.pos }; try { return scanMethod({ __scan: 'scanner' }, name, a); } finally { s.pos = IN.i; IN = save; } }
      switch (name) {
        case 'nextInt': case 'nextLong': case 'nextShort': case 'nextByte': var t = token(); if (t == null) throw noInput(); if (!/^[+-]?\d+$/.test(t)) { IN.i -= t.length; throw X('input', 'expected a whole number but the input was "' + t + '"'); } return parseInt(t, 10);
        case 'nextDouble': case 'nextFloat': var t2 = token(); if (t2 == null) throw noInput(); if (isNaN(parseFloat(t2)) || !/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t2)) { IN.i -= t2.length; throw X('input', 'expected a number but the input was "' + t2 + '"'); } return dval(parseFloat(t2));
        case 'next': var t3 = token(); if (t3 == null) throw noInput(); return t3;
        case 'nextLine': var l = readLine(); if (l == null) throw noInput('line'); return l;
        case 'nextBoolean': var t4 = token(); if (t4 == null) throw noInput(); if (!/^(true|false)$/i.test(t4)) throw X('input', '"' + t4 + '" is not true/false'); return /^true$/i.test(t4);
        case 'hasNext': return peekTok() != null; case 'hasNextInt': case 'hasNextLong': var p = peekTok(); return p != null && /^[+-]?\d+$/.test(p);
        case 'hasNextDouble': var p2 = peekTok(); return p2 != null && !isNaN(parseFloat(p2)); case 'hasNextLine': return !atEnd();
        case 'readLine': return readLine(); case 'read': return getc(); case 'ready': return !atEnd();
        case 'close': return undefined;
      }
      return NOPE;
    }

    /* ---------- string methods ---------- */
    function sIdx(s, i, what) { if (i < 0 || i >= s.length) throw X('sidx', isJ ? (what || 'index') + ' ' + i + ', length ' + s.length : isCS ? 'Index was outside the bounds of the array.' : 'basic_string::at: __n (which is ' + i + ') >= this->size() (which is ' + s.length + ')'); return i; }
    function mut(nodes, env, rn, val) { if (!rn) throw RT('cannot change this string'); K.refOf(rn, env).set(val); }
    function strMethod(s, name, a, nodes, env, rn) {
      var a0 = unref(a[0]), a1 = unref(a[1]);
      switch (name) {
        case 'length': if (isCS) break; return s.length;
        case 'size': if (!isCpp) break; return s.length;
        case 'charAt': return new Ch(s.charCodeAt(sIdx(s, num(a0))));
        case 'at': return new Ch(s.charCodeAt(sIdx(s, num(a0))));
        case 'codePointAt': return s.charCodeAt(sIdx(s, num(a0)));
        case 'substring': var b = num(a0), e = a.length > 1 ? num(a1) : s.length; if (b < 0 || e > s.length || b > e) throw X('sidx', 'begin ' + b + ', end ' + e + ', length ' + s.length); return s.slice(b, e);
        case 'Substring': var b2 = num(a0), n2 = a.length > 1 ? num(a1) : s.length - b2; if (b2 < 0 || n2 < 0 || b2 + n2 > s.length) throw X('sidx', 'Index and length must refer to a location within the string.'); return s.substr(b2, n2);
        case 'substr': var b3 = num(a0); if (b3 > s.length) throw X('sidx', 'basic_string::substr: __pos (which is ' + b3 + ') > this->size() (which is ' + s.length + ')'); return a.length > 1 ? s.substr(b3, num(a1)) : s.slice(b3);
        case 'indexOf': case 'IndexOf': case 'find': return s.indexOf(a0 instanceof Ch ? chs(a0) : str(a0), a.length > 1 ? num(a1) : 0);
        case 'lastIndexOf': case 'LastIndexOf': case 'rfind': return s.lastIndexOf(a0 instanceof Ch ? chs(a0) : str(a0));
        case 'contains': case 'Contains': return s.indexOf(a0 instanceof Ch ? chs(a0) : str(a0)) >= 0;
        case 'startsWith': case 'StartsWith': return s.indexOf(chs(a0)) === 0; case 'endsWith': case 'EndsWith': var suf = chs(a0); return s.slice(s.length - suf.length) === suf && suf.length <= s.length;
        case 'equals': case 'Equals': return a0 != null && s === (typeof a0 === 'string' ? a0 : null);
        case 'equalsIgnoreCase': return a0 != null && s.toLowerCase() === str(a0).toLowerCase();
        case 'compareTo': var o = str(a0); for (var i = 0; i < Math.min(s.length, o.length); i++) if (s.charCodeAt(i) !== o.charCodeAt(i)) return s.charCodeAt(i) - o.charCodeAt(i); return s.length - o.length;
        case 'compareToIgnoreCase': return strMethod(s.toLowerCase(), 'compareTo', [str(a0).toLowerCase()]);
        case 'CompareTo': case 'compare': var o2 = str(a0); return s < o2 ? -1 : s > o2 ? 1 : 0;
        case 'toUpperCase': case 'ToUpper': case 'ToUpperInvariant': return s.toUpperCase(); case 'toLowerCase': case 'ToLower': case 'ToLowerInvariant': return s.toLowerCase();
        case 'trim': case 'strip': return a.length ? s : s.trim(); case 'Trim': return a.length ? s.replace(new RegExp('^[' + esc(a.map(chs).join('')) + ']+|[' + esc(a.map(chs).join('')) + ']+$', 'g'), '') : s.trim();
        case 'TrimStart': case 'stripLeading': return s.replace(/^\s+/, ''); case 'TrimEnd': case 'stripTrailing': return s.replace(/\s+$/, '');
        case 'isEmpty': return s.length === 0; case 'empty': if (!isCpp) break; return s.length === 0; case 'isBlank': return !s.trim();
        case 'replace': if (isCpp) { var p = num(a0), len = num(a1); mut(nodes, env, rn, s.slice(0, p) + str(unref(a[2])) + s.slice(p + len)); return K.refOf(rn, env).get(); } return s.split(chs(a0)).join(chs(a1));
        case 'Replace': return s.split(chs(a0)).join(chs(a1));
        case 'replaceAll': return s.replace(new RegExp(jre(str(a0)), 'g'), jrep(str(a1))); case 'replaceFirst': return s.replace(new RegExp(jre(str(a0))), jrep(str(a1)));
        case 'matches': return new RegExp('^(?:' + jre(str(a0)) + ')$').test(s);
        case 'split':
          if (isJ) { var parts = s.split(new RegExp(jre(str(a0)))); if (a.length > 1 && num(a1) > 0) { var lim = num(a1), re0 = new RegExp(jre(str(a0)), 'g'), out = [], last = 0, mm; while (out.length < lim - 1 && (mm = re0.exec(s))) { out.push(s.slice(last, mm.index)); last = mm.index + mm[0].length; if (!mm[0].length) re0.lastIndex++; } out.push(s.slice(last)); parts = out; } else { while (parts.length > 1 && parts[parts.length - 1] === '') parts.pop(); if (s === '') parts = ['']; } if (parts.length > 1 && parts[0] === '' && /^\(?\)?$/.test(str(a0))) parts.shift(); return new Arr(parts, { n: 'String' }); }
          break;
        case 'Split':
          var seps = a.filter(function (x) { x = unref(x); return x instanceof Ch || typeof x === 'string' && x !== 'RemoveEmptyEntries' && x !== 'None' && x !== 'TrimEntries'; }).map(function (x) { return chs(unref(x)); });
          if (a.length && unref(a[0]) instanceof Arr) seps = unref(a[0]).a.map(chs);
          var opt = a.map(unref).filter(function (x) { return x === 'RemoveEmptyEntries' || x === 'TrimEntries'; });
          var ps = seps.length ? s.split(new RegExp(seps.map(esc).join('|'))) : s.split(/\s/);
          if (opt.indexOf('TrimEntries') >= 0) ps = ps.map(function (x) { return x.trim(); });
          if (opt.indexOf('RemoveEmptyEntries') >= 0) ps = ps.filter(function (x) { return x !== ''; });
          return new Arr(ps, { n: 'string' });
        case 'toCharArray': case 'ToCharArray': return new Arr(s.split('').map(function (x) { return new Ch(x.charCodeAt(0)); }), { n: 'char' });
        case 'repeat': return new Array(Math.max(0, num(a0)) + 1).join(s); case 'concat': case 'Concat': return s + str(a0);
        case 'hashCode': case 'GetHashCode': var hh = 0; for (var q = 0; q < s.length; q++) hh = (Math.imul(31, hh) + s.charCodeAt(q)) | 0; return hh;
        case 'intern': case 'toString': case 'ToString': case 'c_str': case 'data': case 'Clone': return s;
        case 'chars': throw RT('Java streams (chars()) are outside this teaching subset — loop over s.toCharArray()', 'compile');
        case 'PadLeft': return pad(s, num(a0), false).replace(/^ +/, function (m) { return a.length > 1 ? new Array(m.length + 1).join(chs(a1)) : m; });
        case 'PadRight': return pad(s, num(a0), true).replace(/ +$/, function (m) { return s.length < num(a0) && a.length > 1 ? new Array(m.length + 1).join(chs(a1)) : m; });
        case 'Insert': return s.slice(0, num(a0)) + str(a1) + s.slice(num(a0)); case 'Remove': return a.length > 1 ? s.slice(0, num(a0)) + s.slice(num(a0) + num(a1)) : s.slice(0, num(a0));
        case 'IndexOfAny': for (var x = 0; x < s.length; x++) if (a0.a.some(function (cc) { return chs(cc) === s.charAt(x); })) return x; return -1;
        case 'Count': if (!a.length) return s.length; return s.split('').filter(function (cc) { return K.truthy(K.callFn(a0, [new Ch(cc.charCodeAt(0))])); }).length;
        case 'Reverse': return new Lst(s.split('').reverse().map(function (cc) { return new Ch(cc.charCodeAt(0)); }), 'list', { n: 'char' });
        case 'append': mut(nodes, env, rn, s + (a.length === 2 ? new Array(num(a0) + 1).join(chs(a1)) : str(a0))); return K.refOf(rn, env).get();
        case 'push_back': mut(nodes, env, rn, s + chs(a0)); return undefined; case 'pop_back': mut(nodes, env, rn, s.slice(0, -1)); return undefined;
        case 'insert': if (isCpp) { var pos = a0 instanceof Iter ? a0.i : num(a0); mut(nodes, env, rn, s.slice(0, pos) + (a.length === 3 ? new Array(num(a1) + 1).join(chs(unref(a[2]))) : chs(a1)) + s.slice(pos)); return K.refOf(rn, env).get(); } break;
        case 'erase': if (isCpp) { var ep = a0 instanceof Iter ? a0.i : (a.length ? num(a0) : 0), en = a.length > 1 ? (a1 instanceof Iter ? a1.i - ep : num(a1)) : (a0 instanceof Iter ? 1 : s.length); mut(nodes, env, rn, s.slice(0, ep) + s.slice(ep + en)); return K.refOf(rn, env).get(); } break;
        case 'clear': if (isCpp) { mut(nodes, env, rn, ''); return undefined; } break;
        case 'front': return new Ch(s.charCodeAt(0)); case 'back': return new Ch(s.charCodeAt(s.length - 1));
        case 'begin': return new Iter({ sref: K.refOf(rn, env) }, 0); case 'end': return new Iter({ sref: K.refOf(rn, env) }, s.length);
        case 'compare_s': break;
      }
      return NOPE;
    }
    function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }
    function jre(r) { return r.replace(/\\p\{Punct\}/g, '[!-\\/:-@\\[-`{-~]').replace(/\\p\{Alpha\}/g, '[A-Za-z]').replace(/\\p\{Upper\}/g, '[A-Z]').replace(/\\p\{Lower\}/g, '[a-z]').replace(/\\p\{Digit\}/g, '[0-9]'); }
    function jrep(r) { return r.replace(/\\\$/g, '$$$$'); }

    /* ---------- LINQ-ish (C#) for arrays & lists ---------- */
    function linq(xs, name, a, et) {
      var f = unref(a[0]);
      function pred(x) { return K.truthy(K.callFn(f, [x])); }
      function sel(x) { return f instanceof Fn ? K.callFn(f, [x]) : x; }
      function needAny(v) { if (!v.length) throw X('state', 'Sequence contains no elements'); return v; }
      switch (name) {
        case 'Sum': return sumOf(xs.map(sel)); case 'Average': var v = xs.map(sel); needAny(v); return dval(num(sumOf(v)) / v.length);
        case 'Max': return needAny(xs.map(sel)).reduce(function (m, x) { return K.cmp(x, m) > 0 ? x : m; }); case 'Min': return needAny(xs.map(sel)).reduce(function (m, x) { return K.cmp(x, m) < 0 ? x : m; });
        case 'Count': case 'LongCount': return f ? xs.filter(pred).length : xs.length;
        case 'Where': return lst(xs.filter(pred), et); case 'Select': return lst(xs.map(sel)); case 'ToList': return lst(xs.slice(), et); case 'ToArray': return toArr(xs, et);
        case 'OrderBy': return lst(xs.slice().sort(function (x, y) { return K.cmp(sel(x), sel(y)); }), et); case 'OrderByDescending': return lst(xs.slice().sort(function (x, y) { return K.cmp(sel(y), sel(x)); }), et);
        case 'First': var fl = f ? xs.filter(pred) : xs; return needAny(fl)[0]; case 'FirstOrDefault': var fd = f ? xs.filter(pred) : xs; return fd.length ? fd[0] : K.defaultFor(et);
        case 'Last': var ll = f ? xs.filter(pred) : xs; return needAny(ll)[ll.length - 1]; case 'LastOrDefault': var ld = f ? xs.filter(pred) : xs; return ld.length ? ld[ld.length - 1] : K.defaultFor(et);
        case 'Any': return f ? xs.some(pred) : xs.length > 0; case 'All': return xs.every(pred);
        case 'Contains': return xs.some(function (x) { return K.equals(x, f); });
        case 'Distinct': var seen = {}, o = []; xs.forEach(function (x) { var k = K.key(x); if (!seen[k]) { seen[k] = 1; o.push(x); } }); return lst(o, et);
        case 'Take': return lst(xs.slice(0, num(f)), et); case 'Skip': return lst(xs.slice(num(f)), et);
        case 'Aggregate': if (a.length === 1) { needAny(xs); return xs.slice(1).reduce(function (acc, x) { return K.callFn(f, [acc, x]); }, xs[0]); } return xs.reduce(function (acc, x) { return K.callFn(unref(a[1]), [acc, x]); }, f);
        case 'Concat': return lst(xs.concat(items(f)), et); case 'SequenceEqual': var ys = items(f); return xs.length === ys.length && xs.every(function (x, i) { return K.equals(x, ys[i]); });
        case 'ElementAt': return xs[num(f)];
      }
      return NOPE;
    }

    /* ---------- list methods ---------- */
    function lIdx(l, i, add) { if (i < 0 || i >= l.a.length + (add ? 1 : 0)) throw X('lidx', isJ ? 'Index ' + i + ' out of bounds for length ' + l.a.length : isCS ? 'Index was out of range. Must be non-negative and less than the size of the collection.' : 'vector::_M_range_check: __n (which is ' + i + ') >= this->size() (which is ' + l.a.length + ')'); return i; }
    function empty(l, what) { if (!l.a.length) throw X(isJ && l.kind === 'stack' ? 'eof' : 'state', isJ ? (l.kind === 'stack' ? 'EmptyStackException — the stack is empty' : 'the collection is empty') : isCS ? (l.kind === 'stack' ? 'Stack empty.' : 'Queue empty.') : 'called ' + what + '() on an empty container (undefined behaviour in real C++)'); }
    function cv(l, x) { return K.coerce(l.et, unref(x), isCpp); }
    function listMethod(l, name, a, nodes, env, rn) {
      var a0 = unref(a[0]), a1 = unref(a[1]), k = l.kind, pq = k === 'pq' || k === 'pqmax';
      switch (name) {
        case 'add': case 'offer': case 'addLast': case 'offerLast':
          if (pq) { K.pqPush(l, cv(l, a0)); return true; }
          if (a.length === 2 && name === 'add') { l.a.splice(lIdx(l, num(a0), true), 0, cv(l, a1)); return undefined; } l.a.push(cv(l, a0)); return true;
        case 'Add': case 'Enqueue': case 'push_back': case 'emplace_back': l.a.push(cv(l, a0)); return undefined;
        case 'push': case 'Push': case 'emplace':
          if (pq) { K.pqPush(l, cv(l, a0)); return undefined; }
          if (isJ && (k === 'deque' || k === 'linked')) { l.a.unshift(cv(l, a0)); return a0; } l.a.push(cv(l, a0)); return isJ ? a0 : undefined;
        case 'addFirst': case 'offerFirst': case 'push_front': case 'emplace_front': l.a.unshift(cv(l, a0)); return true;
        case 'AddRange': case 'addAll': items(a0).forEach(function (x) { l.a.push(cv(l, x)); }); return true;
        case 'Insert': l.a.splice(lIdx(l, num(a0), true), 0, cv(l, a1)); return undefined;
        case 'get': return l.a[lIdx(l, num(a0))];
        case 'at': return l.a[lIdx(l, num(a0))];
        case 'set': var old = l.a[lIdx(l, num(a0))]; l.a[num(a0)] = cv(l, a1); return old;
        case 'size': if (isCS) break; return l.a.length;
        case 'isEmpty': case 'empty': return l.a.length === 0;
        case 'clear': case 'Clear': l.a.length = 0; return undefined;
        case 'contains': case 'Contains': return l.a.some(function (x) { return K.equals(x, a0); });
        case 'indexOf': case 'IndexOf': for (var i = 0; i < l.a.length; i++) if (K.equals(l.a[i], a0)) return i; return -1;
        case 'lastIndexOf': case 'LastIndexOf': for (var j = l.a.length - 1; j >= 0; j--) if (K.equals(l.a[j], a0)) return j; return -1;
        case 'remove':
          if (isJ && (k === 'deque' || k === 'linked' || pq) && !a.length) { empty(l, name); return l.a.shift(); }
          if (isJ && typeof a0 === 'number' && !(l.et && /^(Integer|Long)$/.test(l.et.n) && a[0] && false)) { var rv = l.a[lIdx(l, a0)]; l.a.splice(a0, 1); return rv; }
          for (var r = 0; r < l.a.length; r++) if (K.equals(l.a[r], a0)) { l.a.splice(r, 1); return true; } return false;
        case 'Remove': for (var r2 = 0; r2 < l.a.length; r2++) if (K.equals(l.a[r2], a0)) { l.a.splice(r2, 1); return true; } return false;
        case 'RemoveAt': lIdx(l, num(a0)); l.a.splice(num(a0), 1); return undefined;
        case 'RemoveAll': case 'removeIf': var before = l.a.length; l.a = l.a.filter(function (x) { return !K.truthy(K.callFn(a0, [x])); }); return isJ ? before !== l.a.length : before - l.a.length;
        case 'RemoveRange': l.a.splice(num(a0), num(a1)); return undefined;
        case 'pop': case 'Pop':
          empty(l, name);
          if (pq || (isJ && (k === 'deque' || k === 'linked'))) return l.a.shift();
          if (isCpp && k === 'queue') { l.a.shift(); return undefined; }
          var pv = l.a.pop(); return isCpp ? undefined : pv;
        case 'pop_back': empty(l, name); l.a.pop(); return undefined; case 'pop_front': empty(l, name); l.a.shift(); return undefined;
        case 'poll': case 'pollFirst': return l.a.length ? l.a.shift() : null; case 'pollLast': return l.a.length ? l.a.pop() : null;
        case 'removeFirst': empty(l, name); return l.a.shift(); case 'removeLast': empty(l, name); return l.a.pop();
        case 'Dequeue': empty(l, name); return l.a.shift();
        case 'peek': case 'Peek': if (!l.a.length) { if (isJ && k !== 'stack') return null; empty(l, name); } return (k === 'stack') ? l.a[l.a.length - 1] : l.a[0];
        case 'peekFirst': return l.a.length ? l.a[0] : null; case 'peekLast': return l.a.length ? l.a[l.a.length - 1] : null;
        case 'element': case 'getFirst': empty(l, name); return l.a[0]; case 'getLast': empty(l, name); return l.a[l.a.length - 1];
        case 'top': empty(l, name); return pq ? l.a[0] : l.a[l.a.length - 1];
        case 'front': empty(l, name); return l.a[0]; case 'back': empty(l, name); return l.a[l.a.length - 1];
        case 'search': for (var s2 = l.a.length - 1; s2 >= 0; s2--) if (K.equals(l.a[s2], a0)) return l.a.length - s2; return -1;
        case 'sort': l.a.sort(cmpFn(a0 || null)); return undefined; case 'Sort': l.a.sort(cmpFn(a0 instanceof Fn ? a0 : null)); return undefined;
        case 'Reverse': l.a.reverse(); return undefined; case 'reverse': if (!isCpp) { l.a.reverse(); return undefined; } break;
        case 'forEach': case 'ForEach': l.a.slice().forEach(function (x) { K.callFn(a0, [x]); }); return undefined;
        case 'toArray': case 'ToArray': return toArr(l.a, l.et);
        case 'subList': return lst(l.a.slice(num(a0), num(a1)), l.et); case 'GetRange': return lst(l.a.slice(num(a0), num(a0) + num(a1)), l.et);
        case 'Exists': return l.a.some(function (x) { return K.truthy(K.callFn(a0, [x])); }); case 'Find': var fx = l.a.filter(function (x) { return K.truthy(K.callFn(a0, [x])); }); return fx.length ? fx[0] : K.defaultFor(l.et);
        case 'FindAll': return lst(l.a.filter(function (x) { return K.truthy(K.callFn(a0, [x])); }), l.et); case 'FindIndex': for (var f2 = 0; f2 < l.a.length; f2++) if (K.truthy(K.callFn(a0, [l.a[f2]]))) return f2; return -1;
        case 'TrueForAll': return l.a.every(function (x) { return K.truthy(K.callFn(a0, [x])); });
        case 'equals': case 'Equals': return l === a0;
        case 'toString': case 'ToString': return str(l); case 'hashCode': return l.id;
        case 'stream': throw RT('Java streams are outside this teaching subset — use a for-each loop', 'compile');
        case 'begin': return new Iter(l, 0); case 'end': return new Iter(l, l.a.length);
        case 'resize': var n = num(a0); if (l.a.length > n) l.a.length = n; else while (l.a.length < n) l.a.push(a.length > 1 ? K.copyVal(cv(l, a1)) : K.defaultFor(l.et)); return undefined;
        case 'assign': l.a = []; for (var q = 0; q < num(a0); q++) l.a.push(K.copyVal(cv(l, a1))); return undefined;
        case 'reserve': case 'shrink_to_fit': case 'TrimExcess': return undefined; case 'capacity': return l.a.length;
        case 'insert': var at = a0 instanceof Iter ? a0.i : num(a0); if (a.length === 3) { var cnt = num(a1); for (var z = 0; z < cnt; z++) l.a.splice(at, 0, cv(l, unref(a[2]))); return new Iter(l, at); } l.a.splice(at, 0, cv(l, a1)); return new Iter(l, at);
        case 'erase': var ei = a0 instanceof Iter ? a0.i : num(a0), ej = a.length > 1 ? (a1 instanceof Iter ? a1.i : num(a1)) : ei + 1; l.a.splice(ei, ej - ei); return new Iter(l, ei);
        case 'swap': var tmp = l.a; l.a = a0.a; a0.a = tmp; return undefined;
        case 'iterator': throw RT('iterators are outside this teaching subset — use a for-each loop', 'compile');
      }
      if (isCS) { var lq = linq(l.a, name, a, l.et); if (lq !== NOPE) return lq; }
      return NOPE;
    }

    /* ---------- map & set methods ---------- */
    function mapMethod(m, name, a) {
      var a0 = unref(a[0]), a1 = unref(a[1]), e;
      var k0 = K.coerce(m.kt, a0, true);
      switch (name) {
        case 'put': e = K.mget(m, k0); var old = e ? e.v : null; K.mset(m, k0, K.coerce(m.vt, a1, true)); return old;
        case 'get': if (isCS) break; e = K.mget(m, k0); return e ? e.v : null;
        case 'getOrDefault': case 'GetValueOrDefault': e = K.mget(m, k0); return e ? e.v : (a.length > 1 ? a1 : K.defaultFor(m.vt));
        case 'containsKey': case 'ContainsKey': return !!K.mget(m, k0);
        case 'containsValue': case 'ContainsValue': var found = false; m.m.forEach(function (x) { if (K.equals(x.v, a0)) found = true; }); return found;
        case 'remove': case 'Remove': case 'erase': e = K.mget(m, k0); if (e) m.m.delete(K.key(k0)); return isJ ? (e ? e.v : null) : isCS ? !!e : (e ? 1 : 0);
        case 'size': if (isCS) break; return m.m.size; case 'isEmpty': case 'empty': return m.m.size === 0;
        case 'clear': case 'Clear': m.m.clear(); return undefined;
        case 'keySet': case 'navigableKeySet': return new Lst(K.entries(m).map(function (x) { return x.k; }), 'list', m.kt);
        case 'values': return new Lst(K.entries(m).map(function (x) { return x.v; }), 'list', m.vt);
        case 'entrySet': return new Lst(K.entries(m).map(function (x) { var p = new Pair(x.k, x.v, 'entry'); p.ent = x; return p; }), 'list');
        case 'putIfAbsent': case 'TryAdd': e = K.mget(m, k0); if (!e) K.mset(m, k0, a1); return isCS ? !e : (e ? e.v : null);
        case 'Add': if (K.mget(m, k0)) throw X('arg', 'An item with the same key has already been added. Key: ' + str(k0)); K.mset(m, k0, a1); return undefined;
        case 'TryGetValue': e = K.mget(m, k0); if (a[1] instanceof Ref) a[1].set(e ? e.v : K.defaultFor(m.vt)); return !!e;
        case 'merge': e = K.mget(m, k0); K.mset(m, k0, e ? K.callFn(unref(a[2]), [e.v, a1]) : a1); return K.mget(m, k0).v;
        case 'forEach': K.entries(m).forEach(function (x) { K.callFn(a0, [x.k, x.v]); }); return undefined;
        case 'firstKey': var fe = K.entries(m); if (!fe.length) throw X('eof', ''); return fe[0].k; case 'lastKey': var le = K.entries(m); if (!le.length) throw X('eof', ''); return le[le.length - 1].k;
        case 'count': return K.mget(m, k0) ? 1 : 0;
        case 'find': var es = K.entries(m); for (var i = 0; i < es.length; i++) if (K.equals(es[i].k, k0)) return new Iter(m, i); return new Iter(m, es.length);
        case 'begin': return new Iter(m, 0); case 'end': return new Iter(m, m.m.size);
        case 'insert': case 'emplace': var p0 = a0 instanceof Pair ? a0 : a0 instanceof Arr ? new Pair(a0.a[0], a0.a[1]) : new Pair(a0, a1); if (!K.mget(m, p0.a)) { K.mset(m, p0.a, p0.b); return true; } return false;
        case 'at': e = K.mget(m, k0); if (!e) throw X('key', 'map::at'); return e.v;
        case 'toString': case 'ToString': return str(m);
        case 'compute': case 'computeIfAbsent': case 'computeIfPresent': e = K.mget(m, k0); if (name === 'computeIfAbsent') { if (!e) K.mset(m, k0, K.callFn(a1, [k0])); } else if (name === 'computeIfPresent') { if (e) K.mset(m, k0, K.callFn(a1, [k0, e.v])); } else K.mset(m, k0, K.callFn(a1, [k0, e ? e.v : null])); e = K.mget(m, k0); return e ? e.v : null;
      }
      if (isCS) { var lq = linq(K.entries(m).map(function (x) { return new Pair(x.k, x.v, 'kv'); }), name, a, null); if (lq !== NOPE) return lq; }
      return NOPE;
    }
    function setMethod(s, name, a) {
      var a0 = unref(a[0]), k0 = K.coerce(s.et, a0, true);
      switch (name) {
        case 'add': case 'Add': return K.sadd(s, k0);
        case 'insert': case 'emplace': K.sadd(s, k0); return undefined;
        case 'contains': case 'Contains': return s.m.has(K.key(k0)); case 'count': return s.m.has(K.key(k0)) ? 1 : 0;
        case 'remove': case 'Remove': case 'erase': var had = s.m.delete(K.key(k0)); return isCpp ? (had ? 1 : 0) : had;
        case 'size': if (isCS) break; return s.m.size; case 'isEmpty': case 'empty': return s.m.size === 0; case 'clear': case 'Clear': s.m.clear(); return undefined;
        case 'addAll': case 'UnionWith': var ch = false; items(a0).forEach(function (x) { if (K.sadd(s, x)) ch = true; }); return isJ ? ch : undefined;
        case 'retainAll': case 'IntersectWith': var keep = {}; items(a0).forEach(function (x) { keep[K.key(x)] = 1; }); Array.from(s.m.keys()).forEach(function (kk) { if (!keep[kk]) s.m.delete(kk); }); return isJ ? true : undefined;
        case 'removeAll': case 'ExceptWith': items(a0).forEach(function (x) { s.m.delete(K.key(x)); }); return isJ ? true : undefined;
        case 'first': var f = K.entries(s); if (!f.length) throw X('eof', ''); return f[0].k; case 'last': var l = K.entries(s); if (!l.length) throw X('eof', ''); return l[l.length - 1].k;
        case 'find': var es = K.entries(s); for (var i = 0; i < es.length; i++) if (K.equals(es[i].k, k0)) return new Iter(s, i); return new Iter(s, es.length);
        case 'begin': return new Iter(s, 0); case 'end': return new Iter(s, s.m.size);
        case 'toString': case 'ToString': return str(s);
        case 'forEach': K.entries(s).forEach(function (x) { K.callFn(a0, [x.k]); }); return undefined;
      }
      if (isCS) { var lq = linq(K.entries(s).map(function (x) { return x.k; }), name, a, s.et); if (lq !== NOPE) return lq; }
      return NOPE;
    }
    function sbMethod(b, name, a) {
      var a0 = unref(a[0]), a1 = unref(a[1]);
      switch (name) {
        case 'append': case 'Append': b.s += a0 instanceof Arr ? a0.a.map(chs).join('') : str(a0); return b;
        case 'AppendLine': b.s += (a.length ? str(a0) : '') + '\n'; return b;
        case 'toString': case 'ToString': return b.s; case 'length': return b.s.length;
        case 'reverse': b.s = b.s.split('').reverse().join(''); return b;
        case 'insert': case 'Insert': b.s = b.s.slice(0, num(a0)) + str(a1) + b.s.slice(num(a0)); return b;
        case 'charAt': return new Ch(b.s.charCodeAt(sIdx(b.s, num(a0))));
        case 'setCharAt': sIdx(b.s, num(a0)); b.s = b.s.slice(0, num(a0)) + chs(a1) + b.s.slice(num(a0) + 1); return undefined;
        case 'deleteCharAt': sIdx(b.s, num(a0)); b.s = b.s.slice(0, num(a0)) + b.s.slice(num(a0) + 1); return b;
        case 'delete': b.s = b.s.slice(0, num(a0)) + b.s.slice(Math.min(num(a1), b.s.length)); return b;
        case 'Remove': b.s = b.s.slice(0, num(a0)) + b.s.slice(num(a0) + num(a1)); return b;
        case 'replace': b.s = b.s.slice(0, num(a0)) + str(unref(a[2])) + b.s.slice(Math.min(num(a1), b.s.length)); return b;
        case 'Replace': b.s = b.s.split(chs(a0)).join(chs(a1)); return b;
        case 'indexOf': return b.s.indexOf(str(a0)); case 'setLength': b.s = b.s.slice(0, num(a0)); return undefined;
        case 'Clear': b.s = ''; return b; case 'isEmpty': return !b.s.length;
      }
      return NOPE;
    }
    function valMethod(v, name, a) {
      var a0 = unref(a[0]);
      if (v instanceof EnumV) { switch (name) { case 'ordinal': return v.ord; case 'name': case 'toString': case 'ToString': return v.name; case 'compareTo': case 'CompareTo': return v.ord - a0.ord; case 'equals': case 'Equals': return v === a0; case 'hashCode': return v.ord; } return NOPE; }
      if (v instanceof Exc || (v instanceof Obj && v.f.__msg)) {
        var msg = v instanceof Exc ? v.msg : str(v.f.__msg.v);
        switch (name) { case 'getMessage': case 'what': case 'getLocalizedMessage': return msg; case 'toString': case 'ToString': return v instanceof Exc ? str(v) : (isCS ? '' : v.cls.n + ': ') + msg; case 'printStackTrace': K.errw(str(v) + '\n'); return undefined; case 'getClass': return { __cls: v instanceof Exc ? v.cls : v.cls.n }; }
      }
      if (v instanceof Pair) { switch (name) { case 'getKey': return v.a; case 'getValue': return v.b; case 'setValue': var o = v.b; v.b = a0; if (v.ent) v.ent.v = a0; return o; case 'toString': case 'ToString': return str(v); } return NOPE; }
      if (v instanceof Fn) { if (/^(apply|test|accept|get|run|call|compare|applyAsInt|applyAsDouble|applyAsLong|Invoke|invoke)$/.test(name)) return K.callFn(v, a.map(unref)); return NOPE; }
      if (v instanceof Rnd) {
        var r = function () { if (v.seed) { v.seed = (Math.imul(v.seed, 1103515245) + 12345) >>> 0; return (v.seed >>> 1) / 2147483648; } return Math.random(); };
        switch (name) { case 'nextInt': case 'Next': if (!a.length) return Math.floor(r() * 2147483647); if (a.length === 1) return Math.floor(r() * num(a0)); return num(a0) + Math.floor(r() * (num(unref(a[1])) - num(a0))); case 'nextDouble': case 'NextDouble': return dval(r()); case 'nextBoolean': return r() < 0.5; }
        return NOPE;
      }
      if (v && v.__tok) { switch (name) { case 'nextToken': if (v.i >= v.__tok.length) throw X('eof', ''); return v.__tok[v.i++]; case 'hasMoreTokens': case 'hasMoreElements': return v.i < v.__tok.length; case 'countTokens': return v.__tok.length - v.i; } return NOPE; }
      if (v && v.__istream) {
        switch (name) {
          case 'ignore': if (!a.length) { getc(); return v; } var lim = num(a0), dl = a.length > 1 ? chs(unref(a[1])) : null, n = 0; while (!atEnd() && n < lim) { var c = String.fromCharCode(getc()); n++; if (dl && c === dl) break; } return v;
          case 'get': var g = getc(); if (a.length) { var rr = a[0] instanceof Ref ? a[0] : null; if (g < 0) { v.fail = true; return v; } if (rr) rr.set(new Ch(g)); return v; } return g;
          case 'eof': return atEnd(); case 'fail': return !!v.fail; case 'good': return !v.fail && !atEnd(); case 'clear': v.fail = false; return undefined; case 'peek': return atEnd() ? -1 : IN.s.charCodeAt(IN.i);
          case 'tie': case 'sync_with_stdio': return undefined;
        }
        return NOPE;
      }
      if (v && v.__ostream) { switch (name) { case 'precision': K.cout.prec = num(a0); return undefined; case 'setf': case 'unsetf': case 'flush': case 'tie': return v; case 'put': K.out(chs(a0)); return v; case 'write': K.out(str(a0)); return v; } return NOPE; }
      if (v && v.__jout) { var key = 'System.' + (v.err ? 'err.' : 'out.') + name; if (STATIC[key]) return STATIC[key](a); return NOPE; }
      if (v && v.__console) { if (STATIC['Console.' + name]) return STATIC['Console.' + name](a); return NOPE; }
      if (isNumV(v) || typeof v === 'boolean') {
        switch (name) {
          case 'ToString': if (a.length) return csSpec(v, str(a0)); return str(v);
          case 'toString': return str(v); case 'equals': case 'Equals': return K.equals(v, a0) && ((v instanceof D) === (a0 instanceof D) || !isJ);
          case 'compareTo': case 'CompareTo': var x = num(v), y = num(a0); return x < y ? -1 : x > y ? 1 : 0;
          case 'intValue': case 'longValue': return Math.trunc(num(v)); case 'doubleValue': case 'floatValue': return dval(num(v)); case 'charValue': return v;
          case 'hashCode': case 'GetHashCode': return Math.trunc(num(v)); case 'isNaN': return isNaN(num(v));
        }
        if (v instanceof Ch) { var r2 = jChar(name, v); if (r2 !== NOPE) return r2; }
        return NOPE;
      }
      if (v instanceof Obj) { switch (name) { case 'equals': case 'Equals': return v === a0; case 'hashCode': case 'GetHashCode': return v.id; case 'toString': case 'ToString': return str(v); case 'getClass': case 'GetType': return { __cls: v.cls.n, simple: v.cls.n }; } }
      if (v && v.__cls) { if (name === 'getSimpleName' || name === 'getName' || name === 'Name') return v.__cls; }
      if (v instanceof Arr) {
        switch (name) { case 'clone': return toArr(v.a, v.et); case 'length': throw RT('for arrays use arr.length (no brackets)', 'compile'); }
        if (isCS) { if (name === 'Contains' || name === 'Length') { } var lq = linq(v.a, name, a, v.et); if (lq !== NOPE) return lq; if (name === 'GetLength') return num(a0) === 0 ? v.a.length : (v.a[0] ? v.a[0].a.length : 0); }
        return NOPE;
      }
      return NOPE;
    }

    /* ---------- dispatch ---------- */
    function method(v, name, a, nodes, env, rn) {
      v = unref(v);
      if (v && v.__istream && name === 'get' && a.length && !(a[0] instanceof Ref) && nodes && nodes[0]) a = [K.refOf(nodes[0], env)];
      if (typeof v === 'string') return strMethod(v, name, a, nodes, env, rn);
      if (v instanceof Lst) return listMethod(v, name, a, nodes, env, rn);
      if (v instanceof Mp) return mapMethod(v, name, a);
      if (v instanceof St) return setMethod(v, name, a);
      if (v instanceof SB) return sbMethod(v, name, a);
      if (v instanceof Scan) return scanMethod(v, name, a);
      if (v === null || v === undefined) return NOPE;
      return valMethod(v, name, a);
    }
    function field(v, name) {
      v = unref(v);
      if (v instanceof Arr) { if (name === 'length' && isJ) return v.a.length; if (name === 'Length' && isCS) return v.a.length; if (name === 'Rank') return 1; }
      if (typeof v === 'string' && name === 'Length' && isCS) return v.length;
      if (v instanceof Lst && name === 'Count' && isCS) return v.a.length;
      if (v instanceof Mp && isCS) { if (name === 'Count') return v.m.size; if (name === 'Keys') return new Lst(K.entries(v).map(function (e) { return e.k; }), 'list', v.kt); if (name === 'Values') return new Lst(K.entries(v).map(function (e) { return e.v; }), 'list', v.vt); }
      if (v instanceof St && isCS) { if (name === 'Count') return v.m.size; if (name === 'Min') return K.entries(v)[0].k; if (name === 'Max') { var e = K.entries(v); return e[e.length - 1].k; } }
      if (v instanceof SB && name === 'Length') return v.s.length;
      if (v instanceof Pair) { if (name === 'first' || name === 'Key' || name === 'Item1') return v.a; if (name === 'second' || name === 'Value' || name === 'Item2') return v.b; }
      if (v instanceof Iter && (name === 'first' || name === 'second')) { var p = iterGet(v); return p instanceof Pair ? (name === 'first' ? p.a : p.b) : NOPE; }
      if (v instanceof Exc && (name === 'Message' || name === 'message')) return v.msg;
      if (v && v.__console) return null;
      if (v && v.__cls && (name === 'Name')) return v.__cls;
      return NOPE;
    }
    function fieldRef(v, name) {
      if (v instanceof Iter && name === 'second') { var p = iterGet(v); return new Ref(function () { return p.b; }, function (x) { p.b = x; if (p.ent) p.ent.v = x; }, null); }
      if (v instanceof SB && name === 'Length') return new Ref(function () { return v.s.length; }, function (x) { v.s = v.s.slice(0, num(x)); }, null);
      if (v && (v.__console || v.__csout)) return new Ref(function () { return null; }, function () { }, null);
      return null;
    }
    function staticField(q) { if (Object.prototype.hasOwnProperty.call(SFIELD, q)) return SFIELD[q]; if (/^ConsoleColor\./.test(q)) return q.split('.')[1]; return NOPE; }
    function staticFn(q) { var f = STATIC[q]; if (!f) return NOPE; var fn = new Fn([], null, null); fn.native = function (vals) { return f(vals, [], null); }; return fn; }
    function callStatic(q, a, nodes, env) { var f = STATIC[q]; if (f) return f(a, nodes, env); if (/^Console\.(Foreground|Background)Color$/.test(q)) return undefined; return NOPE; }
    function callGlobal(n, a, nodes, env) {
      if (isC && Object.prototype.hasOwnProperty.call(GF, n)) return GF[n](a, nodes, env);
      if (isCS && STATIC['Console.' + n]) return STATIC['Console.' + n](a);
      if (isCS && STATIC['Math.' + n]) return STATIC['Math.' + n](a);
      return NOPE;
    }
    function globalValue(n) { return Object.prototype.hasOwnProperty.call(GVAL, n) ? GVAL[n] : NOPE; }
    function numLimit(t, fnm) {
      var n = t ? t.n : 'int', b = K.INTS[n];
      if (b) { var bits = Math.abs(b), uns = b < 0, mx = uns ? Math.pow(2, bits) - 1 : Math.pow(2, bits - 1) - 1; if (bits === 64) mx = uns ? 18446744073709551615 : 9223372036854775807; if (fnm === 'max') return mx; if (fnm === 'min' || fnm === 'lowest') return uns ? 0 : -mx - 1; return 0; }
      if (fnm === 'max') return dval(1.7976931348623157e308); if (fnm === 'min') return dval(2.2250738585072014e-308); if (fnm === 'lowest') return dval(-1.7976931348623157e308); if (fnm === 'epsilon') return dval(2.220446049250313e-16); if (fnm === 'infinity') return dval(Infinity);
      return dval(0);
    }
    return { method: method, field: field, fieldRef: fieldRef, staticField: staticField, staticFn: staticFn, callStatic: callStatic, callGlobal: callGlobal, globalValue: globalValue, construct: construct,
      csSpec: csSpec, csAlign: csAlign, streamOut: streamOut, streamIn: streamIn, iterGet: iterGet, iterSet: iterSet, numLimit: numLimit, printf: printf };
  };
})();

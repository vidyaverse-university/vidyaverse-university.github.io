/* VidyaVerse v2 — Code Lab teaching interpreter, part 1: lexer + parser for a TEACHING SUBSET of Java, C#, C and C++.
   This is an educational interpreter, not a JVM/.NET/compiler. Serialised into a sandboxed worker: keep it self-contained. */
(function () {
  'use strict';
  var C = window.VV2.Code = window.VV2.Code || {};
  C.eduParse = function eduParse() {
    function CErr(msg, line) { var e = new Error(msg); e.line = line || 0; e.vvCompile = true; return e; }
    function set(s) { var o = Object.create(null); s.split(' ').forEach(function (w) { if (w) o[w] = 1; }); return o; }
    var OPS = ['>>>=', '<<=', '>>=', '>>>', '...', '->', '::', '++', '--', '&&', '||', '==', '!=', '<=', '>=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>', '=>', '??', '?.'];
    var ESC = { n: '\n', t: '\t', r: '\r', '0': '\0', b: '\b', f: '\f', v: '\v', a: '\x07', '\\': '\\', '"': '"', "'": "'", '?': '?' };
    var KW = set('if else while for do switch case default break continue return throw try catch finally new class struct interface enum namespace using import package goto sizeof foreach in is instanceof typeof true false null nullptr NULL this super delete operator template typename record yield');
    var MODS = set('public private protected static final abstract const readonly volatile register extern inline virtual override sealed internal unsafe async transient synchronized constexpr mutable explicit friend partial ref out params in strictfp default');
    var CASTS = set('int long short byte char float double bool boolean string String unsigned signed decimal uint ulong ushort sbyte size_t Integer Double Long Object object');
    var PREC = { '??': 1, '||': 2, '&&': 3, '|': 4, '^': 5, '&': 6, '==': 7, '!=': 7, '<': 8, '>': 8, '<=': 8, '>=': 8, 'instanceof': 8, 'is': 8, '<<': 9, '>>': 9, '>>>': 9, '+': 10, '-': 10, '*': 11, '/': 11, '%': 11 };
    var ASG = set('= += -= *= /= %= &= |= ^= <<= >>= >>>=');
    var NUMQ = /^(0[xX][0-9a-fA-F_']+|0[bB][01_']+|(?:[0-9][0-9_']*)?(?:\.[0-9][0-9_']*|\.(?![A-Za-z_.]))?(?:[eE][+-]?[0-9]+)?)([uUlLfFdDmM]*)/;
    var NUMU = /^(0[xX][0-9a-fA-F_]+|0[bB][01_]+|(?:[0-9][0-9_]*)?(?:\.[0-9][0-9_]*|\.(?![A-Za-z_.]))?(?:[eE][+-]?[0-9]+)?)([uUlLfFdDmM]*)/;

    function escAt(src, j) {
      var c = src.charAt(j + 1);
      if (c === 'u') { return [String.fromCharCode(parseInt(src.substr(j + 2, 4), 16) || 0), j + 6]; }
      if (c === 'x') { var m = /^[0-9a-fA-F]{1,2}/.exec(src.substr(j + 2, 2)); return [String.fromCharCode(parseInt(m ? m[0] : '0', 16)), j + 2 + (m ? m[0].length : 0)]; }
      if (/[0-7]/.test(c) && c !== '0') { var o = /^[0-7]{1,3}/.exec(src.substr(j + 1, 3))[0]; return [String.fromCharCode(parseInt(o, 8)), j + 1 + o.length]; }
      if (ESC[c] != null) return [ESC[c], j + 2];
      return [c, j + 2];
    }
    function unesc(s) { var o = '', i = 0; while (i < s.length) { if (s.charAt(i) === '\\') { var r = escAt(s, i); o += r[0]; i = r[1]; } else o += s.charAt(i++); } return o; }

    /* ---------------- lexer ---------------- */
    function lex(src, lang, defines) {
      var T = [], i = 0, n = src.length, line = 1, bol = true;
      defines = defines || {};
      function push(t, v, ex) { var o = { t: t, v: v, l: line }; if (ex) for (var k in ex) o[k] = ex[k]; T.push(o); bol = false; }
      while (i < n) {
        var c = src.charAt(i);
        if (c === '\n') { line++; i++; bol = true; continue; }
        if (c === ' ' || c === '\t' || c === '\r' || c === '\f' || c === '\v' || c === '\u00a0' || c === '\ufeff') { i++; continue; }
        if (c === '/' && src.charAt(i + 1) === '/') { while (i < n && src.charAt(i) !== '\n') i++; continue; }
        if (c === '/' && src.charAt(i + 1) === '*') { var e = src.indexOf('*/', i + 2); if (e < 0) throw CErr('This /* comment is never closed with */', line); for (var k = i; k < e; k++) if (src.charAt(k) === '\n') line++; i = e + 2; continue; }
        if (c === '#' && bol && lang !== 'java') {
          var st = i, dl = line;
          while (i < n && src.charAt(i) !== '\n') { if (src.charAt(i) === '\\' && src.charAt(i + 1) === '\n') { line++; i += 2; continue; } i++; }
          var dir = src.slice(st, i).replace(/\\\n/g, ' ').trim(), dm = /^#\s*define\s+([A-Za-z_]\w*)(\(?)\s*(.*)$/.exec(dir);
          if (dm) { if (dm[2]) throw CErr('Function-like #define macros are outside this teaching subset — write a real function instead.', dl); defines[dm[1]] = lex(dm[3], lang, defines).slice(0, -1); }
          continue;
        }
        if (c === '"' || ((c === '@' || c === '$') && (src.charAt(i + 1) === '"' || ((src.charAt(i + 1) === '@' || src.charAt(i + 1) === '$') && src.charAt(i + 2) === '"')))) {
          var interp = false, verb = false, sl = line;
          while (src.charAt(i) !== '"') { if (src.charAt(i) === '$') interp = true; else verb = true; i++; }
          if ((interp || verb) && lang !== 'csharp') throw CErr('Unexpected character before a string', line);
          if (!interp && !verb && src.substr(i, 3) === '"""') throw CErr('Text blocks (""") are outside this teaching subset — use normal strings with \\n.', line);
          i++;
          var s = '', raw = '', depth = 0;
          while (true) {
            if (i >= n) throw CErr('This string is never closed — add the closing "', sl);
            var ch = src.charAt(i);
            if (interp) {
              if (ch === '{') { if (depth === 0 && src.charAt(i + 1) === '{') { raw += '{{'; i += 2; continue; } depth++; raw += ch; i++; continue; }
              if (ch === '}') { if (depth === 0 && src.charAt(i + 1) === '}') { raw += '}}'; i += 2; continue; } depth = Math.max(0, depth - 1); raw += ch; i++; continue; }
              if (depth > 0 && ch === '"') { var j2 = i + 1; while (j2 < n && src.charAt(j2) !== '"' && src.charAt(j2) !== '\n') { if (src.charAt(j2) === '\\') j2++; j2++; } raw += src.slice(i, j2 + 1); i = j2 + 1; continue; }
            }
            if (verb) {
              if (ch === '"') { if (src.charAt(i + 1) === '"') { s += '"'; raw += '""'; i += 2; continue; } i++; break; }
              if (ch === '\n') line++;
              s += ch; raw += ch; i++; continue;
            }
            if (ch === '"') { i++; break; }
            if (ch === '\n') throw CErr('This string is never closed — strings must end on the same line with "', sl);
            if (ch === '\\') { if (interp) { raw += ch + src.charAt(i + 1); i += 2; continue; } var r = escAt(src, i); s += r[0]; i = r[1]; continue; }
            if (interp) raw += ch; else s += ch;
            i++;
          }
          if (interp) push('istr', raw, { verb: verb, l: sl }); else push('str', s, { l: sl });
          continue;
        }
        if (c === "'") {
          var j = i + 1, v;
          if (src.charAt(j) === '\\') { var r2 = escAt(src, j); v = r2[0]; j = r2[1]; } else { v = src.charAt(j); j++; }
          if (src.charAt(j) !== "'") throw CErr("A char literal holds exactly one character, like 'a'. For text use double quotes: \"hello\".", line);
          push('chr', v.charCodeAt(0)); i = j + 1; continue;
        }
        if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src.charAt(i + 1)))) {
          var m2 = (lang === 'cpp' ? NUMQ : NUMU).exec(src.slice(i, i + 80));
          var txt = m2[1].replace(/[_']/g, ''), suf = m2[2].toLowerCase(), val, dbl = false;
          if (/^0[xX]/.test(txt)) val = parseInt(txt.slice(2), 16);
          else if (/^0[bB]/.test(txt)) val = parseInt(txt.slice(2), 2);
          else { dbl = /[.eE]/.test(txt) || /[fdm]/.test(suf); val = parseFloat(txt); if (!dbl && /^0[0-7]+$/.test(txt) && lang !== 'csharp') val = parseInt(txt, 8); }
          push('num', val, { d: dbl, f: /f/.test(suf), L: /l/.test(suf) }); i += Math.max(1, m2[0].length); continue;
        }
        if (/[A-Za-z_\u00c0-\uffff]/.test(c)) {
          var j3 = i + 1; while (j3 < n && /[\w$\u00c0-\uffff]/.test(src.charAt(j3))) j3++;
          var w = src.slice(i, j3); i = j3;
          if (defines[w]) { defines[w].forEach(function (tk) { var cp = {}; for (var q in tk) cp[q] = tk[q]; cp.l = line; T.push(cp); }); bol = false; continue; }
          push('id', w); continue;
        }
        var op = null;
        for (var oi = 0; oi < OPS.length; oi++) if (src.substr(i, OPS[oi].length) === OPS[oi]) { op = OPS[oi]; break; }
        if (!op) op = c;
        if (!/[{}()[\];,.<>=+\-*\/%!&|^~?:@#$\\]/.test(op.charAt(0))) throw CErr('Unexpected character "' + c + '"', line);
        push('op', op); i += op.length;
      }
      T.push({ t: 'eof', v: '', l: line });
      return T;
    }

    /* ---------------- parser ---------------- */
    function parse(src, lang) {
      var shared = { classes: {}, enums: {}, aliases: {}, defines: {} };
      var T = lex(src, lang, shared.defines);
      return makeParser(T, lang, shared).program();
    }
    function makeParser(T, lang, sh) {
      var p = 0, muts = [], classes = sh.classes, enums = sh.enums, aliases = sh.aliases;
      function peek(k) { return T[Math.min(p + (k || 0), T.length - 1)]; }
      function next() { var t = T[p]; if (p < T.length - 1) p++; return t; }
      function isOp(v, k) { var t = peek(k); return t.t === 'op' && t.v === v; }
      function isId(v, k) { var t = peek(k); return t.t === 'id' && (v == null || t.v === v); }
      function eatOp(v) { if (isOp(v)) { next(); return true; } return false; }
      function desc(t) { return t.t === 'eof' ? 'the end of the program' : t.t === 'str' || t.t === 'istr' ? 'a string' : t.t === 'chr' ? 'a char' : '"' + t.v + '"'; }
      function expOp(v, what) {
        if (isOp(v)) return next();
        var t = peek();
        if (v === ';') throw CErr('Missing ";" at the end of this line' + (t.t !== 'eof' ? ' (found ' + desc(t) + ' next)' : ''), p > 0 ? T[p - 1].l : t.l);
        throw CErr('Expected "' + v + '"' + (what ? ' ' + what : '') + ' but found ' + desc(t), t.l);
      }
      function expId(what) { var t = peek(); if (t.t === 'id' && !KW[t.v]) { next(); return t.v; } throw CErr('Expected ' + (what || 'a name') + ' but found ' + desc(t), t.l); }
      function save() { return { p: p, m: muts.length }; }
      function restore(s) { while (muts.length > s.m) { var mu = muts.pop(); mu.t.v = mu.v; } p = s.p; }
      function closeAngle() {
        if (isOp('>')) { next(); return true; }
        var t = peek();
        if (t.t === 'op' && (t.v === '>>' || t.v === '>>>' || t.v === '>=' || t.v === '>>=')) { muts.push({ t: t, v: t.v }); t.v = t.v.slice(1); return true; }
        return false;
      }
      function skipMods() { var m = {}; while (isId() && MODS[peek().v] && !(peek().v === 'default' && (isOp(':', 1) || isOp('->', 1)))) { if (peek().v === 'in' && lang !== 'csharp') break; m[next().v] = 1; } if (isOp('@') && isId(null, 1)) { next(); next(); if (isOp('(')) skipParens(); return skipMods(); } return m; }
      function skipParens() { var d = 0; do { if (isOp('(')) d++; else if (isOp(')')) d--; if (peek().t === 'eof') return; next(); } while (d > 0); }
      function skipBraces() { var d = 0; do { if (isOp('{')) d++; else if (isOp('}')) d--; if (peek().t === 'eof') throw CErr('Missing "}"', peek().l); next(); } while (d > 0); }
      function skipTo(v) { while (!isOp(v) && peek().t !== 'eof') next(); next(); }

      function tryType() {
        var s = save(), t = peek();
        if (t.t === 'id' && (t.v === 'struct' || t.v === 'enum') && isId(null, 1) && !isOp('{', 2)) { next(); t = peek(); }
        if (t.t !== 'id' || KW[t.v]) { restore(s); return null; }
        var name = next().v, g = null, dims = 0, ptr = 0, ref = false;
        while (/^(unsigned|signed|long|short)( |$)/.test(name) && isId() && /^(int|long|char|short|double)$/.test(peek().v)) name += ' ' + next().v;
        while (true) {
          if (isOp('::') && isId(null, 1)) { next(); var nn = next().v; name = name === 'std' ? nn : name + '::' + nn; continue; }
          if (isOp('.') && isId(null, 1) && /^[A-Z]/.test(name) && /^[A-Z]/.test(peek(1).v) && !isOp('(', 2) && !(isOp('.', 2))) { next(); name += '.' + next().v; continue; }
          break;
        }
        if (aliases[name]) { var al = aliases[name]; name = al.n; g = al.g; dims = al.dims || 0; }
        if (isOp('<')) {
          var s2 = save(); next(); var args = [], ok = true;
          if (!isOp('>')) {
            while (true) {
              if (isOp('?')) { next(); if (isId('extends') || isId('super')) { next(); tryType(); } args.push({ n: 'Object', dims: 0 }); }
              else { var a = tryType(); if (!a) { ok = false; break; } args.push(a); }
              if (eatOp(',')) continue;
              if (closeAngle()) break;
              ok = false; break;
            }
          } else next();
          if (!ok) { restore(s2); restore(s); return null; }
          g = args;
        }
        while (isOp('[') && isOp(']', 1)) { next(); next(); dims++; }
        if (isOp('?') && lang === 'csharp' && (isId(null, 1) || isOp('[', 1))) next();
        while (isOp('*')) { next(); ptr++; }
        if (isOp('&') || isOp('&&')) { next(); ref = true; }
        if (isId('const')) next();
        return { n: name, g: g, dims: dims, ptr: ptr, ref: ref };
      }
      function isDecl() {
        var s = save(); skipMods();
        var ty = tryType(), ok = false;
        if (ty) {
          var a = peek(), b = peek(1);
          if (a.t === 'id' && !KW[a.v]) ok = (b.t === 'op' && /^(=|;|,|\[|\(|:|\)|\{)$/.test(b.v)) || (b.t === 'id' && b.v === 'in');
          else if (ty.n === 'auto' && isOp('[')) ok = true;
        }
        restore(s); return ok;
      }

      /* ----- expressions ----- */
      function expr() { return assign(); }
      function assign() {
        var left = ternary(), t = peek();
        if (t.t === 'op' && ASG[t.v]) {
          next(); var right = assign();
          if (!/^(id|mem|idx|deref)$/.test(left.k)) throw CErr('The left side of "' + t.v + '" must be a variable, array element or field', t.l);
          return { k: 'asg', op: t.v, t: left, v: right, l: t.l };
        }
        return left;
      }
      function ternary() {
        var c = binary(1);
        if (isOp('?')) { var l = next().l; var a = assign(); expOp(':', 'in the ?: expression'); var b = assign(); return { k: 'cond', c: c, a: a, b: b, l: l }; }
        return c;
      }
      function binary(min) {
        var left = unary();
        while (true) {
          var t = peek(), op = t.t === 'op' ? t.v : (t.t === 'id' && (t.v === 'instanceof' || (t.v === 'is' && lang === 'csharp')) ? t.v : null);
          var pr = op != null ? PREC[op] : undefined;
          if (pr === undefined || pr < min) break;
          next();
          if (op === 'instanceof' || op === 'is') { var ty = tryType(); if (!ty) throw CErr('Expected a type after ' + op, t.l); var bn = isId() && !KW[peek().v] ? next().v : null; left = { k: 'inst', e: left, type: ty, bind: bn, l: t.l }; continue; }
          var right = binary(pr + 1);
          left = (op === '&&' || op === '||' || op === '??') ? { k: 'log', op: op, a: left, b: right, l: t.l } : { k: 'bin', op: op, a: left, b: right, l: t.l };
        }
        return left;
      }
      function unary() {
        var t = peek(), l = t.l;
        if (t.t === 'op') {
          if (t.v === '!' || t.v === '-' || t.v === '+' || t.v === '~') { next(); return { k: 'un', op: t.v, e: unary(), l: l }; }
          if (t.v === '++' || t.v === '--') { next(); return { k: 'pre', op: t.v, e: unary(), l: l }; }
          if (t.v === '&') { next(); return { k: 'addr', e: unary(), l: l }; }
          if (t.v === '*') { next(); return { k: 'deref', e: unary(), l: l }; }
          if (t.v === '(' && isId(null, 1) && (CASTS[peek(1).v] || aliases[peek(1).v])) {
            var s = save(); next(); var ty = tryType();
            if (ty && isOp(')') && !(isOp('->', 1) || isOp('=>', 1))) { next(); if (!(isOp(')') || isOp(';') || isOp(',') || (peek().t === 'op' && PREC[peek().v] && !/^[-+]$/.test(peek().v)))) return { k: 'cast', type: ty, e: unary(), l: l }; }
            restore(s);
          }
        }
        if (t.t === 'id' && t.v === 'sizeof') {
          next(); expOp('('); var s3 = save(), ty2 = tryType(), r;
          if (ty2 && isOp(')') && (CASTS[ty2.n] || aliases[ty2.n] || classes[ty2.n] || ty2.ptr || /^(int|long|short|char|float|double|bool|unsigned|signed|size_t|long long)( |$)/.test(ty2.n))) r = { k: 'sizeof', type: ty2, l: l }; else { restore(s3); r = { k: 'sizeof', e: expr(), l: l }; }
          expOp(')'); return r;
        }
        if (t.t === 'id' && t.v === 'delete' && lang === 'cpp') { next(); if (isOp('[')) { next(); expOp(']'); } return { k: 'nop', e: unary(), l: l }; }
        if (t.t === 'id' && t.v === 'await') { next(); return unary(); }
        return postfix(primary());
      }
      function args(close) {
        var a = [];
        if (isOp(close)) { next(); return a; }
        do {
          var l = peek().l;
          if (isId('out') && lang === 'csharp') { next(); var s = save(), ty = tryType(); if (ty && isId() && (isOp(',', 1) || isOp(')', 1))) { a.push({ k: 'out', decl: { type: ty, n: next().v }, l: l }); } else { restore(s); a.push({ k: 'out', e: unary(), l: l }); } continue; }
          if (isId('ref') && lang === 'csharp') { next(); a.push({ k: 'ref', e: unary(), l: l }); continue; }
          if (isId() && isOp(':', 1) && lang === 'csharp') { next(); next(); }
          a.push(expr());
        } while (eatOp(','));
        expOp(close, 'to close the argument list');
        return a;
      }
      function isLambdaParen() {
        var d = 0, j = p;
        for (; j < T.length; j++) { var t = T[j]; if (t.t === 'eof') return false; if (t.t === 'op') { if (t.v === '(') d++; else if (t.v === ')') { d--; if (d === 0) break; } } }
        var a = T[j + 1]; return !!a && a.t === 'op' && ((a.v === '->' && lang === 'java') || (a.v === '=>' && lang === 'csharp'));
      }
      function lamParams() {
        expOp('('); var ps = [];
        if (!isOp(')')) do { skipMods(); var s = save(), ty = tryType(); if (ty && isId()) ps.push(next().v); else { restore(s); ps.push(expId('a parameter name')); } } while (eatOp(','));
        expOp(')'); return ps;
      }
      function lamBody() { if (isOp('{')) return block(); return expr(); }
      function primary() {
        var t = peek(), l = t.l;
        switch (t.t) {
          case 'num': next(); return { k: 'num', v: t.v, d: !!t.d, f: !!t.f, L: !!t.L, l: l };
          case 'str': next(); var s = t.v; while (peek().t === 'str' && (lang === 'c' || lang === 'cpp')) s += next().v; return { k: 'str', v: s, l: l };
          case 'chr': next(); return { k: 'chr', v: t.v, l: l };
          case 'istr': next(); return interp(t.v, t.verb, l);
          case 'eof': throw CErr('The program ended in the middle of an expression', l);
        }
        if (t.t === 'op') {
          if (t.v === '(') {
            if (isLambdaParen()) { var ps = lamParams(); next(); return { k: 'lam', ps: ps, body: lamBody(), l: l }; }
            next(); var e = expr(); expOp(')', 'to close the bracket'); return e;
          }
          if (t.v === '{') return arrInit();
          if (t.v === '[') {
            if (lang === 'cpp') { while (!isOp(']')) next(); next(); var ps2 = isOp('(') ? lamParams() : []; while (isId('mutable') || isId('noexcept')) next(); if (eatOp('->')) tryType(); return { k: 'lam', ps: ps2, body: block(), l: l }; }
            next(); var items = []; if (!isOp(']')) do { items.push(expr()); } while (eatOp(',')); expOp(']'); return { k: 'arr', items: items, l: l };
          }
          throw CErr('Unexpected ' + desc(t) + ' in an expression', l);
        }
        var w = t.v;
        if (w === 'true' || w === 'false') { next(); return { k: 'bool', v: w === 'true', l: l }; }
        if (w === 'null' || w === 'nullptr' || w === 'NULL') { next(); return { k: 'null', l: l }; }
        if (w === 'this') { next(); return { k: 'this', l: l }; }
        if (w === 'super' || w === 'base') { next(); return { k: 'super', l: l }; }
        if (w === 'new') return parseNew();
        if (w === 'typeof' || w === 'nameof') { next(); expOp('('); var e2 = expr(); expOp(')'); return { k: 'str', v: e2.n || 'expr', l: l }; }
        if (w === 'default' && lang === 'csharp') { next(); if (eatOp('(')) { var dt = tryType(); expOp(')'); return { k: 'dflt', type: dt, l: l }; } return { k: 'null', l: l }; }
        if (lang === 'cpp' && isOp('<', 1) && /^(vector|pair|map|set|unordered_map|unordered_set|greater|less|numeric_limits|priority_queue|stack|queue|deque|array|list)$/.test(w)) {
          var ts = save(), tty = tryType();
          if (tty) {
            if (w === 'numeric_limits' && isOp('::')) { next(); var fnm = expId('max or min'); expOp('('); expOp(')'); return { k: 'numlim', type: tty.g ? tty.g[0] : null, n: fnm, l: l }; }
            if (isOp('(')) { next(); var ta = args(')'); return { k: 'new', type: tty, dims: [], a: ta, init: null, l: l }; }
            if (isOp('{')) return { k: 'new', type: tty, dims: [], a: [], init: arrInit(), l: l };
          }
          restore(ts);
        }
        if (KW[w] && w !== 'in') throw CErr('"' + w + '" cannot be used here', l);
        next();
        if ((isOp('->') && lang === 'java') || (isOp('=>') && lang === 'csharp')) { next(); return { k: 'lam', ps: [w], body: lamBody(), l: l }; }
        return { k: 'id', n: w, l: l };
      }
      function postfix(e) {
        while (true) {
          var t = peek(), l = t.l;
          if (t.t !== 'op') break;
          if (t.v === '.' || t.v === '->' || t.v === '::' || t.v === '?.') {
            next(); if (isOp('<')) { next(); while (!closeAngle()) next(); }
            var nm = peek(); if (nm.t !== 'id') throw CErr('Expected a member name after "' + t.v + '"', l); next();
            e = { k: 'mem', o: e, n: nm.v, op: t.v, l: l }; continue;
          }
          if (t.v === '(') { next(); e = { k: 'call', f: e, a: args(')'), l: l }; continue; }
          if (t.v === '[') { next(); var i = expr(); expOp(']'); e = { k: 'idx', o: e, i: i, l: l }; continue; }
          if (t.v === '++' || t.v === '--') { next(); e = { k: 'post', op: t.v, e: e, l: l }; continue; }
          if (t.v === '!' && lang === 'csharp' && (isOp('.', 1) || isOp(';', 1) || isOp(')', 1))) { next(); continue; }
          break;
        }
        return e;
      }
      function arrInit() {
        var l = expOp('{').l, items = [];
        while (!isOp('}')) { if (isOp('[') && lang === 'csharp') { next(); var key = expr(); expOp(']'); expOp('='); items.push({ k: 'kv', key: key, v: expr(), l: l }); } else if (isOp('.') && isId(null, 1) && isOp('=', 2)) { next(); next(); next(); items.push(isOp('{') ? arrInit() : expr()); } else items.push(isOp('{') ? arrInit() : expr()); if (!eatOp(',')) break; }
        expOp('}', 'to close the { … } list');
        return { k: 'arr', items: items, l: l };
      }
      function parseNew() {
        var l = next().l;
        if (isOp('[')) { next(); expOp(']'); return { k: 'new', type: { n: 'var', dims: 1 }, dims: [null], init: arrInit(), a: [], l: l }; }
        if (isOp('{') && lang === 'csharp') { skipBraces(); throw CErr('Anonymous objects (new { … }) are outside this teaching subset', l); }
        if (isOp('(')) { next(); var ta0 = args(')'); return { k: 'new', type: null, dims: [], a: ta0, init: isOp('{') ? arrInit() : null, l: l }; }
        var s = save(), ty = tryType();
        if (!ty) { restore(s); throw CErr('Expected a type after "new"', l); }
        var dims = [];
        for (var k = 0; k < ty.dims; k++) dims.push(null);
        while (isOp('[')) { next(); if (isOp(']')) { next(); dims.push(null); } else { dims.push(expr()); expOp(']'); } }
        var init = null, a = [];
        if (dims.length) { ty = { n: ty.n, g: ty.g, dims: dims.length }; if (isOp('{')) init = arrInit(); return { k: 'new', type: ty, dims: dims, init: init, a: a, l: l }; }
        if (isOp('(')) { next(); a = args(')'); }
        if (isOp('{')) { if (classes[ty.n] && lang === 'java') throw CErr('Anonymous classes are outside this teaching subset', l); init = arrInit(); }
        return { k: 'new', type: ty, dims: [], init: init, a: a, l: l };
      }
      function interp(raw, verb, l) {
        var parts = [], i = 0, lit = '';
        while (i < raw.length) {
          var c = raw.charAt(i);
          if (c === '{' && raw.charAt(i + 1) === '{') { lit += '{'; i += 2; continue; }
          if (c === '}' && raw.charAt(i + 1) === '}') { lit += '}'; i += 2; continue; }
          if (c === '{') {
            var d = 1, j = i + 1, inS = false;
            while (j < raw.length) { var ch = raw.charAt(j); if (inS) { if (ch === '\\') j++; else if (ch === '"') inS = false; } else if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } j++; }
            var inner = raw.slice(i + 1, j), fmt = null, align = null, dep = 0, cut = -1, acut = -1;
            i = j + 1;
            for (var k = 0; k < inner.length; k++) {
              var x = inner.charAt(k);
              if (x === '"') { var q = inner.indexOf('"', k + 1); k = q < 0 ? inner.length : q; continue; }
              if (x === '(' || x === '[') dep++; else if (x === ')' || x === ']') dep--;
              else if (dep === 0 && x === ':' && inner.charAt(k + 1) !== ':' && inner.charAt(k - 1) !== ':') { cut = k; break; }
              else if (dep === 0 && x === ',' && acut < 0) acut = k;
            }
            var es = inner;
            if (cut >= 0) { fmt = inner.slice(cut + 1); es = inner.slice(0, cut); }
            if (acut >= 0 && (cut < 0 || acut < cut)) { align = parseInt(es.slice(acut + 1), 10); es = es.slice(0, acut); }
            if (lit) { parts.push(lit); lit = ''; }
            var sub = lex(es, lang, sh.defines); sub.forEach(function (tk) { tk.l = l; });
            var sp = makeParser(sub, lang, sh), ex = sp.exprOnly();
            parts.push({ e: ex, fmt: fmt, align: align });
            continue;
          }
          if (!verb && c === '\\') { var r = escAt(raw, i); lit += r[0]; i = r[1]; continue; }
          lit += c; i++;
        }
        if (lit) parts.push(lit);
        return { k: 'istr', parts: parts, l: l };
      }

      /* ----- statements ----- */
      function block() {
        var l = expOp('{').l, b = [];
        while (!isOp('}')) { if (peek().t === 'eof') throw CErr('Missing "}" — a { opened on line ' + l + ' is never closed', l); b.push(stmt()); }
        next(); return { k: 'block', b: b, l: l };
      }
      function declRest(ty, mods, l) {
        var items = [];
        do {
          var l2 = peek().l, nm = expId('a variable name'), dims = [], init = null, ctor = null;
          while (isOp('[')) { next(); if (isOp(']')) { next(); dims.push(null); } else { dims.push(expr()); expOp(']'); } }
          if (eatOp('=')) init = isOp('{') ? arrInit() : expr();
          else if (isOp('(') && (lang === 'cpp' || lang === 'c')) { next(); ctor = args(')'); }
          else if (isOp('{') && lang === 'cpp') init = arrInit();
          items.push({ n: nm, dims: dims, init: init, ctor: ctor, l: l2 });
        } while (eatOp(','));
        return { k: 'decl', type: ty, items: items, mods: mods, l: l };
      }
      function declStmt() {
        var l = peek().l, mods = skipMods(), ty = tryType();
        if (ty.n === 'auto' && isOp('[')) { next(); var names = []; do { names.push(expId()); } while (eatOp(',')); expOp(']'); expOp('='); return { k: 'bind', names: names, e: expr(), l: l }; }
        return declRest(ty, mods, l);
      }
      function exprList() { var es = [expr()]; while (eatOp(',')) es.push(expr()); return es; }
      function cond() { expOp('(', 'before the condition'); var c = expr(); expOp(')', 'after the condition'); return c; }
      function stmt() {
        var t = peek(), l = t.l;
        if (isOp('{')) return block();
        if (isOp(';')) { next(); return { k: 'empty', l: l }; }
        if (t.t === 'id') {
          if (isOp(':', 1) && !KW[t.v] && !MODS[t.v]) { next(); next(); var ls = stmt(); ls.label = t.v; return ls; }
          switch (t.v) {
            case 'if': next(); var c = cond(), th = stmt(), el = null; if (isId('else')) { next(); el = stmt(); } return { k: 'if', c: c, t: th, f: el, l: l };
            case 'while': next(); var wc = cond(); return { k: 'while', c: wc, b: stmt(), l: l };
            case 'do': next(); var db = stmt(); if (!isId('while')) throw CErr('Expected "while (…);" after the do { … } block', peek().l); next(); var dc = cond(); expOp(';'); return { k: 'do', b: db, c: dc, l: l };
            case 'for': return forStmt();
            case 'foreach': next(); expOp('('); skipMods(); var fty = tryType(); var fn = expId('a loop variable'); if (!isId('in')) throw CErr('Expected "in" in foreach (var x in collection)', peek().l); next(); var fc = expr(); expOp(')'); return { k: 'each', type: fty, n: fn, coll: fc, b: stmt(), l: l };
            case 'switch': return switchStmt();
            case 'break': next(); var bl = isId() ? next().v : null; expOp(';'); return { k: 'break', label: bl, l: l };
            case 'continue': next(); var cl = isId() ? next().v : null; expOp(';'); return { k: 'cont', label: cl, l: l };
            case 'return': next(); var re = isOp(';') ? null : expr(); expOp(';'); return { k: 'ret', e: re, l: l };
            case 'throw': next(); var te = isOp(';') ? null : expr(); expOp(';'); return { k: 'throw', e: te, l: l };
            case 'try': return tryStmt();
            case 'yield': throw CErr('yield is outside this teaching subset', l);
            case 'goto': throw CErr('goto is outside this teaching subset (and best avoided anyway!)', l);
            case 'using':
              if (lang === 'csharp' && isOp('(', 1)) { next(); next(); var ud = isDecl() ? declStmt() : { k: 'expr', e: expr(), l: l }; expOp(')'); return { k: 'block', b: [ud, stmt()], l: l }; }
              if (lang === 'csharp' && isId('var', 1)) { next(); var ud2 = declStmt(); expOp(';'); return ud2; }
              skipTo(';'); return { k: 'empty', l: l };
            case 'typedef': next(); var tt = tryType(), tn = expId(); aliases[tn] = tt; expOp(';'); return { k: 'empty', l: l };
            case 'class': case 'struct': case 'interface': case 'enum': case 'record': throw CErr('Declare classes, structs and enums outside of methods in this teaching subset', l);
          }
        }
        if (isDecl()) { var d = declStmt(); expOp(';'); return d; }
        var e = expr(); expOp(';');
        return { k: 'expr', e: e, l: l };
      }
      function forStmt() {
        var l = next().l; expOp('(');
        var s0 = save(); skipMods(); var fty = tryType();
        if (fty) {
          if (fty.n === 'auto' && isOp('[')) { next(); var names = []; do { names.push(expId()); } while (eatOp(',')); expOp(']'); expOp(':'); var coll = expr(); expOp(')'); return { k: 'each', type: fty, names: names, coll: coll, b: stmt(), l: l }; }
          if (isId() && isOp(':', 1)) { var en = next().v; next(); var ec = expr(); expOp(')'); return { k: 'each', type: fty, n: en, coll: ec, b: stmt(), l: l }; }
        }
        restore(s0);
        var init = null;
        if (!isOp(';')) init = isDecl() ? declStmt() : { k: 'exprs', es: exprList(), l: l };
        expOp(';'); var c = isOp(';') ? null : expr(); expOp(';');
        var u = isOp(')') ? [] : exprList(); expOp(')', 'to close the for (…)');
        return { k: 'for', init: init, c: c, u: u, b: stmt(), l: l };
      }
      function switchStmt() {
        var l = next().l, e = cond(), cases = [], cur = null;
        expOp('{');
        while (!isOp('}')) {
          if (peek().t === 'eof') throw CErr('Missing "}" for the switch on line ' + l, l);
          if (isId('case') || (isId('default') && (isOp(':', 1) || isOp('->', 1)))) {
            var isDef = peek().v === 'default'; next(); var tests = null;
            if (!isDef) { tests = []; do { if (isId('default')) { next(); isDef = true; } else tests.push(ternary()); } while (eatOp(',')); if (isDef) tests = null; }
            if (isOp('->')) {
              next(); var body;
              if (isOp('{')) body = [block()]; else if (isId('throw')) body = [stmt()]; else { var ae = expr(); expOp(';'); body = [{ k: 'expr', e: ae, l: ae.l }]; }
              cases.push({ tests: tests, body: body, arrow: true }); cur = null; continue;
            }
            expOp(':', 'after the case value');
            if (cur && !cur.body.length) { if (tests && cur.tests) { cur.tests = cur.tests.concat(tests); continue; } }
            cur = { tests: tests, body: [] }; cases.push(cur); continue;
          }
          if (!cur) throw CErr('Statements in a switch must come after a "case …:" label', peek().l);
          cur.body.push(stmt());
        }
        next();
        return { k: 'switch', e: e, cases: cases, l: l };
      }
      function tryStmt() {
        var l = next().l, res = null;
        if (isOp('(')) { next(); res = declStmt(); eatOp(';'); expOp(')'); }
        var b = block(), cs = [], fin = null;
        while (isId('catch')) {
          next(); var ty = null, nm = null;
          if (eatOp('(')) { if (isOp('...')) { next(); ty = { n: '...' }; } else { skipMods(); ty = tryType(); while (eatOp('|')) tryType(); if (isId()) nm = next().v; } expOp(')'); }
          if (isId('when')) { next(); cond(); }
          cs.push({ type: ty, n: nm, b: block() });
        }
        if (isId('finally')) { next(); fin = block(); }
        if (!cs.length && !fin) throw CErr('A try block needs a catch or finally', l);
        if (res) b = { k: 'block', b: [res, b], l: l };
        return { k: 'try', b: b, cs: cs, fin: fin, l: l };
      }

      /* ----- functions, classes, program ----- */
      function funcRest(ty, name, mods, l, cls) {
        expOp('(', 'to start the parameter list'); var params = [];
        if (!isOp(')')) {
          if (isId('void') && isOp(')', 1)) next();
          else do {
            var pm = skipMods(), pt = tryType();
            if (!pt) throw CErr('Expected a parameter type in ' + name + '(…)', peek().l);
            var va = false; if (eatOp('...')) va = true;
            var pn = isId() && !KW[peek().v] ? next().v : '_p' + params.length;
            while (isOp('[')) { next(); if (!isOp(']')) expr(); expOp(']'); pt = { n: pt.n, g: pt.g, dims: (pt.dims || 0) + 1, ptr: pt.ptr, ref: pt.ref }; }
            var def = null; if (eatOp('=')) def = expr();
            params.push({ n: pn, type: pt, ref: !!(pm.ref || pm.out || pt.ref), out: !!pm.out, va: va || !!pm.params, def: def });
          } while (eatOp(','));
        }
        expOp(')', 'to close the parameter list');
        while (isId('const') || isId('override') || isId('noexcept') || isId('final')) next();
        if (isId('throws')) { next(); do { tryType(); } while (eatOp(',')); }
        var body = null, inits = null;
        if (isOp(':') && cls) { next(); inits = []; do { var iname = expId('a field to initialise'); var ia; if (isOp('{')) { var ai = arrInit(); ia = ai.items; } else { expOp('('); ia = args(')'); } inits.push({ n: iname, a: ia }); } while (eatOp(',')); }
        if (isOp('{')) body = block();
        else if (isOp('=>')) { next(); var e = expr(); expOp(';'); body = { k: 'block', b: [{ k: 'ret', e: e, l: e.l, eb: true }], l: e.l }; }
        else if (isOp(';')) next();
        else if (isOp('=')) { next(); next(); expOp(';'); }
        else throw CErr('Expected "{" to start the body of ' + name + '()', peek().l);
        return { k: 'fn', n: name, ret: ty, params: params, body: body, inits: inits, mods: mods, isStatic: !!mods['static'], l: l, cls: cls ? cls.n : null };
      }
      function addMethod(cls, fn) { (cls.methods[fn.n] = cls.methods[fn.n] || []).push(fn); }
      function parseEnum(name, l) {
        if (eatOp(':')) tryType();
        expOp('{'); var vals = [], v = 0;
        while (!isOp('}') && !isOp(';')) {
          skipMods(); var en = expId('an enum value');
          if (eatOp('=')) { var ex = expr(); if (ex.k === 'num') v = ex.v; else if (ex.k === 'un' && ex.op === '-' && ex.e.k === 'num') v = -ex.e.v; else if (ex.k === 'chr') v = ex.v; }
          if (isOp('(')) throw CErr('Enums with constructors are outside this teaching subset', peek().l);
          vals.push({ n: en, v: v }); v++;
          if (!eatOp(',')) break;
        }
        if (isOp(';')) throw CErr('Enums with fields or methods are outside this teaching subset', peek().l);
        expOp('}'); eatOp(';');
        enums[name] = { n: name, vals: vals, l: l };
      }
      function parseClass(kind, mods) {
        var l = next().l, name = expId('a class name');
        if (kind === 'enum') { parseEnum(name, l); return; }
        if (kind === 'record') throw CErr('Records are outside this teaching subset — use a class with fields', l);
        if (isOp('<')) { var d0 = 0; do { if (isOp('<')) d0++; else if (isOp('>')) d0--; else if (isOp('>>')) d0 -= 2; next(); } while (d0 > 0 && peek().t !== 'eof'); }
        var base = null, ifaces = [];
        if (isId('extends')) { next(); var bt0 = tryType(); if (kind === 'interface') ifaces.push(bt0.n); else base = bt0.n; while (eatOp(',')) ifaces.push(tryType().n); }
        if (isId('implements')) { next(); do { ifaces.push(tryType().n); } while (eatOp(',')); }
        if (eatOp(':')) { do { skipMods(); var bt = tryType(); if (!base && (lang === 'cpp' || !/^I[A-Z]/.test(bt.n)) && !(classes[bt.n] && classes[bt.n].kind === 'interface')) base = bt.n; else ifaces.push(bt.n); } while (eatOp(',')); }
        while (isId('where')) { while (!isOp('{')) next(); }
        var cls = { n: name, base: base, ifaces: ifaces, fields: [], methods: {}, ctors: [], props: {}, kind: kind, l: l, statics: [] };
        if (isOp(';')) { next(); classes[name] = classes[name] || cls; return; }
        classes[name] = cls;
        expOp('{', 'to start the body of ' + kind + ' ' + name);
        while (!isOp('}')) {
          if (peek().t === 'eof') throw CErr('Missing "}" to close ' + kind + ' ' + name + ' (opened on line ' + l + ')', l);
          if (eatOp(';')) continue;
          if (isId() && /^(public|private|protected)$/.test(peek().v) && isOp(':', 1)) { next(); next(); continue; }
          var ms = skipMods();
          if (isId('class') || isId('struct') || isId('interface') || isId('enum') || isId('record')) { parseClass(peek().v, ms); continue; }
          if (ms['static'] && isOp('{')) { cls.statics.push(block()); continue; }
          if (isOp('{') && lang === 'java') { cls.statics.push(block()); continue; }
          if (isOp('~')) { next(); expId(); funcRest({ n: 'void' }, '~', ms, peek().l, cls); continue; }
          if (isId(name) && isOp('(', 1)) { var cl = next().l, cf = funcRest({ n: 'void' }, name, ms, cl, cls); cf.ctor = true; cls.ctors.push(cf); continue; }
          var ty = tryType();
          if (!ty) throw CErr('Unexpected ' + desc(peek()) + ' inside ' + kind + ' ' + name, peek().l);
          if (isId('operator')) throw CErr('Operator overloading is outside this teaching subset', peek().l);
          var ml = peek().l, nm = expId('a member name');
          if (isOp('(')) { var fn = funcRest(ty, nm, ms, ml, cls); if (kind === 'interface' && !fn.body) fn.abstract = true; addMethod(cls, fn); continue; }
          if (isOp('{') && lang === 'csharp') { skipBraces(); var pinit = null; if (eatOp('=')) { pinit = isOp('{') ? arrInit() : expr(); expOp(';'); } cls.fields.push({ n: nm, type: ty, init: pinit, dims: [], isStatic: !!ms['static'], l: ml }); continue; }
          if (isOp('=>') && lang === 'csharp') { next(); cls.props[nm] = expr(); expOp(';'); continue; }
          p--;
          var dcl = declRest(ty, ms, ml); expOp(';');
          dcl.items.forEach(function (it) { cls.fields.push({ n: it.n, type: ty, init: it.init, dims: it.dims, ctor: it.ctor, isStatic: !!ms['static'] || (!!ms['const'] && lang === 'csharp'), l: it.l }); });
        }
        next(); eatOp(';');
      }
      function program() {
        var prog = { fns: {}, classes: classes, enums: enums, globals: [], top: [], lang: lang }, ns = 0;
        while (peek().t !== 'eof') {
          var t = peek();
          if (isOp('}') && ns > 0) { next(); ns--; continue; }
          if (eatOp(';')) continue;
          if (isId('import') || isId('package')) { skipTo(';'); continue; }
          if (isId('using')) {
            if (lang === 'csharp' && (isOp('(', 1) || isId('var', 1))) { prog.top.push(stmt()); continue; }
            if (lang === 'cpp' && isId(null, 1) && isOp('=', 2)) { next(); var an = next().v; next(); aliases[an] = tryType(); expOp(';'); continue; }
            if (lang === 'csharp' && isId('static', 1)) prog.staticUsing = true;
            skipTo(';'); continue;
          }
          if (isId('namespace')) { next(); while (isId() || isOp('.') || isOp('::')) next(); if (eatOp('{')) ns++; else expOp(';'); continue; }
          if (isId('typedef')) { next(); var tt; if (isId('struct') && (isOp('{', 1) || isOp('{', 2))) { next(); var sn = isId() ? next().v : '_anon'; p--; T[p] = { t: 'id', v: sn, l: T[p].l }; p--; T[p] = { t: 'id', v: 'struct', l: T[p].l }; parseClassAt(); tt = { n: sn }; } else tt = tryType(); var tn = expId('a type name'); aliases[tn] = tt; expOp(';'); continue; }
          if (isId('template')) throw CErr('Templates are outside this teaching subset', t.l);
          var s = save(), ms = skipMods();
          if (isId('class') || isId('struct') || isId('interface') || isId('enum') || isId('record')) {
            if (isId('struct') && isId(null, 1) && !isOp('{', 2) && !isOp(':', 2) && !isOp(';', 2)) { /* struct Point p; — a declaration, handled below */ }
            else { parseClass(peek().v, ms); continue; }
          }
          if (isId() && isOp('::', 1) && isId(null, 2) && peek(2).v === peek().v && isOp('(', 3)) {
            var cn = next().v; next(); var cl = next().l; var owner = classes[cn]; if (!owner) throw CErr('Unknown class ' + cn, cl);
            var cf = funcRest({ n: 'void' }, cn, ms, cl, owner); cf.ctor = true; owner.ctors = owner.ctors.filter(function (f) { return f.body || f.params.length !== cf.params.length; }); owner.ctors.push(cf); continue;
          }
          var ty = tryType();
          if (ty && isId() && !KW[peek().v]) {
            var nt = peek();
            if (isOp('(', 1) || (isOp('::', 1) && isId(null, 2) && isOp('(', 3))) {
              next(); var fname = nt.v, own = null;
              if (eatOp('::')) { own = classes[fname]; if (!own) throw CErr('Unknown class ' + fname, nt.l); fname = expId(); }
              var fn = funcRest(ty, fname, ms, nt.l, own);
              if (own) { own.methods[fname] = (own.methods[fname] || []).filter(function (f) { return f.body || f.params.length !== fn.params.length; }); addMethod(own, fn); }
              else (prog.fns[fname] = prog.fns[fname] || []).push(fn);
              continue;
            }
            if (lang !== 'csharp') { var d = declRest(ty, ms, t.l); expOp(';'); prog.globals.push(d); continue; }
          }
          restore(s);
          if (lang === 'csharp') { prog.top.push(stmt()); continue; }
          if (lang === 'java') throw CErr('Unexpected ' + desc(peek()) + ' — in Java, code must live inside a class (e.g. public class Main { … })', peek().l);
          throw CErr('Unexpected ' + desc(peek()) + ' — statements must be inside a function such as int main() { … }', peek().l);
        }
        return prog;
      }
      function parseClassAt() { parseClass(peek().v, {}); }
      function exprOnly() { var e = expr(); if (peek().t !== 'eof') throw CErr('Unexpected ' + desc(peek()) + ' inside { } of an interpolated string', peek().l); return e; }
      return { program: program, exprOnly: exprOnly };
    }
    return { parse: parse, CErr: CErr, unesc: unesc };
  };
})();

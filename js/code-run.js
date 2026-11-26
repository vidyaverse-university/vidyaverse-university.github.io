/* VidyaVerse v2 — Code Lab runtimes: sandboxed workers (JS, Node-sim, Mongo-lite, Python/Pyodide, SQL/sql.js, C/C++ JSCPP,
   Java/C#/C/C++ teaching interpreter) and sandboxed live previews (HTML, CSS, React). Everything user-written runs in an
   opaque-origin sandbox (iframe sandbox="allow-scripts" hosting a Worker) or, if the browser refuses that, in a plain Worker
   with network APIs removed. Loops are guarded and every run has a hard time limit. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var C = VV2.Code = VV2.Code || {};

  var CDN = C.CDN = {
    pyodide: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
    sqljs: 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/',
    react: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js',
    reactDom: 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js',
    babel: 'https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js',
    jscpp: 'https://cdn.jsdelivr.net/npm/JSCPP@2.0.9/dist/JSCPP.es5.min.js'
  };
  var ALLOW = 'https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com';

  C.ENGINES = {
    python: { label: 'Python 3.12 · Pyodide 0.26.4', kind: 'real', note: 'Real CPython compiled to WebAssembly, running in a sandboxed worker. First run downloads about 8 MB (then cached).' },
    javascript: { label: 'JavaScript · your browser’s engine', kind: 'real', note: 'Runs in a sandboxed background worker: no page access, no network. console.log, prompt() reads the stdin box.' },
    html: { label: 'Live preview · sandboxed frame', kind: 'real', note: 'Rendered by your browser in a locked-down frame. Links and forms are caught and logged instead of leaving the page.' },
    css: { label: 'Live preview · sandboxed frame', kind: 'real', note: 'Your CSS styles a small demo page (or the lesson’s HTML).' },
    react: { label: 'React 18.2 + Babel 7.24 · sandboxed frame', kind: 'real', note: 'Real React. JSX is compiled in the browser. Define App() and it renders automatically.' },
    node: { label: 'Simulated Node.js server — in your browser', kind: 'sim', note: 'Not real Node: your JavaScript runs in a worker with small built-in shims for require("express"), http, fs (stdin only), readline, events, path and util. Send requests with the fake HTTP client.' },
    sql: { label: 'SQLite 3 · sql.js 1.8.0', kind: 'real', note: 'Real SQLite compiled to WebAssembly. A fresh database is built from the setup script on every run.' },
    mongodb: { label: 'Mongo-lite · VidyaVerse’s own query engine', kind: 'sim', note: 'Not a real MongoDB server: an in-memory engine written for VidyaVerse. Supports find/sort/limit/skip/count, insert/update/delete and aggregate($match, $group, $sort, $project, $limit, $skip, $unwind, $count, $addFields, $lookup).' },
    c: { label: 'C · JSCPP 2.0.9 interpreter', kind: 'subset', note: 'Supports a teaching subset of C/C++. If JSCPP cannot load or the program uses vector/string/map, VidyaVerse’s own teaching interpreter runs it instead.' },
    cpp: { label: 'C++ · JSCPP 2.0.9 interpreter', kind: 'subset', note: 'Supports a teaching subset of C/C++. Programs using vector, string, map, set or algorithm run on VidyaVerse’s teaching interpreter.' },
    java: { label: 'Educational interpreter — subset of Java', kind: 'edu', note: 'Not a JVM. Supports variables, arithmetic, if/else, loops, switch, methods, recursion, arrays, String, StringBuilder, Math, ArrayList, HashMap, HashSet, Scanner and System.out.' },
    csharp: { label: 'Educational interpreter — subset of C#', kind: 'edu', note: 'Not .NET. Supports variables, arithmetic, if/else, loops, switch, methods, recursion, arrays, string, List, Dictionary, simple LINQ, Console.ReadLine and Console.WriteLine.' },
    edu: { label: 'VidyaVerse teaching interpreter — subset of C/C++', kind: 'edu', note: 'Our own interpreter for a teaching subset (variables, loops, functions, arrays, vector, string, map, set, cin/cout, printf/scanf). Not a real compiler.' }
  };
  C.isWeb = function (l) { return l === 'html' || l === 'css' || l === 'react'; };

  /* ======================= loop guard (also embedded into workers & preview frames) ======================= */
  function vvTok(src) {
    var T = [], i = 0, n = src.length, line = 1, prev = null;
    var KW = { 'return': 1, 'typeof': 1, 'instanceof': 1, 'in': 1, 'of': 1, 'new': 1, 'delete': 1, 'void': 1, 'throw': 1, 'case': 1, 'do': 1, 'else': 1, 'yield': 1, 'await': 1 };
    function str(q, j) { j++; while (j < n) { var c = src.charAt(j); if (c === '\\') { j += 2; continue; } if (c === q) return j + 1; if (c === '\n') return j; j++; } return j; }
    function tpl(j) {
      j++;
      while (j < n) {
        var c = src.charAt(j);
        if (c === '\\') { j += 2; continue; }
        if (c === '`') return j + 1;
        if (c === '$' && src.charAt(j + 1) === '{') {
          j += 2; var d = 1;
          while (j < n && d > 0) { var c2 = src.charAt(j); if (c2 === '"' || c2 === "'") { j = str(c2, j); continue; } if (c2 === '`') { j = tpl(j); continue; } if (c2 === '{') d++; else if (c2 === '}') d--; j++; }
          continue;
        }
        j++;
      }
      return j;
    }
    function reOK(p) { return !p || (p.t === 'p' && /[(,=:[!&|?{};+\-*%<>~^]/.test(p.s)) || (p.t === 'w' && KW[p.s] === 1); }
    while (i < n) {
      var c = src.charAt(i), j = i + 1, t = 'p';
      if (/\s/.test(c)) { while (j < n && /\s/.test(src.charAt(j))) j++; t = 'ws'; }
      else if (c === '/' && src.charAt(i + 1) === '/') { j = src.indexOf('\n', i); if (j < 0) j = n; t = 'c'; }
      else if (c === '/' && src.charAt(i + 1) === '*') { j = src.indexOf('*/', i + 2); j = j < 0 ? n : j + 2; t = 'c'; }
      else if (c === '"' || c === "'") { j = str(c, i); t = 's'; }
      else if (c === '`') { j = tpl(i); t = 's'; }
      else if (c === '/' && reOK(prev)) {
        var cls = false; j = i + 1;
        while (j < n) { var d = src.charAt(j); if (d === '\\') { j += 2; continue; } if (d === '\n') break; if (cls) { if (d === ']') cls = false; } else if (d === '[') cls = true; else if (d === '/') { j++; break; } j++; }
        while (j < n && /[a-z]/i.test(src.charAt(j))) j++; t = 'r';
      }
      else if (/[A-Za-z_$]/.test(c)) { while (j < n && /[\w$]/.test(src.charAt(j))) j++; t = 'w'; }
      else if (/[0-9]/.test(c)) { while (j < n && /[\w.]/.test(src.charAt(j))) j++; t = 'n'; }
      if (j <= i) j = i + 1;
      var s = src.slice(i, j), tok = { t: t, s: s, o: s, l: line };
      T.push(tok); if (t !== 'ws' && t !== 'c') prev = tok;
      for (var k = 0; k < s.length; k++) if (s.charCodeAt(k) === 10) line++;
      i = j;
    }
    return T;
  }
  function vvProtect(src) {
    var T = vvTok(String(src || '')), sig = [], q, k;
    for (k = 0; k < T.length; k++) if (T[k].t !== 'ws' && T[k].t !== 'c') sig.push(k);
    for (q = 0; q < sig.length; q++) {
      var tk = T[sig[q]];
      if (tk.t !== 'w' || (tk.o !== 'for' && tk.o !== 'while')) continue;
      var pv = q > 0 ? T[sig[q - 1]] : null; if (pv && pv.t === 'p' && pv.o === '.') continue;
      var op = sig[q + 1]; if (op == null || T[op].o !== '(') continue;
      var depth = 0, semis = [], close = -1;
      for (var r = q + 1; r < sig.length; r++) {
        var t2 = T[sig[r]]; if (t2.t !== 'p') continue;
        if (t2.o === '(' || t2.o === '[' || t2.o === '{') depth++;
        else if (t2.o === ')' || t2.o === ']' || t2.o === '}') { depth--; if (depth === 0) { close = sig[r]; break; } }
        else if (t2.o === ';' && depth === 1) semis.push(sig[r]);
      }
      if (close < 0) continue;
      var g = '__lp(' + tk.l + ')';
      if (tk.o === 'while') { T[op].s += g + '&&('; T[close].s = ')' + T[close].s; }
      else if (semis.length === 2) {
        var a = semis[0], b = semis[1], empty = true;
        for (var x = a + 1; x < b; x++) if (T[x].t !== 'ws' && T[x].t !== 'c') { empty = false; break; }
        if (empty) T[a].s += g; else { T[a].s += g + '&&('; T[b].s = ')' + T[b].s; }
      }
    }
    return T.map(function (t) { return t.s; }).join('');
  }
  function vvLP(max) {
    var n = 0, armed = false, t0 = 0, st = setTimeout;
    return function (l) {
      if ((++n & 1023) === 0) {
        var now = Date.now();
        if (!armed) { armed = true; t0 = now; st(function () { armed = false; }, 0); }
        else if (now - t0 > max) { armed = false; var e = new Error('Infinite loop? The loop on line ' + l + ' ran for over ' + Math.round(max / 1000) + ' s, so it was stopped.'); e.vvLine = l; throw e; }
      }
      return true;
    };
  }
  C.protect = vvProtect; C.tok = vvTok; C.lp = vvLP;

  /* ======================= JS-family worker (javascript · node · mongodb) ======================= */
  function jsWorker() {
    var CAP = 200000, used = 0, cut = false, alt = '', errored = null, finished = true, pending = 0, timers = {}, SERVER = null, runT0 = 0, exitCode = null;
    var _st = setTimeout, _ct = clearTimeout, _si = setInterval, _ci = clearInterval;
    function post(m) { postMessage(m); }
    function out(s, k) { if (cut) return; s = String(s); used += s.length; if (used > CAP) { cut = true; post({ t: 'out', s: '\n… output truncated (that is a lot of printing!)\n', k: 'warn' }); return; } post({ t: 'out', s: s, k: k || 'out' }); }
    self.__lp = vvLP(CFG.lp || 4500);
    ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'importScripts', 'indexedDB', 'caches', 'Worker', 'SharedWorker', 'BroadcastChannel', 'WebTransport'].forEach(function (k) {
      try { Object.defineProperty(self, k, { value: undefined, configurable: false, writable: false }); } catch (e) { try { self[k] = undefined; } catch (e2) { } }
    });
    function insp(v, d, seen) {
      d = d || 0; seen = seen || [];
      if (v === null) return 'null';
      var t = typeof v;
      if (t === 'undefined') return 'undefined';
      if (t === 'string') return d ? "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'" : v;
      if (t === 'number') return (v === 0 && 1 / v < 0) ? '-0' : String(v);
      if (t === 'bigint') return String(v) + 'n';
      if (t === 'boolean' || t === 'symbol') return String(v);
      if (t === 'function') return '[Function: ' + (v.name || '(anonymous)') + ']';
      if (seen.indexOf(v) >= 0) return '[Circular]';
      if (v instanceof Error) return (v.name || 'Error') + ': ' + v.message;
      if (v instanceof Date) return isNaN(v.getTime()) ? 'Invalid Date' : v.toISOString();
      if (v instanceof RegExp) return String(v);
      if (v && typeof v.$oid === 'string' && Object.keys(v).length === 1) return "ObjectId('" + v.$oid + "')";
      if (d > 2) return Array.isArray(v) ? '[Array]' : '[Object]';
      seen = seen.concat([v]);
      if (Array.isArray(v)) {
        if (!v.length) return '[]';
        var a = v.slice(0, 100).map(function (x) { return insp(x, d + 1, seen); });
        if (v.length > 100) a.push('... ' + (v.length - 100) + ' more items');
        return wrap('[', a, ']');
      }
      if (v instanceof Map) { var mm = []; v.forEach(function (val, key) { mm.push(insp(key, d + 1, seen) + ' => ' + insp(val, d + 1, seen)); }); return 'Map(' + v.size + ') ' + (mm.length ? wrap('{', mm, '}') : '{}'); }
      if (v instanceof Set) { var ss = []; v.forEach(function (val) { ss.push(insp(val, d + 1, seen)); }); return 'Set(' + v.size + ') ' + (ss.length ? wrap('{', ss, '}') : '{}'); }
      if (typeof Promise !== 'undefined' && v instanceof Promise) return 'Promise { <pending> }';
      var ks = Object.keys(v), nm = v.constructor && v.constructor.name && v.constructor.name !== 'Object' ? v.constructor.name + ' ' : '';
      if (!ks.length) return nm + '{}';
      return nm + wrap('{', ks.slice(0, 100).map(function (k) { return (/^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'") + ': ' + insp(v[k], d + 1, seen); }), '}');
    }
    function wrap(o, parts, c) { var one = o + ' ' + parts.join(', ') + ' ' + c; if (one.length <= 72 && one.indexOf('\n') < 0) return one; return o + '\n' + parts.map(function (p) { return '  ' + p.replace(/\n/g, '\n  '); }).join(',\n') + '\n' + c; }
    function fmt(args) {
      args = Array.prototype.slice.call(args);
      if (typeof args[0] === 'string' && args.length > 1 && /%[sdifoOjc%]/.test(args[0])) {
        var f = args.shift();
        f = f.replace(/%([sdifoOjc%])/g, function (m, c) {
          if (c === '%') return '%'; if (!args.length) return m; var a = args.shift();
          if (c === 's') return typeof a === 'string' ? a : insp(a, 1);
          if (c === 'd' || c === 'i') return c === 'i' ? String(parseInt(a, 10)) : String(Number(a));
          if (c === 'f') return String(parseFloat(a)); if (c === 'c') return ''; return insp(a, 1);
        });
        return [f].concat(args.map(function (a) { return insp(a, 0); })).join(' ');
      }
      return args.map(function (a) { return insp(a, 0); }).join(' ');
    }
    var ind = '', counts = {}, tms = {};
    function line(k) { return function () { var s = fmt(arguments); out((ind ? ind + s.replace(/\n/g, '\n' + ind) : s) + '\n', k); }; }
    var con = { log: line('out'), info: line('out'), debug: line('out'), warn: line('warn'), error: line('err'), trace: line('err'),
      group: function () { if (arguments.length) line('out').apply(null, arguments); ind += '  '; }, groupEnd: function () { ind = ind.slice(2); },
      table: function (d) { try { var rows = Array.isArray(d) ? d : Object.keys(d).map(function (k) { return d[k]; }); var keys = Object.keys(d); var cols = []; rows.forEach(function (r) { if (r && typeof r === 'object') Object.keys(r).forEach(function (c) { if (cols.indexOf(c) < 0) cols.push(c); }); }); var head = ['(index)'].concat(cols.length ? cols : ['Values']); var body = rows.map(function (r, i) { return [Array.isArray(d) ? String(i) : keys[i]].concat(cols.length ? cols.map(function (c) { return r && typeof r === 'object' && c in r ? insp(r[c], 1) : ''; }) : [insp(r, 1)]); }); var w = head.map(function (hh, i) { return Math.max(hh.length, Math.max.apply(null, body.map(function (b) { return String(b[i]).length; }).concat([0]))); }); var fmtR = function (r) { return '│ ' + r.map(function (c, i) { c = String(c); return c + new Array(w[i] - c.length + 1).join(' '); }).join(' │ ') + ' │'; }; out([fmtR(head)].concat(body.map(fmtR)).join('\n') + '\n'); } catch (e) { con.log(d); } },
      count: function (l) { l = l || 'default'; counts[l] = (counts[l] || 0) + 1; con.log(l + ': ' + counts[l]); }, countReset: function (l) { counts[l || 'default'] = 0; },
      time: function (l) { tms[l || 'default'] = Date.now(); }, timeEnd: function (l) { l = l || 'default'; con.log(l + ': ' + (Date.now() - (tms[l] || Date.now())) + 'ms'); }, timeLog: function (l) { l = l || 'default'; con.log(l + ': ' + (Date.now() - (tms[l] || Date.now())) + 'ms'); },
      assert: function (c) { if (!c) con.error('Assertion failed' + (arguments.length > 1 ? ': ' + fmt([].slice.call(arguments, 1)) : '')); }, clear: function () { }, dir: function (o) { con.log(o); } };
    self.console = con;
    var STDIN = '', LINES = [], LI = 0;
    self.prompt = function (q) { if (q) out(String(q)); var l = LI < LINES.length ? LINES[LI++] : null; if (q) out((l == null ? '' : l) + '\n'); return l; };
    self.readline = function () { return LI < LINES.length ? LINES[LI++] : null; };
    self.alert = function (m) { out('[alert] ' + m + '\n'); };
    /* timers we can count, so the run ends when nothing is pending */
    self.setTimeout = function (fn, ms) { var args = [].slice.call(arguments, 2); pending++; var id = _st(function () { if (timers[id]) { delete timers[id]; pending--; } safe(function () { if (typeof fn === 'function') fn.apply(null, args); }); check(); }, ms); timers[id] = 1; return id; };
    self.clearTimeout = function (id) { if (timers[id]) { delete timers[id]; pending--; } _ct(id); check(); };
    self.setInterval = function (fn, ms) { var args = [].slice.call(arguments, 2); pending++; var id = _si(function () { safe(function () { fn.apply(null, args); }); }, Math.max(4, +ms || 0)); timers['i' + id] = 1; return id; };
    self.clearInterval = function (id) { if (timers['i' + id]) { delete timers['i' + id]; pending--; } _ci(id); check(); };
    self.setImmediate = function (fn) { return self.setTimeout(fn, 0); };
    self.queueMicrotask = self.queueMicrotask || function (fn) { Promise.resolve().then(fn); };
    self.addEventListener('unhandledrejection', function (e) { if (e.preventDefault) e.preventDefault(); report(e.reason); check(); });
    function lineOf(e) { if (e && e.vvLine) return e.vvLine; var st = String(e && e.stack || ''); var m = /(?:main|index)\.js:(\d+)/.exec(st); return m ? +m[1] : 0; }
    function synLine(code) {
      var L = code.split('\n'), endRe = /end of input|unexpected end|unterminated|missing \} |got end of script|unexpected eof|end of script|before end/i;
      for (var k = 1; k <= L.length && k < 400; k++) { try { new Function(L.slice(0, k).join('\n')); } catch (e) { if (!endRe.test(String(e.message))) return k; } }
      return L.length;
    }
    function report(e, code) {
      if (e && e.__vvExit) { exitCode = e.code; return; }
      if (errored) return;
      var msg = e && e.message != null ? (e.name && e.name !== 'Error' ? e.name + ': ' : (e instanceof Error ? 'Error: ' : '')) + e.message : 'Uncaught ' + insp(e, 1);
      var ln = lineOf(e);
      if (e && e.name === 'SyntaxError' && code) ln = synLine(code);
      errored = { msg: msg, line: ln };
    }
    function safe(fn) { try { fn(); } catch (e) { report(e); } }
    function check() { if (finished) return; if (errored || (pending <= 0) || exitCode != null) _st(finish, 0); }
    function finish() {
      if (finished) return; if (!errored && exitCode == null && pending > 0) return;
      finished = true;
      post({ t: 'done', ok: !errored, err: errored ? errored.msg : '', line: errored ? errored.line : 0, alt: alt || null, server: !!SERVER && !errored, ms: Date.now() - runT0 });
    }
    function emit(main, other) { out(main); alt += other; }
    var node = typeof NODESHIM === 'function' ? NODESHIM({ out: out, stdin: function () { return STDIN; }, setTimeout: function (f, ms) { return self.setTimeout(f, ms); }, listen: function (srv) { SERVER = srv; }, exit: function (c) { var e = new Error('exit'); e.__vvExit = true; e.code = c || 0; throw e; }, report: function (e) { report(e); check(); } }) : null;
    function runMongo(code) {
      var db = MONGO.makeDb(CFG.setup || []);
      self.db = db.proxy; self.ObjectId = MONGO.ObjectId; self.ISODate = function (s) { return new Date(s); };
      self.print = function () { var s = [].map.call(arguments, function (a) { return typeof a === 'string' ? a : insp(a, 1); }).join(' '); emit(s + '\n', s + '\n'); };
      self.printjson = function (o) { var s = JSON.stringify(o); emit(s + '\n', insp(o, 0) + '\n'); };
      code = code.replace(/^[ \t]*use[ \t]+[\w-]+[ \t]*;?[ \t]*$/gm, function (m) { return '/' + '/ ' + m.trim(); })
        .replace(/^[ \t]*show[ \t]+(collections|tables)[ \t]*;?[ \t]*$/gm, 'print(db.getCollectionNames().join("\\n"))');
      var parts = MONGO.split(code, vvTok);
      parts.forEach(function (p) {
        if (errored) return;
        var src = new Array(p.line).join('\n') + vvProtect(p.code.replace(/^(\s*)(const|let)\s/, '$1var ')) + '\n//# sourceURL=main.js';
        var v;
        try { v = (0, eval)(src); } catch (e) { report(e); if (e && e.name === 'SyntaxError') errored.line = p.line + synLine(p.code) - 1; return; }
        if (v === undefined || /^\s*(var|function)\s/.test(p.code)) return;
        if (v && v.__cursor) { var docs = v.toArray(); docs.forEach(function (d) { out(JSON.stringify(d) + '\n'); }); alt += insp(docs, 0) + '\n'; return; }
        emit((typeof v === 'object' && v !== null ? JSON.stringify(v) : typeof v === 'string' ? v : String(v)) + '\n', insp(v, 0) + '\n');
      });
    }
    self.onmessage = function (e) {
      var d = e.data || {};
      if (d.t === 'req') { if (node) node.request(d, SERVER, post); else post({ t: 'res', id: d.id, status: 0, body: 'Not a server runtime.' }); return; }
      if (d.t !== 'run') return;
      finished = false; errored = null; alt = ''; exitCode = null; runT0 = Date.now(); used = 0; cut = false;
      STDIN = String(d.stdin || ''); LINES = STDIN.split('\n'); if (STDIN.slice(-1) === '\n') LINES.pop(); if (!STDIN) LINES = []; LI = 0;
      var code = String(d.code || '');
      try {
        if (CFG.kind === 'mongodb') runMongo(code);
        else if (CFG.kind === 'node') {
          var mod = { exports: {} };
          var fn = (0, eval)('(function (require, module, exports, __filename, __dirname, process, global) {' + vvProtect(code) + '\n})\n//# sourceURL=index.js');
          fn(node.require, mod, mod.exports, '/app/index.js', '/app', node.process, self);
        }
        else (0, eval)(vvProtect(code) + '\n//# sourceURL=main.js');
      } catch (err) { report(err, code); }
      check();
    };
    post({ t: 'ready' });
  }

  /* ======================= Python (Pyodide) worker ======================= */
  function pyWorker() {
    var py = null;
    function post(m) { postMessage(m); }
    var CAP = 200000, used = 0, cut = false;
    function out(s, k) { if (cut) return; s = String(s); used += s.length; if (used > CAP) { cut = true; post({ t: 'out', s: '\n… output truncated\n', k: 'warn' }); return; } post({ t: 'out', s: s, k: k || 'out' }); }
    self._vvOut = function (s, k) { out(s, k === 'err' ? 'err' : 'out'); };
    var _f = self.fetch;
    self.fetch = function (u, o) { var s = String(u && u.url || u); if (s.indexOf('https://cdn.jsdelivr.net/pyodide/') !== 0) return Promise.reject(new Error('Network access is switched off in the Code Lab sandbox.')); return _f.call(self, u, o); };
    ['XMLHttpRequest', 'WebSocket', 'EventSource', 'indexedDB', 'caches', 'BroadcastChannel'].forEach(function (k) { try { Object.defineProperty(self, k, { value: undefined, configurable: false, writable: false }); } catch (e) { } });
    var SETUP = 'import sys, io\nfrom js import _vvOut\nclass _VVW(io.TextIOBase):\n    def __init__(self, k):\n        self.k = k\n    def writable(self):\n        return True\n    def write(self, s):\n        _vvOut(s, self.k)\n        return len(s)\n    def flush(self):\n        pass\n';
    function pyErr(msg) {
      msg = String(msg || ''); var L = msg.split('\n'), st = -1, ln = 0;
      for (var i = 0; i < L.length; i++) if (/File "<exec>"/.test(L[i])) { if (st < 0) st = i; }
      msg.replace(/File "<exec>", line (\d+)/g, function (m, n) { ln = +n; return m; });
      var keep = (st >= 0 ? L.slice(st) : L.slice(-3)).filter(function (l) { return l.trim(); });
      return { txt: (st >= 0 ? 'Traceback (most recent call last):\n' : '') + keep.join('\n'), line: ln };
    }
    post({ t: 'status', s: 'Downloading Python (about 8 MB — only the first time)…', p: 12 });
    try { importScripts(CFG.base + 'pyodide.js'); } catch (e) { post({ t: 'fail', s: 'Could not download Python from cdn.jsdelivr.net.' }); return; }
    post({ t: 'status', s: 'Starting the Python interpreter…', p: 48 });
    loadPyodide({ indexURL: CFG.base }).then(function (p) {
      py = p; py.runPython(SETUP); post({ t: 'status', s: 'Python is ready 🐍', p: 100 }); post({ t: 'ready' });
    }, function (e) { post({ t: 'fail', s: 'Python failed to start: ' + (e && e.message || e) }); });
    self.onmessage = function (e) {
      var d = e.data || {}; if (d.t !== 'run' || !py) return;
      var t0 = Date.now(); used = 0; cut = false;
      var pre = py.loadPackagesFromImports ? Promise.resolve().then(function () { return py.loadPackagesFromImports(d.code, { messageCallback: function (m) { post({ t: 'status', s: String(m) }); } }); }).catch(function () { }) : Promise.resolve();
      pre.then(function () {
        py.globals.set('__vv_stdin', String(d.stdin || ''));
        py.runPython('sys.stdout = _VVW("out"); sys.stderr = _VVW("err"); sys.stdin = io.StringIO(__vv_stdin)');
        var ns = py.globals.get('dict')(); ns.set('__name__', '__main__');
        return py.runPythonAsync(d.code, { globals: ns }).then(function () {
          try { ns.destroy(); } catch (x) { }
          post({ t: 'done', ok: true, ms: Date.now() - t0 });
        }, function (err) {
          try { ns.destroy(); } catch (x) { }
          var r = pyErr(err && err.message || err);
          post({ t: 'done', ok: false, err: r.txt, line: r.line, ms: Date.now() - t0 });
        });
      }).catch(function (err) { post({ t: 'done', ok: false, err: String(err && err.message || err), line: 0, ms: Date.now() - t0 }); });
    };
  }

  /* ======================= SQL (sql.js) worker ======================= */
  function sqlWorker() {
    var SQL = null;
    function post(m) { postMessage(m); }
    post({ t: 'status', s: 'Downloading SQLite (about 1 MB)…', p: 20 });
    try { importScripts(CFG.base + 'sql-wasm.js'); } catch (e) { post({ t: 'fail', s: 'Could not download sql.js from cdnjs.cloudflare.com.' }); return; }
    initSqlJs({ locateFile: function (f) { return CFG.base + f; } }).then(function (S) {
      SQL = S;
      ['fetch', 'XMLHttpRequest', 'WebSocket', 'importScripts'].forEach(function (k) { try { Object.defineProperty(self, k, { value: undefined, configurable: false, writable: false }); } catch (e) { } });
      post({ t: 'status', s: 'SQLite is ready 🗃️', p: 100 }); post({ t: 'ready' });
    }, function (e) { post({ t: 'fail', s: 'SQLite failed to start: ' + (e && e.message || e) }); });
    function cell(v) { if (v === null || v === undefined) return 'NULL'; if (v instanceof Uint8Array) return '[blob ' + v.length + ' bytes]'; var s = String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
    function where(msg, code) {
      var m = /near "([^"]+)"/.exec(msg) || /no such (?:column|table|function): ([\w.]+)/.exec(msg) || /table (\w+) already exists/.exec(msg);
      if (!m) return 0; var i = code.toLowerCase().indexOf(m[1].toLowerCase()); return i < 0 ? 0 : code.slice(0, i).split('\n').length;
    }
    self.onmessage = function (e) {
      var d = e.data || {}; if (d.t !== 'run' || !SQL) return;
      var t0 = Date.now(), db = new SQL.Database(), code = String(d.code || '');
      try {
        if (d.setup) { try { db.exec(String(d.setup)); } catch (se) { post({ t: 'done', ok: false, err: 'The lesson’s setup script failed: ' + se.message, line: 0, ms: Date.now() - t0 }); return; } }
        var res = db.exec(code), changed = db.getRowsModified();
        var tables = res.map(function (r) { return { columns: r.columns, values: r.values.slice(0, 500).map(function (row) { return row.map(function (v) { return v instanceof Uint8Array ? '[blob]' : v; }); }), total: r.values.length }; });
        var csv = res.map(function (r) { return r.values.map(function (row) { return row.map(cell).join(','); }).join('\n'); }).join('\n');
        var csvH = res.map(function (r) { return [r.columns.join(',')].concat(r.values.map(function (row) { return row.map(cell).join(','); })).join('\n'); }).join('\n');
        if (csv) post({ t: 'out', s: csv + '\n', k: 'out' });
        else post({ t: 'out', s: '✓ Statement(s) ran. Rows changed by the last statement: ' + changed + '\n', k: 'info' });
        post({ t: 'done', ok: true, tables: tables, alt: csvH, ms: Date.now() - t0 });
      } catch (err) {
        post({ t: 'done', ok: false, err: 'SQL error: ' + err.message, line: where(err.message, code), ms: Date.now() - t0 });
      } finally { try { db.close(); } catch (x) { } }
    };
  }

  /* ======================= C/C++ (JSCPP) worker ======================= */
  function jscppWorker() {
    var J = null;
    function post(m) { postMessage(m); }
    post({ t: 'status', s: 'Downloading the C/C++ interpreter…', p: 30 });
    try { importScripts(CFG.url); } catch (e) { post({ t: 'fail', s: 'Could not download JSCPP.' }); return; }
    J = self.JSCPP && (self.JSCPP.run ? self.JSCPP : self.JSCPP.default);
    if (!J || typeof J.run !== 'function') { post({ t: 'fail', s: 'JSCPP did not load correctly.' }); return; }
    ['fetch', 'XMLHttpRequest', 'WebSocket', 'importScripts'].forEach(function (k) { try { Object.defineProperty(self, k, { value: undefined, configurable: false, writable: false }); } catch (e) { } });
    post({ t: 'ready' });
    self.onmessage = function (e) {
      var d = e.data || {}; if (d.t !== 'run') return;
      var t0 = Date.now(), used = 0;
      try {
        var code = J.run(String(d.code || ''), String(d.stdin || ''), { stdio: { write: function (s) { used += String(s).length; if (used < 200000) post({ t: 'out', s: String(s), k: 'out' }); } }, unsigned_overflow: 'warn' });
        post({ t: 'done', ok: true, exit: code, ms: Date.now() - t0 });
      } catch (err) {
        var m = String(err && err.message || err), ln = /(?:line\s*)?(\d+):(\d+)/.exec(m);
        post({ t: 'done', ok: false, err: m, line: ln ? +ln[1] : 0, ms: Date.now() - t0 });
      }
    };
  }

  /* ======================= teaching interpreter worker (Java · C# · C · C++) ======================= */
  function eduWorker() {
    var R = EDU_R(EDU_P(), EDU_L);
    function post(m) { postMessage(m); }
    self.onmessage = function (e) {
      var d = e.data || {}; if (d.t !== 'run') return;
      var t0 = Date.now(), used = 0;
      var r = R.run(d.lang, String(d.code || ''), String(d.stdin || ''), function (s, k) { used += s.length; if (used < 200000) post({ t: 'out', s: s, k: k || 'out' }); });
      post({ t: 'done', ok: r.ok, err: r.err || '', line: r.line || 0, ms: Date.now() - t0 });
    };
    post({ t: 'ready' });
  }

  /* ======================= sandbox host: opaque-origin iframe that owns the workers ======================= */
  var HOST_JS = function () {
    var W = {};
    function up(m) { parent.postMessage(m, '*'); }
    window.addEventListener('message', function (e) {
      if (e.source !== parent) return;
      var d = e.data || {};
      if (d.vvh === 'ping') {
        try {
          var w = new Worker(URL.createObjectURL(new Blob(['postMessage(1)'], { type: 'text/javascript' })));
          var t = setTimeout(function () { up({ vvh: 'pong', ok: false }); }, 2500);
          w.onmessage = function () { clearTimeout(t); w.terminate(); up({ vvh: 'pong', ok: true }); };
          w.onerror = function () { clearTimeout(t); up({ vvh: 'pong', ok: false }); };
        } catch (x) { up({ vvh: 'pong', ok: false }); }
        return;
      }
      if (d.vvh === 'new') {
        try {
          var w2 = new Worker(URL.createObjectURL(new Blob([d.src], { type: 'text/javascript' })));
          W[d.pid] = w2;
          w2.onmessage = function (ev) { up({ vvh: 'm', pid: d.pid, m: ev.data }); };
          w2.onerror = function (ev) { if (ev.preventDefault) ev.preventDefault(); up({ vvh: 'e', pid: d.pid, msg: String(ev.message || 'Worker error') }); };
        } catch (x) { up({ vvh: 'e', pid: d.pid, msg: 'sandbox: ' + x.message }); }
        return;
      }
      if (d.vvh === 'post' && W[d.pid]) { W[d.pid].postMessage(d.m); return; }
      if (d.vvh === 'kill' && W[d.pid]) { W[d.pid].terminate(); delete W[d.pid]; }
    });
  };
  var CSP_WORKER = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: " + ALLOW + "; worker-src blob:; child-src blob:; connect-src " + ALLOW;
  var Host = { mode: null, frame: null, ready: null, ports: {}, seq: 0 };
  function hostReady() {
    if (Host.ready) return Host.ready;
    Host.ready = new Promise(function (res) {
      if (typeof Worker === 'undefined') { Host.mode = 'none'; res('none'); return; }
      var done = false, fr = document.createElement('iframe');
      fr.setAttribute('sandbox', 'allow-scripts'); fr.setAttribute('aria-hidden', 'true'); fr.setAttribute('tabindex', '-1'); fr.title = 'Code sandbox';
      fr.style.cssText = 'position:fixed;width:1px;height:1px;left:-50px;top:-50px;border:0;opacity:0;pointer-events:none';
      fr.srcdoc = '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="' + CSP_WORKER + '"><script>(' + HOST_JS.toString() + ')();<\/script>';
      function fin(mode) { if (done) return; done = true; Host.mode = mode; res(mode); }
      window.addEventListener('message', function (e) {
        if (!Host.frame || e.source !== Host.frame.contentWindow) return;
        var d = e.data || {};
        if (d.vvh === 'pong') fin(d.ok ? 'frame' : 'direct');
        else if (d.vvh === 'm') { var p = Host.ports[d.pid]; if (p && p.onmessage) p.onmessage({ data: d.m }); }
        else if (d.vvh === 'e') { var p2 = Host.ports[d.pid]; if (p2 && p2.onerror) p2.onerror({ message: d.msg }); }
      });
      fr.addEventListener('load', function () { try { fr.contentWindow.postMessage({ vvh: 'ping' }, '*'); } catch (e) { fin('direct'); } });
      (document.body || document.documentElement).appendChild(fr); Host.frame = fr;
      setTimeout(function () { fin('direct'); }, 4000);
    });
    return Host.ready;
  }
  function Port(src) {
    var me = this; this.pid = ++Host.seq; this.onmessage = null; this.onerror = null; this.dead = false;
    if (Host.mode === 'frame') { Host.ports[this.pid] = this; Host.frame.contentWindow.postMessage({ vvh: 'new', pid: this.pid, src: src }, '*'); }
    else {
      var u = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
      this.w = new Worker(u); setTimeout(function () { try { URL.revokeObjectURL(u); } catch (e) { } }, 10000);
      this.w.onmessage = function (e) { if (me.onmessage) me.onmessage(e); };
      this.w.onerror = function (e) { if (e.preventDefault) e.preventDefault(); if (me.onerror) me.onerror({ message: e.message }); };
    }
  }
  Port.prototype.post = function (m) { if (this.dead) return; if (this.w) this.w.postMessage(m); else Host.frame.contentWindow.postMessage({ vvh: 'post', pid: this.pid, m: m }, '*'); };
  Port.prototype.kill = function () { if (this.dead) return; this.dead = true; if (this.w) this.w.terminate(); else { try { Host.frame.contentWindow.postMessage({ vvh: 'kill', pid: this.pid }, '*'); } catch (e) { } delete Host.ports[this.pid]; } };
  C.sandboxMode = function () { return Host.mode; };

  /* ======================= runtime definitions ======================= */
  function cfg(o) { return 'var CFG=' + JSON.stringify(o) + ';\n'; }
  var DEFS = {
    js: { fresh: true, timeout: 6000, boot: 8000, src: function (o) { return cfg({ kind: 'javascript', lp: 4500 }) + vvTok + '\n' + vvProtect + '\n' + vvLP + '\n(' + jsWorker + ')();'; } },
    node: { fresh: true, timeout: 6000, boot: 8000, needs: ['code-node'], src: function (o) { return cfg({ kind: 'node', lp: 4500 }) + vvTok + '\n' + vvProtect + '\n' + vvLP + '\nvar NODESHIM=(' + C.nodeShim + ');\n(' + jsWorker + ')();'; } },
    mongo: { fresh: true, timeout: 6000, boot: 8000, needs: ['code-mongo'], src: function (o) { return cfg({ kind: 'mongodb', lp: 4500, setup: o.setup || [] }) + vvTok + '\n' + vvProtect + '\n' + vvLP + '\nvar MONGO=(' + C.mongoFactory + ')();\n(' + jsWorker + ')();'; } },
    py: { fresh: false, timeout: 20000, warn: 5000, boot: 120000, src: function () { return cfg({ base: CDN.pyodide }) + '(' + pyWorker + ')();'; } },
    sql: { fresh: false, timeout: 8000, boot: 60000, src: function () { return cfg({ base: CDN.sqljs }) + '(' + sqlWorker + ')();'; } },
    jscpp: { fresh: false, timeout: 10000, warn: 4000, boot: 45000, src: function () { return cfg({ url: CDN.jscpp }) + '(' + jscppWorker + ')();'; } },
    edu: { fresh: true, timeout: 10000, warn: 4000, boot: 8000, needs: ['code-edu', 'code-edu-rt', 'code-edu-lib'], src: function () { return 'var EDU_P=' + C.eduParse + ';\nvar EDU_R=' + C.eduRT + ';\nvar EDU_L=' + C.eduLib + ';\n(' + eduWorker + ')();'; } }
  };
  var FAM = { javascript: 'js', node: 'node', mongodb: 'mongo', python: 'py', sql: 'sql', java: 'edu', csharp: 'edu', c: 'jscpp', cpp: 'jscpp' };
  var BIGCPP = /#\s*include\s*<\s*(vector|string|map|set|algorithm|bits\/stdc\+\+\.h|unordered_map|unordered_set|stack|queue|deque|sstream|numeric|utility|list|array)\s*>|\bstd::(string|vector|map|set)\b|\b(vector|string|map|set)\s*</;
  C.engineFor = function (lang, code) {
    lang = C.langOf(lang);
    if ((lang === 'c' || lang === 'cpp') && (jscppBroken || BIGCPP.test(code || '') || /^\s*(string|bool)\s+\w/m.test(code || ''))) return 'edu';
    return FAM[lang] || 'js';
  };
  var live = {}, jscppBroken = false, curNode = null;

  function getEntry(fam, def, opts, onStatus) {
    if (!def.fresh && live[fam] && !live[fam].dead) return live[fam].ready;
    var entry = { port: null, dead: false, onstatus: onStatus, onmsg: null };
    entry.ready = hostReady().then(function (mode) {
      if (mode === 'none') throw new Error('This browser cannot run code in a background worker.');
      return new Promise(function (res, rej) {
        var p; try { p = new Port(def.src(opts)); } catch (e) { rej(e); return; }
        entry.port = p;
        var bt = setTimeout(function () { p.kill(); entry.dead = true; rej(new Error('Timed out while loading.')); }, def.boot || 15000);
        p.onmessage = function (e) {
          var m = e.data || {};
          if (m.t === 'ready') { clearTimeout(bt); res(entry); }
          else if (m.t === 'fail') { clearTimeout(bt); entry.dead = true; p.kill(); rej(new Error(m.s)); }
          else if (m.t === 'status') { if (entry.onstatus) entry.onstatus(m.s, m.p); }
          else if (entry.onmsg) entry.onmsg(m);
        };
        p.onerror = function (e) { clearTimeout(bt); entry.dead = true; p.kill(); rej(new Error(e.message || 'The sandbox stopped unexpectedly.')); };
      });
    });
    if (!def.fresh) { live[fam] = entry; entry.ready.catch(function () { if (live[fam] === entry) delete live[fam]; }); }
    return entry.ready;
  }
  function failMsg(fam, e) {
    var off = typeof navigator !== 'undefined' && navigator.onLine === false;
    var what = { py: 'the Python runtime (Pyodide, cdn.jsdelivr.net)', sql: 'the SQLite runtime (sql.js, cdnjs.cloudflare.com)', jscpp: 'the C/C++ interpreter (JSCPP, cdn.jsdelivr.net)' }[fam] || 'the code sandbox';
    return (off ? '📴 You seem to be offline. ' : '⚠️ ') + 'Could not start ' + what + '. ' + (e && e.message ? '(' + e.message + ') ' : '') + 'Your code is saved on this device — check your connection or network filter and press Run again.';
  }

  /* run(lang, code, {stdin, setup, onOut(s,kind), onStatus(text,pct,kind), timeout, engine}) → Promise<result> */
  C.run = function (lang, code, opts) {
    opts = opts || {}; lang = C.langOf(lang);
    if (C.isWeb(lang)) return Promise.resolve({ ok: false, err: 'Use the preview for ' + lang + '.', out: '' });
    var fam = opts.engine || C.engineFor(lang, code), def = DEFS[fam], onOut = opts.onOut || function () { }, onStatus = opts.onStatus || function () { };
    var t0 = Date.now(), label = fam === 'edu' && (lang === 'c' || lang === 'cpp') ? C.ENGINES.edu.label : (C.ENGINES[lang] || {}).label;
    if (fam === 'node' && curNode) { try { curNode.port.kill(); } catch (e) { } curNode = null; }
    var needP = def.needs ? VV2.need(def.needs) : Promise.resolve();
    return needP.then(function () { return getEntry(fam, def, { setup: opts.setup }, onStatus); }).then(function (entry) {
      return new Promise(function (res) {
        var out = '', done = false, warnT = 0, killT = 0;
        entry.onstatus = function (s, p) { onStatus(s, p); };
        entry.onmsg = function (m) {
          if (m.t === 'out') { if (out.length < 400000) out += m.s; onOut(m.s, m.k || 'out'); }
          else if (m.t === 'done') end({ ok: !!m.ok, err: m.err || '', line: m.line || 0, alt: m.alt || null, tables: m.tables || null, server: !!m.server, ms: m.ms });
        };
        function end(r) {
          if (done) return; done = true; clearTimeout(warnT); clearTimeout(killT);
          r.out = out; r.ms = r.ms != null ? r.ms : Date.now() - t0; r.engine = label; r.fam = fam;
          if (fam === 'node' && r.server) { curNode = entry; entry.onmsg = nodeMsg; }
          else if (def.fresh) entry.port.kill();
          res(r);
        }
        if (def.warn) warnT = setTimeout(function () { onStatus('Still running… (it will be stopped at ' + Math.round((opts.timeout || def.timeout) / 1000) + ' s)', null, 'warn'); }, def.warn);
        killT = setTimeout(function () {
          entry.port.kill(); entry.dead = true; if (!def.fresh && live[fam] === entry) delete live[fam];
          end({ ok: false, killed: true, line: 0, err: '⏱️ Time limit: stopped after ' + Math.round((opts.timeout || def.timeout) / 1000) + ' s. Is there an infinite loop, or a loop waiting for input that never comes?' + (fam === 'py' ? ' (Python will restart on the next run.)' : '') });
        }, opts.timeout || def.timeout);
        entry.port.post({ t: 'run', code: String(code || ''), stdin: opts.stdin || '', setup: opts.setup || '', lang: lang });
      });
    }, function (e) {
      if (fam === 'jscpp') { jscppBroken = true; onStatus('JSCPP is unavailable — switching to the VidyaVerse teaching interpreter…', null, 'warn'); return C.run(lang, code, Object.assign({}, opts, { engine: 'edu' })); }
      return { ok: false, loadFail: true, err: failMsg(fam, e), out: '', line: 0, engine: label, fam: fam };
    });
  };

  /* fake HTTP client for the simulated Node server */
  var reqs = {}, reqSeq = 0;
  C.nodeLog = null;
  function nodeMsg(m) {
    if (m.t === 'out') { if (C.nodeLog) C.nodeLog(m.s, m.k || 'out'); }
    else if (m.t === 'res') { var r = reqs[m.id]; if (r) { delete reqs[m.id]; r(m); } }
  }
  C.serverUp = function () { return !!curNode; };
  C.request = function (method, path, body, headers) {
    if (!curNode) return Promise.resolve({ status: 0, headers: {}, body: 'No server is running. Press ▶ Run — your code must call app.listen(…).' });
    return new Promise(function (res) {
      var id = ++reqSeq, t = setTimeout(function () { if (reqs[id]) { delete reqs[id]; if (curNode) { curNode.port.kill(); curNode = null; } res({ status: 0, headers: {}, body: 'The server did not answer within 8 s and was stopped (an infinite loop in a route?). Press Run to start it again.' }); } }, 8000);
      reqs[id] = function (m) { clearTimeout(t); res(m); };
      curNode.port.post({ t: 'req', id: id, method: method || 'GET', path: path || '/', body: body || '', headers: headers || {} });
    });
  };
  C.stopServer = function () { if (curNode) { curNode.port.kill(); curNode = null; } };

  /* ======================= output checking ======================= */
  C.norm = function (s) { return String(s == null ? '' : s).replace(/\r\n?/g, '\n').split('\n').map(function (l) { return l.replace(/\s+$/, ''); }).join('\n').replace(/^\n+|\n+$/g, ''); };
  C.asRegex = function (exp) { var m = /^\/([\s\S]+)\/([imsu]*)$/.exec(String(exp == null ? '' : exp).trim()); if (!m) return null; try { return new RegExp(m[1], m[2]); } catch (e) { return null; } };
  /* expect: exact text or /regex/; outs: [primary output, ...alternative renderings] */
  C.check = function (expect, outs, opts) {
    opts = opts || {}; outs = (Array.isArray(outs) ? outs : [outs]).filter(function (x) { return x != null; });
    if (!outs.length) outs = [''];
    var re = C.asRegex(expect), i;
    if (re) { for (i = 0; i < outs.length; i++) if (re.test(C.norm(outs[i]))) return { pass: true, how: 'regex' }; return { pass: false, how: 'regex', exp: String(expect).trim(), got: C.norm(outs[0]), diff: null }; }
    var e = C.norm(expect);
    for (i = 0; i < outs.length; i++) { var g = C.norm(outs[i]); if (g === e) return { pass: true, how: 'exact' }; }
    for (i = 0; i < outs.length; i++) { var g2 = C.norm(outs[i]); if (g2.replace(/\s+/g, '') === e.replace(/\s+/g, '') && e.replace(/\s+/g, '')) return { pass: true, how: 'spacing', note: 'Passed — only the spacing differs from the expected output.' }; }
    if (opts.contains) for (i = 0; i < outs.length; i++) { var g3 = C.norm(outs[i]).replace(/\s+/g, ' '); if (e && g3.indexOf(e.replace(/\s+/g, ' ')) >= 0) return { pass: true, how: 'contains' }; }
    return { pass: false, how: 'exact', exp: e, got: C.norm(outs[0]), diff: C.diff(e, C.norm(outs[0])) };
  };
  C.diff = function (a, b) {
    var A = a.split('\n'), B = b.split('\n'), n = Math.min(60, Math.max(A.length, B.length)), rows = [], first = -1;
    for (var i = 0; i < n; i++) {
      var x = A[i], y = B[i], same = x === y;
      if (!same && first < 0) first = i;
      var col = -1; if (!same && x != null && y != null) { col = 0; while (col < x.length && col < y.length && x.charAt(col) === y.charAt(col)) col++; }
      rows.push({ n: i + 1, e: x, g: y, same: same, col: col });
    }
    return { rows: rows, first: first, more: Math.max(A.length, B.length) > n };
  };
})();

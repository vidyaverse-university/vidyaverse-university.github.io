/* VidyaVerse v2 — Code Lab: simulated Node.js for the browser sandbox. NOT real Node — a tiny, honest shim:
   require('express' | 'http' | 'fs' (stdin only) | 'readline' | 'events' | 'path' | 'util' | 'os' | 'assert'), process, module.
   The function below is serialised into a sandboxed worker, so it must stay self-contained (no outside variables). */
(function () {
  'use strict';
  var C = window.VV2.Code = window.VV2.Code || {};
  C.nodeShim = function nodeShim(ctx) {
    var STATUS = { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict', 422: 'Unprocessable Entity', 429: 'Too Many Requests', 500: 'Internal Server Error', 501: 'Not Implemented', 503: 'Service Unavailable' };
    function flat(a) { var o = []; (a || []).forEach(function (x) { if (Array.isArray(x)) o = o.concat(flat(x)); else o.push(x); }); return o; }

    /* ---------- events ---------- */
    function EventEmitter() { this._ev = {}; }
    EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (n, f) { (this._ev[n] = this._ev[n] || []).push(f); return this; };
    EventEmitter.prototype.once = function (n, f) { var me = this; function g() { me.off(n, g); f.apply(me, arguments); } return this.on(n, g); };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function (n, f) { var l = this._ev[n] || []; var i = l.indexOf(f); if (i >= 0) l.splice(i, 1); return this; };
    EventEmitter.prototype.emit = function (n) { var a = [].slice.call(arguments, 1), l = (this._ev[n] || []).slice(), me = this; l.forEach(function (f) { f.apply(me, a); }); return l.length > 0; };
    EventEmitter.prototype.removeAllListeners = function (n) { if (n) delete this._ev[n]; else this._ev = {}; return this; };
    EventEmitter.prototype.listenerCount = function (n) { return (this._ev[n] || []).length; };

    /* ---------- util / path / os ---------- */
    function inspect(v) { try { return typeof v === 'string' ? "'" + v + "'" : JSON.stringify(v); } catch (e) { return String(v); } }
    var util = {
      format: function (f) { var a = [].slice.call(arguments, 1); if (typeof f !== 'string') return [f].concat(a).map(function (x) { return typeof x === 'string' ? x : inspect(x); }).join(' '); var s = f.replace(/%[sdijo%]/g, function (m) { if (m === '%%') return '%'; if (!a.length) return m; var x = a.shift(); return m === '%d' || m === '%i' ? String(Number(x)) : m === '%s' ? String(x) : inspect(x); }); return a.length ? s + ' ' + a.map(function (x) { return typeof x === 'string' ? x : inspect(x); }).join(' ') : s; },
      inspect: inspect, promisify: function (fn) { return function () { var a = [].slice.call(arguments); return new Promise(function (res, rej) { fn.apply(null, a.concat([function (e, v) { if (e) rej(e); else res(v); }])); }); }; },
      isDeepStrictEqual: function (a, b) { return JSON.stringify(a) === JSON.stringify(b); }
    };
    var path = {
      sep: '/', delimiter: ':',
      join: function () { return path.normalize([].slice.call(arguments).join('/')); },
      resolve: function () { var p = [].slice.call(arguments).reduce(function (acc, x) { return x.charAt(0) === '/' ? x : acc + '/' + x; }, '/app'); return path.normalize(p); },
      normalize: function (p) { var abs = p.charAt(0) === '/', out = []; p.split('/').forEach(function (s) { if (!s || s === '.') return; if (s === '..') out.pop(); else out.push(s); }); return (abs ? '/' : '') + out.join('/') || '.'; },
      basename: function (p, ext) { var b = String(p).replace(/\/+$/, '').split('/').pop(); return ext && b.slice(-ext.length) === ext ? b.slice(0, -ext.length) : b; },
      dirname: function (p) { var a = String(p).split('/'); a.pop(); return a.join('/') || '/'; },
      extname: function (p) { var b = path.basename(p), i = b.lastIndexOf('.'); return i > 0 ? b.slice(i) : ''; },
      parse: function (p) { var ext = path.extname(p); return { root: p.charAt(0) === '/' ? '/' : '', dir: path.dirname(p), base: path.basename(p), ext: ext, name: path.basename(p, ext) }; }
    };
    var os = { EOL: '\n', platform: function () { return 'browser'; }, cpus: function () { return [{ model: 'your browser' }]; }, homedir: function () { return '/home/learner'; }, hostname: function () { return 'vidyaverse-sandbox'; }, type: function () { return 'Sandbox'; } };
    function AssertionError(m) { var e = new Error(m || 'Assertion failed'); e.name = 'AssertionError'; return e; }
    var assert = function (c, m) { if (!c) throw AssertionError(m); };
    assert.ok = assert;
    assert.equal = function (a, b, m) { if (a != b) throw AssertionError(m || inspect(a) + ' == ' + inspect(b)); }; // eslint-disable-line eqeqeq
    assert.strictEqual = function (a, b, m) { if (a !== b) throw AssertionError(m || 'Expected ' + inspect(a) + ' to strictly equal ' + inspect(b)); };
    assert.notStrictEqual = function (a, b, m) { if (a === b) throw AssertionError(m || 'Expected values to differ'); };
    assert.deepStrictEqual = assert.deepEqual = function (a, b, m) { if (JSON.stringify(a) !== JSON.stringify(b)) throw AssertionError(m || 'Expected ' + inspect(a) + ' to deeply equal ' + inspect(b)); };
    assert.throws = function (fn, x, m) { var t = false; try { fn(); } catch (e) { t = true; } if (!t) throw AssertionError(m || 'Expected the function to throw'); };

    /* ---------- process ---------- */
    var stdinEm = new EventEmitter();
    var stdinStarted = false;
    function startStdin() { if (stdinStarted) return; stdinStarted = true; ctx.setTimeout(function () { var s = ctx.stdin(); if (s) stdinEm.emit('data', s); stdinEm.emit('end'); stdinEm.emit('close'); }, 0); }
    var process = new EventEmitter();
    process.argv = ['node', '/app/index.js']; process.env = { NODE_ENV: 'development', PORT: '3000' }; process.platform = 'browser'; process.version = 'v20-simulated';
    process.versions = { node: '20 (simulated)' }; process.pid = 4242; process.exitCode = 0;
    process.cwd = function () { return '/app'; }; process.uptime = function () { return 1; };
    process.exit = function (c) { ctx.exit(c == null ? process.exitCode : c); };
    process.nextTick = function (fn) { var a = [].slice.call(arguments, 1); Promise.resolve().then(function () { fn.apply(null, a); }); };
    process.hrtime = function () { var t = Date.now(); return [Math.floor(t / 1000), (t % 1000) * 1e6]; };
    process.hrtime.bigint = function () { return typeof BigInt === 'function' ? BigInt(Date.now()) * BigInt(1000000) : Date.now() * 1e6; };
    process.memoryUsage = function () { return { rss: 0, heapUsed: 0, heapTotal: 0 }; };
    process.stdout = { write: function (s) { ctx.out(String(s)); return true; }, isTTY: false, columns: 80 };
    process.stderr = { write: function (s) { ctx.out(String(s), 'err'); return true; }, isTTY: false };
    process.stdin = { on: function (n, f) { stdinEm.on(n, f); startStdin(); return process.stdin; }, once: function (n, f) { stdinEm.once(n, f); startStdin(); return process.stdin; }, setEncoding: function () { return process.stdin; }, resume: function () { startStdin(); return process.stdin; }, pause: function () { return process.stdin; }, isTTY: false };

    /* ---------- fs (stdin only) ---------- */
    function nofs(name) { return function () { var e = new Error('fs.' + name + ' is not available: the simulated server has no file system. (Only fs.readFileSync(0) for stdin works.)'); e.code = 'ENOSYS'; throw e; }; }
    var fs = {
      readFileSync: function (f, enc) { if (f === 0 || f === '/dev/stdin' || f === '/dev/fd/0') return ctx.stdin(); var e = new Error("ENOENT: no such file or directory, open '" + f + "' (the browser sandbox has no files — use stdin)"); e.code = 'ENOENT'; throw e; },
      existsSync: function () { return false; }, writeFileSync: nofs('writeFileSync'), appendFileSync: nofs('appendFileSync'), readdirSync: nofs('readdirSync'), mkdirSync: nofs('mkdirSync'),
      readFile: function (f, a, b) { var cb = typeof a === 'function' ? a : b; ctx.setTimeout(function () { try { cb(null, fs.readFileSync(f)); } catch (e) { cb(e); } }, 0); },
      writeFile: function (f, d, a, b) { var cb = typeof a === 'function' ? a : b; ctx.setTimeout(function () { var e = new Error('No file system in the simulated server.'); e.code = 'ENOSYS'; if (cb) cb(e); }, 0); }
    };
    fs.promises = { readFile: function (f) { return new Promise(function (res, rej) { try { res(fs.readFileSync(f)); } catch (e) { rej(e); } }); } };

    /* ---------- readline ---------- */
    var readline = {
      createInterface: function () {
        var rl = new EventEmitter(), lines = null, idx = 0, closed = false, waiting = [], started = false;
        function load() { if (lines) return; var s = ctx.stdin(); lines = s ? s.split('\n') : []; if (s && s.slice(-1) === '\n') lines.pop(); }
        function pump() {
          if (started) return; started = true;
          ctx.setTimeout(function step() {
            load();
            while (idx < lines.length && !closed && !waiting.length) { var l = lines[idx++]; rl.emit('line', l); }
            if (!waiting.length && !closed && idx >= lines.length) rl.close();
          }, 0);
        }
        rl.on = function (n, f) { EventEmitter.prototype.on.call(rl, n, f); if (n === 'line') pump(); if (n === 'close') pump(); return rl; };
        rl.question = function (q, f) { ctx.out(String(q)); load(); ctx.setTimeout(function () { var l = idx < lines.length ? lines[idx++] : ''; ctx.out(l + '\n'); f(l); }, 0); };
        rl.close = function () { if (closed) return; closed = true; rl.emit('close'); };
        rl.setPrompt = function () { }; rl.prompt = function () { pump(); };
        rl[Symbol.asyncIterator] = function () { load(); return { next: function () { return Promise.resolve(idx < lines.length ? { value: lines[idx++], done: false } : { value: undefined, done: true }); }, 'return': function () { return Promise.resolve({ done: true }); } }; };
        return rl;
      }
    };

    /* ---------- express (tiny, honest) ---------- */
    function compile(p, end) {
      if (p instanceof RegExp) return { re: p, keys: [] };
      var keys = [], s = String(p == null ? '/' : p), re = '';
      if (s.length > 1) s = s.replace(/\/+$/, '');
      if (s === '/' || s === '') return { re: end ? /^\/?$/ : /^(?=\/|$)/, keys: [] };
      for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c === ':') { var m = /^:([A-Za-z_]\w*)(\?)?/.exec(s.slice(i)); if (m) { keys.push(m[1]); re += m[2] ? '(?:([^/]+))?' : '([^/]+)'; i += m[0].length - 1; continue; } }
        if (c === '*') { keys.push(String(keys.length)); re += '(.*)'; continue; }
        re += /[.+?^${}()|[\]\\\/]/.test(c) ? '\\' + c : c;
      }
      return { re: new RegExp('^' + re + (end ? '\\/?$' : '(?=\\/|$)'), 'i'), keys: keys };
    }
    function Router() {
      var stack = [];
      var router = function (req, res, next) { router.handle(req, res, next); };
      router.stack = stack;
      function add(method, p, fns) {
        fns.forEach(function (fn) {
          if (typeof fn !== 'function') throw new TypeError((method ? 'app.' + method.toLowerCase() : 'app.use') + '() needs a function (a route handler or middleware), but got ' + typeof fn);
          stack.push({ method: method, path: p, m: compile(p, !!method), fn: fn, use: !method });
        });
      }
      ['get', 'post', 'put', 'patch', 'delete', 'all', 'options', 'head'].forEach(function (mt) {
        router[mt] = function (p) { add(mt === 'all' ? '*' : mt.toUpperCase(), p, flat([].slice.call(arguments, 1))); return router; };
      });
      router.use = function (p) { var a = [].slice.call(arguments); if (typeof p === 'function' || Array.isArray(p)) p = '/'; else a.shift(); add(null, p, flat(a)); return router; };
      router.route = function (p) { var r = {}; ['get', 'post', 'put', 'patch', 'delete', 'all'].forEach(function (mt) { r[mt] = function () { router[mt].apply(null, [p].concat([].slice.call(arguments))); return r; }; }); return r; };
      router.handle = function (req, res, done) {
        var i = 0, base = req.baseUrl || '', path0 = req.path;
        function next(err) {
          if (err === 'route' || err === 'router') err = null;
          if (res.headersSent) return;
          var L = stack[i++];
          if (!L) { req.path = path0; req.baseUrl = base; return done(err); }
          req.path = path0; req.baseUrl = base;
          var m = L.m.re.exec(path0);
          if (!m) return next(err);
          if (L.method && L.method !== '*' && L.method !== req.method && !(L.method === 'GET' && req.method === 'HEAD')) return next(err);
          var isErr = L.fn.length === 4;
          if (err ? !isErr : isErr) return next(err);
          var params = {}; L.m.keys.forEach(function (k, j) { if (m[j + 1] !== undefined) { try { params[k] = decodeURIComponent(m[j + 1]); } catch (x) { params[k] = m[j + 1]; } } });
          if (L.use) { var cut = m[0]; if (cut && cut !== '/') { req.baseUrl = base + cut; req.path = path0.slice(cut.length) || '/'; } } else req.params = params;
          try { var r = err ? L.fn(err, req, res, next) : L.fn(req, res, next); if (r && typeof r.then === 'function') r.then(null, function (e) { next(e || new Error('Rejected')); }); }
          catch (e) { next(e); }
        }
        next();
      };
      return router;
    }
    function bodyParser(kind) {
      return function (req, res, next) {
        var ct = String(req.headers['content-type'] || ''), b = req._raw;
        if (b == null || b === '') { if (req.body === undefined) req.body = kind === 'text' ? '' : {}; return next(); }
        if (kind === 'json' && /json/.test(ct)) { try { req.body = JSON.parse(b); } catch (e) { var er = new SyntaxError('Unexpected token in JSON body: ' + e.message); er.status = 400; return next(er); } }
        else if (kind === 'urlencoded' && /x-www-form-urlencoded/.test(ct)) { var o = {}; b.split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); o[decodeURIComponent(p[0].replace(/\+/g, ' '))] = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); }); req.body = o; }
        else if (kind === 'text' && /text/.test(ct)) req.body = b;
        else if (req.body === undefined) req.body = {};
        next();
      };
    }
    function express() {
      var app = Router(), settings = { 'x-powered-by': true, env: 'development' }, origGet = app.get;
      app.locals = {}; app.settings = settings;
      app.get = function (p) { if (arguments.length === 1 && typeof p === 'string') return settings[p]; return origGet.apply(app, arguments); };
      app.set = function (k, v) { settings[k] = v; return app; }; app.enable = function (k) { settings[k] = true; return app; }; app.disable = function (k) { settings[k] = false; return app; };
      app.listen = function (port, host, cb) {
        if (typeof port === 'function') { cb = port; port = 3000; } if (typeof host === 'function') cb = host;
        ctx.listen(app); var srv = { close: function (f) { if (f) ctx.setTimeout(f, 0); return srv; }, address: function () { return { port: +port || 3000, address: '127.0.0.1' }; }, on: function () { return srv; } };
        if (cb) ctx.setTimeout(function () { cb(); }, 0); return srv;
      };
      return app;
    }
    express.Router = function () { return Router(); };
    express.json = function () { return bodyParser('json'); };
    express.urlencoded = function () { return bodyParser('urlencoded'); };
    express.text = function () { return bodyParser('text'); };
    express['static'] = function () { return function (req, res, next) { next(); }; };

    /* ---------- http (raw) ---------- */
    var http = {
      STATUS_CODES: STATUS,
      createServer: function (handler) {
        var srv = new EventEmitter(); if (handler) srv.on('request', handler);
        srv.handle = function (req, res, done) {
          var r = new EventEmitter(); for (var k in req) if (k !== 'on' && k !== 'emit') r[k] = req[k];
          r.url = req.url; r.method = req.method; r.headers = req.headers;
          if (!srv.listenerCount('request')) return done();
          srv.emit('request', r, res);
          ctx.setTimeout(function () { if (req._raw) r.emit('data', req._raw); r.emit('end'); }, 0);
        };
        srv.listen = function (port, host, cb) { if (typeof port === 'function') cb = port; if (typeof host === 'function') cb = host; ctx.listen(srv); if (cb) ctx.setTimeout(function () { cb(); }, 0); return srv; };
        srv.close = function (f) { if (f) ctx.setTimeout(f, 0); return srv; };
        srv.address = function () { return { port: 3000, address: '127.0.0.1' }; };
        return srv;
      },
      get: function () { throw new Error('Outgoing HTTP requests are switched off in the sandbox.'); },
      request: function () { throw new Error('Outgoing HTTP requests are switched off in the sandbox.'); }
    };

    var MODS = { express: express, http: http, https: http, fs: fs, 'fs/promises': fs.promises, readline: readline, events: EventEmitter, path: path, util: util, os: os, assert: assert };
    EventEmitter.EventEmitter = EventEmitter;
    function req(name) {
      var n = String(name).replace(/^node:/, '');
      if (Object.prototype.hasOwnProperty.call(MODS, n)) return MODS[n];
      if (n === 'crypto') return { randomUUID: function () { return self.crypto && self.crypto.randomUUID ? self.crypto.randomUUID() : 'uuid-' + Math.random().toString(16).slice(2); }, randomInt: function (a, b) { if (b == null) { b = a; a = 0; } return a + Math.floor(Math.random() * (b - a)); } };
      var e = new Error("Cannot find module '" + name + "'. The simulated server only has built-in shims for: " + Object.keys(MODS).concat(['crypto']).join(', ') + '. npm packages cannot be installed in the browser sandbox.');
      e.code = 'MODULE_NOT_FOUND'; throw e;
    }

    /* ---------- incoming fake requests ---------- */
    function makeReq(d) {
      var u = String(d.path || '/'); if (u.charAt(0) !== '/') u = '/' + u;
      var qi = u.indexOf('?'), p = qi >= 0 ? u.slice(0, qi) : u, qs = qi >= 0 ? u.slice(qi + 1) : '', query = {};
      qs.split('&').forEach(function (kv) { if (!kv) return; var a = kv.split('='), k, v; try { k = decodeURIComponent(a[0].replace(/\+/g, ' ')); v = decodeURIComponent((a[1] || '').replace(/\+/g, ' ')); } catch (x) { k = a[0]; v = a[1] || ''; } if (Object.prototype.hasOwnProperty.call(query, k)) query[k] = [].concat(query[k], v); else query[k] = v; });
      var headers = { host: 'localhost:3000', 'user-agent': 'VidyaVerse-FakeClient/1.0', accept: '*/*' };
      Object.keys(d.headers || {}).forEach(function (k) { headers[k.toLowerCase()] = String(d.headers[k]); });
      var raw = d.body == null ? '' : String(d.body);
      if (raw && !headers['content-type']) headers['content-type'] = /^\s*[\[{]/.test(raw) ? 'application/json' : 'text/plain';
      var r = { method: String(d.method || 'GET').toUpperCase(), url: u, originalUrl: u, path: p, baseUrl: '', query: query, params: {}, headers: headers, _raw: raw, body: undefined, ip: '127.0.0.1', ips: [], hostname: 'localhost', protocol: 'http', secure: false, cookies: {}, signedCookies: {} };
      r.get = r.header = function (n) { return headers[String(n).toLowerCase()]; };
      r.is = function (t) { var ct = headers['content-type'] || ''; return ct.indexOf(t) >= 0 ? t : false; };
      r.accepts = function () { return arguments[0] || '*/*'; };
      return r;
    }
    function makeRes(finish) {
      var res = { statusCode: 200, statusMessage: '', headersSent: false, finished: false, locals: {}, _h: { 'x-powered-by': 'Express (simulated)' }, _buf: '' };
      function end(b) {
        if (res.headersSent) { ctx.out('Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client\n', 'err'); return res; }
        res.headersSent = true; res.finished = true; res.writableEnded = true;
        finish({ status: res.statusCode, headers: res._h, body: res._buf + (b == null ? '' : String(b)) }); return res;
      }
      res.status = function (c) { res.statusCode = +c; return res; };
      res.set = res.header = function (k, v) { if (k && typeof k === 'object') { for (var x in k) res._h[x.toLowerCase()] = String(k[x]); } else res._h[String(k).toLowerCase()] = String(v); return res; };
      res.setHeader = function (k, v) { res._h[String(k).toLowerCase()] = String(v); return res; };
      res.get = res.getHeader = function (k) { return res._h[String(k).toLowerCase()]; };
      res.removeHeader = function (k) { delete res._h[String(k).toLowerCase()]; };
      res.type = res.contentType = function (t) { res._h['content-type'] = t.indexOf('/') >= 0 ? t : ({ json: 'application/json', html: 'text/html', text: 'text/plain', txt: 'text/plain', css: 'text/css', js: 'application/javascript' }[t] || 'text/plain'); return res; };
      res.json = function (o) { if (!res._h['content-type']) res._h['content-type'] = 'application/json; charset=utf-8'; return end(JSON.stringify(o === undefined ? null : o)); };
      res.send = function (b) {
        if (b === undefined || b === null) return end('');
        if (typeof b === 'number') { res.statusCode = b; if (!res._h['content-type']) res._h['content-type'] = 'text/plain; charset=utf-8'; return end(STATUS[b] || String(b)); }
        if (typeof b === 'object') return res.json(b);
        if (typeof b === 'boolean') return res.json(b);
        if (!res._h['content-type']) res._h['content-type'] = 'text/html; charset=utf-8';
        return end(String(b));
      };
      res.end = function (b) { return end(b); };
      res.write = function (c) { res._buf += String(c); return true; };
      res.writeHead = function (c, m, hd) { res.statusCode = +c; if (typeof m === 'object') hd = m; if (hd) res.set(hd); return res; };
      res.sendStatus = function (c) { res.statusCode = +c; res._h['content-type'] = 'text/plain; charset=utf-8'; return end(STATUS[c] || String(c)); };
      res.redirect = function (a, b) { var code = typeof a === 'number' ? a : 302, url = typeof a === 'number' ? b : a; res.statusCode = code; res._h.location = String(url); return end('Found. Redirecting to ' + url); };
      res.location = function (u) { res._h.location = String(u); return res; };
      res.cookie = function (k, v) { res._h['set-cookie'] = k + '=' + v; return res; }; res.clearCookie = function () { return res; };
      res.append = function (k, v) { var x = res._h[k.toLowerCase()]; res._h[k.toLowerCase()] = x ? x + ', ' + v : String(v); return res; };
      res.format = function (o) { var f = o['application/json'] || o.json || o['text/html'] || o.html || o['default']; if (f) f(); else res.sendStatus(406); return res; };
      res.vary = function () { return res; };
      return res;
    }
    function request(d, SERVER, post) {
      var t0 = Date.now(), answered = false;
      function answer(r) { if (answered) return; answered = true; r.t = 'res'; r.id = d.id; r.ms = Date.now() - t0; post(r); }
      if (!SERVER) { answer({ status: 0, headers: {}, body: 'No server is listening — call app.listen(3000) in your code, then press Run.' }); return; }
      var rq = makeReq(d);
      var rs = makeRes(answer);
      ctx.setTimeout(function () { if (!answered) { rs.headersSent = true; answer({ status: 0, headers: {}, body: '⏳ Your route never sent a response. Every request needs res.send(), res.json(), res.end() or next().' }); } }, 3000);
      try {
        SERVER.handle(rq, rs, function (err) {
          if (rs.headersSent) return;
          if (err) {
            ctx.out((err && err.stack ? String(err.stack).split('\n')[0] : String(err)) + '\n', 'err');
            rs.status(err.status || err.statusCode || 500).type('text/html; charset=utf-8').end('<pre>' + (err.status === 400 ? 'Bad Request' : 'Internal Server Error') + '</pre>');
          } else rs.status(404).type('text/html; charset=utf-8').end('<pre>Cannot ' + rq.method + ' ' + rq.path + '</pre>');
        });
      } catch (e) { ctx.out(String(e && e.message || e) + '\n', 'err'); if (!rs.headersSent) rs.status(500).end('Internal Server Error'); }
    }
    return { require: req, process: process, request: request };
  };
})();

/* VidyaVerse v2 — Code Lab live previews (HTML · CSS · React) in an opaque-origin sandboxed frame with a strict CSP:
   console capture, error line numbers, loop guard, links/forms intercepted, probe() for tests. Needs code-run.js first. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, C = VV2.Code, CDN = C.CDN, vvTok = C.tok, vvProtect = C.protect, vvLP = C.lp;
  /* ======================= live previews: HTML · CSS · React ======================= */
  function previewMain() {
    var off = +'__OFF__';
    function send(k, s, extra) { try { var m = { vvp: 1, k: k, s: s }; if (extra) for (var x in extra) m[x] = extra[x]; parent.postMessage(m, '*'); } catch (e) { } }
    function f(v, d) {
      d = d || 0; if (v === null) return 'null'; var t = typeof v;
      if (t === 'string') return d ? "'" + v + "'" : v; if (t !== 'object' && t !== 'function') return String(v);
      if (t === 'function') return '[Function: ' + (v.name || 'anonymous') + ']';
      if (v instanceof Error) return v.name + ': ' + v.message;
      if (typeof Element !== 'undefined' && v instanceof Element) return '<' + v.tagName.toLowerCase() + (v.id ? '#' + v.id : '') + '>';
      if (d > 2) return Array.isArray(v) ? '[Array]' : '[Object]';
      try { if (Array.isArray(v)) return '[ ' + v.map(function (x) { return f(x, d + 1); }).join(', ') + ' ]'; return '{ ' + Object.keys(v).map(function (k) { return k + ': ' + f(v[k], d + 1); }).join(', ') + ' }'; } catch (e) { return String(v); }
    }
    ['log', 'info', 'debug', 'warn', 'error'].forEach(function (k) { var o = console[k]; console[k] = function () { send(k === 'warn' ? 'warn' : k === 'error' ? 'err' : 'out', [].map.call(arguments, function (a) { return f(a, 0); }).join(' ')); try { o.apply(console, arguments); } catch (e) { } }; });
    function lineFrom(err, l) { var m = err && err.stack && /App\.jsx:(\d+)/.exec(String(err.stack)); if (m) return +m[1]; if (err && err.vvLine) return err.vvLine; return l ? Math.max(1, l - off) : 0; }
    window.onerror = function (msg, src, l, c, err) { var ln = lineFrom(err, l); send('err', String(msg).replace(/^Uncaught /, '') + (ln ? ' (line ' + ln + ')' : ''), { line: ln }); return true; };
    window.addEventListener('unhandledrejection', function (e) { send('err', 'Unhandled promise rejection: ' + f(e.reason, 0)); });
    window.alert = function (m) { send('out', '[alert] ' + m); };
    window.confirm = function (m) { send('out', '[confirm] ' + m + ' → OK'); return true; };
    window.prompt = function (m) { send('out', '[prompt] ' + m + ' → (prompts are not available in the preview)'); return null; };
    window.__lp = vvLP(2500);
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null; if (!a) return;
      var href = a.getAttribute('href') || ''; if (href.charAt(0) === '#') return;
      e.preventDefault(); send('info', '🔗 Link to ' + href + ' — links are switched off inside the preview.');
    }, true);
    document.addEventListener('submit', function (e) {
      e.preventDefault(); var fd = []; try { new FormData(e.target).forEach(function (v, k) { fd.push(k + '=' + v); }); } catch (x) { }
      send('info', '📨 Form submitted' + (fd.length ? ': ' + fd.join(', ') : '') + ' (nothing was sent anywhere)');
    }, true);
    window.addEventListener('message', function (e) {
      var d = e.data || {}; if (d.vvq !== 'probe') return;
      var r = { text: '', styles: [], html: '' };
      try { r.text = document.body ? document.body.innerText : ''; r.html = document.body ? document.body.innerHTML.slice(0, 30000) : ''; } catch (x) { }
      (d.checks || []).forEach(function (c) { var v = null; try { var el = document.querySelector(c.selector); v = el ? getComputedStyle(el).getPropertyValue(c.css) : null; } catch (x) { } r.styles.push(v); });
      send('probe', '', { id: d.id, r: r });
    });
    window.__vvLoadFail = function (what) { window['__vvNo' + what] = 1; };
    window.__vvReact = function (src) {
      if (!window.React || !window.ReactDOM || !window.Babel || window.__vvNoReact) { send('err', '📴 Could not load React/Babel from cdn.jsdelivr.net — are you offline? Your code is saved; try again when online.'); send('ready', ''); return; }
      var L = src.split('\n');
      for (var i = 0; i < L.length; i++) {
        var ln = L[i], m = /^\s*import\s+(.+?)\s+from\s+['"]([^'"]+)['"];?\s*$/.exec(ln);
        if (m) {
          var lib = /react-dom/.test(m[2]) ? 'ReactDOM' : /^react$/.test(m[2]) ? 'React' : null, spec = m[1], outl = '';
          if (lib) {
            var def = /^([A-Za-z_$][\w$]*)\s*(,|$)/.exec(spec), named = /\{([^}]*)\}/.exec(spec), star = /\*\s+as\s+([A-Za-z_$][\w$]*)/.exec(spec);
            if (def && !/^\{/.test(spec)) outl += 'var ' + def[1] + '=' + lib + ';';
            if (star) outl += 'var ' + star[1] + '=' + lib + ';';
            if (named) outl += 'var {' + named[1].replace(/\s+as\s+/g, ': ') + '}=' + lib + ';';
          }
          L[i] = outl || '/' + '/ (import removed in the preview)';
        } else if (/^\s*import\s+['"][^'"]+['"];?\s*$/.test(ln)) L[i] = '/' + '/ (import removed in the preview)';
        else L[i] = ln.replace(/^(\s*)export\s+default\s+(function|class)\b/, '$1$2').replace(/^(\s*)export\s+default\s+[A-Za-z_$][\w$]*\s*;?\s*$/, '$1').replace(/^(\s*)export\s+(const|let|var|function|class)\b/, '$1$2');
      }
      var code = L.join('\n'), out;
      try { out = Babel.transform(code, { presets: ['react'], retainLines: true, filename: 'App.jsx' }).code; }
      catch (e) { var l2 = e.loc ? e.loc.line : 0; send('err', 'JSX/syntax error: ' + String(e.message).split('\n')[0].replace(/^\/?App\.jsx: /, '') + (l2 ? ' (line ' + l2 + ')' : ''), { line: l2 }); send('ready', ''); return; }
      var auto = !/\bcreateRoot\s*\(|ReactDOM\.render\s*\(/.test(code) && /\bfunction\s+App\b|\b(?:const|let|var|class)\s+App\b/.test(code);
      out = vvProtect(out);
      if (auto) out += '\n;ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));';
      try { (0, eval)(out + '\n//# sourceURL=App.jsx'); } catch (e2) { var l3 = lineFrom(e2, 0); send('err', e2.name + ': ' + e2.message + (l3 ? ' (line ' + l3 + ')' : ''), { line: l3 }); }
      setTimeout(function () { send('ready', ''); }, 60);
    };
    if (document.readyState === 'complete') setTimeout(function () { send('ready', ''); }, 30);
    else window.addEventListener('load', function () { if (!window.__vvIsReact) setTimeout(function () { send('ready', ''); }, 30); });
  }
  var DEMO_HTML = '<main class="demo">\n  <h1>Hello, VidyaVerse!</h1>\n  <p class="lead">This demo page is here so your CSS has something to style.</p>\n  <button class="btn">Click me</button>\n  <ul class="list">\n    <li>Chai</li>\n    <li>Samosa</li>\n    <li>Jalebi</li>\n  </ul>\n  <div class="card"><h2>Card title</h2><p>Cards, boxes and borders.</p></div>\n</main>';
  C.DEMO_HTML = DEMO_HTML;
  var CSP_PREVIEW = "default-src 'none'; img-src data: blob: https:; media-src data: blob:; font-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; connect-src 'none'; form-action 'none'; base-uri 'none'";
  function protectHTML(html) {
    return String(html).replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, function (m, attrs, body) {
      if (/\bsrc\s*=/i.test(attrs) || (/\btype\s*=/i.test(attrs) && !/type\s*=\s*["']?(text\/javascript|module|application\/javascript)/i.test(attrs))) return m;
      return '<script' + attrs + '>' + vvProtect(body) + '<\/script>';
    });
  }
  C.previewDoc = function (lang, code, opts) {
    opts = opts || {};
    var script = vvTok + '\n' + vvProtect + '\n' + vvLP + '\n(' + previewMain + ')();';
    var head = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="' + CSP_PREVIEW + '"><script>' + script.replace(/<\/script/gi, '<\\/script') + '<\/script><style>html{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color-scheme:light}body{margin:12px;line-height:1.5}</style>';
    var doc;
    if (lang === 'react') {
      doc = head + '<script>window.__vvIsReact=1<\/script></head><body><div id="root"></div>' +
        '<script src="' + CDN.react + '" onerror="__vvLoadFail(\'React\')"><\/script><script src="' + CDN.reactDom + '" onerror="__vvLoadFail(\'React\')"><\/script><script src="' + CDN.babel + '" onerror="__vvLoadFail(\'React\')"><\/script>' +
        '<script>__vvReact(' + JSON.stringify(String(code)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ')<\/script></body></html>';
    } else if (lang === 'css') {
      doc = head + '<style>\n' + String(code).replace(/<\/style/gi, '<\\/style') + '\n</style></head><body>\n' + (opts.html || DEMO_HTML) + '\n</body></html>';
    } else {
      doc = head + '</head>\n' + protectHTML(code);
    }
    var off = head.split('\n').length - 1 + (lang === 'html' ? 1 : 0);
    return doc.replace("+'__OFF__'", '+' + JSON.stringify(String(off)));
  };
  /* mount a live preview in host; returns {frame, ready, probe(checks), destroy} */
  C.preview = function (host, lang, code, opts) {
    opts = opts || {};
    var fr = h('iframe', { class: 'cl-frame', title: 'Live preview of your ' + (C.LANGS[lang] || {}).name + ' code', sandbox: 'allow-scripts', referrerpolicy: 'no-referrer', loading: 'eager' });
    var readyRes, ready = new Promise(function (r) { readyRes = r; }), probes = {}, pseq = 0, dead = false;
    function onMsg(e) {
      if (dead || e.source !== fr.contentWindow) return;
      var d = e.data || {}; if (!d.vvp) return;
      if (d.k === 'ready') readyRes(true);
      else if (d.k === 'probe') { var p = probes[d.id]; if (p) { delete probes[d.id]; p(d.r); } }
      else if (opts.onOut) opts.onOut(String(d.s) + '\n', d.k === 'info' ? 'info' : d.k, d.line || 0);
    }
    window.addEventListener('message', onMsg);
    fr.srcdoc = C.previewDoc(lang, code, opts);
    host.innerHTML = ''; host.appendChild(fr);
    setTimeout(function () { readyRes(false); }, lang === 'react' ? 15000 : 4000);
    return {
      frame: fr, ready: ready,
      probe: function (checks) {
        return ready.then(function () { return new Promise(function (res) { var id = ++pseq; probes[id] = res; try { fr.contentWindow.postMessage({ vvq: 'probe', id: id, checks: checks || [] }, '*'); } catch (e) { res(null); } setTimeout(function () { if (probes[id]) { delete probes[id]; res(null); } }, 1500); }); });
      },
      destroy: function () { dead = true; window.removeEventListener('message', onMsg); if (fr.parentNode) fr.parentNode.removeChild(fr); }
    };
  };

})();

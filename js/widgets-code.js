/* VidyaVerse v2 — widget "code": the Code Lab activity (editor · run · tests with diffs · stdin · hint · solution · XP).
   Also provides VV2.Code.lab(host, opts), the shared panel used by the free Code Studio (#/code).
   Heavy parts (editor, runtimes, previews, interpreters) load lazily on first use. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var W = VV2.W = VV2.W || {};
  var C = VV2.Code = VV2.Code || {};

  function cssOnce() {
    if (document.getElementById('vvCodeCss')) return Promise.resolve();
    return new Promise(function (res) {
      var l = h('link', { rel: 'stylesheet', href: 'css/code.css?v=' + VV2.version, id: 'vvCodeCss' });
      l.onload = res; l.onerror = res; document.head.appendChild(l); setTimeout(res, 3000);
    });
  }
  C.deps = function () { return Promise.all([cssOnce(), VV2.need(['code-editor', 'code-run'])]).then(function () { return VV2.need('code-preview'); }); };

  var KINDTXT = { real: ['Real runtime', 'k-real'], sim: ['Simulated', 'k-sim'], edu: ['Educational interpreter', 'k-edu'], subset: ['Teaching subset', 'k-sub'] };
  function parseReq(t) {
    var r = t.request; if (!r) return null;
    if (typeof r === 'string') { var m = /^\s*([A-Za-z]+)\s+(\S+)(?:\s+([\s\S]*))?$/.exec(r); return m ? { method: m[1].toUpperCase(), path: m[2], body: m[3] || t.body || '' } : { method: 'GET', path: r }; }
    return { method: String(r.method || 'GET').toUpperCase(), path: r.path || '/', body: typeof r.body === 'object' ? JSON.stringify(r.body) : (r.body || ''), headers: r.headers || {} };
  }
  function trunc(s, n) { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n) + '…' : s; }

  /* ===================== the shared Code Lab panel ===================== */
  C.lab = function (host, o) {
    o = o || {};
    var lang = C.langOf(o.lang), L = C.LANGS[lang], web = C.isWeb(lang), eng = C.ENGINES[lang] || {};
    var tests = Array.isArray(o.tests) ? o.tests : [], busy = false, alive = true, prev = null, peeked = false, mine = null, saveT = 0, autoT = 0, reactStarted = false;
    var draftKey = o.draftKey || null, store = C.cstore.get(), draft = draftKey && store.drafts[draftKey];
    var startCode = draft && typeof draft.c === 'string' ? draft.c : (o.code != null ? o.code : '');
    var root = h('div', { class: 'cl' + (web ? ' cl-web' : '') + (o.studio ? ' cl-studio' : ''), 'data-lang': lang });
    host.appendChild(root);

    /* --- header --- */
    var kt = KINDTXT[eng.kind] || KINDTXT.real;
    var engChip = h('button', { type: 'button', class: 'cl-eng ' + kt[1], 'aria-expanded': 'false', title: 'What runs my code?' }, [h('span', { class: 'cl-dot', 'aria-hidden': 'true' }), h('span', { class: 'cl-engt' }, eng.label || L.name), h('span', { class: 'cl-kind' }, kt[0]), h('span', { 'aria-hidden': 'true' }, ' ⓘ')]);
    var note = h('p', { class: 'cl-note', hidden: true }, eng.note || '');
    engChip.addEventListener('click', function () { note.hidden = !note.hidden; engChip.setAttribute('aria-expanded', note.hidden ? 'false' : 'true'); });
    root.appendChild(h('div', { class: 'cl-head' }, [h('span', { class: 'cl-lang' }, [h('span', { 'aria-hidden': 'true' }, L.icon + ' '), L.name]), engChip]));
    root.appendChild(note);
    if (o.prompt) root.appendChild(h('div', { class: 'cl-prompt', html: VV2.md(o.prompt) }));
    if (draft && o.code != null && draft.c !== o.code) root.appendChild(h('p', { class: 'cl-restored', role: 'status' }, '💾 We restored your last attempt. Press ↺ Reset for the original starter code.'));

    /* --- editor + actions --- */
    var ed = C.editor({ value: startCode, lang: lang, label: (o.studio ? 'Code Studio editor, ' : 'Your code, ') + L.name, onRun: function () { run(); }, onTest: function () { check(); }, onSave: o.onSave, onChange: changed, minLines: o.minLines || 8, maxLines: o.maxLines || 24 });
    var bRun = h('button', { type: 'button', class: 'btn primary cl-run', 'aria-keyshortcuts': 'Control+Enter' }, [h('span', { 'aria-hidden': 'true' }, '▶'), ' Run']);
    var bCheck = tests.length ? h('button', { type: 'button', class: 'btn cl-check', 'aria-keyshortcuts': 'Control+Shift+Enter' }, [h('span', { 'aria-hidden': 'true' }, '🧪'), ' Check (' + tests.length + ' test' + (tests.length > 1 ? 's' : '') + ')']) : null;
    var bHint = o.hint ? h('button', { type: 'button', class: 'btn ghost small' }, '💡 Hint') : null;
    var bSol = o.solution ? h('button', { type: 'button', class: 'btn ghost small' }, '👀 Solution') : null;
    var bMine = h('button', { type: 'button', class: 'btn ghost small', hidden: true }, '↩ My code');
    var bReset = h('button', { type: 'button', class: 'btn ghost small' }, '↺ Reset');
    var bCopy = h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Copy code', title: 'Copy' }, '📋');
    var bDown = h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Download code as a file', title: 'Download' }, '⬇️');
    var kbd = h('span', { class: 'cl-kbd muted' }, [h('kbd', null, navigator.platform && /Mac/.test(navigator.platform) ? '⌘' : 'Ctrl'), '+', h('kbd', null, 'Enter'), ' runs']);
    var acts = h('div', { class: 'cl-acts' }, [bRun, bCheck, bHint, bSol, bMine, bReset, h('span', { class: 'cl-sp' }), kbd, bCopy, bDown]);
    var hintBox = h('div', { class: 'cl-hint', hidden: true, role: 'note' });
    var edCol = h('div', { class: 'cl-ed' }, [ed.el, acts, hintBox]);

    /* --- io column --- */
    var ioCol = h('div', { class: 'cl-io' });
    var split = h('div', { class: 'cl-split' }, [edCol, ioCol]);
    root.appendChild(split);
    var stdin = null, setupTa = null, prevHost = null, prevWrap = null, devBtn = null, autoBtn = null;
    if (web) {
      prevHost = h('div', { class: 'cl-prev' }, h('div', { class: 'cl-prev-empty' }, lang === 'react' ? [h('span', { 'aria-hidden': 'true' }, '⚛️'), h('p', null, 'Press ▶ Run to start React (it downloads React + Babel once, about 400 KB).')] : [h('p', null, 'Your page appears here.')]));
      devBtn = h('button', { type: 'button', class: 'icon-btn small', 'aria-pressed': 'false', 'aria-label': 'Preview at phone width (360 px)', title: 'Phone width' }, '📱');
      var reBtn = h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Reload the preview', title: 'Reload' }, '↻');
      autoBtn = h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': lang === 'react' ? 'false' : 'true' }, 'Live');
      prevWrap = h('div', { class: 'cl-pw' }, [h('div', { class: 'cl-pbar' }, [h('span', { class: 'cl-dots', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i')]), h('span', { class: 'cl-url' }, 'preview://your-page'), autoBtn, devBtn, reBtn]), prevHost]);
      ioCol.appendChild(prevWrap);
      devBtn.addEventListener('click', function () { var on = devBtn.getAttribute('aria-pressed') !== 'true'; devBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); prevWrap.classList.toggle('phone', on); });
      reBtn.addEventListener('click', function () { run(); });
      autoBtn.addEventListener('click', function () { var on = autoBtn.getAttribute('aria-pressed') !== 'true'; autoBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); if (on) run(); });
    } else {
      if (lang === 'sql' || lang === 'mongodb') {
        var sv = o.setup != null ? (typeof o.setup === 'string' ? o.setup : JSON.stringify(o.setup, null, 2)) : '';
        if (o.studio) {
          setupTa = h('textarea', { class: 'cl-setup', spellcheck: 'false', rows: '6', 'aria-label': lang === 'sql' ? 'Database setup script (SQL)' : 'Collections as JSON: [{"collection": "name", "docs": [...]}]' });
          setupTa.value = sv;
          ioCol.appendChild(h('details', { class: 'cl-det', open: true }, [h('summary', null, lang === 'sql' ? '🧱 Database setup (runs fresh before every query)' : '🍃 Collections (JSON) — your in-memory database'), setupTa]));
        } else if (sv) ioCol.appendChild(h('details', { class: 'cl-det' }, [h('summary', null, lang === 'sql' ? '🧱 See the tables your query runs on' : '🍃 See the documents in the collection'), h('pre', { class: 'cl-setpre' }, sv)]));
      }
      if (lang !== 'sql' && lang !== 'mongodb') {
        stdin = h('textarea', { class: 'cl-stdin', spellcheck: 'false', rows: '3', placeholder: 'Input for your program (one value per line)…', 'aria-label': 'Program input (stdin)' });
        stdin.value = tests[0] && tests[0].stdin ? tests[0].stdin : (o.stdin || '');
        stdin.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); } });
        ioCol.appendChild(h('label', { class: 'cl-lbl' }, [h('span', null, '⌨️ Input (stdin)'), stdin]));
      }
    }
    var lbText = h('span', { class: 'cl-lbt' }), lbFill = h('i'), loadbar = h('div', { class: 'cl-load', hidden: true, role: 'status', 'aria-live': 'polite' }, [h('div', { class: 'cl-lbar', 'aria-hidden': 'true' }, lbFill), lbText]);
    ioCol.appendChild(loadbar);
    var outPre = h('pre', { class: 'cl-out', tabindex: '0', 'aria-label': 'Output' }), foot = h('div', { class: 'cl-foot', 'aria-live': 'polite' });
    var tables = h('div', { class: 'cl-tables' });
    var conBox = h('div', { class: 'cl-con', role: 'log', 'aria-live': 'polite' }, [h('div', { class: 'cl-conh' }, [h('b', null, web ? '🪵 Console' : '🖥️ Output'), h('button', { type: 'button', class: 'btn ghost small', onclick: function () { clearOut(); } }, 'Clear')]), tables, outPre, foot]);
    ioCol.appendChild(conBox);
    outPre.appendChild(h('span', { class: 'o-info' }, web ? 'console.log messages from your page show here.' : 'Press ▶ Run to see what your program prints.'));

    /* --- node fake HTTP client --- */
    var http = null;
    if (lang === 'node') {
      var mSel = h('select', { 'aria-label': 'HTTP method' }, ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(function (m) { return h('option', null, m); }));
      var pIn = h('input', { type: 'text', value: '/', 'aria-label': 'Path, for example /api/hello?name=Asha', spellcheck: 'false', autocapitalize: 'off' });
      var bodyTa = h('textarea', { rows: '2', spellcheck: 'false', placeholder: '{"name": "Asha"}', 'aria-label': 'Request body (JSON)', hidden: true });
      var send = h('button', { type: 'button', class: 'btn small primary' }, 'Send ➜');
      var resBox = h('div', { class: 'cl-res', 'aria-live': 'polite' }, h('p', { class: 'muted' }, 'Run your server, then send it a request. Nothing leaves your browser.'));
      var quick = h('div', { class: 'cl-quick' });
      mSel.addEventListener('change', function () { bodyTa.hidden = /GET|DELETE/.test(mSel.value); });
      function doSend(m, p, b) {
        resBox.innerHTML = ''; resBox.appendChild(h('p', { class: 'muted' }, '⏳ ' + m + ' ' + p));
        C.request(m, p, b, b ? { 'content-type': /^\s*[\[{]/.test(b) ? 'application/json' : 'text/plain' } : {}).then(function (r) {
          resBox.innerHTML = '';
          var ct = (r.headers && r.headers['content-type']) || '', body = r.body == null ? '' : String(r.body), pretty = body;
          if (/json/.test(ct)) { try { pretty = JSON.stringify(JSON.parse(body), null, 2); } catch (e) { } }
          resBox.appendChild(h('div', { class: 'cl-resh' }, [h('span', { class: 'cl-st s' + String(r.status).charAt(0) }, r.status ? String(r.status) : '—'), h('code', null, m + ' ' + p), r.ms != null ? h('small', { class: 'muted' }, r.ms + ' ms') : null, ct ? h('small', { class: 'muted' }, ct) : null]));
          resBox.appendChild(h('pre', { class: 'cl-resb' }, trunc(pretty, 20000)));
        });
      }
      send.addEventListener('click', function () { doSend(mSel.value, pIn.value || '/', bodyTa.hidden ? '' : bodyTa.value); });
      pIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); send.click(); } });
      http = h('div', { class: 'cl-http' }, [h('div', { class: 'cl-httph' }, [h('b', null, '🛰️ Fake HTTP client'), h('small', { class: 'muted' }, ' — simulated server in your browser')]), h('div', { class: 'cl-req' }, [mSel, pIn, send]), bodyTa, quick, resBox]);
      ioCol.appendChild(http);
      tests.forEach(function (t) { var rq = parseReq(t); if (rq && quick.children.length < 6) quick.appendChild(h('button', { type: 'button', class: 'pill cl-qb', onclick: function () { mSel.value = rq.method; pIn.value = rq.path; bodyTa.hidden = /GET|DELETE/.test(rq.method); bodyTa.value = rq.body || ''; doSend(rq.method, rq.path, rq.body); } }, rq.method + ' ' + rq.path)); });
      C.nodeLog = function (s, k) { write(s, k); };
    }

    /* --- tests panel --- */
    var testBox = tests.length ? h('section', { class: 'cl-tests', 'aria-label': 'Tests' }, [h('div', { class: 'cl-testh' }, [h('b', null, '🧪 Tests'), h('span', { class: 'cl-score muted' }, tests.length + ' to pass')]), h('ol', { class: 'cl-tl' }, tests.map(function (t, i) { return testRow(t, i, null); }))]) : null;
    if (testBox) root.appendChild(testBox);
    function testRow(t, i, res) {
      var rq = parseReq(t), label = rq ? rq.method + ' ' + rq.path : t.selector ? t.selector + ' → ' + t.css : t.stdin ? 'input: ' + trunc(String(t.stdin).replace(/\n/g, ' ⏎ '), 40) : 'Test ' + (i + 1);
      var st = res == null ? 'wait' : res.pass ? 'pass' : 'fail';
      var li = h('li', { class: 'cl-t t-' + st }, [h('div', { class: 'cl-tt' }, [h('span', { class: 'cl-ti', 'aria-hidden': 'true' }, st === 'pass' ? '✅' : st === 'fail' ? '❌' : '⚪'), h('span', null, label), h('span', { class: 'sr' }, st === 'pass' ? 'passed' : st === 'fail' ? 'failed' : 'not run yet')])]);
      if (t.hidden !== true && res == null) li.appendChild(h('div', { class: 'cl-te muted' }, ['Expect: ', h('code', null, trunc(t.expect, 160))]));
      if (res && res.note) li.appendChild(h('p', { class: 'cl-tn muted' }, res.note));
      if (res && !res.pass) li.appendChild(diffView(res));
      return li;
    }
    function diffView(r) {
      var box = h('div', { class: 'cl-diff' });
      if (r.err) box.appendChild(h('p', { class: 'cl-derr' }, '💥 ' + trunc(r.err, 600)));
      if (r.how === 'regex') { box.appendChild(h('p', null, ['Your output should match the pattern ', h('code', null, r.exp)])); box.appendChild(h('pre', { class: 'cl-dgot' }, trunc(r.got || '(no output)', 2000))); return box; }
      if (!r.diff) { box.appendChild(h('pre', { class: 'cl-dgot' }, trunc(r.got || '(no output)', 2000))); return box; }
      var tb = h('table', { class: 'cl-dt' }, [h('caption', { class: 'sr' }, 'Expected versus your output, line by line'), h('thead', null, h('tr', null, [h('th', { scope: 'col' }, '#'), h('th', { scope: 'col' }, 'Expected'), h('th', { scope: 'col' }, 'Your output')]))]);
      var body = h('tbody');
      r.diff.rows.forEach(function (row, k) {
        if (row.same && Math.abs(k - r.diff.first) > 2) return;
        var g = row.g == null ? h('em', { class: 'muted' }, '(missing line)') : row.col >= 0 ? h('span', null, [row.g.slice(0, row.col), h('mark', null, row.g.slice(row.col, row.col + 1) || '␣'), row.g.slice(row.col + 1)]) : row.g || h('em', { class: 'muted' }, '(empty)');
        body.appendChild(h('tr', { class: row.same ? 'ok' : 'bad' }, [h('td', null, String(row.n)), h('td', null, row.e == null ? h('em', { class: 'muted' }, '(nothing)') : row.e || h('em', { class: 'muted' }, '(empty)')), h('td', null, g)]));
      });
      tb.appendChild(body); box.appendChild(h('div', { class: 'cl-dtw' }, tb));
      var fb = r.diff.rows[r.diff.first];
      if (fb && fb.e != null && fb.g != null) {
        var tip = fb.e.trim() === fb.g.trim() ? 'Only spaces at the start/end of line ' + fb.n + ' differ.' : fb.e.toLowerCase() === fb.g.toLowerCase() ? 'Line ' + fb.n + ' differs only in capital letters.' : 'First difference: line ' + fb.n + ', character ' + (fb.col + 1) + '.';
        box.appendChild(h('p', { class: 'cl-tip' }, '🔎 ' + tip));
      } else if (fb && fb.g == null) box.appendChild(h('p', { class: 'cl-tip' }, '🔎 Your program printed fewer lines than expected.'));
      else if (fb && fb.e == null) box.appendChild(h('p', { class: 'cl-tip' }, '🔎 Your program printed extra lines.'));
      return box;
    }

    /* --- console helpers --- */
    var outLen = 0;
    function clearOut() { outPre.innerHTML = ''; tables.innerHTML = ''; foot.innerHTML = ''; foot.className = 'cl-foot'; outLen = 0; }
    function write(s, k) {
      if (!alive || !s) return;
      if (outLen > 120000) return; outLen += s.length;
      if (outLen > 120000) s += '\n… (output trimmed)\n';
      var last = outPre.lastChild, cls = 'o-' + (k || 'out');
      if (last && last.className === cls && last.textContent.length < 20000) last.textContent += s; else outPre.appendChild(h('span', { class: cls }, s));
      outPre.scrollTop = outPre.scrollHeight;
    }
    function lb(text, pct, kind) {
      if (!text) { loadbar.hidden = true; return; }
      loadbar.hidden = false; lbText.textContent = text; loadbar.classList.toggle('warn', kind === 'warn');
      if (pct != null) { lbFill.style.width = Math.max(5, Math.min(100, pct)) + '%'; loadbar.classList.remove('indet'); } else if (!lbFill.style.width) loadbar.classList.add('indet');
    }
    function setBusy(b) { busy = b; bRun.disabled = b; if (bCheck) bCheck.disabled = b; root.classList.toggle('busy', b); bRun.lastChild.textContent = b ? ' Running…' : ' Run'; }
    function showTables(ts) {
      tables.innerHTML = '';
      (ts || []).forEach(function (t, i) {
        var tb = h('table', { class: 'cl-st-t' }, [h('caption', null, (ts.length > 1 ? 'Result ' + (i + 1) + ' · ' : '') + t.total + ' row' + (t.total === 1 ? '' : 's') + (t.total > t.values.length ? ' (showing ' + t.values.length + ')' : '')), h('thead', null, h('tr', null, t.columns.map(function (c) { return h('th', { scope: 'col' }, c); }))), h('tbody', null, t.values.slice(0, 200).map(function (r) { return h('tr', null, r.map(function (v) { return h('td', { class: v === null ? 'nul' : typeof v === 'number' ? 'num' : '' }, v === null ? 'NULL' : String(v)); })); }))]);
        tables.appendChild(h('div', { class: 'cl-tw' }, tb));
      });
    }
    function finish(r) {
      foot.innerHTML = '';
      if (r.loadFail) {
        foot.className = 'cl-foot bad';
        foot.appendChild(h('p', null, r.err)); foot.appendChild(h('button', { type: 'button', class: 'btn small', onclick: function () { run(); } }, '↻ Try again'));
        return;
      }
      if (!r.ok) {
        write('\n' + r.err + '\n', 'err');
        foot.className = 'cl-foot bad';
        foot.appendChild(h('span', null, r.killed ? '⏱️ Stopped' : '❌ Error'));
        if (r.line) { ed.mark(r.line); foot.appendChild(h('button', { type: 'button', class: 'btn ghost small', onclick: function () { ed.mark(r.line); ed.focus(); } }, '→ line ' + r.line)); }
      } else { foot.className = 'cl-foot ok'; foot.appendChild(h('span', null, '✓ Finished' + (r.ms != null ? ' in ' + r.ms + ' ms' : ''))); }
      if (r.engine) { foot.appendChild(h('small', { class: 'muted' }, ' · ' + r.engine)); if (lang === 'c' || lang === 'cpp') engChip.querySelector('.cl-engt').textContent = r.engine; }
      if (r.server) { foot.appendChild(h('span', { class: 'cl-live' }, ' 🟢 server listening — use the fake HTTP client')); }
      if (!r.out && r.ok && !r.tables && !r.server) write('(your program printed nothing — use ' + ({ python: 'print()', javascript: 'console.log()', node: 'console.log()', java: 'System.out.println()', csharp: 'Console.WriteLine()', c: 'printf()', cpp: 'cout <<', mongodb: 'a query or print()', sql: 'SELECT' }[lang] || 'print') + ')\n', 'info');
    }
    function setupVal() {
      if (lang === 'sql') return setupTa ? setupTa.value : (o.setup || '');
      if (lang === 'mongodb') { if (setupTa) { try { return JSON.parse(setupTa.value || '[]'); } catch (e) { throw new Error('The collections JSON is not valid: ' + e.message); } } return o.setup || []; }
      return '';
    }

    /* --- run --- */
    function runWeb(cb) {
      clearOut();
      if (prev) prev.destroy();
      if (lang === 'react') lb('Loading React + Babel and compiling…', null);
      prev = C.preview(prevHost, lang, ed.get(), { html: o.html, onOut: function (s, k, line) { write(s, k); if (k === 'err' && line) ed.mark(line); } });
      reactStarted = true;
      prev.ready.then(function (ok) { lb(null); if (!ok && lang === 'react') write('⚠️ React did not finish loading. If you are offline, it will work once you are back online.\n', 'warn'); if (cb) cb(); });
    }
    function run() {
      if (busy || !alive) return;
      save(true); ed.mark(0);
      if (web) { runWeb(); return; }
      var setup; try { setup = setupVal(); } catch (e) { clearOut(); write(e.message + '\n', 'err'); return; }
      clearOut(); setBusy(true); lb('Starting…', null);
      C.run(lang, ed.get(), { stdin: stdin ? stdin.value : '', setup: setup, onOut: write, onStatus: function (t, p, k) { lb(t, p, k); } }).then(function (r) {
        if (!alive) return; setBusy(false); lb(null);
        if (r.tables) showTables(r.tables);
        finish(r); if (o.onRun) o.onRun(r);
      }, function (e) { setBusy(false); lb(null); finish({ ok: false, err: String(e && e.message || e) }); });
    }

    /* --- tests --- */
    function check() {
      if (busy || !alive || !tests.length) return;
      save(true); ed.mark(0);
      var list = testBox.querySelector('.cl-tl'), results = [], code = ed.get();
      list.innerHTML = ''; tests.forEach(function (t, i) { var li = testRow(t, i, null); li.classList.add('t-run'); list.appendChild(li); });
      setBusy(true); lb('Running ' + tests.length + ' test' + (tests.length > 1 ? 's' : '') + '…', null);
      var done = function () {
        setBusy(false); lb(null);
        var pass = results.filter(function (r) { return r && r.pass; }).length;
        list.innerHTML = ''; tests.forEach(function (t, i) { list.appendChild(testRow(t, i, results[i] || { pass: false, err: 'not run' })); });
        var sc = testBox.querySelector('.cl-score'); sc.textContent = pass + ' / ' + tests.length + ' passed';
        testBox.classList.toggle('all', pass === tests.length);
        if (pass === tests.length) { VV2.sfx('win'); celebrate(); } else { VV2.sfx('bad'); VV2.toast(pass + ' of ' + tests.length + ' tests pass — check the red ones for the first difference.', '🧪'); }
        try { testBox.scrollIntoView({ block: 'nearest', behavior: VV2.reduced ? 'auto' : 'smooth' }); } catch (e) { }
      };
      if (web) {
        runWeb(function () {
          var checks = tests.map(function (t) { return t.selector && t.css ? { selector: t.selector, css: t.css } : null; }).filter(Boolean);
          prev.probe(checks).then(function (pr) {
            pr = pr || { text: '', html: '', styles: [] }; var si = 0;
            tests.forEach(function (t, i) {
              if (t.selector && t.css) { var v = pr.styles[si++]; results[i] = C.check(t.expect, [v == null ? '(element not found)' : v]); }
              else { var re = C.asRegex(t.expect); results[i] = re ? C.check(t.expect, [pr.text, pr.html, code]) : C.check(t.expect, [pr.text], { contains: true }); }
            });
            done();
          });
        });
        return;
      }
      var setup; try { setup = setupVal(); } catch (e) { setBusy(false); lb(null); write(e.message + '\n', 'err'); return; }
      clearOut();
      var i = 0, serverUp = false;
      (function nextT() {
        if (!alive) return;
        if (i >= tests.length) { done(); return; }
        var t = tests[i], rq = lang === 'node' ? parseReq(t) : null, k = i;
        lb('Test ' + (i + 1) + ' of ' + tests.length + '…', Math.round(i / tests.length * 100));
        if (rq) {
          var go = serverUp ? Promise.resolve({ ok: true, server: true }) : C.run(lang, code, { stdin: t.stdin || '', onOut: write, onStatus: function (s, p, kk) { lb(s, p, kk); } });
          go.then(function (r) {
            if (!r.ok || !r.server) { results[k] = { pass: false, err: r.ok ? 'Your code did not start a server — call app.listen(3000).' : r.err, got: r.out }; i++; nextT(); return; }
            serverUp = true;
            C.request(rq.method, rq.path, rq.body, rq.headers).then(function (res) {
              var chk = C.check(t.expect, [res.body]);
              if (chk.pass && t.status != null && +t.status !== +res.status) chk = { pass: false, how: 'exact', exp: 'status ' + t.status, got: 'status ' + res.status, diff: C.diff('status ' + t.status, 'status ' + res.status) };
              results[k] = chk; i++; nextT();
            });
          });
          return;
        }
        serverUp = false;
        C.run(lang, code, { stdin: t.stdin || '', setup: setup, onOut: function () { }, onStatus: function (s, p, kk) { lb(s, p, kk); } }).then(function (r) {
          if (r.loadFail) { results[k] = { pass: false, err: r.err }; for (var j = k + 1; j < tests.length; j++) results[j] = { pass: false, err: 'skipped (runtime not loaded)' }; i = tests.length; finish(r); nextT(); return; }
          var outs = [r.out]; if (r.alt) outs.push(r.alt);
          var chk = C.check(t.expect, outs);
          if (!r.ok && !chk.pass) chk.err = r.err;
          if (!r.ok && r.line) ed.mark(r.line);
          results[k] = chk; i++;
          if (k === 0) { if (r.tables) showTables(r.tables); write(r.out || '', 'out'); if (!r.ok) write('\n' + r.err + '\n', 'err'); }
          nextT();
        });
      })();
    }
    function celebrate() {
      var key = draftKey || ('studio:' + lang), st = C.cstore.get(), first = !st.passed[key];
      C.cstore.edit(function (s) { s.passed[key] = { t: Date.now(), peeked: peeked }; });
      if (o.onPass) o.onPass({ first: first, peeked: peeked });
      if (!VV2.reduced) VV2.confetti(VV2.lowPower ? 30 : 80);
      var m = VV2.pick(['All tests green. The compiler gods smile upon you.', 'Every test passes — ship it! 🚢', 'Flawless. Even the semicolons are proud.', 'Green across the board. Chai break earned. ☕']);
      VV2.toast(m, '✅');
      if (testBox) { var b = testBox.querySelector('.cl-win') || h('p', { class: 'cl-win', role: 'status' }); b.textContent = '🎉 ' + m; testBox.appendChild(b); }
    }

    /* --- other actions --- */
    function changed() {
      if (draftKey) { clearTimeout(saveT); saveT = setTimeout(function () { save(false); }, 700); }
      if (web && autoBtn && autoBtn.getAttribute('aria-pressed') === 'true' && (lang !== 'react' || reactStarted)) { clearTimeout(autoT); autoT = setTimeout(function () { if (alive) runWeb(); }, lang === 'react' ? 1200 : 650); }
      if (o.onChange) o.onChange(ed.get());
    }
    function save(now) { if (!draftKey) return; clearTimeout(saveT); var c = ed.get(); C.cstore.edit(function (s) { if (o.code != null && c === o.code) delete s.drafts[draftKey]; else s.drafts[draftKey] = { c: c, t: Date.now() }; var ks = Object.keys(s.drafts); if (ks.length > 120) { ks.sort(function (a, b) { return s.drafts[a].t - s.drafts[b].t; }); ks.slice(0, ks.length - 120).forEach(function (k) { delete s.drafts[k]; }); } }); }
    bRun.addEventListener('click', run);
    if (bCheck) bCheck.addEventListener('click', check);
    if (bHint) bHint.addEventListener('click', function () { hintBox.hidden = !hintBox.hidden; if (!hintBox.innerHTML) hintBox.innerHTML = '<b>💡 Hint</b>' + VV2.md(o.hint); bHint.setAttribute('aria-expanded', hintBox.hidden ? 'false' : 'true'); VV2.sfx('pop'); });
    if (bSol) bSol.addEventListener('click', function () {
      if (peeked) { mine = mine == null ? ed.get() : mine; ed.set(o.solution); bMine.hidden = false; return; }
      VV2.modal({ title: '👀 Peek at the solution?', body: h('div', null, [h('p', null, 'Totally allowed — reading good code is how everyone learns. Your own attempt is kept, and you can switch back any time.'), h('p', { class: 'muted' }, o.studio ? '' : 'Passing after a peek still counts, with a little less XP (5 instead of 15).')]),
        actions: [{ label: 'Keep trying', value: false }, { label: 'Show me', primary: true, onClick: function () { peeked = true; mine = ed.get(); ed.set(o.solution); bMine.hidden = false; VV2.toast('Solution loaded. Press Run to watch it work.', '👀'); } }] });
    });
    bMine.addEventListener('click', function () { if (mine != null) { ed.set(mine); bMine.hidden = true; } });
    bReset.addEventListener('click', function () {
      var orig = o.code != null ? o.code : '';
      if (ed.get() === orig) { VV2.toast('Already the starter code.', '↺'); return; }
      VV2.modal({ title: '↺ Start again?', body: h('p', null, 'This puts the original starter code back. Your current code will be replaced.'), actions: [{ label: 'Cancel', value: false }, { label: 'Reset', primary: true, onClick: function () { ed.set(orig); save(true); clearOut(); } }] });
    });
    bCopy.addEventListener('click', function () { C.copy(ed.get()); });
    bDown.addEventListener('click', function () { C.download((o.fileBase || 'vidyaverse-code') + '.' + L.ext, ed.get()); });

    if (web && lang !== 'react') setTimeout(function () { if (alive) runWeb(); }, 60);
    return {
      el: root, editor: ed, run: run, check: check, get: function () { return ed.get(); }, set: function (v) { ed.set(v); },
      setup: function () { return setupTa ? setupTa.value : null; }, setSetup: function (v) { if (setupTa) setupTa.value = v; },
      stdin: function (v) { if (!stdin) return ''; if (v != null) stdin.value = v; return stdin.value; },
      destroy: function () { alive = false; save(true); clearTimeout(autoT); if (prev) prev.destroy(); ed.destroy(); if (lang === 'node') { C.nodeLog = null; C.stopServer(); } }
    };
  };

  /* ===================== the "code" activity widget ===================== */
  W.code = function (el, a, ctx) {
    var alive = true, inst = null;
    el.appendChild(h('div', { class: 'cl-boot', role: 'status' }, [h('span', { class: 'cl-spin', 'aria-hidden': 'true' }), 'Opening the Code Lab…']));
    function mount() {
      C.deps().then(function () {
        if (!alive) return;
        el.innerHTML = '';
        inst = C.lab(el, {
          lang: a.lang, code: a.starter || '', prompt: a.prompt, tests: a.tests || [], solution: a.solution, hint: a.hint, setup: a.setup, html: a.html, stdin: a.stdin,
          draftKey: 'lesson:' + ctx.id, fileBase: String(ctx.id || 'code').replace(/[^\w.-]+/g, '-'),
          onPass: function (info) {
            if (info.first) { var xp = info.peeked ? 5 : 15; if (VV2.store && VV2.store.addXP) VV2.store.addXP(xp, 'all code tests passed'); }
            ctx.done(info.peeked ? 70 : 100);
          }
        });
        if (!(a.tests || []).length) inst.el.querySelector('.cl-run').addEventListener('click', function () { setTimeout(function () { if (alive) ctx.done(100); }, 600); }, { once: true });
      }, function () {
        if (!alive) return;
        el.innerHTML = '';
        el.appendChild(h('div', { class: 'cl-fail', role: 'alert' }, [h('p', null, '📴 The Code Lab could not load — you may be offline. Everything you typed before is saved on this device.'), h('button', { type: 'button', class: 'btn small', onclick: function () { el.innerHTML = ''; el.appendChild(h('div', { class: 'cl-boot' }, 'Trying again…')); mount(); } }, '↻ Try again')]));
      });
    }
    mount();
    return { destroy: function () { alive = false; if (inst) inst.destroy(); } };
  };
})();

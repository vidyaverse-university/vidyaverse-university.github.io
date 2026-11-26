/* VidyaVerse v2 — Code Lab editor: textarea + syntax-highlight overlay + line numbers + smart indent + phone symbol bar.
   Exposes VV2.Code.LANGS, VV2.Code.highlight(src, lang), VV2.Code.editor(opts), VV2.Code.cstore (local drafts/snippets). */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var C = VV2.Code = VV2.Code || {};

  C.LANGS = {
    python: { name: 'Python', icon: '🐍', ext: 'py', cm: '#', ind: 4 },
    javascript: { name: 'JavaScript', icon: '🟨', ext: 'js', cm: '//', ind: 2 },
    html: { name: 'HTML', icon: '🌐', ext: 'html', cm: '<!--', ind: 2 },
    css: { name: 'CSS', icon: '🎨', ext: 'css', cm: '/*', ind: 2 },
    react: { name: 'React (JSX)', icon: '⚛️', ext: 'jsx', cm: '//', ind: 2 },
    node: { name: 'Node.js · Express', icon: '🟩', ext: 'js', cm: '//', ind: 2 },
    sql: { name: 'SQL (SQLite)', icon: '🗃️', ext: 'sql', cm: '--', ind: 2 },
    mongodb: { name: 'MongoDB shell', icon: '🍃', ext: 'mongodb.js', cm: '//', ind: 2 },
    c: { name: 'C', icon: '🔧', ext: 'c', cm: '//', ind: 4 },
    cpp: { name: 'C++', icon: '➕', ext: 'cpp', cm: '//', ind: 4 },
    java: { name: 'Java', icon: '☕', ext: 'java', cm: '//', ind: 4 },
    csharp: { name: 'C#', icon: '🎯', ext: 'cs', cm: '//', ind: 4 }
  };
  C.ORDER = ['python', 'javascript', 'html', 'css', 'react', 'node', 'sql', 'mongodb', 'c', 'cpp', 'java', 'csharp'];
  C.langOf = function (l) { l = String(l || '').toLowerCase(); var al = { js: 'javascript', py: 'python', 'c++': 'cpp', 'c#': 'csharp', cs: 'csharp', mongo: 'mongodb', jsx: 'react', express: 'node', nodejs: 'node', sqlite: 'sql' }; l = al[l] || l; return C.LANGS[l] ? l : 'javascript'; };

  /* ---------- local code store (separate key so the main progress file stays small) ---------- */
  var CKEY = 'vidyaverse2-code';
  C.cstore = {
    get: function () { var s = null; try { s = JSON.parse(localStorage.getItem(CKEY) || 'null'); } catch (e) { } if (!s || typeof s !== 'object') s = {}; s.drafts = s.drafts || {}; s.passed = s.passed || {}; s.snippets = s.snippets || []; return s; },
    put: function (s) { try { localStorage.setItem(CKEY, JSON.stringify(s)); return true; } catch (e) { if (VV2.toast) VV2.toast('Storage is full or blocked — this code is not saved.', '⚠️'); return false; } },
    edit: function (fn) { var s = C.cstore.get(); fn(s); C.cstore.put(s); return s; }
  };

  /* ---------- syntax highlighting ---------- */
  function words(s) { var o = {}; s.split(' ').forEach(function (w) { if (w) o[w] = 1; }); return o; }
  var JSK = words('break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return super switch this throw try typeof var void while with yield async await from as static get set');
  var JSL = words('true false null undefined NaN Infinity');
  var JSB = words('console Math JSON Object Array String Number Boolean Promise Map Set Date RegExp Error require module exports process document window React ReactDOM db parseInt parseFloat setTimeout setInterval clearTimeout clearInterval print printjson prompt');
  var PYK = words('and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case');
  var PYL = words('True False None');
  var PYB = words('print input len range int str float list dict set tuple sum min max abs sorted reversed enumerate zip map filter open type isinstance round bool chr ord any all self super format');
  var CK = words('auto break case char const continue default do double else enum extern float for goto if int long register return short signed sizeof static struct switch typedef union unsigned void volatile while bool class public private protected new delete namespace using template typename this virtual nullptr try catch throw inline operator friend');
  var CB = words('std string vector map set pair cout cin endl printf scanf puts getline main include define iostream stdio cmath algorithm sort swap max min');
  var JAK = words('abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long new package private protected public return short static super switch this throw throws try void while var record');
  var JAB = words('String System Scanner Math Integer Double Long Character Boolean ArrayList List HashMap Map HashSet Set Arrays Collections StringBuilder Object main out println print printf');
  var CSK = words('abstract as base bool break byte case catch char class const continue decimal default do double else enum finally float for foreach if in int interface internal is long namespace new object out override private protected public readonly ref return sealed short static string struct switch this throw try using var virtual void while record');
  var CSB = words('Console Math List Dictionary HashSet String Convert Int32 WriteLine Write ReadLine Main System Linq');
  var SQK = words('select from where and or not insert into values update set delete create table drop alter add primary key foreign references join inner left right outer cross on group by order having limit offset as distinct insert replace null is in between like glob union all intersect except case when then else end if exists unique check default autoincrement asc desc view index trigger begin commit rollback transaction with recursive');
  var SQT = words('integer int text real numeric varchar char boolean date blob float double');
  var SQB = words('count sum avg min max round length upper lower substr coalesce ifnull abs date time strftime total group_concat');
  var KW = { python: [PYK, PYL, PYB], javascript: [JSK, JSL, JSB], react: [JSK, JSL, JSB], node: [JSK, JSL, JSB], mongodb: [JSK, JSL, JSB], c: [CK, words('true false NULL'), CB], cpp: [CK, words('true false NULL nullptr'), CB], java: [JAK, words('true false null'), JAB], csharp: [CSK, words('true false null'), CSB], sql: [SQK, words('null true false'), SQB] };

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function span(c, t) { return '<span class="t-' + c + '">' + esc(t) + '</span>'; }
  var RX = {
    blockC: /\/\*[\s\S]*?(?:\*\/|$)/y, lineC: /\/\/[^\n]*/y, hashC: /#[^\n]*/y, dashC: /--[^\n]*/y, htmlC: /<!--[\s\S]*?(?:-->|$)/y,
    dq: /"(?:\\[\s\S]|[^"\\\n])*"?/y, sq: /'(?:\\[\s\S]|[^'\\\n])*'?/y, bq: /`(?:\\[\s\S]|[^`\\])*`?/y,
    tdq: /"""[\s\S]*?(?:"""|$)/y, tsq: /'''[\s\S]*?(?:'''|$)/y, pypre: /[rRbBfFuU]{1,2}(?=["'])/y,
    num: /(?:0[xX][\da-fA-F_]+|0[bB][01_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d+)?)[fFlLuUmMdDnj]*/y,
    word: /[A-Za-z_$][\w$]*/y, ws: /\s+/y, deco: /@[A-Za-z_][\w.]*/y, pre: /#[^\n]*/y,
    tag: /<\/?[A-Za-z][\w:.-]*/y, tagEnd: /\/?>/y, attr: /[A-Za-z_:@][\w:.-]*(?=\s*=)/y, ent: /&#?\w+;/y,
    cssAt: /@[\w-]+/y, cssProp: /-{0,2}[A-Za-z][\w-]*(?=\s*:(?!:))/y, cssHex: /#[\da-fA-F]{3,8}\b/y, cssNum: /-?(?:\d+\.?\d*|\.\d+)(?:%|[a-zA-Z]+)?/y, cssSel: /[.#][A-Za-z_-][\w-]*/y
  };
  function at(re, s, i) { re.lastIndex = i; var m = re.exec(s); return m && m.index === i && m[0].length ? m[0] : null; }

  C.highlight = function (s, lang) {
    lang = C.langOf(lang); var out = '', i = 0, n = s.length, m, prevSig = '', kw = KW[lang];
    if (lang === 'html') return hlHTML(s);
    if (lang === 'css') return hlCSS(s);
    var isPy = lang === 'python', isC = lang === 'c' || lang === 'cpp', isSQL = lang === 'sql', jsx = lang === 'react', lineStart = true;
    while (i < n) {
      var ch = s.charAt(i);
      if ((m = at(RX.ws, s, i))) { out += esc(m); i += m.length; if (m.indexOf('\n') >= 0) lineStart = true; continue; }
      if (isC && lineStart && ch === '#' && (m = at(RX.pre, s, i))) { out += span('pp', m); i += m.length; continue; }
      lineStart = false;
      if (isPy) {
        if (ch === '#') { m = at(RX.hashC, s, i); out += span('cm', m); i += m.length; continue; }
        if ((m = at(RX.pypre, s, i))) { out += span('kw', m); i += m.length; continue; }
        if ((m = at(RX.tdq, s, i) || at(RX.tsq, s, i))) { out += span('st', m); i += m.length; prevSig = 's'; continue; }
        if (ch === '@' && (m = at(RX.deco, s, i))) { out += span('fn', m); i += m.length; continue; }
      } else if (isSQL) {
        if (ch === '-' && s.charAt(i + 1) === '-') { m = at(RX.dashC, s, i); out += span('cm', m); i += m.length; continue; }
        if (ch === '/' && s.charAt(i + 1) === '*') { m = at(RX.blockC, s, i); out += span('cm', m); i += m.length; continue; }
      } else {
        if (ch === '/' && s.charAt(i + 1) === '/') { m = at(RX.lineC, s, i); out += span('cm', m); i += m.length; continue; }
        if (ch === '/' && s.charAt(i + 1) === '*') { m = at(RX.blockC, s, i); out += span('cm', m); i += m.length; continue; }
        if (jsx && ch === '<' && /[A-Za-z\/>]/.test(s.charAt(i + 1)) && /^$|[(,=>;{}?:&|\[]$|return$/.test(prevSig)) {
          m = at(RX.tag, s, i) || '<'; out += span('tg', m); i += m.length; prevSig = '>'; continue;
        }
        if (ch === '`') { m = at(RX.bq, s, i); out += span('st', m); i += m.length; prevSig = 's'; continue; }
      }
      if (ch === '"') { m = at(RX.dq, s, i); out += span('st', m); i += m.length; prevSig = 's'; continue; }
      if (ch === "'") { m = at(RX.sq, s, i); out += span(isC || lang === 'java' || lang === 'csharp' ? (m.length <= 4 ? 'ch' : 'st') : 'st', m); i += m.length; prevSig = 's'; continue; }
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s.charAt(i + 1)))) { m = at(RX.num, s, i) || ch; out += span('nu', m); i += m.length; prevSig = 'n'; continue; }
      if ((m = at(RX.word, s, i))) {
        var k = isSQL ? m.toLowerCase() : m, cls = null;
        var j = i + m.length; while (j < n && (s.charAt(j) === ' ' || s.charAt(j) === '\t')) j++;
        var after = [0, s.charAt(j) === '(' ? '(' : ''];
        if (kw && kw[0][k]) cls = 'kw'; else if (kw && kw[1][k]) cls = 'li';
        else if (isSQL && SQT[k]) cls = 'ty';
        else if (after && after[1] === '(') cls = 'fn';
        else if (kw && kw[2][k]) cls = 'bi';
        else if (/^[A-Z][a-z0-9]/.test(m) && !isSQL && !isPy) cls = 'ty';
        out += cls ? span(cls, m) : esc(m); i += m.length; prevSig = cls === 'kw' && m === 'return' ? 'return' : 'w'; continue;
      }
      out += /[{}()[\];,.]/.test(ch) ? span('pu', ch) : /[=+\-*/%<>!&|^~?:]/.test(ch) ? span('op', ch) : esc(ch);
      prevSig = ch; i++;
    }
    return out;
  };
  function hlHTML(s) {
    var out = '', i = 0, n = s.length, inTag = false, m;
    while (i < n) {
      var ch = s.charAt(i);
      if (!inTag) {
        if (s.substr(i, 4) === '<!--') { m = at(RX.htmlC, s, i); out += span('cm', m); i += m.length; continue; }
        if (ch === '<' && /[A-Za-z\/!]/.test(s.charAt(i + 1))) { m = at(RX.tag, s, i) || at(/<![^>]*>?/y, s, i) || '<'; out += span('tg', m); i += m.length; inTag = m.charAt(1) !== '!'; continue; }
        if (ch === '&' && (m = at(RX.ent, s, i))) { out += span('nu', m); i += m.length; continue; }
        out += esc(ch); i++; continue;
      }
      if ((m = at(RX.tagEnd, s, i))) { out += span('tg', m); i += m.length; inTag = false; continue; }
      if (ch === '"' || ch === "'") { m = at(ch === '"' ? RX.dq : RX.sq, s, i); out += span('st', m); i += m.length; continue; }
      if ((m = at(RX.attr, s, i))) { out += span('at', m); i += m.length; continue; }
      if ((m = at(RX.ws, s, i))) { out += esc(m); i += m.length; continue; }
      out += ch === '=' ? span('op', ch) : esc(ch); i++;
    }
    return out;
  }
  function hlCSS(s) {
    var out = '', i = 0, n = s.length, depth = 0, m;
    while (i < n) {
      var ch = s.charAt(i);
      if (ch === '/' && s.charAt(i + 1) === '*') { m = at(RX.blockC, s, i); out += span('cm', m); i += m.length; continue; }
      if (ch === '"' || ch === "'") { m = at(ch === '"' ? RX.dq : RX.sq, s, i); out += span('st', m); i += m.length; continue; }
      if ((m = at(RX.ws, s, i))) { out += esc(m); i += m.length; continue; }
      if (ch === '@' && (m = at(RX.cssAt, s, i))) { out += span('kw', m); i += m.length; continue; }
      if (ch === '{') { depth++; out += span('pu', ch); i++; continue; }
      if (ch === '}') { depth = Math.max(0, depth - 1); out += span('pu', ch); i++; continue; }
      if (depth > 0) {
        if ((m = at(RX.cssProp, s, i))) { out += span('at', m); i += m.length; continue; }
        if (ch === '#' && (m = at(RX.cssHex, s, i))) { out += span('nu', m); i += m.length; continue; }
        if (/[\d.-]/.test(ch) && (m = at(RX.cssNum, s, i))) { out += span('nu', m); i += m.length; continue; }
        if ((m = at(RX.word, s, i))) { out += span(s.charAt(i + m.length) === '(' ? 'fn' : 'li', m); i += m.length; continue; }
      } else {
        if ((m = at(RX.cssSel, s, i))) { out += span('ty', m); i += m.length; continue; }
        if ((m = at(RX.word, s, i))) { out += span('tg', m); i += m.length; continue; }
      }
      out += /[;:,()]/.test(ch) ? span('pu', ch) : esc(ch); i++;
    }
    return out;
  }

  /* ---------- editor ---------- */
  var PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
  var CLOSERS = { ')': 1, ']': 1, '}': 1, '"': 1, "'": 1, '`': 1 };
  var SYMBOLS = ['⇥', '{', '}', '(', ')', '[', ']', ';', '=', '"', "'", '<', '>', ':', ',', '.', '+', '-', '*', '/', '%', '!', '&', '|', '_', '#', '$', '\\', '`', '?', '@', '^', '~'];
  var coarse = !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches);

  C.editor = function (o) {
    o = o || {};
    var lang = C.langOf(o.lang), uid = 'ce' + (++VV2._id), escArmed = false, saved = { s: 0, e: 0 }, raf = 0, errLine = 0;
    var ta = h('textarea', { class: 'ce-ta', id: uid, spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', wrap: 'off', 'aria-label': o.label || ('Code editor, ' + C.LANGS[lang].name), 'aria-describedby': uid + '-help', 'data-gramm': 'false' });
    ta.value = o.value || '';
    if (o.readOnly) ta.readOnly = true;
    var code = h('code'), pre = h('pre', { class: 'ce-hl', 'aria-hidden': 'true' }, code);
    var band = h('div', { class: 'ce-err', hidden: true, 'aria-hidden': 'true' });
    var layer = h('div', { class: 'ce-layer' }, [band, pre]);
    var gutIn = h('div', { class: 'ce-gi' }), gut = h('div', { class: 'ce-gut', 'aria-hidden': 'true' }, gutIn);
    var area = h('div', { class: 'ce-area' }, [layer, ta]);
    var help = h('p', { class: 'sr', id: uid + '-help' }, 'Tab indents. Press Escape then Tab to leave the editor. Control or Command plus Enter runs the code.');
    var live = h('p', { class: 'sr', 'aria-live': 'polite' });
    var bar = h('div', { class: 'ce-bar', role: 'toolbar', 'aria-label': 'Insert symbols', hidden: !coarse && !o.showBar });
    var tog = h('button', { type: 'button', class: 'ce-tog', 'aria-pressed': bar.hidden ? 'false' : 'true', 'aria-label': 'Show or hide the symbol keys', title: 'Symbol keys' }, '⌨');
    var root = h('div', { class: 'ce' + (o.cls ? ' ' + o.cls : ''), 'data-lang': lang }, [h('div', { class: 'ce-main' }, [gut, area, tog]), bar, help, live]);

    SYMBOLS.forEach(function (sym) {
      var b = h('button', { type: 'button', class: 'ce-k', 'aria-label': sym === '⇥' ? 'Indent (tab)' : 'Insert ' + sym, 'data-k': sym }, sym);
      bar.appendChild(b);
    });
    [['↶', 'undo', 'Undo'], ['↷', 'redo', 'Redo']].forEach(function (x) { bar.appendChild(h('button', { type: 'button', class: 'ce-k ce-k2', 'aria-label': x[2], 'data-cmd': x[1] }, x[0])); });
    bar.addEventListener('pointerdown', function (e) { if (e.target.closest('.ce-k')) e.preventDefault(); });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.ce-k'); if (!b) return;
      restore();
      var cmd = b.getAttribute('data-cmd');
      if (cmd) { try { document.execCommand(cmd); } catch (x) { } return; }
      var k = b.getAttribute('data-k');
      if (k === '⇥') indent(false); else typeChar(k, true);
      VV2.sfx('tick');
    });
    tog.addEventListener('click', function () { bar.hidden = !bar.hidden; tog.setAttribute('aria-pressed', bar.hidden ? 'false' : 'true'); });

    function unit() { return new Array((C.LANGS[lang].ind || 2) + 1).join(' '); }
    function lh() { var v = parseFloat(getComputedStyle(ta).lineHeight); return isNaN(v) ? 21 : v; }
    function render() {
      raf = 0; var v = ta.value;
      code.innerHTML = C.highlight(v, lang) + '\n';
      var n = v.split('\n').length, g = '';
      for (var i = 1; i <= n; i++) g += '<span' + (i === errLine ? ' class="on"' : '') + '>' + i + '</span>';
      gutIn.innerHTML = g;
      fit(n); sync();
    }
    function fit(n) {
      if (o.fixedHeight) return;
      var L = lh(), cs = getComputedStyle(ta), pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      var min = (o.minLines || 6) * L + pad, max = Math.max(min, Math.min((o.maxLines || 26) * L + pad, (window.innerHeight || 800) * 0.7));
      ta.style.height = Math.round(Math.max(min, Math.min(max, n * L + pad + 16))) + 'px';
    }
    function sync() {
      var x = ta.scrollLeft, y = ta.scrollTop;
      layer.style.transform = 'translate(' + (-x) + 'px,' + (-y) + 'px)';
      gutIn.style.transform = 'translateY(' + (-y) + 'px)';
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(render); }
    function remember() { saved.s = ta.selectionStart; saved.e = ta.selectionEnd; }
    function restore() { if (document.activeElement !== ta) { try { ta.focus({ preventScroll: true }); } catch (e) { ta.focus(); } ta.setSelectionRange(saved.s, saved.e); } }

    /* insert text replacing [s, e) — keeps native undo where supported */
    function replace(s, e, text, selS, selE) {
      var v0 = ta.value, want = v0.slice(0, s) + text + v0.slice(e), ok = false;
      if (s === e && !text) return;
      ta.setSelectionRange(s, e);
      try { ok = document.execCommand(text ? 'insertText' : 'delete', false, text); } catch (x) { ok = false; }
      if (!ok || ta.value !== want) { ta.value = want; ta.dispatchEvent(new Event('input', { bubbles: true })); }
      var a = selS == null ? s + text.length : selS, b = selE == null ? a : selE;
      ta.setSelectionRange(a, b); remember();
    }
    function lineBounds(pos) { var v = ta.value, st = v.lastIndexOf('\n', pos - 1) + 1, en = v.indexOf('\n', pos); return [st, en < 0 ? v.length : en]; }
    function indent(out) {
      var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, u = unit();
      if (s === e && !out) { replace(s, e, u); return; }
      var st = v.lastIndexOf('\n', s - 1) + 1, en = e > s && v.charAt(e - 1) === '\n' ? e - 1 : e;
      var eol = v.indexOf('\n', en); if (eol < 0) eol = v.length;
      var lines = v.slice(st, eol).split('\n'), first = 0, total = 0;
      var nl = lines.map(function (ln, i) {
        if (!out) { if (i === 0) first = u.length; total += u.length; return u + ln; }
        var m = /^( {1,8}|\t)/.exec(ln), cut = m ? Math.min(m[0].length, u.length) : 0; if (m && m[0] === '\t') cut = 1;
        if (i === 0) first = -cut; total -= cut; return ln.slice(cut);
      });
      var txt = nl.join('\n');
      if (txt === v.slice(st, eol)) return;
      replace(st, eol, txt, Math.max(st, s + first), Math.max(st, e + total));
    }
    function toggleComment() {
      var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, st = v.lastIndexOf('\n', s - 1) + 1, eol = v.indexOf('\n', e > s && v.charAt(e - 1) === '\n' ? e - 1 : e); if (eol < 0) eol = v.length;
      var cm = C.LANGS[lang].cm, close = cm === '<!--' ? ' -->' : cm === '/*' ? ' */' : '';
      var lines = v.slice(st, eol).split('\n'), all = lines.every(function (l) { return !l.trim() || l.trim().indexOf(cm) === 0; });
      var nl = lines.map(function (l) {
        if (!l.trim()) return l;
        if (all) { var r = l.replace(cm + ' ', '').replace(cm, ''); if (close) r = r.replace(close, '').replace(close.trim(), ''); return r; }
        var ind = /^\s*/.exec(l)[0]; return ind + cm + ' ' + l.slice(ind.length) + close;
      }).join('\n');
      replace(st, eol, nl, st, st + nl.length);
    }
    function typeChar(chh, fromBar) {
      var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, next = v.charAt(e), prev = v.charAt(s - 1);
      if (CLOSERS[chh] && s === e && next === chh) { ta.setSelectionRange(s + 1, s + 1); remember(); return true; }
      if (PAIRS[chh] && !o.noPairs) {
        var quote = chh === '"' || chh === "'" || chh === '`';
        if (s !== e) { var sel = v.slice(s, e); replace(s, e, chh + sel + PAIRS[chh], s + 1, e + 1); return true; }
        if ((!next || /[\s)\]};,]/.test(next)) && !(quote && /[\w\\]/.test(prev))) { replace(s, e, chh + PAIRS[chh], s + 1, s + 1); return true; }
      }
      if (chh === '}' && s === e) { var lb = lineBounds(s), before = v.slice(lb[0], s); if (/^\s+$/.test(before)) { var u = unit(), cut = Math.min(u.length, before.length); replace(lb[0], s, before.slice(cut) + '}'); return true; } }
      if (fromBar) { replace(s, e, chh); return true; }
      return false;
    }
    function newline() {
      var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, lb = lineBounds(s), line = v.slice(lb[0], s), ind = /^[ \t]*/.exec(line)[0];
      var t = line.replace(/\s+$/, ''), last = t.charAt(t.length - 1), next = v.charAt(e), u = unit();
      var more = /[{[(]$/.test(t) || (lang === 'python' && last === ':') || (lang === 'html' && /<([a-z][\w-]*)(\s[^>]*)?>$/i.test(t) && !/<\/|\/>$/.test(t) && !/^<(br|img|input|meta|link|hr)/i.test(t.trim()));
      if (more && PAIRS[last] && next === PAIRS[last]) { var mid = '\n' + ind + u; replace(s, e, mid + '\n' + ind, s + mid.length, s + mid.length); return; }
      replace(s, e, '\n' + ind + (more ? u : ''));
    }

    ta.addEventListener('keydown', function (e) {
      var mod = e.ctrlKey || e.metaKey;
      if (e.key === 'Escape') { escArmed = true; live.textContent = 'Press Tab to move out of the editor.'; return; }
      if (e.key === 'Tab' && escArmed) { escArmed = false; return; }
      if (e.key !== 'Shift') escArmed = false;
      if (mod && e.key === 'Enter') { e.preventDefault(); if (e.shiftKey && o.onTest) o.onTest(); else if (o.onRun) o.onRun(); return; }
      if (mod && (e.key === 's' || e.key === 'S') && o.onSave) { e.preventDefault(); o.onSave(); return; }
      if (mod && e.key === '/') { e.preventDefault(); if (!ta.readOnly) toggleComment(); return; }
      if (ta.readOnly || e.isComposing || e.keyCode === 229) return;
      if (e.key === 'Tab') { e.preventDefault(); indent(e.shiftKey); return; }
      if (e.key === 'Enter' && !mod && !e.altKey) { e.preventDefault(); newline(); return; }
      if (e.key === 'Backspace' && !mod && ta.selectionStart === ta.selectionEnd) {
        var p = ta.selectionStart, v = ta.value, a = v.charAt(p - 1), b = v.charAt(p);
        if (PAIRS[a] && PAIRS[a] === b) { e.preventDefault(); replace(p - 1, p + 1, ''); return; }
        var lb = lineBounds(p), before = v.slice(lb[0], p);
        if (before.length && /^ +$/.test(before)) { var u = unit().length, cut = before.length % u || u; e.preventDefault(); replace(p - cut, p, ''); return; }
      }
      if (e.key.length === 1 && !mod && !e.altKey && (PAIRS[e.key] || CLOSERS[e.key])) { if (typeChar(e.key, false)) e.preventDefault(); }
    });
    ta.addEventListener('input', function () { clearErr(true); schedule(); if (o.onChange) o.onChange(ta.value); });
    ta.addEventListener('scroll', sync, { passive: true });
    ['keyup', 'pointerup', 'select', 'blur', 'focus'].forEach(function (ev) { ta.addEventListener(ev, remember); });
    var ro = null; if (window.ResizeObserver) { ro = new ResizeObserver(function () { schedule(); }); ro.observe(area); }
    function clearErr(soft) { if (!errLine) return; errLine = 0; band.hidden = true; if (!soft) schedule(); else VV2.$$('.on', gutIn).forEach(function (x) { x.classList.remove('on'); }); }
    schedule();

    return {
      el: root, ta: ta,
      get: function () { return ta.value; },
      set: function (v) { ta.value = v == null ? '' : String(v); ta.scrollTop = 0; ta.scrollLeft = 0; clearErr(); schedule(); if (o.onChange) o.onChange(ta.value); },
      setLang: function (l) { lang = C.langOf(l); root.setAttribute('data-lang', lang); ta.setAttribute('aria-label', o.label || ('Code editor, ' + C.LANGS[lang].name)); schedule(); },
      lang: function () { return lang; },
      focus: function () { try { ta.focus({ preventScroll: true }); } catch (e) { ta.focus(); } },
      mark: function (n) {
        n = +n || 0; errLine = n; if (!n) { band.hidden = true; schedule(); return; }
        var L = lh(), cs = getComputedStyle(ta); band.style.top = ((parseFloat(cs.paddingTop) || 0) + (n - 1) * L) + 'px'; band.style.height = L + 'px'; band.hidden = false; schedule();
        var target = (n - 3) * L; if (target > ta.scrollTop + ta.clientHeight - L * 2 || target < ta.scrollTop) ta.scrollTop = Math.max(0, target);
      },
      refresh: schedule,
      destroy: function () { if (ro) ro.disconnect(); if (raf) cancelAnimationFrame(raf); }
    };
  };

  /* ---------- small shared bits ---------- */
  C.download = function (name, text, mime) {
    try {
      var b = new Blob([text], { type: mime || 'text/plain;charset=utf-8' }), u = URL.createObjectURL(b);
      var a = h('a', { href: u, download: name, style: { display: 'none' } }); document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 1500); return true;
    } catch (e) { VV2.toast('Download is blocked on this device.', '⚠️'); return false; }
  };
  C.copy = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function () { VV2.toast('Copied to clipboard', '📋'); }, function () { VV2.toast('Copy was blocked — select and copy manually.', '⚠️'); });
    VV2.toast('Copy is not available here — select and copy manually.', '⚠️'); return Promise.resolve();
  };
})();

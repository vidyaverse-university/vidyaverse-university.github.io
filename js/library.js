/* VidyaVerse v2.4 — Library: shelves (#/library) and the book reader (#/read/<id>).
   Data: reads/index.json [{id,course,shelf,title,subtitle,icon,audience,lang,minutes,tags,file,cls?,subj?,order?}] + reads/<id>.json
   (schema: tmp/vv2/READS_SPEC.md). Progress lives in profile.reads[id] = {pct, pos:{s,f}, done, ck:{}, t, i, ts}. */
(function () {
  'use strict';
  var VV2 = window.VV2;
  if (!VV2 || VV2.Library) return;
  var h = VV2.h, store = VV2.store, D = VV2.data;
  var L = VV2.Library = {};
  var SVGNS = 'http://www.w3.org/2000/svg';

  var SHELVES = [
    { id: 'ncert', icon: '🏫', name: 'NCERT chapter companions', short: 'NCERT', desc: 'A full, book-length read for each chapter — learn the whole chapter from it.', color: '#3f7cf5', fac: 'school' },
    { id: 'stories', icon: '🌙', name: 'Stories', short: 'Stories', desc: 'Long original stories and retold Indian classics, by age.', color: '#c2255c', fac: 'languages' },
    { id: 'history', icon: '🏺', name: 'Indian history', short: 'History', desc: 'From the Harappans to today, one era at a time — and how historians know.', color: '#9a7432', fac: 'school' },
    { id: 'engineering', icon: '⚙️', name: 'Engineering from first principles', short: 'Engineering', desc: 'How transistors, CPUs, bridges, the internet and the power grid really work.', color: '#0aa2c0', fac: 'tech' },
    { id: 'corporate', icon: '🏢', name: 'Work & corporate life', short: 'Corporate', desc: 'First jobs, emails, meetings, money, leadership and negotiation.', color: '#3a6ea5', fac: 'corporate' },
    { id: 'seniors', icon: '🌼', name: 'For seniors', short: 'Seniors', desc: 'Smartphones, UPI, video calls, scam safety and more — step by step.', color: '#2f9e44', fac: 'life' }
  ];
  L.SHELVES = SHELVES;
  function shelfOf(id) { return SHELVES.filter(function (s) { return s.id === id; })[0] || { id: id || 'other', icon: '📘', name: 'Other reads', short: 'Other', desc: '', color: '#7b5cff', fac: 'life' }; }
  var SUBJ = { maths: 'Maths', science: 'Science', english: 'English', hindi: 'Hindi', sanskrit: 'Sanskrit', social: 'Social Science', evs: 'EVS', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', accountancy: 'Accountancy', business: 'Business Studies', economics: 'Economics', geography: 'Geography', history: 'History', political: 'Political Science', polity: 'Political Science', psychology: 'Psychology', sociology: 'Sociology', computer: 'Computer Science', cs: 'Computer Science', ip: 'Informatics Practices', arts: 'Arts', pe: 'Physical Education' };
  var STORY_AGES = [['bed', '🌙 Bedtime (4–7)', 0, 7], ['adv', '🧭 Adventure (8–12)', 8, 11], ['mys', '🔎 Mystery (12–16)', 12, 15], ['lit', '🖋️ Literary (16+)', 16, 59], ['old', '🌼 Nostalgia (seniors)', 60, 120]];
  var AGES = [['', 'Any age'], ['5', '4–7'], ['9', '8–10'], ['12', '11–13'], ['15', '14–16'], ['17', '17–18'], ['25', 'Adults'], ['65', '60+']];
  function cap(s) { return String(s || '').replace(/-/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); }); }
  function hash(s) { var x = 2166136261; s = String(s || ''); for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = (x * 16777619) >>> 0; } return x; }
  function meta(e) {
    if (e._m) return e._m;
    var m = /^school-c(\d+)-(?:new-)?([a-z]+)/.exec(e.course || ''), cls = +e.cls || (m ? +m[1] : 0), subj = e.subj || (m ? (SUBJ[m[2]] || cap(m[2])) : '');
    if (!cls) (e.tags || []).forEach(function (t) { var k = /Class\s*(\d{1,2})\b/i.exec(t); if (k) cls = +k[1]; });
    if (!subj && e.shelf === 'ncert') subj = (e.tags || [])[1] || 'Other';
    var ag = (e.audience && Array.isArray(e.audience.ages) && e.audience.ages.length) ? e.audience.ages : null;
    return (e._m = { cls: cls, subj: subj, a0: ag ? +ag[0] : null, a1: ag ? +ag[ag.length - 1] : null, band: (e.audience && e.audience.band) || '' });
  }
  function ageOK(e, age) {
    var mm = meta(e); age = +age;
    if (mm.band === 'seniors') return age >= 60;
    if (mm.a0 != null) return mm.a0 <= age && age <= (mm.a1 == null ? mm.a0 : mm.a1);
    var r = { early: [0, 7], primary: [6, 11], middle: [11, 14], secondary: [14, 16], senior: [16, 18], ug: [17, 30], pg: [21, 99], adult: [18, 99] }[mm.band];
    return r ? (r[0] <= age && age <= r[1]) : true;
  }
  function myClass() { var p = store.cur(); if (!p || p.age == null) return 0; var c = p.age - 5; return c >= 1 && c <= 12 ? c : 0; }

  /* ---------------- progress ---------------- */
  function rs() { var p = store.cur(); if (!p) return {}; return p.reads || {}; }
  function rget(id) { return rs()[id] || null; }
  function rset(id, fn) { store.update(function (p) { p.reads = p.reads || {}; var r = p.reads[id] || { pct: 0 }; fn(r); r.ts = Date.now(); p.reads[id] = r; }); }
  L.progress = rget;
  L.lastRead = function () { var r = rs(), best = null; for (var k in r) if (r[k] && !r[k].done && r[k].pct > 1 && (!best || r[k].ts > r[best].ts)) best = k; return best ? { id: best, r: r[best] } : null; };
  L.doneCount = function () { var r = rs(), n = 0; for (var k in r) if (r[k] && r[k].done) n++; return n; };
  if (VV2.BADGES && !VV2.BADGES.some(function (b) { return b.id === 'reader'; })) {
    VV2.BADGES.push({ id: 'reader', icon: '📖', name: 'Reader', desc: 'Finish a long read in the Library' });
    VV2.BADGES.push({ id: 'bibliophile', icon: '📚', name: 'Bibliophile', desc: 'Finish 10 long reads in the Library' });
  }

  /* ---------------- markdown (reads flavour: headings, quotes, tables, lists, rules, safe links) ---------------- */
  function inl(s) {
    var links = [];
    s = String(s == null ? '' : s).replace(/\[([^\]\n]{1,200})\]\((https:\/\/[^\s)]{1,400})\)/g, function (m, t, u) { links.push([t, u]); return '\u0000' + (links.length - 1) + '\u0000'; });
    s = VV2.esc(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\s][^*\n]*?[^*\s]|[^*\s])\*(?!\w)/g, '$1<em>$2</em>');
    s = s.replace(/(^|[^\w])_([^_\s][^_\n]*?[^_\s]|[^_\s])_(?!\w)/g, '$1<em>$2</em>');
    s = s.replace(/\u0000(\d+)\u0000/g, function (m, i) { var l = links[+i]; return '<a href="' + VV2.esc(l[1]) + '" target="_blank" rel="noopener noreferrer">' + VV2.esc(l[0]) + '</a>'; });
    return s;
  }
  L.inline = inl;
  function rowCells(ln) { ln = ln.trim().replace(/^\|/, '').replace(/\|$/, ''); return ln.split('|').map(function (c) { return c.trim(); }); }
  function md(text) {
    var lines = String(text || '').replace(/\r/g, '').split('\n'), out = [], i = 0, para = [], list = null, lt = '';
    function fp() { if (para.length) { var t = para.join(' '); var dyk = /^\**\s*(did you know|क्या आप जानते)/i.test(t); out.push('<p class="rd-say' + (dyk ? ' rd-dyk' : '') + '">' + para.map(inl).join('<br>') + '</p>'); para = []; } }
    function fl() { if (list) { out.push('<' + lt + '>' + list.map(function (x) { return '<li class="rd-say">' + inl(x) + '</li>'; }).join('') + '</' + lt + '>'); list = null; } }
    while (i < lines.length) {
      var ln = lines[i], t = ln.trim(), m;
      if (!t) { fp(); fl(); i++; continue; }
      if ((m = /^(#{2,4})\s+(.*)$/.exec(t))) { fp(); fl(); var lv = Math.min(5, m[1].length + 1); out.push('<h' + lv + ' class="rd-say">' + inl(m[2]) + '</h' + lv + '>'); i++; continue; }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) { fp(); fl(); out.push('<hr>'); i++; continue; }
      if (t.charAt(0) === '|' && i + 1 < lines.length && /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(lines[i + 1].trim())) {
        fp(); fl(); var head = rowCells(t), rows = []; i += 2;
        while (i < lines.length && lines[i].trim().charAt(0) === '|') { rows.push(rowCells(lines[i])); i++; }
        out.push('<div class="rd-tbl"><table><thead><tr>' + head.map(function (c) { return '<th scope="col">' + inl(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inl(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>');
        continue;
      }
      if (t.charAt(0) === '>') {
        fp(); fl(); var q = [];
        while (i < lines.length && lines[i].trim().charAt(0) === '>') { q.push(lines[i].trim().replace(/^>\s?/, '')); i++; }
        out.push('<blockquote class="rd-say">' + q.map(inl).join('<br>') + '</blockquote>'); continue;
      }
      var lm = /^\s*[-•*]\s+(.*)$/.exec(ln), nm = /^\s*\d+[.)]\s+(.*)$/.exec(ln);
      if (lm || nm) { fp(); var ty = lm ? 'ul' : 'ol'; if (list && lt !== ty) fl(); if (!list) { list = []; lt = ty; } list.push((lm || nm)[1]); i++; continue; }
      if (list && /^\s{2,}\S/.test(ln)) { list[list.length - 1] += ' ' + t; i++; continue; }
      fl(); para.push(t); i++;
    }
    fp(); fl();
    return out.join('');
  }
  L.md = md;

  /* ---------------- SVG sanitiser: no scripts, no on*, no external refs; ids, CSS and keyframes scoped per figure ---------------- */
  var SVG_DROP = { script: 1, foreignobject: 1, iframe: 1, object: 1, embed: 1, audio: 1, video: 1, canvas: 1, html: 1, body: 1, head: 1, meta: 1, link: 1, base: 1, form: 1, input: 1, button: 1, textarea: 1, select: 1, handler: 1, listener: 1 };
  var ANIM = { animate: 1, animatetransform: 1, animatemotion: 1, set: 1, animatecolor: 1 };
  function cleanCss(t) {
    return String(t || '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import[^;]*;?/gi, '').replace(/@charset[^;]*;?/gi, '')
      .replace(/url\(\s*(?!['"]?#)[^)]*\)/gi, 'none').replace(/expression\s*\(/gi, '(').replace(/(-moz-binding|behavior)\s*:/gi, 'x-blocked:').replace(/javascript:/gi, '');
  }
  function braceEnd(s, b) { var d = 0; for (var i = b; i < s.length; i++) { var c = s.charAt(i); if (c === '{') d++; else if (c === '}') { d--; if (!d) return i; } } return s.length - 1; }
  function scopeCss(css, scope) {
    var out = '', i = 0;
    while (i < css.length) {
      var b = css.indexOf('{', i); if (b < 0) break;
      var sel = css.slice(i, b).trim(), e = braceEnd(css, b), inner = css.slice(b + 1, e);
      if (/^@(-webkit-)?keyframes\b/i.test(sel)) out += sel + '{' + inner + '}';
      else if (/^@(media|supports)\b/i.test(sel)) out += sel + '{' + scopeCss(inner, scope) + '}';
      else if (sel.charAt(0) !== '@' && sel) out += sel.split(',').map(function (s) { s = s.trim(); return !s ? '' : /^(:root|html|body)$/i.test(s) ? scope : scope + ' ' + s; }).filter(Boolean).join(',') + '{' + inner + '}';
      i = e + 1;
    }
    return out;
  }
  function renameAnim(t, kf) {
    t = t.replace(/(@(?:-webkit-)?keyframes\s+)([\w-]+)/g, function (m, p, n) { return p + (kf[n] || n); });
    return t.replace(/(animation(?:-name)?\s*:\s*)([^;}]+)/gi, function (m, p, v) { return p + v.replace(/[\w-]+/g, function (w) { return kf[w] || w; }); });
  }
  function safeSvg(src, label) {
    if (typeof src !== 'string' || src.length > 24000 || !/<svg[\s>]/i.test(src) || typeof DOMParser === 'undefined') return null;
    /* parsed by the lenient HTML parser into an inert document (no scripts run, no images load); SVG lands in the SVG namespace */
    var doc; try { doc = new DOMParser().parseFromString('<!doctype html><html><body>' + src.trim() + '</body></html>', 'text/html'); } catch (e) { return null; }
    var svg = doc && doc.body && doc.body.querySelector('svg'); if (!svg || svg.namespaceURI !== SVGNS) return null;
    var uid = 'rv' + (++VV2._id), wid = uid + 'w', ids = {}, kf = {}, animated = false;
    var all = [svg].concat(Array.prototype.slice.call(svg.getElementsByTagName('*')));
    all.forEach(function (el) {
      if (!el.parentNode) return;
      var name = String(el.localName || '').toLowerCase();
      if (el !== svg && (SVG_DROP[name] || (el.namespaceURI && el.namespaceURI !== SVGNS))) { el.parentNode.removeChild(el); return; }
      if (ANIM[name]) { animated = true; var an = (el.getAttribute('attributeName') || '').toLowerCase(); if (/href|^on/.test(an)) { el.parentNode.removeChild(el); return; } }
      if (name === 'a') { var g = doc.createElementNS(SVGNS, 'g'); while (el.firstChild) g.appendChild(el.firstChild); el.parentNode.replaceChild(g, el); return; }
      Array.prototype.slice.call(el.attributes).forEach(function (at) {
        var n = at.name.toLowerCase(), v = at.value, ln = String(at.localName || n).toLowerCase();
        if (n.slice(0, 2) === 'on') { el.removeAttributeNode(at); return; }
        if (ln === 'href') { var ok = /^#[\w:.-]+$/.test(v.trim()) || (name === 'image' && /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(v.trim())); if (!ok) el.removeAttributeNode(at); return; }
        if (/javascript:|vbscript:|data:text|<script/i.test(v)) { el.removeAttributeNode(at); return; }
        if (n === 'style') { el.setAttribute('style', cleanCss(v)); return; }
        if (/url\(\s*['"]?(?!#)/i.test(v)) { el.removeAttributeNode(at); return; }
        if (n === 'id') ids[v] = 1;
      });
      if (name === 'image' && !el.getAttribute('href') && !el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')) el.parentNode.removeChild(el);
    });
    var styles = Array.prototype.slice.call(svg.getElementsByTagName('style'));
    styles.forEach(function (st) { var t = st.textContent || ''; t.replace(/@(?:-webkit-)?keyframes\s+([\w-]+)/g, function (m, n) { kf[n] = n + '_' + uid; }); });
    function fixRefs(v) {
      return v.replace(/url\(\s*(['"]?)#([\w:.-]+)\1\s*\)/g, function (m, q, id) { return ids[id] ? 'url(#' + id + '_' + uid + ')' : m; });
    }
    var all2 = [svg].concat(Array.prototype.slice.call(svg.getElementsByTagName('*')));
    all2.forEach(function (el) {
      Array.prototype.slice.call(el.attributes).forEach(function (at) {
        var n = at.name.toLowerCase(), ln = String(at.localName || n).toLowerCase(), v = at.value, nv = v;
        if (n === 'id' && ids[v]) nv = v + '_' + uid;
        else if (ln === 'href' && v.charAt(0) === '#' && ids[v.slice(1)]) nv = v + '_' + uid;
        else if (n === 'begin' || n === 'end') nv = v.replace(/(^|[;\s])([\w-]+)\.(begin|end|click|repeat)/g, function (m, p, id, k) { return ids[id] ? p + id + '_' + uid + '.' + k : m; });
        else if (n === 'style') nv = renameAnim(fixRefs(v), kf);
        else if (v.indexOf('url(') >= 0) nv = fixRefs(v);
        if (nv !== v) at.value = nv;
      });
    });
    styles.forEach(function (st) {
      var t = cleanCss(st.textContent || '');
      if (/@keyframes|animation/i.test(t)) animated = true;
      t = t.replace(/#([A-Za-z_][\w-]*)/g, function (m, id) { return ids[id] ? '#' + id + '_' + uid : m; });
      t = fixRefs(renameAnim(t, kf));
      st.textContent = scopeCss(t, '#' + wid);
    });
    if (!svg.getAttribute('viewBox')) { var w = parseFloat(svg.getAttribute('width')), hh = parseFloat(svg.getAttribute('height')); if (w > 0 && hh > 0) svg.setAttribute('viewBox', '0 0 ' + w + ' ' + hh); }
    svg.removeAttribute('width'); svg.removeAttribute('height');
    svg.setAttribute('role', 'img'); svg.setAttribute('focusable', 'false');
    if (label) svg.setAttribute('aria-label', String(label).slice(0, 300));
    var node = document.importNode(svg, true);
    return { node: node, wid: wid, animated: animated };
  }
  L.safeSvg = safeSvg;
  L._t = { scopeCss: scopeCss, renameAnim: renameAnim, cleanCss: cleanCss };

  /* ---------------- small UI helpers ---------------- */
  function pill(t, cls) { return h('span', { class: 'pill' + (cls ? ' ' + cls : '') }, t); }
  function bandLabel(e) {
    var mm = meta(e);
    if (e.shelf === 'ncert' && mm.cls) return 'Class ' + mm.cls;
    if (mm.band === 'seniors') return '60+';
    if (mm.a0 != null) return 'Ages ' + mm.a0 + (mm.a1 != null && mm.a1 !== mm.a0 ? (mm.a1 >= 99 ? '+' : '–' + mm.a1) : '');
    return mm.band ? cap(mm.band) : '';
  }
  function bookCard(e, i) {
    var sh = shelfOf(e.shelf), r = rget(e.id), mm = meta(e), hue = hash(e.id) % 360;
    var pct = r ? (r.done ? 100 : Math.round(r.pct || 0)) : 0;
    var a = h('a', { href: '#/read/' + encodeURIComponent(e.id), class: 'lb-book' + (r && r.done ? ' done' : ''), style: { '--h': String(hue), '--sc': sh.color }, 'data-say': e.title, lang: e.lang === 'hi' ? 'hi' : null }, [
      h('span', { class: 'lb-cover', 'aria-hidden': 'true' }, [h('span', { class: 'lb-spine' }), h('span', { class: 'lb-ic' }, e.icon || sh.icon), h('span', { class: 'lb-band' }, bandLabel(e) || sh.short)]),
      h('span', { class: 'lb-txt' }, [h('b', null, e.title), e.subtitle ? h('small', null, e.subtitle) : null,
        h('span', { class: 'lb-meta' }, [pill('⏱ ' + VV2.fmtMin(e.minutes || 10)), mm.subj && e.shelf === 'ncert' ? pill(mm.subj) : null, e.lang === 'hi' ? pill('हिन्दी') : null, r && r.done ? pill('✓ Read', 'lb-ok') : null])]),
      pct && !(r && r.done) ? h('span', { class: 'lb-prog', role: 'img', 'aria-label': pct + '% read' }, h('i', { style: { width: pct + '%' } })) : null]);
    a.style.animationDelay = Math.min((i || 0) * 35, 520) + 'ms';
    return a;
  }
  function grid(list, cls) { var g = h('div', { class: 'lb-grid ' + (cls || '') }); list.forEach(function (e, i) { g.appendChild(bookCard(e, i)); }); return g; }
  function row(list) { var g = h('div', { class: 'lb-row', role: 'list' }); list.forEach(function (e, i) { var c = bookCard(e, i); c.setAttribute('role', 'listitem'); g.appendChild(c); }); return g; }
  function sortRead(a, b) { var ma = meta(a), mb = meta(b); return (ma.cls - mb.cls) || ((+a.order || 999) - (+b.order || 999)) || String(a.course || a.id).localeCompare(String(b.course || b.id), 'en', { numeric: true }); }
  var SHELF_ART = '<svg viewBox="0 0 320 120" class="lib-art" aria-hidden="true"><defs><linearGradient id="lbw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a5a3b"/><stop offset="1" stop-color="#5e3b26"/></linearGradient></defs>' +
    '<rect x="6" y="104" width="308" height="10" rx="3" fill="url(#lbw)"/>' +
    [['#e5484d', 20, 70], ['#3f7cf5', 44, 84], ['#ffc94d', 70, 62], ['#2f9e44', 92, 90], ['#7b5cff', 120, 76], ['#e64980', 146, 66], ['#0aa2c0', 170, 88], ['#b0612d', 196, 72], ['#9c36b5', 222, 80], ['#ff8f4d', 248, 64], ['#1c7ed6', 272, 86]].map(function (b, i) {
      return '<g class="lib-bk" style="animation-delay:' + (i * 70) + 'ms"><rect x="' + b[1] + '" y="' + (104 - b[2]) + '" width="' + (i % 3 ? 22 : 20) + '" height="' + b[2] + '" rx="3" fill="' + b[0] + '"/><rect x="' + (b[1] + 4) + '" y="' + (112 - b[2]) + '" width="' + (i % 3 ? 14 : 12) + '" height="3" rx="1.5" fill="#fff" opacity=".7"/><rect x="' + (b[1] + 4) + '" y="' + (98 - 8) + '" width="' + (i % 3 ? 14 : 12) + '" height="2" fill="#fff" opacity=".45"/></g>';
    }).join('') + '<g class="lib-owl"><ellipse cx="300" cy="30" rx="13" ry="15" fill="#d4a23c"/><circle cx="295" cy="27" r="4.5" fill="#fff"/><circle cx="305" cy="27" r="4.5" fill="#fff"/><circle cx="295" cy="27" r="2" fill="#2a1d14"/><circle cx="305" cy="27" r="2" fill="#2a1d14"/><path d="M298 33 L302 33 L300 36Z" fill="#b0612d"/></g></svg>';

  /* ================================================================ LIBRARY PAGE ================================================================ */
  L.render = function (main, q) {
    q = q || {};
    VV2.setTitle('Library');
    VV2.loading(main, VV2.pick(['Dusting the library shelves…', 'Finding your bookmark…', 'Shushing the librarian…']));
    return D.reads().then(function (list) {
      main.innerHTML = '';
      var st = { shelf: q.shelf || '', cls: q.cls || '', age: q.age || '', lang: q.lang || '', q: q.q || '' };
      var w = h('div', { class: 'wrap lib' }); main.appendChild(w);
      var mins = 0; list.forEach(function (e) { mins += +e.minutes || 0; });
      var done = L.doneCount();
      w.appendChild(h('header', { class: 'lib-hero' }, [
        h('div', { class: 'lib-hero-t' }, [h('p', { class: 'eyebrow' }, '📚 VidyaVerse Library'), h('h1', null, 'The Library'),
          h('p', { class: 'lead' }, 'Book-length reads you can learn from on their own: a companion for every NCERT chapter on the campus, long stories, Indian history, engineering, work life and guides for seniors. Free, offline-friendly, read aloud on request.'),
          h('p', { class: 'lib-stats' }, list.length ? [h('b', null, VV2.approx(list.length)), ' reads · ', h('b', null, VV2.hrs(mins).replace('\u2248 ', '≈ ')), ' of reading', done ? [' · ', h('b', null, String(done)), ' finished by you'] : null] : 'The shelves are being stocked.')]),
        h('div', { class: 'lib-hero-art', html: SHELF_ART })]));
      if (!list.length) {
        w.appendChild(h('section', { class: 'empty-state' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '📦'), h('h2', null, 'New books are being unpacked'), h('p', { class: 'muted' }, 'The library catalogue could not be loaded (or is still being written). If you are offline, books you opened before still work.'), h('div', { class: 'row' }, [h('button', { type: 'button', class: 'btn primary', onclick: function () { VV2.render(); } }, '↻ Try again'), h('a', { class: 'btn ghost', href: '#/' }, '🏛️ Campus')])]));
        return;
      }
      /* tools */
      var inp = h('input', { type: 'search', id: 'libQ', placeholder: 'Search titles, chapters, subjects, tags…', 'aria-label': 'Search the library', value: st.q, autocomplete: 'off' });
      var tools = h('section', { class: 'lib-tools', 'aria-label': 'Search and filter the library' });
      tools.appendChild(h('div', { class: 'searchbar' }, [h('span', { class: 'sb-i', 'aria-hidden': 'true' }, '🔍'), inp]));
      var segShelf = h('div', { class: 'seg lib-seg', role: 'group', 'aria-label': 'Shelf' });
      var counts = {}; list.forEach(function (e) { counts[e.shelf] = (counts[e.shelf] || 0) + 1; });
      [{ id: '', icon: '✨', short: 'All' }].concat(SHELVES.filter(function (s) { return counts[s.id]; })).forEach(function (s) {
        segShelf.appendChild(h('button', { type: 'button', class: 'seg-b', 'data-shelf': s.id, 'aria-pressed': st.shelf === s.id ? 'true' : 'false', onclick: function () { st.shelf = s.id; if (s.id !== 'ncert' && s.id) st.cls = ''; VV2.sfx('tap'); draw(true); } }, [h('span', { 'aria-hidden': 'true' }, s.icon + ' '), s.short, s.id ? h('small', { class: 'lib-n' }, ' ' + counts[s.id]) : null]));
      });
      tools.appendChild(segShelf);
      var classes = {}; list.forEach(function (e) { var c = meta(e).cls; if (c && e.shelf === 'ncert') classes[c] = 1; });
      var selCls = h('select', { 'aria-label': 'Class' }, [h('option', { value: '' }, 'Any class')].concat(Object.keys(classes).map(Number).sort(function (a, b) { return a - b; }).map(function (c) { return h('option', { value: String(c) }, 'Class ' + c); })));
      var selAge = h('select', { 'aria-label': 'Reader age' }, AGES.map(function (a) { return h('option', { value: a[0] }, a[1]); }));
      var selLang = h('select', { 'aria-label': 'Language' }, [h('option', { value: '' }, 'Any language'), h('option', { value: 'en' }, 'English'), h('option', { value: 'hi' }, 'हिन्दी (Hindi)')]);
      selCls.value = st.cls; selAge.value = st.age; selLang.value = st.lang;
      var reset = h('button', { type: 'button', class: 'btn small ghost', onclick: function () { st = { shelf: '', cls: '', age: '', lang: '', q: '' }; inp.value = ''; selCls.value = ''; selAge.value = ''; selLang.value = ''; draw(true); } }, '↺ Reset');
      tools.appendChild(h('div', { class: 'lib-filters' }, [h('label', { class: 'f-item' }, ['Class', selCls]), h('label', { class: 'f-item' }, ['Age', selAge]), h('label', { class: 'f-item' }, ['Language', selLang]), reset]));
      w.appendChild(tools);
      selCls.addEventListener('change', function () { st.cls = selCls.value; if (st.cls && st.shelf && st.shelf !== 'ncert') st.shelf = ''; draw(true); });
      selAge.addEventListener('change', function () { st.age = selAge.value; draw(true); });
      selLang.addEventListener('change', function () { st.lang = selLang.value; draw(true); });
      var tq = 0; inp.addEventListener('input', function () { clearTimeout(tq); tq = setTimeout(function () { st.q = inp.value.trim(); draw(false); }, 160); });
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && inp.value) { inp.value = ''; st.q = ''; draw(false); } });
      /* continue reading */
      var R = rs(), byId = {}; list.forEach(function (e) { byId[e.id] = e; });
      var cont = Object.keys(R).filter(function (k) { return byId[k] && R[k] && !R[k].done && R[k].pct > 1; }).sort(function (a, b) { return R[b].ts - R[a].ts; }).slice(0, 10).map(function (k) { return byId[k]; });
      var contSec = h('section', { class: 'lib-sec lib-cont', 'aria-labelledby': 'libContH' }, [h('div', { class: 'section-h' }, [h('div', null, [h('p', { class: 'eyebrow' }, 'Your bookmark'), h('h2', { id: 'libContH' }, '🔖 Continue reading')])]), row(cont)]);
      if (cont.length) w.appendChild(contSec);
      var out = h('div', { class: 'lib-out', 'aria-live': 'polite' }); w.appendChild(out);

      function sync() { var parts = []; ['shelf', 'cls', 'age', 'lang', 'q'].forEach(function (k) { if (st[k]) parts.push(k + '=' + encodeURIComponent(st[k])); }); try { history.replaceState(null, '', '#/library' + (parts.length ? '?' + parts.join('&') : '')); } catch (e) { } }
      function match(e) {
        if (st.shelf && e.shelf !== st.shelf) return false;
        if (st.cls && meta(e).cls !== +st.cls) return false;
        if (st.lang && (e.lang || 'en') !== st.lang) return false;
        if (st.age && !ageOK(e, st.age)) return false;
        return true;
      }
      function draw(anim) {
        sync();
        VV2.$$('.seg-b', segShelf).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-shelf') === st.shelf ? 'true' : 'false'); });
        out.innerHTML = '';
        if (anim) { out.classList.remove('lib-swap'); void out.offsetWidth; out.classList.add('lib-swap'); }
        var f = list.filter(match);
        contSec.hidden = !!(st.q || st.shelf || st.cls || st.age || st.lang);
        if (st.q) {
          var sc = f.map(function (e) { var mm = meta(e); return { e: e, s: VV2.fuzzy(st.q, e.title) * 3 + VV2.fuzzy(st.q, (e.subtitle || '') + ' ' + (e.tags || []).join(' ') + ' ' + mm.subj + ' ' + shelfOf(e.shelf).name + (mm.cls ? ' class ' + mm.cls : '')) }; }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; });
          out.appendChild(h('p', { class: 's-count muted' }, sc.length + ' read' + (sc.length === 1 ? '' : 's') + ' for “' + st.q + '”'));
          if (!sc.length) out.appendChild(emptyBox('No book matches that yet. Try a chapter name, a subject or a simpler word.'));
          else out.appendChild(grid(sc.slice(0, 120).map(function (x) { return x.e; })));
          return;
        }
        if (!st.shelf && !st.cls && !st.age && !st.lang) { overview(); return; }
        if (!f.length) { out.appendChild(emptyBox('Nothing on this shelf matches those filters yet.')); return; }
        if (st.shelf === 'ncert' || (!st.shelf && st.cls)) { ncertView(f); return; }
        if (st.shelf === 'stories') { storiesView(f); return; }
        var sh = st.shelf ? shelfOf(st.shelf) : null;
        if (sh) out.appendChild(shelfHead(sh, f.length, false));
        else out.appendChild(h('p', { class: 's-count muted' }, f.length + ' reads match'));
        out.appendChild(grid(f.slice().sort(sortRead)));
      }
      function emptyBox(msg) { return h('div', { class: 'empty-state small' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🦉'), h('p', null, msg)]); }
      function shelfHead(sh, n, more) {
        return h('div', { class: 'section-h lib-sh', style: { '--sc': sh.color } }, [h('div', null, [h('p', { class: 'eyebrow' }, sh.icon + ' ' + n + ' read' + (n === 1 ? '' : 's')), h('h2', null, sh.name), h('p', { class: 'muted lib-sh-d' }, sh.desc)]),
          more ? h('button', { type: 'button', class: 'btn small', onclick: function () { st.shelf = sh.id; draw(true); try { window.scrollTo({ top: out.offsetTop - 90, behavior: VV2.reduced ? 'auto' : 'smooth' }); } catch (e) { } } }, 'See the whole shelf →') : null]);
      }
      function overview() {
        SHELVES.forEach(function (sh) {
          var f = list.filter(function (e) { return e.shelf === sh.id; });
          if (!f.length) return;
          var sec = h('section', { class: 'lib-sec', 'aria-label': sh.name });
          sec.appendChild(shelfHead(sh, f.length, true));
          var pick = f;
          if (sh.id === 'ncert') { var mc = myClass(); pick = f.slice().sort(function (a, b) { var A = meta(a).cls === mc ? 0 : 1, B = meta(b).cls === mc ? 0 : 1; return A - B || sortRead(a, b); }); }
          else pick = f.slice().sort(sortRead);
          sec.appendChild(h('div', { class: 'lib-shelf' }, row(pick.slice(0, 14))));
          out.appendChild(sec);
        });
      }
      function ncertView(f) {
        var cls = {}; f.forEach(function (e) { var c = meta(e).cls || 0; (cls[c] = cls[c] || []).push(e); });
        var keys = Object.keys(cls).map(Number).sort(function (a, b) { return a - b; });
        var showCls = st.cls ? +st.cls : (keys.indexOf(myClass()) >= 0 ? myClass() : keys[0]);
        out.appendChild(shelfHead(shelfOf('ncert'), f.length, false));
        if (!st.cls && keys.length > 1) {
          var seg = h('div', { class: 'seg lib-clsseg', role: 'group', 'aria-label': 'Choose a class' });
          keys.forEach(function (c) { seg.appendChild(h('button', { type: 'button', class: 'seg-b', 'aria-pressed': c === showCls ? 'true' : 'false', onclick: function () { st.cls = String(c); selCls.value = st.cls; draw(true); } }, c ? 'Class ' + c : 'Other')); });
          out.appendChild(seg);
        }
        var inCls = cls[showCls] || [], subj = {}, order = [];
        inCls.forEach(function (e) { var s = meta(e).subj || 'Other'; if (!subj[s]) { subj[s] = []; order.push(s); } subj[s].push(e); });
        order.sort();
        out.appendChild(h('h3', { class: 'lib-clsh' }, (showCls ? 'Class ' + showCls : 'Other') + ' · ' + inCls.length + ' chapter read' + (inCls.length === 1 ? '' : 's')));
        order.forEach(function (s) { out.appendChild(h('section', { class: 'lib-subj' }, [h('h4', null, [s + ' ', h('small', { class: 'muted' }, '· ' + subj[s].length)]), grid(subj[s].sort(sortRead), 'tight')])); });
      }
      function storiesView(f) {
        out.appendChild(shelfHead(shelfOf('stories'), f.length, false));
        STORY_AGES.forEach(function (g) {
          var inG = f.filter(function (e) { var mm = meta(e); var a = mm.band === 'seniors' ? 65 : (mm.a0 != null ? mm.a0 : 12); return a >= g[2] && a <= g[3]; });
          if (inG.length) out.appendChild(h('section', { class: 'lib-subj' }, [h('h4', null, [g[1] + ' ', h('small', { class: 'muted' }, '· ' + inG.length)]), grid(inG.sort(sortRead), 'tight')]));
        });
      }
      draw(false);
    });
  };

  /* ================================================================ READER ================================================================ */
  var THEMES = [['paper', '📄', 'Paper'], ['sepia', '📜', 'Sepia'], ['night', '🌙', 'Night']];
  function voiceFor(lang) {
    if (!VV2.canSpeak) return null;
    var vs = []; try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { }
    var want = lang === 'hi' ? 'hi-IN' : 'en-IN', pre = lang === 'hi' ? 'hi' : 'en';
    function norm(l) { return String(l || '').replace('_', '-').toLowerCase(); }
    return vs.filter(function (v) { return norm(v.lang) === want.toLowerCase(); })[0] || vs.filter(function (v) { return norm(v.lang).indexOf(pre) === 0 && /in$/.test(norm(v.lang)); })[0] || vs.filter(function (v) { return norm(v.lang).indexOf(pre) === 0; })[0] || null;
  }
  function splitSpeech(t) {
    t = String(t || '').replace(/\s+/g, ' ').trim(); if (!t) return [];
    var parts = t.match(/[^.!?।]+[.!?।]+["'”’)]*\s*|[^.!?।]+$/g) || [t], out = [], buf = '';
    parts.forEach(function (p) { if ((buf + p).length > 230 && buf) { out.push(buf.trim()); buf = ''; } buf += p; while (buf.length > 300) { var k = buf.lastIndexOf(' ', 280); if (k < 80) k = 280; out.push(buf.slice(0, k).trim()); buf = buf.slice(k); } });
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  L.read = function (main, id) {
    VV2.loading(main, VV2.pick(['Opening the book…', 'Finding your page…', 'Smoothing the pages…']));
    return D.reads().then(function (list) {
      var e = list.filter(function (x) { return x.id === id; })[0] || null;
      return D.read(id, e).then(function (doc) { build(main, e || doc, doc, list); });
    }).catch(function (err) {
      VV2.errorView(main, 'This book is not on the shelf', (err && err.message ? err.message + '. ' : '') + 'It may still be being written, or you are offline and have not opened it before.', function () { VV2.render(); });
      var b = main.querySelector('.empty-state .row'); if (b) b.appendChild(h('a', { class: 'btn', href: '#/library' }, '📚 Library'));
    });
  };

  function build(main, entry, doc, list) {
    var id = doc.id || entry.id, sh = shelfOf(doc.shelf || entry.shelf), lang = doc.lang === 'hi' ? 'hi' : 'en';
    var R0 = rget(id) || {}, alive = true, cleanup = [];
    VV2.setTitle(doc.title || entry.title);
    main.innerHTML = '';
    var theme = store.dev('rdTheme') || ((VV2.mode === 'teen' || VV2.mode === 'pro') ? 'night' : 'paper');
    var size = +store.dev('rdSize') || 1, rate = +store.dev('rdRate') || 1;
    var root = h('div', { class: 'rd rd-t-' + theme, style: { '--rs': String(size), '--sc': sh.color } });
    main.appendChild(root);
    var anim = !VV2.reduced && 'IntersectionObserver' in window;
    if (anim) root.classList.add('rd-anim');

    /* ---------- toolbar ---------- */
    var bar = h('i');
    var prog = h('div', { class: 'rd-prog', role: 'progressbar', 'aria-label': 'Reading progress', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0' }, bar);
    var tocBtn = h('button', { type: 'button', class: 'rd-tb rd-toc-b', 'aria-label': 'Contents', title: 'Contents', 'aria-expanded': 'false' }, [h('span', { 'aria-hidden': 'true' }, '☰'), h('span', { class: 'rd-tbl-t' }, 'Contents')]);
    var aaBtn = h('button', { type: 'button', class: 'rd-tb', 'aria-label': 'Reading settings: theme, text size, voice speed', title: 'Theme & text size', 'aria-expanded': 'false', 'aria-controls': 'rdSet' }, [h('span', { 'aria-hidden': 'true' }, 'Aa'), h('span', { class: 'rd-tbl-t' }, 'Look')]);
    var sayBtn = h('button', { type: 'button', class: 'rd-tb rd-say-b', 'aria-label': 'Read aloud', title: VV2.canSpeak ? 'Read aloud from where you are' : 'Read aloud is not supported in this browser', disabled: VV2.canSpeak ? null : true }, [h('span', { 'aria-hidden': 'true' }, '🔊'), h('span', { class: 'rd-tbl-t' }, 'Listen')]);
    var stopBtn = h('button', { type: 'button', class: 'rd-tb', 'aria-label': 'Stop reading aloud', title: 'Stop', hidden: true }, '⏹');
    var pctTxt = h('span', { class: 'rd-pct', 'aria-hidden': 'true' }, '0%');
    var toolbar = h('div', { class: 'rd-bar no-print', role: 'toolbar', 'aria-label': 'Reader controls' }, [
      h('a', { href: entry.course ? '#/course/' + encodeURIComponent(entry.course) : '#/library', class: 'rd-tb rd-back', 'aria-label': entry.course ? 'Back to the course' : 'Back to the Library' }, [h('span', { 'aria-hidden': 'true' }, '←'), h('span', { class: 'rd-tbl-t' }, entry.course ? 'Course' : 'Library')]),
      h('span', { class: 'rd-bt' }, [h('span', { 'aria-hidden': 'true' }, (doc.icon || entry.icon || sh.icon) + ' '), doc.title || entry.title]),
      pctTxt, tocBtn, aaBtn, sayBtn, stopBtn, prog]);
    root.appendChild(toolbar);

    /* settings panel */
    var setP = h('div', { class: 'rd-set no-print', id: 'rdSet', hidden: true, role: 'group', 'aria-label': 'Reading settings' });
    var thSeg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Page colour' }, THEMES.map(function (t) { return h('button', { type: 'button', class: 'seg-b', 'data-th': t[0], 'aria-pressed': t[0] === theme ? 'true' : 'false', onclick: function () { setTheme(t[0]); } }, t[1] + ' ' + t[2]); }));
    var sizeOut = h('output', { class: 'rd-sz', 'aria-live': 'polite' }, Math.round(size * 100) + '%');
    var rateSeg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Voice speed' }, [[0.8, '🐢 Slow'], [1, 'Normal'], [1.2, '🐇 Fast']].map(function (r) { return h('button', { type: 'button', class: 'seg-b', 'data-rate': String(r[0]), 'aria-pressed': r[0] === rate ? 'true' : 'false', onclick: function () { rate = r[0]; store.dev('rdRate', rate); VV2.$$('[data-rate]', rateSeg).forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-rate') === rate ? 'true' : 'false'); }); } }, r[1]); }));
    setP.appendChild(h('div', { class: 'rd-set-row' }, [h('b', null, 'Page'), thSeg]));
    setP.appendChild(h('div', { class: 'rd-set-row' }, [h('b', null, 'Text size'), h('div', { class: 'row' }, [h('button', { type: 'button', class: 'btn small', 'aria-label': 'Smaller text', onclick: function () { setSize(size - 0.1); } }, 'A−'), sizeOut, h('button', { type: 'button', class: 'btn small', 'aria-label': 'Bigger text', onclick: function () { setSize(size + 0.1); } }, 'A+')])]));
    if (VV2.canSpeak) setP.appendChild(h('div', { class: 'rd-set-row' }, [h('b', null, 'Voice speed'), rateSeg, h('small', { class: 'muted' }, lang === 'hi' ? 'Uses a Hindi (hi-IN) voice if your device has one.' : 'Uses an Indian English (en-IN) voice if your device has one.')]));
    root.appendChild(setP);
    function setTheme(t) { root.classList.remove('rd-t-' + theme); theme = t; root.classList.add('rd-t-' + theme); store.dev('rdTheme', t); VV2.$$('[data-th]', thSeg).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-th') === t ? 'true' : 'false'); }); VV2.sfx('tap'); }
    function setSize(s) { size = Math.round(VV2.clamp(s, 0.8, 1.6) * 10) / 10; root.style.setProperty('--rs', String(size)); sizeOut.textContent = Math.round(size * 100) + '%'; store.dev('rdSize', size); }
    aaBtn.addEventListener('click', function () { var open = setP.hidden; setP.hidden = !open; aaBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); if (open) { var f = setP.querySelector('button'); if (f) f.focus(); } });

    /* ---------- layout ---------- */
    var layout = h('div', { class: 'rd-layout' }); root.appendChild(layout);
    var tocAside = h('nav', { class: 'rd-toc no-print', 'aria-label': 'Contents' }); layout.appendChild(tocAside);
    var art = h('article', { class: 'rd-book', lang: lang, 'aria-labelledby': 'rdTitle' }); layout.appendChild(art);
    var toc = [];

    /* cover */
    var mm = meta(entry.id ? entry : doc), course = entry.course && D.byId ? D.byId[entry.course] : null;
    var resumeBtn = null;
    if (R0.pos && R0.pos.s && !R0.done && (R0.pct || 0) > 3) resumeBtn = h('button', { type: 'button', class: 'btn primary', onclick: function () { resume(true); } }, '↩ Resume where you left off');
    art.appendChild(h('header', { class: 'rd-cover' }, [
      h('div', { class: 'rd-cover-i', 'aria-hidden': 'true' }, doc.icon || sh.icon),
      h('p', { class: 'eyebrow' }, sh.icon + ' ' + sh.short + (mm.cls ? ' · Class ' + mm.cls : '') + (mm.subj && doc.shelf === 'ncert' ? ' · ' + mm.subj : '')),
      h('h1', { id: 'rdTitle', class: 'rd-say' }, doc.title || entry.title),
      doc.subtitle ? h('p', { class: 'rd-sub rd-say' }, doc.subtitle) : null,
      h('div', { class: 'rd-meta' }, [pill('⏱ ' + VV2.fmtMin(doc.minutes || entry.minutes || 10) + ' read'), bandLabel(entry.id ? entry : doc) ? pill(bandLabel(entry.id ? entry : doc)) : null, pill((doc.sections || []).length + ' sections')].concat((doc.tags || []).slice(0, 4).map(function (t) { return pill('🏷️ ' + t, 'tag'); }))),
      h('div', { class: 'row rd-cover-acts no-print' }, [resumeBtn, entry.course ? h('a', { class: 'btn', href: '#/course/' + encodeURIComponent(entry.course) }, '🎓 ' + (course ? 'Lessons: ' + String(course.title).slice(0, 48) : 'Go to the course')) : null, R0.done ? h('span', { class: 'pill lb-ok' }, '✓ You finished this') : null])]));
    if (doc.shelf === 'ncert' || /^rd-school-/.test(id)) art.appendChild(h('p', { class: 'rd-note muted' }, 'An original companion written to follow the chapter’s topics in order. Use it alongside your official textbook. Not affiliated with or endorsed by NCERT, CBSE or any board.'));

    /* sections */
    var secs = Array.isArray(doc.sections) ? doc.sections : [];
    var secEls = [];
    var firstDrop = true;
    secs.forEach(function (s, i) {
      if (!s) return;
      var sid = 'rds-' + i;
      var se = h('section', { class: 'rd-sec rd-rv', id: sid, 'aria-labelledby': sid + 'h' });
      se.appendChild(h('h2', { id: sid + 'h', class: 'rd-say' }, [h('span', { class: 'rd-sn', 'aria-hidden': 'true' }, String(i + 1)), s.h || 'Section ' + (i + 1)]));
      var body = h('div', { class: 'rd-md', html: md(s.md || '') });
      var fp = body.querySelector('p');
      if (fp && firstDrop && lang !== 'hi' && /^[A-Za-z“"‘']/.test(fp.textContent || '')) { fp.classList.add('dc'); }
      if (fp && i === 0) firstDrop = false;
      if (fp && i > 0 && lang !== 'hi' && /^[A-Za-z]/.test(fp.textContent || '')) fp.classList.add('dc2');
      se.appendChild(body);
      if (s.fig) { var fg = figure(s.fig, cleanup); if (fg) se.appendChild(fg); }
      if (Array.isArray(s.keyTerms) && s.keyTerms.length) se.appendChild(keyTerms(s.keyTerms));
      if (s.check) { var ck = checkBox(s.check, 's' + i); if (ck) se.appendChild(ck); }
      art.appendChild(se); secEls.push(se);
      toc.push({ id: sid, label: s.h || 'Section ' + (i + 1), n: String(i + 1) });
      if (i === 0 && doc.story && Array.isArray(doc.story.parts) && doc.story.parts.length) { var stEl = storyEl(doc.story); art.appendChild(stEl); secEls.push(stEl); toc.push({ id: 'rdp-story', label: 'Story: ' + (doc.story.title || 'a story'), n: '📖' }); }
    });
    if (!secs.length && doc.story) { var stEl2 = storyEl(doc.story); art.appendChild(stEl2); secEls.push(stEl2); toc.push({ id: 'rdp-story', label: 'Story', n: '📖' }); }
    if (Array.isArray(doc.workedExamples) && doc.workedExamples.length) { var we = workedEl(doc.workedExamples); art.appendChild(we); secEls.push(we); toc.push({ id: 'rdp-we', label: 'Worked examples', n: '✍️' }); }
    if (Array.isArray(doc.summary) && doc.summary.length) {
      var sum = h('section', { class: 'rd-panel rd-sum rd-rv', id: 'rdp-sum', 'aria-labelledby': 'rdpSumH' }, [h('h2', { id: 'rdpSumH', class: 'rd-say' }, '🧾 Quick revision'), h('ul', { class: 'rd-ticks' }, doc.summary.map(function (x) { return h('li', { class: 'rd-say', html: inl(x) }); }))]);
      art.appendChild(sum); secEls.push(sum); toc.push({ id: 'rdp-sum', label: 'Quick revision', n: '🧾' });
    }
    if (Array.isArray(doc.glossary) && doc.glossary.length) { var gl = glossaryEl(doc.glossary); art.appendChild(gl); secEls.push(gl); toc.push({ id: 'rdp-gl', label: 'Glossary', n: '📖' }); }
    if (Array.isArray(doc.practice) && doc.practice.length) { var pr = practiceEl(doc.practice); art.appendChild(pr); secEls.push(pr); toc.push({ id: 'rdp-pr', label: 'Practice questions', n: '📝' }); }
    var fl = (doc.further || []).filter(function (x) { return x && /^https:\/\//.test(x.url || ''); });
    if (fl.length) art.appendChild(h('section', { class: 'rd-panel rd-further rd-rv', 'aria-label': 'Further reading' }, [h('h2', null, '🔗 Go further'), h('ul', null, fl.map(function (x) { return h('li', null, h('a', { href: x.url, target: '_blank', rel: 'noopener noreferrer' }, x.label || x.url)); }))]));

    /* end panel: mark as read + next */
    var nextE = nextRead(entry.id ? entry : doc, list);
    var markBtn = h('button', { type: 'button', class: 'btn primary big rd-mark' }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), R0.done ? '✓ Marked as read' : '✅ Mark as read']);
    if (R0.done) markBtn.classList.add('is-done');
    var endP = h('section', { class: 'rd-end rd-rv', id: 'rdp-end', 'aria-label': 'Finished?' }, [
      h('div', { class: 'rd-end-art', 'aria-hidden': 'true' }, '🪷'),
      h('h2', null, R0.done ? 'You have read this one' : 'Reached the last page?'),
      h('p', { class: 'muted' }, R0.done ? 'Come back any time to revise — your checks and bookmark are saved on this device.' : 'Mark it as read to save your progress and earn XP. Then try the practice questions in your notebook.'),
      h('div', { class: 'row rd-end-acts' }, [markBtn,
        nextE ? h('a', { class: 'btn', href: '#/read/' + encodeURIComponent(nextE.id) }, (/-\d+$/.test(nextE.id) && nextE.course === entry.course ? '📖 Continue: part 2 →' : '📖 Next: ' + String(nextE.title).slice(0, 46) + ' →')) : null,
        entry.course ? h('a', { class: 'btn ghost', href: '#/course/' + encodeURIComponent(entry.course) }, '🎓 Lessons & quiz') : null,
        h('a', { class: 'btn ghost', href: '#/library' }, '📚 Library')])]);
    art.appendChild(endP);
    toc.push({ id: 'rdp-end', label: 'Finish & mark as read', n: '✅' });
    markBtn.addEventListener('click', function () {
      var r = rget(id) || {}; if (r.done) { VV2.toast('Already marked as read — well done.', '📖'); return; }
      rset(id, function (x) { x.done = true; x.pct = 100; x.t = doc.title; x.i = doc.icon; x.doneAt = Date.now(); });
      var xp = Math.round(VV2.clamp(10 + (+doc.minutes || 10) / 2, 10, 50));
      store.activity(); if (entry.course) store.touch(entry.course);
      store.addXP(xp, 'Finished “' + String(doc.title || '').slice(0, 40) + '”');
      store.badge('reader'); if (L.doneCount() >= 10) store.badge('bibliophile');
      VV2.sfx('win'); VV2.confetti();
      markBtn.classList.add('is-done'); markBtn.lastChild.textContent = '✓ Marked as read';
      endP.querySelector('h2').textContent = 'Book finished. Shabash!';
      setBar(100);
    });

    /* table of contents (side rail on wide screens, sheet on phones) */
    function tocList(onPick) {
      return h('ol', { class: 'rd-toc-l' }, toc.map(function (t) { return h('li', null, h('a', { href: '#' + t.id, 'data-toc': t.id, onclick: function (ev) { ev.preventDefault(); go(t.id); if (onPick) onPick(); } }, [h('span', { class: 'rd-toc-n', 'aria-hidden': 'true' }, t.n), h('span', null, t.label)])); }));
    }
    tocAside.appendChild(h('p', { class: 'rd-toc-h' }, 'Contents'));
    tocAside.appendChild(tocList());
    tocBtn.addEventListener('click', function () {
      var m = VV2.modal({ title: '☰ Contents', body: tocList(function () { m.close(); }), cls: 'sheet rd-toc-sheet' });
      var cur = m.body.querySelector('[data-toc="' + curId + '"]'); if (cur) cur.setAttribute('aria-current', 'true');
    });
    function go(sid) { var el = document.getElementById(sid); if (!el) return; reveal(el); try { el.scrollIntoView({ behavior: VV2.reduced ? 'auto' : 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); } var f = el.querySelector('h2'); if (f) { f.setAttribute('tabindex', '-1'); try { f.focus({ preventScroll: true }); } catch (e) { } } }

    /* ---------- reveal on scroll ---------- */
    var io = null;
    function reveal(el) { if (el && el.classList) el.classList.add('in'); }
    if (anim) {
      io = new IntersectionObserver(function (ents) { ents.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
      VV2.$$('.rd-rv', art).forEach(function (el) { io.observe(el); });
      cleanup.push(function () { io.disconnect(); });
    }

    /* ---------- progress, current section, bookmark ---------- */
    var curId = '', saveT = 0, pend = null, ticking = false, maxPct = R0.done ? 100 : (R0.pct || 0), started = false;
    function setBar(p) { bar.style.width = p + '%'; prog.setAttribute('aria-valuenow', String(Math.round(p))); pctTxt.textContent = Math.round(p) + '%'; }
    function measure() {
      ticking = false; if (!alive) return;
      var top = art.getBoundingClientRect().top + window.pageYOffset, hgt = art.offsetHeight || 1, y = window.pageYOffset, vh = window.innerHeight || 600;
      var p = VV2.clamp((y + vh * 0.9 - top) / hgt * 100, 0, 100);
      if (y + vh >= document.documentElement.scrollHeight - 4) p = 100;
      setBar(p);
      var cid = '', cel = null, line = 140;
      for (var i = 0; i < secEls.length; i++) { var r = secEls[i].getBoundingClientRect(); if (r.top - line <= 0) { cid = secEls[i].id; cel = secEls[i]; } else break; }
      if (cid !== curId) { curId = cid; VV2.$$('[data-toc]', tocAside).forEach(function (a) { if (a.getAttribute('data-toc') === cid) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }
      if (p > maxPct + 0.5 || (cel && started)) {
        maxPct = Math.max(maxPct, p);
        clearTimeout(saveT);
        var frac = cel ? VV2.clamp((line - cel.getBoundingClientRect().top) / (cel.offsetHeight || 1), 0, 1) : 0;
        pend = function () { pend = null; rset(id, function (x) { x.pct = Math.max(x.pct || 0, Math.round(maxPct)); x.pos = cid ? { s: cid, f: Math.round(frac * 1000) / 1000 } : null; x.t = doc.title; x.i = doc.icon; }); };
        saveT = setTimeout(function () { if (pend) pend(); }, 900);
      }
    }
    function onScroll() { started = true; if (!ticking) { ticking = true; requestAnimationFrame(measure); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    cleanup.push(function () { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearTimeout(saveT); if (pend) pend(); });
    function resume(manual) {
      var r = rget(id); if (!r || !r.pos || !r.pos.s) return;
      var el = document.getElementById(r.pos.s); if (!el) return;
      var idx = secEls.indexOf(el); for (var k = 0; k <= idx; k++) reveal(secEls[k]);
      var y = el.getBoundingClientRect().top + window.pageYOffset - 140 + (el.offsetHeight || 0) * (r.pos.f || 0);
      try { window.scrollTo({ top: Math.max(0, y), behavior: manual && !VV2.reduced ? 'smooth' : 'auto' }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
    }
    setTimeout(function () {
      if (!alive) return;
      measure();
      if (R0.pos && R0.pos.s && !R0.done && (R0.pct || 0) > 3) {
        resume(false);
        var tb = h('div', { class: 'rd-resume no-print', role: 'status' }, [h('span', null, '🔖 Back where you left off'), h('button', { type: 'button', class: 'btn small ghost', onclick: function () { window.scrollTo(0, 0); tb.remove(); } }, '⤒ Start from the top')]);
        document.body.appendChild(tb); cleanup.push(function () { tb.remove(); }); setTimeout(function () { if (tb.parentNode) tb.classList.add('out'); setTimeout(function () { tb.remove(); }, 600); }, 6500);
      }
    }, 120);

    /* ---------- read aloud ---------- */
    var spk = { token: 0, i: 0, blocks: [], state: 'idle', el: null };
    function spMark(el) { if (spk.el) spk.el.classList.remove('rd-now'); spk.el = el; if (el) { el.classList.add('rd-now'); var r = el.getBoundingClientRect(); if (r.top < 120 || r.bottom > window.innerHeight - 60) try { el.scrollIntoView({ behavior: VV2.reduced ? 'auto' : 'smooth', block: 'center' }); } catch (e) { } } }
    function spUI() {
      var on = spk.state !== 'idle';
      sayBtn.firstChild.textContent = spk.state === 'playing' ? '⏸' : (spk.state === 'paused' ? '▶' : '🔊');
      sayBtn.lastChild.textContent = spk.state === 'playing' ? 'Pause' : (spk.state === 'paused' ? 'Resume' : 'Listen');
      sayBtn.setAttribute('aria-label', spk.state === 'playing' ? 'Pause reading aloud' : spk.state === 'paused' ? 'Resume reading aloud' : 'Read aloud');
      sayBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); stopBtn.hidden = !on; root.classList.toggle('rd-speaking', on);
    }
    function spStop() { spk.token++; spk.state = 'idle'; try { window.speechSynthesis.cancel(); } catch (e) { } spMark(null); spUI(); }
    function spNext(my) {
      if (my !== spk.token || !alive) return;
      if (spk.i >= spk.blocks.length) { spStop(); VV2.toast('Finished reading aloud.', '🔊'); return; }
      var el = spk.blocks[spk.i], chunks = splitSpeech(el.textContent), j = 0, v = voiceFor(lang);
      spMark(el); reveal(el.closest('.rd-rv'));
      (function one() {
        if (my !== spk.token || !alive) return;
        if (j >= chunks.length) { spk.i++; spNext(my); return; }
        var txt = chunks[j++];
        try {
          var u = new SpeechSynthesisUtterance(txt); u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; if (v) u.voice = v; u.rate = rate * (VV2.mode === 'tiny' ? 0.85 : VV2.mode === 'kids' ? 0.93 : 1);
          u.onend = function () { if (my === spk.token) one(); };
          u.onerror = function (ev) { if (my === spk.token && ev && ev.error !== 'interrupted' && ev.error !== 'canceled') one(); };
          if (VV2.captionsOn) VV2.caption('🗣️ ' + txt);
          window.speechSynthesis.speak(u);
        } catch (e) { spStop(); }
      })();
    }
    function spStart() {
      spk.blocks = VV2.$$('.rd-say', art).filter(function (el) { return !el.closest('.rd-check') && (el.textContent || '').trim(); });
      var k = 0; for (var i = 0; i < spk.blocks.length; i++) { if (spk.blocks[i].getBoundingClientRect().bottom > 130) { k = i; break; } }
      spk.token++; spk.i = k; spk.state = 'playing'; spUI();
      try { window.speechSynthesis.cancel(); } catch (e) { }
      var my = spk.token; setTimeout(function () { spNext(my); }, 60);
    }
    sayBtn.addEventListener('click', function () {
      if (!VV2.canSpeak) return;
      if (spk.state === 'idle') spStart();
      else if (spk.state === 'playing') { try { window.speechSynthesis.pause(); } catch (e) { } spk.state = 'paused'; spUI(); }
      else { try { window.speechSynthesis.resume(); } catch (e) { } spk.state = 'playing'; spUI(); }
    });
    stopBtn.addEventListener('click', spStop);
    /* tap a paragraph while listening to jump there */
    art.addEventListener('click', function (ev) {
      if (spk.state === 'idle') return; var t = ev.target.closest && ev.target.closest('.rd-say'); if (!t || ev.target.closest('a,button')) return;
      var k = spk.blocks.indexOf(t); if (k < 0) return; spk.token++; try { window.speechSynthesis.cancel(); } catch (e) { } spk.i = k; spk.state = 'playing'; spUI(); var my = spk.token; setTimeout(function () { spNext(my); }, 60);
    });
    cleanup.push(spStop);

    /* keyboard: [ and ] jump sections, Esc closes settings */
    function onKey(ev) {
      var tg = (ev.target && ev.target.tagName) || ''; if (/INPUT|TEXTAREA|SELECT/.test(tg) || document.body.classList.contains('has-modal')) return;
      if (ev.key === ']' || ev.key === '[') { ev.preventDefault(); var i = -1; for (var k = 0; k < toc.length; k++) if (toc[k].id === curId) i = k; var n = VV2.clamp(i + (ev.key === ']' ? 1 : -1), 0, toc.length - 1); go(toc[n].id); }
      if (ev.key === 'Escape' && !setP.hidden) { setP.hidden = true; aaBtn.setAttribute('aria-expanded', 'false'); aaBtn.focus(); }
    }
    document.addEventListener('keydown', onKey);
    cleanup.push(function () { document.removeEventListener('keydown', onKey); });

    VV2.onLeave(function () { alive = false; cleanup.forEach(function (f) { try { f(); } catch (e) { } }); });
    VV2.track(sh.fac || 'school');

    /* ---------- builders that need the read's id ---------- */
    function checkBox(c, key) {
      if (!c || !c.q || !Array.isArray(c.options) || c.options.length < 2) return null;
      var ans = +c.answer; if (!(ans >= 0 && ans < c.options.length)) return null;
      var fb = h('div', { class: 'rd-ck-fb', 'aria-live': 'polite' });
      var opts = h('div', { class: 'rd-ck-o', role: 'group', 'aria-label': 'Answer options' });
      var box = h('div', { class: 'rd-check', role: 'group', 'aria-label': 'Quick check' }, [h('p', { class: 'rd-ck-h' }, [h('span', { 'aria-hidden': 'true' }, '🤔 '), 'Quick check']), h('p', { class: 'rd-ck-q', html: inl(c.q) }), opts, fb]);
      var btns = c.options.map(function (o, i) { var b = h('button', { type: 'button', class: 'rd-opt', 'data-i': String(i), onclick: function () { pickOpt(i, true); } }, [h('span', { class: 'rd-opt-k', 'aria-hidden': 'true' }, 'ABCDEFGH'.charAt(i)), h('span', { html: inl(o) })]); opts.appendChild(b); return b; });
      function pickOpt(i, live) {
        if (box.classList.contains('answered')) return;
        box.classList.add('answered'); var ok = i === ans;
        btns.forEach(function (b, k) { b.disabled = true; if (k === ans) b.classList.add('ok'); if (k === i && !ok) b.classList.add('no'); if (k === i) b.setAttribute('aria-pressed', 'true'); });
        fb.innerHTML = '';
        fb.appendChild(h('p', { class: ok ? 'good' : 'bad' }, [h('b', null, ok ? (VV2.pick(['✅ Correct! ', '✅ Exactly right! ', '✅ Shabash! '])) : '❌ Not quite. '), ok ? null : h('span', null, ['The answer is ', h('b', { html: inl(c.options[ans]) }), '. '])]));
        if (c.why) fb.appendChild(h('p', { class: 'rd-why', html: '💡 ' + inl(c.why) }));
        fb.appendChild(h('button', { type: 'button', class: 'btn small ghost', onclick: function () { box.classList.remove('answered'); fb.innerHTML = ''; btns.forEach(function (b) { b.disabled = false; b.classList.remove('ok', 'no'); b.removeAttribute('aria-pressed'); }); } }, '↻ Try again'));
        if (live) {
          VV2.sfx(ok ? 'good' : 'bad');
          box.classList.remove('pop', 'shake'); void box.offsetWidth; box.classList.add(ok ? 'pop' : 'shake');
          var first = !((rget(id) || {}).ck || {}).hasOwnProperty(key);
          rset(id, function (x) { x.ck = x.ck || {}; if (!x.ck.hasOwnProperty(key)) x.ck[key] = i; x.t = doc.title; x.i = doc.icon; });
          store.update(function (p) { p.stats = p.stats || {}; p.stats.quizTotal = (p.stats.quizTotal || 0) + 1; if (ok) p.stats.quizRight = (p.stats.quizRight || 0) + 1; });
          if (ok && first) store.addXP(3, 'Quick check');
        }
      }
      var saved = (R0.ck || {})[key];
      if (saved != null && saved >= 0 && saved < c.options.length) pickOpt(+saved, false);
      return box;
    }
  }

  function storyEl(st) {
    var se = h('section', { class: 'rd-story rd-rv', id: 'rdp-story', 'aria-labelledby': 'rdpStH' }, [h('p', { class: 'eyebrow' }, '📖 A story'), h('h2', { id: 'rdpStH', class: 'rd-say' }, st.title || 'A story')]);
    (st.parts || []).forEach(function (p, i) { if (!p) return; se.appendChild(h('div', { class: 'rd-part' }, [p.emoji ? h('span', { class: 'rd-part-e', 'aria-hidden': 'true' }, p.emoji) : null, h('div', { class: 'rd-md', html: md(p.md || '') })])); if (i < st.parts.length - 1) se.appendChild(h('p', { class: 'rd-orn', 'aria-hidden': 'true' }, '❧')); });
    return se;
  }
  function keyTerms(list) {
    return h('aside', { class: 'rd-keys', 'aria-label': 'Key terms' }, [h('p', { class: 'rd-keys-h' }, '🔑 Key terms'), h('dl', null, [].concat.apply([], list.map(function (t) {
      var s = String(t || ''), m = /^(.{1,80}?)\s+[—–-]\s+(.+)$/.exec(s) || /^([^:]{1,60}):\s+(.+)$/.exec(s);
      return m ? [h('dt', { html: inl(m[1]) }), h('dd', { html: inl(m[2]) })] : [h('dt', { html: inl(s) }), h('dd', null, '')];
    })))]);
  }
  function workedEl(list) {
    var se = h('section', { class: 'rd-panel rd-we rd-rv', id: 'rdp-we', 'aria-labelledby': 'rdpWeH' }, [h('h2', { id: 'rdpWeH', class: 'rd-say' }, '✍️ Worked examples'), h('p', { class: 'muted' }, 'Try each one yourself first, then reveal the solution one step at a time.')]);
    list.forEach(function (x, i) {
      if (!x || !x.q) return;
      var steps = Array.isArray(x.steps) ? x.steps : [], shown = 0;
      var ol = h('ol', { class: 'rd-steps' }, steps.map(function (s) { return h('li', { class: 'rd-step', hidden: true, html: inl(s) }); }));
      var ansEl = h('p', { class: 'rd-we-ans', hidden: true, html: '<b>Answer:</b> ' + inl(x.answer || '') });
      var nextB = h('button', { type: 'button', class: 'btn small primary' }, steps.length ? 'Show step 1 of ' + steps.length : 'Show answer');
      var allB = h('button', { type: 'button', class: 'btn small ghost' }, 'Show all');
      function upd() {
        var lis = VV2.$$('.rd-step', ol); lis.forEach(function (li, k) { if (k < shown && li.hidden) { li.hidden = false; li.classList.add('rd-in'); } });
        if (shown >= steps.length) { if (ansEl.hidden) { ansEl.hidden = false; ansEl.classList.add('rd-in'); VV2.sfx('pop'); } nextB.hidden = true; allB.hidden = true; }
        else nextB.textContent = 'Show step ' + (shown + 1) + ' of ' + steps.length;
      }
      nextB.addEventListener('click', function () { shown++; VV2.sfx('tick'); upd(); });
      allB.addEventListener('click', function () { shown = steps.length; upd(); });
      se.appendChild(h('div', { class: 'rd-ex' }, [h('p', { class: 'rd-ex-h' }, 'Example ' + (i + 1)), h('p', { class: 'rd-ex-q rd-say', html: inl(x.q) }), ol, ansEl, h('div', { class: 'row no-print' }, [nextB, steps.length ? allB : null])]));
    });
    return se;
  }
  function glossaryEl(list) {
    var items = list.filter(function (g) { return g && g.t; });
    var dl = h('dl', { class: 'rd-gl' }, [].concat.apply([], items.map(function (g) { return [h('dt', { html: inl(g.t) }), h('dd', { html: inl(g.d || '') })]; })));
    var se = h('section', { class: 'rd-panel rd-glp rd-rv', id: 'rdp-gl', 'aria-labelledby': 'rdpGlH' }, [h('h2', { id: 'rdpGlH' }, '📖 Glossary')]);
    if (items.length > 10) {
      var f = h('input', { type: 'search', placeholder: 'Find a word…', 'aria-label': 'Filter the glossary', class: 'rd-gl-f no-print' });
      f.addEventListener('input', function () { var v = VV2.norm(f.value); VV2.$$('dt', dl).forEach(function (dt) { var dd = dt.nextElementSibling, ok = !v || VV2.norm(dt.textContent + ' ' + (dd ? dd.textContent : '')).indexOf(v) >= 0; dt.hidden = !ok; if (dd) dd.hidden = !ok; }); });
      se.appendChild(f);
    }
    se.appendChild(dl);
    return se;
  }
  function practiceEl(list) {
    var se = h('section', { class: 'rd-panel rd-pr rd-rv', id: 'rdp-pr', 'aria-labelledby': 'rdpPrH' }, [h('h2', { id: 'rdpPrH', class: 'rd-say' }, '📝 Practice questions'), h('p', { class: 'muted' }, 'Write your answers in your notebook — the way you would in an exam. Check them against the sections above.'),
      h('ol', { class: 'rd-prl' }, list.map(function (q) { return h('li', { class: 'rd-say', html: inl(q) }); })),
      h('div', { class: 'row no-print' }, [h('button', { type: 'button', class: 'btn small', onclick: function () { printPart('rd-print-practice'); } }, '🖨 Print practice sheet'), h('button', { type: 'button', class: 'btn small ghost', onclick: function () { printPart(''); } }, '🖨 Print the whole read')])]);
    return se;
  }
  function printPart(cls) {
    if (cls) document.body.classList.add(cls);
    VV2.$$('.rd-rv').forEach(function (el) { el.classList.add('in'); });
    var done = function () { document.body.classList.remove('rd-print-practice'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(function () { try { window.print(); } catch (e) { } setTimeout(done, 1500); }, 60);
  }

  /* ---------- figures ---------- */
  function figure(f, cleanup) {
    if (!f || typeof f !== 'object' || !f.type) return null;
    var fe = h('figure', { class: 'rd-fig rd-rv rd-fig-' + String(f.type).replace(/[^a-z0-9]/gi, '') });
    var cap = f.caption ? h('figcaption', { class: 'rd-say', html: inl(f.caption) }) : null;
    if (f.type === 'svg') {
      var s = safeSvg(f.svg, f.alt || f.caption || 'Diagram');
      if (!s) { if (!cap) return null; fe.appendChild(h('p', { class: 'muted rd-figfail' }, '🖼️ (The diagram could not be drawn on this device.)')); fe.appendChild(cap); return fe; }
      var wrap = h('div', { class: 'rd-svg', id: s.wid }); wrap.appendChild(s.node); fe.appendChild(wrap);
      var tools = h('div', { class: 'rd-fig-t no-print' });
      if (s.animated) {
        var pb = h('button', { type: 'button', class: 'rd-mini', 'aria-pressed': 'false' }, '⏸ Pause');
        var playing = true;
        var setPlay = function (on) { playing = on; try { if (on) s.node.unpauseAnimations(); else s.node.pauseAnimations(); } catch (e) { } wrap.classList.toggle('paused', !on); pb.textContent = on ? '⏸ Pause' : '▶ Play animation'; pb.setAttribute('aria-pressed', on ? 'false' : 'true'); };
        pb.addEventListener('click', function () { setPlay(!playing); });
        tools.appendChild(pb);
        if (VV2.reduced) setTimeout(function () { try { s.node.setCurrentTime(1.5); } catch (e) { } setPlay(false); }, 30);
        /* save battery: pause animations while the figure is off-screen */
        if ('IntersectionObserver' in window) {
          var vo = new IntersectionObserver(function (en) { en.forEach(function (x) { if (!playing) return; try { if (x.isIntersecting) s.node.unpauseAnimations(); else s.node.pauseAnimations(); } catch (e) { } wrap.classList.toggle('offscreen', !x.isIntersecting); }); });
          vo.observe(wrap); cleanup.push(function () { vo.disconnect(); });
        }
      }
      tools.appendChild(h('button', { type: 'button', class: 'rd-mini', onclick: function () { var big = safeSvg(f.svg, f.alt || f.caption); if (!big) return; var bw = h('div', { class: 'rd-svg rd-svg-big', id: big.wid }); bw.appendChild(big.node); var body = h('div', null, [bw, cap ? h('p', { class: 'muted', html: inl(f.caption) }) : null]); VV2.modal({ title: '🔍 ' + (f.alt ? String(f.alt).slice(0, 60) : 'Diagram'), body: body, cls: 'rd-figmodal' }); } }, '⤢ Enlarge'));
      fe.appendChild(tools);
    } else if (f.type === 'scene3d') {
      var box = h('div', { class: 'rd-3d' });
      var loadB = h('button', { type: 'button', class: 'btn rd-3d-go' }, '🧊 Open the 3D model');
      box.appendChild(h('div', { class: 'rd-3d-ph' }, [h('span', { class: 'rd-3d-cube', 'aria-hidden': 'true' }, '🧊'), h('p', null, (f.caption ? VV2.plain(f.caption).slice(0, 120) : 'An interactive 3D model') + ' — drag to rotate, tap parts to learn.'), loadB]));
      var inst = null, loaded = false;
      var load = function () {
        if (loaded) return; loaded = true; box.innerHTML = '';
        VV2.need(['widgets-3d']).then(function () { if (!box.isConnected) return; inst = VV2.W.scene3d(box, { preset: String(f.preset || ''), prompt: '' }, {}); }).catch(function () { box.appendChild(h('p', { class: 'muted' }, 'The 3D model could not be loaded right now (offline?). The text above has everything you need.')); });
      };
      loadB.addEventListener('click', load);
      if (!VV2.lowPower && 'IntersectionObserver' in window) { var o3 = new IntersectionObserver(function (en) { if (en.some(function (x) { return x.isIntersecting; })) { o3.disconnect(); load(); } }, { rootMargin: '200px' }); o3.observe(box); cleanup.push(function () { o3.disconnect(); }); }
      cleanup.push(function () { if (inst && inst.destroy) inst.destroy(); });
      fe.appendChild(box);
    } else if (f.type === 'timeline' && Array.isArray(f.items)) {
      fe.appendChild(h('ol', { class: 'rd-tl' }, f.items.filter(Boolean).map(function (it, i) { return h('li', { style: { '--i': String(i) } }, [h('span', { class: 'rd-tl-w' }, String(it.when || '')), h('span', { class: 'rd-tl-x rd-say', html: inl(it.what || '') })]); })));
    } else if (f.type === 'table' && Array.isArray(f.rows)) {
      var t = h('table', null, [Array.isArray(f.head) ? h('thead', null, h('tr', null, f.head.map(function (c) { return h('th', { scope: 'col', html: inl(c) }); }))) : null, h('tbody', null, f.rows.filter(Array.isArray).map(function (r) { return h('tr', null, r.map(function (c, k) { return h(k === 0 ? 'th' : 'td', { scope: k === 0 ? 'row' : null, html: inl(c) }); })); }))]);
      fe.appendChild(h('div', { class: 'rd-tbl', tabindex: '0', role: 'region', 'aria-label': f.caption ? VV2.plain(f.caption).slice(0, 80) : 'Table' }, t));
    } else if (f.type === 'compare' && f.left && f.right) {
      var col = function (c, cls) { return h('div', { class: 'rd-cmp-c ' + cls }, [h('h4', { class: 'rd-say' }, c.title || ''), h('ul', null, (c.points || []).map(function (p) { return h('li', { class: 'rd-say', html: inl(p) }); }))]); };
      fe.appendChild(h('div', { class: 'rd-cmp' }, [col(f.left, 'l'), h('span', { class: 'rd-vs', 'aria-hidden': 'true' }, 'vs'), col(f.right, 'r')]));
    } else return null;
    if (cap) fe.appendChild(cap);
    return fe;
  }
  L.figure = function (f) { return figure(f, []); };

  function nextRead(e, list) {
    var i = -1; for (var k = 0; k < list.length; k++) if (list[k].id === e.id) { i = k; break; }
    var two = list.filter(function (x) { return x.course && x.course === e.course && x.id !== e.id && x.id.indexOf(e.id) === 0; })[0];
    if (two) return two;
    var mm = meta(e), same = list.filter(function (x) { return x.shelf === e.shelf && (e.shelf !== 'ncert' || (meta(x).cls === mm.cls && meta(x).subj === mm.subj)); }).sort(sortRead);
    var j = -1; for (k = 0; k < same.length; k++) if (same[k].id === e.id) j = k;
    for (k = j + 1; k < same.length; k++) { var r = rget(same[k].id); if (!r || !r.done) return same[k]; }
    return i >= 0 && list[i + 1] ? list[i + 1] : null;
  }
})();

/* VidyaVerse v2 — core: DOM helpers, markdown-lite, fuzzy search, i18n, Web Audio, speech, captions, toast, modal, adult gate, confetti, loader */
(function () {
  'use strict';
  var VV2 = window.VV2 = window.VV2 || {};
  VV2.version = '2.0.0';
  VV2._id = 0;

  /* ---------- environment ---------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  VV2.sysReduced = !!(mq && mq.matches);
  VV2.reduced = VV2.sysReduced;
  VV2.lowPower = (function () {
    try {
      var c = navigator.hardwareConcurrency || 4, m = navigator.deviceMemory || 4;
      var small = Math.min(screen.width || 800, screen.height || 800) < 480;
      var save = navigator.connection && navigator.connection.saveData;
      return !!save || c <= 2 || m <= 2 || (small && c <= 4);
    } catch (e) { return false; }
  })();
  VV2.dpr = function () { return Math.min(window.devicePixelRatio || 1, 2); };

  /* ---------- DOM ---------- */
  VV2.$ = function (s, r) { return (r || document).querySelector(s); };
  VV2.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  VV2.h = function (tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k]; if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') { for (var s in v) { if (s.slice(0, 2) === '--') el.style.setProperty(s, v[s]); else el.style[s] = v[s]; } }
      else el.setAttribute(k, v === true ? '' : v);
    }
    if (kids != null) {
      if (!Array.isArray(kids)) kids = [kids];
      kids.forEach(function (c) { if (c == null || c === false) return; el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c); });
    }
    return el;
  };
  VV2.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  VV2.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  VV2.shuffleNot = function (a) { if (a.length < 2) return a.slice(); var s, n = 0; do { s = VV2.shuffle(a); n++; } while (n < 8 && s.every(function (x, i) { return x === a[i]; })); return s; };
  VV2.rnd = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  VV2.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  VV2.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  VV2.fmtMin = function (m) { m = Math.round(m || 0); if (m < 60) return m + ' min'; var h = Math.floor(m / 60), r = m % 60; return h + ' h' + (r ? ' ' + r + ' min' : ''); };
  VV2.today = function () { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
  VV2.plain = function (s) { return String(s || '').replace(/\*\*|\*|`|^- /gm, '').replace(/\s+/g, ' ').trim(); };
  VV2.focusMain = function () { var m = document.getElementById('main'); if (m) { try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); } } };

  /* ---------- markdown-lite ---------- */
  function inline(s) {
    s = VV2.esc(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    return s;
  }
  VV2.inline = inline;
  VV2.md = function (text) {
    var blocks = String(text || '').replace(/\r/g, '').split(/\n\s*\n/), out = [];
    blocks.forEach(function (b) {
      var lines = b.split('\n'), buf = [], list = null, ltype = '';
      function flushP() { if (buf.length) { out.push('<p>' + buf.map(inline).join('<br>') + '</p>'); buf = []; } }
      function flushL() { if (list) { out.push('<' + ltype + '>' + list.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</' + ltype + '>'); list = null; } }
      lines.forEach(function (ln) {
        var m = /^\s*[-•]\s+(.*)$/.exec(ln), n = /^\s*\d+[.)]\s+(.*)$/.exec(ln);
        if (m || n) { flushP(); var t = m ? 'ul' : 'ol'; if (list && ltype !== t) flushL(); if (!list) { list = []; ltype = t; } list.push((m || n)[1]); }
        else if (ln.trim()) { flushL(); buf.push(ln.trim()); }
      });
      flushP(); flushL();
    });
    return out.join('');
  };

  /* ---------- fuzzy search ---------- */
  function norm(s) { return String(s || '').toLowerCase().normalize ? String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : String(s || '').toLowerCase(); }
  VV2.norm = norm;
  VV2.fuzzy = function (q, text) {
    q = norm(q).trim(); text = norm(text); if (!q) return 1; if (!text) return 0;
    var score = 0, words = q.split(/\s+/), all = true;
    words.forEach(function (w) {
      var i = text.indexOf(w);
      if (i >= 0) { score += 10 + (i === 0 || /\W/.test(text.charAt(i - 1)) ? 8 : 0) + w.length; return; }
      var ti = 0, hit = 0, gaps = 0, last = -1;
      for (var k = 0; k < w.length; k++) { var f = text.indexOf(w.charAt(k), ti); if (f < 0) { hit = -1; break; } if (last >= 0) gaps += f - last - 1; last = f; ti = f + 1; hit++; }
      if (hit > 0 && w.length >= 3 && gaps <= w.length * 2) score += Math.max(1, 6 - gaps / 2); else all = false;
    });
    return all ? score : 0;
  };

  /* ---------- i18n (navigation labels) ---------- */
  var DICT = {
    en: { home: 'Campus', schools: 'Schools', exams: 'Exam hall', labs: 'Labs', games: 'Games', progress: 'Rewards', parents: 'Grown-ups', settings: 'Settings', about: 'About', search: 'Search courses & lessons', searchShort: 'Search', profiles: 'Profiles', continue: 'Continue learning', start: 'Start', next: 'Next', back: 'Back', quickExit: 'Quick exit', sound: 'Sound', mode: 'Mode', lessons: 'lessons', minutes: 'min', level: 'Level', recommended: 'Recommended for you', allSchools: 'All 15 schools', streak: 'day streak', dailyGoal: 'Daily goal', openLab: 'Open lab', playGame: 'Play game', exam: 'Exam', placement: 'Placement test', explore: 'Explore freely anyway', guest: 'Guest', menu: 'Menu', close: 'Close', listen: 'Listen' },
    hi: { home: 'परिसर', schools: 'विद्यालय', exams: 'परीक्षा भवन', labs: 'प्रयोगशाला', games: 'खेल', progress: 'पुरस्कार', parents: 'अभिभावक', settings: 'सेटिंग्स', about: 'परिचय', search: 'पाठ्यक्रम और पाठ खोजें', searchShort: 'खोजें', profiles: 'प्रोफ़ाइल', continue: 'पढ़ाई जारी रखें', start: 'शुरू करें', next: 'आगे', back: 'पीछे', quickExit: 'तुरंत बाहर', sound: 'ध्वनि', mode: 'रूप', lessons: 'पाठ', minutes: 'मिनट', level: 'स्तर', recommended: 'आपके लिए सुझाव', allSchools: 'सभी 15 विद्यालय', streak: 'दिन लगातार', dailyGoal: 'आज का लक्ष्य', openLab: 'प्रयोगशाला खोलें', playGame: 'खेल खेलें', exam: 'परीक्षा', placement: 'स्तर परीक्षा', explore: 'फिर भी देखें', guest: 'अतिथि', menu: 'मेनू', close: 'बंद करें', listen: 'सुनें' }
  };
  VV2.lang = 'en';
  VV2.t = function (k) { var d = DICT[VV2.lang] || DICT.en; return d[k] || DICT.en[k] || k; };
  VV2.applyI18n = function (root) {
    VV2.$$('[data-i18n]', root || document).forEach(function (el) { el.textContent = VV2.t(el.getAttribute('data-i18n')); });
    VV2.$$('[data-i18n-label]', root || document).forEach(function (el) { el.setAttribute('aria-label', VV2.t(el.getAttribute('data-i18n-label'))); });
    VV2.$$('[data-i18n-ph]', root || document).forEach(function (el) { el.setAttribute('placeholder', VV2.t(el.getAttribute('data-i18n-ph'))); });
    document.documentElement.lang = VV2.lang === 'hi' ? 'hi' : 'en';
  };
  VV2.setLang = function (l) { VV2.lang = DICT[l] ? l : 'en'; VV2.applyI18n(); };

  /* ---------- Web Audio: per-mode sound sets ---------- */
  var AC = null, master = null, amb = null;
  var SETS = {
    tiny: { wave: 'sine', base: 587, vol: 0.2, dec: 1.4 },
    kids: { wave: 'triangle', base: 523, vol: 0.18, dec: 1 },
    teen: { wave: 'square', base: 330, vol: 0.07, dec: 0.7, lp: 1900 },
    campus: { wave: 'sine', base: 440, vol: 0.16, dec: 1.8, bell: true },
    pro: { wave: 'sine', base: 880, vol: 0.09, dec: 0.5 }
  };
  var SEQ = { tap: [[0, 0.06]], pop: [[12, 0.09]], tick: [[19, 0.035]], open: [[7, 0.08], [12, 0.12]], good: [[0, 0.1], [4, 0.1], [7, 0.18]], bad: [[-5, 0.14], [-6, 0.22]], win: [[0, 0.1], [4, 0.1], [7, 0.1], [12, 0.14], [16, 0.32]] };
  var CAP = { tap: 'tap', pop: 'pop', tick: 'tick', open: 'opening chime', good: 'happy chime — correct', bad: 'soft low tone — not quite', win: 'celebration fanfare', whoosh: 'whoosh' };
  VV2.audio = { on: false, ambientOn: false };
  function ctx() {
    if (AC) { if (AC.state === 'suspended') try { AC.resume(); } catch (e) { } return AC; }
    var C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
    try { AC = new C(); master = AC.createGain(); master.gain.value = 0.9; master.connect(AC.destination); } catch (e) { AC = null; }
    return AC;
  }
  function tone(f, t0, dur, set) {
    var o = AC.createOscillator(), g = AC.createGain(), node = g;
    o.type = set.wave; o.frequency.setValueAtTime(f, t0);
    if (set.lp) { var lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = set.lp; g.connect(lp); node = lp; }
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(set.vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * set.dec + 0.05);
    o.connect(g); node.connect(master); o.start(t0); o.stop(t0 + dur * set.dec + 0.08);
    if (set.bell) { var o2 = AC.createOscillator(), g2 = AC.createGain(); o2.type = 'sine'; o2.frequency.value = f * 2.76; g2.gain.setValueAtTime(set.vol * 0.25, t0); g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 2); o2.connect(g2); g2.connect(master); o2.start(t0); o2.stop(t0 + dur * 2 + 0.05); }
  }
  function whoosh(set) {
    var len = 0.35, buf = AC.createBuffer(1, Math.floor(AC.sampleRate * len), AC.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain(), t = AC.currentTime;
    s.buffer = buf; f.type = 'bandpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(3200, t + len);
    g.gain.value = set.vol * 0.9; s.connect(f); f.connect(g); g.connect(master); s.start(t);
  }
  VV2.sfx = function (name) {
    if (VV2.audio.on) {
      var a = ctx();
      if (a) try {
        var set = SETS[VV2.mode] || SETS.campus;
        if (name === 'whoosh') whoosh(set);
        else { var seq = SEQ[name] || SEQ.tap, t = a.currentTime + 0.01; seq.forEach(function (n) { tone(set.base * Math.pow(2, n[0] / 12), t, n[1], set); t += n[1] * 0.8; }); }
      } catch (e) { }
    }
    if (VV2.captionsOn && name !== 'tap' && name !== 'tick') VV2.caption('♪ ' + (CAP[name] || name));
  };
  VV2.enableSound = function (on) {
    VV2.audio.on = !!on; if (on) { ctx(); VV2.sfx('open'); }
    if (!on) VV2.ambient(false);
    VV2.$$('[data-sound-state]').forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.textContent = on ? '🔊' : '🔇'; });
    if (VV2.store && VV2.store.dev) { VV2.store.dev('sound', !!on); }
  };
  /* ambient: slow generative pad per mode */
  var CH = { tiny: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], kids: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], teen: [[0, 3, 7], [8, 12, 15], [3, 7, 10], [10, 14, 17]], campus: [[0, 7, 16], [5, 12, 21], [9, 16, 24], [7, 14, 23]], pro: [[0, 7, 14], [5, 12, 19], [3, 10, 17], [7, 14, 21]] };
  VV2.ambient = function (on) {
    VV2.audio.ambientOn = !!on;
    if (amb) { try { amb.stop(); } catch (e) { } amb = null; }
    if (!on || !VV2.audio.on) return;
    var a = ctx(); if (!a) return;
    var g = a.createGain(), lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; g.gain.value = 0.0001; g.connect(lp); lp.connect(master);
    g.gain.exponentialRampToValueAtTime(0.035, a.currentTime + 3);
    var i = 0, oscs = [], base = (VV2.mode === 'teen' || VV2.mode === 'pro') ? 110 : 130.81;
    function chord() {
      var c = (CH[VV2.mode] || CH.campus)[i++ % 4], t = a.currentTime;
      oscs.forEach(function (o) { try { o.g.gain.setTargetAtTime(0.0001, t, 1.2); o.o.stop(t + 5); } catch (e) { } });
      oscs = c.map(function (n) { var o = a.createOscillator(), og = a.createGain(); o.type = 'sine'; o.frequency.value = base * Math.pow(2, n / 12); o.detune.value = VV2.rnd(-6, 6); og.gain.value = 0.0001; og.gain.setTargetAtTime(0.33, t, 1.5); o.connect(og); og.connect(g); o.start(t); return { o: o, g: og }; });
    }
    chord(); var iv = setInterval(chord, 7000);
    amb = { stop: function () { clearInterval(iv); var t = a.currentTime; g.gain.setTargetAtTime(0.0001, t, 0.5); oscs.forEach(function (o) { try { o.o.stop(t + 2); } catch (e) { } }); } };
  };
  /* unlock audio on first gesture (iOS) */
  ['pointerdown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, function u() { if (VV2.audio.on) ctx(); document.removeEventListener(ev, u, true); }, true); });

  /* ---------- speech ---------- */
  VV2.canSpeak = 'speechSynthesis' in window;
  VV2.say = function (text, opts) {
    opts = opts || {}; text = VV2.plain(text); if (!text) return;
    if (VV2.captionsOn || opts.caption) VV2.caption('🗣️ ' + text);
    if (!VV2.canSpeak) return;
    try {
      var s = window.speechSynthesis; s.cancel();
      var u = new SpeechSynthesisUtterance(text.slice(0, 900));
      u.lang = VV2.lang === 'hi' ? 'hi-IN' : 'en-IN'; u.rate = VV2.mode === 'tiny' ? 0.82 : VV2.mode === 'kids' ? 0.92 : 1; u.pitch = VV2.mode === 'tiny' || VV2.mode === 'kids' ? 1.15 : 1;
      var vs = s.getVoices() || [], v = vs.filter(function (x) { return x.lang === u.lang; })[0] || vs.filter(function (x) { return /^en/.test(x.lang); })[0];
      if (v) u.voice = v;
      if (opts.onend) u.onend = opts.onend;
      s.speak(u);
    } catch (e) { }
  };
  VV2.hush = function () { try { if (VV2.canSpeak) window.speechSynthesis.cancel(); } catch (e) { } };
  if (VV2.canSpeak) { try { window.speechSynthesis.getVoices(); } catch (e) { } }

  /* ---------- captions, toast ---------- */
  VV2.captionsOn = false;
  VV2.caption = function (text) {
    var c = document.getElementById('captions'); if (!c) return;
    c.textContent = text; c.classList.add('show'); clearTimeout(VV2._capT);
    VV2._capT = setTimeout(function () { c.classList.remove('show'); }, Math.min(9000, 1800 + text.length * 55));
  };
  VV2.toast = function (msg, icon) {
    var t = document.getElementById('toasts'); if (!t) return;
    var el = VV2.h('div', { class: 'toast', role: 'status' }, [icon ? VV2.h('span', { class: 'ti', 'aria-hidden': 'true' }, icon) : null, VV2.h('span', null, msg)]);
    t.appendChild(el); requestAnimationFrame(function () { el.classList.add('in'); });
    setTimeout(function () { el.classList.remove('in'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500); }, 3200);
  };

  /* ---------- modal ---------- */
  VV2.modal = function (o) {
    o = o || {};
    var prev = document.activeElement, root = document.getElementById('modals');
    var box = VV2.h('div', { class: 'modal ' + (o.cls || ''), role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'mdl' + (++VV2._id) });
    var head = VV2.h('div', { class: 'm-head' }, [VV2.h('h2', { id: 'mdl' + VV2._id }, o.title || ''), o.noClose ? null : VV2.h('button', { type: 'button', class: 'icon-btn m-x', 'aria-label': VV2.t('close'), onclick: function () { close(false); } }, '✕')]);
    var body = VV2.h('div', { class: 'm-body' });
    if (typeof o.body === 'string') body.innerHTML = o.body; else if (o.body) body.appendChild(o.body);
    var acts = VV2.h('div', { class: 'm-acts' });
    (o.actions || []).forEach(function (a) { acts.appendChild(VV2.h('button', { type: 'button', class: 'btn ' + (a.primary ? 'primary' : 'ghost'), onclick: function () { if (a.onClick && a.onClick() === false) return; close(a.value != null ? a.value : true); } }, a.label)); });
    box.appendChild(head); box.appendChild(body); if (o.actions && o.actions.length) box.appendChild(acts);
    var wrap = VV2.h('div', { class: 'm-wrap' }, [VV2.h('div', { class: 'm-scrim', onclick: function () { if (!o.noClose) close(false); } }), box]);
    root.appendChild(wrap); document.body.classList.add('has-modal');
    requestAnimationFrame(function () { wrap.classList.add('in'); });
    var done = false;
    function key(e) {
      if (e.key === 'Escape' && !o.noClose) { e.stopPropagation(); close(false); }
      if (e.key === 'Tab') { var f = VV2.$$('button,input,select,textarea,a[href],[tabindex="0"]', box).filter(function (x) { return !x.disabled && x.offsetParent !== null; }); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); } }
    }
    wrap.addEventListener('keydown', key);
    function close(v) {
      if (done) return; done = true; wrap.classList.remove('in');
      setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); if (!root.children.length) document.body.classList.remove('has-modal'); }, 260);
      if (prev && prev.focus) try { prev.focus(); } catch (e) { }
      if (o.onClose) o.onClose(v);
    }
    setTimeout(function () { var f = VV2.$('input,button.primary,button', body) || VV2.$('button', box); if (f) f.focus(); }, 60);
    VV2.sfx('open');
    return { close: close, body: body, box: box };
  };

  /* ---------- adult gate (simple maths) ---------- */
  VV2.gate = function (reason) {
    return new Promise(function (res) {
      var a = VV2.rnd(6, 9), b = VV2.rnd(6, 9), c = VV2.rnd(11, 29), ans = a * b + c, tries = 0;
      var inp = VV2.h('input', { type: 'text', inputmode: 'numeric', autocomplete: 'off', class: 'gate-in', 'aria-label': 'Answer' });
      var msg = VV2.h('p', { class: 'gate-msg', 'aria-live': 'polite' });
      var body = VV2.h('div', { class: 'gate' }, [
        VV2.h('p', { class: 'gate-why' }, reason || 'This part is for grown-ups.'),
        VV2.h('p', { class: 'gate-q' }, [VV2.h('span', null, 'Grown-up check: what is '), VV2.h('b', null, a + ' × ' + b + ' + ' + c), '?']),
        inp, msg]);
      var ok = false;
      var m = VV2.modal({ title: '🔐 Ask a grown-up', body: body, cls: 'gate-modal', actions: [{ label: 'Not now', value: false }, { label: 'Confirm', primary: true, onClick: check }], onClose: function () { res(ok); } });
      function check() {
        if (parseInt(inp.value, 10) === ans) { ok = true; VV2.sfx('good'); return true; }
        tries++; VV2.sfx('bad'); inp.value = ''; inp.focus();
        msg.textContent = tries >= 3 ? 'Hmm — please ask a grown-up to help.' : 'Not quite. Try again.';
        if (tries >= 3) { setTimeout(function () { m.close(false); }, 900); }
        return false;
      }
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { if (check()) m.close(true); } });
    });
  };

  /* ---------- confetti ---------- */
  VV2.confetti = function (n) {
    if (VV2.reduced) return;
    n = n || (VV2.lowPower ? 50 : 130);
    var cv = VV2.h('canvas', { class: 'confetti', 'aria-hidden': 'true' }); document.body.appendChild(cv);
    var d = VV2.dpr(), W = innerWidth, H = innerHeight; cv.width = W * d; cv.height = H * d; var g = cv.getContext('2d'); g.scale(d, d);
    var cols = ['#ff5e8a', '#ffc94d', '#3ddc97', '#4f8cff', '#b074ff', '#ff8a3d'], P = [];
    var shapes = VV2.mode === 'tiny' || VV2.mode === 'kids' ? ['⭐', '🎈', '✨'] : null;
    for (var i = 0; i < n; i++) P.push({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.6, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 16 - 6, r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: VV2.pick(cols), e: shapes && Math.random() < 0.15 ? VV2.pick(shapes) : null });
    var t0 = performance.now();
    (function f(now) {
      var t = now - t0; g.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.vy += 0.42; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.globalAlpha = Math.max(0, 1 - t / 2600); if (p.e) { g.font = '20px serif'; g.fillText(p.e, -10, 8); } else { g.fillStyle = p.c; g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); } g.restore(); });
      if (t < 2600) requestAnimationFrame(f); else cv.remove();
    })(t0);
  };

  /* ---------- progress ring svg ---------- */
  VV2.ring = function (pct, size, color, label) {
    size = size || 56; var r = size / 2 - 5, c = 2 * Math.PI * r, p = VV2.clamp(pct || 0, 0, 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + VV2.esc(label || (Math.round(p) + '% complete')) + '"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-bg"/><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-fg" style="stroke:' + (color || 'var(--pri)') + ';stroke-dasharray:' + c.toFixed(1) + ';stroke-dashoffset:' + (c * (1 - p / 100)).toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle">' + Math.round(p) + '%</text></svg>';
  };

  /* ---------- avatar ---------- */
  var AV = {
    skin: ['#f9d7b5', '#eab78b', '#d39a6a', '#b07a4f', '#8a5a3b', '#5e3b26'],
    hair: ['short', 'long', 'curly', 'bun', 'spiky', 'none', 'braids'],
    hc: ['#2a1d14', '#5a3a22', '#a0652d', '#e0b04a', '#c8462b', '#6d6d7a', '#7b5cff'],
    eyes: ['round', 'happy', 'wink', 'calm'],
    mouth: ['smile', 'grin', 'o', 'smirk'],
    acc: ['none', 'glasses', 'bindi', 'cap', 'headphones', 'crown'],
    bg: ['#ffd36e', '#8fd3ff', '#b9a3ff', '#7ee2b8', '#ff9fb2', '#1f2a44', '#ffb36b'],
    shirt: ['#ff6b6b', '#4f8cff', '#3ddc97', '#ffc94d', '#b074ff', '#22313f']
  };
  VV2.AV = AV;
  VV2.randomAvatar = function () { var a = {}; for (var k in AV) a[k] = VV2.rnd(0, AV[k].length - 1); return a; };
  VV2.avatarSVG = function (av, size) {
    av = av || {}; size = size || 96; var id = 'avc' + (++VV2._id);
    function g(k) { var i = av[k] || 0; return AV[k][i] != null ? AV[k][i] : AV[k][0]; }
    var skin = g('skin'), hair = g('hair'), hc = g('hc'), eyes = g('eyes'), mouth = g('mouth'), acc = g('acc'), bg = g('bg'), sh = g('shirt'), ink = '#2a1d14';
    var s = '<svg class="avatar" viewBox="0 0 100 100" width="' + size + '" height="' + size + '" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="' + id + '"><circle cx="50" cy="50" r="48"/></clipPath></defs>';
    s += '<circle cx="50" cy="50" r="48" fill="' + bg + '"/><g clip-path="url(#' + id + ')"><path d="M18 100 Q20 74 50 72 Q80 74 82 100Z" fill="' + sh + '"/><rect x="44" y="62" width="12" height="12" rx="4" fill="' + skin + '"/>';
    if (hair === 'long' || hair === 'braids') s += '<path d="M24 46 Q22 16 50 16 Q78 16 76 46 L79 76 Q70 74 70 58 Q66 30 50 30 Q34 30 30 58 Q30 74 21 76Z" fill="' + hc + '"/>';
    if (hair === 'braids') s += '<circle cx="22" cy="80" r="5" fill="' + hc + '"/><circle cx="78" cy="80" r="5" fill="' + hc + '"/>';
    s += '<circle cx="50" cy="45" r="23" fill="' + skin + '"/><circle cx="27" cy="47" r="4" fill="' + skin + '"/><circle cx="73" cy="47" r="4" fill="' + skin + '"/>';
    if (hair === 'short' || hair === 'long' || hair === 'bun' || hair === 'braids') s += '<path d="M26 44 Q25 19 50 19 Q75 19 74 44 Q69 30 50 29 Q33 30 26 44Z" fill="' + hc + '"/>';
    if (hair === 'bun') s += '<circle cx="50" cy="15" r="9" fill="' + hc + '"/>';
    if (hair === 'curly') { for (var i = 0; i < 7; i++) { var a = Math.PI * (1.05 + i * 0.15); s += '<circle cx="' + (50 + Math.cos(a) * 21).toFixed(1) + '" cy="' + (42 + Math.sin(a) * 21).toFixed(1) + '" r="8" fill="' + hc + '"/>'; } }
    if (hair === 'spiky') s += '<path d="M27 40 L30 22 L37 30 L42 15 L48 28 L55 13 L60 28 L67 18 L69 31 L75 26 L73 42 Q62 30 50 30 Q36 30 27 40Z" fill="' + hc + '"/>';
    if (eyes === 'round') s += '<circle cx="41" cy="46" r="3.2" fill="' + ink + '"/><circle cx="59" cy="46" r="3.2" fill="' + ink + '"/><circle cx="42" cy="45" r="1" fill="#fff"/><circle cx="60" cy="45" r="1" fill="#fff"/>';
    else if (eyes === 'happy') s += '<path d="M37 47 Q41 42 45 47 M55 47 Q59 42 63 47" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    else if (eyes === 'wink') s += '<circle cx="41" cy="46" r="3.2" fill="' + ink + '"/><path d="M55 46 L63 46" stroke="' + ink + '" stroke-width="2.6" stroke-linecap="round"/>';
    else s += '<path d="M37 46 Q41 49 45 46 M55 46 Q59 49 63 46" stroke="' + ink + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="36" cy="54" r="3.5" fill="#ff7b9c" opacity=".45"/><circle cx="64" cy="54" r="3.5" fill="#ff7b9c" opacity=".45"/>';
    if (mouth === 'smile') s += '<path d="M42 56 Q50 63 58 56" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    else if (mouth === 'grin') s += '<path d="M41 55 Q50 66 59 55Z" fill="' + ink + '"/><path d="M44 57 Q50 60 56 57" stroke="#fff" stroke-width="2" fill="none"/>';
    else if (mouth === 'o') s += '<ellipse cx="50" cy="58" rx="3.5" ry="4.2" fill="' + ink + '"/>';
    else s += '<path d="M43 58 Q52 60 58 54" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    if (acc === 'glasses') s += '<g fill="rgba(255,255,255,.25)" stroke="#222" stroke-width="2"><circle cx="41" cy="46" r="7"/><circle cx="59" cy="46" r="7"/></g><path d="M48 46 L52 46" stroke="#222" stroke-width="2"/>';
    else if (acc === 'bindi') s += '<circle cx="50" cy="36" r="2.2" fill="#d6204e"/>';
    else if (acc === 'cap') s += '<path d="M25 36 Q27 17 50 17 Q73 17 75 36Z" fill="#e8453c"/><path d="M50 33 Q78 31 88 37 Q72 40 50 37Z" fill="#b8302a"/>';
    else if (acc === 'headphones') s += '<path d="M25 46 Q25 16 50 16 Q75 16 75 46" stroke="#333" stroke-width="5" fill="none"/><rect x="20" y="40" width="10" height="16" rx="4" fill="#7b5cff"/><rect x="70" y="40" width="10" height="16" rx="4" fill="#7b5cff"/>';
    else if (acc === 'crown') s += '<path d="M33 24 L37 10 L44 20 L50 7 L56 20 L63 10 L67 24Z" fill="#ffc94d" stroke="#d99a1a" stroke-width="1.5"/>';
    return s + '</g></svg>';
  };

  /* ---------- script loader (lazy modules) ---------- */
  var loaded = {};
  VV2.load = function (src) {
    if (loaded[src]) return loaded[src];
    loaded[src] = new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = function () { res(true); }; s.onerror = function () { delete loaded[src]; s.remove(); rej(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
    return loaded[src];
  };
  VV2.need = function (names) {
    if (!Array.isArray(names)) names = [names];
    return Promise.all(names.map(function (n) { return VV2.load('js/' + n + '.js?v=' + VV2.version); }));
  };
  VV2.fetchJSON = function (url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status + ' ' + url); return r.json(); });
  };
})();

/* VidyaVerse v2 — cinematic welcome (campus at dawn), onboarding, avatar builder, profile picker */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store;
  var W = VV2.Welcome = {};
  var ov = null, timers = [], o = null, step = 0, card = null, prevMode = null;
  var NAMES = ['Curious Koel', 'Brave Bulbul', 'Clever Cheetah', 'Wise Owl', 'Mighty Mynah', 'Gentle Gaur', 'Sunny Sparrow', 'Bold Baaz', 'Happy Hornbill', 'Quiet Kingfisher'];

  function later(fn, ms) { timers.push(setTimeout(fn, VV2.reduced ? 0 : ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  /* ---------------- the scene ---------------- */
  function sceneSVG() {
    var stars = '', i;
    for (i = 0; i < (VV2.lowPower ? 40 : 110); i++) stars += '<circle cx="' + VV2.rnd(0, 1600) + '" cy="' + VV2.rnd(0, 520) + '" r="' + (Math.random() * 1.8 + 0.4).toFixed(1) + '" style="animation-delay:' + (Math.random() * 4).toFixed(2) + 's"/>';
    var wins = '';
    for (i = 0; i < 8; i++) wins += '<rect class="win" x="' + (618 + i * 48) + '" y="590" width="22" height="66" rx="11" style="transition-delay:' + (0.2 + i * 0.12).toFixed(2) + 's"/>';
    wins += '<rect class="win" x="540" y="560" width="30" height="40" rx="15" style="transition-delay:1.3s"/><rect class="win" x="1030" y="560" width="30" height="40" rx="15" style="transition-delay:1.4s"/><circle class="win" cx="800" cy="482" r="15" style="transition-delay:1.6s"/>';
    function tree(x, s) { return '<g transform="translate(' + x + ' 700) scale(' + s + ')"><rect x="-8" y="-90" width="16" height="90" fill="#1a1230"/><circle cx="0" cy="-120" r="62" fill="#1d1536"/><circle cx="-54" cy="-96" r="44" fill="#1d1536"/><circle cx="52" cy="-100" r="46" fill="#1d1536"/><circle cx="-20" cy="-160" r="40" fill="#22193f"/><circle cx="30" cy="-150" r="36" fill="#22193f"/></g>'; }
    return '<svg class="wl-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<defs><linearGradient id="wlN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05071a"/><stop offset=".6" stop-color="#17143f"/><stop offset="1" stop-color="#3a2a63"/></linearGradient>' +
      '<linearGradient id="wlD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3a86"/><stop offset=".42" stop-color="#9a5a9c"/><stop offset=".7" stop-color="#ff9e6d"/><stop offset="1" stop-color="#ffd89a"/></linearGradient>' +
      '<radialGradient id="wlS"><stop offset="0" stop-color="#fffbe6"/><stop offset=".25" stop-color="#ffe29a" stop-opacity=".9"/><stop offset="1" stop-color="#ff9a5e" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="wlP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb47a" stop-opacity=".7"/><stop offset="1" stop-color="#2b2050"/></linearGradient>' +
      '<filter id="wlB"><feGaussianBlur stdDeviation="18"/></filter></defs>' +
      '<rect width="1600" height="900" fill="url(#wlN)"/><rect class="sky-d" width="1600" height="900" fill="url(#wlD)"/>' +
      '<g class="stars" fill="#fff">' + stars + '</g>' +
      '<g class="sun"><circle cx="800" cy="560" r="260" fill="url(#wlS)"/><circle cx="800" cy="560" r="64" fill="#fff3c9"/></g>' +
      '<g class="lyr l-far"><path d="M0 610 Q200 520 420 590 T860 560 T1280 580 T1600 540 V900 H0Z" fill="#6c4a86" class="hill-far"/></g>' +
      '<g class="lyr l-mid"><path d="M0 660 Q260 600 520 650 T1060 640 T1600 630 V900 H0Z" fill="#3f2d62"/></g>' +
      '<g class="lyr l-campus"><g fill="#24193f">' +
      '<rect x="520" y="520" width="70" height="180"/><path d="M510 522 L555 470 L600 522Z"/><rect x="1010" y="520" width="70" height="180"/><path d="M1000 522 L1045 470 L1090 522Z"/>' +
      '<path d="M590 562 L800 500 L1010 562Z"/><rect x="600" y="560" width="400" height="125"/><rect x="730" y="452" width="140" height="56"/>' +
      '<path d="M716 456 Q800 330 884 456Z"/><rect x="797" y="350" width="6" height="34"/><circle cx="800" cy="346" r="8"/><rect x="560" y="684" width="480" height="18"/><rect x="540" y="700" width="520" height="14"/></g>' +
      '<g fill="#ffd27a" class="wins">' + wins + '</g>' +
      '<path class="flag" d="M803 300 L803 352 M803 302 Q818 296 832 304 Q818 312 803 310" stroke="#ffb347" stroke-width="3" fill="#ff8a3d"/></g>' +
      '<g class="lyr l-near">' + tree(300, 1.1) + tree(1320, 1.25) + tree(150, 0.8) + tree(1480, 0.9) +
      '<path d="M0 712 Q400 690 800 714 T1600 706 V900 H0Z" fill="#170f2c"/>' +
      '<ellipse cx="800" cy="800" rx="420" ry="46" fill="url(#wlP)" opacity=".85"/><g class="lotus" fill="#ff9fc0"><path d="M690 795 q10 -22 20 0 q-10 8 -20 0Z"/><path d="M900 805 q12 -26 24 0 q-12 9 -24 0Z"/><path d="M790 815 q9 -20 18 0 q-9 7 -18 0Z"/></g></g>' +
      '<g class="birds" stroke="#22183f" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 0 q8 -8 16 0 q8 -8 16 0"/><path d="M40 20 q6 -6 12 0 q6 -6 12 0"/><path d="M-30 30 q7 -7 14 0 q7 -7 14 0"/></g>' +
      '<g class="mist" filter="url(#wlB)" fill="#fff"><ellipse cx="400" cy="690" rx="380" ry="40"/><ellipse cx="1200" cy="700" rx="420" ry="44"/></g></svg>';
  }
  var LOGO = '<svg class="wl-logo" viewBox="0 0 64 64" fill="none" aria-hidden="true"><ellipse class="d" cx="32" cy="34" rx="27" ry="9" stroke="#ffcf6e" stroke-width="1.6" transform="rotate(-18 32 34)"/><path class="d" d="M32 12 C39 21 39 34 32 44 C25 34 25 21 32 12Z" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path class="d" d="M32 44 C23 41 15 34 13 23 C22 24 29 31 32 44Z M32 44 C41 41 49 34 51 23 C42 24 35 31 32 44Z" stroke="#ffb3c7" stroke-width="2" stroke-linejoin="round"/><path class="d" d="M10 45 Q21 41 32 47 Q43 41 54 45" stroke="#ffcf6e" stroke-width="2.4" stroke-linecap="round"/><circle class="spark" cx="56" cy="24" r="2.2" fill="#ffcf6e"/></svg>';

  function overlay() {
    if (ov) return ov;
    var word = 'VidyaVerse'.split('').map(function (ch, i) { return '<span style="animation-delay:' + (0.6 + i * 0.07).toFixed(2) + 's">' + ch + '</span>'; }).join('');
    ov = h('div', { class: 'wl', id: 'welcome', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Welcome to VidyaVerse University' });
    ov.innerHTML = '<div class="wl-scene">' + sceneSVG() + '</div><div class="wl-stage"><div class="wl-intro">' + LOGO + '<h1 class="wl-word">' + word + '</h1><p class="wl-sub">University · free for every age</p><p class="wl-tag">From a baby’s first word to a PhD defence — fifteen schools, one lotus pond.</p><div class="wl-acts"></div></div><div class="wl-cardhost"></div></div><button type="button" class="wl-skip">Skip intro ⏭</button>';
    document.body.appendChild(ov); document.body.classList.add('has-modal');
    if (!VV2.reduced && !VV2.lowPower) ov.addEventListener('pointermove', parallax);
    return ov;
  }
  function parallax(e) {
    var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    [['.l-far', 8], ['.l-mid', 16], ['.l-campus', 22], ['.l-near', 34]].forEach(function (l) { var g = ov.querySelector(l[0]); if (g) g.style.transform = 'translate(' + (-x * l[1]).toFixed(1) + 'px,' + (-y * l[1] * 0.4).toFixed(1) + 'px)'; });
  }
  function close(cb) {
    clearTimers(); if (!ov) { if (cb) cb(); return; }
    var el = ov; ov = null; el.classList.add('out');
    setTimeout(function () { el.remove(); if (!document.getElementById('modals').children.length) document.body.classList.remove('has-modal'); if (cb) cb(); }, VV2.reduced ? 0 : 700);
  }
  function ready(el) {
    el.classList.add('logo', 'dawn', 'ready');
    var acts = el.querySelector('.wl-acts'); if (acts.children.length) return;
    var begin = h('button', { type: 'button', class: 'btn primary big' }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), '✨ Begin']);
    begin.addEventListener('click', function () { VV2.sfx('whoosh'); onboard({}); });
    acts.appendChild(begin);
    acts.appendChild(h('button', { type: 'button', class: 'btn ghost wl-ghost', onclick: guest }, '⚡ Quick guest start'));
    if (store.profiles().length) acts.appendChild(h('button', { type: 'button', class: 'btn ghost wl-ghost', onclick: function () { picker(); } }, '👥 Choose a profile'));
    el.querySelector('.wl-skip').hidden = true;
    setTimeout(function () { try { begin.focus(); } catch (e) { } }, 50);
  }
  function guest() {
    store.add({ name: 'Guest', guest: true, band: 'all', mode: 'campus', interests: [] });
    finish(true);
  }

  W.start = function (opts) {
    opts = opts || {}; clearTimers();
    var el = overlay(); el.querySelector('.wl-skip').onclick = function () { clearTimers(); ready(el); };
    if (opts.picker) { ready(el); picker(); return; }
    if (opts.again) { ready(el); onboard({ again: true }); return; }
    if (VV2.reduced) { ready(el); return; }
    later(function () { el.classList.add('logo'); VV2.sfx('open'); }, 120);
    later(function () { el.classList.add('dawn'); }, 1700);
    later(function () { ready(el); }, 3600);
    el.addEventListener('click', function sk(e) { if (e.target.closest('.wl-acts,.wl-card,.wl-skip')) return; if (!el.classList.contains('ready')) { clearTimers(); ready(el); } el.removeEventListener('click', sk); });
  };

  /* ---------------- profile picker ---------------- */
  function picker() {
    var host = ov.querySelector('.wl-cardhost'); ov.classList.add('carding'); host.innerHTML = '';
    var grid = h('div', { class: 'pick-grid' });
    store.profiles().forEach(function (p) {
      grid.appendChild(h('button', { type: 'button', class: 'pick', onclick: function () { store.setCur(p.id); VV2.sfx('good'); finish(false); } }, [h('span', { html: VV2.avatarSVG(p.avatar, 78) }), h('b', null, p.name), h('small', null, (VV2.MODES.filter(function (m) { return m.id === p.mode; })[0] || {}).name + ' mode')]));
    });
    grid.appendChild(h('button', { type: 'button', class: 'pick add', onclick: function () { onboard({}); } }, [h('span', { class: 'pa', 'aria-hidden': 'true' }, '＋'), h('b', null, 'New learner')]));
    grid.appendChild(h('button', { type: 'button', class: 'pick add', onclick: guest }, [h('span', { class: 'pa', 'aria-hidden': 'true' }, '⚡'), h('b', null, VV2.t('guest'))]));
    card = h('div', { class: 'wl-card' }, [h('h2', null, 'Who’s learning today?'), grid]);
    host.appendChild(card);
  }

  /* ---------------- onboarding ---------------- */
  var STEPS = ['who', 'age', 'interests', 'avatar', 'mode'];
  function onboard(opts) {
    o = { who: 'me', age: 12, noAge: false, stage: '', interests: null, avatar: VV2.randomAvatar(), name: '', mode: null, again: !!opts.again };
    prevMode = VV2.mode; step = 0; ov.classList.add('carding'); draw(1);
  }
  function band() { return VV2.bandOf(o.noAge ? null : o.age, o.noAge ? 'all' : o.stage); }
  function draw(dir) {
    var host = ov.querySelector('.wl-cardhost'); host.innerHTML = '';
    var dots = h('div', { class: 'wl-dots', 'aria-label': 'Step ' + (step + 1) + ' of ' + STEPS.length }, STEPS.map(function (s, i) { return h('i', { class: i < step ? 'done' : i === step ? 'now' : '' }); }));
    var body = h('div', { class: 'wl-body' });
    var back = h('button', { type: 'button', class: 'btn ghost', onclick: function () { if (step === 0) { if (o.again && store.cur()) { revert(); close(function () { VV2.go(''); }); } else { ov.classList.remove('carding'); host.innerHTML = ''; } } else { step--; VV2.sfx('tap'); draw(-1); } } }, '← ' + VV2.t('back'));
    var next = h('button', { type: 'button', class: 'btn primary' }, step === STEPS.length - 1 ? '🎓 Enter the campus' : VV2.t('next') + ' →');
    next.addEventListener('click', advance);
    var skip = h('button', { type: 'button', class: 'linklike wl-skipset', onclick: function () { finishSetup(); } }, 'Skip setup');
    card = h('div', { class: 'wl-card ' + (dir < 0 ? 'from-l' : 'from-r') }, [h('div', { class: 'wl-top' }, [dots, skip]), body, h('div', { class: 'wl-nav' }, [back, next])]);
    host.appendChild(card);
    ({ who: stWho, age: stAge, interests: stInt, avatar: stAv, mode: stMode })[STEPS[step]](body);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); advance(); } });
    setTimeout(function () { var f = body.querySelector('input,button'); if (f) try { f.focus({ preventScroll: true }); } catch (x) { } }, 80);
  }
  function advance() { if (step < STEPS.length - 1) { step++; VV2.sfx('whoosh'); draw(1); } else finishSetup(); }
  function revert() { if (prevMode) { VV2.mode = prevMode; VV2.applyProfile(); } }

  function stWho(b) {
    b.appendChild(h('h2', null, 'Who is learning?'));
    b.appendChild(h('p', { class: 'muted' }, 'This only shapes the look and suggestions. Nothing leaves this device.'));
    var g = h('div', { class: 'who-grid' });
    [['me', '🙋', 'Me', 'I am the learner'], ['child', '👶', 'My child', 'A little one on my lap or by my side'], ['student', '🧑‍🏫', 'My student', 'I teach or tutor someone'], ['explore', '🧭', 'Just exploring', 'Show me around first']].forEach(function (w) {
      var btn = h('button', { type: 'button', class: 'who' + (o.who === w[0] ? ' on' : ''), 'aria-pressed': o.who === w[0] ? 'true' : 'false', 'data-say': w[2] }, [h('span', { class: 'wi', 'aria-hidden': 'true' }, w[1]), h('b', null, w[2]), h('small', null, w[3])]);
      btn.addEventListener('click', function () { o.who = w[0]; if (w[0] === 'explore') o.noAge = true; if (w[0] === 'child' && o.age > 10) o.age = 4; VV2.sfx('pop'); setTimeout(advance, VV2.reduced ? 0 : 220); });
      g.appendChild(btn);
    });
    b.appendChild(g);
  }
  function ageEmoji(a) { return a < 2 ? '👶' : a < 4 ? '🧸' : a < 7 ? '🧒' : a < 13 ? '👦' : a < 18 ? '🧑‍🎓' : a < 30 ? '🧑' : a < 60 ? '🧑‍💼' : '🧓'; }
  function stAge(b) {
    var q = { me: 'How old are you?', child: 'How old is your child?', student: 'How old is your student?', explore: 'Roughly how old are you?' }[o.who];
    b.appendChild(h('h2', null, q));
    var big = h('div', { class: 'age-big', 'aria-live': 'polite' });
    var rng = h('input', { type: 'range', min: 0, max: 81, step: 1, value: o.age, 'aria-label': 'Age in years' });
    var minus = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Younger' }, '−'), plus = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Older' }, '+');
    var no = h('input', { type: 'checkbox', id: 'wlNoAge' }); no.checked = o.noAge;
    var stageBox = h('div', { class: 'stage-box' });
    var info = h('p', { class: 'band-info' });
    function upd() {
      big.innerHTML = ''; var a = +rng.value; o.age = a;
      big.appendChild(h('span', { class: 'ae', 'aria-hidden': 'true' }, o.noAge ? '🌈' : ageEmoji(a)));
      big.appendChild(h('b', null, o.noAge ? 'Any age' : (a >= 81 ? '80+' : a === 0 ? 'Under 1' : String(a))));
      rng.disabled = o.noAge; minus.disabled = plus.disabled = o.noAge;
      stageBox.hidden = o.noAge || a < 18; var bd = band(), md = VV2.modeOf(bd), mm = VV2.MODES.filter(function (m) { return m.id === md; })[0];
      info.textContent = 'Band: ' + VV2.bandLabel(bd) + ' → suggested look: ' + mm.icon + ' ' + mm.name;
    }
    rng.addEventListener('input', function () { VV2.sfx('tick'); upd(); });
    minus.addEventListener('click', function () { rng.value = Math.max(0, +rng.value - 1); upd(); });
    plus.addEventListener('click', function () { rng.value = Math.min(81, +rng.value + 1); upd(); });
    no.addEventListener('change', function () { o.noAge = no.checked; upd(); });
    var stg = h('div', { class: 'seg wrap-seg', role: 'group', 'aria-label': 'What best describes you?' });
    [['ug', '🎓 Studying (UG)'], ['pg', '📘 Postgrad'], ['phd', '🔬 PhD / research'], ['pro', '💼 Working'], ['', '🌿 Other / retired']].forEach(function (s) {
      var bt = h('button', { type: 'button', class: 'seg-b', 'aria-pressed': o.stage === s[0] ? 'true' : 'false' }, s[1]);
      bt.addEventListener('click', function () { o.stage = s[0]; VV2.$$('.seg-b', stg).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); bt.setAttribute('aria-pressed', 'true'); upd(); });
      stg.appendChild(bt);
    });
    stageBox.appendChild(h('p', { class: 'muted' }, 'What best describes you right now?')); stageBox.appendChild(stg);
    b.appendChild(big); b.appendChild(h('div', { class: 'age-row' }, [minus, rng, plus]));
    b.appendChild(h('label', { class: 'chk', for: 'wlNoAge' }, [no, h('span', null, 'I’d rather not say')]));
    b.appendChild(stageBox); b.appendChild(info); upd();
  }
  function stInt(b) {
    if (!o.interests) o.interests = VV2.suggestInterests(band()).slice();
    b.appendChild(h('h2', null, 'What sparks your curiosity?'));
    b.appendChild(h('p', { class: 'muted' }, 'Pick any of the 15 schools. You can wander into all of them anyway.'));
    var g = h('div', { class: 'int-grid' });
    VV2.SCHOOLS.forEach(function (s) {
      var on = o.interests.indexOf(s.id) >= 0;
      var bt = h('button', { type: 'button', class: 'int' + (on ? ' on' : ''), 'aria-pressed': on ? 'true' : 'false', style: { '--c': s.color }, 'data-say': s.name + ', ' + s.en }, [h('span', { 'aria-hidden': 'true' }, s.icon), h('b', null, s.name), h('small', null, s.en)]);
      bt.addEventListener('click', function () { var i = o.interests.indexOf(s.id); if (i >= 0) o.interests.splice(i, 1); else o.interests.push(s.id); var n = i < 0; bt.classList.toggle('on', n); bt.setAttribute('aria-pressed', n ? 'true' : 'false'); VV2.sfx(n ? 'pop' : 'tap'); });
      g.appendChild(bt);
    });
    b.appendChild(g);
  }
  var AVROWS = [['skin', 'Skin'], ['hair', 'Hair'], ['hc', 'Hair colour'], ['eyes', 'Eyes'], ['mouth', 'Smile'], ['acc', 'Extra'], ['bg', 'Background'], ['shirt', 'Shirt']];
  function stAv(b) {
    b.appendChild(h('h2', null, o.who === 'child' ? 'Make your little one’s avatar' : 'Make your avatar'));
    var prev = h('div', { class: 'av-prev', html: VV2.avatarSVG(o.avatar, 128) });
    if (!o.name) o.name = o.who === 'child' ? 'Little Star' : VV2.pick(NAMES);
    var nm = h('input', { type: 'text', value: o.name, maxlength: 24, 'aria-label': 'Name or nickname', placeholder: 'Name or nickname' });
    nm.addEventListener('input', function () { o.name = nm.value; });
    var rand = h('button', { type: 'button', class: 'btn small', onclick: function () { o.avatar = VV2.randomAvatar(); prev.innerHTML = VV2.avatarSVG(o.avatar, 128); prev.classList.remove('boing'); void prev.offsetWidth; prev.classList.add('boing'); VV2.sfx('pop'); rows(); } }, '🎲 Surprise me');
    b.appendChild(h('div', { class: 'av-top' }, [prev, h('div', { class: 'av-name' }, [h('label', null, [h('span', { class: 'muted' }, 'Name or nickname (shown only here)'), nm]), rand])]));
    var box = h('div', { class: 'av-rows' }); b.appendChild(box);
    function rows() {
      box.innerHTML = '';
      AVROWS.forEach(function (r) {
        var opts = VV2.AV[r[0]], row = h('div', { class: 'av-row', role: 'group', 'aria-label': r[1] }, h('span', { class: 'av-l' }, r[1]));
        opts.forEach(function (v, i) {
          var isCol = /^#/.test(v), sel = (o.avatar[r[0]] || 0) === i;
          var bt = h('button', { type: 'button', class: 'av-opt' + (isCol ? ' col' : '') + (sel ? ' on' : ''), 'aria-pressed': sel ? 'true' : 'false', 'aria-label': r[1] + ' ' + (isCol ? 'colour ' + (i + 1) : v), style: isCol ? { background: v } : null }, isCol ? '' : v);
          bt.addEventListener('click', function () { o.avatar[r[0]] = i; prev.innerHTML = VV2.avatarSVG(o.avatar, 128); VV2.sfx('tick'); VV2.$$('.av-opt', row).forEach(function (x, j) { x.classList.toggle('on', j === i); x.setAttribute('aria-pressed', j === i ? 'true' : 'false'); }); });
          row.appendChild(bt);
        });
        box.appendChild(row);
      });
    }
    rows();
  }
  function stMode(b) {
    var sug = VV2.modeOf(band()); if (!o.mode) o.mode = sug;
    b.appendChild(h('h2', null, 'Pick your campus look'));
    b.appendChild(h('p', { class: 'muted' }, 'Each look has its own colours, type, motion and sounds. Change it any time with 🎨.'));
    var g = h('div', { class: 'mode-pick' });
    VV2.MODES.forEach(function (m) {
      var bt = h('button', { type: 'button', class: 'mode-card mc-' + m.id + (o.mode === m.id ? ' on' : ''), 'aria-pressed': o.mode === m.id ? 'true' : 'false' }, [h('span', { class: 'mc-i', 'aria-hidden': 'true' }, m.icon), h('b', null, m.name + (m.id === sug ? ' · suggested' : '')), h('small', null, m.desc)]);
      bt.addEventListener('click', function () { o.mode = m.id; preview(m.id); VV2.$$('.mode-card', g).forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); }); bt.classList.add('on'); bt.setAttribute('aria-pressed', 'true'); VV2.sfx('pop'); });
      g.appendChild(bt);
    });
    b.appendChild(g);
  }
  function preview(m) { var r = document.documentElement; ['tiny', 'kids', 'teen', 'campus', 'pro'].forEach(function (x) { r.classList.toggle('m-' + x, x === m); }); VV2.mode = m; }

  function finishSetup() {
    var bd = band(), md = o.mode || VV2.modeOf(bd);
    store.add({ name: (o.name || '').trim() || (o.who === 'child' ? 'Little Star' : 'Learner'), who: o.who, age: o.noAge ? null : Math.min(o.age, 81), band: bd, mode: md, interests: o.interests || VV2.suggestInterests(bd), avatar: o.avatar });
    finish(true);
  }
  function finish(isNew) {
    VV2.applyProfile();
    close(function () {
      VV2.go('');
      if (isNew) { VV2.sfx('win'); VV2.confetti(); var p = store.cur(); setTimeout(function () { VV2.toast('Welcome to campus, ' + p.name + '!', '🎓'); if (VV2.mode === 'tiny') VV2.say('Welcome, ' + p.name + '! Tap the big button to turn sound on.'); }, 400); }
    });
  }
})();

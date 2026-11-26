/* VidyaVerse v2 — app shell: router, modes & accessibility, chrome, time tracking, quick exit, tiny read-aloud, easter egg, boot */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store;
  var main, leaveFns = [], curRoute = { name: '', args: [] }, gateUntil = 0;

  /* ---------------- modes & accessibility ---------------- */
  VV2.mode = 'campus';
  VV2.applyProfile = function () {
    var p = store.cur(), root = document.documentElement;
    var m = p ? p.mode : 'campus', a = (p && p.a11y) || {};
    VV2.mode = m;
    ['tiny', 'kids', 'teen', 'campus', 'pro'].forEach(function (x) { root.classList.toggle('m-' + x, x === m); });
    root.classList.toggle('a-big', !!a.big); root.classList.toggle('a-contrast', !!a.contrast); root.classList.toggle('a-dys', !!a.dys);
    VV2.reduced = VV2.sysReduced || !!a.rm; root.classList.toggle('rm', VV2.reduced); root.classList.toggle('lp', VV2.lowPower);
    VV2.captionsOn = !!store.dev('captions') || m === 'tiny';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', { tiny: '#fff4e3', kids: '#5b8cff', teen: '#120d26', campus: '#1d3b45', pro: '#0b1016' }[m] || '#1d3b45');
    VV2.refreshChrome();
    if (VV2.audio.ambientOn) VV2.ambient(true);
  };
  VV2.setMode = function (m) {
    var go = function () { store.update(function (p) { p.mode = m; }); VV2.applyProfile(); VV2.sfx('whoosh'); VV2.toast('Switched to ' + m + ' mode', (VV2.MODES.filter(function (x) { return x.id === m; })[0] || {}).icon); render(); };
    if (VV2.mode === 'tiny' && m !== 'tiny') VV2.adult('Changing the look is for grown-ups.').then(function (ok) { if (ok) go(); }); else go();
  };
  /* adult gate, remembered for 10 minutes */
  VV2.adult = function (why) {
    if (Date.now() < gateUntil) return Promise.resolve(true);
    return VV2.gate(why).then(function (ok) { if (ok) gateUntil = Date.now() + 600000; return ok; });
  };

  VV2.refreshChrome = function () {
    var p = store.cur(), chip = document.getElementById('profileChip');
    if (chip) {
      chip.innerHTML = '';
      if (p) {
        var L = store.level(p.xp);
        chip.appendChild(h('span', { class: 'chip-av', html: VV2.avatarSVG(p.avatar, 34) }));
        chip.appendChild(h('span', { class: 'chip-txt' }, [h('b', null, p.name), h('small', null, 'Lv ' + L.lvl + ' · 🔥' + (p.streak.n || 0))]));
        chip.setAttribute('aria-label', p.name + ', level ' + L.lvl + '. Open your menu');
      } else chip.appendChild(h('span', null, '👤'));
    }
    VV2.$$('[data-sound-state]').forEach(function (b) { b.setAttribute('aria-pressed', VV2.audio.on ? 'true' : 'false'); b.textContent = VV2.audio.on ? '🔊' : '🔇'; });
    var mb = document.getElementById('modeBtn'); if (mb) { var mm = VV2.MODES.filter(function (x) { return x.id === VV2.mode; })[0]; mb.textContent = mm ? mm.icon : '🎨'; }
  };

  /* ---------------- router ---------------- */
  var ROUTES = {
    home: [[], function (a) { return VV2.Campus.home(main); }],
    school: [[], function (a) { return VV2.Campus.school(main, a[0]); }],
    course: [[], function (a) { return VV2.Campus.course(main, a[0]); }],
    search: [[], function (a, q) { return VV2.Campus.search(main, q.q || ''); }],
    lesson: [['player', 'widgets-a', 'widgets-b', 'widgets-code', 'widgets-ops', 'widgets-3d', 'widgets-interview'], function (a) { return VV2.Player.render(main, a[0]); }, ['ops', 'scene3d', 'interview']],
    code: [['widgets-code', 'codestudio'], function (a) { return VV2.Studio.render(main, a[0]); }],
    exam: [['exam'], function (a, q) { return VV2.Exam.course(main, a[0], q); }],
    exams: [['exam'], function () { return VV2.Exam.hall(main); }],
    ladder: [['exam'], function (a) { return VV2.Exam.ladder(main, a[0]); }],
    mock: [['exam'], function (a) { return VV2.Exam.mock(main, a[0]); }],
    placement: [['exam'], function (a, q) { return VV2.Exam.placement(main, a[0], +a[1] || 0, q.course || ''); }],
    labs: [['hub'], function () { return VV2.Hub.list(main, 'labs'); }],
    handson: [['labhub'], function (a, q) { return VV2.LabHub.render(main, q); }, ['ops']],
    roadmaps: [['roadmaps'], function (a) { return VV2.Roadmaps.render(main, a[0]); }, ['ops']],
    programmes: [['programmes'], function (a, q) { return VV2.Programmes.render(main, a[0], q); }, ['ops']],
    unaskable: [['unaskable'], function () { return VV2.Unaskable.render(main); }],
    more: [[], function () { history.replaceState(null, '', '#/'); setTimeout(function () { VV2.moreMenu(); }, 0); return VV2.Campus.home(main); }],
    games: [['hub'], function () { return VV2.Hub.list(main, 'games'); }],
    lab: [['hub'], function (a) { return VV2.Hub.route(main, 'labs', a[0]); }],
    game: [['hub'], function (a) { return VV2.Hub.route(main, 'games', a[0]); }],
    progress: [['progress'], function () { return VV2.Progress.rewards(main); }],
    parents: [['progress'], function () { return VV2.Progress.parents(main); }],
    settings: [['progress'], function () { return VV2.Progress.settings(main); }],
    profiles: [['progress'], function () { return VV2.Progress.profiles(main); }],
    about: [['pages'], function () { return VV2.Pages.about(main); }],
    calm: [['pages'], function () { return VV2.Pages.calm(main); }],
    welcome: [['welcome'], function () { return VV2.Welcome.start({ again: true }); }],
    notfound: [['pages'], function () { return VV2.Pages.notFound(main); }]
  };
  var GATED = { settings: 1, parents: 1, profiles: 1, about: 1, welcome: 1, unaskable: 1 };
  var NAV = { home: 'home', school: 'home', course: 'home', search: 'home', lesson: 'home', exam: 'exams', exams: 'exams', ladder: 'exams', mock: 'exams', placement: 'exams', labs: 'labs', lab: 'labs', handson: 'labs', roadmaps: 'roadmaps', programmes: 'programmes', unaskable: 'unaskable', code: 'code', games: 'games', game: 'games', progress: 'progress', parents: 'parents', settings: 'progress', profiles: 'progress', about: 'about' };

  function parse() {
    var raw = (location.hash || '').replace(/^#\/?/, ''), qi = raw.indexOf('?'), q = {};
    var path = qi >= 0 ? raw.slice(0, qi) : raw;
    if (qi >= 0) raw.slice(qi + 1).split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); });
    var parts = path.split('/').filter(Boolean).map(function (x) { try { return decodeURIComponent(x); } catch (e) { return x; } });
    return { name: parts[0] || 'home', args: parts.slice(1), q: q };
  }
  VV2.go = function (path, replace) {
    var hsh = '#/' + String(path || '').replace(/^#?\/?/, '');
    if (replace) { history.replaceState(null, '', hsh); render(); }
    else if (location.hash === hsh) render(); else location.hash = hsh;
  };
  VV2.onLeave = function (fn) { leaveFns.push(fn); };
  VV2.route = function () { return curRoute; };
  VV2.setTitle = function (t) { document.title = (t ? t + ' · ' : '') + 'VidyaVerse University'; };
  VV2.loading = function (el, msg) {
    el.innerHTML = ''; el.appendChild(h('div', { class: 'loading', role: 'status' }, [h('div', { class: 'load-orb', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i')]), h('p', null, msg || VV2.pick(['Sharpening pencils…', 'Dusting the library…', 'Waking up the professor…', 'Brewing campus chai…', 'Counting stars for you…']))]));
  };
  VV2.errorView = function (el, title, detail, retry) {
    el.innerHTML = '';
    var box = h('section', { class: 'wrap empty-state', role: 'alert' }, [
      h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🦉'), h('h1', null, title || 'This page wandered off'),
      h('p', null, detail || 'We could not load this right now. If you are offline, anything you opened before still works.'),
      h('div', { class: 'row' }, [retry ? h('button', { type: 'button', class: 'btn primary', onclick: retry }, '↻ Try again') : null, h('a', { class: 'btn ghost', href: '#/' }, '🏛️ Back to campus')])]);
    el.appendChild(box);
  };

  VV2.navCount = 0;
  function render() {
    var r = parse(); VV2.navCount++;
    leaveFns.splice(0).forEach(function (f) { try { f(); } catch (e) { } });
    VV2.hush(); VV2.untrack(); VV2.sensitive(false);
    if (VV2.Hub && VV2.Hub.close && r.name !== 'lab' && r.name !== 'game') VV2.Hub.close(true);
    if (!store.cur() && r.name !== 'welcome') { boot(); return; }
    var def = ROUTES[r.name] || ROUTES.notfound;
    var gateNeeded = GATED[r.name] && (VV2.mode === 'tiny' || (r.name === 'parents' && store.isMinor()));
    curRoute = r;
    VV2.$$('[data-nav]').forEach(function (a) { if (a.getAttribute('data-nav') === (NAV[r.name] || '')) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var run = function () {
      main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter');
      window.scrollTo(0, 0);
      return Promise.all([VV2.need(def[0]), VV2.needCss ? VV2.needCss(def[2] || []) : null]).then(function () { return def[1](r.args, r.q); }).then(function () { VV2.applyI18n(main); }).catch(function (e) {
        VV2.errorView(main, 'Something tripped on the stairs', (e && e.message ? e.message + '. ' : '') + 'Please check your connection and try again.', render);
      });
    };
    if (gateNeeded) {
      VV2.loading(main, 'Waiting for a grown-up…');
      VV2.adult(r.name === 'parents' ? 'The grown-ups dashboard is for parents and teachers.' : 'This part is for grown-ups.').then(function (ok) { if (ok) run(); else { history.replaceState(null, '', '#/'); render(); } });
    } else run();
  }

  /* ---------------- time tracking ---------------- */
  var tr = null;
  VV2.track = function (faculty) { VV2.untrack(); tr = { f: faculty, t: Date.now(), iv: setInterval(flush, 15000) }; };
  function flush() { if (!tr) return; var now = Date.now(); if (!document.hidden) store.addTime(Math.min(now - tr.t, 60000), tr.f); tr.t = now; }
  VV2.untrack = function () { if (tr) { flush(); clearInterval(tr.iv); tr = null; } };
  document.addEventListener('visibilitychange', function () { if (tr) { if (document.hidden) flush(); else tr.t = Date.now(); } });

  /* ---------------- sensitive quick exit ---------------- */
  var sensOn = false;
  VV2.sensitive = function (on) { sensOn = !!on; var b = document.getElementById('quickExit'); if (b) b.hidden = !on; document.body.classList.toggle('sens', !!on); };
  VV2.quickExit = function () {
    VV2.hush(); VV2.ambient(false);
    var m = document.getElementById('modals'); if (m) m.innerHTML = ''; document.body.classList.remove('has-modal');
    if (VV2.Hub && VV2.Hub.close) VV2.Hub.close(true);
    history.replaceState(null, '', '#/calm'); render();
  };

  /* ---------------- header menus ---------------- */
  VV2.meMenu = function () {
    var p = store.cur(); if (!p) return;
    var L = store.level(p.xp);
    var items = [['#/progress', '🏅', 'progress', 'XP, badges, streaks'], ['#/parents', '👪', 'parents', 'Per-profile progress & safety'], ['#/settings', '⚙️', 'settings', 'Sound, text, language, data'], ['#/profiles', '🧑‍🤝‍🧑', 'profiles', 'Switch or add a learner'], ['#/programmes', '🎓', 'programmes', 'Degrees, classes & certificates'], ['#/unaskable', '💬', 'askAnything', 'Too awkward to ask? Privately'], ['#/roadmaps', '🗺️', 'roadmaps', 'Zero to job-ready paths'], ['#/handson', '🧪', 'handson', 'Every hands-on lab'], ['#/about', '🪷', 'about', 'What VidyaVerse is']];
    var body = h('div', { class: 'me-menu' }, [
      h('div', { class: 'me-top' }, [h('span', { html: VV2.avatarSVG(p.avatar, 64) }), h('div', null, [h('b', null, p.name), h('small', null, 'Level ' + L.lvl + ' · ' + L.title + ' · ' + p.xp + ' XP'), h('div', { class: 'xpbar', 'aria-hidden': 'true' }, h('i', { style: { width: L.pct + '%' } }))])]),
      h('div', { class: 'me-grid' }, items.map(function (it) { return h('a', { href: it[0], class: 'me-item', onclick: function () { m.close(); } }, [h('span', { class: 'mi-i', 'aria-hidden': 'true' }, it[1]), h('b', { 'data-i18n': it[2] }, VV2.t(it[2])), h('small', null, it[3])]); })),
      h('div', { class: 'me-row' }, [h('span', null, 'Language'), h('div', { class: 'seg' }, [['en', 'English'], ['hi', 'हिन्दी']].map(function (l) { return h('button', { type: 'button', class: 'seg-b', 'aria-pressed': VV2.lang === l[0] ? 'true' : 'false', onclick: function () { VV2.setLang(l[0]); store.dev('lang', l[0]); m.close(); render(); } }, l[1]); }))])
    ]);
    VV2.applyI18n(body);
    var m = VV2.modal({ title: 'Your corner', body: body, cls: 'sheet' });
  };
  /* "More" sheet: every destination, so nothing is lost when the top nav or the tab bar is narrow */
  VV2.moreMenu = function () {
    var items = [['#/', '🏛️', 'home', 'Every school, the campus map'], ['#/programmes', '🎓', 'programmes', 'Degrees, classes & certificates'], ['#/unaskable', '💬', 'askAnything', 'Too awkward to ask? Privately'],
      ['#/roadmaps', '🗺️', 'roadmaps', 'Zero to job-ready paths'], ['#/handson', '🧪', 'labs', 'Every hands-on lab'], ['#/exams', '📝', 'exams', 'Exams, ladders, mock tests'], ['#/code', '💻', 'Code', 'Code Studio, 12 languages'],
      ['#/games', '🎮', 'games', 'Homework in disguise'], ['#/search', '🔍', 'searchShort', 'Every course and lesson'], ['#/progress', '🏅', 'progress', 'XP, badges, streaks'], ['#/parents', '👪', 'parents', 'Progress & safety'],
      ['#/settings', '⚙️', 'settings', 'Sound, text, language, data'], ['#/about', '🪷', 'about', 'What VidyaVerse is']];
    var body = h('div', { class: 'me-menu' }, h('div', { class: 'me-grid' }, items.map(function (it) { return h('a', { href: it[0], class: 'me-item', onclick: function () { m.close(); } }, [h('span', { class: 'mi-i', 'aria-hidden': 'true' }, it[1]), h('b', { 'data-i18n': it[2] }, VV2.t(it[2])), h('small', null, it[3])]); })));
    VV2.applyI18n(body);
    var m = VV2.modal({ title: '☰ ' + VV2.t('more'), body: body, cls: 'sheet' });
  };
  VV2.modePicker = function () {
    var body = h('div', { class: 'mode-pick' }, VV2.MODES.map(function (md) {
      return h('button', { type: 'button', class: 'mode-card mc-' + md.id + (md.id === VV2.mode ? ' on' : ''), 'aria-pressed': md.id === VV2.mode ? 'true' : 'false', onclick: function () { m.close(); if (md.id !== VV2.mode) VV2.setMode(md.id); } },
        [h('span', { class: 'mc-i', 'aria-hidden': 'true' }, md.icon), h('b', null, md.name), h('small', null, md.desc)]);
    }));
    var m = VV2.modal({ title: '🎨 Choose your campus look', body: body, cls: 'sheet' });
  };

  /* ---------------- boot ---------------- */
  function hideSplash() { var s = document.getElementById('splash'); if (s && !s.classList.contains('out')) { s.classList.add('out'); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 900); } }
  function boot() {
    var p = store.cur();
    if (!p) {
      VV2.loading(main, 'Opening the campus gates…');
      VV2.need('welcome').then(function () { hideSplash(); VV2.Welcome.start({ picker: store.profiles().length > 0 }); }).catch(function () { hideSplash(); VV2.errorView(main, 'The welcome gate is stuck', 'Please reload the page.', function () { location.reload(); }); });
      return;
    }
    VV2.applyProfile(); render(); setTimeout(hideSplash, 350);
  }
  VV2.boot = boot;
  VV2.render = render;

  function init() {
    main = document.getElementById('main');
    VV2.setLang(store.dev('lang') || 'en');
    VV2.audio.on = !!store.dev('sound');
    if (store.dev('ambient') && VV2.audio.on) { var amb1 = function () { document.removeEventListener('pointerdown', amb1, true); if (!VV2.audio.ambientOn) VV2.ambient(true); }; document.addEventListener('pointerdown', amb1, true); }
    VV2.applyProfile();
    document.getElementById('soundBtn').addEventListener('click', function () { VV2.enableSound(!VV2.audio.on); });
    document.getElementById('modeBtn').addEventListener('click', function () { if (VV2.mode === 'tiny') VV2.adult('Changing the look is for grown-ups.').then(function (ok) { if (ok) VV2.modePicker(); }); else VV2.modePicker(); });
    document.getElementById('profileChip').addEventListener('click', function () { if (VV2.mode === 'tiny') VV2.adult('The menu is for grown-ups.').then(function (ok) { if (ok) VV2.meMenu(); }); else VV2.meMenu(); });
    document.getElementById('searchBtn').addEventListener('click', function () { VV2.go('search'); });
    VV2.$$('[data-more]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); if (VV2.mode === 'tiny') VV2.adult('The menu is for grown-ups.').then(function (ok) { if (ok) VV2.moreMenu(); }); else VV2.moreMenu(); }); });
    document.getElementById('quickExit').addEventListener('click', VV2.quickExit);
    window.addEventListener('hashchange', render);
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === 'Escape' && sensOn && !document.body.classList.contains('has-modal')) { e.preventDefault(); VV2.quickExit(); return; }
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); if (curRoute.name !== 'search' && curRoute.name !== 'home') VV2.go('search'); else { var s = document.getElementById('searchInput'); if (s) s.focus(); } }
      egg(e.key);
    });
    /* tiny mode: read everything aloud on tap */
    document.addEventListener('click', function (e) {
      if (VV2.mode !== 'tiny') return;
      var t = e.target.closest && e.target.closest('[data-say],button,a,.card,[role="button"]'); if (!t || t.hasAttribute('data-nosay')) return;
      var txt = t.getAttribute('data-say') || t.getAttribute('aria-label') || t.textContent; if (txt) VV2.say(txt);
    }, true);
    /* brand logo: tap 7 times for the egg */
    var taps = 0, tt = 0; document.getElementById('brand').addEventListener('click', function () { clearTimeout(tt); taps++; tt = setTimeout(function () { taps = 0; }, 1500); if (taps >= 7) { taps = 0; lotus(); } });
    window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); VV2.installEvt = e; });
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) { window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); }); }
    VV2.data.index().catch(function () { });
    boot();
  }

  /* ---------------- easter egg: type "vidya" or the Konami code ---------------- */
  var keys = [], KON = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  function egg(k) {
    keys.push(k); if (keys.length > 10) keys.shift();
    var s = keys.join('').toLowerCase();
    if (/vidya$/.test(s) || keys.join(',') === KON.join(',')) { keys = []; lotus(); }
  }
  function lotus() {
    VV2.sfx('win'); store.badge('secret');
    VV2.toast('You found the secret lotus. सा विद्या या विमुक्तये — knowledge is that which frees.', '🪷');
    if (VV2.reduced) return;
    for (var i = 0; i < (VV2.lowPower ? 14 : 32); i++) { (function (i) { var e = h('span', { class: 'lotus-drop', 'aria-hidden': 'true', style: { left: Math.random() * 100 + 'vw', animationDelay: (Math.random() * 1.6) + 's', fontSize: (18 + Math.random() * 26) + 'px' } }, i % 5 ? '🪷' : '✨'); document.body.appendChild(e); setTimeout(function () { e.remove(); }, 5200); })(i); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

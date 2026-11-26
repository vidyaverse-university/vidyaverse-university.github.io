/* VidyaVerse v2 — campus: home, search & filters, school pages, course pages, access (placement + sensitive) */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var C = VV2.Campus = {};
  var JOKES = ['Why did the student eat his homework? The teacher said it was a piece of cake.', 'Parallel lines have so much in common. Shame they will never meet.', 'I would tell you a chemistry joke, but I know I would not get a reaction.', 'The library is the tallest building on campus — it has the most stories.', 'Our Wi-Fi password is "learnsomethingnew". Case sensitive, curiosity insensitive.', 'A comma walks into a bar, pauses, and orders a semicolon; nobody understands it.', 'Time flies like an arrow. Fruit flies like a banana. Grammar flies like both.'];

  /* ---------------- shared bits ---------------- */
  function greet(p) { var hr = new Date().getHours(), g = hr < 5 ? 'Still up' : hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : hr < 21 ? 'Good evening' : 'Good night'; return VV2.lang === 'hi' ? 'नमस्ते, ' + p.name : g + ', ' + p.name; }
  C.levelPill = function (lv) { var c = lv <= 2 ? '#2f9e44' : lv <= 4 ? '#1c7ed6' : lv <= 6 ? '#7b5cff' : lv <= 8 ? '#e8590c' : '#c2255c'; return h('span', { class: 'pill lv', style: { '--c': c } }, 'Lv ' + lv); };
  C.card = function (c, opts) {
    opts = opts || {}; var s = VV2.school(c.faculty) || {}, pct = store.coursePct(c), lock = c.level > store.unlockedLevel(c.faculty) && !store.isFree(c.faculty) && pct === 0;
    var a = h('a', { href: '#/course/' + encodeURIComponent(c.id), class: 'card course-card', style: { '--c': c.color || s.color || 'var(--pri)' }, 'data-say': c.title },
      [h('div', { class: 'cc-top' }, [h('span', { class: 'cc-i', 'aria-hidden': 'true' }, c.icon || s.icon || '📘'), h('span', { class: 'cc-school' }, (s.icon || '') + ' ' + (VV2.schoolName(c.faculty) || ''))]),
        h('h3', null, c.title),
        opts.compact ? null : h('p', { class: 'cc-sum' }, c.summary || ''),
        h('div', { class: 'cc-meta' }, [C.levelPill(c.level), h('span', { class: 'pill' }, VV2.bandLabel(c.band)), h('span', { class: 'pill' }, '⏱ ' + VV2.fmtMin(c.minutes)), h('span', { class: 'pill' }, (c.lessons || 0) + ' ' + VV2.t('lessons')), c.sensitive ? h('span', { class: 'pill sens', title: 'Sensitive topic — calm notice and quick exit' }, '🕊️ sensitive') : null, lock ? h('span', { class: 'pill', title: 'Above your unlocked level — placement test available' }, '🔓 placement') : null]),
        h('div', { class: 'cc-bar', 'aria-label': pct + '% complete' }, h('i', { style: { width: pct + '%' } }))]);
    return a;
  };
  function cards(list, el, emptyMsg) {
    el.innerHTML = '';
    if (!list.length) { el.appendChild(h('div', { class: 'empty-state small' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🔭'), h('p', null, emptyMsg || 'Nothing here yet — even the owl is still looking.')])); return; }
    list.forEach(function (c, i) { var k = C.card(c); k.style.animationDelay = Math.min(i * 40, 600) + 'ms'; el.appendChild(k); });
  }
  C.cards = cards;
  function catalogueError(el) {
    el.innerHTML = '';
    el.appendChild(h('div', { class: 'card empty-state' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '📦'), h('h3', null, 'The course catalogue is taking a nap'),
      h('p', null, 'We could not fetch the list of courses. If you are offline, courses you opened before still work.'),
      h('button', { type: 'button', class: 'btn primary', onclick: function () { VV2.render(); } }, '↻ Try again')]));
  }
  function withIndex(el, fn) {
    if (D.ready) return Promise.resolve(fn());
    el.innerHTML = ''; for (var i = 0; i < 3; i++) el.appendChild(h('div', { class: 'skel', 'aria-hidden': 'true' }));
    return D.index().then(fn).catch(function () { catalogueError(el); });
  }

  /* ---------------- filters + search panel ---------------- */
  var F = { faculty: '', band: '', age: '', lmin: '', lmax: '', cur: '', dur: '', sens: '' };
  function sel(label, key, opts) {
    var s = h('select', { 'aria-label': label, onchange: function () { F[key] = s.value; F.onchange && F.onchange(); } });
    opts.forEach(function (o) { var op = h('option', { value: o[0] }, o[1]); if (String(F[key]) === String(o[0])) op.selected = true; s.appendChild(op); });
    return h('label', { class: 'f-item' }, [h('span', null, label), s]);
  }
  function filterBar() {
    var lv = [['', 'Any']].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return [n, String(n)]; }));
    var age = h('input', { type: 'number', min: 0, max: 99, value: F.age, placeholder: 'any', 'aria-label': 'Age', oninput: function () { F.age = age.value; F.onchange && F.onchange(); } });
    var box = h('div', { class: 'filters', id: 'filterBox' }, [
      sel('School', 'faculty', [['', 'All schools']].concat(VV2.SCHOOLS.map(function (s) { return [s.id, s.icon + ' ' + s.name]; }))),
      sel('Band', 'band', [['', 'All bands']].concat(VV2.BANDS.map(function (b) { return [b.id, b.label]; }))),
      h('label', { class: 'f-item f-age' }, [h('span', null, 'Age'), age]),
      sel('Level from', 'lmin', lv), sel('to', 'lmax', lv),
      sel('Curriculum tag', 'cur', [['', 'Any tag']].concat(D.curricula.map(function (t) { return [t, t]; }))),
      sel('Duration', 'dur', [['', 'Any length'], ['15', '≤ 15 min'], ['30', '≤ 30 min'], ['60', '≤ 1 hour'], ['61', '> 1 hour']]),
      sel('Sensitive topics', 'sens', [['', 'Show (with notice)'], ['hide', 'Hide']]),
      h('button', { type: 'button', class: 'btn small ghost', onclick: function () { for (var k in F) if (typeof F[k] === 'string') F[k] = ''; F.onchange && F.onchange(true); } }, '↺ Clear')]);
    return box;
  }
  function activeFilters() { var n = 0; ['faculty', 'band', 'age', 'lmin', 'lmax', 'cur', 'dur', 'sens'].forEach(function (k) { if (F[k] !== '' && F[k] != null) n++; }); return n; }
  C.searchPanel = function (host, q, opts) {
    opts = opts || {};
    var inp = h('input', { type: 'search', id: opts.id || 'searchInput', value: q || '', placeholder: VV2.t('search') + ' — try "budget", "cricket", "puberty", "AZ-104"', 'aria-label': VV2.t('search'), autocomplete: 'off', enterkeyhint: 'search' });
    var fbtn = h('button', { type: 'button', class: 'btn small ghost f-toggle', 'aria-expanded': 'false', 'aria-controls': 'filterBox' }, '⚙️ Filters');
    var fwrap = h('div', { class: 'f-wrap', hidden: true });
    var out = h('div', { class: 'search-out', 'aria-live': 'polite' });
    var bar = h('div', { class: 'searchbar' }, [h('span', { class: 'sb-i', 'aria-hidden': 'true' }, '🔍'), inp, fbtn]);
    host.appendChild(bar); host.appendChild(fwrap); host.appendChild(out);
    function buildFilters() { fwrap.innerHTML = ''; fwrap.appendChild(filterBar()); fbtn.textContent = '⚙️ Filters' + (activeFilters() ? ' (' + activeFilters() + ')' : ''); }
    fbtn.addEventListener('click', function () { var open = fwrap.hidden; fwrap.hidden = !open; fbtn.setAttribute('aria-expanded', open ? 'true' : 'false'); if (open) buildFilters(); });
    var t = 0;
    function run() {
      var v = inp.value.trim(), any = v || activeFilters();
      if (opts.onActive) opts.onActive(!!any);
      out.innerHTML = ''; if (!any) return;
      var res = v ? D.search(v, F) : D.filter(D.courses, F).map(function (c) { return { type: 'course', course: c, id: c.id, title: c.title }; });
      var cs = res.filter(function (r) { return r.type === 'course'; }), ls = res.filter(function (r) { return r.type === 'lesson'; }).slice(0, 30);
      out.appendChild(h('p', { class: 'muted s-count' }, cs.length + ' course' + (cs.length === 1 ? '' : 's') + (ls.length ? ' · ' + ls.length + ' lesson' + (ls.length === 1 ? '' : 's') : '') + (v ? ' for “' + v + '”' : '')));
      if (ls.length) {
        out.appendChild(h('div', { class: 'lesson-hits' }, ls.map(function (r) { var s = VV2.school(r.course && r.course.faculty) || {}; return h('a', { class: 'lhit', href: '#/lesson/' + encodeURIComponent(r.id) }, [h('span', { 'aria-hidden': 'true' }, '▶'), h('b', null, r.title), h('small', null, (r.course ? r.course.title : '') + ' · ' + (s.name || ''))]); })));
      }
      var g = h('div', { class: 'grid cards' }); out.appendChild(g);
      cards(cs.slice(0, 60).map(function (r) { return r.course; }), g, v ? 'No match for “' + v + '”. Try fewer letters, another word, or clear a filter. (Even Google needs a hint sometimes.)' : 'No course matches these filters yet.');
      if (v && D.lessons.length < D.courses.length * 2 && !opts.noDeep) {
        out.appendChild(h('button', { type: 'button', class: 'btn small ghost deep', onclick: function (e) { deep(e.currentTarget); } }, '🔎 Also search inside every lesson title (downloads the catalogue once)'));
      }
    }
    function deep(btn) {
      btn.disabled = true; btn.textContent = 'Fetching lesson lists…';
      var ids = D.packs.map(function (p) { return p.id; }), i = 0;
      (function next() { var batch = ids.slice(i, i + 4); i += 4; if (!batch.length) { run(); return; } Promise.all(batch.map(function (id) { return D.pack(id).catch(function () { }); })).then(function () { btn.textContent = 'Fetched ' + Math.min(i, ids.length) + ' / ' + ids.length + '…'; next(); }); })();
    }
    inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 90); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && opts.onEnter) opts.onEnter(inp.value); });
    F.onchange = function (rebuild) { if (rebuild) buildFilters(); else fbtn.textContent = '⚙️ Filters' + (activeFilters() ? ' (' + activeFilters() + ')' : ''); run(); };
    run();
    return { input: inp, run: run };
  };

  /* ---------------- HOME ---------------- */
  C.home = function (main) {
    var p = store.cur(); VV2.setTitle('');
    var L = store.level(p.xp), mins = store.todayMins(), gp = Math.min(100, mins / p.goal * 100);
    main.innerHTML = '';
    var w = h('div', { class: 'wrap home' }); main.appendChild(w);
    /* hero */
    var hero = h('section', { class: 'hero', 'aria-labelledby': 'heroH' }, [
      h('div', { class: 'hero-art', 'aria-hidden': 'true' }, [h('i', { class: 'orb o1' }), h('i', { class: 'orb o2' }), h('i', { class: 'orb o3' })]),
      h('div', { class: 'hero-av', html: VV2.avatarSVG(p.avatar, VV2.mode === 'tiny' ? 120 : 96) }),
      h('div', { class: 'hero-txt' }, [h('p', { class: 'eyebrow' }, VV2.mode === 'tiny' ? '🧸 Tiny campus' : 'VidyaVerse University'), h('h1', { id: 'heroH' }, greet(p)),
        h('p', { class: 'hero-sub' }, VV2.mode === 'tiny' ? 'Tap anything — I will say it out loud.' : VV2.pick(['What shall we learn today?', 'Fifteen schools. Zero fees. Infinite curiosity.', 'A little every day beats a lot someday.', 'Pick a door — every level is open.'])),
        h('p', { class: 'hero-cat', id: 'heroCat' }), h('div', { class: 'hero-stats' }, [
          h('div', { class: 'hs' }, [h('b', null, 'Lv ' + L.lvl), h('small', null, L.title), h('div', { class: 'xpbar' }, h('i', { style: { width: L.pct + '%' } }))]),
          h('div', { class: 'hs' }, [h('b', null, '🔥 ' + (p.streak.n || 0)), h('small', { 'data-i18n': 'streak' }, VV2.t('streak'))]),
          h('div', { class: 'hs goal', html: VV2.ring(gp, 54, 'var(--gold)', 'Daily goal ' + Math.round(mins) + ' of ' + p.goal + ' minutes') + '<span><b>' + Math.round(mins) + '/' + p.goal + ' min</b><small>' + VV2.esc(VV2.t('dailyGoal')) + '</small></span>' })])])]);
    w.appendChild(hero);
    if (VV2.mode === 'tiny' && !VV2.audio.on) w.appendChild(h('button', { type: 'button', class: 'btn primary big sound-big', onclick: function (e) { VV2.enableSound(true); VV2.say('Hello! Sound is on. Tap anything to hear it.'); e.currentTarget.remove(); } }, '🔊 Turn sound on'));
    /* search */
    var sWrap = h('section', { class: 'home-search', 'aria-label': 'Search' }); w.appendChild(sWrap);
    var rest = h('div', { class: 'home-rest' }); w.appendChild(rest);
    rest.appendChild(homeTiles());
    /* continue */
    var cont = h('section', { class: 'continue', 'aria-label': VV2.t('continue') }); rest.appendChild(cont);
    /* map */
    var mapSec = h('section', { class: 'map-sec', 'aria-labelledby': 'mapH' }, [h('div', { class: 'section-h' }, [h('div', null, [h('p', { class: 'eyebrow' }, 'The campus'), h('h2', { id: 'mapH' }, 'Walk the grounds')]), h('p', { class: 'muted' }, 'Fifteen schools around one lotus pond. Tap a building to enter.')]), h('div', { class: 'campus-map', id: 'campusMap' }, h('div', { class: 'skel', style: { minHeight: '320px' } }))]);
    rest.appendChild(mapSec);
    var recH = h('div', { class: 'section-h' }, [h('div', null, [h('p', { class: 'eyebrow' }, VV2.bandLabel(p.band)), h('h2', { 'data-i18n': 'recommended' }, VV2.t('recommended'))]), h('a', { href: '#/search', class: 'btn small ghost' }, 'Browse all →')]);
    var rec = h('div', { class: 'grid cards' }); rest.appendChild(recH); rest.appendChild(rec);
    var schH = h('div', { class: 'section-h' }, [h('div', null, [h('p', { class: 'eyebrow' }, 'Faculties'), h('h2', { 'data-i18n': 'allSchools' }, VV2.t('allSchools'))])]);
    var sch = h('div', { class: 'school-grid' }); rest.appendChild(schH); rest.appendChild(sch);
    rest.appendChild(h('section', { class: 'teasers' }, [
      teaser('#/exams', '📝', 'Exam hall', 'Course exams, easiest→toughest ladders, mock tests and certificates.'),
      teaser('#/labs', '🧪', 'Labs', 'Pendulums, circuits, a 9-dimensional hypercube… break nothing, learn everything.'),
      teaser('#/games', '🎮', 'Games', 'Math sprints, spelling bees, debate arenas. Homework in disguise.')]));
    rest.appendChild(h('p', { class: 'joke' }, [h('span', { 'aria-hidden': 'true' }, '😄 '), VV2.pick(JOKES)]));
    VV2.SCHOOLS.forEach(function (s, i) { sch.appendChild(schoolCard(s, i)); });
    withIndex(rec, function () {
      C.searchPanel(sWrap, '', { onActive: function (on) { rest.hidden = on; }, onEnter: function (v) { VV2.go('search?q=' + encodeURIComponent(v)); } });
      cards(D.recommend(p, VV2.mode === 'tiny' ? 4 : 8), rec, 'The catalogue is empty right now — new courses are being written. Peek at the Labs meanwhile!');
      VV2.$$('.school-card', sch).forEach(function (el) { var id = el.getAttribute('data-school'), n = D.bySchool(id).length, r = el.querySelector('.sc-count'); if (r) r.textContent = n ? n + ' course' + (n === 1 ? '' : 's') : 'opening soon'; var rg = el.querySelector('.sc-ring'); if (rg) rg.innerHTML = VV2.ring(schoolPct(id), 46, VV2.school(id).color); });
      continueBox(cont, p);
      fillCat();
    });
    VV2.need('worldmap').then(function () { var el = document.getElementById('campusMap'); if (el && VV2.Map) { var m = VV2.Map.mount(el); VV2.onLeave(function () { if (m && m.destroy) m.destroy(); }); } }).catch(function () { var el = document.getElementById('campusMap'); if (el) el.innerHTML = '<p class="muted">The campus map could not load — use the school cards below.</p>'; });
  };
  /* v2.3: big discoverability tiles + live catalogue numbers (computed from the index, never hard-coded) */
  function homeTiles() {
    function tile(href, icon, title, sub, cls) { return h('a', { href: href, class: 'card home-tile ' + (cls || ''), 'data-say': title }, [h('span', { class: 'ht-i', 'aria-hidden': 'true' }, icon), h('span', { class: 'ht-t' }, [h('b', null, title), h('small', null, sub)]), h('span', { class: 'ht-go', 'aria-hidden': 'true' }, '→')]); }
    return h('section', { class: 'home-tiles', 'aria-label': 'Start here' }, [
      tile('#/programmes', '🎓', 'Programmes', 'Degrees, Class 1–12 and certificates — every course laid out semester by semester.', 'ht-prog'),
      tile('#/unaskable', '💬', 'Too awkward to ask? Ask here — privately.', 'Bodies, minds, relationships, substances, the law and medicines. Calm, factual, nothing leaves your device.', 'ht-ask'),
      tile('#/roadmaps', '🗺️', 'Career roadmaps', 'Zero to job-ready: cloud, data, AI, doctor, lawyer, electrician and more — ending in mock interviews.', 'ht-road')]);
  }
  function fillCat() {
    var el = document.getElementById('heroCat'); if (!el || !D.courses.length) return;
    var st = D.stats(), A = VV2.approx;
    var line = function (labs) { el.textContent = A(st.courses) + ' courses · ' + A(st.lessons) + ' lessons · ' + A(Math.round(st.minutes / 60)) + ' hours of guided study' + (labs ? ' · ' + A(labs) + ' labs' : ''); el.title = 'Live from the catalogue. Hours are ≈ estimated guided study time (lessons, labs, quizzes), not video hours.'; };
    line(0); D.labsCount().then(function (n) { if (n) line(n); });
  }
  C.fillCat = fillCat;
  function teaser(href, i, t, d) { return h('a', { href: href, class: 'card teaser' }, [h('span', { class: 'ts-i', 'aria-hidden': 'true' }, i), h('b', null, t), h('small', null, d)]); }
  function schoolPct(fac) { var cs = D.bySchool(fac), tot = 0, done = 0; cs.forEach(function (c) { tot += c.lessons || 0; done += store.courseDone(c.id, c.lessons || 0); }); return tot ? done / tot * 100 : 0; }
  C.schoolPct = schoolPct;
  function schoolCard(s, i) {
    return h('a', { href: '#/school/' + s.id, class: 'card school-card', 'data-school': s.id, style: { '--c': s.color, animationDelay: (i * 35) + 'ms' }, 'data-say': s.name + ', ' + s.en },
      [h('span', { class: 'sc-glow', 'aria-hidden': 'true' }), h('span', { class: 'sc-i', 'aria-hidden': 'true' }, s.icon), h('span', { class: 'sc-ring', 'aria-hidden': 'true' }),
        h('b', { class: 'sc-name' }, s.name), h('span', { class: 'sc-hi', lang: 'hi' }, s.hi), h('small', { class: 'sc-en' }, s.en), h('small', { class: 'sc-count' }, '…')]);
  }
  function continueBox(el, p) {
    el.innerHTML = '';
    var items = [];
    if (p.last) items.push(['lesson', p.last]);
    (p.recent || []).slice(0, 4).forEach(function (cid) { if (D.byId[cid]) items.push(['course', cid]); });
    if (!items.length) { el.appendChild(h('div', { class: 'card first-time' }, [h('span', { class: 'ft-i', 'aria-hidden': 'true' }, '🌅'), h('div', null, [h('b', null, 'Your first lesson is one tap away.'), h('p', { class: 'muted' }, 'Pick a recommendation below or walk the campus map. No fees, no sign-up, no pressure.')])])); return; }
    el.appendChild(h('div', { class: 'section-h' }, h('h2', { 'data-i18n': 'continue' }, VV2.t('continue'))));
    var row = h('div', { class: 'hscroll' }); el.appendChild(row);
    items.forEach(function (it) {
      if (it[0] === 'lesson') {
        var cid = it[1].replace(/\.l\d+$/, ''), c = D.byId[cid]; if (!c) return; var n = +(it[1].match(/\.l(\d+)$/) || [0, 1])[1];
        row.appendChild(h('a', { href: '#/lesson/' + encodeURIComponent(it[1]), class: 'card cont-card hot', style: { '--c': c.color } }, [h('span', { class: 'cc-i', 'aria-hidden': 'true' }, c.icon || '▶'), h('small', null, 'Lesson ' + n + ' of ' + c.lessons), h('b', null, c.title), h('span', { class: 'btn small primary' }, '▶ Resume')]));
      } else {
        var c2 = D.byId[it[1]], pct = store.coursePct(c2);
        row.appendChild(h('a', { href: '#/course/' + encodeURIComponent(c2.id), class: 'card cont-card', style: { '--c': c2.color } }, [h('span', { class: 'cc-i', 'aria-hidden': 'true' }, c2.icon || '📘'), h('small', null, pct + '% done'), h('b', null, c2.title), h('div', { class: 'cc-bar' }, h('i', { style: { width: pct + '%' } }))]));
      }
    });
  }

  /* ---------------- SEARCH PAGE ---------------- */
  C.search = function (main, q) {
    VV2.setTitle('Search'); main.innerHTML = '';
    var w = h('div', { class: 'wrap' }, [h('p', { class: 'eyebrow' }, 'Catalogue'), h('h1', null, 'Find anything'), h('p', { class: 'lead' }, 'Fuzzy search across every course and lesson title. Typos forgiven; curiosity encouraged.')]);
    main.appendChild(w); var host = h('div'); w.appendChild(host);
    return withIndex(host, function () { host.innerHTML = ''; var sp = C.searchPanel(host, q, {}); setTimeout(function () { sp.input.focus(); }, 50); if (!q) { var all = h('div', { class: 'grid cards' }); host.appendChild(h('div', { class: 'section-h' }, h('h2', null, 'Every course (' + D.courses.length + ')'))); host.appendChild(all); cards(D.courses.slice().sort(function (a, b) { return a.faculty.localeCompare(b.faculty) || a.level - b.level; }), all); } });
  };

  /* ---------------- SCHOOL PAGE ---------------- */
  C.school = function (main, fac) {
    var s = VV2.school(fac); if (!s) { VV2.errorView(main, 'No such school', 'That school is not on our campus map. Perhaps it is still being built?'); return; }
    VV2.setTitle(s.name + ' — ' + s.en); main.innerHTML = '';
    var unl = store.unlockedLevel(fac);
    var w = h('div', { class: 'wrap school-page', style: { '--c': s.color } }); main.appendChild(w);
    w.appendChild(h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, [h('a', { href: '#/' }, '🏛️ ' + VV2.t('home')), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', null, s.name)]));
    var ring = h('div', { class: 'sh-ring' }), meta = h('p', { class: 'sh-meta muted' });
    w.appendChild(h('header', { class: 'school-hero' }, [h('span', { class: 'sh-i', 'aria-hidden': 'true' }, s.icon), h('div', null, [h('p', { class: 'eyebrow' }, s.en), h('h1', null, [s.name, ' ', h('span', { class: 'sh-hi', lang: 'hi' }, s.hi)]), h('p', { class: 'lead' }, s.tag + '. Every level is open — jump ahead with a short placement test.'), meta]), ring]));
    var ladder = h('div', { class: 'lv-ladder', role: 'list', 'aria-label': 'Levels in this school' }); w.appendChild(ladder);
    var progLink = { university: 'UG', research: 'PG', school: 'school', tech: 'professional', trades: 'certificate', corporate: 'professional' }[fac];
    w.appendChild(h('div', { class: 'row school-acts' }, [h('a', { class: 'btn primary', href: '#/ladder/' + fac }, '🪜 Challenge ladder'), h('a', { class: 'btn', href: '#/mock/' + fac }, '⏱️ Mock test'), h('a', { class: 'btn ghost', href: '#/placement/' + fac + '/' + Math.min(10, unl + 1) }, '🚀 Placement test for Level ' + Math.min(10, unl + 1)), progLink ? h('a', { class: 'btn ghost', href: '#/programmes?l=' + progLink }, '🎓 Programmes') : null, fac === 'wellbeing' ? h('a', { class: 'btn ghost', href: '#/unaskable' }, '💬 Ask anything') : null]));
    var viewSel = h('div', { class: 'seg view-seg', role: 'group', 'aria-label': 'Arrange courses' });
    var bandSel = h('div', { class: 'seg band-seg', role: 'group', 'aria-label': 'Filter by band' });
    w.appendChild(h('div', { class: 'school-tools' }, [viewSel, bandSel]));
    var jump = h('div', { class: 'sg-jump', role: 'navigation', 'aria-label': 'Jump to a programme or track' }); w.appendChild(jump);
    var list = h('div', { class: 'school-levels' }); w.appendChild(list);
    return withIndex(list, function () {
      var cs = D.filter(D.bySchool(fac), {}); ring.innerHTML = VV2.ring(schoolPct(fac), 84, s.color, 'Your progress in ' + s.name);
      var st = D.stats(cs); meta.textContent = cs.length + ' courses · ' + st.lessons + ' lessons · ' + VV2.hrsLong(st.minutes);
      ladder.innerHTML = '';
      for (var lv = 1; lv <= 10; lv++) { var n = cs.filter(function (c) { return c.level === lv; }).length; ladder.appendChild(h('span', { role: 'listitem', class: 'lv-step' + (lv <= unl || store.isFree(fac) ? ' open' : '') + (n ? '' : ' none'), title: 'Level ' + lv + ': ' + n + ' courses' }, [h('b', null, lv), h('small', null, n ? n : '·')])); }
      var bands = []; cs.forEach(function (c) { if (bands.indexOf(c.band) < 0) bands.push(c.band); });
      var cur = '', groupsAll = D.groupCourses(cs), view = groupsAll.length > 1 ? 'group' : 'level';
      function drawLevels(shown) {
        var lvls = []; shown.forEach(function (c) { if (lvls.indexOf(c.level) < 0) lvls.push(c.level); });
        lvls.sort(function (a, b) { return a - b; }).forEach(function (lv) {
          var g = h('div', { class: 'grid cards' });
          list.appendChild(h('div', { class: 'lv-head' }, [C.levelPill(lv), h('h2', null, 'Level ' + lv), lv > unl && !store.isFree(fac) ? h('a', { class: 'btn small ghost', href: '#/placement/' + fac + '/' + lv }, '🔓 Unlock with placement test') : null]));
          list.appendChild(g); cards(shown.filter(function (c) { return c.level === lv; }), g);
        });
      }
      function drawGroups(shown) {
        var groups = D.groupCourses(shown), many = groups.length > 6;
        groups.forEach(function (gr, gi) {
          var id = 'sg-' + fac + '-' + gr.key.replace(/[^a-z0-9-]/gi, '');
          var body = h('div', { class: 'sg-body' }), filled = false;
          var fill = function () {
            if (filled) return; filled = true;
            var sub = gr.packs.length > 1 && gr.courses.length > 6, byLv = function (a, b) { return a.level - b.level; };
            if (sub) gr.packs.forEach(function (p) {
              body.appendChild(h('h3', { class: 'sg-sub' }, [p.title, h('small', null, ' · ' + p.courses.length + ' course' + (p.courses.length === 1 ? '' : 's') + ' · ' + VV2.hrs(D.stats(p.courses).minutes))]));
              var g = h('div', { class: 'grid cards' }); body.appendChild(g); cards(p.courses.slice().sort(byLv), g);
            });
            else { var g2 = h('div', { class: 'grid cards' }); body.appendChild(g2); cards(gr.courses.slice().sort(byLv), g2); }
          };
          var open = !many || gi < 2;
          var det = h('details', { class: 'sg-group', id: id, open: open ? true : null }, [h('summary', null, [h('span', { class: 'sg-h' }, gr.label), h('span', { class: 'pill' }, gr.courses.length + ' course' + (gr.courses.length === 1 ? '' : 's')), h('span', { class: 'pill', title: 'Estimated guided study time — not video hours' }, VV2.hrs(D.stats(gr.courses).minutes)), gr.packs.length > 1 ? h('span', { class: 'pill' }, gr.packs.length + ' parts') : null]), body]);
          det.addEventListener('toggle', function () { if (det.open) fill(); });
          if (open) fill();
          list.appendChild(det);
          jump.appendChild(h('button', { type: 'button', class: 'chip-b', onclick: function () { det.open = true; fill(); if (det.scrollIntoView) det.scrollIntoView({ behavior: VV2.reduced ? 'auto' : 'smooth', block: 'start' }); } }, gr.label + ' (' + gr.courses.length + ')'));
        });
        if (many) list.insertBefore(h('div', { class: 'row sg-all' }, [h('button', { type: 'button', class: 'btn small ghost', onclick: function () { VV2.$$('details.sg-group', list).forEach(function (d) { d.open = true; }); } }, '⤵ Expand all'), h('button', { type: 'button', class: 'btn small ghost', onclick: function () { VV2.$$('details.sg-group', list).forEach(function (d) { d.open = false; }); } }, '⤴ Collapse all')]), list.firstChild);
      }
      function draw() {
        list.innerHTML = ''; jump.innerHTML = ''; jump.hidden = view !== 'group';
        var shown = cs.filter(function (c) { return !cur || c.band === cur; });
        if (!shown.length) { cards([], list, s.name + ' is still being furnished — courses are on their way. Meanwhile, the Labs are open!'); return; }
        if (view === 'group') drawGroups(shown); else drawLevels(shown);
      }
      if (groupsAll.length > 1) [['group', groupsAll.length > 1 && fac === 'university' ? '🎓 By degree' : fac === 'school' ? '🏫 By class' : '🗂️ By track'], ['level', '🪜 By level']].forEach(function (v) {
        viewSel.appendChild(h('button', { type: 'button', class: 'seg-b', 'data-v': v[0], 'aria-pressed': v[0] === view ? 'true' : 'false', onclick: function () { view = v[0]; VV2.$$('.seg-b', viewSel).forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-v') === view ? 'true' : 'false'); }); VV2.sfx('tap'); draw(); } }, v[1]));
      }); else viewSel.hidden = true;
      [''].concat(bands).forEach(function (b) { bandSel.appendChild(h('button', { type: 'button', class: 'seg-b', 'aria-pressed': b === cur ? 'true' : 'false', onclick: function (e) { cur = b; VV2.$$('.seg-b', bandSel).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); e.currentTarget.setAttribute('aria-pressed', 'true'); VV2.sfx('tap'); draw(); } }, b ? VV2.bandLabel(b) : 'All')); });
      if (bands.length < 2) bandSel.hidden = true;
      draw();
    });
  };

  /* ---------------- ACCESS: sensitive + placement ---------------- */
  C.access = function (c) {
    return sensGate(c).then(function (ok) { return ok ? levelGate(c) : false; });
  };
  function sensGate(c) {
    if (!c.sensitive || !store.isMinor() || store.sensOK(c.id)) return Promise.resolve(true);
    return new Promise(function (res) {
      var body = h('div', { class: 'sens-gate' }, [h('p', null, 'This course talks about a personal or sensitive topic, calmly and age-appropriately.'), c.guardianNote ? h('blockquote', { class: 'gnote' }, [h('b', null, 'Note for grown-ups: '), c.guardianNote]) : null, h('p', { class: 'muted' }, 'A grown-up confirms once for this course. You can leave any time with the Quick exit button or the Esc key.')]);
      VV2.modal({ title: '🕊️ A grown-up’s OK, please', body: body, actions: [{ label: 'Not now', value: false }, { label: 'Grown-up: confirm', primary: true, value: 'g' }], onClose: function (v) {
        if (v !== 'g') return res(false);
        VV2.adult('Confirm this sensitive course for this learner.').then(function (ok) { if (ok) { store.setSensOK(c.id); store.badge('brave'); } res(ok); });
      } });
    });
  }
  function levelGate(c) {
    var fac = c.faculty, unl = store.unlockedLevel(fac);
    if (c.level <= unl || store.isFree(fac) || store.coursePct(c) > 0 || (store.cur().exams[c.id])) return Promise.resolve(true);
    return new Promise(function (res) {
      var s = VV2.school(fac) || { name: fac };
      var body = h('div', { class: 'lv-gate' }, [h('div', { class: 'lg-art', 'aria-hidden': 'true' }, '🚪✨'), h('p', null, ['This is ', h('b', null, 'Level ' + c.level), ' in ', h('b', null, s.name), '. You have unlocked up to Level ' + unl + ' here.']), h('p', { class: 'muted' }, 'Every level is open: take a quick 10-question placement test (score 70% to unlock), or just dive in.')]);
      VV2.modal({ title: 'Jump ahead?', body: body, actions: [{ label: '← Back', value: 'back' }, { label: VV2.t('explore'), value: 'free' }, { label: '🚀 ' + VV2.t('placement'), primary: true, value: 'test' }], onClose: function (v) {
        if (v === 'test') { res(false); VV2.go('placement/' + fac + '/' + c.level + '?course=' + encodeURIComponent(c.id)); return; }
        if (v === 'free') {
          var fn = function (ok) { if (ok) { store.setFree(fac); VV2.toast('Free exploration on for ' + s.name, '🧭'); } res(ok); };
          if (store.isMinor()) VV2.adult('Exploring above your level is fine — a grown-up just says OK first.').then(fn); else fn(true);
          return;
        }
        res(false);
      } });
    });
  };

  /* ---------------- COURSE PAGE ---------------- */
  C.course = function (main, cid) {
    VV2.loading(main, 'Opening the course…');
    return D.index().catch(function () { }).then(function () { return D.course(cid); }).then(function (r) {
      var c = r.course, s = VV2.school(c.faculty) || {}, p = store.cur(), cnt = (c.lessons || []).length;
      var ic = D.byId[c.id] || c; ic.lessons = cnt;
      VV2.setTitle(c.title); store.touch(c.id); main.innerHTML = '';
      if (c.sensitive) VV2.sensitive(true);
      var w = h('div', { class: 'wrap course-page', style: { '--c': c.color || s.color } }); main.appendChild(w);
      w.appendChild(h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, [h('a', { href: '#/' }, '🏛️ ' + VV2.t('home')), h('span', { 'aria-hidden': 'true' }, ' / '), h('a', { href: '#/school/' + c.faculty }, s.name || c.faculty), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', null, c.title)]));
      var done = store.courseDone(c.id, cnt), pct = cnt ? Math.round(done / cnt * 100) : 0;
      var firstOpen = 0; for (var i = 0; i < cnt; i++) { if (!store.isDone(c.lessons[i].id)) { firstOpen = i; break; } firstOpen = i; }
      var startBtn = h('button', { type: 'button', class: 'btn primary big' }, [h('span', { class: 'shine', 'aria-hidden': 'true' }), done ? (done >= cnt ? '↻ Review lesson 1' : '▶ Continue: lesson ' + (firstOpen + 1)) : '▶ Start the course']);
      startBtn.addEventListener('click', function () { VV2.go('lesson/' + encodeURIComponent(c.lessons[done >= cnt ? 0 : firstOpen].id)); });
      w.appendChild(h('header', { class: 'course-hero' }, [h('span', { class: 'ch-i', 'aria-hidden': 'true' }, c.icon || '📘'), h('div', { class: 'ch-txt' }, [h('p', { class: 'eyebrow' }, (s.icon || '') + ' ' + (s.name || '') + ' · ' + VV2.bandLabel(c.band) + ' · ages ' + (c.ages || [0, 99]).join('–')),
        h('h1', null, c.title), h('p', { class: 'lead' }, c.summary || ''),
        h('div', { class: 'cc-meta' }, [C.levelPill(c.level), h('span', { class: 'pill' }, '⏱ ' + VV2.fmtMin(c.minutes)), h('span', { class: 'pill' }, cnt + ' ' + VV2.t('lessons'))].concat((c.curricula || []).map(function (t) { return h('span', { class: 'pill tag' }, '🏷️ ' + t); }))),
        h('div', { class: 'row' }, [startBtn, c.exam ? h('a', { class: 'btn', href: '#/exam/' + encodeURIComponent(c.id) }, '📝 Course exam') : null])]), h('div', { class: 'ch-ring', html: VV2.ring(pct, 96, c.color || s.color, pct + '% of this course done') })]));
      if (c.sensitive) w.appendChild(h('aside', { class: 'card sens-note', role: 'note' }, [h('span', { class: 'sn-i', 'aria-hidden': 'true' }, '🕊️'), h('div', null, [h('b', null, 'A calm, sensitive topic'), h('p', null, c.guardianNote || 'This course covers a personal topic in a respectful, factual, non-explicit way.'), h('p', { class: 'muted' }, 'You can leave at any time: press Esc or the Quick exit button. In an emergency in India call 112; Childline 1098; Tele-MANAS 14416.')])]));
      var unl = store.unlockedLevel(c.faculty);
      if (c.level > unl && !store.isFree(c.faculty) && !done) w.appendChild(h('aside', { class: 'card lv-note' }, [h('span', { 'aria-hidden': 'true' }, '🚀'), h('div', null, [h('b', null, 'Level ' + c.level + ' — above your unlocked Level ' + unl + ' in ' + s.name), h('p', { class: 'muted' }, 'Take a 10-question placement test to unlock it, or explore freely.')]), h('a', { class: 'btn small primary', href: '#/placement/' + c.faculty + '/' + c.level + '?course=' + encodeURIComponent(c.id) }, VV2.t('placement'))]));
      var cols = h('div', { class: 'course-cols' }); w.appendChild(cols);
      var left = h('div'), right = h('div'); cols.appendChild(left); cols.appendChild(right);
      if (c.outcomes && c.outcomes.length) left.appendChild(h('section', { class: 'card outcomes' }, [h('h2', null, '🎯 You will be able to'), h('ul', null, c.outcomes.map(function (o) { return h('li', null, o); }))]));
      var ls = h('ol', { class: 'lesson-list' });
      (c.lessons || []).forEach(function (l, i) {
        var dn = store.isDone(l.id);
        ls.appendChild(h('li', null, h('a', { href: '#/lesson/' + encodeURIComponent(l.id), class: 'll-item' + (dn ? ' done' : '') }, [h('span', { class: 'll-n', 'aria-hidden': 'true' }, dn ? '✓' : String(i + 1)), h('span', { class: 'll-t' }, [h('b', null, l.title), h('small', null, (l.story && l.story.title ? '📖 ' + l.story.title + ' · ' : '') + '⏱ ' + (l.minutes || 5) + ' min' + (l.lab ? ' · 🧪 lab' : '') + (l.game ? ' · 🎮 game' : ''))]), h('span', { class: 'll-go', 'aria-hidden': 'true' }, '→')])));
      });
      left.appendChild(h('section', { class: 'card lessons' }, [h('h2', null, '📚 Lessons'), ls]));
      if (c.prereq && c.prereq.length) right.appendChild(h('section', { class: 'card prereq' }, [h('h3', null, '🧱 Helpful before this'), h('ul', null, c.prereq.map(function (id) { var pc = D.byId[id]; return h('li', null, h('a', { href: '#/course/' + encodeURIComponent(id) }, pc ? pc.title : id)); }))]));
      if (c.exam) {
        var ex = p.exams[c.id];
        right.appendChild(h('section', { class: 'card exam-card' }, [h('h3', null, '📝 Course exam'), h('p', null, (c.exam.questions || []).length + ' questions · pass mark ' + (c.exam.passPct || 60) + '%'), ex ? h('p', { class: 'muted' }, 'Best: ' + ex.best + '% · tries: ' + ex.tries + (ex.passed ? ' · ✅ passed' : '')) : h('p', { class: 'muted' }, 'Questions run from easy (★) to tough (★★★★★).'),
          h('div', { class: 'row' }, [h('a', { class: 'btn small primary', href: '#/exam/' + encodeURIComponent(c.id) + '?timed=1' }, '⏱ Timed'), h('a', { class: 'btn small', href: '#/exam/' + encodeURIComponent(c.id) }, 'Untimed'), ex && ex.passed ? h('a', { class: 'btn small ghost', href: '#/exam/' + encodeURIComponent(c.id) + '?cert=1' }, '📜 Certificate') : null])]));
      }
      var src = {}; (c.lessons || []).forEach(function (l) { (l.sources || []).forEach(function (x) { src[x] = 1; }); });
      if (Object.keys(src).length) right.appendChild(h('section', { class: 'card sources' }, [h('h3', null, '🔖 Built with reference to'), h('p', { class: 'muted' }, Object.keys(src).join(' · '))]));
      if ((c.curricula || []).some(function (t) { return /Azure|AWS|Google Cloud|PMP|PRINCE2|ITIL|Scrum|CFA|CA Foundation|CompTIA|CCNA|ABRSM|NIS|JEE|NEET|CUET|UPSC|GATE|CAT|GRE|GMAT|IELTS|SAT/.test(t); }))
        right.appendChild(h('p', { class: 'muted small-note' }, 'Independent practice material; not affiliated with or endorsed by the exam provider. Check the official exam guide for the current skills outline.'));
    }).catch(function (e) { VV2.errorView(main, 'Course not found', 'We could not open this course' + (e && e.message ? ' (' + e.message + ')' : '') + '. It may have moved, or you may be offline.', function () { VV2.render(); }); });
  };
})();

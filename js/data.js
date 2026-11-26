/* VidyaVerse v2 — data: schools, bands, catalogue indexes, lazy packs, search, recommendations */
(function () {
  'use strict';
  var VV2 = window.VV2;

  VV2.SCHOOLS = [
    ['early', 'Nanhe Kadam', 'नन्हे कदम', 'Early Years', 'Little steps', '👣', '#ff8f4d', 'nanhe-kadam'],
    ['school', 'Pathshala', 'पाठशाला', 'School (all classes)', 'Every class, every subject', '🏫', '#3f7cf5', 'pathshala'],
    ['entrance', 'Lakshya', 'लक्ष्य', 'Competitive & entrance exams', 'Aim true', '🎯', '#e5484d', 'lakshya'],
    ['university', 'Vishwavidyalaya', 'विश्वविद्यालय', 'University (UG)', 'The wide university', '🏛️', '#7b5cff', 'vishwavidyalaya'],
    ['research', 'Shodh', 'शोध', 'Postgraduate & PhD', 'The search for the new', '🔬', '#0f9d8a', 'shodh'],
    ['corporate', 'Udyog', 'उद्योग', 'Corporate & professional', 'Work, wisely', '🏢', '#3a6ea5', 'udyog'],
    ['tech', 'Yantra', 'यंत्र', 'Technology & coding', 'Machines that think', '⚙️', '#0aa2c0', 'yantra'],
    ['life', 'Jeevan', 'जीवन', 'Life skills', 'Things nobody teaches', '🌱', '#2f9e44', 'jeevan'],
    ['wellbeing', 'Mann', 'मन', 'Wellbeing, safety & relationships', 'Mind, heart, body', '💗', '#e64980', 'mann'],
    ['law', 'Nyaya', 'न्याय', 'Law & civics', 'Know your rights', '⚖️', '#9a7432', 'nyaya'],
    ['sports', 'Krida', 'क्रीड़ा', 'Sports & fitness', 'Play hard, play fair', '🏏', '#ef8a00', 'krida'],
    ['arts', 'Kala', 'कला', 'Performing & visual arts', 'Make beautiful things', '🎭', '#c2255c', 'kala'],
    ['trades', 'Hunar', 'हुनर', 'Trades & vocations', 'Skill in your hands', '🛠️', '#b0612d', 'hunar'],
    ['careers', 'Seva', 'सेवा', 'Helping professions & careers', 'Serve, heal, guide', '🤝', '#1c7ed6', 'seva'],
    ['languages', 'Bhasha', 'भाषा', 'Languages', 'Every tongue a new world', '🗣️', '#9c36b5', 'bhasha']
  ].map(function (s) { return { id: s[0], name: s[1], hi: s[2], en: s[3], tag: s[4], icon: s[5], color: s[6], folder: s[7] }; });
  VV2.school = function (id) { return VV2.SCHOOLS.filter(function (s) { return s.id === id; })[0] || null; };
  VV2.schoolName = function (id) { var s = VV2.school(id); return s ? (VV2.lang === 'hi' ? s.hi : s.name) : id; };

  VV2.BANDS = [
    ['infant', 'Infant', 0, 2], ['toddler', 'Toddler', 2, 3], ['play', 'Play school', 3, 4], ['prek', 'Pre-primary (LKG/UKG)', 4, 6],
    ['primary', 'Primary (Class 1–5)', 6, 10], ['middle', 'Middle (Class 6–8)', 11, 13], ['secondary', 'Secondary (Class 9–10)', 14, 15],
    ['senior', 'Senior (Class 11–12)', 16, 17], ['ug', 'Undergraduate', 18, 22], ['pg', 'Postgraduate', 22, 99], ['phd', 'Research / PhD', 22, 99],
    ['pro', 'Working professional', 21, 99], ['all', 'Any age', 0, 99]
  ].map(function (b) { return { id: b[0], label: b[1], min: b[2], max: b[3] }; });
  VV2.bandLabel = function (id) { var b = VV2.BANDS.filter(function (x) { return x.id === id; })[0]; return b ? b.label : id; };
  VV2.bandOf = function (age, stage) {
    if (age == null) return stage || 'all';
    if (age < 2) return 'infant'; if (age < 3) return 'toddler'; if (age < 4) return 'play'; if (age < 6) return 'prek';
    if (age <= 10) return 'primary'; if (age <= 13) return 'middle'; if (age <= 15) return 'secondary'; if (age <= 17) return 'senior';
    if (stage && ['ug', 'pg', 'phd', 'pro'].indexOf(stage) >= 0) return stage;
    return age <= 21 ? 'ug' : age <= 24 ? 'pg' : 'pro';
  };
  VV2.modeOf = function (band) {
    return { infant: 'tiny', toddler: 'tiny', play: 'tiny', prek: 'kids', primary: 'kids', middle: 'teen', secondary: 'teen', senior: 'teen', ug: 'campus', pg: 'campus', phd: 'campus', pro: 'pro' }[band] || 'campus';
  };
  VV2.bandLevel = function (band) {
    return { infant: 1, toddler: 1, play: 2, prek: 2, primary: 3, middle: 4, secondary: 5, senior: 6, ug: 7, pg: 8, phd: 9, pro: 8, all: 5 }[band] || 5;
  };
  VV2.MODES = [
    { id: 'tiny', icon: '🧸', name: 'Tiny', desc: 'Audio-first, giant buttons, everything read aloud. For little ones on a lap.' },
    { id: 'kids', icon: '🎈', name: 'Kids', desc: 'Bright, playful and bouncy. Stars for every try.' },
    { id: 'teen', icon: '⚡', name: 'Teen', desc: 'Bold, dark, fast — streaks, ladders and bragging rights.' },
    { id: 'campus', icon: '📜', name: 'Campus', desc: 'Calm and scholarly. Serif type, quiet sounds, deep reading.' },
    { id: 'pro', icon: '📊', name: 'Pro', desc: 'Sleek dashboard. Dense, keyboard-friendly, no fuss.' }
  ];
  VV2.suggestInterests = function (band) {
    return ({ infant: ['early', 'languages'], toddler: ['early', 'languages', 'arts'], play: ['early', 'arts', 'sports'], prek: ['early', 'school', 'arts'],
      primary: ['school', 'arts', 'sports', 'languages'], middle: ['school', 'tech', 'sports', 'wellbeing'], secondary: ['school', 'entrance', 'wellbeing', 'tech'],
      senior: ['entrance', 'school', 'wellbeing', 'careers'], ug: ['university', 'tech', 'life', 'careers'], pg: ['research', 'university', 'corporate'],
      phd: ['research', 'university'], pro: ['corporate', 'tech', 'life', 'wellbeing'], all: ['life', 'wellbeing'] })[band] || [];
  };

  /* ---------------- catalogue ---------------- */
  var D = VV2.data = { packs: [], courses: [], byId: {}, lessons: [], curricula: [], ready: false, sample: false, error: null };
  var packCache = {}, bundleCache = {}, idxP = null, listCache = {};

  function ingest(arr) {
    D.packs = []; D.courses = []; D.byId = {}; D.lessons = []; var cur = {};
    arr.forEach(function (p) {
      if (!p || !p.id || !Array.isArray(p.courses)) return;
      D.packs.push(p);
      p.courses.forEach(function (c) {
        if (!c || !c.id || D.byId[c.id]) return;
        c.pack = p.id; c.faculty = c.faculty || p.faculty; c.color = c.color || p.color; c.level = +c.level || 1; c.minutes = +c.minutes || 0;
        if (typeof c.lessons !== 'number') c.lessons = Array.isArray(c.lessons) ? c.lessons.length : 0;
        c.curricula = c.curricula || []; c.ages = c.ages || [0, 99];
        c.curricula.forEach(function (t) { cur[t] = 1; });
        D.courses.push(c); D.byId[c.id] = c;
        (c.lessonTitles || []).forEach(function (t, i) { D.lessons.push({ id: c.id + '.l' + (i + 1), title: t, course: c.id }); });
      });
    });
    D.curricula = Object.keys(cur).sort(); D.ready = true;
  }
  D.index = function () {
    if (idxP) return idxP;
    idxP = Promise.all([VV2.fetchJSON('packs/index-1.json'), VV2.fetchJSON('packs/index-2.json')]).then(function (p) { return p[0].concat(p[1]); }).catch(function () { return VV2.fetchJSON('packs/index.json'); }).then(function (a) { if (!Array.isArray(a) || !a.length) throw new Error('empty'); return a; })
      .catch(function () { D.sample = true; return VV2.fetchJSON('packs/index.sample.json'); })
      .then(function (a) { if (!Array.isArray(a)) throw new Error('Catalogue is not a list'); ingest(a); return D; })
      .catch(function (e) { D.error = e; idxP = null; ingest([]); D.ready = false; throw e; });
    return idxP;
  };
  function registerLessons(pack) {
    (pack.courses || []).forEach(function (c) {
      var ic = D.byId[c.id];
      if (!ic) { ic = { id: c.id, title: c.title, icon: c.icon, band: c.band, ages: c.ages || [0, 99], level: +c.level || 1, minutes: c.minutes, lessons: (c.lessons || []).length, curricula: c.curricula || [], sensitive: !!c.sensitive, summary: c.summary, pack: pack.id, faculty: pack.faculty, color: pack.color }; D.byId[c.id] = ic; D.courses.push(ic); }
      (c.lessons || []).forEach(function (l) { if (!D.lessons.some(function (x) { return x.id === l.id; })) D.lessons.push({ id: l.id, title: l.title, course: c.id }); });
    });
  }
  D.pack = function (id) {
    if (!/^[a-z0-9_][a-z0-9_-]*$/i.test(id || '')) return Promise.reject(new Error('Unknown pack'));
    if (packCache[id]) return packCache[id];
    var pe = (D.packs || []).filter(function (x) { return x.id === id; })[0];
    var bk = (pe && pe.bundle) || (function (x) { var p = x.split('-'); return p[0] === 'school' ? p[0] + '-' + p[1] : p[0]; })(id);
    if (!bundleCache[bk]) bundleCache[bk] = VV2.fetchJSON('bundles/b-' + bk + '.json').catch(function () { delete bundleCache[bk]; return null; });
    packCache[id] = bundleCache[bk].then(function (b) { return (b && b[id]) ? b[id] : VV2.fetchJSON('packs/' + id + '.json'); }).then(function (p) {
      if (!p || !Array.isArray(p.courses)) throw new Error('Pack ' + id + ' looks damaged');
      p.courses.forEach(function (c) { c.pack = p.id; c.faculty = c.faculty || p.faculty; c.color = c.color || p.color; });
      registerLessons(p); return p;
    }).catch(function (e) { delete packCache[id]; throw e; });
    return packCache[id];
  };
  D.packOf = function (courseId) { var c = D.byId[courseId]; return c && c.pack ? c.pack : String(courseId || '').split('.')[0]; };
  D.course = function (cid) {
    return D.pack(D.packOf(cid)).then(function (p) {
      var c = p.courses.filter(function (x) { return x.id === cid; })[0];
      if (!c) throw new Error('Course not found'); return { course: c, pack: p };
    });
  };
  D.lesson = function (lid) {
    var cid = String(lid || '').replace(/\.l\d+$/, '');
    return D.course(cid).then(function (r) {
      var i = -1; (r.course.lessons || []).forEach(function (l, k) { if (l.id === lid) i = k; });
      if (i < 0) throw new Error('Lesson not found');
      return { lesson: r.course.lessons[i], index: i, course: r.course, pack: r.pack };
    });
  };
  D.list = function (kind) {
    if (listCache[kind]) return listCache[kind];
    listCache[kind] = VV2.fetchJSON(kind + '/index.json').then(function (a) { if (!Array.isArray(a)) throw 0; return a; })
      .catch(function () { return VV2.fetchJSON(kind + '/index.sample.json').catch(function () { return []; }); })
      .then(function (a) {
        a = (Array.isArray(a) ? a : []).filter(function (x) { return x && x.id; });
        if (kind === 'labs' && !a.some(function (x) { return x.id === 'dimension-lab'; })) a.unshift({ id: 'dimension-lab', title: 'Dimension Lab (2D → 9D)', icon: '🧊', faculty: 'school', bands: ['primary', 'middle', 'secondary', 'senior', 'ug', 'pg', 'phd', 'pro', 'all'], summary: 'Polygons, 3D solids, the 4D tesseract and 5D–9D hypercubes as honest projections. Drag to rotate.', builtin: true });
        return a;
      });
    return listCache[kind];
  };

  /* ---------------- hands-on labs index (only fetched by the Lab Hub) & career roadmaps ---------------- */
  /* packs/labs-index.json is either an array of {l,c,p,f,t,k,s,b} or a manifest {parts:["labs-index-1.json",…]} */
  var labsP = null, roadP = null;
  D.labsIndex = function () {
    if (labsP) return labsP;
    labsP = VV2.fetchJSON('packs/labs-index.json?v=' + VV2.version).then(function (x) {
      if (Array.isArray(x)) return x;
      if (x && Array.isArray(x.parts)) {
        return Promise.all(x.parts.filter(function (f) { return /^labs-index-\d+\.json$/.test(f); }).map(function (f) { return VV2.fetchJSON('packs/' + f + '?v=' + VV2.version); }))
          .then(function (ps) { return [].concat.apply([], ps.map(function (p) { return Array.isArray(p) ? p : []; })); });
      }
      throw new Error('The lab index looks damaged');
    }).then(function (a) { return a.filter(function (x) { return x && x.l && x.t; }); })
      .catch(function (e) { labsP = null; throw e; });
    return labsP;
  };
  D.roadmaps = function () {
    if (roadP) return roadP;
    roadP = VV2.fetchJSON('roadmaps/index.json').then(function (a) { if (!Array.isArray(a) || !a.length) throw 0; return a; })
      .catch(function () { return VV2.fetchJSON('roadmaps/index.sample.json'); })
      .then(function (a) { return (Array.isArray(a) ? a : []).filter(function (r) { return r && r.id && Array.isArray(r.stages); }); })
      .catch(function (e) { roadP = null; throw e; });
    return roadP;
  };

  /* ---------------- filters, search, recommendations ---------------- */
  D.filter = function (list, f) {
    f = f || {}; var p = VV2.store.cur();
    var hide = f.sens === 'hide' || (p && p.hideSensitive);
    return list.filter(function (c) {
      if (f.faculty && c.faculty !== f.faculty) return false;
      if (f.band && c.band !== f.band) return false;
      if (f.age != null && f.age !== '' && !(c.ages[0] <= +f.age && +f.age <= c.ages[1])) return false;
      if (f.lmin && c.level < +f.lmin) return false;
      if (f.lmax && c.level > +f.lmax) return false;
      if (f.cur && c.curricula.indexOf(f.cur) < 0) return false;
      if (f.dur) { var m = c.minutes; if (f.dur === '15' && m > 15) return false; if (f.dur === '30' && m > 30) return false; if (f.dur === '60' && m > 60) return false; if (f.dur === '61' && m <= 60) return false; }
      if (hide && c.sensitive) return false;
      return true;
    });
  };
  D.search = function (q, f) {
    var res = [], seen = {};
    var courses = D.filter(D.courses, f);
    courses.forEach(function (c) {
      var s = VV2.school(c.faculty) || {};
      var sc = VV2.fuzzy(q, c.title) * 3 + VV2.fuzzy(q, (c.summary || '') + ' ' + c.curricula.join(' ') + ' ' + (s.name || '') + ' ' + (s.en || '') + ' ' + VV2.bandLabel(c.band));
      if (sc > 0) { res.push({ type: 'course', id: c.id, course: c, title: c.title, score: sc }); seen[c.id] = 1; }
    });
    if (q && q.trim().length > 1) {
      var ok = {}; courses.forEach(function (c) { ok[c.id] = 1; });
      D.lessons.forEach(function (l) {
        if (!ok[l.course]) return; var sc = VV2.fuzzy(q, l.title);
        if (sc > 0) res.push({ type: 'lesson', id: l.id, course: D.byId[l.course], title: l.title, score: sc * 2.2 });
      });
    }
    return res.sort(function (a, b) { return b.score - a.score; });
  };
  D.recommend = function (p, n) {
    n = n || 8; if (!p) return D.courses.slice(0, n);
    var ints = p.interests || [], out = [], per = {};
    var scored = D.filter(D.courses, {}).map(function (c) {
      var s = 0;
      if (c.band === p.band) s += 6; else if (c.band === 'all') s += 3;
      if (p.age != null && c.ages[0] <= p.age && p.age <= c.ages[1]) s += 5;
      if (ints.indexOf(c.faculty) >= 0) s += 4;
      var pct = VV2.store.coursePct(c); if (pct >= 100) s -= 10; else if (pct > 0) s += 2;
      var lv = VV2.store.unlockedLevel(c.faculty); if (c.level <= lv) s += 2; if (c.level > lv + 2) s -= 3;
      if (c.sensitive && VV2.store.isMinor(p)) s -= 2;
      return { c: c, s: s + Math.random() };
    }).sort(function (a, b) { return b.s - a.s; });
    scored.forEach(function (x) { if (out.length < n && (per[x.c.faculty] || 0) < 2) { out.push(x.c); per[x.c.faculty] = (per[x.c.faculty] || 0) + 1; } });
    return out;
  };
  D.bySchool = function (fac) { return D.courses.filter(function (c) { return c.faculty === fac; }).sort(function (a, b) { return a.level - b.level || a.title.localeCompare(b.title); }); };
})();

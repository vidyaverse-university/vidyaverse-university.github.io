/* VidyaVerse v2 — store: profiles, progress, XP, streaks, badges, time, unlocks, export/import (all local) */
(function () {
  'use strict';
  var VV2 = window.VV2, KEY = 'vidyaverse2';
  var S = null;

  function blank() { return { v: 2, profiles: {}, order: [], cur: null, dev: { sound: false, ambient: false, lang: 'en', captions: false, map2d: false } }; }
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
    if (!S || S.v !== 2 || typeof S.profiles !== 'object') S = blank();
    S.dev = S.dev || blank().dev; S.order = S.order || Object.keys(S.profiles);
    if (S.cur && !S.profiles[S.cur]) S.cur = null;
  }
  var saveT = 0;
  function save(now) {
    clearTimeout(saveT);
    var f = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { VV2.toast && VV2.toast('Storage is full or blocked — progress may not be saved.', '⚠️'); } };
    if (now) f(); else saveT = setTimeout(f, 120);
  }
  window.addEventListener('pagehide', function () { if (S) save(true); });

  var BADGES = [
    ['first', '🌱', 'First step', 'Finish your first lesson'],
    ['five', '🖐️', 'High five', 'Finish 5 lessons'],
    ['twentyfive', '📚', 'Bookworm', 'Finish 25 lessons'],
    ['century', '💯', 'Century', 'Finish 100 lessons — Sachin would nod'],
    ['streak3', '🔥', 'Warming up', '3-day streak'],
    ['streak7', '🌋', 'On fire', '7-day streak'],
    ['streak30', '☄️', 'Unstoppable', '30-day streak'],
    ['perfect', '🎯', 'Bullseye', 'A perfect lesson quiz'],
    ['exam', '📝', 'Exam cleared', 'Pass a course exam'],
    ['ace', '🏆', 'Topper', 'Score 100% in a course exam'],
    ['placement', '🚀', 'Level jumper', 'Pass a placement test'],
    ['ladder', '🪜', 'Summit', 'Climb a challenge ladder to the top rung'],
    ['mock', '⏱️', 'Mock master', 'Finish a mock test'],
    ['explorer', '🧭', 'Explorer', 'Learn in 3 different schools'],
    ['polymath', '🦉', 'Polymath', 'Learn in 8 different schools'],
    ['vishwa', '🌏', 'Vishwa-guru', 'Learn in all 15 schools'],
    ['owl', '🌙', 'Night owl', 'Learn after 10 pm (then sleep!)'],
    ['lark', '🌅', 'Early bird', 'Learn before 7 am'],
    ['lab', '🧪', 'Lab coat', 'Open a lab'],
    ['game', '🎮', 'Player one', 'Play a game'],
    ['reflect', '🪞', 'Deep thinker', 'Write a private reflection'],
    ['calm', '🫧', 'Calm cloud', 'Finish a breathing exercise'],
    ['cert', '📜', 'Certified', 'Earn a certificate'],
    ['brave', '🦁', 'Brave question', 'Open an "ask the unaskable" topic'],
    ['goal', '✅', 'Goal getter', 'Hit your daily goal'],
    ['dims', '🧊', 'Hyper-thinker', 'Explore the Dimension Lab'],
    ['secret', '🪷', 'Secret lotus', 'Found the hidden easter egg']
  ].map(function (b) { return { id: b[0], icon: b[1], name: b[2], desc: b[3] }; });
  VV2.BADGES = BADGES;

  var LEVEL_TITLES = ['Seedling', 'Sprout', 'Sapling', 'Curious cat', 'Scholar', 'Sage-in-training', 'Pandit', 'Acharya', 'Guru', 'Rishi', 'Brahmand-gyani'];

  var store = VV2.store = {
    get s() { return S; },
    save: save,
    dev: function (k, v) { if (v === undefined) return S.dev[k]; S.dev[k] = v; save(); return v; },
    cur: function () { return S.cur ? S.profiles[S.cur] : null; },
    profiles: function () { return S.order.map(function (id) { return S.profiles[id]; }).filter(Boolean); },
    add: function (p) {
      var id = 'p' + Date.now().toString(36) + VV2.rnd(10, 99);
      var prof = {
        id: id, name: p.name || 'Learner', who: p.who || 'me', age: p.age == null ? null : p.age, band: p.band || 'all', mode: p.mode || 'campus',
        interests: p.interests || [], avatar: p.avatar || VV2.randomAvatar(), guest: !!p.guest, created: Date.now(),
        xp: 0, streak: { n: 0, last: null, best: 0 }, daily: { date: null, mins: 0 }, goal: p.goal || ({ tiny: 5, kids: 10, teen: 15, campus: 20, pro: 15 }[p.mode] || 15),
        timeMs: 0, timeBy: {}, lessons: {}, exams: {}, unlocked: {}, free: {}, sensOK: {}, hideSensitive: false, notes: {}, checks: {}, badges: {}, recent: [], last: null,
        a11y: { big: false, contrast: false, dys: false, rm: false }, stats: { quizRight: 0, quizTotal: 0, mocks: 0, ladders: 0, placements: 0 }
      };
      S.profiles[id] = prof; S.order.push(id); S.cur = id; save(true); return prof;
    },
    setCur: function (id) { if (S.profiles[id]) { S.cur = id; save(true); } },
    remove: function (id) { delete S.profiles[id]; S.order = S.order.filter(function (x) { return x !== id; }); if (S.cur === id) S.cur = S.order[0] || null; save(true); },
    update: function (fn) { var p = store.cur(); if (p) { fn(p); save(); } return p; },
    isMinor: function (p) { p = p || store.cur(); if (!p) return false; if (p.age != null) return p.age < 18; return ['infant', 'toddler', 'play', 'prek', 'primary', 'middle', 'secondary', 'senior'].indexOf(p.band) >= 0 || p.mode === 'tiny' || p.mode === 'kids'; },

    /* XP & levels */
    level: function (xp) { var L = Math.floor(Math.sqrt((xp || 0) / 40)) + 1, a = 40 * (L - 1) * (L - 1), b = 40 * L * L; return { lvl: L, title: LEVEL_TITLES[Math.min(L - 1, LEVEL_TITLES.length - 1)], from: a, to: b, pct: Math.round(((xp - a) / (b - a)) * 100) }; },
    addXP: function (n, reason) {
      var p = store.cur(); if (!p || !n) return;
      var before = store.level(p.xp).lvl; p.xp += n; save();
      VV2.toast('+' + n + ' XP' + (reason ? ' · ' + reason : ''), '✨');
      var after = store.level(p.xp);
      if (after.lvl > before) { setTimeout(function () { VV2.sfx('win'); VV2.confetti(); VV2.toast('Level ' + after.lvl + ' — ' + after.title + '!', '🎉'); }, 500); }
      if (VV2.refreshChrome) VV2.refreshChrome();
    },
    badge: function (id) {
      var p = store.cur(); if (!p || p.badges[id]) return false;
      var b = BADGES.filter(function (x) { return x.id === id; })[0]; if (!b) return false;
      p.badges[id] = Date.now(); save();
      setTimeout(function () { VV2.sfx('win'); VV2.toast('Badge unlocked: ' + b.name, b.icon); }, 700);
      return true;
    },
    /* activity, streak, daily */
    activity: function () {
      var p = store.cur(); if (!p) return; var t = VV2.today();
      if (p.streak.last !== t) {
        var y = new Date(); y.setDate(y.getDate() - 1);
        var ys = y.getFullYear() + '-' + ('0' + (y.getMonth() + 1)).slice(-2) + '-' + ('0' + y.getDate()).slice(-2);
        p.streak.n = p.streak.last === ys ? p.streak.n + 1 : 1; p.streak.last = t; p.streak.best = Math.max(p.streak.best || 0, p.streak.n);
        if (p.streak.n >= 3) store.badge('streak3'); if (p.streak.n >= 7) store.badge('streak7'); if (p.streak.n >= 30) store.badge('streak30');
      }
      var h = new Date().getHours(); if (h >= 22) store.badge('owl'); if (h < 7 && h >= 4) store.badge('lark');
      save();
    },
    addTime: function (ms, faculty) {
      var p = store.cur(); if (!p || !(ms > 0)) return;
      p.timeMs += ms; if (faculty) p.timeBy[faculty] = (p.timeBy[faculty] || 0) + ms;
      var t = VV2.today(); if (p.daily.date !== t) { p.daily = { date: t, mins: 0, hit: false }; }
      p.daily.mins += ms / 60000;
      p.days = p.days || {}; p.days[t] = (p.days[t] || 0) + ms / 60000;
      var ks = Object.keys(p.days); if (ks.length > 60) { ks.sort(); delete p.days[ks[0]]; }
      if (!p.daily.hit && p.daily.mins >= p.goal) { p.daily.hit = true; store.badge('goal'); VV2.toast('Daily goal reached. Chai break earned.', '✅'); }
      save();
    },
    todayMins: function () { var p = store.cur(); if (!p || p.daily.date !== VV2.today()) return 0; return p.daily.mins; },

    /* lessons & courses */
    lessonDone: function (lessonId, courseId, faculty, pct) {
      var p = store.cur(); if (!p) return false; var first = !p.lessons[lessonId];
      var prev = p.lessons[lessonId] || {};
      p.lessons[lessonId] = { done: true, pct: Math.max(prev.pct || 0, pct || 0), ts: Date.now(), f: faculty };
      store.activity(); store.touch(courseId);
      var n = Object.keys(p.lessons).length;
      if (n >= 1) store.badge('first'); if (n >= 5) store.badge('five'); if (n >= 25) store.badge('twentyfive'); if (n >= 100) store.badge('century');
      var fs = store.schoolsTouched(); if (fs >= 3) store.badge('explorer'); if (fs >= 8) store.badge('polymath'); if (fs >= 15) store.badge('vishwa');
      save(); return first;
    },
    isDone: function (lessonId) { var p = store.cur(); return !!(p && p.lessons[lessonId]); },
    courseDone: function (courseId, count) { var p = store.cur(); if (!p) return 0; var n = 0; for (var i = 1; i <= count; i++) if (p.lessons[courseId + '.l' + i]) n++; return n; },
    coursePct: function (c) { if (!c || !c.lessons) return 0; var cnt = typeof c.lessons === 'number' ? c.lessons : c.lessons.length; return cnt ? Math.round(store.courseDone(c.id, cnt) / cnt * 100) : 0; },
    schoolsTouched: function () { var p = store.cur(); if (!p) return 0; var f = {}; for (var k in p.lessons) if (p.lessons[k].f) f[p.lessons[k].f] = 1; return Object.keys(f).length; },
    touch: function (courseId) { var p = store.cur(); if (!p || !courseId) return; p.recent = [courseId].concat(p.recent.filter(function (x) { return x !== courseId; })).slice(0, 12); save(); },
    setLast: function (lessonId) { var p = store.cur(); if (p) { p.last = lessonId; save(); } },
    examResult: function (courseId, faculty, level, pct, passed) {
      var p = store.cur(); if (!p) return; var e = p.exams[courseId] || { best: 0, tries: 0 };
      e.tries++; e.best = Math.max(e.best, pct); e.last = pct; e.ts = Date.now(); if (passed) e.passed = true; e.f = faculty; e.level = level;
      p.exams[courseId] = e; store.activity();
      if (passed) { store.badge('exam'); if (level) store.unlock(faculty, Math.min(10, level + 1)); }
      if (pct >= 100) store.badge('ace');
      save(); return e;
    },
    /* placement / unlocks */
    unlockedLevel: function (faculty) { var p = store.cur(); if (!p) return 10; var base = VV2.bandLevel ? VV2.bandLevel(p.band, p.age) : 3; return Math.max(base, p.unlocked[faculty] || 0); },
    unlock: function (faculty, level) { var p = store.cur(); if (!p) return; if ((p.unlocked[faculty] || 0) < level) { p.unlocked[faculty] = level; save(); } },
    isFree: function (faculty) { var p = store.cur(); return !!(p && p.free[faculty]); },
    setFree: function (faculty) { var p = store.cur(); if (p) { p.free[faculty] = true; save(); } },
    sensOK: function (courseId) { var p = store.cur(); return !!(p && p.sensOK[courseId]); },
    setSensOK: function (courseId) { var p = store.cur(); if (p) { p.sensOK[courseId] = Date.now(); save(); } },
    /* notes & checklists */
    note: function (key, val) { var p = store.cur(); if (!p) return ''; if (val === undefined) return p.notes[key] || ''; p.notes[key] = val; save(); return val; },
    checks: function (key, val) { var p = store.cur(); if (!p) return []; if (val === undefined) return p.checks[key] || []; p.checks[key] = val; save(); return val; },

    /* data portability */
    exportJSON: function () { return JSON.stringify(S, null, 1); },
    importJSON: function (txt) {
      var d = JSON.parse(txt);
      if (!d || d.v !== 2 || typeof d.profiles !== 'object') throw new Error('This file is not a VidyaVerse v2 backup.');
      S = d; S.dev = S.dev || blank().dev; S.order = S.order || Object.keys(S.profiles); if (!S.profiles[S.cur]) S.cur = S.order[0] || null; save(true);
    },
    reset: function () { S = blank(); try { localStorage.removeItem(KEY); } catch (e) { } save(true); }
  };
  load();
})();

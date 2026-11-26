/* VidyaVerse v2 — Career Roadmaps (#/roadmaps, #/roadmaps/<id>): a gallery, then a vertical journey of stages
   with course chips (progress from the local store), lab chips, overall %, "Start next" and print. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var RM = VV2.Roadmaps = {};

  function lessonInfo(lid) {
    var m = /^(.*)\.l(\d+)$/.exec(String(lid || '')); if (!m) return null;
    var c = D.byId[m[1]], n = +m[2]; if (!c || n < 1 || n > (c.lessons || 0)) return null;
    return { id: lid, course: c, n: n, title: (c.lessonTitles || [])[n - 1] || ('Lesson ' + n) };
  }
  /* resolve ids once per roadmap; unknown ones are skipped and logged */
  function resolve(r) {
    if (r._res) return r._res;
    var stages = (r.stages || []).map(function (s, i) {
      var cs = [], ls = [];
      (s.courses || []).forEach(function (id) { var c = D.byId[id]; if (c) cs.push(c); else console.warn('[roadmaps] ' + r.id + ' stage ' + (i + 1) + ': unknown course id "' + id + '" (skipped)'); });
      (s.labs || []).forEach(function (id) { var li = lessonInfo(id); if (li) ls.push(li); else console.warn('[roadmaps] ' + r.id + ' stage ' + (i + 1) + ': unknown lab/lesson id "' + id + '" (skipped)'); });
      return { s: s, courses: cs, labs: ls };
    });
    r._res = stages; return stages;
  }
  function lessonIds(stage) {
    var ids = [];
    stage.courses.forEach(function (c) { for (var i = 1; i <= (c.lessons || 0); i++) ids.push(c.id + '.l' + i); });
    stage.labs.forEach(function (l) { if (ids.indexOf(l.id) < 0) ids.push(l.id); });
    return ids;
  }
  function progress(r) {
    var seen = {}, tot = 0, done = 0, next = null;
    resolve(r).forEach(function (st) { lessonIds(st).forEach(function (id) { if (seen[id]) return; seen[id] = 1; tot++; if (store.isDone(id)) done++; else if (!next) next = id; }); });
    return { tot: tot, done: done, pct: tot ? Math.round(done / tot * 100) : 0, next: next };
  }
  function stagePct(st) { var ids = lessonIds(st), d = 0; ids.forEach(function (id) { if (store.isDone(id)) d++; }); return ids.length ? Math.round(d / ids.length * 100) : 0; }

  RM.render = function (main, id) {
    VV2.loading(main, 'Unrolling the career maps…');
    return Promise.all([D.index().catch(function () { }), D.roadmaps()]).then(function (r) {
      var maps = r[1] || [];
      if (id) { var m = maps.filter(function (x) { return x.id === id; })[0]; if (m) return detail(main, m); }
      return gallery(main, maps, id);
    }).catch(function (e) { VV2.errorView(main, 'Roadmaps are not available', 'We could not load the career roadmaps' + (e && e.message ? ' (' + e.message + ')' : '') + '.', function () { VV2.render(); }); });
  };

  var CATS = [['Tech careers', '💻'], ['Business', '📈'], ['Health', '🩺'], ['Engineering', '🏗️'], ['Government & exams', '🏛️'], ['Trades', '🛠️'], ['Life', '🌱']];
  function mins(r) { var m = 0, seen = {}; resolve(r).forEach(function (st) { st.courses.forEach(function (c) { if (!seen[c.id]) { seen[c.id] = 1; m += +c.minutes || 0; } }); }); return m; }
  RM.minutes = mins;
  function catIcon(c) { return (CATS.filter(function (x) { return x[0] === c; })[0] || [0, '🧭'])[1]; }
  function gallery(main, maps, missing) {
    VV2.setTitle('Career roadmaps'); main.innerHTML = '';
    var w = h('div', { class: 'wrap rm' }); main.appendChild(w);
    w.appendChild(h('div', { class: 'hub-head' }, [h('div', null, [h('p', { class: 'eyebrow' }, 'Marg-darshan · Career roadmaps'), h('h1', null, '🗺️ Roadmaps'),
      h('p', { class: 'lead' }, 'Zero to job-ready, one stage at a time. ' + maps.length + ' roadmaps string together courses and hands-on labs, end with a mock interview or final exam where one exists, and remember your progress on this device.'),
      h('p', { class: 'muted small-note' }, ['Want a whole degree, school class or certificate instead? See ', h('a', { href: '#/programmes' }, '🎓 Programmes'), '.'])])]));
    if (missing) w.appendChild(h('p', { class: 'w-fb no', role: 'status' }, 'We could not find the roadmap "' + missing + '" — here are all of them.'));
    if (!maps.length) { w.appendChild(h('div', { class: 'empty-state small' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🧭'), h('p', null, 'Roadmaps are being drawn — check back soon.')])); return; }
    var cats = CATS.map(function (c) { return c[0]; });
    maps.forEach(function (m) { var c = m.category || 'More'; if (cats.indexOf(c) < 0) cats.push(c); });
    var cur = '', inp = h('input', { type: 'search', placeholder: 'Find a roadmap — try “cloud”, “doctor”, “electrician”', 'aria-label': 'Find a roadmap', autocomplete: 'off' });
    var chips = h('div', { class: 'seg pg-levels', role: 'group', 'aria-label': 'Filter by category' });
    w.appendChild(h('div', { class: 'pg-tools' }, [h('div', { class: 'searchbar' }, [h('span', { class: 'sb-i', 'aria-hidden': 'true' }, '🔍'), inp]), chips]));
    var out = h('div', { 'aria-live': 'polite' }); w.appendChild(out);
    [''].concat(cats).forEach(function (c) {
      var n = c ? maps.filter(function (m) { return (m.category || 'More') === c; }).length : maps.length; if (!n) return;
      chips.appendChild(h('button', { type: 'button', class: 'seg-b', 'data-c': c, 'aria-pressed': c === cur ? 'true' : 'false', onclick: function () { cur = c; VV2.$$('.seg-b', chips).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-c') === cur ? 'true' : 'false'); }); draw(); } }, (c ? catIcon(c) : '✨') + ' ' + (c || 'All') + ' (' + n + ')'));
    });
    function draw() {
      out.innerHTML = ''; var v = inp.value.trim();
      var shown = maps.filter(function (m) { return (!cur || (m.category || 'More') === cur) && (!v || VV2.fuzzy(v, m.title + ' ' + (m.audience || '') + ' ' + (m.summary || '')) >= 10 || (VV2.fuzzy(v, m.title) > 0 && !maps.some(function (x) { return VV2.fuzzy(v, x.title + ' ' + (x.audience || '') + ' ' + (x.summary || '')) >= 10; }))); });
      if (!shown.length) { out.appendChild(h('p', { class: 'muted' }, 'No roadmap matches “' + v + '”.')); return; }
      cats.forEach(function (c) {
        var ms = shown.filter(function (m) { return (m.category || 'More') === c; }); if (!ms.length) return;
        out.appendChild(h('div', { class: 'section-h' }, h('h2', null, catIcon(c) + ' ' + c + ' (' + ms.length + ')')));
        var g = h('div', { class: 'rm-gal' }); out.appendChild(g);
        ms.forEach(function (m, k) {
          var pr = progress(m), stages = resolve(m).filter(function (s) { return s.courses.length || s.labs.length; }).length;
          g.appendChild(h('a', { class: 'card rm-card', href: '#/roadmaps/' + encodeURIComponent(m.id), style: { '--c': m.color || 'var(--pri)', animationDelay: Math.min(k * 40, 300) + 'ms' }, 'data-say': m.title }, [
            h('div', { class: 'rm-card-h' }, [h('span', { class: 'rm-card-i', 'aria-hidden': 'true' }, m.icon || '🧭'), h('span', { html: VV2.ring(pr.pct, 52, m.color, pr.pct + '% of ' + m.title + ' done') })]),
            h('b', null, m.title), h('p', null, m.summary || ''),
            h('div', { class: 'rm-pills' }, [m.duration ? h('span', { class: 'pill' }, '⏱ ' + m.duration) : null, h('span', { class: 'pill' }, stages + ' stage' + (stages === 1 ? '' : 's')), h('span', { class: 'pill', title: 'Estimated guided study time — not video hours' }, VV2.hrs(mins(m))), m.audience ? h('span', { class: 'pill lv' }, m.audience) : null])
          ]));
        });
      });
    }
    var t = 0; inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(draw, 120); });
    draw();
  }

  function detail(main, m) {
    VV2.setTitle(m.title + ' · Roadmap'); main.innerHTML = '';
    var res = resolve(m), pr = progress(m), color = m.color || 'var(--pri)';
    var w = h('div', { class: 'wrap rm', style: { '--c': color } }); main.appendChild(w);
    w.appendChild(h('nav', { class: 'crumbs no-print', 'aria-label': 'Breadcrumb' }, [h('a', { href: '#/roadmaps' }, '🗺️ Roadmaps'), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', null, m.title)]));
    var startB = h('a', { class: 'btn primary big', href: pr.next ? '#/lesson/' + encodeURIComponent(pr.next) : '#/roadmaps/' + encodeURIComponent(m.id) }, pr.next ? (pr.done ? '▶ Start next' : '▶ Start the roadmap') : '🎉 Roadmap complete');
    if (pr.next) { var li = lessonInfo(pr.next); if (li) startB.setAttribute('title', 'Next: ' + li.title + ' (' + li.course.title + ')'); }
    else startB.addEventListener('click', function (e) { e.preventDefault(); VV2.confetti(); VV2.toast('Every stage done. Time to apply for that job!', '🎉'); });
    w.appendChild(h('header', { class: 'rm-hero' }, [
      h('div', null, [h('p', { class: 'eyebrow' }, (m.icon || '🧭') + ' ' + (m.category || 'Career') + ' roadmap'), h('h1', null, m.title), m.summary ? h('p', { class: 'lead' }, m.summary) : null,
        h('div', { class: 'rm-pills' }, [m.audience ? h('span', { class: 'pill' }, '👥 ' + m.audience) : null, m.duration ? h('span', { class: 'pill' }, '⏱ ' + m.duration) : null, h('span', { class: 'pill' }, pr.done + ' / ' + pr.tot + ' lessons done'), h('span', { class: 'pill', title: 'Estimated guided study time — not video hours' }, VV2.hrsLong(mins(m)))]),
        (m.outcomes || []).length ? h('div', null, [h('p', { class: 'rm-sub' }, 'You will be able to'), h('ul', { class: 'rm-out' }, m.outcomes.map(function (o) { return h('li', null, String(o)); }))]) : null,
        h('div', { class: 'rm-acts' }, [startB, h('button', { type: 'button', class: 'btn ghost', onclick: function () { window.print(); } }, '🖨️ Print'), h('a', { class: 'btn ghost', href: '#/handson' }, '🧪 All labs')])]),
      h('div', { html: VV2.ring(pr.pct, 120, color, pr.pct + '% of this roadmap done') })]));
    var path = h('ol', { class: 'rm-path', 'aria-label': 'Stages' }); w.appendChild(path);
    var nowMarked = false;
    res.forEach(function (st, i) {
      if (!st.courses.length && !st.labs.length && !(st.s.milestone)) return;
      var pct = stagePct(st), done = pct >= 100 && (st.courses.length || st.labs.length), now = !done && !nowMarked && (st.courses.length || st.labs.length);
      if (now) nowMarked = true;
      var card = h('li', { class: 'card rm-stage' + (done ? ' done' : '') + (now ? ' now' : '') }, [
        h('span', { class: 'rm-dot', 'aria-hidden': 'true' }, done ? '✓' : String(i + 1)),
        h('h3', null, (st.s.title || 'Stage ' + (i + 1))),
        h('p', { class: 'rm-wk' }, [st.s.weeks ? '🗓 ' + st.s.weeks + (/^\d+(\.\d+)?$/.test(String(st.s.weeks)) ? ' week' + (+st.s.weeks === 1 ? '' : 's') : '') + ' · ' : '', pct + '% done', st.courses.length ? ' · ' + VV2.hrs(st.courses.reduce(function (a, c) { return a + (+c.minutes || 0); }, 0)) : '', now ? ' · 👉 you are here' : ''])
      ]);
      if (st.courses.length) {
        card.appendChild(h('p', { class: 'rm-sub' }, 'Courses'));
        card.appendChild(h('div', { class: 'rm-chips' }, st.courses.map(function (c) {
          var cp = store.coursePct(c), cls = cp >= 100 ? ' done' : cp > 0 ? ' prog' : '';
          return h('a', { class: 'rm-chip' + cls, href: '#/course/' + encodeURIComponent(c.id), title: c.title + ' — ' + (cp >= 100 ? 'done' : cp > 0 ? cp + '% done' : 'not started') }, [h('span', { 'aria-hidden': 'true' }, cp >= 100 ? '✅' : cp > 0 ? '◐' : (c.icon || '○')), h('span', null, c.title + (cp > 0 && cp < 100 ? ' · ' + cp + '%' : '')), h('span', { class: 'sr op-sr' }, cp >= 100 ? ' (done)' : cp > 0 ? ' (in progress)' : ' (not started)')]);
        })));
      }
      if (st.labs.length) {
        card.appendChild(h('p', { class: 'rm-sub' }, 'Hands-on labs'));
        card.appendChild(h('div', { class: 'rm-chips' }, st.labs.map(function (l) {
          var d = store.isDone(l.id);
          return h('a', { class: 'rm-chip lab' + (d ? ' done' : ''), href: '#/lesson/' + encodeURIComponent(l.id), title: l.course.title }, [h('span', { 'aria-hidden': 'true' }, d ? '✅' : '🧪'), h('span', null, String(l.title).replace(/^Lab:\s*/i, '')), h('span', { class: 'sr op-sr' }, d ? ' (done)' : ' (not done)')]);
        })));
      }
      if (st.s.milestone) card.appendChild(h('p', { class: 'rm-ms' }, ['🏁 ', h('b', null, 'Milestone: '), String(st.s.milestone)]));
      path.appendChild(card);
    });
  }
})();

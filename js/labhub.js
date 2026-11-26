/* VidyaVerse v2 — Lab Hub (#/handson): every hands-on lesson across all packs + the simulations in labs/.
   Search, filters (school, tool/shell, type, level), counts, deep links. Filter state lives in the hash query. */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var LH = VV2.LabHub = {};
  var TYPES = [
    ['all', '🧪', 'All'], ['terminal', '💻', 'Terminal'], ['ticket', '🎫', 'Ticket'], ['code', '🧑‍💻', 'Code'],
    ['scenario', '🧭', 'Scenario'], ['practice', '🛠️', 'Practice'], ['simulation', '🔬', 'Simulation']
  ];
  var TI = {}; TYPES.forEach(function (t) { TI[t[0]] = t; });
  var SHELLN = { bash: 'Bash / Linux', powershell: 'PowerShell', powercli: 'PowerCLI', cmd: 'Windows CMD', esxcli: 'ESXi (esxcli)', kubectl: 'kubectl', docker: 'Docker', git: 'Git', cisco: 'Cisco IOS', sql: 'SQL', mongosh: 'mongosh', adb: 'adb', 'python-repl': 'Python REPL', python: 'Python', javascript: 'JavaScript', js: 'JavaScript', java: 'Java', c: 'C', cpp: 'C++', csharp: 'C#', html: 'HTML/CSS', typescript: 'TypeScript', go: 'Go', rust: 'Rust', node: 'Node.js', react: 'React', mongo: 'MongoDB', r: 'R', kotlin: 'Kotlin', dart: 'Dart', swift: 'Swift', php: 'PHP', ruby: 'Ruby' };
  var PAGE = 60;
  function group(k) { return k === 'terminal' || k === 'ticket' || k === 'code' || k === 'scenario' || k === 'simulation' ? k : k === 'scene3d' ? 'simulation' : 'practice'; }
  function fmt(n) { try { return Number(n).toLocaleString('en-IN'); } catch (e) { return String(n); } }

  LH.render = function (main, q) {
    q = q || {};
    VV2.setTitle('Lab Hub'); main.innerHTML = '';
    var w = h('div', { class: 'wrap lh' }); main.appendChild(w);
    var count = h('p', { class: 'lh-count', 'aria-live': 'polite' }, '…');
    var sub = h('p', { class: 'lh-sub' }, 'Loading every hands-on lab on campus…');
    w.appendChild(h('div', { class: 'lh-head' }, [
      h('div', null, [h('p', { class: 'eyebrow' }, 'Prayogshala · Lab Hub'), h('h1', null, '🧪 Hands-on labs'), count, sub]),
      h('div', { class: 'row' }, [h('a', { class: 'btn ghost', href: '#/code' }, '💻 Code Studio'), h('a', { class: 'btn ghost', href: '#/roadmaps' }, '🗺️ Career roadmaps'), h('a', { class: 'btn ghost', href: '#/labs' }, '🔬 Simulations page')])
    ]));
    var grid = h('div', { class: 'lh-grid' });
    for (var i = 0; i < 6; i++) grid.appendChild(h('div', { class: 'skel', 'aria-hidden': 'true' }));
    var bar = h('div', { class: 'lh-bar' }), types = h('div', { class: 'lh-types', role: 'group', 'aria-label': 'Lab type' }), meta = h('div', { class: 'lh-meta' }), more = h('div', { class: 'lh-more' });
    w.appendChild(bar); w.appendChild(types); w.appendChild(meta); w.appendChild(grid); w.appendChild(more);

    return Promise.all([
      D.index().catch(function () { }),
      D.labsIndex().catch(function (e) { console.warn('[labhub] labs index unavailable', e && e.message); return []; }),
      D.list('labs').catch(function () { return []; })
    ]).then(function (r) {
      var lessons = r[1] || [], sims = (r[2] || []).map(function (x) { return { l: x.id, t: x.title || x.id, k: 'simulation', f: x.faculty || '', b: (x.bands || ['all'])[0], sim: 1, i: x.icon, sum: x.summary || '' }; });
      var all = lessons.map(function (x) { var c = D.byId[x.c]; return { l: x.l, c: x.c, p: x.p, f: x.f || (c && c.faculty) || '', t: x.t, k: x.k, g: group(x.k), s: x.s || '', b: x.b || (c && c.band) || 'all', ct: c ? c.title : '' }; })
        .concat(sims.map(function (x) { x.g = 'simulation'; x.s = ''; x.ct = 'Interactive simulation'; return x; }));
      var st = { q: q.q || '', f: q.f || '', s: q.s || '', k: TI[q.k] ? q.k : 'all', b: q.b || '', todo: q.todo === '1', n: PAGE };
      count.textContent = fmt(lessons.length) + ' hands-on labs';
      sub.textContent = (lessons.length ? 'Terminals, service tickets, code labs, scenarios and procedures from every school' : 'The lab index is not built yet') + ' · plus ' + sims.length + ' simulations.';
      if (!lessons.length && !sims.length) { grid.innerHTML = ''; grid.appendChild(h('div', { class: 'lh-empty' }, 'The lab benches are being set up — check back soon.')); return; }

      /* controls */
      var qi = h('input', { type: 'search', class: 'lh-q', placeholder: 'Search labs — e.g. "nginx", "reset password", "VLAN"', 'aria-label': 'Search labs', value: st.q });
      function sel(label, opts, val) { var s = h('select', { 'aria-label': label }); opts.forEach(function (o) { var op = h('option', { value: o[0] }, o[1]); if (o[0] === val) op.selected = true; s.appendChild(op); }); s.value = val; return s; }
      var facCount = {}, shCount = {}, bCount = {}; all.forEach(function (x) { facCount[x.f] = (facCount[x.f] || 0) + 1; if (x.s) shCount[x.s] = (shCount[x.s] || 0) + 1; bCount[x.b] = (bCount[x.b] || 0) + 1; });
      var fSel = sel('School', [['', 'All schools']].concat(VV2.SCHOOLS.filter(function (s) { return facCount[s.id]; }).map(function (s) { return [s.id, s.icon + ' ' + s.name + ' (' + fmt(facCount[s.id]) + ')']; })), st.f);
      var sSel = sel('Tool or shell', [['', 'All tools & shells']].concat(Object.keys(shCount).sort(function (a, b) { return shCount[b] - shCount[a]; }).map(function (k) { return [k, (SHELLN[k] || k) + ' (' + fmt(shCount[k]) + ')']; })), st.s);
      var bSel = sel('Level', [['', 'All levels']].concat(VV2.BANDS.filter(function (b) { return bCount[b.id]; }).map(function (b) { return [b.id, b.label + ' (' + fmt(bCount[b.id]) + ')']; })), st.b);
      bar.appendChild(qi); bar.appendChild(fSel); bar.appendChild(sSel); bar.appendChild(bSel);
      var tBtns = TYPES.map(function (t) {
        var n = t[0] === 'all' ? all.length : all.filter(function (x) { return x.g === t[0]; }).length;
        var b = h('button', { type: 'button', class: 'lh-type', 'aria-pressed': st.k === t[0] ? 'true' : 'false', hidden: !n && t[0] !== 'all' }, [h('span', { 'aria-hidden': 'true' }, t[1] + ' '), t[2], h('small', null, fmt(n))]);
        b.addEventListener('click', function () { st.k = t[0]; st.n = PAGE; tBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); VV2.sfx('tap'); draw(); });
        types.appendChild(b); return b;
      });
      var shown = h('span', { 'aria-live': 'polite' });
      var todo = h('input', { type: 'checkbox' }); todo.checked = st.todo;
      var reset = h('button', { type: 'button', class: 'btn small ghost' }, '✕ Clear filters');
      meta.appendChild(shown); meta.appendChild(h('span', { class: 'row' }, [h('label', null, [todo, ' Not done yet']), reset]));

      var qT = 0;
      qi.addEventListener('input', function () { clearTimeout(qT); qT = setTimeout(function () { st.q = qi.value; st.n = PAGE; draw(); }, 160); });
      fSel.addEventListener('change', function () { st.f = fSel.value; st.n = PAGE; draw(); });
      sSel.addEventListener('change', function () { st.s = sSel.value; st.n = PAGE; draw(); });
      bSel.addEventListener('change', function () { st.b = bSel.value; st.n = PAGE; draw(); });
      todo.addEventListener('change', function () { st.todo = todo.checked; st.n = PAGE; draw(); });
      reset.addEventListener('click', function () { st.q = st.f = st.s = st.b = ''; st.k = 'all'; st.todo = false; st.n = PAGE; qi.value = ''; fSel.value = ''; sSel.value = ''; bSel.value = ''; todo.checked = false; tBtns.forEach(function (x, i) { x.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); }); draw(); });

      function persist() {
        var p = []; ['q', 'f', 's', 'k', 'b'].forEach(function (k) { if (st[k] && !(k === 'k' && st[k] === 'all')) p.push(k + '=' + encodeURIComponent(st[k])); }); if (st.todo) p.push('todo=1');
        try { history.replaceState(null, '', '#/handson' + (p.length ? '?' + p.join('&') : '')); } catch (e) { }
      }
      function draw() {
        persist();
        var qq = VV2.norm(st.q).trim(), res = all.filter(function (x) {
          if (st.k !== 'all' && x.g !== st.k) return false;
          if (st.f && x.f !== st.f) return false;
          if (st.s && x.s !== st.s) return false;
          if (st.b && x.b !== st.b) return false;
          if (st.todo && !x.sim && store.isDone(x.l)) return false;
          return true;
        });
        if (st.k === 'simulation' && !qq) res = res.filter(function (x) { return x.sim; }).concat(res.filter(function (x) { return !x.sim; }));
        if (qq) res = res.map(function (x) { return { x: x, sc: VV2.fuzzy(qq, x.t) * 3 + VV2.fuzzy(qq, x.ct + ' ' + (SHELLN[x.s] || x.s) + ' ' + x.k + ' ' + (x.sum || '')) }; }).filter(function (y) { return y.sc > 0; }).sort(function (a, b) { return b.sc - a.sc; }).map(function (y) { return y.x; });
        shown.textContent = res.length === all.length ? 'Showing all ' + fmt(all.length) : fmt(res.length) + ' match' + (res.length === 1 ? '' : 'es') + ' of ' + fmt(all.length);
        grid.innerHTML = ''; more.innerHTML = '';
        if (!res.length) { grid.appendChild(h('div', { class: 'lh-empty' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🔍'), h('p', null, 'No labs match these filters. Try fewer filters or another word.')])); return; }
        res.slice(0, st.n).forEach(function (x) {
          var s = VV2.school(x.f) || {}, t = TI[x.g] || TI.practice, done = !x.sim && store.isDone(x.l);
          var title = String(x.t).replace(/^Lab:\s*/i, '');
          grid.appendChild(h('a', { class: 'card lh-item', href: x.sim ? '#/lab/' + encodeURIComponent(x.l) : '#/lesson/' + encodeURIComponent(x.l), style: { '--c': s.color || 'var(--pri)' }, 'data-say': title }, [
            h('span', { class: 'lh-i', 'aria-hidden': 'true' }, x.i || t[1]),
            h('b', null, [done ? h('span', { class: 'lh-done', title: 'Done' }, '✓ ') : null, title, done ? h('span', { class: 'sr op-sr' }, ' (done)') : null]),
            h('small', null, x.ct || ''),
            h('span', { class: 'lh-pills' }, [h('span', { class: 'pill' }, t[2]), x.s ? h('span', { class: 'pill' }, SHELLN[x.s] || x.s) : null, s.name ? h('span', { class: 'pill' }, s.icon + ' ' + s.name) : null, x.b && x.b !== 'all' ? h('span', { class: 'pill lv' }, VV2.bandLabel(x.b)) : null])
          ]));
        });
        if (res.length > st.n) more.appendChild(h('button', { type: 'button', class: 'btn', onclick: function () { st.n += PAGE * 2; draw(); } }, 'Show more (' + fmt(res.length - st.n) + ' left)'));
      }
      draw();
    });
  };
})();

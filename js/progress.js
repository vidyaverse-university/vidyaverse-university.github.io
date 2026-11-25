/* VidyaVerse v2 — rewards, grown-ups dashboard, settings (sound, accessibility, data), profiles */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var P = VV2.Progress = {};

  function stat(v, l) { return h('div', { class: 'stat' }, [h('b', null, String(v)), h('small', null, l)]); }
  function mins(ms) { return VV2.fmtMin((ms || 0) / 60000); }
  function last7(p) { var out = [], d = new Date(); for (var i = 6; i >= 0; i--) { var x = new Date(d); x.setDate(d.getDate() - i); var k = x.getFullYear() + '-' + ('0' + (x.getMonth() + 1)).slice(-2) + '-' + ('0' + x.getDate()).slice(-2); out.push({ k: k, d: 'SMTWTFS'.charAt(x.getDay()), m: (p.days && p.days[k]) || 0 }); } return out; }
  function chart(p) { var days = last7(p), mx = Math.max.apply(null, days.map(function (x) { return x.m; }).concat([p.goal || 10])); return h('div', { class: 'timechart', role: 'img', 'aria-label': 'Minutes learned in the last 7 days: ' + days.map(function (x) { return Math.round(x.m); }).join(', ') }, days.map(function (x) { return h('i', { style: { height: Math.max(3, x.m / mx * 100) + '%' }, title: x.k + ': ' + Math.round(x.m) + ' min' }, h('span', null, x.d)); })); }
  function sw(on, label, fn) { var b = h('button', { type: 'button', class: 'switch', role: 'switch', 'aria-checked': on ? 'true' : 'false', 'aria-label': label }); b.addEventListener('click', function () { var v = b.getAttribute('aria-checked') !== 'true'; b.setAttribute('aria-checked', v ? 'true' : 'false'); VV2.sfx('tap'); fn(v); }); return b; }
  function setRow(title, sub, ctrl) { return h('div', { class: 'set' }, [h('span', null, [h('b', null, title), sub ? h('small', null, sub) : null]), ctrl]); }
  function schoolRings(p) {
    var box = h('div', { class: 'rings' });
    VV2.SCHOOLS.forEach(function (s) {
      var cs = D.bySchool(s.id), tot = 0, dn = 0; cs.forEach(function (c) { tot += c.lessons || 0; for (var i = 1; i <= (c.lessons || 0); i++) if (p.lessons[c.id + '.l' + i]) dn++; });
      box.appendChild(h('a', { href: '#/school/' + s.id, html: VV2.ring(tot ? dn / tot * 100 : 0, 64, s.color, s.name + ': ' + dn + ' of ' + tot + ' lessons') + '<span>' + s.icon + ' ' + VV2.esc(s.name) + '</span>' }));
    });
    return box;
  }

  /* ---------------- REWARDS ---------------- */
  P.rewards = function (main) {
    var p = store.cur(), L = store.level(p.xp); VV2.setTitle(VV2.t('progress')); main.innerHTML = '';
    var w = h('div', { class: 'wrap' }); main.appendChild(w);
    var nB = Object.keys(p.badges).length, nL = Object.keys(p.lessons).length, nE = Object.keys(p.exams).filter(function (k) { return p.exams[k].passed; }).length;
    var acc = p.stats.quizTotal ? Math.round(p.stats.quizRight / p.stats.quizTotal * 100) + '%' : '—';
    w.appendChild(h('section', { class: 'hero' }, [h('div', { class: 'hero-av', html: VV2.avatarSVG(p.avatar, 110) }), h('div', { class: 'hero-txt' }, [h('p', { class: 'eyebrow' }, 'Level ' + L.lvl + ' · ' + L.title), h('h1', null, p.name + '’s trophy room'), h('div', { class: 'xpbar', style: { maxWidth: '420px' } }, h('i', { style: { width: L.pct + '%' } })), h('p', { class: 'hero-sub' }, p.xp + ' XP · ' + (L.to - p.xp) + ' XP to Level ' + (L.lvl + 1))])]));
    w.appendChild(h('div', { class: 'section-h' }, h('h2', null, '📈 At a glance')));
    w.appendChild(h('div', { class: 'stat-grid' }, [stat(p.xp, 'XP'), stat('🔥 ' + (p.streak.n || 0), 'day streak (best ' + (p.streak.best || 0) + ')'), stat(nL, 'lessons finished'), stat(nE, 'exams passed'), stat(mins(p.timeMs), 'time learned'), stat(acc, 'quiz accuracy'), stat(nB + '/' + VV2.BADGES.length, 'badges'), stat(Math.round(store.todayMins()) + '/' + p.goal, 'minutes today')]));
    w.appendChild(h('section', { class: 'card', style: { marginTop: '16px' } }, [h('h3', null, '🗓️ Last 7 days'), chart(p)]));
    var ringsHost = h('div'); w.appendChild(h('div', { class: 'section-h' }, h('h2', null, '🏛️ Progress by school'))); w.appendChild(ringsHost);
    D.index().catch(function () { }).then(function () { ringsHost.appendChild(schoolRings(p)); });
    w.appendChild(h('div', { class: 'section-h' }, [h('h2', null, '🏅 Badges'), h('p', { class: 'muted' }, 'One of them is a secret. The lotus knows.')]));
    w.appendChild(h('div', { class: 'badge-grid' }, VV2.BADGES.map(function (b) { var got = p.badges[b.id], hid = b.id === 'secret' && !got; return h('div', { class: 'badge' + (got ? ' got' : ''), 'aria-label': (hid ? 'Secret badge' : b.name) + (got ? ', earned' : ', not yet') }, [h('span', { class: 'bi', 'aria-hidden': 'true' }, hid ? '❔' : b.icon), h('b', null, hid ? '???' : b.name), h('small', null, hid ? 'A hidden surprise' : got ? 'Earned ' + new Date(got).toLocaleDateString() : b.desc)]); })));
  };

  /* ---------------- GROWN-UPS ---------------- */
  P.parents = function (main) {
    VV2.setTitle(VV2.t('parents')); main.innerHTML = '';
    var w = h('div', { class: 'wrap' }); main.appendChild(w);
    w.appendChild(h('p', { class: 'eyebrow' }, 'For parents & teachers'));
    w.appendChild(h('h1', null, '👪 Grown-ups dashboard'));
    w.appendChild(h('p', { class: 'lead' }, 'Everything here lives only on this device. No accounts, no tracking, no ads — ever.'));
    var list = h('div'); w.appendChild(list);
    function draw() {
      list.innerHTML = '';
      store.profiles().forEach(function (p) {
        var nL = Object.keys(p.lessons).length, last = Math.max.apply(null, [0].concat(Object.keys(p.lessons).map(function (k) { return p.lessons[k].ts || 0; })));
        var goal = h('select', { 'aria-label': 'Daily goal for ' + p.name }); [5, 10, 15, 20, 30, 45, 60].forEach(function (m) { var o = h('option', { value: m }, m + ' min / day'); if (m === p.goal) o.selected = true; goal.appendChild(o); });
        goal.addEventListener('change', function () { p.goal = +goal.value; store.save(); VV2.toast('Daily goal updated', '✅'); });
        var sens = Object.keys(p.sensOK || {}).length, free = Object.keys(p.free || {});
        var card = h('section', { class: 'card', style: { marginBottom: '16px' } }, [
          h('div', { class: 'prof-row' }, [h('span', { html: VV2.avatarSVG(p.avatar, 64) }), h('div', null, [h('h2', { style: { margin: 0 } }, p.name + (p.id === store.s.cur ? ' · active' : '')), h('p', { class: 'muted', style: { margin: 0 } }, (p.age != null ? 'Age ' + p.age + ' · ' : '') + VV2.bandLabel(p.band) + ' · ' + p.mode + ' mode' + (p.guest ? ' · guest' : ''))]), h('b', null, p.xp + ' XP')]),
          h('div', { class: 'stat-grid', style: { marginTop: '12px' } }, [stat(nL, 'lessons'), stat(mins(p.timeMs), 'total time'), stat('🔥 ' + (p.streak.n || 0), 'streak'), stat(Object.keys(p.exams).length, 'exams tried'), stat(last ? new Date(last).toLocaleDateString() : '—', 'last lesson')]),
          h('h3', { style: { marginTop: '14px' } }, 'Last 7 days'), chart(p),
          h('h3', null, 'Time by school'), h('p', { class: 'muted' }, Object.keys(p.timeBy || {}).length ? Object.keys(p.timeBy).map(function (f) { return (VV2.school(f) || { name: f }).name + ' ' + mins(p.timeBy[f]); }).join(' · ') : 'No learning time recorded yet.'),
          h('h3', null, 'Safety & settings'),
          h('div', { class: 'set-list' }, [
            setRow('Hide sensitive topics', 'Removes sensitive courses from this learner’s catalogue (they can still be opened by direct link with your OK).', sw(p.hideSensitive, 'Hide sensitive topics for ' + p.name, function (v) { p.hideSensitive = v; store.save(); })),
            setRow('Grown-up confirmations', sens + ' sensitive course' + (sens === 1 ? '' : 's') + ' confirmed', h('button', { type: 'button', class: 'btn small ghost', disabled: !sens, onclick: function () { p.sensOK = {}; store.save(); VV2.toast('Confirmations cleared', '🕊️'); draw(); } }, 'Reset')),
            setRow('Free exploration', free.length ? free.map(function (f) { return (VV2.school(f) || { name: f }).name; }).join(', ') : 'Off in every school', h('button', { type: 'button', class: 'btn small ghost', disabled: !free.length, onclick: function () { p.free = {}; store.save(); draw(); } }, 'Reset')),
            setRow('Daily goal', null, goal),
            setRow('Remove this profile', 'Deletes this learner’s progress from this device', h('button', { type: 'button', class: 'btn small ghost', onclick: function () { if (confirm('Delete ' + p.name + '’s profile and progress from this device?')) { store.remove(p.id); if (!store.cur()) { VV2.boot(); return; } VV2.applyProfile(); draw(); } } }, '🗑️ Delete'))])]);
        list.appendChild(card);
      });
    }
    draw();
    w.appendChild(h('section', { class: 'card prose' }, [h('h2', null, '🕊️ How sensitive topics work'), h('ul', null, [
      h('li', null, 'Courses on puberty, consent, abuse, bullying, mental health, grief, drugs or crime are marked sensitive and open with a calm note for grown-ups.'),
      h('li', null, 'For under-18 profiles, a grown-up confirms once per course with a quick maths check.'),
      h('li', null, 'Content is medically accurate, age-appropriate and non-explicit, following UNESCO (2018) and WHO guidance.'),
      h('li', null, 'Quick exit: the ✋ button or the Esc key jumps to a neutral page instantly.'),
      h('li', null, 'India: 112 for any emergency · 1098 Childline · 14416 Tele-MANAS mental health.')])]));
  };

  /* ---------------- SETTINGS ---------------- */
  P.settings = function (main) {
    var p = store.cur(); VV2.setTitle(VV2.t('settings')); main.innerHTML = '';
    var w = h('div', { class: 'wrap', style: { maxWidth: '820px' } }); main.appendChild(w);
    w.appendChild(h('h1', null, '⚙️ ' + VV2.t('settings')));
    function a11y(k, v) { p.a11y[k] = v; store.save(); VV2.applyProfile(); }
    w.appendChild(h('h2', null, '🔊 Sound & voice'));
    w.appendChild(h('div', { class: 'set-list' }, [
      setRow('Sound effects', 'Synthesised in your browser — different for every mode', sw(VV2.audio.on, 'Sound effects', function (v) { VV2.enableSound(v); })),
      setRow('Ambient music', 'A soft generative pad (needs sound on)', sw(VV2.audio.ambientOn, 'Ambient music', function (v) { store.dev('ambient', v); if (v && !VV2.audio.on) VV2.enableSound(true); VV2.ambient(v); })),
      setRow('Captions for audio cues', 'Shows what sounds and speech say (always on in Tiny mode)', sw(!!store.dev('captions'), 'Captions', function (v) { store.dev('captions', v); VV2.applyProfile(); })),
      setRow('Read-aloud voice', VV2.canSpeak ? 'Uses your device’s built-in voices' : 'Not available in this browser', h('button', { type: 'button', class: 'btn small', disabled: !VV2.canSpeak, onclick: function () { VV2.say('Namaste! I will read lessons aloud for you.'); } }, '▶ Test'))]));
    w.appendChild(h('h2', null, '♿ Accessibility (this profile)'));
    w.appendChild(h('div', { class: 'set-list' }, [
      setRow('Larger text', null, sw(p.a11y.big, 'Larger text', function (v) { a11y('big', v); })),
      setRow('High contrast', 'Black, white and bright yellow', sw(p.a11y.contrast, 'High contrast', function (v) { a11y('contrast', v); })),
      setRow('Dyslexia-friendly spacing', 'Wider letter, word and line spacing', sw(p.a11y.dys, 'Dyslexia-friendly spacing', function (v) { a11y('dys', v); })),
      setRow('Reduce motion', VV2.sysReduced ? 'Your device already asks for reduced motion' : 'Calms animations and transitions', sw(p.a11y.rm || VV2.sysReduced, 'Reduce motion', function (v) { a11y('rm', v); }))]));
    w.appendChild(h('h2', null, '🎨 Look & language'));
    var lang = h('div', { class: 'seg' }, [['en', 'English'], ['hi', 'हिन्दी']].map(function (l) { return h('button', { type: 'button', class: 'seg-b', 'aria-pressed': VV2.lang === l[0] ? 'true' : 'false', onclick: function () { VV2.setLang(l[0]); store.dev('lang', l[0]); VV2.render(); } }, l[1]); }));
    w.appendChild(h('div', { class: 'set-list' }, [
      setRow('UI mode', 'Currently: ' + p.mode, h('button', { type: 'button', class: 'btn small', onclick: VV2.modePicker }, '🎨 Change')),
      setRow('Navigation language', 'Menus in English or Hindi (lessons stay in their own language)', lang),
      setRow('Campus map', 'Prefer the flat 2D map (saves battery)', sw(!!store.dev('map2d'), '2D map', function (v) { store.dev('map2d', v); }))]));
    w.appendChild(h('h2', null, '💾 Your data'));
    var file = h('input', { type: 'file', accept: 'application/json,.json', class: 'sr', id: 'importFile', 'aria-label': 'Import backup file' });
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return; var rd = new FileReader();
      rd.onload = function () { try { store.importJSON(String(rd.result)); VV2.toast('Backup restored!', '📦'); VV2.applyProfile(); VV2.go('', true); } catch (e) { VV2.toast(e.message || 'That file could not be read.', '⚠️'); } };
      rd.readAsText(f);
    });
    w.appendChild(file);
    w.appendChild(h('div', { class: 'set-list' }, [
      setRow('Export everything', 'All profiles, progress, notes and settings as a JSON file', h('button', { type: 'button', class: 'btn small primary', onclick: exportData }, '⬇️ Export')),
      setRow('Import a backup', 'Replaces the data on this device', h('button', { type: 'button', class: 'btn small', onclick: function () { file.click(); } }, '⬆️ Import')),
      VV2.installEvt ? setRow('Install as an app', 'Works offline from your home screen', h('button', { type: 'button', class: 'btn small', onclick: function () { VV2.installEvt.prompt(); } }, '📲 Install')) : setRow('Install as an app', 'Use your browser’s “Add to Home Screen” / “Install app” menu', h('span', { class: 'muted' }, '📲')),
      setRow('Reset everything', 'Deletes all profiles and progress on this device', h('button', { type: 'button', class: 'btn small ghost', onclick: resetAll }, '🧨 Reset'))]));
    w.appendChild(h('p', { class: 'muted small-note' }, 'VidyaVerse v' + VV2.version + ' · ' + (D.sample ? 'sample catalogue' : D.courses.length + ' courses loaded') + ' · storage: this browser only.'));
  };
  function exportData() {
    try {
      var blob = new Blob([store.exportJSON()], { type: 'application/json' }), url = URL.createObjectURL(blob);
      var a = h('a', { href: url, download: 'vidyaverse-backup-' + VV2.today() + '.json' }); document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000); VV2.toast('Backup downloaded', '💾');
    } catch (e) { VV2.toast('Export is not supported in this browser.', '⚠️'); }
  }
  function resetAll() {
    VV2.adult('Resetting deletes every profile on this device.').then(function (ok) {
      if (!ok) return;
      if (!confirm('Really delete ALL VidyaVerse data on this device? Export first if you want a backup.')) return;
      store.reset(); VV2.toast('Fresh start. The campus gates are open again.', '🌅'); history.replaceState(null, '', '#/'); VV2.boot();
    });
  }

  /* ---------------- PROFILES ---------------- */
  P.profiles = function (main) {
    VV2.setTitle(VV2.t('profiles')); main.innerHTML = '';
    var w = h('div', { class: 'wrap', style: { maxWidth: '820px' } }); main.appendChild(w);
    w.appendChild(h('h1', null, '🧑‍🤝‍🧑 ' + VV2.t('profiles')));
    w.appendChild(h('p', { class: 'lead' }, 'Several learners can share this device — each with their own look, progress and safety settings.'));
    var list = h('div'); w.appendChild(list);
    store.profiles().forEach(function (p) {
      var isCur = p.id === store.s.cur;
      var nm = h('input', { type: 'text', value: p.name, maxlength: 24, 'aria-label': 'Name for ' + p.name });
      nm.addEventListener('change', function () { p.name = nm.value.trim() || p.name; store.save(); VV2.refreshChrome(); });
      list.appendChild(h('div', { class: 'card prof-row', style: { marginBottom: '12px' } }, [h('span', { html: VV2.avatarSVG(p.avatar, 60) }), h('div', null, [nm, h('small', { class: 'muted', style: { display: 'block' } }, VV2.bandLabel(p.band) + ' · ' + p.mode + ' · ' + p.xp + ' XP')]),
        isCur ? h('span', { class: 'pill lv' }, 'Active') : h('button', { type: 'button', class: 'btn small primary', onclick: function () { store.setCur(p.id); VV2.applyProfile(); VV2.sfx('good'); VV2.toast('Hello, ' + p.name + '!', '👋'); VV2.go(''); } }, 'Switch')]));
    });
    w.appendChild(h('div', { class: 'row' }, [h('a', { class: 'btn primary', href: '#/welcome' }, '＋ Add a learner'), h('button', { type: 'button', class: 'btn', onclick: function () { store.add({ name: 'Guest', guest: true, band: 'all', mode: 'campus' }); VV2.applyProfile(); VV2.go(''); } }, '⚡ Guest'), h('a', { class: 'btn ghost', href: '#/parents' }, '👪 Grown-ups dashboard')]));
  };
})();

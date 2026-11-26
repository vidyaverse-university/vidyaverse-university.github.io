/* VidyaVerse v2.3 — Ask the Unaskable (#/unaskable): one calm hub for every awkward / sensitive course,
   grouped by theme, with a PRIVATE search (never stored, never in the URL, never sent), helplines and quick exit.
   Age-gating is NOT re-implemented: links go through VV2.Campus.access (the same guardian gate the player uses). */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var U = VV2.Unaskable = {};
  /* every pack that belongs here (prefix rules; new packs with these prefixes appear automatically) */
  var ANY = /^(well-unusual-|well-taboo-|well-awkward-|wellbeing-unaskable$|wellbeing-sexuality-|well-puberty-|wellbeing-puberty$|well-reproductive$|well-anatomy$|well-relationships$|well-safety$|well-mind$|wellbeing-mental-|wellbeing-bullying$|wellbeing-never-|life-medicines-|life-toxins-|law-forbidden-|life-why-)/;
  var THEMES = [
    { id: 'ask', icon: '📮', title: 'Question boxes for every age', desc: 'The questions people are too shy to ask — sorted by age, answered plainly.', re: /^(well-awkward-|wellbeing-unaskable$)/ },
    { id: 'body', icon: '🫀', title: 'Body', desc: 'Puberty, periods, smells, spots, bathroom questions and how the body works.', re: /^(well-unusual-body|well-puberty-|wellbeing-puberty$|well-anatomy$)/ },
    { id: 'mind', icon: '🧠', title: 'Mind', desc: 'Stress, panic, strange thoughts, low mood, grief, fear and bullying.', re: /^(well-mind$|well-unusual-mind|wellbeing-mental-|wellbeing-never-|wellbeing-bullying$|well-taboo-mind)/ },
    { id: 'rel', icon: '💞', title: 'Relationships & sex', desc: 'Consent, crushes, safety, sexual and reproductive health, identity. Age-gated: younger learners see their age\u2019s courses, and 18+ courses need a grown-up.', re: /^(well-relationships$|well-reproductive$|wellbeing-sexuality-|well-taboo-(sexual-health|relationships|identity|fertility)|well-unusual-social|well-safety$)/, gated: true },
    { id: 'subs', icon: '🚬', title: 'Substances', desc: 'Alcohol, cannabis, vapes, gutka, pills, addiction and recovery — facts, not lectures.', re: /^(well-unusual-substances|well-taboo-addiction)/ },
    { id: 'law', icon: '⚖️', title: 'Law & \u201cis this illegal?\u201d', desc: 'Age rules, police and your rights, online law, drugs and alcohol law in India.', re: /^(well-unusual-legal|law-forbidden-)/ },
    { id: 'meds', icon: '💊', title: 'Medicines & poisons', desc: 'Painkillers, antibiotics, chronic medicines, safe use, toxins at home and first response.', re: /^(life-medicines-|life-toxins-)/ },
    { id: 'why', icon: '❓', title: '\u201cWhy does\u2026?\u201d', desc: 'Why we sneeze, why the sky is blue, why onions make you cry.', re: /^life-why-/ },
    { id: 'more', icon: '🕊️', title: 'More awkward questions', desc: 'Everything else in this hub.', re: /./ }
  ];
  var HELP = [['112', 'Emergency (police, fire, ambulance)', '112'], ['1098', 'Childline \u2014 children in need of care or protection', '1098'], ['14416', 'Tele-MANAS \u2014 free 24\u00d77 mental-health support (also 1-800-891-4416)', '14416'], ['1930', 'Cyber-crime helpline \u2014 online fraud, sextortion (also cybercrime.gov.in)', '1930']];

  function adultOnly(c) { return c.ages && +c.ages[0] >= 18; }
  function themeOf(c) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].re.test(c.pack || '')) return THEMES[i]; return THEMES[THEMES.length - 1]; }
  U.courses = function () { return D.courses.filter(function (c) { return ANY.test(c.pack || ''); }); };
  U.themeOf = themeOf;

  /* open a course through the existing access gate (sensitive + minor -> guardian confirmation) */
  function open(c, lessonId) {
    var go = function () { VV2.go(lessonId ? 'lesson/' + encodeURIComponent(lessonId) : 'course/' + encodeURIComponent(c.id)); };
    if (c.sensitive && store.isMinor() && VV2.Campus && VV2.Campus.access) VV2.Campus.access(c).then(function (ok) { if (ok) go(); });
    else go();
  }
  function link(c, kids, cls, lessonId) {
    return h('a', { class: cls, href: lessonId ? '#/lesson/' + encodeURIComponent(lessonId) : '#/course/' + encodeURIComponent(c.id), onclick: function (e) { if (c.sensitive && store.isMinor()) { e.preventDefault(); open(c, lessonId); } } }, kids);
  }
  function item(c) {
    var pct = store.coursePct(c), lock = adultOnly(c) && store.isMinor() && !store.sensOK(c.id);
    return h('li', null, link(c, [
      h('span', { class: 'ua-i', 'aria-hidden': 'true' }, pct >= 100 ? '✅' : lock ? '🔒' : (c.icon || '🕊️')),
      h('span', { class: 'ua-t' }, [h('b', null, c.title), h('small', null, 'Ages ' + (c.ages || [0, 99]).join('\u2013').replace(/\u201399$/, '+') + ' \u00b7 ' + (c.lessons || 0) + ' lessons \u00b7 ' + VV2.hrs(c.minutes) + (pct > 0 && pct < 100 ? ' \u00b7 ' + pct + '% done' : '') + (lock ? ' \u00b7 18+, a grown-up confirms first' : ''))])
    ], 'ua-item' + (lock ? ' locked' : '')));
  }

  U.render = function (main) {
    VV2.setTitle('Ask the unaskable'); main.innerHTML = '';
    VV2.sensitive(true);
    var w = h('div', { class: 'wrap ua' }); main.appendChild(w);
    w.appendChild(h('div', { class: 'hub-head ua-head' }, [h('div', null, [h('p', { class: 'eyebrow' }, 'Mann \u00b7 a quiet corner'), h('h1', null, '💬 Ask the unaskable'),
      h('p', { class: 'lead' }, 'Too awkward to ask? Ask here \u2014 privately. Calm, factual, non-judgemental answers about bodies, minds, relationships, substances, the law and medicines.'),
      h('p', { class: 'muted' }, 'Nothing you open or type here leaves this device. Press Esc or \u270b Quick exit at any time to jump to a neutral page.')]),
      h('button', { type: 'button', class: 'btn ua-exit', onclick: function () { VV2.quickExit(); } }, '\u270b Quick exit')]));
    /* helplines */
    w.appendChild(h('aside', { class: 'card ua-help', 'aria-label': 'Helplines in India' }, [h('b', null, '📞 If you or someone is in danger or distress, talk to a person now (India, free):'),
      h('ul', null, HELP.map(function (x) { return h('li', null, [h('a', { class: 'ua-tel', href: 'tel:' + x[2] }, x[0]), h('span', null, x[1])]); })),
      h('p', { class: 'muted' }, 'Outside India, call your local emergency number. Women in distress can also call 181.')]));
    /* private search */
    var inp = h('input', { type: 'search', id: 'uaSearch', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Private search of awkward topics', 'aria-describedby': 'uaPriv', placeholder: 'Type your question or a word \u2014 e.g. \u201cwet dreams\u201d, \u201cpanic\u201d, \u201cis vaping illegal\u201d' });
    var res = h('div', { class: 'ua-res', 'aria-live': 'polite' });
    w.appendChild(h('section', { class: 'card ua-search', role: 'search' }, [h('div', { class: 'searchbar' }, [h('span', { class: 'sb-i', 'aria-hidden': 'true' }, '🔒'), inp]),
      h('p', { class: 'muted small-note', id: 'uaPriv' }, 'Private search: it only looks at the course and lesson titles already on this page. What you type is never saved, never added to the address bar or history, and never sent anywhere.'), res]));
    var body = h('div', { class: 'ua-body' }); w.appendChild(body);
    VV2.onLeave(function () { inp.value = ''; res.innerHTML = ''; });
    var load = D.ready ? Promise.resolve() : D.index();
    body.appendChild(h('div', { class: 'skel', 'aria-hidden': 'true' }));
    return load.then(function () {
      body.innerHTML = '';
      var p = store.cur() || {}, hidden = !!p.hideSensitive;
      var list = U.courses().sort(function (a, b) { return (a.ages || [0])[0] - (b.ages || [0])[0] || a.level - b.level; });
      if (hidden) { list = list.filter(function (c) { return !c.sensitive; }); body.appendChild(h('p', { class: 'w-fb', role: 'note' }, 'Sensitive topics are switched off for this profile (Settings). Only general courses are shown. A grown-up can turn them back on in \u2699\uFE0F Settings.')); }
      var tot = D.stats(list);
      body.appendChild(h('p', { class: 'muted ua-count' }, list.length + ' courses \u00b7 ' + tot.lessons + ' lessons \u00b7 ' + VV2.hrsLong(tot.minutes)));
      var jump = h('div', { class: 'ua-jump', role: 'navigation', 'aria-label': 'Themes' }); body.appendChild(jump);
      var byT = {}; list.forEach(function (c) { var t = themeOf(c); (byT[t.id] = byT[t.id] || []).push(c); });
      THEMES.forEach(function (t) {
        var cs = byT[t.id]; if (!cs || !cs.length) return;
        var minor = store.isMinor(), adult = cs.filter(adultOnly), young = cs.filter(function (c) { return !adultOnly(c); });
        var m = D.stats(cs).minutes;
        var sec = h('section', { class: 'card ua-theme', id: 'ua-' + t.id, 'aria-labelledby': 'uah-' + t.id }, [
          h('div', { class: 'ua-theme-h' }, [h('span', { class: 'ua-ti', 'aria-hidden': 'true' }, t.icon), h('div', null, [h('h2', { id: 'uah-' + t.id }, t.title + (t.gated ? ' \u00b7 age-gated' : '')), h('p', { class: 'muted' }, t.desc + ' \u00b7 ' + cs.length + ' courses \u00b7 ' + VV2.hrs(m))])])]);
        var ul = h('ul', { class: 'ua-list' }); sec.appendChild(ul);
        (minor ? young : cs).forEach(function (c) { ul.appendChild(item(c)); });
        if (minor && adult.length) {
          var ul2 = h('ul', { class: 'ua-list' }); adult.forEach(function (c) { ul2.appendChild(item(c)); });
          sec.appendChild(h('details', { class: 'ua-adult' }, [h('summary', null, '🔒 ' + adult.length + ' course' + (adult.length === 1 ? '' : 's') + ' for adults (18+) \u2014 a grown-up must confirm before opening'), ul2]));
        }
        body.appendChild(sec);
        jump.appendChild(h('button', { type: 'button', class: 'chip-b', onclick: function () { var el = document.getElementById('ua-' + t.id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: VV2.reduced ? 'auto' : 'smooth', block: 'start' }); } }, t.icon + ' ' + t.title.replace(/ \u00b7.*$/, '') + ' (' + cs.length + ')'));
      });
      /* private search over titles only (in memory) */
      var ok = {}; list.forEach(function (c) { ok[c.id] = c; });
      var t = 0;
      function run() {
        var v = inp.value.trim(); res.innerHTML = ''; if (v.length < 2) return;
        var hits = [];
        list.forEach(function (c) { var s = VV2.fuzzy(v, c.title); if (s > 0) hits.push({ c: c, s: s * 3 }); });
        D.lessons.forEach(function (l) { var c = ok[l.course]; if (!c) return; var s = VV2.fuzzy(v, l.title); if (s > 0) hits.push({ c: c, l: l, s: s * 2.2 }); });
        hits.sort(function (a, b) { return b.s - a.s; }); hits = hits.slice(0, 24);
        if (!hits.length) { res.appendChild(h('p', { class: 'muted' }, 'Nothing with those words yet. Try a simpler word \u2014 or browse the themes below. You can also ask a trusted adult, a doctor, or call Tele-MANAS 14416.')); return; }
        res.appendChild(h('ul', { class: 'ua-list ua-hits' }, hits.map(function (x) {
          var c = x.c, lock = adultOnly(c) && store.isMinor() && !store.sensOK(c.id);
          return h('li', null, link(c, [h('span', { class: 'ua-i', 'aria-hidden': 'true' }, x.l ? '▶' : (lock ? '🔒' : (c.icon || '🕊️'))), h('span', { class: 'ua-t' }, [h('b', null, x.l ? x.l.title : c.title), h('small', null, (x.l ? c.title + ' \u00b7 ' : '') + themeOf(c).title + (lock ? ' \u00b7 18+' : ''))])], 'ua-item' + (lock ? ' locked' : ''), x.l ? x.l.id : null));
        })));
      }
      inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 120); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); run(); } });
    }).catch(function () { body.innerHTML = ''; body.appendChild(h('div', { class: 'card empty-state' }, [h('p', null, 'The course list could not load. The helplines above always work.'), h('button', { type: 'button', class: 'btn', onclick: function () { VV2.render(); } }, '\u21BB Try again')])); });
  };
})();

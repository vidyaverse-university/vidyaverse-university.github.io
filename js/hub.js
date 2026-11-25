/* VidyaVerse v2 — labs & games hubs and the full-screen launcher (loads labs/<id>.js or games/<id>.js on demand) */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h, store = VV2.store, D = VV2.data;
  var Hub = VV2.Hub = {};
  var cur = null, listed = null;
  var META = { labs: { title: 'Labs', icon: '🧪', eyebrow: 'Prayogshala', lead: 'Hands-on simulations. Break nothing, learn everything. Every lab runs offline once opened.', empty: 'The lab benches are being set up — check back soon. The Dimension Lab is always open!' },
    games: { title: 'Games', icon: '🎮', eyebrow: 'Khel-ghar', lead: 'Practice disguised as play. Short rounds, big smiles, sneaky learning.', empty: 'The games room is being painted. Come back soon — bring snacks.' } };

  Hub.list = function (main, kind) {
    var m = META[kind]; VV2.setTitle(m.title); main.innerHTML = ''; listed = kind;
    var p = store.cur(), w = h('div', { class: 'wrap' }); main.appendChild(w);
    var mine = !!(p && p.band && p.band !== 'all');
    var seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Filter' });
    var q = h('input', { type: 'search', placeholder: 'Filter ' + m.title.toLowerCase() + '…', 'aria-label': 'Filter ' + m.title });
    w.appendChild(h('div', { class: 'hub-head' }, [h('div', null, [h('p', { class: 'eyebrow' }, m.eyebrow), h('h1', null, m.icon + ' ' + VV2.t(kind)), h('p', { class: 'lead' }, m.lead)]), h('div', { class: 'row' }, [seg, q])]));
    var g = h('div', { class: 'hub-grid' }); w.appendChild(g);
    for (var i = 0; i < 6; i++) g.appendChild(h('div', { class: 'skel', 'aria-hidden': 'true' }));
    return D.list(kind).then(function (items) {
      function draw() {
        g.innerHTML = ''; var v = VV2.norm(q.value);
        var shown = items.filter(function (it) { var b = it.bands || ['all']; return (!mine || b.indexOf(p.band) >= 0 || b.indexOf('all') >= 0) && (!v || VV2.fuzzy(v, it.title + ' ' + (it.summary || '')) > 0); });
        if (!shown.length) { g.appendChild(h('div', { class: 'empty-state small' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, '🛠️'), h('p', null, items.length ? 'Nothing for this filter — try “All ages”.' : m.empty)])); return; }
        shown.forEach(function (it, k) {
          var s = VV2.school(it.faculty) || {};
          var b = h('a', { href: '#/' + (kind === 'labs' ? 'lab' : 'game') + '/' + encodeURIComponent(it.id), class: 'card hub-card', style: { '--c': s.color || 'var(--pri)', animationDelay: Math.min(k * 40, 500) + 'ms' }, 'data-say': it.title },
            [h('span', { class: 'hc-i', 'aria-hidden': 'true' }, it.icon || m.icon), h('b', null, it.title), h('small', null, it.summary || ''), h('span', { class: 'hc-b' }, [s.name ? h('span', { class: 'pill' }, s.icon + ' ' + s.name) : null, it.builtin ? h('span', { class: 'pill lv' }, 'built-in') : null].concat((it.bands || []).slice(0, 3).map(function (x) { return h('span', { class: 'pill' }, VV2.bandLabel(x)); })))]);
          g.appendChild(b);
        });
      }
      [[true, 'For ' + (mine ? VV2.bandLabel(p.band) : 'me')], [false, 'All ages']].forEach(function (o) {
        if (o[0] && !(p && p.band && p.band !== 'all')) return;
        seg.appendChild(h('button', { type: 'button', class: 'seg-b', 'aria-pressed': mine === o[0] ? 'true' : 'false', onclick: function (e) { mine = o[0]; VV2.$$('.seg-b', seg).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); e.currentTarget.setAttribute('aria-pressed', 'true'); VV2.sfx('tap'); draw(); } }, o[1]));
      });
      q.addEventListener('input', draw);
      draw(); Hub.items = Hub.items || {}; Hub.items[kind] = items;
    });
  };

  Hub.route = function (main, kind, id) {
    var p = listed === kind && main.querySelector('.hub-grid') ? Promise.resolve() : Hub.list(main, kind);
    return p.then(function () { Hub.open(kind, id, { routed: true }); });
  };

  Hub.close = function (silent) {
    var L = document.getElementById('launcher'); if (!L) return;
    if (cur) { try { if (cur.inst && cur.inst.destroy) cur.inst.destroy(); } catch (e) { } VV2.untrack(); }
    cur = null; L.hidden = true; document.getElementById('launchBody').innerHTML = ''; document.body.classList.remove('has-modal');
    if (!silent) VV2.sfx('whoosh');
  };

  Hub.open = function (kind, id, opts) {
    opts = opts || {};
    var L = document.getElementById('launcher'), body = document.getElementById('launchBody'), title = document.getElementById('launchTitle'), back = document.getElementById('launchBack');
    if (cur) Hub.close(true);
    var token = {}; cur = { kind: kind, id: id, token: token, xp: 0 };
    L.hidden = false; document.body.classList.add('has-modal'); body.innerHTML = '';
    VV2.loading(body, kind === 'labs' ? 'Warming up the Bunsen burners…' : 'Inserting a coin…');
    title.textContent = META[kind].icon + ' ' + id;
    back.onclick = function () { if (opts.routed) { if ((VV2.navCount || 0) > 1) history.back(); else VV2.go(kind, true); } else Hub.close(); };
    L.onkeydown = function (e) { if (e.key === 'Escape' && !document.querySelector('.m-wrap')) { e.preventDefault(); back.onclick(); } };
    setTimeout(function () { try { back.focus(); } catch (e) { } }, 50);
    VV2.sfx('open');
    D.list(kind).then(function (items) {
      var meta = items.filter(function (x) { return x.id === id; })[0] || { id: id, title: id };
      title.textContent = (meta.icon || META[kind].icon) + ' ' + (meta.title || id); VV2.setTitle(meta.title || id);
      var src = id === 'dimension-lab' ? null : kind + '/' + encodeURIComponent(id) + '.js';
      if (!/^[a-z0-9-]+$/i.test(id)) throw new Error('bad id');
      var load = src ? VV2.load(src) : VV2.need('lab-dim');
      return load.then(function () {
        if (!cur || cur.token !== token) return;
        var reg = kind === 'labs' ? window.VVLabs : window.VVGames, def = reg && reg.list ? reg.list.filter(function (x) { return x.id === id; })[0] : null;
        if (!def || typeof def.mount !== 'function') throw new Error('not registered');
        body.innerHTML = '';
        var el = h('div', { class: 'lab-host', 'data-kind': kind }); body.appendChild(el);
        var p = store.cur();
        var api = {
          mode: VV2.mode, reducedMotion: !!VV2.reduced, lowPower: !!VV2.lowPower,
          sound: function (n) { VV2.sfx(n); }, say: function (t) { VV2.say(t); },
          award: function (xp, reason) { if (!cur || cur.token !== token) return; xp = Math.max(0, Math.min(+xp || 0, 50 - cur.xp)); if (xp > 0) { cur.xp += xp; store.addXP(Math.round(xp), reason || meta.title); } },
          done: function (pct) { if (!cur || cur.token !== token) return; pct = Math.round(VV2.clamp(+pct || 0, 0, 100)); store.activity(); VV2.toast((meta.title || id) + ': ' + pct + '%', pct >= 80 ? '🌟' : '👍'); if (pct >= 80) VV2.confetti(VV2.lowPower ? 30 : 70); api.award(10, 'finished ' + (meta.title || id)); },
          t: function (k) { return VV2.t(k); }, profile: { name: p ? p.name : 'Learner', band: p ? p.band : 'all' }
        };
        cur.inst = def.mount(el, api) || null;
        store.badge(kind === 'labs' ? 'lab' : 'game'); if (id === 'dimension-lab') store.badge('dims');
        VV2.track(meta.faculty || def.faculty || null);
      });
    }).catch(function () {
      if (!cur || cur.token !== token) return;
      body.innerHTML = '';
      body.appendChild(h('div', { class: 'lab-fail' }, [h('div', { class: 'es-art', 'aria-hidden': 'true' }, kind === 'labs' ? '🧪' : '🕹️'), h('h2', null, (kind === 'labs' ? 'This lab' : 'This game') + ' is still in the workshop'),
        h('p', { class: 'muted' }, 'We could not load it right now — it may not be built yet, or you might be offline. Everything else still works!'), h('button', { type: 'button', class: 'btn primary', onclick: function () { back.onclick(); } }, '← ' + VV2.t('back'))]));
    });
  };
})();

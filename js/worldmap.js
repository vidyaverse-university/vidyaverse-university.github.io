/* VidyaVerse v2 — campus map: 15 schools around a lotus pond. 3D (three.js r128, lazy from cdnjs) with an accessible 2D fallback */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  function hasGL() { try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } }
  function ang(i) { return i / VV2.SCHOOLS.length * Math.PI * 2 - Math.PI / 2; }

  VV2.Map = {
    mount: function (el) {
      var st = { mode: '2d', three: null, alive: true, sel: -1 };
      el.innerHTML = '';
      var stage = h('div', { class: 'cm-stage' }); el.appendChild(stage);
      var card = h('div', { class: 'cm-card', hidden: true, role: 'dialog', 'aria-label': 'School details' }); el.appendChild(card);
      var bar = h('div', { class: 'cm-bar' }); el.appendChild(bar);
      var hint = h('span', { class: 'cm-hint' }, 'Tap a building to visit'), tog = h('button', { type: 'button', class: 'btn small cm-tog' }, '');
      bar.appendChild(hint); bar.appendChild(tog);
      tog.addEventListener('click', function () { if (st.mode === '3d') { VV2.store.dev('map2d', true); flat(); } else { VV2.store.dev('map2d', false); try3d(true); } });

      function select(i) {
        var s = VV2.SCHOOLS[i]; st.sel = i; VV2.sfx('pop');
        var n = VV2.data.bySchool(s.id).length, pct = VV2.Campus && VV2.Campus.schoolPct ? VV2.Campus.schoolPct(s.id) : 0;
        card.innerHTML = ''; card.style.setProperty('--c', s.color);
        card.appendChild(h('div', { class: 'cm-ch' }, [h('span', { class: 'cm-ci', 'aria-hidden': 'true' }, s.icon), h('div', null, [h('b', null, s.name + ' · ' + s.hi), h('small', null, s.en + ' — ' + s.tag)]), h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Close', onclick: function () { card.hidden = true; st.sel = -1; } }, '✕')]));
        card.appendChild(h('p', { class: 'muted' }, (n ? n + ' course' + (n === 1 ? '' : 's') : 'Opening soon') + ' · ' + Math.round(pct) + '% explored'));
        card.appendChild(h('a', { class: 'btn primary small', href: '#/school/' + s.id }, 'Enter ' + s.name + ' →'));
        card.hidden = false; if (VV2.mode === 'tiny') VV2.say(s.name + '. ' + s.en);
        VV2.$$('.cm-node', stage).forEach(function (b, k) { b.classList.toggle('on', k === i); });
        if (st.three) st.three.focus(i);
      }

      /* ---------- 2D ---------- */
      function flat() {
        if (st.three) { st.three.kill(); st.three = null; }
        st.mode = '2d'; stage.innerHTML = ''; stage.className = 'cm-stage flat';
        var paths = '', ripples = '';
        VV2.SCHOOLS.forEach(function (s, i) { var a = ang(i); paths += '<line x1="500" y1="500" x2="' + (500 + Math.cos(a) * 380).toFixed(0) + '" y2="' + (500 + Math.sin(a) * 380).toFixed(0) + '"/>'; });
        for (var r = 0; r < 3; r++) ripples += '<circle cx="500" cy="500" r="110" class="rip" style="animation-delay:' + r * 1.3 + 's"/>';
        stage.innerHTML = '<svg class="cm-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><radialGradient id="cmG"><stop offset="0" stop-color="#6fcf97"/><stop offset="1" stop-color="#2f7d55"/></radialGradient><radialGradient id="cmW"><stop offset="0" stop-color="#9fe3ff"/><stop offset="1" stop-color="#2a8fbf"/></radialGradient></defs>' +
          '<circle cx="500" cy="500" r="470" fill="url(#cmG)" opacity=".95"/><circle cx="500" cy="500" r="400" fill="none" stroke="#e9d8a6" stroke-width="26" opacity=".7"/><g stroke="#e9d8a6" stroke-width="10" opacity=".55">' + paths + '</g>' +
          '<circle cx="500" cy="500" r="130" fill="url(#cmW)"/>' + ripples + '<g class="cm-lotus" fill="#ff9fc0"><path d="M500 470 q22 30 0 60 q-22 -30 0 -60Z"/><path d="M500 530 q-40 -6 -52 -40 q34 2 52 40Z"/><path d="M500 530 q40 -6 52 -40 q-34 2 -52 40Z"/></g>' +
          '<g fill="#fff" opacity=".5"><circle cx="300" cy="180" r="4"/><circle cx="760" cy="230" r="3"/><circle cx="820" cy="760" r="4"/><circle cx="200" cy="780" r="3"/></g></svg>';
        VV2.SCHOOLS.forEach(function (s, i) {
          var a = ang(i), x = 50 + Math.cos(a) * 38, y = 50 + Math.sin(a) * 38;
          var b = h('button', { type: 'button', class: 'cm-node', style: { left: x + '%', top: y + '%', '--c': s.color, animationDelay: (i * 50) + 'ms' }, 'aria-label': s.name + ', ' + s.en, 'data-nosay': '' }, [h('span', { class: 'cm-ni', 'aria-hidden': 'true' }, s.icon), h('span', { class: 'cm-nl' }, s.name)]);
          b.addEventListener('click', function () { select(i); });
          stage.appendChild(b);
        });
        tog.textContent = '✨ Try 3D'; tog.hidden = !hasGL(); hint.textContent = 'Tap a building to visit';
      }

      /* ---------- 3D ---------- */
      function try3d(force) {
        if (!hasGL()) { tog.hidden = true; return; }
        if (!force && (VV2.reduced || VV2.lowPower || VV2.store.dev('map2d'))) return;
        hint.textContent = 'Loading 3D campus…';
        (window.THREE ? Promise.resolve() : VV2.load(THREE_URL)).then(function () {
          if (!st.alive) return;
          var t = build3d(); if (!t) throw new Error('3d');
          st.three = t; st.mode = '3d'; tog.textContent = '🗺️ 2D map'; hint.textContent = 'Drag to orbit · pinch or scroll to zoom · tap a building';
        }).catch(function () { if (!st.alive) return; flat(); hint.textContent = '3D is unavailable here — enjoy the 2D map.'; tog.hidden = true; });
      }
      function build3d() {
        var T = window.THREE; if (!T) return null;
        var W = stage.clientWidth || 600, H = Math.max(320, Math.min(520, Math.round(W * 0.62)));
        var renderer;
        try { renderer = new T.WebGLRenderer({ antialias: !VV2.lowPower, alpha: true }); } catch (e) { return null; }
        renderer.setPixelRatio(VV2.dpr()); renderer.setSize(W, H);
        var scene = new T.Scene(); scene.fog = new T.Fog(0x2d3f66, 30, 70);
        var cam = new T.PerspectiveCamera(45, W / H, 0.1, 200);
        scene.add(new T.HemisphereLight(0xffe2c0, 0x2a3a5a, 0.85));
        var sun = new T.DirectionalLight(0xffd2a0, 0.9); sun.position.set(10, 20, 8); scene.add(sun);
        var ground = new T.Mesh(new T.CylinderGeometry(19, 20, 1.2, 64), new T.MeshLambertMaterial({ color: 0x3f9a6a })); ground.position.y = -0.6; scene.add(ground);
        var ring = new T.Mesh(new T.RingGeometry(15.2, 16.4, 64), new T.MeshLambertMaterial({ color: 0xe9d8a6, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; scene.add(ring);
        var pond = new T.Mesh(new T.CircleGeometry(5, 48), new T.MeshPhongMaterial({ color: 0x3aa7d8, shininess: 90, emissive: 0x0a3550 })); pond.rotation.x = -Math.PI / 2; pond.position.y = 0.04; scene.add(pond);
        var lotus = new T.Group(), petalM = new T.MeshLambertMaterial({ color: 0xff9fc0, emissive: 0x401020 });
        for (var k = 0; k < 8; k++) { var pt = new T.Mesh(new T.SphereGeometry(0.5, 12, 8), petalM); pt.scale.set(0.45, 0.25, 1); pt.position.set(Math.cos(k / 8 * 6.283) * 0.55, 0.3, Math.sin(k / 8 * 6.283) * 0.55); pt.rotation.y = -k / 8 * 6.283; pt.rotation.x = 0.5; lotus.add(pt); }
        var core = new T.Mesh(new T.SphereGeometry(0.3, 12, 10), new T.MeshLambertMaterial({ color: 0xffd36e, emissive: 0x553300 })); core.position.y = 0.35; lotus.add(core); scene.add(lotus);
        var bld = [], picks = [];
        VV2.SCHOOLS.forEach(function (s, i) {
          var a = ang(i), g = new T.Group(), col = new T.Color(s.color), hgt = 1.6 + (i % 3) * 0.6;
          var mat = new T.MeshLambertMaterial({ color: col, emissive: col.clone().multiplyScalar(0.18) });
          var base = new T.Mesh(new T.BoxGeometry(2.2, hgt, 2.2), mat); base.position.y = hgt / 2; g.add(base);
          var roof = i % 2 ? new T.Mesh(new T.ConeGeometry(1.7, 1.3, 4), new T.MeshLambertMaterial({ color: 0xf4ead2 })) : new T.Mesh(new T.SphereGeometry(1.05, 16, 10, 0, 6.283, 0, Math.PI / 2), new T.MeshLambertMaterial({ color: 0xf4ead2 }));
          roof.position.y = hgt + (i % 2 ? 0.65 : 0); if (i % 2) roof.rotation.y = Math.PI / 4; g.add(roof);
          var win = new T.Mesh(new T.PlaneGeometry(0.9, 0.6), new T.MeshBasicMaterial({ color: 0xfff1b8 })); win.position.set(0, hgt * 0.55, 1.111); g.add(win);
          g.position.set(Math.cos(a) * 11, 0, Math.sin(a) * 11); g.lookAt(0, 0, 0); g.rotateY(Math.PI);
          g.userData.i = i; base.userData.i = i; roof.userData.i = i; win.userData.i = i; picks.push(base, roof, win);
          scene.add(g); bld.push(g);
        });
        var trees = VV2.lowPower ? 10 : 26, tg = new T.ConeGeometry(0.6, 1.8, 7), tm = new T.MeshLambertMaterial({ color: 0x2b6e47 });
        for (var j = 0; j < trees; j++) { var tr = new T.Mesh(tg, tm), ra = Math.random() * 6.283, rr = 16.8 + Math.random() * 2; tr.position.set(Math.cos(ra) * rr, 0.9, Math.sin(ra) * rr); scene.add(tr); }
        var cv = renderer.domElement; cv.className = 'cm-gl'; cv.setAttribute('aria-label', '3D campus map. Use the school buttons below the map if you prefer.');
        stage.innerHTML = ''; stage.className = 'cm-stage gl'; stage.appendChild(cv);
        var labels = VV2.SCHOOLS.map(function (s, i) { var b = h('button', { type: 'button', class: 'cm-lab', style: { '--c': s.color }, 'data-nosay': '' }, s.icon + ' ' + s.name); b.addEventListener('click', function () { select(i); }); stage.appendChild(b); return b; });
        var o = { yaw: 0.6, pitch: 0.62, dist: 34, goalYaw: null, auto: !VV2.reduced }, ptrs = {}, lx = 0, ly = 0, moved = 0, pinch = 0, raf = 0, last = performance.now(), v = new T.Vector3(), ray = new T.Raycaster(), m2 = new T.Vector2();
        function pos(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
        function down(e) { ptrs[e.pointerId] = pos(e); var p = ptrs[e.pointerId]; lx = p.x; ly = p.y; moved = 0; o.auto = false; try { cv.setPointerCapture(e.pointerId); } catch (x) { } }
        function move(e) {
          if (!ptrs[e.pointerId]) return; var p = pos(e); ptrs[e.pointerId] = p; var ids = Object.keys(ptrs);
          if (ids.length === 2) { var A = ptrs[ids[0]], B = ptrs[ids[1]], d = Math.hypot(A.x - B.x, A.y - B.y); if (pinch) o.dist = VV2.clamp(o.dist * pinch / d, 16, 50); pinch = d; moved = 99; return; }
          moved += Math.abs(p.x - lx) + Math.abs(p.y - ly); o.yaw -= (p.x - lx) * 0.008; o.pitch = VV2.clamp(o.pitch + (p.y - ly) * 0.005, 0.2, 1.35); lx = p.x; ly = p.y; o.goalYaw = null;
        }
        function up(e) {
          var p = ptrs[e.pointerId]; delete ptrs[e.pointerId]; pinch = 0;
          if (p && moved < 8) { m2.x = p.x / cv.clientWidth * 2 - 1; m2.y = -(p.y / cv.clientHeight) * 2 + 1; ray.setFromCamera(m2, cam); var hit = ray.intersectObjects(picks)[0]; if (hit) select(hit.object.userData.i); }
        }
        function wheel(e) { e.preventDefault(); o.dist = VV2.clamp(o.dist * (e.deltaY > 0 ? 1.08 : 0.92), 16, 50); }
        cv.style.touchAction = 'none';
        cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move); cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('wheel', wheel, { passive: false });
        function resize() { var w2 = stage.clientWidth || W, h2 = Math.max(320, Math.min(520, Math.round(w2 * 0.62))); renderer.setSize(w2, h2); cam.aspect = w2 / h2; cam.updateProjectionMatrix(); }
        var ro = window.ResizeObserver ? new ResizeObserver(resize) : null; if (ro) ro.observe(stage); else window.addEventListener('resize', resize);
        function frame(now) {
          var dt = Math.min(0.05, (now - last) / 1000); last = now; raf = requestAnimationFrame(frame);
          if (document.hidden || !cv.isConnected) return;
          if (o.goalYaw != null) { var d = Math.atan2(Math.sin(o.goalYaw - o.yaw), Math.cos(o.goalYaw - o.yaw)); o.yaw += d * Math.min(1, dt * 3); if (Math.abs(d) < 0.002) o.goalYaw = null; }
          else if (o.auto) o.yaw += dt * 0.08;
          cam.position.set(Math.sin(o.yaw) * Math.cos(o.pitch) * o.dist, Math.sin(o.pitch) * o.dist, Math.cos(o.yaw) * Math.cos(o.pitch) * o.dist); cam.lookAt(0, 1, 0);
          var t = now / 1000; lotus.rotation.y = t * 0.3; lotus.position.y = Math.sin(t * 1.4) * 0.06;
          bld.forEach(function (b, i) { var sc = i === st.sel ? 1.12 + Math.sin(t * 4) * 0.03 : 1; b.scale.set(sc, sc, sc); });
          renderer.render(scene, cam);
          var cw = cv.clientWidth, chh = cv.clientHeight;
          bld.forEach(function (b, i) { v.set(b.position.x, 4.4, b.position.z).project(cam); var vis = v.z < 1, x = (v.x + 1) / 2 * cw, y = (1 - v.y) / 2 * chh; var L = labels[i]; L.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)'; L.style.opacity = vis ? String(VV2.clamp(1.4 - (cam.position.distanceTo(b.position) - 14) / 30, 0.35, 1)) : '0'; });
        }
        raf = requestAnimationFrame(frame);
        return {
          focus: function (i) { var a = ang(i); o.goalYaw = Math.atan2(Math.cos(a), Math.sin(a)); o.auto = false; },
          kill: function () { cancelAnimationFrame(raf); if (ro) ro.disconnect(); else window.removeEventListener('resize', resize); try { renderer.dispose(); scene.traverse(function (x) { if (x.geometry) x.geometry.dispose(); if (x.material) x.material.dispose(); }); } catch (e) { } stage.innerHTML = ''; }
        };
      }

      flat();
      var later = function () { if (st.alive) try3d(false); };
      if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); setTimeout(later, 300); } }); io.observe(el); st.io = io; } else setTimeout(later, 1200);
      return { destroy: function () { st.alive = false; if (st.io) st.io.disconnect(); if (st.three) st.three.kill(); st.three = null; } };
    }
  };
})();

/* VidyaVerse v2 — widget "scene3d" (interactive 3D scenes, SPEC-X3). Tiny loader: the WebGL engine and the
   preset library are fetched only when a lesson actually shows a 3D scene (js/scene3d-engine.js + js/scene3d-presets.js,
   both same-origin, no CDN, so it also works offline once cached). */
(function () {
  'use strict';
  var VV2 = window.VV2, h = VV2.h;
  var W = VV2.W = VV2.W || {};
  W.scene3d = function (el, a, ctx) {
    var alive = true, inst = null;
    if (VV2.needCss) VV2.needCss('scene3d');
    var box = h('div', { class: 's3-loading', role: 'status' }, '🧊 Loading the 3D model…');
    el.appendChild(box);
    VV2.need(['scene3d-engine', 'scene3d-presets']).then(function () {
      if (!alive) return;
      box.remove();
      inst = VV2.Scene3D.mount(el, a || {}, ctx || {});
    }).catch(function () {
      if (!alive) return;
      box.textContent = 'The 3D model could not be loaded (are you offline and opening it for the first time?). Skip ahead — the quiz still works.';
    });
    return { destroy: function () { alive = false; if (inst && inst.destroy) inst.destroy(); } };
  };
})();

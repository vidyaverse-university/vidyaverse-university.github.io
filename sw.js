/* VidyaVerse v2 service worker — app shell cache-first (with background refresh), packs/labs/games network-first with cache fallback */
var VERSION = 'vv2-2.2.2', CDN_CACHE = 'vv2-cdn-1';
var SHELL = ['./', 'index.html', 'favicon.svg', 'manifest.webmanifest', 'css/base.css', 'css/modes.css', 'css/ui.css', 'css/widgets.css', 'css/welcome.css', 'css/print.css',
  'js/core.js?v=2.2.2', 'js/data.js?v=2.2.2', 'js/store.js?v=2.2.2', 'js/campus.js?v=2.2.2', 'js/app.js?v=2.2.2',
  'js/welcome.js?v=2.2.2', 'js/player.js?v=2.2.2', 'js/widgets-a.js?v=2.2.2', 'js/widgets-b.js?v=2.2.2', 'js/exam.js?v=2.2.2',
  'js/progress.js?v=2.2.2', 'js/hub.js?v=2.2.2', 'js/pages.js?v=2.2.2', 'js/worldmap.js?v=2.2.2',
  'css/code.css?v=2.2.2', 'js/widgets-code.js?v=2.2.2', 'js/codestudio.js?v=2.2.2', 'js/code-editor.js?v=2.2.2', 'js/code-run.js?v=2.2.2', 'js/code-preview.js?v=2.2.2',
  'js/code-node.js?v=2.2.2', 'js/code-mongo.js?v=2.2.2', 'js/code-edu.js?v=2.2.2', 'js/code-edu-rt.js?v=2.2.2', 'js/code-edu-lib.js?v=2.2.2',
  'css/ops.css?v=2.2.2', 'js/widgets-ops.js?v=2.2.2', 'js/labhub.js?v=2.2.2', 'js/roadmaps.js?v=2.2.2', 'js/lab-dim.js?v=2.2.2', 'roadmaps/index.sample.json'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () { }); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION && k !== CDN_CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
function networkFirst(req) {
  return fetch(req).then(function (res) { if (res && res.ok) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, cp); }); } return res; })
    .catch(function () { return caches.match(req, { ignoreSearch: false }).then(function (r) { return r || caches.match(req, { ignoreSearch: true }); }).then(function (r) { if (r) return r; throw new Error('offline'); }); });
}
function cacheFirst(req) {
  return caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) { if (res && (res.ok || res.type === 'opaque')) { var cp = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, cp); }); } return res; }).catch(function () { return hit; });
    return hit || net;
  });
}
/* pinned, versioned CDN files never change: serve from cache without re-downloading (Pyodide is ~8 MB) */
function cdnFirst(req) {
  return caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) { if (res && (res.ok || res.type === 'opaque')) { var cp = res.clone(); caches.open(CDN_CACHE).then(function (c) { c.put(req, cp); }); } return res; });
  });
}
self.addEventListener('fetch', function (e) {
  var req = e.request; if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === location.origin) {
    if (/\/(packs|bundles|labs|games|roadmaps)\//.test(url.pathname)) { e.respondWith(networkFirst(req)); return; }
    if (req.mode === 'navigate') { e.respondWith(fetch(req).catch(function () { return caches.match('index.html'); })); return; }
    e.respondWith(cacheFirst(req)); return;
  }
  if (/(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com)$/.test(url.host)) e.respondWith(cdnFirst(req));
});

/* Ambient Sound Studio - service worker.
 *
 * This file is optional. The app needs no network at all, so it already works
 * offline when opened from disk. Serving it next to index.html with this file
 * present is what lets Chrome / Edge / Android offer a full "Install app"
 * prompt and gives instant repeat loads.
 *
 * Keep it next to index.html. The app registers it automatically over http(s).
 *
 * Navigation requests are NETWORK-FIRST on purpose: a cache-first shell would
 * pin visitors to whichever version they first loaded, so a new deploy would
 * never reach them. We go to the network, fall back to the cache only when
 * offline, and refresh the cached copy on every successful load. Static assets
 * stay cache-first, since they change far less often.
 */
const CACHE = 'ambient-sound-studio-v2';
const SHELL = './index.html';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['./', SHELL]).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // The page itself: network first, cache only as an offline fallback.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE)
            .then((cache) => cache.put(SHELL, copy))
            .catch(() => {});
          return res;
        })
        .catch(() => caches.match(SHELL).then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Everything else: cache-first, then network, and top up the cache.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => hit);
    })
  );
});

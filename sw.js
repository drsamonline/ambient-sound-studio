/* Ambient Sound Studio - service worker.
 *
 * This file is optional. The app needs no network at all, so it already works
 * offline when opened from disk. Serving it next to index.html with this file
 * present is what lets Chrome / Edge / Android offer a full "Install app"
 * prompt and cache the shell for instant loads.
 *
 * Keep it next to index.html. The app registers it automatically over http(s).
 */
const CACHE = 'ambient-sound-studio-v1';
const SHELL = ['./', './index.html'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL).catch(() => {}))
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

  // Navigations: serve the cached shell, fall back to the network.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((hit) => hit || fetch(req)).catch(() => caches.match('./'))
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

const CACHE_NAME = 'webpack-preact-jest-starter-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

const CACHE_NAME = 'omni-dhn-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/about.html',
  '/css/custom.css',
  '/js/bootstrap.js',
  '/js/jquery-3.4.1.min.js',
  '/js/custom.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch and Cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

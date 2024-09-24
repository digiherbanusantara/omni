let basePath = window.location.hostname === 'localhost' ? '/' : '/omni/';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        `${basePath}`,
        `${basePath}index.html`,
        `${basePath}about.html`,
        `${basePath}login.html`,
        `${basePath}css/style.css`,
        `${basePath}js/main.js`,
        `${basePath}codcrm.html`,
        `${basePath}tfcrm.html`,
        `${basePath}images/pwa.png`
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

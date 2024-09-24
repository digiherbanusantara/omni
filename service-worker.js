self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/omni/',
        '/omni/index.html',
        '/omni/about.html',
        '/omni/login.html',
        '/omni/css/style.css',
        '/omni/js/main.js',
        '/omni/codcrm.html',
        '/omni/tfcrm.html',
        '/omni/images/pwa.png'
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/login.html',
        '/css/style.css',
        '/js/main.js',
        '/codcrm.html',
        '/tfcrm.html',
        '/images/pwa.png'
        
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

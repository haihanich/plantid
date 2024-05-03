self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('app-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/script.js',
          '/style.css',
          '/icon.png', // пути к файлам, которые вы хотите закэшировать
          '/icon-512x512.png'
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
  
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      clients.forEach((client) => {
        if (client instanceof WindowClient) {
          client.navigate(client.url);
        }
      });

      return Promise.resolve();
    })
    .then(() =>
      self.caches
        .keys()
        .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => self.caches.delete(cacheName)))),
    );
});

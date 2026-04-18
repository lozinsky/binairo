/// <reference types="@types/serviceworker" />

globalThis.addEventListener('install', () => {
  void globalThis.skipWaiting();
});

globalThis.addEventListener('activate', () => {
  void globalThis.registration
    .unregister()
    .then(() => globalThis.clients.matchAll())
    .then((clients) => {
      clients.forEach((client) => {
        if (client instanceof globalThis.WindowClient) {
          void client.navigate(client.url);
        }
      });
    })
    .then(() =>
      globalThis.caches
        .keys()
        .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => globalThis.caches.delete(cacheName)))),
    );
});

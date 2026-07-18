const CACHE_NAME = 'elevadores-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  // Adicione abaixo os ficheiros das manobras à medida que os criar:
  'ako-542107.html',
  'aliseu-itala.html',
  'ameng-artesanal.html',
  'carlossilva-crono.html',
  'otis-mcs220.html',
  'schindler-bionic1.html'
];

// Instalação: Grava os ficheiros na memória local
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação: Limpa caches antigas se atualizar a versão
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceção de pedidos: Se estiver offline, carrega a cópia local
self.addEventListener('fetch', event => {
  event.waitUntil(
    self.registration.showNotification
  );
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

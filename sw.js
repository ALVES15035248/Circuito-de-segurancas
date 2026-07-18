// Apenas UM nome para o baú de memória (sempre que atualizar o site, mude para v2, v3, etc.)
const CACHE_NAME = 'elevadores-cache-v1';

// Todos os ficheiros (HTML e Imagens) que a app vai guardar para funcionar offline
const urlsToCache = [
  'index.html',
  'manifest.json',
  
  // Páginas HTML das Manobras
  'ako-542107.html',
  'aliseu-itala.html',
  'ameng-artesanal.html',
  'carlossilva-crono.html',
  'otis-mcs220.html',
  'schindler-bionic1.html',
  
  // IMAGENS / FOTOS (Substitua pelos nomes exatos dos seus ficheiros de imagem)
  // Exemplo se as fotos estiverem na mesma pasta:
  'ako-542107.jpg',
  'aliseu-itala.jpg',
  'ameng-artesanal.jpg',
  'carlossilva-crono.jpg'
];

// Instalação: Grava os ficheiros na memória local
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação: Limpa as versões antigas da cache automaticamente
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

// Interceção de pedidos: Serve os ficheiros locais instantaneamente
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

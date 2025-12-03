const CACHE_NAME = 'umademats-game-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './iconejogo.JPG',
  './mascote.png',
  './mascoteuma.png',
  './mascoteaviao.png',
  './cenario.png',
  './background.png',
  './backgournd.png', // Mantido conforme o HTML original
  './image.PNG',
  './musica.mp3'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto com sucesso');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições (Offline support)
// Requisito obrigatório para PWA instalável no Android
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se encontrar no cache, retorna o recurso cacheado
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request);
      })
  );
});

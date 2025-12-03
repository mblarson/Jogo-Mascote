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
  './backgournd.png', // Notei que no seu HTML tem esse typo, mantive para garantir
  './image.PNG',
  './musica.mp3'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
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
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições (Offline support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

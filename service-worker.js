// Nombre del caché
const CACHE_NAME = "mi-app-cache-v1";

// Archivos que quieres que funcionen sin conexión
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/icon.png",
];

// Instalar y guardar archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar y eliminar versiones antiguas del caché
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Eliminando caché antiguo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar peticiones y servir desde caché si no hay red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el archivo está en caché, lo devuelve. Si no, lo pide al servidor.
      return response || fetch(event.request);
    })
  );
});

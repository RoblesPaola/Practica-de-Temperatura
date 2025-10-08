const CACHE_NAME = "converter-cache-v2";
const urlsToCache = ["/", "/index.html", "/converter.css", "/converter.js"];

// Instalar SW y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Limpiar caché antiguo
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((n) => n !== CACHE_NAME && caches.delete(n)))
    )
  );
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
});

// Escuchar notificaciones push
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notificación";
  const options = {
    body: data.body || "Tienes un nuevo mensaje",
    icon: "/icon.png",
    badge: "/icon.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

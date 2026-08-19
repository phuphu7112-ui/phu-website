const CACHE_NAME = "phu-phu-website-v1";
const CHATGPT_SHARE_URL = "https://chatgpt.com/share/6a8585a9-8428-83ec-ae68-d71207959f7e";

const APP_FILES = [
  "./",
  "./index.html",
  "./resume.html",
  "./hobby.html",
  "./grading.html",
  "./convertor.html",
  "./change.html",
  "./distance.html",
  "./style.css",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});

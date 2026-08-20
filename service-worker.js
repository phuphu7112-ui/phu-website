const CACHE_NAME = "phu-phu-website-v3";
const CHATGPT_SHARE_URL = "https://chatgpt.com/share/6a8585a9-8428-83ec-ae68-d71207959f7e";
const FILES = [
 "./index.html",
 "./hobby.html",
 "./grading.html",
 "./convertor.html",
 "./change.html",
 "./distance.html",
 "./style.css",
 "./manifest.json"
];
self.addEventListener("install", event => {
 event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
 self.skipWaiting();
});
self.addEventListener("activate", event => {
 event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
 if(event.request.method==="GET"){
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
 }
});

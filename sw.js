// Basic offline cache for GitHub Pages
const CACHE='gtag-v1';
const ASSETS=['/','/index.html'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    try{let cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}catch(_){ }
    return res;
  })))
});

var cacheName = 'offline-demo-2';
var cacheFiles = [
    '/',
    '/images/p.jpeg',
    '/common.css'
]

//self => 서비스 스콥 자체 
self.addEventListener('install' , function(event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache) {
                //캐시 파일이 정상적으로 만들어졌을때
                return cache.addAll(cacheFiles);
            })
            .catch(function(error){
                console.log(error);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                //fetch : 네트워크 
                return fetch(event.request);
            })
            .catch(function(error){
                if(error){
                    console.log(error);
                }
            })
    );
});
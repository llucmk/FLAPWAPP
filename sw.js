
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('flapwapp').then(function(cache) {
            return cache.addAll([

            ]);
        })
    );
});


'use strict';

var cacheVersion = 1;
var currentCache = {
    offline: 'offline-cache' + cacheVersion
};

this.addEventListener('install', event => {
    event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/js/main.js',
            '/js/jquery-3.3.1.min.js',
            '/assets/ceiling.png',
            'favicon.ico',
            '/assets/flaprite.png',
            '/assets/land.png',
            '/assets/pipe.png',
            '/assets/pipe-down.png',
            '/assets/pipe-up.png',
            '/assets/sky.png'
        ]);
    })
);
});


this.addEventListener('fetch', event => {
    // request.mode = navigate isn't supported in all browsers
    // so include a check for Accept: text/html header.
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
        fetch(event.request.url).catch(error => {
            // Return the offline page
            return caches.match(index.html);
})
);
}
else{
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    );
}
});
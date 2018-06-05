
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('airhorner').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.html?homescreen=1',
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


self.addEventListener('fetch', function(event) {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );

});
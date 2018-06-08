

var APP_PREFIX = 'FLAPWAPP_'     // Identifier for this app.
var VERSION = 'version_02'              // Version of the off-line cache.
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // An array with the all the files I want to get inside cache.
    '/FLAPWAPP/',
    '/FLAPWAPP/index.html',
    '/FLAPWAPP/favicon.ico',
    '/FLAPWAPP/fonts/orange_kid.ttf',
    '/FLAPWAPP/css/style.css',
    '/FLAPWAPP/js/main.js',
    '/FLAPWAPP/js/jquery-3.3.1.min.js',
    '/FLAPWAPP/assets/flaprite.png',
    '/FLAPWAPP/assets/land.png',
    '/FLAPWAPP/assets/pipe.png',
    '/FLAPWAPP/assets/pipe-up.png',
    '/FLAPWAPP/assets/pipe-down.png',
    '/FLAPWAPP/assets/score-panel.png',
    '/FLAPWAPP/assets/replay.png',
    '/FLAPWAPP/assets/sky.png'

]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                return request
            } else {       // if there are no cache, try fetching request
                return fetch(e.request)
            }

        })
    )
})

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS);
        })
    )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {

            var cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX)
            })
            // add current cache name to white list
            cacheWhitelist.push(CACHE_NAME)

            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i] )
                    return caches.delete(keyList[i])
                }
            }))
        })
    )
})
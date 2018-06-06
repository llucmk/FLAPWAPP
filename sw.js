

var APP_PREFIX = 'FLAPWAPP_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
    '/{FLAPWAPP}/',                     // If you have separate JS/CSS files,
    '/{FLAPWAPP}/index.html',           // add path to those files here.
    '/{FLAPWAPP}/favicon.ico',
    '/{FLAPWAPP}/css/style.css',
    '/{FLAPWAPP}/js/main.js',
    '/{FLAPWAPP}/js/jquery-3.3.1.min.js',
    '/{FLAPWAPP}/assets/flaprite.png',
    '/{FLAPWAPP}/assets/land.png',
    '/{FLAPWAPP}/assets/pipe.png',
    '/{FLAPWAPP}/assets/pipe-down.png',
    '/{FLAPWAPP}/assets/sky.png'

]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
            } else {       // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

        })
    )
})

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(URLS)
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
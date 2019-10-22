let staticCacheName = 'restaurant-cache-1';
let cacheAssets = [
    './',
	'./index.html',
	'./restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
	'./js/main.js',
	'./js/dbhelper.js',
	'./js/restaurant_info.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/2.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg',
	'./img/restaurant_icons.png'
];

/*
* Install event listener service worker to open caceh and cache needed assets
*/

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(cacheAssets);
        })
    );
});

/*
* Activate service worker
*/
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    )
})

/*
* Fetch data and send request to page
*/

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            //Return cached version or fetch
            return response || fetch(event.request);
        })
    );
})

/**
 * Used resources to assist with service worker implementation
 * https://www.youtube.com/watch?v=TxXwlOAXUko
 * 
 */
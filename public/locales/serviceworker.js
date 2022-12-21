var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function (event) {
    //console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                //console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    '/', // internet olmasa bile bu sayfayı cache ettiriyoruz. Sayfa daha önceden ziyaret edilmese bile bu sayfa cache edilir.
                    '/css/app.css',
                    '/js/app.js',
                    '/images/icons/icon-72x72.png',
                    '/images/icons/icon-96x96.png',
                    '/images/icons/icon-128x128.png',
                    '/images/icons/icon-144x144.png',
                    '/images/icons/icon-152x152.png',
                    '/images/icons/icon-192x192.png',
                    '/images/icons/icon-384x384.png',
                    '/images/icons/icon-512x512.png',
                    '/images/icons/splash-640x1136.png',
                    '/images/icons/splash-750x1334.png',
                    '/images/icons/splash-1242x2208.png',
                    '/images/icons/splash-1125x2436.png',
                    '/images/icons/splash-828x1792.png',
                    '/images/icons/splash-1242x2688.png',
                    '/images/icons/splash-1536x2048.png',
                    '/images/icons/splash-1668x2224.png',
                    '/images/icons/splash-1668x2388.png',
                    '/images/icons/splash-2048x2732.png'
                ]);
            })
    )
});

self.addEventListener('activate', function (event) {
    //console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        //console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    if (event.request.url.startsWith('http')) {
        event.respondWith(
            fetch(event.request)
                .then(function (res) {
                    return caches.open(CACHE_DYNAMIC_NAME)
                        .then(function (cache) {
                            cache.put(event.request.url, res.clone());
                            return res;
                        })
                })
                .catch(function (err) {
                    return caches.match(event.request);
                })
        );
    }
});

self.addEventListener('notificationclose', function (event) {
    console.log('Notification was closed', event);
});


self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;

    if (action === 'confirm') {
        notification.close();
    } else {
        console.log(action);
        event.waitUntil(
            clients.matchAll()
                .then(function(clis) {
                    var client = clis.find(function(c) {
                        return c.visibilityState === 'visible';
                    });

                    if (client !== undefined) {
                        client.navigate(notification.data.url);
                        client.focus();
                    } else {
                        clients.openWindow(notification.data.url);
                    }
                    notification.close();
                })
        );
    }
});



self.addEventListener("push", e => {
    const data = e.data.json();
    console.log(data.actions);
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        vibrate: data.vibrate,
        dir: "ltr",
        image: data.image,
        lang: data.lang,
        data: {
            url: data.data.openUrl
        },
        actions: data.actions.map(action => {
            return {
                action: action.action,
                title: action.title,
                icon: action.icon
            };
        })
    }).then(r => console.log(r)).catch(err => console.log(err))
});

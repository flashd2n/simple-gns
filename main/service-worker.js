importScripts("/web.worker.umd.js");

/* eslint-disable no-restricted-globals */
self.addEventListener('activate', async () => {
    self.clients.claim();
    console.log('service worker activate');
});

self.addEventListener("fetch", function (event) {
    //console.log("??", "fetch", event);
    // event.respondWith(fetch(event.request));
});

self.GlueWebWorker({
    platform: {
        openIfMissing: true
    }
});

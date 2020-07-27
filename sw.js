importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox) {
    console.log("Workbox berhasil dimuat");
    
    workbox.precaching.precacheAndRoute([
        {url:'/push.js',revision:'1'},
        {url:'/nav.html',revision:'1'},
        {url:'/index.html',revision:'1'},
        {url:'/manifest.json',revision:'1'},
        {url:'/nav.html',revision:'1'},
    ]);
    
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName:'pages'
    })
    );

    workbox.routing.registerRoute(
      new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName:'js'
  })
  );

  workbox.routing.registerRoute(
    new RegExp('/css/'),
workbox.strategies.staleWhileRevalidate({
    cacheName:'css'
})
);

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
          cacheName: 'images',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
          ],
        }),
      );
      
      workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
        })
      );

      workbox.routing.registerRoute(
        /^https:\/\/api\.football-data\.org/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'football-data',
        })
      );
} else {
    console.log("Workbox gagal dimuat");
    
}

   self.addEventListener('push',event=>{
       let body;
       if (event.data) {
           body = event.data.text();
       }else{
           body = 'Push message no payload';
       }
       const options ={
        body: body,
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
       }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification',options)
    );
   });
if("serviceWorker" in navigator){
    registerServiceWorker();
    requestPermission();
}else{
    console.log("ServiceWorker belum didukung browser ini.");
    
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
    .then( ()=> {
        console.log("Pendaftaran service worker berhasil");
        
    }).catch( (err)=> {
        console.error("Pendaftaran service worker gagal",err);
        
    });
}

function requestPermission() {
    if ('Notification' in window) {
    Notification.requestPermission().then(result=>{
        if(result === "denied"){
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
            
        } else if(result ==="default") {
            console.error("Pengguna menutup kotak dialog permntaan ijin.");
            return;
        }
    
        navigator.serviceWorker.ready.then(()=>{

       if(('PushManager' in window)){
           navigator.serviceWorker.getRegistration().then(registration=>{
               registration.pushManager.subscribe({
                   userVisibleOnly:true,
                   applicationServerKey:urlBase64ToUint8Array('BJLA9kQP8P2LodmZb-w0fX5C2OxiYtHIWBLXTY2HQ4L9LZ-GYDymkwwG3an0fuWLY4QAbPp_pWEuhJmEzKxZOyw')
               }).then(subscribe=>{
                   console.log('berhasil melakukan subscribe dengan endPoint:',subscribe.endpoint);
                   console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
               }).catch(e=>{
                   console.error("Tidak dapat melakukan subscribe",e.message);
                   
               })
           })
       }
    });
});
}
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function favorite(team){
    favoriteTeam(team);
}

function deleteFavorite(id) {
  
     deleteTeam(id);  
}

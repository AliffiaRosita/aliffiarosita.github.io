const webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BJLA9kQP8P2LodmZb-w0fX5C2OxiYtHIWBLXTY2HQ4L9LZ-GYDymkwwG3an0fuWLY4QAbPp_pWEuhJmEzKxZOyw",
    "privateKey":"oBbbe36-yxC2I3Wb5NKdL-CsI7LFsBof_-WGhmlwubs"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e_khcK_1JwI:APA91bF5SNyN7OrcnRgNNSVxncvfa2o0rsFMFo5afw-yczT-ifHUarBT2gCTBeCTgp4-DElahtWTXyzNkxOyVhM_ujtbBORJ6ggGZNlFpizbtw6unoP1XbkoxpNvPkIwXH866ODS9rXq",
   "keys": {
       "p256dh": "BCcK7U/td/4p3mcDK99G7jKHogzpPlwDkH0ZmXHse/9wlgPca6my54by5jilZjCDJ1t8PICcQ4IFjh9DImcWbck=",
       "auth": "j1urB5NAeVAGwH3XkC3WRQ=="
   }
}

const payload = "Aplikasi sudah dapat menerima notifikasi";

const options={
    gcmAPIKey: '651101583133',
   TTL: 60,

};

webPush.sendNotification(
    pushSubscription,
    payload,
    options 
)
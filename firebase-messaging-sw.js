// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {  
    authDomain: "sauvvitech-e6b9c.firebaseapp.com",
    apiKey: "AIzaSyCgHpbq5-JlDhxaABnkNmqiMj-E-oYA6hg",
    appId: "1:601401587384:android:1b69a7e478cd58b090664d",
    messagingSenderId: "601401587384",
    projectId: "sauvvitech-e6b9c",
    storageBucket: "sauvvitech-e6b9c.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log(payload)
    // const notificationTitle = payload.data.titulo;
    // const notificationOptions = {
    //     icon: "/assets/images/logo.png",
    //     body: payload.data.remetente,
    // };
    // console.log(payload)
    // self.onnotificationclick = function (event) {
    //     event.waitUntil(
    //         clients
    //             .matchAll({
    //                 type: "window",
    //             })
    //             .then((clientList) => {
    //                 for (const client of clientList) {
    //                     if (client.url === "/" && "focus" in client)
    //                         return client.focus();
    //                 }
    //                 if (clients.openWindow)
    //                     return clients.openWindow("/agenda");
    //             }),
    //     );
    // };
    // self.registration.showNotification(notificationTitle, notificationOptions);
});


/** ARQUIVO DEPRECIADO */
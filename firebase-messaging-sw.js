// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//     //  measurementId: "YOURDATA",
//     apiKey: "AIzaSyDp_xRoiDNfhlFk0_W6Bzzk9ioRPUdZukk",
//     authDomain: "js-teste-30407.firebaseapp.com",
//     projectId: "js-teste-30407",
//     storageBucket: "js-teste-30407.appspot.com",
//     messagingSenderId: "260477091428",
//     appId: "1:260477091428:web:87d15f76b17473bc6d6971",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     const notificationTitle = payload.data.titulo;
//     const notificationOptions = {
//         body: payload.data.remetente,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

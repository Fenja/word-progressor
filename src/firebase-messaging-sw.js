// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  apiKey: "AIzaSyCm4h837SkCn6iWFNtFC4ba9NkpNcdKULg",
  authDomain: "wordprogressor.firebaseapp.com",
  databaseURL: "https://wordprogressor-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "wordprogressor",
  storageBucket: "wordprogressor.appspot.com",
  messagingSenderId: "563588729440",
  appId: "1:563588729440:web:37b5e38169611691919105",
  measurementId: "G-K7ET50KX5C"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

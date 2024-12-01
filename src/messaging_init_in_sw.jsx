import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase configuration (same as in your app)
const firebaseConfig = {
    apiKey: "AIzaSyCEux7ZCMcS8OS7t927NV1sN75QBY6IMcg",
    authDomain: "testapp-e8c6e.firebaseapp.com",
    projectId: "testapp-e8c6e",
    storageBucket: "testapp-e8c6e.firebasestorage.app",
    messagingSenderId: "771284214796",
    appId: "1:771284214796:web:8d6d06ac532cdb0ebffa29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(app);

// Function to request notification permissions and get token
async function requestPermission() {
    console.log('Requesting notification permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('Notification permission granted.');

        try {
            // Register the service worker
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker registered: ', registration);

            // Get the FCM token
            const token = await getToken(messaging, {
                vapidKey: 'BDMj6P3n8wJN2n17lq_902YNSaGmtbgVazWTPgvmRg9AXooaMdA85DKV_LNj6YsEUmHn6119uCN6hj-uKTP8Kug',
                serviceWorkerRegistration: registration, // Pass the registered service worker
            });

            if (token) {
                console.log('FCM Token: ', token);
            } else {
                console.log('No registration token available.');
            }
        } catch (error) {
            console.error('Error getting token or registering service worker: ', error);
        }
    } else {
        console.log('Notification permission not granted.');
    }
}

// Request notification permission on load
requestPermission();

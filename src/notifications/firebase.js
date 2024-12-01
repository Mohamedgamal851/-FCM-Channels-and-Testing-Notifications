import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration (same as in your app)
const firebaseConfig = {
    apiKey: "###",// Add your API key here
    authDomain: "###",// Add your authDomain here
    projectId: "###",// Add your project ID here
    storageBucket: "###",// Add your storage bucket here
    messagingSenderId: "###",// Add your messaging sender ID here
    appId: "###",// Add your app ID here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === 'granted') {
      try {
        const token = await getToken(messaging, {
            vapidKey: '###',   // Add your VAPID key here
        });
        console.log("FCM token " , token);
        return token;
      } catch (error) {
        console.error("Error in generating token:", error);
      }
    }
    else {
      console.log('Permission not granted');
    }
    
    
};

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    if(Notification.permission === 'granted') {
      const notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png', // Add your icon URL here
      });
    }
  });


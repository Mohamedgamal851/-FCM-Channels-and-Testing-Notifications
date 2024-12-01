const express = require("express");
const cors = require("cors");
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');// Add your service account key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Use CORS middleware
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend's URL

app.use(express.json()); // To parse JSON bodies

// Function to send a notification
const sendNotification = async (topic, title, body) => {
  const message = {
    notification: { title, body },
    topic,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Subscribe route
app.post("/subscribe", async (req, res) => {
    console.log(req.body);
    const { token, topic } = req.body;
    if (!token || !topic) {
      return res.status(400).json({ error: 'Token or topic is missing' });
    }
  
    try {
      // Subscribe to the topic
      await admin.messaging().subscribeToTopic([token], topic);
  
      // Send notification after subscribing
      const message = {
        notification: {
          title: "Test Notification",
          body: `You have been subscribed to ${topic} notifications.`,
        },
        topic: topic,
      };
  
      // Send the message
      await admin.messaging().send(message);
      res.status(200).json({ message: `Subscribed to ${topic}` });
    } catch (error) {
      console.error("Error subscribing to topic:", error);
      res.status(500).json({ error: "Failed to subscribe to topic" });
    }
  });
  
  app.post("/unsubscribe", async (req, res) => {
    console.log(req.body);
    const { token, topic } = req.body;
    if (!token || !topic) {
      return res.status(400).json({ error: "Token or topic is missing" });
    }
  
    try {
      // Unsubscribe from the topic
      await admin.messaging().unsubscribeFromTopic([token], topic);
  
      // Send a direct notification to the device
      const message = {
        notification: {
          title: "Unsubscribe Notification",
          body: `You have been unsubscribed from ${topic} notifications.`,
        },
        token, // Directly target the device using its token
      };
  
      // Send the message
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
  
      res.status(200).json({ message: `Unsubscribed from ${topic} and notification sent.` });
    } catch (error) {
      console.error("Error unsubscribing from topic:", error);
      res.status(500).json({ error: "Failed to unsubscribe from topic" });
    }
  });
  
  

// Start the server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const admin = require("firebase-admin");

const subscribeToTopic = async (token, topic) => {
  await admin.messaging().subscribeToTopic(token, topic);
};

const unsubscribeFromTopic = async (token, topic) => {
  await admin.messaging().unsubscribeFromTopic(token, topic);
};

module.exports = { subscribeToTopic, unsubscribeFromTopic };

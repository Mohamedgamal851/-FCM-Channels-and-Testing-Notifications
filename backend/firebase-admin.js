const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');// Add your service account key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



module.exports = admin;
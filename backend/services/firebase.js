const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let db;
let auth;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('[Firebase Service] Successfully connected to live Firebase Firestore.');
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('[Firebase Service] Connected to live Firebase using Application Default Credentials.');
  } else {
    throw new Error('No Firebase configuration variables found.');
  }
} catch (error) {
  console.error(`[FATAL ERROR] Firebase Initialization Failed: ${error.message}`);
  console.error('Please ensure FIREBASE_SERVICE_ACCOUNT_KEY is set correctly in your backend .env file.');
  process.exit(1); // Force exit if database connection fails
}

module.exports = {
  db,
  auth,
  admin
};

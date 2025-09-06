const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// In production, use service account key file or default credentials
const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      // For development: use service account key
      if (process.env.NODE_ENV === 'development' && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
        const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      } 
      // For production: use environment variables
      else if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            clientId: process.env.FIREBASE_CLIENT_ID,
            authUri: process.env.FIREBASE_AUTH_URI,
            tokenUri: process.env.FIREBASE_TOKEN_URI,
          }),
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      } else {
        console.log('Firebase not initialized - missing configuration');
        return null;
      }
      
      console.log('Firebase Admin initialized successfully');
      return admin;
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
      return null;
    }
  }
  return admin;
};

// Initialize Firebase
const firebaseAdmin = initializeFirebase();

// Export Firebase services
const auth = firebaseAdmin ? firebaseAdmin.auth() : null;
const firestore = firebaseAdmin ? firebaseAdmin.firestore() : null;

module.exports = {
  admin: firebaseAdmin,
  auth,
  firestore
};

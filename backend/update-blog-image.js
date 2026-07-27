require('dotenv').config();
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

const db = admin.firestore();

async function run() {
  const snapshot = await db.collection('blogs').where('slug', '==', 'gau-seva').get();
  if (snapshot.empty) {
    console.log('Blog not found in database');
  } else {
    console.log('Blog found in database');
    const doc = snapshot.docs[0];
    await doc.ref.update({
      coverImage: 'https://iskconmumbaipull-21250.kxcdn.com/web/image/2314-6e6f1f25/gau3.webp'
    });
    console.log('Blog image updated successfully in database.');
  }
}
run().catch(console.error);

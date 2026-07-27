require('dotenv').config();
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

const db = admin.firestore();

async function run() {
  const snapshot = await db.collection('blogs').where('slug', '==', 'overcoming-anxiety').get();
  if (snapshot.empty) {
    console.log('Blog not found in database');
  } else {
    console.log('Blog found in database');
    const doc = snapshot.docs[0];
    await doc.ref.update({
      coverImage: 'https://bestmindbh.com/wp-content/uploads/tms-for-anxiety.webp'
    });
    console.log('Blog image updated successfully in database.');
  }
}
run().catch(console.error);

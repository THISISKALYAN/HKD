const { db } = require('./services/firebase');

async function check() {
  const docRef = db.collection('pages_content').doc('folk-gallery');
  const doc = await docRef.get();
  if (doc.exists) {
      console.log(JSON.stringify(doc.data(), null, 2));
  } else {
      console.log("Document does not exist");
  }
}
check().then(() => process.exit(0));

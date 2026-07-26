require('dotenv').config();
const { db } = require('./services/firebase');

async function test() {
  try {
    const leadsSnapshot = await db.collection('leads').get();
    console.log('Leads:', leadsSnapshot.size);
    const blogsSnapshot = await db.collection('blogs').get();
    console.log('Blogs:', blogsSnapshot.size);
    const paymentsSnapshot = await db.collection('payments').where('status', '==', 'captured').get();
    console.log('Payments:', paymentsSnapshot.size);
  } catch (error) {
    console.error('Error:', error);
  }
}
test();

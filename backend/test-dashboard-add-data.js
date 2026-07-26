const { db } = require('./services/firebase');

async function run() {
  try {
    await db.collection('leads').add({ name: 'Test Lead' });
    await db.collection('blogs').add({ title: 'Test Blog' });
    await db.collection('payments').add({ status: 'captured', amount: 100 });
    await db.collection('payments').add({ status: 'failed', amount: 50 });

    const leadsSnapshot = await db.collection('leads').get();
    const blogsSnapshot = await db.collection('blogs').get();
    const paymentsSnapshot = await db.collection('payments').where('status', '==', 'captured').get();

    console.log('Leads:', leadsSnapshot.size || leadsSnapshot.docs?.length || 0);
    console.log('Blogs:', blogsSnapshot.size || blogsSnapshot.docs?.length || 0);
    console.log('Payments:', paymentsSnapshot.size || paymentsSnapshot.docs?.length || 0);
  } catch (err) {
    console.error(err);
  }
}
run();

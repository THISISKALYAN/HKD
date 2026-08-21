const { db } = require('./services/firebase.js');

async function run() {
  if (!db) {
    console.error('No DB connection.');
    return;
  }
  const ref = db.collection('blogs').doc('daily-annadana-seva');
  await ref.update({
    title: 'Daily Annadana Seva: Nourishing the Pilgrims in Hare Krishna Movement Dehradun',
    content: `DAILY ANNADANA SEVA: NOURISHING PILGRIMS IN HARE KRISHNA MOVEMENT DEHRADUN\n\nThe Supreme Charity\nIn Vedic tradition, 'Anna Daan' (the donation of food) is glorified as the highest form of charity (Maha Daan). When food is first offered to the Supreme Lord, it becomes 'Prasadam'—sanctified food that nourishes not only the physical body but also purifies the soul.\n\nOur Daily Commitment\nAt Hare Krishna Movement Dehradun, we are committed to ensuring that no one goes hungry. Every single day, thousands of plates of hot, nutritious, and delicious Khichdi prasadam are distributed free of cost to sadhus (monks), pilgrims, visitors, and locals.\n\nThe Spiritual Benefits of Distributing Prasadam\nThe act of distributing and honoring prasadam is a deeply spiritual exchange. It breaks down barriers, cultivates compassion, and invokes the boundless blessings of the Lord. As described in the Bhagavad-gita, food offered in sacrifice (yajna) frees one from all karmic reactions.\n\nHow You Can Participate\nThis massive daily endeavor is sustained by the generous contributions of kind-hearted donors. By sponsoring Annadana on your birthdays, anniversaries, or in memory of loved ones, you partake in this immense spiritual merit. \n\nJoin us in this noble cause. Your contribution, no matter how small, ensures that the sacred tradition of Annadana continues uninterrupted, spreading joy, health, and spiritual blessings to thousands daily.`
  });
  console.log('Updated DB');
}
run().catch(console.error).finally(() => process.exit(0));

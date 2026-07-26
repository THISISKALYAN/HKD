const jwt = require('jsonwebtoken');
const axios = require('axios');

const JWT_SECRET = 'hkd_premium_jwt_secret_108'; // From backend/.env
const token = jwt.sign({ role: 'admin', email: 'admin@hkd.org' }, JWT_SECRET);

async function test() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/cms/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Success:', res.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
test();

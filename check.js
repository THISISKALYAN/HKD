const fs = require('fs');
const html = fs.readFileSync('hostinger_page2.html', 'utf8');
const links = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi);
console.log(links ? links.join('\n') : 'No stylesheets found');

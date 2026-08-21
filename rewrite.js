const fs = require('fs');
let html = fs.readFileSync('hostinger_page2.html', 'utf16le');
html = html.replace(/href="\/_next/g, 'href="https://lightyellow-gorilla-481297.hostingersite.com/_next');
fs.writeFileSync('test_hostinger3.html', html, 'utf8');

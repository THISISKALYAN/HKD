const fs = require('fs');
const path = require('path');

const adminDir = path.resolve('a:/HKD/frontend/src/app/admin');

function updateToGlassUI(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateToGlassUI(fullPath);
    } else if (fullPath.endsWith('.tsx') && file !== 'layout.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We previously ran apply_liquid_glass which changed bg-white to bg-white/40 and border-gray to border-white/40.
      // The user wants a clean WHITE background. So glass elements on white should be bg-white/70 with a gray border and nice drop shadow.
      
      content = content.replace(/bg-white\/40 dark:bg-black\/40 backdrop-blur-xl border border-white\/60 dark:border-white\/10 shadow-\[0_8px_32px_0_rgba\(31,38,135,0\.05\)\] dark:shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.3\)\]/g, 'bg-white dark:bg-black/40 backdrop-blur-xl border border-gray-100 dark:border-white/10 shadow-sm shadow-gray-200/50 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-md transition-shadow');
      
      content = content.replace(/border-white\/40 dark:border-white\/10/g, 'border-gray-100 dark:border-white/10');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

updateToGlassUI(adminDir);
console.log('Finished reverting to white background liquid glass');

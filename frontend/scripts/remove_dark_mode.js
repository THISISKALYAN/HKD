const fs = require('fs');
const path = require('path');

const adminDir = path.resolve('a:/HKD/frontend/src/app/admin');

function removeDarkClasses(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeDarkClasses(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove all dark: prefix classes
      content = content.replace(/dark:[^\s"']+/g, '');
      
      // Clean up multiple spaces left by removal
      content = content.replace(/  +/g, ' ');
      // Clean up leading/trailing spaces in class names
      content = content.replace(/className="\s+/g, 'className="');
      content = content.replace(/\s+"/g, '"');
      
      // If layout.tsx, replace the overall background to strict white as requested
      if (file === 'layout.tsx' || file === 'page.tsx') {
         content = content.replace(/bg-\[#F5F6FA\]/g, 'bg-white');
         // Also remove the Theme toggle button and imports if present
         if (file === 'layout.tsx') {
           content = content.replace(/<button[^>]*onClick={\(\) => setTheme[^>]*>[\s\S]*?<\/button>/, '');
           content = content.replace(/<ThemeProvider[^>]*>([\s\S]*?)<\/ThemeProvider>/, '$1');
           content = content.replace(/import \{ ThemeProvider, useTheme \} from 'next-themes';/, '');
           content = content.replace(/const \{ theme, setTheme \} = useTheme\(\);/, '');
         }
      }
      
      fs.writeFileSync(fullPath, content);
      console.log('Processed ' + fullPath);
    }
  }
}

removeDarkClasses(adminDir);
console.log('Done stripping dark mode and enforcing white backgrounds.');

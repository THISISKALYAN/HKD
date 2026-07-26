const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace accent colors
  content = content.replace(/#5E5CE6/g, '#004B2C');
  content = content.replace(/#00C7BE/g, '#d4af37'); // Teal to Gold
  
  // Replace text sizes
  content = content.replace(/text-\[11px\]/g, 'text-xs');
  content = content.replace(/text-\[12px\]/g, 'text-sm');
  content = content.replace(/text-\[13px\]/g, 'text-sm');
  
  // Replace Upgrade Plan button
  content = content.replace(
    /Upgrade Plan/g,
    '<LogOut className="w-4 h-4" /> Logout'
  );
  
  fs.writeFileSync(fullPath, content);
  console.log('Updated ' + fullPath);
}

replaceInFile('src/app/admin/layout.tsx');
replaceInFile('src/app/admin/page.tsx');

// Also update root layout to add suppressHydrationWarning to HTML tag
const rootLayoutPath = path.resolve('src/app/layout.tsx');
let rootLayoutContent = fs.readFileSync(rootLayoutPath, 'utf8');
if (!rootLayoutContent.includes('suppressHydrationWarning')) {
  rootLayoutContent = rootLayoutContent.replace(
    '<html lang="en">',
    '<html lang="en" suppressHydrationWarning>'
  );
  fs.writeFileSync(rootLayoutPath, rootLayoutContent);
  console.log('Added suppressHydrationWarning to root layout');
}

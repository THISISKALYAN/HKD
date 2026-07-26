const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src/app/admin/home/page.tsx'),
  path.join(__dirname, 'src/app/admin/blogs/page.tsx'),
  path.join(__dirname, 'src/app/admin/page.tsx'),
  path.join(__dirname, 'src/app/admin/leads/page.tsx'),
];

const replacements = [
  { search: /bg-saffron(?!\S)/g, replace: 'bg-[#164E33]' },
  { search: /hover:bg-saffron-dark/g, replace: 'hover:bg-[#113A26]' },
  { search: /text-saffron(?!\S)/g, replace: 'text-[#164E33]' },
  { search: /hover:text-saffron(?!\S)/g, replace: 'hover:text-[#164E33]' },
  { search: /hover:border-saffron(?!\S)/g, replace: 'hover:border-[#164E33]' },
  { search: /bg-saffron\/5/g, replace: 'bg-[#164E33]/5' },
  { search: /text-charcoal-900/g, replace: 'text-[#164E33]' },
  { search: /text-charcoal-700/g, replace: 'text-gray-500' },
  { search: /text-charcoal-600/g, replace: 'text-gray-500' },
  { search: /text-charcoal-400/g, replace: 'text-gray-400' },
  { search: /text-charcoal-300/g, replace: 'text-gray-300' },
  { search: /border-charcoal-100/g, replace: 'border-gray-100' },
  { search: /border-charcoal-200/g, replace: 'border-gray-200' },
  { search: /bg-cream-50/g, replace: 'bg-gray-50' },
  { search: /rounded-2xl/g, replace: 'rounded-[24px]' },
  { search: /rounded-xl/g, replace: 'rounded-[16px]' },
  
  // New replacements for the gold color
  { search: /#d4af37/g, replace: '#164E33' },
  { search: /hover:bg-yellow-600/g, replace: 'hover:bg-[#113A26]' },
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(({ search, replace }) => {
      content = content.replace(search, replace);
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

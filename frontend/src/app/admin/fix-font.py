import re

filepath = r"a:\HKD\frontend\src\app\admin\page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I want to ensure the buttons and small text match the main website which is roughly 18px base
content = content.replace('text-xs font-bold tracking-wider', 'text-sm font-bold tracking-wider')
content = content.replace('text-xs font-bold mb-1.5', 'text-sm font-bold mb-1.5')
content = content.replace('text-xs font-bold text-gray-700', 'text-sm font-bold text-gray-700')
content = content.replace('text-xs text-gray-500 font-bold', 'text-sm text-gray-500 font-bold')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

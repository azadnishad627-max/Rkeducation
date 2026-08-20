import fs from 'fs';
import path from 'path';

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchFiles(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('azad3229011')) {
        console.log(`Found in: ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((l, i) => {
          if (l.includes('azad3229011')) {
            console.log(`  Line ${i + 1}: ${l.trim()}`);
          }
        });
      }
    }
  }
}

searchFiles('./src');

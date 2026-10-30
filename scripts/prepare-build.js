import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceHtml = path.join(rootDir, 'index.source.html');
const targetHtml = path.join(rootDir, 'index.html');

if (fs.existsSync(sourceHtml)) {
  fs.copyFileSync(sourceHtml, targetHtml);
  console.log('✓ Prepared root index.html from index.source.html for Vite compilation.');
} else {
  console.error('✗ index.source.html not found!');
  process.exit(1);
}

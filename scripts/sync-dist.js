import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const distHtml = path.join(distDir, 'index.html');
const rootHtml = path.join(rootDir, 'index.html');
const root404 = path.join(rootDir, '404.html');

const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

if (!fs.existsSync(distHtml)) {
  console.error('✗ dist/index.html not found! Run build first.');
  process.exit(1);
}

// 1. Copy dist/index.html to root index.html and 404.html for GitHub Pages
fs.copyFileSync(distHtml, rootHtml);
fs.copyFileSync(distHtml, root404);
console.log('✓ Synced dist/index.html to root index.html and 404.html');

// 2. Copy dist/assets/* into root assets/
if (!fs.existsSync(rootAssetsDir)) {
  fs.mkdirSync(rootAssetsDir, { recursive: true });
}

const assetFiles = fs.readdirSync(distAssetsDir);
for (const file of assetFiles) {
  const src = path.join(distAssetsDir, file);
  const dest = path.join(rootAssetsDir, file);
  fs.copyFileSync(src, dest);
}
console.log(`✓ Synced ${assetFiles.length} production assets to root ./assets/ folder.`);

// 3. Copy any static public files in dist/ root (e.g. seeedstudio_affiliate_1200x628.jpg) to repository root
const distRootFiles = fs.readdirSync(distDir);
for (const file of distRootFiles) {
  if (file === 'index.html' || file === 'assets') continue;
  const src = path.join(distDir, file);
  const dest = path.join(rootDir, file);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest);
  }
}
console.log('✓ Synced static public assets to repository root.');

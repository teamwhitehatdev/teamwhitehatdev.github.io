import fs from 'fs';
import { JSDOM } from 'jsdom';

const jsCode = fs.readFileSync('c:\\Users\\MSI\\.gemini\\antigravity\\projects\\TeamWhiteHatDev_Portfolio\\dist\\assets\\index-BuVLuqnK.js', 'utf8');
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`, {
  url: 'https://teamwhitehatdev.github.io/',
  runScripts: 'dangerously'
});

const { window } = dom;
window.console = console;

try {
  window.eval(jsCode);
  const rootDiv = window.document.getElementById('root');
  console.log("=== JSDOM RENDER SUCCESSFUL! ===");
  console.log("ROOT DIV HTML LENGTH:", rootDiv.innerHTML.length, "bytes!");
} catch(err) {
  console.error("JSDOM RUNTIME ERROR:", err);
}

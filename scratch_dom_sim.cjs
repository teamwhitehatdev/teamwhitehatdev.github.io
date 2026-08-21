
const fs = require('fs');

try {
  const jsCode = fs.readFileSync('assets/index-D-_eQFM0.js', 'utf-8');
  console.log("Read JS bundle size:", jsCode.length);
  
  // Check for any window / document references that might fail if window is undefined or mock fails
  const windowRefs = jsCode.match(/window\.[a-zA-Z0-9_$]+/g);
  console.log("Total window object accesses:", windowRefs ? windowRefs.length : 0);
  
  const uniqueWindowRefs = [...new Set(windowRefs)];
  console.log("Unique window property accesses (first 15):", uniqueWindowRefs.slice(0, 15));

  // Check for localStorage accesses
  const localRefs = jsCode.match(/localStorage\.[a-zA-Z0-9_$]+/g);
  console.log("localStorage accesses:", localRefs ? [...new Set(localRefs)] : []);

} catch (e) {
  console.error("DOM Simulation Error:", e);
}

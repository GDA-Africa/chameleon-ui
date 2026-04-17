const fs = require('fs');

const localDeps = ["context", "utils", "animations", "atoms", "molecules", "composites"];

// Test on composites.tsx
let content = fs.readFileSync("src/app/components/chameleon/composites.tsx", "utf8");

// We want to detect which local deps the file actually uses
const foundDeps = [];
for (const dep of localDeps) {
  if (content.includes(`from "./${dep}"`) || content.includes(`from './${dep}'`)) {
    foundDeps.push(dep);
  }
}
console.log("Found local deps:", foundDeps);

// Now rewrite them
content = content.replace(/from\s+['"]\.\/.*?['"]/g, 'from "@chameleon-ui-lib/react"');
// We also need to collapse multiple imports from the same package if they exist, but technically TS/JS doesn't care.

console.log("Done");

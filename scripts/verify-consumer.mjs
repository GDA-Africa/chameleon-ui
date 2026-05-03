import { mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = process.cwd();
const tempDir = mkdtempSync(path.join(os.tmpdir(), "chameleon-consumer-smoke-"));

const run = (command, cwd = repoRoot) => {
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
};

try {
  console.log("\n▶ Building library artifacts...");
  run("npm run build");

  console.log("\n▶ Building pack tarball...");
  run("npm pack");

  const tgzCandidates = readdirSync(repoRoot)
    .filter((name) => /^chameleon-ui-lib-react-.*\.tgz$/.test(name))
    .map((name) => ({
      name,
      mtime: statSync(path.join(repoRoot, name)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  const tgzName = tgzCandidates[0]?.name;

  if (!tgzName) {
    throw new Error("Unable to locate generated package tarball (*.tgz)");
  }

  const tgzPath = path.join(repoRoot, tgzName);

  console.log(`\n▶ Creating isolated consumer at ${tempDir}`);
  run("npm init -y", tempDir);

  console.log("\n▶ Installing consumer dependencies and local package...");
  run(
    `npm install react react-dom typescript @types/react @types/react-dom \"${tgzPath}\"`,
    tempDir,
  );

  writeFileSync(
    path.join(tempDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        },
        include: ["index.tsx"],
      },
      null,
      2,
    ) + "\n",
  );

  writeFileSync(
    path.join(tempDir, "index.tsx"),
    `import React from 'react';
import { ChameleonProvider, Button } from '@chameleon-ui-lib/react';

export function App() {
  return (
    <ChameleonProvider initialTheme="simple" initialMode="light">
      <Button>Smoke Test</Button>
    </ChameleonProvider>
  );
}
`,
  );

  console.log("\n▶ Running TypeScript consumer import check...");
  run("npx tsc --noEmit", tempDir);

  console.log("\n▶ Running runtime export check...");
  run(
    `node --input-type=module -e "import * as pkg from '@chameleon-ui-lib/react'; if (!('ChameleonProvider' in pkg) || !('Button' in pkg)) { throw new Error('Missing expected exports'); } console.log('Exports OK:', 'ChameleonProvider, Button');"`,
    tempDir,
  );

  console.log("\n✅ Consumer verification passed.");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

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

  console.log("\n▶ Running engine subpath export check...");
  run(
    `node --input-type=module -e "import { listCatalog, validateSpec, RECIPES } from '@chameleon-ui-lib/react/engine'; const c = listCatalog(); if (c.components.length < 20 || c.templates.length < 10) throw new Error('Catalog incomplete'); if (!RECIPES.every(r => validateSpec(r.spec).valid)) throw new Error('Recipe spec failed validation'); console.log('Engine OK:', c.components.length, 'components,', RECIPES.length, 'recipes');"`,
    tempDir,
  );

  console.log("\n▶ Running CLI --json smoke test (installed package)...");
  const cliJson = execSync("npx chameleon list --json", { cwd: tempDir, env: process.env }).toString();
  const cliEnvelope = JSON.parse(cliJson);
  if (!cliEnvelope.ok || cliEnvelope.command !== "list" || !Array.isArray(cliEnvelope.data.components)) {
    throw new Error("CLI --json envelope malformed");
  }
  console.log(`CLI OK: list --json returned ${cliEnvelope.data.components.length} components`);

  console.log("\n▶ Running MCP server smoke test (F60)...");
  const { spawnSync } = await import("node:child_process");
  const rpc = [
    '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"verify-consumer","version":"1"}}}',
    '{"jsonrpc":"2.0","method":"notifications/initialized"}',
    '{"jsonrpc":"2.0","id":2,"method":"tools/list"}',
    '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"search_components","arguments":{"query":"login form"}}}',
  ].join("\n") + "\n";
  const mcp = spawnSync("npx", ["chameleon", "mcp"], { cwd: tempDir, input: rpc, encoding: "utf8", timeout: 30000 });
  const responses = mcp.stdout.trim().split("\n").map((l) => JSON.parse(l));
  const initRes  = responses.find((m) => m.id === 1)?.result;
  const toolsRes = responses.find((m) => m.id === 2)?.result;
  const callRes  = responses.find((m) => m.id === 3)?.result;
  if (initRes?.serverInfo?.name !== "chameleon-ui") throw new Error("MCP initialize failed");
  if (!Array.isArray(toolsRes?.tools) || toolsRes.tools.length < 10) throw new Error("MCP tools/list incomplete");
  if (callRes?.isError || !callRes?.structuredContent?.recipes?.length) throw new Error("MCP search_components failed");
  console.log(`MCP OK: ${toolsRes.tools.length} tools, search surfaced recipe '${callRes.structuredContent.recipes[0].name}'`);

  console.log("\n✅ Consumer verification passed.");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

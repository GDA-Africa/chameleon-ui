#!/usr/bin/env node

/**
 * Chameleon UI CLI
 * Executable entry point
 */
import('../dist/index.js').catch((err) => {
  console.error("Failed to start CLI:", err);
  process.exit(1);
});

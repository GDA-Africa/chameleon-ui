# Chameleon CLI — `--json` Machine-Readable Output (F58)

Every CLI command accepts `--json` and emits a single JSON envelope on stdout — no ANSI,
no spinners. This is the machine interface for scripts and AI agents, and the foundation
for the Chameleon MCP server (F60).

## Envelope

```jsonc
{
  "ok": true,              // false when errors[] is non-empty (doctor: false when issues > 0)
  "command": "add",        // the command that ran
  "version": "1.1.0",      // CLI/library version
  "data": { ... },         // command-specific payload (see below)
  "warnings": ["..."],     // non-fatal notices (plain strings)
  "errors": [              // fatal problems; ok=false, exit code 1
    { "code": "UNKNOWN_COMPONENT", "message": "..." }
  ],
  "filesWritten": ["src/components/ui/button.tsx"],  // present only when files were written
  "filesDeleted": ["..."],                            // present only when files were deleted
  "nextSteps": ["Import via: ..."]                    // present only when there is follow-up advice
}
```

Exit code: `0` when `ok: true`, `1` when `ok: false`.

## `data` payloads by command

| Command | `data` |
|---|---|
| `list` | `{ components: [{name, category, description, variants, dependencies, sourceFile}], templates: [{name, export, description, sourceFile}], themes: [...] }` |
| `info <x>` | `{ name, kind: "component"\|"template", category, description, sourceFile, variants?, dependencies?, export? }` |
| `themes` | `{ themes: [{name, description}] }` |
| `init` | `{ config }` |
| `add <x>` / `add --all-*` | `{ added: [{name, export, file, externalDependencies?}] }` |
| `remove <x>` | `{ removed: "<name>" \| null }` |
| `template <x>` | `{ template, export, file }` |
| `theme <x>` | `{ theme }` |
| `config` | `{ config, path }` |
| `doctor` | `{ healthy, issues, checks: [{level: "ok"\|"warn"\|"error", message}] }` — `ok` mirrors `healthy` |
| `diff` | `{ components: [{name, status: "in-sync"\|"out-of-sync"}], outOfSync }` |
| `update` | `{ updated: [...], upToDate: [...] }` |
| `--version` | `{ cli, library }` |

## Error codes

`NOT_INITIALIZED` · `MISSING_ARGUMENT` · `UNKNOWN_COMPONENT` · `UNKNOWN_TEMPLATE` ·
`UNKNOWN_ITEM` · `UNKNOWN_COMMAND` · `INVALID_THEME` · `NO_PACKAGE_JSON` ·
`SOURCE_NOT_FOUND` · `INTERACTIVE_COMMAND` (`dev` does not support `--json`) ·
`ERROR` (generic check failure)

Errors may carry extra fields (e.g. `INVALID_THEME` includes `validThemes`,
`UNKNOWN_TEMPLATE` includes `available`).

## Examples

```bash
chameleon list --json | jq '.data.components[].name'
chameleon add button --json          # → filesWritten + import hint in nextSteps
chameleon doctor --json && echo healthy
```

## Stability

The envelope shape (`ok`, `command`, `version`, `data`, `warnings`, `errors`) is a stable
contract from v1.2.0. New fields may be added; existing fields will not be renamed or
removed without a major version bump.

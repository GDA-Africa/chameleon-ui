/// <reference types="vite/client" />

// Allow CSS files to be imported as side-effects in TypeScript source.
// Without this, vite:dts raises TS2882 when generating declaration files.
declare module "*.css" {
  const content: string;
  export default content;
}

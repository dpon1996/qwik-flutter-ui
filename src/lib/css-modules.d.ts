/**
 * Ambient declaration for CSS Module imports inside the src/lib/ folder.
 *
 * The playground tsconfig pulls this declaration in via qwik.env.d.ts
 * (which references vite/client), but the library tsconfig
 * (tsconfig.lib.json) only includes src/index.ts and the lib subtree.
 * Declaring *.module.css here makes CSS Module imports typecheck under
 * both configurations.
 */

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

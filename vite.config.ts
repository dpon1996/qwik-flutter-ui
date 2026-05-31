/**
 * Vite config for `qwik-flutter-ui`.
 *
 * Two modes are supported:
 *
 * 1. Dev / playground (default):  `vite --mode ssr` runs the Qwik City
 *    playground under `src/routes/` so contributors can iterate on
 *    components with live reload.
 *
 * 2. Library build:               `vite build --mode lib` produces a
 *    publishable bundle under `./lib` from the `src/index.ts` entry.
 *    Type declarations are emitted separately by `tsc --emitDeclarationOnly`.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};
errorOnDuplicatesPkgDeps(devDependencies, dependencies);

export default defineConfig(({ mode }): UserConfig => {
  if (mode === "lib") {
    return {
      // Don't copy assets from /public into the published bundle.
      publicDir: false,
      build: {
        target: "es2020",
        lib: {
          entry: "./src/index.ts",
          formats: ["es", "cjs"],
          fileName: (format, entryName) =>
            `${entryName}.qwik.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
          // Don't bundle peer/runtime deps; consumers provide them.
          external: [/^@builder\.io\/qwik(\/.*)?$/],
        },
        outDir: "lib",
        emptyOutDir: true,
      },
      plugins: [qwikVite(), tsconfigPaths({ root: "." })],
    };
  }

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: "." })],
    optimizeDeps: {
      exclude: [],
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

// *** utils ***

function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep,
) {
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );

  const qwikPkg = Object.keys(dependencies).filter((value) =>
    /qwik/i.test(value),
  );

  if (qwikPkg.length > 0) {
    throw new Error(
      `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`,
    );
  }

  if (duplicateDeps.length > 0) {
    throw new Error(
      `Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".\nPlease move the duplicated dependencies to "devDependencies" only and remove them from "dependencies".`,
    );
  }
}

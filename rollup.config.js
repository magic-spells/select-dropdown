import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";

const production = !process.env.ROLLUP_WATCH;
const name = "select-dropdown";

// css processing configuration
const cssConfig = {
  extract: true,
  minimize: false,
  sourceMap: !production,
};

const cssConfigMinified = {
  extract: true,
  minimize: production,
  sourceMap: !production,
};

// rollup configuration
export default [
  // esm version
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.esm.js`,
      format: "es",
      sourcemap: !production,
    },
    plugins: [
      resolve(),
      postcss({
        ...cssConfig,
        extract: `${name}.css`,
      }),
      !production &&
        serve({
          open: true,
          contentBase: ["dist", "demo"],
          host: "localhost",
          port: 3000,
        }),
    ],
  },
  // cjs version
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.cjs.js`,
      format: "cjs",
      sourcemap: !production,
    },
    plugins: [
      resolve(),
      postcss({
        ...cssConfig,
        extract: false,
      }),
    ],
  },
  // umd version (for direct browser usage and more compatibility)
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.js`,
      format: "umd",
      name: "SelectDropdown",
      sourcemap: !production,
    },
    plugins: [
      resolve(),
      postcss({
        ...cssConfig,
        extract: false,
      }),
    ],
  },
  // minified umd version
  {
    input: "src/index.js",
    output: {
      file: `dist/${name}.min.js`,
      format: "umd",
      name: "SelectDropdown",
      sourcemap: !production,
    },
    plugins: [
      resolve(),
      postcss({
        ...cssConfigMinified,
        extract: `${name}.min.css`,
      }),
      terser({
        format: {
          comments: false,
        },
      }),
      // Additional copy plugin at the end to copy files for GitHub Pages demo
      copy({
        targets: [
          { src: "dist/select-dropdown.min.js", dest: "demo", rename: "select-dropdown.js" },
          { src: "dist/select-dropdown.css", dest: "demo" }
        ],
        hook: 'writeBundle' // Run this after all output files are written
      }),
    ],
  },
];

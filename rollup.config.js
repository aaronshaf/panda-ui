import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sass from "node-sass";
// import sass2 from "rollup-plugin-sass";
import cssvariables from "postcss-css-variables";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

const production = !process.env.ROLLUP_WATCH;

const proprocessStyle = ({ content, attributes }) => {
  if (attributes.type !== "text/scss") return;

  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: content,
        includePaths: ["src"],
        sourceMap: true,
        outFile: "x" // necessary but ignored
      },
      (err, result) => {
        if (err) return reject(err);
        const css = result.css.toString();
        postcss([autoprefixer, cssvariables])
          .process(css, { from: undefined })
          .then(result2 => {
            resolve({
              code: result2.css.toString()
              // map: result.map.toString()
            });
          });
      }
    );
  });
};

const plugins = [
  svelte({
    skipIntroByDefault: true,
    nestedTransitions: true,
    customElement: true,
    dev: !production,
    preprocess: { style: proprocessStyle }
  }),
  resolve(),
  commonjs(),
  production && terser()
];

export default [
  {
    input: "src/Button.html",
    output: {
      // sourcemap: true,
      format: "iife",
      name: "Button",
      file: "dist/elements/button.js"
    },
    plugins
  },
  {
    input: "src/CloseButton.html",
    output: {
      // sourcemap: true,
      format: "iife",
      name: "CloseButton",
      file: "dist/elements/close-button.js"
    },
    plugins
  }
];

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

const components = [
  ["src/elements/Alert.html", "dist/elements/alert.js"],
  ["src/elements/Button.html", "dist/elements/button.js"],
  ["src/icons/Warning.html", "dist/icons/warning.js"]
  // ["src/CloseButton.html", "dist/elements/close-button.js"]
];

export default components.map(([from, to]) => ({
  input: from,
  output: {
    // sourcemap: true,
    format: "iife",
    name: "Button",
    file: to
  },
  plugins
}));

const mkdirp = require("mkdirp");
const fs = require("fs");
const canvas = require("@instructure/ui-themes/lib/canvas").default;
const canvasHighContrast = require("@instructure/ui-themes/lib/canvas/high-contrast")
  .default;
const { generatePropsFromTheme } = require("./utils.js");

mkdirp.sync(__dirname + "/../dist/themes");
mkdirp.sync(__dirname + "/themes/canvas");
mkdirp.sync(__dirname + "/themes/canvas-high-contrast");

fs.writeFileSync(
  __dirname + "/../dist/themes/canvas.css",
  generatePropsFromTheme(":root", canvas.variables)
);
fs.writeFileSync(
  __dirname + "/../dist/themes/canvas-high-contrast.css",
  generatePropsFromTheme(":root", canvasHighContrast.variables)
);

const { Button, CloseButton } = require("@instructure/ui-buttons");
const { View } = require("@instructure/ui-layout");

[[Button, "Button"], [CloseButton, "CloseButton"], [View, "View"]].forEach(
  ([component, name]) => {
    fs.writeFileSync(
      __dirname + `/themes/canvas/${name}.scss`,
      generatePropsFromTheme(`.${name}`, component.generateTheme())
    );
    fs.writeFileSync(
      __dirname + `/themes/canvas-high-contrast/${name}.scss`,
      generatePropsFromTheme(
        `.${name}`,
        component.generateTheme("canvas-high-contrast")
      )
    );
  }
);

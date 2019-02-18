const fs = require("fs");
const canvas = require("@instructure/ui-themes/lib/canvas").default;
const canvasHighContrast = require("@instructure/ui-themes/lib/canvas/high-contrast")
  .default;
const { generatePropsFromTheme } = require("./utils.js");
fs.writeFileSync(
  "src/themes/canvas.css",
  generatePropsFromTheme(":root", canvas.variables)
);
fs.writeFileSync(
  "src/themes/canvas-high-contrast.css",
  generatePropsFromTheme(":root", canvasHighContrast.variables)
);

const { Button, CloseButton } = require("@instructure/ui-buttons");
const { View } = require("@instructure/ui-layout");

[[Button, "Button"], [CloseButton, "CloseButton"], [View, "View"]].forEach(
  ([component, name]) => {
    fs.writeFileSync(
      `src/themes/canvas/${name}.scss`,
      generatePropsFromTheme(`.${name}`, component.generateTheme())
    );
    fs.writeFileSync(
      `src/themes/canvas-high-contrast/${name}.css`,
      generatePropsFromTheme(
        `.${name}`,
        component.generateTheme("canvas-high-contrast")
      )
    );
  }
);

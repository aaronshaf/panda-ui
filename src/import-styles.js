const fs = require("fs");

const files = [
  [
    "node_modules/@instructure/ui-buttons/src/components/Button/styles.css",
    "Button.scss"
  ],
  [
    "node_modules/@instructure/ui-buttons/src/components/CloseButton/styles.css",
    "CloseButton.scss"
  ],
  [
    "node_modules/@instructure/ui-alerts/src/components/Alert/styles.css",
    "Alert.scss"
  ]
];
for (const [from, to] of files) {
  fs.createReadStream(from).pipe(
    fs.createWriteStream(__dirname + "/elements/" + to)
  );
}

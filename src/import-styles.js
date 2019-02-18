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
  ],
  [
    "node_modules/@instructure/ui-elements/src/components/Avatar/styles.css",
    "Avatar.scss"
  ],
  [
    "node_modules/@instructure/ui-elements/src/components/Progress/ProgressBar/styles.css",
    "ProgressBar.scss"
  ]
];
for (const [from, to] of files) {
  fs.createReadStream(from).pipe(
    fs.createWriteStream(__dirname + "/styles/" + to)
  );
}

const abcSort = (a, b) => (a < b ? -1 : 1);

const objToVars = (prefix, obj) => {
  return Object.entries(obj).reduce((state, [key, val]) => {
    if (typeof val === "string") {
      const valParts = val.split(": ");
      return state.concat([
        `${prefix}-${key}: ${valParts[valParts.length - 1]};`
      ]);
    } else if (typeof val === "number") {
      return state.concat([`${prefix}-${key}: ${val};`]);
    } else if (typeof val === "object") {
      return state.concat(objToVars(`${prefix}-${key}`, val));
    } else {
      throw Error("unexpected theme value");
    }
  }, []);
};

exports.generatePropsFromTheme = (element, vars) => {
  let cssParts = objToVars("-", vars);
  // ${element}
  return `.root {
${cssParts
  .sort(abcSort)
  .map(part => `  ${part}`)
  .join("\n")}
}`;
};

/* eslint no-console: ["error", { allow: ["error"] }] */

const R = require("ramda");

const createData = (item, key) => R.assoc("key", key, item);

const createFreezeFunction = (className) => `Object.freeze(${className});`;

const createKeysFunction = (className) =>
  `${className}.keys = () => Object.keys(${className}.properties);`;

const createValuesFunction = (className) =>
  `${className}.values = () => Object.values(${className}.properties);`;

const toCamelCase = (str) =>
  str
    .split(" ")
    .map((word, index) => {
      // If it is the first word make sure to lowercase all the chars.
      if (index === 0) {
        return word.toLowerCase();
      }

      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

// /////////////////////////////////////////////////////////////////////////////
const EnumGenerator = {};

EnumGenerator.createEnumName = (item) => {
  const name = typeof item === "object" ? item.name : item;

  const answer = R.pipe(
    R.replace(/[().,!#'"’]/g, ""),
    R.replace(/[- /]/g, "_"),
    R.toUpper
  )(name);

  return answer;
};

EnumGenerator.createEnumValue = (item) => {
  const name = typeof item === "object" ? item.name : item;

  const answer = R.pipe(
    R.replace(/[().,!#'"’]/g, ""),
    R.replace(/[-/]/g, " ")
  )(name);

  return toCamelCase(answer);
};

EnumGenerator.createEnumNames = (data) => {
  const reduceFunction = (accum, item) => {
    const enumName = EnumGenerator.createEnumName(item);
    const enumValue = EnumGenerator.createEnumValue(item);

    if (accum.length === 0) {
      return `  ${enumName}: "${enumValue}",`;
    }

    return `${accum}
  ${enumName}: "${enumValue}",`;
  };

  return R.reduce(reduceFunction, "", data);
};

EnumGenerator.createEnumProperties = (data) => {
  const reduceFunction = (accum, item) => {
    const key = EnumGenerator.createEnumValue(item);

    if (accum[key] !== undefined) {
      console.error(
        `Overwriting item with key ${key} item0 = ${accum[key].name}`
      );
      console.error(`Overwriting item with key ${key} item  = ${item.name}`);
    }

    return R.assoc(key, createData(item, key), accum);
  };

  return R.reduce(reduceFunction, {}, data);
};

EnumGenerator.generate = (className, data) => {
  const enumProperties = EnumGenerator.createEnumProperties(data);

  const prefix0 = `const ${className} = {`;
  const enums = EnumGenerator.createEnumNames(data);
  const suffix0 = "};";
  const prefix1 = `
${className}.properties = `;
  const content = `${JSON.stringify(enumProperties, null, 2)};\n`;
  const keys = createKeysFunction(className);
  const values = createValuesFunction(className);
  const freeze = createFreezeFunction(className);
  const suffix1 = `
export default ${className};`;

  return `${prefix0}
${enums}
${suffix0}
${prefix1}
${content}
${keys}

${values}

${freeze}
${suffix1}`;
};

module.exports = EnumGenerator;

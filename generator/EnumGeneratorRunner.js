const FileUtilities = require("../util/FileUtilities.js");

const EnumGenerator = require("./EnumGenerator.js");

const inputFile = process.argv.length > 2 ? process.argv[2] : "EnumTest.json";

FileUtilities.loadLocalFile(inputFile).then((data) => {
  const className = inputFile.substring(0, inputFile.lastIndexOf("."));
  const outputFile = `${className}.js`;
  const content = EnumGenerator.generate(className, data);
  FileUtilities.writeFile(outputFile, content);
});

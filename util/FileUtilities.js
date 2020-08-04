/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require("fs");

const FileUtilities = {};

FileUtilities.loadLocalFile = (inputFile) =>
  new Promise((resolve, reject) => {
    fs.readFile(inputFile, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

FileUtilities.writeFile = function writeFile(outputFile, content) {
  fs.writeFile(outputFile, content, (err) => {
    // throws an error, you could also catch it here
    if (err) {
      throw err;
    }

    // success case, the file was saved
    console.log(`${outputFile} saved`);
  });
};

module.exports = FileUtilities;

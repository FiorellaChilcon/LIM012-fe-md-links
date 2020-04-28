const fs = require('fs');
const path = require('path');
const mdFile = require('./mdFile.js');
const validate = require('./validate.js');

module.exports = (filePath, options) => {
  return new Promise((resolve, reject) => {
    let AbsoluteFilePath = filePath;
    const verifyPath = path.isAbsolute(filePath);
    if (!verifyPath) {
      AbsoluteFilePath = path.resolve(filePath);
    }
    if (fs.existsSync(AbsoluteFilePath)) {
      if (options) {
        mdFile(filePath)
          .then((result) => {
            resolve(validate(result));
          }).catch((e) => reject(e));
      } else {
        resolve(mdFile(filePath));
      }
    } else {
      reject(new Error('No existe el archivo o directorio'));
    }
  });
};
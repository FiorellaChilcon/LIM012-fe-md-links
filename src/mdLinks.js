const fs = require('fs');
const path = require('path');
const mdFile = require('./mdFile.js');
const validate = require('./validate.js');

const toAbsolute = (dir) => (path.isAbsolute(dir) ? dir : path.resolve(dir));
module.exports = (filePath, options) => {
  return new Promise((resolve, reject) => {
    const absoluteFilePath = toAbsolute(filePath);
    if (fs.existsSync(absoluteFilePath)) {
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

const fs = require('fs');
const mdFile = require('./mdFile.js');
const validate = require('./validate.js');

module.exports = (filePath, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      if (options) {
        mdFile(filePath).then((result) => {resolve(validate(result))}).catch((e) => reject(e));
      } else {
        resolve(mdFile(filePath));
      }
    } else {
      reject(new Error('No existe el archivo o directorio'));
    }
  });
};
const fs = require('fs');
const path = require('path');
const mdFile = require('./mdFile.js');
const validate = require('./validate.js');

const toAbsolute = (dir) => (path.isAbsolute(dir) ? dir : path.resolve(dir));
module.exports = (filePath, options) => new Promise((resolve, reject) => {
  const absoluteFilePath = toAbsolute(filePath);
  if (fs.existsSync(absoluteFilePath)) {
    if (options) {
      if (options.validate) {
        mdFile(absoluteFilePath)
          .then((result) => {
            resolve(validate(result));
          }).catch((e) => reject(e));
      } else {
        reject(new Error('Argumento `options` inválido, debería ser igual a: { validate: true }'));
      }
    } else {
      resolve(mdFile(absoluteFilePath));
    }
  } else {
    reject(new Error('No existe el archivo o directorio'));
  }
});

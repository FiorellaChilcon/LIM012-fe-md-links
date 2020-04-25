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
      reject('No existe el archivo o directorio');
    }
  });
}
const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      if (options) {
        mdFile(filePath).then((result) => {resolve(validate(result))}).catch((e) => reject(e));
      } else {
        resolve(mdFile(filePath));
      }
    } else {
      reject('No existe el archivo o directorio');
    }
  }).then((result) => {
    return console.log(result);
  }).catch((errorMessage) => {
    return console.log(errorMessage);
  });
}
mdLinks('src');
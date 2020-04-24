const fs = require('fs');
const mdFile = require('./mdFile.js');
const validate = require('./validate.js');

// module.exports = (filePath, options) => {
//   const verify = new Promise((resolve, reject) => {
//     if (fs.existsSync(filePath)) {
//       resolve(mdFile(filePath))
//     } else {
//       reject(new Error('No existe el archivo o directorio'))
//     }
//   });
//   verify.then((result) => {
//     if (options) {
//       return validate(result).then((re) => {
//         return console.log(re);
//       });
//     }
//     return result;
//   }).catch((errorMessage) => {
//     return errorMessage;
//   });
// }
const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      if (options) {
        mdFile(filePath).then((result) => { Promise.all(validate(result)).then((re) => { resolve(re) }) })
      } else {
        resolve(mdFile(filePath))
      }
    } else {
      reject(new Error('No existe el archivo o directorio'))
    }
  }).then((result) => {
    return console.log(result);
  }).catch((errorMessage) => {
    console.log(errorMessage);
  });
}
mdLinks('test/example', { validate: true });
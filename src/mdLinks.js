//  -------------codigo OFICIAl  ------
// module.exports = (path, options) => {
//         // codigo
//     }
const fs = require('fs');
const mdFile = require('../src/mdFile.js');
const validate = require('../src/validate.js');

const mdLinks = (filePath, options) => {
  const verify = new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      resolve(mdFile(filePath))
    } else {
      reject(new Error('No existe el archivo o directorio'))
    }
  });
  verify.then((result) => {
    if (options.validate) {
      const validation = validate(result);
      return console.log(validation);
    }
    return console.log(result);
  }).catch((errorMessage) => {
    console.log(errorMessage);
  });
}
mdLinks('test/example', { validate: true });
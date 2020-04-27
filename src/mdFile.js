const fs = require('fs');

const path = require('path');

const numberOfLinks = (file) => {
  return new Promise((resolve, reject) => {
    const regex = /\[(.*)\]\((.+)\)/gi;
    const content = fs.readFileSync(file, 'utf8');
    const mdLinks = content.match(regex);
    if (mdLinks === null) {
      reject(new Error('El file no contiene ningun link'));
    }
    resolve([mdLinks, file]);
  })
};
const getProperties = (filePath) => {
  const regUrl = /\((.+)\)/g;
  const regText = /\[(.*)\]/g;
  const result = filePath[0].map((link) => {
    const url = link.match(regUrl)[0].slice(1, -1);
    const urlText = link.match(regText)[0].slice(1, -1);
    const linkObj = {
      file: filePath[1],
      href: url,
      text: urlText,
    };
    return linkObj;
  });
  return result;
};
module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.statSync(filePath).isFile()) {
      if (path.extname(filePath) !== '.md') {
        reject(new Error('El archivo no es de formato markdown'));
      }
      resolve(filePath);
    } else {
      const getFile = new Promise((resolve2, reject2) => {
        fs.readdir(filePath, (err, content) => {
          if (err) {
            reject(err);
          };
          const files = content.filter((file) => path.extname(file) === '.md');
          const filesPath = files.map((file) => path.join(filePath, file));
          files.length !== 0 ? resolve2(filesPath[0]) : reject2(new Error('El folder no contiene ningun archivo markdown'));
        });
      });
      resolve(getFile);
    }
  }).then((mdFiles) => {
    return numberOfLinks(mdFiles);
  }).then((result) => {
    return getProperties(result);
  });
};
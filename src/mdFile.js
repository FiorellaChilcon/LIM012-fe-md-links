const fs = require('fs');
const path = require('path');

const numberOfLinks = (arrfiles) => {
  return new Promise((resolve, reject) => {
    const result = arrfiles.map((element) => {
      const regex = /\[(.*)\]\((.+)\)/gi;
      const content = fs.readFileSync(element, 'utf8');
      let mdLinks = content.match(regex);
      if (mdLinks === null) { mdLinks = 0 }
      return [mdLinks, element];
    });
    if (result[0][0] === 0 && arrfiles.length === 1) {
      reject(new Error('El file no contiene ningun link'));
    }
    resolve(result);
  })
};
const getProperties = (arrMatches) => {
  const result = [];
  arrMatches.forEach((arr) => {
    if (arr[0] === 0) {
      const linkObj = {
        file: arr[1],
        href: 'este file no contiene links'
      };
      result.push(linkObj);
    } else {
      const regUrl = /\((.+)\)/g;
      const regText = /\[(.*)\]/g;
      arr[0].forEach((link) => {
        const url = link.match(regUrl)[0].slice(1, -1);
        const urlText = link.match(regText)[0].slice(1, -1);
        const linkObj = {
          file: arr[1],
          href: url,
          text: urlText,
        };
        result.push(linkObj);
      });
    }
  });
  return result;
};
module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.statSync(filePath).isFile()) {
      if (path.extname(filePath) !== '.md') {
        reject(new Error('El archivo no es de formato markdown'));
      }
      resolve([filePath]);
    } else {
      const getFile = new Promise((resolve2, reject2) => {
        fs.readdir(filePath, (err, content) => {
          if (err) {
            reject(err);
          };
          const files = content.filter((file) => path.extname(file) === '.md');
          const filesPath = files.map((file) => path.join(filePath, file));
          files.length !== 0 ? resolve2(filesPath) : reject2(new Error('El folder no contiene ningun archivo markdown'));
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
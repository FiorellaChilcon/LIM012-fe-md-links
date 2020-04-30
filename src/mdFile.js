const fs = require('fs');
const path = require('path');

const numberOfLinks = (arrfiles) => {
  return new Promise((resolve, reject) => {
    const result = arrfiles.map((element) => {
      const regex = /\[(.*)\]\(((?!#).+)\)/gi;
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
    const filePath = arr[1].replace(process.cwd(), '').slice(1);
    if (arr[0] === 0) {
      const linkObj = {
        file: filePath,
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
          file: filePath,
          href: url,
          text: urlText,
        };
        result.push(linkObj);
      });
    }
  });
  return result;
};
const walk = (dir) => {
  let result = [];
  fs.readdirSync(dir).forEach((element) => {
    const elementPath = path.join(dir, element);
    if (fs.statSync(elementPath).isFile()) {
      result.push(elementPath);
    } else {
      result = result.concat(walk(elementPath));
    };
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
        const files = walk(filePath).filter((file) => path.extname(file) === '.md');
        files.length !== 0 ?
          resolve2(files) :
          reject2(new Error('El folder no contiene ningun archivo markdown'));
      });
      resolve(getFile);
    }
  }).then((mdFiles) => {
    return numberOfLinks(mdFiles);
  }).then((result) => {
    return getProperties(result);
  });
};
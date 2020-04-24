/* eslint-disable no-unused-expressions */
const fs = require('fs');

const path = require('path');

const getLinks = (files) => {
  const regex = /\[(.*)\]\((.+)\)/gi;
  let filesPathArr = files;
  if (!Array.isArray(files)) {
    filesPathArr = [files];
  }
  const result = [];
  const regUrl = /\((.+)\)/g;
  const regText = /\[(.*)\]/g;
  filesPathArr.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const mdLinks = content.match(regex);
    mdLinks.forEach((link) => {
      const url = link.match(regUrl)[0].slice(1, -1);
      const textL = link.match(regText)[0].slice(1, -1);
      const linkObj = {
        href: url,
        text: textL,
        file: filePath,
      };
      result.push(linkObj);
    });
  });
  return result;
};
module.exports = (filePath) => new Promise((resolve, reject) => {
  if (fs.statSync(filePath).isFile()) {
    if (path.extname(filePath) !== '.md') {
      reject(new Error('El archivo no es de formato markdown'));
    }
    resolve(filePath);
  } else {
    const getFiles = new Promise((resolve2, reject2) => {
      fs.readdir(filePath, (err, content) => {
        if (err) {
          reject(err);
        } else {
          const files = content.filter((file) => path.extname(file) === '.md');
          const filesPath = files.map((file) => `${filePath}/${file}`);
          files.length !== 0 ? resolve2(filesPath) : reject2(new Error('El folder no contiene ningun archivo markdown'));
        }
      });
    });
    resolve(getFiles);
  }
}).then((mdFiles) => {
  const links = getLinks(mdFiles);
  return links;
});

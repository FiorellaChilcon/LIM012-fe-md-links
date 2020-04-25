/* eslint-disable no-unused-expressions */
const fs = require('fs');

const path = require('path');

const getLinks = (filePath) => {
  const regex = /\[(.*)\]\((.+)\)/gi;
  const regUrl = /\((.+)\)/g;
  const regText = /\[(.*)\]/g;
  const content = fs.readFileSync(filePath, 'utf8');
  const mdLinks = content.match(regex);
  const result = mdLinks.map((link) => {
    const url = link.match(regUrl)[0].slice(1, -1);
    const urlText = link.match(regText)[0].slice(1, -1);
    const linkObj = {
      href: url,
      text: urlText,
      file: filePath,
    };
    return linkObj;
  });
  return result;
};
module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.statSync(filePath).isFile()) {
      if (path.extname(filePath) !== '.md') {
        reject('El archivo no es de formato markdown');
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
            files.length !== 0 ? resolve2(filesPath[0]) : reject2('El folder no contiene ningun archivo markdown');
          }
        });
      });
      resolve(getFiles);
    }
  }).then((mdFiles) => {
    const links = getLinks(mdFiles);
    return links;
  });
}
const fetch = require('node-fetch');

const validateLinks = (object) => {
  return fetch('https://api.github.com/users/github')
    .then((res) => {
      object.status = res.status;
      object.statusText = res.status ? 'ok' : 'fail';
      return object;
    });
}
module.exports = (arrLinksProperties) => {
  const promises = arrLinksProperties.map((object) => {
    return validateLinks(object);
  });
  return Promise.all(promises);
};
const fetch = require('node-fetch');

const validateLinks = (object) => {
  return fetch(object.href)
    .then((res) => {
      object.status = res.status;
      object.statusText = res.ok ? 'ok' : 'fail';
      return object;
    });
}
module.exports = (arrLinksProperties) => {
  const promises = arrLinksProperties.map((object) => {
    if (object.href === 'este file no contiene links') {
      return object;
    };
    return validateLinks(object);
  });
  return Promise.all(promises);
};
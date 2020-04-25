const https = require('https');

const validateLinks = (object) => {
  return new Promise((resolve, reject) => {
    https.get(object.href, (res) => {
      object.status = res.statusCode;
      object.statusText = res.statusCode === 200 ? 'ok' : 'fail';
      resolve(object);
    });
  })
}
module.exports = (arrLinksProperties) => {
  const promises = arrLinksProperties.map((object) => {
    return validateLinks(object);
  });
  return Promise.all(promises);
};
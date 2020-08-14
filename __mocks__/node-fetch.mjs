const nodeFetch = jest.requireActual('node-fetch');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});
fetchMock.mock('https://stackoverflow.com/quesl', 404);
fetchMock.mock('*', 200);

export default fetchMock;

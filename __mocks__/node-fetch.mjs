
const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();
Object.assign(fetchMock.config, {
  fetch: nodeFetch
});
fetchMock.mock('https://stackoverflow.com/quesl', 404);
fetchMock.mock('*', 200);

export default fetchMock;
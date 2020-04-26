const mdLinks = require('../src/mdLinks.js');

describe('mdLinks', () => {
  it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', (done) => {
    return mdLinks('test/example/hi.md').then((response) => {
      expect(response).toEqual(
        [
          {
            href: 'https://www.youtube.com/',
            text: 'video de youtube',
            file: 'test/example/hi.md'
          },
          {
            href: 'https://es.wikipedia.org/wikifgg/Canis_lupus_familiaris',
            text: 'wikifail',
            file: 'test/example/hi.md'
          },
          {
            href: 'https://www.mpi.nl/corpus/html/trova/ch01s04.html',
            text: 'regex',
            file: 'test/example/hi.md'
          },
          {
            href: 'https://github.com/nodeca/pica',
            text: 'regex',
            file: 'test/example/hi.md'
          }
        ]
      );
      done();
    })
  });
  it('deberia devolver un arreglo de objetos, donde cada objeto representa un link con su validacion', () => {
    expect.assertions(1);
    return mdLinks('test/example/hi.md', { validate: true }).then((response) => {
      expect(response).toEqual(
        [
          {
            href: 'https://www.youtube.com/',
            text: 'video de youtube',
            file: 'test/example/hi.md',
            status: 200,
            statusText: 'ok'
          },
          {
            href: 'https://es.wikipedia.org/wikifgg/Canis_lupus_familiaris',
            text: 'wikifail',
            file: 'test/example/hi.md',
            status: 301,
            statusText: 'fail'
          },
          {
            href: 'https://www.mpi.nl/corpus/html/trova/ch01s04.html',
            text: 'regex',
            file: 'test/example/hi.md',
            status: 200,
            statusText: 'ok'
          },
          {
            href: 'https://github.com/nodeca/pica',
            text: 'regex',
            file: 'test/example/hi.md',
            status: 200,
            statusText: 'ok'
          }
        ])
    })
  });
  it('deberia regresar el error cuando se pone una direccion inexistente', () => {
    return expect(mdLinks('./some/error.md', { validate: true })).rejects.toMatch('No existe el archivo o directorio');
  });
  it('deberia regresar el error cuando se pone una direccion existente que no contiene markdown files', () => {
    return expect(mdLinks('src', { validate: true })).rejects.toMatch('El folder no contiene ningun archivo markdown');
  });
  it('deberia regresar el error cuando no se encuentra ningun link en el file', () => {
    return expect(mdLinks('test/example/otherfile.md', { validate: true })).rejects.toMatch('El file no contiene ningun link');
  });
  it('deberia regresar el error cuando el archivo no es Markdown', () => {
    return expect(mdLinks('src/mdLinks.js', { validate: true })).rejects.toMatch('El archivo no es de formato markdown');
  });
});
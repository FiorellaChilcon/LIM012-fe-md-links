const mdLinks = require('../src/mdLinks.js');

describe('mdLinks', () => {
  it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', (done) => {
    return mdLinks('test/example', { validate: true }).then((response) => {
      expect(response).toEqual(
        [
          {
            file: 'test\\example\\hi.md',
            href: 'https://www.youtube.com/',
            text: 'video de youtube',
            status: 200,
            statusText: 'ok'
          },
          {
            file: 'test\\example\\hi.md',
            href: 'https://stackoverflow.com/quesl',
            text: 'stackoverflow',
            status: 404,
            statusText: 'fail'
          },
          {
            file: 'test\\example\\hi.md',
            href: 'https://www.mpi.nl/corpus/html/trova/ch01s04.html',
            text: 'regex',
            status: 200,
            statusText: 'ok'
          },
          {
            file: 'test\\example\\hi.md',
            href: 'https://github.com/nodeca/pica',
            text: 'github page',
            status: 200,
            statusText: 'ok'
          },
          {
            file: 'test\\example\\otherfile.md',
            href: 'este file no contiene links'
          }
        ]);
      done();
    })
  });
  it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', (done) => {
    return mdLinks('test/example/hi.md').then((response) => {
      expect(response).toEqual(
        [
          {
            file: 'test/example/hi.md',
            href: 'https://www.youtube.com/',
            text: 'video de youtube'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://stackoverflow.com/quesl',
            text: 'stackoverflow'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://www.mpi.nl/corpus/html/trova/ch01s04.html',
            text: 'regex'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://github.com/nodeca/pica',
            text: 'github page'
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
            file: 'test/example/hi.md',
            href: 'https://www.youtube.com/',
            text: 'video de youtube',
            status: 200,
            statusText: 'ok'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://stackoverflow.com/quesl',
            text: 'stackoverflow',
            status: 404,
            statusText: 'fail'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://www.mpi.nl/corpus/html/trova/ch01s04.html',
            text: 'regex',
            status: 200,
            statusText: 'ok'
          },
          {
            file: 'test/example/hi.md',
            href: 'https://github.com/nodeca/pica',
            text: 'github page',
            status: 200,
            statusText: 'ok'
          }
        ])
    })
  });
  it('deberia regresar el error cuando se pone una direccion inexistente', () => {
    const error = new Error('No existe el archivo o directorio');
    return expect(mdLinks('./some/error.md', { validate: true })).rejects.toEqual(error);
  });
  it('deberia regresar el error cuando se pone una direccion existente que no contiene markdown files', () => {
    const error = new Error('El folder no contiene ningun archivo markdown');
    return expect(mdLinks('src', { validate: true })).rejects.toEqual(error);
  });
  it('deberia regresar el error cuando no se encuentra ningun link en el file', () => {
    const error = new Error('El file no contiene ningun link');
    return expect(mdLinks('test/example/otherfile.md', { validate: true })).rejects.toEqual(error);
  });
  it('deberia regresar el error cuando el archivo no es Markdown', () => {
    const error = new Error('El archivo no es de formato markdown');
    return expect(mdLinks('src/mdLinks.js', { validate: true })).rejects.toEqual(error);
  });
});
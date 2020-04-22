// ----------- PROBANDO REQUIRE -----------------
// const indexFuncion = require('../src/mdLinks.js');
//   test('deberia devolver un hola', () => {
//       expect(indexFuncion.hola()).toBe('hola');
//   })
// ----------- TEST ASINCRONICO -----------------
// const indexFuncion = require('../src/mdLinks.js);
// test('deberia devolver un hola', () => {
//     expect.assertions(1);
//     return indexFuncion.hola().then((response) => {
//         expect(response).toBe('hola')
//     })
//       })
const mdLinks = require('../src/mdLinks.js');
describe('mdLinks', () => {
    it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', (done) => {
        // expect.assertions(1); probando done
        return mdLinks('./some/example.md').then((response) => {
            expect(response).toEqual(
                [{
                    href: 'https://www.youtube.com/',
                    text: 'video de youtube',
                    file: 'example/hi.md',
                },
                {
                    href: 'https://es.wikipedia.org/wiki/Canis_lupus_familiaris',
                    text: 'wikipedia',
                    file: 'example/hi.md',
                },
                {
                    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
                    text: 'asincronia',
                    file: 'example/hi.md',
                }]);
                done();
        })
    });
    it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', () => {
        expect.assertions(1);
        return mdLinks('./some/example.md', { validate: true }).then((response) => {
            expect(response).toEqual(
                [{
                    href: 'https://www.youtube.com/',
                    text: 'video de youtube',
                    file: 'example/hi.md',
                    status: 200,
                    statusText: 'ok'
                },
                {
                    href: 'https://es.wikipedia.org/wiki/Canis_lupus_familiaris',
                    text: 'wikipedia',
                    file: 'example/hi.md',
                    status: 200,
                    statusText: 'ok'
                },
                {
                    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
                    text: 'asincronia',
                    file: 'example/hi.md',
                    status: 400,
                    statusText: 'fail'
                }])
        })
    });
    it('deberia regresar el error cuando se pone una direccion inexistente', () => {
        expect.assertions(1);
        return mdLinks('./some/error.md', { validate: true }).rejects.toMatch('No existe el archivo o directorio');
    });
    it('deberia regresar el error cuando se pone una direccion existente que no contiene markdown files', () => {
        expect.assertions(1);
        return mdLinks('src', { validate: true }).rejects.toMatch('El folder no contiene ningun archivo markdown');
    });
    it('deberia regresar el error cuando no se encuentra ningun link en el file', () => {
        expect.assertions(1);
        return mdLinks('./some/filevacio.md', { validate: true }).rejects.toMatch('El file no contiene ningun link');
    });
    it('deberia regresar el error cuando el archivo no es Markdown', () => {
        expect.assertions(1);
        return mdLinks('src/mdLinks.js', { validate: true }).rejects.toMatch('El file no contiene ningun link');
    })
});
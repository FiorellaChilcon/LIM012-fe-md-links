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
    it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', () => {
        expect.assertions(1);
        return mdLinks('./some/example.md').then((response) => {
            expect(response).toEqual([{ href, text, file }])
        })
    });
    it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', () => {
        expect.assertions(1);
        return mdLinks('./some/example.md', { validate: true }).then((response) => {
            expect(response).toEqual([{ href, text, file, status, ok }])
        })
    })
});
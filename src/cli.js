#!/usr/bin/env node
const mdLinks = require('../src/mdLinks.js');

const arguments = process.argv;
const getkeyValues = (arrOfObjects) => {
    let result = '';
    arrOfObjects.forEach((link) => {
        let properties = '';
        const linkKeys = Object.keys(link);
        linkKeys.forEach((property) => {
            properties += `${link[property]} `;
        });
        result += `${properties} \n`;
    });
    return result;
};
const statistics = (arrOfObjects) => {
    const links = arrOfObjects.map((element) => element['href']);
    const uniqueLinks = Array.from(new Set(links));
    return `Total: ${arrOfObjects.length}\nUnique: ${uniqueLinks.length}`;
}
const validationStats = (arrOfObjects) => {
    const stats = statistics(arrOfObjects);
    const links = arrOfObjects.map((element) => element['status']);
    const brokenLinks = links.filter((element) => element !== 200);
    return `${stats}\nBroken: ${brokenLinks.length}`;
}
const result = (args) => {
    if (args.length === 3) {
        return mdLinks(args[2])
            .then((arr) => getkeyValues(arr));
    } else if (args.length === 4 && args[3] === '--validate') {
        return mdLinks(args[2], { validate: true })
            .then((arr) => getkeyValues(arr));
    } else if (args.length === 4 && args[3] === '--stats') {
        return mdLinks(args[2], { validate: true })
            .then((re) => statistics(re));
    } else if (args.length === 5 && args[3] === '--stats' && args[4] === '--validate') {
        return mdLinks(args[2], { validate: true })
            .then((re) => validationStats(re));
    }
};
result(arguments)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));;
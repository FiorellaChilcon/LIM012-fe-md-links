#!/usr/bin/env node
const mdLinks = require('./mdLinks.js');

const chalk = require('chalk');

const arguments = process.argv;
const getkeyValues = (arrOfObjects) => {
    let result = ``;
    arrOfObjects.forEach((link) => {
        let properties = '';
        const linkKeys = Object.keys(link);
        linkKeys.forEach((property) => {
            if (link[property] === 'ok') {
                properties += chalk.green(link[property]);
            } else if (link[property] === 'fail') {
                properties += chalk.red(link[property]);;
            } else {
                properties += `${link[property]} `;
            }
        });
        result += `${properties} \n`;
    });
    return result;
};
const statistics = (arrOfObjects) => {
    const links = arrOfObjects.map((element) => element['href']);
    const uniqueLinks = Array.from(new Set(links));
    return `${chalk.green('Total:')} ${arrOfObjects.length}\n${chalk.green('Unique:')} ${uniqueLinks.length}`;
}
const validationStats = (arrOfObjects) => {
    const stats = statistics(arrOfObjects);
    const links = arrOfObjects.map((element) => element['status']);
    const brokenLinks = links.filter((element) => element !== 200);
    return `${stats}\n${chalk.yellow('Broken:')} ${brokenLinks.length}`;
};
const help = `${chalk.green('md-links help')}
 Estos son los comandos disponibles que puedes correr junto con md-links:
  ${chalk.cyan('--validate')}: averigua si los links encontrados funcionan o no.
  ${chalk.cyan('--stats')}: obtén estadísticas básicas sobre los links.
  ${chalk.cyan('--stats --validate')}: obtén estadísticas que necesiten los resultados de la validación de los links.
 El comportamiento por defecto ${chalk.blue('md-links ./some/example.md')} identifica el archivo markdown, 
 lo analiza e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y
 el texto que hay dentro del link (truncado a 50 caracteres).`;
const result = (args) => {
    if (args.length === 3 && args[2] === '--help') {
        return new Promise((resolve) => { resolve(help) });
    } else if (args.length === 3) {
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
    } else {
        return new Promise((resolve) => { resolve(chalk.cyan('Necesitas ayuda con los comandos? \nEscribe md-links --help')) });
    }
};
result(arguments)
    .then((res) => console.log(res))
    .catch((e) => console.log(chalk.red(e)));
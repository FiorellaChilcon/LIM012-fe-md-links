#!/usr/bin/env node

const mdLinks = require('./mdLinks.js');

const chalk = require('chalk');

const arguments = process.argv;
const getkeyValues = (arrOfObjects) => {
    let result = ``;
    arrOfObjects.forEach((link) => {
        let properties = '';
        const linkKeys = Object.keys(link);
        properties += `${link['file']} ${chalk.cyan(link['href'])} `;
        if (linkKeys.length === 5) {
            link['statusText'] === 'ok' ?  properties += chalk.green(link['statusText']) : properties += chalk.red(link['statusText']);
            properties += ` ${chalk.yellow(link['status'])} `;
        };
        if (linkKeys.length > 2) {
            properties += `${link['text']} `;
        };
        result += `${properties} \n`;
    });
    return result;
};
const statistics = (arrOfObjects) => {
    const linksWithStatus = arrOfObjects.filter((element) => Object.keys(element).length > 2);
    const links = linksWithStatus.map((element) => element['href']);
    const uniqueLinks = Array.from(new Set(links));
    return `${chalk.green('Total:')} ${linksWithStatus.length}\n${chalk.green('Unique:')} ${uniqueLinks.length}`;
}
const validationStats = (arrOfObjects) => {
    const stats = statistics(arrOfObjects);
    const linksWithStatus = arrOfObjects.filter((element) => Object.keys(element).length > 2);
    const brokenLinks = linksWithStatus.filter((element) => element['status'] !== 200);
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
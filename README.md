# mdLinks

> Lee y analiza archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

![markdown](https://user-images.githubusercontent.com/58056552/80736460-cb33e900-8ad7-11ea-8ba6-2e120031dc18.png)

__Content__
- [Install](#install)
- [Ejemplos de uso](#ejemplos-de-uso)
  - [JavaScript API](#javaScript-api)
  - [CLI](#cli)
- [Diagrama de flujo](#diagrama-de-flujo)
- [Boilerplate](#boilerplate)

## INSTALL
``` set up

npm install --global FiorellaChilcon/LIM012-fe-md-links

```

## EJEMPLOS DE USO

### JavaScript API
#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);
```

### CLI
Se ejecuta de la siguiente manera a través de la terminal:

```
$ md-links test/folderToTest/example
```

![byDefault](https://user-images.githubusercontent.com/58056552/80735307-1ea53780-8ad6-11ea-9650-11d6f107c5a0.PNG)

Por defecto no valida si las URLs responden ok o no, solo identifica el archivo markdown, lo analiza e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

#### Options

> --validate

Con la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no.

```
$ md-links test/folderToTest/example --validate
```

![validate](https://user-images.githubusercontent.com/58056552/80736234-72fce700-8ad7-11ea-8516-cc6f177bc9a5.PNG)

El output en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

> --stats

Con la opción `--stats` el output será un texto con estadísticas
básicas sobre los links.

```
$ md-links test/folderToTest/example --stats
```

![stats](https://user-images.githubusercontent.com/58056552/80736299-8dcf5b80-8ad7-11ea-9dcd-54ffcc06e07f.PNG)


También se puede combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.


```
$ md-links test/folderToTest/example --stats --validate
```

![validatestats](https://user-images.githubusercontent.com/58056552/80736346-9f186800-8ad7-11ea-8157-1258d9a54835.PNG)


> --help

```
md-links --help
```

Con esta opción obtienes una guía de como usar las opciones disponibles.

### DIAGRAMA DE FLUJO
![Diagram](https://user-images.githubusercontent.com/58056552/80736415-b8211900-8ad7-11ea-8a36-454a7177f7a6.png)

### BOILERPLATE
```text
.
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── src
|  ├── mdLinks.js
|  ├── cli.js
|  └── mdFile.js
|  └── validate.js
└── test
   └── test.js
```

# mdLinks

> Lee y analiza archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

![Frame 6](https://user-images.githubusercontent.com/58056552/89218050-f45e8c80-d592-11ea-9097-d420118cd448.png)

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
const mdLinks = require("mdLinks");

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

![byDefault](https://user-images.githubusercontent.com/58056552/80850029-682d7980-8bdf-11ea-8a7f-a140b321d184.PNG)

Por defecto no valida si las URLs responden ok o no, solo identifica el archivo markdown, lo analiza e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

#### Options

> --validate

Con la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no.

![validate](https://user-images.githubusercontent.com/58056552/80850052-87c4a200-8bdf-11ea-8896-480bce628709.PNG)

El output en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

> --stats

Con la opción `--stats` el output será un texto con estadísticas
básicas sobre los links.

![stats](https://user-images.githubusercontent.com/58056552/80850058-99a64500-8bdf-11ea-84e9-963f59ad1edd.PNG)

También se puede combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

![validatestats](https://user-images.githubusercontent.com/58056552/80850067-a9be2480-8bdf-11ea-9a23-66c8722d8de6.PNG)

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

### prueba

texto....................
### otro link
textooooooooooooooooooooo
Si se indica un parámetro thisArg a un map, se usará como valor de this en la función - [Diagrama de flujo](#diagrama-de-flujo)
- [Boilerplate](#boilerplate)
- [Install](#install)
- [Uso](#ejemplo-de-uso)
  - [JavaScript API](#javaScript-api)
El rango de elementos procesado por map es establecido antes de la primera invocación del callback. Los elementos que sean agregados al array después de que la llamada a map comience no serán visitados por el callback. Si los elementos existentes del array son modificados o eliminados, su valor pasado al callback será el valor en el momento que el map lo visita; los elementos que son eliminados no son visitados.
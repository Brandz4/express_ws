//Para importar una dependencia. 
const express = require('express');
const app = express(); 
//Con el ./ se indica que el archivo está en la misma carpeta. 
//Con las llaves extrae tral cual el elemento que se esta importando. 
const {pokemon} = require('./pokedex.json');

/*
Verbos HTTP: 
GET: Sirver para obtener un recurso.
POST: Para guardar o publicar algo. 
PATCH: Destinado a la actualización de un dato o registro especifico. 
PUT: Modifica todos los elementos a diferencia de patch que solo uno.
DELETE: Elimina un recuros, o sea, en registro de la db por ejemplo. 
*/

/*Get recibe dos parámetros, el nombre de la ruta y una función con tres argumentos: 
req: es la petición que hace el cliente, el navegador normalmente.
res: objeto que permite contestar la petición realizada. 
next
*/
app.get("/", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    res.status(200);
    res.send("Welcome to Pokedex");
});

app.get("/pokedex", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    res.status(200);
    res.send(pokemon);
});

app.get("/pokedex/:id", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    let id = req.params.id; 
    res.status(200);
    res.send(pokemon[id-1]);
});

//Los dos puntos sirve para indicar que en dicha ruta el valor que tenga ahí se va a almacenar en una variable con el nombre escrito, name en este caso.
//Para obtener información de la url: req.params.name
app.get("/:name", (req, res, next) =>{
    let name = req.params.name; 
    console.log(name); 
    res.status(200);
    res.send("Welcome "+name);
});

//Para levantar un servidor se utiliza el .listen, con dos parámetros, el puerto y la función a ejecutar cuando el servidor esté funcionando. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running in port 3000');
});
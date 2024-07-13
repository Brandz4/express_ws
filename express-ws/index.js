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

//Se implementa regexp para que la ruta solo acepte numeros en dicha sección. 
app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    let id = req.params.id - 1; 
    if(id >= 0 && id <= 150){
        res.status(200).send(pokemon[req.params.id-1]);
    }else{
        res.status(200).send("Pokemon not found");
    }
});

app.get("/pokemon/all", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    res.status(200);
    res.send(pokemon);
});

//Los dos puntos sirve para indicar que en dicha ruta el valor que tenga ahí se va a almacenar en una variable con el nombre escrito, name en este caso.
//Para obtener información de la url: req.params.name
app.get("/:name", (req, res, next) =>{
    let name = req.params.name; 
    console.log(name); 
    res.status(200);
    res.send("Welcome "+ name);
});

app.get("/pokemon/:name", (req, res, next) => {
    res.status(200);
    const name = req.params.name;
        pokemon.forEach(i => {
            if(i.name == name){
                res.status(200).send(i);
            }
        });
        res.status(404).send("Pokemon not found");
});

//Para levantar un servidor se utiliza el .listen, con dos parámetros, el puerto y la función a ejecutar cuando el servidor esté funcionando. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running in port 3000');
});
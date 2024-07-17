//Para importar una dependencia. 
const bodyParser = require('body-parser');
const express = require('express');
const app = express(); 
//Con el ./ se indica que el archivo está en la misma carpeta. 
//Con las llaves extrae tral cual el elemento que se esta importando. 
const {pokemon} = require('./pokedex.json');

//Para hacer que a alguna función se le aplique a todas las peticiones que entren al servidor, en este caso hacerlas json. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
Verbos HTTP: 
GET: Sirver para obtener un recurso.
POST: Para guardar o crear recursos. 
PATCH: Destinado a la actualización de un dato o registro especifico. 
PUT: Modifica todos los elementos a diferencia de patch que solo uno.
DELETE: Elimina un recuro, o sea, en registro de la db por ejemplo. 
*/

/*Get recibe dos parámetros, el nombre de la ruta y una función con tres argumentos: 
req: es la petición que hace el cliente, el navegador normalmente.
res: objeto que permite contestar la petición realizada. 
next
*/
app.get("/", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    return res.status(200).send("Welcome to Pokedex");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body);
});

//Se implementa regexp para que la ruta solo acepte numeros en dicha sección. 
app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    let id = req.params.id - 1; 
    if(id >= 0 && id <= 150){
        return res.status(200).send(pokemon[req.params.id-1]);
    }else{
        return res.status(200).send("Pokemon not found");
    }
});

app.get("/pokemon", (req, res, next) => {
    //const pokemon = pokedex.pokemon;
    return res.status(200).send(pokemon);
});

//Los dos puntos sirve para indicar que en dicha ruta el valor que tenga ahí se va a almacenar en una variable con el nombre escrito, name en este caso.
//Para obtener información de la url: req.params.name
app.get("/:name", (req, res, next) =>{
    let name = req.params.name; 
    console.log(name); 
    return res.status(200).send("Welcome "+ name);
});

//La diferencia entre usar un foreach o .filter para encontrar un elemento en un arreglo es que el foreach retorna especificamente el valor que le pides
//que retorne y el .filter retorna el arreglo como tal directamente, además de hacer la iteración automática
// para casos con nombres iguales retorna todas las coincidencias. 
app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
    const name = req.params.name.toUpperCase();

    //Filtrar el Pokémon con el nombre especificado
    const pk = pokemon.filter(p => p.name.toUpperCase() === name);

    //Un operador ternario (if con diferente estructura) tiene la siguente estructura, no es necesario uncluir return: 
    //condición ? valor si es verdadero : valor si es falso
    (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon not found");

});

//Para levantar un servidor se utiliza el .listen, con dos parámetros, el puerto y la función a ejecutar cuando el servidor esté funcionando. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running in port 3000');
});
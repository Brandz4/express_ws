const express = require('express');
const pokemon = express.Router();
//Con el ./ se indica que el archivo está en la misma carpeta. 
//Con las llaves extrae tral cual el elemento que se esta importando. 
//const {pk} = require('../pokedex.json');
//De la siguiente forma se importa todo el archivo
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

//Se implementa regexp para que la ruta solo acepte numeros en dicha sección. 
pokemon.get("/:id([0-9]{1,3})", (req, res, next) => {
    let id = req.params.id - 1; 
    (id >= 0 && id <= 150) ? res.status(200).send(pk[req.params.id-1]) : res.status(404).send("Pokemon not found");
});

pokemon.get("/", (req, res, next) => {
    return res.status(200).send(pk);
});

//La diferencia entre usar un foreach o .filter para encontrar un elemento en un arreglo es que el foreach retorna especificamente el valor que le pides
//que retorne y el .filter retorna el arreglo como tal directamente, además de hacer la iteración automática
// para casos con nombres iguales retorna todas las coincidencias. 
pokemon.get("/:name([A-Za-z]+)", (req, res, next) => {
    const name = req.params.name.toUpperCase();

    //Filtrar el Pokémon con el nombre especificado
    const pkmn = pk.filter(p => p.name.toUpperCase() === name);

    //Un operador ternario (if con diferente estructura) tiene la siguente estructura, no es necesario uncluir return: 
    //condición ? valor si es verdadero : valor si es falso
    (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokemon not found");

});

//Para exportar: 
module.exports = pokemon; 
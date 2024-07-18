const express = require('express');
const pokemon = express.Router();

const db = require('../config/db');

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience ){
    const query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)"+
    ` VALUES ('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;

    const rows = await db.query(query);
    (rows.affectedRows == 1) ? res.status(200).json({code: 201, message: "Pokemon inserted"}) : 
    res.status(404).json({ code: 404, message: "Pokemon not inserted"}); 
    }
    
    return res.status(500).json({ code: 500, message: "Incomplete fields"});
});

//La siguiente ruta ejecuta una función asincrona debido a que espera al resultado de la consulta para continuar con su ejecución. 
pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pkmn});
});

//Se implementa regexp para que la ruta solo acepte numeros en dicha sección. 
pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
    let id = req.params.id; 
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = ?", [id]);
    (id >= 1 && id <= 722) ? res.status(200).json({code: 200, message: pkmn}) : res.status(404).json({ code: 404, message: "Pokemon not found"});
});

//La diferencia entre usar un foreach o .filter para encontrar un elemento en un arreglo es que el foreach retorna especificamente el valor que le pides
//que retorne y el .filter retorna el arreglo como tal directamente, además de hacer la iteración automática
// para casos con nombres iguales retorna todas las coincidencias. 
pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = ?", [name]);
    //Filtrar el Pokémon con el nombre especificado
    const pkm = pkmn.filter(p => p.pok_name.toLowerCase() === name);

    //Un operador ternario (if con diferente estructura) tiene la siguente estructura, no es necesario uncluir return: 
    //condición ? valor si es verdadero : valor si es falso
    (pkm.length > 0) ? res.status(200).json({code: 200, message: pkm}) : res.status(404).json({ code: 404, message: "Pokemon not found"});

});

//Para exportar: 
module.exports = pokemon; 
const mysql = require('mysql');
//Para trabajar de manera asincrona con las peticiones realizadaas a la base de datos:
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

//las promesas ayudan a conocer el estatus de alguna interacción con la database. 
pool.query = util.promisify(pool.query);
module.exports = pool; 
//Para importar una dependencia. 
const morgan = require('morgan');
const express = require('express');
const app = express(); 
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

//Dependencia de desarrollo, que imprime en consola el estado de las interacciones con el servidor:
app.use(morgan('dev'));
//Para hacer que a alguna función se le aplique a todas las peticiones que entren al servidor, en este caso hacerlas json. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).json({code: 200, message: "Welcome to Pokedex"});
});

//para idicar que todas las rutas que comiencen así van a ser atendidas en el script de pokemon.js
app.use("/pokemon", pokemon);

app.use("/user", user);
//Los dos puntos sirve para indicar que en dicha ruta el valor que tenga ahí se va a almacenar en una variable con el nombre escrito, name en este caso.
//Para obtener información de la url: req.params.name
app.get("/:name", (req, res, next) =>{
    let name = req.params.name; 
    return res.status(200).json({ code: 200, message: "Welcome "+ name});
});

//Mensaje de error génerico para todas las rutas con retorno 404. 
app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL not found" });
});

//Para levantar un servidor se utiliza el .listen, con dos parámetros, el puerto y la función a ejecutar cuando el servidor esté funcionando. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running in port 3000');
});
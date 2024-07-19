//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express(); 

//Routes
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound'); 
const index = require('./middleware/index');

//Dependencia de desarrollo, que imprime en consola el estado de las interacciones con el servidor:
app.use(morgan('dev'));
//Para hacer que a alguna función se le aplique a todas las peticiones que entren al servidor, en este caso hacerlas json. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

//para idicar que todas las rutas que comiencen así van a ser atendidas en el script correspondiente: 
app.use("/user", user);
//Verificar token: 
app.use(auth);
app.use("/pokemon", pokemon);

//Llamar middleware para ruta incorrecta. 
app.use(notFound);

//Para levantar un servidor se utiliza el .listen, con dos parámetros, el puerto y la función a ejecutar cuando el servidor esté funcionando. 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running in port 3000');
});
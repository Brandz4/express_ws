const jwt = require('jsonwebtoken');

//La siguiente función verifica el token generado al iniciar sesión recibiendolo mediante el header.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({code: 401, message: "You don't have acces"});
    }
}
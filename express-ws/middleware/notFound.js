//Mensaje de error génerico para todas las rutas con retorno 404. 
module.exports = (req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL not found" });
}
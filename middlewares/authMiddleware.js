const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
    const bearer = req.header("Authorization");
    if (!bearer) {
        return res.status(401).json({ message: "Acceso no autorizado" });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acceso no autorizado" });
    }

    try{
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT verificado: ", verificado);
        req.user = verificado;
        next();
    }catch (error){
        res.status(400).json({ message: "Token no válido" });
    }
}
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        let [type, token] = authorization.split(" ");

        if (type === 'Token' || type === 'Bearer') {
            const openToken = jwt.verify(token, process.env.SECRET);
            console.log('contenido del token', openToken);
            req.user = openToken.user;

            next();
        } else {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
    } catch (error) {
        res.json({ message: 'Hubo un error', error });
    }
}
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Acceso denegado, token requerido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // ✅ Guarda el usuario autenticado

        console.log('📌 Usuario autenticado en middleware:', req.usuario); // ✅ Depuración

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
};

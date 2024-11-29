const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta'; // Asegúrate de que coincida con el controlador de autenticación

// Middleware para verificar el token
exports.verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Se requiere un token para acceder' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.usuario = decoded; // Añade los datos del usuario al objeto req
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Guardar información del usuario en la solicitud
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };

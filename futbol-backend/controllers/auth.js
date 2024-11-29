const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET_KEY = 'tu_clave_secreta';

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body; // Cambiado "contraseña" a "password"

    const usuario = await User.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(password, usuario.password); // Cambiado "contraseña" a "password"
    if (!esValida) {
      return res.status(401).json({ error: 'Password incorrecto' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

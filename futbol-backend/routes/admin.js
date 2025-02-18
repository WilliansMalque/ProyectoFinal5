const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/crear-usuario', async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password || !rol) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoUsuario = await User.create({ nombre, correo, password, rol });
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en /crear-usuario:', error);
    res.status(500).json({ error: error.message || 'Error desconocido' });
  }
});

module.exports = router;

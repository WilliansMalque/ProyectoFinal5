const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Crear usuario
router.post('/crear-usuario', async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body;

        // Validar datos recibidos
        if (!nombre || !correo || !contraseña || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear usuario
        const nuevoUsuario = await User.create({ nombre, correo, contraseña, rol });
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error en /crear-usuario:', error); // Log completo en la consola
        res.status(500).json({ error: error.message || 'Error desconocido' });
    }
});


module.exports = router;

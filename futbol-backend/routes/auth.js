const express = require('express');
const { login } = require('../controllers/auth');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;

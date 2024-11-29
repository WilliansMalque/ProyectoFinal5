const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const { verificarToken } = require('../middleware/auth');

const authMiddleware = require('../middleware/auth');
const { obtenerReservas, crearReserva } = require('../controllers/reserva');

router.get('/reservas', authMiddleware, obtenerReservas);
router.post('/reservar', authMiddleware, crearReserva);

// Crear una reserva (protegida)
router.post('/reservar', verificarToken, async (req, res) => {
    try {
        const { id_cancha, id_usuario, fecha, hora } = req.body;

        // Verificar si ya existe una reserva en ese horario
        const existeReserva = await Reserva.findOne({ where: { id_cancha, fecha, hora } });
        if (existeReserva) {
            return res.status(400).json({ error: 'La cancha ya está reservada en ese horario' });
        }

        const nuevaReserva = await Reserva.create({ id_cancha, id_usuario, fecha, hora });
        res.status(201).json({ message: 'Reserva creada exitosamente', reserva: nuevaReserva });
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ error: 'Error al realizar la reserva' });
    }
});

// Obtener todas las reservas (sin protección, si se permite acceso público)
router.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ error: 'Error al obtener reservas' });
    }
});

// Eliminar reserva por ID (protegida)
router.delete('/reservas/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const reservaEliminada = await Reserva.destroy({ where: { id } });

        if (reservaEliminada) {
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
});

// Actualizar reserva por ID (protegida)
router.put('/reservas/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cancha, fecha, hora } = req.body;

        const reserva = await Reserva.findByPk(id);

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Actualizar datos de la reserva
        reserva.id_cancha = id_cancha || reserva.id_cancha;
        reserva.fecha = fecha || reserva.fecha;
        reserva.hora = hora || reserva.hora;

        await reserva.save();

        res.status(200).json({ message: 'Reserva actualizada exitosamente', reserva });
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
});

module.exports = router;

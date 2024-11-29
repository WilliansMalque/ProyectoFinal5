const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Habilita CORS
app.use(bodyParser.json());

// Rutas
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }) // Cambia a true si quieres reiniciar las tablas
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch((err) => console.error('Error al sincronizar modelos:', err));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



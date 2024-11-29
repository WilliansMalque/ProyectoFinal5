const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Importar la instancia de Sequelize
const cors = require('cors');

// Importar rutas
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => console.log('Modelos sincronizados con la base de datos'))
  .catch((err) => console.error('Error al sincronizar modelos:', err));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

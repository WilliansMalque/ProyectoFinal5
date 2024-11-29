const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const User = require('./User')(sequelize);
const Reserva = require('./Reserva')(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
  Reserva,
};

module.exports = db;

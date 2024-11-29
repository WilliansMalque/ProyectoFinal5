const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Reserva extends Model {}

  Reserva.init(
    {
      id_cancha: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Reserva',
    }
  );

  return Reserva;
};

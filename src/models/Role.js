const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Rol', {
  idRol: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  Rol: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'rol',
  timestamps: true,
});

module.exports = Role;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Factura = sequelize.define('Factura', {
  idFactura: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  FechaFra: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  Factura: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  Contrato: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  Mes: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  Clase: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  Servicio: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  AntesImptos: {
    type: DataTypes.INTEGER, 
    allowNull: true
  },
  Imptos: {
    type: DataTypes.INTEGER, 
    allowNull: true
  },
  Facturado: {
    type: DataTypes.INTEGER, 
    allowNull: true
  }
}, {
  tableName: 'factura',
  timestamps: false
});

module.exports = Factura;
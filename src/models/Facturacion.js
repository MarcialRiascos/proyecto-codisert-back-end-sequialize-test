const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que la configuración de Sequelize esté correcta

const Facturacion = sequelize.define('Facturacion', {
  idFacturacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NombreDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Url: {
    type: DataTypes.STRING(255),
    allowNull: false,
    get() {
      const url = this.getDataValue('Url');  // Obtén el valor del campo 'Url'
      const host = process.env.HOST_URL_PROD || 'https://proyecto-codisert-back-end-sequialize.onrender.com/';  // Usa la variable de entorno o un valor predeterminado
      return url ? `${host}${url}` : null;  // Devuelve la URL completa
    },
  },
}, {
  tableName: 'facturacion', 
  timestamps: true, 
});

module.exports = Facturacion;
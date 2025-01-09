const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que esté apuntando a tu archivo de configuración de Sequelize
const Estado = require('../models/Estado');
const Estrato = require('../models/Estrato');
const TipoDocumento = require('../models/TipoDocumento');
const Administrador = require('../models/Administrador');
const Sexo = require('../models/Sexo');
const Documento = require('../models/Documento');  // Importar el modelo Documento


const Beneficiario = sequelize.define('Beneficiario', {
  idBeneficiario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Contrato: {
    type: DataTypes.STRING(45),
    unique: true,
    allowNull: true,
  },
  Nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  TipoDocumento_idTipoDocumento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NumeroDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  Telefono: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Celular: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  TelefonoTres: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Correo: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  FechaNacimiento: {
    type: DataTypes.DATEONLY, // Para guardar solo la fecha
    allowNull: true,
  },
  FechaInicio: {
    type: DataTypes.DATEONLY, // Para guardar solo la fecha
    allowNull: false,
  },
  FechaFin: {
    type: DataTypes.DATEONLY, // Para guardar solo la fecha
    allowNull: true,
  },
  CodigoDaneDpmto: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  CodigoDaneMunicipio: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Departamento: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Municipio: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Servicio: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Direccion: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ViaPrincipalClave: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  ViaPrincipalValor: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  ViaSecundariaClave: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  ViaSecundariaValor: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  ViaSecundariaValorDos: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  TipoUnidadUnoClave: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  TipoUnidadUnoValor: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  TipoUnidadDosClave: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  TipoUnidadDosValor: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Barrio: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Anexo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Estado_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Estrato_idEstrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Administrador_idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Sexo_idSexo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'beneficiario',
  timestamps: true, // Esto lo mantiene como en la tabla con "created_at" y "updated_at"
});

// Relación con otros modelos
Beneficiario.belongsTo(Estado, {
  foreignKey: 'Estado_idEstado',
  targetKey: 'idEstado',
  as: 'estado',
});

Beneficiario.belongsTo(Estrato, {
  foreignKey: 'Estrato_idEstrato',
  targetKey: 'idEstrato',
  as: 'estrato',
});

Beneficiario.belongsTo(TipoDocumento, {
  foreignKey: 'TipoDocumento_idTipoDocumento',
  targetKey: 'idTipoDocumento',
  as: 'tipoDocumento',
});

Beneficiario.belongsTo(Administrador, {
  foreignKey: 'Administrador_idAdministrador',
  targetKey: 'idAdministrador',
  as: 'administrador',
});

Beneficiario.belongsTo(Sexo, {
  foreignKey: 'Sexo_idSexo',
  targetKey: 'idSexo',
  as: 'sexo',
});


// Beneficiario.hasMany(Documento, {
//   foreignKey: 'Beneficiario_idBeneficiario',
//   targetKey: 'idBeneficiario',
//   as: 'documentos',
// });

module.exports = { Beneficiario };
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes'); 
const registerAdminRoutes = require('./routes/registerAdminRoutes'); 
const registerBeneficiaryRoutes = require('./routes/registerBeneficiaryRoutes'); 
const estadoRoutes = require('./routes/estadoRoutes'); 
const estratoRoutes = require('./routes/estratoRoutes'); 
const historialCambioRoutes = require('./routes/historialCambioRoutes'); 
const roleRoutes = require('./routes/roleRoutes'); 
const sexoRoutes = require('./routes/sexoRoutes'); 
const tipoDocumentoRoutes = require('./routes/tipoDocumentoRoutes'); 
const viaRoutes = require('./routes/viaRoutes'); 
const tipoUnidadRoutes = require('./routes/tipoUnidadRoutes'); 
const barrioRoutes = require('./routes/barrioRoutes'); 
const facturacionRoutes = require('./routes/facturacionRoutes'); 
const morgan = require('morgan');
const path = require('path');

// Importa la conexión de Sequelize
const sequelize = require('./config/db');
const { Beneficiario } = require('./models/Beneficiario');
const Documento = require('./models/Documento');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'https://front-codi-test.vercel.app',
    'https://proyecto-codisert-frontend.vercel.app',
    'http://localhost:5173'
  ], // URL de tu frontend
  credentials: true, // Permitir cookies y credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};


app.use(morgan('dev'));
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/uploads/contratos', express.static(path.join(__dirname, '../uploads/contratos')));
app.use('/uploads/dnis', express.static(path.join(__dirname, '../uploads/dnis')));
app.use('/uploads/declaraciones', express.static(path.join(__dirname, '../uploads/declaraciones')));
app.use('/uploads/fachadas', express.static(path.join(__dirname, '../uploads/fachadas')));
app.use('/uploads/tests', express.static(path.join(__dirname, '../uploads/tests')));
app.use('/uploads/seriales', express.static(path.join(__dirname, '../uploads/seriales')));
app.use('/uploads/recibos', express.static(path.join(__dirname, '../uploads/recibos')));
app.use('/uploads/facturaciones', express.static(path.join(__dirname, '../uploads/facturaciones')));

// Rutas
app.use('/auth', authRoutes);
app.use('/api/v1/document', documentRoutes); // Ruta para manejar la carga de documentos
app.use('/api/v1/facturation', facturacionRoutes); 

app.use('/api/v1/admin', registerAdminRoutes);
app.use('/api/v1/beneficiary', registerBeneficiaryRoutes);
app.use('/api/v1/state', estadoRoutes);
app.use('/api/v1/stratum', estratoRoutes);
app.use('/api/v1/change', historialCambioRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/sex', sexoRoutes);
app.use('/api/v1/document-type', tipoDocumentoRoutes);
app.use('/api/v1/via', viaRoutes);
app.use('/api/v1/unit-type', tipoUnidadRoutes);
app.use('/api/v1/neighborhood', barrioRoutes);

Beneficiario.hasMany(Documento, {
  foreignKey: 'Beneficiario_idBeneficiario',
  targetKey: 'idBeneficiario',
  as: 'documentos',
});

Documento.belongsTo(Beneficiario, {
  foreignKey: 'Beneficiario_idBeneficiario',  // Clave foránea en Documento
  // targetKey: 'idBeneficiario',  // Clave primaria en Beneficiario
  // as: 'beneficiario',  // Alias para la relación
});

// Sincroniza la base de datos con Sequelize antes de iniciar el servidor
sequelize.sync({ force: false }) // Usa { force: false } para evitar que elimine las tablas al reiniciar (solo usa { force: true } en desarrollo)
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

  module.exports = app;
const express = require('express');
const { uploadDocument } = require('../controllers/documentController');
const UsarController = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware'); // Middleware para cargar archivos
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware'); // Middleware para cargar archivos
const authAdminRegisLectMiddleware = require('../middleware/authAdminRegisLectMiddleware');

const router = express.Router();

// Ruta para cargar documentos (usamos el middleware de multer)
router.post('/upload/:idBeneficiario', authAdminRegisMiddleware, upload.fields([
    { name: 'Copia del Contrato de Prestación de Servicios', maxCount: 1 },
    { name: 'Copia del documento de identidad del Usuario', maxCount: 1 },
    { name: 'Copia de la declaración del suscriptor', maxCount: 1 },
    { name: 'Foto de la fachada del predio del Usuario', maxCount: 1 },
    { name: 'Pantallazo de la prueba de velocidad del internet', maxCount: 1 },
    { name: 'Fotografía del número serial del equipo CPE instalado', maxCount: 1 }/* ,
    { name: 'recibo', maxCount: 1 } */
  ]), uploadDocument);
router.get('/search-alls', authAdminRegisLectMiddleware, UsarController.getAllDocuments);
router.get('/search/:idDocumentos', authAdminRegisLectMiddleware, UsarController.getDocumentById);
router.get('/search/beneficiary/:idBeneficiario', authAdminRegisLectMiddleware, UsarController.getDocumentsByBeneficiary);
router.delete('/delete/:idDocumentos', authAdminRegisMiddleware, UsarController.deleteDocument);

module.exports = router;

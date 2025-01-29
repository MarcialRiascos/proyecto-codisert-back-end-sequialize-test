const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Beneficiario } = require('../models/Beneficiario'); // Importar el modelo Beneficiario

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Obtenemos el 'fieldname' de cada archivo
    const fieldName = file.fieldname;

    // Establecer la ruta base
    let uploadPath = './uploads';

    // Crear subcarpetas según el 'fieldname' (nombre del archivo)
    switch (fieldName) {
      case 'contrato':
        uploadPath = path.join(uploadPath, 'contratos');
        break;
      case 'dni':
        uploadPath = path.join(uploadPath, 'dnis');
        break;
      case 'declaracion':
        uploadPath = path.join(uploadPath, 'declaraciones');
        break;
      case 'fachada':
        uploadPath = path.join(uploadPath, 'fachadas');
        break;
      case 'test':
        uploadPath = path.join(uploadPath, 'tests');
        break;
      case 'serial':
        uploadPath = path.join(uploadPath, 'seriales');
        break;
      case 'recibo':
        uploadPath = path.join(uploadPath, 'recibos');
        break;
        case 'anexo':
        uploadPath = path.join(uploadPath, 'anexos');
        break;
      default:
        uploadPath = path.join(uploadPath, 'otros'); // Para documentos no clasificados
        break;
    }

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta de forma recursiva
    }

    cb(null, uploadPath); // Carpeta donde se almacenarán los archivos
  },

  filename: async (req, file, cb) => {
    try {
      // Obtener el ID del beneficiario desde los parámetros de la solicitud
      const { idBeneficiario } = req.params;

      // Buscar al beneficiario en la base de datos
      const beneficiario = await Beneficiario.findByPk(idBeneficiario);

      if (!beneficiario) {
        return cb(new Error('Beneficiario no encontrado'));
      }

      // Obtener el valor del campo 'contrato' del beneficiario
      const contratoName = beneficiario.Contrato; // Asegúrate de que 'contrato' esté disponible en el modelo

      // Crear un nombre único para el archivo basado en el campo 'contrato'
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      // const fileName = `${contratoName}-${uniqueSuffix}${path.extname(file.originalname)}`;
      const fileName = `${contratoName}${path.extname(file.originalname)}`;

      cb(null, fileName); // Establecer el nombre del archivo
    } catch (error) {
      cb(error); // En caso de error al buscar al beneficiario o generar el nombre del archivo
    }
  }
});

// Filtro de archivos (solo imágenes o PDFs permitidos)
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.ms-excel', // Excel antiguo (.xls)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG) y PDFs.'), false);
  }
};

// Inicializar multer con la configuración de almacenamiento y filtro de archivos
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limitar el tamaño del archivo a 5MB
});

module.exports = upload;
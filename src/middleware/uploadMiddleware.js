const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Beneficiario } = require('../models/Beneficiario'); // Importar el modelo Beneficiario

// 🔥 Función para eliminar archivos con el mismo nombre (independiente de la extensión)
const deleteExistingFile = (uploadPath, fileNameWithoutExt) => {
  if (!fs.existsSync(uploadPath)) return;

  fs.readdirSync(uploadPath).forEach(file => {
    if (path.parse(file).name === fileNameWithoutExt) {
      const filePath = path.join(uploadPath, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Archivo eliminado: ${filePath}`);
      } catch (err) {
        console.error(`Error eliminando ${filePath}:`, err);
      }
    }
  });
};

// 🔥 Función para determinar la carpeta de destino
const getUploadPath = (fieldName) => {
  let basePath = './uploads';

  switch (fieldName) {
    case 'contrato': return path.join(basePath, 'contratos');
    case 'dni': return path.join(basePath, 'dnis');
    case 'declaracion': return path.join(basePath, 'declaraciones');
    case 'fachada': return path.join(basePath, 'fachadas');
    case 'test': return path.join(basePath, 'tests');
    case 'serial': return path.join(basePath, 'seriales');
    case 'recibo': return path.join(basePath, 'recibos');
    case 'anexo': return path.join(basePath, 'anexos');
    case 'fachadado': return path.join(basePath, 'fachadados');
    default: return path.join(basePath, 'otros');
  }
};

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = getUploadPath(file.fieldname);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: async (req, file, cb) => {
    try {
      const { idBeneficiario } = req.params;
      const beneficiario = await Beneficiario.findByPk(idBeneficiario);

      if (!beneficiario) {
        return cb(new Error('Beneficiario no encontrado'));
      }

      const contratoName = beneficiario.Contrato;
      const fileNameWithoutExt = contratoName; // Nombre sin extensión
      const fileName = `${contratoName}${path.extname(file.originalname)}`;

      // 🔥 Obtener la ruta de destino de la carpeta
      const uploadPath = getUploadPath(file.fieldname);

      // 🔥 Eliminar archivo con el mismo nombre en la carpeta
      deleteExistingFile(uploadPath, fileNameWithoutExt);

      cb(null, fileName);
    } catch (error) {
      cb(error);
    }
  }
});

// Filtro de archivos (solo imágenes o PDFs permitidos)
const allowedTypes = [
  'image/jpeg', 'image/jpg', 'image/png', 'application/pdf',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo imágenes (JPEG, PNG) y PDFs.'), false);
  }
};

// Inicializar multer con la configuración de almacenamiento y filtro de archivos
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

module.exports = upload;

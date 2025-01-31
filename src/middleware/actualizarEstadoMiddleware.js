const multer = require('multer');

// Configuración de multer para manejar archivos en memoria
const storage = multer.memoryStorage();

// Filtro para asegurarnos que solo se suban archivos Excel
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // El archivo es válido, continuamos
  } else {
    cb(new Error('Solo se permiten archivos Excel (.xlsx)'), false); // Error si no es un archivo Excel
  }
};

// Configuración de multer para cargar el archivo en memoria
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Limitar el tamaño máximo del archivo a 10MB
}).single('file'); // 'file' es el nombre del campo de archivo en el formulario

module.exports = upload;
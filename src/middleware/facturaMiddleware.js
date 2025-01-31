const multer = require('multer');

// Configuración para almacenar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload.single('file');
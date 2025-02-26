const fs = require('fs-extra');
const path = require('path');

/**
 * Elimina archivos en un directorio que exceden una cierta antigüedad.
 * @param {string} dirPath - Ruta del directorio a limpiar.
 * @param {number} maxAge - Edad máxima de los archivos en milisegundos.
 */
async function cleanOldFiles(dirPath, maxAge) {
  try {
    const files = await fs.readdir(dirPath);
    const now = Date.now();

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      const fileAge = now - stats.mtimeMs;

      if (fileAge > maxAge) {
        await fs.remove(filePath);
        console.log(`Archivo eliminado: ${filePath}`);
      }
    }
  } catch (err) {
    console.error(`Error al limpiar archivos en ${dirPath}:`, err);
  }
}

module.exports = cleanOldFiles;
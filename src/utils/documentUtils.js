const { PDFDocument } = require('pdf-lib');
const axios = require('axios');

/**
 * Combina múltiples documentos PDF e imágenes en un único PDF.
 * @param {string[]} urls - Array de URLs de los documentos a combinar.
 * @returns {Promise<Uint8Array>} - Bytes del PDF combinado.
 */
async function combineDocuments(urls) {
  const pdfDoc = await PDFDocument.create();

  for (const url of urls) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type'];

      if (contentType === 'application/pdf') {
        // Si el documento es un PDF
        const donorPdfDoc = await PDFDocument.load(response.data);
        const copiedPages = await pdfDoc.copyPages(donorPdfDoc, donorPdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
          pdfDoc.addPage(page);
        });
      } else if (contentType.startsWith('image/')) {
        // Si el documento es una imagen
        let image;
        if (contentType === 'image/jpeg') {
          image = await pdfDoc.embedJpg(response.data);
        } else if (contentType === 'image/png') {
          image = await pdfDoc.embedPng(response.data);
        } else {
          console.error(`Tipo de imagen no soportado: ${contentType}`);
          continue;
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      } else {
        console.error(`Tipo de contenido no soportado: ${contentType}`);
      }
    } catch (error) {
      console.error(`Error al descargar o procesar el documento desde ${url}:`, error);
    }
  }

  return await pdfDoc.save();
}

module.exports = { combineDocuments };
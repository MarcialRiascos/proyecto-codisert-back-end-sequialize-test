const XLSX = require('xlsx');
const Factura = require('../models/Factura');

const facturaController = {
  importExcel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo Excel' });
      }

      // Leer el archivo Excel desde la memoria
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Verificar que hay contenido suficiente
      if (data.length < 2) {
        return res.status(400).json({ message: 'El archivo Excel está vacío o no tiene datos suficientes' });
      }

      // Omitir la primera fila (encabezados)
      const facturas = data.slice(1).map(row => ({
        FechaFra: row[0] ? formatDate(row[0]) : null,  // Columna A (FechaFra)
        Factura: row[1] || null,  // Columna B (# Factura)
        Contrato: row[2] || null, // Columna C (Contrato)
        Mes: row[7] || null, // Columna H (Mes)
        Clase: row[8] || null, // Columna I (Clase)
        Servicio: row[9] || null, // Columna J (Servicio)
        AntesImptos: row[10] === 0 || row[10] ? parseInt(row[10].toString().replace(',', '').trim()) : 0,  // Columna K ($ Antes Imptos)
        Imptos: row[11] === 0 || row[11] ? parseInt(row[11].toString().replace(',', '').trim()) : 0,  // Columna L ($ Imptos)
        Facturado: row[12] === 0 || row[12] ? parseInt(row[12].toString().replace(',', '').trim()) : 0,  // Columna M ($ Facturado)
      }));

      // Contador para el número de registros insertados
      let registrosInsertados = 0;

      // Verificar si alguna de las facturas ya existe en la base de datos
      for (const factura of facturas) {
        const existingFactura = await Factura.findOne({
          where: {
            FechaFra: factura.FechaFra,
            Factura: factura.Factura,
            Contrato: factura.Contrato,
            Mes: factura.Mes,
            Clase: factura.Clase,
          }
        });

        if (!existingFactura) {
          // Si no existe, insertar el registro
          await Factura.create(factura);
          registrosInsertados++; // Incrementar el contador
        }
      }

      res.status(200).json({
        message: 'Facturas importadas correctamente',
        registrosInsertados, // Incluir el número de registros insertados
      });
    } catch (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ message: 'Hubo un error al importar el archivo', error: error.message });
    }
  },

  updateFacturas: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo Excel' });
      }

      // Leer el archivo Excel
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (data.length < 2) {
        return res.status(400).json({ message: 'El archivo Excel está vacío o no tiene datos suficientes' });
      }

      // Procesar datos del Excel
      const facturas = data.slice(1).map(row => ({
        FechaFra: row[0] ? formatDate(row[0]) : null,
        Factura: row[1] || null,
        Contrato: row[2] || null,
        Mes: row[7] || null,
        Clase: row[8] || null,
        Servicio: row[9] || null,
        AntesImptos: row[10] === 0 || row[10] ? parseInt(row[10].toString().replace(',', '').trim()) : 0,
        Imptos: row[11] === 0 || row[11] ? parseInt(row[11].toString().replace(',', '').trim()) : 0,
        Facturado: row[12] === 0 || row[12] ? parseInt(row[12].toString().replace(',', '').trim()) : 0,
      }));

      let registrosActualizados = 0;

      for (const factura of facturas) {
        const [updated] = await Factura.update(
          {
            FechaFra: factura.FechaFra,
            Mes: factura.Mes,
            Clase: factura.Clase,
            Servicio: factura.Servicio,
            AntesImptos: factura.AntesImptos,
            Imptos: factura.Imptos,
            Facturado: factura.Facturado,
          },
          { where: { Contrato: factura.Contrato, Factura: factura.Factura } } // Se actualiza por Contrato y # Factura
        );

        if (updated > 0) {
          registrosActualizados++;
        }
      }

      res.status(200).json({
        message: 'Facturas actualizadas correctamente',
        registrosActualizados,
      });
    } catch (error) {
      console.error('Error al actualizar en la base de datos:', error);
      res.status(500).json({ message: 'Hubo un error al actualizar el archivo', error: error.message });
    }
  },
};

// Función para formatear la fecha en formato DD-MM-YYYY
function formatDate(excelDate) {
    if (typeof excelDate === "number") {
      // Convertir el número de Excel a milisegundos
      const date = new Date((excelDate - 25569) * 86400 * 1000); 
      
      // Ajustar la fecha a UTC para evitar diferencias de zona horaria
      const utcDate = new Date(date.toUTCString()); 
  
      const day = String(utcDate.getUTCDate()).padStart(2, '0');
      const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
      const year = utcDate.getUTCFullYear();
  
      return `${day}-${month}-${year}`; // Formato DD-MM-YYYY
    }
  
    // Si no es un número, devolver el valor tal cual
    return excelDate;
}

module.exports = facturaController;
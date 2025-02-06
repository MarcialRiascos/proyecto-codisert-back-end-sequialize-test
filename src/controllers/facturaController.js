const XLSX = require('xlsx');
const Factura = require('../models/Factura');
const {Beneficiario} = require('../models/Beneficiario');
const { Op } = require('sequelize');


const facturaController = {
  importExcel: async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo Excel' });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (data.length < 2) {
            return res.status(400).json({ message: 'El archivo Excel está vacío o no tiene datos suficientes' });
        }

        const facturas = data.slice(1).map(row => ({
            FechaFra: row[0] ? formatDate(row[0]) : null,
            Factura: row[1] || null,
            Contrato: row[2] || null,
            Mes: row[7] || null,
            Clase: row[8] || null,
            Servicio: row[9] || null,
            AntesImptos: row[10] ? parseInt(row[10].toString().replace(',', '').trim()) : 0,
            Imptos: row[11] ? parseInt(row[11].toString().replace(',', '').trim()) : 0,
            Facturado: row[12] ? parseInt(row[12].toString().replace(',', '').trim()) : 0,
        }));

        let registrosInsertados = 0;
        let registrosDuplicados = 0;
        let registrosIgnorados = 0;
        let contratosRegistrados = new Set();
        let contratosNoRegistrados = new Set();
        let contratosDuplicados = new Set();

        for (const factura of facturas) {
            const beneficiario = await Beneficiario.findOne({ where: { Contrato: factura.Contrato } });
            if (!beneficiario) {
                contratosNoRegistrados.add(factura.Contrato);
                registrosIgnorados++;
                continue;
            }

            const existingFactura = await Factura.findOne({
                where: {
                    FechaFra: factura.FechaFra,
                    Factura: factura.Factura,
                    Contrato: factura.Contrato,
                    Mes: factura.Mes,
                    Clase: factura.Clase,
                }
            });

            if (existingFactura) {
                registrosDuplicados++;
                contratosDuplicados.add(factura.Contrato);
                continue;
            }

            await Factura.create(factura);
            registrosInsertados++;
            contratosRegistrados.add(factura.Contrato);
        }

        res.status(200).json({
            message: 'Proceso de importación completado.',
            registrosAfectados: {
                registrosInsertados,
                registrosDuplicados,
                registrosIgnorados
            },
            contratosRegistrados: {
                mensaje: 'Se registraron facturas para los siguientes contratos.',
                contratos: Array.from(contratosRegistrados)
            },
            contratosNoRegistrados: {
                mensaje: 'Los siguientes contratos no fueron encontrados en la base de datos y no se registraron.',
                contratos: Array.from(contratosNoRegistrados)
            },
            contratosDuplicadasPorContrato: {
                mensaje: 'Los siguientes contratos tienen facturas duplicadas que no fueron registradas nuevamente.',
                contratos: Array.from(contratosDuplicados)
            }
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

  getAllFacturas: async (req, res) => {
    try {
      const facturas = await Factura.findAll(); // Consulta todos los registros de la tabla
      res.status(200).json({ message: 'Facturas obtenidas correctamente', facturas });
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      res.status(500).json({ message: 'Hubo un error al obtener las facturas', error: error.message });
    }
  },

  getFacturasByContrato: async (req, res) => {
    try {
      const { contrato } = req.params; // Obtenemos el contrato desde la URL

      if (!contrato) {
        return res.status(400).json({ message: 'El número de contrato es obligatorio' });
      }

      // Buscamos todas las facturas que coincidan con el contrato
      const facturas = await Factura.findAll({ where: { Contrato: contrato } });

      if (facturas.length === 0) {
        return res.status(404).json({ message: `No se encontraron facturas para el contrato: ${contrato}` });
      }

      res.status(200).json({ message: 'Facturas obtenidas correctamente', facturas });
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      res.status(500).json({ message: 'Hubo un error al obtener las facturas', error: error.message });
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
const Documento = require('../models/Documento');
const { HistorialCambio } = require('../models/HistorialCambio');
const path = require('path');
const fs = require('fs').promises;
const { Beneficiario } = require('../models/Beneficiario');
const Administrador = require('../models/Administrador');
const { Op } = require('sequelize'); 


const registerDocumentController = {
  async uploadDocument(req, res) {
    let alreadyResponded = false; // 🔹 Ahora sí está definido
  
    try {
      const { idBeneficiario } = req.params;
  
      if (!req?.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha cargado ningún archivo' });
      }
  
      const Administrador_idAdministrador = req.user.id;
      const archivos = Object.getOwnPropertyNames(req.files).map(name => req.files[name][0]);
  
      const tipoDocumentosRuta = {
        contrato: 'contratos',
        dni: 'dnis',
        declaracion: 'declaraciones',
        fachada: 'fachadas',
        test: 'tests',
        serial: 'seriales',
        recibo: 'recibos',
        anexo: 'anexos',
        fachadado: 'fachadados'
      };
  
      await Promise.all(
        archivos.map(async (file) => {
          const NombreDocumento = file.filename;
          const TipoDocumento = req.body[`${file.fieldname}_TipoDocumento`];
  
          if (!TipoDocumento) {
            if (!alreadyResponded) {
              alreadyResponded = true;
              return res.status(400).json({ message: `El tipo de documento para ${file.fieldname} es obligatorio.` });
            }
            return;
          }
  
          const carpetaDocumento = tipoDocumentosRuta[TipoDocumento];
          if (!carpetaDocumento) {
            if (!alreadyResponded) {
              alreadyResponded = true;
              return res.status(400).json({ message: `Tipo de documento '${TipoDocumento}' no válido.` });
            }
            return;
          }
  
          const urlDocumento = `uploads/${carpetaDocumento}/${file.filename}`;
          const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg', 'application/msword', 'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
          if (!allowedTypes.includes(file.mimetype)) {
            if (!alreadyResponded) {
              alreadyResponded = true;
              return res.status(400).json({ message: `El archivo ${file.originalname} tiene un tipo no permitido.` });
            }
            return;
          }
  
          const maxSize = 5 * 1024 * 1024;
          if (file.size > maxSize) {
            if (!alreadyResponded) {
              alreadyResponded = true;
              return res.status(400).json({ message: `El archivo ${file.originalname} es demasiado grande. El límite es 5MB.` });
            }
            return;
          }
  
          // 🔹 Extraer el nombre del archivo sin la extensión
          const baseNombreDocumento = path.parse(NombreDocumento).name;
  
          // 🔹 Buscar documentos con el mismo nombre sin la extensión
          const documentosPrevios = await Documento.findAll({
            where: {
              Beneficiario_idBeneficiario: idBeneficiario,
              NombreDocumento: { [Op.like]: `${baseNombreDocumento}%` } // Busca nombres similares
            }
          });
  
          if (documentosPrevios.length > 0) {
            // 🔹 Eliminar todos los documentos previos encontrados
            await Promise.all(documentosPrevios.map(async (doc) => {
              await Documento.destroy({ where: { idDocumentos: doc.idDocumentos } });
  
              // Registrar eliminación en HistorialCambio
              await HistorialCambio.create({
                Accion: 'Eliminación',
                ValorAnterior: JSON.stringify(doc),
                ValorNuevo: 'N/A',
                Administrador_idAdministrador,
                Beneficiario_idBeneficiario: idBeneficiario,
              });
            }));
          }
  
          // 🔹 Insertar el nuevo documento
          const documento = await Documento.create({
            NombreDocumento,
            TipoDocumento,
            Url: urlDocumento,
            Beneficiario_idBeneficiario: idBeneficiario,
            Administrador_idAdministrador,
          });
  
          // Registrar creación en HistorialCambio
          await HistorialCambio.create({
            Accion: 'Creación',
            ValorAnterior: 'N/A',
            ValorNuevo: JSON.stringify(documento),
            Administrador_idAdministrador,
            Beneficiario_idBeneficiario: idBeneficiario,
          });
        })
      );
  
      if (!alreadyResponded) {
        res.status(200).json({ message: 'Archivos cargados y documentos registrados correctamente.' });
      }
    } catch (error) {
      console.error(error);
      if (!alreadyResponded) {
        res.status(500).json({ message: 'Error al procesar los archivos. Intenta nuevamente más tarde.' });
      }
    }
  },

  // Función para obtener todos los documentos
  async getAllDocuments(req, res) {
    try {
      // Obtener todos los documentos, incluyendo los datos del beneficiario (id, Nombre, Apellido) y del administrador
      const documentos = await Documento.findAll({
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario', // Alias de la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador', // Alias de la relación
          }
        ],
      });

      if (documentos.length === 0) {
        return res.status(404).json({ message: 'No hay documentos registrados' });
      }

      // Estructuramos la respuesta para incluir los datos del beneficiario y del administrador dentro de cada documento
      const documentosConBeneficiarioYAdministrador = documentos.map(doc => ({
        idDocumentos: doc.idDocumentos,
        NombreDocumento: doc.NombreDocumento,
        TipoDocumento: doc.TipoDocumento,
        Url: doc.Url,
        Beneficiario: {
          idBeneficiario: doc.beneficiario.idBeneficiario,
          Nombre: doc.beneficiario.Nombre,
          Apellido: doc.beneficiario.Apellido,
        },
        Administrador: {
          idAdministrador: doc.administrador.idAdministrador,
          Nombre: doc.administrador.Nombre,
          Apellido: doc.administrador.Apellido,
        },
      }));

      res.status(200).json({
        message: 'Documentos encontrados',
        documents: documentosConBeneficiarioYAdministrador,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
    }
  },

  // Función para obtener documentos por beneficiario
  async getDocumentsByBeneficiary(req, res) {
    try {
      const { idBeneficiario } = req.params;

      // Buscar los documentos del beneficiario usando Sequelize
      const documentos = await Documento.findAll({
        where: { Beneficiario_idBeneficiario: idBeneficiario },
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario',  // Alias para la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador',  // Alias para la relación
          }
        ],
      });

      if (documentos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron documentos para este beneficiario' });
      }

      // Estructuramos la respuesta para incluir los datos del beneficiario y del administrador dentro de cada documento
      const documentosConBeneficiarioYAdministrador = documentos.map(doc => ({
        idDocumentos: doc.idDocumentos,
        NombreDocumento: doc.NombreDocumento,
        TipoDocumento: doc.TipoDocumento,
        Url: doc.Url,
        Beneficiario: {
          idBeneficiario: doc.beneficiario.idBeneficiario,
          Nombre: doc.beneficiario.Nombre,
          Apellido: doc.beneficiario.Apellido,
        },
        Administrador: {
          idAdministrador: doc.administrador.idAdministrador,
          Nombre: doc.administrador.Nombre,
          Apellido: doc.administrador.Apellido,
        },
      }));

      res.status(200).json({
        message: 'Documentos encontrados',
        documents: documentosConBeneficiarioYAdministrador,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
    }
  },

  // Función para obtener un documento por su ID
  async getDocumentById(req, res) {
    try {
      const { idDocumentos } = req.params;  // Obtenemos el id del documento desde los parámetros de la URL

      // Buscar el documento por su ID usando Sequelize e incluir las relaciones con Beneficiario y Administrador
      const documento = await Documento.findOne({
        where: { idDocumentos },  // Filtramos por el id del documento
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario',  // Alias para la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador',  // Alias para la relación
          }
        ],
      });

      // Si no se encuentra el documento
      if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
      }

      // Si se encuentra el documento
      res.status(200).json({
        message: 'Documento encontrado',
        document: {
          idDocumentos: documento.idDocumentos,
          NombreDocumento: documento.NombreDocumento,
          TipoDocumento: documento.TipoDocumento,
          Url: documento.Url,
          Beneficiario: {
            idBeneficiario: documento.beneficiario.idBeneficiario,
            Nombre: documento.beneficiario.Nombre,
            Apellido: documento.beneficiario.Apellido,
          },
          Administrador: {
            idAdministrador: documento.administrador.idAdministrador,
            Nombre: documento.administrador.Nombre,
            Apellido: documento.administrador.Apellido,
          },
        },
      });
    } catch (err) {
      console.error('Error al obtener el documento:', err);
      res.status(500).json({ message: 'Error al obtener el documento', error: err.message });
    }
  },

  // Función para eliminar un documento
  async deleteDocument(req, res) {
    try {
      const { idDocumentos } = req.params;

      // Buscar el documento para obtener la URL del archivo
      const documento = await Documento.findOne({ where: { idDocumentos } });

      if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
      }

      // Extraer la ruta relativa del archivo desde Url

      /* const relativePath = documento.Url.replace(/^http:\/\/localhost:\d+\//, ''); // Elimina "http://localhost:3000/" o similar
      const filePath = path.resolve(__dirname, '../..', relativePath); // Construye la ruta absoluta */

      const filePath = path.resolve(__dirname, '..', '..', documento.Url.replace(/^https?:\/\/[^/]+\//, ''));

      // Intentar eliminar el archivo del sistema de archivos
      try {
        await fs.access(filePath); // Verifica si el archivo existe
        await fs.unlink(filePath); // Elimina el archivo
      } catch (err) {
        console.error(`Error al intentar eliminar el archivo: ${filePath}`, err.message);
        // Continuar con la eliminación en la base de datos aunque el archivo no exista
      }

      // Registrar el cambio en HistorialCambio antes de eliminar
      await HistorialCambio.create({
        Accion: 'Eliminación',
        ValorAnterior: JSON.stringify(documento),
        ValorNuevo: 'N/A',
        Administrador_idAdministrador: req.user.id,
        Beneficiario_idBeneficiario: documento.Beneficiario_idBeneficiario,
      });

      // Eliminar el documento de la base de datos
      await Documento.destroy({
        where: { idDocumentos },
      });

      res.status(200).json({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar el documento:', err.message);
      res.status(500).json({ message: 'Error al eliminar el documento', error: err.message });
    }
  },
};

module.exports = registerDocumentController;
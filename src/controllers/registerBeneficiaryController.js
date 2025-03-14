const { Op } = require('sequelize');
const { Beneficiario } = require('../models/Beneficiario');
const { HistorialCambio } = require('../models/HistorialCambio');
const Estado = require('../models/Estado');
const Estrato = require('../models/Estrato');
const TipoDocumento = require('../models/TipoDocumento');
const Administrador = require('../models/Administrador');
const Sexo = require('../models/Sexo'); // Modelo de Sexo
const Documento = require('../models/Documento'); // Modelo de Sexo
const Factura = require('../models/Factura'); // Modelo de Sexo
const path = require('path'); // Asegúrate de importar 'path' al principio de tu archivo
const fs = require('fs').promises; // Asegúrate de importar 'fs' correctamente
const XLSX = require('xlsx');
const upload = require('../middleware/actualizarEstadoMiddleware'); // Middleware de carga
const moment = require('moment');
const { combineDocuments } = require('../utils/documentUtils');

const registerBeneficiaryController = {
  // Registrar un beneficiario
  async registerBeneficiary(req, res) {
    const {
      Contrato,
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      TelefonoTres,
      Correo,
      FechaNacimiento,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Servicio,
      Tecnologia,
      Direccion,
      Nacionalidad,
      ViaPrincipalClave,
      ViaPrincipalValor,
      ViaSecundariaClave,
      ViaSecundariaValor,
      ViaSecundariaValorDos,
      TipoUnidadUnoClave,
      TipoUnidadUnoValor,
      TipoUnidadDosClave,
      TipoUnidadDosValor,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
      Sexo_idSexo,
    } = req.body;
  
    const idAdministrador = req.user.id; // ID del administrador activo (extraído del middleware de autenticación)
  
    // Validar campos obligatorios
    if (
      !Contrato ||!Nombre || !Apellido || !TipoDocumento_idTipoDocumento || !NumeroDocumento ||
      !Correo || !CodigoDaneDpmto || !CodigoDaneMunicipio || !Servicio ||
      !ViaPrincipalClave || !ViaPrincipalValor || !Estado_idEstado || !Estrato_idEstrato || !Tecnologia
    ) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
    }
  
    try {
      // Verificar si el NumeroDocumento ya está registrado
      const existingBeneficiary = await Beneficiario.findOne({
        where: { NumeroDocumento },
      });
  
      if (existingBeneficiary) {
        return res.status(400).json({
          message: 'El Número de Documento ya está registrado con otro beneficiario.',
        });
      }
  
      // Verificar si el Contrato ya está registrado
      if (Contrato) {
        const existingBeneficiaryByContrato = await Beneficiario.findOne({
          where: { Contrato },
        });
  
        if (existingBeneficiaryByContrato) {
          return res.status(400).json({
            message: 'El Contrato ya está registrado con otro beneficiario.',
          });
        }
      }
  
      // Insertar el beneficiario en la base de datos
      const newBeneficiary = await Beneficiario.create({
        Contrato: Contrato || null,
        Nombre,
        Apellido,
        TipoDocumento_idTipoDocumento,
        NumeroDocumento,
        Telefono: Telefono || null,
        Celular: Celular || null,
        TelefonoTres: TelefonoTres || null,
        Correo,
        FechaNacimiento: FechaNacimiento || null,
        FechaInicio,
        FechaFin: FechaFin || null,
        CodigoDaneDpmto,
        CodigoDaneMunicipio,
        Departamento: Departamento || null,
        Municipio: Municipio || null,
        Servicio: Servicio || null,
        Tecnologia: Tecnologia || null,
        Direccion,
        Nacionalidad: Nacionalidad || null,
        ViaPrincipalClave: ViaPrincipalClave || null,
        ViaPrincipalValor: ViaPrincipalValor || null,
        ViaSecundariaClave: ViaSecundariaClave || null,
        ViaSecundariaValor: ViaSecundariaValor || null,
        ViaSecundariaValorDos: ViaSecundariaValorDos || null,
        TipoUnidadUnoClave: TipoUnidadUnoClave || null,
        TipoUnidadUnoValor: TipoUnidadUnoValor || null,
        TipoUnidadDosClave: TipoUnidadDosClave || null,
        TipoUnidadDosValor: TipoUnidadDosValor || null,
        Barrio: Barrio || null,
        Anexo: Anexo || null,
        Estado_idEstado,
        Estrato_idEstrato,
        Administrador_idAdministrador: idAdministrador,
        Sexo_idSexo: Sexo_idSexo || null,
      });
  
      // Registrar el cambio en HistorialCambio
      await HistorialCambio.create({
        Accion: 'Creación',
        ValorAnterior: 'N/A',
        ValorNuevo: JSON.stringify(newBeneficiary),
        Administrador_idAdministrador: idAdministrador,
        Beneficiario_idBeneficiario: newBeneficiary.idBeneficiario,
      });
  
      res.status(201).json({
        message: 'Beneficiario registrado exitosamente',
        newBeneficiaryId: newBeneficiary.idBeneficiario,
      });
    } catch (err) {
      console.error('Error al registrar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al registrar el beneficiario',
        error: err.message,
      });
    }
  },

  // Obtener todos los beneficiarios
  async getAllBeneficiaries(req, res) {
    try {
      const beneficiaries = await Beneficiario.findAll({
        include: [
          {
            model: Estado,
            attributes: ['idEstado', 'Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['idEstrato', 'Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['idTipoDocumento', 'TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
          {
            model: Sexo,
            attributes: ['idSexo', 'Sexo'],
            as: 'sexo',
          },
          {
            model: Documento,
            attributes: ['idDocumentos', 'NombreDocumento', 'TipoDocumento', 'Url'],
            as: 'documentos',
          },
        ],
      });
  
      if (beneficiaries.length === 0) {
        return res.status(404).json({ message: 'No se encontraron beneficiarios' });
      }
  
      // Obtener los contratos de los beneficiarios para buscar sus facturas
      const contratos = beneficiaries.map(b => b.Contrato);
      
      // Buscar las facturas que coincidan con esos contratos
      const facturas = await Factura.findAll({
        where: { Contrato: contratos }
      });
  
      // Organizar las facturas en un objeto por contrato para acceso rápido
      const facturasPorContrato = facturas.reduce((acc, factura) => {
        if (!acc[factura.Contrato]) {
          acc[factura.Contrato] = [];
        }
        acc[factura.Contrato].push({
          idFactura: factura.idFactura,
          FechaFra: factura.FechaFra,
          Factura: factura.Factura,
          Mes: factura.Mes,
          Clase: factura.Clase,
          Servicio: factura.Servicio,
          AntesImptos: factura.AntesImptos,
          Imptos: factura.Imptos,
          Facturado: factura.Facturado
        });
        return acc;
      }, {});
  
      // Formatear la respuesta con la misma estructura original y agregando las facturas
      const formattedBeneficiaries = beneficiaries.map(beneficiary => ({
        idBeneficiario: beneficiary.idBeneficiario,
        Contrato: beneficiary.Contrato,
        Nombre: beneficiary.Nombre,
        Apellido: beneficiary.Apellido,
        TipoDocumento: beneficiary.tipoDocumento ? {
          id: beneficiary.tipoDocumento.idTipoDocumento,
          nombre: beneficiary.tipoDocumento.TipoDocumento
        } : null,
        NumeroDocumento: beneficiary.NumeroDocumento,
        Telefono: beneficiary.Telefono,
        Celular: beneficiary.Celular,
        TelefonoTres: beneficiary.TelefonoTres,
        Correo: beneficiary.Correo,
        FechaNacimiento: beneficiary.FechaNacimiento,
        FechaInicio: beneficiary.FechaInicio,
        FechaFin: beneficiary.FechaFin,
        CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
        Departamento: beneficiary.Departamento,
        Municipio: beneficiary.Municipio,
        Servicio: beneficiary.Servicio,
        Tecnologia: beneficiary.Tecnologia,
        Direccion: beneficiary.Direccion,
        Nacionalidad: beneficiary.Nacionalidad,
        ViaPrincipalClave: beneficiary.ViaPrincipalClave,
        ViaPrincipalValor: beneficiary.ViaPrincipalValor,
        ViaSecundariaClave: beneficiary.ViaSecundariaClave,
        ViaSecundariaValor: beneficiary.ViaSecundariaValor,
        ViaSecundariaValorDos: beneficiary.ViaSecundariaValorDos,
        TipoUnidadUnoClave: beneficiary.TipoUnidadUnoClave,
        TipoUnidadUnoValor: beneficiary.TipoUnidadUnoValor,
        TipoUnidadDosClave: beneficiary.TipoUnidadDosClave,
        TipoUnidadDosValor: beneficiary.TipoUnidadDosValor,
        Barrio: beneficiary.Barrio,
        Anexo: beneficiary.Anexo,
        FPrimAct: beneficiary.FPrimAct,  
        FUltDX: beneficiary.FUltDX,
        SerialCpe: beneficiary.SerialCpe,  
        FabricanteCpe: beneficiary.FabricanteCpe,      
        FechaInstalacion: beneficiary.FechaInstalacion,  
        Latitud: beneficiary.Latitud,   
        Longitud: beneficiary.Longitud,   
        Estado: beneficiary.estado ? {
          id: beneficiary.estado.idEstado,
          nombre: beneficiary.estado.Estado
        } : null,
        Sexo: beneficiary.sexo ? {
          id: beneficiary.sexo.idSexo,
          nombre: beneficiary.sexo.Sexo
        } : null,
        Estrato: beneficiary.estrato ? {
          id: beneficiary.estrato.idEstrato,
          nombre: beneficiary.estrato.Estrato
        } : null,
        Administrador: {
          idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
          Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
          Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
        },
        CreatedAt: beneficiary.createdAt,
        UpdatedAt: beneficiary.updatedAt,
        Documentos: beneficiary.documentos.map(doc => ({
          idDocumentos: doc.idDocumentos,
          NombreDocumento: doc.NombreDocumento,
          TipoDocumento: doc.TipoDocumento,
          Url: doc.Url,
        })),
        Facturas: facturasPorContrato[beneficiary.Contrato] || [] // Agregar facturas si existen
      }));
  
      res.status(200).json({
        message: 'Lista de beneficiarios obtenida exitosamente',
        data: formattedBeneficiaries,
      });
    } catch (err) {
      console.error('Error al obtener la lista de beneficiarios:', err);
      res.status(500).json({
        message: 'Error al obtener la lista de beneficiarios',
        error: err.message,
      });
    }
  },
  
  // Obtener un beneficiario por su ID
  async getBeneficiaryById(req, res) {   
    const { id } = req.params;
  
    try {
      const beneficiary = await Beneficiario.findOne({
        where: {
          [Op.or]: [
            {idBeneficiario: id},
            {NumeroDocumento: id},
            {Contrato: id}
          ]
        },
        include: [
          {
            model: Estado,
            attributes: ['idEstado', 'Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['idEstrato', 'Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['idTipoDocumento', 'TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
          {
            model: Sexo,
            attributes: ['idSexo', 'Sexo'],
            as: 'sexo',
          },
          {
            model: Documento,
            attributes: ['idDocumentos', 'NombreDocumento', 'TipoDocumento', 'Url'],
            as: 'documentos',
          },
        ],
      });
  
      console.log(beneficiary);
  
      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }
  
      // Obtener facturas asociadas al beneficiario usando el número de contrato
      const facturas = await Factura.findAll({
        where: {
          Contrato: beneficiary.Contrato,
        },
        attributes: ['idFactura', 'FechaFra', 'Factura', 'Mes', 'Clase', 'Servicio', 'AntesImptos', 'Imptos', 'Facturado'],
      });
  
      const formattedBeneficiary = {
        idBeneficiario: beneficiary.idBeneficiario,
        Contrato: beneficiary.Contrato, 
        Nombre: beneficiary.Nombre,
        Apellido: beneficiary.Apellido,
        TipoDocumento: beneficiary.tipoDocumento ? {
          id: beneficiary.tipoDocumento.idTipoDocumento,
          nombre: beneficiary.tipoDocumento.TipoDocumento,
        } : null,
        NumeroDocumento: beneficiary.NumeroDocumento,
        Telefono: beneficiary.Telefono,
        Celular: beneficiary.Celular,
        TelefonoTres: beneficiary.TelefonoTres, 
        Correo: beneficiary.Correo,
        FechaNacimiento: beneficiary.FechaNacimiento,
        FechaInicio: beneficiary.FechaInicio,
        FechaFin: beneficiary.FechaFin,
        CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
        Departamento: beneficiary.Departamento,
        Municipio: beneficiary.Municipio,
        Servicio: beneficiary.Servicio,
        Tecnologia: beneficiary.Tecnologia,
        Direccion: beneficiary.Direccion,
        Nacionalidad: beneficiary.Nacionalidad,
        ViaPrincipalClave: beneficiary.ViaPrincipalClave,
        ViaPrincipalValor: beneficiary.ViaPrincipalValor,
        ViaSecundariaClave: beneficiary.ViaSecundariaClave,
        ViaSecundariaValor: beneficiary.ViaSecundariaValor,
        ViaSecundariaValorDos: beneficiary.ViaSecundariaValorDos,
        TipoUnidadUnoClave: beneficiary.TipoUnidadUnoClave,
        TipoUnidadUnoValor: beneficiary.TipoUnidadUnoValor,
        TipoUnidadDosClave: beneficiary.TipoUnidadDosClave,
        TipoUnidadDosValor: beneficiary.TipoUnidadDosValor,
        Barrio: beneficiary.Barrio,
        Anexo: beneficiary.Anexo,
        FPrimAct: beneficiary.FPrimAct,  
        FUltDX: beneficiary.FUltDX,
        SerialCpe: beneficiary.SerialCpe,  
        FabricanteCpe: beneficiary.FabricanteCpe,      
        FechaInstalacion: beneficiary.FechaInstalacion,  
        Latitud: beneficiary.Latitud,   
        Longitud: beneficiary.Longitud, 
        Estado: beneficiary.estado ? {
          id: beneficiary.estado.idEstado,
          nombre: beneficiary.estado.Estado,
        } : null,
        Sexo: beneficiary.sexo ? {
          id: beneficiary.sexo.idSexo,
          nombre: beneficiary.sexo.Sexo,
        } : null,
        Estrato: beneficiary.estrato ? {
          id: beneficiary.estrato.idEstrato,
          nombre: beneficiary.estrato.Estrato,
        } : null,
        Administrador: {
          idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
          Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
          Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
        },
        CreatedAt: beneficiary.createdAt,
        UpdatedAt: beneficiary.updatedAt,
        Documentos: beneficiary.documentos.map(doc => ({
          idDocumentos: doc.idDocumentos,
          NombreDocumento: doc.NombreDocumento,
          TipoDocumento: doc.TipoDocumento,
          Url: doc.Url,
        })),
        Facturas: facturas.map(factura => ({
          idFactura: factura.idFactura,
          FechaFra: factura.FechaFra,
          Factura: factura.Factura,
          Mes: factura.Mes,
          Clase: factura.Clase,
          Servicio: factura.Servicio,
          AntesImptos: factura.AntesImptos,
          Imptos: factura.Imptos,
          Facturado: factura.Facturado,
        })),
      };
  
      res.status(200).json({
        message: 'Beneficiario encontrado',
        data: formattedBeneficiary,
      });
    } catch (err) {
      console.error('Error al obtener el beneficiario:', err);
      res.status(500).json({
        message: 'Error al obtener el beneficiario',
        error: err.message,
      });
    }
  },

// Obtener un beneficiario por su número de documento
async getBeneficiaryByNumeroDocumento(req, res) {
  const { numeroDocumento } = req.params;

  try {
    const beneficiary = await Beneficiario.findOne({
      where: { NumeroDocumento: numeroDocumento },
      include: [
        {
          model: Estado,
          attributes: ['idEstado', 'Estado'],
          as: 'estado',
        },
        {
          model: Estrato,
          attributes: ['idEstrato', 'Estrato'],
          as: 'estrato',
        },
        {
          model: TipoDocumento,
          attributes: ['idTipoDocumento', 'TipoDocumento'],
          as: 'tipoDocumento',
        },
        {
          model: Administrador,
          attributes: ['idAdministrador', 'Nombre', 'Apellido'],
          as: 'administrador',
        },
        {
          model: Sexo,
          attributes: ['idSexo', 'Sexo'],
          as: 'sexo',
        },
        {
          model: Documento,  // Incluir los documentos relacionados
          attributes: ['idDocumentos', 'NombreDocumento', 'TipoDocumento', 'Url'],
          as: 'documentos',  // Alias de la relación
        },
      ],
    });

    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiario no encontrado' });
    }

    const formattedBeneficiary = {
      idBeneficiario: beneficiary.idBeneficiario,
      Contrato: beneficiary.Contrato, // Nuevo campo
      Nombre: beneficiary.Nombre,
      Apellido: beneficiary.Apellido,
      TipoDocumento: beneficiary.tipoDocumento ? {
        id: beneficiary.tipoDocumento.idTipoDocumento,
        nombre: beneficiary.tipoDocumento.TipoDocumento,
      } : null,
      NumeroDocumento: beneficiary.NumeroDocumento,
      Telefono: beneficiary.Telefono,
      Celular: beneficiary.Celular,
      TelefonoTres: beneficiary.TelefonoTres, // Nuevo campo
      Correo: beneficiary.Correo,
      FechaNacimiento: beneficiary.FechaNacimiento,
      FechaInicio: beneficiary.FechaInicio,
      FechaFin: beneficiary.FechaFin,
      CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
      CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
      Departamento: beneficiary.Departamento,
      Municipio: beneficiary.Municipio,
      Servicio: beneficiary.Servicio, // Nuevo campo
      Tecnologia: beneficiary.Tecnologia, // Nuevo campo
      Direccion: beneficiary.Direccion,
      ViaPrincipalClave: beneficiary.ViaPrincipalClave, // Nuevo campo
      ViaPrincipalValor: beneficiary.ViaPrincipalValor, // Nuevo campo
      ViaSecundariaClave: beneficiary.ViaSecundariaClave, // Nuevo campo
      ViaSecundariaValor: beneficiary.ViaSecundariaValor, // Nuevo campo
      ViaSecundariaValorDos: beneficiary.ViaSecundariaValorDos, // Nuevo campo
      TipoUnidadUnoClave: beneficiary.TipoUnidadUnoClave, // Nuevo campo
      TipoUnidadUnoValor: beneficiary.TipoUnidadUnoValor, // Nuevo campo
      TipoUnidadDosClave: beneficiary.TipoUnidadDosClave, // Nuevo campo
      TipoUnidadDosValor: beneficiary.TipoUnidadDosValor, // Nuevo campo
      Barrio: beneficiary.Barrio,
      Anexo: beneficiary.Anexo,
      Estado: beneficiary.estado ? {
        id: beneficiary.estado.idEstado,
        nombre: beneficiary.estado.Estado,
      } : null,
      Sexo: beneficiary.sexo ? {
        id: beneficiary.sexo.idSexo,
        nombre: beneficiary.sexo.Sexo,
      } : null,
      Estrato: beneficiary.estrato ? {
        id: beneficiary.estrato.idEstrato,
        nombre: beneficiary.estrato.Estrato,
      } : null, // Aquí añadimos el estrato
      Administrador: {
        idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
        Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
        Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
      },
      CreatedAt: beneficiary.createdAt,
      UpdatedAt: beneficiary.updatedAt,
      Documentos: beneficiary.documentos.map(doc => ({
        idDocumentos: doc.idDocumentos,
        NombreDocumento: doc.NombreDocumento,
        TipoDocumento: doc.TipoDocumento,
        Url: doc.Url,
      })),
    };

    res.status(200).json({
      message: 'Beneficiario encontrado exitosamente',
      data: formattedBeneficiary,
    });
  } catch (err) {
    console.error('Error al obtener el beneficiario por número de documento:', err);
    res.status(500).json({
      message: 'Error al obtener el beneficiario por número de documento',
      error: err.message,
    });
  }
},
  // Actualizar un beneficiario
  async updateBeneficiary(req, res) {
    const { id } = req.params;
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      Correo,
      FechaNacimiento,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Direccion,
      Nacionalidad,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
      Sexo_idSexo,
      Contrato,
      TelefonoTres,
      Servicio,
      Tecnologia,
      ViaPrincipalClave,
      ViaPrincipalValor,
      ViaSecundariaClave,
      ViaSecundariaValor,
      ViaSecundariaValorDos,
      TipoUnidadUnoClave,
      TipoUnidadUnoValor,
      TipoUnidadDosClave,
      TipoUnidadDosValor,
    } = req.body;
  
    const idAdministrador = req.user.id;
  
    try {
      // Buscar el beneficiario
      const beneficiary = await Beneficiario.findByPk(id);
  
      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }
  
      // Verificar si el número de documento ya está registrado en otro beneficiario
      const existingBeneficiaryByDocumento = await Beneficiario.findOne({
        where: { NumeroDocumento, idBeneficiario: { [Op.ne]: id } },
      });
  
      if (existingBeneficiaryByDocumento) {
        return res.status(400).json({ message: 'El número de documento ya está registrado' });
      }
  
      // Verificar si el contrato ya está registrado en otro beneficiario
      if (Contrato) {
        const existingBeneficiaryByContrato = await Beneficiario.findOne({
          where: { Contrato, idBeneficiario: { [Op.ne]: id } },
        });
  
        if (existingBeneficiaryByContrato) {
          return res.status(400).json({
            message: 'El contrato ya está registrado con otro beneficiario',
          });
        }
      }
  
      // Registrar los valores anteriores para el historial
      const previousValues = { ...beneficiary.toJSON() };
  
      // Actualizar solo los campos presentes en req.body
      const fieldsToUpdate = {
        Nombre,
        Apellido,
        TipoDocumento_idTipoDocumento,
        NumeroDocumento,
        Telefono,
        Celular,
        Correo,
        FechaNacimiento,
        FechaInicio,
        FechaFin,
        CodigoDaneDpmto,
        CodigoDaneMunicipio,
        Departamento,
        Municipio,
        Direccion,
        Nacionalidad,
        Barrio,
        Anexo,
        Estado_idEstado,
        Estrato_idEstrato,
        Sexo_idSexo,
        Contrato,
        TelefonoTres,
        Servicio,
        Tecnologia,
        ViaPrincipalClave,
        ViaPrincipalValor,
        ViaSecundariaClave,
        ViaSecundariaValor,
        ViaSecundariaValorDos,
        TipoUnidadUnoClave,
        TipoUnidadUnoValor,
        TipoUnidadDosClave,
        TipoUnidadDosValor,
      };
  
      // Solo actualizar los campos presentes en req.body
      Object.entries(fieldsToUpdate).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          beneficiary[key] = value;
        }
      });
  
      // Guardar cambios
      await beneficiary.save();
  
      // Registrar el cambio en HistorialCambio
      await HistorialCambio.create({
        Accion: 'Actualización',
        ValorAnterior: JSON.stringify(previousValues),
        ValorNuevo: JSON.stringify(beneficiary),
        Administrador_idAdministrador: idAdministrador,
        Beneficiario_idBeneficiario: beneficiary.idBeneficiario,
      });
  
      res.status(200).json({
        message: 'Beneficiario actualizado exitosamente',
        updatedBeneficiaryId: beneficiary.idBeneficiario,
      });
    } catch (err) {
      console.error('Error al actualizar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al actualizar el beneficiario',
        error: err.message,
      });
    }
  },

  // Eliminar un beneficiario
  async deleteBeneficiary(req, res) {
    const { id } = req.params;
    const idAdministrador = req.user.id; // ID del administrador activo (extraído del middleware de autenticación)
  
    try {
      // Buscar al beneficiario por su ID
      const beneficiary = await Beneficiario.findByPk(id);
  
      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }
  
      // Eliminar los documentos asociados al beneficiario antes de eliminar al beneficiario
      const documentos = await Documento.findAll({
        where: { Beneficiario_idBeneficiario: id }
      });
  
      // Si existen documentos, eliminarlos
      if (documentos.length > 0) {
        for (const doc of documentos) {
          // Intentar eliminar el archivo físico del sistema
          const filePath = path.resolve(__dirname, '..', '..', doc.Url.replace(/^https?:\/\/[^/]+\//, ''));
          // const filePath = path.resolve(__dirname, '..', '..', doc.Url); // Usamos 'uploads' como directorio base
          try {
            await fs.access(filePath); // Verifica si el archivo existe
            await fs.unlink(filePath); // Elimina el archivo físico
          } catch (err) {
            console.error(`Error al intentar eliminar el archivo: ${filePath}`, err.message);
            // Continuar con la eliminación aunque no se pueda eliminar el archivo
          }
  
          // Eliminar el documento de la base de datos
          await doc.destroy();
  
          // Registrar el cambio en HistorialCambio para la eliminación de cada documento
          await HistorialCambio.create({
            Accion: 'Eliminación',
            ValorAnterior: JSON.stringify(doc),
            ValorNuevo: 'N/A',
            Administrador_idAdministrador: idAdministrador,
            Beneficiario_idBeneficiario: doc.Beneficiario_idBeneficiario,
          });
        }
      }
  
      // Registrar el cambio en HistorialCambio antes de eliminar al beneficiario
      await HistorialCambio.create({
        Accion: 'Eliminación',
        ValorAnterior: JSON.stringify(beneficiary), // Guardamos los datos del beneficiario antes de eliminarlo
        ValorNuevo: 'N/A', // En la eliminación, no hay nuevo valor
        Administrador_idAdministrador: idAdministrador,
        Beneficiario_idBeneficiario: beneficiary.idBeneficiario,
      });
  
      // Eliminar el beneficiario
      await beneficiary.destroy();
  
      res.status(200).json({
        message: 'Beneficiario y sus documentos eliminados exitosamente',
      });
    } catch (err) {
      console.error('Error al eliminar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al eliminar el beneficiario',
        error: err.message,
      });
    }
  },

  updateBeneficiariosFromExcel: async (req, res) => {
    try {
      // Usamos multer para manejar el archivo subido en memoria
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message }); // Si ocurre un error, respondemos con el mensaje
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No se ha subido ningún archivo Excel' });
        }

        // Leemos el archivo Excel directamente desde la memoria
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertimos la hoja en un array de arrays

        // Función para convertir fecha de Excel a formato DD-MM-YYYY o null si está vacía o inválida
        const convertToDatabaseFormat = (excelDate) => {
          if (!excelDate) return null;
          if (excelDate instanceof Date) {
            const [year, month, day] = excelDate.toISOString().split('T')[0].split('-');
            return `${day}-${month}-${year}`; // Formato DD-MM-YYYY
          }
          if (typeof excelDate === 'number') {
            const date = new Date((excelDate - 25569) * 86400 * 1000);
            const [year, month, day] = date.toISOString().split('T')[0].split('-');
            return `${day}-${month}-${year}`; // Formato DD-MM-YYYY
          }
          return null;
        };

        let registrosActualizados = 0;

        // Iteramos desde la fila 2 (índice 1) para leer los valores
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          const contrato = row[0]; // Contrato (columna A)
          const estado = row[1]; // Estado (columna B)
          const fPrimAct = convertToDatabaseFormat(row[2]); // FPrimAct (columna C)
          const fUltDX = convertToDatabaseFormat(row[3]); // FUltDX (columna D)

          // Verificar que los valores de la fila sean válidos
          if (!contrato || !estado) {
            console.log(`Faltan datos en la fila ${i + 1}, saltando la actualización.`);
            continue;
          }

          // Buscar al beneficiario por el contrato
          const beneficiario = await Beneficiario.findOne({ where: { Contrato: contrato } });

          if (beneficiario) {
            // Buscar el estado en la base de datos
            const estadoId = await Estado.findOne({ where: { Estado: estado } });

            if (!estadoId) {
              console.log(`Estado "${estado}" no encontrado en la base de datos.`);
              continue;
            }

            // Actualizar los campos
            beneficiario.FPrimAct = fPrimAct;
            beneficiario.FUltDX = fUltDX;
            beneficiario.Estado_idEstado = estadoId.idEstado;

            // Guardar en la base de datos
            await beneficiario.save();
            registrosActualizados++;
          } else {
            console.log(`Beneficiario con contrato ${contrato} no encontrado.`);
          }
        }

        res.status(200).json({
          message: 'Beneficiarios actualizados correctamente',
          registrosActualizados,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al procesar el archivo' });
    }
  },


// Método para importar y actualizar Beneficiarios desde Excel
updateBeneficiariosFromExcelCPE: async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo Excel' });
      }

      // Leer el archivo Excel
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0]; // Obtener la primera hoja
      const sheet = workbook.Sheets[sheetName];

      // Convertir a JSON
      const data = XLSX.utils.sheet_to_json(sheet, { raw: false });

      // Validar que hay datos
      if (data.length === 0) {
        return res.status(400).json({ message: 'El archivo está vacío o mal formateado' });
      }

      let updatedCount = 0;
      let contratosActualizados = []; // Lista de contratos actualizados

      // Recorrer cada fila y actualizar en la DB
      for (const row of data) {
        const { Contrato, Serial_cpe, Fabricante_cpe, Fecha_Instalacion, Latitud, Longitud } = row;

        // Verificar si el contrato existe
        const beneficiario = await Beneficiario.findOne({ where: { Contrato } });

        if (beneficiario) {
          // Actualizar los datos correspondientes
          await beneficiario.update({
            SerialCpe: Serial_cpe,
            FabricanteCpe: Fabricante_cpe,
            FechaInstalacion: Fecha_Instalacion,
            Latitud,
            Longitud
          });
          updatedCount++;
          contratosActualizados.push(Contrato); // Guardar número de contrato actualizado
        }
      }

      res.json({
        message: `Se actualizaron ${updatedCount} beneficiarios correctamente`,
        contratos_actualizados: contratosActualizados
      });

    });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
},

   // Método para obtener el PDF combinado de los documentos de un beneficiario
   async getCombinedDocuments(req, res) {
    const { id } = req.params;
  
    try {
      // Obtener el beneficiario junto con sus documentos y el campo Contrato
      const beneficiary = await Beneficiario.findOne({
        where: { idBeneficiario: id },
        attributes: ['Contrato'], // Incluir el atributo Contrato
        include: [
          {
            model: Documento,
            attributes: ['Url'],
            as: 'documentos',
          },
        ],
      });
  
      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }
  
      // Extraer las URLs de los documentos
      const documentUrls = beneficiary.documentos.map(doc => doc.Url);
  
      // Combinar los documentos en un único PDF
      const combinedPdfBytes = await combineDocuments(documentUrls);
  
      // Definir la ruta donde se guardará el PDF combinado utilizando el campo Contrato
      const pdfPath = path.join(__dirname, '..', 'public', 'combined_documents', `beneficiario_${beneficiary.Contrato}_documentos.pdf`);
  
      // Crear el directorio si no existe
      await fs.mkdir(path.dirname(pdfPath), { recursive: true });
  
      // Guardar el PDF en el servidor
      await fs.writeFile(pdfPath, combinedPdfBytes);
  
      // Generar la URL de descarga
      const downloadUrl = `${req.protocol}://${req.get('host')}/combined_documents/beneficiario_${beneficiary.Contrato}_documentos.pdf`;
  
      // Enviar la URL de descarga al cliente
      res.status(200).json({ downloadUrl });
    } catch (err) {
      console.error('Error al generar el PDF combinado:', err);
      res.status(500).json({
        message: 'Error al generar el PDF combinado',
        error: err.message,
      });
    }
  },
};

module.exports = registerBeneficiaryController;
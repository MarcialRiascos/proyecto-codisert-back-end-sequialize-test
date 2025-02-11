-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-02-2025 a las 03:21:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_codisert`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Rol_idRol` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(11) DEFAULT NULL,
  `Sexo_idSexo` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `Nombre`, `Apellido`, `TipoDocumento_idTipoDocumento`, `NumeroDocumento`, `Telefono`, `Correo`, `Password`, `Estado_idEstado`, `Rol_idRol`, `Administrador_idAdministrador`, `Sexo_idSexo`, `createdAt`, `updatedAt`) VALUES
(1, 'Ivan Dario', 'Valencia', 1, '1234567890', '123456789', 'superadmin@dominio.com', '$2b$10$8KnDUbtXgw.FaDcTwJlEA.n5ieZ4ZmifKdQUsWtgda1lzserCv0/S', 1, 1, NULL, 1, '2025-02-11 02:21:36', '2025-02-11 02:21:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrio`
--

CREATE TABLE `barrio` (
  `idBarrio` int(10) UNSIGNED NOT NULL,
  `Barrio` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `barrio`
--

INSERT INTO `barrio` (`idBarrio`, `Barrio`, `createdAt`, `updatedAt`) VALUES
(1, '12 De Abril', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(2, '14 De Julio', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(3, '20 De Junio', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(4, '6 De Enero', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(5, 'Alfonso Lopez Michelsen', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(6, 'Alfonso Lopez Pumarejo', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(7, 'Americas', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(8, 'Andalucia', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(9, 'Antonio Nariño', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(10, 'Bahia', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(11, 'Bellavista', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(12, 'Bolivar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(13, 'Bosque', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(14, 'Brisas Del Mar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(15, 'Brisas Del Pacifico', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(16, 'Buenos Aires', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(17, 'Cabal Pombo', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(18, 'Caldas', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(19, 'Camilo Torres', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(20, 'Campin', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(21, 'Cascajal', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(22, 'Centenario', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(23, 'Centro', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(24, 'Ciudadela Colpuertos', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(25, 'Ciudadela Nueva Buenaventura', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(26, 'Colinas de Comfamar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(27, 'Colon', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(28, 'Comfamar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(29, 'Cordoba', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(30, 'Cristal', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(31, 'Dona Ceci', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(32, 'El Cambio', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(33, 'El Carmen', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(34, 'El Dorado', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(35, 'El Progreso', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(36, 'El Ruiz', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(37, 'El Triunfo', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(38, 'Eucaristico', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(39, 'Firme', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(40, 'Fortaleza', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(41, 'Gaitan', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(42, 'Galeon', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(43, 'Gran Colombiana', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(44, 'Independencia', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(45, 'Inmaculada', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(46, 'Jardin', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(47, 'Jorge', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(48, 'Juan 23', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(49, 'Kennedy', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(50, 'La Campiña', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(51, 'La Comuna', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(52, 'La Dignidad', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(53, 'La Libertad', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(54, 'La Piña', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(55, 'Las Palmas', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(56, 'Lleras', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(57, 'Los Alamos', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(58, 'Los Pinos', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(59, 'Manglares', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(60, 'Maria Eugenia', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(61, 'Matias Mulumba', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(62, 'Miraflores', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(63, 'Miramar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(64, 'Modelo', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(65, 'Muroyusti', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(66, 'Naval', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(67, 'Nayita', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(68, 'Nueva Colombia', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(69, 'Nueva Floresta', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(70, 'Nueva Frontera', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(71, 'Nueva Granada', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(72, 'Nuevo Amanecer', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(73, 'Nuevo Horizonte', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(74, 'Obrero', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(75, 'Olimpico', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(76, 'Oriente', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(77, 'Paloseco', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(78, 'Pampalinda', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(79, 'Panamericano', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(80, 'Playita', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(81, 'Porvenir', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(82, 'Pueblo Nuevo', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(83, 'Puertas Del Mar', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(84, 'Punta Del Este', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(85, 'Rockefeller', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(86, 'San Buenaventura', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(87, 'San Francisco', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(88, 'San Luis', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(89, 'Santa Cruz', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(90, 'Santa Fe', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(91, 'Santa Rosa', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(92, 'Transformacion', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(93, 'Trapiche', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(94, 'Turbay Ayala', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(95, 'Union De Vivienda', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(96, 'Urb. San Antonio 1', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(97, 'Urb. San Antonio 2', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(98, 'Urbanizacion Los Angeles', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(99, 'Uribe Uribe', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(100, 'Viento Libre', '2025-02-11 02:21:37', '2025-02-11 02:21:37'),
(101, 'Vista Hermosa', '2025-02-11 02:21:37', '2025-02-11 02:21:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario`
--

CREATE TABLE `beneficiario` (
  `idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Contrato` varchar(45) DEFAULT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Celular` varchar(45) DEFAULT NULL,
  `TelefonoTres` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `CodigoDaneDpmto` varchar(45) NOT NULL,
  `Departamento` varchar(45) NOT NULL,
  `CodigoDaneMunicipio` varchar(45) NOT NULL,
  `Municipio` varchar(45) NOT NULL,
  `Servicio` varchar(45) DEFAULT NULL,
  `Tecnologia` varchar(45) DEFAULT NULL,
  `Direccion` varchar(45) DEFAULT NULL,
  `ViaPrincipalClave` varchar(45) DEFAULT NULL,
  `ViaPrincipalValor` varchar(45) DEFAULT NULL,
  `ViaSecundariaClave` varchar(45) DEFAULT NULL,
  `ViaSecundariaValor` varchar(45) DEFAULT NULL,
  `ViaSecundariaValorDos` varchar(45) DEFAULT NULL,
  `TipoUnidadUnoClave` varchar(45) DEFAULT NULL,
  `TipoUnidadUnoValor` varchar(45) DEFAULT NULL,
  `TipoUnidadDosClave` varchar(45) DEFAULT NULL,
  `TipoUnidadDosValor` varchar(45) DEFAULT NULL,
  `Barrio` varchar(45) DEFAULT NULL,
  `Anexo` varchar(255) DEFAULT NULL,
  `FPrimAct` varchar(45) DEFAULT NULL,
  `FUltDX` varchar(45) DEFAULT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Estrato_idEstrato` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `Sexo_idSexo` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `idDocumentos` int(10) UNSIGNED NOT NULL,
  `NombreDocumento` varchar(45) NOT NULL,
  `TipoDocumento` varchar(255) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(10) UNSIGNED NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `Estado`, `createdAt`, `updatedAt`) VALUES
(1, 'Activo', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(2, 'Inactivo', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(3, 'Operativo', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(4, 'Suspendido', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(5, 'Desconectado', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(6, 'Registrado', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(7, 'Retirado', '2025-02-11 02:21:35', '2025-02-11 02:21:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estrato`
--

CREATE TABLE `estrato` (
  `idEstrato` int(10) UNSIGNED NOT NULL,
  `Estrato` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estrato`
--

INSERT INTO `estrato` (`idEstrato`, `Estrato`, `createdAt`, `updatedAt`) VALUES
(1, '1', '2025-02-11 02:21:35', '2025-02-11 02:21:35'),
(2, '2', '2025-02-11 02:21:35', '2025-02-11 02:21:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(10) UNSIGNED NOT NULL,
  `FechaFra` varchar(45) DEFAULT NULL,
  `Factura` varchar(45) DEFAULT NULL,
  `Contrato` varchar(45) DEFAULT NULL,
  `Mes` varchar(45) DEFAULT NULL,
  `Clase` varchar(45) DEFAULT NULL,
  `Servicio` varchar(45) DEFAULT NULL,
  `AntesImptos` int(11) DEFAULT NULL,
  `Imptos` int(11) DEFAULT NULL,
  `Facturado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion`
--

CREATE TABLE `facturacion` (
  `idFacturacion` int(10) UNSIGNED NOT NULL,
  `NombreDocumento` varchar(45) NOT NULL,
  `Url` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialcambio`
--

CREATE TABLE `historialcambio` (
  `idHistorialCambio` int(10) UNSIGNED NOT NULL,
  `Accion` varchar(45) NOT NULL,
  `ValorAnterior` text NOT NULL,
  `ValorNuevo` text DEFAULT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(10) UNSIGNED NOT NULL,
  `Rol` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `Rol`, `createdAt`, `updatedAt`) VALUES
(1, 'admin_super', '2025-02-11 02:21:34', '2025-02-11 02:21:34'),
(2, 'admin_registrador', '2025-02-11 02:21:34', '2025-02-11 02:21:34'),
(3, 'admin_lector', '2025-02-11 02:21:34', '2025-02-11 02:21:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `idSexo` int(10) UNSIGNED NOT NULL,
  `Sexo` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sexo`
--

INSERT INTO `sexo` (`idSexo`, `Sexo`, `createdAt`, `updatedAt`) VALUES
(1, 'Masculino', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(2, 'Femenino', '2025-02-11 02:21:36', '2025-02-11 02:21:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`idTipoDocumento`, `TipoDocumento`, `createdAt`, `updatedAt`) VALUES
(1, 'CC', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(2, 'PAS', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(3, 'CE', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(4, 'NIT', '2025-02-11 02:21:36', '2025-02-11 02:21:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipounidad`
--

CREATE TABLE `tipounidad` (
  `idTipoUnidad` int(10) UNSIGNED NOT NULL,
  `TipoUnidad` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipounidad`
--

INSERT INTO `tipounidad` (`idTipoUnidad`, `TipoUnidad`, `createdAt`, `updatedAt`) VALUES
(1, 'APTO', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(2, 'BL', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(3, 'CASA', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(4, 'CONS', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(5, 'ESQU', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(6, 'INT', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(7, 'LOCAL', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(8, 'OFIC', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(9, 'PISO', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(10, 'PUNTOS', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(11, 'TORRE', '2025-02-11 02:21:36', '2025-02-11 02:21:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `via`
--

CREATE TABLE `via` (
  `idVia` int(10) UNSIGNED NOT NULL,
  `Via` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `via`
--

INSERT INTO `via` (`idVia`, `Via`, `createdAt`, `updatedAt`) VALUES
(1, 'Cra', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(2, 'Cll', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(3, 'Mz', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(4, 'Diag', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(5, 'Transv', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(6, 'Km', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(7, 'Av', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(8, 'SIN', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(9, 'Etapa', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(10, '#', '2025-02-11 02:21:36', '2025-02-11 02:21:36'),
(11, 'UV', '2025-02-11 02:21:36', '2025-02-11 02:21:36');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD UNIQUE KEY `NumeroDocumento_UNIQUE` (`NumeroDocumento`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Administrador_Rol1_idx` (`Rol_idRol`),
  ADD KEY `fk_Administrador_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`),
  ADD KEY `fk_Administrador_Sexo1_idx` (`Sexo_idSexo`);

--
-- Indices de la tabla `barrio`
--
ALTER TABLE `barrio`
  ADD PRIMARY KEY (`idBarrio`),
  ADD UNIQUE KEY `Barrio_UNIQUE` (`Barrio`);

--
-- Indices de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD PRIMARY KEY (`idBeneficiario`),
  ADD UNIQUE KEY `Contrato_UNIQUE` (`Contrato`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Persona_Estrato1_idx` (`Estrato_idEstrato`),
  ADD KEY `fk_Beneficiario_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_Beneficiario_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`),
  ADD KEY `fk_Beneficiario_Sexo1_idx` (`Sexo_idSexo`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`idDocumentos`),
  ADD KEY `fk_Dcumentos_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_Dcumentos_Beneficiario1_idx` (`Beneficiario_idBeneficiario`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idEstado`),
  ADD UNIQUE KEY `Estado_UNIQUE` (`Estado`);

--
-- Indices de la tabla `estrato`
--
ALTER TABLE `estrato`
  ADD PRIMARY KEY (`idEstrato`),
  ADD UNIQUE KEY `Estrato_UNIQUE` (`Estrato`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`);

--
-- Indices de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD PRIMARY KEY (`idFacturacion`);

--
-- Indices de la tabla `historialcambio`
--
ALTER TABLE `historialcambio`
  ADD PRIMARY KEY (`idHistorialCambio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`),
  ADD UNIQUE KEY `Rol_UNIQUE` (`Rol`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idSexo`),
  ADD UNIQUE KEY `Sexo_UNIQUE` (`Sexo`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idTipoDocumento`),
  ADD UNIQUE KEY `TipoDocumento_UNIQUE` (`TipoDocumento`);

--
-- Indices de la tabla `tipounidad`
--
ALTER TABLE `tipounidad`
  ADD PRIMARY KEY (`idTipoUnidad`),
  ADD UNIQUE KEY `TipoUnidad_UNIQUE` (`TipoUnidad`);

--
-- Indices de la tabla `via`
--
ALTER TABLE `via`
  ADD PRIMARY KEY (`idVia`),
  ADD UNIQUE KEY `Via_UNIQUE` (`Via`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `barrio`
--
ALTER TABLE `barrio`
  MODIFY `idBarrio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  MODIFY `idBeneficiario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `idDocumentos` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `estrato`
--
ALTER TABLE `estrato`
  MODIFY `idEstrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  MODIFY `idFacturacion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historialcambio`
--
ALTER TABLE `historialcambio`
  MODIFY `idHistorialCambio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
  MODIFY `idSexo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipoDocumento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipounidad`
--
ALTER TABLE `tipounidad`
  MODIFY `idTipoUnidad` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `via`
--
ALTER TABLE `via`
  MODIFY `idVia` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_Administrador_Rol1` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Administrador_Sexo1` FOREIGN KEY (`Sexo_idSexo`) REFERENCES `sexo` (`idSexo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Administrador_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado10` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD CONSTRAINT `fk_Beneficiario_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beneficiario_Sexo1` FOREIGN KEY (`Sexo_idSexo`) REFERENCES `sexo` (`idSexo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beneficiario_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado1` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estrato1` FOREIGN KEY (`Estrato_idEstrato`) REFERENCES `estrato` (`idEstrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `fk_Dcumentos_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Dcumentos_Beneficiario1` FOREIGN KEY (`Beneficiario_idBeneficiario`) REFERENCES `beneficiario` (`idBeneficiario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

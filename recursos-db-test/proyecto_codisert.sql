-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-01-2025 a las 06:19:27
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
(1, 'Ivan Dario', 'Valencia', 1, '1234567890', '123456789', 'superadmin@dominio.com', '$2b$10$hrC9VeUevyQA7t5ebmueWePxW.Mj.y1M8LjYtVSEkcMjq995THa5.', 1, 1, NULL, 1, '2025-01-09 05:14:27', '2025-01-09 05:18:58');

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
(1, '12 De Abril', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(2, '14 De Julio', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(3, '20 De Junio', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(4, '6 De Enero', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(5, 'Alfonso Lopez Michelsen', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(6, 'Alfonso Lopez Pumarejo', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(7, 'Americas', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(8, 'Andalucia', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(9, 'Antonio Nariño', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(10, 'Bahia', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(11, 'Bellavista', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(12, 'Bolivar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(13, 'Bosque', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(14, 'Brisas Del Mar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(15, 'Brisas Del Pacifico', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(16, 'Buenos Aires', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(17, 'Cabal Pombo', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(18, 'Caldas', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(19, 'Camilo Torres', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(20, 'Campin', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(21, 'Cascajal', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(22, 'Centenario', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(23, 'Centro', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(24, 'Ciudadela Colpuertos', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(25, 'Ciudadela Nueva Buenaventura', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(26, 'Colinas de Comfamar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(27, 'Colon', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(28, 'Comfamar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(29, 'Cordoba', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(30, 'Cristal', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(31, 'Dona Ceci', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(32, 'El Cambio', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(33, 'El Carmen', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(34, 'El Dorado', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(35, 'El Progreso', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(36, 'El Ruiz', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(37, 'El Triunfo', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(38, 'Eucaristico', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(39, 'Firme', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(40, 'Fortaleza', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(41, 'Gaitan', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(42, 'Galeon', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(43, 'Gran Colombiana', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(44, 'Independencia', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(45, 'Inmaculada', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(46, 'Jardin', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(47, 'Jorge', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(48, 'Juan 23', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(49, 'Kennedy', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(50, 'La Campiña', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(51, 'La Comuna', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(52, 'La Dignidad', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(53, 'La Libertad', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(54, 'La Piña', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(55, 'Las Palmas', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(56, 'Lleras', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(57, 'Los Alamos', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(58, 'Los Pinos', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(59, 'Manglares', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(60, 'Maria Eugenia', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(61, 'Matias Mulumba', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(62, 'Miraflores', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(63, 'Miramar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(64, 'Modelo', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(65, 'Muroyusti', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(66, 'Naval', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(67, 'Nayita', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(68, 'Nueva Colombia', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(69, 'Nueva Floresta', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(70, 'Nueva Frontera', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(71, 'Nueva Granada', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(72, 'Nuevo Amanecer', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(73, 'Nuevo Horizonte', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(74, 'Obrero', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(75, 'Olimpico', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(76, 'Oriente', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(77, 'Paloseco', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(78, 'Pampalinda', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(79, 'Panamericano', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(80, 'Playita', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(81, 'Porvenir', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(82, 'Pueblo Nuevo', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(83, 'Puertas Del Mar', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(84, 'Punta Del Este', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(85, 'Rockefeller', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(86, 'San Buenaventura', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(87, 'San Francisco', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(88, 'San Luis', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(89, 'Santa Cruz', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(90, 'Santa Fe', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(91, 'Santa Rosa', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(92, 'Transformacion', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(93, 'Trapiche', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(94, 'Turbay Ayala', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(95, 'Union De Vivienda', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(96, 'Urb. San Antonio 1', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(97, 'Urb. San Antonio 2', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(98, 'Urbanizacion Los Angeles', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(99, 'Uribe Uribe', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(100, 'Viento Libre', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(101, 'Vista Hermosa', '2025-01-09 05:14:27', '2025-01-09 05:14:27');

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
  `FechaNacimiento` date NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date DEFAULT NULL,
  `CodigoDaneDpmto` varchar(45) NOT NULL,
  `Departamento` varchar(45) NOT NULL,
  `CodigoDaneMunicipio` varchar(45) NOT NULL,
  `Municipio` varchar(45) NOT NULL,
  `Servicio` varchar(45) DEFAULT NULL,
  `Direccion` varchar(45) NOT NULL,
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
(1, 'Activo', '2025-01-09 05:14:24', '2025-01-09 05:14:24'),
(2, 'Inactivo', '2025-01-09 05:14:24', '2025-01-09 05:14:24'),
(3, 'Operativo', '2025-01-09 05:14:24', '2025-01-09 05:14:24'),
(4, 'Suspendido', '2025-01-09 05:14:24', '2025-01-09 05:14:24');

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
(1, '1', '2025-01-09 05:14:25', '2025-01-09 05:14:25'),
(2, '2', '2025-01-09 05:14:25', '2025-01-09 05:14:25'),
(3, '3', '2025-01-09 05:14:25', '2025-01-09 05:14:25'),
(4, '4', '2025-01-09 05:14:25', '2025-01-09 05:14:25'),
(5, '5', '2025-01-09 05:14:25', '2025-01-09 05:14:25'),
(6, '6', '2025-01-09 05:14:25', '2025-01-09 05:14:25');

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
(1, 'admin_super', '2025-01-09 05:14:23', '2025-01-09 05:14:23'),
(2, 'admin_registrador', '2025-01-09 05:14:23', '2025-01-09 05:14:23'),
(3, 'admin_lector', '2025-01-09 05:14:23', '2025-01-09 05:14:23');

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
(1, 'Masculino', '2025-01-09 05:14:26', '2025-01-09 05:14:26'),
(2, 'Femenino', '2025-01-09 05:14:26', '2025-01-09 05:14:26'),
(3, 'Otro', '2025-01-09 05:14:26', '2025-01-09 05:14:26');

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
(1, 'Cedula de ciudadanía', '2025-01-09 05:14:26', '2025-01-09 05:14:26'),
(2, 'Cedula de ciudadanía extranjera', '2025-01-09 05:14:26', '2025-01-09 05:14:26'),
(3, 'Pasaporte', '2025-01-09 05:14:26', '2025-01-09 05:14:26');

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
(1, 'APTO', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(2, 'BL', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(3, 'CASA', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(4, 'CONS', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(5, 'ESQU', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(6, 'INT', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(7, 'LOCAL', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(8, 'OFIC', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(9, 'PISO', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(10, 'PUNTOS', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(11, 'TORRE', '2025-01-09 05:14:27', '2025-01-09 05:14:27');

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
(1, 'Cra', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(2, 'Cll', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(3, 'Mz', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(4, 'Diag', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(5, 'Transv', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(6, 'Km', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(7, 'Av', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(8, 'SIN', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(9, 'Etapa', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(10, '#', '2025-01-09 05:14:27', '2025-01-09 05:14:27'),
(11, 'UV', '2025-01-09 05:14:27', '2025-01-09 05:14:27');

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
  ADD PRIMARY KEY (`idBarrio`);

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
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `estrato`
--
ALTER TABLE `estrato`
  ADD PRIMARY KEY (`idEstrato`);

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
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idSexo`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idTipoDocumento`);

--
-- Indices de la tabla `tipounidad`
--
ALTER TABLE `tipounidad`
  ADD PRIMARY KEY (`idTipoUnidad`);

--
-- Indices de la tabla `via`
--
ALTER TABLE `via`
  ADD PRIMARY KEY (`idVia`);

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
  MODIFY `idEstado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estrato`
--
ALTER TABLE `estrato`
  MODIFY `idEstrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `idSexo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipoDocumento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

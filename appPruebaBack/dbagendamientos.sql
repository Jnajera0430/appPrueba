-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2023 a las 22:16:26
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbagendamientos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agendamientos`
--

CREATE TABLE `agendamientos` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idEmpleado` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  `confirmacion` tinyint(1) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `agendamientos`
--

INSERT INTO `agendamientos` (`id`, `idUser`, `idEmpleado`, `fecha`, `hora_inicio`, `hora_final`, `confirmacion`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 3, 2, '2023-02-06', '08:00:00', '08:30:00', 0, 0, '2023-02-06 13:41:28', '2023-02-06 20:58:20'),
(2, NULL, 2, '2023-02-06', '08:31:00', '09:01:00', 0, NULL, '2023-02-06 13:41:33', '2023-02-06 13:41:33'),
(3, NULL, 2, '2023-02-06', '09:02:00', '09:32:00', 0, NULL, '2023-02-06 13:41:34', '2023-02-06 13:41:34'),
(4, NULL, 3, '2023-02-06', '08:00:00', '08:30:00', 0, NULL, '2023-02-06 13:43:18', '2023-02-06 13:43:18'),
(5, NULL, 3, '2023-02-06', '08:31:00', '09:01:00', 0, NULL, '2023-02-06 13:43:19', '2023-02-06 16:55:18'),
(6, 3, 3, '2023-02-06', '09:02:00', '09:32:00', 0, 0, '2023-02-06 13:43:19', '2023-02-06 20:58:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `idEmpleado` varchar(200) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cc` int(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `edad` int(3) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'empleado',
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `idEmpleado`, `nombre`, `cc`, `email`, `contraseña`, `edad`, `rol`, `createdAt`, `updatedAt`) VALUES
(2, '691d099f-c4f4-44fd-a7cd-48d66e5ab90d', 'Jasiel Flores', 65654546, 'Jasiel@gmail.com', 'algo12345', 20, 'empleado', '2023-02-04', '2023-02-04'),
(3, 'c63ab563-1031-4b2b-b01c-a9fb76c69382', 'joel Matador Salas', 556564, 'joelmatador@gmail.com', 'algo12345', 25, 'empleado', '2023-02-04', '2023-02-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `idUser` varchar(200) NOT NULL,
  `cc` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `edad` int(3) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `idUser`, `cc`, `nombre`, `email`, `contraseña`, `edad`, `rol`, `createdAt`, `updatedAt`) VALUES
(2, '74d4fb6c-07bd-4d38-b22e-5b37172c5bca', 1001881776, 'Jose Najera Avendaño', 'najera@gmail.com', 'algo12345', 22, 'admin', '2023-02-01 20:36:21', '2023-02-01 20:36:21'),
(3, '719cf997-3558-4c9a-81bc-5195ebee841e', 123454565, 'Robert Guerra', 'robert@gmail.com', 'algo12345', 54, 'user', '2023-02-04 13:28:02', '2023-02-04 13:28:02'),
(4, '4c088ed1-67c5-4583-bcac-a5e757b02f72', 2147483647, 'Yoel Matador Salas', 'elmatadorSalas@gmail.com', 'algo12345', 25, 'user', '2023-02-04 13:30:07', '2023-02-04 13:30:07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agendamientos`
--
ALTER TABLE `agendamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmpleadpo` (`idEmpleado`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agendamientos`
--
ALTER TABLE `agendamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agendamientos`
--
ALTER TABLE `agendamientos`
  ADD CONSTRAINT `agendamientos_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `agendamientos_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2024 a las 23:25:42
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
-- Base de datos: `sim_gestion_memoria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajustes_de_memoria`
--

CREATE TABLE `ajustes_de_memoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(350) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ajustes_de_memoria`
--

INSERT INTO `ajustes_de_memoria` (`id`, `nombre`, `descripcion`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'primer ajuste', 'El algoritmo de primer ajuste en la gestión de memoria busca asignar un bloque de memoria a un proceso buscando el primer bloque libre que sea lo suficientemente grande para satisfacer la solicitud. Una vez encontrado el bloque adecuado, se le asigna la memoria al proceso y el bloque libre se reduce o se divide según sea necesario.', '2024-09-10 16:02:44', '2024-09-10 16:02:44', NULL),
(2, 'mejor ajuste', 'El algoritmo de mejor ajuste en la gestión de memoria busca asignar el bloque de memoria más pequeño que sea suficiente para satisfacer una solicitud de memoria. De esta manera, intenta minimizar el espacio libre restante después de la asignación. Este enfoque puede ayudar a reducir el desperdicio de espacio en la memoria, pero puede llevar a una m', '2024-09-10 16:04:45', '2024-09-10 16:04:45', NULL),
(3, 'peor ajuste', 'El algoritmo de peor ajuste en la gestión de memoria asigna el bloque de memoria más grande disponible para satisfacer una solicitud. Este enfoque busca dejar fragmentos grandes de memoria libre para futuras solicitudes, aunque puede llevar a una mayor fragmentación externa y a un uso menos eficiente del espacio en memoria.', '2024-09-10 16:06:00', '2024-09-10 16:06:00', NULL),
(4, 'siguiente ajuste', 'El algoritmo de siguiente ajuste en la gestión de memoria asigna bloques de memoria a partir de la última posición utilizada, continuando desde allí para buscar el siguiente bloque libre que sea adecuado. Este método es una mejora sobre el ajuste primero, ya que reduce la búsqueda a partir del último punto de asignación, lo que puede mejorar el ren', '2024-09-10 16:06:43', '2024-09-10 16:06:43', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  `proceso_id` int(11) NOT NULL,
  `particion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cola_procesos`
--

CREATE TABLE `cola_procesos` (
  `id` int(11) NOT NULL,
  `prioridad` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  `proceso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `particiones`
--

CREATE TABLE `particiones` (
  `id` int(11) NOT NULL,
  `tamaño` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `unidad_medida` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  `tipo_ajuste_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesos`
--

CREATE TABLE `procesos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tamaño` double NOT NULL,
  `unidad_medida` varchar(255) NOT NULL,
  `prioridad` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ajustes_de_memoria`
--
ALTER TABLE `ajustes_de_memoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a84bbd40357b823e01dd68ccbaf` (`proceso_id`),
  ADD KEY `FK_c429d012c687692b14c3ecd3a1b` (`particion_id`);

--
-- Indices de la tabla `cola_procesos`
--
ALTER TABLE `cola_procesos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_706ee0dd20add825dab5e4a820f` (`proceso_id`);

--
-- Indices de la tabla `particiones`
--
ALTER TABLE `particiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7ed9b6017bc2be9c5ef75b5b752` (`tipo_ajuste_id`);

--
-- Indices de la tabla `procesos`
--
ALTER TABLE `procesos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ajustes_de_memoria`
--
ALTER TABLE `ajustes_de_memoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cola_procesos`
--
ALTER TABLE `cola_procesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `particiones`
--
ALTER TABLE `particiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `procesos`
--
ALTER TABLE `procesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `FK_a84bbd40357b823e01dd68ccbaf` FOREIGN KEY (`proceso_id`) REFERENCES `procesos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c429d012c687692b14c3ecd3a1b` FOREIGN KEY (`particion_id`) REFERENCES `particiones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cola_procesos`
--
ALTER TABLE `cola_procesos`
  ADD CONSTRAINT `FK_706ee0dd20add825dab5e4a820f` FOREIGN KEY (`proceso_id`) REFERENCES `procesos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `particiones`
--
ALTER TABLE `particiones`
  ADD CONSTRAINT `FK_7ed9b6017bc2be9c5ef75b5b752` FOREIGN KEY (`tipo_ajuste_id`) REFERENCES `ajustes_de_memoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

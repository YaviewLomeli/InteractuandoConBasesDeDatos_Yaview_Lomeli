-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2018 a las 01:39:44
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `fk_usuarios` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `todo_dia` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `fk_usuarios`, `fecha_inicio`, `fecha_final`, `hora_inicio`, `hora_final`, `todo_dia`) VALUES
(58, 'Vacaciones', 23, '2018-03-11', '0000-00-00', '00:00:00', '00:00:00', 'Todo el Dia'),
(59, 'Estudiar', 23, '2018-03-01', '0000-00-00', '00:00:00', '00:00:00', 'Todo el Dia'),
(60, 'Feria', 23, '2018-03-01', '0000-00-00', '00:00:00', '00:00:00', 'No todo el dia'),
(61, 'Feria', 23, '2018-03-01', '0000-00-00', '00:00:00', '00:00:00', 'No todo el dia'),
(65, 'Premios TV Novelas', 24, '2018-03-07', '2018-03-11', '07:00:00', '07:00:00', 'No todo el dia'),
(68, 'Conferencia Paris', 22, '2018-03-01', '2018-03-28', '07:00:00', '20:30:00', 'No todo el dia'),
(69, 'Resital de Danza', 22, '2018-03-31', '0000-00-00', '00:00:00', '00:00:00', 'No todo el dia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `psw` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `psw`) VALUES
(22, 'Jurgen Klaric', 'jurgen@biia.com', '$2y$10$dtr6ZMBNBqUoKch4m.e5fO.ZuOMq1aVRqzcDX.jITcDERupqqBbC.'),
(23, 'Jennifer Lopéz', 'JL@mail.com', '$2y$10$kzzA/wzsusKPAPSKr1QPm.6ykAgy7Uk/x4I9oE07Jcz1HPN1icyei'),
(24, 'Jaime Camil', 'JC@tv.com', '$2y$10$cS9IimFL6hf4bTq4K2.zm.Zd7m.fQR3BcNnsncVEWOjrfbNb8PiFa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios` (`fk_usuarios`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`fk_usuarios`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-01-2022 a las 01:02:50
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reality_codeway`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `changeDataUser` (`idU` VARCHAR(50), `nombre` VARCHAR(100), `ap1` VARCHAR(50), `ap2` VARCHAR(50), `telefono` VARCHAR(50))  BEGIN
	UPDATE usuario SET nombreUsuario=nombre, apellidoUnoUsuario=ap1, apellidoDosUsuario=ap2, telefonoUsuario=telefono   WHERE usuario.usuario=idU;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeImgUser` (`idTienda` VARCHAR(50), `log` VARCHAR(150))  BEGIN
	UPDATE usuario SET logoTienda=log WHERE usuario.usuario=idTienda;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeMembresia` (`idTienda` VARCHAR(50), `membresia` VARCHAR(20))  BEGIN
	UPDATE usuario SET idMembresia=membresia WHERE usuario.usuario=idTienda;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changePassword` (`correo` VARCHAR(100), `contrasena` VARCHAR(200))  BEGIN
	SET @v2 = (SELECT COUNT(usuario.emailUsuario) FROM usuario WHERE usuario.emailUsuario= correo);
	if @v2 = 1 THEN
	UPDATE usuario SET contrasenaUsuario=contrasena WHERE emailUsuario=correo;
	SELECT usuario.emailUsuario FROM usuario WHERE usuario.emailUsuario= correo;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeProduct` (`marcaMueble` VARCHAR(200), `categoriaMueble` VARCHAR(50), `idProducto` VARCHAR(20), `nombreP` VARCHAR(150), `descripcionP` VARCHAR(500), `stockP` INT(1), `precioP` FLOAT(6), `imgP` VARCHAR(400), `image1` VARCHAR(400), `image2` VARCHAR(400), `image3` VARCHAR(400))  BEGIN
SET @v1 := (SELECT COUNT(idMarca) FROM marca WHERE nombreMarca=marcaMueble);
SET @v2 := (SELECT idCategoria FROM categoria WHERE categoria=categoriaMueble);

IF @v1 = 0 THEN
	INSERT INTO marca (nombreMarca) VALUES (marcaMueble);
END IF;

SET @v3 := (SELECT idMarca FROM marca WHERE nombreMarca=marcaMueble);

UPDATE producto SET nombreProducto=nombreP, descripcionProducto=descripcionP, imgPrincipal=imgP, stock=stockP, precio=precioP, idCategoria=@v2, idMarca=@v3
WHERE codigoProducto=idProducto;

UPDATE imagenproducto SET img1=image1, img2=image2, img3=image3 WHERE codigoProducto = idProducto;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeQR` (`codigo` VARCHAR(200), `idProducto` VARCHAR(50))  BEGIN
	UPDATE producto SET imagenQR=codigo WHERE codigoProducto=idProducto;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeStatusModel` (`idProducto` VARCHAR(200), `estado` INT(1))  BEGIN
	UPDATE producto SET modelo3D=estado WHERE codigoProducto=idProducto;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changeStatusUser` (`codigo` VARCHAR(200), `id` VARCHAR(50))  BEGIN
	UPDATE usuario SET statusUsuario=codigo WHERE usuario=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProduct` (`idProducto` VARCHAR(50))  BEGIN
UPDATE producto SET statusProducto=0 WHERE codigoProducto=idProducto;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllModel` (`tienda` VARCHAR(100))  BEGIN
SELECT COUNT(producto.modelo3D) FROM producto INNER JOIN tipousuarioproducto ON producto.codigoProducto = tipousuarioproducto.productos INNER JOIN usuario ON tipousuarioproducto.usuario = usuario.usuario WHERE usuario.nombreTienda = tienda;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllProducts` ()  BEGIN 
SELECT
	producto.codigoProducto, 
	producto.nombreProducto, 
	producto.descripcionProducto, 
	producto.precio, 
	producto.stock, 
	producto.statusProducto, 
	producto.imgPrincipal,
	categoria.categoria, 
	marca.nombreMarca, 
	usuario.nombreTienda
FROM
	producto
	INNER JOIN
	marca
	ON 
		producto.idMarca = marca.idMarca
	INNER JOIN
	categoria
	ON 
		producto.idCategoria = categoria.idCategoria
	INNER JOIN
	tipousuarioproducto
	ON 
		producto.codigoProducto = tipousuarioproducto.productos
	INNER JOIN
	usuario
	ON 
		tipousuarioproducto.usuario = usuario.usuario
WHERE
	producto.statusProducto = 1; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllProductsForCategory` (`categoria` VARCHAR(200))  BEGIN
SELECT p.codigoProducto, p.nombreProducto, p.descripcionProducto, p.stock,  p.precio, m.nombreMarca, c.categoria, p.statusProducto, u.nombreTienda, p.imgPrincipal
FROM tipousuarioproducto AS tp INNER JOIN producto AS p ON tp.productos = p.codigoProducto INNER JOIN marca AS m
ON p.idMarca = m.idMarca INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria INNER JOIN usuario AS u
ON tp.usuario = u.usuario WHERE c.categoria = categoria AND p.statusProducto=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllStores` ()  BEGIN
	SELECT
	usuario.usuario,
	usuario.nombreTienda, 
	usuario.logoTienda, 
	membresia.membresia
FROM
	usuario
	INNER JOIN
	membresia
	ON 
		usuario.idMembresia = membresia.idMembresia
		WHERE statusUsuario=1
		AND nombreTienda IS NOT NULL;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBrand` ()  BEGIN SELECT * FROM marca; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCategory` ()  BEGIN
SELECT * FROM categoria;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getInfoUser` (`idUser` VARCHAR(200))  BEGIN
SELECT
	usuario, 
	CONCAT(nombreUsuario, ' ', 
	apellidoUnoUsuario, ' ',
	apellidoDosUsuario) AS nombre, 
	emailUsuario, 
	telefonoUsuario, 
	nombreTienda, 
	logoTienda, 
	membresia
FROM
	usuario
	INNER JOIN
	membresia
	ON 
		usuario.idMembresia = membresia.idMembresia
		WHERE nombreTienda= idUser;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getModel` (`tienda` VARCHAR(100))  BEGIN
SELECT COUNT(producto.modelo3D) FROM producto INNER JOIN tipousuarioproducto ON producto.codigoProducto = tipousuarioproducto.productos INNER JOIN usuario ON tipousuarioproducto.usuario = usuario.usuario WHERE usuario.nombreTienda = tienda AND producto.modelo3D = 1;
SELECT COUNT(producto.modelo3D) FROM producto INNER JOIN tipousuarioproducto ON producto.codigoProducto = tipousuarioproducto.productos INNER JOIN usuario ON tipousuarioproducto.usuario = usuario.usuario WHERE usuario.nombreTienda = tienda;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getModelComplete` (`tienda` VARCHAR(100))  BEGIN
SELECT COUNT(producto.modelo3D) FROM producto INNER JOIN tipousuarioproducto ON producto.codigoProducto = tipousuarioproducto.productos INNER JOIN usuario ON tipousuarioproducto.usuario = usuario.usuario WHERE usuario.nombreTienda = tienda AND producto.modelo3D = 1;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductForCategory` (`tienda` VARCHAR(200), `categoria` VARCHAR(200))  BEGIN
SELECT p.codigoProducto, p.nombreProducto, p.descripcionProducto, p.stock,  p.precio, m.nombreMarca, c.categoria, p.statusProducto, u.nombreTienda, p.imgPrincipal
FROM tipousuarioproducto AS tp INNER JOIN producto AS p ON tp.productos = p.codigoProducto INNER JOIN marca AS m
ON p.idMarca = m.idMarca INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria INNER JOIN usuario AS u
ON tp.usuario = u.usuario WHERE u.nombreTienda = `tienda` AND c.categoria = `categoria` AND p.statusProducto=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductForId` (`tienda` VARCHAR(200), `id` VARCHAR(50))  BEGIN
	SELECT
	producto.nombreProducto, 
	producto.descripcionProducto, 
	producto.stock, 
	producto.imagenQR, 
	producto.precio, 
	marca.nombreMarca, 
	categoria.categoria,
  producto.imgPrincipal,	
	imagenproducto.img1, 
	imagenproducto.img2, 
	imagenproducto.img3, 
	usuario.nombreTienda, 
	usuario.emailUsuario, 
	usuario.telefonoUsuario
FROM
	usuario
	INNER JOIN
	tipousuarioproducto
	ON 
		usuario.usuario = tipousuarioproducto.usuario
	INNER JOIN
	producto
	ON 
		tipousuarioproducto.productos = producto.codigoProducto
	INNER JOIN
	imagenproducto
	ON 
		producto.codigoProducto = imagenproducto.codigoProducto
	INNER JOIN
	categoria
	ON 
		producto.idCategoria = categoria.idCategoria
	INNER JOIN
	marca
	ON 
		producto.idMarca = marca.idMarca
WHERE
	usuario.nombreTienda = tienda AND
	producto.codigoProducto = id AND
	producto.statusProducto=1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductsFromStore` (`nombreTienda` VARCHAR(100))  BEGIN
SELECT p.codigoProducto, p.nombreProducto, p.descripcionProducto, p.stock, p.imagenQR, p.precio, m.nombreMarca, c.categoria, p.statusProducto, u.nombreTienda, p.imgPrincipal, p.modelo3D
FROM tipousuarioproducto AS tp INNER JOIN producto AS p ON tp.productos = p.codigoProducto INNER JOIN marca AS m
ON p.idMarca = m.idMarca INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria INNER JOIN usuario AS u
ON tp.usuario = u.usuario WHERE u.nombreTienda = nombreTienda AND p.statusProducto = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getStores` ()  SELECT nombreTienda, logoTienda FROM usuario WHERE usuario.statusUsuario = 1 
AND usuario.nombreTienda IS NOT NULL;$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserDataSesion` (`correo` VARCHAR(200), `contrasena` VARCHAR(300))  BEGIN
	SELECT
usuario.usuario,
	usuario.emailUsuario, 
	rol.descripcionRol, 
	usuario.contrasenaUsuario,
	usuario.nombreUsuario,
	usuario.nombreTienda
FROM
	usuario
	INNER JOIN
	rol
	ON 
		usuario.idRol = rol.idRol
	WHERE
		usuario.emailUsuario = correo
	AND
		usuario.contrasenaUsuario = contrasena;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveAdmin` (`idU` VARCHAR(20), `nombreU` VARCHAR(50), `ap1` VARCHAR(50), `ap2` VARCHAR(50), `emailU` VARCHAR(100), `telefonoU` VARCHAR(13), `passU` VARCHAR(200))  BEGIN

SET @v1 :=(SELECT COUNT(usuario.usuario) FROM usuario WHERE nombreUsuario=nombreU AND apellidoDosUsuario=ap2 AND apellidoUnoUsuario=ap1 AND emailUsuario=emailU );

IF @v1 = 0 THEN
	INSERT INTO usuario(usuario, nombreUsuario, apellidoUnoUsuario, apellidoDosUsuario, emailUsuario, telefonoUsuario, contrasenaUsuario, statusUsuario, idRol, idMembresia, nombreTienda, logoTienda) 			VALUES ( idU, nombreU, ap1, ap2, emailU, telefonoU, passU,'1','1', null, null, null);
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveProduct` (`marcaMueble` VARCHAR(200), `categoriaMueble` VARCHAR(50), `idProducto` VARCHAR(20), `nombreP` VARCHAR(150), `descripcionP` VARCHAR(500), `stockP` INT(1), `precioP` FLOAT(6), `imgP` VARCHAR(400), `image1` VARCHAR(400), `image2` VARCHAR(400), `image3` VARCHAR(400), `nombreT` VARCHAR(200))  BEGIN
SET @v1 := (SELECT COUNT(idMarca) FROM marca WHERE nombreMarca=marcaMueble);
SET @v2 := (SELECT idCategoria FROM categoria WHERE categoria=categoriaMueble);

IF @v1 = 0 THEN
	INSERT INTO marca (nombreMarca) VALUES (marcaMueble);
END IF;

SET @v3 := (SELECT idMarca FROM marca WHERE nombreMarca=marcaMueble);
SET @v4 := (SELECT COUNT(nombreProducto) FROM producto WHERE nombreProducto=nombreP AND descripcionProducto=descripcionP);

IF @v4 = 0 THEN
INSERT INTO producto(codigoProducto, nombreProducto, descripcionProducto, imgPrincipal, stock, imagenQR, precio, idComentario, idCategoria, idMarca, modelo3D, statusProducto) VALUES (idProducto,nombreP, descripcionP, imgP, stockP, NULL, precioP, NULL , @v2, @v3, 0, 1);

SET @v5 := (SELECT codigoProducto FROM producto WHERE nombreProducto=nombreP AND descripcionProducto=descripcionP);

INSERT INTO imagenproducto(idImagen, img1, img2, img3, codigoProducto) VALUES (DEFAULT,image1,image2,image3, @v5);

SET @v6 := (SELECT usuario FROM usuario WHERE nombreTienda=nombreT);
INSERT INTO tipousuarioproducto(idtipoUsuariosProducto, usuario, productos, tipo) VALUES (DEFAULT, @v6, @v5, 1);

END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveUser` (`idU` VARCHAR(20), `nombreU` VARCHAR(50), `ap1` VARCHAR(50), `ap2` VARCHAR(50), `emailU` VARCHAR(100), `telefonoU` VARCHAR(13), `passU` VARCHAR(200), `tiendaU` VARCHAR(200))  BEGIN

SET @v1 :=(SELECT COUNT(usuario.usuario) FROM usuario WHERE nombreUsuario=nombreU AND apellidoUnoUsuario=ap1 AND apellidoDosUsuario=ap2 AND emailUsuario=emailU  AND nombreTienda=tiendaU);

IF @v1 = 0 THEN
	INSERT INTO usuario(usuario, nombreUsuario, apellidoUnoUsuario, apellidoDosUsuario, emailUsuario, telefonoUsuario, contrasenaUsuario, statusUsuario, idRol, idMembresia, nombreTienda, logoTienda) 			VALUES ( idU, nombreU, ap1, ap2, emailU, telefonoU, passU,'1','2','1', tiendaU, null);
END IF;

	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `validateData` (`campo` VARCHAR(100), `eval` VARCHAR(100))  BEGIN
IF campo = 1 THEN
	SELECT emailUsuario FROM usuario WHERE emailUsuario = eval;
END IF;

IF campo = 2 THEN
	SELECT nombreTienda FROM usuario WHERE nombreTienda = eval;
END IF;

IF campo = 3 THEN
	SELECT telefonoUsuario FROM usuario WHERE telefonoUsuario = eval;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `_Navicat_Temp_Stored_Proc` ()  SELECT nombreTienda, logoTienda FROM usuario WHERE usuario.statusUsuario = 1 
AND usuario.nombreTienda IS NOT NULL;$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(5) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `categoria`) VALUES
(1, 'Sala'),
(2, 'Comedor'),
(3, 'Cocina'),
(4, 'Habitacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `idComentario` int(11) NOT NULL,
  `descripcionComentario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenproducto`
--

CREATE TABLE `imagenproducto` (
  `idImagen` int(5) NOT NULL,
  `img1` varchar(400) DEFAULT NULL,
  `img2` varchar(400) DEFAULT NULL,
  `img3` varchar(400) DEFAULT NULL,
  `codigoProducto` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenproducto`
--

INSERT INTO `imagenproducto` (`idImagen`, `img1`, `img2`, `img3`, `codigoProducto`) VALUES
(1, 'images/preview.png', 'images/preview.png', 'images/preview.png', '1'),
(2, 'images/preview.png', 'images/preview.png', 'images/preview.png', '2'),
(3, 'images/preview.png', 'images/preview.png', 'images/preview.png', '3'),
(4, 'images/preview.png', 'images/preview.png', 'images/preview.png', '4'),
(5, 'images/preview.png', 'images/preview.png', 'images/preview.png', 'camaGar'),
(7, 'images/MuebleriaGarcia/Mesadebillar51+XEduWIGS._AC_SX466_.jpg', 'images/MuebleriaGarcia/Mesadebillar51+XEduWIGS._AC_SX466_.jpg', 'images/MuebleriaGarcia/Mesadebillarpexels-darina-belonogova-8788748.jpg', 'Meslar3502'),
(8, 'images/MuebleriaGarcia/MesadeEstar51+XEduWIGS._AC_SX466_.jpg', 'images/preview.png', 'images/preview.png', 'Mestar5610'),
(9, 'images/preview.png', 'images/preview.png', 'images/preview.png', 'Silebe6330'),
(10, 'images/MuebleriaGarcia/sdfsdf/img22.png', 'images/MuebleriaGarcia/sdfsdf/img3e.png', 'images/MuebleriaGarcia/sdfsdf/img4).png', 'sdfsdf6725'),
(11, 'images/MuebleriaGarcia/SillonCamaGrandeCapturadepantallade2021-12-3019-07-02.png', 'images/MuebleriaGarcia/SillonCamaGrandeCapturadepantallade2021-12-0319-59-49.png', 'images/MuebleriaGarcia/SillonCamaGrandeCapturadepantallade2021-12-1623-18-51.png', 'Silnde4794'),
(12, 'images/Muebleria Daniel/SillonCamaPruebaкрісло.jpeg', 'images/Muebleria Daniel/SillonCamaPruebaMueblemetálico.jpeg', 'images/Muebleria Daniel/SillonCamaPrueba_.jpeg', 'Sileba6747'),
(13, 'images/Muebleria Daniel/SillonPruebapruebauhdpaper.com-890e-pc-4k.jpg', 'images/Muebleria Daniel/SillonPruebapruebaimg2.jpeg', 'images/Muebleria Daniel/SillonPruebapruebaimg1.jpeg', 'Sileba3044'),
(14, 'images/crediMuebles/SillonCamaimg1.jpeg', 'images/crediMuebles/SillonCamaimg3.jpeg', 'images/crediMuebles/SillonCamapexels-huseyn-kamaladdin-667838.jpg', 'Silama7958'),
(15, 'images/Y3JlZGlNdWVibGVz/SilladeEscitorio51+XEduWIGS._AC_SX466_.jpg', 'images/Y3JlZGlNdWVibGVz/SilladeEscitoriopexels-huseyn-kamaladdin-667838.jpg', 'images/Y3JlZGlNdWVibGVz/SilladeEscitorioimg1.jpeg', 'Silrio8302'),
(16, 'images/crediMuebles/Alacenaimg1.jpeg', 'images/crediMuebles/Alacenaimg2.jpeg', 'images/crediMuebles/Alacenapexels-darina-belonogova-8788748.jpg', 'Alaena3783');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacionusuario`
--

CREATE TABLE `informacionusuario` (
  `claveUsuario` varchar(150) NOT NULL,
  `nombreUsuario` varchar(150) NOT NULL,
  `apellidoUnoUsuario` varchar(150) NOT NULL,
  `apellidoDosUsuario` varchar(150) NOT NULL,
  `noTelefonico` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `usuario` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `idMarca` int(5) NOT NULL,
  `nombreMarca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`idMarca`, `nombreMarca`) VALUES
(1, 'Ton'),
(2, 'Alki'),
(3, 'artex'),
(6, 'FramSan'),
(7, 'Razer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `membresia`
--

CREATE TABLE `membresia` (
  `idMembresia` int(5) NOT NULL,
  `membresia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `membresia`
--

INSERT INTO `membresia` (`idMembresia`, `membresia`) VALUES
(1, 'FREE'),
(2, 'PREMIUM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idPermiso` int(11) NOT NULL,
  `descripcionPermiso` varchar(150) NOT NULL,
  `statusPermiso` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`idPermiso`, `descripcionPermiso`, `statusPermiso`) VALUES
(1, 'Editar', '1'),
(2, 'Eliminar', '1'),
(3, 'Agregar', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigoProducto` varchar(20) NOT NULL,
  `nombreProducto` varchar(150) NOT NULL,
  `descripcionProducto` varchar(500) NOT NULL,
  `imgPrincipal` varchar(400) DEFAULT NULL,
  `stock` int(5) NOT NULL,
  `imagenQR` varchar(200) DEFAULT NULL,
  `precio` float NOT NULL,
  `idComentario` int(11) DEFAULT NULL,
  `idCategoria` int(5) NOT NULL,
  `idMarca` int(5) NOT NULL,
  `modelo3D` int(1) NOT NULL,
  `statusProducto` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`codigoProducto`, `nombreProducto`, `descripcionProducto`, `imgPrincipal`, `stock`, `imagenQR`, `precio`, `idComentario`, `idCategoria`, `idMarca`, `modelo3D`, `statusProducto`) VALUES
('1', 'Silla Caoba', 'Siila con acabados elegantes de madera caoba', 'images/preview.png', 12, NULL, 1234, NULL, 1, 1, 1, 0),
('2', 'Mesa Amplia', 'Mesa para comedor', 'images/preview.png', 3, NULL, 4321, NULL, 2, 2, 1, 1),
('3', 'Sillon Cama', 'Sillon para cuatro personas convertible en cama', 'images/preview.png', 4, 'images/MuebleriaGarcia/SillonCamaQRCode(2).png', 4365, NULL, 1, 3, 0, 1),
('4', 'Cama Matrimonial', 'Cama tamanio matrimonial, incluye colchon y box', 'images/preview.png', 5, NULL, 6567, NULL, 4, 3, 0, 1),
('Alaena3783', 'Alacena', 'sdfsdfdsf', 'images/crediMuebles/Alacenaspiderman-miles-morales-peter-parker-uhdpaper.com-4K-8.1921.jpg', 1234, NULL, 12345, NULL, 1, 1, 0, 1),
('camaGar', 'Cama Matrimonial', 'Cama Matrimonial Con base de madera', 'images/preview.png', 1234, NULL, 5432, NULL, 4, 1, 1, 1),
('Meslar3502', 'Mesa de billar', 'Mesa de billar grande de dimenciones x*x', 'images/MuebleriaGarcia/Mesadebillarpexels-huseyn-kamaladdin-667838.jpg', 324, 'images/MuebleriaGarcia/MesadebillarQRCode.png', 23423, NULL, 1, 1, 1, 1),
('Mestar5610', 'Mesa de Estar', 'asdasddsfsdf', 'images/MuebleriaGarcia/MesadeEstarpexels-huseyn-kamaladdin-667838.jpg', 324, NULL, 23423, NULL, 2, 1, 0, 1),
('sdfsdf6725', 'sdfsdf', 'sdfsfsdf', 'images/preview.png', 345345, NULL, 435345, NULL, 2, 1, 0, 1),
('Silama7958', 'Sillon Cama', 'cvzdcsczsdczxc', 'images/crediMuebles/SillonCamaimg2.jpeg', 1234, NULL, 12345, NULL, 1, 3, 0, 1),
('Sileba3044', 'Sillon Prueba prueba', 'Prueba producto prueba', 'images/Muebleria Daniel/SillonPruebapruebawallpapersden.com_the-neon-triangles_2320x1480.jpg', 42, NULL, 58, NULL, 1, 1, 0, 1),
('Sileba6747', 'Sillon Cama Prueba', 'Sillon cama articulo de prueba de edicion de producto y borrado de imagenes', 'images/Muebleria Daniel/SillonCamaPrueba罗汉床.jpeg', 24, NULL, 15, NULL, 1, 3, 0, 1),
('Silebe6330', 'Silla para bebe', 'asdasddsfsdf', 'images/preview.png', 324, NULL, 23423, NULL, 2, 1, 0, 1),
('Silnde4794', 'Sillon Cama Grande', 'dsdsdfsdfsdfsdfsd', 'images/preview.png', 2323, NULL, 23423, NULL, 1, 1, 1, 1),
('Silrio8302', 'Silla de Escitorio', 'Silla gamer lista para usarse', 'images/Y3JlZGlNdWVibGVz/SilladeEscitoriodescarga.jpeg', 123, NULL, 4324, NULL, 1, 1, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `descripcionRol` varchar(150) NOT NULL,
  `statusRol` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `descripcionRol`, `statusRol`) VALUES
(1, 'admin', '1'),
(2, 'user', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolpermiso`
--

CREATE TABLE `rolpermiso` (
  `idRolPermiso` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idPermiso` int(11) NOT NULL,
  `statusRolPermiso` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rolpermiso`
--

INSERT INTO `rolpermiso` (`idRolPermiso`, `idRol`, `idPermiso`, `statusRolPermiso`) VALUES
(1, 1, 1, '1'),
(2, 1, 2, '1'),
(3, 1, 3, '1'),
(4, 2, 1, '1'),
(5, 2, 2, '1'),
(6, 2, 3, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuarioproducto`
--

CREATE TABLE `tipousuarioproducto` (
  `idtipoUsuariosProducto` int(11) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `productos` varchar(20) NOT NULL,
  `tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipousuarioproducto`
--

INSERT INTO `tipousuarioproducto` (`idtipoUsuariosProducto`, `usuario`, `productos`, `tipo`) VALUES
(1, '1', '1', '1'),
(2, '2', '2', '1'),
(3, '1', '3', '1'),
(4, '1', '4', '1'),
(5, '1', 'camaGar', '1'),
(7, '1', 'Meslar3502', '1'),
(8, '1', 'Mestar5610', '1'),
(9, '1', 'Silebe6330', '1'),
(10, '1', 'sdfsdf6725', '1'),
(11, '1', 'Silnde4794', '1'),
(12, 'DaNu123', 'Sileba6747', '1'),
(13, 'DaNu123', 'Sileba3044', '1'),
(14, 'AlSa8932el', 'Silama7958', '1'),
(15, 'AlSa8932el', 'Alaena3783', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(250) NOT NULL,
  `nombreUsuario` varchar(150) NOT NULL,
  `apellidoUnoUsuario` varchar(150) NOT NULL,
  `apellidoDosUsuario` varchar(150) NOT NULL,
  `emailUsuario` varchar(150) NOT NULL,
  `telefonoUsuario` varchar(20) NOT NULL,
  `contrasenaUsuario` varchar(1000) NOT NULL,
  `statusUsuario` varchar(1) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idMembresia` int(5) DEFAULT NULL,
  `nombreTienda` varchar(120) DEFAULT NULL,
  `logoTienda` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `nombreUsuario`, `apellidoUnoUsuario`, `apellidoDosUsuario`, `emailUsuario`, `telefonoUsuario`, `contrasenaUsuario`, `statusUsuario`, `idRol`, `idMembresia`, `nombreTienda`, `logoTienda`) VALUES
('1', 'Felix', 'Garcia', 'Suarez', 'felix@email.com', '5554321232', '5e8667a439c68f5145dd2fcbecf02209', '1', 2, 2, 'MuebleriaGarcia', ''),
('2', 'Alexander', 'Nieto', 'Hernandez', 'hdzAl@email.com', '5567876543', '654321', '1', 2, 2, 'MuebleriaHernandez', 'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
('3', 'Alan', 'Garcia', 'Santilla', 'alan@email.com', '5543456789', '5e8667a439c68f5145dd2fcbecf02209', '1', 1, NULL, NULL, NULL),
('AlSa8932el', 'Alan Daniel', 'Santiago', 'Nunez', 'danielnun9719@gmail.com', '5512789804', '5e8667a439c68f5145dd2fcbecf02209', '1', 2, 1, 'crediMuebles', 'images/crediMuebles/Profilezenitsu-lightning-demon-slayer-uhdpaper.com-4K-8.2019.jpg'),
('CaNo4455os', 'Carlos', 'Novo', 'Hernan', 'carlos@email.com', '556787980912', '6ebe76c9fb411be97b3b0d48b791a7c9', '1', 1, NULL, NULL, NULL),
('ClaGar2343', 'Claudia', 'Castillo', 'Hernan', 'clau@email.com', '561234325645', '87654321', '1', 1, NULL, NULL, NULL),
('DaNu123', 'Daniel', 'Nunez', 'Santiago', 'daniel@email.com', '5543567890', '5e8667a439c68f5145dd2fcbecf02209', '1', 2, 1, 'Muebleria Daniel', NULL),
('DaNu323', 'Danns', 'Garcia', 'Castillo', 'castillo@email.com', '5545678909', 'wewewe', '1', 2, 1, NULL, NULL),
('FaMa6414ma', 'Fatima', 'Martinez', 'Sanchez', 'fatima@email.com', '5523456787', '25d55ad283aa400af464c76d713c07ad', '1', 2, 1, 'Muebles Fatilu', NULL),
('HaNa2547el', 'Hazael', 'Navarrete', 'Nunez', 'hazael@email.com', '5545678976', '25f9e794323b453885f5181f1b624d0b', '1', 2, 1, 'Pinturas el Carrazo', NULL),
('MaGa7249ry', 'Mary', 'Garcia', 'Aldana', 'mary@email.com', '5567879889', '25f9e794323b453885f5181f1b624d0b', '1', 2, 1, 'Pinturas Mari', NULL),
('RaGo4950ul', 'Raul', 'Gonzales', 'Martino', 'raul@email.com', '5545678976', '8f18e17d33a2153520e48093d71dd76f', '1', 1, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`idComentario`);

--
-- Indices de la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  ADD PRIMARY KEY (`idImagen`),
  ADD KEY `fk_producto` (`codigoProducto`);

--
-- Indices de la tabla `informacionusuario`
--
ALTER TABLE `informacionusuario`
  ADD PRIMARY KEY (`claveUsuario`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`idMarca`);

--
-- Indices de la tabla `membresia`
--
ALTER TABLE `membresia`
  ADD PRIMARY KEY (`idMembresia`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`idPermiso`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigoProducto`),
  ADD KEY `producto_idComentario_idx` (`idComentario`),
  ADD KEY `fk_idMarca` (`idMarca`),
  ADD KEY `fk_idCategoria` (`idCategoria`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `rolpermiso`
--
ALTER TABLE `rolpermiso`
  ADD PRIMARY KEY (`idRolPermiso`),
  ADD KEY `rolpermiso_idrol_idx` (`idRol`),
  ADD KEY `rolpermiso_idpermiso_idx` (`idPermiso`);

--
-- Indices de la tabla `tipousuarioproducto`
--
ALTER TABLE `tipousuarioproducto`
  ADD PRIMARY KEY (`idtipoUsuariosProducto`),
  ADD KEY `tipo_codigoProducto_idx` (`productos`),
  ADD KEY `tipo_usuario_idx` (`usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `usuario_idRol_idx` (`idRol`),
  ADD KEY `fk_idMembresia` (`idMembresia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  MODIFY `idImagen` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `idMarca` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `membresia`
--
ALTER TABLE `membresia`
  MODIFY `idMembresia` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipousuarioproducto`
--
ALTER TABLE `tipousuarioproducto`
  MODIFY `idtipoUsuariosProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenproducto`
--
ALTER TABLE `imagenproducto`
  ADD CONSTRAINT `fk_producto` FOREIGN KEY (`codigoProducto`) REFERENCES `producto` (`codigoProducto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_idCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `fk_idMarca` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`),
  ADD CONSTRAINT `producto_idComentario` FOREIGN KEY (`idComentario`) REFERENCES `comentario` (`idComentario`);

--
-- Filtros para la tabla `rolpermiso`
--
ALTER TABLE `rolpermiso`
  ADD CONSTRAINT `rolpermiso_idpermiso` FOREIGN KEY (`idPermiso`) REFERENCES `permiso` (`idPermiso`),
  ADD CONSTRAINT `rolpermiso_idrol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);

--
-- Filtros para la tabla `tipousuarioproducto`
--
ALTER TABLE `tipousuarioproducto`
  ADD CONSTRAINT `tipo_codigoProducto` FOREIGN KEY (`productos`) REFERENCES `producto` (`codigoProducto`),
  ADD CONSTRAINT `tipo_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_idMembresia` FOREIGN KEY (`idMembresia`) REFERENCES `membresia` (`idMembresia`),
  ADD CONSTRAINT `usuario_idRol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

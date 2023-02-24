CREATE DATABASE  IF NOT EXISTS `novatec_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `novatec_app`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: novatec_app
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archivo`
--

DROP TABLE IF EXISTS `archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivo` (
  `idArchivo` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `url` longtext NOT NULL,
  `extencion` varchar(10) NOT NULL,
  PRIMARY KEY (`idArchivo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo`
--

LOCK TABLES `archivo` WRITE;
/*!40000 ALTER TABLE `archivo` DISABLE KEYS */;
INSERT INTO `archivo` VALUES (1,'img-curso.jfif','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%20%2Fimagen%2Fimg-curso.jfif?alt=media&token=331c1d3a-9a09-459f-9159-4447161e4b4b','image/jpeg'),(2,'prueba1.mp4','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%20%2Fvideo%2Fprueba1.mp4?alt=media&token=fb989715-b59a-4e7b-9918-0f44d69e315e','video/mp4'),(4,'prueba1.mp4','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%20%2Flecciones%2FLecci%C3%B3n%201%20-%20XD%2Fvideo%2Fprueba1.mp4?alt=media&token=305fd1cb-7b77-42ee-8a80-1af3fe54491d','video/mp4'),(6,'prueba2.jfif','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FCurso%20%2Flecciones%2FLecci%C3%B3n%201%20-%20XD%2Farchivos%2Fprueba2.jfif?alt=media&token=44dac179-f462-46c7-aa40-952b2b3590cd','image/jpeg'),(7,'Captura web_21-2-2023_123934_localhost.jpeg','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/cursos%2FLiderazgo%20en%20la%20vida%20diaria%2Flecciones%2FLecci%C3%B3n%201%20-%20XD%2Farchivos%2FCaptura%20web_21-2-2023_123934_localhost.jpeg?alt=media&token=3ec2deb5-682b-4fd0-8415-4649bdb217bd','image/jpeg');
/*!40000 ALTER TABLE `archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `idCalificacion` int NOT NULL AUTO_INCREMENT,
  `idCuestionario` int NOT NULL,
  `calificacion` int NOT NULL,
  PRIMARY KEY (`idCalificacion`),
  KEY `idCuestionario` (`idCuestionario`),
  CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`idCuestionario`) REFERENCES `cuestionario` (`idCuestionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificacion`
--

DROP TABLE IF EXISTS `certificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificacion` (
  `idCertificacion` int NOT NULL AUTO_INCREMENT,
  `idCurso` int NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idCertificacion`),
  KEY `idCurso` (`idCurso`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `certificacion_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`),
  CONSTRAINT `certificacion_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificacion`
--

LOCK TABLES `certificacion` WRITE;
/*!40000 ALTER TABLE `certificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_curso`
--

DROP TABLE IF EXISTS `cliente_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_curso` (
  `idRelacion` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `idCurso` int NOT NULL,
  `ultimaConexion` varchar(10) NOT NULL,
  `finalizado` tinyint NOT NULL DEFAULT (0),
  `fechaFinalizacionCurso` varchar(10) NOT NULL,
  `codigoAutorizacion` text,
  `autorizado` tinyint NOT NULL DEFAULT (0),
  PRIMARY KEY (`idRelacion`),
  KEY `idCliente` (`idCliente`),
  KEY `idCurso` (`idCurso`),
  CONSTRAINT `cliente_curso_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `cliente_curso_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_curso`
--

LOCK TABLES `cliente_curso` WRITE;
/*!40000 ALTER TABLE `cliente_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `fechaCompra` varchar(10) NOT NULL,
  `totalCompra` decimal(15,2) DEFAULT NULL,
  `estatus` int NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuestionario`
--

DROP TABLE IF EXISTS `cuestionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuestionario` (
  `idCuestionario` int NOT NULL AUTO_INCREMENT,
  `idLeccion` int DEFAULT NULL,
  `nombre` text,
  PRIMARY KEY (`idCuestionario`),
  KEY `idLeccion` (`idLeccion`),
  CONSTRAINT `cuestionario_ibfk_1` FOREIGN KEY (`idLeccion`) REFERENCES `leccion` (`idLeccion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuestionario`
--

LOCK TABLES `cuestionario` WRITE;
/*!40000 ALTER TABLE `cuestionario` DISABLE KEYS */;
INSERT INTO `cuestionario` VALUES (1,1,'Cuestionario de la autoestima');
/*!40000 ALTER TABLE `cuestionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `objetivos` text NOT NULL,
  `descripcion` longtext NOT NULL,
  `precio` decimal(15,2) NOT NULL,
  `duracion` int NOT NULL,
  `idVideo` int DEFAULT NULL,
  `idMiniatura` int DEFAULT NULL,
  `estatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Liderazgo','Convertirte en el líder a tu alrededor, capaz de tomar daciones y resolver problemas de la mejor manera posible.','Dentro del curso se verán conceptos diversos como la autoestima, la comunicación asertiva, tipos de comunicación no verbal y como emplearla, toma de decisiones y aspectos importantes sobre la empatía. Por otro lado, se verán diversas prácticas que puedes realizar en cualquier parte para desarrollar cada una de las habilidades que te darán la seguridad para mejorar cada día.',1345.00,35,2,1,1),(2,'Curso #2','Objetivo del 2do curso','Descripción del 2do curso',1500.00,45,0,0,1);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `idDetalleCompra` int NOT NULL AUTO_INCREMENT,
  `idCompra` int NOT NULL,
  `idCurso` int NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  PRIMARY KEY (`idDetalleCompra`),
  KEY `idCompra` (`idCompra`),
  KEY `idCurso` (`idCurso`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`),
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leccion`
--

DROP TABLE IF EXISTS `leccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leccion` (
  `idLeccion` int NOT NULL AUTO_INCREMENT,
  `idCurso` int DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `informacion` longtext,
  `idVideo` int DEFAULT NULL,
  `estatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idLeccion`),
  KEY `idCurso` (`idCurso`),
  CONSTRAINT `leccion_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leccion`
--

LOCK TABLES `leccion` WRITE;
/*!40000 ALTER TABLE `leccion` DISABLE KEYS */;
INSERT INTO `leccion` VALUES (1,1,'Autoestima','La autoestima es el concepto que hace referencia al amor hacia una misma; tiene que ver con la manera que tenemos de relacionarnos con nosotras mismas, de tratarnos y, en definitiva, de valorarnos. Incluye todo tipo de creencias, comportamientos y actitudes hacia nosotras mismas.',4,1),(2,1,'Comunicación asertiva','Llamamos comunicación asertiva a las formas de comunicación diseñadas o pensadas para transmitir de manera mucho más eficaz un mensaje, sacando provecho a factores propios del proceso comunicativo y a otros que, aun siendo externos al mismo, lo acompañan e inciden en su eficacia.',2,1);
/*!40000 ALTER TABLE `leccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leccion_archivo`
--

DROP TABLE IF EXISTS `leccion_archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leccion_archivo` (
  `idRelacion` int NOT NULL AUTO_INCREMENT,
  `idLeccion` int DEFAULT NULL,
  `idArchivo` int DEFAULT NULL,
  PRIMARY KEY (`idRelacion`),
  KEY `idArchivo` (`idArchivo`),
  KEY `idLeccion` (`idLeccion`),
  CONSTRAINT `leccion_archivo_ibfk_1` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`),
  CONSTRAINT `leccion_archivo_ibfk_2` FOREIGN KEY (`idLeccion`) REFERENCES `leccion` (`idLeccion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leccion_archivo`
--

LOCK TABLES `leccion_archivo` WRITE;
/*!40000 ALTER TABLE `leccion_archivo` DISABLE KEYS */;
INSERT INTO `leccion_archivo` VALUES (2,1,6),(3,1,7);
/*!40000 ALTER TABLE `leccion_archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idPregunta` int NOT NULL AUTO_INCREMENT,
  `idCuestionario` int DEFAULT NULL,
  `enunciado` text NOT NULL,
  `respuesta_correcta` text NOT NULL,
  `respuesta1` text NOT NULL,
  `respuesta2` text NOT NULL,
  `respuesta3` text NOT NULL,
  `respuesta4` text NOT NULL,
  PRIMARY KEY (`idPregunta`),
  KEY `idCuestionario` (`idCuestionario`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`idCuestionario`) REFERENCES `cuestionario` (`idCuestionario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,1,'¿Puede la autoestima variar con el tiempo? y ¿porque?','Si, porque estamos en constante cambio','Si, porque está ligado al clima','Si, porque estamos en constante cambio','No, porque siempre se mantiene igual','No, porque nadie cambia con el tiempo'),(3,1,'¿Cuál de los siguientes factores no influyen en la autoestima?','Un libro sobre las nueces','Bajo nivel socioeconómico','El desempleo','Vivir solo (sin pareja)','Un libro sobre las nueces'),(4,1,'¿Cuál de las siguientes afirmaciones no ayuda a mejorar la autoestima?','No enfrentarte a tus miedos.','Identifica tus miedos, tus errores y haz frente a ellos.','No enfrentarte a tus miedos.','Aprende a decir NO, a expresar tus opiniones y tus deseos sin miedo, siempre desde un lenguaje claro y sin ofender a la otra persona con la que hablas.','No te tomes tan a pecho los comentarios negativos de personas que no te conocen al fin y al cabo no te conocen y no saben quién eres.');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'cliente','operaciones basicas (lectura)'),(2,'staff','operaciones principales (lectura, escritura)'),(3,'administrador','operaciones avanzadas (lectura, escritura, actualización)');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `primerApellido` varchar(100) NOT NULL,
  `segundoApellido` varchar(100) DEFAULT NULL,
  `ultimoGradoEstudio` varchar(150) DEFAULT NULL,
  `fechaNac` varchar(10) NOT NULL,
  `genero` varchar(6) NOT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `imagen` text,
  `correo` varchar(150) NOT NULL,
  `contrasenia` text NOT NULL,
  `estatus` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Eduardo Rubén','Solís','Hernández','Técnico Superior Universitario','2000-01-09','Hombre','SOHE000109HNLLRDA0','8113474548','','solis@correo.com','$2a$10$LbU2NTkcQL7u9xCeuYeya.n6PeZ60fgUGFohy9e7J1gkicZLCPwGy',1),(3,'Pedro','Hernandez','Tienda','Primaria','25-06-2009','Hombre','','4772651023','','pedro@correo.com','$2a$10$zysVbsnijwdVcUACU1qwFeUGDTjaMyx0vYiSFqK7FJl9yF20fnfIm',1),(5,'Uriel Zadkiel','Solís','Hernández','Preparatoria','29-04-2004','Hombre','SOHU040429HNLLRRA5','8113474546','','uriel@correo.com','$2a$10$zIPPB491hDv2LBR9RYtNYOCEZUGWc8F2Ek581m.Ao9nuCBbN.8bxC',1),(6,'Sandra Nohemi','Solis','Hernandez','Licenciatura','2001-11-10','Mujer','','4776081111',NULL,'sandra@correo.com','$2a$10$h3oYWCvIpc/OhxGsjxazU.R7r1HRUeczTnq1VdeD9w37jFwOyOw1m',1),(7,'Pepe','Pepo','Nohemi','Preescolar','2023-03-10','Hombre','','4776081111',NULL,'pepe@correo.com','$2a$10$mZFlU1P9mdfEjfIuPHyffOKhj9GVCYd1e/1Lg0Sd2ErFyTQVuV0I.',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `idRelacion` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idRol` int NOT NULL,
  PRIMARY KEY (`idRelacion`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idRol` (`idRol`),
  CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (1,1,3),(2,1,2),(13,3,2),(14,3,1),(15,5,1),(16,6,2),(17,7,1);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 20:23:36

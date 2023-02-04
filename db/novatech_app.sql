CREATE DATABASE  IF NOT EXISTS `novatec_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `novatec_app`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: novatec_app
-- ------------------------------------------------------
-- Server version	8.0.29

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo`
--

LOCK TABLES `archivo` WRITE;
/*!40000 ALTER TABLE `archivo` DISABLE KEYS */;
INSERT INTO `archivo` VALUES (1,'video-curso.mp4','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/video%2Fvideo-curso.mp4?alt=media&token=47ee0f6d-59e3-4aad-9a71-1989e7b11d1b','video/mp4'),(2,'pexels-karolina-grabowska-4491461.jpg','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/imagen%2Fpexels-karolina-grabowska-4491461.jpg?alt=media&token=afc018fa-0e87-422a-a6eb-d69ecce53aeb','image/jpeg'),(3,'video_test.mp4','https://firebasestorage.googleapis.com/v0/b/test-firebase-react-19c01.appspot.com/o/video%2Fvideo_test.mp4?alt=media&token=9603179e-b4d8-4326-8cb7-223527e82b88','video/mp4');
/*!40000 ALTER TABLE `archivo` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuestionario`
--

LOCK TABLES `cuestionario` WRITE;
/*!40000 ALTER TABLE `cuestionario` DISABLE KEYS */;
INSERT INTO `cuestionario` VALUES (1,1,'Cuestionario de la lección #1'),(2,2,'Cuestionario 2'),(3,3,'Cuestionario de la leccion 3'),(4,4,'Cuestionario 4');
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
  `estatus` tinyint(1) NOT NULL DEFAULT (true),
  PRIMARY KEY (`idCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (20,'Curso 1','Objetivo del primer curso','Descripción del primer curso',1500.00,45,1,2,1);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
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
  `estatus` tinyint(1) NOT NULL DEFAULT (true),
  PRIMARY KEY (`idLeccion`),
  KEY `idCurso` (`idCurso`),
  CONSTRAINT `leccion_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leccion`
--

LOCK TABLES `leccion` WRITE;
/*!40000 ALTER TABLE `leccion` DISABLE KEYS */;
INSERT INTO `leccion` VALUES (1,20,'Lección #1','Información de la Lección 1',3,1),(2,20,'Lección 2','Información de la Lección 2',0,1),(3,20,'Lección 3','Información de la Lección 3',0,1),(4,20,'Lección 4','Información de la Lección 4',0,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leccion_archivo`
--

LOCK TABLES `leccion_archivo` WRITE;
/*!40000 ALTER TABLE `leccion_archivo` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,1,'¿Cuanto es 2 + 2?','4','1','2','3','4');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'novatec_app'
--

--
-- Dumping routines for database 'novatec_app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 22:05:24

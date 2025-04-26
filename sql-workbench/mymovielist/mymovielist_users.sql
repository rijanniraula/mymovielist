-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mymovielist
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(257) NOT NULL,
  `email` varchar(257) NOT NULL,
  `role` varchar(45) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$12$QxXf04jD2R3SpYyBd1RU0esmsKg0LJA76MoLjFBm3/60JOFojNo9.','rijanniraula05@gmail.com','admin',NULL),(3,NULL,'$2b$10$DyZXxODI4LOJsv/LLKc2Wuoq5g0qTz1zpG2WYVy2fPFyjYdUrYQV6','rijan@rijan.com','user','Rijan Niraula'),(8,NULL,'$2b$10$G8kOOLF2gmvVGY0hDFvqVuKd44BDuEpfxdnyOY8Nj.84frj1Dr0KC','bastolakuldeep@gmail.com','user','Kuldip Bastola'),(9,NULL,'$2b$10$ZVfMYjyaSm/MLtaCf0I2PezT/LcPGbkCH3jFvFq4uIwg0ulS/5uN6','rijanniraula@gmail.com','user','Rijan Niraula'),(10,NULL,'$2b$10$.0cOa2WwoncWPQwXO3GRmO7g3jkjdl/zaVoxT88WpYYV1RhpIMDyO','drona@gmail.com','user','Drona Khadka'),(11,NULL,'$2b$10$cbaZ7CFl8KgRBaMeRNknn.ZSGXsoSYO8vR0wAYkhAwkAqwNzb2/vG','karanbastola1@gmail.com','user','Karan Bastola'),(12,NULL,'$2b$10$CAWEmr.spBaGNPSXJzIW0OwryfwHrD6mfofGTID.YWRLvVG7SPz3K','utsavjr22@gmail.com','user','Utsav Rayamajhi'),(13,NULL,'$2b$10$2LDzLLqxCHSCbnWnPFf7t.CTLM2CEZkg6uE9tNPyO9863BVXoV2aS','rijan123@gmail.com','user','RIjan');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-26 18:52:52

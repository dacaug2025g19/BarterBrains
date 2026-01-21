-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: p_19_barterbrains
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `booked_session`
--

DROP TABLE IF EXISTS `booked_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booked_session` (
  `bsid` int NOT NULL AUTO_INCREMENT,
  `seid` int NOT NULL,
  `learner_uid` int NOT NULL,
  `teacher_confirm` enum('yes','no') NOT NULL,
  `learner_confirm` enum('yes','no') NOT NULL,
  `booking_date` date NOT NULL,
  `feedback` varchar(255) NOT NULL,
  PRIMARY KEY (`bsid`),
  KEY `learner_uid_idx` (`learner_uid`),
  KEY `seid_idx` (`seid`),
  CONSTRAINT `learner_uid` FOREIGN KEY (`learner_uid`) REFERENCES `user_table` (`uid`),
  CONSTRAINT `seid` FOREIGN KEY (`seid`) REFERENCES `session_table` (`seid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booked_session`
--

LOCK TABLES `booked_session` WRITE;
/*!40000 ALTER TABLE `booked_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `booked_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_table`
--

DROP TABLE IF EXISTS `category_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_table` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(45) NOT NULL,
  `cdesc` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_table`
--

LOCK TABLES `category_table` WRITE;
/*!40000 ALTER TABLE `category_table` DISABLE KEYS */;
INSERT INTO `category_table` VALUES (1,'Technology','some tech skills');
/*!40000 ALTER TABLE `category_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point_transaction`
--

DROP TABLE IF EXISTS `point_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point_transaction` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `type` enum('teacher','learner') DEFAULT NULL,
  `seid` int DEFAULT NULL,
  `bsid` int DEFAULT NULL,
  `points` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `seid_idx` (`seid`),
  KEY `bsid_idx` (`bsid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `bsid` FOREIGN KEY (`bsid`) REFERENCES `booked_session` (`bsid`),
  CONSTRAINT `sed` FOREIGN KEY (`seid`) REFERENCES `session_table` (`seid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user_table` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_transaction`
--

LOCK TABLES `point_transaction` WRITE;
/*!40000 ALTER TABLE `point_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `point_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `rname_UNIQUE` (`rname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'Admin'),(1,'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_table`
--

DROP TABLE IF EXISTS `session_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_table` (
  `seid` int NOT NULL AUTO_INCREMENT,
  `teacher_uid` int DEFAULT NULL,
  `skill_id` int DEFAULT NULL,
  `mode` enum('swap','learn') NOT NULL,
  `s_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`seid`),
  KEY `teacher_uid_idx` (`teacher_uid`),
  KEY `skill_id_idx` (`skill_id`),
  CONSTRAINT `skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skill_table` (`sid`),
  CONSTRAINT `teacher_uid` FOREIGN KEY (`teacher_uid`) REFERENCES `user_table` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_table`
--

LOCK TABLES `session_table` WRITE;
/*!40000 ALTER TABLE `session_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_table`
--

DROP TABLE IF EXISTS `skill_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_table` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(45) NOT NULL,
  `cid` int DEFAULT NULL,
  `skdesc` varchar(255) NOT NULL,
  `basepoints` int NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `cid_idx` (`cid`),
  CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `category_table` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_table`
--

LOCK TABLES `skill_table` WRITE;
/*!40000 ALTER TABLE `skill_table` DISABLE KEYS */;
INSERT INTO `skill_table` VALUES (1,'Java',1,'some Java things',50);
/*!40000 ALTER TABLE `skill_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `rid` int DEFAULT NULL,
  `adhar_id` varchar(45) NOT NULL,
  `bdate` date NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'chetan','123','chetan@gmail.com','124578',1,'4512','2004-10-10',22);
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-19 15:26:44

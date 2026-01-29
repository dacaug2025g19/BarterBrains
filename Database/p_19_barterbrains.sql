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
  `cname` varchar(255) DEFAULT NULL,
  `cdesc` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_table`
--

LOCK TABLES `category_table` WRITE;
/*!40000 ALTER TABLE `category_table` DISABLE KEYS */;
INSERT INTO `category_table` VALUES (1,'Programming','Software development and coding skills'),(2,'Music','Instrumental and vocal music skills'),(3,'Art & Craft','Creative art and handmade craft skills'),(4,'Home Skills','Cooking, home management and daily life skills'),(5,'Academics','Subject knowledge and teaching skills'),(6,'Fitness','Physical training, yoga and wellness skills');
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
  `rname` varchar(255) DEFAULT NULL,
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
  `sname` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `skdesc` varchar(255) NOT NULL,
  `basepoints` int NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `cid_idx` (`cid`),
  CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `category_table` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_table`
--

LOCK TABLES `skill_table` WRITE;
/*!40000 ALTER TABLE `skill_table` DISABLE KEYS */;
INSERT INTO `skill_table` VALUES (1,'Java Programming',1,'Core and advanced Java development',50),(2,'Web Development',1,'Frontend and backend web technologies',60),(3,'Data Structures',1,'DSA concepts for problem solving',55),(4,'Python Programming',1,'Python for scripting and automation',50),(5,'Guitar Playing',2,'Acoustic and electric guitar skills',40),(6,'Singing',2,'Vocal training and singing techniques',35),(7,'Piano Playing',2,'Keyboard and piano basics to advanced',45),(8,'Sketching',3,'Pencil sketching and drawing techniques',30),(9,'Painting',3,'Watercolor and acrylic painting',35),(10,'Handmade Crafts',3,'DIY crafts and decorations',25),(11,'Cooking',4,'Preparing various cuisines and dishes',30),(12,'Baking',4,'Cakes, breads and bakery items',35),(13,'Gardening',4,'Plant care and gardening basics',25),(14,'Mathematics Teaching',5,'Teaching maths concepts clearly',45),(15,'Science Teaching',5,'Teaching physics, chemistry, biology',45),(16,'English Speaking',5,'Spoken English and communication',40),(17,'Yoga Training',6,'Yoga poses and breathing techniques',30),(18,'Gym Training',6,'Workout routines and fitness plans',35),(19,'Meditation',6,'Mindfulness and meditation practices',25);
/*!40000 ALTER TABLE `skill_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_learn_skill`
--

DROP TABLE IF EXISTS `user_learn_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_learn_skill` (
  `lid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  PRIMARY KEY (`lid`),
  KEY `uidfk_idx` (`uid`),
  KEY `sidfk_idx` (`sid`),
  CONSTRAINT `sidfk` FOREIGN KEY (`sid`) REFERENCES `skill_table` (`sid`),
  CONSTRAINT `uidfk` FOREIGN KEY (`uid`) REFERENCES `user_table` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_learn_skill`
--

LOCK TABLES `user_learn_skill` WRITE;
/*!40000 ALTER TABLE `user_learn_skill` DISABLE KEYS */;
INSERT INTO `user_learn_skill` VALUES (1,1,6),(2,2,5),(3,3,1),(4,4,3),(5,5,2),(6,6,8),(7,7,4),(8,8,7),(9,9,10),(10,10,9),(11,1,3),(12,2,7),(13,3,5),(14,4,1),(15,5,6);
/*!40000 ALTER TABLE `user_learn_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `rid` int DEFAULT NULL,
  `adhar_id` varchar(255) DEFAULT NULL,
  `bdate` date NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'test','123','test@gmail.com','124578',1,'1235','2004-11-10'),(2,'test2','12354','test@gmail.com','124578',1,'123455','2004-11-10'),(3,'test3','$2a$10$x3NeN5VQxRBOBqGa.9hEneP2RzkKq450BgmGmMndvn1dofJvVOpfe','test3@gmail.com','124578',1,'123455','2005-09-10'),(4,'test4','$2a$10$OReHE7wGF.AkKR3iq6R9Ru1Gsqc98TWUQirY9vm2fNLcg6nHKJm/6','test4@gmail.com','124578',1,'123455','2004-11-10'),(5,'test5','$2a$10$U7960r6.Dx0higMm2F.piuWx22/2WS59n8TcJ6O7b8UR/aqe5miK6','test5@gmail.com','124578',1,'123455','2004-11-10'),(6,'Shinde Mansi Sanjay','$2a$10$rlRvdMOTh2YnEPda9AkKT.aAPncLCFQ3fTJYupZ/LWRRQa6dDDe3u','mansishinde2101@gmail.com','08080596029',1,'830230804545','2004-01-21'),(7,'sonal ','$2a$10$wa7Non1sxkOyU3o36Ay.gu0I86UGCohMu.sOR5wWDeX7az5.w6UYy','sonal@gmail.com','124536789',1,'415263','2026-01-13'),(8,'Rohan Sapkale','$2a$10$CKXvnR0ZZWXPy3A4Nxkg6.5ng12i0ijEuFiPKsNZArcvo1bi6uA1.','rohan@gmail.com','45123678',1,'78456912','2003-01-22'),(9,'Rutuja kumbhar','$2a$10$Z9l.EIfIY6lcfF1DNxuexOdesf7yUgMSl3P1BqQxUHdnqTkDbqIfe','rutuja@gmail.com','45123678',1,'78456912','2003-01-22'),(10,'test7','$2a$10$GrBsZnRSwSdakCUG4zkfaOKvOEh1RfM9TPd6F38/GGT0RcXtODpiq','test7@gmail.com','123456',1,'789456123','2026-01-06');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_teach_skill`
--

DROP TABLE IF EXISTS `user_teach_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_teach_skill` (
  `teid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `exp_level` enum('beginner','intermediate','expert') DEFAULT NULL,
  `cert_url` varchar(45) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teid`),
  KEY `FKjsuvfr9c7946qamijwcx1l9n9` (`sid`),
  KEY `FKsd2e6cgk39a07byq33ynnv6gw` (`uid`),
  CONSTRAINT `FKjsuvfr9c7946qamijwcx1l9n9` FOREIGN KEY (`sid`) REFERENCES `skill_table` (`sid`),
  CONSTRAINT `FKsd2e6cgk39a07byq33ynnv6gw` FOREIGN KEY (`uid`) REFERENCES `user_table` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_teach_skill`
--

LOCK TABLES `user_teach_skill` WRITE;
/*!40000 ALTER TABLE `user_teach_skill` DISABLE KEYS */;
INSERT INTO `user_teach_skill` VALUES (1,1,1,'expert','http://cert.com/java1','Java backend developer with 3 years experience'),(2,2,2,'intermediate','http://cert.com/python1','Python for data analysis and scripting'),(3,3,3,'expert','http://cert.com/guitar1','Professional guitarist and music trainer'),(4,4,5,'beginner','http://cert.com/cook1','Home chef specialized in Indian cuisine'),(5,5,5,'expert','http://cert.com/web1','Frontend web developer using React'),(6,6,6,'intermediate','http://cert.com/ml1','Machine learning enthusiast and trainer'),(7,7,7,'expert','http://cert.com/photography1','Wildlife photographer'),(8,8,8,'beginner','http://cert.com/english1','Spoken English trainer'),(9,9,9,'expert','http://cert.com/yoga1','Certified yoga instructor'),(10,10,10,'intermediate','http://cert.com/graphic1','Graphic designer with branding skills');
/*!40000 ALTER TABLE `user_teach_skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 12:07:53

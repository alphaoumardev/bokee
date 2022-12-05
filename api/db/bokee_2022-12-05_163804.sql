/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS posts;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `date` datetime DEFAULT NULL COMMENT 'Create Time',
  `title` varchar(100) NOT NULL,
  `descs` varchar(500) NOT NULL,
  `img` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cat` varchar(30) NOT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users` (`uid`),
  CONSTRAINT `fk_users` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(25) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `userImg` varchar(200) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO posts(id,date,title,descs,img,cat,uid) VALUES(2,NULL,'What is MySQL?','MySQL is a relational database management system\nMySQL is open-source\nMySQL is free\nMySQL is ideal for both small and large applications\nMySQL is very fast, reliable, scalable, and easy to use\nMySQL is cross-platform\nMySQL is compliant with the ANSI SQL standard\nMySQL was first released in 1995\nMySQL is developed, distributed, and supported by Oracle Corporation\nMySQL is named after co-founder Monty Widenius\'s daughter: My ','5.jpg','technology',1),(5,'2022-12-05 10:32:42','iPhone15 Pro概念渲染图出炉！弧形边框回来了','<p>中关村在线消息：12月4日，据相关爆料，即将在明年发布的iPhone15系列将实现外观、配置的大改版。根据现有曝光消息显示，iPhone15系列将会放弃直角边框设计，而是采用经典弧度边框设计，弧形边框的优势十分明显，能为大家带来更加优秀的握持手感。</p><p>据悉，iPhone15中框与后壳连接处进行的弧度处理，机身整体也更加圆滑，机身中框或将采用钛合金打造，但机身背面依旧采用玻璃材质，以便支持Magsafe无线充电。全系采用“灵动岛”设计，还见我给大家带来更加便捷的USB-C充电口，预计数据传输速率以及充电功率将实现大幅提升，一起期待吧！</p>','13.jpg','design',3),(6,'2022-12-05 10:48:22','DESIGN PATTERNS','<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);\">Design patterns</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);\"> are typical solutions to common problems</span></p><p>in software design. Each pattern is like a blueprint</p><p>that you can customize to solve a particular</p><p>design problem in your code.</p>','9.jpg','art',3),(14,'2022-12-05 16:12:23','Design patterns for microservices','<p><span style=\"background-color: rgb(23, 23, 23); color: rgb(230, 230, 230);\">The goal of microservices is to increase the velocity of application releases, by decomposing the application into small autonomous services that can be deployed independently. A microservices architecture also brings some challenges. The design patterns shown here can help mitigate these challenges.</span></p>','24.jpg','technology',1),(15,'2022-12-05 16:30:33','Solution','<p><span style=\"background-color: rgb(23, 23, 23); color: rgb(230, 230, 230);\">In the following diagram, the client sends requests to each service (1,2,3). Each service processes the request and sends the response back to the application (4,5,6). Over a cellular network with typically high latency, using individual </span></p>','30.jpg','art',34),(16,'2022-12-05 16:34:12','Issues and considerations','<p><span style=\"background-color: rgb(23, 23, 23); color: rgb(230, 230, 230);\">In the following diagram, the client sends requests to each service (1,2,3). Each service processes the request and sends the response back to the application (4,5,6). Over a cellular network with typically high latency, using individual requests in this manner is inefficient and could result in broken</span></p>','28.jpg','art',1);
INSERT INTO users(id,username,password,email,userImg,created) VALUES(1,'alpha','alpha','alpha@gmail.com','12.jpg','2022-12-05 15:05:07'),(2,'oumou','alpha','oumou@gmail.com','13jpg','2022-12-05 15:05:07'),(3,'admin','alpha','admin@gmailc.om','14.jpg','2022-12-05 15:05:07'),(6,'kaaty','alpha','kaaty@gmail.com','15.jpg','2022-12-05 15:05:07'),(11,'bella','alpha','bella@gmail.com','9.jpg','2022-12-05 15:05:07'),(20,'binta','alpha','binta@gmail.com','44.jpg','2022-12-05 15:05:07'),(34,'maria','alpha','maria@gmailc.om','30.jpg','2022-12-05 16:17:51');
#!/usr/bin/env bash
#node node_modules/.bin/db-migrate create create_users_table --migrations-dir "./database/migrations" --config "./config/database.json"
#node node_modules/.bin/db-migrate create create_users_password_resets --migrations-dir "./database/migrations" --config "./config/database.json"
#node node_modules/.bin/db-migrate up --migrations-dir "./database/migrations" --config "./config/database.json"

node node_modules/.bin/sequelize model:generate --name User --attributes name:string,email:string,password:string,remember_token:string,emailVerifiedAt:date
# ,created_at:timestamp,updated_at:timestamp,email_verified_at:timestamp
node node_modules/.bin/sequelize migration:generate --name users_password_resets

#CREATE TABLE `users` (
#  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
#  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
#  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
#  `email_verified_at` timestamp NULL DEFAULT NULL,
#  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
#  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
#  `created_at` timestamp NULL DEFAULT NULL,
#  `updated_at` timestamp NULL DEFAULT NULL,
#  PRIMARY KEY (`id`),
#  UNIQUE KEY `users_email_unique` (`email`)
#) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#CREATE TABLE `Users` (
#  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
#  `name` varchar(255) NOT NULL,
#  `email` varchar(255) NOT NULL,
#  `password` varchar(255) NOT NULL,
#  `remember_token` varchar(100) DEFAULT NULL,
#  `emailVerifiedAt` datetime DEFAULT NULL,
#  `createdAt` datetime DEFAULT NULL,
#  `updatedAt` datetime DEFAULT NULL,
#  PRIMARY KEY (`id`),
#  UNIQUE KEY `users_email_unique` (`email`)
#) ENGINE=InnoDB DEFAULT CHARSET=utf8;
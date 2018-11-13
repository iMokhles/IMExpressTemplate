'use strict';
var Sequelize = require('sequelize');
var databse = require('../config/database');

var sequelize = new Sequelize(databse.development.database, databse.development.username, databse.development.password, {
    host: databse.development.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    },
    omitNull: true,
    logging: false,
    define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8mb4_unicode_ci'
        },
        timestamps: true
    },
    sync: { force: true },
});
module.exports = sequelize;
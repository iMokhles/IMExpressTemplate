'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

var bcrypt = require('bcrypt');
var string = require('../helpers/string');

/**
 *
 * @type {Model}
 */
const UserPasswordReset = sequelize.define('UserPasswordReset', {
    id: {
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    email: {
        field: 'email',
        type: Sequelize.DataTypes.STRING,
        isEmail: true,
        allowNull: false
    },
    token: {
        field: 'token',
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'createdAt',
        allowNull: true,
        type:   Sequelize.DataTypes.DATE
    },
}, {
    tableName: 'users_password_reset',
    updatedAt: false
});
module.exports = UserPasswordReset;
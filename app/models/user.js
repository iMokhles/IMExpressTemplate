'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
var bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        field: 'name',
        type:   Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 50],
                msg: 'Please, enter a name between 3 and 50 characters only.'
            }
        }
    },
    email: {
        field: 'email',
        type: Sequelize.DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
    },
    password: {
        field: 'password',
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    rememberToken: {
        field: 'rememberToken',
        type:   Sequelize.DataTypes.STRING(100)
    },
    verificationToken: {
        field: 'verificationToken',
        allowNull: true,
        type:   Sequelize.DataTypes.STRING
    },
    emailVerifiedAt: {
        field: 'emailVerifiedAt',
        allowNull: true,
        type:   Sequelize.DataTypes.DATE
    },
    createdAt: {
        field: 'createdAt',
        allowNull: true,
        type:   Sequelize.DataTypes.DATE
    },
    updatedAt: {
        field: 'updatedAt',
        allowNull: true,
        type:   Sequelize.DataTypes.DATE
    }
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});
module.exports = User;
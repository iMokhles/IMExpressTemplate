'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER.UNSIGNED
      },
      name: {
          type:   DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: {
                  args: [2, 50],
                  msg: 'Please, enter a username between 2 and 50 characters.'
              }
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          isEmail: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      remember_token: {
          type:   DataTypes.STRING(100)
      },
      emailVerifiedAt: {
          allowNull: true,
          type:   DataTypes.DATE
      }
  }, {
      hooks: {
          beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync();
              user.password = bcrypt.hashSync(user.password, salt);
          }
      }
  });

  User.associate = function(models) {
    // associations can be defined here
    //   User.belongsTo(models.MODEL_NAME, {foreignKey: 'userId' });
  };
  return User;
};
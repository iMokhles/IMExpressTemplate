'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
        type:   DataTypes.STRING
    },
    email: {
        type:   DataTypes.STRING
    },
    password: {
        type:   DataTypes.STRING
    },
    remember_token: {
        type:   DataTypes.STRING
    },
    emailVerifiedAt: {
        type:   DataTypes.DATE
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    //   User.belongsTo(models.MODEL_NAME, {foreignKey: 'userId' });
  };
  return User;
};
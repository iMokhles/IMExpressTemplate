'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users_password_reset', {
          email: {
              allowNull: false,
              type: Sequelize.STRING,
          },
          token: {
              allowNull: false,
              type: Sequelize.STRING
          },
          createdAt: {
              allowNull: true,
              type: Sequelize.DATE
          },
      }, {
          indexKeys: { "users_password_resets_email_index": { "fields": ["email"], customIndex: true } }
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users_password_reset');
  }
};

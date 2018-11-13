'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync('secret', salt);
      return queryInterface.bulkInsert('users', [{
          name: 'John Doe',
          email: 'test_mail@email.com',
          password: hashedPassword, // hashing is under
          rememberToken: null,
          verificationToken: null,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});

  }
};

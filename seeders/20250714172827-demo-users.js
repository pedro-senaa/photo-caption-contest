'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'nome1',
        password: 'senha1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        username: 'nome2',
        password: 'senha2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images', [
      {
        // funny cat
        url: 'https://m.media-amazon.com/images/I/91I89Qh5JzL.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // cute dog
        url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // landscape
        url: 'https://www.windowslatest.com/wp-content/uploads/2024/10/Windows-XP-4K-modified-scaled.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {})
  }
};

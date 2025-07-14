'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // get id and username of users
    const users = await queryInterface.sequelize.query(
      `SELECT id, username FROM "users";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );


    // get id and url of images
    const images = await queryInterface.sequelize.query(
      `SELECT id, url FROM "images";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    // data to be stored
    const captionsData = [
      {
        text: 'eu tenho id 1 e essa imagem eh de id 1',
        userId: users[0].id,
        imageId: images[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'eu tenho id 2 e essa imagem eh id 1',
        userId: users[1].id,
        imageId: images[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'eu tenho id 1 e essa imagem eh id 2',
        userId: users[0].id,
        imageId: images[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'userId eh 2 e imagemId eh 2',
        userId: users[1].id,
        imageId: images[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    // filter if any user or image was deleted
    const validCaptions = captionsData.filter(caption => caption.userId && caption.imageId);

    if (validCaptions.length > 0) {
      await queryInterface.bulkInsert('captions', validCaptions, {})
    } else {
      console.warn('No valid captions')
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('captions', null, {})
  }
};

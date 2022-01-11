'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641925882/Amityville-Horror-House_imdsvf.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926324/MW-EQ389_amityv_20160629095319_ZH_lksvlg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926344/gettyimages-517285546_eeqz4b.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};

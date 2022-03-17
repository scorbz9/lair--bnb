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
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/4.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/5.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/6.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/7.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/8.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/9.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        imgURL: 'https://lair--bnb-bucket.s3.us-west-1.amazonaws.com/10.jpg',
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

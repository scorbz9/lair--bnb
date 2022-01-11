'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Amenities', [
      {
        spotId: 1,
        hairDryer: false,
        hotWater: true,
        hangers: true,
        bedLinens: true,
        iron: false,
        tv: true,
        heating: true,
        smokeAlarm: true,
        wifi: false,
        parking: true,
        kitchen: true,
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
   return queryInterface.bulkDelete('Amenities', null, {});
  }
};

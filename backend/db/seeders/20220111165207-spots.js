'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Spots', [
      { id: 1,
        userId: 1,
        description: "The home — its original address was 112 Ocean Ave. but was changed to 108 to deter tourists — was purchased by George and Kathy Lutz one year after the murders. But they ditched the property after only one month due to reported paranormal activity, which inspired a 1977 book and 1979 movie.",
        address: "108 Ocean Ave, Amityville, NY 11701",
        pricePerNight: 80,
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
   return queryInterface.bulkDelete('Spots', null, {});
  }
};

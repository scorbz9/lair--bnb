'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        references: { model: "Spots" },
        type: Sequelize.INTEGER
      },
      hairDryer: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hotWater: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hangers: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      bedLinens: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      iron: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      tv: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      heating: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      smokeAlarm: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      wifi: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      parking: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      kitchen: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Amenities');
  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    spotId: {
      allowNull: false,
      references: { model: "Spots" },
      type: DataTypes.INTEGER
    },
    hairDryer: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    hotWater: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    hangers: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    bedLinens: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    iron: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    tv: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    heating: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    smokeAlarm: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    wifi: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    parking: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    kitchen: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    }
  }, {});
  Amenity.associate = function(models) {
    Amenity.belongsTo(models.Spot, { foreignKey: 'spotId' })
  };
  return Amenity;
};

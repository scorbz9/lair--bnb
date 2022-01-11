'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Users" },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(250),
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true,
    }
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, { foreignKey: 'spotId' })
    Spot.hasMany(models.Image, { foreignKey: 'spotId' })
    Spot.hasMany(models.Amenity, { foreignKey: 'spotId' })
  };
  return Spot;
};

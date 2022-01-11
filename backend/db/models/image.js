'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: {
      allowNull: false,
      references: { model: "Spots" },
      type: DataTypes.INTEGER
    },
    imgURL: {
      allowNull: false,
      type: DataTypes.STRING(250)
    }
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Spot, { foreignKey: 'spotId' })
  };
  return Image;
};

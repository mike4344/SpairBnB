'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    ImageUrl: DataTypes.STRING,
    SpotId: DataTypes.INTEGER,
    ReviewId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  Image.findBySpotId = function(spotId) {
    return Image.findAll({where: {SpotId: spotId}});
  }
  return Image;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageUrl: DataTypes.STRING,
    spotId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  Image.findBySpotId = function(spotId) {
    return Image.findAll({where: {spotId}});
  }
  Image.findOneBySpotId = function(spotId) {
    return Image.findOne({where: {spotId}})
  }
  return Image;
};

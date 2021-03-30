'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    authorId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    reviewBody: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    AuthorId: DataTypes.INTEGER,
    SpotId: DataTypes.INTEGER,
    Rating: DataTypes.INTEGER,
    ReviewBody: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};
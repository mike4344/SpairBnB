'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    BookerId: DataTypes.INTEGER,
    SpotId: DataTypes.INTEGER,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE
  }, {});
  Bookmark.associate = function(models) {
    // associations can be defined here
  };
  return Bookmark;
};
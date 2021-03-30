'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    SpotName: DataTypes.STRING,
    SpotDetails: DataTypes.TEXT,
    Location: DataTypes.STRING,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    OwnerId: DataTypes.INTEGER
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
  };

  return Spot;
};

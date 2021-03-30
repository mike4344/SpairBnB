'use strict';
const {Image} = require('./index')
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
  Spot.getSpot = async function(spotId){
    return await Spot.findByPk(spotId)
  }
  Spot.prototype.deleteDependents = async function (){
    await Image.destroy({where: {spotId: this.id}})

  }
  return Spot;
};

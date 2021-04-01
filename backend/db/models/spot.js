'use strict';
const {Image} = require('./index')
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    spotName: DataTypes.STRING,
    spotDetails: DataTypes.TEXT,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
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

  Spot.findByState = async function (state){
    return await Spot.findAll({where: {state: state}})
  }
  return Spot;
};

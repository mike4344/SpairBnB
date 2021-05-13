'use strict';
const faker = require('faker');
let images = []
let createImages = amount =>{
  for(let i = 0; i < amount; i++){
    for(let i = 0; i< 5; i++){

      let image = {
        imageURL: faker.random.image(),
        spotId: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      images.push(image)
    }
  }
}
createImages(199)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', images, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};

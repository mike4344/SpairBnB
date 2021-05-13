'use strict';
const faker = require('faker');
let images = []
let createImages = amount =>{
  for(let i = 0; i < amount; i++){
    for(let j = 0; j< 5; j++){
      let imageUrl = faker.image.imageUrl(640, 480, 'city', true, true);

      let image = {
        imageUrl:imageUrl,
        spotId: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      images.push(image)
    }
  }
}
createImages(20)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', images, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};

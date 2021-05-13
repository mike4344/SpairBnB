'use strict';
const faker = require('faker');
let spots = []
let createSpots = amount =>{
  for(let i = 0; i < amount; i++){
    let spot = {
      spotName: faker.random.words(4),
      spotDetails: faker.random.words(50),
      location: `${faker.address.latitude(45, 44.8)},${faker.address.longitude(-73, -72.8)}`,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: 'New York',
      createdAt: new Date(),
        updatedAt: new Date()
    }
    spots.push(spot)
  }
}
createSpots(20)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', spots, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};

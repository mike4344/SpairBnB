'use strict';
const faker = require('faker');
let reviews = []
let createReviews = amount =>{
  for(let i = 0; i < amount; i++){
    for(let i = 0; i< 5; i++){

      let review = {
        reviewBody: faker.random.words(Math.floor(Math.random() * 8) + 1),
        spotId: i + 1,
        rating: Math.floor(Math.random() * 5),
        authorId: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date()

      }
      reviews.push(review)
    }
  }
}
createReviews(19)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots');
  }
};

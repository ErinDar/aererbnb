'use strict';

const { Spot, User, Review } = require('../models')
const { Op } = require('sequelize');
const review = require('../models/review');

const spotReview = [
  {
    username: 'Skylee',
    name: 'Holmes Residence',
    reviews: [
      {
        review: 'This was the best experience. Even solved a case',
        stars: 5
      }
    ]
  },
  {
    username: 'Demo-lition',
    name: 'Murder House',
    reviews: [
      {
        review: "Haven't seen my sister since day 1 but I really enjoyed my stay",
        stars: 4
      }
    ]
  },
  {
    username: 'Mikey',
    name: 'Wayne Manor',
    reviews: [
      {
        review: 'Was hard to find but once I got there it was awesome',
        stars: 4
      }
    ]
  },
  {
    username: 'FakeUser2',
    name: 'Murder House',
    reviews: [
      {
        review: "I should have heeded the warning before booking",
        stars: 1
      }
    ]
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let userIdx = 0; userIdx < spotReview.length; userIdx++) {
      const { username, name, reviews } = spotReview[userIdx]
      const user = await User.findOne({
        where: {
          username
        }
      })
      const spot = await Spot.findOne({
        where: {
          name
        }
      })
      for (let reviewIdx = 0; reviewIdx < reviews.length; reviewIdx++) {
        const spotReview = reviews[reviewIdx]
        await Review.create({
          spotId: spot.id,
          userId: user.id,
          review: spotReview.review,
          stars: spotReview.stars
        })
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const reviewList = spotReview.reduce((acc, user) => [...acc, ...user.reviews], [])

    await queryInterface.bulkDelete('Reviews', {
      [Op.or]: reviewList
    })
  }
};

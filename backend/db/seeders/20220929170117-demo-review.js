'use strict';

const { Spot, User, Review } = require('../models')
const { Op } = require('sequelize');
const review = require('../models/review');

const spotReview = [
  {
    username: 'Skylee',
    name: 'Tower in Pittsburg',
    reviews: [
      {
        review: 'Was an amazing trip! Demo is an awesome host!',
        stars: 5
      }
    ]
  },
  {
    username: 'Demo-lition',
    name: 'Seinfeld',
    reviews: [
      {
        review: "Was a bit pricey for the size but they said they filmed Seinfeld here so.",
        stars: 3
      }
    ]
  },
  {
    username: 'Mikey',
    name: 'Wayne Manor',
    reviews: [
      {
        review: 'Might book again. Was nice to have a wait staff on hand.',
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
  },
  {
    username: 'Ezzzy',
    name: "Murder House",
    reviews: [
      {
        review: "Never saw my sister again after the second day. Can't leave less than 1 star but I would if I could. Sister if you see this please come back home!",
        stars: 1
      }
    ]
  },
  {
    username: 'FakeUser1',
    name: "Tiny Cabin",
    reviews: [
      {
        review: "Nice to spend time in a space with minimal clutter for awhile.",
        stars: 5
      }
    ]
  },
  {
    username: 'FakeUser1',
    name: "Cottage in Lexington",
    reviews: [
      {
        review: "Nice cute space to just getaway for awhile and do nothing.",
        stars: 5
      }
    ]
  },
  {
    username: 'Mikey',
    name: "Cottage in Lexington",
    reviews: [
      {
        review: "My girlfriend really likes this place. May come back for a special occasion. ",
        stars: 4
      }
    ]
  },
  {
    username: 'FakeUser2',
    name: "Seinfeld",
    reviews: [
      {
        review: "After staying here I will book a hotel next time. ",
        stars: 2
      }
    ]
  },
  {
    username: 'Demo-lition',
    name: "Black Widow",
    reviews: [
      {
        review: "This listing has me seriously considering rebuilding my entire house.",
        stars: 5
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

'use strict';

const { User, Spot, Review, ReviewImage } = require('../models');
const { Op } = require('sequelize');


const images = [
  {
    username: 'Ezzzy',
    name: 'Murder House',
    reviewUrl: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3bi4po2f6wlmvFwnVekrl9hDp1oNSeelxmw&usqp=CAU'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUeOJEzhGRn7ftQiA5CHMKY_HS5bzTd5Im-w&usqp=CAU'
      }
    ]
  },
  {
    username: 'Mikey',
    name: 'Wayne Manor',
    reviewUrl: [
      {
        url: 'https://static.wikia.nocookie.net/batman/images/a/a9/Wayne_Manor_2.jpg/revision/latest?cb=20120801235608'
      }
    ]
  },
  {
    username: 'FakeUser2',
    name: 'Murder House',
    reviewUrl: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8Htq12xk1ATs64TjxL7fsPK3xnQCNhAQhQ&usqp=CAU'
      }
    ]
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
      const { username, name, reviewUrl } = images[imgIdx]
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
      const review = await Review.findOne({
        where: {
          spotId: spot.id,
          userId: user.id
        }
      })
      for (let urlIdx = 0; urlIdx < reviewUrl.length; urlIdx++) {
        const url = reviewUrl[urlIdx]
        await ReviewImage.create({
          reviewId: review.id,
          url: url.url
        })
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const reviewImg = images.reduce((acc, review) => [...acc, ...review.reviewUrl], []);

    await queryInterface.bulkDelete('ReviewImages', {
      [Op.or]: reviewImg
    })
  }
};

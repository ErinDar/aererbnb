'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize')

const spotImages = [
  {
    name: 'Murder House',
    images: [
      {
        url: "https://www.welikela.com/wp-content/uploads/2020/10/murder-house-jbr.jpg",
        preview: true
      },
      {
        url: "https://hgtvhome.sndimg.com/content/dam/images/door/fullset/2013/2/15/0/celebrity-american-horror-story-foyer-3.jpg.rend.hgtvcom.966.644.suffix/1427747075828.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Holmes Residence',
    images: [
      {
        url: 'https://i.pinimg.com/originals/84/fa/1a/84fa1a08d184460b9e98b0b45985d37e.jpg',
        preview: false
      }
    ]
  },
  {
    name: 'Squarepants Pineapple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOm_WqFW8iBCzTIr8r9zqGUlwtU3IVgur5g&usqp=CAU',
        preview: true
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-cmQl_yO3I06EiWJ0f9hRsG3ZdIlBN7F7s7-9GrTJWVVlP8LyX5ADRll3jp0HZWMsdw&usqp=CAU',
        preview: true
      }
    ]
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let spotIdx = 0; spotIdx < spotImages.length; spotIdx++) {
      const { name, images } = spotImages[spotIdx]
      const spot = await Spot.findOne({
        where: {
          name
        }
      })
      for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
        const spotImg = images[imgIdx]
        await spot.createSpotImage(spotImg)
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const imageList = spotImages.reduce((acc, spot) => [...acc, ...spot.images], [])

    await queryInterface.bulkDelete('SpotImages', {
      [Op.or]: imageList
    })
  }
};

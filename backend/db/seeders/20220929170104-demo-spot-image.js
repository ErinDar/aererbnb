'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize')

const spotImages = [
  {
    name: 'Murder House',
    images: [
      {
        url: "https://res.cloudinary.com/doydiwq2g/image/upload/v1666598117/murder-house-jbr_rwr5n7.jpg",
        preview: true
      },
    ]
  },
  {
    name: 'Tiny Cabin',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666597895/DIY-cabin-WB_ux45t3_qxua1c_xnx877.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Black Widow',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666597949/denoutdoorsdotcom_Aframehouse8_nqkzpx.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Cottage in Lexington',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598024/unnamed_0-1000x853_xafbbn.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Cottage in Rosenberg',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598079/1200px-Anne_Hathaways_Cottage_1__285662418953_29_wuhrbj.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Tiny Home in Round Rock',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598232/SB-Nashville-Tiny-House-Gieves-ANderson-25-feature_xf87ua.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Wayne Manor',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598314/l-intro-1648564684_udugbc.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Tiny Home in Dallas',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598232/90_wxtikr.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Campsite',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598497/eco-living-dome-tent-glamping-dome-house-for-campsite-resort-accommodation-geodesic-dome-hotel-in-forest-resorts-glitzcamp-starry-dome-igloo_cbhuct.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Barn House',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598552/0321_IF_Idea_House_Reveal_ModernBarnhouse_05042021CH__0184.0_nwngd5.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Cabin in Grand Prairie',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598632/Cabin_juq9ri.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Seinfeld',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598688/jerryapartment_ag1kch.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Kettle House',
    images: [
      {
        url: "https://res.cloudinary.com/doydiwq2g/image/upload/v1666598788/Kettle-House-Exterior_nvrz6m.jpg",
        preview: true
      }
    ]
  },
  {
    name: 'Brooklyn Townhouse',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598898/im-491516_cqfqgh.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Tiny Home in Corona',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666598968/small_storage_xl_n8q41c.jpg',
        preview: true
      }
    ]
  },
  {
    name: 'Treehouse',
    images: [
      {
        url: "https://res.cloudinary.com/doydiwq2g/image/upload/v1666599036/DJI_0247_pj9qmw.jpg",
        preview: true
      }
    ]
  },
  {
    name: 'Tower in Pittsburg',
    images: [
      {
        url: 'https://res.cloudinary.com/doydiwq2g/image/upload/v1666599113/Watertower-of-Living-by-Zecc-Architecten-1_psarot.jpg',
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

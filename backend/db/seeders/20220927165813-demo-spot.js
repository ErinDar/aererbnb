'use strict';

const { User } = require('../models')
const { Op } = require('sequelize')

const spotListings = [
  {
    username: 'Skylee',
    spots: [
      {
        address: "221B Baker St.",
        city: "London",
        state: "United Kingdom",
        country: "England",
        lat: 51.5237,
        lng: -0.1585,
        name: "Holmes Residence",
        description: "Take a trip back in time and experience what it's like to wake up like Sherlock Holmes with the beautiful scenery of London as a backdrop.",
        price: 250
      },
      {
        address: "124 Conch St.",
        city: "Bikini Bottom",
        state: "Pacific Ocean",
        country: "United States of America",
        lat: 11.5977431,
        lng: 165.4910547,
        name: "Squarepants Pineapple",
        description: "Who lives in a pineapple under the sea? You can! Come explore the wonders of Bikini Bottom. Many wonderful resturants including the Krusty Krab which is just a short hop skip away.",
        price: 150
      }
    ]
  },
  {
    username: 'FakeUser2',
    spots: [
      {
        address: "1007 Mountain Drive",
        city: "Crest Hill",
        state: "New Jersey",
        country: "United States of America",
        lat: 39.833851,
        lng: -74.871826,
        name: "Wayne Manor",
        description: "Enjoy the luxuries of Wayne Manor with a fully staffed maid service.",
        price: 485
      }
    ]
  },
  {
    username: 'Mikey',
    spots: [
      {
        address: "5A, 129 W. 81st St.",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.742641,
        lng: -74.001381,
        name: "Seinfeld",
        description: "The place where nothing happens.",
        price: 240
      }
    ]
  },
  {
    username: 'Demo-lition',
    spots: [
      {
        address: "1120 Westchester Place",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.0499430,
        lng: -118.3176545,
        name: "Murder House",
        description: "Enter at your own risk.",
        price: 2000
      }
    ]
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let userIdx = 0; userIdx < spotListings.length; userIdx++) {
      const { username, spots } = spotListings[userIdx]
      const user = await User.findOne({
        where: {
          username
        }
      })
      for (let spotIdx = 0; spotIdx < spots.length; spotIdx++) {
        const listing = spots[spotIdx]
        await user.createSpot(listing)
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const spotsList = spotListings.reduce((acc, user) => [...acc, ...user.spots], []);

    await queryInterface.bulkDelete('Spots', {
      [Op.or]: spotsList
    })
  }
};

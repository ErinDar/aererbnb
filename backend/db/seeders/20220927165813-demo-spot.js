'use strict';

const { User } = require('../models')
const { Op } = require('sequelize')

const spotListings = [
  {
    username: 'Skylee',
    spots: [
      {
        address: "7490 Strawberry Lane",
        city: "Hamilton",
        state: "Ohio",
        country: "USA",
        lat: 51.5237,
        lng: -0.1585,
        name: "Tiny Cabin",
        description: "Kick back and relax in this calm, stylish space.  Upscale cabin minutes from Sugarcreek, little Switzerland of Ohio, in the Heart of Amish Country!  Geared  towards relaxation and comfort, so we ask that there are no parties or events.",
        price: 300
      },
      {
        address: "9215 Brickyard Court",
        city: "Batavia",
        state: "Ohio",
        country: "USA",
        lat: 11.5977431,
        lng: 165.4910547,
        name: "Black Widow",
        description: "We look forward to welcoming you to the peace and privacy of our Aframe, designed and built by my husband on our 20 acres of wooded property in the rolling hills of Central Ohio.",
        price: 150
      },
      {
        address: "49 Shirley Ave.",
        city: 'Lexington',
        state: 'North Carolina',
        country: 'USA',
        name: "Cottage in Lexington",
        description: "Chic property and is perfect for a wine country getaway. The property is home to animals and wild life including alpacas, llamas, miniature donkeys, miniature sheep and of course, spotted sheep! ",
        price: 450
      },
      {
        address: "604 John Road",
        city: "Rosenberg",
        state: "Texas",
        country: "USA",
        name: "Cottage in Rosenberg",
        description: "Visiting Family or Friends? Or Perhaps a Staycation? You are sure to make some memories at this unique PET FRIENDLY, two story A-frame home in the central location of Rosenberg, Texas.",
        price: 250
      },
      {
        address: "69 Edgewood Ave.",
        city: "Round Rock",
        state: "Texas",
        country: "USA",
        name: 'Tiny Home in Round Rock',
        description: "Located on 72 gorgeous tree-covered acres, our romantic Patio Casita offers the perfect blend of the beauty and peace of The Hill Country and the luxurious comforts of home.",
        price: 500
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
      },
      {
        address: '7080 Bay St.',
        city: "Dallas",
        state: "Texas",
        country: "USA",
        name: "Tiny Home in Dallas",
        description: "Clean, Zen modern backyard cottage, easy access to SXSW, convention center, great dining, and public transportation. Gorgeous, peaceful space, close to the action but perfect for rest and recharging. Easy access to SXSW, ACL, F1 and all festivals.",
        price: 350
      },
      {
        address: '95 Broad St.',
        city: "Houston",
        state: "Texas",
        country: "USA",
        name: "Campsite",
        description: "A unique, heart-throbbing ADULTS-only eco-Glamping resort in Houston.",
        price: 275
      },
      {
        address: '186 Grant Rd.',
        city: "Dallas",
        state: "Texas",
        country: "USA",
        name: "Barn House",
        description: "All the comforts of home accentuated with designer bed linens and an expansive living area. Outside enjoy a 360 view of the countryside. This ain't your grand daddy's barn!",
        price: 180
      },
      {
        address: '23 Newbridge St.',
        city: "Grand Prairie",
        state: "Texas",
        country: "USA",
        name: "Cabin in Grand Prairie",
        descripiton: "Enjoy living as if you were living on the prairie",
        price: 100
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
      },
      {
        address: '7641 North Wild Horse St.',
        city: "Bay Shore",
        state: "New York",
        country: "USA",
        name: "Kettle House",
        description: "Enjoy this newly renovated 1960's home originally built as a steel storage tank. This home has foam insulation and central AC for ultimate comfort.",
        price: 1350
      },
      {
        address: '276 South Deerfiled Rd.',
        city: "Brooklyn",
        state: "New York",
        country: "USA",
        name: "Brooklyn Townhouse",
        description: "This stunning, spacious, newly renovated two-bedroom apartment with incredible outdoor space located in the heart of Brooklyn on a tree-lined block.",
        price: 450
      },
      {
        address: '29 SE. Thorne Court',
        city: "Corona",
        state: "New York",
        country: "USA",
        name: "Tiny Home in Corona",
        description: "Step from the upstairs suite to the well-lit rooftop deck for an evening cocktail. A fusion of 2 shipping containers, 20' and 40', the interior of this unique home is insulated and paneled in pine shiplap and trimmed in 100+ year old barn wood.",
        price: 140
      },
      {
        address: '8708 Church Ave.',
        city: "New York",
        state: "New York",
        country: "USA",
        name: "Treehouse",
        description: "Brand new, luxurious, pond-side treehouse in the woods.  It is the ideal place to spend your honeymoon or a romantic getaway with your love.",
        price: 150
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
      },
      {
        address: "7507 E. Peg Shop Court",
        city: "Pittsburg",
        state: "California",
        country: "USA",
        name: "Tower in Pittsburg",
        description: "One of the tallest and roundest single family home since medieval times. ",
        price: 1500
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

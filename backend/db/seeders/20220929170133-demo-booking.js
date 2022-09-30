'use strict';

const { User, Spot, Booking } = require('../models');
const { Op } = require('sequelize');

const reservation = [
  {
    username: 'FakeUser1',
    name: 'Seinfeld',
    booking: [
      {
        startDate: '2022-11-10',
        endDate: '2022-11-15'
      }
    ]
  },
  {
    username: 'FakeUser1',
    name: 'Murder House',
    booking: [
      {
        startDate: '2022-12-02',
        endDate: '2022-12-10'
      }
    ]
  },
  {
    username: 'Mikey',
    name: 'Wayne Manor',
    booking: [
      {
        startDate: '2022-10-15',
        endDate: '2022-10-20'
      }
    ]
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let reservationIdx = 0; reservationIdx < reservation.length; reservationIdx++) {
      const { username, name, booking } = reservation[reservationIdx]
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
      for (let bookingIdx = 0; bookingIdx < booking.length; bookingIdx++) {
        const dateBooked = booking[bookingIdx]
        await Booking.create({
          spotId: spot.id,
          userId: user.id,
          startDate: dateBooked.startDate,
          endDate: dateBooked.endDate
        })
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const bookingList = reservation.reduce((acc, user) => [...acc, ...user.booking], [])

    await queryInterface.bulkDelete('Bookings', {
      [Op.or]: bookingList
    })
  }
};

'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Chris',
        lastName: 'Robertson',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Brad',
        lastName: 'Null',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Ronald',
        lastName: 'MacDonald',
        email: 'macdonald.realone@user.io',
        username: 'Mikey',
        hashedPassword: bcrypt.hashSync('doubleandcheese')
      },
      {
        firstName: 'Sky',
        lastName: 'Blue',
        email: 'princess_sky@user.io',
        username: 'Skylee',
        hashedPassword: bcrypt.hashSync('starlord22')
      },
      {
        firstName: 'Ezra',
        lastName: 'Matthews',
        email: 'ezra.matthews@user.io',
        username: 'Ezzzy',
        hashedPassword: bcrypt.hashSync('password4')
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Mikey', 'Skylee', 'Ezzzy']
      }
    })
  }
};

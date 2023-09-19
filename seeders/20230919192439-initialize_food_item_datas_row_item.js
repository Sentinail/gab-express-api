'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('food_item_datas', [
      {
        item_id: 1,
        item_name: 'bread',
        item_price: '5.00',
        extension_name: '.jpg',
      },
      {
        item_id: 2,
        item_name: 'canned_food',
        item_price: '10.00',
        extension_name: '.jpg',
      },
      {
        item_id: 3,
        item_name: 'drinks',
        item_price: '2.00',
        extension_name: '.jpg',
      },
      {
        item_id: 4,
        item_name: 'porridge',
        item_price: '7.00',
        extension_name: '.jpg',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('food_item_datas', null, {});
  }
};

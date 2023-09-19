'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_datas', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      user_name: {
        type: Sequelize.STRING,
        unique: true,
      },
      email_address: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      member_since: {
        type: Sequelize.DATE,
      },
      total_donation: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      about_user: {
        type: Sequelize.STRING,
        defaultValue: "Lorem Ipsum",
      },
      user_profile_name: {
        type: Sequelize.STRING,
        defaultValue: "Default_profile_pict.png",
      },
      color_preference: {
        type: Sequelize.STRING,
        defaultValue: "[[47, 46, 46, 1], [75, 141, 193, 1], [242, 242, 242, 1]]",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_datas');
  }
};

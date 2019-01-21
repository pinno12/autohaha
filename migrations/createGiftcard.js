'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('giftcards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        rimaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT('tiny')
      },
      displayName: {
        allowNull: false,
        type: Sequelize.TEXT('tiny')
      },
      Ispassword: {
        allowNull: false,
        type: Sequelize.boolean
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('giftcards');
  }
};
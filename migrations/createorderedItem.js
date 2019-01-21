'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orderedItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      
      productName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      productOption: {
        allowNull: true,
        type: Sequelize.STRING
      },
      orderedSite: {
        allowNull: true,
        type: Sequelize.TEXT('tiny')
      },      
      userName:{
        allowNull: true,
        type: Sequelize.TEXT('tiny')
      },
      userPhone:{
        allowNull: true,
        type:Sequelize.TEXT('tiny')
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
    return queryInterface.dropTable('orderedItems');
  }
};
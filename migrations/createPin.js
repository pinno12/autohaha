'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      writer: {
        allowNull: false,
        type: Sequelize.TEXT('tiny')
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER        
      },
      pin_number: {
        allowNull: false,
        type: Sequelize.STRING        
      },
      pin_number2: {
        
        type: Sequelize.STRING
      },
      memo: {
        
        type: Sequelize.STRING
      },
      Isordered: {
        
        type: Sequelize.BOOLEAN
      },     
      userName:{        
        type: Sequelize.TEXT('tiny')
      },
      userPhone:{        
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
    return queryInterface.dropTable('pins');
  }
};
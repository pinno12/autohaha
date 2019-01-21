'use strict';
module.exports = (sequelize, DataTypes) => {
  const pin = sequelize.define('pin', {
    writer: DataTypes.TEXT('tiny'),
    price: DataTypes.INTEGER,
    pin_number: DataTypes.STRING,
    pin_number2: DataTypes.STRING,
    memo: DataTypes.STRING,
    Isordered: DataTypes.BOOLEAN,
    userName: DataTypes.TEXT('tiny'),
    userPhone: DataTypes.TEXT('tiny'),  
  }, {});
  pin.associate = function(models) {
    pin.belongsTo(models.giftcard);
    pin.belongsTo(models.orderedItem);
  
  };
  return pin;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderedItem = sequelize.define('orderedItem', {
    order_number: DataTypes.TEXT('tiny'),
    // giftcardId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productOption: DataTypes.STRING,
    orderedSite: DataTypes.STRING,
    userName: DataTypes.TEXT('tiny'),
    userPhone: DataTypes.TEXT('tiny'),
  
  }, {});
  orderedItem.associate = function(models) {
   orderedItem.hasMany(models.pin);
  };
  return orderedItem;
};
    
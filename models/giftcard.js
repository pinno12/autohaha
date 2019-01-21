'use strict';
module.exports = (sequelize, DataTypes) => {
  const giftcard = sequelize.define('giftcard', {
    name: DataTypes.TEXT('tiny'),
    nickname: DataTypes.TEXT('tiny'),
    Ispassword: DataTypes.BOOLEAN
  }, {
    classMethods: {
  associate: function(models) {
    giftcard.hasMany(models.pin);
  }
}
  });
  return giftcard;
};
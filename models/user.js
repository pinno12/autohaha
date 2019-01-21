'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    authId: DataTypes.STRING,
    displayName: DataTypes.TEXT('tiny'),
    email: DataTypes.STRING
  }, {});
  return user;
};
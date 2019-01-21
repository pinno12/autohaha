'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.pin = require('./pin')(sequelize, Sequelize);
db.giftcard = require('./giftcard')(sequelize, Sequelize);
db.orderedItem = require('./orderedItem')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);

db.pin.belongsTo(db.giftcard, { foreignKey: 'giftcardId', sourceKey: 'id' });
db.pin.belongsTo(db.orderedItem, { foreignKey: 'orderedId', sourceKey: 'id' });
db.pin.belongsTo(db.user, { foreignKey: 'userId', sourceKey: 'id' });

module.exports = db;
// C:\Bitnami\wampstack-7.1.24-0\mysql\bin
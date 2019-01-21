module.exports = function () {
  const env = process.env.NODE_ENV || 'development';
  const config = require(__dirname + '/../database.json')[env];
  var mysql = require('mysql');
  var conn = mysql.createConnection(config);
  conn.connect();
  return conn;
}
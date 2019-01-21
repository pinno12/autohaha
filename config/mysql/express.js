module.exports = function () {
  var express = require('express');
  var session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  var bodyParser = require('body-parser');
  var app = express();
  app.set('views', './viewsHAHA/mysql/');
  // app.set('views', './viewsHAHA/');

  app.set('view engine', 'ejs');
  // app.use(express.static(__dirname + '/public'));
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: 'hahagift.cpolv2t5xh1j.ap-northeast-2.rds.amazonaws.com',
      user: 'hahagift',
      password: 'hahahaha',
      database: 'haha_manage'
    })
  }));


  return app;
}
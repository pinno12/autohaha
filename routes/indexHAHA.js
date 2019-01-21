var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexHAHA', { title: '하하 관리자 페이지' });

});



module.exports = router;

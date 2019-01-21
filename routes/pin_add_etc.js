var express = require('express');
var router = express.Router();


// router.get('/pin_etc', function(req, res) {
//   res.render('pin_etc');
// });
router.get('/', function(req, res, next) {
  res.render('indexHAHA', { title: '하하 관리자 페이지' });
next();
});

module.exports = router;
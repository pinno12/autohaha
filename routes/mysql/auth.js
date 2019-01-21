module.exports = function(passport){
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();
  var conn = require('../../config/mysql/db')();  
  var route = require('express').Router();
  route.post(
    '/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/pin',
        failureRedirect: '/auth/login',
        failureFlash: false
      }
    )
  );
  
route.get('/login', (req,res)=>{
    res.render('auth/login', {user:req.user, title: "로그인해요"})
  });
  

  route.get('/logout', function(req, res){
    req.logout();
    req.session.save(function(){
    res.redirect('/auth/login');
    });
  });
  
return route;

} 
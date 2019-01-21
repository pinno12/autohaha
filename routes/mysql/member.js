var express = require('express');
var router = express.Router();
var conn = require('../../config/mysql/db')();
 
router.get('/member', (req,res)=>{
    var sql = 'SELECT id, authId, displayName, email FROM users';
    conn.query(sql, function(err, members, fields){
        var sql = 'SELECT * FROM users WHERE id=?';
            if(err){
              console.log(err);
              res.status(500).send('Internal Server Error');
             
        } else{
            res.render('pin/member',{members: members, member:0, title: "회원 보기",user:req.user});
        }
      
    }); 
  });
  
module.exports = router;

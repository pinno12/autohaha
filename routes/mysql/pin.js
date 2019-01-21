
module.exports = function(){
  var route = require('express').Router();
  var conn = require('../../config/mysql/db')();
 
  route.get('/pin_add_etc', (req,res)=>{
    var sql = 'SELECT id, name,pin_number, price, giftcardId, order_id, date FROM pin';
    conn.query(sql, function(err, pins, fields){
    res.render('/pin/pin_add_etc', {user:req.user})
  });
  });
  
  route.post('/pin_add_etc', (req,res)=>{
    var name = req.body.name;
    var giftcardId = req.body.giftcardId;
    var price = req.body.price;
    var pin_number = req.body.pin_number;
    var pin_numbers = pin_number.split('\n');
    var sql = 'INSERT INTO pin(name, giftcardId, price, pin_number) VALUES (?,?,?,?)';
    for (var i =0; i<pin_numbers.length; i++){
      conn.query(sql, [name,giftcardId, price, pin_numbers[i]], function (err, result, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal server error');
        } 
      })};
      res.redirect('/pin/'+result.insertId);
    });



route.get(['/','/:id'], (req,res)=>{
  var sql = 'SELECT id, name,pin_number, price, giftcardId, order_id, date FROM pin';
  conn.query(sql, function(err, pins, fields){
    var id = req.params.id;
    if(id){
        var sql = 'SELECT * FROM pin WHERE id=?';
        conn.query(sql, [id], function(err, pin, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
            } else {
              res.render('pin/indexHAHA', {pins: pins, pin: pin[0], title: "헤헤",user:req.user} );
            }
        });
      } else{
          res.render('pin/indexHAHA',{pins: pins, pin:0, title: "하하 관리자페이지",user:req.user});
      }
    });
    
}); 



route.get(['/:id/edit'], (req,res)=>{
  var sql = 'SELECT id, name,pin_number, price, giftcardId, order_id, date FROM pin';
  conn.query(sql, function(err, pins, fields){
    var id = req.params.id;
    if(id){
        var sql = 'SELECT * FROM pin WHERE id=?';
        conn.query(sql, [id], function(err, pin, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
            } else {
              res.render('pin/edit', {pins: pins, pin: pin[0], title: "헤헤",user:req.user} );
            }
        });
      } else{
        console.log('ID가 없습니다');
        res.status(500).send('Internal Server Error');
          }
    });  
}); 
route.post(['/:id/edit'], (req,res)=>{
  var name = req.body.name;
  var giftcardId = req.body.giftcardId;
  var price = req.body.price;
  var pin_number = req.body.pin_number;
  var id = req.params.id;
  var sql = 'UPDATE pin SET name =?, giftcardId =?, price =?, pin_number =? WHERE id =?';
  conn.query(sql, [name, giftcardId, price, pin_number,id], (err, result, fields)=>{
    if(err){
      console.log(err);
      res.status(500).send('Internal server error');
    } else{
      // res.send(result);
      res.redirect('/pin/' + id);
    }
  });
});

route.get('/:id/delete', (req,res)=>{
  var sql = 'SELECT id, name,pin_number, price, giftcardId, order_id, date FROM pin';
  conn.query(sql, function(err, pins, fields){
    var sql = 'SELECT * FROM pin WHERE id=?';
    var id = req.params.id;
    conn.query(sql, [id], (err, pin)=>{
      if(err){
        console.log(err);
        res.status(500).send('Internal server error');
      } else{
        if(pin.length ===0){
          console.log("Id가 없음");
          res.status(500).send('Internal server error');
        } else{
          // res.send(pin);
          res.render('pin/delete', {pins: pins, pin: pin[0], title: "헤헤",user:req.user})
        }
      }
    });
});
});




route.post('/:id/delete', (req,res)=>{
  var id=req.params.id;
  var sql= 'DELETE FROM pin WHERE id =?';
  conn.query(sql, [id], (err,result)=>{
    res.redirect('/pin/');
  })
});
  return route;
}

var app = require('./config/mysql/express')();
var methodOverride = require('method-override');
var passport = require('passport');
var auth = require('./routes/mysql/auth')(passport);
var conn = require('./config/mysql/db')();
const Sequelize = require('sequelize'), Op = Sequelize.Op;
var pin = require('./routes/mysql/pin')();
const memberRouter = require('./routes/mysql/member');
var loggerRouter = require('./routes/log');
const models = require('./models');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
app.use(methodOverride('_method'));
app.use('/auth', auth);
app.use('/pin', pin);
app.get('/member', memberRouter);
app.get('/add', (req,res)=>{
  models.giftcard.findAll({})
  .then (giftcards => {          
    res.render("add",{
      user: "누구냐넌",
      //   req.user
      title: "등록해요",
      giftcards: giftcards
    });
  });
});
app.get('/login', (req,res)=>{
  res.render('auth/login', {user:req.user, title: "로그인해요"})
});
app.get('/', (req,res,next)=>{
  res.redirect('auth/login');
})

// app.get('/log', loggerRouter);
// find blogs belonging to one user or all blogs
// app.get('/show/:userId?', (req, res) => {
//   let query;
//   if(req.params.userId) {
//       query = post.findAll({ include: [
//           { model: User, where: { id: req.params.userId } },
//           { model: Tag }
//       ]})
//   } else {
//       query = Blog.findAll({ include: [Tag, User]})
//   }
//   return query.then(blogs => res.json(blogs))
// })
app.get("/show/orSearch", function(req, res, next) {
  let limit = 7;
  let offset = 0;
  let searchWord = req.query.userId;
  let searchWord2 = req.query.searchkeyword2;
  let startDate = req.query.startdate;
  let page = req.query.page;
  if (!page){page=1;}  
  let koreanstartDate = new Date(startDate);  
  let endDate = req.query.enddate;
  endDate = new Date(endDate);  
  endDate.setDate(endDate.getDate()+1);  
  
  models.pin.findAndCountAll({
    where:{
      [Op.and]: [
        {
          userId: {
            [Op.like]: "%" + searchWord + "%"
          }
        },
        {
          memo: {
            [Op.like]: "%" + searchWord2 + "%"
          }
        },
        {
          createdAt: {gte: koreanstartDate} ,
          createdAt: {lt: new Date(endDate)}
        }           
      ]
    },
    order:[
      [ 'updatedAt', 'DESC']
    ],
    limit: limit,
    offset: limit * (page -1),
    $sort: {id:1},
  })
  .then (result=> {
    models.user.findAll({})
    .then (users =>{
      let pages = Math.ceil(result.count / limit);      
      console.log(result.count);
      console.log(result.rows);
      res.render("show",{
        startDate: startDate,
        endDate: endDate,
        searchWord: searchWord,
        searchWord2: searchWord2,
        pins: result.rows,
        pages: pages,              
        count: result.count,
        title: "검색",
        users: users,
        user: "임의"        
      });          
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
  
})
app.get('/show/:page', function(req, res, next) {
  let limit = 7;
  let offset = 0;
  let page = req.params.page;
  models.pin.findAndCountAll({
  })
  .then((data) => {      
    let pages = Math.ceil(data.count / limit);
    offset = limit * (page -1);
    console.log(data.count);
    models.pin.findAll({       
      order:[
        [ 'updatedAt', 'DESC']
      ],
      //attributes: ['id', 'price','pin_number','pin_number2','userId','memo','Isordered','updatedAt', 'giftcardId'],
      limit: limit,
      offset: offset,
      $sort: {id:1}
    })
    .then ((pins)=> {
      models.user.findAll({})
      .then (users =>{
        models.giftcard.findAll({})
        .then (giftcards => {          
          res.render("show",{
            pins: pins,
            users: users,
            giftcards: giftcards,
            pages: pages,              
            count: data.count,
            title: "하하상품권 자동 발송",
            user: "임의"
          })
        });
      })
    });    
  })  
  .catch((err) => {
    res.status(500).send('Internal Server Error');
  });
})
app.get('/show/', (req,res)=>{
  res.redirect('/show/1');
})

app.get('/privacy', (req,res) => {
	res.render('privacy_policy_haha', {title: "개인정보처리방침", user:"임의"});
})
app.post('/create_pin', function(req, res, next) {
  const hyphen = /-/gi;
  let body = req.body;
  let price = body.inputPrice;
  let pins1 = body.inputPin_number.replace(hyphen,"").split('\n');
  let pins2 = body.inputPin_number2.replace(hyphen,"").split('\n');
  let memo = body.inputMemo;
  let giftcardId = body.giftcardId;
  let userId = 1;

	console.log("input 완료");
  //req.user.id
  for (var i =0; i<pins1.length; i++){
    models.pin.create({
      price: price,
      pin_number: pins1[i],
      pin_number2: pins2[i],
      memo: memo,
      giftcardId: giftcardId,
      userId: userId
    })
    .then( res => {
      console.log("데이터 추가 완료");          
    })
    .catch( err => {
      res.send();
      console.log("데이터 추가 실패");
      res.send("입력란에 문제가 있습니다:<");
    })
  }
//res.render("/show");
  res.redirect("/show");
});
app.get('/edit_pin/:id', function(req, res, next) {
  let pinID = req.params.id;
  
  models.pin.find({
    where: {id: pinID}
  })
  .then( result => {
    models.giftcard.findAll({})
    .then (giftcards => {
    res.render("edit_pin", {
	    title: "수정해요",
	    user: 1,
      pin: result,
      giftcards: giftcards
    });
  })
})
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});
app.put('/update_pin/:id', function(req, res, next) {
  let pinID = req.params.id;
  let body = req.body;  
  models.pin.update({
    userId: body.edituserId,
    price: body.editPrice,
    pin_number: body.editPin_number,
    pin_number2: body.editPin_number2,
    memo: body.editMemo,
    giftcardId: body.giftcardId
  },{
    where: {id: pinID}
  })
  .then( result => {
    console.log("데이터 수정 완료");
    res.redirect("/show/1");
  })
  .catch( err => {
    console.log("데이터 수정 실패");
    console.log(err);
  });
});
app.delete('/delete_pin/:id', function(req, res, next) {
  let pinID = req.params.id;
  
  models.pin.destroy({
    where: {id: pinID}
  })
  .then( result => {
    console.log("데이터 삭제함");
    res.redirect("/show")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

app.get('/money',(req,res)=>{
  res.render('pin/money')
});
models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공")
}).catch(err => {
  console.log("연결 실패")
  console.log(err)
})
app.listen(3000, function () {
  console.log('HaHa Admin page is listening on port 3000');
});




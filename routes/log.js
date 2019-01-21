
const express = require('express');
const router = express.Router();

var morgan = require('morgan');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var path = require('path');


//morgan
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
router.use(morgan('combined', { stream: accessLogStream }))

router.get('/log',(req,res)=> { 
  
  fs.readFile('./routes/access.log', (err, description) => {
    if (err) {
      console.error(err)
      return
    }
    var sanitizedDescription = sanitizeHtml(description, {
      allowedTags:['h1'] 
    });
    
    res.render('pin/log',{logs:sanitizedDescription} )
  
    });
  });

module.exports = router;
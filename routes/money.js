const mysql= require('mysql');
const express = require('express');
const router = express.Router();

router.get('/money', (req,res,next)=>{
    res.direct('http://google.co.kr');
})



module.exports = router;
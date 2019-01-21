const mysql= require('mysql');
const express = require('express');
const router = express.Router();

router.get('/login', (req,res,next)=>{
    res.render('login', { title: 'haha 관리자 페이지' });
})

module.exports = router;
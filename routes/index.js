const express = require('express');
const request = require('request'); //설치
const rp = require('request-promise'); //설치
const cheerio = require('cheerio'); //설치
const Iconv = require('iconv').Iconv; //설치
//const iconv = require('iconv-lite');

const iconv = new Iconv('EUC-KR', 'utf-8//translit//ignore');
const phantom = require('phantom');
const jsdom = require('jsdom'), { JSDOM } = jsdom; //설치
//const $ = require('jquery');
const Horseman = require('node-horseman'),  //설치
    horseman = new Horseman({
        loadImages:false,
        injectJquery:true,
        injectBluebird:true,
        webSecurity: true,
        ignoreSSLErrors: true
    });
const router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {

    var _ph, _page, _outObj;

    // phantom
    //     .create(['--ignore-ssl-errors=yes', '--load-images=no'])
    //     .then(ph => {
    //         _ph = ph;
    //         return _ph.createPage();
    //     })
    //     .then(page => {
    //         _page = page;
    //         return _page.open('https://nid.naver.com/nidlogin.login');
    //     })
    //     // .then(status => {
    //     //     console.log(status);
    //     //     return _page.evaluate(function(){
    //     //         document.getElementById('id').value = 'kreyzi';
    //     //         document.getElementById('pw').value = 'kreyzi';
    //     //     });
    //     // })
    //     .then( function() {
    //         _page.evaluate(function(s){
    //             return document.querySelector(s).innerText;
    //         });
    //     })
    //     .then(content => {
    //         console.log(content);
    //         res.send(content);
    //         _page.close();
    //         _ph.exit();
    //     })
    //     .catch(e => console.log(e));

    phantom
        .create(['--ignore-ssl-errors=yes', '--load-images=no'])
        .then(ph => {
            console.log("startSubscribe");
            _ph = ph;
            _outObj = _ph.createOutObject();
            _outObj.urls = [];
            return _ph.createPage();
        })
        .then(page => {
            _page = page;

            _page.setting("loadImages",false);
            _page.setting("resourceTimeout",4000);
            console.log("trying on resource");
            // _page.on('onResourceRequested',true, function (requestData, networkRequest,_outObj, regex) {
            //     if (new RegExp(regex, 'ig').test(requestData.url)) {
            //         request.abort();
            //         _outObj.urls.push(requestData.url)
            //     }
            // },_outObj, regex);
            _page.on("onConsoleMessage", function (msg) {
                //ignore the trash coming from the page
                //console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
                console.log('CONSOLE: '+msg);
            });
            _page.on("onError", function (error) {
                //ignore the trash coming from the page
                console.log('ERROR: '+error);
            });
            _page.on("onAlert", function (alert) {
                //ignore the trash coming from the page
                console.log('ALERT: '+alert);
            });

            _page.on('onLoadFinished', function(status){
                console.log('finish: '+status);
            });

            return _page.open('https://www.naver.com');
        })
        .then(function(){
            return _page.evaluate(function() {
                //document.querySelector(ss).innerHTML;
                // document.getElementById('id').value = 'kreyzi';
                // document.getElementById('pw').value = 'kreyzi';
                // document.querySelector('#account').getElementsByTagName('a')[0];

                document.querySelector('#account').getElementsByTagName('a')[0].click();
            });
            //return _page.property('plainText');
        })
        .then(function(){
            // return _page.evaluate(function() {
            //     console.log(document.querySelector('#pw').value);
            //
            //     document.querySelector('#frmNIDLogin').submit();
            // });
            //return _page.property('plainText');
        })
        .then(function(){
            return _page.evaluate(function() {
                // console.log(document.documentElement.innerHTML);
                console.log("url:"+document.URL);
            });
            //return _page.property('plainText');
        })
        .then(html => {
            //do something with the urls
            //console.log(html);
            _page.close();
            _ph.exit();
        })
        .catch(e => console.log(e));
});

router.get('/scrap', function(req,res){
    let cookies;
    let contentItems = [];

    //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15
    horseman
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('https://login.11st.co.kr/login/Login.tmall')
        .type('input[id="loginName"]', 'papinugen')
        .type('input[id="passWord"]', '!@12qwas')
        .click('.btn_login')
        .waitForNextPage()
        .open('https://soffice.11st.co.kr/escrow/OrderingLogistics.tmall')
        //.click('em#order_good_202_em')
        .click('em#order_good_301_em')
        .wait(3000)
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid').click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .click('#jqxScrollBtnDownhorizontalScrollBardataGrid')
        .wait(1000)
        .screenshot(__dirname+'/../screenshot/image2.png')
        .html()
        .then(function(html) {
            let $ = cheerio.load(html);
            let content = $('#contenttabledataGrid>div');

            $(content).each(function (index, domEl) {

                let tempArray =[];
                let itemsArray = $(domEl).children();
                $(itemsArray).each(function(index, elem){
                    let info = $(elem).text();
                    tempArray.push(info);
                    if(index>21){
                        return false;
                    }
                });

                contentItems.push({
                    status : tempArray[1],
                    orderNo: tempArray[2],
                    checkDate : tempArray[4],
                    productName : tempArray[8],
                    productOption : tempArray[10],
                    quantity : tempArray[11],
                    amount : tempArray[12],
                    name : tempArray[19],
                    phone : tempArray[20]
                })
            });


            //
            //
            // })
            console.log(contentItems);
        })
        .close();


});

horseman
    .on('consoleMessage', function( msg ){
        console.log(msg);
    });

horseman
    .on('urlChanged', function( url ){
        console.log("TargetUrl : "+ url);
    });

module.exports = router;

var express = require('express');
var request = require('request');
var http = require('http');
var zlib = require('zlib'); 
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 
  var country = req.query.q;

  //"https://www.googleapis.com/customsearch/v1?key=<span class="apiparam">AIzaSyDf017IJEoDpmn43808u_PrGqX6798oT-4</span>&amp;cx=017576662512468239146:omuauf_lfve&amp;q=address&amp;callback=hndlr">
//https://www.googleapis.com/customsearch/v1?key=AIzaSyBroTaR4omJwO2LulOOBVROP5RpiuZQzMo&cx=004851261849501453188:0dnyghjxens&q='+ country
  request('https://www.googleapis.com/customsearch/v1?key=AIzaSyBroTaR4omJwO2LulOOBVROP5RpiuZQzMo&cx=004851261849501453188:0dnyghjxens&q='+ country , function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('success');
        var sr = JSON.parse(body);
        //console.log(sr);
        var results = sr.items.map(function(ele){
            var search_ele = {
                "title":ele.title,
                "link":ele.link
            };
            return search_ele
        });


        res.render('search',{"results":results});

      }else{
        console.log('error');
        res.json(error);
      }
   });
  
  /*
  console.log(country);
  console.log(req.headers);
  //"user-agent":"Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"

  var options = { 
    method: 'GET',
    url: 'http://www.google.com/search',
    qs: { q: country},
          //url: https://www.facebook.com/hashtag/query
 
    headers: 
        { 
            'host': 'www.google.com',
            'connection': 'keep-alive',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/          /*;q=0.8',
            'user-agent': 'Mozilla/5.0  AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56',
            'upgrade-insecure-requests': '1',
            'cookie': 'gsScrollPos=',
            'cache-control': 'max-age=0',
            'Content-Type': 'text/html; charset=utf-8', 
            'accept-encoding': 'gzip, deflate, sdch',
            'accept-language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4,ja;q=0.2,zh-CN;q=0.2',
         } 
   };
    
  request.get(options)
         .on('response', function(response) {
                var encoding = response.headers['content-encoding'];
                if (encoding == 'gzip') {
                  //res.writeHead(200, { 'content-encoding': 'gzip' });  
                  response.pipe(zlib.createGunzip()).pipe(res);

                } else if (encoding == 'deflate') {
                  //res.writeHead(200, { 'content-encoding': 'deflate' });
                  response.pipe(zlib.createInflate()).pipe(res);
                  
                } else {
                  //res.writeHead(200, {});
                  response.pipe(res);
                  //cb(outStream);
                }
            })
            .on('error', function(err) {

                console.log(err);
            })
            .on('end',function(){
                //console.log("end");
               setTimeout(function() {
                    console.log("down");

               },10);
                
            });
    */

});






module.exports = router;

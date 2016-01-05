var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

router.get('/',function(req,res,next){

       
      
      fs.readFile('./tmp/data.txt',"utf-8",function(err,data){
          if(err){
            //console.log(err);
            res.json(err);
          }else{
            //console.log(data);
            var not_find_country = true;

            var ocr_result = data;

            

            var getError = function(){
              var errorData = {"word": ocr_result};
              res.status(404);
              res.render('ocrError', errorData);
            };

            var getSuccess = function(){
              var resultData = {"country":ocr_country};
              res.status(200);
              res.render('ocr',resultData);

            };


            console.log(ocr_result.indexOf('T0'));
            if(ocr_result.indexOf('T0')!== -1){
              //找到T0=>第一種機票的條件
              var ocr_des = ocr_result.substring(ocr_result.indexOf('T0')+2,ocr_result.length);
              //console.log(ocr_des);
              var ocr_space = ocr_des.indexOf(' ');
              var ocr_country = ocr_des.substring(ocr_space,ocr_des.indexOf('/'));
              getSuccess();

            }else{
              getError();


            }


          }

      }); 

});







/*

router.put('/', function(req, res, next) {
  
  var formData = {
    // Pass a simple key-value pair
    apikey: 'a0adbea53b98335a',
    
    // Pass data via Buffers
    //my_buffer: new Buffer([1, 2, 3]),
    // Pass data via Streams

    file: fs.createReadStream('./tmp/uploadtmp.png'),
    // Pass multiple values /w an Array
    
    // attachments: [
    //  fs.createReadStream(__dirname + '/attachment1.jpg'),
    //  fs.createReadStream(__dirname + '/attachment2.jpg')
    // ],
    // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
    // Use case: for some types of streams, you'll need to provide "file"-related information manually.
    // See the `form-data` README for more information about options: https://github.com/form-data/form-data
    // custom_file: {
    //  value:  fs.createReadStream('/dev/urandom'),
    //  options: {
    //    filename: 'topsecret.jpg',
    //    contentType: 'image/jpg'
    //  }
    // }
    
  };
  /*
  var body = {"error":0,"result":"FROM: HONG KONG\/HKG\nT0: TAIPEI\/TPE","filename":"tmp.png","language":"eng","width":257,"height":65};
  
      console.log(body.error);
      console.log(typeof(body));
      console.log(Array.isArray(body));
      console.log(JSON.stringify(body));
      console.log(body);
      console.log(body.error);
  
  //console.log('Upload successful!  Server responded with:', formData);
  //formData.txt = 'Upload successful!  Server responded with:';
  //res.json(formData);
  
  
  request.post({url:'http://www.bitocr.com/api', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }else{
      try{
        var ocrdata = JSON.parse(body);
        console.log(typeof(ocrdata));
        console.log(Array.isArray(ocrdata));
        console.log(ocrdata);
        console.log(ocrdata.error);
        if(ocrdata.error !== 0){
          console.log('Oops,cannot find word:', ocrdata);
          res.render('ocrerror', { title: 'OcrError' });

        }else{
          console.log('Upload successful!  Server responded with:', ocrdata);
          res.json(ocrdata);

        }


      }catch(error){
        return console.error('upload failed error:', error);
      }

      

    }

  });


  

  //res.render('ocr', { title: 'OCR' });




});

*/


module.exports = router;
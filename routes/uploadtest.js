var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var request = require('request');
var path = require('path');


router.get('/',function(req,res,next){
    res.render('upload');
});

router.post('/', function(req, res, next) {
    //console.log(req);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        
        console.log(fields);
        console.log(files);
        var formData = {
            'apikey': 'a0adbea53b98335a',

            'file': files.file,
        };

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
                                  
                                  //{ error: 0,
                                  //  result: 'FROM: HONG KONG/HKG\nT0: TAIPEI/TPE',
                                  //  filename: 'uploadtmp.png',
                                  //  language: 'eng',
                                  //  width: 257,
                                  //  height: 65 
                                  //}
  
                                  var ocr_result = ocrdata.result;

                                  console.log(ocr_result.indexOf('T0'));

                                  var ocr_des = ocr_result.substring(ocr_result.indexOf('T0')+4,ocr_result.length);
                                  ocr_des = ocr_des.substring(0,ocr_des.indexOf('/'));
                                  console.log(ocr_des);

                                  res.json(ocr_des);


                                }


                              }catch(error){
                                return console.error('upload failed error:', error);
                              }          

                            }

         });
        
    });
    

});

module.exports = router;

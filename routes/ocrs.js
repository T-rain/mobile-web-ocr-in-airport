var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

router.get('/', function(req, res, next) {
  
  var formData = {
    // Pass a simple key-value pair
    apikey: 'ef63ff42fa383abe',
    
    // Pass data via Buffers
    //my_buffer: new Buffer([1, 2, 3]),
    // Pass data via Streams

    file: fs.createReadStream('./tmp/tmp.png'),
    // Pass multiple values /w an Array
    /*
    attachments: [
      fs.createReadStream(__dirname + '/attachment1.jpg'),
      fs.createReadStream(__dirname + '/attachment2.jpg')
    ],
    // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
    // Use case: for some types of streams, you'll need to provide "file"-related information manually.
    // See the `form-data` README for more information about options: https://github.com/form-data/form-data
    custom_file: {
      value:  fs.createReadStream('/dev/urandom'),
      options: {
        filename: 'topsecret.jpg',
        contentType: 'image/jpg'
      }
    }
    */
  };
  request.post({url:'http://www.bitocr.com/api', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }else{
      console.log('Upload successful!  Server responded with:', body);
      res.json(httpResponse);

    }

  });

  //res.render('ocr', { title: 'OCR' });
});




module.exports = router;
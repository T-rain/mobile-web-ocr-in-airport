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
        
        var old_path = files.file.path,
            file_size = files.file.size,
            file_ext = files.file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            //new_path = path.join(process.env.PWD, '/tmp/', file_name + '.' + file_ext);
            new_path = path.join(process.env.PWD,'/tmp/uploadtmp.png');

        console.log(process.env.PWD);
        console.log(new_path);
        
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        
                        var formData = {
                            apikey: 'a0adbea53b98335a',
    
                            file: fs.createReadStream('./tmp/uploadtmp.png'),
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
                                  res.render('ocrError');

                                }else{
                                  console.log('Upload successful!  Server responded with:', ocrdata);
                                  
                                  //{ error: 0,
                                  //  result: 'FROM: HONG KONG/HKG\nT0: TAIPEI/TPE',
                                  //  filename: 'uploadtmp.png',
                                  //  language: 'eng',
                                  //  width: 257,
                                  //  height: 65 
                                  //}
                                  var writeStream = fs.createWriteStream('./tmp/data.txt');
                                  writeStream.write(ocrdata.result);
                                  writeStream.end(function () {
                                   res.render('main',{}); 
                                  });
                                  //fs.createWriteStream('./tmp/uploadtmp.png');

                                }


                              }catch(error){
                                return console.error('upload failed error:', error);
                              }          

                            }

                        });
                        


                    }
                });
            });
         });
        
        

        //res.json(files);
        
    });
    

});

module.exports = router;

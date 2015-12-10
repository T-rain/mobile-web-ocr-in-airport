var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/',function(req, res, next){

    var base64Data = req.body.dataURI;


    var ext = base64Data.split(",")[0];
    var data = base64Data.split(",")[1];


    //console.log(req.body.dataURI);
    
    var dataBuffer = new Buffer(data, 'base64');
        fs.writeFile("./tmp/tmp.png", dataBuffer, function(err) {
            if(err){
                console.log(err);
                res.json(err);
            }else{
                console.log("success");
                //res.send會有xhr錯誤

                res.json("保存成功！");
            }
    });
    
    //res.json(data);

});





//

router.post('/upload', function(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        /*
        var old_path = files.file.path,
            file_size = files.file.size,
            file_ext = files.file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/tmp/', file_name + '.' + file_ext);
            console.log(process.env.PWD);
            console.log(new_path);
        
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        res.status(200);
                        res.json({'success': true});
                    }
                });
            });
        });
        */
        console.log(fields);
        console.log(files);
        res.json(fields);
        
    });

});


module.exports = router;

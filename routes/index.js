var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*
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
*/

module.exports = router;

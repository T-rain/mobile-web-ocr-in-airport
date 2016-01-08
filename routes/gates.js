var express = require('express');
var router = express.Router();
var fs = 

/* GET users listing. */
router.get('/', function(req, res, next) {
    var gate = req.query.q;
    if(gate){
        //"notfound","imgurl"
        var gateMenu = {
                        "A1":"https://i.imgur.com/ElBJ9tv.png",
                        "A2":"https://i.imgur.com/YmqQaIi.png",
                        "A3":"https://i.imgur.com/o7X3Wnc.png",
                        "A4":"https://i.imgur.com/ZltiktQ.png",
                        "A5":"https://i.imgur.com/za7kyqf.png",
                        "A6":"https://i.imgur.com/NoDtwmn.png",
                        "A7":"https://i.imgur.com/m9ABr3w.png",
                        "A8":"https://i.imgur.com/hivfJuN.png",
                        "A9":"https://i.imgur.com/Bi9JWya.png",
                        "B1":"https://i.imgur.com/bvAEMmB.png",
                        "B2":"https://i.imgur.com/5jIKKhU.png",
                        "B3":"https://i.imgur.com/EnmBdeX.png",
                        "B4":"https://i.imgur.com/X9By1w7.png",
                        "B5":"https://i.imgur.com/jnkvTMh.png",
                        "B6":"https://i.imgur.com/ZWWxLAB.png",
                        "B7":"https://i.imgur.com/LBv7Zje.png",
                        "B8":"https://i.imgur.com/ATuIdnC.png",
                        "B9":"https://i.imgur.com/KEG1T4u.png"
                        };

        var gateInfo = {
          "gate":gate,
          "imgurl": "http://i.imgur.com/ZNVXzwg.png",
          "notfound":1
        };

        if(gateMenu.hasOwnProperty(gate)){

          gateInfo.imgurl = gateMenu[gate];
          delete gateInfo.notfound;       
        }

        res.render('gate',gateInfo);

        
    }else{
        res.json("Gate Error");
    }
    

});

module.exports = router;

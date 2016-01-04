var express = require('express');
var router = express.Router();

/* 
router.get('/', function(req, res, next) {
    var country = req.query.q;
    if (country) {
        //var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + country + '")';
        

        
        var yquery = new YQL(query);
        yquery.exec(function(err, data) {
            if (err) {
                //res.status(404);
                res.json("NotFound");
            } else {
                var location = data.query.results.channel.location;
                var condition = data.query.results.channel.item.condition;
                //console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
                //console.log(data);
                //res.status(200);
                //res.json(data);
                res.json('The current weather in ' + location.city + ', ' + location.region + ', ' + location.country + ' is ' + condition.temp + ' degree Fahrenheit.');

            }

        });
    } else {
        res.json("NotFound");
    }

});
*/


router.get('/', function(req, res, next) {
    var country = req.query.q;
    if(country){
        res.render('weather',{"country":country});
    }else{
        res.json("Weather Error");
    }
    

});

module.exports = router;

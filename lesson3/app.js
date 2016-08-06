var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next){
    superagent.get('https://cnodejs.org').end(function(err, sres) {
        if(err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function(idx, elem) {
            var $elem = $(elem);
            items.push({
                title: $elem.attr('title'),
                href: $elem.attr('href')
            });
        });
        res.send(items);
    });

});

app.listen(3003, function(){
    console.log('app is listening at port 3003');
});
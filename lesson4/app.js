var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org';

superagent.get(cnodeUrl).end(function (err, sres) {
    if (err) {
        return console.error(err);
    }
    var $ = cheerio.load(sres.text);
    var topicUrls = [];
    $('#topic_list .topic_title').each(function (idx, elem) {
        var $elem = $(elem);
        var href = url.resolve(cnodeUrl, $elem.attr('href'));
        topicUrls.push(href);
    });

    var ep = new eventproxy();
    ep.after('topic_html', topicUrls.length, function(topics) {
        topics = topics.map(function (topicPair) {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim()
            });
        });
        console.log('final:');
        console.log(topics);
    });

    topicUrls.forEach(function (url) {
        superagent.get(url).end(function(err, res){
            console.log('fetch '+ url + ' successful');
            ep.emit('topic_html', [url, res.text]);
        })
    })
});



var request = require('request'), 
    http = require('http'),
    simplexml = require('xml-simple'),
    uuid = require('node-uuid'),
    jsdom  = require('jsdom'),
    crypto = require('crypto'),
    request = require('request'),
    url  = require('url'),
    http = require('http'),
    fs = require('fs'),
    jquery = fs.readFileSync('jquery.js').toString();;


http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'application/json'});

  var url_parts = url.parse(req.url, true),
      query = url_parts.query,
      getFacebookShares,
      getTwitterShares,
      getGooglePlusOnes,
      shareObj,
      init;
  
  if(query.q){

    getFacebookShares = function(url, shareObj){

      request('http://api.facebook.com/restserver.php?method=links.getStats&urls=' +url, function (err, r, body){
        simplexml.parse(body, function(e, parsed) {
          if(parsed !== undefined){
            var fbShares = {
              shares : Number(parsed.link_stat.share_count),
              likes : Number(parsed.link_stat.like_count),
              comments : Number(parsed.link_stat.comment_count)
            };
            shareObj.facebook = fbShares;
            console.log('Facebook Shares', fbShares)
            shareObj.total = shareObj.twitter.count + shareObj.facebook.shares + shareObj.facebook.comments + shareObj.facebook.likes;
            console.log(shareObj)
            res.end(JSON.stringify(shareObj));
          }
        }); // end simplexml.parse
      });

    };

    getTwitterShares = function(url, shareObj){
      request('http://urls.api.twitter.com/1/urls/count.json?url='+url, function (err, res, body){
        if(!err && res.statusCode === 200){
          if(body === 'twttr.receiveCount({"errors":[{"code":48,"message":"Unable to access URL counting services"}]})'){
            getTwitterShares(url, shareObj)
            return
          }

          console.log('Twitter shares', body);
          var tweet = JSON.parse(body),
              tweetCount = {
                count: tweet.count
              };
          
          shareObj.twitter = tweetCount;
          getFacebookShares(url, shareObj);
        }
      });

    }; // end getTwitterShares()

    shareObj = {};

    init = function(){
      getTwitterShares(query.q, shareObj);
    };

    init();

  }else{
    res.end('ERROR! Your request contains no query. Please provide a query like so the following: http://amo.jit.su/?q=http://www.linkToQuery.com');
  }


}).listen(1337, '0.0.0.0');

console.log('Server started...');

let chalk = require('chalk');
let express = require('express');
let router = express.Router(); // eslint-disable-line
let development = require('../config/development');
var request = require('request');
var http = require('http');

console.info(
  chalk.keyword('magenta').italic(
    'EXPRESS ROUTER CONFIG: ', development.TRAD_URL
  )
);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('res: ', res.statusCode);
  res.render('main', {title: 'Express'});
});

router.get('/baidu', function(req, res, next) {
  console.log('req.headers: ', req.headers);
  request('http://sina.com', function(error, response, data) {
    console.log('error: ', error);
    console.log('response: ', response.statusCode);
    console.log('typeof(data): ', typeof(data));
    console.log('data: ', data.length);
    res.send({body: 'body'}) // ??
  })

  // ??
  // var req1 = http.request(new URL('http://sina.com'), function(res) {
  //     // res.setEncoding("utf-8");
  //     // res.on("data", function(chunk) {
  //     //     console.log(chunk.toString())
  //     // });
  //     console.log(res.statusCode);
  // });
  // req1.on("error",function(err){
  //     console.log(err.message);
  // });
  // req1.end();
});

module.exports = router;

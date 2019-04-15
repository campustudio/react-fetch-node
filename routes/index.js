const chalk = require('chalk');
const express = require('express');
const router = express.Router(); // eslint-disable-line
const development = require('../config/development');
const request = require('request');
const http = require('http');
const path = require('path')

console.info(
  chalk.keyword('magenta').italic(
    'EXPRESS ROUTER CONFIG: ', development.TRAD_URL
  )
);

const renderData = {
  title: 'Express',
}

const renderGet = (url, view) => {
  router.get(url, function(req, res, next) {
    console.log('res.statusCode: ', res.statusCode)
    res.render(view, renderData)
  })
}

/* GET home page. */
// renderGet('/', 'main') // this works

router.get('/sina', function(req, res, next) {
  console.log('req.headers: ', req.headers);
  // request('http://sina.com', function(error, response, data) { // works fine
  //   console.log('error: ', error);
  //   console.log('response: ', response.statusCode);
  //   console.log('typeof(data): ', typeof(data));
  //   console.log('data: ', data.length);
  //   res.send({body: 'body'}) // ??
  // })

  // TODO: ?? 500 (Internal Server Error)
  const req1 = http.request(new URL('http://sina.com'), function(res) {
      // res.setEncoding("utf-8");
      // res.on("data", function(chunk) {
      //     console.log(chunk.toString())
      // });
      console.log(res.statusCode);
  });
  // req1.on("error",function(err){
  //     console.log(err.message);
  // });
  // req1.end();
});

// TODO ISSUE: Unexpected token <
// router.get('/*', function(req, res, next) {
router.get('/', function(req, res, next) {
  // console.log('res: ', res.statusCode);
  // res.type('html') // add this, but issue still there
  res.render('main', {title: 'Express'});
  // res.sendFile(path.join(__dirname+'/main.html'));
  // res.sendFile('main.html');
});

module.exports = router;

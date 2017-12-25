let chalk = require('chalk');
let express = require('express');
let router = express.Router(); // eslint-disable-line
let development = require('../config/development');

console.info(
  chalk.keyword('magenta').italic(
    'EXPRESS ROUTER CONFIG: ', development.TRAD_URL
  )
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;

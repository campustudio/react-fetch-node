var chalk = require('chalk');
var express = require('express');
var router = express.Router();
var development = require('../config/development');

console.info(chalk.keyword('magenta').italic('EXPRESS ROUTER CONFIG: ', development.TRAD_URL)); // eslint-disable-line

/* GET home page. */
router.get('/', function(req, res, next) { // eslint-disable-line
  res.render('index', { title: 'Express' });
});

module.exports = router;

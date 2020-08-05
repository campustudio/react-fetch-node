var chalk = require('chalk');
console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: into app.js'));
var express = require('express');
var compression = require('compression');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('cors')
// var cors = require('express-cors')
var index = require('./routes/index');
var users = require('./routes/users');
var excel = require('./routes/excel');
var stl = require('./routes/stl');
var app = express();
app.use(compression());
// app.use(cors())
// app.use(cors({
//   allowedOrigins: [
//       'baidu.com', 'sina.com'
//   ]
// }))

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', index);
app.use('/users', users);
app.use('/excel', excel);
app.use('/stl', stl);

// app.get('*.js', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.contentType(req.path.substr(req.path.lastIndexOf('.')));
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });

// app.get('*.css', function(req, res, next) {
//   req.url = req.url + '.gz';
//   res.contentType(req.path.substr(req.path.lastIndexOf('.')));
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // ?

// app.use(function(req, res) {
//   res.setHeader(
//     'Access-Control-Allow-Origin', '*'
//   )
// })

// app.use(function(req, res) {
//   res.writeHead(200, {
//     'Access-Control-Allow-Origin': 'http://sina.com'
//   })
//   res.end('用CORS跨域成功')
// })

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// app.use(function(req, res, next){
//   //设置跨域访问
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//   if (req.method == 'OPTIONS') {
//       res.send(200); /*让options请求快速返回*/
//   }else {
//       next();
//   }
// })

// last middleware prior error catch
app.use(function(req, res, next) {
  console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: test last middleware prior error catch'));
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: endof app.js'));


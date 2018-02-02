// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');
// const config = require('./webpack.config.dev.js');
// const options = {
//   contentBase: './views',
//   hot: true,
//   host: 'localhost'
// };
// webpackDevServer.addDevServerEntrypoints(config, options);
// const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);
// server.listen(5009, 'localhost', () => {
//   console.log('dev server listening on port 5009');
// });

const express = require('express');
var path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);
// var index = require('./routes/index');
// const historyApiFallback = require('connect-history-api-fallback');

// app.use(historyApiFallback({
//   verbose: false
// }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.dev.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
}));

// app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'main.html'));
});
// app.get('main.*.bundle.js', function(req, res){
//   res.write(webpackDevMiddleware.fileSystem.readFileSync(req.url));
//   res.end();
// });

// app.get('*', function(req, res){
//   res.write(webpackDevMiddleware.fileSystem.readFileSync(path.join(__dirname, 'main.html')));
//   res.end();
// });

// view engine setup
// app.set('views', __dirname);
// app.set('view engine', 'html');
// app.engine('.html', require('ejs').__express);
// app.use('/', index);
// app.use(express.static(__dirname));

// app.use(express.static(__dirname, {
//   index: 'main.html'
// }));

// Serve the files on port 3000.
app.listen(3007, function () {
  console.log('Example app listening on port 3007!\n');
});
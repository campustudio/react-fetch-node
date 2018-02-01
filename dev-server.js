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

const app1 = express();
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);
// var index = require('./routes/index');
// const historyApiFallback = require('connect-history-api-fallback');

// app1.use(historyApiFallback({
//   verbose: false
// }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.dev.js
// configuration file as a base.
app1.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app1.use(require('webpack-hot-middleware')(compiler));

// app1.use('/public', express.static('public'));

app1.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'main.html'));
});
// app1.get('main.*.bundle.js', function(req, res){
//   res.write(webpackDevMiddleware.fileSystem.readFileSync(req.url));
//   res.end();
// });

// app1.get('*', function(req, res){
//   res.write(webpackDevMiddleware.fileSystem.readFileSync(path.join(__dirname, 'main.html')));
//   res.end();
// });

// view engine setup
// app1.set('views', __dirname);
// app1.set('view engine', 'html');
// app1.engine('.html', require('ejs').__express);
// app1.use('/', index);
// app1.use(express.static(__dirname));



// app1.use(express.static(__dirname, {
//   index: 'main.html'
// }));

// Serve the files on port 3000.
app1.listen(3007, function () {
  console.log('Example app listening on port 3007!\n');
});
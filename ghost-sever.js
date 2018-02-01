// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');

// const app1 = express();
// const config = require('./webpack.config.dev.js');
// const compiler = webpack(config);

// // Tell express to use the webpack-dev-middleware and use the webpack.config.dev.js
// // configuration file as a base.
// app1.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// // Serve the files on port 3000.
// app1.listen(3007, function () {
//   console.log('Example app listening on port 3007!\n');
// });

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const options = {
  contentBase: './views',
  hot: true,
  host: 'localhost'
};
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
server.listen(5009, 'localhost', () => {
  console.log('dev server listening on port 5009');
});
const ReactHotLoader = require('react-hot-loader/patch');
const path = require('path')
const jsPath = 'public/javascripts/'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    'main': [
      'react-hot-loader/patch',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join(__dirname, jsPath + 'webpack_entry/main.hot.js')
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:/\.scss$/,
        loader: 'css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: path.join(__dirname, 'views/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  target: 'web'
};
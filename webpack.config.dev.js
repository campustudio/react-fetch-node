const ReactHotLoader = require('react-hot-loader/patch');
const path = require('path')
const jsPath = 'public/javascripts/'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');

// the clean options to use
let cleanOptions = {
  exclude:  ['error.html'],
  verbose:  true,
  dry:      false
}

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  // entry: {
  //   'main': [
  //     'react-hot-loader/patch',
  //     'webpack/hot/dev-server',
  //     'webpack-hot-middleware/client',
  //     path.join(__dirname, jsPath + 'webpack_entry/main.js')
  //   ],
  // },
  entry: {
    'main': path.join(__dirname, jsPath + 'webpack_entry/main.js')
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
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })
      // },
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
    // new CleanWebpackPlugin([ // 看起来在watch的状态下并没有执行，必须得手动执行打包命令才生效，如何优化？
    //   'main.*.bundle.js', 'main.*.css',
    //   'main.*.bundle.js.gz', 'main.*.css.gz',
    // ], cleanOptions),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: path.join(__dirname, 'views/index.html')
    }),
    // new ExtractTextPlugin({
    //   filename: "[name].[contenthash:8].css",
    // }),
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // target: 'web'
};
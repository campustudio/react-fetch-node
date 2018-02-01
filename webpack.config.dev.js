const path = require('path')
const jsPath = 'public/javascripts/'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// the clean options to use
let cleanOptions = {
  root:     path.join(__dirname, jsPath),
  exclude:  ['error.html'],
  verbose:  true,
  dry:      false
}

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    'main': path.join(__dirname, jsPath + 'webpack_entry/main.js'),
  },
  output: {
    path: path.join(__dirname, jsPath + 'build'),
    filename: '[name].[chunkhash:8].bundle.js',
    publicPath: '/javascripts/build/'
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test:/\.less$/,
        use:[
          { loader:'style-loader'},
          { loader:'css-loader'},
          { loader:'less-loader'}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: path.join(__dirname, 'views/index.html')
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new CleanWebpackPlugin([ // 看起来在watch的状态下并没有执行，必须得手动执行打包命令才生效，如何优化？
      'build/main.*.bundle.js', 'build/main.*.css',
      'build/main.*.bundle.js.gz', 'build/main.*.css.gz',
    ], cleanOptions),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
};
const path = require('path')
const jsPath = './public/javascripts/'
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'main': jsPath + 'webpack_entry/main.js',
  },
  output: {
    path: path.join(__dirname, "public"),
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
      template: './views/index.ejs'
    })
  ]
};
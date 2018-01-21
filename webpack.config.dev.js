const path = require('path')
const jsPath = './public/javascripts/'

module.exports = {
  entry: {
    'main': jsPath + 'routes_entry/main.js',
  },
  output: {
    path: path.join(__dirname, jsPath + "build"),
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

  ]
};
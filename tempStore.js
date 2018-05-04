/**
 * webpack.dll.config.js
 */
const webpack = require('webpack')
const path = require('path');
const fePath = '/public/javascripts/front_end/'

module.exports = {
    entry: {
      react_base: [
        'react', 'react-dom', 'react-router', 'antd',
        'redux', 'react-redux', 'react-router-redux',
        'redux-thunk', 'redux-persist'
      ]
    },

    output: {
        path: path.join(__dirname, fePath + 'build'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, fePath + 'build', '[name].manifest.json'),
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false,
            }
        })
    ]
}

/**
 * webpack.config.dev.js
 */
const path    = require('path')
const webpack = require('webpack')
const fePath = './public/javascripts/front_end/'

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    "main": fePath + 'entry/main.js',
    // "buyer": fePath + 'entry/buyer.js'
  },
  output: {
    path: path.join(__dirname, fePath + 'build'),
    filename: "[name].bundle.js",
    publicPath: '/javascripts/front_end/build/',
    chunkFilename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx|ejs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'stage-0', 'react'],
          plugins: [
            ["import", [{ "libraryName": "antd", "style": "css" }]]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(fePath + 'build/react_base.manifest.json')
    })
  ]
}

/**
 * webpack.config.prod.js
 */
const path = require('path')
const webpack = require('webpack')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin') // html目前并不是自动生成的，所以这两个html相关的插件是不是根本就没起作用？
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fePath = './public/javascripts/front_end/'

module.exports = {
  devtool: 'cheap-module-source-map', // minimize the output
  entry: {
    "main": fePath + 'entry/main.js',
    // "buyer": fePath + 'entry/buyer.js'
  },
  output: {
    path: path.join(__dirname, fePath + 'build'),
    filename: "[name].bundle.js", // chunkhash ?
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'stage-0', 'react'], // use reset replace ?
          plugins: [
            ["import", [{ "libraryName": "antd", "style": "css" }]]
          ]
        }
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(fePath + 'build/react_base.manifest.json')
    }),
    new webpack.DefinePlugin({ // build with production flag
      'process.env': {
        'NODE_ENV': JSON.stringify('prod')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        },
        output: {
            comments: false,
        }
    }),
    new webpack.HashedModuleIdsPlugin(), // ?
    new StyleExtHtmlWebpackPlugin({ // ?
      minify: true
    }),
    new ScriptExtHtmlWebpackPlugin({ // ?
      defaultAttribute: 'defer'
    }),
    new PreloadWebpackPlugin({ // ?
      rel: 'preload',
      as: 'script',
      include: 'all',
      fileBlacklist: [/\.(css|map)$/, /base?.+/]
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // merges multiple modules into a single one, will impact results of webpack-bundle-analyzer
    // new BundleAnalyzerPlugin()
  ]
}

//
"teminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"

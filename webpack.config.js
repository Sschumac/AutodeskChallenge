var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './app/build/');
var APP_DIR = path.resolve(__dirname, './app/src/');

var config = {
  entry: APP_DIR + '/Home.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'

  },
  devtool: 'source-map',  
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css?/,
        include: APP_DIR,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  },


};

module.exports = config;

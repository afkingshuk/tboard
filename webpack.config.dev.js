//import path from 'path';
const path = require('path');

//export default {
module.exports = {
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/server/public'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader']
      }
    ]
  },
  // output: {
  //   filename: '[name].js',
  //   path: './dist'
  // },
  resolve: {
    extensions: ['.js']
  }
}
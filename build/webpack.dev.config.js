const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const webpackConfigDev = {
  // 声明开发环境
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../src/pages/'),
    },
    compress: true,
    hot: true,
    open: true,
  },
};

module.exports = webpackMerge.merge(webpackConfig, webpackConfigDev);

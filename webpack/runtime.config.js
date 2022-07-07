const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackConfig = require('./index.config');

const webpackConfigRuntime = {
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

module.exports = (env, argv) => {
  return webpackMerge.merge(webpackConfig(env, argv), webpackConfigRuntime);
};

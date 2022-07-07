const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const webpackConfig = require('./index.config');

const webpackConfigBuild = {
  output: {
    filename: 'js/[name].[fullhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    // 合并文件内css
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[fullhash].css',
    }),
  ],
};

module.exports = (env, argv) => {
  return webpackMerge.merge(webpackConfig(env, argv), webpackConfigBuild);
};

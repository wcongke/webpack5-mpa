const path = require('path');
const glob = require('glob');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const rules = require('./webpack.rules.config');

/**
 * @function 获取入口
 */
function getEntry() {
  const entry = {};
  glob.sync('./src/pages/**/*.ts').forEach(function (name) {
    let start = name.indexOf('src/') + 4;
    let end = name.length - 3;
    let eArr = [];
    let n = name.slice(start, end);
    // 保存各个组件的入口
    n = n.slice(0, n.lastIndexOf('/'));
    n = n.split('pages/')[1];
    eArr.push(name);
    entry[n] = eArr;
  });
  return entry;
}

/**
 * @description 入口对象
 */
const entryObj = getEntry();
/**
 * @description html模板数组
 */
const htmlTemplateArray = [];
// 生成模板
Object.keys(entryObj).forEach((filename) => {
  htmlTemplateArray.push(
    new HtmlWebpackPlugin({
      template: `./src/pages/${filename}/index.html`,
      filename: `${filename.slice(filename.lastIndexOf('/') + 1)}.html`,
      chunks: ['vendor', 'common', filename],
    }),
  );
});

module.exports = {
  mode: 'development',
  entry: getEntry(),
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    ...htmlTemplateArray,
    // 静态资源输出
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/static'),
          to: './static',
        },
      ],
    }),
  ],
  // 优化
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        vendor: {
          // 指定是node_modules下的第三方包
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          // 打包后的文件名，任意命名
          name: 'vendor',
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        // 抽离自己写的公共代码，common这个名字可以随意起
        utils: {
          chunks: 'initial',
          // 任意命名
          name: 'common',
          // 只要超出0字节就生成一个新包
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [...rules],
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
    allowCollectingMemory: true,
  },
};

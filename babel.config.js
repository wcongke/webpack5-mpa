module.exports = {
  presets: [
    [
      '@babel/preset-typescript',
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11',
        },
        useBuiltIns: 'usage', // ‘usage’
        corejs: 3,
      },
    ],
  ],
};

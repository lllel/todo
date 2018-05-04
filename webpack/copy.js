const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function () {
  return {
    plugins: [
      new CopyWebpackPlugin([{
        from: './node_modules/svg4everybody/dist/svg4everybody.js',
        to: './polyfills'
      }]),

      new CopyWebpackPlugin([{
        from: './node_modules/picturefill/dist/picturefill.js',
        to: './polyfills'
      }]),

      new CopyWebpackPlugin([{
        from: './node_modules/babel-polyfill/dist/polyfill.min.js',
        to: './polyfills'
      }])
    ]
  };
};

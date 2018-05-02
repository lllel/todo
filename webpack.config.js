import WebpackCleanupPlugin from 'webpack-cleanup-plugin';
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './source/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname, 'build/js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new WebpackCleanupPlugin()
  ]
};

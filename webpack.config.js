const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const css = require('./webpack/css');
const fileLoader = require('./webpack/file-loader');
const imagemin = require('./webpack/imagemin');

const common = merge([
  {
    entry: {
      app: [
        './source/js/index.js',
        './source/sass/style.scss'
      ]
    },
    output: {
      filename: 'js/bundle.js',
      path: path.join(__dirname, 'build')
    },
    mode: 'none',

    plugins: [
      new CleanWebpackPlugin('build', {
        root: __dirname,
        verbose: true,
        dry: false
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'source') + '/pug/index.pug'
      })
    ],

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader'
        }
      ]
    }
  },

  pug(),
  css(),
  fileLoader()
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      imagemin()
    ]);
  }

  if (env === 'development') {
    return merge([
      common,
      devserver()
    ]);
  }

  return null;
};

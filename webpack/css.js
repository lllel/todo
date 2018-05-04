const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: true
                }
              },

              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer({
                      browsers: ['ie >= 8', 'last 4 version']
                    })
                  ],
                  sourceMap: true
                }
              },

              'sass-loader'
            ],
            publicPath: '../'
          })
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('css/style.css'),
    ],
  };
};

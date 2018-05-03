const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                  minimize: true
                }
              }, 'sass-loader'
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

module.exports = function () {
  return {
    module: {
      rules: [
        // {
        //   test: /\.(jpg|png|svg)$/,
        //   loader: 'file-loader',
        //   options: {
        //     name: 'img/[name].[ext]'
        //   }
        // },

        {
          test: /\.(woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },

        {
          loaders: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },

                  optipng: {
                    optimizationLevel: 3
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false,
                  },

                  webp: {
                    quality: 75
                  }
                }
              },
            ],
          }]
        }
      ]
    }
  };
};

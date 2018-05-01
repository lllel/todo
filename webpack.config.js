const path = require('path');

module.exports = {
  mode: 'none',
  entry: './source/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build/js')
  }
};

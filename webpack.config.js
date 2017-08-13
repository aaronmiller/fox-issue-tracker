const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  entry: [
    './src/js/index.js',
    './src/less/index.less',
    './node_modules/webpack-dev-server/client?http://localhost:1337'
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/bundle.js'
  },

  devtool: 'eval',

  devServer: {
    port: 1337,
    inline: true,
    contentBase: 'src'
  },

  module: {
    rules: [
      {
        test: /\.js?$|\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: 'es2015'
        }
      },

      {
        test: /\.css?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /\.less?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/bundle.css')
  ]
};

module.exports = config;

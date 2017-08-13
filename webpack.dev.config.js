const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    home: [
      './src/js/index/index.js',
      './src/less/index/index.less'
    ],
    signIn: [
      './src/js/sign-in/sign-in.js',
      './src/less/sign-in/sign-in.less'
    ],
    signUp: [
      './src/js/sign-up/sign-up.js',
      './src/less/sign-up/sign-up.less'
    ],
    dashboard: [
      './src/js/dashboard/dashboard.js',
      './src/less/dashboard/dashboard.less'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/[name]/[name].js'
  },

  devtool: 'eval',

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
    new ExtractTextPlugin('css/[name]/[name].css'),
    new HTMLWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Home',
      filename: '../app/views/index/index.html',
      template: 'src/html-templates/index/index.html',
      chunks: ['index']
    }),
    new HTMLWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Sign In',
      filename: '../app/views/sign-in/sign-in.html',
      template: 'src/html-templates/sign-in/sign-in.html',
      chunks: ['signIn']
    }),
    new HTMLWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Sign Up',
      filename: '../app/views/sign-up/sign-up.html',
      template: 'src/html-templates/sign-up/sign-up.html',
      chunks: ['signUp']
    }),
    new HTMLWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Dashboard',
      filename: '../app/views/dashboard/dashboard.html',
      template: 'src/html-templates/dashboard/dashboard.html',
      chunks: ['dashboard']
    })
  ]
};

module.exports = { config };

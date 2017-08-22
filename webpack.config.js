'use-strict';

const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLHarddiskPlugin = require('html-webpack-harddisk-plugin');

const config = {
  entry: {
    global: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      path.join(__dirname, 'src/js/globals/globals.js'),
    ],
    home: path.join(__dirname, 'src/js/index/index.js'),
    signIn: path.join(__dirname, 'src/js/sign-in/sign-in.js'),
    signUp: path.join(__dirname, 'src/js/sign-up/sign-up.js'),
    dashboard: path.join(__dirname, 'src/js/dashboard/dashboard.js'),
    about: path.join(__dirname, 'src/js/about/about.js'),
    logout: path.join(__dirname, 'src/js/logout/logout.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/[name]/[name]-[hash].bundle.js'
  },

  devtool: 'eval',

  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/sass'),
      views: path.resolve(__dirname, 'app/views'),
      image: path.resolve(__dirname, 'src/img')
    }
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },

      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: 'es2015'
        }
      },

      {
        test: /\.(jpe?g|png|svg)$/,
        use: ['file-loader?name=[name].[ext]&outputPath=img/']
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      disable: false,
      filename: 'css/[name]/[name]-[hash].bundle.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Home Page
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | Home',
      filename: '../app/views/index/index.html',
      template: `${__dirname}/src/html-templates/index/index.pug`,
      chunks: ['global', 'home'],
      alwaysWriteToDisk: true
    }),

    // Sign In Page
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | Sign In',
      filename: '../app/views/sign-in/sign-in.html',
      template: `${__dirname}/src/html-templates/sign-in/sign-in.pug`,
      chunks: ['global', 'signIn'],
      alwaysWriteToDisk: true
    }),

    // Sign Up Page
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | Sign Up',
      filename: '../app/views/sign-up/sign-up.html',
      template: `${__dirname}/src/html-templates/sign-up/sign-up.pug`,
      chunks: ['global', 'signUp'],
      alwaysWriteToDisk: true
    }),

    // Dashboard
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | Dashboard',
      filename: '../app/views/dashboard/dashboard.html',
      template: `${__dirname}/src/html-templates/dashboard/dashboard.pug`,
      chunks: ['global', 'dashboard'],
      alwaysWriteToDisk: true
    }),

    // About
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | About',
      filename: '../app/views/about/about.html',
      template: `${__dirname}/src/html-templates/about/about.pug`,
      chunks: ['global', 'about'],
      alwaysWriteToDisk: true
    }),

    // Logout
    new HTMLPlugin({
      title: 'Fox - The Quick Issue Tracker | Logout',
      filename: '../app/views/logout/logout.html',
      template: `${__dirname}/src/html-templates/logout/logout.pug`,
      chunks: ['global', 'logout'],
      alwaysWriteToDisk: true
    }),
    new HTMLHarddiskPlugin()
  ]
};

module.exports = config;

'use-strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    path: path.resolve(__dirname, 'dist'),
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
        use: 'pug-loader'
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
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
        use: 'file-loader?name=[name].[ext]&outputPath=img/'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name]/[name]-[hash].bundle.css',
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Home Page
    new HtmlWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Home',
      filename: 'index.html',
      template: `${__dirname}/src/app/views/home/home.pug`,
      mobile: true,
      hash: true,
      chunks: ['global', 'home'],
      // alwaysWriteToDisk: true
    }),

    // // Sign In Page
    // new HtmlWebpackPlugin({
    //   title: 'Fox - The Quick Issue Tracker | Sign In',
    //   // filename: 'sign-in.html',
    //   template: `${__dirname}/src/app/views/sign-in/sign-in.pug`,
    //   mobile: true,
    //   hash: true,
    //   chunks: ['global', 'signIn'],
    //   // alwaysWriteToDisk: true
    // }),
    //
    // Sign Up Page
    new HtmlWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | Sign Up',
      filename: 'sign-up.html',
      template: `${__dirname}/src/app/views/sign-up/sign-up.pug`,
      mobile: true,
      hash: true,
      chunks: ['global', 'signUp'],
      // alwaysWriteToDisk: true
    }),

    // // Dashboard
    // new HtmlWebpackPlugin({
    //   title: 'Fox - The Quick Issue Tracker | Dashboard',
    //   // filename: 'dashboard.html',
    //   template: `${__dirname}/src/app/views/dashboard/dashboard.pug`,
    //   mobile: true,
    //   hash: true,
    //   chunks: ['global', 'dashboard'],
    //   // alwaysWriteToDisk: true
    // }),
    //
    // About
    new HtmlWebpackPlugin({
      title: 'Fox - The Quick Issue Tracker | About',
      filename: 'about.html',
      template: `${__dirname}/src/app/views/about/about.pug`,
      mobile: true,
      hash: true,
      chunks: ['global', 'about'],
      // alwaysWriteToDisk: true
    }),

    new HTMLHarddiskPlugin()
  ]
};

module.exports = config;

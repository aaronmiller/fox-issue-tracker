'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const bodyParser = require('body-parser');

const app = express();

// Require Webpack Dev Middleware
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');

const compiler = webpack(config);

// Routes
const { home } = require('./src/app/routes/index/index');
const { signIn } = require('./src/app/routes/sign-in/sign-in');
const { signUp } = require('./src/app/routes/sign-up/sign-up');
const { dashboard } = require('./src/app/routes/dashboard/dashboard');
const { about } = require('./src/app/routes/about/about');
const { logout } = require('./src/app/routes/logout/logout');

const { HOST, PORT, DATABASE_URL } = require('./config');

// Map native promises to mongoose
mongoose.promise = global.promise;

// Webpack Dev Middleware
// NOTE: For development purposes only. When deploying to prod, please remove.
app.use(webpackDevMiddleware(compiler, {
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  publicPath: config.output.publicPath
}));

// Set view engine and views for pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/app/views'));

// Router Middleware
app.use('/', home);
app.use('/sign-in', signIn);
app.use('/sign-up', signUp);
app.use('/dashboard', dashboard);
app.use('/about', about);
app.use('/logout', logout);

// Static Assets Middleware
app.use(express.static('dist'));

let server;

function runServer(host = HOST, port = PORT, database_url = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, {
      useMongoClient: true
    }, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is served at ${host}:${port}.`);
        resolve();
      }).on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server...');
      server.close(err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.log(err, 'There was an error starting the server.'));
}

module.exports = {
  app,
  runServer,
  closeServer
};

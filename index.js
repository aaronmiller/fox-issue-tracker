const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Require Webpack Dev Middleware
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const { config } = require('./webpack.dev.config');

// Routes
const { home } = require('./app/routes/index/index');
const { signIn } = require('./app/routes/sign-in/sign-in');
const { signUp } = require('./app/routes/sign-up/sign-up');
const { dashboard } = require('./app/routes/dashboard/dashboard');

const { HOST, PORT, DATABASE_URL } = require('./config');

// Map native promises to mongoose
mongoose.promise = global.promise;

// Webpack Dev Middleware
// NOTE: For development purposes only. When deploying to prod, please remove.
app.use(webpackMiddleware(webpack(config), {
  stats: {
    colors: true
  }
}));

// Router Middleware
app.use('/', home);
app.use('/sign-in', signIn);
app.use('/sign-up', signUp);
app.use('/dashboard', dashboard);

// Static Assets Middleware
app.use(express.static('build'));

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

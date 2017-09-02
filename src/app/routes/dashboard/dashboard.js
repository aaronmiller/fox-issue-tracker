'use-strict';

const express = require('express');
const session = require('express-session');

const app = express();

const dashboard = express.Router();

// Session Middleware
app.use(session({
  secret: 'dskjahfkjlsdahfkjlhas',
  resave: false,
  saveUninitialized: true
}));

dashboard.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send();
  }

  res.render('dashboard/dashboard');

  return res.status(200).send('Welcome!');
});

module.exports = { dashboard };

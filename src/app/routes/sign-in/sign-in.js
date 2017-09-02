'use-strict';

const express = require('express');
const path = require('path');
const signIn = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { User } = require('../../models/user/model');

// Session Middleware
app.use(session({
  secret: 'dskjahfkjlsdahfkjlhas',
  resave: false,
  saveUninitialized: false
}));

signIn.get('/', (req, res) => {
  res.render('sign-in/sign-in');
});

signIn.post('/', urlencodedParser, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!user) {
      console.log(err);
      return res.status(404).send();
    }

    req.session.user = user;

    return res.status(200).send();
  });
});

module.exports = { signIn };

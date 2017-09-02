const express = require('express');
const signUp = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { User } = require('../../../app/models/user/model');

signUp.get('/', (req, res) => {
  res.render('sign-up/sign-up');
});

signUp.post('/', urlencodedParser, (req, res) => {
  const newUser = {
    name: {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    },
    username: req.body.username,
    password: req.body.password
  };

  User
    .create(newUser)
    .then(user => {
      req.session.user = user;
      res.status(201).redirect('/dashboard')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Something went wrong...'});
    });
});

module.exports = { signUp };

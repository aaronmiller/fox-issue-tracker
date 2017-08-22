const express = require('express');
const path = require('path');
const signUp = express.Router();
const bodyParser = require('body-parser');

const { User } = require('../../../app/models/user/model');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);

signUp.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/sign-up/sign-up.html'));
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
    .then(() => res.status(201).redirect('/dashboard'))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Something went wrong...'});
    });
});

module.exports = { signUp };

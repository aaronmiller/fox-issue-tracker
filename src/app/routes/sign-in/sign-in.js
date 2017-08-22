const express = require('express');
const path = require('path');
const signIn = express.Router();
const bodyParser = require('body-parser');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

signIn.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/sign-in/sign-in.html'));
});

signIn.post('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = { signIn };

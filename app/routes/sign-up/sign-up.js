const express = require('express');
const path = require('path');
const signUp = express.Router();

signUp.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/sign-up/sign-up.html'));
});

module.exports = { signUp };

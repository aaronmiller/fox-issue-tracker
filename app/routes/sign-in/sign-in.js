const express = require('express');
const path = require('path');
const signIn = express.Router();

signIn.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/sign-in/sign-in.html'));
});

module.exports = { signIn };

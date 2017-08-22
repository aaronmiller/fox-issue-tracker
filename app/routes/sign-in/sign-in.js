'use-strict';

const express = require('express');
const path = require('path');
const signIn = express.Router();

signIn.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/sign-in/sign-in.html'));
});

signIn.post('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = { signIn };

'use-strict';

const express = require('express');
const logout = express.Router();

logout.get('/', (req, res) => {
  res.redirect('/');
});

module.exports = { logout };

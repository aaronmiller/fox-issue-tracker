const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
  res.render('index/index');
});

module.exports = { home };

'use-strict';

const express = require('express');
const about = express.Router();

about.get('/', (req, res) => {
  res.render('about/about');
});

module.exports = { about };

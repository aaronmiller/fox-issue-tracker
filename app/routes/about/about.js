'use-strict';

const express = require('express');
const path = require('path');
const about = express.Router();

about.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/about/about.html'));
});

module.exports = { about };

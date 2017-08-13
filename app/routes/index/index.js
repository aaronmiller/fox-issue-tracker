const express = require('express');
const path = require('path');
const home = express.Router();

home.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/index/index.html'));
});

module.exports = { home };

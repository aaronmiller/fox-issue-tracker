const express = require('express');
const path = require('path');
const dashboard = express.Router();

dashboard.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../views/dashboard/dashboard.html'));
});

module.exports = { dashboard };

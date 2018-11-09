const express = require('express');
const router = express.Router();

const layout = require('../views/layout');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  // res.send('got to GET /wiki/');
  res.send(layout('You are on the Wiki page!!'));
});

router.post('/', (req, res, next) => {
  res.send('got to GET /wiki/');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;

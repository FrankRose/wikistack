const express = require('express');
const router = express.Router();
const {addPage} = require('../views');

// router.get('/', (req, res, next) => {
//   res.send('got to GET /wiki/');
// // });
// router.post('/', (req, res, next) => {
//   res.send('got to GET /wiki/');
// });
router.get('/add', (req, res) => {
    // res.send('got to GET /wiki/add');
    res.send(addPage());
  });

module.exports = router;

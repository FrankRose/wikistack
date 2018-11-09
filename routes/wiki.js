const express = require('express');
const router = express.Router();
const {Page} = require('../models');
const layout = require('../views/layout');
const { addPage } = require('../views');


router.get('/', (req, res, next) => {
  // res.send('got to GET /wiki/');
  res.send(layout('You are on the Wiki page!!'));
});

router.post('/', async (req, res, next) => {
  // console.log(req.body)
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

// page =
//   const page = new Page({
//   title,
//   content,
//   slug: 'this is a slug'
// })
// console.log(page.title);
// console.log(page.content);
  try{
    // await page.save().catch((error) => {
    //   console.log(error)
    // });
    await Page.create({
      title,
      content,
      status,
      slug: 'SLug'
    });
    res.redirect('/');
  } catch (error)
  {
    next(error)
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;

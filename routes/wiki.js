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
  let slug = '';
  // let slug = title.replace(' ', '_');
  // const regex = /[^[a-zA-Z0-9]/g;
  // slug = slug.replace(regex, '');

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
      slug
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

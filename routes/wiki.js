const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const layout = require('../views/layout');
const { addPage } = require('../views');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const requestedPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikiPage(requestedPage, { name: 'Marge Simpson' }));
    // console.log(requestedPage);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  // res.send('got to GET /wiki/');
  // res.send(layout('You are on the Wiki page!!'));
  const allPages = await Page.findAll();
  // console.log(allPages);
  res.send(mainPage(allPages));
});

router.post('/', async (req, res, next) => {
  // console.log(req.body)
  const name = req.body.name;
  const email = req.body.email;
  let title = req.body.title;
  title = title.trim();
  const content = req.body.content;
  const status = req.body.status;
  let slug = '';

  const page = new Page({
    title,
    content,
    status,
    slug,
  });
  try {
    // await Page.create({
    //   title,
    //   content,
    //   status,
    //   slug,
    // });
    await page.save();
    // res.redirect(`/wiki/${title.replace(/\s+/g, '_').replace(/\W/g, '')}`);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

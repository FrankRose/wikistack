const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
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
    const user = await User.findOne({
      where: { id: requestedPage.authorId },
    });
    res.send(wikiPage(requestedPage, user));
  } catch (error) {
    console.log('Error retrieving page', error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const allPages = await Page.findAll();

  res.send(mainPage(allPages));
});

router.post('/', async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  let user;

  let title = req.body.title;
  title = title.trim();
  const content = req.body.content;
  const status = req.body.status;
  let slug = '';
  let page;

  try {
    [user] = await User.findOrCreate({
      where: { name, email },
    });
  } catch (error) {
    console.log('Error creating user', error);
    next(error);
  }

  try {
    page = new Page({
      title,
      content,
      status,
      slug,
      // authorId: user.id,
    });
    await page.save();
    page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    console.log('Error saving page', error);
    next(error);
  }
});

module.exports = router;

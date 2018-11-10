const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const userListPage = require('../views/userList');
const userPage = require('../views/userPages');

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    const pages = await Page.findAll({
      where: { authorId: user.id },
    });

    res.send(userPage(user, pages));
  } catch (error) {
    console.log(`Error retrieving user with id: ${req.params.id}`);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send(userListPage(users));
  } catch (error) {
    console.log('Error retrieving list of users', error);
    next(error);
  }
});

module.exports = router;

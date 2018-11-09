const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models/index');
const { Page } = require('./models/index');
const { User } = require('./models/index');
// const router = app.Router();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', (req, res, next) => {
  //res.send('Hello World!!');
  res.send(layout('Hello World!!'));
});

const init = async () => {
  await db.authenticate().then(() => {
    console.log('connected to the database');
  });

  await Page.sync();
  await User.sync();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};

init();

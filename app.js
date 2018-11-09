const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models/index');
const { Page } = require('./models/index');
const { User } = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

// const router = app.Router();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', (req, res, next) => {
  //res.send('Hello World!!');
  const now = new Date(Date.now());
  res.send(layout('Hello World!! ' + now.toISOString()));
});
app.use('/wiki', wikiRouter);
//app.use('/wiki', userRouter);


const init = async () => {
  await db.authenticate().then(() => {
    console.log('connected to the database');
  });

  await db.sync(({force: true}));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};

init();

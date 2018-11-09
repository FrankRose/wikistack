const chalk = require('chalk');
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models/index');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/users', require('./routes/user'));
app.use('/wiki', require('./routes/wiki'));
app.get('/', (req, res) => {
  res.redirect('/wiki');
});
app.use('/', (req, res, next) => {
  const now = new Date(Date.now());
  res.send(layout('Hello World!! ' + now.toISOString()));
});

const init = async () => {
  await db.authenticate().then(() => {
    console.log(
      `Database connection successful!
      SERVER: ${chalk.blue(db.config.database)}
      DATABASE: ${chalk.blue(db.config.host)}
      PORT: ${chalk.blue(db.config.port)}`
    );
  });

  await db.sync({ force: true });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Express listening on port: ${chalk.blue(PORT)}...`);
  });
};

init();

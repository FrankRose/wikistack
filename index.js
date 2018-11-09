const express = require('express');
const app = express();
const morgan = require('morgan');
// const router = app.Router();

app.use(morgan('dev'));
app.use('/', (req, res, next) => {
  res.send('Hello World!!');
});

const PORT = 1337;
app.listen(1337, () => {
  console.log('Listening on port 3000...');
});

const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
// const router = app.Router();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', (req, res, next) => {
  //res.send('Hello World!!');
  res.send(layout(''));
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port , ${PORT}`);
});

require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || process.env.PORT;

const path = require('path');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => {
  res.render('index', {});
});

app.use('/u', express.static(path.join(__dirname, 'upload')));

app.use('/', require('./router/linktree'));

app.listen(PORT, function () {
  console.log('App listening on port',PORT);
});

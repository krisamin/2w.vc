const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => {
  res.render('index', {
    domains: JSON.parse(fs.readFileSync('./data/domains.json', 'utf8'))
  });
});

app.use('/u', express.static(path.join(__dirname, 'upload')));

app.use('/', require('./router/linktree'));

app.listen(PORT, function () {
  console.log('App listening on port',PORT);
});

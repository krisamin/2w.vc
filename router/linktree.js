const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/linktree');

router.get("/@style.css", (req, res, next) => {
  const style = fs.readFileSync(path.join(__dirname, '../public/dist/css/linktree.style.css'), 'utf8');
  const mobileStyle = `@media (max-width:540px) { ${style.replace(/([0-9]+)px/g, (v) => v.replace('px', '')/3+'vw')} }`;
  res.header('Content-type', 'text/css');
  res.send(style + mobileStyle);
})

router.get("/@:id", async (req, res, next) => {
  console.log(req.params.id);

  const idPath = path.join(dataPath, req.params.id);
  if(fs.existsSync(idPath)) {
    const configFile = path.join(idPath, 'config.json');
    if(fs.existsSync(configFile)) {
      const configRaw = fs.readFileSync(configFile, 'utf-8');
      const configJson = JSON.parse(configRaw);
      res.render('linktree', {
        'header': {
          'title': `@${req.params.id} | 2w.vc Tree`,
          'des': `2w.vc Tree. Show the linktree`,
        },
        'id': req.params.id,
        'baseUrl': `./@${req.params.id}/`,
        'config': configJson
      });
    }
  } else
    next();
});

router.get("/@:id/:dist", async (req, res, next) => {
  console.log(req.params.id);

  const idPath = path.join(dataPath, req.params.id);
  if(fs.existsSync(idPath)) {
    res.sendFile(path.join(idPath, req.params.dist));
  } else
    res.sendStatus(404);
});

module.exports = router;
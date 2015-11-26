var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Welcome', function(req, res){
  res.send("Welkom bij express");
  res.sendfile('index2.html', {root: path.join(__dirname, '../public')})
});

module.exports = router;

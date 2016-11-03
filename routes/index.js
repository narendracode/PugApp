var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user:'Normal User',role:'User' });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express', user:'Admin User',role:'Admin' });
});

module.exports = router;
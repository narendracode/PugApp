var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/super', function(req, res, next) {
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Users'}
                    ];
  res.render('super', {
                      title: 'Super User'
                      ,user: {
                      	name: 'Super User'
                      	,role: 'super'
                      }
                      ,data: breadcrumb
                      });
});


module.exports = router;

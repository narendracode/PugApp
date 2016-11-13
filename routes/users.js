var express = require('express');
var router = express.Router();
var userMenu = require('../usermenu.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/super', function(req, res, next) {
	var menu = userMenu.get(true);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Users'}
                    ];

  res.render('super', {
                      title: 'Super User'
                      ,user: { loggedin: true}
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});


module.exports = router;

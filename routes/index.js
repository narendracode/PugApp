var express = require('express');
var router = express.Router();
var constants = require('../constants.js');
var userMenu = require('../usermenu.js');

var authCtrl = require('../app/authorization/controllers/AuthController');
var viewCtrl = require('../app/authorization/controllers/ViewController');

/* GET home page. */

router.get('/',viewCtrl.viewIndex);
router.get('/login',viewCtrl.viewLogin);
router.post('/login', authCtrl.localLogin);
router.post('/register', authCtrl.localSignup);
router.get('/faq', viewCtrl.viewFaq);
router.get('/forgot', viewCtrl.viewForgot);
router.get('/register', viewCtrl.viewRegister);
router.get('/logout',authCtrl.logout);

/* GET home page. */
router.get('/admin', function(req, res, next) {
      var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  var menu = userMenu.get(false);
  res.render('index', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                        });
});

router.post('/test', function(req, res, next) {
    var result = authCtrl.lockUnlockUser();
    res.json(result);
});


module.exports = router;
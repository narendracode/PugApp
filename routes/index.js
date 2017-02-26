var express = require('express');
var router = express.Router();
var constants = require('../constants.js');
var userMenu = require('../usermenu.js');

var authCtrl = require('../app/authorization/controllers/AuthController');
var viewCtrl = require('../app/authorization/controllers/ViewController');

/* GET home page. */
<<<<<<< HEAD
=======
router.get('/', authCtrl.index);

router.post('/status',authCtrl.toggleLock);

router.get('/login', function(req, res, next) {
var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
  res.render('login', { 
                      title: 'Login'
                      ,user: req.user
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
});

>>>>>>> FETCH_HEAD

router.get('/',viewCtrl.viewIndex);
router.get('/login',viewCtrl.viewLogin);
router.post('/login', authCtrl.localLogin);
router.post('/register', authCtrl.localSignup);
router.get('/faq', viewCtrl.viewFaq);
router.get('/forgot', viewCtrl.viewForgot);
router.get('/register', viewCtrl.viewRegister);
router.get('/logout',authCtrl.logout);

<<<<<<< HEAD
/* GET home page. */
router.get('/admin', function(req, res, next) {
      var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
=======

router.post('/test', function(req, res, next) {
    var result = authCtrl.lockUnlockUser();
    res.json(result);
});


router.get('/faq', function(req, res, next) {
  var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Frequently Asked Questions'}
                    ];
  res.render('faq', { 
                      title: 'Express'
                      ,user: req.user
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
});


router.get('/forgot', function(req, res, next) {
  var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Forgot Your Password??'}
                    ];
  res.render('forgot', { 
                      title: 'Forgot Password'
                      ,user: req.user
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
});



router.get('/register', function(req, res, next) {
    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  res.render('register', { 
                          title: 'Register'
                          ,user: req.user
                          ,breadcrumb: breadcrumb
                          ,menu: req.menu
                        });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
>>>>>>> FETCH_HEAD
  var menu = userMenu.get(false);
  res.render('index', { 
                           title: 'Express'
                          ,user: req.user
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                        });
});

router.post('/test', function(req, res, next) {
    var result = authCtrl.lockUnlockUser();
    res.json(result);
});


module.exports = router;
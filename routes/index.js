var express = require('express');
var router = express.Router();
var constants = require('../constants.js');
var userMenu = require('../usermenu.js');

var authCtrl = require('../app/authorization/controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.signedCookies.lt){
   //user session found.
    var menu = userMenu.get(true);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"}         
                      ];
  res.render('index', { 
                      title: 'Express'
                      ,user: { 
                        loggedin: true,
                         name:req.signedCookies.lt.name,
                         email:req.signedCookies.lt.email
                      }
                      ,role:req.signedCookies.lt.role 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
  });
  }
var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"}         
                      ];
  res.render('index', { 
                      title: 'Express'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
  });




});

router.get('/login', function(req, res, next) {
var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
  res.render('login', { 
                      title: 'Express'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});


router.post('/login', authCtrl.localLogin);

router.post('/register', authCtrl.localSignup);


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
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});


router.get('/forgot', function(req, res, next) {
  var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Forgot Your Password??'}
                    ];
  res.render('forgot', { 
                      title: 'Express'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});



router.get('/register', function(req, res, next) {
    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  res.render('register', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                        });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  var menu = userMenu.get(false);
  res.render('index', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                        });
});


router.get('/setcookies', function(req, res) {
  const cookieParams = {
    httpOnly: true,
    signed: true,
    maxAge: 60000,
  };
 
 var loginToken = { lt: '**** Login Token'};
 // res.cookie(constants.get('login'), '*** token ***', cookieParams);
  res.cookie(constants.get('login'), loginToken, cookieParams);
  // OR ALTERNATIVELY 
  // res.cookie('supercookie', { myData: 'is encrypted' }, cookieParams); 
  
  res.end('new cookie set (supercookie)');
})
 
router.get('/getcookies', function(req, res) {
  console.log('Decrypted cookies: ', req.signedCookies)
  if(!req.signedCookies.lt){
  	res.end('not cookies found.')
  }
  else{
  console.log("login : "+req.signedCookies.lt)
  res.end('/getcookies called');
  }

});

router.get('/logout',authCtrl.logout);


module.exports = router;
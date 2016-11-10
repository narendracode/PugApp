var express = require('express');
var router = express.Router();
var constants = require('../constants.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log("Cookies : "+JSON.stringify(req.cookies));
  //res.cookie('cookieName', 'cookieValue')
  res.clearCookie('cookieName');
  res.render('index', { title: 'Express', user:'Normal User',role:'User' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', user:'Normal User',role:'User' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express', user:'Normal User',role:'User' });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express', user:'Admin User',role:'Admin' });
});


router.get('/setcookies', function(req, res) {
  const cookieParams = {
    httpOnly: true,
    signed: true,
    maxAge: 60000,
  };
 
 var loginToken = { token: '**** Login Token'};
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
  console.log("login : "+req.signedCookies.lt.token)
  res.end('/getcookies called');
  }

});


module.exports = router;
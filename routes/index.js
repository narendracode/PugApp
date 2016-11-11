var express = require('express');
var router = express.Router();
var constants = require('../constants.js');

var menu = [
  {
    menu: {name:'Home',link:'#', type:'normal'}
    ,submenu: [
      {menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
    ]
  },{
    menu: { name:'Home2',link:'#', type:'normal'}
    ,submenu: [
      {menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
    ]
  },{
    menu: { name: 'Menu3',link:'#',type:'mega'}
    ,categories: [
      {
        category: 'Menu',
        submenu: [
      {menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
        ]

      }
      ,{
        category: 'Menu2',
        submenu: [
      {menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
        ]

      }
      ,{
        category: 'Menu3',
        submenu: [
      {menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
      ,{menu: {name:'Menu1',link:'/'}}
        ]

      }

    ]
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log("Cookies : "+JSON.stringify(req.cookies));
  //res.cookie('cookieName', 'cookieValue')
    var breadcrumb =  [
                                     { page: 'Home',link: "/"}
                                     
                    ];
  res.clearCookie('cookieName');
  res.render('index', { 
    title: 'Express'
                      , user:'Normal User'
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
  });
});

router.get('/login', function(req, res, next) {
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
  res.render('login', { 
                      title: 'Express'
                      , user:'Normal User'
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});

router.get('/register', function(req, res, next) {
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  res.render('register', { 
                          title: 'Express'
                          ,user:'Normal User'
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                        });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { 
                          title: 'Express'
                          ,user:'Normal User'
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
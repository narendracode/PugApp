var userMenu = require('../../../usermenu.js');
exports.viewIndex = function(req, res) {
    if(req.signedCookies.lt){
   //user session found.
	    var menu = userMenu.get(true);
	    var breadcrumb =  [
	                                     { page: 'Home',link: "/"}         
	                      ];
		  return res.render('index', {
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
	  return res.render('index', { 
	                      title: 'Express'
	                      ,user: { loggedin: false}
	                      ,role:'User' 
	                      ,breadcrumb: breadcrumb
	                      ,menu: menu
	  });
};

exports.viewLogin = function(req, res, next) {
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
};

exports.viewFaq = function(req, res, next) {
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
};

exports.viewForgot = function(req, res, next) {
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
};

exports.viewRegister = function(req, res, next) {
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
};
var passport = require('passport');
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");
var userMenu = require('../../../usermenu.js');
var constants = require('../../../constants.js');

exports.localSignup =  function(req, res, next){
    passport.authenticate('local-signup',function(err, user, info){
      console.log("err: "+err+' ,user:'+user+'  ,info:'+JSON.stringify(info));
      var menu = userMenu.get(false);
        if (err) { 
            //return res.json({type:false,data: 'error occured '+ err}); 

            var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
          console.log('User: '+user+'  ,info:'+info+'  ,err:'+JSON.stringify(err));
            return res.render('register', { 
                      title: 'Register'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Internal server error encountered.'
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
        }
        if(user){
            if(user.type==false){
              var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
              return res.render('register', { 
                      title: 'Register'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error: user.data.msg
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
            }
              var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
              return res.render('register', { 
                      title: 'Register'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,info: user.data.msg
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
          }

        
            //return res.json(user);
    })(req, res, next);
};


exports.localLogin = function(req,res,next){
  console.log(JSON.stringify(next));
  passport.authenticate('local-login',function(err, user, info){
    var menu = userMenu.get(false);
    var breadcrumb =  [
                           { page: 'Home',link: "/"},
                           { page: 'Login'}
                      ];
    if(err){
            return res.render('login', { 
                      title: 'Login'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Internal server error encountered.'
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
    }else{
      if(user){
        console.log('user type : '+user.type);
        if(user.type==false){
              return res.render('login', { 
                title: 'Login'
                ,user: { loggedin: false}
                ,role:'User' 
                ,error: user.data.msg
                ,breadcrumb: breadcrumb
                ,menu: menu
              });
        }else{
              const cookieParams = {
                  httpOnly: true,
                  signed: true
              };
              console.log("User login : "+JSON.stringify(user));
              res.cookie(constants.get('login'), user.data.user, cookieParams);
              console.log('Before redirect');
              req.signedCookies.lt = user.data.user;
              return res.redirect('/');
        }
      }
    }
  })(req,res,next);
};

exports.logout = function(req,res,next){
  res.clearCookie(constants.get('login'));
  var menu = userMenu.get(false);
        
            var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
         
            return res.render('login', { 
                      title: 'Login'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,info:'You are successfully logged out.'
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
};

exports.lockUnlockUser = function(req,res,next){
	return {
		msg:'response from lockUnlockUser'
	};
}

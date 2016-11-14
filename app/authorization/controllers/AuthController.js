var passport = require('passport');
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");
var userMenu = require('../../../usermenu.js');
var constants = require('../../../constants.js');

exports.localSignup =  function(req, res, next){
    passport.authenticate('local-signup',function(err, user, info){
      console.log("err: "+err+' ,user:'+user+'  ,info:'+JSON.stringify(info));
                  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
        if (err) { 
            //return res.json({type:false,data: 'error occured '+ err}); 
          console.log('User: '+user+'  ,info:'+info+'  ,err:'+JSON.stringify(err));
            return res.render('register', { 
                      title: 'Register'
                      ,user: req.user
                      ,error:'Internal server error encountered.'
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
        }
        if(user){
            if(user.type==false){
              return res.render('register', { 
                      title: 'Register'
                      ,user: req.user
                      ,error: user.data.msg
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
            }
              return res.render('register', { 
                      title: 'Register'
                      ,user: req.user
                      ,info: user.data.msg
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
          }

        
            //return res.json(user);
    })(req, res, next);
};

exports.localLogin = function(req, res, next){
    passport.authenticate('local-login',function(err, user, info){
                  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
        if (err){
          console.log('User: '+user+'  ,info:'+info+'  ,err:'+JSON.stringify(err));
            return res.render('login', { 
                      title: 'Login'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Internal server error encountered.'
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });

        }
        if(user){
          if(user.type==false){
            return res.render('login', { 
                      title: 'Login'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error: user.data.msg
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                      });
          }
           // return res.json(user);
          const cookieParams = {
            httpOnly: true,
            signed: true
          };
 
          console.log("User login : "+JSON.stringify(user));
          res.cookie(constants.get('login'), user.data.user, cookieParams);
          res.redirect('/');
        }
    })(req, res, next);
};


exports.logout = function(req,res,next){
  res.clearCookie(constants.get('login'));
  res.redirect('/login');
};

exports.lockUnlockUser = function(req,res,next){
	return {
		msg:'response from lockUnlockUser'
	};
}

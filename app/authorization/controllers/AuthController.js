var passport = require('passport');
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");
var userMenu = require('../../../usermenu.js');
var constants = require('../../../constants.js');


exports.index = function(req,res,next){
    var breadcrumb =  [
                                     { page: 'Home',link: "/"}         
                      ];
    var result =  {
                      title: 'Index'
                      ,user: req.user
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
                  };
          if(req.user.role=='admin'){
            User
              .find({
                'local.email' : {
                  $ne: req.user.email
                },
                role : {
                  $ne : 'admin'
                }
              })
              .select({username:1,status:1,'local.email': 1,role:1}).exec(function(err,users){
               if (err){
                      result.type = false;
                      result.msg = 'Internal Server problem occured.';
                      result.users = [];
                }
                result.type = true;
                result.msg = '';
                result.users = users;
              res.render('index', result);
            });
          }else{
            res.render('index', result);
          }
};

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
    })(req, res, next);
};

<<<<<<< HEAD

exports.localLogin = function(req,res,next){
  console.log(JSON.stringify(next));
  passport.authenticate('local-login',function(err, user, info){
    var menu = userMenu.get(false);
    var breadcrumb =  [
                           { page: 'Home',link: "/"},
                           { page: 'Login'}
                      ];
    if(err){
=======
exports.localLogin = function(req, res, next){
    passport.authenticate('local-login',function(err, user, info){
                  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
        if (err){
          console.log('User: '+user+'  ,info:'+info+'  ,err:'+JSON.stringify(err));
>>>>>>> FETCH_HEAD
            return res.render('login', { 
                      title: 'Login'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Internal server error encountered.'
                      ,breadcrumb: breadcrumb
                      ,menu: req.menu
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
<<<<<<< HEAD
      }
    }
  })(req,res,next);
=======
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
>>>>>>> FETCH_HEAD
};

exports.logout = function(req,res,next){
  res.clearCookie(constants.get('login'));
  res.redirect('/login');
};

exports.toggleLock = function(req,res,next){
  console.log('Toggle Lock is called.');
  var email = req.body.email;
  var status = req.body.status;
  if(status==='locked')
    status = 'unlocked';
  else
    status = 'locked';
  var result =  {
                };
    if(req.user.role=='admin'){
        User.update({'local.email' : email},{ $set: { 'status':status}},function(err,result){
               if (err){
                      result.type = false;
                      result.msg = 'Internal Server problem occured.';
                      result.users = [];
                }
                result.type = true;
                result.msg = 'User status has been updated successfully.';
                res.json(result);
        });
    }else{
      //user does not has permission.
        result.type = false;
        result.msg = 'You do not have permission.';
        res.json(result);
    }
   
};

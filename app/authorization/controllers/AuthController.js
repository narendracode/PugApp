var passport = require('passport');
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");
var userMenu = require('../../../usermenu.js');
var constants = require('../../../constants.js');

exports.localSignup =  function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username;

	console.log("Email : "+email);
	console.log("username : "+username);
	if(emailValidator.validate(email)===false){

    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  return res.render('register', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                          ,error: 'Please enter a valid email address.'
                        });
        		// return res.json({
          //           	type : false
          //           	,data: {
          //           		 msg:'Please enter a valid email address.'
          //           		,user:{}
          //           	}	
          //          });
     }

     	    User.findOne({'local.email' :  email }, function(err, user) {
     	    	console.log("error : "+err);
                if (err){
		              // return res.json({
                //     					type : false
                //     					,data: {
                //     						type:false
                //     						,msg:'Server error encountered.'
                //     						,user:{}
                //     					}	
                //     				});


    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  return res.render('register', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                          ,error: 'Server error encountered, please try after sometime.'
                        });


		        }
                if (user) {
                    // return res.json(  {
                    // 					type : false
                    // 					,data: {
                    // 						type:false
                    // 						,msg:'Email is already taken.'
                    // 						,user:{}
                    // 					}	
                    // 				});


    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  return res.render('register', { 
                          title: 'Express'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                          ,error: 'Server error encountered, please try after sometime.'
                        });



                } else {
                    var newUser  = new User();
                    newUser.role =  'admin';
                    newUser.local.email = email;
                    newUser.local.name = username;
                    newUser.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err,user) {
                        if (err){
              //               return res.json( 
        						// {
              //       				type : false
              //       				,data: {
              //       		 			msg:'Please enter a valid email address.'
              //       					,user:{}
              //       				}	
              //      				});


    var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  return res.render('register', { 
                          title: 'Register'
                          ,user: { loggedin: false}
                          ,role:'User' 
                          ,breadcrumb: breadcrumb
                          ,menu: menu
                          ,error: 'Server error encountered, please try after sometime.'
                        });



                        }
                        // return res.json( {
                        // 			type: true
                        // 			,data: {
                        // 				msg: {}
                        // 				,user: {
                        // 					name: user.name
                        // 					,role: user.role
                        // 					,email: user.local.email
                        // 				}
                        // 			}
                       	// 		}
                       	// );


 



var menu = userMenu.get(false);
    var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Register'}
                    ];
  res.render('Register', { 
                      title: 'Register'
                      ,user: { 
                      	loggedin: false
                      }
                      ,role:'User' 
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      ,info: 'Your account is successfully created, please wait for administratorto approve it.'
  });
                    });   
               }
            }); 

    // passport.authenticate('local-signup',function(err, user, info){
    //     if (err) {
    //         res.json({
    //              type : false
    //              ,data: {
    //              	msg:'Internal Server problem occured.'
    //              	,user:{}
    //              }	
    //           });
    //     }
    //         res.json(user);
    // });
};

exports.localLogin = function(req, res, next){
	console.log("AuthCtrl localLogin is called ... ");
	var email = req.body.email;
	var password = req.body.password;
	console.log('email:'+email);
	console.log('password:'+password);
            User.findOne({'local.email': email}, function(err, user) {
                if (err){
                console.log(" error in login Strategy 4");
                     return res.json({
                    				type : false
                    				,data: {
                    		 			msg:'Internal Server problem occured.'
                    					,user:{}
                    				}	
                   				});
                }
                if (!user || !user.validPassword(password)) {
            console.log(" error in login Strategy 5");


var menu = userMenu.get(false);
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Login'}
                    ];
  return res.render('login', { 
                      title: 'Express'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Invalid email or password'
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });


                      // return res.json(
                     	// 		{
                    		// 		type : false
                    		// 		,data: {
                    		//  			msg:'Invalid email or password.'
                    		// 			,user:{}
                    		// 		}	
                   			// 	});
                }
                if(user.status === 'locked'){
    console.log(" error in login Strategy 6");
                	  // return res.json(
                   //   			{
                   //  				type : false
                   //  				,data: {
                   //  		 			msg:'Your accout is locked, please ask administrator to unlock it.'
                   //  					,user:{}
                   //  				}	
                   // 				});


  return res.render('login', { 
                      title: 'Express'
                      ,user: { loggedin: false}
                      ,role:'User' 
                      ,error:'Your accout is locked, please ask administrator to unlock it.'
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
                }
        console.log(" error in login Strategy 7");
                 return res.json({
                        			type: true
                        			,data: {
                        				msg: {}
                        				,user: {
                        					name: user.name
                        					,role: user.role
                        					,email: user.local.email
                        				}
                        			}
                       			});
            }); 

    // passport.authenticate('local-login',function(err, user, info){
    // 	if(info){
    // 		console.log(" info from localLogin : "+info);
    // 	}
    //     if (err){ 
    //     	console.log(" error in local login..");
    //          res.json({
    //              type : false
    //              ,data: {
    //              	msg:'Internal Server problem occured.'
    //              	,user:{}
    //              }	
    //           });
    //     }
    //     if(user){
    //        	res.json(user);
    //     }
    // });
};

exports.lockUnlockUser = function(req,res,next){
	return {
		msg:'response from lockUnlockUser'
	};
}

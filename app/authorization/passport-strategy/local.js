var LocalStrategy   = require('passport-local').Strategy;
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");

exports.signupStrategy = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        console.log('email: '+email+' ,password:'+password+' ,username:'+req.body.username)
        process.nextTick(function() {
        var name = req.body.username;

        if(emailValidator.validate(email)===false){
             return done(null, {
                                        type : false
                                        ,data: {
                                            type:false
                                            ,msg:'Please enter valid email address.'
                                            ,user:{}
                                        }   
                                    });  
        }

	    User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err){
		              return done(null,err);
		        }

                if (user) {
                    return done(null, {
                    					type : false
                    					,data: {
                    						type:false
                    						,msg:'Email is already taken.'
                    						,user:{}
                    					}	
                    				});
                } else {
                    var newUser  = new User();
                    newUser.role =  'admin';
                    newUser.local.email = email;
                    newUser.local.name = name;
                    newUser.username = name;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err,user) {
                        if (err){
                            return done(null,
        						{
                    				type : false
                    				,data: {
                    		 			msg:'Please enter a valid email address.'
                    					,user:{}
                    				}	
                   				});
                        }
                        return done(null,{
                        			type: true
                        			,data: {
                        				msg: 'Your account has been created successfully, please wait for administrator to unlock it.'
                        				,user: {
                        				}
                        			}
                       			}
                       	);
                    });   
               }
            });    
        });
    }                                      
);



exports.loginStrategy = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        console.log('Email: '+email);
        console.log('password:'+password);
        process.nextTick(function() {
            var mUser = new User();
            User.findOne({'local.email': email}, function(err, user) {
                if (err){
                     return done(null,{
                    				type : false
                    				,data: {
                    		 			msg:'Internal Server problem occured.'
                    					,user:{}
                    				}	
                   				});
                }
                if (!user || !user.validPassword(password)) {
                      return done(null,
                     			{
                    				type : false
                    				,data: {
                    		 			msg:'Invalid email or password.'
                    					,user:{}
                    				}	
                   				});
                }
                if (user.status === 'locked') {
                      return done(null,
                                {
                                    type : false
                                    ,data: {
                                        msg:'Your account is locked, please wait for administrator to unlock it.'
                                        ,user:{}
                                    }   
                                });
                }
                 return done(null,{
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
        });
    }                                      
);
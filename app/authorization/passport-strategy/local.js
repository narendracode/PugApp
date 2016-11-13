var LocalStrategy   = require('passport-local').Strategy;
var User  = require('../models/UserModel.js');
var emailValidator = require("email-validator");

exports.signupStrategy = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        process.nextTick(function() {
        	if(emailValidator.validate(email)===false){
        		return done(null, 
        			{
                    	type : false
                    	,data: {
                    		 msg:'Please enter a valid email address.'
                    		,user:{}
                    	}	
                   });
        	}
            var name = req.body.name;
	    User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err){
		              return done(err);
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
                        				msg: {}
                        				,user: {
                        					name: user.name
                        					,role: user.role
                        					,email: user.local.email
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
        console.log(" error in login Strategy 1");
        process.nextTick(function() {
            console.log(" error in login Strategy 2");
            var mUser = new User();
            console.log(" error in login Strategy 3");
            User.findOne({'local.email': email}, function(err, user) {
                if (err){
                console.log(" error in login Strategy 4");
                     return done({
                    				type : false
                    				,data: {
                    		 			msg:'Internal Server problem occured.'
                    					,user:{}
                    				}	
                   				});
                }
                if (!user || !user.validPassword(password)) {
            console.log(" error in login Strategy 5");
                      return done(
                     			{
                    				type : false
                    				,data: {
                    		 			msg:'Invalid email or password.'
                    					,user:{}
                    				}	
                   				});
                }
                if(user.status === 'locked'){
    console.log(" error in login Strategy 6");
                	  return done(
                     			{
                    				type : false
                    				,data: {
                    		 			msg:'Your accout is locked, please ask administrator to unlock it.'
                    					,user:{}
                    				}	
                   				});
                }
        console.log(" error in login Strategy 7");
                 return done({
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
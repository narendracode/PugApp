var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieEncrypter = require('cookie-encrypter');
var bodyParser = require('body-parser');

var config = require('./config/config');
var mongoose = require("mongoose");
var passport = require('passport');
var secretKey = 'foobarbaz12345';
var app = express();


var constants = require('./constants.js');
var userMenu = require('./usermenu.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(secretKey));
app.use(cookieEncrypter(secretKey));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


app.use(function(req, res, next) {
  console.log('Middleware is called...');
  if(req.signedCookies.lt){
        var user = {
          loggedin: true,
          name:req.signedCookies.lt.name,
          email:req.signedCookies.lt.email,
          role:req.signedCookies.lt.role
    };
    req.user = user;
    req.menu = userMenu.get(true);
  }else{
    req.menu = userMenu.get(false);
    req.user = {
      loggedin: false,
      role:'Guest'
    };
  }
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/pages',express.static(path.join(__dirname, 'public/pages')));


//connect to mongodb
var connect = function(){
    var options = {
        server: {
            socketOptions:{
                keepAlive : 1
            }
        }
    };
    console.log('info', 'connected to mongodb with config url : '+config.db);
    mongoose.connect(config.db,options);
};
connect();
mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected',connect);
require('./app/authorization/passport')(passport); //settting up passport config



require('./config/routes')(app);
require('./config/express')(app);

module.exports = app;

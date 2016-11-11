var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieEncrypter = require('cookie-encrypter');
var bodyParser = require('body-parser');

var config = require('./config/config');


var secretKey = 'foobarbaz12345';
var app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/assets',express.static(path.join(__dirname, 'public/stylesheets')));


require('./config/routes')(app);
require('./config/express')(app);

module.exports = app;

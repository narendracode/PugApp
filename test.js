var c = require('./constants.js');
var menu = require('./usermenu.js');
var validator = require("email-validator");
 


//console.log(c.get('login'));

//console.log(menu.get(false));

console.log(validator.validate("test@email.com")); // true 

console.log(validator.validate("testsafs")); // false 

if(validator.validate("testsafs")===false)
	console.log("not a valid email.")
var express = require('express');
var router = express.Router();
var menu = [
	{
		menu: {name:'Home',link:'#', type:'normal'}
		,submenu: [
			{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
		]
	},{
		menu: { name:'Home2',link:'#', type:'normal'}
		,submenu: [
			{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
		]
	},{
		menu: { name: 'Menu3',link:'#',type:'mega'}
		,categories: [
			{
				category: 'Menu',
				submenu: [
			{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
				]

			}
			,{
				category: 'Menu2',
				submenu: [
			{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
				]

			}
			,{
				category: 'Menu3',
				submenu: [
			{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
			,{menu: {name:'Menu1',link:'/'}}
				]

			}

		]
	}
];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/super', function(req, res, next) {
  var breadcrumb =  [
                                     { page: 'Home',link: "/"},
                                     { page: 'Users'}
                    ];

  res.render('super', {
                      title: 'Super User'
                      ,user: {
                      	name: 'Super User'
                      	,role: 'super'
                      }
                      ,breadcrumb: breadcrumb
                      ,menu: menu
                      });
});


module.exports = router;

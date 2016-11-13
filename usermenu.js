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
  }
];

var loggedInMenu = [
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


var methods  = {
  get: function(loginStatus){
  	//get from DB in production.
  	if(loginStatus===true)
  		return loggedInMenu;
    else
    	return menu;
  }
};

module.exports = methods;

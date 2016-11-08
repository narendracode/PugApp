var constants = [
			["login", "lt"]
			//,['signup','st']
		];

// Use the regular Map constructor to transform a 2D key-value Array into a map
var mapConstants = new Map(constants);

var methods  = {
  get: function(key){
  	return mapConstants.get(key) ? mapConstants.get(key) : -1;
  }
};

module.exports = methods;

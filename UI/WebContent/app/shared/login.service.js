(function() {
	'use strict';
	
	angular
    .module('angle')
    .factory('loginService', loginService);

	function loginService() { 
		return function(isLogin){
			  
			  if(isLogin) return true;
			  return false;  
		};
	}
})();
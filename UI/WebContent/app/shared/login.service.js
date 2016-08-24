(function() {
	'use strict';
	
	angular
    .module('angle')
    .factory('loginService', loginService);

	function loginService() { 
		return function(isLogin){
			  console.log('isLogin : ', isLogin);
			  if(isLogin) return true;
			  return false;  
		};
	}
})();
(function() {
	'use strict';
	console.log('in app module file');
	angular
		.module('angle', [ 
	          'ngAnimate', 
	          'ngStorage',
	          'pascalprecht.translate', 
	          'ui.bootstrap', 
	          'ui.router', 
	          'oc.lazyLoad', 
	          'cfp.loadingBar', 
	          'ngSanitize', 
	          'ngResource', 
	          'ui.utils', 
	          'ngMaterial',
	          'ngMessages',
	          'anguFixedHeaderTable'
	      ]);
})();
(function() {
	'use strict';

	angular
	    .module('angle')
	    .config(appConfig);

	appConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$translateProvider', 'cfpLoadingBarProvider'];

	function appConfig($ocLazyLoadProvider, APP_REQUIRES, $controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, cfpLoadingBarProvider) {
		console.log('in app.config.js file');
		// Lazy Load modules configuration
	    $ocLazyLoadProvider.config({
	      debug: false,
	      events: true,
	      modules: APP_REQUIRES.modules
	    });

	 // registering components after bootstrap
    	  angular.module('angle').controller = $controllerProvider.register;
    	  angular.module('angle').directive  = $compileProvider.directive;
    	  angular.module('angle').filter     = $filterProvider.register;
    	  angular.module('angle').factory    = $provide.factory;
    	  angular.module('angle').service    = $provide.service;
    	  angular.module('angle').constant   = $provide.constant;
    	  angular.module('angle').value      = $provide.value;

      $translateProvider.useStaticFilesLoader({
          prefix : 'vendor/i18n/',
          suffix : '.json'
      });
      $translateProvider.preferredLanguage('en');
      //$translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);

      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';

	}
})();

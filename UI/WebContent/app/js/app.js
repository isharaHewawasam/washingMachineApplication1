
if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

/*var login = angular.module('myLoginCheck',[]).
factory('$logincheck', function(){
  return function(isLogin){

	  if(isLogin) return true;
	  return false;
  };

});*/
var salesDataJoin;
var Role;
var Name;
/*var App = angular.module('angle', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource', 'ui.utils', 'ngMaterial','ngMessages','myLoginCheck'])
          .run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
              // Set reference to access them from any scope
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$storage = $window.localStorage;
              $rootScope.isApplyFiterButton = true;
              $rootScope.isReportFiltering = true;

              // Uncomment this to disable template cache
              $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  if (typeof(toState) !== 'undefined'){
                    $templateCache.remove(toState.templateUrl);
                  }
              });



              $rootScope.app = {
                name: 'Angle',
                description: 'Angular Bootstrap Admin Template',
                year: ((new Date()).getFullYear()),
                layout: {
                  isFixed: true,
                  isCollapsed: true,
                  isBoxed: false,
                  isRTL: false,
                  horizontal: false,
                  isFloat: false,
                  asideHover: false
                },
                useFullLayout: false,
                hiddenFooter: false,
                viewAnimation: 'ng-fadeInUp'
              };
              $rootScope.user = {
                name:     'John',
                job:      'ng-Dev',
                picture:  'app/img/user/02.jpg'
              };

          }]);



App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';
*//** Set the following to true to enable the HTML5 Mode
   You may have to set <base> tag in index and a routing configuration in your server **//*

  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/page/login');

  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons')
    })

    .state('page', {
        url: '/page',
        templateUrl: 'app/views/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        controller: 'LoginFormController',

        templateUrl:helper.basepath('Login.html'),
        data:{title: 'IoT for Electronics - Login'}
        })


    .state('app.singleview', {
        url: '/singleview',
        title: 'Single View',
        controller: 'DashboardController',
        templateUrl: helper.basepath('singleview.html'),
        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
    })

    .state('app.engmanagerview', {
        url: '/engmanagerview',
        title: 'engmanagerview',
        controller: 'DashboardController',
        templateUrl: helper.basepath('engmanagerview.html'),
        data:{title: 'IoT for Electronics - Engineering Manager Dashboard'}
    })
    .state('app.reports', {
        url: '/reports',
        title: 'Reports View',
        controller: 'reportController',
        templateUrl: helper.basepath('reports.html'),
        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
    })
	.state('app.myownview', {
        url: '/myownview',
        title: 'My own view',
		 controller: 'MyController',
        templateUrl: helper.basepath('myownview.html')
    })
    .state('app.submenu', {
        url: '/submenu',
        title: 'Submenu',

        templateUrl: helper.basepath('submenu.html')
    })
    .state('app.twitterinsights', {
        url: '/twitterinsights',
        title: 'Twitter Insights View',
        controller: 'TwitterInsightsController',
        templateUrl: helper.basepath('twitterinsights.html'),
        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
    })
    .state('app.notificationconf', {
        url: '/notificationconf',
        title: 'Notification Configuration View',
        controller: 'NotificationConfController',
        templateUrl: helper.basepath('notificationconfiguration.html'),
        data:{title: 'Notification Configuration'}
    });

}]).run(['$logincheck', '$window', '$location',function($logincheck, $window, $location){
	  if(!$logincheck($window.sessionStorage.loginCredentails)) {
		  $location.path('/login');
	  }
}]);
App.config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    *//**  Lazy Load modules configuration**//*

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';

      *//** registering components after bootstrap **//*
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }])
;

*//**
 *
 * Define constants to inject across the application
*//*
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {

	  *//** jQuery based and standalone scripts**//*

    scripts: {
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css']
    },

    *//**Angular based script (use the right module name)**//*
    modules: [

    ]

  })
;*/
/**
 *
 * login api
 */
angular.module('angle').controller('LoginFormController', ['$scope', '$state','$rootScope','$window', 'iot.config.ApiClient', 'HttpService',
                                       function($scope, $state,$rootScope,$window, configApiClient, HttpService) {

	$rootScope.credentials = {};

	/**
	 * Authenticate login Credentials
	 */
	$scope.postForm = function() {
    $rootScope.isApplyFiterButton = true;
		var loginCredentials = {
			username: $scope.inputData.username,
			password: $scope.inputData.password
		};

		var url = configApiClient.baseUrl + 'login/authentication';
		var param = loginCredentials;
		HttpService.post(url, param).then(function(data){
			// on success
			if (data.response == 'Success') {
 				$rootScope.credentials.Name = data.name;
 				$rootScope.credentials.email = data.username;
 				$rootScope.credentials.roleKey = data.role;
 				$rootScope.credentials.Role = data.rolename;
 				localStorage.setItem('rolename', data.rolename);
 				if (data.role == 'mkt_manager') {
 					$state.go('app.singleview');
 				} else if(data.role == 'eng_manager') {
 					$state.go('app.engmanagerview');
 				}
 				$window.sessionStorage.loginCredentails = angular.toJson($rootScope.credentials);
 			} else {
 				$scope.errorMsg = data;
 			}
		},function(data){
			// on error
			console.log("error in login :", data);
            $scope.errorMsg = 'Network issue, please try after some time.';
		});
	}

}]);

// angular.module('angle').controller('TopnavbarController', ['$rootScope','$scope', '$state', '$window', '$localStorage', '$translate', "iot.config.ApiClient", 'HttpService',
//                                        function($rootScope,$scope, $state, $window, $localStorage, $translate, configApiClient, HttpService) {
// 	var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
// 	$scope.rolename=loginCredentails.Role;
// 	$scope.names=loginCredentails.Name;
// 	$scope.notificationAlertFlag = false;
// 	$scope.roleKey=loginCredentails.roleKey;
//
// 	/**
// 	 * Define the available language list in ui and change the language according to user requests
// 	 */
// 	$scope.language.available = {"en": "English",
// 			"fr": "French"};
//
// 	$scope.changeLanguage = function() {
// 		$translate.use($scope.language.selected);
// 	}
//
// 	/**
// 	 * Get new notification count when refresh the Application
// 	 */
// 	$scope.getNewNotificationCount = function() {
//
// 		var url = configApiClient.baseUrl + 'notifications/notification-alert';
// 		HttpService.get(url).then(function(data){
// 			// on success
// 			$scope.notificationCount = data[0].notification_count;
// 		 	$scope.notificationAlertFlag = true;
// 		},function(data){
// 			// on error
// 		});
//
// 	}
//
// 	/**
// 	 * Clear notification count
// 	 */
// 	$scope.clearNotificationCount = function() {
//
// 		var rolename = $scope.rolename;
// 	    if((window.location.hash=="#/app/twitterinsights"&&rolename=="Marketing Manager")||(window.location.hash=="#/app/notificationconf"&&rolename=="Marketing Manager")||(window.location.hash=="#/app/reports"&&rolename=="Marketing Manager")){
// 	    	$rootScope.isApplyFiterButton = true;
// 	    	$state.go('app.singleview');
// 	      $scope.notificationAlertFlag = false;
// 	    }else if((window.location.hash=="#/app/notificationconf"&&rolename=="Engineer Manager")||(window.location.hash=="#/app/reports"&&rolename=="Engineer Manager")){
// 	    	$rootScope.isApplyFiterButton = true;
// 	    	$state.go('app.engmanagerview');
// 	      $scope.notificationAlertFlag = false;
// 	    }else{
// 	      $scope.notificationAlertFlag = false;
// 	    }
// 	}
//
//
// 	$scope.logOut=function(){
// 		delete $window.sessionStorage.loginCredentails;
// 		$state.go('page.login');
//  	}
//
// 	$scope.loadNotificationConf = function() {
// 		$localStorage.showTwitterInnerLint = false;
// 		$state.go('app.notificationconf');
// 	};
//
// }]);
/**
 * Main Application Controller
*/

angular.module('angle').controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition

    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){

      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });


    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);


    // Allows to use branding color with interpolation

    $scope.colorByName = colors.byName;

    // Internationalization


    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'EspaÃ±ol'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);


angular.module('angle').controller('InfiniteScrollController', ["$scope", '$rootScope', "$timeout", "$state", "iot.config.ApiClient", 'HttpService',
                                            function($scope, $rootScope, $timeout, $state, configApiClient, HttpService) {

		$scope.isLoading = false;
		$scope.isError = false;
		$scope.isNoDataDB = false;
		$scope.msg1 = "Loading.....Please wait";
		$scope.msg2="No data Found";
		$scope.msg3 = "Service is Unavailable";

	/**
	 * Load "Most Fault" data from API file for eng_manager Insights
	 */
	  $scope.getMostFaults = function(divId) {
		  	$scope.isLoading = true;
	        $scope.msg = $scope.msg1;

	        var url = configApiClient.baseUrl + 'insights/most-fault-models';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
		    	 if (data && data.length != 0) {

			    	 var mostFaultDataStr = JSON.stringify(data);

			    	 mostFaultDataStr = mostFaultDataStr.replace(/"no_of_faults":/g, '"y":');
			    	 mostFaultDataStr = mostFaultDataStr.replace(/"Model":/g, '"name":');

					 data = JSON.parse(mostFaultDataStr);

					 renderPieChart(divId, data, 'Most Fault');
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	 /**
	  * Load "Least Fault" data from API file for eng_manager Insights
	  */
	  $scope.getLeastFaults = function(divId) {
		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  var url = configApiClient.baseUrl + 'insights/least-fault-models';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
		    	 if (data && data.length != 0) {
			    	 var leastFaultDataStr = JSON.stringify(data);

			    	 leastFaultDataStr = leastFaultDataStr.replace(/"no_of_faults":/g, '"y":');
			    	 leastFaultDataStr = leastFaultDataStr.replace(/"Model":/g, '"name":');

					 data = JSON.parse(leastFaultDataStr);

					 renderPieChart(divId, data, 'Least Fault');
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});

	  };

	 /**
	  * Load "Common Fault" data from API file for eng_manager Insights
	  */
	  $scope.getCommonFaults = function(divId) {
		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  var url = configApiClient.baseUrl + 'insights/most-common-fault';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
		    	 if (data && data.length != 0) {
			    	 var commonFaultDataStr = JSON.stringify(data.faults);
			    	 commonFaultDataStr = commonFaultDataStr.replace(/"no_of_faults":/g, '"y":');
			    	 commonFaultDataStr = commonFaultDataStr.replace(/"Fault":/g, '"name":');

					 data = JSON.parse(commonFaultDataStr);

					 renderPieChart(divId, data, 'Common Fault');
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	/**
	 * Load "Most Used Models" data from API file for mkt_manager Insights
	 */
	  $scope.getMostUsedModel = function(divId) {
		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  	var url = configApiClient.baseUrl + 'insights/most-used-products';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
				 if (data.data && data.data.length != 0) {
					 var mostUsedProductDataStr = JSON.stringify(data.data);

					 mostUsedProductDataStr = mostUsedProductDataStr.replace(/"totalLoadWeight":/g, '"y":');
					 mostUsedProductDataStr = mostUsedProductDataStr.replace(/"model":/g, '"name":');

					 data = JSON.parse(mostUsedProductDataStr);

					 renderPieChart(divId, data, 'Most Used Models');
				 } else {
					 $scope.isNoDataDB = true;
					 $scope.msg = $scope.msg2;
				 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	 /**
	  * Load "Most Used Wash Cycles" data from API file for mkt_manager Insights
	  */
	  $scope.getMostUsedCycles = function(divId) {
		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  var url = configApiClient.baseUrl + 'insights/most-used-wash-cycles';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
		    	 if (data && data.length != 0) {

			    	 var mostUsedCyclesDataStr = JSON.stringify(data);

			    	 mostUsedCyclesDataStr = mostUsedCyclesDataStr.replace(/"cyclesAndCount":/g, '"y":');
			    	 mostUsedCyclesDataStr = mostUsedCyclesDataStr.replace(/"washCycles":/g, '"name":');

					 data = JSON.parse(mostUsedCyclesDataStr);

					 renderPieChart(divId, data, 'Most Used Wash Cycles');
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	 /**
	  * Load "Not Connected Machines" data from API file for mkt_manager Insights
	  */
	  $scope.getNotConnectedMachines = function(divId) {
		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  var url = configApiClient.baseUrl + 'insights/disconnected';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false

		    	 if (data && data.length != 0) {

		    		 var total = 0;
		             for(var i=0; i<data.length; i++){
		                    total += data[i].unitsDisconnected;
		             }

		             if (total > 0)	{
				    	 var notConnectedDataStr = JSON.stringify(data);

				    	 notConnectedDataStr = notConnectedDataStr.replace(/"unitsDisconnected":/g, '"y":');
				    	 notConnectedDataStr = notConnectedDataStr.replace(/"state":/g, '"name":');

						 data = JSON.parse(notConnectedDataStr);

						 renderPieChart(divId, data, 'Not Connected Machines');
		    	 	} else {
		    	 		document.getElementById(divId).innerHTML = "<h4 style='padding-left:8%;padding-top:2%;color:rgb(0, 153, 204);font-family: Lucida Sans Unicode'>Not Connected Machines</h4>" +
		    	 		"<span	style='display: block; height: 50%; text-align: center; padding-top: 10%; padding-bottom: 15%; border-bottom-color: transparent; color: #4C74E2; background-color: transparent; font-size: 20px' class='glyphicon glyphicon-alert'> <span class='sr-only'>Error:</span>All machines are connected </span>";
		    	 	}
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	 /**
	  * Load "Twitter Handles" data from API file for mkt_manager Insights
	  */
	  $scope.getTwitterHandles = function(divId){

		  $scope.isLoading = true;
		  $scope.msg = $scope.msg1;

		  var url = configApiClient.baseUrl + 'insights/twitter-handles';
			HttpService.get(url).then(function(data){
				// on success
				$scope.isLoading = false;
				$scope.isError = false;
		    	 if (data && data.length != 0) {
			    	 var twitterDataStr = JSON.stringify(data);

			    	 twitterDataStr = twitterDataStr.replace(/"count":/g, '"y":');
			    	 twitterDataStr = twitterDataStr.replace(/"preferenceName":/g, '"name":');

					 data = JSON.parse(twitterDataStr);

					 renderPieChart(divId, data, 'Twitter Sentiments');
		    	 } else {
		    		 $scope.isNoDataDB = true;
		    		 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
	  };

	  /**
	   * Route to Twitter Insight
	   */
	  $scope.loadTwitterinsights = function() {
		  $state.go('app.twitterinsights');
	  };

	}]).factory('datasource', [
	    '$log', '$timeout', function(console, $timeout) {
	        'use strict';

	        var get = function(index, count, success) {
	            return $timeout(function() {
	                var i, result, _i, _ref;
	                result = [];
	                for (i = _i = index, _ref = index + count - 1; index <= _ref ? _i <= _ref : _i >= _ref; i = index <= _ref ? ++_i : --_i) {
	                    result.push('item #' + i);
	                }
	                return success(result);
	            }, 100);
	        };
	        return {
	            get: get
	        };
	    }]);



// angular.module('angle').controller('DashboardController', ['$rootScope','$scope', '$state', 'iot.config.ApiClient', 'HttpService',
//                                        function($rootScope, $scope, $state, configApiClient, HttpService) {
//
// 		//Clear filter on dashboard load
// 		$rootScope.search={};
// 	    $rootScope.filterIcons=[];
//
// 		var monthNames = [
// 		  "January", "February", "March",
// 		  "April", "May", "June", "July",
// 		  "August", "September", "October",
// 		  "November", "December"
// 		];
//
// 		var date = new Date();
// 		var day = date.getDate();
// 		var monthIndex = date.getMonth();
// 		var year = date.getFullYear();
//
//
//    $scope.currentDate=monthNames[monthIndex] + ' ' + day + ', ' +  year+ ', ' +date.toLocaleTimeString();
//
// 	$scope.sidebarObj={};
// 	$scope.sidebarObj.selectedMake="";
// 	$scope.sidebarObj.selectedModel="";
// 	$scope.sidebarObj.selectedSKU="";
// 	$scope.sidebarObj.mfgStartDate="";
// 	$scope.sidebarObj.mfgEndDate="";
//
// 	$scope.region=[];
// 	$scope.timescale=[];
//
// /**
//  * create payload for sibebar filter option
//  */
//   $rootScope.setUsageObjectFromSidebar=function(obj){
// 		$scope.sidebarObj=obj;
// 		$scope.usagedata={
// 				   "productAttrs":{
// 					      "makes":[{"value":$scope.sidebarObj.selectedMake}],
// 					      "models":[{"value":$scope.sidebarObj.selectedModel}],
// 					      "skus":[{"value":$scope.sidebarObj.selectedSKU}],
// 					      "mfg_date": {
// 					          "start_date": $scope.sidebarObj.mfgStartDate,
// 					          "end_date": $scope.sidebarObj.mfgEndDate
// 					        }
// 					   },
// 					   "timescale":{
// 					      "years":[
// 					         {
// 					            "value":parseInt($scope.timescale.years)
// 					         }
// 					      ],
// 					      "quarters":[
// 					         {
// 					            "value":parseInt($scope.timescale.quarters)
// 					         }
// 					      ],
// 					      "months":[
// 					         {
// 					            "value":parseInt($scope.timescale.months)
// 					         }
// 					      ],
// 					      "date":{
// 					         "start_date":"01/01/2015",
// 					         "end_date":"01/01/2016"
// 					      },
// 					      "relative":{
// 					         "unit":"2",
// 					         "value":0
// 					      }
// 					   },
// 					   "region":{
// 					      "states":[
// 					         {
// 					            "value":$scope.region.states
// 					         }
// 					      ],
// 					      "cities":[
// 					         {
// 					            "value":$scope.region.cities
// 					         }
// 					      ],
// 					      "zip_codes":[
// 					         {
// 					            "value":$scope.region.zip_codes
// 					         }
// 					      ]
// 					   },
// 					   "income":[{"value": $scope.sidebarObj.incomeRange}],
// 					   "age": [{"value": $scope.sidebarObj.ageGroup}],
// 					   "family_members_count": [{"value": $scope.sidebarObj.occupation}]
// 					};
//
// 		$rootScope.applyFilterBoolean=true;
// 		// This method is already calling from tryit()
//
// 	}
//
// 	//for reports section
// 	$scope.myDate = new Date();
//
// 	$scope.minDate = new Date(
// 	$scope.myDate.getFullYear(),
// 	$scope.myDate.getMonth() - 2,
// 	$scope.myDate.getDate());
//
// 	$scope.maxDate = new Date(
// 	$scope.myDate.getFullYear(),
// 	$scope.myDate.getMonth() + 2,
// 	$scope.myDate.getDate());
//
// 	$scope.myDate1 = new Date();
//
// 	$scope.minDate1 = new Date(
// 	$scope.myDate1.getFullYear(),
// 	$scope.myDate1.getMonth() - 2,
// 	$scope.myDate1.getDate());
//
// 	$scope.maxDate1 = new Date(
// 	$scope.myDate1.getFullYear(),
// 	$scope.myDate1.getMonth() + 2,
// 	$scope.myDate1.getDate());
// 	//for reports section -finish
//
// 	/**
// 	 * Filtering Reports
// 	 */
// 	$scope.iniReport=function(){
//
// 	    $scope.isReportFiltering = true;
// 	    $rootScope.applyFilterBoolean=true;
// 	    $scope.usagedata={
// 	       "productAttrs":{
// 	         "makes":[{"value":$scope.sidebarObj.selectedMake}],
// 	            "models":[{"value":$scope.sidebarObj.selectedModel}],
// 	            "skus":[{"value":$scope.sidebarObj.selectedSKU}],
// 	            "mfg_date": {
// 	                "start_date": $scope.sidebarObj.mfgStartDate,
// 	                "end_date": $scope.sidebarObj.mfgEndDate
// 	              }
// 	         },
// 	        "timescale":{
// 	            "years":[
// 	               {
// 	                  "value":parseInt($scope.timescale.years)
// 	               }
// 	            ],
// 	            "quarters":[
// 	               {
// 	                  "value":parseInt($scope.timescale.quarters)
// 	               }
// 	            ],
// 	            "months":[
// 	               {
// 	                  "value":parseInt($scope.timescale.months)
// 	               }
// 	            ],
// 	            "date":{
// 	               "start_date":"01/01/2015",
// 	               "end_date":"01/01/2016"
// 	            },
// 	            "relative":{
// 	               "unit":"2",
// 	               "value":0
// 	            }
// 	         },
// 	         "region":{
// 	            "states":[
// 	               {
// 	                  "value":$scope.region.states
// 	               }
// 	            ],
// 	            "cities":[
// 	               {
// 	                  "value":$scope.region.cities
// 	               }
// 	            ],
// 	            "zip_codes":[
// 	               {
// 	                  "value":$scope.region.zip_codes
// 	               }
// 	            ]
// 	         },
// 	         "income":[{"value": $scope.sidebarObj.incomeRange}],
// 	         "age": [{"value": $scope.sidebarObj.ageGroup}],
// 	         "family_members_count": [{"value": $scope.sidebarObj.occupation}]
// 	    };
//
//
// 	    if($scope.region.states==undefined || $scope.region.states=="")
// 	    {
// 	    $scope.usagedata.region.states=[];
// 	    }
// 	    if($scope.region.cities==undefined || $scope.region.cities=="")
// 	    {
// 	      $scope.usagedata.region.cities=[];
// 	    }
// 	    if($scope.region.zip_codes==undefined || $scope.region.zip_codes=="" )
// 	    {
// 	      $scope.usagedata.region.zip_codes=[];
// 	    }
// 	    if($scope.timescale.years==undefined || $scope.timescale.years=="" )
// 	    {
// 	      $scope.usagedata.timescale.years=[];
// 	    }
// 	    if($scope.timescale.quarters==undefined || $scope.timescale.quarters=="")
// 	    {
// 	      $scope.usagedata.timescale.quarters=[];
// 	    }
// 	    if($scope.timescale.months==undefined || $scope.timescale.months=="")
// 	    {
// 	      $scope.usagedata.timescale.months=[];
// 	    }
// 	    if($scope.sidebarObj.selectedMake==undefined || $scope.sidebarObj.selectedMake=="")
// 	    {
// 	      $scope.usagedata.productAttrs.makes=[];
// 	    }
// 	    if($scope.sidebarObj.selectedModel==undefined || $scope.sidebarObj.selectedModel=="")
// 	    {
// 	      $scope.usagedata.productAttrs.models=[];
// 	    }
// 	    if($scope.sidebarObj.selectedSKU==undefined || $scope.sidebarObj.selectedSKU=="")
// 	    {
// 	      $scope.usagedata.productAttrs.skus=[];
// 	    }
// 	    if($scope.sidebarObj.mfgStartDate==undefined || $scope.sidebarObj.mfgStartDate=="")
// 	    {
// 	      $scope.usagedata.productAttrs.mfgStartDate=[];
// 	    }
// 	    if($scope.sidebarObj.mfgEndDate==undefined || $scope.sidebarObj.mfgEndDate=="")
// 	    {
// 	      $scope.usagedata.productAttrs.mfgEndDate=[];
// 	    }
// 	    if($scope.sidebarObj.incomeRange==undefined || $scope.sidebarObj.incomeRange=="")
// 	    {
// 	      $scope.usagedata.income=[];
// 	    }
// 	    if($scope.sidebarObj.ageGroup==undefined || $scope.sidebarObj.ageGroup=="")
// 	    {
// 	      $scope.usagedata.age=[];
// 	    }
// 	    if($scope.sidebarObj.occupation==undefined || $scope.sidebarObj.occupation=="")
// 	    {
// 	      $scope.usagedata.family_members_count=[];
// 	    }
//
// 	   $rootScope.mkt_griddata_filter=[];
// 	    $scope.isNoDataFound = false;
// 	    $scope.isError =  false;
// 	    $scope.isOnFilter = false;
//
// 	    //for grid mkt_mgr
// 	    var url = configApiClient.baseUrl +  'usage';
// 	    var param = $scope.usagedata;
// 		HttpService.post(url, param).then(function(data){
// 			// on success
// 			if(!data || data.data.length === 0){
//                 $rootScope.isOnFilter=true;
//                 $rootScope.isOnLoad=false;
//             } else {
//                 $rootScope.mkt_griddata_filter=data.data;
//                 $rootScope.isOnFilter=true;
//                 $rootScope.isOnLoad=false;
//                 $scope.isReportFiltering = false;
//             }
// 		},function(data){
// 			// on error
// 			$scope.isError = true;
// 	        $scope.isReportFiltering = false;
// 		});
//     }
//
// 	removechart = function (id) {
// 		var chart = $('#'+id).highcharts();
// 		if (chart) {
//
// 			chart.destroy();
// 		}
//
// 	};
//
// 	/**
// 	 * Load data from API for Sales Volume Distribution map
// 	 */
// 	showMap = function () {
// 		removechart('map-container');
// 		$scope.loadingText = "Loading data...";
//
//
// 		$rootScope.mapProgress = true;
// 		var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=true';
// 	    var param = $scope.usagedata;
// 		HttpService.post(url, param).then(function(data){
// 			// on success
// 			$rootScope.mapProgress = false;
//
//             if(!data || data.length === 0){
//                  renderMap("map-container", []);
//             }  else{
//                 renderMap("map-container", data);
//                 $scope.zoomMap('map-container');
//             }
// 		},function(data){
// 			// on error
// 			 $rootScope.mapProgress = false;
// 		});
// 	}
//
// 	/**
// 	 * Implement map zooming funtionality
// 	 * @param {String} id - div id for map
// 	 */
// 	$scope.zoomMap = function (id) {
// 		var selectedState = $scope.region.states;
// 		if(selectedState && selectedState != '') {
// 			var stateCode = undefined;
// 			var states = $scope.states;
// 			// Assign id's
// 	        for(var i=0; i < states.length; i++) {
// 	        	if(states[i].name == selectedState) {
// 	        		stateCode = states[i].id;
// 	        		break;
// 	        	}
// 	        }
// 	        if(stateCode){
// 	        	var chart = $('#'+id).highcharts();
// 	    		if (chart) {
// 	    			chart.get(stateCode).zoomTo();
// 	    		}
// 	        }
// 		}
// 	};
//
// 	/**
// 	 * Filter from both top filter and side bar filter
// 	 */
// 	$rootScope.tryit = function() {
//
// 		$scope.isLoadingFilters = true;
//         $scope.isReportFiltering = false;
//         $rootScope.isApplyFiterButton = true;
// 		$scope.test = true;
// 		$rootScope.applyFilterBoolean=true;
// 		$scope.usagedata={
// 		   "productAttrs":{
// 			   "makes":[{"value":$scope.sidebarObj.selectedMake}],
// 			      "models":[{"value":$scope.sidebarObj.selectedModel}],
// 			      "skus":[{"value":$scope.sidebarObj.selectedSKU}],
// 			      "mfg_date": {
// 			          "start_date": $scope.sidebarObj.mfgStartDate,
// 			          "end_date": $scope.sidebarObj.mfgEndDate
// 			        }
// 			   },
// 			   "timescale":{
// 			      "years":[
// 			         {
// 			            "value":parseInt($scope.timescale.years)
// 			         }
// 			      ],
// 			      "quarters":[
// 			         {
// 			            "value":parseInt($scope.timescale.quarters)
// 			         }
// 			      ],
// 			      "months":[
// 			         {
// 			            "value":parseInt($scope.timescale.months)
// 			         }
// 			      ],
// 			      "date":{
// 			         "start_date":"01/01/2015",
// 			         "end_date":"01/01/2016"
// 			      },
// 			      "relative":{
// 			         "unit":"2",
// 			         "value":0
// 			      }
// 			   },
// 			   "region":{
// 			      "states":[
// 			         {
// 			            "value":$scope.region.states
// 			         }
// 			      ],
// 			      "cities":[
// 			         {
// 			            "value":$scope.region.cities
// 			         }
// 			      ],
// 			      "zip_codes":[
// 			         {
// 			            "value":$scope.region.zip_codes
// 			         }
// 			      ]
// 			   },
// 			   "income":[{"value": $scope.sidebarObj.incomeRange}],
// 			   "age": [{"value": $scope.sidebarObj.ageGroup}],
// 			   "family_members_count": [{"value": $scope.sidebarObj.occupation}]
// 		};
//
//
// 		if($scope.region.states==undefined || $scope.region.states=="")
// 		{
// 		$scope.usagedata.region.states=[];
// 		}
// 		if($scope.region.cities==undefined || $scope.region.cities=="")
// 		{
// 			$scope.usagedata.region.cities=[];
// 		}
// 		if($scope.region.zip_codes==undefined || $scope.region.zip_codes=="" )
// 		{
// 			$scope.usagedata.region.zip_codes=[];
// 		}
// 		if($scope.timescale.years==undefined || $scope.timescale.years=="" )
// 		{
// 			$scope.usagedata.timescale.years=[];
// 		}
// 		if($scope.timescale.quarters==undefined || $scope.timescale.quarters=="")
// 		{
// 			$scope.usagedata.timescale.quarters=[];
// 		}
// 		if($scope.timescale.months==undefined || $scope.timescale.months=="")
// 		{
// 			$scope.usagedata.timescale.months=[];
// 		}
// 		if($scope.sidebarObj.selectedMake==undefined || $scope.sidebarObj.selectedMake=="")
// 		{
// 			$scope.usagedata.productAttrs.makes=[];
// 		}
// 		if($scope.sidebarObj.selectedModel==undefined || $scope.sidebarObj.selectedModel=="")
// 		{
// 			$scope.usagedata.productAttrs.models=[];
// 		}
// 		if($scope.sidebarObj.selectedSKU==undefined || $scope.sidebarObj.selectedSKU=="")
// 		{
// 			$scope.usagedata.productAttrs.skus=[];
// 		}
// 		if($scope.sidebarObj.mfgStartDate==undefined || $scope.sidebarObj.mfgStartDate=="")
// 		{
// 			$scope.usagedata.productAttrs.mfgStartDate=[];
// 		}
// 		if($scope.sidebarObj.mfgEndDate==undefined || $scope.sidebarObj.mfgEndDate=="")
// 		{
// 			$scope.usagedata.productAttrs.mfgEndDate=[];
// 		}
// 		if($scope.sidebarObj.incomeRange==undefined || $scope.sidebarObj.incomeRange=="")
// 		{
// 			$scope.usagedata.income=[];
// 		}
// 		if($scope.sidebarObj.ageGroup==undefined || $scope.sidebarObj.ageGroup=="")
// 		{
// 			$scope.usagedata.age=[];
// 		}
// 		if($scope.sidebarObj.occupation==undefined || $scope.sidebarObj.occupation=="")
// 		{
// 			$scope.usagedata.family_members_count=[];
// 		}
//
// 		// to set usage object in another controller
// 		$rootScope.setUsageData($scope.usagedata);
//
// 		/**
// 		 * For map
// 		 */
// 		showMap();
//
// 		$scope.griddata=[];
// 		$scope.eng_griddata=[];
// 		$scope.isNoDataFound = false;
// 		$scope.isError =  false;
// 		$scope.isLoadingFilters = true;
// 		$scope.msg1 = "Applying Filters... Please wait";
// 		$scope.msg2 = "No Data Found";
// 		$scope.msg3 =  "Service is Unavailable";
// 		$scope.msg = $scope.msg1;
//
// 		//for grid mkt_mgr
// 		var url = configApiClient.baseUrl +  'usage';
// 	    var param = $scope.usagedata;
// 		HttpService.post(url, param).then(function(data){
// 			// on success
// 			$scope.isLoadingFilters = false;
// 	       	 if(!data || data.data.length === 0){
//
// 	         } else {
//       	  		$scope.griddata=data.data;
// 	       	 }
// 		},function(data){
// 			// on error
// 			$scope.isLoadingFilters = false;
// 			$scope.isError = true;
// 			$scope.msg = $scope.msg3;
// 		});
//
// 		//For grid from eng manager
// 		var url = configApiClient.baseUrl + 'sensors/data';
// 	    var param = $scope.usagedata;
// 		HttpService.post(url, param).then(function(data){
// 			// on success
// 			$scope.isLoadingFilters = false;
//             if(!data || data.length === 0){
//
//             } else {
//             	$scope.eng_griddata=data;
//             }
// 		},function(data){
// 			// on error
// 			$scope.isLoadingFilters = false;
//             $scope.isError = true;
//             $scope.msg = $scope.msg3;
// 		});
//
// 	};
//
//     		/**
//     		 * load all usage data on dashboard
//     		 */
//     		$scope.griddata=[];
//     		$scope.eng_griddata=[];
//     		$scope.mkt_griddata=[];
//
//
//     		var url = configApiClient.baseUrl +  "usage";
//     	    HttpService.get(url).then(function(data){
//     			// on success
//     	    	$scope.griddata=data.data;
//     		},function(data){
//     			// on error
//     		});
//
//     	    var url = configApiClient.baseUrl + "sensors/data";
//     	    var param = null;
//     	    HttpService.post(url, param).then(function(data){
//     			// on success
//     	    	 $scope.eng_griddata=data; //.states: array name--check in browser
//     		},function(data){
//     			// on error
//     		});
//
//     		///////////////////////Report on load
//     	    var url = configApiClient.baseUrl +  "usage";
//     	    HttpService.get(url).then(function(data){
//     			// on success
//     	    	$scope.mkt_griddata=data.data;
//                 $rootScope.isOnLoad=true;
//     		},function(data){
//     			// on error
//     		});
//
// 		var quarterMonthMapping = JSON.parse('{'
// 										+'"Quarter1":["Jan","Feb","Mar"],'
// 										+'"Quarter2":["Apr","May","Jun"],'
// 										+'"Quarter3":["Jul","Aug","Sep"],'
// 										+'"Quarter4":["Oct","Nov","Dec"]'
// 										+'}');
//
//
//
//
//
// 		var quartersNew = JSON.parse(
// 				'{"0":[{'+
// 					'"id": 1,'+
// 					'"value": "Quarter1"'+
// 				'}, {'+
// 					'"id": 2,'+
// 					'"value": "Quarter2"'+
// 				'}, {'+
// 					'"id": 3,'+
// 					'"value": "Quarter3"'+
// 				'}, {'+
// 					'"id": 4,'+
// 					'"value": "Quarter4"'+
// 				'}]}'
// 		);
// 		var quarterMonthMap = JSON.parse(
// 				'{'+
// 				'"1":[{"id":1,"value":"Jan"},{"id":2,"value":"Feb"},{"id":3,"value":"Mar"}],'+
// 				'"2":[{"id":4,"value":"Apr"},{"id":5,"value":"May"},{"id":6,"value":"Jun"}],'+
// 				'"3":[{"id":7,"value":"Jul"},{"id":8,"value":"Aug"},{"id":9,"value":"Sep"}],'+
// 				'"4":[{"id":10,"value":"Oct"},{"id":11,"value":"Nov"},{"id":12,"value":"Dec"}]'+
// 			'}'
// 		);
//
//
// 		$scope.quarters = [];
//
// 		$scope.quarters=(quartersNew[0]);
//
// 		$scope.quarterMonths=function(){
//
// 			$scope.months=[];
// 			$scope.timescale.months=undefined;
// 			$scope.months=quarterMonthMap[$scope.timescale.quarters];
// 	    }
//
// 		var url = configApiClient.baseUrl + 'config/states';
// 	    HttpService.get(url).then(function(data){
// 			 // on success
// 	    	 $scope.states=data.states;
// 	    	 //Using this array in renderMap function to zoom the map
// 	    	 salesDataJoin = [];
// 	    	 if($scope.states){
// 	    		 $.each($scope.states, function () {
// 	    			 salesDataJoin.push(this);
// 	    		 });
// 	    	 }
// 		},function(data){
// 			// on error
// 		});
//
// 	    var url = configApiClient.baseUrl + 'config/sales/years';
// 	    HttpService.get(url).then(function(data){
// 			 // on success
// 	    	$scope.sales_years=data.sales_years;
// 		},function(data){
// 			// on error
// 		});
//
//
// 	 $scope.cities;
//
// 	 /**
// 	  * Retrieve cities for relevant states
// 	  */
// 	 $scope.selectCities=function(){
// 		 $scope.region.cities=undefined;
// 		 $scope.region.zip_codes=undefined;
// 		 $scope.zips=[];
//
// 		 var url = configApiClient.baseUrl + "config/states/cities?state_names="+$scope.region.states;
// 	     HttpService.get(url).then(function(data){
// 			 // on success
// 	    	 $scope.cities=data[$scope.region.states];
// 		 },function(data){
// 			// on error
// 		 });
//     }
//
// 	 /**
// 	  * Retrieve zipcodes for relevant cities
// 	  */
// 	 $scope.selectZip=function(){
//
// 		 $scope.region.zip_codes=undefined;
// 		 var url = configApiClient.baseUrl + "config/cities/zipcodes?cities_names="+$scope.region.cities;
// 	     HttpService.get(url).then(function(data){
// 			 // on success
// 	    	 $scope.zips = data[$scope.region.cities];
// 		 },function(data){
// 			// on error
// 		 });
//     }
//
// 	 /**
// 	  * Maximize the Washing Machines status grid
// 	  */
// 	 $scope.maximizeGrid=function(){
// 			var gridNormal = $("#gridNormal1").clone();
//
// 			$("#gridMax").empty();
// 			$("#gridMax").append(gridNormal);
//
// 			$("#gridMax #gridMaxImg").addClass("hidden");
// 			$("#gridMax #gridCloseImg").removeClass("hidden");
// 			$("#gridNormal1").removeClass("hidden");
//
// 			 $(".maxtbody").height(300);
// 		$("#gridMax").removeClass("hidden");
// 		}
//
// 		$("body").on("click","#gridCloseImg",function(){
// 			$("#gridMax").empty();
// 			$("#gridMax").addClass("hidden");
//
// 			  $("#gridNormal").height(355);
// 	    });
//
// 	}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/


// angular.module('angle').controller('SidebarController', ['$rootScope', '$scope', '$state', '$timeout', 'Utils', "iot.config.ApiClient", 'HttpService',
//   function($rootScope, $scope, $state, $timeout, Utils, configApiClient, HttpService){
//
// 	$rootScope.intete=1;
// 	$scope.make;
// 	$scope.makeData;
//     $scope.valArr=[2,3,4,56,7567,2345];
//       $rootScope.filterIcons=[];
//
//
//
// 	$scope.getCall=function(p){
// 	}
//
// 	$scope.clearfilter = function(){
//
//         $rootScope.search={};
//         $rootScope.filterIcons=[];
//         $rootScope.barchartData = null;
//         $rootScope.piechartData = null
//         $rootScope.setUsageObjectFromSidebar($rootScope.search);
//         $rootScope.tryit();
//      }
//
// 	/**
// 	 * clear side bar product filter selections
// 	 */
//     $scope.clearfilter1 = function(){
//
//     	 $scope.clearFilterIcons(1);
// 		 var obj={};
// 		 obj.selectedMake=$rootScope.search.selectedMake;
// 		 obj.selectedModel=$rootScope.search.selectedModel;
// 		 obj.selectedSKU=$rootScope.search.selectedSKU;
// 		 obj.mfgStartDate=$rootScope.search.mfgStartDate;
// 		 obj.mfgEndDate=$rootScope.search.mfgEndDate;
// 		 if ($rootScope.search.incomeRange) {
// 		 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
// 		 }
// 		 if ($rootScope.search.occupation) {
// 			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
// 		 }
// 		 if ($rootScope.search.ageGroup) {
// 			obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
// 		 }
//
//          $rootScope.setUsageObjectFromSidebar(obj);
//          $rootScope.tryit();
//       }
//
//     /**
//      * clear side bar demographics filter selections
//      */
//     $scope.clearfilter2 = function(){
//
//     	$scope.clearFilterIcons(2);
//     	var obj={};
//     	obj.selectedMake=$rootScope.search.selectedMake;
//   	 	obj.selectedModel=$rootScope.search.selectedModel;
//   	 	obj.selectedSKU=$rootScope.search.selectedSKU;
//   	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
//   	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
// 		if ($rootScope.search.incomeRange) {
//   	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
// 		}
// 		if ($rootScope.search.occupation) {
// 			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
// 		}
//   	 	if ($rootScope.search.ageGroup) {
//   	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
//   	 	}
//
//         $rootScope.setUsageObjectFromSidebar(obj);
//         $rootScope.tryit();
//      }
//
//     $scope.clearFilterIcons = function (filterType) {
//
//     	var tempArr = [];
//     	var isRemoved = false;
//     	if(filterType == 1){
//     		$rootScope.search.selectedMake=undefined;
//             $rootScope.search.selectedModel=undefined;
//             $rootScope.search.selectedSKU=undefined;
//             $rootScope.search.mfgStartDate=undefined;
//             $rootScope.search.mfgEndDate=undefined;
//             angular.forEach($rootScope.filterIcons,function(obj ,key){
//                 if(obj.key=="make" || obj.key=="model" || obj.key=="sku" || obj.key=="mfg-start-date" || obj.key=="mfg-end-date"){
//
//                 	isRemoved = true;
//                 }else{
//                 	tempArr.push(obj);
//                 }
//             });
//
//     	}else if(filterType == 2) {
//     		$rootScope.search.incomeRange=undefined;
//             $rootScope.search.occupation=undefined;
//             $rootScope.search.ageGroup=undefined;
//             angular.forEach($rootScope.filterIcons,function(obj ,key){
//             	if(obj.key=="incomeRange" || obj.key=="occupation" || obj.key=="ageGroup"){
//
//                 	isRemoved = true;
//                 }else{
//                 	tempArr.push(obj);
//                 }
//             });
//     	}
//
//     	if(isRemoved){
//     		$rootScope.filterIcons = tempArr;
//     	}
//     }
//
//     /**
//      * create side bar filter seclection array
//      */
//    $scope.createIconArray=function(){
//         $scope.someArr=[];
//
//         if($rootScope.search.selectedMake && $rootScope.search.selectedMake.length != 0)
//             $scope.someArr.push(
//                 {
//                     value:$rootScope.search.selectedMake,
//                     key:"make"
//                 }
//             );
//
//         if($rootScope.search.selectedModel && $rootScope.search.selectedModel.length != 0)
//             $scope.someArr.push(
//                 {
//                     value:$rootScope.search.selectedModel,
//                     key:"model"
//                 }
//             );
//
//         if($rootScope.search.selectedSKU && $rootScope.search.selectedSKU.length != 0)
//             $scope.someArr.push(
//                 {
//                     value:$rootScope.search.selectedSKU,
//                     key:"sku"
//                 });
//
//         if($rootScope.search.mfgStartDate && $rootScope.search.mfgStartDate.length != 0)
//         	$scope.someArr.push(
//         			{
//         				value:$rootScope.search.mfgStartDate.toLocaleDateString(),
//         				key:"mfg-start-date"
//         			});
//
//         if($rootScope.search.mfgEndDate && $rootScope.search.mfgEndDate.length != 0)
//         	$scope.someArr.push(
//         			{
//         				value:$rootScope.search.mfgEndDate.toLocaleDateString(),
//         				key:"mfg-end-date"
//         			});
//
//         if ($rootScope.search.incomeRange) {
//         	$scope.someArr.push({
// 				value:JSON.parse($rootScope.search.incomeRange).range,
// 				key:"incomeRange"
// 			});
//         }
//
//         if ($rootScope.search.occupation) {
//         	$scope.someArr.push({
// 				value:JSON.parse($rootScope.search.occupation).range,
// 				key:"occupation"
// 			});
//         }
//
//         if ($rootScope.search.ageGroup) {
//         	$scope.someArr.push({
// 				value:JSON.parse($rootScope.search.ageGroup).range,
// 				key:"ageGroup"
// 			});
//         }
//
//         $scope.valArr=$scope.someArr;
//
//         $rootScope.filterIcons=$scope.someArr;
//
//     };
//
//
//     $scope.myDate = new Date();
//
//       $scope.selectedSKU=function(){
//
//       }
//
//     $rootScope.search={};
//
//     /**
//      * Retrieve model names for relavent make from API
//      */
//       $scope.selectedMake=function(){
//           $rootScope.search.selectedModel="";
//           $rootScope.search.selectedSKU="";
//           var url = configApiClient.baseUrl + 'config/makes/models?make_names='+$rootScope.search.selectedMake;
//           HttpService.get(url).then(function(data){
// 	  			// on success
//         	  	$scope.models=data[$rootScope.search.selectedMake];
// 	  		},function(data){
// 	  			// on error
// 	  		});
//       }
//
//       /**
//        *  Retrieve SKU data for relavent make from API
//        */
//       $scope.selectedModel=function(){
//
//           $rootScope.search.selectedSKU="";
//           	var url = configApiClient.baseUrl + 'config/models/skus?model_names='+$rootScope.search.selectedModel;
//           	HttpService.get(url).then(function(data){
// 	  			// on success
//         	  	$scope.SKUs=data[$rootScope.search.selectedModel];
// 	  		},function(data){
// 	  			// on error
//
// 	  		});
//       }
//
//       /**
//        * This is for side bar product filter
//        */
//          $scope.applyProductFilter=function(){
//         	 var obj={};
//          	obj.selectedMake=$rootScope.search.selectedMake;
//        	 	obj.selectedModel=$rootScope.search.selectedModel;
//        	 	obj.selectedSKU=$rootScope.search.selectedSKU;
//        	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
//        	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
//      		if ($rootScope.search.incomeRange) {
//        	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
//      		}
//      		if ($rootScope.search.occupation) {
//      			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
//      		}
//        	 	if ($rootScope.search.ageGroup) {
//        	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
//        	 	}
//
//             $rootScope.setUsageObjectFromSidebar(obj);
//             $scope.createIconArray();
//             document.getElementById('filterPanel').style.display = 'none';
//             $rootScope.tryit();
//
//         }
//
//          /**
//           * This is for side bar demographics filter
//           */
//          $scope.applyDemographicsFilter=function(){
//         	 var obj={};
//          	obj.selectedMake=$rootScope.search.selectedMake;
//        	 	obj.selectedModel=$rootScope.search.selectedModel;
//        	 	obj.selectedSKU=$rootScope.search.selectedSKU;
//        	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
//        	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
//      		if ($rootScope.search.incomeRange) {
//        	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
//      		}
//      		if ($rootScope.search.occupation) {
//      			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
//      		}
//        	 	if ($rootScope.search.ageGroup) {
//        	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
//        	 	}
//              $rootScope.setUsageObjectFromSidebar(obj);
//              $scope.createIconArray();
//              document.getElementById('demographicsFilterPanel').style.display = 'none';
//              $rootScope.tryit();
//
//          };
//
//
//     var collapseList = [];
//
//     $rootScope.name="";
//
//     $rootScope.test="gopal";
//
//    /**
//     * Check item and children active state
//     */
//     var isActive = function(item) {
//
//       if(!item) return;
//
//       if( !item.sref || item.sref == '#') {
//         var foundActive = false;
//         angular.forEach(item.submenu, function(value, key) {
//           if(isActive(value)) foundActive = true;
//         });
//         return foundActive;
//       }
//       else
//         return $state.is(item.sref) || $state.includes(item.sref);
//     };
//
//     /**
//      * Load menu from json file
//      */
//     $scope.getMenuItemPropClasses = function(item) {
//       return (item.heading ? 'nav-heading' : '') +
//              (isActive(item) ? ' active' : '') ;
//     };
//
//     $scope.loadSidebarMenu = function() {
//
//     	var menuJson = 'server/sidebar-menu.json',
//         menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
//
//     	HttpService.get(menuURL).then(function(data){
// 			// on success
//     		$rootScope.menuItems = data;
// 		},function(data){
// 			// on error
// 			alert('Failure loading menu');
// 		});
//
//      };
//
//      $scope.loadSidebarMenu();
//
//     /**
//      * Handle sidebar collapse items
//      */
//     $scope.addCollapse = function($index, item) {
//       collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
//     };
//
//     $scope.isCollapse = function($index) {
//       return (collapseList[$index]);
//     };
//
//     $scope.toggleCollapse = function($index, isParentItem,subitem) {
//     	$rootScope.intete+=1;
//
//       /**
//        * collapsed side bar doesn't toggle drop down
//        */
//       if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;
//
//       /**
//        * make sure the item index exists
//        */
//       if( angular.isDefined( collapseList[$index] ) ) {
//         if ( ! $scope.lastEventFromChild ) {
//           collapseList[$index] = !collapseList[$index];
//           closeAllBut($index);
//         }
//       }
//       else if ( isParentItem ) {
//         closeAllBut(-1);
//       }
//
//       $scope.lastEventFromChild = isChild($index);
//       return true;
//
//     };
//
//     function closeAllBut(index) {
//       index += '';
//       for(var i in collapseList) {
//         if(index < 0 || index.indexOf(i) < 0)
//           collapseList[i] = true;
//       }
//     }
//
//     function isChild($index) {
//       return (typeof $index === 'string') && !($index.indexOf('-') < 0);
//     }
//
//     var url = configApiClient.baseUrl + 'config/makes';
//   	HttpService.get(url).then(function(data){
// 		// on success
//   		 $scope.makes=data.makes;
// 	},function(data){
// 		// on error
// 	});
//
//   	var url = configApiClient.baseUrl + 'demographics/family/age-ranges';
//   	HttpService.get(url).then(function(data){
// 		// on success
//   		$scope.demoAgeRange=data;
// 	},function(data){
// 		// on error
// 	});
//
//   	var url = configApiClient.baseUrl + 'demographics/family/income-ranges';
//   	HttpService.get(url).then(function(data){
// 		// on success
//   		$scope.demoIncomeRange=data;
// 	},function(data){
// 		// on error
// 	});
//
//   	var url = configApiClient.baseUrl + 'demographics/family/members-count';
//   	HttpService.get(url).then(function(data){
// 		// on success
//   		$scope.demoMembersCount=data;
// 	},function(data){
// 		// on error
// 	});
//
//   	var url = configApiClient.baseUrl + 'config/manufacture/years';
//   	HttpService.get(url).then(function(data){
// 		// on success
//   		$scope.years=data.years;
// 	},function(data){
// 		// on error
// 	});
//
//     $scope.selectMake=function()
//     {
//     	alert("SELECTED");
//     }
// }]);



angular.module('angle').controller('filterIconController',['$rootScope','$scope','$interval', 'iot.config.ApiClient',function($rootScope,$scope,$interval, configApiClient){

   function callMe(){
       $scope.someArray=$rootScope.filterIcons;
   }

   $interval(callMe,1000);

   /**
    * Remove side bar filter
    */
   $scope.removeFilter=function(filter){
       var indexofvar= $rootScope.filterIcons.indexOf(filter);

       if(filter.key=="make"){
           $rootScope.search.selectedMake=undefined;
           $rootScope.search.selectedModel=undefined;
           $rootScope.search.selectedSKU=undefined;
           $rootScope.search.mfgStartDate=undefined;
           $rootScope.search.mfgEndDate=undefined;
           for(var i = $rootScope.filterIcons.length -1; i >= 0 ; i--){
	    	    if($rootScope.filterIcons[i].key=="make" || $rootScope.filterIcons[i].key=="model" || $rootScope.filterIcons[i].key=="sku" || $rootScope.filterIcons[i].key=="mfg-start-date" || $rootScope.filterIcons[i].key=="mfg-end-date"){
	    	    	$rootScope.filterIcons.splice(i,1);
	    	    }
	    	}
       }else if(filter.key=="mfg-start-date"){
       	$rootScope.search.mfgStartDate=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
       }else if(filter.key=="mfg-end-date"){
          	$rootScope.search.mfgEndDate=undefined;
            $rootScope.filterIcons.splice(indexofvar,1);
        }else if(filter.key=="sku"){
           $rootScope.search.selectedSKU=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
       }else if(filter.key=="model"){
            $rootScope.search.selectedModel=undefined;
           $rootScope.search.selectedSKU=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
           angular.forEach($rootScope.filterIcons,function(value,key){
               if(value.key=="sku"){

                   $rootScope.filterIcons.splice(key,1);
               }
           });
       } else if (filter.key=="incomeRange") {
       	$rootScope.search.incomeRange=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
       } else if (filter.key=="occupation") {
       	$rootScope.search.occupation=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
       } else if (filter.key=="ageGroup") {
       	$rootScope.search.ageGroup=undefined;
           $rootScope.filterIcons.splice(indexofvar,1);
       }

       var obj={};
       obj.selectedMake=$rootScope.search.selectedMake;
                      obj.selectedModel=$rootScope.search.selectedModel;
                      obj.selectedSKU=$rootScope.search.selectedSKU;
                      obj.mfgStartDate=$rootScope.search.mfgStartDate;
                      obj.mfgEndDate=$rootScope.search.mfgEndDate;
                      if ($rootScope.search.incomeRange) {
                                     obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
                      }
                      if ($rootScope.search.occupation) {
                                     obj.occupation=JSON.parse($rootScope.search.occupation).id;
                      }
                      if ($rootScope.search.ageGroup) {
                                     obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
                      }

		$rootScope.setUsageObjectFromSidebar(obj);
		$rootScope.tryit();
   };
}]);

angular.module('angle').controller('mapController',['$scope','$rootScope', 'iot.config.ApiClient', 'HttpService',
                                function($scope,$rootScope, configApiClient, HttpService){
    $scope.salesDataSet;
	$scope.plotMapFunction = function(divId){
		$rootScope.mapProgress = true;
		var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=true';
		var param = null;
      	HttpService.post(url, param).then(function(data){
			// on success
      		renderMap(divId, data);
            salesDataSet = data;
            $rootScope.mapProgress = false;
            $scope.isError = false;
		},function(data){
			// on error
			$rootScope.mapProgress = false;
			$scope.isError = true;
	       renderMap(divId, data);
		});

	}

	/**
	 * Maximize the sales volume distribution map
	 */
    /*Code For maximizing function*/
    $scope.maximizeMap=function(){
        var mapNormal = $("#mapNormal1").clone();

        $("#hiddenDivMap").empty();
        $("#hiddenDivMap").append(mapNormal);

        $("#hiddenDivMap #mapMaxImg").addClass("hidden");
        $("#hiddenDivMap #mapMinImg").removeClass("hidden");
        $("#mapNormal1").removeClass("hidden");
       // $scope.showMap();
        renderMap("#map-maxcontainer",salesDataSet);
    	$scope.zoomMap('map-maxcontainer');
    	$scope.showMaxMap('map-maxcontainer');
        $("#map-maxcontainer").height(660);

      //For notifications help icon in maximized views
        $('[data-toggle="popover"]').popover()


    $("#hiddenDivMap").removeClass("hidden");

    }

    $("body").on("click","#mapMinImg",function(){
        $("#hiddenDivMap").empty();
        $("#hiddenDivMap").addClass("hidden");
		$scope.zoomMap('map-container');

          $("#mapNormal1").height(355);



    });

}]);

/**
 * Generate sales volume distribution map
 */
function renderMap(divId, salesData){
	var seriesData = [];
	if(salesData && salesData.length > 0){
		var salesDataStr = JSON.stringify(salesData);

		// Modify the json data set according to required highmap data format
		salesDataStr = salesDataStr.replace(/"latitude":/g, '"lat":');
		salesDataStr = salesDataStr.replace(/"longitude":/g, '"lon":');
		salesDataStr = salesDataStr.replace(/"unitsSold":/g, '"z":');

		salesData = JSON.parse(salesDataStr);

	    var zipcode;
	    if(salesDataStr.includes("zip_code")){
	        zipcode = true;
	    }else{
	       zipcode = false;
	    }

	    seriesData = [{

	        mapData: Highcharts.maps['countries/us/us-all'],
	        joinBy: ['hc-a2', 'id'],
			data: salesDataJoin,
	        name: 'Basemap',
	        color: '#EEEEEE',
	        borderColor: '#A0A0A0',
	        nullColor: 'rgba(200, 200, 200, 0.3)',
	        showInLegend: false,
	        states: {
	            hover: {
	                color: '#EEEEEE'
	            }
	        }
	    }, {
	        name: 'Separators',
	        type: 'mapline',
	        data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
	        color: '#E0E0E0',
	        showInLegend: false,
	        enableMouseTracking: false
	    }, {
	        type: 'mapbubble',
	        name: 'Sales Volume',
	        color: '#4682B4',
	        data: salesData,
	        marker: {
				  fillOpacity:0.0
			},
			showInLegend: false,
			tooltip: {
		        headerFormat: '',
	            pointFormat: zipcode == true ?
	                      '<b>Sales vs Connected</b><br> City: {point.city},<br>Zip_Code: {point.zip_code},<br> <br>Units Sold: {point.z}, <br>Units Connected: {point.unitsConnected}'
	                  : '<b>Sales vs Connected</b><br> City: {point.city}, <br>Units Sold: {point.z}, <br>Units Connected: {point.unitsConnected}'

		    },
	    }]
	}

    $('#map-container').highcharts('Map', {
      chart: {
    	  spacingLeft 	: 5,
    	  spacingRight 	: 2,
    	  spacingTop 	: 2,
    	  spacingBottom	: 2,
    	  events: {
				redraw: function() {

					var chart = this;
					var series = this.series;
					if(chart.series[2]){
						var points = series[2].points;
						var index = 0;
						Highcharts.each(points, function (point) {
							removePie(point);
							drawPie(point, index++);
							if(index==5) index = 0 ;
						});
					}
				},
              load: function () {

					var chart = this;
					if(chart.series[2]){
						var points = chart.series[2].points;
						var index = 0;
						Highcharts.each(points, function (point) {
							drawPie(point, index++);
							if(index==5) {index = 0} ;
						});
					}
				}
			}
      },
      credits:{
      	enabled:false
      },
	    exporting: {
	    	enabled: false
	    },
	    title: {
	        text: ''
	    },

	    mapNavigation: {
	        enabled: true,
	        buttonOptions: {
                verticalAlign: 'bottom',
                //x : -5
            }
	    },

	    plotOptions: {
	        mapbubble:{
	            minSize:0,
	            maxSize:0
	        }
	    },

	    series: seriesData

	});
    /*coded For Maximized map*/
    $('#map-maxcontainer').highcharts('Map', {
         chart: {
               spacingLeft     : 5,
               spacingRight    : 2,
               spacingTop      : 2,
               spacingBottom   : 2,
               events: {
                         redraw: function() {

                               var chart = this;
                               var series = this.series;
                               if(chart.series[2]){
                                     var points = series[2].points;
                                     var index = 0;
                                     Highcharts.each(points, function (point) {
                                           removePie(point);
                                           drawPie(point, index++);
                                           if(index==5) index = 0 ;
                                     });
                               }
                         },
                 load: function () {

                               var chart = this;
                               if(chart.series[2]){
                                     var points = chart.series[2].points;
                                     var index = 0;
                                     Highcharts.each(points, function (point) {
                                           drawPie(point, index++);
                                           if(index==5) {index = 0} ;
                                     });
                               }
                         }
                   }
         },
         credits:{
             enabled:false
         },
           exporting: {
             enabled: false
           },
           title: {
               text: ''
           },

           mapNavigation: {
               enabled: true,
               buttonOptions: {
                   verticalAlign: 'bottom',
                   //x : -5
               }
           },

           plotOptions: {
               mapbubble:{
                   minSize:0,
                   maxSize:0
               }
           },

           series: seriesData

       });

}

/**
 * Remove pie charts from Sales volume Distribution Map
 */
function removePie(point) {

	var ser = point.series;
	var	trackball = point.pie0;
	if (trackball) {
		point.pie0 = trackball.destroy();
	}
	var	trackball = point.pie1;
	if (trackball) {
		point.pie1 = trackball.destroy();
	}
	var	trackball = point.cir1;
	if (trackball) {
		point.cir1 = trackball.destroy();
	}
	var	trackball = point.text1;
	if (trackball) {
		point.text1 = trackball.destroy();
	}
	var	trackball = point.pie2;
	if (trackball) {
		point.pie2 = trackball.destroy();
	}

}

/**
 * Draw pie charts in Sales volume Distribution Map
 */
function drawPie(point, index) {

	var series = point.series,
	chart = series.chart,
	pointX = point.plotX + series.xAxis.pos,
	pointY = Highcharts.pick(point.plotClose, point.plotY) + series.yAxis.pos;

	if(pointX && pointY) {

		var conn = point.z;
		var uConn = point.unitsConnected;
		var connPercentage = parseFloat((uConn/conn)*100).toFixed(2);
	    var unconnPercentage = parseFloat(((conn-uConn)/conn)*100).toFixed(2);

		var connStr = conn.toString();
		var textLenth = connStr.length;
		var innerRadius = 8 + (textLenth - 1)*3;
		var outerRadius = innerRadius + (textLenth*2 - 1); //5  + (textLenth - 2);

		var startDegrees = -90;
		var mathPI = Math.PI;
		var percent = connPercentage;
		var degrees = 360 * (percent / 100);
		var endDegrees = startDegrees + degrees;
		// Degrees to radians
		var startAngle = startDegrees / 180 * mathPI;
		var endAngle = endDegrees / 180 * mathPI;
		point.pie0 = chart.renderer.arc(pointX, pointY-2, outerRadius+1, innerRadius, -mathPI/2, mathPI+mathPI/2).attr({
			fill: 'black',
			stroke: 'black',
			'stroke-width': 1,
			zIndex: 3 //index + 3
		}).add();
		point.pie1 = chart.renderer.arc(pointX, pointY-2, outerRadius, innerRadius, -mathPI/2, mathPI+mathPI/2).attr({
				fill: 'white',
				stroke: 'white',
				'stroke-width': 1,
				zIndex: 3 // index + 3
		}).add().on('mouseover', function () {
			chart.tooltip.refresh(point);
		}).on('mouseout', function () {
			chart.tooltip.hide();
		});

		point.pie2 = chart.renderer.arc(pointX, pointY-2, outerRadius, innerRadius, startAngle, endAngle).attr({
			fill: '#6CD153',
			stroke: '#6CD153',
			'stroke-width': 1,
			zIndex: 3 // index + 3
		}).add().on('mouseover', function () {
			chart.tooltip.refresh(point);
		}).on('mouseout', function () {
			chart.tooltip.hide();
		});
		point.cir1 = chart.renderer.circle(pointX, pointY-2, innerRadius).attr({
			fill: 'black',
			stroke: 'black',
			'stroke-width': 1,
			'stroke-linejoin': 'round',
			zIndex: 3 // index + 3
		}).add().on('mouseover', function () {
			chart.tooltip.refresh(point);
		}).on('mouseout', function () {
			chart.tooltip.hide();
		});

		point.text1 = chart.renderer.text(conn.toString(), pointX-(textLenth*4), pointY+2)
			.attr({
				cursor: 'default',
				zIndex: 3 //index + 4
			})
			.css({
				color: 'white',
				fontSize: '11px',
				fontWeight: 'bold',

				fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
			})
			.add().on('mouseover', function () {
				chart.tooltip.refresh(point);
			}).on('mouseout', function () {
				chart.tooltip.hide();
			});
	}
}

/**
 * Generate Insights pie chart in mkt_manager
 */
function renderPieChart(divId, insightsData, chartTitle){

	var pieChart = new Highcharts.Chart({
        chart: {
        	renderTo:divId,
        	width:350,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            marginRight:200,
            margin: [50, 110, 0, 0],
            events: {
            	load: function(event) {
            		if (divId == 'twitter-handle-container'){

            			$('.highcharts-legend-item').last().append('<br><br><div style="font-size:12px; font-family:Lucida Sans Unicode; width:200px"><b>Comments-' +
            					this.series[0].data[0].totalComments + '</b></div>');
            		}
            	}
            }
        },
        credits: {
	    	enabled: false
	    },
	    exporting: {
	    	enabled: false
	    },
        title: {
            text: chartTitle,
            useHTML: true,
            align: 'left',
            style: {
                color: '#0099cc'
            },
            floating: true,
            y: 24,
            x: 15
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        legend: {
            align: 'left',
            layout: 'vertical',
            verticalAlign: 'middle',
            x: 155,
            y: 30,
            useHTML: true,
            itemMarginBottom: -3,
            labelFormatter: function () {
            	if (divId != 'twitter-handle-container')
            		return this.name + ' - ' + this.percentage.toFixed(2) + '%';
            	else
            		return this.name + '-' + this.y;
            },
            margin:30
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: divId != 'twitter-handle-container'?['#0099cc', '#339933', '#ffcc00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']: ['#5DADE2', '#D6EAF8'],
                size: 10,
                center: ['50%', '50%']
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            size: '80%',
            innerSize: '80%',
            showInLegend:true,
            data: insightsData
        }]
    });
}
/**
 * Generate Sales Volumes line chart in mkt_manager
 */
function renderLineChart(divId, xAxisCategories, seriesData, chartTitle, xAxisTitle, yAxisTitle){

	$("#"+divId).highcharts( {
		credits:false,
		title: {
			text: chartTitle
		},
		legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 50,
            padding: 1,
            itemMarginTop: 3,
            itemMarginBottom: 3,
            itemStyle: {
                lineHeight: '10px',
                fontSize: '10px',
                fontWeight: 'normal',
                symbolRadius: 4
            }
        },
	    xAxis: {
            title: {
                text: xAxisTitle
            },
	        categories: xAxisCategories
	    },
	    yAxis: {
			title: {
                text: yAxisTitle
            }
		},
	    plotOptions: {
	         series: {
	            }
	        },
	    series:seriesData
	});
}

/**
 * Create series data object to generate line chart in mkt_manager
 */
function createLineChartSeriesDataForMktManager(data){
	var lineChartSeriesData = [];

		for(var i=0;i<data[0].sales.length;i++){

			var unitsSoldDataForItem = [];
			for (var j=0; j<data.length; j++){
				if (data[j].sales[i]) {
					unitsSoldDataForItem.push(data[j].sales[i].unitsSold);
				}
			}
				obj={
		    			name:data[0].sales[i].item,
		    			data:unitsSoldDataForItem
		    	}
				lineChartSeriesData.push(obj);
				obj={};
	}

		return lineChartSeriesData;
}

/**
 * xAxix data type for line chart in mkt_manager
 */
function getTimeScales(data){
	var timeScales = [];
	for (var i=0; i< data.length; i++){
		timeScales.push(data[i].time_scale);
	}
	return timeScales;
}

function createLineChartSeriesDataForEngManager(data){
	var dataStr = JSON.stringify(data);

	dataStr = dataStr.replace(/"product":/g, '"name":');
	dataStr = dataStr.replace(/"avgUsage":/g, '"data":');
	data = JSON.parse(dataStr);

	return data;
}

angular.module('angle').controller('notificationController', ['$rootScope', '$scope', '$window', 'iot.config.ApiClient', 'iot.config.Notification', 'HttpService',
                                          function ($rootScope, $scope, $window, configApiClient, configNotification, HttpService) {
	$scope.isLoading = false;
    $scope.isError = false;
    $scope.msg1 = "Loading.....Please wait";
    $scope.msg2="No Data Found";
    $scope.msg3 = "Network Issue";

    var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
	var userid = loginCredentails.email;

	/**
	 * Twitter sentiments data for notification chart in mkt_manager.
	 * Retrieve base and score value from Notification config API
	 */
	$scope.getTwitterSentiments = function(){
		$scope.isLoading = true;
		$scope.msg = $scope.msg1;
		var url = configApiClient.baseUrl + 'notifications/configurations/settings';
		var param = { "Username": userid };
      	HttpService.post(url, param).then(function(data){
			// on success
      		$scope.positiveTwitterSentimentThreshold = parseInt(data[0].PositiveScore) + parseInt(data[0].PositiveBaseline);
			$scope.negativeTwitterSentimentThreshold = parseInt(data[0].NegativeScore) + parseInt(data[0].NegativeBaseline);

			var url = configApiClient.baseUrl + 'notifications/twitter-notifications-sentiments';
	      	HttpService.get(url).then(function(data){
				// on success
	      		$scope.isLoading = false;
	      		$scope.isError = false;
		    	 if (data || data.length != 0) {

		    	 	 var i=data.length;
		    		 while (i--){
		    			 var twitterCountDifference = data[i].twitter_count/data[i].full_count*100;

		    			 if (data[i].twitter_response_type == 'Positive' && twitterCountDifference >= $scope.positiveTwitterSentimentThreshold){
		    				 data[i].twitter_positives_increase_spike = twitterCountDifference;
		    			 } else if (data[i].twitter_response_type == 'Positive' && twitterCountDifference < $scope.positiveTwitterSentimentThreshold){
		    				 data[i].twitter_positives_decrease_spike = twitterCountDifference;
		    			 } else if (data[i].twitter_response_type == 'Negative' && twitterCountDifference >= $scope.negativeTwitterSentimentThreshold){
		    				 data[i].twitter_negatives_increase_spike = twitterCountDifference;
		    			 } else {
		    				 data[i].twitter_negatives_decrease_spike = twitterCountDifference;
		    			 }
		    		 }
		    	 	$scope.data = data;
		    	 } else {
		    		 $scope.isLoading = false;
	 				 $scope.isError = true;
	 				 $scope.isNoData = true;
	    			 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
		},function(data){
			// on error
			$scope.isLoading = false;
			$scope.isError = true;
			$scope.msg = $scope.msg3;
		});
	};

	/**
	 * Connected machine data for Notification chart in mkt_manager.
	 * Retrieve negative and positive tolerance value from Notification config API
	 */
	$scope.getSpikesInConnectedMachines = function() {

		$scope.isLoading = true;
		$scope.msg = $scope.msg1;
		var url = configApiClient.baseUrl + 'notifications/configurations/settings';
		var param = {"Username": userid};
      	HttpService.post(url, param).then(function(data){
			// on success
      		$scope.spikeByConnectedMachinesIncreaseTolerance = parseInt(data[0].PositiveTolerance);
			$scope.spikeByConnectedMachinesDecreaseTolerance = parseInt(data[0].NegativeTolerance);

			var url = configApiClient.baseUrl + 'notifications/spike-in-connected-machines';
	      	HttpService.get(url).then(function(data){
				// on success
	      		$scope.isLoading = false;
	      		$scope.isError = false;
		    	 if (data || data.length != 0) {

		    		 // Calculate the difference between connected machines as of today and the connected machines 4 weeks ago.
		    		 // Remove the data that is not above increase tolerance or below decrease tolerance
		    		 var i=data.length;
		    		 while (i--){
		    			 var connectdMachineCountDifference = (data[i].current_connected_machines - data[i].previous_connected_machines)/data[i].previous_connected_machines*100;

		    			 if (connectdMachineCountDifference > $scope.spikeByConnectedMachinesIncreaseTolerance){
		    				 data[i].increase_spike = connectdMachineCountDifference;
		    			 } else if (connectdMachineCountDifference < $scope.spikeByConnectedMachinesDecreaseTolerance){
		    				 data[i].decrease_spike = connectdMachineCountDifference;
		    			 } else {
		    				 data.splice(i, 1);
		    			 }
		    		 }

		    		 $scope.data = data;

		    		 if (data.length == 0){
		    			 $scope.isLoading = false;
		 				 $scope.isError = true;
		 				 $scope.isNoData = true;
		    			 $scope.msg = $scope.msg2;
		    		 }
		    	 } else {
		    		 $scope.isLoading = false;
	 				 $scope.isError = true;
	 				 $scope.isNoData = true;
	    			 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
		},function(data){
			// on error
			$scope.isLoading = false;
			$scope.isError = true;
			$scope.msg = $scope.msg3;
		});
	};

	/**
	 * Specific error count difference between today and 4 weeks ago.
	 * Get error type from Notification config API for Notification chart in eng_manager
	 */
	$scope.getSpikesInSpecificErrors = function() {

		$scope.isLoading= true;
		$scope.msg = $scope.msg1;

		var url = configApiClient.baseUrl + 'notifications/configurations/settings';
		var param = {"Username": userid};
      	HttpService.post(url, param).then(function(data){
			// on success
      		$scope.spikeBySpecificErrorsTolerance = configNotification.spikeBySpecificErrorsTolerance;
			$scope.spikeErrorTypeIncrease = data[0].IncreaseErrortype1;
			$scope.spikeErrorTypeDecrease = data[0].DecreaseErrortype1;

			var url = configApiClient.baseUrl + 'notifications/spikes-by-specific-errors';
	      	HttpService.get(url).then(function(data){
				// on success
	      		$scope.isLoading = false;
	      		$scope.isError = false;
		    	 if (data || data.length != 0) {

		    		 // Calculate the difference between a specific error type count as of today and the error count 4 weeks ago.
		    		 // Remove the data that is not a specified error type and not within the specified ranges
		    		 var i=data.length;
		    		 while (i--){
		    			 var errorCountDifference = (data[i].current_error_count - data[i].previous_error_count)/data[i].previous_error_count*100;

		    			 if (($scope.spikeErrorTypeIncrease == data[i].error_type) && (errorCountDifference > $scope.spikeBySpecificErrorsTolerance)){
		    				 data[i].increase_spike = errorCountDifference;
		    			 } else if (($scope.spikeErrorTypeDecrease == data[i].error_type) && (errorCountDifference < $scope.spikeBySpecificErrorsTolerance)){
		    				 data[i].decrease_spike = errorCountDifference;
		    			 } else {
		    				 data.splice(i, 1);
		    			 }
		    		 }

		    		 $scope.data = data;

		    		 if (data.length == 0){
		    			 $scope.isLoading = false;
		 				 $scope.isError = true;
		 				 $scope.isNoData = true;
		    			 $scope.msg = $scope.msg2;
		    		 }
		    	 } else {
		    		 $scope.isLoading = false;
	 				 $scope.isError = true;
	 				 $scope.isNoData = true;
	    			 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});
		},function(data){
			// on error
			$scope.isLoading = false;
			$scope.isError = true;
			$scope.msg = $scope.msg3;
		});
	};

	/**
	 * Specific error count MakeModel Tolerance between today and 4 weeks ago for Notification chart in eng_manager.
	 */
	$scope.getSpikesInSpecificErrorsByMakeModel = function() {

		$scope.isLoading = true;
		$scope.msg = $scope.msg1;

		var url = configApiClient.baseUrl + 'notifications/configurations/settings';
		var param = {"Username": userid};
      	HttpService.post(url, param).then(function(data){
			// on success
      		$scope.spikeBySpecificErrorByMakeModelTolerance = configNotification.spikeBySpecificErrorByMakeModelTolerance;
			$scope.spikeErrorTypeIncrease = data[0].IncreaseErrortype2;
			$scope.spikeErrorTypeDecrease = data[0].DecreaseErrortype2;

			var url = configApiClient.baseUrl + 'notifications/spikes-by-specific-errors-by-make-model';
	      	HttpService.get(url).then(function(data){
				// on success
	      		$scope.isLoading = false;
	      		$scope.isError = false;
		    	 if (data || data.length != 0) {
		    		 var i=data.length;
		    		 while (i--){
		    			 var errorCountDifference = (data[i].countAlldata - data[i].countfourweekBack)/data[i].countfourweekBack*100;

		    			 if (($scope.spikeErrorTypeIncrease == data[i].error_type) && (errorCountDifference > $scope.spikeBySpecificErrorByMakeModelTolerance)){
		    				 data[i].increase_spike = errorCountDifference;
		    			 } else if (($scope.spikeErrorTypeDecrease == data[i].error_type) && (errorCountDifference < $scope.spikeBySpecificErrorByMakeModelTolerance)){
		    				 data[i].decrease_spike = errorCountDifference;
		    			 } else {
		    				 data.splice(i, 1);
		    			 }
		    		 }

		    		 $scope.data = data;

		    		 if (data.length == 0){
		    			 $scope.isLoading = false;
		 				 $scope.isError = true;
		 				 $scope.isNoData = true;
		    			 $scope.msg = $scope.msg2;
		    		 }

		    	 } else {
		    		 $scope.isLoading = false;
	 				 $scope.isError = true;
	 				 $scope.isNoData = true;
	    			 $scope.msg = $scope.msg2;
		    	 }
			},function(data){
				// on error
				$scope.isLoading = false;
				$scope.isError = true;
				$scope.msg = $scope.msg3;
			});

		},function(data){
			// on error
			$scope.isLoading = false;
			$scope.isError = true;
			$scope.msg = $scope.msg3;
		});
	};


}])
.directive('toggle', function(){
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs){
	      if (attrs.toggle=="tooltip"){
	        $(element).tooltip();
	      }
	      if (attrs.toggle=="popover"){
	        $(element).popover();
	      }
	    }
	  }
});

function renderHorizontalBarChart(divId, notificationData){
	$('#' + divId).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Twitter Sentimate'
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: false,
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.y + '</b>'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        legend: {
            reversed: true
        },


    	colors:['#5DADE2', '#339933'],

        plotOptions: {
            series: {
                stacking: 'normal',
                pointWidth: 15
            },
            bar: {
            	colorByPoint: true


            },
        },
        series: notificationData
    });
}

angular.module('angle').controller('myController', ['$scope', '$rootScope', '$window', 'iot.config.ApiClient', 'HttpService',
                                function ($scope, $rootScope, $window, configApiClient, HttpService) {
	$scope.usagedata=null;
	$rootScope.selectedSales="";
	$scope.selectedSales;
	$scope.selectedChart="";
	$scope.seneorkey="";
	$scope.Unit="";
  //$scope.relativeTimeScale = 1;
	$rootScope.baseUrl=configApiClient.baseUrl;
	$scope.EngchartTypes=['Line Chart'];
	  $scope.selectedChart=$scope.EngchartTypes[0];

//	$scope.linechartData=null;
	  $rootScope.piechartData = null;
	  $rootScope.barchartData=null;
	  $rootScope.linechartData=null;
	  $scope.lineChartSeriesData=[];
	  $scope.barLabels = ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016'];
	  $scope.barSeries = ['Sold', 'Connected'];

	  $scope.barData = [[65, 59, 80, 81],
	                    [28, 48, 40, 19]];


    $scope.init = function() {
      $scope.relativeTimeScale = "3";
    };

	  $rootScope.setUsageData=function(usagedata){
		  $scope.usagedata=usagedata;
      $scope.usagedata.timescale.relative.unit = $scope.relativeTimeScale;

		  var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
          var rolename = loginCredentails.Role;
          var roleKey  = loginCredentails.roleKey;

          $scope.isEngManager = (roleKey == 'eng_manager'?true:false);
          if($scope.isEngManager){
                if($scope.selectedSensors >= 0 && $scope.selectedSensors <= 7){
                   $scope.plotEngManagerChartFunction('container' , $scope.seneorkey);
                }
          }else{
			  if($scope.selectedSales==0){
				  $scope.plotPieChart("piecontainer");
			  }
			  else if($scope.selectedSales== 1){
				  $scope.plotBarChart("bar");

			  } else if($scope.selectedSales==2){
				  $scope.plotChartFunction('container');
			  }
          }
	  }

	  	// display sensors Name for Engg Manager
	  	var url = configApiClient.baseUrl + 'sensors';
		HttpService.get(url).then(function(data){
			// on success
			$scope.sensorsList=data;
		},function(data){
			// on error

		});

		loadCharts = function(){
			console.log('in loadCharts');
			$scope.progress = true;
			var url = configApiClient.baseUrl + 'sales/charts';
			HttpService.get(url).then(function(data){
				// on success
				$scope.progress = false;
				$scope.salesList=data;
			},function(data){
				$scope.progress = false;
				// on error

			});
		}

		loadCharts();

	  /**
	   * Retrieve sensor type and sensor key data.
	   * Set yAxix type for sensor data line chart in eng_manager
	   */
	  $scope.Engdisp=function(index){
			if(index==0)
				$scope.selectedSensors=""+0;

			if($scope.selectedSensors != '' && $scope.selectedSensors != null && $scope.selectedSensors != undefined){
				 $scope.sensortype=$scope.sensorsList[$scope.selectedSensors].displayName;
				 $scope.seneorkey=$scope.sensorsList[$scope.selectedSensors].key;

			}
			else
					$scope.sensortype="";

			if( $scope.sensortype=="Average Water Usage"){

				$scope.Unit="Water usage in Gallons";
			}else if( $scope.sensortype=="Average Power"){

				$scope.Unit="Power in kWh";
			}else if( $scope.sensortype=="Average Wash Cycle Duration"){

				$scope.Unit="wash cycle duration in mins";
			}else if( $scope.sensortype=="Average Wash Cycles"){

				$scope.Unit="Cycle wash in RPM";
			}else if( $scope.sensortype=="Average Temperature"){

				$scope.Unit="Temperature in  F";
			}else if( $scope.sensortype=="Average Detergent Used"){

				$scope.Unit="Detergent in gms";
			}else if( $scope.sensortype=="Average Humidity"){

				$scope.Unit="Humidity in %";
			}else if( $scope.sensortype=="Average Load"){

				$scope.Unit="Load in KGS ";
			}

			$scope.plotEngManagerChartFunction('container', $scope.seneorkey);
		}

	  $scope.isActive1 = false;
	    $scope.isActive2 = false;
	    $scope.isActive3 = false;
	  $scope.activeButton = function(index) {
	    if(index ==1)
	      $scope.isActive1 = !$scope.isActive1;
	    else if(index == 2)
	      $scope.isActive2 = !$scope.isActive2;
	    else
	      $scope.isActive3 = !$scope.isActive3;
	  }

	$scope.disp=function(index){
		if(index==0){
			$scope.selectedSales=""+0;
			$scope.progress = false;
		}

		if($scope.selectedSales != '' && $scope.selectedSales != null && $scope.selectedSales != undefined){
			 $scope.chartTypes=$scope.salesList[$scope.selectedSales].chartTypes;
			 $scope.selectedChart=$scope.chartTypes[0];
		}
		else {
				$scope.chartTypes="";
		}

	}

	$scope.dispChart=function(selectedChart){

	}


/**
 * Retrieve data and generate Sold vs Connected pie chart in mkt_manager
 */
$scope.plotPieChart=function(divID){

	$scope.removechart(divID);
	$scope.loadingText = "Loading data...";
	$rootScope.isApplyFiterButton = true;
	$scope.isDisabled = true;
	$scope.progress = true;
	if($scope.data==null){
		var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=false';
		var param = null;
      	HttpService.post(url, param).then(function(data){
			// on success
      		$rootScope.isApplyFiterButton = false;
	    	$scope.isDisabled = false;
	    	$scope.progress = false;
	    	$scope.isError = false;
	    	$scope.data=[];
	    	$scope.data[0]=data.unitsSold;
	    	$scope.data[1]=data.unitsConnected;
	    	$scope.data[2]=data.unitsSold - data.unitsConnected;

	    	var seriesData = [["Connected",$scope.data[1]],["Disconnected",$scope.data[2]]];
        $rootScope.maxPieChartData=seriesData;

	    	createPieChart(divID, seriesData);
		},function(data){
			// on error
			$rootScope.isApplyFiterButton = false;
	    	$scope.progress = false;
	    	$scope.isDisabled = false;
	        $scope.progress = false;
	        $scope.isError = true;
		});
	}else{

//		if($rootScope.applyFilterBoolean){

			var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=true';
			var param = $scope.usagedata;
	      	HttpService.post(url, param).then(function(data){
				// on success
	      		$rootScope.isApplyFiterButton = false;
				$scope.progress = false;
				$scope.isDisabled = false;
				$scope.isError = false;

				var seriesData = [];
				if (data && data.length > 0) {
		            var totalSold = 0;
		            var totalconnected = 0;
		            for(var i=0;i<data.length;i++){
		             // Check whether unitsConnected is not defined in the api response (unitsConnected value is empty in db)
		             if (data[i].unitsConnected){
			              totalSold +=data[i].unitsSold;
			              totalconnected += data[i].unitsConnected ;
		             } else {
		            	 totalSold +=data[i].unitsSold;
		             }
		            }
		            seriesData = [["Connected",totalconnected],["Disconnected",(totalSold - totalconnected)]];
                $rootScope.maxPieChartData=seriesData;
				}
				createPieChart(divID, seriesData);
			},function(data){
				// on error
				$rootScope.isApplyFiterButton = false;
		    	$scope.isDisabled = false;
		    	$scope.progress = false;
		    	$scope.isError = true;
			});
			$rootScope.applyFilterBoolean=false;
		/*}
		else{
			$scope.isDisabled = false;
			$rootScope.isApplyFiterButton = false;
			$scope.progress = false;
			$scope.isError = true;
			var seriesData = [["Connected",$scope.data[1]],["Disconnected",$scope.data[2]]];
			createPieChart(divID, seriesData);
		}*/
	 }

	}

/**
 * Retrieve data and generate Top 3 selling models bar chart in mkt_manager
 */
	$scope.plotBarChart=function(divId){
		console.log('in plotBarChart');
		$scope.removechart(divId);
		$scope.loadingText = "Loading data...";
		$rootScope.isApplyFiterButton = true;

		$scope.progress = true;
		$rootScope.barDetails = $rootScope.barchartData;
		var url = configApiClient.baseUrl + 'sales?report_name=top3SellingModels&group=true';
		var param = $scope.usagedata;
      	HttpService.post(url, param).then(function(data){
			// on success
      		$scope.progress = false;
			$rootScope.isApplyFiterButton = false;
			$scope.isError = false;
			// To prevent the top 3 selling models chart from updating according to the side-bar product filter
			//Made this change because we cannot plot the chart if the user select Make and Model
//					if(($rootScope.search.selectedMake) == undefined ){
				console.log('in if selectedMake is undefined');
				$rootScope.barchartData=data;
//					}
			/*else{
				console.log('in else selectedMake is undefined');
				$rootScope.barchartData=$rootScope.barDetails;
			}*/
			var barChartDes = $rootScope.barchartData.description.substring(23,27);

			var seriesData = [];
			if ($rootScope.barchartData.sales.length > 0) {

				for (i=0; i< $rootScope.barchartData.sales.length; i++){
					var obj={
			    			name:$rootScope.barchartData.sales[i].item,
			    			data:[$rootScope.barchartData.sales[i].unitsSold]
			    	}
					seriesData.push(obj);
					obj={};
				}
        $rootScope.maxBarChartData=seriesData;
         $rootScope.maxBarDes=barChartDes;
			}
	    	createBarChart(divId, seriesData, barChartDes);
		},function(data){
			// on error
			$scope.progress = false;
            $rootScope.isApplyFiterButton = false;
            $scope.isError = true;
		});
		$rootScope.applyFilterBoolean=false;
	}

/**
 * Retrieve data for Sales Volumes line chart in mkt_manager
 */
	$scope.plotChartFunction = function(divId){
		$scope.removechart(divId);
		$scope.loadingText = "Loading data...";
		$scope.isDisabled = true;
		$scope.progress = true;
		$rootScope.isApplyFiterButton = true;
		var obj={};

		var url = configApiClient.baseUrl + 'sales?report_name=salesVolume&group=true';
		var param = $scope.usagedata;
      	HttpService.post(url, param).then(function(data){
			// on success
      		$rootScope.linechartData = data;
      		$scope.isDisabled = false;
      		$scope.isError = false;
			$rootScope.isApplyFiterButton = false;
			var lineChartSeriesData = [];
			if (data.data.length > 0) {
				lineChartSeriesData = createLineChartSeriesDataForMktManager(data.data);
			}
			var timeScales = getTimeScales(data.data);
			$scope.progress = false;
      $rootScope.timeScales=timeScales;
       $rootScope.maxLineChartData=lineChartSeriesData;
	    	renderLineChart(divId, timeScales, lineChartSeriesData, 'Sales Volumes', 'Time Scale', 'Units Sold');
		},function(data){
			// on error
			$rootScope.isApplyFiterButton = false;
	    	$scope.isDisabled = false;
	    	$scope.progress = false;
	    	$scope.isError = true;
		});
	}

/**
 * generate line charts in eng_manager
 */
	$scope.plotEngManagerChartFunction = function(divId,key){

		$scope.removechart(divId);
		$scope.loadingText = "Loading data...";
		$scope.isDisabled = true;
		$scope.progress = true;
		$rootScope.isApplyFiterButton = true;
		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var obj={};
			var param = $scope.usagedata;
			var url = configApiClient.baseUrl + 'sensors/data?sensor_name=' + key + '&group_by_timescale=true';
			var param;
			if ($scope.usagedata) {
				param = $scope.usagedata;

	        switch($scope.usagedata.timescale.relative.unit) {
	          case "1":
	            break;
	          case "2":
	            param.timescale.relative.unit = "d";
	            param.timescale.relative.value = 7;
	            break;
	          case "3":
	            param.timescale.relative.unit = "d";
	            param.timescale.relative.value = 30;
	            break;
	          case "4":
	            param.timescale.relative.unit = "m";
	            param.timescale.relative.value = 3;
	            break;
	          case "5":
	            param.timescale.relative.unit = "m";
	            param.timescale.relative.value = 6;
	            break;
	          case "6":
	            param.timescale.relative.unit = "y";
	            param.timescale.relative.value = 1;
	            break;
	           case "7":
	            param.timescale.relative.unit = "y";
	            param.timescale.relative.value = 3;
	            break;
	          default:
	           param.timescale.relative.unit = "d";
	            param.timescale.relative.value = 7;
	            break;
	        }

		} else {
			param = {"productAttrs": {"makes": [],"models": [],"skus": [],"mfg_date": {"start_date":"","end_date": ""}},
					"timescale": {"years": [],"quarters": [],"months": [],"date": {"start_date": "string","end_date": "string"},
					"relative": {"unit": "d","value": 30}},"region": {"states": [],"cities": [],"zip_codes": []},"age": [],"family_members_count": [],"income": []};
		}
		HttpService.post(url, param).then(function(data){
			// on success
      		$scope.isDisabled = false;
			$rootScope.isApplyFiterButton = false;
			$scope.isError = false;
			if(data && data.length > 0){
				var lineChartSeriesData = createLineChartSeriesDataForEngManager(data);
				$scope.progress = false;
				$rootScope.timeScales=days;
				$rootScope.maxLineChartData=lineChartSeriesData;
		    	renderLineChart(divId, days, lineChartSeriesData, $scope.sensortype, 'Days', $scope.Unit);
			} else {
				$scope.progress = false;
//				$rootScope.timeScales=timeScales;
				$rootScope.maxLineChartData=lineChartSeriesData;
		    	renderLineChart(divId, days, [], $scope.sensortype, 'Days', $scope.Unit);
			}
		},function(data){
			// on error
			$rootScope.isApplyFiterButton = false;
	    	$scope.isDisabled = false;
	    	$scope.progress = false;
	    	$scope.isError = true;
		});
	}

/**
 * Maximize Charts in both managers
 */
 $scope.maximize = function(){

      if($scope.selectedChart=='Multiline'){
        var chartParent = $("#chartParent3").clone();

          $("#hiddenDiv").empty();
             $("#hiddenDiv").append(chartParent);

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");
             $("#chartParent3").removeClass("hidden");		

           //   $("#maxpiecontainer").height(500);

         $("#hiddenDiv").removeClass("hidden")

           //give new IDs for identification
           chartParent.find('#first-chart-select').attr({id: "filter1", name: "filter1"});
           chartParent.find('#second-chart-select').attr({id: "filter2", name: "filter2"});
           chartParent.find('#third-chart-select').attr({id: "filter3", name: "filter3"});

    $("#hiddenDiv").empty();
    $("#hiddenDiv").append(chartParent);

    //remove the elements with new ID
           $("#filter1").remove();
           $("#filter2").remove();
           $("#filter3").remove();

    $("#hiddenDiv").removeClass("hidden");
    $("#hiddenDiv #chartParent").removeClass("chart-chartDiv");


             $("#hiddenDiv #container").removeClass("graphDiv");
             $("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");

             $("#hiddenDiv #chartParent").addClass("chartDiv-maximize");

             $("#hiddenDiv #container").addClass("graphDiv-maximize");
             $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");

 /*            $scope.plotChartFunction("hiddenDiv #container");*/

             $("#maxcontainer").height(500);
             
           //For notifications help icon in maximized views
     		 $('[data-toggle="popover"]').popover()
             
             renderLineChart("maxcontainer", $rootScope.timeScales, $rootScope.maxLineChartData, 'Sales Volumes', 'Time Scale', 'Units Sold');


      }if($scope.selectedChart=='Line Chart'){
        var chartParent = $("#chartParent4").clone();

          $("#hiddenDiv").empty();
             $("#hiddenDiv").append(chartParent);

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");
             $("#chartParent4").removeClass("hidden");


         $("#hiddenDiv").removeClass("hidden")

           //give new IDs for identification
           chartParent.find('#first-chart-select').attr({id: "filter1", name: "filter1"});
           chartParent.find('#second-chart-select').attr({id: "filter2", name: "filter2"});
           chartParent.find('#third-chart-select').attr({id: "filter3", name: "filter3"});

    $("#hiddenDiv").empty();
    $("#hiddenDiv").append(chartParent);

    //remove the elements with new ID
           $("#filter1").remove();
           $("#filter2").remove();
           $("#filter3").remove();

    $("#hiddenDiv").removeClass("hidden");
    $("#hiddenDiv #chartParent").removeClass("chart-chartDiv");


             $("#hiddenDiv #container").removeClass("graphDiv");
             $("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");

             $("#hiddenDiv #chartParent").addClass("chartDiv-maximize");

             $("#hiddenDiv #container").addClass("graphDiv-maximize");
             $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");

 /*            $scope.plotChartFunction("hiddenDiv #container");*/

             $("#maxengcontainer").height(500);
             
           //For notifications help icon in maximized views
     		 $('[data-toggle="popover"]').popover()
     		 
             renderLineChart("maxengcontainer",$rootScope.timeScales, $rootScope.maxLineChartData, $scope.sensortype, 'Days', $scope.Unit);


          /*   $("#hiddenDiv #container").removeClass("graphDiv");
             $("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");

             $("#hiddenDiv #chartParent").addClass("chartDiv-maximize");

             $("#hiddenDiv #container").addClass("graphDiv-maximize");
             $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");

             $scope.plotEngManagerChartFunction('#hiddenDiv #container', $scope.seneorkey);*/
      }

      if($scope.selectedChart=='Pie'){


        var chartParent = $("#chartParent1").clone();

          $("#hiddenDiv").empty();
             $("#hiddenDiv").append(chartParent);

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");
             $("#chartParent1").removeClass("hidden");

         $("#hiddenDiv").removeClass("hidden")

           //give new IDs for identification
           chartParent.find('#first-chart-select').attr({id: "filter1", name: "filter1"});
           chartParent.find('#second-chart-select').attr({id: "filter2", name: "filter2"});
           chartParent.find('#third-chart-select').attr({id: "filter3", name: "filter3"});

    $("#hiddenDiv").empty();
    $("#hiddenDiv").append(chartParent);

    //remove the elements with new ID
           $("#filter1").remove();
           $("#filter2").remove();
           $("#filter3").remove();

    $("#hiddenDiv").removeClass("hidden");
    $("#hiddenDiv #chartParent").removeClass("chart-chartDiv");

                $("#hiddenDiv #piecontainer").removeClass("graphDiv");
                $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv");
          $("#hiddenDiv #chartParent").addClass("chartDiv-maximize");
 //
         $("#hiddenDiv #piecontainer").addClass("graphDiv-maximize");
         $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");
 //
          $("#hiddenDiv #maximize").addClass("hidden");
          $("#hiddenDiv #close").removeClass("hidden");
 //         $scope.plotPieChart("#pie");
            $("#maxpiecontainer").height(500);
            
          //For notifications help icon in maximized views
    		 $('[data-toggle="popover"]').popover()
    		 
             createPieChart("maxpiecontainer", $rootScope.maxPieChartData);
             /*plotMaxPieChart("maxpiecontainer");*/
          }

      if($scope.selectedChart=='Bar'){

        var chartParent = $("#chartParent2").clone();

          $("#hiddenDiv").empty();
             $("#hiddenDiv").append(chartParent);

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");
             $("#chartParent2").removeClass("hidden");

           //   $("#maxpiecontainer").height(500);

         $("#hiddenDiv").removeClass("hidden")

           //give new IDs for identification
           chartParent.find('#first-chart-select').attr({id: "filter1", name: "filter1"});
           chartParent.find('#second-chart-select').attr({id: "filter2", name: "filter2"});
           chartParent.find('#third-chart-select').attr({id: "filter3", name: "filter3"});

    $("#hiddenDiv").empty();
    $("#hiddenDiv").append(chartParent);

    //remove the elements with new ID
           $("#filter1").remove();
           $("#filter2").remove();
           $("#filter3").remove();

    $("#hiddenDiv").removeClass("hidden");
    $("#hiddenDiv #chartParent").removeClass("chart-chartDiv");

             //alert("bar max");
             $("#hiddenDiv #bar").removeClass("graphDiv");
             $("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");

             $("#hiddenDiv #chartParent").addClass("chartDiv-maximize");

             $("#hiddenDiv #bar").addClass("graphDiv-maximize");
             $("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");

             $("#hiddenDiv #maximize").addClass("hidden");
             $("#hiddenDiv #close").removeClass("hidden");
          // $scope.plotBarChart("hiddenDiv #bar");
             $("#maxbarcontainer").height(500);
             
           //For notifications help icon in maximized views
     		 $('[data-toggle="popover"]').popover()
     		 
             /*plotMaxBarChart("maxbarcontainer");*/
             createBarChart("maxbarcontainer", $rootScope.maxBarChartData, $rootScope.maxBarDes);
          }

       };
       $("body").on("click","#hiddenDiv #close",function(){
             $("#hiddenDiv").empty();
             $("#hiddenDiv").addClass("hidden");
             if($scope.selectedChart=='Multiline'){

                   $scope.plotChartFunction("#container");
             }else if($scope.selectedChart=='Bar'){
                   $scope.plotBarChart("#bar");
             }else if($scope.selectedChart=='Pie'){
                   $scope.plotPieChart("#pie");
             }else if($scope.selectedChart=='Line Chart'){

             $scope.plotEngManagerChartFunction('#container', $scope.seneorkey);
             }
     });

 }]);


function createPieChart(divID, seriesData) {
    // Create the chart
    chart = new Highcharts.Chart({
        chart: {
            renderTo: divID,
            type: 'pie'
        },
        title: {
            text: 'Connected Vs Disconnected'
        },
        credits:{
        	enabled: false
        },
        plotOptions: {
            pie: {
                shadow: false
            }
        },
        tooltip: {
            pointFormat:' percentage: <b> {point.percentage:.1f}%</b> ,<br> count:  <b>{point.y}</b>'
        },
        series: [{
            name: 'Browsers',
             data: seriesData,
            size: '80%',
            innerSize: '80%',
            showInLegend:true,
            dataLabels: {
                enabled: false
            }
        }]
    });
}

function createBarChart(divID, seriesData, barChartDes) {

	chart = new Highcharts.Chart({
        chart: {
        	renderTo: divID,
            type: 'column'
        },
        title: {
            text: 'Top 3 Selling Models'
        },
        credits:{
        	enabled:false
        	},
        xAxis: {
            categories: [
               barChartDes
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Sales'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +'<td></td>'+'<td></td>'+'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesData
    });
}

/**
 * Toggle a classname from the BODY Useful to change a state that
 * affects globally the entire layout or more than one item
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 **/

angular.module('angle').directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;

          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }

          }

      });
    }
  };

}]);

/** Browser detection**/

angular.module('angle').service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**Services to retrieve global colors**/

angular.module('angle').factory('colors', ['APP_COLORS', function(colors) {

  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);


/**Provides helper functions for routes definition**/

angular.module('angle').provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**Services to share toggle state functionality**/

angular.module('angle').service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);

      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);

      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);

/**Utility library to use across the theme**/

angular.module('angle').service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';

    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);
// To run this code, edit file
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName


var myApp = angular.module('myAppName', ['angle']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition

}]);

angular.module('angle').controller('MyController', ['$scope', function($scope) {
  /* controller code */

}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);
angular.module('angle').controller('MyviewController', ['$scope', '$window', function($scope, $window) {
	  /* controller code */

	  $scope.getUrl = function(){
		var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
		var rolename = loginCredentails.Role;

	    if(rolename == "Engineering Manager"){
	        $('#dashboardNav a').attr('href','#/app/engmanagerview');
	    }
	    else{
	      $('#dashboardNav a').attr('href','#/app/singleview');
	    }
	  }
}]);

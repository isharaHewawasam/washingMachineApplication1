/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }


//  var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);

// APP START
// ----------------------------------- 
var Role;
var Name;
var App = angular.module('angle', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource', 'ui.utils', 'ngMaterial','ngMessages'])
          .run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
              // Set reference to access them from any scope
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$storage = $window.localStorage;

              // Uncomment this to disable template cache
              /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  if (typeof(toState) !== 'undefined'){
                    $templateCache.remove(toState.templateUrl);
                  }
              });*/

              // Scope Globals
              // ----------------------------------- 
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

/**=========================================================
*
*
===========================================================*/
//App.value('filterIcons', { value: []} );
/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  //$urlRouterProvider.otherwise('/app/singleview');
  $urlRouterProvider.otherwise('/page/login');
  // 
  // Application Routes
  // -----------------------------------   
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

        templateUrl:helper.basepath('Login.html')
        })
    
    /*.state('app.login', {
        url: '/login',
        title: "Login",
        controller: 'LoginFormController',
        templateUrl:helper.basepath('Login.html')
        //templateUrl: 'app/pages/login.html'
    })*/
    .state('app.singleview', {
        url: '/singleview',
        title: 'Single View',
        controller: 'DashboardController',
        templateUrl: helper.basepath('singleview.html')
    })
    
    .state('app.engmanagerview', {
        url: '/engmanagerview',
        title: 'engmanagerview',
        controller: 'DashboardController',
        templateUrl: helper.basepath('engmanagerview.html')
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
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
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

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
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
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css']
    },
    // Angular based script (use the right module name)
    modules: [
             	
              
              
              
      // { name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js','vendor/angularjs-toaster/toaster.css'] }
    ]

  })
;


App.controller('LoginFormController', ['$scope', '$http', '$state','$rootScope', function($scope, $http, $state,$rootScope) {
	//alert("loaded");
	
	
	
	$scope.postForm = function() {

		
		//{ success: $scope.inputData.username === 'eng_manager@bluemix.com' &&  $scope.inputData.password === 'test123' };
		 var response1 = { success: $scope.inputData.username === 'eng_manager@bluemix.com' &&  $scope.inputData.password === 'test123' };
	        if(!response1.success) {
	      	//  $scope.errorMsg  = 'Not Authorised';
	        	
	        	 var response = { success: $scope.inputData.username === 'mkt_manager@bluemix.com' &&  $scope.inputData.password === 'test123' };
	             if(!response.success) {
	           	  $scope.errorMsg  = 'We weren\'t able to find the email address and password combination you entered';
	             }else{
	           	//  $scope.errorMsg = 'success';
	           	  $state.go('app.singleview');
	           	  
	           	$rootScope.Role="Marketing Manager";
	        	$rootScope.Name="John Smith";
	             };
	        	
	        	
	        }else{
	      	 // $scope.errorMsg = 'success';
	      	$state.go('app.engmanagerview');
	      	$rootScope.Role="Engg Manager";
	      	$rootScope.Name="Alan Mcdormet";
	      	  // window.location.href = 'success.html';
	      	 // $state.go('app.singleview');
	      	  
	      //	 $state.go('app.engmanagerview');
	      	//return
	        };
		
		/*
		  var response = { success: $scope.inputData.username === 'mkt_manager@bluemix.com' &&  $scope.inputData.password === 'test123' };
        if(!response.success) {
      	  $scope.errorMsg  = 'Not Authorised';
        }else{
      	  $scope.errorMsg = 'success';
      	  $state.go('app.singleview');
      	  
      	
        };*/
//alert("loaded");
//$state.go('app.login');

/*	  // bind here all data from the form
 $scope.account = {};
	  // place the message if something goes wrong
	  $scope.authMsg = '';

	  $scope.login = function() {
	    $scope.authMsg = '';

	    $http
	      .post('api/account/login', {email: $scope.account.email, password: $scope.account.password})
	      .then(function(response) {
	        // assumes if ok, response is an object with some data, if not, a string with error
	        // customize according to your api
	        if ( !response.account ) {
	          $scope.authMsg = 'Incorrect credentials.';
	        }else{
	          $state.go('app.dashboard');
	        }
	      }, function(x) {
	        $scope.authMsg = 'Server Request Error';
	      });
	  };*/
	//  $state.go('app.singleview');

	 // app.login
	}
	}]);




App.controller('TopnavbarController', ['$rootScope','$scope','$http', '$state', function($rootScope,$scope, $http, $state) {
	//alert("loaded");
	console.log("name from rootscope "+$rootScope.Name);
	$scope.rolename=$rootScope.Role;
	$scope.names=$rootScope.Name;
	console.log("names from scope "+$scope.names);
	
	
	
	
	 $scope.logOut=function(){
		
		 $state.go('page.login');
		   }
	}]);
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
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
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = 'IoT for Electronics - Usage Dashboard';
      document.title = title;
      return title; 
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
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
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Internationalization
    // ----------------------

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

    
   // $state.go('app.singleview');
    
}]);



App.controller('DataTableController', ['$scope', '$timeout', function($scope, $timeout) {
	  'use strict';

	  // Define global instance we'll use to destroy later
	  var dtInstance1;
	 

	  console.log("IN datatablecontroller");
	  
	  $timeout(function(){

	    if ( ! $.fn.dataTable ) return;

	    //
	    // Zero configuration
	    // 

	    dtInstance1 = $('#datatable1').dataTable({
	    	
	    	
	        'paging':   true,  // Table pagination
	        'ordering': true,  // Column ordering 
	        'info':     true,  // Bottom left status text
	        // Text translation options
	        // Note the required keywords between underscores (e.g _MENU_)
	        oLanguage: {
	            sSearch:      'Search all columns:',
	            sLengthMenu:  '_MENU_ records per page',
	            info:         'Showing page _PAGE_ of _PAGES_',
	            zeroRecords:  'Nothing found - sorry',
	            infoEmpty:    'No records available',
	            infoFiltered: '(filtered from _MAX_ total records)'
	        }
	    
	    });



	  });
	  
	  // When scope is destroyed we unload all DT instances 
	  // Also ColVis requires special attention since it attaches
	  // elements to body and will not be removed after unload DT
	  $scope.$on('$destroy', function(){
	    dtInstance1.fnDestroy();
	  
	    $('[class*=ColVis]').remove();
	  });

	}]);


App.controller('InfiniteScrollController', ["$scope", "$timeout","iot.config.ApiClient", function($scope, $timeout, configApiClient) {

	  $scope.images = [1, 2, 3];

	  $scope.loadMore = function() {
	    var last = $scope.images[$scope.images.length - 1];
	    for(var i = 1; i <= 10; i++) {
	      $scope.images.push(last + i);
	    }
	  };
	  
	  $scope.getMostFaults = function(divId, data) {
			 //alert('in avg wash ' + configApiClient.baseUrl); 
			 
			 var mostFaultDataSet = [{Model:"Model 3",Make:"2232423",no_of_faults:123},
			                          {Model:"Model 4",Make:"2232423",no_of_faults:123},
			                          {Model:"Model 8",Make:"2232423",no_of_faults:12}];
			 
			 var mostFaultDataStr = JSON.stringify(mostFaultDataSet);
				
			 // Modify the json data set according to required highchart data format
			 mostFaultDataStr = mostFaultDataStr.replace(/"no_of_faults":/g, '"y":');
			 mostFaultDataStr = mostFaultDataStr.replace(/"Model":/g, '"name":');
			 mostFaultDataSet = JSON.parse(mostFaultDataStr);
			 
			 renderPieChart(divId, mostFaultDataSet, 'Most Fault');
			 
	  };
	  
	  $scope.getLeastFaults = function(divId, data) {
		  var leastFaultDataSet = [{Model:"Model 1",Make:"Make 1",no_of_faults:0},
		                           {Model:"Model 3",Make:"Make 2",no_of_faults:1},
		                           {Model:"Model 7",Make:"Make 3",no_of_faults:2}];
		  
		  var leastFaultDataStr = JSON.stringify(leastFaultDataSet);
		  
		  leastFaultDataStr = leastFaultDataStr.replace(/"no_of_faults":/g, '"y":');
		  leastFaultDataStr = leastFaultDataStr.replace(/"Model":/g, '"name":');
				
		  leastFaultDataSet = JSON.parse(leastFaultDataStr);
			 
		  renderPieChart(divId, leastFaultDataSet, 'Least Fault');
		  
	  };
	  
	  $scope.getCommonFaults = function(divId, data) {
		  var commonFaultDataSet = [{"Model": "Model 3","Make": "Make 1","no_of_faults": 163,"failureType":"Water leak"},
		                            {"Model": "Model 3","Make": "Make 1","no_of_faults": 153,"failureType":"Software Failure"},
		                            {"Model": "Model 3","Make": "Make 1","no_of_faults": 130,"failureType":"Error"}];
		  
		  var commonFaultDataStr = JSON.stringify(commonFaultDataSet);
		  
		  commonFaultDataStr = commonFaultDataStr.replace(/"no_of_faults":/g, '"y":');
		  commonFaultDataStr = commonFaultDataStr.replace(/"failureType":/g, '"name":');
				
		  commonFaultDataSet = JSON.parse(commonFaultDataStr);
			 
		  renderPieChart(divId, commonFaultDataSet, 'Common Fault');

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



App.controller('DashboardController', ['$rootScope','$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {
	$scope.searchButtonText = "Apply Filter";
  $scope.test = false;
	$scope.isDisabled = false;
	
	
	
	
	
	
	$scope.region=[];
	$scope.timescale=[];
	
	
	
	$scope.tryit = function() {
			$scope.searchButtonText = "Filtering...";    
	  $scope.isDisabled = true;
	  $scope.test = true;
	/*
		if($scope.region.states==undefined)
			{
			
			console.log("states undefined");
			$scope.usagedata.region.states=[];
			}
		
		if($scope.region.cities==undefined)
		{

			console.log("cities undefined");
			$scope.usagedata.region.cities=[];
		}
		
		if($scope.region.zip_codes==undefined)
		{

			console.log("zip_codes undefined");
			$scope.usagedata.region.zip_codes=[];
		}
		*/
		/*
		console.log("region form data  : "+$scope.region);	
		console.log("states form data  : "+$scope.region.states);	
		console.log("cities form data  : "+$scope.region.cities);	
		console.log("codes form data  : "+$scope.region.zip_codes);	*/

		/*$scope.usagedata={
  				  "productAttrs": {
  	    		    "makes": [  ],
  	    		    "models": [],
  	    		    "skus": [],
  	    		    "mfg_date": {
  	    		      "start_date": "01/01/2015",
  	    		      "end_date": "01/01/2016"
  	    		    }
  	    		  },
  	    		"timescale": {
  	      		    "years": [{
  	    		        "value": parseInt($scope.timescale.years)
  	    		      } ],
  	      		    "quarters": [ {
  	    		        "value": parseInt($scope.timescale.quarters)
  	    		      }],
  	      		    "months": [{
  	    		        "value": parseInt($scope.timescale.months)
  	    		      } ],
  	    		    "date": {
  	    		      "start_date": "01/01/2015",
  	    		      "end_date": "01/01/2016"
  	    		    },
  	    		    "relative": {
  	    		      "unit": "2",
  	    		      "value": 0
  	    		    }
  	    		  },
  	    		  "region": {
  	    		    "states": [
  	    		      {
  	    		        
  	    		    	  "value": $scope.region.states
  	    		      }
  	    		    ],
  	    		    "cities": [
  	    		               {
  	    		            	   "value": $scope.region.cities
  	 	   
  	    		               }
  	    		               ],
  	    		    "zip_codes": [
  						{
  							   "value": $scope.region.zip_codes
  						
  						}
  	    		                  ]
  	    		  }
  	    		};
		*/
		
		$scope.usagedata={  
						   "productAttrs":{  
							      "makes":[],
							      "models":[],
							      "skus":[],
							      "mfg_date":{  
							         "start_date":"01/01/2015",
							         "end_date":"01/01/2016"
							      }
							   },
							   "timescale":{  
							      "years":[  
							         {  
							            "value":parseInt($scope.timescale.years)
							         }
							      ],
							      "quarters":[  
							         {  
							            "value":parseInt($scope.timescale.quarters)
							         }
							      ],
							      "months":[  
							         {  
							            "value":parseInt($scope.timescale.months)
							         }
							      ],
							      "date":{  
							         "start_date":"01/01/2015",
							         "end_date":"01/01/2016"
							      },
							      "relative":{  
							         "unit":"2",
							         "value":0
							      }
							   },
							   "region":{  
							      "states":[  
							         {  
							            "value":$scope.region.states
							         }
							      ],
							      "cities":[  
							         {  
							            "value":$scope.region.cities
							         }
							      ],
							      "zip_codes":[  
							         {  
							            "value":$scope.region.zip_codes
							         }
							      ]
							   }
							};
		
		//////////start gopal
		if($scope.region.states==undefined || $scope.region.states=="")
		{
		
		console.log("states undefined");
		$scope.usagedata.region.states=[];
		}
		console.log("gopal cities:"+$scope.region.cities  || $scope.region.cities=="");
		if($scope.region.cities==undefined || $scope.region.cities=="")
		{
			
			console.log("cities undefined");
			$scope.usagedata.region.cities=[];
		}
		if($scope.region.zip_codes==undefined || $scope.region.zip_codes=="" )
		{

			console.log("zip_codes undefined");
			$scope.usagedata.region.zip_codes=[];
		}
		if($scope.timescale.years==undefined || $scope.timescale.years=="" )
		{
			$scope.usagedata.timescale.years=[];
		}	
		if($scope.timescale.quarters==undefined || $scope.timescale.quarters=="")
		{
			$scope.usagedata.timescale.quarters=[];
		}
		
		if($scope.timescale.months==undefined || $scope.timescale.months=="")
		{
			$scope.usagedata.timescale.months=[];
		}
		/*if($scope.region.cities==undefined)
				$scope.usagedata.region.cities=[];
		if($scope.region.states==undefined)
			$scope.usagedata.region.states=[];
		if($scope.region.zip_codes==undefined)
			$scope.usagedata.region.zip_codes=[];*/
		
		

		console.log("timescale form data  : "+$scope.timescale);	
		console.log("years form data  : "+$scope.timescale.years);	
		console.log("quaters form data  : "+$scope.timescale.quarters);	
		console.log("month form data  : "+$scope.timescale.months);	
		
		console.log("my usagedata object :"+JSON.stringify($scope.usagedata));
		
		// to set usage object in anotehr controllr
		$rootScope.setUsageData($scope.usagedata);
		//code added by sanket
		$http({url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=soldVsConnected&group=true', 
                  method: "POST",
                  headers: { 'Content-Type': 'application/json','Accept':'text/plain' , 'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  },
                  data: $scope.usagedata
                  
         }).success(function(data, status) {
        	 	  /*console.log("usagedata : " + $scope.usagedata.toString());*/
                  if(!data || data.length === 0){
                       console.log("empty data");
            
                  }  else{
                      console.log("Got data for map..." );
                      renderMap("map-container", data);
                  }
                  console.log("data from server  :"+JSON.stringify(data));
                 }). error(function(data, status) {
                   
                        alert("No data found");
                        console.log("error:"+status);
                         
          });
		
	
		
		$scope.griddata=[];
		$scope.eng_griddata=[];	  		
		
		
		  $http({url:'http://ibm-iot.mybluemix.net/api/v1/usage', 
	          method: "POST",
	          headers: { 'Content-Type': 'application/json','Accept':'text/plain' , 'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  },
	           data: $scope.usagedata
	          
	         }).success(function(data, status) {
	           $scope.test = false;
                $scope.searchButtonText = "Apply filter";
	       	  		$scope.isDisabled = false
	        	 if(!data || data.data.length === 0){
	                 //$('<p>no updates found</p>').appendTo('#rr');
	        		 console.log("empty data");
	        			//$("#gridMax #gridMaxImg").addClass("hidden");

	        		//alert("No data found");
	              }
	        	 else	        	 
	       	  		$scope.griddata=data.data; 
	       	  			//alert(data);
	       	  		console.log("data from server  :"+JSON.stringify(data));
	         }). error(function(data, status) {
	           $scope.test = false;
                $scope.searchButtonText = "Apply filter";
	       	  		$scope.isDisabled = false     
	        	 alert("No data found");
	        	 console.log("error:"+status);
	        	 
	         });
		  
		  $http({url:'http://ibm-iot.mybluemix.net/api/v1/sensors/data', 
	            method: "POST",
	            headers: { 'Content-Type': 'application/json','Accept':'text/plain' , 'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  },
	             data: $scope.usagedata
	            
	           }).success(function(data, status) {
	            console.log("*****************Eng manager_Filter****************");
	             $scope.test = false;
	                $scope.searchButtonText = "Apply filter";
	                $scope.isDisabled = false
	             if(!data || data.data.length === 0){
	                   //$('<p>no updates found</p>').appendTo('#rr');
	               console.log("empty data");
	                //$("#gridMax #gridMaxImg").addClass("hidden");

	              //alert("No data found");
	                }
	             else            
	                $scope.eng_griddata=data; 
	                  //alert(data);
	                console.log("data from server  :"+JSON.stringify(data));

	           }). error(function(data, status) {
	            console.log("*****************Eng manager Error_Filter****************");
	             $scope.test = false;
	                $scope.searchButtonText = "Apply filter";
	                $scope.isDisabled = false     
	             alert("No data found");
	             console.log("error:"+status);
	             
	           });
		
	};
	
 
  
    		
    		// load all usage data on dashboard		
    		$scope.griddata=[];
    		$scope.eng_griddata=[];
    		
    	
    		//  console.log("json.scope.usage  :"+JSON.stringify($scope.usagedata)); 

    		  $http({url:"http://ibm-iot.mybluemix.net/api/v1/usage", 
  		     	method: "GET",
  		     	Accept: "text/plain"}).success(function(data, status) {
    	           
    	       	  			$scope.griddata=data.data; 
    	       	
    	       	  	//	console.log("Griddata"+JSON.stringify($scope.griddata));
    	       	  		
    	         }). error(function(data, status) {
    	              	 console.log("usageerror:"+status);
    	        	 
    	         });
    		  
    		  $http({url:"http://ibm-iot.mybluemix.net/api/v1/sensors/data", //api url
                  method: "POST",
                  Accept: "text/plain"}).success(function(data, status) {
                     console.log("*****************Eng manager_onLoad****************");
                            $scope.eng_griddata=data; //.states: array name--check in browser
                    
                        console.log("Griddata"+JSON.stringify(data));
                          
                     }). error(function(data, status) {
                      console.log("*****************Eng manager error_onLoad****************");
                             console.log("usageerror:"+status);
                       
                     });
    						
  	    
		var quarterMonthMapping = JSON.parse('{'
										+'"Quarter1":["Jan","Feb","Mar"],'
										+'"Quarter2":["Apr","May","Jun"],'
										+'"Quarter3":["Jul","Aug","Sep"],'
										+'"Quarter4":["Oct","Nov","Dec"]'
										+'}');	
			
			
			
		
		
			/*$scope.quarters = [];
			for(var keyName in quarterMonthMapping){        
				$scope.quarters.push(keyName);
			}
			
			$scope.quarterMonths=function(){
				$scope.months = quarterMonthMapping[$scope.timescale.quarters];
		    } */

		
		var quartersNew = JSON.parse(
				'{"0":[{'+
					'"id": 1,'+
					'"value": "Quarter1"'+
				'}, {'+
					'"id": 2,'+
					'"value": "Quarter2"'+
				'}, {'+
					'"id": 3,'+
					'"value": "Quarter3"'+
				'}, {'+
					'"id": 4,'+
					'"value": "Quarter4"'+
				'}]}'
		);
		var quarterMonthMap = JSON.parse(
				'{'+
				'"1":[{"id":1,"value":"Jan"},{"id":2,"value":"Feb"},{"id":3,"value":"Mar"}],'+
				'"2":[{"id":4,"value":"Apr"},{"id":5,"value":"May"},{"id":6,"value":"Jun"}],'+
				'"3":[{"id":7,"value":"Jul"},{"id":8,"value":"Aug"},{"id":9,"value":"Sep"}],'+
				'"4":[{"id":10,"value":"Oct"},{"id":11,"value":"Nov"},{"id":12,"value":"Dec"}]'+
			'}'
		);
		
		
		$scope.quarters = [];
		
		$scope.quarters=(quartersNew[0]);
		
		$scope.quarterMonths=function(){
			//$scope.months = quarterMonthMapping[$scope.timescale.quarters];
			$scope.months=[];
			$scope.timescale.months=undefined;
			$scope.months=quarterMonthMap[$scope.timescale.quarters];
	    } 

	
	 $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/states', 
	     method: "GET", Accept: "text/plain"}).success(function(data, status) {
	               
	    	 $scope.states=data.states;
	               
				           
	    }). error(function(data, status) {
	   
	       console.log(JSON.stringify(data));
	    });
	
	
	 
	
	 
	  
	 
	 //sanket changes
	 
	 $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/sales/years', 
	     	method: "get",
	     	Accept: "text/plain"
	     	})
	     .success(function(data, status) {
	    	 $scope.sales_years=data.sales_years;
//	    	 console.log($scope.sales_years);
	     })
	    . error(function(data, status) {
	       console.log(JSON.stringify(data));
	    });
	 $scope.cities;
	 $scope.selectCities=function(){
		 $scope.region.cities=undefined;
		 $scope.region.zip_codes=undefined;
		 $scope.zips=[];
		 $http({url:"http://ibm-iot.mybluemix.net/api/v1/config/states/cities?state_names="+$scope.region.states, 
		     	method: "get",
		     	Accept: "text/plain"})
		     	.success(function(data, status) {
		    	 $scope.cities=data[$scope.region.states];
		    	 console.log("gopalcity:"+JSON.stringify($scope.cities));
		    }). error(function(data, status) {
		      // alert("error"  +status);
		       //console.log(JSON.stringify(data));
		    });
		    
		    }
	 $scope.selectZip=function(){
		
		 $scope.region.zip_codes=undefined;
		 //http://washing-machines-api.mybluemix.net/api/v1/config/states/texas/cities/austin/zipcodes
		 $http({url:"http://ibm-iot.mybluemix.net/api/v1/config/cities/zipcodes?cities_names="+$scope.region.cities,
		     	method: "GET",
		     	Accept: "text/plain"})
		     	.success(function(data, status) {
		     	$scope.zips = data[$scope.region.cities];
		     	
		    }). error(function(data, status) {
		      // alert("error"  +status);
		       //console.log(JSON.stringify(data));
		    });
		    
		    }
		
	$scope.maximizeGrid=function(){
		var gridNormal = $("#gridNormal").clone();
		
		$("#gridMax").empty();
		$("#gridMax").append(gridNormal);
		
		$("#gridMax #gridMaxImg").addClass("hidden");
		$("#gridMax #gridCloseImg").removeClass("hidden");
		//$("#gridCloseImg").removeClass("hidden");
		
		  $("#gridAdjustHeight").height(560);

	$("#gridMax").removeClass("hidden");
	
	
	
	}
	
	$("body").on("click","#gridCloseImg",function(){
		$("#gridMax").empty();
		$("#gridMax").addClass("hidden");
		  $("#gridAdjustHeight").height(160);

		//$scope.plotChartFunction("container");
    });
	
	/*$scope.closeGrid=function(){
		
		alert("closeGrid");

		$("#gridMax").empty();
		
		
		$("#gridMax #gridMaxImg").removeClass("hidden");
		$("#gridMax #gridCloseImg").addClass("hidden");
		
		$("#gridMax").addClass("hidden");
	}
*/}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/


App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils',
  function($rootScope, $scope, $state, $http, $timeout, Utils){
	
	$rootScope.intete=1;
	$scope.make;
	$scope.makeData;
    $scope.valArr=[2,3,4,56,7567,2345];
      $rootScope.filterIcons=[];
      
    
      
	$scope.getCall=function(p){
		console.log("calling"+p);
	}
	
    
    $scope.clearfilter=function(){
          
         $scope.search={};
         $rootScope.filterIcons=[];
      }
    
    $scope.createIconArray=function(){
        $scope.someArr=[];
        
        if($scope.search.selectedSKU && $scope.search.selectedSKU.length != 0)
            $scope.someArr.push($scope.search.selectedSKU);
        
        if($scope.search.selectedMake && $scope.search.selectedMake.length != 0)
            $scope.someArr.push($scope.search.selectedMake);
        
        if($scope.search.selectedModel && $scope.search.selectedModel.length != 0)
            $scope.someArr.push($scope.search.selectedModel);
        $scope.valArr=$scope.someArr;
        
        $rootScope.filterIcons=$scope.someArr;
        console.log($rootScope.filterIcons);
        
    };
    
    
    $scope.myDate = new Date();
      
      $scope.selectedSKU=function(){
          $scope.createIconArray();
          
      }

    $scope.search={};
      $scope.selectedMake=function(){
          
          $scope.search.selectedModel="";
          $scope.search.selectedSKU="";
          $scope.createIconArray();
          $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/makes/models?make_names='+$scope.search.selectedMake, 
	     method: "GET", Accept: "text/plain"}).success(function(data, status) {
	               
	    	 $scope.models=data[$scope.search.selectedMake];
	    	 //console.log("manufacture year :"+JSON.stringify(data));
              
                /*$scope.valArr.push($scope.search.selectedMake);
              alert($scope.valArr);*/
                
				           
				           
	    }). error(function(data, status) {
	      // alert("error"  +status);
	      // console.log(JSON.stringify(data));
	    });
      }
      
      $scope.selectedModel=function(){
          $scope.search.selectedSKU="";
          $scope.createIconArray();
          
          $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/models/skus?model_names='+$scope.search.selectedModel, 
	     method: "GET", Accept: "text/plain"}).success(function(data, status) {
	               
	    	 $scope.SKUs=data[$scope.search.selectedModel];
              console.log($scope.SKUs);
	    	 //console.log("manufacture year :"+JSON.stringify(data));
              
              
				           
				           
	    }). error(function(data, status) {
	      // alert("error"  +status);
	      // console.log(JSON.stringify(data));
	    });
      }
    
         $scope.applyProductFilter=function(){

                  console.log("applied product filter  make :"+$scope.search.selectedMake+", model :"+$scope.search.selectedModel+", sku :"+$scope.search.selectedSKU+", MFG Date :"+$scope.search.mfgDate);

             
           var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

          // console.log(day, monthNames[monthIndex], year);
            console.log("date  :"+day + ' ' +monthIndex + ' ' + year);  

             
                }

    
    
    var collapseList = [];
    
    $rootScope.name="";
    // demo: when switch from collapse to hover, close all items
//    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
//      if ( newVal === false && oldVal === true) {
//        closeAllBut(-1);
//      }
//    });
    
   
  //  $rootScope.types;
    $rootScope.test="gopal";
    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    $scope.loadSidebarMenu = function() {

      var menuJson = 'server/sidebar-menu.json',
          menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(menuURL)
        .success(function(items) {
           $rootScope.menuItems = items;
//           console.log(JSON.stringify( $rootScope.menuItems ));
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading menu');
        });
     };

     $scope.loadSidebarMenu();

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem,subitem) {
    	$rootScope.intete+=1;
    	console.log("Toggle collapse"+$rootScope.intete+""+$scope.makeData+""+subitem);
    	

      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
      
      $scope.lastEventFromChild = isChild($index);

      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

    $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/makes', 
	     method: "GET", Accept: "text/plain"}).success(function(data, status) {
	               
	    	 $scope.makes=data.makes;
	    	 
				       
				           
				           
	    }). error(function(data, status) {
	      // alert("error"  +status);
	       console.log(JSON.stringify(data));
	    });
	 
    
    
    $http({url:'http://ibm-iot.mybluemix.net/api/v1/config/manufacture/years', 
	     method: "GET", Accept: "text/plain"}).success(function(data, status) {
	               
	    	 $scope.years=data.years;
	    	 console.log("manufacture year :"+data);
				       
				           
				           
	    }). error(function(data, status) {
	      // alert("error"  +status);
	       console.log(JSON.stringify(data));
	    });
	 
    
    
    $scope.selectMake=function()
    {
    	
    	alert("SELECTED");
    }
	 
	 /*$scope.selectMake=function(){
		
		console.log("in select make"); 
		 // alert($scope.selected_make);
		 $http({url:"http://washing-machines-api.mybluemix.net/api/v1/config/makes/models?make_names="+$scope.selected_make, 
		     	method: "get",
		     	Accept: "text/plain"})
		     	.success(function(data, status) {
		    	 $scope.models=data[$scope.selected_make];
		    	 
		    //	 alert(JSON.stringify($scope.models));
		    	 console.log(JSON.stringify($scope.models));
		    }). error(function(data, status) {
		      // alert("error"  +status);
		       //console.log(JSON.stringify(data));
		    });
		    
		    }*/
	 
	
}]);

App.controller('filterIconController',['$rootScope','$scope','$interval',function($rootScope,$scope,$interval){
    
   function callMe(){
       $scope.someArray=$rootScope.filterIcons;
   }
   
   $interval(callMe,1000);
}]);

App.controller('mapController',function($scope,$http){
	$scope.plotMapFunction = function(divId){
			$http.post('http://ibm-iot.mybluemix.net/api/v1/sales?report_name=soldVsConnected&group=true').success(function(data, status) {
			    	console.log("Sales Volume List : "+JSON.stringify(data));			    	
			    	renderMap(divId, data);
			    	
			    }). error(function(data, status) {
			      // alert("error"  +status);
			       console.log('Error : ' + status);
			       renderMap(divId, data);
			    });
	
	}
});

function renderMap(divId, salesData){
	     
	var salesDataStr = JSON.stringify(salesData);
	
	// Modify the json data set according to required highmap data format
	salesDataStr = salesDataStr.replace(/"latitude":/g, '"lat":');
	salesDataStr = salesDataStr.replace(/"longitude":/g, '"lon":');
	salesDataStr = salesDataStr.replace(/"unitsSold":/g, '"z":');
	
	salesData = JSON.parse(salesDataStr);
	
	// Initiate the map
	var chart = Highcharts.Map({
        chart: {
            renderTo: divId
        },
        
	    title: {
	        text: 'Sales Volume Distribution'
	    },
	
	    mapNavigation: {
	        enabled: true
	    },
	
	    tooltip: {
	        headerFormat: '',
	        pointFormat: '<b>Sales vs Connected</b><br> City: {point.city}, <br>Units Sold: {point.z}, <br>Units Connected: {point.unitsConnected}'
	    },
	    
	    plotOptions: {
	        mapbubble:{
	            minSize:20,
	            maxSize:'12%'
	        }
	    },
	    
	    series: [{
	        //mapData: Highcharts.maps['custom/world'],
	        mapData: Highcharts.maps['countries/us/us-all'],
	        name: 'Basemap',
	        borderColor: '#A0A0A0',
	        nullColor: 'rgba(200, 200, 200, 0.3)',
	        showInLegend: false
	    }, {
	        name: 'Separators',
	        type: 'mapline',
	        //data: Highcharts.geojson(Highcharts.maps['custom/world'], 'mapline'),
	        data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
	        color: '#E0E0E0',
	        showInLegend: false,
	        enableMouseTracking: false
	    }, {
	        type: 'mapbubble',
	        name: 'Sales Volume',
	        color: '#4682B4',
	        data: salesData,
	        dataLabels: {
	            enabled: true,
	            format: '{point.z}',
	            color:'#000000'
	        }
	    }]
	});
	
	//console.log('Rendered the app successfully');
	
}

function renderPieChart(divId, insightsData, chartTitle){
	
	var pieChart = new Highcharts.Chart({
        chart: {
        	renderTo:divId,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: chartTitle,
            align: 'left',
            style: {
                color: '#0099cc'
            },
            //floating: true,
            y: 20,
            x: 45
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle',
            x: -10,
            y: 30,
            itemMarginBottom: 20,
            labelFormatter: function () {
                return this.name + ' - ' + this.percentage.toFixed(2) + '%';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: ['#0099cc', '#339933', '#ffcc00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
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

App.controller('myController', function ($scope,$http,$rootScope) {
	$scope.usagedata=null;
	$rootScope.selectedSales="";
	$scope.selectedSales;
	$scope.selectedChart="";
	$scope.seneorkey="";
	
	  $scope.EngchartTypes=['LineChart'];
	  $scope.selectedChart=$scope.EngchartTypes[0];
	
	$scope.linechartData=null;
	  $scope.data = null;
	  $scope.barchartData=null;
	  $scope.barLabels = ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016'];
	  $scope.barSeries = ['Sold', 'Connected'];

	  $scope.barData = [[65, 59, 80, 81],
	                    [28, 48, 40, 19]];
	 
	  
	  $rootScope.setUsageData=function(usagedata){
		  $scope.usagedata=usagedata;
		  console.log("In rootScope Usage data:: "+JSON.stringify($scope.usagedata)+":: "+$scope.selectedSales);
		  if($scope.selectedSales==0){
				$http({url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=soldVsConnected&group=true', 
	                method: "POST",
	                headers: { 'Content-Type': 'application/json','Accept':'text/plain' , 'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  },
	                data: $scope.usagedata
	                
				       }).success(function(data, status) {
				      	 	  /*console.log("usagedata : " + $scope.usagedata.toString());*/
				                if(!data || data.length === 0){
				                     console.log("empty data for soldVsConnected");
				          
				                }  else{
				                    console.log("Got data for soldVsConnected..." );
				                }
				                console.log("data from server  :"+JSON.stringify(data));
				               }). error(function(data, status) {
				                 
				                      alert("No data found");
				                      console.log("error:"+status);
				                       
				        });
			}
			else if($scope.selectedSales== 1){
				$http({url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=top3SellingModels&group=true', 
	                method: "POST",
	                headers: { 'Content-Type': 'application/json','Accept':'text/plain' , 'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  },
	                data: $scope.usagedata
	                
				       }).success(function(data, status) {
				      	 	  /*console.log("usagedata : " + $scope.usagedata.toString());*/
				                if(!data || data.length === 0){
				                     console.log("empty data for top3SellingModels");
				          
				                }  else{
				                    console.log("Got data for top3SellingModels..." );
				                }
				                console.log("data from server  :"+JSON.stringify(data));
				               }). error(function(data, status) {
				                 
				                      alert("No data found");
				                      console.log("error:"+status);
				                       
				        });
				
			} else if($scope.selectedSales==2){
				$http({url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=salesVolume&group=true', 
	                method: "POST",
	                headers: { 
			                	'Content-Type': 'application/json',
			                	'Accept':'text/plain' ,
			                	'Access-Control-Allow-Origin' :'http://washing-machines-api.mybluemix.net/api/v1',
			                	'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Credentials':true  
	                		 },
	                data: $scope.usagedata
	                
				       }).success(function(data, status) {
				      	 	  /*console.log("usagedata : " + $scope.usagedata.toString());*/
				                if(!data || data.length === 0){
				                     console.log("empty data for salesVolume");
				          
				                }  else{
				                    console.log("Got data for salesVolume..." );
				                }
				                console.log("data from server  :"+JSON.stringify(data));
				               }). error(function(data, status) {
				                 
				                      alert("No data found");
				                      console.log("error:"+status);
				                       
				        });
				
			}
	  }
	  
	  
	  // display sensors Name for Engg Manager
	  $http({
		  url:'http://ibm-iot.mybluemix.net/api/v1/sensors', 
		  method: 'GET',
		}).success(function(data, status) {
			$scope.sensorsList=data;
	    	console.log("Sensors Name List: :"+JSON.stringify(data));					           
	    }). error(function(data, status) {
	      // alert("error"  +status);
	       console.log(JSON.stringify(data));
	    });
	  
	  $http({
			  url:'http://ibm-iot.mybluemix.net/api/v1/sales/charts', 
			  method: 'GET',
			}).success(function(data, status) {
				$scope.salesList=data;
//				$scope.chartTypes=data[parseInt($scope.selectedSales)].chartTypes;
		    	console.log("Sales Volume List: :"+JSON.stringify(data));					           
		    }). error(function(data, status) {
		      // alert("error"  +status);
		       console.log(JSON.stringify(data));
		    });
	  
	  
	  $scope.Engdisp=function(index){
			if(index==0)
				$scope.selectedSensors="";
		

			if($scope.selectedSensors != '' && $scope.selectedSensors != null && $scope.selectedSensors != undefined){
//				$rootScope.selectedSales=$scope.selectedSales;
				 $scope.sensortype=$scope.sensorsList[$scope.selectedSensors].displayName;
				 $scope.seneorkey=$scope.sensorsList[$scope.selectedSensors].key;
				 
			
				
			}
			else
					$scope.sensortype="";
			
			
			console.log("Sensor types:"+$scope.sensortype+ $scope.seneorkey);
					
			$scope.plotEngManagerChartFunction('container', $scope.seneorkey);
		}
	  
	  
	  
	$scope.disp=function(index){
		if(index==0)
			$scope.selectedSales="";

		if($scope.selectedSales != '' && $scope.selectedSales != null && $scope.selectedSales != undefined){
//			$rootScope.selectedSales=$scope.selectedSales;
			 $scope.chartTypes=$scope.salesList[$scope.selectedSales].chartTypes;
			 $scope.selectedChart=$scope.chartTypes[0];
		}
		else
				$scope.chartTypes="";
		
		console.log("Chart types:"+$scope.chartTypes+"::"+index);
		console.log("selectedSales:"+$scope.selectedSales+":Chart :"+$scope.selectedChart);
	}
	
	$scope.dispChart=function(selectedChart){
		console.log("in disp chart"+selectedChart);
		console.log("in disp sensors"+selectedSensors);
//		if($scope.selectedChart=='Pie'){	
////			$scope.selectedChart='Pie';
//			 $http({
//				  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=soldVsConnected&group=false', 
//				  method: 'POST'
//					 
//				}).success(function(data, status) {
//			    	console.log("Pie Chart response :"+JSON.stringify(data));	
//			    	$scope.data[0]=data.unitsSold;
//			    	$scope.data[1]=data.unitsConnected;
//			    	
//			    }). error(function(data, status) {
//			       console.log(JSON.stringify(data));
//			    });
//			
//		}
//		else if($scope.selectedChart=='Bar'){
////			$scope.selectedChart='Bar';
//			 $http({
//				  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=top3SellingModels&group=false', 
//				  method: 'POST'
//				 
//				}).success(function(data, status) {
//			    	console.log("Bar Chart response :"+JSON.stringify(data));
//			    	//$scope.barData=data;
//			    	
//			    	
//			    }). error(function(data, status) {
//			       console.log(JSON.stringify(data));
//			    });
//		}
//		else if($scope.selectedChart=='Multiline'){
////			$scope.selectedChart='Multiline';
////			 $http({
////				  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=salesVolume&group=false', 
////				  method: 'POST'
////				 
////				}).success(function(data, status) {
////			    	console.log("Multiline Chart response :"+JSON.stringify(data));	
////			    	$scope.linechartData=data;
////			    }). error(function(data, status) {
////			       console.log(JSON.stringify(data));
////			    });
//		}
	}
	
	//code by Babagouda
	
$scope.plotPieChart=function(divID){
	$scope.loadingText = "Loading data...";    
	  $scope.isDisabled = true;
	  $scope.progress = true;
	  
	if($scope.data==null){
	 $http({
		  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=soldVsConnected&group=false', 
		  method: 'POST'
			 
		}).success(function(data, status) {
	    	console.log("Pie Chart response :"+JSON.stringify(data));
	    	$scope.progress = false;
	    	$scope.data=[];
	    	$scope.data[0]=data.unitsSold;
	    	$scope.data[1]=data.unitsConnected;
	    	$scope.connPercentage=parseFloat(($scope.data[1]/$scope.data[0])*100).toFixed(2);
	    	$scope.unconnPercentage=parseFloat((($scope.data[0]-$scope.data[1])/$scope.data[0])*100).toFixed(2);
	    	$(function() {
	            // Create the chart
	            chart = new Highcharts.Chart({
	                chart: {
	                    renderTo: ''+divID,
	                    type: 'pie'
	                },
	                title: {
	                    text: 'Sold Vs Connected'
	                },
	               
	                plotOptions: {
	                    pie: {
	                        shadow: false
	                    }
	                },
	                tooltip: {
	                    formatter: function() {
	                        return '<b>'+ this.point.name +'</b>: '+ this.y +'%';
	                    }
	                },
	                series: [{
	                    name: 'Browsers',
	                    data: [["Connected",parseFloat($scope.connPercentage)],["Unconnected",parseFloat($scope.unconnPercentage)]],
	                    size: '80%',
	                    innerSize: '80%',
	                    showInLegend:true,
	                    dataLabels: {
	                        enabled: false
	                    }
	                }]
	            });
	        });
	    }). error(function(data, status) {
	    	$scope.progress = false;
	       console.log(JSON.stringify(data));
	       $scope.progress = false;
	    })
	   
	}else{
		$scope.progress = false;
		$(function() {
            // Create the chart
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: ''+divID,
                    type: 'pie'
                },
                title: {
                    text: 'Sold Vs Connected'
                },
               
                plotOptions: {
                    pie: {
                        shadow: false
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y +'%';
                    }
                },
                series: [{
                    name: 'Browsers',
                    data: [["Connected",parseFloat($scope.connPercentage)],["Unconnected",parseFloat($scope.unconnPercentage)]],
                    size: '80%',
                    innerSize: '80%',
                    showInLegend:true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
        });
	}
	
	}

	$scope.plotBarChart=function(divId){
		$scope.loadingText = "Loading data...";    
		  $scope.isDisabled = true;
		  $scope.progress = true;
		  
		if($scope.barchartData==null){
		 $http({
			  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=top3SellingModels&group=false', 
			  method: 'POST'
			 
			}).success(function(data, status) {
				$scope.progress = false;
				
		    	$scope.barchartData=data;
		    	console.log("Bar Chart response :"+JSON.stringify($scope.barchartData=data));
		    	
		    	$(function () {
				    $('#bar').highcharts({
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: 'Top 3 Selling Models'
				        },
				        xAxis: {
				            categories: [
				                '2016'
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
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
				        series: [{
				            name: $scope.barchartData.sales[0].item,
				            data: [$scope.barchartData.sales[0].unitsSold]

				        }, {
				            name: $scope.barchartData.sales[1].item,
				            data: [$scope.barchartData.sales[1].unitsSold]

				        }, {
				            name: $scope.barchartData.sales[2].item,
				            data: [$scope.barchartData.sales[2].unitsSold]

				        }]
				    });
				});
			}). error(function(data, status) {
				$scope.progress = false;
			       console.log(JSON.stringify(data));
			    });
		}else{
			$scope.progress = false;
			$(function () {
			    $('#bar').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Top 3 Selling Models'
			        },
			        xAxis: {
			            categories: [
			                '2016'
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
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
			        series: [{
			            name: $scope.barchartData.sales[0].item,
			            data: [$scope.barchartData.sales[0].unitsSold]

			        }, {
			            name: $scope.barchartData.sales[1].item,
			            data: [$scope.barchartData.sales[1].unitsSold]

			        }, {
			            name: $scope.barchartData.sales[2].item,
			            data: [$scope.barchartData.sales[2].unitsSold]

			        }]
			    });
			});
		}
		
		
	}
	$scope.plotChartFunction = function(divId){
		$scope.loadingText = "Loading data...";    
		  $scope.isDisabled = true;
		  $scope.progress = true;
		  
		if($scope.linechartData==null){
		 $http({
			  url:'http://ibm-iot.mybluemix.net/api/v1/sales?report_name=salesVolume&group=false', 
			  method: 'POST'
			 
			}).success(function(data, status) {
				$scope.progress = false;
		    	console.log("Multiline Chart response :"+JSON.stringify(data));	
		    	$scope.linechartData=data;
		    	
		    	//linechart data
		    	$("#"+divId).highcharts( {
		    		credits:false,
		    		title:false,
		    		legend: {enabled:false},
		    	    xAxis: {
		    	        categories: ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016']
		    	    },
		    	    yAxis: {
		    			title:false
		    		    },
		    		    tooltip: {
		    		    	backgroundColor: '#87C1E6',
		    		    	shared: true,
		    			    style:{
		    					color:'#ffffff'
		    				}
		    	        },
		    	        plotOptions: {
		    	            series: {
		    	            	 color: "#f0f0f0", 
		    	                marker: {
		    	                	fillColor: '#FFFFFF', 
		    	                    lineWidth: 2,
		    	                    lineColor: "#6BD500",  // inherit from series 
		    	                    radius: 6
		    	                }
		    	            }
		    	        },
		    	    series: [{
		    		    		name:$scope.linechartData[0].make,
		    	        		data: [$scope.linechartData[0].totalSales,$scope.linechartData[1].totalSales,$scope.linechartData[2].totalSales,$scope.linechartData[2].totalSales]
		    	    },
		    	    {
		        		name:""+$scope.linechartData[3].make,
		        		data: [$scope.linechartData[3].totalSales,$scope.linechartData[4].totalSales,$scope.linechartData[5].totalSales,$scope.linechartData[5].totalSales]
		    		},
		    		{
		    			name:""+$scope.linechartData[6].make,
		        		data: [$scope.linechartData[6].totalSales,$scope.linechartData[7].totalSales,$scope.linechartData[8].totalSales,$scope.linechartData[8].totalSales]
		    		}]
		    	});
		    }). error(function(data, status) {
		    	$scope.progress = false;
		       console.log(JSON.stringify(data));
		    });
		}else{
			$scope.progress = false;
			$("#"+divId).highcharts( {
	    		credits:false,
	    		title:false,
	    		legend: {enabled:false},
	    	    xAxis: {
	    	        categories: ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016']
	    	    },
	    	    yAxis: {
	    			title:false
	    		    },
	    		    tooltip: {
	    		    	backgroundColor: '#87C1E6',
	    		    	shared: true,
	    			    style:{
	    					color:'#ffffff'
	    				}
	    	        },
	    	        plotOptions: {
	    	            series: {
	    	            	 color: "#f0f0f0", 
	    	                marker: {
	    	                	fillColor: '#FFFFFF', 
	    	                    lineWidth: 2,
	    	                    lineColor: "#6BD500",  // inherit from series 
	    	                    radius: 6
	    	                }
	    	            }
	    	        },
	    	    series: [{
	    		    		name:$scope.linechartData[0].make,
	    	        		data: [$scope.linechartData[0].totalSales,$scope.linechartData[1].totalSales,$scope.linechartData[2].totalSales,$scope.linechartData[2].totalSales]
	    	    },
	    	    {
	        		name:""+$scope.linechartData[3].make,
	        		data: [$scope.linechartData[3].totalSales,$scope.linechartData[4].totalSales,$scope.linechartData[5].totalSales,$scope.linechartData[5].totalSales]
	    		},
	    		{
	    			name:""+$scope.linechartData[6].make,
	        		data: [$scope.linechartData[6].totalSales,$scope.linechartData[7].totalSales,$scope.linechartData[8].totalSales,$scope.linechartData[8].totalSales]
	    		}]
	    	});
		}
	
	}
	
	$scope.plotEngManagerChartFunction = function(divId,key){
		
		
		var url="http://ibm-iot.mybluemix.net/api/v1/sensors/data?sensor_name="+key;
		
			
		
		 $http({
			  url:url, 
			  method: 'POST'
			 
			}).success(function(data, status) {
				$scope.progress = false;
		    	console.log("Multiline Chart response :"+JSON.stringify(data));	
		    	$scope.linechartData=data;
		
		
		$("#"+divId).highcharts( {
			credits:false,
			title:false,
			legend: {enabled:false},
		    xAxis: {
		        categories: ['SUN','MON','TUE','WED','THU','FRI','SAT']
		    },
		    yAxis: {
				title:false
			    },
			    tooltip: {
			    	backgroundColor: '#87C1E6',
			    	shared: true,
				    style:{
						color:'#ffffff'
					}
		        },
		        plotOptions: {
		            series: {
		            	 color: "#f0f0f0", 
		                marker: {
		                	fillColor: '#FFFFFF', 
		                    lineWidth: 2,
		                    lineColor: "#6BD500",  // inherit from series 
		                    radius: 6
		                }
		            }
		        },
		        series: [{
		    		name:$scope.linechartData[0].make,
	        		data: [$scope.linechartData[0].avgUsage,$scope.linechartData[1].avgUsage,$scope.linechartData[2].avgUsage,$scope.linechartData[2].avgUsage]
	    },
	    {
    		name:""+$scope.linechartData[3].make,
    		data: [$scope.linechartData[3].avgUsage,$scope.linechartData[4].avgUsage,$scope.linechartData[5].avgUsage,$scope.linechartData[5].avgUsage]
		},
		{
			name:""+$scope.linechartData[6].make,
    		data: [$scope.linechartData[6].avgUsage,$scope.linechartData[7].avgUsage,$scope.linechartData[8].avgUsage,$scope.linechartData[8].avgUsage]
		}]
		});
		})
	}
	
	$scope.maximize = function(){
		var chartParent = $("#chartParent").clone();
		
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
     	if($scope.selectedChart=='Multiline'){
     		$("#hiddenDiv #container").removeClass("graphDiv");
     		$("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");
         	
         	$("#hiddenDiv #chartParent").addClass("chartDiv-maximize");
         	
         	$("#hiddenDiv #container").addClass("graphDiv-maximize");
         	$("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");
         	
         	$("#hiddenDiv #maximize").addClass("hidden");
         	$("#hiddenDiv #close").removeClass("hidden");
         	
         	$scope.plotChartFunction("hiddenDiv #container");
     	
     	
     	}if($scope.selectedChart=='LineChart'){
     		
     	
     		$("#hiddenDiv #container").removeClass("graphDiv");
     		$("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");
         	
         	$("#hiddenDiv #chartParent").addClass("chartDiv-maximize");
         	
         	$("#hiddenDiv #container").addClass("graphDiv-maximize");
         	$("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");
         	
         	$("#hiddenDiv #maximize").addClass("hidden");
         	$("#hiddenDiv #close").removeClass("hidden");
         	
         	
         	
       //  	$scope.plotEngManagerChartFunction('container', $scope.seneorkey);
     	
     	
     	}
     	
     	if($scope.selectedChart=='Pie'){
     		$("#hiddenDiv #piecontainer").removeClass("graphDiv");
     		$("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");
         	
         	$("#hiddenDiv #chartParent").addClass("chartDiv-maximize");
         	
         	$("#hiddenDiv #piecontainer").addClass("graphDiv-maximize");
         	$("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");
         	
         	$("#hiddenDiv #maximize").addClass("hidden");
         	$("#hiddenDiv #close").removeClass("hidden");
         	$scope.plotPieChart("piecontainer");
         }
     	
     	if($scope.selectedChart=='Bar'){
     		$("#hiddenDiv #bar").removeClass("graphDiv");
     		$("#hiddenDiv #chartFilterDivId").removeClass("chart-filterDiv");
         	
         	$("#hiddenDiv #chartParent").addClass("chartDiv-maximize");
         	
         	$("#hiddenDiv #bar").addClass("graphDiv-maximize");
         	$("#hiddenDiv #chartFilterDivId").addClass("chart-filterDiv-maximize");
         	
         	$("#hiddenDiv #maximize").addClass("hidden");
         	$("#hiddenDiv #close").removeClass("hidden");
         	$scope.plotBarChart("hiddenDiv #bar");
         }
     	
	};
	$("body").on("click","#hiddenDiv #close",function(){
		$("#hiddenDiv").empty();
		$("#hiddenDiv").addClass("hidden");
		if($scope.selectedChart=='Multiline'){
			
			$scope.plotChartFunction("container");
		}else if($scope.selectedChart=='Bar'){
			$scope.plotBarChart("bar");
		}else if($scope.selectedChart=='Pie'){
			$scope.plotPieChart("piecontainer");
		}else if($scope.selectedChart=='LineChart'){
			
         	//$scope.plotEngManagerChartFunction('container', $scope.seneorkey);
		}
    });
	/* $scope.closing = function(){
		console.log("ha ha ha");
	}; */
			
});

/*App.controller('filterController', function ($scope,$http) {
	
	var url = 'http://washing-machines-api.mybluemix.net/api/v1/config/states';
    
	$http.get("https://washing-machines-api.mybluemix.net/api/v1/config/states")
	 .success(function(response){
		 $scope.states=[];
		 $scope.states = response.states; 
	    })
	 .error(function(response){
	        alert(response);
	    });
	
});*/

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  	console.log("inside sidebar directive");

  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  
  
  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
    	
    	
      
      $scope   = scope;
      $sidebar = element;

     
      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {
    	//  
        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

        //  subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );
          	console.log("inside sidebar directive condition");
          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });
      
     

      scope.$on('closeSidebarMenu', function() {
    	  console.log("inside sidebar directive");
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
     /* subNav.remove();*/
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

  
  $scope.selectMake=function()
  {
  	
  	alert("SELECTED");
  }
  
}]);
/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
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

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
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
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
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


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

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
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
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
// ----------------------------------- 

var myApp = angular.module('myAppName', ['angle']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition
  
}]);

App.controller('MyController', ['$scope', function($scope) {
  /* controller code */
  console.log("my controller running");
}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);

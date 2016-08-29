(function() {
	'use strict';
	
	angular
	    .module('angle')
	    .run(appRun);
	
	appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', 'loginService', '$location'];
	
	function appRun($rootScope, $state, $stateParams, $window, loginService, $location) {
		console.log('in app.run.js file');
		 // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.isApplyFiterButton = true;
        $rootScope.isReportFiltering = true;


        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/

        // Scope Globals
        // ----------------------------------- 
        $rootScope.app = {
			name : 'Angle',
			description : 'Angular Bootstrap Admin Template',
			year : ((new Date()).getFullYear()),
			layout : {
				isFixed : true,
				isCollapsed : true,
				isBoxed : false,
				isRTL : false,
				horizontal : false,
				isFloat : false,
				asideHover : false
			},
			useFullLayout : false,
			hiddenFooter : false,
			viewAnimation : 'ng-fadeInUp'
		};
        
		$rootScope.user = {
			name : 'John',
			job : 'ng-Dev',
			picture : 'app/img/user/02.jpg'
		};
		
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.currentState = toState.name;
			
			if (toState.name == 'app.notificationconf' || toState.name == 'app.twitterinsights' || toState.name == 'app.reports') {
				$rootScope.isDisableSideBar = true;
			} else {
				$rootScope.isDisableSideBar = false;
			}
			
			if(!$window.localStorage.loginCredentails) {
				event.preventDefault();
				$state.go('page.login');
			}
	    });
		
	}
})();
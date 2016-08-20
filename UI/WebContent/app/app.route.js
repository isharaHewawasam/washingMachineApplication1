(function() {
	'use strict';

	angular
	    .module('angle')
	    .config(appRoute);

	appRoute.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'routerHelperProvider'];

	function appRoute($stateProvider, $locationProvider, $urlRouterProvider, helper) {
		// Set the following to true to enable the HTML5 Mode
		  // You may have to set <base> tag in index and a routing configuration in your server
		console.log('in app.route.js file');
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
		      //  templateUrl: helper.basepath('app.html'),
		        templateUrl: 'app/components/config/app.html',
		        controller: 'AppController',
		        resolve: helper.resolveFor('modernizr', 'icons')
		    })

		    .state('page', {
		        url: '/page',
		        //templateUrl: 'app/views/page.html',
		        templateUrl: 'app/components/login/logout.view.html',
		        resolve: helper.resolveFor('modernizr', 'icons'),
		        controller: ["$rootScope", function($rootScope) {
		            $rootScope.app.layout.isBoxed = false;
		        }]
		    })
		    .state('page.login', {
		        url: '/login',
		        title: "Login",
		        controller: 'LoginController',

		        /*templateUrl: helper.basepath('login/login.view.html')*/
		        templateUrl: 'app/components/login/login.view.html',
		        data:{title: 'IoT for Electronics - Login'}
		        })

		    .state('app.login', {
		        url: '/login',
		        title: "Login",
		        controller: 'LoginFormController',
		        templateUrl:helper.basepath('Login.html')
		        //templateUrl: 'app/pages/login.html'
		    })
		    .state('app.singleview', {
		        url: '/singleview',
		        title: 'Single View',
		        controller: 'DashboardController',
		      //  templateUrl: helper.basepath('singleview.html'),
						templateUrl: 'app/components/dashboard/dashboard_mktmgr.view.html',
		        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
		    })

		    .state('app.engmanagerview', {
		        url: '/engmanagerview',
		        title: 'engmanagerview',
		        controller: 'DashboardController',
		        //templateUrl: helper.basepath('engmanagerview.html'),
						templateUrl: 'app/components/dashboard/dashboard_engmgr.view.html',
		        data:{title: 'IoT for Electronics - Engineering Manager Dashboard'}
		    })
		    .state('app.reports', {
		        url: '/reports',
		        title: 'Reports View',
		        controller: 'reportController',
		      //  templateUrl: helper.basepath('reports.html'),
				  	templateUrl: 'app/components/reports/reports.view.html',
		        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
		    })
			.state('app.myownview', {
		        url: '/myownview',
		        title: 'My own view',
				    controller: 'MyController',
		      //  templateUrl: helper.basepath('myownview.html')
		        templateUrl: 'app/layouts/myownview.html',
		    })
		    .state('app.submenu', {
		        url: '/submenu',
		        title: 'Submenu',

		       // templateUrl: helper.basepath('submenu.html')
		        templateUrl: 'app/layouts/submenu.html',
		    })
		    .state('app.twitterinsights', {
		        url: '/twitterinsights',
		        title: 'Twitter Insights View',
		        controller: 'TwitterInsightsController',
		       // templateUrl: helper.basepath('twitterinsights.html'),
		        templateUrl: 'app/components/twitterinsights/twitterinsights.view.html',
		        data:{title: 'IoT for Electronics - Marketing Manager Dashboard'}
		    })
		    .state('app.notificationconf', {
		        url: '/notificationconf',
		        title: 'Notification Configuration View',
		        controller: 'NotificationConfController',
		      //  templateUrl: helper.basepath('notificationconfiguration.html'),
					templateUrl: 'app/components/notification/notification.view.html',
		        data:{title: 'Notification Configuration'}
		    });
	}
})();

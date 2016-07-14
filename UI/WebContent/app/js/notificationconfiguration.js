App.controller('NotificationConfController', 
		['$rootScope', '$scope', '$state', '$http', '$window', "iot.config.ApiClient",
                 function($rootScope, $scope, $state, $http, $window, configApiClient){

		console.log(">>>>>>>>>Notification Configuration<<<<<<<<<<<")

		$scope.washErrorsIncrease = [{"name": "Error 1"}, {"name": "Error 2"}];
		
		$scope.washErrorsDecrease = [{"name": "Error 1"}, {"name": "Error 2"}];
	
		$scope.twitterNegativeScore = [{"value" : 10}, {"value" : 20}];
		$scope.twitterPositiveScore = [{"value" : 10}, {"value" : 20}];
		
		$scope.twitterNegativeBaseline = [{"value" : 10}, {"value" : 20}];
		$scope.twitterPositiveBaseline = [{"value" : 10}, {"value" : 20}];
		
		$scope.increasedTolernce = [{"value" : 10}, {"value" : 20}];
		$scope.lowerTolernce = [{"value" : 10}, {"value" : 20}];
		
		var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
		var rolename = loginCredentails.Role;
		var roleKey 	= loginCredentails.roleKey;
		
		$scope.isEngManager = (roleKey == 'eng_manager'?true:false);
		
		$scope.openMyDashboard = function () {
			console.log("00000>>>> openMyDashboard ", $scope.isEngManager);
			if($scope.isEngManager){
				console.log("if ture ");
				$state.go('app.engmanagerview');
			}else{
				console.log("else ture ");
				$state.go('app.singleview');
			}
		}
		
		
}]);
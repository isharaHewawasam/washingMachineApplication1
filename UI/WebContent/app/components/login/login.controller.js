(function() {
	'use strict';
	
	angular
	    .module('angle')
	    .controller('LoginController', LoginController);
	
	LoginController.$inject = ['$scope', '$state','$rootScope','$window', '$translate', 'iot.config.ApiClient', 'HttpService'];
	
	function LoginController($scope, $state,$rootScope,$window, $translate, configApiClient, HttpService) {
		
		$scope.language = {};
		$scope.language.available= {"en": "English","fr": "French"};

		$scope.changeLanguage = function() {
			$translate.use($scope.language.selected);
		}
		
		$rootScope.credentials = {};
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
		
	}
})();
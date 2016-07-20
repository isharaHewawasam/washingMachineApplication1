App.controller('NotificationConfController', 
		['$rootScope', '$scope', '$state', '$http', '$window', '$localStorage', "iot.config.ApiClient",
                 function($rootScope, $scope, $state, $http, $window, $localStorage, configApiClient){

		console.log(">>>>>>>>>Notification Configuration<<<<<<<<<<<")

		var twitterinsights = $localStorage.twitterinsights;
		
		
		$scope.showTwitterInsightsLink = $localStorage.showTwitterInnerLint;
		$scope.notificationConfig = {};
		/*
		//delete $localStorage.twitterinsights;
		if(twitterinsights) {
			
			$scope.selectedMake = twitterinsights.make;
			$scope.selectedModel = twitterinsights.model;
			
			$http({url:configApiClient.baseUrl + 'config/makes', 
			     method: "GET", Accept: "text/plain"}).success(function(data, status) {
			         $scope.makes = data.makes;
			         $scope.selectedMake = twitterinsights.make;
			         
		    }). error(function(data, status) {
		      // alert("error"  +status);
		      // console.log(JSON.stringify(data));
		    });
			
			
			$http({url:configApiClient.baseUrl + 'config/makes/models?make_names='+$scope.selectedMake, 
			     method: "GET", Accept: "text/plain"}).success(function(data, status) {
			    	$scope.models = data[$scope.selectedMake];
			    	$scope.selectedModel = twitterinsights.model;	           
		    }). error(function(data, status) {
			      // alert("error"  +status);
			      // console.log(JSON.stringify(data));
		    });
		}
		
		$scope.getModels = function(make){
			$scope.selectedMake = make.selectedMake;
			$scope.selectedModel = '';
			$http({url:configApiClient.baseUrl + 'config/makes/models?make_names='+$scope.selectedMake, 
			     method: "GET", Accept: "text/plain"}).success(function(data, status) {
			    	$scope.models = data[$scope.selectedMake];
		    }). error(function(data, status) {
			      // alert("error"  +status);
			      // console.log(JSON.stringify(data));
		    });
	     }
		
		*/
		
		$scope.scores = [{"value" : 10}, {"value" : 20}];
		$scope.baselines = [{"value" : 30}, {"value" : 40}];
		
		$scope.tolernces = [{"value" : 10}, {"value" : 20}];
		
		$scope.washErrors = [{"value" : 10}, {"value" : 20}];
		
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
		$http({url:configApiClient.baseUrl + 'config/makes', 
			method: "GET", Accept: "text/plain"}).success(function(data, status) {     
			 $scope.makes=data.makes;		           
			}). error(function(data, status) {
			// alert("error"  +status);
			console.log(JSON.stringify(data));
			});


			$scope.selectedMake=function(){  
			$rootScope.search.selectedModel="";
			$http({url:configApiClient.baseUrl + 'config/makes/models?make_names='+$rootScope.search.selectedMake, 
			method: "GET", Accept: "text/plain"}).success(function(data, status) {
				//console.log("//////////make");   
			 $scope.models=data[$rootScope.search.selectedMake];	           
			}). error(function(data, status) {
			console.log(JSON.stringify(data));
			});

			}
			var monthNames = [
			  "January", "February", "March",
			  "April", "May", "June", "July",
			  "August", "September", "October",
			  "November", "December"
					];
			
					var date = new Date();
					var day = date.getDate();
					var monthIndex = date.getMonth();
					var year = date.getFullYear();
			
			   
			   $scope.currentDate=monthNames[monthIndex] + ' ' + day + ', ' +  year+ ', ' +date.toLocaleTimeString();
		
		
		$scope.loadTwitterInsights = function() {
			$state.go('app.twitterinsights');
		}
		
		$scope.saveNotificationConfig = function() {
			var requestBody;
			var redirecto;
			if($scope.isEngManager){
				requestBody = {
						"UserName": loginCredentails.username,
						"IncreaseErrortype1": "Sensor",
						"DecreaseErrortype1": "Sensor",
						"IncreaseErrortype2": "Sensor",
						"DecreaseErrortype2": "Sensor"
				};
				
				redirecto = 'app.engmanagerview';
			}else{
				requestBody = {
						  "UserName": loginCredentails.email,
						  "Make": twitterinsights.make,
						  "Model": twitterinsights.model,
						  "PositiveScore": $scope.notificationConfig.selectedPositiveScore,
						  "PositiveBaseline": $scope.notificationConfig.selectedPositiveBaseline,
						  "NegativeScore": $scope.notificationConfig.selectedNegativeScore,
						  "NegativeBaseline": $scope.notificationConfig.selectedNegativeBaseline,
						  "PositiveTolerance": $scope.notificationConfig.selectedNegativeScore,
						  "NegativeTolerance": $scope.notificationConfig.selectedNegativeScore
				};
				redirecto = 'app.twitterinsights';
			}
			$http({url:configApiClient.baseUrl + 'notifications/configurations/settings/frompage', 
			     method: "POST", 
			     headers: { 'Content-Type': 'application/json'},
			     data: requestBody})
			     .success(function(data, status) {
			    	 $state.go(redirecto);
		    }). error(function(data, status) {
		    	console.log('in error of notification');
		    });
			
		}
		
		$scope.cancelNotificationConfig = function() {
			if($scope.isEngManager){
				$state.go('app.engmanagerview');
			}else{
				$state.go('app.twitterinsights');
			}
		}
}]);

(function() {
	'use strict';

	angular
	    .module('angle')
	    .controller('TopnavbarController', TopnavbarController);

	TopnavbarController.$inject = ['$rootScope','$scope', '$state', '$window', '$localStorage', '$translate', "iot.config.ApiClient", 'HttpService'];

	function TopnavbarController($rootScope,$scope, $state, $window, $localStorage, $translate, configApiClient, HttpService) {

var loginCredentails = angular.fromJson($window.localStorage.loginCredentails);
$scope.rolename=loginCredentails.Role;
$scope.names=loginCredentails.Name;
$scope.notificationAlertFlag = false;
$scope.roleKey=loginCredentails.roleKey;

/**
* Define the available language list in ui and change the language according to user requests
*/
$scope.language.available = {"en": "English","fr": "French"};
if ($rootScope.current_language == undefined) {
	$scope.language.selected = undefined;
} else {
	$scope.language.selected = $rootScope.current_language;
}

$scope.changeLanguage = function() {
$translate.use($scope.language.selected);
$rootScope.current_language = $scope.language.selected;
}

/**
* Get new notification count when refresh the Application
*/
$scope.getNewNotificationCount = function() {

var url = configApiClient.baseUrl + 'notifications/notification-alert';
HttpService.get(url).then(function(data){
// on success
$scope.notificationCount = data[0].notification_count;
$scope.notificationAlertFlag = true;
},function(data){
// on error
});

}

/**
* Clear notification count
*/
$scope.clearNotificationCount = function() {

var rolename = $scope.rolename;
if((window.location.hash=="#/app/twitterinsights"&&rolename=="Marketing Manager")||(window.location.hash=="#/app/notificationconf"&&rolename=="Marketing Manager")||(window.location.hash=="#/app/reports"&&rolename=="Marketing Manager")){
$rootScope.isApplyFiterButton = true;
$state.go('app.singleview');
$scope.notificationAlertFlag = false;
}else if((window.location.hash=="#/app/notificationconf"&&rolename=="Engineering Manager")||(window.location.hash=="#/app/reports"&&rolename=="Engineering Manager")){
$rootScope.isApplyFiterButton = true;
$state.go('app.engmanagerview');
$scope.notificationAlertFlag = false;
}else{
$scope.notificationAlertFlag = false;
}
}


$scope.logOut=function(){
delete $window.localStorage.loginCredentails;
$state.go('page.login');
}

$scope.loadNotificationConf = function() {
$localStorage.showTwitterInnerLint = false;
$state.go('app.notificationconf');
};

	}
})();

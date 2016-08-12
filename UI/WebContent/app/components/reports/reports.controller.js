(function() {
	'use strict';
	
	angular
	    .module('angle')
	    .controller('reportController', reportController);
	
	reportController.$inject = ['$scope', '$state','$rootScope','$window', 'iot.config.ApiClient', 'HttpService'];
	
	function reportController($scope, $state,$rootScope,$window, configApiClient, HttpService) {
		
		$scope.getReports=function(){
        $rootScope.isReportFiltering = true;

        $state.go('app.reports');

                                 };

            //api call for washing machine status
      $scope.r_griddata=[];

      	var url = configApiClient.baseUrl + 'usage';
      	HttpService.get(url).then(function(data){
			// on success
			$rootScope.isReportFiltering = false;
		    $scope.r_griddata=data.data;
		},function(data){
			// on error
			$rootScope.isReportFiltering = false;
		});
		
          //  Download Washing Machine Status report
            $scope.downloadReport=function(){
                html2canvas(document.getElementById('gridHideNodata'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("reports.pdf");
                }
            });
            }



             var loginCredentails = angular.fromJson($window.sessionStorage.loginCredentails);
             var rolename = loginCredentails.Role;
             var roleKey   = loginCredentails.roleKey;

             $scope.isEngManager = (roleKey == 'eng_manager'?true:false);

          //Session handling- used to display respective views for managers and return back to respective Dashboard pages.
             $scope.openReport = function () {
             $rootScope.isApplyFiterButton = true;
             if($scope.isEngManager){

             $state.go('app.engmanagerview');
             $('#dashboardNav').addClass('sidebarItemActive');
             $('#dashboardNav img').attr('src','app/img/Dashboardassets/dashboard_hover.png');
             $('#reportsNav').removeClass('sidebarItemActive');
             }else{

             $state.go('app.singleview');
             $('#dashboardNav').addClass('sidebarItemActive');
             $('#dashboardNav img').attr('src','app/img/Dashboardassets/dashboard_hover.png');
             $('#reportsNav').removeClass('sidebarItemActive');
                  }
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
		
	}
})();
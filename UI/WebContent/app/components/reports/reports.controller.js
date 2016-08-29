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
        	var ShowLabel = true;
        	var CSV = '';    
        	var ReportTitle = "                Washing Machine Status Report";   
        	var fileName = "Report";            
        	
            CSV += ReportTitle + '\r\n\n';
           
        	if (ShowLabel) {
                var row = "";                
               
                for (var index in $scope.r_griddata[0]) {                
                    row += index + ',';                       
                }
                row = row.slice(5, -1);     
                CSV += row + '\r\n';                
            }           	
        	
            for (var i = 0; i < $scope.r_griddata.length; i++) {
            	var row = "";    
                for (var index in $scope.r_griddata[i]) {
                	if(index == "sold"){
                		continue
                		}
                    row += '"' + $scope.r_griddata[i][index] + '",';                        
                }
                row.slice(10, row.length - 1);                     
                CSV += row + '\r\n';
            }
               
            if (CSV == '') {        
                alert("Invalid data");
                return;
            }              
            
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);        
            
            //this will generate a temp <a /> tag
            var link = document.createElement("a");  
            link.href = uri;               
            
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            
            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
           /* html2canvas(document.getElementById('gridHideNodata'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 550,
                        height: 350,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("reports.pdf");
            }
        });*/
        	
        }

             var loginCredentails = angular.fromJson($window.localStorage.loginCredentails);
             var rolename = loginCredentails.Role;
             var roleKey   = loginCredentails.roleKey;

             $scope.isEngManager = (roleKey == 'eng_manager'?true:false);

          //Session handling- used to display respective views for managers and return back to respective Dashboard pages.
             $scope.openReport = function () {
             $rootScope.isApplyFiterButton = true;
             if($scope.isEngManager){

             $state.go('app.engmanagerview');
             /*$('#dashboardNav').addClass('sidebarItemActive');
             $('#dashboardNav img').attr('src','img/Dashboardassets/dashboard_hover.png');
             $('#reportsNav').removeClass('sidebarItemActive');*/
             }else{

             $state.go('app.singleview');
             /*$('#dashboardNav').addClass('sidebarItemActive');
             $('#dashboardNav img').attr('src','img/Dashboardassets/dashboard_hover.png');
             $('#reportsNav').removeClass('sidebarItemActive');*/
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
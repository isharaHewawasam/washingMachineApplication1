App.controller('reportController',['$rootScope','$scope','$state','$http','iot.config.ApiClient','$window',function($rootScope,$scope,$state,$http,configApiClient,$window){
   
	// Route to reports url
	$scope.getReports=function(){
        $rootScope.isReportFiltering = true;       
       
        $state.go('app.reports');
        
                                 };
      
            //api call for washing machine status
      $scope.r_griddata=[];
      $http({url:"http://ibm-iot.mybluemix.net/api/v1/usage", 
                      method: "GET",
                      Accept: "text/plain"}).success(function(data, status) {
                     $rootScope.isReportFiltering = false;
                                        $scope.r_griddata=data.data; 
                                      
                                  
                   }). error(function(data, status) {
                                       
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
            //pagination

            //  $scope.currentPage = 0;
            //  $scope.pageSize = 4;
            //  $scope.r_griddata = [];
            //  $scope.numberOfPages=function(){
            //   return Math.ceil($scope.r_griddata.length/$scope.pageSize);                
            //                                 }       
            //   for (var i=0; i<45; i++) {
            //          $scope.r_griddata.push("Item "+i);
            //                            }


            //   //We already have a limitTo filter built-in to angular,
            //   //let's make a startFrom filter
            // App.filter('startFrom', function() {
            //             return function(input, start) {
            //             start = +start; //parse to int
            //             return input.slice(start);
            //                                           }
            //           });

              
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

    }]);
App.controller('reportController',['$scope','$state','$http','iot.config.ApiClient','$window',function($scope,$state,$http,configApiClient,$window){
      $scope.getReports=function(){
       // alert('reports');
        $state.go('app.reports');
        console.log("Reports page loaded")
      };
      $scope.r_griddata=[];

     $http({url:"http://ibm-iot.mybluemix.net/api/v1/usage", 
                      method: "GET",
                      Accept: "text/plain"}).success(function(data, status) {
                     
                                        $scope.r_griddata=data.data; 
                      
                                  console.log("Report Griddata"+JSON.stringify($scope.r_griddata));
                                  
                   }). error(function(data, status) {
                             console.log("reporterror:"+status);
                       
                   });

            //download report
            $scope.downloadReport=function(){
                html2canvas(document.getElementById('export'), {
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
    
    $scope.openReport = function () {
      console.log("Reports ", $scope.isEngManager);
      if($scope.isEngManager){
        console.log("if true ");
        $state.go('app.engmanagerview');
      }else{
        console.log("else true ");
        $state.go('app.singleview');
      }
    }

    }]);
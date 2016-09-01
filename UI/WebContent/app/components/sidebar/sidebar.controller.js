(function() {
	'use strict';

	angular
	    .module('angle')
	    .controller('SidebarController', SidebarController);

	SidebarController.$inject = ['$scope', '$state','$rootScope','$window', 'iot.config.ApiClient', 'HttpService', '$document'];

	function SidebarController($scope, $state,$rootScope,$window, configApiClient, HttpService, $document) {

		$scope.loader = {};
			
	    $rootScope.intete=1;
	  	$scope.make;
	  	$scope.makeData;
	  	$scope.valArr=[2,3,4,56,7567,2345];
	    $rootScope.filterIcons=[];
	    $scope.activeTab = 'dashboard';
	    
	    $(document).click(function(event) { 
	        if((!$(event.target).closest('#sidebarPanelIcons').length) && (!$(event.target).closest('#sidebarFilterPanel').length)){
	        	$scope.activeTab = 'dashboard';
	            $scope.hoverTab = $scope.activeTab;
	            sameMenu = $scope.activeTab;
	        }   
	    })
	    
	    $scope.loginCredentails = angular.fromJson($window.localStorage.loginCredentails);
    
        /*$scope.activeTab = null;
        
        $scope.onMouseOver = function(tab) {
        	$scope.activeTab = tab;
        	if(!tab){
        		$scope.hoverDashboard = true;
        	}
        }
        
        $scope.onMouseLeave = function(event) {
        	if(!$scope.activeTab){
        		$scope.hoverDashboard = false;
        	}
        	
        	if($scope.isOnSelect) {
        		$scope.isOnSelect = false;
        		return;
        	}
        	
        	if(event) {
        		var e = event.toElement || event.relatedTarget;
        		if(e){
        		    if (e.parentNode == this || e == this) {
        		    	return;
        		    }
        		}else{
        			return;
        		}
        	    if($('.md-pane-open').is(":visible")){
        	        return;
        	    }
        	}
        	
        	$scope.activeTab = null;
        }*/
        
        /*$scope.onSidebarOptionChange = function(){
        	$scope.isOnSelect = true;
        }*/
    
        var sameMenu = null;
        $scope.onSideBarMenuClick = function(menu){
        	$scope.activeTab = menu;
        	if(sameMenu == menu) {
        		$scope.activeTab = 'dashboard';
        		sameMenu = null;
        	}else{
        		sameMenu = menu;
        	}
        }
        
        $scope.onMouseOver = function(menu) {
        	$scope.hoverTab = menu;
        }
        
        $scope.onMouseLeave = function() {
        	$scope.hoverTab = $scope.activeTab;
        }
        
  	$scope.getCall=function(p){
  	}

  	$scope.clearfilter = function(){

          $rootScope.search={};
          $rootScope.filterIcons=[];
          $rootScope.barchartData = null;
          $rootScope.piechartData = null
          $rootScope.setUsageObjectFromSidebar($rootScope.search);
          $rootScope.tryit();
       }

  	/**
  	 * clear side bar product filter selections
  	 */
      $scope.clearfilter1 = function(){

      	 $scope.clearFilterIcons(1);
  		 var obj={};
  		 obj.selectedMake=$rootScope.search.selectedMake;
  		 obj.selectedModel=$rootScope.search.selectedModel;
  		 obj.selectedSKU=$rootScope.search.selectedSKU;
  		 obj.mfgStartDate=$rootScope.search.mfgStartDate;
  		 obj.mfgEndDate=$rootScope.search.mfgEndDate;
  		 if ($rootScope.search.incomeRange) {
  		 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
  		 }
  		 if ($rootScope.search.occupation) {
  			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
  		 }
  		 if ($rootScope.search.ageGroup) {
  			obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
  		 }

           $rootScope.setUsageObjectFromSidebar(obj);
           $scope.activeTab = 'dashboard';
           $scope.hoverTab = $scope.activeTab;
           sameMenu = $scope.activeTab;
           $rootScope.tryit();
        }

      /**
       * clear side bar demographics filter selections
       */
      $scope.clearfilter2 = function(){

      	$scope.clearFilterIcons(2);
      	var obj={};
      	obj.selectedMake=$rootScope.search.selectedMake;
    	 	obj.selectedModel=$rootScope.search.selectedModel;
    	 	obj.selectedSKU=$rootScope.search.selectedSKU;
    	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
    	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
  		if ($rootScope.search.incomeRange) {
    	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
  		}
  		if ($rootScope.search.occupation) {
  			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
  		}
    	 	if ($rootScope.search.ageGroup) {
    	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
    	 	}

          $rootScope.setUsageObjectFromSidebar(obj);
          $scope.activeTab = 'dashboard';
          $scope.hoverTab = $scope.activeTab;
          sameMenu = $scope.activeTab;
          $rootScope.tryit();
       }

      $scope.clearFilterIcons = function (filterType) {

      	var tempArr = [];
      	var isRemoved = false;
      	if(filterType == 1){
      		$rootScope.search.selectedMake=undefined;
              $rootScope.search.selectedModel=undefined;
              $rootScope.search.selectedSKU=undefined;
              $rootScope.search.mfgStartDate=undefined;
              $rootScope.search.mfgEndDate=undefined;
              angular.forEach($rootScope.filterIcons,function(obj ,key){
                  if(obj.key=="make" || obj.key=="model" || obj.key=="sku" || obj.key=="mfg-start-date" || obj.key=="mfg-end-date"){

                  	isRemoved = true;
                  }else{
                  	tempArr.push(obj);
                  }
              });

      	}else if(filterType == 2) {
      		$rootScope.search.incomeRange=undefined;
              $rootScope.search.occupation=undefined;
              $rootScope.search.ageGroup=undefined;
              angular.forEach($rootScope.filterIcons,function(obj ,key){
              	if(obj.key=="incomeRange" || obj.key=="occupation" || obj.key=="ageGroup"){

                  	isRemoved = true;
                  }else{
                  	tempArr.push(obj);
                  }
              });
      	}

      	if(isRemoved){
      		$rootScope.filterIcons = tempArr;
      	}
      }

      /**
       * create side bar filter seclection array
       */
     $scope.createIconArray=function(){
          $scope.someArr=[];

          if($rootScope.search.selectedMake && $rootScope.search.selectedMake.length != 0)
              $scope.someArr.push(
                  {
                      value:$rootScope.search.selectedMake,
                      key:"make"
                  }
              );

          if($rootScope.search.selectedModel && $rootScope.search.selectedModel.length != 0)
              $scope.someArr.push(
                  {
                      value:$rootScope.search.selectedModel,
                      key:"model"
                  }
              );

          if($rootScope.search.selectedSKU && $rootScope.search.selectedSKU.length != 0)
              $scope.someArr.push(
                  {
                      value:$rootScope.search.selectedSKU,
                      key:"sku"
                  });

          if($rootScope.search.mfgStartDate && $rootScope.search.mfgStartDate.length != 0)
          	$scope.someArr.push(
          			{
          				value:$rootScope.search.mfgStartDate.toLocaleDateString(),
          				key:"mfg-start-date"
          			});

          if($rootScope.search.mfgEndDate && $rootScope.search.mfgEndDate.length != 0)
          	$scope.someArr.push(
          			{
          				value:$rootScope.search.mfgEndDate.toLocaleDateString(),
          				key:"mfg-end-date"
          			});

          if ($rootScope.search.incomeRange) {
          	$scope.someArr.push({
  				value:JSON.parse($rootScope.search.incomeRange).range,
  				key:"incomeRange"
  			});
          }

          if ($rootScope.search.occupation) {
          	$scope.someArr.push({
  				value:JSON.parse($rootScope.search.occupation).range,
  				key:"occupation"
  			});
          }

          if ($rootScope.search.ageGroup) {
          	$scope.someArr.push({
  				value:JSON.parse($rootScope.search.ageGroup).range,
  				key:"ageGroup"
  			});
          }

          $scope.valArr=$scope.someArr;

          $rootScope.filterIcons=$scope.someArr;

      };


      $scope.myDate = new Date();

        $scope.selectedSKU=function(){

        }

      $rootScope.search={};

      /**
       * Retrieve model names for relavent make from API
       */
        $scope.selectedMake=function(){
        	$scope.loader.isModelBox = true;
            $rootScope.search.selectedModel="";
            $rootScope.search.selectedSKU="";
            var url = configApiClient.baseUrl + 'config/makes/models?make_names='+$rootScope.search.selectedMake;
            HttpService.get(url).then(function(data){
  	  			// on success
          	  	$scope.models=data[$rootScope.search.selectedMake];
          	  	$scope.loader.isModelBox = false;
  	  		},function(data){
  	  			// on error
  	  			$scope.loader.isModelBox = false;
  	  		});
        }

        /**
         *  Retrieve SKU data for relavent make from API
         */
        $scope.selectedModel=function(){

        	$scope.loader.isSkuBox = true;
            $rootScope.search.selectedSKU="";
            	var url = configApiClient.baseUrl + 'config/models/skus?model_names='+$rootScope.search.selectedModel;
            	HttpService.get(url).then(function(data){
  	  			// on success
          	  	$scope.SKUs=data[$rootScope.search.selectedModel];
          	  	$scope.loader.isSkuBox = false;
  	  		},function(data){
  	  			// on error
  	  			$scope.loader.isSkuBox = false;
  	  		});
        }

        /**
         * This is for side bar product filter
         */
           $scope.applyProductFilter=function(){
          	 var obj={};
           	obj.selectedMake=$rootScope.search.selectedMake;
         	 	obj.selectedModel=$rootScope.search.selectedModel;
         	 	obj.selectedSKU=$rootScope.search.selectedSKU;
         	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
         	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
       		if ($rootScope.search.incomeRange) {
         	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
       		}
       		if ($rootScope.search.occupation) {
       			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
       		}
         	 	if ($rootScope.search.ageGroup) {
         	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
         	 	}

              $rootScope.setUsageObjectFromSidebar(obj);
              $scope.createIconArray();
//              document.getElementById('filterPanel').style.display = 'none';
              $scope.activeTab = 'dashboard';
              $scope.hoverTab = $scope.activeTab;
              sameMenu = $scope.activeTab;
              $rootScope.tryit();

          }

           /**
            * This is for side bar demographics filter
            */
           $scope.applyDemographicsFilter=function(){
          	 var obj={};
           	obj.selectedMake=$rootScope.search.selectedMake;
         	 	obj.selectedModel=$rootScope.search.selectedModel;
         	 	obj.selectedSKU=$rootScope.search.selectedSKU;
         	 	obj.mfgStartDate=$rootScope.search.mfgStartDate;
         	 	obj.mfgEndDate=$rootScope.search.mfgEndDate;
       		if ($rootScope.search.incomeRange) {
         	 	 	obj.incomeRange=JSON.parse($rootScope.search.incomeRange).id;
       		}
       		if ($rootScope.search.occupation) {
       			 obj.occupation=JSON.parse($rootScope.search.occupation).id;
       		}
         	 	if ($rootScope.search.ageGroup) {
         	 		obj.ageGroup=JSON.parse($rootScope.search.ageGroup).id;
         	 	}
               $rootScope.setUsageObjectFromSidebar(obj);
               $scope.createIconArray();
//               document.getElementById('demographicsFilterPanel').style.display = 'none';
               $scope.activeTab = 'dashboard';
               $scope.hoverTab = $scope.activeTab;
               sameMenu = $scope.activeTab;
               $rootScope.tryit();

           };


      var collapseList = [];

      $rootScope.name="";

      $rootScope.test="gopal";

     /**
      * Check item and children active state
      */
      var isActive = function(item) {

        if(!item) return;

        if( !item.sref || item.sref == '#') {
          var foundActive = false;
          angular.forEach(item.submenu, function(value, key) {
            if(isActive(value)) foundActive = true;
          });
          return foundActive;
        }
        else
          return $state.is(item.sref) || $state.includes(item.sref);
      };

      /**
       * Load menu from json file
       */
      $scope.getMenuItemPropClasses = function(item) {
        return (item.heading ? 'nav-heading' : '') +
               (isActive(item) ? ' active' : '') ;
      };

      $scope.loadSidebarMenu = function() {

      	var menuJson = 'server/sidebar-menu.json',
          menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

      	HttpService.get(menuURL).then(function(data){
  			// on success
      		$rootScope.menuItems = data;
  		},function(data){
  			// on error
  			alert('Failure loading menu');
  		});

       };

       $scope.loadSidebarMenu();

      /**
       * Handle sidebar collapse items
       */
      $scope.addCollapse = function($index, item) {
        collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
      };

      $scope.isCollapse = function($index) {
        return (collapseList[$index]);
      };

      $scope.toggleCollapse = function($index, isParentItem,subitem) {
      	$rootScope.intete+=1;

        /**
         * collapsed side bar doesn't toggle drop down
         */
        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

        /**
         * make sure the item index exists
         */
        if( angular.isDefined( collapseList[$index] ) ) {
          if ( ! $scope.lastEventFromChild ) {
            collapseList[$index] = !collapseList[$index];
            closeAllBut($index);
          }
        }
        else if ( isParentItem ) {
          closeAllBut(-1);
        }

        $scope.lastEventFromChild = isChild($index);
        return true;

      };

      function closeAllBut(index) {
        index += '';
        for(var i in collapseList) {
          if(index < 0 || index.indexOf(i) < 0)
            collapseList[i] = true;
        }
      }

      function isChild($index) {
        return (typeof $index === 'string') && !($index.indexOf('-') < 0);
      }

      function loadMake() {
	 	$scope.loader.isMakeBox = true;
		var url = configApiClient.baseUrl + 'config/makes';
		HttpService.get(url).then(function(data){
		// on success
			 $scope.makes=data.makes;
			 $scope.loader.isMakeBox = false;
		},function(data){
			// on error
			$scope.loader.isMakeBox = false;
		});
	  }
      loadMake();

    	var url = configApiClient.baseUrl + 'demographics/family/age-ranges';
    	HttpService.get(url).then(function(data){
  		// on success
    		$scope.demoAgeRange=data;
  	},function(data){
  		// on error
  	});

    	function loadIncomeRange(){
    		$scope.loader.isIncomeRangeBox = true;
	    	var url = configApiClient.baseUrl + 'demographics/family/income-ranges';
	    	HttpService.get(url).then(function(data){
	  		// on success
	    		$scope.demoIncomeRange=data;
	    		$scope.loader.isIncomeRangeBox = false;
		  	},function(data){
		  		// on error
		  		$scope.loader.isIncomeRangeBox = false;
		  	});
    	}
    	loadIncomeRange();

    	function loadFamilyMembersCount(){
    		$scope.loader.isFamilyMemberBox = true;
	    	var url = configApiClient.baseUrl + 'demographics/family/members-count';
	    	HttpService.get(url).then(function(data){
	  		// on success
	    		$scope.demoMembersCount=data;
	    		$scope.loader.isFamilyMemberBox = false;
		  	},function(data){
		  		// on error
		  		$scope.loader.isFamilyMemberBox = false;
		  	});
    	}
    	loadFamilyMembersCount();

    	function loadAge(){
    		$scope.loader.isAgeBox = true;
	    	var url = configApiClient.baseUrl + 'config/manufacture/years';
	    	HttpService.get(url).then(function(data){
	  		// on success
	    		$scope.years=data.years;
	    		$scope.loader.isAgeBox = false;
		  	},function(data){
		  		// on error
		  		$scope.loader.isAgeBox = false;
		  	});
    	}
    	loadAge();
    	
      $scope.selectMake=function()
      {
      	alert("SELECTED");
      }

	}
})();

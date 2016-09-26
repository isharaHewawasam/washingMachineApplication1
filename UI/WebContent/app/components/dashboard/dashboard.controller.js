(function () {
    'use strict';

    angular
        .module('angle')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', '$rootScope', '$window', 'iot.config.ApiClient', 'HttpService'];

    function DashboardController($scope, $state, $rootScope, $window, configApiClient, HttpService) {
        //Clear filter on dashboard load
        $rootScope.search = {};
        $rootScope.filterIcons = [];
        $rootScope.isReportAvailableForDownload = false;

        $scope.loader = {};

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


        $scope.currentDate = monthNames[monthIndex] + ' ' + day + ', ' + year + ', ' + date.toLocaleTimeString();
        $scope.sidebarObj = {};
        $scope.sidebarObj.selectedMake = "";
        $scope.sidebarObj.selectedModel = "";
        $scope.sidebarObj.selectedSKU = "";
        $scope.sidebarObj.mfgStartDate = "";
        $scope.sidebarObj.mfgEndDate = "";
        $scope.region = [];
        $scope.timescale = [];

        $rootScope.setUsageObjectFromSidebar = function (obj) {
            $scope.sidebarObj = obj;
            $scope.usagedata = {
                "productAttrs": {
                    "makes": [{"value": $scope.sidebarObj.selectedMake}],
                    "models": [{"value": $scope.sidebarObj.selectedModel}],
                    "skus": [{"value": $scope.sidebarObj.selectedSKU}],
                    "mfg_date": {
                        "start_date": $scope.sidebarObj.mfgStartDate,
                        "end_date": $scope.sidebarObj.mfgEndDate
                    }
                },
                "timescale": {
                    "years": [
                        {
                            "value": parseInt($scope.timescale.years)
                        }
                    ],
                    "quarters": [
                        {
                            "value": parseInt($scope.timescale.quarters)
                        }
                    ],
                    "months": [
                        {
                            "value": parseInt($scope.timescale.months)
                        }
                    ],
                    "date": {
                        "start_date": "01/01/2015",
                        "end_date": "01/01/2016"
                    },
                    "relative": {
                        "unit": "2",
                        "value": 0
                    }
                },
                "region": {
                    "states": [
                        {
                            "value": $scope.region.states
                        }
                    ],
                    "cities": [
                        {
                            "value": $scope.region.cities
                        }
                    ],
                    "zip_codes": [
                        {
                            "value": $scope.region.zip_codes
                        }
                    ]
                },
                "income": [{"value": $scope.sidebarObj.incomeRange}],
                "age": [{"value": $scope.sidebarObj.ageGroup}],
                "family_members_count": [{"value": $scope.sidebarObj.occupation}]
            };

            $rootScope.applyFilterBoolean = true;
            // This method is already calling from tryit()


        }

        //for reports section
        $scope.myDate = new Date();

        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());

        $scope.myDate1 = new Date();

        $scope.minDate1 = new Date(
            $scope.myDate1.getFullYear(),
            $scope.myDate1.getMonth() - 2,
            $scope.myDate1.getDate());

        $scope.maxDate1 = new Date(
            $scope.myDate1.getFullYear(),
            $scope.myDate1.getMonth() + 2,
            $scope.myDate1.getDate());
        //for reports section -finish

        //start report apply filter
        $scope.iniReport = function () {


            $scope.isReportFiltering = true;
            $rootScope.applyFilterBoolean = true;
            $scope.usagedata = {
                "productAttrs": {
                    "makes": [{"value": $scope.sidebarObj.selectedMake}],
                    "models": [{"value": $scope.sidebarObj.selectedModel}],
                    "skus": [{"value": $scope.sidebarObj.selectedSKU}],
                    "mfg_date": {
                        "start_date": $scope.sidebarObj.mfgStartDate,
                        "end_date": $scope.sidebarObj.mfgEndDate
                    }
                },
                "timescale": {
                    "years": [
                        {
                            "value": parseInt($scope.timescale.years)
                        }
                    ],
                    "quarters": [
                        {
                            "value": parseInt($scope.timescale.quarters)
                        }
                    ],
                    "months": [
                        {
                            "value": parseInt($scope.timescale.months)
                        }
                    ],
                    "date": {
                        "start_date": "01/01/2015",
                        "end_date": "01/01/2016"
                    },
                    "relative": {
                        "unit": "2",
                        "value": 0
                    }
                },
                "region": {
                    "states": [
                        {
                            "value": $scope.region.states
                        }
                    ],
                    "cities": [
                        {
                            "value": $scope.region.cities
                        }
                    ],
                    "zip_codes": [
                        {
                            "value": $scope.region.zip_codes
                        }
                    ]
                },
                "income": [{"value": $scope.sidebarObj.incomeRange}],
                "age": [{"value": $scope.sidebarObj.ageGroup}],
                "family_members_count": [{"value": $scope.sidebarObj.occupation}]
            };


            if ($scope.region.states == undefined || $scope.region.states == "") {

                $scope.usagedata.region.states = [];
            }
            if ($scope.region.cities == undefined || $scope.region.cities == "") {

                $scope.usagedata.region.cities = [];
            }
            if ($scope.region.zip_codes == undefined || $scope.region.zip_codes == "") {

                $scope.usagedata.region.zip_codes = [];
            }
            if ($scope.timescale.years == undefined || $scope.timescale.years == "") {
                $scope.usagedata.timescale.years = [];
            }
            if ($scope.timescale.quarters == undefined || $scope.timescale.quarters == "") {
                $scope.usagedata.timescale.quarters = [];
            }

            if ($scope.timescale.months == undefined || $scope.timescale.months == "") {
                $scope.usagedata.timescale.months = [];
            }
            if ($scope.sidebarObj.selectedMake == undefined || $scope.sidebarObj.selectedMake == "") {
                $scope.usagedata.productAttrs.makes = [];
            }
            if ($scope.sidebarObj.selectedModel == undefined || $scope.sidebarObj.selectedModel == "") {
                $scope.usagedata.productAttrs.models = [];
            }
            if ($scope.sidebarObj.selectedSKU == undefined || $scope.sidebarObj.selectedSKU == "") {
                $scope.usagedata.productAttrs.skus = [];
            }
            if ($scope.sidebarObj.mfgStartDate == undefined || $scope.sidebarObj.mfgStartDate == "") {
                $scope.usagedata.productAttrs.mfgStartDate = [];
            }
            if ($scope.sidebarObj.mfgEndDate == undefined || $scope.sidebarObj.mfgEndDate == "") {
                $scope.usagedata.productAttrs.mfgEndDate = [];
            }
            if ($scope.sidebarObj.incomeRange == undefined || $scope.sidebarObj.incomeRange == "") {
                $scope.usagedata.income = [];
            }
            if ($scope.sidebarObj.ageGroup == undefined || $scope.sidebarObj.ageGroup == "") {
                $scope.usagedata.age = [];
            }
            if ($scope.sidebarObj.occupation == undefined || $scope.sidebarObj.occupation == "") {
                $scope.usagedata.family_members_count = [];
            }

            $rootScope.mkt_griddata_filter = [];
            $rootScope.isReportAvailableForDownload = false;
            $scope.isNoDataFound = false;
            $scope.isError = false;
            $scope.isOnFilter = false;

            //for grid mkt_mgr
            var url = configApiClient.baseUrl + 'usage';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                if (!data || data.data.length === 0) {
                    $rootScope.isOnFilter = true;
                    $rootScope.isOnLoad = false;
                    $scope.isNoDataFound = true;
                } else {
                    $rootScope.mkt_griddata_filter = data.data;
                    $rootScope.isOnFilter = true;
                    $rootScope.isOnLoad = false;
                    $scope.isReportFiltering = false;
                    $rootScope.isReportAvailableForDownload = true;
                    $scope.isNoDataFound = false;
                }
            }, function (data) {
                // on error
                $scope.isError = true;
                $scope.isReportFiltering = false;
                $scope.isNoDataFound = false;
            });
        }
        //end iniReport
        $scope.removechart = function (id) {
            var chart = $('#' + id).highcharts();
            if (chart) {

                chart.destroy();
            }

        };

        $scope.showMap = function () {
            $scope.removechart('map-container');
            $scope.loadingText = "Loading data...";


            $rootScope.mapProgress = true;
            var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=true';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                $rootScope.mapProgress = false;
                salesDataSet = [];
                if (!data || data.length === 0) {
                    renderMap("map-container", []);
                } else {
                    salesDataSet = data;
                    renderMap("map-container", data);
                    $scope.zoomMap('map-container');
                }
            }, function (data) {
                // on error
                salesDataSet = [];
                $rootScope.mapProgress = false;
            });
        }

        //For Maximized map
        $scope.showMaxMap = function () {
            $scope.removechart('map-maxcontainer');
            $scope.loadingText = "Loading data...";


            $rootScope.maxMapProgress = true;
            var url = configApiClient.baseUrl + 'sales?report_name=soldVsConnected&group=true';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                $rootScope.maxMapProgress = false;

                if (!data || data.length === 0) {
                    renderMap("map-container", []);
                } else {
                    renderMap("map-container", data);
                    $scope.zoomMap('map-maxcontainer');
                }
            }, function (data) {
                // on error
                $rootScope.maxMapProgress = false;
            });
        }

        $scope.zoomMap = function (id) {
            var selectedState = $scope.region.states;
            if (selectedState && selectedState != '') {
                var stateCode = undefined;
                var states = $scope.states;
                // Assign id's
                for (var i = 0; i < states.length; i++) {
                    if (states[i].name == selectedState) {
                        stateCode = states[i].id;
                        break;
                    }
                }
                if (stateCode) {
                    var chart = $('#' + id).highcharts();
                    if (chart) {
                        chart.get(stateCode).zoomTo();
                    }
                }
            }
        };


        $rootScope.tryit = function () {
            $scope.isLoadingFilters = true;
            $scope.isReportFiltering = false;
            $rootScope.isApplyFiterButton = true;
            $scope.test = true;
            $rootScope.applyFilterBoolean = true;
            $scope.usagedata = {
                "productAttrs": {
                    "makes": [{"value": $scope.sidebarObj.selectedMake}],
                    "models": [{"value": $scope.sidebarObj.selectedModel}],
                    "skus": [{"value": $scope.sidebarObj.selectedSKU}],
                    "mfg_date": {
                        "start_date": $scope.sidebarObj.mfgStartDate,
                        "end_date": $scope.sidebarObj.mfgEndDate
                    }
                },
                "timescale": {
                    "years": [
                        {
                            "value": parseInt($scope.timescale.years)
                        }
                    ],
                    "quarters": [
                        {
                            "value": parseInt($scope.timescale.quarters)
                        }
                    ],
                    "months": [
                        {
                            "value": parseInt($scope.timescale.months)
                        }
                    ],
                    "date": {
                        "start_date": "01/01/2015",
                        "end_date": "01/01/2016"
                    },
                    "relative": {
                        "unit": "2",
                        "value": 0
                    }
                },
                "region": {
                    "states": [
                        {
                            "value": $scope.region.states
                        }
                    ],
                    "cities": [
                        {
                            "value": $scope.region.cities
                        }
                    ],
                    "zip_codes": [
                        {
                            "value": $scope.region.zip_codes
                        }
                    ]
                },
                "income": [{"value": $scope.sidebarObj.incomeRange}],
                "age": [{"value": $scope.sidebarObj.ageGroup}],
                "family_members_count": [{"value": $scope.sidebarObj.occupation}]
            };


            if ($scope.region.states == undefined || $scope.region.states == "") {

                $scope.usagedata.region.states = [];
            }

            if ($scope.region.cities == undefined || $scope.region.cities == "") {

                $scope.usagedata.region.cities = [];
            }
            if ($scope.region.zip_codes == undefined || $scope.region.zip_codes == "") {

                $scope.usagedata.region.zip_codes = [];
            }
            if ($scope.timescale.years == undefined || $scope.timescale.years == "") {
                $scope.usagedata.timescale.years = [];
            }
            if ($scope.timescale.quarters == undefined || $scope.timescale.quarters == "") {
                $scope.usagedata.timescale.quarters = [];
            }

            if ($scope.timescale.months == undefined || $scope.timescale.months == "") {
                $scope.usagedata.timescale.months = [];
            }
            if ($scope.sidebarObj.selectedMake == undefined || $scope.sidebarObj.selectedMake == "") {
                $scope.usagedata.productAttrs.makes = [];
            }
            if ($scope.sidebarObj.selectedModel == undefined || $scope.sidebarObj.selectedModel == "") {
                $scope.usagedata.productAttrs.models = [];
            }
            if ($scope.sidebarObj.selectedSKU == undefined || $scope.sidebarObj.selectedSKU == "") {
                $scope.usagedata.productAttrs.skus = [];
            }
            if ($scope.sidebarObj.mfgStartDate == undefined || $scope.sidebarObj.mfgStartDate == "") {
                $scope.usagedata.productAttrs.mfgStartDate = [];
            }
            if ($scope.sidebarObj.mfgEndDate == undefined || $scope.sidebarObj.mfgEndDate == "") {
                $scope.usagedata.productAttrs.mfgEndDate = [];
            }
            if ($scope.sidebarObj.incomeRange == undefined || $scope.sidebarObj.incomeRange == "") {
                $scope.usagedata.income = [];
            }
            if ($scope.sidebarObj.ageGroup == undefined || $scope.sidebarObj.ageGroup == "") {
                $scope.usagedata.age = [];
            }
            if ($scope.sidebarObj.occupation == undefined || $scope.sidebarObj.occupation == "") {
                $scope.usagedata.family_members_count = [];
            }


            // to set usage object in anotehr controllr
            $rootScope.setUsageData($scope.usagedata);

            //For map
            $scope.showMap();


            $scope.griddata = [];
            $scope.eng_griddata = [];
            $scope.isNoDataFound = false;
            $scope.isError = false;
            $scope.isLoadingFilters = true;
            $scope.msg1 = "Applying Filters... Please wait";
            $scope.msg2 = "No Data Found";
            $scope.msg3 = "Network Issue";
            $scope.msg = $scope.msg1;

            //for grid mkt_mgr
            var url = configApiClient.baseUrl + 'usage';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                $scope.isLoadingFilters = false;
                if (!data || data.data.length === 0) {
                    $scope.isNoDataFound = true;
                } else {
                    $scope.isNoDataFound = false;
                    $scope.griddata = data.data;
                }
            }, function (data) {
                // on error
                $scope.isLoadingFilters = false;
                $scope.isError = true;
                $scope.msg = $scope.msg3;
                $scope.isNoDataFound = false;
            });

            //For grid from eng manager
            var url = configApiClient.baseUrl + 'sensors/data';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                $scope.isLoadingFilters = false;
                if (!data || data.length === 0) {
                    $scope.isNoDataFoundEng = true;
                } else {
                    $scope.isNoDataFoundEng = false;
                    $scope.eng_griddata = data;
                }
            }, function (data) {
                // on error
                $scope.isLoadingFilters = false;
                $scope.isError = true;
                $scope.msg = $scope.msg3;
                $scope.isNoDataFoundEng = false;
            });

        };

        function usageLoad() {
            $scope.griddata = [];
            $scope.isNoDataFound = false;
            $scope.isError = false;
            $scope.isLoadingFilters = true;
            $scope.msg1 = "Applying Filters... Please wait";
            $scope.msg2 = "No Data Found";
            $scope.msg3 = "Network Issue";
            $scope.msg = $scope.msg1;

            var url = configApiClient.baseUrl + 'usage';
            var param = $scope.usagedata;
            HttpService.post(url, param).then(function (data) {
                // on success
                $scope.isLoadingFilters = false;
                if (!data || data.data.length === 0) {
                    $scope.isNoDataFound = true;
                } else {
                    $scope.isNoDataFound = false;
                    $scope.griddata = data.data;
                }
            }, function (data) {
                // on error
                $scope.isLoadingFilters = false;
                $scope.isError = true;
                $scope.msg = $scope.msg3;
            });
        }

        usageLoad();

        function sensorsDataLoad() {
            $scope.eng_griddata = [];
            $scope.isNoDataFoundEng = false;
            $scope.isError = false;
            $scope.isLoadingFilters = true;
            $scope.msg1 = "Applying Filters... Please wait";
            $scope.msg2 = "No Data Found";
            $scope.msg3 = "Network Issue";
            $scope.msg = $scope.msg1;

            var url = configApiClient.baseUrl + 'sensors/data';
            var param = null;
            HttpService.post(url, param).then(function (data) {
                // on success
                $scope.isLoadingFilters = false;
                if (!data || data.length === 0) {
                    $scope.isNoDataFoundEng = true;
                } else {
                    $scope.isNoDataFoundEng = false;
                    $scope.eng_griddata = data;
                }
            }, function (data) {
                // on error
                $scope.isLoadingFilters = false;
                $scope.isError = true;
                $scope.msg = $scope.msg3;
                $scope.isNoDataFoundEng = false;
            });

        }

        sensorsDataLoad();

        var quarterMonthMapping = JSON.parse('{'
            + '"Quarter1":["Jan","Feb","Mar"],'
            + '"Quarter2":["Apr","May","Jun"],'
            + '"Quarter3":["Jul","Aug","Sep"],'
            + '"Quarter4":["Oct","Nov","Dec"]'
            + '}');


        var quartersNew = JSON.parse(
            '{"0":[{' +
            '"id": 1,' +
            '"value": "Quarter1"' +
            '}, {' +
            '"id": 2,' +
            '"value": "Quarter2"' +
            '}, {' +
            '"id": 3,' +
            '"value": "Quarter3"' +
            '}, {' +
            '"id": 4,' +
            '"value": "Quarter4"' +
            '}]}'
        );
        var quarterMonthMap = JSON.parse(
            '{' +
            '"1":[{"id":1,"value":"Jan"},{"id":2,"value":"Feb"},{"id":3,"value":"Mar"}],' +
            '"2":[{"id":4,"value":"Apr"},{"id":5,"value":"May"},{"id":6,"value":"Jun"}],' +
            '"3":[{"id":7,"value":"Jul"},{"id":8,"value":"Aug"},{"id":9,"value":"Sep"}],' +
            '"4":[{"id":10,"value":"Oct"},{"id":11,"value":"Nov"},{"id":12,"value":"Dec"}]' +
            '}'
        );


        $scope.quarters = [];

        $scope.quarters = (quartersNew[0]);

        $scope.quarterMonths = function () {

            $scope.months = [];
            $scope.timescale.months = undefined;
            $scope.months = quarterMonthMap[$scope.timescale.quarters];
        }

        function loadStates() {
            $scope.loader.isStateBox = true;
            var url = configApiClient.baseUrl + 'config/states';
            HttpService.get(url).then(function (data) {
                // on success
                $scope.loader.isStateBox = false;
                $scope.states = data.states;
                //Using this array in renderMap function to zoom the map
                salesDataJoin = [];
                if ($scope.states) {
                    $.each($scope.states, function () {
                        salesDataJoin.push(this);
                    });
                }
            }, function (data) {
                // on error
                $scope.loader.isStateBox = false;
            });
        }

        loadStates();

        function loadYear() {
            $scope.loader.isYearBox = true;
            var url = configApiClient.baseUrl + 'config/sales/years';
            HttpService.get(url).then(function (data) {
                // on success
                $scope.sales_years = data.sales_years;
                $scope.loader.isYearBox = false;
            }, function (data) {
                // on error
                $scope.loader.isYearBox = false;
            });
        }

        loadYear();


        $scope.cities;
        $scope.selectCities = function () {
            $scope.loader.isCityBox = true;
            $scope.cities = undefined;
            $scope.region.cities = undefined;
            $scope.region.zip_codes = undefined;
            $scope.zips = [];

            var url = configApiClient.baseUrl + "config/states/cities?state_names=" + $scope.region.states;
            HttpService.get(url).then(function (data) {
                // on success
                $scope.cities = data[$scope.region.states];
                $scope.loader.isCityBox = false;
            }, function (data) {
                $scope.loader.isCityBox = false;
                // on error
            });
        }
        $scope.selectZip = function () {

            $scope.loader.isZipBox = true;
            $scope.region.zip_codes = undefined;
            var url = configApiClient.baseUrl + "config/cities/zipcodes?cities_names=" + $scope.region.cities;
            HttpService.get(url).then(function (data) {
                // on success
                $scope.zips = data[$scope.region.cities];
                $scope.loader.isZipBox = false;
            }, function (data) {
                $scope.loader.isZipBox = false;
                // on error
            });
        }

        $scope.WOStatusMSg = "";
        $scope.woItemValidation = function () {
            if($scope.WOSummary === ""){
                $scope.WOStatusMSg = "Please enter Summary.";
                return false;
            }
            if($scope.WODescription === ""){
                $scope.WOStatusMSg = "Please enter Description.";
                return false;
            }
            $scope.WOStatusMSg = "";
            return true;
        };

        $scope.postWOItem = function () {
            debugger;
            if($scope.woItemValidation()){
                var url = configApiClient.baseUrl + 'secure-gateway';
                var param = {
                    "work_item_summary": $scope.WOSummary,
                    "work_item_type": $scope.WOType,
                    "work_item_description": $scope.WODescription
                    /*"work_item_priority": $scope.WOPriority,
                     "work_item_severity": $scope.WOSeverity*/
                };
                $(".woItemResponseLoader").show();
                HttpService.post(url, param).then(function (data) {
                    // on success
                    if (!data || data.length === 0) {
                        $('#WOModal').modal('hide');
                        $scope.clearWOItemField();
                    }
                }, function (data) {
                    // on error
                    console.log( "Create work item:"+data);
                });
            }
        };

        $scope.postWOItemCancel = function () {
            $('#WOModal').modal('hide');
            $scope.clearWOItemField();
        }

        $scope.clearWOItemField = function () {
            $scope.WOSummary = "";
            $scope.WOType = "defect";
            $scope.WODescription = "";
            $scope.WOPriority = "Medium";
            $scope.WOSeverity = "Normal";
            $scope.WOStatusMSg = "";
            $(".woItemResponseLoader").hide();
        };
        $scope.clearWOItemField();

        $scope.maximizeGrid = function () {
            var gridNormal = $("#gridNormal1").clone();

            $("#gridMax").empty();
            $("#gridMax").append(gridNormal);

            $("#gridMax #gridMaxImg").addClass("hidden");
            $("#gridMax #gridCloseImg").removeClass("hidden");
            $("#gridNormal1").removeClass("hidden");

            // $(".maxtbody").height(300);
            //For notifications help icon in maximized views
            $('[data-toggle="popover"]').popover()

            $("#gridMax").removeClass("hidden");
        }

        $("body").on("click", "#gridCloseImg", function () {
            $("#gridMax").empty();
            $("#gridMax").addClass("hidden");

            //   $("#tbody").height(355);

        });

        ///////////////////////Report on load
        var url = configApiClient.baseUrl + "usage";
        HttpService.get(url).then(function (data) {
            // on success
            $scope.mkt_griddata = data.data;
            $rootScope.isOnLoad = true;
            $rootScope.isReportAvailableForDownload = true;
        }, function (data) {
            // on error
        });


    }
})();
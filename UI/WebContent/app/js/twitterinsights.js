angular.module('angle').controller('TwitterInsightsController',
		['$rootScope', '$scope', '$state', '$localStorage', "iot.config.ApiClient", 'HttpService',
                 function($rootScope, $scope, $state, $localStorage, configApiClient, HttpService){

	$scope.showPerSign = false;

	$scope.twitter_insights_griddata = [];

	$("#gridAdjustHeight").height(400);

	var url = configApiClient.baseUrl + "twitter/innerpage/twitter-insights";
	HttpService.get(url).then(function(data){
		// on success
		$scope.twitter_insights_griddata = data.data;
	},function(data){
		// on error
	});

	$scope.editTwitterInsights = function(make, model) {
		$localStorage.showTwitterInnerLint = true;
		var twitterinsights = {};
		twitterinsights.make = make;
		twitterinsights.model = model;
		$localStorage.twitterinsights = twitterinsights;
		$state.go('app.notificationconf');
	};

	$scope.deleteTwitterInsights = function() {
		alert("deleteTwitterInsights");
	};

	$scope.tweetsData = {};

	$scope.loadTwitterInsightsData = function (id) {
		var url = configApiClient.baseUrl + "twitter/innerpage/twittersentiments/"+id;
		HttpService.get(url).then(function(data){
			// on success
			$scope.tweetsData = data.data[0];
    		if($scope.tweetsData){
    			getTwitterSentiments('twitter_sentiments', $scope.tweetsData);
    			$scope.showPerSign = true;
    		}
		},function(data){
			// on error
		});
	};

	$scope.loadTwitterInsightsData('');

	$scope.days = [{"day": "5", "desc": "Last 5 Days"}, {"day": "10", "desc": "Last 10 Days"}];

	$scope.loadDashboard = function() {
		$rootScope.isApplyFiterButton = true;
		$state.go('app.singleview');
	};

	$scope.getTextColor = function(color){
		return (color=='red'? 'twitter_percentage twitter_arrow_red' : 'twitter_percentage twitter_arrow_green');
	}

	$scope.maximizeGrid=function(){
		var gridNormal = $("#gridNormal").clone();

		$("#gridMax").empty();
		$("#gridMax").append(gridNormal);

		$("#gridMax #gridMaxImg").addClass("hidden");
		$("#gridMax #gridCloseImg").removeClass("hidden");


		$("#gridAdjustHeight").height(560);

	$("#gridMax").removeClass("hidden");

	};

	$("body").on("click","#gridCloseImg",function(){
		$("#gridMax").empty();
		$("#gridMax").addClass("hidden");
		  $("#gridAdjustHeight").height(400);
    });



	$scope.getTwitterData = function(divId) {
		  var data = [
		  			[1247529600000,20.32],
		  			[1247616000000,20.98],
		  			[1247702400000,-21.07],
		  			[1247788800000,25.68],
		  			[1248048000000,-21.84],
		  			[1248134400000,21.64],
		  			[1248220800000,-22.39],
		  			[1248307200000,22.55],
		  			[1248393600000,-22.86],
		  			[1248652800000,22.87],
		  			[1248739200000,-22.86],
		  			[1248825600000,22.86],
		  			[1248912000000,-23.26],
		  			[1248998400000,23.34]
		  			];
		  if(divId == 'mentions_div') {
			  var data = [
			  			[1247529600000,-20.32],
			  			[1247616000000,20.98],
			  			[1247702400000,21.07],
			  			[1247788800000,-25.68],
			  			[1248048000000,-21.84],
			  			[1248134400000,-21.64],
			  			[1248220800000,22.39],
			  			[1248307200000,-22.55],
			  			[1248393600000,22.86],
			  			[1248652800000,22.87],
			  			[1248739200000,22.86],
			  			[1248825600000,-22.86],
			  			[1248912000000,-23.26],
			  			[1248998400000,23.34]
			  			];
		  }else if(divId == 'impressions_div'){
			  var data = [
			  			[1247529600000,20.32],
			  			[1247616000000,-20.98],
			  			[1247702400000,-21.07],
			  			[1247788800000,25.68],
			  			[1248048000000,-21.84],
			  			[1248134400000,-21.64],
			  			[1248220800000,22.39],
			  			[1248307200000,22.55],
			  			[1248393600000,-22.86],
			  			[1248652800000,-22.87],
			  			[1248739200000,-22.86],
			  			[1248825600000,22.86],
			  			[1248912000000,-23.26],
			  			[1248998400000,23.34]
			  			];
		  }
		  renderTwitterSentimentsLineChart(divId, data);

	  }

		$scope.selectedRowIndex = -1;

		$scope.getTwitterInsightsData = function(id, index){

			$scope.loadTwitterInsightsData(id)
			$scope.selectedRowIndex = index;
		}
}]);

function getTwitterSentiments (divId, twitter_sentiments) {

	 var positive 	= twitter_sentiments.sentimate_positive;
	 var pos_other	= (100-positive);
	 var negative 	= twitter_sentiments.sentimate_neutral;
	 var neg_other	= (100-negative);
	 var neutral 	= twitter_sentiments.sentimate_negative;
	 var neu_other	= (100-neutral);

	 sentimentsData(divId+'_pos', 'Positive', positive, pos_other);

	 sentimentsData(divId+'_neu', 'Neutral', neutral, neu_other);

	 sentimentsData(divId+'_neg', 'Negative', negative, neg_other);

	 // when browser resize need to redraw the chart to display the inner text at proper location
	 $(window).resize(function() {
		    if(this.resizeTO) clearTimeout(this.resizeTO);
		    this.resizeTO = setTimeout(function() {
		    	var objArr = [];
		    	$(this).trigger('resizeEnd', objArr);
		    }, 500);
	  });

	  $(window).bind('resizeEnd', function(event, param1) {

		  sentimentsData(divId+'_pos', 'Positive', positive, pos_other);

		  sentimentsData(divId+'_neu', 'Neutral', neutral, neu_other);

		  sentimentsData(divId+'_neg', 'Negative', negative, neg_other);

	  });
 };

function sentimentsData (divId, name, yValue, oValue) {

	 var twitterData	= [];
	 var obj 			= {};
	 obj.name 			= name;
	 obj.y				= yValue
	 twitterData.push(obj);
	 var obj 			= {};
	 obj.name 			= "Others";
	 obj.y				= oValue
	 twitterData.push(obj);

	 var innerText = "<div width='100%' style='text-align:center'>"+yValue+"%</div><div>"+name+"<div>";
	 renderTwitterSentimentsPieChart(divId, twitterData, innerText);

}

function renderTwitterSentimentsLineChart(divId, insightsData) {
	  var pieChart = new Highcharts.Chart({
	      chart: {
	        	renderTo: divId,
	        	width: 140,
	        	height:70,
          	spacingLeft: 0,
	        	spacingTop: 0
	      },
	      credits: {
	          enabled: false
	      },
          rangeSelector: {
              selected: 1
          },
          exporting: { enabled: false },
          title: {
              text: ''
          },
          tooltip: false,
          xAxis: {
                categories: [''],
                title: {
                    text: null
                },
                labels: {enabled:false,y : 20, rotation: -45, align: 'right' }
            },
          yAxis: {
              title: {
                  text: ''
              },
              visible: false
          },
          series: [{
              name: '',
              showInLegend: false,
              data: insightsData,
              type: 'spline',
              tooltip: {
                  valueDecimals: 2
              }
          }]
	  });
}
function renderTwitterSentimentsPieChart(divId, insightsData, innerText){

	var colorCode = ['#339933', '#808080']; // For Positive
	if(divId == 'twitter_sentiments_neg'){
		colorCode = ['#FF0000', '#808080']; // For Negative
	}else if(divId == 'twitter_sentiments_neu'){
		colorCode = ['#5DADE2', '#808080']; // For Neutral
	}



	var chart1 = new Highcharts.Chart({
        chart: {
        	renderTo:divId,
        	width: 120,
        	height: 120,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            margin: [0, 0, 0, 0],
            events: {
            	load: function(event) {

            	}
            }
        },
        credits: {
	    	enabled: false
	    },
	    exporting: {
	    	enabled: false
	    },
        title: {
            text: '',
            useHTML: true,
            align: 'left',
            style: {
                color: '#0099cc'
            },
            floating: true,
            y: 24,
            x: 15
        },
        tooltip: false,

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: colorCode,
                size: 10,
                center: ['50%', '50%']
            }
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            size: '80%',
            innerSize: '80%',
            showInLegend:false,
            data: insightsData
        }]
    },
    function(chart) { // on complete

    	var div = '#'+divId;

    	var position = $(div).position();


        var textX = position.left + (chart.plotWidth  * 0.4) - 4;
        var textY = position.top + (chart.plotHeight * 0.5); 

        var span = "<div id='"+divId+"_info_text'>"+innerText+"</div>";

        	$('#'+divId+'_info_text').remove();
	        $('#'+divId+'_text').append(span);
	        	span = $('#'+divId+'_text');



	        	span.css('left', textX + (span.width() * -0.5)+30);
	        	span.css('top', textY + (span.height() * -0.5)+2);

    	}

    );
};


App.controller('TwitterInsightsController', 
		['$rootScope', '$scope', '$state', '$http', '$timeout', "iot.config.ApiClient",
                 function($rootScope, $scope, $state, $http, $timeout, configApiClient){
	
	$scope.twitter_insights_griddata = [];
	
	// dummey data
	var obj 		= {};
	obj.make 		= 1;
	obj.model 		= '#1201';
	obj.tweets 		= 100;
	obj.likes 		= 120;
	obj.dislikes 	= 45;
	obj.followers 	= 260;
	obj.comments 	= 521;
	$scope.twitter_insights_griddata.push(obj);
	
	var obj 		= {};
	obj.make 		= 2;
	obj.model 		= '#1202';
	obj.tweets 		= 90;
	obj.likes 		= 170;
	obj.dislikes 	= 15;
	obj.followers 	= 560;
	obj.comments 	= 121;
	$scope.twitter_insights_griddata.push(obj);
	
	var obj 		= {};
	obj.make 		= 3;
	obj.model 		= '#1203';
	obj.tweets 		= 100;
	obj.likes 		= 10;
	obj.dislikes 	= 150;
	obj.followers 	= 56;
	obj.comments 	= 11;
	$scope.twitter_insights_griddata.push(obj);
	
	
	var obj 		= {};
	obj.make 		= 4;
	obj.model 		= '#1204';
	obj.tweets 		= 60;
	obj.likes 		= 10;
	obj.dislikes 	= 150;
	obj.followers 	= 56;
	obj.comments 	= 12;
	$scope.twitter_insights_griddata.push(obj);
	
	
	var obj 		= {};
	obj.make 		= 5;
	obj.model 		= '#1205';
	obj.tweets 		= 50;
	obj.likes 		= 190;
	obj.dislikes 	= 18;
	obj.followers 	= 560;
	obj.comments 	= 123;
	$scope.twitter_insights_griddata.push(obj);
	
	
	$("#gridAdjustHeight").height(400);
	
	/*$http({url:configApiClient.baseUrl + "twitterinsights/data", //api url
        method: "POST",
        Accept: "text/plain"}).success(function(data, status) {
        		console.log("*****************twitterinsights success ****************");
        		$scope.twitter_insights_griddata = data; 
          
        		//console.log("TwitterInsightsGriddata"+JSON.stringify(data));
                
           }). error(function(data, status) {
        	   console.log("*****************twitterinsights error ****************");
               console.log("usageerror:"+status);
             
    });*/
	
	$scope.tweetsData = {};
	$scope.tweetsData.tweets_color = 'red';
	$scope.tweetsData.tweets_count = 7;
	$scope.tweetsData.tweets_percentage = 69.3;
	
	$scope.tweetsData.tweetsimpress_color = 'red';
	$scope.tweetsData.tweetsimpress_count = 3564;
	$scope.tweetsData.tweetsimpress_percentage = 81.8;
	
	$scope.tweetsData.profilevisits_color = 'green';
	$scope.tweetsData.profilevisits_count = 997;
	$scope.tweetsData.profilevisits_percentage = 28.6;
	
	$scope.tweetsData.mentions_color = 'red';
	$scope.tweetsData.mentions_count =10;
	$scope.tweetsData.mentions_percentage = 23.1;
	
	$scope.tweetsData.twitter_color = 'red';
	$scope.tweetsData.twitter_count = 248;
	$scope.tweetsData.twitter_percentage = 30;
	
	$scope.days = [{"day": "5", "desc": "Last 5 Days"}, {"day": "10", "desc": "Last 10 Days"}];
	
	$scope.loadDashboard = function() {
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
		//$("#gridCloseImg").removeClass("hidden");
		
		$("#gridAdjustHeight").height(560);

	$("#gridMax").removeClass("hidden");
	
	};
	
	$("body").on("click","#gridCloseImg",function(){
		$("#gridMax").empty();
		$("#gridMax").addClass("hidden");
		  $("#gridAdjustHeight").height(400);
    });
	
	$scope.getTwitterSentiments = function(divId){
		  
			var twitterData = [{"product": "Make 1 - Model C","preferenceName": "Likes","count": 47,"totalComments": 66},
		                     {"product": "Make 1 - Model C","preferenceName": "Dislikes","count": 10,"totalComments": 66}];
		  
		
		  var twitterData1 = 
			  [{"name": "positive", "y": 59, "totalComments": 66},
			   {"name": "othres", "y": 41, "totalComments": 66}];
		  
		  //var twitterDataStr = JSON.stringify(twitterData);
		  
		  //twitterDataStr = twitterDataStr.replace(/"count":/g, '"y":');
		  //twitterDataStr = twitterDataStr.replace(/"preferenceName":/g, '"name":');
					
		  //twitterData = JSON.parse(twitterDataStr);
		  
		 var twitterTitle = "<img height='30px' width='30' src='app/img/Dashboardassets/twitter.png' alt=''/> Twitter Sentiments";
			 
		 var innerText = "<div width='100%' style='text-align:center'>59%</div><div>Positive<div>"; //data.centerText;
		 renderTwitterSentimentsPieChart(divId+'_pos', twitterData1, twitterTitle, innerText); 
		  
		  var twitterData2 = 
			  [{"name": "Neutral", "y": 27, "totalComments": 66},
			   {"name": "othres", "y": 73, "totalComments": 66}];
		  
		  var innerText = "<div width='100%' style='text-align:center'>27%</div><div>Neutral<div>"; //data.centerText;
		  renderTwitterSentimentsPieChart(divId+'_neu', twitterData2, twitterTitle, innerText);
		  
		  var twitterData3 = 
			  [{"name": "Negative", "y": 14, "totalComments": 66},
			   {"name": "othres", "y": 86, "totalComments": 66}];
		
		  var innerText = "<div width='100%' style='text-align:center'>14%</div><div>Negative<div>"; //data.centerText;
		  renderTwitterSentimentsPieChart(divId+'_neg', twitterData3, twitterTitle, innerText);
		  
		  
		  $(window).resize(function() {
			    if(this.resizeTO) clearTimeout(this.resizeTO);
			    this.resizeTO = setTimeout(function() {
			    	var objArr = [];
			    	
			        $(this).trigger('resizeEnd', objArr);
			    }, 500);
		  });
		  
		  $(window).bind('resizeEnd', function(event, param1) {
			 
			  var twitterTitle = "<img height='30px' width='30' src='app/img/Dashboardassets/twitter.png' alt=''/> Twitter Sentiments";
			
			  var twitterData = 
				  [{"name": "positive", "y": 59, "totalComments": 66},
				   {"name": "othres", "y": 41, "totalComments": 66}];
			  
			  var innerText = "<div width='100%' style='text-align:center'>59%</div><div>Positive<div>"; //data.centerText;
			  renderTwitterSentimentsPieChart(divId+'_pos', twitterData, twitterTitle, innerText); 
			  
			  var twitterData = 
				  [{"name": "Neutral", "y": 27, "totalComments": 66},
				   {"name": "othres", "y": 73, "totalComments": 66}];
			  
			  var innerText = "<div width='100%' style='text-align:center'>27%</div><div>Neutral<div>"; //data.centerText;
			  renderTwitterSentimentsPieChart(divId+'_neu', twitterData, twitterTitle, innerText);
			  
			  var twitterData = 
				  [{"name": "Negative", "y": 14, "totalComments": 66},
				   {"name": "othres", "y": 86, "totalComments": 66}];
			
			  var innerText = "<div width='100%' style='text-align:center'>14%</div><div>Negative<div>"; //data.centerText;
			  renderTwitterSentimentsPieChart(divId+'_neg', twitterData, twitterTitle, innerText);  
			  
		  });
	  };
	  
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
}]);

function renderTwitterSentimentsLineChart(divId, insightsData) {
	  var pieChart = new Highcharts.Chart({
	      chart: {
	        	renderTo: divId,
	        	width: 140,
	        	height:70,
//	        	margin: [0, 10, 10, 10]
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
function renderTwitterSentimentsPieChart(divId, insightsData, chartTitle, innerText, innerTextDiv){
	
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
            /*marginRight:140,*/
            margin: [0, 0, 0, 0],
            events: {
            	load: function(event) {
            		/*if (divId == 'twitter-handle-container'){
            			$('.highcharts-legend-item').last().append('<br><br><div style="font-size:12px; font-family:Lucida Sans Unicode; width:200px"><b>Comments-' +this.series[0].data[0].totalComments + '</b></div>');
            		}*/
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
                colors: colorCode, //divId != 'twitter-handle-container'?['#339933', '#808080', '#ffcc00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']: ['#5DADE2', '#D6EAF8'],
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
    	//console.log('--X: ' + position.left + ", Y: " + position.top );
    	  
        var textX = position.left + (chart.plotWidth  * 0.4) - 4; // chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = position.top + (chart.plotHeight * 0.5); //chart.plotTop  + (chart.plotHeight * 0.5);
        
        var span = "<div id='"+divId+"_info_text'>"+innerText+"</div>";
        
        	$('#'+divId+'_info_text').remove();
	        $('#'+divId+'_text').append(span);
	        	span = $('#'+divId+'_text');
	        	
	        	//console.log("X = "+(textX + (span.width() * -0.5)+30));
	            //console.log("Y = "+(textY + (span.height() * -0.5)+2));
	            
	        	span.css('left', textX + (span.width() * -0.5)+30);
	        	span.css('top', textY + (span.height() * -0.5)+2);
       
    	}
	
    );	
};
App.factory('HttpService',function($http, $rootScope, $q){
	
		/**
		 * AJAX post call service.
		 * 
		 * @url : resource url
		 * @param : parameters as a JSON object
		 */
		function postCall(url, params){
			var deferred = $q.defer();
			$http({
				url: url,
				data: params,
				method: 'POST',
				dataType: 'json',
				headers: { 
	            	'Content-Type': 'application/json',
	            	'Accept':'text/plain' ,
	            	'Access-Control-Allow-Origin' :'http://localhost:3000/api/v1',
	            	'Access-Control-Allow-Methods':'POST',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject("An error occured while fetching data");
			});
		    return deferred.promise;
		}
		
		/**
		 * AJAX get call service
		 * @url : resource url
		 */
		function getCall(url){
			var deferred = $q.defer();
			$http({
				url: url,
				method: 'GET',
				dataType: 'json',
				headers: { 
	            	'Content-Type': 'application/json',
	            	'Accept':'text/plain' ,
	            	'Access-Control-Allow-Origin' :'http://localhost:3000/api/v1',
	            	'Access-Control-Allow-Methods':'POST',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject("An error occured while fetching data");
			});
		    return deferred.promise;
		}
		
		return{
			post: postCall,
			get: getCall
		};
	});
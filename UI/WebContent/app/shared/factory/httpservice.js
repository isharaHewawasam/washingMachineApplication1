angular.module('angle').factory('HttpService',function($http, $rootScope, $q){

		var allowOrigin = 'http://localhost:3000/api/v1';
		
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
	            	'Access-Control-Allow-Origin' : allowOrigin,
	            	'Access-Control-Allow-Methods':'POST',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject(data);
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
	            	'Access-Control-Allow-Origin' : allowOrigin,
	            	'Access-Control-Allow-Methods':'GET',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject(data);
			});
		    return deferred.promise;
		}
		
		/**
		 * AJAX put call service.
		 * 
		 * @url : resource url
		 * @param : parameters as a JSON object
		 */
		function putCall(url, params){
			var deferred = $q.defer();
			$http({
				url: url,
				data: params,
				method: 'PUT',
				dataType: 'json',
				headers: { 
	            	'Content-Type': 'application/json',
	            	'Accept':'text/plain' ,
	            	'Access-Control-Allow-Origin' : allowOrigin,
	            	'Access-Control-Allow-Methods':'PUT',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject(data);
			});
		    return deferred.promise;
		}
		
		/**
		 * AJAX delete call service.
		 * 
		 * @url : resource url
		 * @param : parameters as a JSON object
		 */
		function deleteCall(url, params){
			var deferred = $q.defer();
			$http({
				url: url,
				data: params,
				method: 'DELETE',
				dataType: 'json',
				headers: { 
	            	'Content-Type': 'application/json',
	            	'Accept':'text/plain' ,
	            	'Access-Control-Allow-Origin' : allowOrigin,
	            	'Access-Control-Allow-Methods':'DELETE',
	            	'Access-Control-Allow-Credentials':true  
				}
				
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
		        deferred.reject(data);
			});
		    return deferred.promise;
		}
		
		return{
			post	: postCall,
			get		: getCall,
			put		: putCall,
			delete	: deleteCall
		};
	});
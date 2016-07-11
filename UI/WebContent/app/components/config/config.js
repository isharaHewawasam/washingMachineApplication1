/*
 * IOT UI
 * Configuration Module
 * TODO: For ease of use, use placehoders like $baseUrl$?
 * Organised in separate constants to be able to inject only required configs
 */

/*
* A configurable value to be changed according to deployment environment. When calling an api from ui, requests will be sent to 
* the api in this configured host.
*/
var host= 'http://ibm-iot.mybluemix.net';

App.constant('iot.config.buildVersion','0.1') // updated by Grunt

	.constant('iot.config.ApiClient', {
		baseUrl: host + '/api/v1/'
	});
/*
 * IOT UI
 * Configuration Module
 * TODO: For ease of use, use placehoders like $baseUrl$?
 * Organised in separate constants to be able to inject only required configs
 */

App.constant('iot.config.buildVersion','0.1') // updated by Grunt

	.constant('iot.config.ApiClient', {
		baseUrl:'http://ibm-iot.mybluemix.net/api/v1/'
	});
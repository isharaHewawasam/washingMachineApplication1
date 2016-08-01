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
var host;
// if(location.hostname == 'localhost') {
	host= 'api.us.apiconnect.ibmcloud.com/chinthakaak-dev/sb';
// } else {
// 	host = location.hostname;
// }
console.log('host in config file : ', host);
//var host = location.hostname;
App.constant('iot.config.buildVersion','0.1') // updated by Grunt

	.constant('iot.config.ApiClient', {
		baseUrl: 'https://' + host + '/api/v1/'
	});
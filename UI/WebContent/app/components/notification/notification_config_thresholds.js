/*
 * IOT UI
 * Configuration Module
 * TODO: For ease of use, use placehoders like $baseUrl$?
 * Organised in separate constants to be able to inject only required configs
 */

/*
* A configurable value set to be changed according to threshold and tolerance values required for notifications display.
*/
App.constant('iot.config.buildVersion','0.1') // updated by Grunt

	.constant('iot.config.Notification', {
		positiveTwitterSentimentThreshold: 10,
		positiveTwitterSentimentTolerance: 10,
		negativeTwitterSentimentThreshold: 10,
		negativeTwitterSentimentTolerance: 10,
		spikeByConnectedMachinesTolerance: 80,
		spikeBySpecificErrorsTolerance: 80,
		spikeBySpecificErrorByMakeModelTolerance: 25
	});
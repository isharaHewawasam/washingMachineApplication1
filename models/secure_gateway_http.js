'use strict';
var config = require('../config/config');
var net = require('net');

var HOST = config.java_server_clm_host;
var PORT = config.java_server_clm_port;

exports.getApis = function(params,callback) {
	var client = new net.Socket();
    var responseData;
	client.connect(PORT, HOST, function() {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		client.setTimeout(1 * 60 * 1000);
		// Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
	    var workitem = params.work_item.originalValue;
		client.write(JSON.stringify(workitem)+'\n');
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
		console.log('Data Received : ' + data);
		// Close the client socket completely
		responseData = data;
		//callback(null, responseData);
		client.destroy();

	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
		callback(null, responseData);
		console.log('Connection closed');
	});

	client.on('error', function(err) {
		console.log("Error: " + err.message);
		callback(err.message, null);
	})

};

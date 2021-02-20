/**
 * Worker-related tasks
 * 
 */

const { worker } = require('cluster');
const // Dependencies
	path = require('path'),
	fs = require('fs'),
	_data = require('./data'),
	http = require('http'),
	https = require('https'),
	helpers = require('./helpers'),
	url = require('url'),
	util = require('util'),
	debug = util.debuglog('workers');

// Instantiate the worker object
const workers = {};

// Lookup all tokens and delete the expired ones
workers.clearOldTokens = function() {
	// Get all the tokens
	debug('clearOldTokens started...');
	_data.list('tokens', function(err, tokens) {
		debug('List of tokens', tokens);
		if (!err && tokens && tokens.length > 0) {
			tokens.forEach((token) => {
				// Read in the token data
				_data.read('tokens', token, function(err, tokenData) {
					if (!err && tokenData) {
						// Check if the token is expired
						if (tokenData.expires < Date.now()) {
							_data.read('tokens', token, function(err, data) {
								if (!err && data) {
									_data.delete('tokens', token, function(err) {
										if (!err) {
											debug(token, ' Deleted');
										} else {
											debug('Error: Could not delete the specified token');
										}
									});
								} else {
									debug('Error: Could not find the specified token');
								}
							});
						}
					} else {
						debug("Error reading one of the token's data");
					}
				});
			});
			debug('...clearOldTokens finished');
		} else {
			debug('Error: Could not find any tokens to process');
		}
	});
};

// Timer to execute the worker-process once per day
workers.dailyTasksLoop = function() {
	debug("Loop 'dailyTasksLoop' called");
	setInterval(function() {
		debug("'dailyTasksLoop' Looped");
		// workers.clearOldTokens();
	}, 1000 * 60 * 60 * 24);
};

// Init script
workers.init = function() {
	// Send to console, in yellow
	console.log('\x1b[33m%s\x1b[0m', 'Background workers ar running');

	// Execute the token checks immediately
	workers.clearOldTokens();

	// Call the loop so the checks will execute later on
	workers.dailyTasksLoop();
};

// Export the module
module.exports = workers;

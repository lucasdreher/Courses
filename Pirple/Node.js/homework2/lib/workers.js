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
	_logs = require('./logs'),
	util = require('util'),
	debug = util.debuglog('workers');

// Instantiate the worker object
const workers = {};

// =============

workers.log = function(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck) {
	// Form the log data
	const logData = {
		check: originalCheckData,
		outcome: checkOutcome,
		state: state,
		alert: alertWarranted,
		time: timeOfCheck
	};

	// Convert data to a string
	const logString = JSON.stringify(logData);

	// Determine the name of the log file
	const logFileName = originalCheckData.id;

	// Append the log string to the file
	_logs.append(logFileName, logString, function(err) {
		if (!err) {
			debug('Logging to the file succeeded');
		} else {
			debug('Logging to file failed');
		}
	});
};

// Timer to execute the worker-process once per minute
workers.loop = function() {
	setInterval(function() {
		workers.gatherAllChecks();
	}, 1000 * 60);
};

// Rotate (compress) the log files
workers.rotateLogs = function() {
	// Listing all the (non compressed) log files
	_logs.list(false, function(err, logs) {
		if (!err && logs && logs.length > 0) {
			logs.forEach((logName) => {
				// Compress the data to a different file
				const logId = logName.replace('.log', ''),
					newFileId = logId + '-' + Date.now();
				_logs.compress(logId, newFileId, function(err) {
					if (!err) {
						// Truncate the log
						_logs.truncate(logId, function(err) {
							if (!err) {
								debug('Success truncating log file');
							} else {
								debug('Error truncating log file');
							}
						});
					} else {
						debug('Error compressing one of the log files', err);
					}
				});
			});
		} else {
			debug('Could not find any logs to rotate');
		}
	});
};

// Timer to execute the log-rotation process on per day
workers.logRotationLoop = function() {
	setInterval(function() {
		workers.rotateLogs();
	}, 1000 * 60 * 60 * 24);
};

// Init script
workers.init = function() {
	// Send to console, in yellow
	console.log('\x1b[33m%s\x1b[0m', 'Background workers ar running');

	// Execute all the checks immediately
	workers.gatherAllChecks();

	// Call the loop so the checks will execute later on
	workers.loop();

	// Compress all the logs immediately
	workers.rotateLogs();

	// Call the compression loop so logs will be compress later on
	workers.logRotationLoop();
};

// Export the module
module.exports = workers;

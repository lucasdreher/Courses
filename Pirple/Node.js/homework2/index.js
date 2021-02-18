/**
 * Primary file for the API
 * 
 */

const // Dependencies
	server = require('./lib/server.js'),
	workers = require('./lib/workers.js');

// Declare the app
const app = {};

// Init function
app.init = function() {
	// Start the server
	server.init();
	// Start the workers
	workers.init();
};

// Execute
app.init();

// Export the app
module.exports = app;

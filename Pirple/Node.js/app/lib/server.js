/**
 * Server-related tasks
 * 
 */

const // Dependencies
	http = require('http'),
	https = require('https'),
	url = require('url'),
	StringDecoder = require('string_decoder').StringDecoder,
	config = require('./config'),
	fs = require('fs'),
	handlers = require('./handlers'),
	helpers = require('./helpers');
path = require('path');

// Instantiate the server module object
const server = {};

// Instantiated the HTTP server
server.httpServer = http.createServer(function(req, res) {
	server.unifiedServer(req, res);
});

// Instantiate the HTTPS server
server.httpsServerOptions = {
	key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res) {
	server.unifiedServer(req, res);
});

// All the server logic for both the http and https server
server.unifiedServer = function(req, res) {
	// Get the url and parse it
	const parseUrl = url.parse(req.url, true); //TODO deprecated

	// Get the path
	const path = parseUrl.pathname,
		trimmedPath = path.replace(/^\/+|\/+$/g, ''); // or (/^\/|\/$/g, '')

	// Get the query string as an object
	const queryStringObject = parseUrl.query;

	// Get the HTTP Method
	const method = req.method.toLowerCase();

	// Get the headers as an object
	const headers = req.headers;

	// Get the payload, if any
	const decoder = new StringDecoder('utf-8');
	let buffer = '';
	req.on('data', function(data) {
		buffer += decoder.write(data);
	});
	req.on('end', function() {
		buffer += decoder.end();

		// Choose the handler this request should go to. If one is not found, use the notFound handler
		const chosenHandler =
			typeof server.router[trimmedPath] !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		const data = {
			trimmedPath: trimmedPath,
			queryStringObject: queryStringObject,
			method: method,
			headers: headers,
			payload: helpers.parseJsonToObject(buffer)
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, function(statusCode, payload) {
			// Use the status code called back by the handler, or default to 200
			statusCode = typeof statusCode == 'number' ? statusCode : 200;

			// Use the payload called by the handler, or the default to an empty object
			payload = typeof payload == 'object' ? payload : {};

			// Convert the payload to a string
			const payloadString = JSON.stringify(payload);

			//Return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the request
			console.log('Returning this response: ', statusCode, payloadString);
		});
	});
};

// Define a request router
server.router = {
	ping: handlers.ping,
	users: handlers.users,
	tokens: handlers.tokens,
	checks: handlers.checks
};

// Init script
server.init = function() {
	// Start the HTTP server
	server.httpServer.listen(config.httpPort, function() {
		console.log(`The server is listening on port ${config.httpPort}`);
	});
	// Start the HTTPS server
	server.httpsServer.listen(config.httpsPort, function() {
		console.log(`The server is listening on port ${config.httpsPort}`);
	});
};

// Export the module
module.exports = server;

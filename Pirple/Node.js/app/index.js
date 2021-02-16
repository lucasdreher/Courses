/**
 * Primary file for the API
 * 
 */

const // Dependencies
	http = require('http'),
	https = require('https'),
	url = require('url'),
	StringDecoder = require('string_decoder').StringDecoder,
	config = require('./config'),
	fs = require('fs');

// Instantiated the HTTP server
const httpServer = http.createServer(function(req, res) {
	unifiedServer(req, res);
});

// Start the server, and have it listen on port defined by the environment at config.js
httpServer.listen(config.httpPort, function() {
	console.log(`The server is listening on port ${config.httpPort}`);
});

// Instantiate the HTTPS server
const httpsServerOptions = {
		key: fs.readFileSync('./https/key.pem'),
		cert: fs.readFileSync('./https/cert.pem')
	},
	httpsServer = https.createServer(httpsServerOptions, function(req, res) {
		unifiedServer(req, res);
	});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
	console.log(`The server is listening on port ${config.httpsPort}`);
});

// All the server logic for both the http and https server
const unifiedServer = function(req, res) {
	// Get the url and parse it
	const parseUrl = url.parse(req.url, true);

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
		const chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		const data = {
			trimmedPath: trimmedPath,
			queryStringObject: queryStringObject,
			method: method,
			headers: headers,
			payload: buffer
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

// Define the handlers
const handlers = {};

// Ping handler
handlers.ping = function(data, callback) {
	callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
	callback(404);
};

// Define a request router
const router = {
	ping: handlers.ping
};

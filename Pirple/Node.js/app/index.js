/**
 * Primary file for the API
 * 
 */

const // Dependencies
	http = require('http'),
	url = require('url'),
	StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer(function(req, res) {
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

		// Send a response
		res.end('Hello World\n');

		// Log the request
		console.log('Request received with these payload:', buffer);
	});
});

// Start the server, and have it listen on port 3000
server.listen(3000, function() {
	console.log('The server is listening on port 3000 now');
});

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
	// Callback HTTP status code, and a payload object
	callback(406, { name: 'sample handler' });
};

// Not found handler
handlers.notFound = function(data, callback) {
	callback(404);
};

// Define a request router
const router = {
	sample: handlers.sample
};

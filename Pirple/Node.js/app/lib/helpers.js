/**
 * Helpers for various tasks
 * 
 */

const // Dependencies
	crypto = require('crypto'),
	config = require('./config');
const { callbackify } = require('util');

// Container for all the helpers
const helpers = {};

// Create a SHA256 hash
helpers.hash = function(str) {
	if (typeof str == 'string' && str.length > 0) {
		const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
		return hash;
	} else {
		return false;
	}
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str) {
	try {
		const obj = JSON.parse(str);
		return obj;
	} catch (e) {
		return {};
	}
};

// Crete a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength) {
	strLength = typeof strLength == 'number' && strLength > 0 ? strLength : false;
	if (strLength) {
		// Define all the possible character that could go into a string
		const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

		// Start the final string
		let str = '';
		for (let i = 0; i < strLength; i++) {
			// Get random character from the possibleCharacters string
			const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
			// Append this character to the final string
			str += randomCharacter;
		}

		//Return the final string

		return str;
	} else {
		return false;
	}
};

// Export the modules
module.exports = helpers;

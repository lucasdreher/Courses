/**
 * Create and export configuration variables
 * 
 */

// Container for all the environments
const environments = {};

// Staging (default) environment
environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'staging',
	hashingSecret: 'thisIsASecret',
	maxChecks: 5,
	twilio: {
		accountSid: 'AC58542d49d3d09d9313363b7e53163711',
		authToken: 'ab8defde023d26db56da17cfae1793a6',
		fromPhone: '+15005550006',
		countryCode: '+1'
	}
};

// Production environment
environments.production = {
	httpPort: 5000,
	httpsPort: 5001,
	envName: 'production',
	hashingSecret: 'thisIsAlsoASecret',
	maxChecks: 5,
	twilio: {
		accountSid: 'AC3c50aec1b58c69ea9cdf53404a7a3dc9',
		authToken: 'a95fe094eac90cce8cb43b897145b568',
		fromPhone: '+18482666610',
		countryCode: '+1'
	}
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
const environmentToExport =
	typeof environments[currentEnvironment] == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;

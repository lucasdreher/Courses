const { toInteger } = require('lodash');

require('@google/cloud-debug');

exports.numsquare = (req, res) => {
	let square,
		number = req.query.number || '1';
	newNumber = parseInt(number);
	square = (newNumber * newNumber).toString();
	res.status(200).send(square);
};

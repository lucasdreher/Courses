const { toInteger } = require('lodash');

require('@google/cloud-debug');

exports.numsquare = (req, res) => {
	let num = req.query.num || '2';
	num = parseInt(num);
	let square = (num * num).toString();
	res.status(200).send(square);
};

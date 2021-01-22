// Homework Assignment #5: Switch Statements

console.clear();

function timeAdder(value1, label1, value2, label2) {
	let validInput = timeAdderInputChecker(value1, label1, value2, label2);
	if (validInput) {
		switch (label1) {
			case 'minute':
			case 'minutes':
				value1 *= 60;
				break;
			case 'hour':
			case 'hours':
				value1 *= 3600;
				break;
			case 'day':
			case 'days':
				value1 *= 86400;
				break;
			default:
				break;
		}
		switch (label2) {
			case 'minute':
			case 'minutes':
				value2 *= 60;
				break;
			case 'hour':
			case 'hours':
				value2 *= 3600;
				break;
			case 'day':
			case 'days':
				value2 *= 86400;
				break;
			default:
				break;
		}
		const value3 = value1 + value2;
		if (value3 >= 1 && value3 < 2) {
			return [ value3, 'second' ];
		} else {
			return [ value3, 'seconds' ];
		}
	} else {
		console.log("Wrong input! You should do as the example (1,'minute',2,'hours')");
	}
	console.log(validInput);
}

function timeAdderInputChecker(value1, label1, value2, label2) {
	if (
		typeof value1 === 'number' &&
		typeof value2 === 'number' &&
		typeof label1 === 'string' &&
		typeof label2 === 'string'
	) {
		return timeAdderSpellChecker(value1, label1, value2, label2);
	} else {
		return false;
	}
}

function timeAdderSpellChecker(value1, label1, value2, label2) {
	if (value1 >= 1 && value1 < 2 && value2 >= 1 && value2 < 2) {
		switch (label1) {
			case 'second':
			case 'minute':
			case 'hour':
			case 'day':
				break;
			default:
				return false;
		}
		switch (label2) {
			case 'second':
			case 'minute':
			case 'hour':
			case 'day':
				break;
			default:
				return false;
		}
		return true;
	} else if (value1 >= 1 && value1 < 2) {
		switch (label1) {
			case 'second':
			case 'minute':
			case 'hour':
			case 'day':
				break;
			default:
				return false;
		}
		switch (label2) {
			case 'seconds':
			case 'minutes':
			case 'hours':
			case 'days':
				break;
			default:
				return false;
		}
		return true;
	} else if (value2 >= 1 && value2 < 2) {
		switch (label1) {
			case 'seconds':
			case 'minutes':
			case 'hours':
			case 'days':
				break;
			default:
				return false;
		}
		switch (label2) {
			case 'second':
			case 'minute':
			case 'hour':
			case 'day':
				break;
			default:
				return false;
		}
		return true;
	} else {
		switch (label1) {
			case 'seconds':
			case 'minutes':
			case 'hours':
			case 'days':
				break;
			default:
				return false;
		}
		switch (label2) {
			case 'seconds':
			case 'minutes':
			case 'hours':
			case 'days':
				break;
			default:
				return false;
		}
		return true;
	}
}

console.log(timeAdder(2, 'minutes', 1.5, 'second'));

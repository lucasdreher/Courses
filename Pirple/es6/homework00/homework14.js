// Homework Assignment #14: Callbacks and Promises

// Script Using Callback

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const myNumber = getRndInteger(1, 1000);

console.log(`The number is ${myNumber}`);

function calculateNum(num, cb1, cb2, cb3, cb4) {
	if (num >= 1 || num <= 1000) {
		const start = window.performance.now();
		cb1(
			num,
			setTimeout(() => {
				// cb2(num, cb3(num, cb4(start)));
				cb4(start, cb3(num, cb2(num)));
			}, num)
		);
	} else {
		console.log('Error: Number should be an integer between 1 and 1000');
	}
}

function calculateSquare(num) {
	console.log(`The square of ${num} is ${num * num}`);
}

function calculateSquareRoot(num) {
	console.log(`The rounded square-root of ${num} is ${Math.round(Math.sqrt(num))}`);
}
function closePrimeNumber(num) {
	for (let i = num - 1; i > 0; i--) {
		if (testPrime(i)) {
			console.log(`${i} is a prime-number that is closest to ${num} without being greater than or equal to it.`);
			return;
		}
	}
	console.log(`There is NO prime-number that is closest to ${num} without being greater than or equal to it.`);
}
function testPrime(n) {
	if (n === 1) {
		return false;
	} else if (n === 2) {
		return true;
	} else {
		for (let x = 2; x < n; x++) {
			if (n % x === 0) {
				return false;
			}
		}
		return true;
	}
}

function elapsedTime(start) {
	const end = window.performance.now();
	const elapsedTime = end - start;
	console.log(`Total elapsedTime is ${Math.floor(elapsedTime)}ms`);
}
// calculateSquare(myNumber);
// calculateSquareRoot(myNumber);
// closePrimeNumber(myNumber);
calculateNum(myNumber, calculateSquare, calculateSquareRoot, closePrimeNumber, elapsedTime);

// Script Using Promises
let startPro;

function calculateNumPro(num) {
	return new Promise((resolve, reject) => {
		if (num >= 1 || num <= 1000) {
			startPro = window.performance.now();
			resolve();
		} else {
			reject();
		}
	});
}

function calculateSquarePro(num) {
	return new Promise((resolve, reject) => {
		resolve(console.log(`The square of ${num} is ${num * num}`));
	});
}

function calculateSquareRootPro(num) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(console.log(`The rounded square-root of ${num} is ${Math.round(Math.sqrt(num))}`));
		}, num);
	});
}
function closePrimeNumberPro(num) {
	return new Promise((resolve, reject) => {
		for (let i = num - 1; i > 0; i--) {
			if (testPrime(i)) {
				resolve(
					console.log(`${i} is a prime-number that is closest to ${num} without being greater than or equal to it.`)
				);
				return;
			}
		}
		console.log(`There is NO prime-number that is closest to ${num} without being greater than or equal to it.`);
	});
}

function elapsedTimePro(start) {
	return new Promise((resolve, reject) => {
		const end = window.performance.now();
		const elapsedTime = end - start;
		resolve(console.log(`Total elapsedTime is ${Math.floor(elapsedTime)}ms`));
	});
}

calculateNumPro(myNumber)
	.then(() => calculateSquare(myNumber))
	.then(() => calculateSquareRootPro(myNumber))
	.then(() => closePrimeNumberPro(myNumber))
	.then(() => elapsedTimePro(startPro))
	.catch((err) => console.log('Error: Number should be an integer between 1 and 1000'));

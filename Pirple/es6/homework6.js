console.clear();

for (let i = 1; i <= 100; i++) {
	let prime = testPrime(i);
	if (prime) {
		console.log('Prime');
	} else if (i % 15 === 0) {
		console.log('FizzBuzz');
	} else if (i % 3 === 0) {
		console.log('Fizz');
	} else if (i % 5 === 0) {
		console.log('Buzz');
	} else {
		console.log(i);
	}
}

function testPrime(num) {
	if (num === 1) {
		return false;
	} else if (num === 2) {
		return true;
	} else {
		for (let testEven = 2; testEven < num; testEven++) {
			if (num % testEven === 0) {
				return false;
			}
		}
		return true;
	}
}

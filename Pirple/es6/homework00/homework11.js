/*
Homework Assignment #11: Exceptions

Details:
For this assignment you're going to build a simple function and then reinforce it 
with some defensive code (to bullet-proof it against throwing exceptions).

The function should be called "reverseJsonArray" and it should accept one string, 
and return either a string or false.

When called successfully, the function:
1. Accepts one parameter: a string. A JSON-stringified version of a Javascript Array
2. Parses the JSON to obtain the Array
3. Reverses the order of the the items in the Array
4. JSON-stringifies the result, and returns it.
*/

function reverseJsonArray(array) {
	try {
		array = JSON.parse(array);
		array.reverse();
	} catch (e) {
		if (typeof array == 'undefined') {
			console.log('SyntaxError: Your Argument is Undefined, please insert a Array');
		} else if (typeof array == 'boolean') {
			console.log('TypeError: Your Argument is a Boolean and must be a Array');
		} else {
			console.log(e);
		}
		return false;
	}

	return JSON.stringify(array);
}

//Try something

console.log(reverseJsonArray('["a","b","c"]'));
console.log(reverseJsonArray());
console.log(reverseJsonArray(true));
console.log(reverseJsonArray('abc'));

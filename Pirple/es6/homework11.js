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
	array = JSON.parse(array);
	console.log(array);
	array.reverse();
	console.log(array);
	return JSON.stringify(array);
}
temp = '["a","b","c"]';

console.log(typeof temp);

console.log(reverseJsonArray('["a","b","c"]'));
// console.log(reverseJsonArray(true));

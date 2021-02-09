// Homework Assignment #16: Rest and Spread

/*
Spread syntax (...) allows an iterable such as an array expression
or string to be expanded in places where zero or more arguments 
(for function calls) or elements (for array literals) are expected, 
or an object expression to be expanded in places where zero or more 
key-value pairs (for object literals) are expected.

== For function calls:

myFunction(...iterableObj);
// pass all elements of iterableObj as arguments to function myFunction

== For array literals or strings:

[ ...iterableObj, '4', 'five', 6 ];
// combine two arrays by inserting all elements from iterableObj

== For object literals (new in ECMAScript 2018):

let objClone = { ...obj };
// pass all key:value pairs from an object
*/

function spreadFunction(...multipleArgs) {
	console.log(multipleArgs);
}

spreadFunction('first arg', 'second arg', 'third arg', 'etc');

/*
Rest syntax (...) looks exactly like spread syntax.
In a way, rest syntax is the opposite of spread syntax.
Spread syntax "expands" an array into its elements,
while rest syntax collects multiple elements
and "condenses" them into a single element. 
*/

function hasManyArgs(x, y, ...restOfArgs) {
	console.log(x, y);
	for (const prop of restOfArgs) {
		console.log(prop + 10);
	}
}

hasManyArgs('hi', 'hello', 10, 20, 68, 100);

/*
Just as object and array literal expressions provide an easy way to create packages of data.
Destructuring it can be done using square brackets and binding the array values to variables in the same index position.
 */
const myArray = [ 'value 1', 'value 2', 'value 3', 'value 4', 'value 5' ];
const [ variable1, , variable2, variable3, , , variableX = 'default value' ] = myArray;
console.log(variable1, variable2, variable3, variableX);

/* 
While on Objects, positions is irrelevant. To destructure an object you can bind the variables to the object's keys.
The variables and the keys needs to match and further renamed if needed.
*/

const myObj = {
	a: 'value 1',
	b: 'value 2',
	c: 'value 3',
	d: 'value 4',
	e: new Date()
};
const {
	a: objVariable1,
	b: objVariable2,
	c: objVariable3,
	d: objVariable4,
	e: objVariableDate,
	f: objVariableDefault = 'default value'
} = myObj;
console.log(objVariable1, objVariable2, objVariable3, objVariable4, objVariableDate, objVariableDefault);

// console.log('hello');
// console.log('hello');
// console.log('hello');
// console.log('hello');
// document.body.innerHTML = '<h1>Hello world!</h1>';

// const myTag = document.getElementsByTagName('p');

// console.log(myTag[1].innerHTML);
// myTag[1].innerHTML = 'New stuff from Javascript!';

// for (let i = 0; i < myTag.length; i++) {
// 	myTag[i].innerHTML = 'Renamed!!! ' + i;
// }

// for (const p of myTag) {
// 	p.innerHTML = 'New Text';
// }

// const identifier = document.getElementById('second');
// console.log(identifier.innerHTML);
// console.log(identifier.innerText);
// console.log(identifier);
// identifier.innerText = 'Hello!';

// const element = document.getElementById('second');
// const elID = element.id;
// const replacementID = 'the-second';
// element.id = replacementID;

// const el = document.getElementsByTagName('p');
// const footerDiv = el[el.length - 1];
// footerDiv.id = 'test-last-div';
// footerDiv.classList.add('foo');
// footerDiv.classList.remove('blink');

// const classSecond = document.getElementsByClassName('blink');
// setInterval(() => {
// 	for (const i of classSecond) {
// 		i.classList.toggle('on');
// 	}
// }, 5000);

// const creationDiv = document.getElementById('created');

// const newElement = document.createElement('p');
// newElement.innerText = 'Text content by JS!';
// newElement.classList.add('blink', 'on');

// creationDiv.appendChild(newElement);

// const newLI = document.createElement('li');
// newLI.innerText = myFaveIceCreams[0];
// newUL.appendChild(newLI);
// newElement.appendChild(newUL);
// creationDiv.appendChild(newElement);

// const myFaveIceCreams = [ 'vanilla', 'rocky road', 'strawberry', 'chocolate', 'lemon', 'dark forest' ];

// const creationDiv = document.getElementById('created');

// const newElement = document.createElement('div');

// const newUL = document.createElement('ul');

// myFaveIceCreams.forEach((i) => {
// 	const newLI = document.createElement('li');
// 	newLI.innerText = i;
// 	newUL.appendChild(newLI);
// });
// newElement.appendChild(newUL);
// creationDiv.appendChild(newElement);
// console.log(newElement);

// function removeIceCream(type) {
// 	for (const i of newUL.childNodes) {
// 		if (i.innerText === type) {
// 			newUL.removeChild(i);
// 		}
// 	}
// }

// removeIceCream('chocolate');
// const clickH1 = document.getElementById('clicky');
// const clickableButton = document.querySelector('button');
// clickableButton.addEventListener('click', function() {
// 	alert('clicked!');
// });
// console.log(clickableButton);

// clickableButton.addEventListener('click', logEvent);
// // clickableButton.addEventListener('focus', logEvent);
// // clickableButton.addEventListener('focusout', logEvent);

// function logEvent(e) {
// 	clickableButton.innerText = "Please don't click :(";
// 	clickableButton.removeEventListener('click', logEvent);
// 	console.log(e.type);
// }

//=== Array Destructuring
// const myArray = [ 1, 2, 3, 4, 5 ];
// const [ x, y, z ] = myArray;
// console.log(x, y, z);

//=== Array Destructuring === Swap two variables
// let //Variables
// 	a = 100,
// 	b = 250,
// 	c = 500;
// console.log(a, b, c);
// //swap
// [ b, c ] = [ c, b ];
// console.log(a, b, c);

//=== Use with functions
// function returnArray() {
// 	return [ 'item 1', 'item 2', 'item 3', 'item 4', 'item 5' ];
// }
// console.log(returnArray());
// const [ a, b, c, d, e ] = returnArray();
// console.log(a);
// console.log(c);
// console.log(e);

//=== Array Destructuring === Use with functions 2
// function foodFilter(arr, term) {
// 	return arr.filter((t) => t === term);
// }
// const [ result ] = foodFilter([ 'chicken', 'fish', 'tofu' ], 'chicken');
// const [ result2 ] = foodFilter([ 'pizza', 'donut', 'ice cream' ], 'ice cream');
// console.log(result);
// console.log(result2);

//=== Array Destructuring === Can ignore some values
// const anotherArr = [ 10, 20, 30, 100, 1000, 30 ];
// const [ numA, numB, , numC, , NumD ] = anotherArr;
// console.log(numA, numB, numC, NumD);

//=== Array Destructuring === Can use rest pattern
// function sayHi(firstArg, ...restOfArgs) {
// 	console.log(`Hi, ${firstArg}`);
// 	console.log(restOfArgs);
// }

// const yetAnotherArr = [ 'dogs', 'cats', 'birds', 'snakes', 'hedgehogs' ];
// const [ dogString, catString, ...otherAnimals ] = yetAnotherArr;
// console.log(dogString);
// console.log(catString);
// // console.log(otherAnimals);
// console.log(...otherAnimals);

// // === Object Destructuring ===
// const myObj = {
// 	firstName: 'Lucas',
// 	lastName: 'Dreher',
// 	age: 39,
// 	height: 1.75
// };
// const { firstName, lastName, age, height } = myObj;
// console.log(firstName, lastName, age, height);

// // === Object Destructuring === undefined variables
// let myVar1, myVar2;
// const myObj2 = { myVar1: 1, myVar2: 2 };
// ({ myVar1, myVar2 } = myObj2);
// console.log(myVar1);
// console.log(myVar2);

// // === Object Destructuring === Assigning new variable names
// const myObj3 = {
// 	a: 'Cool! ',
// 	b: 'Oh yeah!',
// 	c: 'Nice :D',
// 	d: 'Awesome!!!',
// 	e: new Date()
// };
// const { a: cool, b: yeah, c: nice, d: awesome, e: date } = myObj3;
// console.log(cool);
// console.log(yeah);
// console.log(nice);
// console.log(awesome);
// console.log(date);

// // === Object Destructuring === Defaults
// const myObj4 = { a1: 10, b1: 20, c1: 30, d1: 40, e1: 100 };
// const { a1, b1, c1, d1, e1 = 50, f1 = 60 } = myObj4;
// console.log(a1, b1, c1, d1, e1, f1);

// function sayHiHi({ say: s }) {
// 	console.log(s);
// }
// sayHiHi({ say: 'Hi, hi!' });
// //or
// function sayHiHiHi({ say }) {
// 	console.log(say);
// }
// sayHiHiHi({ say: 'Hi, hi, hi!' });

// // === Object Destructuring === Nested Objects

// const myObj5 = {
// 	myProp1: 'Ahhh',
// 	myProp2: [ 20, 30 ]
// };
// const { myProp1, myProp2: [ x, y ] } = myObj5;
// console.log(myProp1, x, y);

// const myObj6 = {
// 	title: 'My address book',
// 	entries: [
// 		{
// 			name: 'Blob',
// 			number: 5555555,
// 			address: '123 Fake St',
// 			other: {
// 				cell: 0678888,
// 				email: 'blog@gmail.com'
// 			}
// 		},
// 		{
// 			name: 'Jill',
// 			number: 5551234,
// 			address: '256 Fake St',
// 			other: {
// 				cell: 0670000,
// 				email: 'blog@gmail.com'
// 			}
// 		},
// 		{
// 			name: 'Billy',
// 			number: 5558888,
// 			address: '514 Fake St',
// 			other: {
// 				cell: 0675555,
// 				email: 'blog@gmail.com'
// 			}
// 		}
// 	],
// 	myPhone: 5551111
// };
// const { title, entries, myPhone } = myObj6;

// for (const { name: n, address: a, other: { cell: c, email: e } } of entries) {
// 	console.log(`Name: ${n}\nAddress: ${a}\nCellphone: ${c}\nEmail: ${e}`);
// }

// export function find_total(my_numbers) {
// 	let total = 0;
// 	my_numbers.forEach((e) => {
// 		if (e === 5) {
// 			total += 5;
// 		} else if (e % 2 === 0) {
// 			total++;
// 		} else {
// 			total += 3;
// 		}
// 	});
// 	return total;
// }

// let total = 0;
// my_numbers.forEach((e) => {
//   if (e >= 111) {
//     return 0;
//   } else if (e % 11 === 0) {
//     total++;
//   }
// });
// return total;

// <?php function find_total( $my_numbers ) {
//   $total = 0;
//   for ($key = 0; $key < count($my_numbers); $key++) {
//     if ($my_numbers[$key] % 2 == 0) {
//       $total += $my_numbers[$key];
//     } else {
//       $total -= $my_numbers[$key];
//     }
//   }
//   return $total;
// }
//  ?>

// // Object-oriented Javascript Part 1
// const myString = 'hello';
// // console.log(myString);

// const myObj = {
// 	a: 1,
// 	b: 2
// };
// console.log(myObj.hasOwnProperty('valueOf'));

// console.log(Array.prototype);

// Object-oriented Javascript Part 2: Classes

/*
Classes in ES6 are just syntatical sugar over JavaScript's
existing prototype-based inheritance
Simple, clean syntax to create objects and take care of inheritance
*/

// Pre_ES6 way:

/*
function Person (name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greetings = function() {
  console.log('Greetengs :D')
}

function Employee(name, age, role) {
  Person.call(this, name, age);
  this.role = role;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

const bill = new Employee('Bill', 40, 'janitor');
bill.greetings();
*/

// =======================================================================
// //Classes
// //Classes are NOT hoisted
// //Class method:

// class Person {
//   constructor(name,age) {
//     this.name = name;
//     this.age = age;
//   }
//   greetings() {
//     return 'Classes R kewl!';
//   }
// }

// // const bob = new Person('Bob', 30);

// // bob.greetings();

// // Person.prototype.greetings = function() {
// //   return 'Now I say something else.';
// // }

// class Employee extends Person {
//   constructor(name, age, position) {
//     super(name, age); //Super: use it before "this"
//     this.position = position;
//   }
//   sayGreetings() {
//     const parentString = super.greetings();
//     console.log(`${this.name} thinks ${parentString}`);
//     console.log('works');
//   }
// }

// // const barb = new Employee('Barb', 27, 'developer');

// // console.log(barb);
// // barb.sayGreetings();

// class Customer extends Person {
//   constructor({name='customer', age='n/a', contactMethod}){
//     super(name,age);
//     this.contactMethod = contactMethod;
//     this.accountCredit = null;
//   }
//   addCredit(amount) {
//     this.accountCredit += amount;
//   }
//   reduceCredit(amount) {
//     this.accountCredit -= amount;
//   }
//   static sayCustomerNames (...customers) {
//     for (const c of customers) {
//       console.log(c.name);
//     }
//   }
// }

// const customer1 = new Customer({name:'Lucas D.', contactMethod: 'email'});
// const customer2 = new Customer({name:'Faby G.', contactMethod: 'email'});
// const customer3 = new Customer({name:'Val L.', contactMethod: 'email'});

// console.log(customer1);
// customer1.addCredit(100);
// console.log(customer1.accountCredit);
// customer1.reduceCredit(50);
// console.log(customer1.accountCredit);

// Customer.sayCustomerNames(customer1, customer2, customer3);

// // =======================================================================
// // Callbacks and Promises
// // A way to write asynchronous Javascript

// // Callback
// //Parent function
// function sumUpNumbers(num1, num2, cb) {
// 	let summedValue;
// 	setTimeout(() => {
// 		summedValue = num1 + num2;
// 		if (cb) {
// 			cb(summedValue);
// 		}
// 	}, 1000);
// }

// //Callback function
// function logSummedValue(val) {
// 	console.log(`The summed total is: ${val}`);
// }

// // sumUpNumbers(100, 150, logSummedValue);

// // Promises

// function numAdder(n1, n2) {
// 	return new Promise((resolve, reject) => {
// 		const addedNums = n1 + n2;
// 		setTimeout(() => {
// 			resolve(addedNums);
// 		}, 500);
// 	});
// }

// function numSquarer(num) {
// 	return new Promise((resolve, reject) => {
// 		if (Math.random() > 0.5) {
// 			reject('reject 50% of the time');
// 		}
// 		setTimeout(() => {
// 			resolve(num * num);
// 		}, 800);
// 	});
// }

// // //less clear
// // numAdder(10, 10)
// // 	.then((data) => {
// // 		return numSquarer(data); //'return' pass the data forward because os the {}
// // 	})
// // 	.then((moreData) => {
// // 		console.log(moreData);
// // 	});

// //more clear without {}
// numAdder(10, 10)
// 	.then((data) => numSquarer(data))
// 	.then((moreData) => console.log(moreData))
// 	.catch((err) => console.log(err));

// Promise.reject()
// 	.then(
// 		(res) => {
// 			console.log('success msg'); //first always resolve
// 		},
// 		(err) => {
// 			console.log('error msg'); // second always reject
// 		}
// 	)
// 	.catch((data) => console.log(`catch error msg ${data}`));

// function timeLogger(message, time) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(message);
// 		}, time);
// 		if (typeof message !== 'string' || typeof time !== 'number') {
// 			reject();
// 		}
// 	});
// }

// timeLogger('first', 1000)
// 	.then((message) => {
// 		console.log(message);
// 		return timeLogger('second', 800);
// 	})
// 	.then((message) => {
// 		console.log(message);
// 		return timeLogger('third', 100);
// 	})
// 	.then((message) => {
// 		console.log(message);
// 		return timeLogger('fourth', 300);
// 	})
// 	.then((message) => {
// 		console.log(message);
// 	})
// 	.catch((err) => console.log('incorrect input'));

// More cool things ES6 features

// Spread Syntax
/*
- Can be used in places where (e.g.) functions
expect multiple arguments, multiple elements,
or multiple variables
*/

// function spreadFunction(...multipleArgs) {
// 	console.log(multipleArgs);
// }

// // spreadFunction(1, 20, false, 'hi', 'hey');
// const myArray = [ 1, 2, 3, 4 ];
// const mySecondArray = [ 5, 6, 7, 8, 9 ];
// const myThirdArray = [ ...myArray, ...mySecondArray ];
// // console.log(...myArray);
// // console.log(myThirdArray);

// function sayHello(x, y, z) {
// 	console.log(`Hello, ${x}, ${y}, ${z}`);
// }
// const helloArray = [ 'Bob', 'Jane', 'Peter' ];

// //Alternative to Function.prototype.apply
// // sayHello.apply(null, helloArray);

// // Spread syntax way:

// // sayHello(...helloArray);

// const arr1 = [ 10, 20, 30 ];
// const arr2 = [ 40, 50, 60 ];
// arr1.push.apply(arr1, arr2);
// // console.log(arr1);

// const arr3 = [ 100, 200, 300 ];
// const arr4 = [ 400, 500, 600 ];
// arr3.push(...arr4);
// // console.log(arr3);

// // ==========  concat()

// const myArr = [ 'jelly beans', 'cake' ];
// const myArr2 = [ 'donuts', 'chocolate' ];
// const myArr3 = [ 'pie', 'lemonade' ];
// // const myNewArr = myArr.concat(myArr2, myArr3);
// const myNewArr = [ ...myArr, ...myArr2, ...myArr3 ];
// // console.log(myNewArr);

// const listOfCarParts = [ 'gasket', 'tires', 'radiator', 'muffler' ];
// const listOfPartsToInsert = [ 'wipers', 'headlights' ];
// // const manualAssembledArray = [ 'gasket', ...listOfPartsToInsert, 'tires', 'radiator', 'muffler' ];

// // console.log(manualAssembledArray);

// function listInserter(arr1, arr2, index) {
// 	const firstPartOfArray = arr1.slice(0, index);
// 	const secondPartOfArray = arr1.slice(index);
// 	// const assembledArray = firstPartOfArray.concat(arr2, secondPartOfArray);
// 	const assembledArray = [ ...firstPartOfArray, ...arr2, ...secondPartOfArray ];
// 	console.log(assembledArray);
// }

// // listInserter(listOfCarParts, listOfPartsToInsert, 1);

// const anotherArr = [ 10, 12, 12009, 12223 ];
// const yetAnotherArr = [ ...anotherArr ];
// const andYetAnotherArr = yetAnotherArr.slice();
// yetAnotherArr.push(2123141);
// // console.log(yetAnotherArr);
// // console.log(andYetAnotherArr);

// // ========== vs rest operator
// function hasManyArgs(x, y, ...restOfArgs) {
// 	console.log(x, y);
// 	for (const prop of restOfArgs) {
// 		console.log(prop + 10);
// 	}
// }

// // hasManyArgs('hi', 'hello', 10, 20, 68, 100);

// // =======Method definitions
// // Pre-ES6, in object literals, methods are defined as function expressions
// // Eg.
// const myObj = {
// 	id: 10,
// 	sayHi: function() {
// 		console.log('hi');
// 	}
// };

// // myObj.sayHi();

// // ES6 has method definitions for creating methods

// const myES6Obj = {
// 	id: 11,
// 	sayHi() {
// 		console.log('ES6 is cool');
// 	},
// 	sayBye() {
// 		console.log('Bye now!');
// 	}
// };

// // myES6Obj.sayHi();
// // myES6Obj.sayBye();

// const anotherObj = {
// 	greet(arg1) {
// 		console.log(`Hey! ${arg1}`);
// 	},
// 	anotherMethod(...args) {
// 		this.greet(args[0]);
// 		console.log(`I have ${args.length} arguments!`);
// 	}
// };

// anotherObj.greet('Jim');
// anotherObj.anotherMethod('Tim', 1, false, true, [ 123 ], 6);

// =============== Map Object
/*
  - Used for key/value pairs
  - Any value can be used for either a key or value (i.e. objects, string, function)
  - Reasons for using map Over Object:
    - Object prototype has default keys that might conflict with own keys
    - Keys of map can be anything, whereas with objects, have to be string or symbol
    - Can easily get the size of Map
*/

// const myMap = new Map();
// const firstKey = 'key1',
// 	firstVal = 'value1',
// 	secondKey = {},
// 	thirdKey = function() {};

// myMap.set(firstKey, firstVal);
// // console.log(myMap.get(firstKey));
// myMap.set(secondKey, 'value2');
// // console.log(myMap.get(secondKey));
// // console.log(myMap.has(secondKey));
// myMap.set(thirdKey, 'value3');
// // console.log(myMap.get('key33'));
// // console.log(myMap.has('key33'));
// // console.log(myMap);
// // console.log(myMap.size);
// // myMap.clear();
// // console.log(myMap);
// // console.log(myMap.size);

// /* Iterating
//    keys(), values(), entries() */

// // myMap.forEach((val) => console.log(val));
// // console.log(myMap.keys());

// // myMap.delete(thirdKey);

// // for (const [ key, value ] of myMap.entries()) {
// // 	console.log(`${key} => ${value}`);
// // }

// // for (const key of myMap.keys()) {
// // 	console.log(key);
// // }

// // for (const val of myMap.values()) {
// // 	console.log(val);
// // }

// const myMapData = [ [ 'keyA', 'value 1' ], [ 'keyB', 'value 2' ] ];
// const anotherMap = new Map(myMapData);
// const yetAnotherMap = new Map([
// 	[ 'keyA', 'value 1' ],
// 	[ 'keyB', 'value 2' ],
// 	[ 'keyC', 'value 3' ],
// 	[ 'keyD', 'value 4' ],
// 	[ 'keyE', 'value 5' ]
// ]);

// // console.log(anotherMap);

// const arrFromMap = Array.from(yetAnotherMap);
// // console.log(arrFromMap);

// // =============== Set object
// /*
//   -Lets you store unique values of any type
//   - Each element is unique
// */

// const mySet = new Set();
// const obj123 = { a: 1, b: 2, c: 3 };

// mySet.add('Bob');
// mySet.add(true);
// mySet.add('Bob');
// mySet.add(obj123);

// // console.log(mySet);
// // console.log(mySet.size);
// // mySet.delete(obj123);
// // console.log(mySet.size);
// // console.log(mySet.has('Bob'));

// // mySet.forEach((s) => {
// // 	if (typeof s === 'object') {
// // 		console.log('we got an object');
// // 	} else {
// // 		console.log(`Set item: ${s}`);
// // 	}
// // });

// /* Iterating
//    keys(), values(), entries() */

// // for (const [ key, value ] of mySet.entries()) {
// // 	console.log(`${key} => ${value}`);
// // }

// // for (const key of mySet.keys()) {
// // 	console.log(key);
// // }

// // for (const val of mySet.values()) {
// // 	console.log(val);
// // }

// // Convert set to array !!!

// const arrFromSet = Array.from(mySet);
// // console.log(arrFromSet);

// const setFromArr = new Set(arrFromSet);
// // console.log(setFromArr);

// const yetAnotherSet = new Set([ 'a', 'd', 'h', 1, [ 1, 2 ], { tom: 'soy' } ]);
// const yetAnotherArrFromSet = [ ...yetAnotherSet ];

// console.log(yetAnotherArrFromSet);

// // Out of topic for fun
// const arrFromString = Array.from('Hello there!');
// // console.log(arrFromString);

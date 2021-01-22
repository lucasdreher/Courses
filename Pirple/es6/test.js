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

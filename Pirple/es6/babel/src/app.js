const myDid = document.getElementById('main');
const myArr = [ 1, 2, 3, 4, 5 ];
for (const prop of myArr) {
	myDid.innerHTML += `<p>${prop}</p>`;
}

class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	sayHi() {
		console.log(`Hi, ${this.name}. You have ${this.age} years of age.`);
	}
}

const billy = new Person('Billy', 21);
billy.sayHi();
const sally = new Person('Sally', 16);
sally.sayHi();

console.log('Watched!');
console.log('Watched!');

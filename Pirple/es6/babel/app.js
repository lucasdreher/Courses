const myDid = document.getElementById('main');
const myArr = [ 1, 2, 3, 4, 5 ];
for (const prop of myArr) {
	console.log(prop);
	myDid.innerHTML += `<p>${prop}</p>`;
}

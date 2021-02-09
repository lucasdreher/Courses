const //set constants
	inputSquare = document.getElementById('inputSquare'),
	btnSquare = document.getElementById('btnSquare'),
	htmlText = document.getElementById('htmlText'),
	iframe = document.getElementById('iframe'),
	url = 'https://europe-west1-unique-voice-283902.cloudfunctions.net/num';

let //set variables
num;

btnSquare.addEventListener('click', getSquared);

function getSquared() {
	let inputVal = parseInt(inputSquare.value);
	if (inputVal) {
		newUrl = `${url}?number=${inputVal}`;
		populateIframe(newUrl);
	} else {
		failState();
	}
	inputSquare.value = '';
}

function failState() {
	htmlText.innerText = 'FAIL';
	iframe.innerHTML = 'Please insert a valid number.';
}

function populateIframe(u) {
	const content = `<iframe src="${u}" title="G Cloud"></iframe>`;
	htmlText.innerText = u;
	iframe.innerHTML = content;
}

console.log('live');

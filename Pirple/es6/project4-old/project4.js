const //set constants
	url = 'https://europe-west1-unique-voice-283902.cloudfunctions.net/num',
	req = new Request(url);

function getSquared() {
	fetch(req)
		.then(function(response) {
			console.log(response);
			return response.json();
		})
		.then((c) => console.log(c))
		.catch((err) => alert("Sorry, we couldn't access the API"));
}

console.log('live');
getSquared();

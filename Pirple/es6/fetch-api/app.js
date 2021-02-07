// fetch API
// returns a promise

const myDiv = document.getElementById('planet');
const myButton = document.getElementById('button');
const mySecondButton = document.getElementById('otherButton');

myButton.addEventListener('click', getPlanet);
mySecondButton.addEventListener('click', getPlanets);

function getPlanets() {
	fetch(`https://swapi.dev/api/planets/`)
		.then((data) => data.json())
		.then((planets) => processPlanets(planets.results));
	// .then((planets) => fetch(planets.next))
	// .then((morePlanets) => console.log(morePlanets));
}

function processPlanets(planetsArray) {
	for (const [ index, prop ] of planetsArray.entries()) {
		populatePlanet(prop, index);
	}
}

function getPlanet() {
	const randomNum = Math.floor(Math.random() * 10) + 1;
	fetch(`https://swapi.dev/api/planets/${randomNum}/`)
		.then((data) => data.json())
		.then((d) => populatePlanet(d))
		.catch((err) => console.log(err.message));
}

function populatePlanet(planetObj, index) {
	const { name, climate, terrain, population, orbital_period } = planetObj;
	let pop;
	if (population > 0 && population <= 1000000) {
		pop = 'low';
	} else if (population > 1000000 && population <= 1000000000) {
		pop = 'medium';
	} else if (population > 1000000000) {
		pop = 'high';
	} else {
		pop = 'unknown';
	}

	// let pop;
	// if (population === 'unknown') {
	// 	pop = population;
	// } else {
	// 	pop = parseInt(population).toLocaleString('nl-NL');
	// }
	// population === 'unknown' ? (pop = population) : (pop = parseInt(population).toLocaleString('nl-NL'));

	const planetDiv = `
		<div class='planet' data-planetID=${index} data-population=${pop} >
			<h1>${name}</h1>
			<p>
				${name} has a climate that is ${climate}. The terrain is
				${terrain}, with a pop. of ${population === 'unknown'
		? population
		: parseInt(population).toLocaleString('nl-NL')}. The orbital 
				period is ${orbital_period}.
			</p>
		</div>
	`;
	myDiv.insertAdjacentHTML('beforeend', planetDiv);
}
const highlighter = document.getElementById('highlighter');

highlighter.addEventListener('click', showUnpopulated);
const allPlanetsDivs = document.getElementsByClassName('planet');
function showUnpopulated() {
	for (const prop of allPlanetsDivs) {
		// console.log(prop.dataset.population);
		if (prop.dataset.population === 'unknown') {
			prop.classList.toggle('highlight');
		}
	}
}

const selector = document.getElementById('selector');

selector.addEventListener('change', highlight);

function highlight(e) {
	const { value } = e.target;
	for (const prop of allPlanetsDivs) {
		// prop.style.background = '';
		prop.classList.remove('selected-planet');
		if (prop.dataset.population === value) {
			prop.classList.add('selected-planet');
			// prop.style.background = 'teal';
		}
	}
}

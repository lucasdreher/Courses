console.log('connected');

let lat = 38.6641,
	lng = -27.23;

function geoFindMe() {
	const status = document.querySelector('#status');
	// const mapCo = document.querySelector('#map-container');

	function success(position) {
		const latitude = position.coords.latitude,
			longitude = position.coords.longitude;
		lat = parseFloat(Number.parseFloat(latitude).toFixed(5));
		lng = parseFloat(Number.parseFloat(longitude).toFixed(5));
		status.textContent = `Latitude: ${lat} °, Longitude: ${lng} °`;
		status.classList.remove('error');
		mapPointer();
	}

	function error() {
		status.textContent = 'Unable to retrieve your location';
		status.classList.add('error');
	}

	if (!navigator.geolocation) {
		status.textContent = 'Geolocation is not supported by your browser';
		status.classList.add('error');
	} else {
		status.textContent = 'Locating…';
		status.classList.remove('error');
		navigator.geolocation.getCurrentPosition(success, error);
	}
}
document.querySelector('#find-me').addEventListener('click', geoFindMe);

function initMap() {
	const place = { lat: lat, lng: lng };
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: place
	});
}

function mapPointer() {
	const place = { lat: lat, lng: lng };
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: place
	});
	const marker = new google.maps.Marker({
		position: place,
		map: map
	});
}

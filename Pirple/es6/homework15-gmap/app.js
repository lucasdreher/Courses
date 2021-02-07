// Initialize and add the map
const lat = -29.391 + Math.ceil(Math.random() * 10);
const lng = -50.866 + Math.ceil(Math.random() * -10);
function initMap() {
	const place = { lat: lat, lng: lng };
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: place
	});
	const contentString = `<div id="content">
		<h1 id="firstHeading" class="firstHeading">Place</h1>
		<div id="bodyContent">
		<p>Latitude: ${lat} and Longitude: ${lng}</p>
		</div>
		</div>`;
	const infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	const marker = new google.maps.Marker({
		position: place,
		map: map
	});
	marker.addListener('click', () => {
		infowindow.open(map, marker);
	});
}

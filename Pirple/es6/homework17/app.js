// Check if
function notifyMe() {
	const title = 'NOTIFICATION ALARM CONNECTED',
		msg = 'Hey! Your notification alarm is up and running.';
	if (!('Notification' in window)) {
		alert('This browser does not support system notifications');
	} else if (Notification.permission === 'granted') {
		notify(title, msg);
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function(permission) {
			if (permission === 'granted') {
				notify(title, msg);
			}
		});
	}
}

notifyMe();

function notify(title, msg) {
	let notification = new Notification(title, {
		icon: 'https://img.icons8.com/dusk/64/000000/alarm.png',
		body: msg
	});
	setTimeout(notification.close.bind(notification), 10000);
}

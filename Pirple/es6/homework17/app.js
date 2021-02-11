// ============= Convert to format type="datetime-local"
if (!Date.prototype.toLocalDateFormat) {
	(function() {
		function pad(number) {
			if (number < 10) {
				return '0' + number;
			}
			return number;
		}

		Date.prototype.toLocalDateFormat = function() {
			return (
				this.getUTCFullYear() +
				'-' +
				pad(this.getMonth() + 1) +
				'-' +
				pad(this.getDate()) +
				'T' +
				pad(this.getHours()) +
				':' +
				pad(this.getMinutes())
			);
		};
	})();
}

// ============= Get DOM elements

const //HTML elements
	inputTime = document.getElementById('time'),
	inputNote = document.getElementById('note'),
	btnSetAlarm = document.getElementById('setAlarm'),
	errorMsgDiv = document.getElementById('error'),
	listAlarmDiv = document.getElementById('listAlarmSet');

// ============= Global variables

const onAlarms = { index: [], name: 'onAlarms' },
	offAlarms = { index: [], name: 'offAlarms' };

let currentAlarm, //Alarm to be edited
	testAlarm = {
		alarmTime: 1613033940000,
		note: 'text'
	};
// ============= Event Listeners
btnSetAlarm.addEventListener('click', setAlarm);

// ============= Alarm Logic

// ============= Staaaaaarrrttttt
function startApp() {
	// Bundle of functions to start the app on page refresh
	minInputTime();
	notifyMe();
	pullFromStorage(onAlarms);
	pullFromStorage(offAlarms);
	updateContent(onAlarms);
}

function setAlarm() {
	if (validateForm()) {
		createAlarm();
		pushToStorage(onAlarms);
		resetInput();
		return;
	}
}

function validateForm() {
	if (inputTime.checkValidity()) {
		let t = new Date(inputTime.value);
		if (checkTime(t)) {
			if (inputNote.checkValidity()) {
				return true;
			} else {
				errorMsg('Need to write a note first.');
				inputNote.focus();
			}
		} else {
			errorMsg('Time must be greater then NOW.');
			inputTime.focus();
		}
	} else {
		errorMsg('Time must be set.');
		inputTime.focus();
	}
}

function errorMsg(e) {
	if (e) {
		errorMsgDiv.innerHTML = `<div class="container"><strong>ALERT:</strong> ${e}</div>`;
	} else {
		errorMsgDiv.innerHTML = '';
	}
}

function resetInput() {
	inputTime.value = '';
	inputNote.value = '';
	errorMsg();
}

function createAlarm() {
	const t = new Date(inputTime.value),
		t1 = t.getTime(),
		t2 = timeNowUnique(),
		key = t1 + t2,
		note = inputNote.value;
	onAlarms.index.push(key);
	onAlarms.index.sort();
	onAlarms[key] = {
		alarmTime: t1,
		note: note
	};
}

function pushToStorage(obj) {
	const string = JSON.stringify(obj);
	// console.log(string);
	// console.log(obj.name);
	localStorage.setItem(obj.name, string);
}

function pullFromStorage(obj) {
	if (obj.name === 'onAlarms') {
		const data = localStorage.getItem(obj.name);
		if (data) {
			const newObj = Object.assign(onAlarms, JSON.parse(data));
		}
	} else if (obj.name === 'offAlarms') {
		const data = localStorage.getItem(obj.name);
		if (data) {
			const newObj = Object.assign(offAlarms, JSON.parse(data));
		}
	} else {
		return false;
	}
}

// ============= Notice API System

function notify(title, msg) {
	let notification = new Notification(title, {
		icon: 'https://img.icons8.com/dusk/64/000000/alarm.png',
		body: msg
	});
	setTimeout(notification.close.bind(notification), 10000);
}

// ============= Time Functions

// Set max input to  type="datetime-local"
function minInputTime() {
	inputTime.setAttribute('min', timeNow());
}

// Get time now
function timeNow(t) {
	if (t) {
		const now = new Date(t);
		return now.toLocalDateFormat();
	} else {
		const now = new Date();
		return now.toLocalDateFormat();
	}
}

function timeNowUnique() {
	const now = new Date();
	return now.getTime();
}

function checkTime(t) {
	const t1 = t.getTime(),
		t2 = timeNowUnique();
	if (t1 > t2) {
		// console.log(t1, t2, t1 + t2, `${t1}${t2}`, timeNow(t1));
		// console.log(testAlarm);
		return true;
	}
	return false;
}

// ============= Functions that detects whether localStorage and Notice API is both supported and available

function storageAvailable(type) {
	let storage;
	try {
		storage = window[type];
		let x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length !== 0)
		);
	}
}

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

// ============= Populate Functions

function updateContent(obj, refreshStartIndex = 0) {
	const index = obj.index;
	// console.log(index.splice(2));
	// populateAlarmList(obj);
	populateAlarmList(obj, refreshStartIndex);
	console.log(index);
	if (!listAlarmDiv.innerHTML) {
		console.log('no content');
	} else {
		console.log('has content');
	}
}

function populateAlarmList(obj, refreshStartIndex) {
	const index = obj.index,
		alarmCardSequenceAdjustment = refreshStartIndex + 1;
	index.splice(0, refreshStartIndex);
	for (const prop in index) {
		const id = index[prop],
			alarmTime = new Date(obj[id].alarmTime),
			alarmTimeShort = alarmTime.toString().slice(0, 21),
			note = obj[id].note,
			alarmCardSequence = parseInt(prop) + alarmCardSequenceAdjustment,
			alarmCardControls = `
				<button>Edit</button>
				<button class="btn-red">Delete</button>`,
			alarmCard = `
				<div class="alarm-item">
					<div class="content-top">
						<div class="time-info">
							<div class="placement">
								${alarmCardSequence}
							</div>
							<div class="time-set">
								${alarmTimeShort}
							</div>
						</div>
						<div class="alarm-item-bottom-area">
							${alarmCardControls}
						</div>
					</div>
					<div class="note-text">
						<p>
							${note}
						</p>
					</div>
				</div>`;
		listAlarmDiv.insertAdjacentHTML('beforeend', alarmCard);
	}
}

// ============= Functions for start
startApp();

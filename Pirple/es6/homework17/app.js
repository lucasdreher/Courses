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
	listAlarmDiv = document.getElementById('listAlarmSet'),
	btnAreaDiv = document.getElementById('btnArea'),
	controlPanel = document.getElementById('control');

// ============= Global variables

const onAlarms = { index: [], name: 'onAlarms' },
	offAlarms = { index: [], name: 'offAlarms' },
	offAlarmsContent = { show: false },
	editModeOn = { status: false };

let testAlarm = {
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
	updateContent();
	// setInterval(checkAlarmDeadlines, 1000);
}

function setAlarm() {
	if (validateForm()) {
		createAlarm();
		pushToStorage(onAlarms);
		resetInput();
		updateContent();
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
	// currentAlarm = undefined; // I think I don't need it
	if (editModeOn.status) {
		//configure editModeOn to revert to Default Status
		editModeOn.status = false;
		delete editModeOn.key;
		delete editModeOn.index;
		hasBtnCancel(); //remove cancel btn
		//rename set alarm to update alarm
		btnSetAlarm.innerText = 'Set Alarm';
	}
	errorMsg();
}

function createAlarm() {
	const t = new Date(inputTime.value),
		t1 = t.getTime(),
		t2 = timeNowUnique(),
		key = t1 + t2,
		note = inputNote.value;
	if (editModeOn.status) {
		const index = editModeOn.index,
			key = onAlarms.index[editModeOn.index];
		onAlarms.index.splice(index, 1);
		delete onAlarms[key];
		console.log(index, key, 'updated');
	}
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

function deleteAlarm() {
	const id = this.parentNode.dataset.id;
	let obj;
	if (offAlarmsContent.show) {
		const key = onAlarms.index[id];
		obj = offAlarms;
	} else {
		const key = onAlarms.index[id]; //.toString();
		onAlarms.index.splice(id, 1);
		delete onAlarms[key];
		obj = onAlarms;
	}
	pushToStorage(obj);
	resetInput();
	updateContent();
}

function editAlarm() {
	const id = this.parentNode.dataset.id;
	editMode(id);
}

function editMode(id) {
	//configure editModeOn
	editModeOn.status = true;
	editModeOn.index = parseInt(id);
	editModeOn.key = onAlarms.index[id];
	//get values
	const time = new Date(onAlarms[editModeOn.key].alarmTime),
		note = onAlarms[editModeOn.key].note;
	//update values at inputs
	inputTime.value = timeNow(time);
	inputNote.value = note;
	//rename set alarm to update alarm
	btnSetAlarm.innerText = 'Update Alarm';
	//create cancel btn
	hasBtnCancel();
}

// function create cancel btn logic
function hasBtnCancel() {
	//check for create or deletion
	if (editModeOn.status) {
		//check if button is already created
		if (!editModeOn.btnCancel) {
			//create btn on DOM
			const button = `<button class="btn-red" id="cancelAlarm">Cancel</button>`;
			btnAreaDiv.insertAdjacentHTML('beforeend', button);
			//add event listeners //configure editModeOn
			editModeOn.btnCancel = document.getElementById('cancelAlarm');
			editModeOn.btnCancel.addEventListener('click', cancelEditing);
		}
	} else {
		//remove cancel btn
		editModeOn.btnCancel.remove();
		delete editModeOn.btnCancel;
	}
}

function cancelEditing() {
	resetInput();
}

function checkAlarmDeadlines() {
	const firstAlarmKey = onAlarms.index[0],
		// time = timeNow(),
		time = timeNowUnique(),
		// timeTrigger = new Date(onAlarms[firstAlarmKey].alarmTime).getTime();
		timeTrigger = parseInt(onAlarms[firstAlarmKey].alarmTime);
	// console.log`Alarm checked at time: ${time}(`Alarm checked at time: ${time}, firstAlarmKey: ${firstAlarmKey}, timeTrigger: ${timeTrigger}`);
	console.log('U', time, 'T', timeTrigger, 'K', firstAlarmKey);
	// console.log(time > timeTrigger);
	if (time > timeTrigger) {
		notifyAlarm(firstAlarmKey);
	}
}

function updateAlarms(key, time, note) {
	//create alarm on off alarm
	offAlarms.index.push(key);
	offAlarms.index.sort();
	offAlarms[key] = {
		alarmTime: time,
		note: note
	};
	pushToStorage(offAlarms);
	console.log('updated');
}

// function setAlarm() {
// 	if (validateForm()) {
// 		createAlarm();
// 		pushToStorage(onAlarms);
// 		resetInput();
// 		updateContent();
// 	}
// }

// ============= Notice API System

function notify(title, msg) {
	let notification = new Notification(title, {
		icon: 'https://img.icons8.com/dusk/64/000000/alarm.png',
		body: msg
	});
	setTimeout(notification.close.bind(notification), 10000);
}

function notifyAlarm(firstAlarmKey) {
	console.log('Notified ' + firstAlarmKey);
	const alarmTime = onAlarms[firstAlarmKey].alarmTime,
		date = new Date(alarmTime),
		title = `NOTIFICATION ALARM: ${date.toString().slice(0, 21)}`,
		msg = onAlarms[firstAlarmKey].note;
	// notify(title, msg);
	updateAlarms(firstAlarmKey, alarmTime, msg);
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

function updateContent() {
	const obj = {};
	if (offAlarmsContent.show) {
		Object.assign(obj, offAlarms);
	} else {
		Object.assign(obj, onAlarms);
	}
	console.log(obj);
	const index = obj.index;
	listAlarmDiv.innerHTML = ''; //purge old content
	populateAlarmList(obj);
	if (!listAlarmDiv.innerHTML) {
		console.log('no content');
		const content = `<div class="alarm-item"><div class="content-top">No alarms...</div></div>`;
		listAlarmDiv.insertAdjacentHTML('beforeend', content);
	} else {
		console.log('has content');
	}
	offAlarmsContent.hasContent = offAlarms.index.length; //check if have content
	bindButtons();
	hasBtnOffAlarms();
}

// TODO
function hasBtnOffAlarms() {
	if (offAlarmsContent.hasContent) {
		console.log('offAlarms has content');
		if (!offAlarmsContent.btnOffAlarms) {
			//create btn on DOM
			const button = `<button id="btnOffAlarms">View all-- past alarms</button>`;
			btnAreaDiv.insertAdjacentHTML('afterend', button);
			//add event listeners //configure offAlarmsContent
			offAlarmsContent.btnOffAlarms = document.getElementById('btnOffAlarms');
			offAlarmsContent.btnOffAlarms.addEventListener('click', cancelEditing);
		}
	} else {
		console.log('offAlarms still empty');
		// remove cancel btn
		offAlarmsContent.btnOffAlarms.remove();
		delete offAlarmsContent.btnOffAlarms;
	}
}

// if (editModeOn.btnCancel) {
// 	console.log('btnCancelExists');
// 	return;
// } else {
// 	//create btn on DOM
const button = `<button class="btn-red" id="cancelAlarm">Cancel</button>`;
btnAreaDiv.insertAdjacentHTML('beforeend', button);
// 	//add event listeners //configure editModeOn
editModeOn.btnCancel = document.getElementById('cancelAlarm');
editModeOn.btnCancel.addEventListener('click', cancelEditing);
// }
// } else {
// //remove cancel btn
// editModeOn.btnCancel.remove();
// delete editModeOn.btnCancel;
// }

// Almost a good idea to update to just a part os the content using refreshStartIndex
// const index = obj.index,
// alarmCardSequenceAdjustment = refreshStartIndex + 1;
// index.splice(0, refreshStartIndex);

function populateAlarmList(obj) {
	const index = obj.index;
	for (const prop in index) {
		const id = index[prop],
			alarmTime = new Date(obj[id].alarmTime),
			alarmTimeShort = alarmTime.toString().slice(0, 21),
			note = obj[id].note,
			alarmCardSequence = parseInt(prop) + 1,
			alarmCardControls = `
				<button class="btn-edit">Edit</button>
				<button class="btn-red btn-delete">Delete</button>`,
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
						<div class="alarm-item-control-area"  data-id="${prop}">
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

function bindButtons() {
	const arrBtnEdit = document.getElementsByClassName('btn-edit'),
		arrBtnDelete = document.getElementsByClassName('btn-delete');
	// console.log(arrBtnEdit);
	// console.log(arrBtnDelete);
	Array.from(arrBtnEdit).forEach(function(element) {
		element.addEventListener('click', editAlarm);
	});
	Array.from(arrBtnDelete).forEach(function(element) {
		element.addEventListener('click', deleteAlarm);
	});
}

// ============= Functions for start
startApp();

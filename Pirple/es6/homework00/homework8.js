// Homework Assignment #8: Events
let gameWon = false;
let turn = 1;
let currentPlayer = 'x';
let areaClaimedMap = [ '', '', '', '', '', '', '', '', '' ];
const winningRows = [
	[ 0, 1, 2 ], //horizontal row
	[ 3, 4, 5 ], //horizontal row
	[ 6, 7, 8 ], //horizontal row
	[ 0, 3, 6 ], //vertical row
	[ 1, 4, 7 ], //vertical row
	[ 2, 5, 8 ], //vertical row
	[ 0, 4, 8 ], //diagonal row
	[ 2, 4, 6 ] //diagonal row
];
const board = document.getElementById('board');
const modal = document.getElementById('modal-wrapper');
const resetButtonModal = modal.querySelector('.button-reset');

board.addEventListener('click', claimArea);

function claimArea(e) {
	turn++;
	const target = e.target;
	const areaId = target.id;
	const isArea = target.classList.contains('area');
	const isX = target.classList.contains('x');
	const isO = target.classList.contains('o');
	if (isArea && !isX && !isO && !gameWon) {
		target.classList.add(currentPlayer);
		areaClaimedMap[areaId] = currentPlayer;
		console.log(areaClaimedMap);
		checkResult();
	}
}

function checkResult() {
	gameWon = false;
	// let winningRow;
	for (let i = 0; i <= 7; i++) {
		const rowArea = winningRows[i];
		let a = areaClaimedMap[rowArea[0]];
		let b = areaClaimedMap[rowArea[1]];
		let c = areaClaimedMap[rowArea[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			winningRowAnimation(rowArea);
			gameWon = true;
			break;
		}
	}
	if (gameWon) {
		// board.classList.add('won');
		setTimeout(() => {
			modalMessage(`<span class="${currentPlayer}"></span>is the winner. Congrats!!!`);
		}, 600);
	} else if (turn > 9) {
		modalMessage('Cats game!');
	} else {
		if (currentPlayer === 'x') {
			currentPlayer = 'o';
		} else {
			currentPlayer = 'x';
		}
	}
}

function winningRowAnimation(rowArea) {
	for (let i = 0; i < 3; i++) {
		setTimeout(() => {
			document.getElementById(rowArea[i]).classList.add('won');
		}, 100 * i);
	}
}

function modalMessage(message) {
	modal.querySelector('p').innerHTML = message;
	modal.classList.remove('display-none');
	modal.classList.add('opacity-100');
}

resetButtonModal.addEventListener('click', function() {
	gameWon = false;
	turn = 1;
	currentPlayer = 'x';
	areaClaimedMap = [ '', '', '', '', '', '', '', '', '' ];
	board.querySelectorAll('.area').forEach((area) => (area.classList = 'area'));
	modal.classList.remove('opacity-100');
	setTimeout(() => {
		modal.classList.add('display-none');
	}, 300);
});

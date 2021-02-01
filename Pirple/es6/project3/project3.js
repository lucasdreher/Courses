const elevatorMoveFloor = 1000;
const elevatorOpenDoor = 100;
const elevatorCloseDoor = 100;
const passengerEnterElevator = 500;
const passengerLeaveElevator = 500;

let passengerId = 0;

class Building {
	constructor(minFloor, maxFloor) {
		if (minFloor > maxFloor) {
			throw `minFloor must be greater than maxFloor`;
		}
		this.minFloor = minFloor;
		this.maxFloor = maxFloor;
		this.elevators = [];
		this.floors = [];
		this.passengers = [];
		for (let i = minFloor; i <= maxFloor; i++) {
			const floor = new Floor(i);
			if (i > minFloor) {
				floor.buttons.push(new Button('down'));
			}
			if (i < maxFloor) {
				floor.buttons.push(new Button('up'));
			}
			this.floors.push(floor);
		}
	}

	addElevator(minFloor, maxFloor) {
		const id = this.elevators.length + 1;
		if (minFloor < this.minFloor || maxFloor > this.maxFloor) {
			throw `minFloor must be greater than or equal to ${this
				.minFloor} and maxFloor must be less than or equal to ${this.maxFloor}`;
		}
		if (minFloor > maxFloor) {
			throw `minFloor must be greater than maxFloor`;
		}
		this.elevators.push(new Elevator(id, minFloor, maxFloor));
	}

	addPassenger(from, to) {
		passengerId++;
		const direction = from > to ? 'down' : 'up';
		const passenger = new Passenger(passengerId, from, to);

		// Check if the passenger is going from minFloor to maxFloor or vice versa
		if (
			(passenger.from === this.minFloor && passenger.to === this.maxFloor) ||
			(passenger.from === this.maxFloor && passenger.to === this.minFloor)
		) {
			passenger.isMultiElevator = true;
			to = 0;
		}
		const floor = this.floors.find((element) => {
			return element.floor === from;
		});
		const button = floor.buttons.find((element) => {
			return element.direction === direction;
		});
		floor.passengers.push(passenger);
		button.isPushed = true;
		console.log(
			`[LOG]: Passenger ${passenger.id} pushed button ${direction} on floor ${floor.floor}. Destination ${to}`
		);

		const elevator = this.selectElevator(from, to, direction);
		if (elevator) {
			this.setElevatorDestination(elevator, from);
		}
	}

	selectElevator(from, to, direction) {
		let selectedElevator = null;
		let diff = 0;
		for (let elevatorKey in this.elevators) {
			if (
				this.elevators[elevatorKey].minFloor <= from &&
				this.elevators[elevatorKey].maxFloor >= from &&
				this.elevators[elevatorKey].minFloor <= to &&
				this.elevators[elevatorKey].maxFloor >= to &&
				this.elevators[elevatorKey].isMoving &&
				this.elevators[elevatorKey].direction === direction &&
				((direction === 'up' && this.elevators[elevatorKey].floor < to) ||
					(direction === 'down' && this.elevators[elevatorKey].floor > to))
			) {
				selectedElevator = this.elevators[elevatorKey];
			}

			if (
				!this.elevators[elevatorKey].isMoving &&
				!selectedElevator &&
				this.elevators[elevatorKey].minFloor <= from &&
				this.elevators[elevatorKey].maxFloor >= from &&
				this.elevators[elevatorKey].minFloor <= to &&
				this.elevators[elevatorKey].maxFloor >= to
			) {
				if (Math.abs(this.elevators[elevatorKey].floor - from) >= diff) {
					selectedElevator = this.elevators[elevatorKey];
					diff = Math.abs(this.elevators[elevatorKey].floor - to);
				}
			}
		}

		return selectedElevator;
	}

	setElevatorDestination(elevator, destination) {
		if (!elevator.isMoving) {
			elevator.destination = destination;
			elevator.direction = elevator.floor > destination ? 'down' : 'up';
			elevator.isMoving = true;
			setTimeout(() => {
				this.moveElevator(elevator);
			}, elevatorMoveFloor);
		} else {
			if (
				(elevator.direction === 'down' && destination < elevator.destination) ||
				(elevator.direction === 'up' && destination > elevator.destination)
			) {
				console.log(
					`[LOG]: Updated elevator ${elevator.id} destination from ${elevator.destination} to ${destination}`
				);
				elevator.destination = destination;
			}
		}
	}

	moveElevator(elevator) {
		// If the elevator stops, set a new direction
		if (!elevator.isMoving) {
			const floor = this.floors.find((element) => {
				return element.floor === elevator.floor;
			});

			if (elevator.passengers.length) {
				// Set a new destination based on elevator passengers
				elevator.direction = elevator.passengers[0].direction;
			} else if (floor.passengers.length) {
				// Set a new destination based on passengers on the current floor
				const waitingPassengers = floor.passengers.filter((element) => {
					return element.isMultiElevator || (element.to >= elevator.minFloor && element.to <= elevator.maxFloor);
				});
				if (waitingPassengers.length) {
					const direction = waitingPassengers[0].direction;
					waitingPassengers.forEach((element) =>
						floor.passengers.splice(floor.passengers.findIndex((item) => item.direction === element.direction), 1)
					);
					this.enterElevator(elevator, waitingPassengers);
					return false;
				}
			} else {
				// Find the furthest passenger
				let maxDistance = 0;
				let newDestination = null;
				this.floors.forEach((floor) => {
					if (floor.passengers.length) {
						const distance = Math.abs(floor.floor - elevator.floor);
						if (maxDistance < distance) {
							maxDistance = distance;
							newDestination = floor.floor;
						}
					}
				});
				if (newDestination) {
					this.setElevatorDestination(elevator, newDestination);
					return false;
				}
			}
		}

		// Check that the elevator has reached its final destination.
		if (elevator.floor === elevator.destination) {
			// Stop the elevator
			console.log(`[LOG]: Elevator ${elevator.id} stopped on floor ${elevator.floor}`);
			elevator.isMoving = false;
			elevator.direction = null;
		}

		if (elevator.direction) {
			elevator.floor = elevator.direction === 'down' ? elevator.floor - 1 : elevator.floor + 1;
			console.log(
				`[LOG]: Elevator ${elevator.id} moving ${elevator.direction}. Current floor: ${elevator.floor}. Destination: ${elevator.destination}`
			);
		}
		const floor = this.floors.find((element) => {
			return element.floor === elevator.floor;
		});

		// Check if a passenger is entering the elevator on this floor
		if (floor.passengers.length) {
			const waitingPassengers = floor.passengers.filter((element) => {
				return element.direction === elevator.direction;
			});
			waitingPassengers.forEach((element) =>
				floor.passengers.splice(floor.passengers.findIndex((item) => item.direction === element.direction), 1)
			);
			if (waitingPassengers.length) {
				this.enterElevator(elevator, waitingPassengers);
				return false;
			}
		}

		// Check if a passenger is exiting the elevator on this floor
		if (elevator.passengers.length) {
			const travellingPassengers = elevator.passengers.filter((element) => {
				return element.to === elevator.floor || (element.isMultiElevator && elevator.floor === 0);
			});
			travellingPassengers.forEach((element) =>
				elevator.passengers.splice(elevator.passengers.findIndex((item) => item.to === elevator.floor), 1)
			);
			if (travellingPassengers.length) {
				this.leaveElevator(elevator, travellingPassengers);
				return false;
			}
		}

		setTimeout(() => {
			this.moveElevator(elevator);
		}, elevatorMoveFloor);
	}

	enterElevator(elevator, waitingPassengers) {
		console.log(
			`[LOG]: Elevator ${elevator.id} on floor ${elevator.floor}. Passengers waiting ${waitingPassengers.length}`
		);
		setTimeout(() => {
			this.openEnterElevator(elevator, waitingPassengers);
		}, elevatorOpenDoor);
	}

	openEnterElevator(elevator, waitingPassengers) {
		if (!elevator.openDoor) {
			console.log(`[LOG]: Elevator ${elevator.id} door open`);
			elevator.openDoor = true;
		}
		const passenger = waitingPassengers.pop();
		passenger.startTravelTime = Date.now();
		elevator.passengers.push(passenger);
		console.log(`[LOG]: Passenger ${passenger.id} entered elevator ${elevator.id}. Destination: ${passenger.to}`);

		// If the passenger is a multi elevator, set the destination for the lobby
		this.setElevatorDestination(elevator, !passenger.isMultiElevator ? passenger.to : 0);

		if (waitingPassengers.length) {
			setTimeout(() => {
				this.openEnterElevator(elevator, waitingPassengers);
			}, passengerEnterElevator);
		} else {
			setTimeout(() => {
				this.closeElevator(elevator);
			}, passengerEnterElevator);
		}
	}

	closeElevator(elevator) {
		console.log(`[LOG]: Elevator ${elevator.id} door closed`);
		elevator.openDoor = false;
		setTimeout(() => {
			this.moveElevator(elevator);
		}, elevatorMoveFloor);
	}

	leaveElevator(elevator, travellingPassengers) {
		console.log(
			`[LOG]: Elevator ${elevator.id} on floor ${elevator.floor}. Passengers leaving elevator ${travellingPassengers.length}`
		);
		setTimeout(() => {
			this.openLeaveElevator(elevator, travellingPassengers);
		}, elevatorOpenDoor);
	}

	openLeaveElevator(elevator, travellingPassengers) {
		if (!elevator.openDoor) {
			console.log(`[LOG]: Elevator ${elevator.id} door open`);
			elevator.openDoor = true;
		}
		const passenger = travellingPassengers.pop();
		if (!passenger.isMultiElevator) {
			passenger.endTravelTime = Date.now();
			this.passengers.push(passenger);
			if (this.passengers.length === 100) {
				this.printSummary();
			}
		} else {
			const floor = this.floors.find((element) => {
				return element.floor === elevator.floor;
			});
			passenger.isMultiElevator = false;
			floor.passengers.push(passenger);
			const selectedElevator = this.selectElevator(floor.floor, passenger.to, passenger.direction);
			this.setElevatorDestination(selectedElevator, passenger.to);
		}
		console.log(`[LOG]: Passenger ${passenger.id} left elevator ${elevator.id} on floor ${elevator.floor}.`);

		if (travellingPassengers.length) {
			setTimeout(() => {
				this.openLeaveElevator(elevator, travellingPassengers);
			}, passengerEnterElevator);
		} else {
			setTimeout(() => {
				this.closeElevator(elevator);
			}, passengerEnterElevator);
		}
	}

	printSummary() {
		this.passengers.map((passenger) => {
			const totalTime = Math.round((passenger.endTravelTime - passenger.startTime) / 1000 * 100) / 100;
			console.log(
				`Passenger: ${passenger.id}. From: ${passenger.from}. To: ${passenger.to}. Total Time: ${totalTime} seconds`
			);
		});
	}
}

class Elevator {
	constructor(id, minFloor, maxFloor) {
		this.id = id;
		(this.minFloor = minFloor), (this.maxFloor = maxFloor), (this.floor = 0);
		this.direction = null;
		this.destination = null;
		this.isMoving = false;
		this.openDoor = false;
		this.passengers = [];
	}
}

class Floor {
	constructor(floor) {
		this.floor = floor;
		this.buttons = [];
		this.passengers = [];
	}
}

class Button {
	constructor(direction) {
		this.direction = direction;
		this.isPushed = false;
	}
}

class Passenger {
	constructor(id, from, to) {
		this.id = id;
		this.from = from;
		this.to = to;
		this.direction = from > to ? 'down' : 'up';
		this.startTime = Date.now();
		this.isMultiElevator = false;
	}
}

myBuilding = new Building(-1, 10);
myBuilding.addElevator(-1, 9);
myBuilding.addElevator(0, 10);

let totalPassengers = 0;

const createRandomPassenger = () => {
	let floor = 0;
	let to = 0;
	from = Math.floor(Math.random() * (myBuilding.maxFloor - myBuilding.minFloor) + myBuilding.minFloor);
	do {
		to = Math.floor(Math.random() * (myBuilding.maxFloor - myBuilding.minFloor) + myBuilding.minFloor);
	} while (from === to);
	myBuilding.addPassenger(from, to);
	totalPassengers++;
	if (totalPassengers < 100) {
		setTimeout(createRandomPassenger, Math.floor(Math.random() * 5000));
	}
};

createRandomPassenger();

try {
	errBuilding = new Building(10, -1);
} catch (err) {
	console.log(`[ERROR]: ${err}`);
}

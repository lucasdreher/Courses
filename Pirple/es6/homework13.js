// Homework Assignment #13: Classes

class Vehicle {
	constructor({ make, model, year, weight, needsMaintenance = false, tripsSinceMaintenance = 0 }) {
		this.make = make;
		this.model = model;
		this.year = year;
		this.weight = weight;
		this.needsMaintenance = needsMaintenance;
		this.tripsSinceMaintenance = tripsSinceMaintenance;
	}
	repair() {
		this.needsMaintenance = false;
		this.tripsSinceMaintenance = 0;
	}
}

class Cars extends Vehicle {
	constructor(make, model, year, weight, needsMaintenance, tripsSinceMaintenance, isDriving = false) {
		super(make, model, year, weight, needsMaintenance, tripsSinceMaintenance);
		this.isDriving = isDriving;
	}
	checkMaintenance() {
		if (this.tripsSinceMaintenance >= 100) {
			this.needsMaintenance = true;
			console.log(`You need maintenance since you have ${this.tripsSinceMaintenance} at your trips counter.`);
		}
	}
	drive() {
		this.isDriving = true;
		if (this.tripsSinceMaintenance >= 100) {
			this.needsMaintenance = true;
			console.log(`You need maintenance since you have ${this.tripsSinceMaintenance} at your trips counter.`);
		}
	}
	stop() {
		if (this.isDriving == true) {
			this.tripsSinceMaintenance += 20;
		}
		this.isDriving = false;
		if (this.tripsSinceMaintenance >= 100) {
			this.needsMaintenance = true;
			console.log(`You need maintenance since you have ${this.tripsSinceMaintenance} at your trips counter.`);
		}
		console.log(this.tripsSinceMaintenance);
	}
	static printCars(...cars) {
		for (const c of cars) {
			console.log(`===========================================`);
			console.log(`Make: ${c.make}`);
			console.log(`Model: ${c.model}`);
			console.log(`Year: ${c.year}`);
			console.log(`Weight: ${c.weight}`);
			console.log(`Needs Maintenance: ${c.needsMaintenance}`);
			console.log(`Trips Since Maintenance: ${c.tripsSinceMaintenance}`);
		}
	}
}

const car1 = new Cars({ make: 'Toyota', model: 'Corolla', year: '2020', weight: 1425 });
const car2 = new Cars({ make: 'Volkswagen', model: 'Golf', year: '2020', weight: 1450 });
const car3 = new Cars({ make: 'Ford', model: 'Ka', year: '2020', weight: 1530 });

console.log(Cars);

car1.drive();
car1.stop();
car1.drive();
car1.stop();
car1.drive();
car1.stop();
car1.drive();
car1.stop();
car1.drive();
car1.stop();
car1.drive();
car1.stop();

Cars.printCars(car1, car2, car3);

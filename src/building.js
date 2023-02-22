import Elevator from "./elevator";

export default class Building {

    constructor(numOfElevators, minFloor, maxFloor) {
        this.elevators = [];
        for (let i = 0; i < numOfElevators; i++) {
            this.elevators.push(new Elevator(1));
        }

        this.minFloor = minFloor;
        this.maxFloor = maxFloor;

        this.floorsArr = [];
        let numOfTotalFloors = maxFloor - minFloor + 1;
        for (let i = 0; i < numOfTotalFloors; i++) {
            this.floorsArr.push({
                number: i + 1,
                upPressed: false,
                downPressed: false,
            });
        }

        this.#runThread();
    }

    floor(floor) {
        return this.floorsArr[floor - 1];
    }

    pressUp(floor) {
        this.floor(floor).upPressed = true;
    }

    pressDown(floor) {
        this.floor(floor).downPressed = true;
    }

    killThread() {
        clearInterval(this.thread);
    }

    upPressedFloor() {
        return this.floorsArr
            .filter(fl => fl.upPressed)
            .map(fl => fl.number);
    }

    downPressedFloor() {
        return this.floorsArr
            .filter(fl => fl.downPressed)
            .map(fl => fl.number);
    }

    #runThread() {
        this.thread = setInterval(() => this.#sendClosestElevator(this.floorsArr, this.elevators), 1000);
    }

    #sendClosestElevator(floorsArr, elevators) {
        elevators.forEach(elevator => {
            const openedFloor = elevator.move();
            if (openedFloor.isUpward) {
                floorsArr[openedFloor.floor].upPressed = false;
            } else {
                floorsArr[openedFloor.floor].downPressed = false;
            }

            elevator.clearVolatileDestination();
        });

        floorsArr.forEach((floor, idx) => {
            let closetDistance = Number.MAX_VALUE;
            let closestElevator;

            for (let i = 0; i < elevators.length; i++) {
                const elevator = elevators[i];
                let distance = -1;

                if (floor.upPressed) {
                    distance = elevator.calculateDistance(idx + 1, true);
                } else if (floor.downPressed) {
                    distance = elevator.calculateDistance(idx + 1, false);
                }

                const isDistanceChanged = distance !== -1;
                if (isDistanceChanged && closetDistance > distance) {
                    closetDistance = distance;
                    closestElevator = elevator;
                }
            }

            if (closestElevator) {
                closestElevator.mayGoTo(floor.number);
            }
        });
    }
}

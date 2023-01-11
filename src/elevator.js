export default class Elevator {
    constructor(floor) {
        this.currentFloor = floor;
        this.volatileDestination = 0;
        this.destinations = [];
    }

    mustGoTo(floor) {
        let direction = this.#currentDirection();
        const wantDirection = floor - this.currentFloor;

        if (this.#hasToGoUp(direction, wantDirection)) {
            this.destinations.push(floor);
            this.destinations.sort((a, b) => a - b);
        } else if (this.#hasToGoDown(direction, wantDirection)) {
            this.destinations.push(floor);
            this.destinations.sort((a, b) => b - a);
        } else if (this.#isStaying(direction)) {
            this.destinations.push(floor);
        }
    }

    mayGoTo(floor) {
        this.volatileDestination = floor;
    }

    clearVolatileDestination() {
        this.volatileDestination = 0;
    }

    move() {
        if (this.destinations.length === 0) {
            return;
        }

        const direction = this.#currentDirection();
        if (this.#isGoingUp(direction)) {
            this.currentFloor++;
        } else if (this.#isGoingDown(direction)) {
            this.currentFloor--;
        }

        if (this.destinations.length !== 0 && this.destinations[0] === this.currentFloor) {
            this.destinations.shift();
        }
    }

    calculateDistance(floor, isGoingUp) {
        const currentDirection = this.#currentDirection();

        if (currentDirection === 0) {
            return Math.abs(this.currentFloor - floor);
        }
    }

    #currentDirection() {
        let direction = 0;
        if (this.destinations.length !== 0) {
            direction = this.destinations[0] - this.currentFloor;
        }
        return direction;
    }

    #hasToGoUp(direction, wantDirection) {
        return direction > 0 && wantDirection > 0;
    }

    #hasToGoDown(direction, wantDirection) {
        return direction < 0 && wantDirection < 0;
    }

    #isStaying(direction) {
        return direction === 0;
    }

    #isGoingUp(direction) {
        return direction > 0;
    }

    #isGoingDown(direction) {
        return direction < 0;
    }
}

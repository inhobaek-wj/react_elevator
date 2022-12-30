export default class Elevator {
    constructor(position) {
        this.currentPosition = position;
    }

    goTo(destination) {
        this.destination = destination;
    }

    isGoingUp() {
        return this.currentPosition < this.destination;
    }

    isGoingDown() {
        return this.currentPosition > this.destination;
    }

    changeCurrentPosition(position) {
        if (Math.abs(this.currentPosition - position) > 1) {
            throw new Error('can not change more than 2 floors at once');
        }
        this.currentPosition = position;
    }
}

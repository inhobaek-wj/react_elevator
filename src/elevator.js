export class Elevator {
    constructor(position) {
        this.currentPosition = position;
    }

    move(nextPosition) {
        this.nextPosition = nextPosition;
    }

    isGoingUp() {
        return this.currentPosition < this.nextPosition;
    }

    isGoingDown() {
        return this.currentPosition > this.nextPosition;
    }

    changeCurrentPosition(position) {
        if (Math.abs(this.currentPosition - position) > 1) {
            throw new Error('can not change more that 2 floors at once');
        }
        this.currentPosition = position;
    }
}

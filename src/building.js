import Elevator from "./elevator";

export class Building {
    constructor(numOfElevators, minFloor, maxFloor) {
        this.elevators = new Array(numOfElevators)
            .fill(new Elevator(1));

        this.minFloor = minFloor;
        this.maxFloor = maxFloor;

        this.floorsArr =
            new Array(maxFloor - minFloor + 1)
                .fill({
                    upPressed: false,
                    downPressed: false,
                });
    }

    floor(floor) {
        return this.floorsArr[floor - 1];
    }

    pressUp(floor) {
        this.floor(floor).upPressed = true;
    }

    pressDown(floor) {
        this.floor(floor).downPressed = true;

        this.elevators[0].goTo(floor);
    }
}

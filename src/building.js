import Elevator from "./elevator";

export class Building {
    constructor(numOfElevators, minFloor, maxFloor) {
        this.elevators = new Array(numOfElevators)
            .fill(new Elevator(1));

        this.minFloor = minFloor;
        this.maxFloor = maxFloor;

        const tmp =
            new Array(maxFloor - minFloor + 1)
                .fill({
                        upPressed: false,
                        downPressed: false,
                    }
                );
        this.floorsArr = JSON.parse(JSON.stringify(tmp));

        // this.#thread();
    }

    floor(floor) {
        return this.floorsArr[floor - 1];
    }

    pressUp(floor) {
        this.floor(floor).upPressed = true;
    }

    pressDown(floor) {
        this.floorsArr[floor - 1].downPressed = true;
    }

    #thread() {
        setInterval(() => cal(this.floorsArr, this.elevators), 1000);
    }
}

function cal(floorsArr, elevators) {
    floorsArr.forEach((floor, idx) => {
        console.log(idx + 1, floor);
        for (let i = 0; i < elevators; i++) {
            const elevator = elevators[i];

            if (floor.upPressed) {
                elevator.calculateDistance(idx + 1, true);
            } else if (floor.downPressed) {
                elevator.calculateDistance(idx + 1, false);
            }
        }
    });
}


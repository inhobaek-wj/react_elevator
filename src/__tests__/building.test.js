import {Building} from '../building';
import Elevator from '../elevator';

jest.mock('../elevator');

describe('Building', () => {
    const minFloor = 1;
    const maxFloor = 20;
    const thirdFloor = 3;
    const numOfElevators = 2;

    let building;
    let elevator_1;
    let elevator_2;

    beforeEach(() => {
        building = new Building(numOfElevators, minFloor, maxFloor);

        elevator_1 = Elevator.mock.instances[0];
        elevator_2 = Elevator.mock.instances[1];
    });

    describe('constructor', () => {
        test('initializes elevators', () => {
            expect(building.elevators).toHaveLength(2);
            // expect(typeof building.elevators[0]).toBe(Elevator);
            // expect(building.elevators[1]).toBeInstanceOf(Elevator);
        });

        test('initializes min & max floor', () => {
            expect(building.minFloor).toBe(minFloor);
            expect(building.maxFloor).toBe(maxFloor);
        });

        test('initializes floors', () => {
            expect(building.floorsArr).toHaveLength(maxFloor - minFloor + 1);
            expect(building.floor(minFloor).upPressed).toBeFalsy();
            expect(building.floor(minFloor).downPressed).toBeFalsy();
            expect(building.floor(maxFloor).upPressed).toBeFalsy();
            expect(building.floor(maxFloor).downPressed).toBeFalsy();
        });
    });

    test('presses up button', () => {
        building.pressUp(thirdFloor);

        expect(building.floor(thirdFloor).upPressed).toBeTruthy();
    });

    test('presses down button', () => {
        building.pressDown(thirdFloor);

        expect(building.floor(thirdFloor).downPressed).toBeTruthy();
    });

    test('moves elevator', () => {
        building.pressDown(thirdFloor);

        expect(elevator_1.goTo).toHaveBeenCalledWith(thirdFloor);
    });
});

import {Building} from '../building';
import Elevator from '../elevator';

jest.mock('../elevator');

describe('Building', () => {
    const minFloor = 1;
    const maxFloor = 20;
    const firstFloor = 1;
    const secondFloor = 2;
    const thirdFloor = 3;
    const fourthFloor = 4;
    const sixthFloor = 6;
    const tenthFloor = 10;
    const numOfElevators = 2;

    let building;
    let elevator_1;
    let elevator_2;

    jest.useFakeTimers();

    beforeEach(() => {
        building = new Building(numOfElevators, minFloor, maxFloor);

        elevator_1 = Elevator.mock.instances[0];
        elevator_2 = Elevator.mock.instances[1];
    });

    describe('constructor', () => {
        test('initializes elevators', () => {
            expect(building.elevators).toHaveLength(2);
            expect(building.elevators[0]).toBeInstanceOf(Elevator);
            expect(building.elevators[1]).toBeInstanceOf(Elevator);
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

        expect(building.floor(firstFloor).downPressed).toBeFalsy();
        expect(building.floor(thirdFloor).downPressed).toBeTruthy();
    });

    describe.skip('makes elevators calculate distance every second', () => {
        test('if pressed floors exist', () => {
            building.pressDown(thirdFloor);

            jest.advanceTimersByTime(1000);

            expect(elevator_1.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
            expect(elevator_2.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
        });
    });
});

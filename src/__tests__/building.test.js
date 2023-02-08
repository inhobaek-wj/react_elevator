import Building from '../building';
import Elevator from '../elevator';

jest.mock('../elevator');

describe('Building', () => {
    const minFloor = 1;
    const maxFloor = 20;
    const firstFloor = 1;
    const thirdFloor = 3;
    const fourthFloor = 4;
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

    afterEach(() => {
        building.killThread();
    })

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
            expect(building.floor(minFloor).number).toBe(minFloor);
            expect(building.floor(minFloor).upPressed).toBeFalsy();
            expect(building.floor(minFloor).downPressed).toBeFalsy();

            expect(building.floor(maxFloor).number).toBe(maxFloor);
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

    describe('sendClosestElevator', () => {
        beforeEach(() => {
            jest.spyOn(Elevator.prototype, 'calculateDistance')
                .mockImplementation(() => {
                    return 1;
                });
        });

        describe('makes elevators calculate distance every second', () => {
            test('if only one pressed floor exist', () => {
                building.pressDown(thirdFloor);

                jest.advanceTimersByTime(1000);

                expect(elevator_1.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
                expect(elevator_2.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
            });

            test('if pressed floors exist after 2 seconds', () => {
                building.pressDown(thirdFloor);

                jest.advanceTimersByTime(2000);

                expect(elevator_1.calculateDistance).toHaveBeenNthCalledWith(2, thirdFloor, false);
                expect(elevator_2.calculateDistance).toHaveBeenNthCalledWith(2, thirdFloor, false);
            });

            test('if multiple pressed floors exist', () => {
                building.pressDown(thirdFloor);
                building.pressUp(tenthFloor);

                jest.advanceTimersByTime(1000);

                expect(elevator_1.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
                expect(elevator_1.calculateDistance).toHaveBeenCalledWith(tenthFloor, true);
                expect(elevator_1.calculateDistance).not.toHaveBeenCalledWith(fourthFloor, expect.any(Boolean));

                expect(elevator_2.calculateDistance).toHaveBeenCalledWith(thirdFloor, false);
                expect(elevator_2.calculateDistance).toHaveBeenCalledWith(tenthFloor, true);
                expect(elevator_2.calculateDistance).not.toHaveBeenCalledWith(fourthFloor, expect.any(Boolean));
            });
        });

        describe('sends the closest elevator to the floor', () => {
            test('when all elevators have same distance', () => {
                building.pressDown(thirdFloor);

                jest.advanceTimersByTime(1000);

                expect(elevator_1.mayGoTo).not.toHaveBeenCalledWith(firstFloor);
                expect(elevator_1.mayGoTo).toHaveBeenCalledWith(thirdFloor);
                expect(elevator_2.mayGoTo).not.toHaveBeenCalled();
            });

            test('when elevators have different distance', () => {
                elevator_1.mayGoTo.mockClear();
                elevator_1.calculateDistance.mockClear();

                elevator_2.mayGoTo.mockClear();
                elevator_2.calculateDistance.mockClear();

                let calledTimes = 0;
                jest.spyOn(Elevator.prototype, 'calculateDistance')
                    .mockImplementation(() => {
                        if (!calledTimes) {
                            calledTimes++;
                            return 3;
                        } else {
                            return 1;
                        }
                    });

                building.pressDown(thirdFloor);

                jest.advanceTimersByTime(1000);

                expect(elevator_1.mayGoTo).not.toHaveBeenCalled();
                expect(elevator_2.mayGoTo).toHaveBeenCalledWith(thirdFloor);
            });
        });

        test('clears VolatileDestination of all elevators', () => {
            jest.advanceTimersByTime(1000);

            expect(elevator_1.clearVolatileDestination).toHaveBeenNthCalledWith(1);
            expect(elevator_2.clearVolatileDestination).toHaveBeenNthCalledWith(1);
        });

        test('makes all elevators move', () => {
            jest.advanceTimersByTime(1000);

            expect(elevator_1.move).toHaveBeenNthCalledWith(1);
            expect(elevator_2.move).toHaveBeenNthCalledWith(1);
        });
    });
});

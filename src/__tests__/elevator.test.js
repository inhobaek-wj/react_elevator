import Elevator from '../elevator';

const secondFloor = 2;
describe('elevator', () => {
    const firstFloor = 1;
    const thirdFloor = 3;
    const tenthFloor = 10;

    let elevator;
    beforeEach(() => {
        elevator = new Elevator(firstFloor);
    });

    test('sets initial position & destinations', () => {
        const elevator = new Elevator(firstFloor); // When

        expect(elevator.currentFloor).toEqual(firstFloor); // Then
        expect(elevator.destinations).toHaveLength(0); // Then
    });

    describe('mustGoTo', () => {
        test('adds destination', () => {
            elevator.mustGoTo(thirdFloor);

            expect(elevator.destinations).toHaveLength(1);
        });

        test('adds multiple sorted destinations upward', () => {
            elevator.mustGoTo(tenthFloor);
            elevator.mustGoTo(thirdFloor);

            expect(elevator.destinations).toHaveLength(2);
            expect(elevator.destinations[0]).toBe(thirdFloor);
            expect(elevator.destinations[1]).toBe(tenthFloor);
        });

        test('adds multiple sorted destinations downward', () => {
            elevator = new Elevator(tenthFloor);

            elevator.mustGoTo(firstFloor);
            elevator.mustGoTo(thirdFloor);

            expect(elevator.destinations).toHaveLength(2);
            expect(elevator.destinations[0]).toBe(thirdFloor);
            expect(elevator.destinations[1]).toBe(firstFloor);
        });

        test('NOT add destination if direction is opposite', () => {
            elevator = new Elevator(thirdFloor); // When
            elevator.mustGoTo(tenthFloor);

            elevator.mustGoTo(secondFloor);

            expect(elevator.destinations).toHaveLength(1);
        });
    });

    describe('changeCurrentFloor', () => {
        test('changes currentFloor', () => {
            elevator.changeCurrentFloor(secondFloor); // When

            expect(elevator.currentFloor).toBe(secondFloor); // Then
        });

        test('throws if difference more than 2', () => {
            expect(() => elevator.changeCurrentFloor(3))
                .toThrow('can not change more than 2 floors at once'); // Then
        });
    });
});

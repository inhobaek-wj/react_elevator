import Elevator from '../elevator';

describe('elevator', () => {
    const firstFloor = 1;
    const secondFloor = 2;
    const thirdFloor = 3;
    const fourthFloor = 4;
    const tenthFloor = 10;

    let elevator;
    beforeEach(() => {
        elevator = new Elevator(firstFloor);
    });

    test('sets initial values', () => {
        const elevator = new Elevator(firstFloor); // When

        expect(elevator.currentFloor).toEqual(firstFloor); // Then
        expect(elevator.destinations).toHaveLength(0); // Then
        expect(elevator.volatileDestination).toBe(0); // Then
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

    test('mayGoTo changes volatileDestination', () => {
        elevator.mayGoTo(thirdFloor);

        expect(elevator.volatileDestination).toBe(thirdFloor);
    });

    test('clearVolatileDestination clears volatileDestination', () => {
        elevator.mayGoTo(thirdFloor);

        elevator.clearVolatileDestination();

        expect(elevator.volatileDestination).toBe(0);
    });

    describe('moveTo', () => {
        test('changes currentFloor', () => {
            elevator.moveTo(secondFloor); // When

            expect(elevator.currentFloor).toBe(secondFloor); // Then
        });

        test('throws if difference more than 2', () => {
            expect(() => elevator.moveTo(thirdFloor))
                .toThrow('can not change more than 2 floors at once'); // Then
        });

        test('arrives destination', () => {
            elevator.mustGoTo(thirdFloor);
            elevator.mustGoTo(tenthFloor);

            elevator.moveTo(secondFloor);
            elevator.moveTo(thirdFloor);

            expect(elevator.destinations).toHaveLength(1);
            expect(elevator.destinations[0]).toBe(tenthFloor);
        });
    });

    describe('calculateDistance', () => {
        test('엘베는 1층에 멈춰있고, 유저가 4층에서 업 버튼을 눌렀을 때', () => {
            expect(elevator.calculateDistance(fourthFloor, true)).toBe(3);
        });

        test('엘베는 4층에 멈춰있고, 유저가 1층에서 다운 버튼을 눌렀을 때', () => {
            elevator = new Elevator(fourthFloor);

            expect(elevator.calculateDistance(firstFloor, false)).toBe(3);
        });
    });
});

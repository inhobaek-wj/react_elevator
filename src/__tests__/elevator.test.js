import Elevator from '../elevator';

describe('elevator', () => {
    const firstFloor = 1;
    const secondFloor = 2;
    const thirdFloor = 3;
    const fourthFloor = 4;
    const sixthFloor = 6;
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

    describe('move', () => {
        test('NOT move if destination NOT exist', () => {
            elevator.move();

            expect(elevator.currentFloor).toBe(firstFloor);
        });

        test('goes upward one floor at once', () => {
            elevator.mustGoTo(thirdFloor);

            elevator.move();

            expect(elevator.currentFloor).toBe(secondFloor);
        });

        test('goes downward one floor at once', () => {
            elevator = new Elevator(thirdFloor);
            elevator.mustGoTo(firstFloor);

            elevator.move();

            expect(elevator.currentFloor).toBe(secondFloor);
        });

        test('removes next destination', () => {
            elevator.mustGoTo(thirdFloor);
            elevator.mustGoTo(tenthFloor);

            elevator.move();
            elevator.move();

            expect(elevator.destinations).toHaveLength(1);
            expect(elevator.destinations[0]).toBe(tenthFloor);
        });

        test('opens door when arrive destination upward', () => {
            elevator.mustGoTo(thirdFloor);
            elevator.mustGoTo(tenthFloor);

            elevator.move();
            const openedFloor = elevator.move();

            expect(openedFloor).toStrictEqual({
                isUpward: true,
                isDownward: false,
                floor: thirdFloor,
            });
        });

        test('opens door when arrive destination downward', () => {
            elevator = new Elevator(thirdFloor);
            elevator.mustGoTo(firstFloor);

            elevator.move();
            const openedFloor = elevator.move();

            expect(openedFloor).toStrictEqual({
                isUpward: false,
                isDownward: true,
                floor: firstFloor,
            });
        });

        test('opens door when arrive volatileDestination', () => {
            elevator.mayGoTo(thirdFloor);

            elevator.move();
            const openedFloor = elevator.move();

            expect(openedFloor).toStrictEqual({
                isUpward: true,
                isDownward: false,
                floor: thirdFloor,
            });
        });

        test('goes to upward volatileDestination', () => {
            elevator.mayGoTo(thirdFloor);

            elevator.move();

            expect(elevator.currentFloor).toBe(secondFloor);
        });

        test('goes to downward volatileDestination', () => {
            elevator = new Elevator(fourthFloor);
            elevator.mayGoTo(firstFloor);

            elevator.move();

            expect(elevator.currentFloor).toBe(thirdFloor);
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

        test('엘베는 1층에서 3층으로 움직이고, 유저가 10층에서 업 버튼을 눌렀을 때', () => {
            elevator = new Elevator(firstFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();

            expect(elevator.calculateDistance(tenthFloor, true)).toBe(9);
        });

        test('엘베는 1층에서 3층으로 움직이고, 유저가 10층에서 다운 버튼을 눌렀을 때', () => {
            elevator = new Elevator(firstFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();

            expect(elevator.calculateDistance(tenthFloor, false)).toBe(9);
        });

        test('엘베는 1층에서 10층으로 움직이고, 유저가 3층에서 업 버튼을 눌렀을 때', () => {
            elevator = new Elevator(firstFloor);
            elevator.mustGoTo(tenthFloor);
            elevator.move();

            expect(elevator.calculateDistance(thirdFloor, true)).toBe(1);
        });

        test('엘베는 1층에서 10층으로 움직이고, 유저가 3층에서 다운 버튼을 눌렀을 때', () => {
            elevator = new Elevator(firstFloor);
            elevator.mustGoTo(tenthFloor);
            elevator.move();

            expect(elevator.calculateDistance(thirdFloor, false)).toBe(16);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 4층에서 업 버튼을 눌렀을 때', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(fourthFloor, true)).toBe(7);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 4층에서 다운 버튼을 눌렀을 때', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(fourthFloor, false)).toBe(4);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 1층에서 업 버튼을 눌렀을 때', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(firstFloor, true)).toBe(8);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 1층에서 다운 버튼을 눌렀을 때', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(firstFloor, false)).toBe(8);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 4층에서 업 버튼을 눌렀을 때, 중간층이 있으면', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.mustGoTo(sixthFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(fourthFloor, true)).toBe(8);
        });

        test('엘베는 10층에서 3층으로 움직이고, 유저가 4층에서 다운 버튼을 눌렀을 때, 중간층이 있으면', () => {
            elevator = new Elevator(tenthFloor);
            elevator.mustGoTo(thirdFloor);
            elevator.mustGoTo(sixthFloor);
            elevator.move();
            elevator.move();

            expect(elevator.calculateDistance(fourthFloor, false)).toBe(5);
        });
    });
});

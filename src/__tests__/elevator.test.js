import {Elevator} from '../elevator';

describe('elevator', () => {
    const initialPosition = 1;
    const nextPosition = 3; // Given

    let elevator;
    beforeEach(() => {
        elevator = new Elevator(initialPosition);
    });

    test('sets initial position', () => {
        const elevator = new Elevator(initialPosition); // When

        expect(elevator.currentPosition).toEqual(initialPosition); // Then
    });

    describe('move', () => {
        test('moves up', () => {
            elevator.move(nextPosition); // When

            expect(elevator.isGoingUp()).toBeTruthy(); // Then
        });

        test('moves down', () => {
            elevator = new Elevator(10); // Given

            elevator.move(nextPosition); // When

            expect(elevator.isGoingUp()).toBeFalsy(); // Then
            expect(elevator.isGoingDown()).toBeTruthy(); // Then
        });

        test('stays', () => {
            elevator.move(initialPosition); // When

            expect(elevator.isGoingUp()).toBeFalsy(); // Then
            expect(elevator.isGoingDown()).toBeFalsy(); // Then
        });
    });

    describe('changeCurrentPosition', () => {
        test('changes currentPosition', () => {
            elevator.changeCurrentPosition(2); // When

            expect(elevator.currentPosition).toBe(2); // Then
        });

        test('throws if difference more than 2', () => {
            expect(() => elevator.changeCurrentPosition(3))
                .toThrow('can not change more than 2 floors at once'); // Then
        });
    });
});

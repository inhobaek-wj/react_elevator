import {render, screen, within} from '@testing-library/react';
import BuildingComponent from './BuildingComponent';

const mockElevatorComponent = jest.fn();
const elevator_1 = 'elevator 1';
const elevator_2 = 'elevator 2';
const elevator_3 = 'elevator 3';

jest.mock("./ElevatorComponent", () =>
    (props) => {
        mockElevatorComponent(props); // verify 시 필요
        return <div data-testid="elevator"/>;  // rendering 확인 시 필요
    }
);

jest.mock("./building", () => {
    return function () {
        return {
            elevators: [elevator_1, elevator_2, elevator_3]
        };
    }
});

describe('BuildingComponent', () => {
    describe('has buttons and', () => {
        it('total is 20', () => {
            render(<BuildingComponent/>);

            const buttons = screen.getAllByTestId("building-btn");

            expect(buttons).toHaveLength(20);
        });

        it('first floor NOT have down button', () => {
            render(<BuildingComponent/>);

            const buttons = screen.getAllByTestId("building-btn");
            const downBtn = within(buttons[0]).queryByText("d");

            expect(downBtn).toBeNull();
        });

        it('last floor NOT have up button', () => {
            render(<BuildingComponent/>);

            const buttons = screen.getAllByTestId("building-btn");
            const upBtn = within(buttons[buttons.length - 1]).queryByText("u");

            expect(upBtn).toBeNull();
        });

        it('other floors have both', () => {
            render(<BuildingComponent/>);

            const buttons = screen.getAllByTestId("building-btn");
            const upBtn = within(buttons[1]).queryByText("u");
            const downBtn = within(buttons[1]).queryByText("d");

            expect(upBtn).not.toBeNull();
            expect(downBtn).not.toBeNull();
        });
    });

    it('has 3 Elevators', () => {
        render(<BuildingComponent/>);

        const elevators = screen.getAllByTestId("elevator");
        expect(elevators).toHaveLength(3);

        expect(mockElevatorComponent).toHaveBeenNthCalledWith(
            1,
            {
                elevator: elevator_1
            }
        );
        expect(mockElevatorComponent).toHaveBeenNthCalledWith(
            2,
            {
                elevator: elevator_2
            }
        );
        expect(mockElevatorComponent).toHaveBeenNthCalledWith(
            3,
            {
                elevator: elevator_3
            }
        );
    });
});

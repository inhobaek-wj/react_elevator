import {render, screen, within} from '@testing-library/react';
import BuildingComponent from './BuildingComponent';
import {click} from "@testing-library/user-event/dist/click";

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
            elevators: [elevator_1, elevator_2, elevator_3],
            downPressedFloor: () => [2, 8],
            upPressedFloor: () => [1, 3]
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

    describe('shows pressed floors', () => {
        it('down', async () => {
            render(<BuildingComponent/>);

            expect(screen.getByText('mayGoDown: 2,8')).not.toBeNull();
        });

        it('up', async () => {
            render(<BuildingComponent/>);

            // expect(screen.getByText('mayGoUp: 1,3')).toBeInTheDocument();
            expect(screen.getByTestId('may-go-up').text).toBe('mayGoUp: 1,3');
        });
    });

    describe('presses button', () => {
        it('to go up on first floor', async () => {
            render(<BuildingComponent/>);

            const upButtonOnFirstFloor = screen.getByTestId("1-u-btn");

            await click(upButtonOnFirstFloor);

            expect(screen.getByText('mayGoUp: 1')).not.toBeNull();
        });

        it('to go down on tenth floor', async () => {
            render(<BuildingComponent/>);

            const upButtonOnFirstFloor = screen.getByTestId("1-u-btn");

            await click(upButtonOnFirstFloor);

            expect(screen.getByText('mayGoUp: 1')).not.toBeNull();
        });
    });
});

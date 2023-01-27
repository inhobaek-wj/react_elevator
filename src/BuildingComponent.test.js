import {render, screen, within} from '@testing-library/react';
import BuildingComponent from './BuildingComponent';

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
});

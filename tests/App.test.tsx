import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {describe, expect} from "vitest";
import App from "../src/App";


describe('App', () => {
    test('Adding todo', async () => {
        render(<App/>);
        const inputElement = screen.getByRole('textbox');
        const addButton = screen.getByText('Add new Todo');

        fireEvent.change(inputElement, {target: {value: 'Test Todo'}});
        fireEvent.click(addButton);


        const todoHeader = await screen.findByText('Test Todo');
        const todoItem = todoHeader.closest('li')
        expect(addButton).to.exist
        expect(todoItem).to.exist
    });

    test('Marking todo as completed', () => {
        render(<App/>);
        const todoCheckbox = screen.getByText('Test Todo').closest('li')!.querySelector('input') as HTMLInputElement;

        fireEvent.change(todoCheckbox);

        expect(todoCheckbox.checked).toBeTruthy;

    });

    test('Unmarking todo as not completed', async () => {
        render(<App/>);
        const todoCheckbox = screen.getByText('Test Todo').closest('li')!.querySelector('input') as HTMLInputElement;

        fireEvent.click(todoCheckbox);

        expect(todoCheckbox.checked).toBeFalsy
    });

    test('Deleting todo', async () => {
        render(<App/>)
        const todoText = screen.getByText('Test Todo');
        fireEvent.click(todoText);

        await waitFor(() => {
            expect(screen.queryByText('Test Todo')).to.not.exist
        })
    })
})
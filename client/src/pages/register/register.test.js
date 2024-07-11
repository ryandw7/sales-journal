import Register from "./Register";
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { changeInputValue } from "../../../testUtils";
test('Register renders properly', () => {
    render(<Register />);
    expect(screen.getAllByText("Register")).toBeTruthy();
})
test('Register renders all input fields', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(document.querySelector("input[type='submit']")).toBeInTheDocument()
});

test('Register inputs update corresponding', () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'a' } });
    expect(screen.getByLabelText(/First Name/i).value).toBe('a');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('a');
    expect(screen.getByLabelText(/Username/i).value).toBe('a');
    expect(screen.getByLabelText(/Enter Password/i).value).toBe('a');
    expect(screen.getByLabelText(/Confirm Password/i).value).toBe('a');
})

test('Register clears password value if passwords do not match', async () => {
    render(<Register />);
    changeInputValue(/Enter Password/i, 'password');
    changeInputValue(/Confirm Password/i, 'password!');
    await userEvent.click(screen.getByRole("submit"));
    expect(screen.getByLabelText(/Enter Password/i).value).toBe('');
    expect(screen.getByLabelText(/Confirm Password/i).value).toBe('');
});
test("Register sends error if passwords do not match", async ()=>{
    render(<Register />);
    changeInputValue(/Enter Password/i, 'password');
    changeInputValue(/Confirm Password/i, 'password!');
    await userEvent.click(screen.getByRole("submit"));
    const err = screen.getByRole("register-error");
    expect(err).toBeInTheDocument();
    expect(err.textContent).toBe('ERROR: Passwords do not match!');
})
test('Register sends error if field is blank', async ()=>{
render(<Register />);
await userEvent.click(screen.getByRole("submit"));
const err = screen.getByRole("register-error");
expect(err).toBeInTheDocument();
expect(err.textContent).toBe('ERROR: No values should be empty!');
})
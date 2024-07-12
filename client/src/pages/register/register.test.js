import Register from "./Register";
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { changeInputValue } from "../../../testUtils";

beforeEach(() => {
    render(<Register />);
});

test('Register renders properly', () => {
    expect(screen.getAllByText("Register")).toBeTruthy();
});

test('Register inputs render and update correspondingly', () => {
    changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'drowssap', /Confirm Password/i, 'drowssap');
    
    expect(screen.getByLabelText(/First Name/i).value).toBe('John');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/Username/i).value).toBe('John.Doe23');
    expect(screen.getByLabelText(/Enter Password/i).value).toBe('drowssap');
    expect(screen.getByLabelText(/Confirm Password/i).value).toBe('drowssap');
});

test('Register handles password mismatch', async () => {
    changeInputValue(/Enter Password/i, 'password', /Confirm Password/i, 'password!');
    await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

    const passwordInput = screen.getByLabelText(/Enter Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');

    const err = screen.getByRole("register-error");
    expect(err).toBeInTheDocument();
    expect(err.textContent).toBe('ERROR: Passwords do not match!');
});

test('Register handles empty fields', async () => {
    await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

    const err = screen.getByRole("register-error");
    expect(err).toBeInTheDocument();
    expect(err.textContent).toBe('ERROR: No values should be empty!');
});

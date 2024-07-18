import Register from "./Register";
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { changeInputValue } from "../../../testUtils";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

beforeEach(() => {
    render(<BrowserRouter><Register /></BrowserRouter>);
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

test('Mock server', async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
    
      expect(data).toBe({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      })
    } catch (err) {
        return err;
    }
})
test('Register submits new user upon successful entry', async () => {
    changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'drowssap', /Confirm Password/i, 'drowssap');
    await userEvent.click(screen.getByRole("submit", { name: /submit/i }));
    expect(useNavigate).toHaveBeenCalled();
})


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
    changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'password', /Confirm Password/i, 'password!');
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


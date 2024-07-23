import Register from "./Register";
import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { changeInputValue, renderWithProviders } from "../../../testUtils";
import { useNavigate } from "react-router-dom";
import reducer, { registerUser, selectRegisterStatus } from "./registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUpStore } from "../../app/store";
import { server } from "../../mocks/server";


describe('registerSlice', () => {

    test('it returns recieved object upon successful register', async () => {
        const store = setUpStore({});
        await store.dispatch(registerUser({
            firstName: 'John',
            lastName: 'Doe',
            userName: 'Username',
            password: 'password'
        }));
        const state = store.getState().register;
        expect(state).toEqual({
            registerStatus: 'fulfilled', registeredUser: {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'Username',
                password: 'password'
            }
        })
    });

    test('it sets status to rejected upon failure', () => {
        const action = { type: registerUser.rejected.type };
        const state = reducer({ registerStatus: '', registeredUser: '' }, action);
        expect(state).toEqual({ registerStatus: 'rejected', registeredUser: '' })
    });

    test('registerUser returns an error when missing info', async () => {
        const store = setUpStore({});
        await store.dispatch(registerUser({
            firstName: 'John',
            lastName: 'Doe',
            password: 'password'
        }));
        const state = store.getState().register;
        expect(state).toEqual({ "registerStatus": "rejected", "registeredUser": "" })
    }
    )

})



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

test('Mock server', async () => {
    try {
        const res = await fetch('https://localhost:4000/api');
        const data = await res.json();

        expect(data).toBe('Server request successful!')
    } catch (err) {
        return err;
    }
});

beforeEach(() => {
    renderWithProviders(<Register />, {
        store: setUpStore({
            register: {
                registerStatus: '',
                registeredUser: ''
            }
        })
    })
});

describe('Register', () => {


    test('Register submits new user upon successful entry', async () => {

        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'Drowssap!', /Confirm Password/i, 'Drowssap!');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i })).then(() => {
            expect(screen.getByText('Successfully Registered!')).toBeInTheDocument();

            expect(useNavigate).toHaveBeenCalled();
        }
        )

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

        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'Password!', /Confirm Password/i, 'Paszword!');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

        const passwordInput = screen.getByLabelText(/Enter Password/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
        const err = screen.getByRole("register-error");

        expect(passwordInput.value).toBe('');
        expect(confirmPasswordInput.value).toBe('');
        expect(err).toBeInTheDocument();
        expect(err.textContent).toBe('ERROR: Passwords do not match!');
    });

    test('it handles passwords under 8 characters', async () => {

        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'pass', /Confirm Password/i, 'pass');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

        const err = screen.getByRole("register-error");

        expect(err).toBeInTheDocument();
        expect(err.textContent).toBe('ERROR: Password must be at least 8 characters!');

    })
    test('it handles passwords without an uppercase letter', async () => {

        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'password!', /Confirm Password/i, 'password!');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

        const err = screen.getByRole("register-error");

        expect(err).toBeInTheDocument();
        expect(err.textContent).toBe('ERROR: Password must contain an uppercase letter.');

    })
    test('it handles passwords without a lowercase letter', async () => {
        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'PASSWORD!', /Confirm Password/i, 'PASSWORD!');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

        const err = screen.getByRole("register-error");

        expect(err).toBeInTheDocument();
        expect(err.textContent).toBe('ERROR: Password must contain a lowercase letter.');
    })

    test('it handles passwords without a number or special character', () => {

    })

    test('it handles passwords without a number', () => {

    })
    test('Register handles empty fields', async () => {

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }));

        const err = screen.getByRole("register-error");
        console.log()
        expect(err).toBeInTheDocument();
        expect(err.textContent).toBe('ERROR: No values should be empty!');
    });

    test('Register handles server issues and sends an error message to user', async () => {

        server.close()
        changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'Drowssap!', /Confirm Password/i, 'Drowssap!');

        await userEvent.click(screen.getByRole("submit", { name: /submit/i }))
        await waitFor(() => {

            const err = screen.getByRole("register-error");

            expect(err).toBeInTheDocument();
            expect(err.textContent).toBe('ERROR: there was an issue contacting the server :/ Try again later.');

        },)
    })

})
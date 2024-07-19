import Register from "./Register";
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { changeInputValue, renderWithProviders } from "../../../testUtils";
import { useNavigate } from "react-router-dom";
import reducer, { registerUser, selectRegisterStatus } from "./registerSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setUpStore } from "../../app/store";
beforeEach(async () => {
    renderWithProviders(<Register />, {
        store: configureStore({
            reducer: reducer
        })
    })
});


describe('registerSlice', () => {

   
    const initialState = { registerStatus: '', registeredUser: '' };
  
    test('it returns an initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(
            { registerStatus: '', registeredUser: '' }
        )
    });

    test('it submits a user for registration', () => {

        const action = { type: registerUser.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ registerStatus: 'pending', registeredUser: '' })
    });

    test('it sets registered user when fulfilled', () => {

        const action = {
            type: registerUser.fulfilled.type, payload: {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'John.Doe23',
                password: 'password'
            }
        }
        const state = reducer(initialState, action);
        expect(state).toEqual({
            registerStatus: 'fulfilled', registeredUser: {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'John.Doe23',
                password: 'password'
            }
        })
    });

    test('it sets status to rejected upon failure', () => {
        const action = { type: registerUser.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ registerStatus: 'rejected', registeredUser: '' })
    });

    test('registerUser returns an error when missing info', async()=>{
        const store = setUpStore({});
        await store.dispatch(registerUser({firstName: 'John',
            lastName: 'Doe',
            password: 'password'}));
        const state = store.getState().register;
        expect(state).toEqual({"registerStatus": "rejected", "registeredUser": ""})
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

test('Register submits new user upon successful entry', async () => {
    changeInputValue(/First Name/i, 'John', /Last Name/i, 'Doe', /Username/i, 'John.Doe23', /Enter Password/i, 'drowssap', /Confirm Password/i, 'drowssap');
    userEvent.click(screen.getByRole("submit", { name: /submit/i })).then(() => {
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


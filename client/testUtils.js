import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux'
import { setupStore } from './src/app/store'
import { BrowserRouter } from "react-router-dom";
export function renderWithProviders(ui, extendedRenderOptions = {}) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }) => (
        <BrowserRouter><Provider store={store}>{children}</Provider></BrowserRouter>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}
export const changeInputValue = (...args) => {
    // Ensure that args is an array of arrays where each sub-array is a pair [labelText, value]
    if (args.length % 2 !== 0) {
        throw new Error("Arguments should be in pairs of [labelText, value]");
    }

    for (let i = 0; i < args.length; i += 2) {
        const labelText = args[i];
        const value = args[i + 1];
        fireEvent.change(screen.getByLabelText(labelText), { target: { value } });
    }
};



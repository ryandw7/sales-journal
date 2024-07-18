import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

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



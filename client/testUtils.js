import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

export const changeInputValue = (labelText, value) => {
    fireEvent.change(screen.getByLabelText(labelText), {target: {value: value}});
}


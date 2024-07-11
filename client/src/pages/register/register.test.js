import Register from "./Register";
import React from "react";
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
test('Register renders properly', ()=>{
    render(<Register />);
    expect(screen.getAllByText("Register")).toBeTruthy();
})
test('Register renders all input fields', ()=>{
    render(<Register />);
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(document.querySelector("input[type='submit']")).toBeInTheDocument()
});

test('Register rejects upon missentered confirm password', ()=>{
    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {target: {value: 'a'}});
    expect(screen.getByPlaceholderText(/username/i).target.value).toBe('a');
})
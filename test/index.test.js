import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react';
import '@testing-library/jest-dom'
import Login from '../src/pages/Login';

test('/login',()=>{

    
    render(<Login />);
     
     expect(screen.getByText("Login")).toBeInTheDocument()
    });
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react';
import '@testing-library/jest-dom'
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
const comp = <BrowserRouter><Login /></BrowserRouter>
test('/login',()=>{

    
    render(comp);
     expect(screen.getAllByText("Login").length).toBe(2);
    });
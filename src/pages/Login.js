import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Login</button>
                <NavLink to="/register">Register</NavLink>
            </form>
        </div>
    )
}
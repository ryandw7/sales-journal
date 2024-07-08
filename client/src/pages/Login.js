import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
export default function Login() {
    useEffect(() => {
        const fetchProm = async () => {
            try {
                const req = await fetch('https://organic-space-telegram-xjq7wvv9qp4369qq-5000.app.github.dev/api', {
                    mode: "no-cors"
                });
                console.log(req.json);
                return req.json();
            } catch (error) {
                console.log(error)
            }
        }

        fetchProm();

    })
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
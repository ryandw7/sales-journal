import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchCredentials, selectLoginStatus } from './loginSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(selectLoginStatus) || null;
    const [errorText, setErrorText] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCredentials(formData))
    }

    useEffect(() => {
        if (status && status === 'rejected') {
            setErrorText('there was an issue contacting the server :/ Try again later.')
        };
        if (status && status === 'fulfilled') {
            setTimeout(() => { navigate('/dashboard') }, 3000)
        }
    }, [status])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="username" onChange={handleChange}></input>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                <button type="submit">Login</button>
                <NavLink to="/register">Register</NavLink>
            </form>
            {errorText && <div role="register-error">ERROR: {errorText}</div>}
            {status === 'pending' && <div className="loader"></div>}
            {status === 'fulfilled' && <div>Successfully Registered!</div>}
        </div>
    )
}
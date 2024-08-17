import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCredentials } from './loginSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
     
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCredentials({formData}))
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="username" onChange={handleChange}></input>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                <button type="submit">Login</button>
                <NavLink to="/register">Register</NavLink>
            </form>
        </div>
    )
}
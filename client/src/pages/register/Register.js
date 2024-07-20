import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectRegisterStatus } from './registerSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectRegisterStatus) || null;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });

    const [errorText, setErrorText] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorText('');
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        for (const value of Object.values(formData)) {
            if (value === '') {
                setErrorText('No values should be empty!');
                return;
            }
        }


        if (formData.password !== formData.confirmPassword) {
            setErrorText('Passwords do not match!');
            setFormData((prev) => {
                return {
                    ...prev,
                    password: '',
                    confirmPassword: ''
                }
            })

        } else if (errorText === '' && !status) {
            dispatch(registerUser(formData));
        }
    }
   
    useEffect(() => {
        if (status && status === 'rejected') {
            setErrorText('there was an issue contacting the server :/ Try again later.')
        };
        if (status && status === 'fulfilled') {
           setTimeout(()=>{navigate('/login')}, 3000) 
        }
    }, [status])

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="firstName">First Name:
                    <input type="text" placeholder="First Name" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} />
                </label>
                <label htmlFor="lastName">Last Name:
                    <input type="text" placeholder="Last Name" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} />
                </label>
                <label htmlFor="userName">Username:
                    <input type="text" placeholder="Username" name="userName" id="userName" value={formData.userName} onChange={handleInputChange} />
                </label>
                <label htmlFor="password">Enter Password:
                    <input type="password" placeholder="at least 8 characters" name="password" id="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <label htmlFor="confirmPassword">Confirm Password:
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </label>
                <label htmlFor="submit">
                    <input type="submit" name="submit" role="submit"></input>
                </label>
                {errorText && <div role="register-error">ERROR: {errorText}</div>}
                {status === 'pending' && <div className="loader"></div>}
                {status === 'fulfilled' && <div>Successfully Registered!</div>}
            </form>
        </div>
    )
}
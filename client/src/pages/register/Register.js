import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './registerSlice';
import { useDispatch } from 'react-redux';
export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

        };

        if (errorText === '') {

            try {
                const res = await dispatch(registerUser(formData))
                if (!res.ok) {
                    throw new Error('There was an error connection to the server :/ Try again in a little bit.');
                }

                navigate({ to: '/login' });
            } catch (err) {
                setErrorText(err.message)
                console.log(err);
                return err;
            };
            setFormData((prev) => {
                return {
                    ...prev,
                    firstName: '',
                    lastName: '',
                    userName: '',
                    password: '',
                    confirmPassword: ''
                }
            });





        }
    }


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

            </form>
        </div>
    )
}
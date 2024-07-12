import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });

    const [errorText, setErrorText] = useState('');
    const submitUser = async (reqBody) => {
        const { firstName, lastName, userName, password } = reqBody;

        try {
            console.log('request is being submitted')
            const res = await fetch('https://super-duper-yodel-vx79vqqgqrvcp997-5050.app.github.dev/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Make sure to set Content-Type
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    userName,
                    password
                })
            });
            const data = await res.json();

            return data;

        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorText('');
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
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
            submitUser(formData).then();
            setFormData((prev) => {
                return {
                    ...prev,
                    firstName: '',
                    lastName: '',
                    userName: '',
                    password: '',
                    confirmPassword: ''
                }
            })
        }
    }


    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <label for="firstName">First Name:
                    <input type="text" placeholder="First Name" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} />
                </label>
                <label for="lastName">Last Name:
                    <input type="text" placeholder="Last Name" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} />
                </label>
                <label for="userName">Username:
                    <input type="text" placeholder="Username" name="userName" id="userName" value={formData.userName} onChange={handleInputChange} />
                </label>
                <label for="password">Enter Password:
                    <input type="password" placeholder="at least 8 characters" name="password" id="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <label for="confirmPassword">Confirm Password:
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </label>
                <label for="submit">
                    <input type="submit" name="submit" role="submit"></input>
                </label>
                {errorText && <div role="register-error">ERROR: {errorText}</div>}

            </form>
        </div>
    )
}
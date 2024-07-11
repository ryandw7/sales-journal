import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });

    const [errorText, setErrorText] = useState(false);
    const submitUser = async (reqBody) => {
        const { firstName, lastName, userName, password } = reqBody;
        console.log(JSON.stringify(reqBody))
        try {
            console.log('request is being submitted')
            const res = await fetch('https://super-duper-yodel-vx79vqqgqrvcp997-5050.app.github.dev/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Make sure to set Content-Type
                },
                body: JSON.stringify({
                    firstName: `${firstName}`,
                    lastName: `${lastName}`,
                    userName: `${userName}`,
                    password: `${password}`
                })
            });
            const data = await res.json()
            console.log(data);
            return data;

        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const handleInputChange = (e) => {
        const type = e.target.name
        const value = e.target.value;
        if (type === 'password' || 'confirmPassword') {
            setErrorText('')
        }
        setFormData((prev) => {
            const obj = {
                ...prev,
                [type]: value
            }
            return obj;
        })
    }
    const handleFormSubmit = (e) => {
        for (const [key, value] of Object.entries(formData)) {
            if (value === '') {
                
                setErrorText('No values should be empty!');
            }
            console.log(`${key}: ${value}`);
        }

        e.preventDefault();
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
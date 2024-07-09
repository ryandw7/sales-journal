import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });
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
        setFormData((prev) => {
            const obj = {
                ...prev,
                [type]: value
            }
            return obj;
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(formData.password === formData.confirmPassword){
        submitUser(formData);
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
    }else if(formData.password !== formData.confirmPassword){
        console.log('Passwords do not match');
        setFormData((prev)=>{
            return {
                ...prev,
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
                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                <input type="text" placeholder="Username" name="userName" value={formData.userName} onChange={handleInputChange} />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                <input type="submit"></input>
            </form>
        </div>
    )
}
import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const type = e.target.name
        const value = e.target.value;
       setFormData((prev)=>{
           const obj = {
            ...prev,
            [type]: value
           }
         return obj;
       })
    }
    const handleFormSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
                <input type="text" placeholder="Username" name="userName" value={formData.userName} onChange={handleInputChange}/>
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange}/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
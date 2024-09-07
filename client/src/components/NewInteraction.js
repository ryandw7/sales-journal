import React, { useState } from 'react';
import { addInteraction } from '../pages/dashboard/dashBoardSlice';
export default function NewInteraction() {
   
    const [newIntObj, setNewIntObj] = useState({
        id: user.id, firstName: '', lastName: '', phoneNumber: '', note: ''
    })

   const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    console.log(name, value)
    setNewIntObj((prev) => {
    
        return {
            ...prev,
            [name] : value
        }
    })
   }
  const handleSubmit = (e) => {
    e.preventDefault();
    addInteraction()
  }
    return (
        <form onSubmit={()=>handleSubmit(newIntObj)}>
          <label htmlFor="first-name">First Name: </label>
          <input name="first-name" type="text" onChange={handleChange}/>
          <label htmlFor="last-name">Last Name: </label>
          <input name="last-name" type="text" onChange={handleChange}/>
          <label htmlFor="phone-number">Phone Number: </label>
          <input name="phone-number" type="text" onChange={handleChange}/>
          <label htmlFor="note">Note: </label>
          <textarea name="note" type="text" onChange={handleChange}/>
          <button type="submit">SUBMIT</button>
        </form>
    )
}
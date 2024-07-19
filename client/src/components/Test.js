import StandardSpinner from "../loaders/StandardSpinner";
import RegisterSubmit from "./RegisterSubmit";

import React, { useState } from 'react'
export default function Test(){
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () =>{
    if(!isLoading){
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false)
        }, 5000)
    }
    
  }
    return (
        <div id="test" onClick={handleClick}>
        <StandardSpinner onClick={handleClick} Elem={RegisterSubmit} trigger={isLoading}/>
        </div>
    )
}
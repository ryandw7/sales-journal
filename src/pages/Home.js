import React from 'react';
import { Navigate } from 'react-router-dom';
export default function Home(){
    
    const signedIn = false;
    const home = <h1>Home</h1>;
    return (
        <div>
        {signedIn ? 
            home
            : Navigate({to : '/login'})
        }
        </div>
    )
}
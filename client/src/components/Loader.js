import React from 'react';

export default function Loader({status, pending, rejected, fulfilled}){
    
    return (
       <div>
        {status === 'pending' && pending}
        {status === 'rejected' && rejected}
        {status === 'fulfilled' && fulfilled}
       </div>
    )
}

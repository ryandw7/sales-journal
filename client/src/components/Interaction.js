import React from 'react';

export default function Interaction({interaction}) {
    const { fn, ln, pn, date, note, id } = interaction;
    
    return (
        <li key={`${date}`}>
            <h3>{fn}{ln}</h3>
            <h4>{pn}</h4>
            <h5>{date}</h5>
            <p>{note}</p>
        </li>
    )
}
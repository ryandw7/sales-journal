import React from 'react';
import Interaction from "../components/Interaction.js";
import { useSelector } from 'react-redux';
import { selectInteractions } from '../redux/dashboardSlice.js';

export default function Interactions() {
    const interactionsArr = useSelector(selectInteractions);
    const interactionList = interactionsArr.map(item => <Interaction interaction={item} key={item.id} />)
    return (
        <div>
            <h2>Interactions</h2>
            <ul>
                {interactionList}
            </ul>
        </div>
    )
}
import React, { useEffect } from 'react';
import { fetchInteractions, selectInteractionsStatus, selectInteractions, addInteraction } from './dashboardSlice.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../login/loginSlice.js';
import Interactions from '../../features/Interactions.js';
import NewInteraction from '../../components/NewInteraction.js';

export default function Dashboard() {
    const user = useSelector(selectUser) || null;
    const status = useSelector(selectInteractionsStatus) || null;
    useEffect(() => {
        if (user.token) {
            dispatch(fetchInteractions(user.token))
        }

    }, [])
 
    return (
        <>
            <h1>Dashboard</h1>
            {user && <p>{user.firstName}</p>}
            {status && <p>{status}</p>}
            <Interactions />
            <NewInteraction user={user} handleSubmit={addNewInteraction} />
        </>
    )
}
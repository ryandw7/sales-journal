import React, { useEffect} from 'react';
import { fetchInteractions, selectInteractionsStatus } from './dashboardSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../login/loginSlice.js'
export default function Dashboard(){
    const user = useSelector(selectUser) || null;
    const status = useSelector(selectInteractionsStatus) || null;
    const dispatch = useDispatch()
    useEffect(()=>{
     dispatch(fetchInteractions())
    }, [])
    return (
        <>
           <h1>Dashboard</h1>
           {user && <p>{user.firstName}</p>}
           {status && <p>{status}</p>}
        </>
    )
}
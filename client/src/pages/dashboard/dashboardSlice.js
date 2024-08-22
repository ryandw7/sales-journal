import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { expressURL } from "../../environmentals";
  
export const fetchInteractions = createAsyncThunk('dashboard/fetchInteractions', async () => {
    try {
        const res = await fetch(`${expressURL}/api/interactions`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) {
            throw new Error('bruh')
        }
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
});


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        interactionsStatus: '',
        interactions: []
    },
    extraReducers: (builder) => {
     builder
     .addCase(fetchInteractions.pending, (state)=>{
        state.interactionsStatus = 'pending';
     })
     .addCase(fetchInteractions.rejected, (state)=>{
        state.interactionsStatus = 'rejected';
     })
     .addCase(fetchInteractions.fulfilled, (state, action)=>{
        state.interactionsStatus = 'fulfilled';
        state.interactions = action.payload;
     })
    }
})

export default dashboardSlice.reducer;
export const selectInteractionsStatus = (state) => state.dashboard.interactionsStatus;
export const selectInteractions = (state) => state.dashboard.interactions;
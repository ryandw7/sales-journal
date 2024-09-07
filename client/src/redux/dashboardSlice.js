import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EXPRESS_URL } from "../globals";

export const fetchInteractions = createAsyncThunk('dashboard/fetchInteractions', async (token) => {
    try {
        console.log(token)
        const res = await fetch(`${EXPRESS_URL}/interactions`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
});

export const addInteraction = createAsyncThunk('dashboard/addInteraction', async (token, newIntObj) => {
    try {
        const res = await fetch(`${EXPRESS_URL}/interactions`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newIntObj)
        });
        if(!res.ok){
            throw new Error('There was an issue...')
        }
    } catch (err) {
          throw err
    }
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        interactionsStatus: '',
        interactions: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInteractions.pending, (state) => {
                state.interactionsStatus = 'pending';
            })
            .addCase(fetchInteractions.rejected, (state) => {
                state.interactionsStatus = 'rejected';
            })
            .addCase(fetchInteractions.fulfilled, (state, action) => {
                state.interactionsStatus = 'fulfilled';
                state.interactions = action.payload;
            })
    }
})

export default dashboardSlice.reducer;
export const selectInteractionsStatus = (state) => state.dashboard.interactionsStatus;
export const selectInteractions = (state) => state.dashboard.interactions;
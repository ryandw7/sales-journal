import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCredentials = createAsyncThunk('login/fetchCredentials', async (reqBody) => {
    console.log('fetching');
    try {
        setTimeout(()=>{
            throw new Error('Request timed out :/')
        }, 3000)
        const { userName, password } = reqBody;
        const res = await fetch('url', {
            method: 'GET',
            headers: {

            },
            body: JSON.stringify({
               userName,
               password
            })
        });
        
        const data = await res.json();
        return data;
    } catch (err) {
        throw err
    }
})
const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginStatus: '', 
        user: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCredentials.rejected, (state, action) => {
                state.loginStatus = 'rejected';
            })
            .addCase(fetchCredentials.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(fetchCredentials.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled';
                state.user = action.payload;
            })
    }
})

export default loginSlice.reducer;
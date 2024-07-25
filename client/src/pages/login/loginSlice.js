import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCredentials = createAsyncThunk('login/fetchCredentials', async (reqBody) => {
    
})
const loginSlice = createReducer({
    name: 'login',
    initialState: {
        user: {}
    },
})

export default loginSlice.reducer;
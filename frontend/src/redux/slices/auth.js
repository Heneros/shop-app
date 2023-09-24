import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchRegister = createAsyncThunk('register/fetchRegister', async (params) => {
    const { data } = await axios.post('/api/users', params);
    return data;
})


const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }, extraReducers: {
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        }, [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    }
})

export const authReducer = authSlice.reducer;

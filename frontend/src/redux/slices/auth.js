import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchRegister = createAsyncThunk('register/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/', params);
    return data;
})

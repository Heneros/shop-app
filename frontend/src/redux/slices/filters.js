import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchFilters = createAsyncThunk('api/products/fetchFilters', async () => {
    try {
        const { data } = await axios.get('/api/products/filters');
        // return data;
        console.log(data);
    } catch (error) {
        throw error;
    }
});

const initialState = {
    filters: {
        items: [],
        status: 'loading'
    }
};



// const tagsSlice = createSlice({
//     name: 'tags',
//     initialState,
//     reducers: {}
// })


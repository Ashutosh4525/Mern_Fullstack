import axiosNew from "../../utils/axiosNew";
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchCategory=createAsyncThunk('category',async ()=>{
    try {
        const res=await axiosNew.get('/category_list');
        // return response.data;
        return (res.data && res.data.data) ? res.data.data : (res.data || []);
    } catch (error) {
        throw error
    }
})

export const fetchPlayersByCat = createAsyncThunk('pp/fetchPlayersByCat', async (catId) => {
    try {
        const res = await axiosNew.get(`/player_list?cat_id=${catId}`);
        // return response.data;
        const payload = (res.data && res.data.data) ? res.data.data : (res.data || []);
        return { catId, players: payload };
    } catch (error) {
        throw error
    }
})

export const fetchSinglePlayer = createAsyncThunk('pp/fetchSinglePlayer', async (id) => {
    try {
        const res = await axiosNew.get(`/single_player?id=${id}`);
        // return response.data;
         const raw = (res.data && res.data.data) ? res.data.data : (res.data || null);
        if (Array.isArray(raw)) return raw[0] || null;
        return raw;
    } catch (error) {
        throw error
    }
});
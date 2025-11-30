import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosNew from "../../utils/axiosNew";

export const fetchSeasonList=createAsyncThunk('/season-list', async()=>{
    try {
        const res=await axiosNew.get('/season_list');
        return res.data;
    } catch (error) {
        throw error
    }
})

export const fetchGalleryList=createAsyncThunk('/gallery-list',async(season_id)=>{
    try {
        const res= await axiosNew.get(`/gallary_list?cat_id=${season_id}`)
        return {season_id, data:res.data}
    } catch (error) {
        throw error;
    }
})

export const fetchSingleList=createAsyncThunk('/gallery-single',async(id)=>{
    try {
        const res= await axiosNew.get(`/single_gallary?id=${id}`)
        return res.data;
    } catch (error) {
        throw error;
    }
})
import axiosNew from "../../utils/axiosNew";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTvList=createAsyncThunk('/Tv_list',async(tv_id)=>{
    try {
        const res=await axiosNew.get(`/puneri_tv_list?cat_id=${tv_id}`)
        return res.data;
    } catch (error) {
        throw error
    }
})
export const fetchPuneriTv=createAsyncThunk('/puneritv', async(id)=>{
    try {
        const res= await axiosNew.get(`/single_puneri_tv?id=${id}`)
        return res.data;
    } catch (error) {
        throw error
    }
})
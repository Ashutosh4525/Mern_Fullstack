import axiosNew from '../../utils/axiosNew'
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProducts=createAsyncThunk("/product/fetch-all", async () => {
    try {
        const response=await axiosNew.get("/product");
        return response.data;
    } catch (error) {
        throw error;
    }    
})

export const createProduct=createAsyncThunk("/product/create",async (value,{dispatch}) => {
    try {
        const response=await axiosNew.post("/product",value);
        dispatch(fetchProducts());
        return response.data;
    } catch (error) {
        throw error
    }
}) 
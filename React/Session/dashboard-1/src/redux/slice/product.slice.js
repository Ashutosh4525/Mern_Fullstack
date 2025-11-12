import {createSlice} from "@reduxjs/toolkit"
import { fetchProducts,createProduct } from "../action/product.action"

const initialState={
    product:[],
    loading: false,
    error:"",
    message:""
}

 const productSlice=createSlice({
    name:"product",
    initialState,
    extraReducers:(builders)=>{
        builders
        .addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            // state.products=action.payload.product
            state.product=action.payload
            state.loading=false;
            state.message="Products fetched successfully "
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.loading=false;
            state.error="Could not fetch data"
        })
        // .addCase(createProduct.pending,(state)=>{
        //     state.loading=true;
        // })
        // .addCase(createProduct.fulfilled,(state)=>{
        //     console.log(action.payload);
        //     state.loading=false;
        //     state.message="Products fetched successfully "
        // })
        // .addCase(createProduct.rejected,(state)=>{
        //     state.loading=false;
        //     state.error="Could not fetch data"
        // })
    }
})

export const productAction= productSlice.actions;
const productReducer=productSlice.reducer;
export default productReducer;
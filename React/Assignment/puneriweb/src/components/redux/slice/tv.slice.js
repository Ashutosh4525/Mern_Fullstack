import {createSlice} from '@reduxjs/toolkit';
import { fetchPuneriTv,fetchTvList} from '../action/tv.action';

const initialState={
    tvList:[],
    loading:false,
    error:null,
    message:null,
    singleTv:null
}

const TvSlice=createSlice({
    name:"puneritv",
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders
        .addCase(fetchTvList.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchTvList.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.tvList=action.payload;
            state.loading=false;
            state.message="Tv list fetched successfully"
        })
        .addCase(fetchTvList.rejected,(state)=>{
             state.loading=false;
             state.error="Could not fetch data"
        })
        .addCase(fetchPuneriTv.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchPuneriTv.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.singleTv=action.payload;
            state.loading=false;
            state.message="Tv list fetched successfully"
        })
        .addCase(fetchPuneriTv.rejected,(state)=>{
             state.loading=false;
             state.error="Could not fetch data"
        })
    }
})
const TvReducer=TvSlice.reducer;
export default TvReducer;
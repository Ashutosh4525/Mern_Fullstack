import { createSlice } from "@reduxjs/toolkit";
import { fetchGalleryList,fetchSeasonList,fetchSingleList } from "../action/gallery.action";

const initialState={
    seasons:[],
    galleryBySeason:{},
    singleGallery:{},
    loading:false,
    error: null,
    message: null,
}

const gallerySlice=createSlice({
    name:"gallery",
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders
        .addCase(fetchSeasonList.pending,(s)=>{
            s.loading=true;
        })
        .addCase(fetchSeasonList.fulfilled,(s,a)=>{
            s.loading=false;
            s.seasons=a.payload;
            s.message="fetched Season List"
        })
        .addCase(fetchSeasonList.rejected,(s)=>{
            s.loading=false;
            s.error="Could not fetch data";
        })
        .addCase(fetchGalleryList.pending,(s)=>{
            s.loading=true;
        })
        .addCase(fetchGalleryList.fulfilled,(s,a)=>{
            s.loading=false;
            const {season_id,data}=a.payload;
            s.galleryBySeason={...s.galleryBySeason,[season_id]:data,};
            // s.galleryBySeason[a.payload.season_id] = a.payload.data;
        })
         .addCase(fetchGalleryList.rejected,(s)=>{
            s.loading=false;
            s.error="Could not fetch data";
        })
        .addCase(fetchSingleList.pending,(s)=>{
            s.loading=true;
        })
        .addCase(fetchSingleList.fulfilled, (s, a) => {
            s.loading=false;
            s.singleGallery = a.payload;
        })
        .addCase(fetchSingleList.rejected,(s)=>{
            s.loading=false;
            s.error="Could not fetch data";
        })
    }
})
const galleryReducer=gallerySlice.reducer
export default galleryReducer;
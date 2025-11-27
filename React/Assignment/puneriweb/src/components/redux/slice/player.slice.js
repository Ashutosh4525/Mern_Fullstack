import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory,fetchPlayersByCat,fetchSinglePlayer } from '../action/player.action';

const initialState={
    categories:[],
    loading:false,
    error: null,
    message: null,
    playersByCategory: {},
    singlePlayer:false
}

const playerSlice=createSlice({
    name:"player",
    initialState,
    reducers: {
    clearSinglePlayer(state) { state.singlePlayer = null; }
  },
    extraReducers:(builders)=>{
        builders
        .addCase(fetchCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchCategory.fulfilled,(state,action)=>{
            console.log(action.payload);
            // state.products=action.payload.product
            state.categories=action.payload
            state.loading=false;
            state.message="Category fetched successfully"
        })
        .addCase(fetchCategory.rejected,(state)=>{
            state.loading=false;
            state.error="Could not fetch data"
        })
        .addCase(fetchPlayersByCat.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchPlayersByCat.fulfilled,(state,action)=>{
            console.log(action.payload);
            // state.products=action.payload.product
            // state.categories=action.payload
            const { catId, players } = action.payload;
            state.playersByCategory = { ...state.playersByCategory, [catId]: players };
            state.loading=false;
            state.message="Player in Category fetched successfully"
        })
        .addCase(fetchPlayersByCat.rejected,(state)=>{
            state.loading=false;
            state.error="Could not fetch data"
        })
        .addCase(fetchSinglePlayer.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchSinglePlayer.fulfilled,(state,action)=>{
            console.log(action.payload);
            // state.products=action.payload.product
            
            state.singlePlayer=action.payload
            state.loading=false;
            state.message="Player fetched successfully"
        })
        .addCase(fetchSinglePlayer.rejected,(state)=>{
            state.loading=false;
            state.error="Could not fetch data"
        })

    }
})
export const { clearSinglePlayer } = playerSlice.actions;
export const playerAction=playerSlice.actions;
const playerReducer=playerSlice.reducer;
export default playerReducer;
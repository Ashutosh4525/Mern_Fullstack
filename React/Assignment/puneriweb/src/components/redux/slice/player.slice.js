import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory,fetchPlayersByCat,fetchSinglePlayer,fetchPlayersBatch } from '../action/player.action';

const initialState={
    categories:[],
    loading:false,
    error: null,
    message: null,
    playersByCategory: {},
    singlePlayer:null,
    playerList:{},
    cachedPlayers: {}
}

const playerSlice=createSlice({
    name:"player",
    initialState,
    reducers: {
    clearSinglePlayer(state) {
         state.singlePlayer = null; 
         state.loading = false;
         state.error = null;
        },
    // clearPlayerList(state) {
    //   state.playerList = {};
    // }
  },
    extraReducers:(builders)=>{
        builders
        .addCase(fetchCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchCategory.fulfilled,(state,action)=>{
            // console.log(action.payload);
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
            // console.log(action.payload);
            // state.categories=action.payload
            const { catId, players } = action.payload;
            // console.log(catId,players);
            
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
            // console.log(action.payload);
            // state.playerList=[...state.playerList,action.payload]
            // state.singlePlayer=action.payload;
            // const exists = state.playerList.some(p => p.id === action.payload.id);
            // if (!exists) {
            //     state.playerList.push(action.payload);
            // }
            // state.singlePlayer=action.payload;
            const player = action.payload;
            state.singlePlayer = player;
            if (player && player.id) {
                state.playerList[player.id] = player;
            }
            state.loading=false;
            state.message="Player fetched successfully"
        })
        .addCase(fetchSinglePlayer.rejected,(state)=>{
            state.loading=false;
            state.error="Could not fetch data"
        })
        .addCase(fetchPlayersBatch.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchPlayersBatch.fulfilled, (state, action) => {
            const playersArray = action.payload;
            playersArray.forEach(player => {
                if (player && player.id) {
                    state.cachedPlayers[player.id] = player;
                }
            });
            state.loading = false; state.message = "Batch players fetched successfully";
        })
        .addCase(fetchPlayersBatch.rejected, (state, action) => {
            state.loading = false; state.error = action.payload || "Could not fetch player batch";
        });
        }
})
export const { clearSinglePlayer } = playerSlice.actions;
export const playerAction=playerSlice.actions;
const playerReducer=playerSlice.reducer;
export default playerReducer;
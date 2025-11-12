import {createSlice} from '@reduxjs/toolkit'

const initialState={
    count:0
}

const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment(state){
            state.count++;
        },
        decrement(state){
            state.count--;
        },
        increaseBy(state){
            state.count+=isAction.payload
        }
    }
});

export const counterActions=counterSlice.actions;

const counterReducer=counterSlice.reducer;
export default counterReducer;
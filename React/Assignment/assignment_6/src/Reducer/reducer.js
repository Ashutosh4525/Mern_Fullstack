//Reducer
//2 parameter - state, action
//state -current val/initial val
//action-{type:"",payload:_}

export const initialState={
    time:0,
    isStart:false
}

export const reducerActions={
    start:"Start",
    stop:"Stop",
    reset:"Reset",
    tick:"Tick"
}

 const reducer=(state,action)=>{
    switch(action.type){
        case reducerActions.start:
            return {...state,isStart: true}
        case reducerActions.stop:
            return {...state,isStart: true}
        case reducerActions.reset:
            return {...state,isStart: false,time:0}
        case reducerActions.tick:
            return{...state,time:state.time+1}
        default:
            return state
    }
}
export default reducer;
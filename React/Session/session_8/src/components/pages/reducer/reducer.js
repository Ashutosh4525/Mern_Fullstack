//Reducer
//2 parameter - state, action
//state -current val/initial val
//action-{type:"",payload:_}

export const initialState={
    count:0,
    isLoggedIn:false,
    username:""
}

export const reducerActions={
    increment:"Increment",
    decrement:"Decrement",
    increaseBy:"IncreaseBy",
    login:"LogIn",
    logout:"LogOut"
}

 const reducer=(state,action)=>{
    switch(action.type){
        case reducerActions.increment:
            return {...state,count:state.count+1}
        case reducerActions.decrement:
            return {...state,count:state.count-1}
        case reducerActions.increaseBy:
            return {...state,count:state.count+action.payload}
        case reducerActions.login:
            return {...state,isLoggedIn:true,username:action.payload}
        case reducerActions.logout:
            return {...state,isLoggedIn:false,username:""}
        default:
            return state
    }
}
export default reducer;
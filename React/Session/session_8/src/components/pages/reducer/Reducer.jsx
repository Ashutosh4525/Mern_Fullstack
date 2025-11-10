import { useReducer,useContext, createContext } from "react";
import { initialState } from "./reducer";
import reducer from './reducer'

export const ReducerContext=createContext();

const Reducer=({children})=>{
    const data=useReducer(reducer, initialState);
     return (
        <ReducerContext.Provider value={data}>{children}</ReducerContext.Provider>
      );
    };
    
    export default Reducer;

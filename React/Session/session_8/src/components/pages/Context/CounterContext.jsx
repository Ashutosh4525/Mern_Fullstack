import { useState } from "react";
import Context from "./Context";
import ContextChild1 from "./ContextChild1";

export default function CounterContext(){

    const [num, setNum]=useState(0);
    const inc1=()=>{
        setNum(num=>num+1);
    }
    const dec1=()=>{
        setNum(num=>num-1);
    }
    const inc5=()=>{
        setNum(num=>num+5);
    }

    return(
        <>
        <Context.Provider value={{num:num,inc1,inc5,dec1}}>
        <div className="text-center border-cyan-600 rounded-xl">
            <h2>{num}</h2>
            <div>
                <button onClick={inc1}>+1</button>
                <button onClick={dec1}>-1</button>
                <button onClick={inc5}>+5</button>
            </div>
            <ContextChild1/>
        </div>
        </Context.Provider>
        </>
    )
}
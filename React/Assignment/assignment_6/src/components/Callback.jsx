import { useState, useCallback } from "react";
import Child from "./Child";

export default function Callback(){
    const [count,setCount]=useState(0);

    const handleIncrement=()=>{
        setCount((c)=>c+1);
    };

    const handleClick=useCallback(()=>{
        console.log("handle click function is running");
        
    })

    return(
        <>
         <div style={{textAlign:"center"}}>
            <h1>Counter</h1>
            <p>{count}</p>
            <button onClick={handleIncrement}>+1</button>
            <Child handleClick={handleClick}/>
        </div>
        </>
    )
}
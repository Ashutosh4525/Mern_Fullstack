import { useState } from "react";

export default function Counter(){

    const [num, setNum]=useState(0);
    const inc1=()=>{
        setNum(num+1);
    }
    const dec1=()=>{
        setNum(num-1);
    }
    const inc5=()=>{
        setNum(num+5);
    }

    return(
        <>
        <div className="mx-auto">
            <h2>{num}</h2>
            <div>
                <button onClick={inc1}>+1</button>
                <button onClick={dec1}>-1</button>
                <button onClick={inc5}>+5</button>
            </div>
        </div>
        </>
    )
}
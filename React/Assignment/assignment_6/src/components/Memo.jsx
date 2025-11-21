import { useEffect, useMemo, useState } from "react";


export default function Memo({name}){
    const [count,setCount]=useState(0);


    function inc(){
        setCount((s)=>s+1);
    }

    function dec(){
        setCount((s)=>s-1);
    }

    const addition=(num)=>{
        console.log("function is running");
        var sum=0;
        for(var i=0;i<=1000000000;i++){
            sum+=num+1;
        }
        return sum;
    }

    const sum=useMemo(()=>{
        return addition(count)
    },[count])
    // const sum=useEffect(()=>{
    //     return addition(count)
    // },[count]) //useEffect does not 
    return(
    <>
        <div style={{textAlign:"center"}}>
            <h1>Counter</h1>
            <h2>{name}</h2>
            <p>{count}</p>
            <p>{sum}</p>
            <button onClick={()=>inc()}>+1</button>
            <button onClick={()=>dec()}>-1</button>
        </div>
    </>
    )
}
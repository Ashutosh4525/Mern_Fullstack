import { useState,useEffect } from "react";

const LifeCycle=()=>{
    const [name,Setname]=useState("Tom");

    useEffect(()=>{
        console.log("LifeCycle is mounted");
        return ()=>{
            console.log("LifeCycle is unmounted");
        }
        
    },[])

    return(
        <>
        <div className="text-center">
            <h2 className="text-4xl">Life Cycle</h2>

        </div>
        </>
    )
}

export default LifeCycle;
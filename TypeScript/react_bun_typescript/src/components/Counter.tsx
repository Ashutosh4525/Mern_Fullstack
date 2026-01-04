import { useState } from "react"

export function Counter(){
    const [count, setCount]=useState<number>(0)
    return(
        <>
        <div>
            <p>Cup orderd:{count}</p>
            <button onClick={()=>setCount((count)=>count+1)} >INC</button>
        </div>
        </>
    )
}
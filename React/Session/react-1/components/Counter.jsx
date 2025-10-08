
import { useState, useRef } from "react"
const Counter=()=>{
    const [num,setnum]=useState(0);
    const uinp=useRef();

    const f1=()=>{
        // const add =uinp.current.value
        setnum((c)=>c+1);
        // setnum(num+1)
        // console.log(add);
    }
    const f2=()=>{
        setnum((c)=>c-1);
        // setnum(num-1);
    }
    const f3=()=>{
        setnum((c)=>c+5)
    }
    const f4=()=>{
        setnum(c=>0)
    }
    return (
        <>

        <h2 ref={uinp}>{num}</h2>
        <button onClick={f1}>+1</button>
        <button onClick={f2}>-1</button>
        <button onClick={f3}>+5</button>
        <button onClick={f4}>0</button>
        </>
    )
}

export default Counter;
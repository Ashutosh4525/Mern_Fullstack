import { useState } from "react";

const Hello=()=>{

    const [text,settext]=useState("Earth")
    const fun2=()=>{
        settext("World")
    }
    return(
        <>
        <h2>State</h2>
        <h3>Hello,{text}</h3>
        <button onClick={fun2}>Click</button>
        </>
    )
}
export default Hello;
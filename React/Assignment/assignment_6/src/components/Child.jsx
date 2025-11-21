import { memo } from "react";

const Child=memo(({handleClick})=>{
    console.log("Child Component is rendered");
    
    return(
        <>
        <div style={{textAlign:"center"}}>
        <h2>Child component</h2>
        <button onClick={handleClick}>Click</button>
        </div>
        </>
    )
})

export default Child;
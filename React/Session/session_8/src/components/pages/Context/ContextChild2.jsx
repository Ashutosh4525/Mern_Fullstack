import { useContext } from "react";
import Context from "./Context";

const ContextChild2=()=>{
    const {inc1,num}=useContext(Context)

    return(
        <>
        <div className="text-center border border-blue-700 rounded-xl">
            <h2>Context child 2</h2>
            <h2>{num}</h2>
        <button onClick={inc1}>+1</button>
        </div>
        </>
    )
}
export default ContextChild2;
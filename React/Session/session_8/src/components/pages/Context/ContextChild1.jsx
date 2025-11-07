import { useContext } from "react";
import Context from "./Context";
import ContextChild2 from "./ContextChild2";

const ContextChild1=()=>{
    const {inc1}=useContext(Context)

    return(
        <>
        <div className="text-center border border-red-700 rounded-xl">
            <h2>Context child 2</h2>
        {/* <button onClick={inc1}>+1</button> */}
        <ContextChild2/>
        </div>
        </>
    )
}
export default ContextChild1;
import { useState,useRef } from "react";


const Search=()=>{
    // const val=document.getElementById("txt").value;
    const [txt,settxt]=useState("");
    const [result,setresult]=useState("");
    const inp=useRef();


    function fun2(event){
        // console.log(event.input.value);
        settxt(event.target.value);
    }

    function fun3(){
        console.log(inp.current.value);
        setresult(inp.current.value)
    }

    return (
        <>
        <hr />
        <input onChange={fun2} type="text" name="txt" id="txt" />
        <p>{txt}</p>
        <hr />
        <input type="text" ref={inp} />
        <button onClick={fun3}>Click</button>
        <p>{result}</p>
        <br />
        <hr />
        </>
    )
}
export default Search;
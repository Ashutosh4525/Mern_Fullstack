import { useState } from "react";

const State_Assignment=()=>{

    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [number,setnumber]=useState("");
    const [address,setaddress]=useState("");

    function f1(event){
        console.log(event.target.type);
        if (event.target.type==="text"){
            setname (event.target.value)
        }
        else if (event.target.type==="email"){
            setemail (event.target.value)
        }else if (event.target.type==="number"){
            setnumber (event.target.value)
        }else{
            setaddress(event.target.value)
        }

        
    }

    return(
        <>
        <div className="box1">
            <h1>State Assignment</h1>
            <br />
            <div className="innerbox1"> 
            <input type="text" name="" id=""  placeholder="Enter Name" onChange={f1}/>
            <input type="email" name="" id=""  placeholder="Enter Email" onChange={f1}/>
            <input type="number"  placeholder="Enter Contact no." onChange={f1}/>
            <textarea name="" id="" placeholder="Enter Address" onChange={f1}></textarea>
            </div>
            <div className="innerbox2">
                <h2>Result</h2>
                <br />
                <h3>Name: {name}</h3>
                <h3>Email:{email}</h3>
                <h3>Contact No:{number}</h3>
                <h3>Address:{address}</h3>
            </div>
        </div>
        </>
    )
}

export default State_Assignment;
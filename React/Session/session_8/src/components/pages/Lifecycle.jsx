import { useEffect, useState,useContext } from "react";
import { ReducerContext } from "./reducer/Reducer.jsx";
import { reducerActions } from "./reducer/reducer";

const Lifecycle = () => {
  const [data,dispatch]=useContext(ReducerContext);
  // console.log("Running.....")

  const [name, setName] = useState("Tom");

  const handleClick=()=>{
    dispatch({type:reducerActions.increment})
  }

  const handleClick1 = () =>{
      dispatch({type: reducerActions.increaseBy, payload: 10})
    }

  // component mount
  // useEffect(callbackfunction, dependencyArray)
  useEffect(() => {
    console.log("Lifecycle component mount");
    return () => {
      // runs when component unmount
      console.log("Lifecycle component unmount");
    };
  }, []);

  
  return (
    <div className="text-center">
      <h2 className=" text-4xl">Lifecycle</h2>

      <button style={{backgroundColor:"yellowgreen",color:"white",padding:"5px",borderRadius:"20px",cursor:"pointer"}} onClick={handleClick}>Increment-Reducer</button>
      <button style={{backgroundColor:"yellowgreen",color:"white",padding:"5px",borderRadius:"20px",cursor:"pointer"}} onClick={handleClick1}>Increase by 10 - Reducer</button>

      <ul>
        <li>Mount - Create </li>
        <li>Update</li>
        <li>Unmount - Destroy</li>
      </ul>

      <hr />

      <h3 className="text-2xl">{name}</h3>
      <button
        onClick={() => {
          setName("John");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Lifecycle;

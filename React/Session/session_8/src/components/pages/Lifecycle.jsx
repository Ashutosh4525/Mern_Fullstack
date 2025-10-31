import { useEffect, useState } from "react";

const Lifecycle = () => {
  // console.log("Running.....")

  const [name, setName] = useState("Tom");

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

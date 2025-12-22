import { useState } from "react"
import Sum from './Sum'
function App() {
 const [count, setCount]=useState(0);
 const [number,setNumber]=useState(1000);

 function calculatePrime(){
  let total=0;

  if(number>1)
    total++;

  for(let i=3;i<=number;i++){
    total++
    for(let j=2; j<i;j++){
      if(i%j==0){
        total --;
        break;
      }
    }
  }
  return total;
 }
 const prime=calculatePrime();

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={()=>setCount((count)=>count+1)}>Increment</button>
      <h2>Current num: {number}</h2>
      <h3>Total prim num: {prime}</h3>
      <button onClick={()=>setNumber((number)=>number+100)}>Inc 2</button>
      <Sum number={number}></Sum>
    </>
  )
}

export default App

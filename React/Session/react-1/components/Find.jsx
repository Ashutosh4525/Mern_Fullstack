import { useState } from "react";

const Find=()=>{
    const fruits = [
            "Apple", "Banana", "Orange", "Grape", "Strawberry",
            "Blueberry", "Raspberry", "Mango", "Pineapple", "Kiwi",
            "Watermelon", "Cantaloupe", "Honeydew", "Peach", "Plum",
            "Cherry", "Apricot", "Lemon", "Lime", "Pear",
            "Fig", "Date", "Pomegranate", "Avocado", "Coconut",
            "Guava", "Passionfruit", "Dragonfruit", "Lychee", "Papaya"
            ];
    const[res,setres]=useState(fruits.map((a, i) => (<li key={i}>{a}</li>)))
            
            function f1(event){
                const out=event.target.value.toLowerCase()
                const res1=fruits.filter((a)=>(a.toLowerCase().includes(out)))
                const res2=res1.map((a,i)=>(<li key={i}>{a}</li>))
                setres(res2);
            }

    return (
        <>
         <input type="text" onChange={f1} />
         <ul>
            {res}
         </ul>
        </>
    )
}

export default Find;